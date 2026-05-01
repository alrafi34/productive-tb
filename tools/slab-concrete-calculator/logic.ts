import { Unit, SlabShape, SlabCalculation, CalculationHistory, ThicknessPreset } from './types';

// Constants
const CUBIC_FEET_TO_CUBIC_METER = 35.3147;
const CUBIC_YARD_TO_CUBIC_METER = 0.764555;
const FEET_TO_METER = 0.3048;
const INCH_TO_METER = 0.0254;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert dimension to meters
export const convertToMeters = (value: number, unit: Unit): number => {
  if (unit === 'ft') {
    return value * FEET_TO_METER;
  }
  return value;
};

// Convert thickness from inches to meters
export const convertInchesToMeters = (inches: number): number => {
  return inches * INCH_TO_METER;
};

// Get shape display name
export const getShapeDisplayName = (shape: SlabShape): string => {
  const names: Record<SlabShape, string> = {
    rectangular: 'Rectangular',
    circular: 'Circular',
    triangular: 'Triangular',
    lshaped: 'L-Shaped'
  };
  return names[shape];
};

// Calculate slab concrete volume
export const calculateSlabVolume = (
  shape: SlabShape,
  dimensions: any,
  unit: Unit,
  costPerUnit?: number
): SlabCalculation | null => {
  let area = 0;
  let thicknessM = 0;
  let dimensionsStr = '';
  
  if (shape === 'rectangular') {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const thickness = parseFloat(dimensions.thickness);
    
    if (isNaN(length) || isNaN(width) || isNaN(thickness) || 
        length <= 0 || width <= 0 || thickness <= 0) {
      return null;
    }
    
    const lengthM = convertToMeters(length, unit);
    const widthM = convertToMeters(width, unit);
    thicknessM = convertToMeters(thickness, unit);
    
    area = lengthM * widthM;
    dimensionsStr = `${length} × ${width} × ${thickness} ${unit}`;
    
  } else if (shape === 'circular') {
    const radius = parseFloat(dimensions.radius);
    const thickness = parseFloat(dimensions.thickness);
    
    if (isNaN(radius) || isNaN(thickness) || radius <= 0 || thickness <= 0) {
      return null;
    }
    
    const radiusM = convertToMeters(radius, unit);
    thicknessM = convertToMeters(thickness, unit);
    
    area = Math.PI * Math.pow(radiusM, 2);
    dimensionsStr = `r=${radius} ${unit}, t=${thickness} ${unit}`;
    
  } else if (shape === 'triangular') {
    const base = parseFloat(dimensions.base);
    const height = parseFloat(dimensions.height);
    const thickness = parseFloat(dimensions.thickness);
    
    if (isNaN(base) || isNaN(height) || isNaN(thickness) || 
        base <= 0 || height <= 0 || thickness <= 0) {
      return null;
    }
    
    const baseM = convertToMeters(base, unit);
    const heightM = convertToMeters(height, unit);
    thicknessM = convertToMeters(thickness, unit);
    
    area = (baseM * heightM) / 2;
    dimensionsStr = `base=${base} ${unit}, h=${height} ${unit}, t=${thickness} ${unit}`;
    
  } else if (shape === 'lshaped') {
    const length1 = parseFloat(dimensions.length1);
    const width1 = parseFloat(dimensions.width1);
    const length2 = parseFloat(dimensions.length2);
    const width2 = parseFloat(dimensions.width2);
    const thickness = parseFloat(dimensions.thickness);
    
    if (isNaN(length1) || isNaN(width1) || isNaN(length2) || isNaN(width2) || isNaN(thickness) ||
        length1 <= 0 || width1 <= 0 || length2 <= 0 || width2 <= 0 || thickness <= 0) {
      return null;
    }
    
    const length1M = convertToMeters(length1, unit);
    const width1M = convertToMeters(width1, unit);
    const length2M = convertToMeters(length2, unit);
    const width2M = convertToMeters(width2, unit);
    thicknessM = convertToMeters(thickness, unit);
    
    area = (length1M * width1M) + (length2M * width2M);
    dimensionsStr = `(${length1}×${width1}) + (${length2}×${width2}) ${unit}, t=${thickness} ${unit}`;
  }
  
  if (area === 0 || thicknessM === 0) {
    return null;
  }
  
  // Calculate volume in cubic meters
  const volumeM3 = area * thicknessM;
  
  // Convert to other units
  const volumeFt3 = volumeM3 * CUBIC_FEET_TO_CUBIC_METER;
  const volumeYd3 = volumeM3 / CUBIC_YARD_TO_CUBIC_METER;
  
  // Calculate cost if provided
  let totalCost: number | undefined;
  if (costPerUnit && costPerUnit > 0) {
    totalCost = volumeM3 * costPerUnit;
  }
  
  return {
    id: generateId(),
    shape,
    dimensions: dimensionsStr,
    volumeM3,
    volumeFt3,
    volumeYd3,
    area,
    unit,
    costPerUnit,
    totalCost,
    timestamp: Date.now()
  };
};

// Thickness presets
export const getThicknessPresets = (): ThicknessPreset[] => {
  return [
    {
      name: '4 inches',
      value: 4,
      unit: 'in',
      description: 'Standard residential slab'
    },
    {
      name: '6 inches',
      value: 6,
      unit: 'in',
      description: 'Heavy-duty residential/commercial'
    },
    {
      name: '8 inches',
      value: 8,
      unit: 'in',
      description: 'Industrial/warehouse slab'
    },
    {
      name: '10 cm',
      value: 0.1,
      unit: 'm',
      description: 'Standard metric slab'
    },
    {
      name: '15 cm',
      value: 0.15,
      unit: 'm',
      description: 'Heavy-duty metric slab'
    },
    {
      name: '20 cm',
      value: 0.2,
      unit: 'm',
      description: 'Industrial metric slab'
    }
  ];
};

// Format number
export const formatNumber = (num: number, decimals: number = 3): string => {
  return num.toFixed(decimals);
};

// Save to history
export const saveToHistory = (calculation: SlabCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('slab-concrete-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('slab-concrete-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('slab-concrete-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: SlabCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Shape,${getShapeDisplayName(calculation.shape)},-\n`;
  csv += `Dimensions,"${calculation.dimensions}",-\n`;
  csv += `Area,${formatNumber(calculation.area)},m²\n`;
  csv += `Volume,${formatNumber(calculation.volumeM3)},m³\n`;
  csv += `Volume,${formatNumber(calculation.volumeFt3)},ft³\n`;
  csv += `Volume,${formatNumber(calculation.volumeYd3)},yd³\n`;
  
  if (calculation.totalCost) {
    csv += `Total Cost,${formatNumber(calculation.totalCost, 2)},currency\n`;
  }
  
  return csv;
};

// Export to text
export const exportToText = (calculation: SlabCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   SLAB CONCRETE CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'SLAB DETAILS:\n';
  text += '───────────────────────────────────────\n';
  text += `Shape:            ${getShapeDisplayName(calculation.shape)}\n`;
  text += `Dimensions:       ${calculation.dimensions}\n`;
  text += `Area:             ${formatNumber(calculation.area)} m²\n\n`;
  
  text += 'CONCRETE VOLUME REQUIRED:\n';
  text += '═══════════════════════════════════════\n';
  text += `Cubic Meters:     ${formatNumber(calculation.volumeM3)} m³\n`;
  text += `Cubic Feet:       ${formatNumber(calculation.volumeFt3)} ft³\n`;
  text += `Cubic Yards:      ${formatNumber(calculation.volumeYd3)} yd³\n`;
  
  if (calculation.totalCost) {
    text += '\n';
    text += 'COST ESTIMATION:\n';
    text += '───────────────────────────────────────\n';
    text += `Cost per m³:      ${formatNumber(calculation.costPerUnit || 0, 2)}\n`;
    text += `Total Cost:       ${formatNumber(calculation.totalCost, 2)}\n`;
  }
  
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
