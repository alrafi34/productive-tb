import { Unit, RoomShape, RoomDimensions, CalculationResult, CalculationHistory, RoomPreset } from './types';

// Calculate rectangular room volume
export function calculateRectangularVolume(length: number, width: number, height: number): number {
  if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
    return 0;
  }
  return length * width * height;
}

// Calculate cylindrical room volume
export function calculateCylindricalVolume(radius: number, height: number): number {
  if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) {
    return 0;
  }
  return Math.PI * radius * radius * height;
}

// Calculate triangular ceiling room volume
export function calculateTriangularVolume(
  length: number,
  width: number,
  wallHeight: number,
  peakHeight: number
): number {
  if (isNaN(length) || isNaN(width) || isNaN(wallHeight) || isNaN(peakHeight) ||
      length <= 0 || width <= 0 || wallHeight <= 0 || peakHeight <= 0) {
    return 0;
  }
  // Volume = length × width × (wallHeight + peakHeight) / 2
  return length * width * ((wallHeight + peakHeight) / 2);
}

// Main calculation function
export function calculateRoomVolume(dimensions: RoomDimensions): number {
  const { shape } = dimensions;
  
  switch (shape) {
    case 'rectangular': {
      const length = parseFloat(dimensions.length || '0');
      const width = parseFloat(dimensions.width || '0');
      const height = parseFloat(dimensions.height || '0');
      return calculateRectangularVolume(length, width, height);
    }
    case 'cylindrical': {
      const radius = parseFloat(dimensions.radius || '0');
      const height = parseFloat(dimensions.cylinderHeight || '0');
      return calculateCylindricalVolume(radius, height);
    }
    case 'triangular': {
      const length = parseFloat(dimensions.triangleLength || '0');
      const width = parseFloat(dimensions.triangleWidth || '0');
      const wallHeight = parseFloat(dimensions.wallHeight || '0');
      const peakHeight = parseFloat(dimensions.peakHeight || '0');
      return calculateTriangularVolume(length, width, wallHeight, peakHeight);
    }
    default:
      return 0;
  }
}

// Convert volume to cubic meters
export function convertToCubicMeters(volume: number, fromUnit: Unit): number {
  if (fromUnit === 'm') return volume;
  // ft³ to m³
  return volume * 0.0283168;
}

// Convert volume to cubic feet
export function convertToCubicFeet(volume: number, fromUnit: Unit): number {
  if (fromUnit === 'ft') return volume;
  // m³ to ft³
  return volume * 35.3147;
}

// Convert volume to liters
export function convertToLiters(volume: number, fromUnit: Unit): number {
  const cubicMeters = convertToCubicMeters(volume, fromUnit);
  return cubicMeters * 1000;
}

// Get all conversions
export function getAllConversions(volume: number, unit: Unit) {
  return {
    cubicMeters: convertToCubicMeters(volume, unit),
    cubicFeet: convertToCubicFeet(volume, unit),
    liters: convertToLiters(volume, unit)
  };
}

// Format volume with unit
export function formatVolume(volume: number, unit: Unit, precision: number = 2): string {
  return `${volume.toFixed(precision)} ${unit}³`;
}

// Get shape display name
export function getShapeDisplayName(shape: RoomShape): string {
  switch (shape) {
    case 'rectangular':
      return 'Rectangular Room';
    case 'cylindrical':
      return 'Cylindrical Room';
    case 'triangular':
      return 'Triangular/Attic Room';
    case 'custom':
      return 'Custom Room';
    default:
      return '';
  }
}

// Room presets
export const ROOM_PRESETS: RoomPreset[] = [
  { name: 'Small Bedroom', length: 3, width: 3, height: 2.5 },
  { name: 'Master Bedroom', length: 5, width: 4, height: 2.7 },
  { name: 'Living Room', length: 6, width: 5, height: 2.7 },
  { name: 'Office', length: 4, width: 3.5, height: 2.5 },
  { name: 'Kitchen', length: 4, width: 3, height: 2.5 },
  { name: 'Bathroom', length: 2.5, width: 2, height: 2.5 },
  { name: 'Hall', length: 8, width: 3, height: 2.7 },
];

// Generate unique ID
export function generateId(): string {
  return `vol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export calculation as text
export function exportToText(result: CalculationResult): string {
  let text = 'ROOM VOLUME CALCULATION\n';
  text += '=======================\n\n';
  text += `Room Type: ${getShapeDisplayName(result.shape)}\n\n`;
  
  text += 'Dimensions:\n';
  const dims = result.dimensions;
  
  switch (result.shape) {
    case 'rectangular':
      text += `  Length: ${dims.length} ${dims.unit}\n`;
      text += `  Width: ${dims.width} ${dims.unit}\n`;
      text += `  Height: ${dims.height} ${dims.unit}\n`;
      break;
    case 'cylindrical':
      text += `  Radius: ${dims.radius} ${dims.unit}\n`;
      text += `  Height: ${dims.cylinderHeight} ${dims.unit}\n`;
      break;
    case 'triangular':
      text += `  Length: ${dims.triangleLength} ${dims.unit}\n`;
      text += `  Width: ${dims.triangleWidth} ${dims.unit}\n`;
      text += `  Wall Height: ${dims.wallHeight} ${dims.unit}\n`;
      text += `  Peak Height: ${dims.peakHeight} ${dims.unit}\n`;
      break;
  }
  
  text += `\nCalculated Volume: ${formatVolume(result.volume, result.unit)}\n\n`;
  text += 'Unit Conversions:\n';
  text += `  ${result.conversions.cubicMeters.toFixed(2)} m³\n`;
  text += `  ${result.conversions.cubicFeet.toFixed(2)} ft³\n`;
  text += `  ${result.conversions.liters.toFixed(2)} liters\n\n`;
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
    localStorage.setItem('room-volume-calculator-history', JSON.stringify(trimmedHistory));
  } catch (e) {
    // Ignore localStorage errors
  }
}

// Get history from localStorage
export function getHistory(): CalculationHistory[] {
  try {
    const stored = localStorage.getItem('room-volume-calculator-history');
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
    localStorage.removeItem('room-volume-calculator-history');
  } catch (e) {
    // Ignore errors
  }
}

// Calculate air changes per hour (HVAC helper)
export function calculateACH(volumeCubicMeters: number, airflowCFM: number): number {
  if (volumeCubicMeters <= 0 || airflowCFM <= 0) return 0;
  const volumeCubicFeet = volumeCubicMeters * 35.3147;
  return (airflowCFM * 60) / volumeCubicFeet;
}

// Calculate air purifier size recommendation
export function recommendAirPurifierCADR(volumeCubicFeet: number): number {
  // CADR should be at least 2/3 of room volume for effective purification
  return Math.ceil((volumeCubicFeet * 2) / 3);
}
