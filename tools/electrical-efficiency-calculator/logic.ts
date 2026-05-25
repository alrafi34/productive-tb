import { 
  EfficiencyInputs, 
  EfficiencyResult, 
  PowerUnit, 
  EfficiencyLevel, 
  HistoryEntry, 
  Preset 
} from './types';

// Power unit multipliers
export const POWER_MULTIPLIERS: Record<PowerUnit, number> = {
  'W': 1,
  'kW': 1000,
  'MW': 1000000,
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Convert power to watts
export const convertToWatts = (value: number, unit: PowerUnit): number => {
  return value * POWER_MULTIPLIERS[unit];
};

// Format number with precision
export const formatNumber = (value: number, precision: number = 2): string => {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toFixed(precision);
};

// Format power with appropriate unit
export const formatPower = (watts: number, targetUnit?: PowerUnit): { value: number; unit: PowerUnit; display: string } => {
  if (targetUnit) {
    return {
      value: watts / POWER_MULTIPLIERS[targetUnit],
      unit: targetUnit,
      display: `${formatNumber(watts / POWER_MULTIPLIERS[targetUnit], 2)} ${targetUnit}`
    };
  }

  if (watts >= 1000000) {
    return {
      value: watts / 1000000,
      unit: 'MW',
      display: `${formatNumber(watts / 1000000, 2)} MW`
    };
  } else if (watts >= 1000) {
    return {
      value: watts / 1000,
      unit: 'kW',
      display: `${formatNumber(watts / 1000, 2)} kW`
    };
  } else {
    return {
      value: watts,
      unit: 'W',
      display: `${formatNumber(watts, 2)} W`
    };
  }
};

// Validate inputs
export const validateInputs = (inputs: EfficiencyInputs): string | null => {
  if (!inputs.inputPower || inputs.inputPower <= 0) {
    return 'Input power must be greater than 0';
  }

  if (inputs.outputPower < 0) {
    return 'Output power cannot be negative';
  }

  if (inputs.inputPower > 1000000000) { // 1GW limit
    return 'Input power should be reasonable (≤ 1000MW)';
  }

  return null;
};

// Determine efficiency level
const getEfficiencyLevel = (efficiency: number): { level: EfficiencyLevel; warning?: string } => {
  if (efficiency >= 95) {
    return { level: 'excellent' };
  } else if (efficiency >= 85) {
    return { level: 'good' };
  } else if (efficiency >= 70) {
    return { level: 'fair' };
  } else if (efficiency >= 0) {
    return { 
      level: 'poor',
      warning: 'Low efficiency detected - consider system optimization'
    };
  } else {
    return { 
      level: 'poor',
      warning: 'Invalid efficiency calculation - check input values'
    };
  }
};

// Main calculation function
export const calculateEfficiency = (inputs: EfficiencyInputs): EfficiencyResult => {
  const inputPowerWatts = convertToWatts(inputs.inputPower, inputs.powerUnit);
  const outputPowerWatts = convertToWatts(inputs.outputPower, inputs.powerUnit);
  
  // Calculate efficiency
  const efficiency = (outputPowerWatts / inputPowerWatts) * 100;
  
  // Calculate power loss
  const powerLoss = inputPowerWatts - outputPowerWatts;
  const powerLossPercentage = (powerLoss / inputPowerWatts) * 100;
  
  // Determine efficiency level and warnings
  const efficiencyInfo = getEfficiencyLevel(efficiency);
  
  // Add warning for efficiency > 100%
  let warning = efficiencyInfo.warning;
  if (efficiency > 100) {
    warning = 'Efficiency exceeds 100% - check system loss assumptions or measurement accuracy';
  }
  
  // Generate calculation steps
  const steps = generateCalculationSteps(inputs, efficiency, powerLoss);

  return {
    efficiency,
    inputPower: inputs.inputPower,
    outputPower: inputs.outputPower,
    powerLoss: powerLoss / POWER_MULTIPLIERS[inputs.powerUnit], // Convert back to input unit
    powerLossPercentage,
    efficiencyLevel: efficiencyInfo.level,
    warning,
    steps,
    formula: 'Efficiency (%) = (Output Power / Input Power) × 100',
    powerUnit: inputs.powerUnit
  };
};

// Generate calculation steps
const generateCalculationSteps = (
  inputs: EfficiencyInputs, 
  efficiency: number, 
  powerLossWatts: number
): string[] => {
  const steps: string[] = [];
  
  steps.push('Electrical Efficiency Calculation:');
  steps.push('');
  steps.push(`Given:`);
  steps.push(`Input Power = ${formatNumber(inputs.inputPower, inputs.precision)} ${inputs.powerUnit}`);
  steps.push(`Output Power = ${formatNumber(inputs.outputPower, inputs.precision)} ${inputs.powerUnit}`);
  steps.push('');
  
  steps.push('Formula:');
  steps.push('Efficiency (%) = (Output Power / Input Power) × 100');
  steps.push('');
  
  steps.push('Calculation:');
  steps.push(`Efficiency = (${formatNumber(inputs.outputPower, inputs.precision)} / ${formatNumber(inputs.inputPower, inputs.precision)}) × 100`);
  steps.push(`Efficiency = ${formatNumber(inputs.outputPower / inputs.inputPower, 4)} × 100`);
  steps.push(`Efficiency = ${formatNumber(efficiency, inputs.precision)}%`);
  steps.push('');
  
  steps.push('Power Loss Analysis:');
  const powerLoss = powerLossWatts / POWER_MULTIPLIERS[inputs.powerUnit];
  steps.push(`Power Loss = Input Power - Output Power`);
  steps.push(`Power Loss = ${formatNumber(inputs.inputPower, inputs.precision)} - ${formatNumber(inputs.outputPower, inputs.precision)}`);
  steps.push(`Power Loss = ${formatNumber(powerLoss, inputs.precision)} ${inputs.powerUnit}`);
  steps.push(`Loss Percentage = ${formatNumber((powerLoss / inputs.inputPower) * 100, inputs.precision)}%`);
  
  return steps;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Presets
export const getPresets = (): Preset[] => [
  {
    name: 'Electric Motor',
    description: 'Typical industrial motor efficiency',
    inputPower: 10,
    outputPower: 9.2,
    powerUnit: 'kW'
  },
  {
    name: 'LED Light',
    description: 'High-efficiency LED lighting',
    inputPower: 100,
    outputPower: 95,
    powerUnit: 'W'
  },
  {
    name: 'Solar Inverter',
    description: 'Grid-tie solar inverter',
    inputPower: 5,
    outputPower: 4.75,
    powerUnit: 'kW'
  },
  {
    name: 'Transformer',
    description: 'Distribution transformer',
    inputPower: 100,
    outputPower: 98,
    powerUnit: 'kW'
  },
  {
    name: 'Power Supply',
    description: 'Switching power supply',
    inputPower: 500,
    outputPower: 450,
    powerUnit: 'W'
  },
  {
    name: 'Generator',
    description: 'Diesel generator set',
    inputPower: 1,
    outputPower: 0.85,
    powerUnit: 'MW'
  }
];

// History management
const HISTORY_KEY = 'electrical-efficiency-history';
const MAX_HISTORY = 50;

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveToHistory = (inputs: EfficiencyInputs, result: EfficiencyResult): void => {
  if (typeof window === 'undefined') return;
  
  const entry: HistoryEntry = {
    id: generateId(),
    timestamp: Date.now(),
    inputs,
    result
  };
  
  const history = getHistory();
  history.unshift(entry);
  
  // Keep only the latest entries
  const trimmedHistory = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn('Failed to save to history:', error);
  }
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to clear history:', error);
  }
};

// Export functions
export const exportToText = (inputs: EfficiencyInputs, result: EfficiencyResult): string => {
  const lines: string[] = [];
  
  lines.push('ELECTRICAL EFFICIENCY CALCULATION REPORT');
  lines.push('=' .repeat(42));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  
  lines.push('INPUT PARAMETERS:');
  lines.push(`Input Power: ${formatNumber(inputs.inputPower, inputs.precision)} ${inputs.powerUnit}`);
  lines.push(`Output Power: ${formatNumber(inputs.outputPower, inputs.precision)} ${inputs.powerUnit}`);
  lines.push('');
  
  lines.push('RESULTS:');
  lines.push(`Efficiency: ${formatNumber(result.efficiency, inputs.precision)}%`);
  lines.push(`Efficiency Level: ${result.efficiencyLevel.toUpperCase()}`);
  lines.push(`Power Loss: ${formatNumber(result.powerLoss, inputs.precision)} ${inputs.powerUnit}`);
  lines.push(`Loss Percentage: ${formatNumber(result.powerLossPercentage, inputs.precision)}%`);
  if (result.warning) {
    lines.push(`Warning: ${result.warning}`);
  }
  lines.push('');
  
  lines.push('CALCULATION STEPS:');
  result.steps.forEach(step => lines.push(step));
  
  return lines.join('\n');
};

export const exportToCSV = (inputs: EfficiencyInputs, result: EfficiencyResult): string => {
  const lines: string[] = [];
  
  lines.push('Parameter,Value,Unit');
  lines.push(`Input Power,${formatNumber(inputs.inputPower, inputs.precision)},${inputs.powerUnit}`);
  lines.push(`Output Power,${formatNumber(inputs.outputPower, inputs.precision)},${inputs.powerUnit}`);
  lines.push(`Efficiency,${formatNumber(result.efficiency, inputs.precision)},%`);
  lines.push(`Power Loss,${formatNumber(result.powerLoss, inputs.precision)},${inputs.powerUnit}`);
  lines.push(`Loss Percentage,${formatNumber(result.powerLossPercentage, inputs.precision)},%`);
  lines.push(`Efficiency Level,${result.efficiencyLevel},-`);
  
  return lines.join('\n');
};

export const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};