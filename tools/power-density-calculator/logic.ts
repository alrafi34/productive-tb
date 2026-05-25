import { 
  PowerDensityInputs, 
  PowerDensityResult, 
  PowerUnit, 
  AreaUnit, 
  DensityLevel, 
  HistoryEntry, 
  Preset 
} from './types';

// Unit multipliers
export const POWER_MULTIPLIERS: Record<PowerUnit, number> = {
  'W': 1,
  'kW': 1000,
  'MW': 1000000,
};

export const AREA_MULTIPLIERS: Record<AreaUnit, number> = {
  'm²': 1,
  'cm²': 0.0001,
  'mm²': 0.000001,
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Convert power to watts
export const convertToWatts = (value: number, unit: PowerUnit): number => {
  return value * POWER_MULTIPLIERS[unit];
};

// Convert area to square meters
export const convertToSquareMeters = (value: number, unit: AreaUnit): number => {
  return value * AREA_MULTIPLIERS[unit];
};

// Format number with precision
export const formatNumber = (value: number, precision: number = 2): string => {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toFixed(precision);
};

// Format power density with appropriate unit
export const formatPowerDensity = (density: number): { value: number; unit: string; display: string } => {
  if (density >= 1000000) {
    return {
      value: density / 1000000,
      unit: 'MW/m²',
      display: `${formatNumber(density / 1000000, 2)} MW/m²`
    };
  } else if (density >= 1000) {
    return {
      value: density / 1000,
      unit: 'kW/m²',
      display: `${formatNumber(density / 1000, 2)} kW/m²`
    };
  } else {
    return {
      value: density,
      unit: 'W/m²',
      display: `${formatNumber(density, 2)} W/m²`
    };
  }
};

// Validate inputs
export const validateInputs = (inputs: PowerDensityInputs): string | null => {
  if (!inputs.power || inputs.power <= 0) {
    return 'Power must be greater than 0';
  }

  if (!inputs.area || inputs.area <= 0) {
    return 'Area must be greater than 0';
  }

  if (inputs.power > 1000000000) { // 1GW limit
    return 'Power should be reasonable (≤ 1000MW)';
  }

  if (inputs.area > 1000000) { // 1km² limit
    return 'Area should be reasonable (≤ 1,000,000 m²)';
  }

  return null;
};

// Determine density level
const getDensityLevel = (density: number): { level: DensityLevel; warning?: string } => {
  if (density < 10) {
    return { level: 'low' };
  } else if (density < 100) {
    return { level: 'moderate' };
  } else if (density < 1000) {
    return { 
      level: 'high',
      warning: 'High power density - ensure adequate cooling and safety measures'
    };
  } else {
    return { 
      level: 'very-high',
      warning: 'Very high power density - critical cooling and safety requirements'
    };
  }
};

// Main calculation function
export const calculatePowerDensity = (inputs: PowerDensityInputs): PowerDensityResult => {
  const powerWatts = convertToWatts(inputs.power, inputs.powerUnit);
  const areaSquareMeters = convertToSquareMeters(inputs.area, inputs.areaUnit);
  
  // Calculate power density (W/m²)
  const powerDensity = powerWatts / areaSquareMeters;
  
  // Determine density level and warnings
  const densityInfo = getDensityLevel(powerDensity);
  
  // Format result
  const formattedDensity = formatPowerDensity(powerDensity);
  
  // Generate calculation steps
  const steps = generateCalculationSteps(inputs, powerDensity);

  return {
    powerDensity,
    power: inputs.power,
    area: inputs.area,
    powerUnit: inputs.powerUnit,
    areaUnit: inputs.areaUnit,
    formattedResult: formattedDensity.display,
    densityLevel: densityInfo.level,
    warning: densityInfo.warning,
    steps,
    formula: 'Power Density = Power / Area'
  };
};

// Generate calculation steps
const generateCalculationSteps = (
  inputs: PowerDensityInputs, 
  powerDensity: number
): string[] => {
  const steps: string[] = [];
  
  steps.push('Power Density Calculation:');
  steps.push('');
  steps.push(`Given:`);
  steps.push(`Power = ${formatNumber(inputs.power, inputs.precision)} ${inputs.powerUnit}`);
  steps.push(`Area = ${formatNumber(inputs.area, inputs.precision)} ${inputs.areaUnit}`);
  steps.push('');
  
  // Convert to base units if needed
  const powerWatts = convertToWatts(inputs.power, inputs.powerUnit);
  const areaSquareMeters = convertToSquareMeters(inputs.area, inputs.areaUnit);
  
  if (inputs.powerUnit !== 'W' || inputs.areaUnit !== 'm²') {
    steps.push('Convert to base units:');
    if (inputs.powerUnit !== 'W') {
      steps.push(`Power = ${formatNumber(inputs.power, inputs.precision)} ${inputs.powerUnit} = ${formatNumber(powerWatts, inputs.precision)} W`);
    }
    if (inputs.areaUnit !== 'm²') {
      steps.push(`Area = ${formatNumber(inputs.area, inputs.precision)} ${inputs.areaUnit} = ${formatNumber(areaSquareMeters, inputs.precision)} m²`);
    }
    steps.push('');
  }
  
  steps.push('Formula:');
  steps.push('Power Density = Power / Area');
  steps.push('');
  
  steps.push('Calculation:');
  steps.push(`Power Density = ${formatNumber(powerWatts, inputs.precision)} W / ${formatNumber(areaSquareMeters, inputs.precision)} m²`);
  steps.push(`Power Density = ${formatNumber(powerDensity, inputs.precision)} W/m²`);
  
  // Show formatted result if different
  const formattedDensity = formatPowerDensity(powerDensity);
  if (formattedDensity.unit !== 'W/m²') {
    steps.push(`Power Density = ${formattedDensity.display}`);
  }
  
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
    name: 'LED Panel',
    description: 'Typical LED lighting panel',
    power: 40,
    area: 0.36,
    powerUnit: 'W',
    areaUnit: 'm²'
  },
  {
    name: 'Electric Heater',
    description: 'Residential electric heater',
    power: 1500,
    area: 0.5,
    powerUnit: 'W',
    areaUnit: 'm²'
  },
  {
    name: 'Solar Panel',
    description: 'Standard solar photovoltaic panel',
    power: 300,
    area: 2,
    powerUnit: 'W',
    areaUnit: 'm²'
  },
  {
    name: 'Laptop Computer',
    description: 'Typical laptop power consumption',
    power: 65,
    area: 0.03,
    powerUnit: 'W',
    areaUnit: 'm²'
  },
  {
    name: 'Induction Cooktop',
    description: 'Kitchen induction cooking surface',
    power: 2000,
    area: 0.02,
    powerUnit: 'W',
    areaUnit: 'm²'
  },
  {
    name: 'Server Rack',
    description: 'Data center server rack',
    power: 5,
    area: 1,
    powerUnit: 'kW',
    areaUnit: 'm²'
  }
];

// History management
const HISTORY_KEY = 'power-density-history';
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

export const saveToHistory = (inputs: PowerDensityInputs, result: PowerDensityResult): void => {
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
export const exportToText = (inputs: PowerDensityInputs, result: PowerDensityResult): string => {
  const lines: string[] = [];
  
  lines.push('POWER DENSITY CALCULATION REPORT');
  lines.push('=' .repeat(35));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  
  lines.push('INPUT PARAMETERS:');
  lines.push(`Power: ${formatNumber(inputs.power, inputs.precision)} ${inputs.powerUnit}`);
  lines.push(`Area: ${formatNumber(inputs.area, inputs.precision)} ${inputs.areaUnit}`);
  lines.push('');
  
  lines.push('RESULTS:');
  lines.push(`Power Density: ${result.formattedResult}`);
  lines.push(`Density Level: ${result.densityLevel.toUpperCase()}`);
  if (result.warning) {
    lines.push(`Warning: ${result.warning}`);
  }
  lines.push('');
  
  lines.push('CALCULATION STEPS:');
  result.steps.forEach(step => lines.push(step));
  
  return lines.join('\n');
};

export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};