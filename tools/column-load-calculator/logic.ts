import { ColumnType, EndCondition, Unit, ColumnCalculation, CalculationHistory, MaterialPreset, EndConditionFactor } from './types';

// Constants
const KN_TO_TONS = 0.101972;
const MM_TO_INCHES = 0.0393701;
const M_TO_MM = 1000;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get end condition factors
export const getEndConditionFactors = (): EndConditionFactor[] => {
  return [
    {
      type: 'pinned-pinned',
      name: 'Pinned-Pinned',
      factor: 1.0,
      description: 'Both ends pinned (K = 1.0)'
    },
    {
      type: 'fixed-fixed',
      name: 'Fixed-Fixed',
      factor: 0.5,
      description: 'Both ends fixed (K = 0.5)'
    },
    {
      type: 'fixed-free',
      name: 'Fixed-Free',
      factor: 2.0,
      description: 'One end fixed, one free (K = 2.0)'
    },
    {
      type: 'fixed-pinned',
      name: 'Fixed-Pinned',
      factor: 0.7,
      description: 'One end fixed, one pinned (K = 0.7)'
    }
  ];
};

// Get material presets
export const getMaterialPresets = (): MaterialPreset[] => {
  return [
    {
      name: 'M20 Concrete',
      description: 'Standard grade concrete',
      fck: 20
    },
    {
      name: 'M25 Concrete',
      description: 'Common structural grade',
      fck: 25
    },
    {
      name: 'M30 Concrete',
      description: 'High strength concrete',
      fck: 30
    },
    {
      name: 'M35 Concrete',
      description: 'Very high strength',
      fck: 35
    },
    {
      name: 'Steel Grade 250',
      description: 'Mild steel',
      fy: 250
    },
    {
      name: 'Steel Grade 350',
      description: 'High tensile steel',
      fy: 350
    },
    {
      name: 'Steel Grade 415',
      description: 'Fe 415 steel',
      fy: 415
    }
  ];
};

// Calculate slenderness ratio
const calculateSlendernessRatio = (
  effectiveLength: number,
  leastDimension: number
): number => {
  return effectiveLength / leastDimension;
};

// Get slenderness status
const getSlendernessStatus = (ratio: number): 'safe' | 'warning' | 'critical' => {
  if (ratio < 12) return 'safe';
  if (ratio < 20) return 'warning';
  return 'critical';
};

// Calculate concrete column load capacity
const calculateConcreteLoad = (
  width: number,
  depth: number,
  fck: number,
  steelPercentage: number
): number => {
  // Area in mm²
  const Ac = width * depth;
  
  // Steel area (assuming fy = 415 MPa for reinforcement)
  const Asc = (steelPercentage / 100) * Ac;
  const fy = 415; // MPa for steel reinforcement
  
  // Simplified formula: Pu = 0.4 × fck × Ac + 0.67 × fy × Asc
  // Result in N, convert to kN
  const Pu = (0.4 * fck * Ac + 0.67 * fy * Asc) / 1000;
  
  return Pu;
};

// Calculate steel column load capacity
const calculateSteelLoad = (
  area: number,
  fy: number
): number => {
  // P = fy × A
  // Result in N, convert to kN
  const P = (fy * area) / 1000;
  
  return P;
};

// Apply slenderness reduction
const applySlendernessReduction = (
  loadCapacity: number,
  slendernessRatio: number
): number => {
  if (slendernessRatio < 12) {
    return loadCapacity; // No reduction
  } else if (slendernessRatio < 20) {
    // Apply 10-20% reduction
    const reduction = 0.1 + ((slendernessRatio - 12) / 8) * 0.1;
    return loadCapacity * (1 - reduction);
  } else {
    // Apply 20-40% reduction for high slenderness
    const reduction = 0.2 + Math.min((slendernessRatio - 20) / 20, 0.2);
    return loadCapacity * (1 - reduction);
  }
};

// Main calculation function
export const calculateColumnLoad = (
  columnType: ColumnType,
  width: number,
  depth: number,
  height: number,
  unit: Unit,
  safetyFactor: number,
  endCondition: EndCondition,
  fck?: number,
  steelPercentage?: number,
  fy?: number,
  area?: number
): ColumnCalculation | null => {
  
  // Validate inputs
  if (isNaN(width) || isNaN(depth) || isNaN(height) || 
      width <= 0 || depth <= 0 || height <= 0 || safetyFactor <= 0) {
    return null;
  }

  // Convert to mm if needed
  const widthMm = unit === 'inches' ? width / MM_TO_INCHES : width;
  const depthMm = unit === 'inches' ? depth / MM_TO_INCHES : depth;
  const heightM = height;

  // Get end condition factor
  const endConditionFactor = getEndConditionFactors().find(
    ec => ec.type === endCondition
  )?.factor || 1.0;

  // Calculate effective length
  const effectiveLength = heightM * M_TO_MM * endConditionFactor;

  // Calculate slenderness ratio
  const leastDimension = Math.min(widthMm, depthMm);
  const slendernessRatio = calculateSlendernessRatio(effectiveLength, leastDimension);
  const slendernessStatus = getSlendernessStatus(slendernessRatio);

  let loadCapacity = 0;

  // Calculate based on column type
  if (columnType === 'concrete') {
    if (!fck || !steelPercentage || isNaN(fck) || isNaN(steelPercentage)) {
      return null;
    }
    loadCapacity = calculateConcreteLoad(widthMm, depthMm, fck, steelPercentage);
  } else if (columnType === 'steel') {
    if (!fy || !area || isNaN(fy) || isNaN(area)) {
      return null;
    }
    loadCapacity = calculateSteelLoad(area, fy);
  }

  // Apply slenderness reduction
  loadCapacity = applySlendernessReduction(loadCapacity, slendernessRatio);

  // Calculate safe load
  const safeLoad = loadCapacity / safetyFactor;

  // Convert to tons
  const loadCapacityTons = loadCapacity * KN_TO_TONS;
  const safeLoadTons = safeLoad * KN_TO_TONS;

  return {
    id: generateId(),
    columnType,
    width,
    depth,
    height,
    unit,
    fck,
    steelPercentage,
    fy,
    area,
    safetyFactor,
    endCondition,
    loadCapacity,
    safeLoad,
    loadCapacityTons,
    safeLoadTons,
    slendernessRatio,
    slendernessStatus,
    effectiveLength: effectiveLength / M_TO_MM, // Convert back to meters
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get column type display name
export const getColumnTypeDisplayName = (type: ColumnType): string => {
  const names: Record<ColumnType, string> = {
    concrete: 'Reinforced Concrete',
    steel: 'Steel'
  };
  return names[type];
};

// Get end condition display name
export const getEndConditionDisplayName = (condition: EndCondition): string => {
  return getEndConditionFactors().find(ec => ec.type === condition)?.name || condition;
};

// Save to history
export const saveToHistory = (calculation: ColumnCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('column-load-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('column-load-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('column-load-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: ColumnCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Column Type,${getColumnTypeDisplayName(calculation.columnType)},-\n`;
  csv += `Width,${formatNumber(calculation.width)},${calculation.unit}\n`;
  csv += `Depth,${formatNumber(calculation.depth)},${calculation.unit}\n`;
  csv += `Height,${formatNumber(calculation.height)},m\n`;
  
  if (calculation.columnType === 'concrete') {
    csv += `Concrete Strength (fck),${formatNumber(calculation.fck!)},MPa\n`;
    csv += `Steel Percentage,${formatNumber(calculation.steelPercentage!)},%\n`;
  } else {
    csv += `Yield Strength (fy),${formatNumber(calculation.fy!)},MPa\n`;
    csv += `Cross-sectional Area,${formatNumber(calculation.area!)},mm²\n`;
  }
  
  csv += `Safety Factor,${formatNumber(calculation.safetyFactor)},-\n`;
  csv += `End Condition,${getEndConditionDisplayName(calculation.endCondition)},-\n`;
  csv += `\nResults,Value,Unit\n`;
  csv += `Load Capacity,${formatNumber(calculation.loadCapacity)},kN\n`;
  csv += `Safe Load,${formatNumber(calculation.safeLoad)},kN\n`;
  csv += `Load Capacity,${formatNumber(calculation.loadCapacityTons)},tons\n`;
  csv += `Safe Load,${formatNumber(calculation.safeLoadTons)},tons\n`;
  csv += `Slenderness Ratio,${formatNumber(calculation.slendernessRatio)},-\n`;
  csv += `Slenderness Status,${calculation.slendernessStatus},-\n`;
  csv += `Effective Length,${formatNumber(calculation.effectiveLength)},m\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: ColumnCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   COLUMN LOAD CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'COLUMN CONFIGURATION:\n';
  text += '───────────────────────────────────────\n';
  text += `Type:             ${getColumnTypeDisplayName(calculation.columnType)}\n`;
  text += `Dimensions:       ${formatNumber(calculation.width)} × ${formatNumber(calculation.depth)} ${calculation.unit}\n`;
  text += `Height:           ${formatNumber(calculation.height)} m\n`;
  
  if (calculation.columnType === 'concrete') {
    text += `Concrete Strength: ${formatNumber(calculation.fck!)} MPa\n`;
    text += `Steel %:          ${formatNumber(calculation.steelPercentage!)}%\n`;
  } else {
    text += `Yield Strength:   ${formatNumber(calculation.fy!)} MPa\n`;
    text += `Area:             ${formatNumber(calculation.area!)} mm²\n`;
  }
  
  text += `Safety Factor:    ${formatNumber(calculation.safetyFactor)}\n`;
  text += `End Condition:    ${getEndConditionDisplayName(calculation.endCondition)}\n`;
  
  text += '\nCALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Load Capacity:    ${formatNumber(calculation.loadCapacity)} kN\n`;
  text += `                  (${formatNumber(calculation.loadCapacityTons)} tons)\n`;
  text += `Safe Load:        ${formatNumber(calculation.safeLoad)} kN\n`;
  text += `                  (${formatNumber(calculation.safeLoadTons)} tons)\n`;
  text += `Slenderness:      ${formatNumber(calculation.slendernessRatio)} (${calculation.slendernessStatus})\n`;
  text += `Effective Length: ${formatNumber(calculation.effectiveLength)} m\n`;
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Download file
export const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Get status color
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    safe: 'text-green-700',
    warning: 'text-yellow-700',
    critical: 'text-red-700'
  };
  return colors[status] || 'text-gray-700';
};

// Get status background color
export const getStatusBgColor = (status: string): string => {
  const colors: Record<string, string> = {
    safe: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    critical: 'bg-red-50 border-red-200'
  };
  return colors[status] || 'bg-gray-50 border-gray-200';
};
