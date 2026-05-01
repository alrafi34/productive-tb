import { Unit, SoilType, WaterLevel, SafetyFactor, FoundationType, FoundationCalculation, CalculationHistory, SoilPreset } from './types';

// Constants
const FEET_TO_METER = 0.3048;
const KN_TO_LB = 224.809;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to meters
export const convertToMeters = (value: number, unit: Unit): number => {
  if (unit === 'ft') {
    return value * FEET_TO_METER;
  }
  return value;
};

// Convert meters to feet
export const convertToFeet = (meters: number): number => {
  return meters / FEET_TO_METER;
};

// Get soil bearing capacity defaults (kN/m²)
export const getSoilBearingCapacity = (soilType: SoilType): number => {
  const capacities: Record<SoilType, number> = {
    clay: 75,
    sand: 150,
    silt: 100,
    gravel: 300,
    rock: 1000
  };
  return capacities[soilType];
};

// Get soil presets
export const getSoilPresets = (): SoilPreset[] => {
  return [
    {
      type: 'clay',
      name: 'Clay',
      bearingCapacity: 75,
      description: 'Soft to medium clay soil'
    },
    {
      type: 'sand',
      name: 'Sand',
      bearingCapacity: 150,
      description: 'Compact sand, good drainage'
    },
    {
      type: 'silt',
      name: 'Silt',
      bearingCapacity: 100,
      description: 'Fine-grained soil'
    },
    {
      type: 'gravel',
      name: 'Gravel',
      bearingCapacity: 300,
      description: 'Coarse gravel, excellent bearing'
    },
    {
      type: 'rock',
      name: 'Rock',
      bearingCapacity: 1000,
      description: 'Solid rock, highest capacity'
    }
  ];
};

// Get water level adjustment factor
const getWaterAdjustment = (waterLevel: WaterLevel): number => {
  const adjustments: Record<WaterLevel, number> = {
    low: 1.0,
    medium: 1.1,
    high: 1.15
  };
  return adjustments[waterLevel];
};

// Get foundation type adjustment
const getFoundationTypeAdjustment = (foundationType: FoundationType): number => {
  const adjustments: Record<FoundationType, number> = {
    shallow: 1.0,
    strip: 1.05,
    raft: 0.95,
    pile: 1.2
  };
  return adjustments[foundationType];
};

// Calculate foundation depth
export const calculateFoundationDepth = (
  soilType: SoilType,
  load: number,
  frostDepth: number,
  waterLevel: WaterLevel,
  safetyFactor: SafetyFactor,
  foundationType: FoundationType,
  unit: Unit,
  customBearingCapacity?: number
): FoundationCalculation | null => {
  
  if (isNaN(load) || isNaN(frostDepth) || load <= 0 || frostDepth < 0) {
    return null;
  }

  // Convert inputs to meters
  const loadKN = unit === 'ft' ? load / (KN_TO_LB / 10.764) : load; // Convert to kN/m² if needed
  const frostDepthM = convertToMeters(frostDepth, unit);

  // Get bearing capacity
  const bearingCapacity = customBearingCapacity || getSoilBearingCapacity(soilType);

  // Calculate base depth from load and bearing capacity
  const baseDepth = (loadKN / bearingCapacity) * safetyFactor;

  // Apply water level adjustment
  const waterAdjustment = getWaterAdjustment(waterLevel);
  
  // Apply foundation type adjustment
  const typeAdjustment = getFoundationTypeAdjustment(foundationType);

  // Calculate adjusted depth
  let adjustedDepth = baseDepth * waterAdjustment * typeAdjustment;

  // Ensure minimum depth is at least frost depth
  const requiredDepth = Math.max(frostDepthM, adjustedDepth);

  // Calculate total adjustment percentage
  const adjustment = ((requiredDepth - baseDepth) / baseDepth) * 100;

  // Determine safety status
  let status: 'safe' | 'risky' | 'critical';
  const depthRatio = requiredDepth / frostDepthM;
  
  if (depthRatio >= 1.5) {
    status = 'safe';
  } else if (depthRatio >= 1.2) {
    status = 'risky';
  } else {
    status = 'critical';
  }

  // Generate notes
  const notes: string[] = [];
  
  if (waterLevel === 'high') {
    notes.push('High groundwater level increases required depth by 15%');
  } else if (waterLevel === 'medium') {
    notes.push('Medium groundwater level increases required depth by 10%');
  }

  if (soilType === 'clay') {
    notes.push('Clay soil has lower bearing capacity, consider soil improvement');
  } else if (soilType === 'rock') {
    notes.push('Rock provides excellent bearing capacity');
  }

  if (requiredDepth === frostDepthM && frostDepthM > 0) {
    notes.push('Depth controlled by frost penetration requirement');
  } else if (requiredDepth > frostDepthM) {
    notes.push('Depth controlled by load and soil bearing capacity');
  }

  if (safetyFactor >= 2.5) {
    notes.push('High safety factor applied for critical structures');
  }

  if (foundationType === 'pile') {
    notes.push('Pile foundation requires deeper depth for load transfer');
  } else if (foundationType === 'raft') {
    notes.push('Raft foundation distributes load over larger area');
  }

  return {
    id: generateId(),
    soilType,
    load: loadKN,
    frostDepth: frostDepthM,
    waterLevel,
    safetyFactor,
    foundationType,
    bearingCapacity,
    requiredDepth,
    requiredDepthFt: convertToFeet(requiredDepth),
    baseDepth,
    adjustment,
    status,
    notes,
    unit,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Save to history
export const saveToHistory = (calculation: FoundationCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('foundation-depth-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('foundation-depth-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('foundation-depth-calculator-history');
};

// Export to text
export const exportToText = (calculation: FoundationCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   FOUNDATION DEPTH CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Soil Type:           ${calculation.soilType.charAt(0).toUpperCase() + calculation.soilType.slice(1)}\n`;
  text += `Load:                ${formatNumber(calculation.load)} kN/m²\n`;
  text += `Frost Depth:         ${formatNumber(calculation.frostDepth)} m\n`;
  text += `Water Level:         ${calculation.waterLevel.charAt(0).toUpperCase() + calculation.waterLevel.slice(1)}\n`;
  text += `Safety Factor:       ${calculation.safetyFactor}\n`;
  text += `Foundation Type:     ${calculation.foundationType.charAt(0).toUpperCase() + calculation.foundationType.slice(1)}\n`;
  text += `Bearing Capacity:    ${formatNumber(calculation.bearingCapacity)} kN/m²\n\n`;
  
  text += 'CALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Required Depth:      ${formatNumber(calculation.requiredDepth)} m\n`;
  text += `                     (${formatNumber(calculation.requiredDepthFt)} ft)\n`;
  text += `Base Depth:          ${formatNumber(calculation.baseDepth)} m\n`;
  text += `Adjustment:          ${formatNumber(calculation.adjustment)}%\n`;
  text += `Safety Status:       ${calculation.status.toUpperCase()}\n\n`;
  
  if (calculation.notes.length > 0) {
    text += 'ENGINEERING NOTES:\n';
    text += '───────────────────────────────────────\n';
    calculation.notes.forEach((note, index) => {
      text += `${index + 1}. ${note}\n`;
    });
  }
  
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Export to CSV
export const exportToCSV = (calculation: FoundationCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Soil Type,${calculation.soilType},-\n`;
  csv += `Load,${formatNumber(calculation.load)},kN/m²\n`;
  csv += `Frost Depth,${formatNumber(calculation.frostDepth)},m\n`;
  csv += `Water Level,${calculation.waterLevel},-\n`;
  csv += `Safety Factor,${calculation.safetyFactor},-\n`;
  csv += `Foundation Type,${calculation.foundationType},-\n`;
  csv += `Bearing Capacity,${formatNumber(calculation.bearingCapacity)},kN/m²\n`;
  csv += `Required Depth,${formatNumber(calculation.requiredDepth)},m\n`;
  csv += `Required Depth,${formatNumber(calculation.requiredDepthFt)},ft\n`;
  csv += `Base Depth,${formatNumber(calculation.baseDepth)},m\n`;
  csv += `Adjustment,${formatNumber(calculation.adjustment)},%\n`;
  csv += `Status,${calculation.status},-\n`;
  
  return csv;
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
export const getStatusColor = (status: 'safe' | 'risky' | 'critical'): string => {
  const colors = {
    safe: 'text-green-700',
    risky: 'text-yellow-700',
    critical: 'text-red-700'
  };
  return colors[status];
};

// Get status background color
export const getStatusBgColor = (status: 'safe' | 'risky' | 'critical'): string => {
  const colors = {
    safe: 'bg-green-50 border-green-200',
    risky: 'bg-yellow-50 border-yellow-200',
    critical: 'bg-red-50 border-red-200'
  };
  return colors[status];
};
