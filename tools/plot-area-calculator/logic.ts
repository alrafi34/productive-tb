import { ShapeType, Unit, PlotDimensions, CalculationResult, CalculationHistory } from './types';

// Calculate rectangle area
export function calculateRectangleArea(length: number, width: number): number {
  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    return 0;
  }
  return length * width;
}

// Calculate square area
export function calculateSquareArea(side: number): number {
  if (isNaN(side) || side <= 0) {
    return 0;
  }
  return side * side;
}

// Calculate triangle area
export function calculateTriangleArea(base: number, height: number): number {
  if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
    return 0;
  }
  return (base * height) / 2;
}

// Calculate trapezoid area
export function calculateTrapezoidArea(top: number, bottom: number, height: number): number {
  if (isNaN(top) || isNaN(bottom) || isNaN(height) || top <= 0 || bottom <= 0 || height <= 0) {
    return 0;
  }
  return ((top + bottom) / 2) * height;
}

// Main calculation function
export function calculatePlotArea(dimensions: PlotDimensions): number {
  const { shape } = dimensions;
  
  switch (shape) {
    case 'rectangle': {
      const length = parseFloat(dimensions.length || '0');
      const width = parseFloat(dimensions.width || '0');
      return calculateRectangleArea(length, width);
    }
    case 'square': {
      const side = parseFloat(dimensions.side || '0');
      return calculateSquareArea(side);
    }
    case 'triangle': {
      const base = parseFloat(dimensions.base || '0');
      const height = parseFloat(dimensions.height || '0');
      return calculateTriangleArea(base, height);
    }
    case 'trapezoid': {
      const top = parseFloat(dimensions.topLength || '0');
      const bottom = parseFloat(dimensions.bottomLength || '0');
      const height = parseFloat(dimensions.trapezoidHeight || '0');
      return calculateTrapezoidArea(top, bottom, height);
    }
    default:
      return 0;
  }
}

// Get formula text for display
export function getFormulaText(shape: ShapeType): string {
  switch (shape) {
    case 'rectangle':
      return 'Area = Length × Width';
    case 'square':
      return 'Area = Side × Side';
    case 'triangle':
      return 'Area = (Base × Height) ÷ 2';
    case 'trapezoid':
      return 'Area = ((Top + Bottom) ÷ 2) × Height';
    default:
      return '';
  }
}

// Convert area between units
export function convertArea(area: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return area;
  
  // Convert to square meters first
  let areaInMeters = area;
  if (fromUnit === 'ft') {
    areaInMeters = area * 0.092903;
  } else if (fromUnit === 'yd') {
    areaInMeters = area * 0.836127;
  }
  
  // Convert from square meters to target unit
  if (toUnit === 'ft') {
    return areaInMeters / 0.092903;
  } else if (toUnit === 'yd') {
    return areaInMeters / 0.836127;
  }
  
  return areaInMeters;
}

// Format area with unit
export function formatArea(area: number, unit: Unit, precision: number = 2): string {
  return `${area.toFixed(precision)} ${unit}²`;
}

// Get unit name
export function getUnitName(unit: Unit): string {
  switch (unit) {
    case 'm':
      return 'square meters';
    case 'ft':
      return 'square feet';
    case 'yd':
      return 'square yards';
    default:
      return '';
  }
}

// Generate unique ID
export function generateId(): string {
  return `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export calculation as text
export function exportToText(result: CalculationResult): string {
  let text = 'PLOT AREA CALCULATION\n';
  text += '=====================\n\n';
  text += `Shape: ${result.shape.charAt(0).toUpperCase() + result.shape.slice(1)}\n`;
  text += `Formula: ${result.formula}\n\n`;
  
  text += 'Dimensions:\n';
  const dims = result.dimensions;
  
  switch (result.shape) {
    case 'rectangle':
      text += `  Length: ${dims.length} ${dims.unit}\n`;
      text += `  Width: ${dims.width} ${dims.unit}\n`;
      break;
    case 'square':
      text += `  Side: ${dims.side} ${dims.unit}\n`;
      break;
    case 'triangle':
      text += `  Base: ${dims.base} ${dims.unit}\n`;
      text += `  Height: ${dims.height} ${dims.unit}\n`;
      break;
    case 'trapezoid':
      text += `  Top Length: ${dims.topLength} ${dims.unit}\n`;
      text += `  Bottom Length: ${dims.bottomLength} ${dims.unit}\n`;
      text += `  Height: ${dims.trapezoidHeight} ${dims.unit}\n`;
      break;
  }
  
  text += `\nCalculated Area: ${formatArea(result.area, result.unit)}\n`;
  text += `(${getUnitName(result.unit)})\n\n`;
  text += 'Calculated via Productive Toolbox\n';
  
  return text;
}

// Download file helper
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Save to history (localStorage)
export function saveToHistory(result: CalculationResult): void {
  try {
    const history = getHistory();
    const newEntry: CalculationHistory = {
      id: generateId(),
      timestamp: Date.now(),
      result
    };
    
    history.unshift(newEntry);
    
    // Keep only last 10 calculations
    const trimmedHistory = history.slice(0, 10);
    localStorage.setItem('plot-area-calculator-history', JSON.stringify(trimmedHistory));
  } catch (e) {
    // Ignore localStorage errors
  }
}

// Get history from localStorage
export function getHistory(): CalculationHistory[] {
  try {
    const stored = localStorage.getItem('plot-area-calculator-history');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Ignore parse errors
  }
  return [];
}

// Clear history
export function clearHistory(): void {
  try {
    localStorage.removeItem('plot-area-calculator-history');
  } catch (e) {
    // Ignore errors
  }
}

// Get shape display name
export function getShapeDisplayName(shape: ShapeType): string {
  return shape.charAt(0).toUpperCase() + shape.slice(1);
}
