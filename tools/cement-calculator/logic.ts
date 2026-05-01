import { Unit, CalculationType, MixRatio, CementCalculation, CalculationHistory, MixRatioPreset } from './types';

// Constants
const CUBIC_FEET_TO_CUBIC_METER = 35.3147;
const DRY_VOLUME_FACTOR = 1.54;
const CEMENT_BAG_VOLUME = 0.035; // cubic meters per bag (50kg)

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to cubic feet
export const convertToCubicFeet = (value: number, unit: Unit): number => {
  if (unit === 'm') {
    return value * CUBIC_FEET_TO_CUBIC_METER;
  }
  return value;
};

// Convert to cubic meters
export const convertToCubicMeters = (cubicFeet: number): number => {
  return cubicFeet / CUBIC_FEET_TO_CUBIC_METER;
};

// Calculate concrete volume
export const calculateConcreteVolume = (
  length: number,
  width: number,
  thickness: number,
  unit: Unit
): number => {
  const lengthFt = unit === 'm' ? length * 3.28084 : length;
  const widthFt = unit === 'm' ? width * 3.28084 : width;
  const thicknessFt = unit === 'm' ? thickness * 3.28084 : thickness;
  
  return lengthFt * widthFt * thicknessFt;
};

// Calculate plaster volume
export const calculatePlasterVolume = (
  area: number,
  thickness: number,
  unit: Unit
): number => {
  // Thickness is typically in inches or mm
  const areaFt = unit === 'm' ? area * 10.7639 : area;
  const thicknessFt = thickness / 12; // Convert inches to feet
  
  return areaFt * thicknessFt;
};

// Calculate cement required
export const calculateCementRequired = (
  volumeCubicFeet: number,
  mixRatio: MixRatio,
  type: CalculationType
): CementCalculation => {
  // Convert to cubic meters
  const volumeM3 = convertToCubicMeters(volumeCubicFeet);
  
  // Calculate dry volume
  const dryVolume = volumeM3 * DRY_VOLUME_FACTOR;
  
  // Calculate total parts
  const totalParts = mixRatio.cement + mixRatio.sand + (mixRatio.aggregate || 0);
  
  // Calculate cement volume
  const cementVolume = (mixRatio.cement / totalParts) * dryVolume;
  
  // Calculate cement bags
  const cementBags = cementVolume / CEMENT_BAG_VOLUME;
  
  // Calculate sand and aggregate volumes
  const sandVolume = (mixRatio.sand / totalParts) * dryVolume;
  const aggregateVolume = mixRatio.aggregate ? (mixRatio.aggregate / totalParts) * dryVolume : 0;
  
  return {
    volume: volumeCubicFeet,
    volumeM3,
    dryVolume,
    cementVolume,
    cementBags: Math.ceil(cementBags),
    sandVolume,
    aggregateVolume,
    mixRatio,
    unit: 'ft',
    type
  };
};

// Mix ratio presets
export const getMixRatioPresets = (): MixRatioPreset[] => {
  return [
    {
      name: '1:2:4 (Standard)',
      ratio: { cement: 1, sand: 2, aggregate: 4 },
      description: 'Standard concrete mix for general construction'
    },
    {
      name: '1:1.5:3 (High Strength)',
      ratio: { cement: 1, sand: 1.5, aggregate: 3 },
      description: 'High strength concrete for structural elements'
    },
    {
      name: '1:3:6 (Lean Mix)',
      ratio: { cement: 1, sand: 3, aggregate: 6 },
      description: 'Lean concrete for foundations and mass concrete'
    },
    {
      name: '1:3 (Plaster)',
      ratio: { cement: 1, sand: 3, aggregate: 0 },
      description: 'Standard cement-sand mortar for plastering'
    },
    {
      name: '1:4 (Plaster)',
      ratio: { cement: 1, sand: 4, aggregate: 0 },
      description: 'Lean plaster mix for internal walls'
    },
    {
      name: '1:6 (Brick Mortar)',
      ratio: { cement: 1, sand: 6, aggregate: 0 },
      description: 'Mortar for brick masonry work'
    },
  ];
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get unit name
export const getUnitName = (unit: Unit): string => {
  return unit === 'ft' ? 'Cubic Feet' : 'Cubic Meters';
};

// Save to history
export const saveToHistory = (calculation: CementCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 10 entries
  const trimmed = history.slice(0, 10);
  localStorage.setItem('cement-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('cement-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('cement-calculator-history');
};

// Export to text
export const exportToText = (calculation: CementCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '     CEMENT CALCULATION REPORT\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += `Calculation Type: ${calculation.type.charAt(0).toUpperCase() + calculation.type.slice(1)}\n\n`;
  
  text += 'MIX RATIO:\n';
  text += '───────────────────────────────────────\n';
  text += `Cement:Sand:Aggregate = ${calculation.mixRatio.cement}:${calculation.mixRatio.sand}`;
  if (calculation.mixRatio.aggregate > 0) {
    text += `:${calculation.mixRatio.aggregate}`;
  }
  text += '\n\n';
  
  text += 'VOLUME DETAILS:\n';
  text += '───────────────────────────────────────\n';
  text += `Wet Volume:           ${formatNumber(calculation.volumeM3)} m³\n`;
  text += `Dry Volume:           ${formatNumber(calculation.dryVolume)} m³\n`;
  text += `Cement Volume:        ${formatNumber(calculation.cementVolume)} m³\n\n`;
  
  text += 'MATERIAL REQUIREMENTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Cement:               ${calculation.cementBags} bags (50kg each)\n`;
  text += `Sand:                 ${formatNumber(calculation.sandVolume || 0)} m³\n`;
  if (calculation.aggregateVolume && calculation.aggregateVolume > 0) {
    text += `Aggregate:            ${formatNumber(calculation.aggregateVolume)} m³\n`;
  }
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Download file
export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
