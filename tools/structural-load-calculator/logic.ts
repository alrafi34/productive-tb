import { CalculationType, Unit, StructuralCalculation, CalculationHistory, LoadPreset } from './types';

// Constants
const KN_TO_LB = 224.809;
const M_TO_FT = 3.28084;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get load presets
export const getLoadPresets = (): LoadPreset[] => {
  return [
    {
      name: 'Residential Floor',
      description: 'Typical residential building',
      deadLoad: 3,
      liveLoad: 2,
      additionalLoad: 0.5
    },
    {
      name: 'Office Space',
      description: 'Commercial office building',
      deadLoad: 4,
      liveLoad: 3,
      additionalLoad: 1
    },
    {
      name: 'Retail/Assembly',
      description: 'Retail or assembly areas',
      deadLoad: 4,
      liveLoad: 5,
      additionalLoad: 1
    },
    {
      name: 'Storage/Warehouse',
      description: 'Storage or warehouse facility',
      deadLoad: 5,
      liveLoad: 8,
      additionalLoad: 2
    },
    {
      name: 'Light Residential',
      description: 'Light residential use',
      deadLoad: 2.5,
      liveLoad: 1.5,
      additionalLoad: 0
    }
  ];
};

// Calculate area load
const calculateAreaLoad = (
  area: number,
  deadLoad: number,
  liveLoad: number,
  additionalLoad: number
): { total: number; dead: number; live: number; additional: number } => {
  
  const deadContribution = area * deadLoad;
  const liveContribution = area * liveLoad;
  const additionalContribution = area * additionalLoad;
  const total = deadContribution + liveContribution + additionalContribution;
  
  return {
    total,
    dead: deadContribution,
    live: liveContribution,
    additional: additionalContribution
  };
};

// Calculate beam load
const calculateBeamLoad = (
  length: number,
  uniformLoad: number
): number => {
  return length * uniformLoad;
};

// Main calculation function
export const calculateStructuralLoad = (
  calculationType: CalculationType,
  unit: Unit,
  area?: number,
  deadLoad?: number,
  liveLoad?: number,
  additionalLoad?: number,
  length?: number,
  uniformLoad?: number
): StructuralCalculation | null => {
  
  if (calculationType === 'area') {
    // Validate area load inputs
    if (isNaN(area!) || isNaN(deadLoad!) || isNaN(liveLoad!) || 
        area! <= 0 || deadLoad! < 0 || liveLoad! < 0) {
      return null;
    }
    
    const addLoad = additionalLoad || 0;
    const result = calculateAreaLoad(area!, deadLoad!, liveLoad!, addLoad);
    
    // Convert to imperial if needed
    const totalLoadImperial = unit === 'metric' ? result.total * KN_TO_LB : result.total;
    
    return {
      id: generateId(),
      calculationType,
      unit,
      area,
      deadLoad,
      liveLoad,
      additionalLoad: addLoad,
      totalLoad: result.total,
      deadLoadContribution: result.dead,
      liveLoadContribution: result.live,
      additionalLoadContribution: result.additional,
      totalLoadImperial,
      timestamp: Date.now()
    };
    
  } else if (calculationType === 'beam') {
    // Validate beam load inputs
    if (isNaN(length!) || isNaN(uniformLoad!) || 
        length! <= 0 || uniformLoad! <= 0) {
      return null;
    }
    
    const total = calculateBeamLoad(length!, uniformLoad!);
    const totalLoadImperial = unit === 'metric' ? total * KN_TO_LB : total;
    
    return {
      id: generateId(),
      calculationType,
      unit,
      length,
      uniformLoad,
      totalLoad: total,
      totalLoadImperial,
      timestamp: Date.now()
    };
  }
  
  return null;
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get calculation type display name
export const getCalculationTypeDisplayName = (type: CalculationType): string => {
  const names: Record<CalculationType, string> = {
    area: 'Area Load (Floor/Slab)',
    beam: 'Beam Load (Linear)'
  };
  return names[type];
};

// Save to history
export const saveToHistory = (calculation: StructuralCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('structural-load-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('structural-load-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('structural-load-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: StructuralCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Calculation Type,${getCalculationTypeDisplayName(calculation.calculationType)},-\n`;
  csv += `Unit System,${calculation.unit === 'metric' ? 'Metric' : 'Imperial'},-\n`;
  
  if (calculation.calculationType === 'area') {
    csv += `Area,${formatNumber(calculation.area!)},${calculation.unit === 'metric' ? 'm²' : 'sq ft'}\n`;
    csv += `Dead Load,${formatNumber(calculation.deadLoad!)},${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
    csv += `Live Load,${formatNumber(calculation.liveLoad!)},${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
    csv += `Additional Load,${formatNumber(calculation.additionalLoad!)},${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
    csv += `\nResults,Value,Unit\n`;
    csv += `Dead Load Contribution,${formatNumber(calculation.deadLoadContribution!)},${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
    csv += `Live Load Contribution,${formatNumber(calculation.liveLoadContribution!)},${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
    csv += `Additional Load Contribution,${formatNumber(calculation.additionalLoadContribution!)},${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
  } else {
    csv += `Length,${formatNumber(calculation.length!)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
    csv += `Uniform Load,${formatNumber(calculation.uniformLoad!)},${calculation.unit === 'metric' ? 'kN/m' : 'lb/ft'}\n`;
    csv += `\nResults,Value,Unit\n`;
  }
  
  csv += `Total Load,${formatNumber(calculation.totalLoad)},${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: StructuralCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   STRUCTURAL LOAD CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'CALCULATION TYPE:\n';
  text += '───────────────────────────────────────\n';
  text += `Type:             ${getCalculationTypeDisplayName(calculation.calculationType)}\n`;
  text += `Unit System:      ${calculation.unit === 'metric' ? 'Metric' : 'Imperial'}\n\n`;
  
  if (calculation.calculationType === 'area') {
    text += 'INPUT PARAMETERS:\n';
    text += '───────────────────────────────────────\n';
    text += `Area:             ${formatNumber(calculation.area!)} ${calculation.unit === 'metric' ? 'm²' : 'sq ft'}\n`;
    text += `Dead Load:        ${formatNumber(calculation.deadLoad!)} ${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
    text += `Live Load:        ${formatNumber(calculation.liveLoad!)} ${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
    text += `Additional Load:  ${formatNumber(calculation.additionalLoad!)} ${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
    
    text += '\nLOAD BREAKDOWN:\n';
    text += '───────────────────────────────────────\n';
    text += `Dead Load:        ${formatNumber(calculation.deadLoadContribution!)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
    text += `Live Load:        ${formatNumber(calculation.liveLoadContribution!)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
    text += `Additional Load:  ${formatNumber(calculation.additionalLoadContribution!)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
    
    text += '\nFORMULA:\n';
    text += '───────────────────────────────────────\n';
    text += 'Total Load = Area × (Dead Load + Live Load + Additional Load)\n';
  } else {
    text += 'INPUT PARAMETERS:\n';
    text += '───────────────────────────────────────\n';
    text += `Length:           ${formatNumber(calculation.length!)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
    text += `Uniform Load:     ${formatNumber(calculation.uniformLoad!)} ${calculation.unit === 'metric' ? 'kN/m' : 'lb/ft'}\n`;
    
    text += '\nFORMULA:\n';
    text += '───────────────────────────────────────\n';
    text += 'Total Load = Length × Uniform Load\n';
  }
  
  text += '\nCALCULATION RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Total Load:       ${formatNumber(calculation.totalLoad)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
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
