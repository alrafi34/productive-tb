import { Unit, CalculationType, SandCalculation, CalculationHistory, MixRatioPreset } from './types';

// Constants
const CUBIC_FEET_TO_CUBIC_METER = 35.3147;
const DRY_VOLUME_FACTOR = 1.54;

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

// Calculate sand for area mode
export const calculateSandForArea = (
  length: number,
  width: number,
  depth: number,
  unit: Unit
): SandCalculation => {
  // Convert to feet if needed
  const lengthFt = unit === 'm' ? length * 3.28084 : length;
  const widthFt = unit === 'm' ? width * 3.28084 : width;
  const depthFt = unit === 'm' ? depth * 3.28084 : depth;
  
  // Calculate volume in cubic feet
  const volumeCubicFeet = lengthFt * widthFt * depthFt;
  
  // Convert to cubic meters
  const volumeM3 = convertToCubicMeters(volumeCubicFeet);
  
  return {
    sandRequired: volumeCubicFeet,
    sandRequiredM3: volumeM3,
    calculationType: 'area',
    unit
  };
};

// Calculate sand for concrete mix
export const calculateSandForConcrete = (
  volume: number,
  cement: number,
  sand: number,
  aggregate: number,
  unit: Unit
): SandCalculation => {
  // Convert volume to cubic meters if needed
  const volumeM3 = unit === 'ft' ? convertToCubicMeters(volume) : volume;
  
  // Calculate dry volume
  const dryVolume = volumeM3 * DRY_VOLUME_FACTOR;
  
  // Calculate total parts
  const totalParts = cement + sand + aggregate;
  
  // Calculate sand volume
  const sandVolume = (sand / totalParts) * dryVolume;
  
  // Convert to cubic feet
  const sandVolumeFt = sandVolume * CUBIC_FEET_TO_CUBIC_METER;
  
  return {
    sandRequired: sandVolumeFt,
    sandRequiredM3: sandVolume,
    calculationType: 'concrete',
    unit,
    volumeDetails: {
      wetVolume: volumeM3,
      dryVolume
    }
  };
};

// Calculate sand for plaster
export const calculateSandForPlaster = (
  area: number,
  thickness: number,
  unit: Unit
): SandCalculation => {
  // Convert area to square feet if needed
  const areaFt = unit === 'm' ? area * 10.7639 : area;
  
  // Convert thickness from inches to feet
  const thicknessFt = thickness / 12;
  
  // Calculate volume in cubic feet
  const volumeCubicFeet = areaFt * thicknessFt;
  
  // Apply sand portion estimate (typically 50% of plaster volume is sand)
  const sandVolumeFt = volumeCubicFeet * 0.5;
  
  // Convert to cubic meters
  const sandVolumeM3 = convertToCubicMeters(sandVolumeFt);
  
  return {
    sandRequired: sandVolumeFt,
    sandRequiredM3: sandVolumeM3,
    calculationType: 'plaster',
    unit
  };
};

// Mix ratio presets
export const getMixRatioPresets = (): MixRatioPreset[] => {
  return [
    {
      name: '1:2:4 (Standard)',
      cement: 1,
      sand: 2,
      aggregate: 4,
      description: 'Standard concrete mix for general construction'
    },
    {
      name: '1:1.5:3 (High Strength)',
      cement: 1,
      sand: 1.5,
      aggregate: 3,
      description: 'High strength concrete for structural elements'
    },
    {
      name: '1:3:6 (Lean Mix)',
      cement: 1,
      sand: 3,
      aggregate: 6,
      description: 'Lean concrete for foundations'
    }
  ];
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Save to history
export const saveToHistory = (calculation: SandCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 10 entries
  const trimmed = history.slice(0, 10);
  localStorage.setItem('sand-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('sand-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('sand-calculator-history');
};

// Export to text
export const exportToText = (calculation: SandCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '     SAND CALCULATION REPORT\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += `Calculation Type: ${calculation.calculationType.charAt(0).toUpperCase() + calculation.calculationType.slice(1)}\n\n`;
  
  if (calculation.volumeDetails) {
    text += 'VOLUME DETAILS:\n';
    text += '───────────────────────────────────────\n';
    text += `Wet Volume:           ${formatNumber(calculation.volumeDetails.wetVolume)} m³\n`;
    text += `Dry Volume:           ${formatNumber(calculation.volumeDetails.dryVolume)} m³\n\n`;
  }
  
  text += 'SAND REQUIRED:\n';
  text += '═══════════════════════════════════════\n';
  text += `Sand Volume:          ${formatNumber(calculation.sandRequiredM3)} m³\n`;
  text += `                      ${formatNumber(calculation.sandRequired)} cubic feet\n`;
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
