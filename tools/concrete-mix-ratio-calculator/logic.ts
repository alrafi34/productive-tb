import { Unit, BagSize, MixRatio, ConcreteCalculation, CalculationHistory, MixRatioPreset } from './types';

// Constants
const CUBIC_FEET_TO_CUBIC_METER = 35.3147;
const DEFAULT_DRY_VOLUME_FACTOR = 1.54;
const CEMENT_DENSITY = 1440; // kg/m³

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to cubic meters
export const convertToCubicMeters = (value: number, unit: Unit): number => {
  if (unit === 'ft') {
    return value / CUBIC_FEET_TO_CUBIC_METER;
  }
  return value;
};

// Convert to cubic feet
export const convertToCubicFeet = (valueM3: number): number => {
  return valueM3 * CUBIC_FEET_TO_CUBIC_METER;
};

// Parse mix ratio from string (e.g., "1:2:4")
export const parseMixRatio = (ratioString: string): MixRatio | null => {
  const parts = ratioString.split(':').map(p => parseFloat(p.trim()));
  
  if (parts.length !== 3 || parts.some(p => isNaN(p) || p <= 0)) {
    return null;
  }
  
  return {
    cement: parts[0],
    sand: parts[1],
    aggregate: parts[2]
  };
};

// Format mix ratio to string
export const formatMixRatio = (ratio: MixRatio): string => {
  return `${ratio.cement}:${ratio.sand}:${ratio.aggregate}`;
};

// Calculate concrete mix
export const calculateConcreteMix = (
  volume: number,
  unit: Unit,
  mixRatio: MixRatio,
  bagSize: BagSize,
  dryVolumeFactor: number = DEFAULT_DRY_VOLUME_FACTOR
): ConcreteCalculation => {
  // Convert to cubic meters
  const volumeM3 = convertToCubicMeters(volume, unit);
  
  // Calculate dry volume
  const dryVolume = volumeM3 * dryVolumeFactor;
  
  // Calculate total parts
  const totalParts = mixRatio.cement + mixRatio.sand + mixRatio.aggregate;
  
  // Calculate individual volumes
  const cementVolume = (mixRatio.cement / totalParts) * dryVolume;
  const sandVolume = (mixRatio.sand / totalParts) * dryVolume;
  const aggregateVolume = (mixRatio.aggregate / totalParts) * dryVolume;
  
  // Calculate cement weight and bags
  const cementWeight = cementVolume * CEMENT_DENSITY;
  const cementBags = cementWeight / bagSize;
  
  return {
    volume,
    volumeM3,
    dryVolume,
    cementVolume,
    sandVolume,
    aggregateVolume,
    cementWeight,
    cementBags,
    mixRatio,
    unit,
    bagSize,
    dryVolumeFactor
  };
};

// Mix ratio presets
export const getMixRatioPresets = (): MixRatioPreset[] => {
  return [
    {
      name: 'M5 Grade',
      ratio: { cement: 1, sand: 5, aggregate: 10 },
      description: 'Lean concrete for leveling',
      grade: 'M5'
    },
    {
      name: 'M10 Grade',
      ratio: { cement: 1, sand: 3, aggregate: 6 },
      description: 'Non-structural concrete',
      grade: 'M10'
    },
    {
      name: 'M15 Grade',
      ratio: { cement: 1, sand: 2, aggregate: 4 },
      description: 'Standard concrete for general use',
      grade: 'M15'
    },
    {
      name: 'M20 Grade',
      ratio: { cement: 1, sand: 1.5, aggregate: 3 },
      description: 'Structural concrete for beams and columns',
      grade: 'M20'
    },
    {
      name: 'M25 Grade',
      ratio: { cement: 1, sand: 1, aggregate: 2 },
      description: 'High strength structural concrete',
      grade: 'M25'
    },
    {
      name: 'M30 Grade',
      ratio: { cement: 1, sand: 0.75, aggregate: 1.5 },
      description: 'Very high strength concrete',
      grade: 'M30'
    }
  ];
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Save to history
export const saveToHistory = (calculation: ConcreteCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 10 entries
  const trimmed = history.slice(0, 10);
  localStorage.setItem('concrete-mix-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('concrete-mix-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('concrete-mix-calculator-history');
};

// Export to text
export const exportToText = (calculation: ConcreteCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '  CONCRETE MIX RATIO CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Total Volume:         ${formatNumber(calculation.volumeM3)} m³\n`;
  text += `Mix Ratio:            ${formatMixRatio(calculation.mixRatio)}\n`;
  text += `Dry Volume Factor:    ${calculation.dryVolumeFactor}\n`;
  text += `Cement Bag Size:      ${calculation.bagSize} kg\n\n`;
  
  text += 'VOLUME CALCULATIONS:\n';
  text += '───────────────────────────────────────\n';
  text += `Wet Volume:           ${formatNumber(calculation.volumeM3)} m³\n`;
  text += `Dry Volume:           ${formatNumber(calculation.dryVolume)} m³\n\n`;
  
  text += 'MATERIAL REQUIREMENTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Cement:               ${formatNumber(calculation.cementVolume)} m³\n`;
  text += `                      ${formatNumber(calculation.cementWeight)} kg\n`;
  text += `                      ${formatNumber(calculation.cementBags)} bags\n\n`;
  text += `Sand:                 ${formatNumber(calculation.sandVolume)} m³\n`;
  text += `Aggregate:            ${formatNumber(calculation.aggregateVolume)} m³\n`;
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Export to CSV
export const exportToCSV = (calculation: ConcreteCalculation): string => {
  let csv = 'Material,Volume (m³),Weight (kg),Bags\n';
  csv += `Cement,${formatNumber(calculation.cementVolume)},${formatNumber(calculation.cementWeight)},${formatNumber(calculation.cementBags)}\n`;
  csv += `Sand,${formatNumber(calculation.sandVolume)},-,-\n`;
  csv += `Aggregate,${formatNumber(calculation.aggregateVolume)},-,-\n`;
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
