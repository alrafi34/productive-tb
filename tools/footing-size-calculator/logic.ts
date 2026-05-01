import { Unit, FootingType, FootingCalculation, CalculationHistory, FootingPreset } from './types';

// Constants
const KN_TO_LB = 224.809;
const M_TO_FT = 3.28084;
const SQM_TO_SQFT = 10.7639;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert load to kN
export const convertLoadToKN = (load: number, unit: Unit): number => {
  if (unit === 'imperial') {
    return load / KN_TO_LB;
  }
  return load;
};

// Convert bearing capacity to kN/m²
export const convertBearingCapacityToMetric = (capacity: number, unit: Unit): number => {
  if (unit === 'imperial') {
    return capacity / (KN_TO_LB / SQM_TO_SQFT);
  }
  return capacity;
};

// Convert area to display unit
export const convertArea = (areaM2: number, unit: Unit): number => {
  if (unit === 'imperial') {
    return areaM2 * SQM_TO_SQFT;
  }
  return areaM2;
};

// Convert length to display unit
export const convertLength = (lengthM: number, unit: Unit): number => {
  if (unit === 'imperial') {
    return lengthM * M_TO_FT;
  }
  return lengthM;
};

// Get footing presets
export const getFootingPresets = (): FootingPreset[] => {
  return [
    {
      name: 'Light Residential',
      load: 100,
      bearingCapacity: 100,
      description: 'Single-story residential building'
    },
    {
      name: 'Medium Residential',
      load: 200,
      bearingCapacity: 150,
      description: 'Two-story residential building'
    },
    {
      name: 'Heavy Residential',
      load: 300,
      bearingCapacity: 150,
      description: 'Multi-story residential building'
    },
    {
      name: 'Light Commercial',
      load: 500,
      bearingCapacity: 200,
      description: 'Small commercial structure'
    },
    {
      name: 'Heavy Commercial',
      load: 1000,
      bearingCapacity: 250,
      description: 'Large commercial building'
    },
    {
      name: 'Industrial',
      load: 1500,
      bearingCapacity: 300,
      description: 'Industrial facility'
    }
  ];
};

// Calculate footing size
export const calculateFootingSize = (
  load: number,
  bearingCapacity: number,
  factorOfSafety: number,
  footingType: FootingType,
  lengthWidthRatio: number,
  unit: Unit
): FootingCalculation | null => {
  
  if (isNaN(load) || isNaN(bearingCapacity) || isNaN(factorOfSafety) || 
      load <= 0 || bearingCapacity <= 0 || factorOfSafety <= 0) {
    return null;
  }

  if (footingType === 'rectangular' && (isNaN(lengthWidthRatio) || lengthWidthRatio <= 0)) {
    return null;
  }

  // Convert to metric for calculation
  const loadKN = convertLoadToKN(load, unit);
  const bearingCapacityMetric = convertBearingCapacityToMetric(bearingCapacity, unit);

  // Calculate required area
  const requiredArea = (loadKN * factorOfSafety) / bearingCapacityMetric;

  let length: number;
  let width: number;

  if (footingType === 'square') {
    // Square footing: length = width = √area
    length = Math.sqrt(requiredArea);
    width = length;
  } else {
    // Rectangular footing: given ratio = L/W
    // Area = L × W = (ratio × W) × W = ratio × W²
    // W = √(Area / ratio)
    width = Math.sqrt(requiredArea / lengthWidthRatio);
    length = width * lengthWidthRatio;
  }

  return {
    id: generateId(),
    load: loadKN,
    bearingCapacity: bearingCapacityMetric,
    factorOfSafety,
    footingType,
    lengthWidthRatio: footingType === 'rectangular' ? lengthWidthRatio : 1,
    requiredArea,
    length,
    width,
    unit,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get unit labels
export const getUnitLabels = (unit: Unit) => {
  return {
    load: unit === 'metric' ? 'kN' : 'lb',
    bearingCapacity: unit === 'metric' ? 'kN/m²' : 'lb/ft²',
    area: unit === 'metric' ? 'm²' : 'ft²',
    length: unit === 'metric' ? 'm' : 'ft'
  };
};

// Save to history
export const saveToHistory = (calculation: FootingCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('footing-size-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('footing-size-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('footing-size-calculator-history');
};

// Export to text
export const exportToText = (calculation: FootingCalculation): string => {
  const units = getUnitLabels(calculation.unit);
  
  let text = '═══════════════════════════════════════\n';
  text += '   FOOTING SIZE CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Load:                ${formatNumber(calculation.load)} ${units.load}\n`;
  text += `Bearing Capacity:    ${formatNumber(calculation.bearingCapacity)} ${units.bearingCapacity}\n`;
  text += `Factor of Safety:    ${formatNumber(calculation.factorOfSafety)}\n`;
  text += `Footing Type:        ${calculation.footingType.charAt(0).toUpperCase() + calculation.footingType.slice(1)}\n`;
  if (calculation.footingType === 'rectangular') {
    text += `Length/Width Ratio:  ${formatNumber(calculation.lengthWidthRatio)}\n`;
  }
  text += '\n';
  
  text += 'CALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Required Area:       ${formatNumber(calculation.requiredArea)} ${units.area}\n`;
  text += `Length:              ${formatNumber(calculation.length)} ${units.length}\n`;
  text += `Width:               ${formatNumber(calculation.width)} ${units.length}\n`;
  text += '\n';
  
  text += 'FORMULA:\n';
  text += '───────────────────────────────────────\n';
  text += `Area = (Load × FOS) / Bearing Capacity\n`;
  text += `Area = (${formatNumber(calculation.load)} × ${formatNumber(calculation.factorOfSafety)}) / ${formatNumber(calculation.bearingCapacity)}\n`;
  text += `Area = ${formatNumber(calculation.requiredArea)} ${units.area}\n`;
  
  if (calculation.footingType === 'square') {
    text += `\nSquare Footing:\n`;
    text += `Side = √Area = √${formatNumber(calculation.requiredArea)} = ${formatNumber(calculation.length)} ${units.length}\n`;
  } else {
    text += `\nRectangular Footing:\n`;
    text += `Width = √(Area / Ratio) = √(${formatNumber(calculation.requiredArea)} / ${formatNumber(calculation.lengthWidthRatio)}) = ${formatNumber(calculation.width)} ${units.length}\n`;
    text += `Length = Width × Ratio = ${formatNumber(calculation.width)} × ${formatNumber(calculation.lengthWidthRatio)} = ${formatNumber(calculation.length)} ${units.length}\n`;
  }
  
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Export to CSV
export const exportToCSV = (calculation: FootingCalculation): string => {
  const units = getUnitLabels(calculation.unit);
  
  let csv = 'Parameter,Value,Unit\n';
  csv += `Load,${formatNumber(calculation.load)},${units.load}\n`;
  csv += `Bearing Capacity,${formatNumber(calculation.bearingCapacity)},${units.bearingCapacity}\n`;
  csv += `Factor of Safety,${formatNumber(calculation.factorOfSafety)},-\n`;
  csv += `Footing Type,${calculation.footingType},-\n`;
  if (calculation.footingType === 'rectangular') {
    csv += `Length/Width Ratio,${formatNumber(calculation.lengthWidthRatio)},-\n`;
  }
  csv += `Required Area,${formatNumber(calculation.requiredArea)},${units.area}\n`;
  csv += `Length,${formatNumber(calculation.length)},${units.length}\n`;
  csv += `Width,${formatNumber(calculation.width)},${units.length}\n`;
  
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

// Validate footing dimensions (practical checks)
export const validateFooting = (calculation: FootingCalculation): string[] => {
  const warnings: string[] = [];
  const units = getUnitLabels(calculation.unit);
  
  // Check if footing is too small
  const minDimension = calculation.unit === 'metric' ? 0.5 : 1.64; // 0.5m or 1.64ft
  if (calculation.length < minDimension || calculation.width < minDimension) {
    warnings.push(`Footing dimensions are very small. Minimum practical size is ${minDimension} ${units.length}`);
  }
  
  // Check if footing is too large
  const maxDimension = calculation.unit === 'metric' ? 5 : 16.4; // 5m or 16.4ft
  if (calculation.length > maxDimension || calculation.width > maxDimension) {
    warnings.push(`Footing dimensions are very large. Consider using multiple footings or a raft foundation`);
  }
  
  // Check if rectangular ratio is too extreme
  if (calculation.footingType === 'rectangular' && calculation.lengthWidthRatio > 3) {
    warnings.push(`Length/Width ratio is high (${formatNumber(calculation.lengthWidthRatio)}). Consider reducing for better load distribution`);
  }
  
  // Check if factor of safety is low
  if (calculation.factorOfSafety < 1.5) {
    warnings.push(`Factor of safety is low (${formatNumber(calculation.factorOfSafety)}). Recommended minimum is 1.5`);
  }
  
  // Check if factor of safety is very high
  if (calculation.factorOfSafety > 3) {
    warnings.push(`Factor of safety is very high (${formatNumber(calculation.factorOfSafety)}). This may be over-conservative`);
  }
  
  return warnings;
};
