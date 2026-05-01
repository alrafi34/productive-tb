import { Unit, RoomDimensions, CalculationResult, CalculationHistory } from './types';

// Calculate room area
export function calculateRoomArea(length: number, width: number): number {
  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    return 0;
  }
  return length * width;
}

// Convert area to square feet
export function convertToSquareFeet(area: number, fromUnit: Unit): number {
  switch (fromUnit) {
    case 'ft':
      return area;
    case 'm':
      return area * 10.7639;
    case 'yd':
      return area * 9;
    case 'in':
      return area / 144;
    default:
      return area;
  }
}

// Convert area to square meters
export function convertToSquareMeters(area: number, fromUnit: Unit): number {
  switch (fromUnit) {
    case 'ft':
      return area / 10.7639;
    case 'm':
      return area;
    case 'yd':
      return area * 0.836127;
    case 'in':
      return area / 1550.0031;
    default:
      return area;
  }
}

// Convert area to square yards
export function convertToSquareYards(area: number, fromUnit: Unit): number {
  switch (fromUnit) {
    case 'ft':
      return area / 9;
    case 'm':
      return area * 1.19599;
    case 'yd':
      return area;
    case 'in':
      return area / 1296;
    default:
      return area;
  }
}

// Get all conversions
export function getAllConversions(area: number, unit: Unit) {
  return {
    sqft: convertToSquareFeet(area, unit),
    sqm: convertToSquareMeters(area, unit),
    sqyd: convertToSquareYards(area, unit)
  };
}

// Format area with unit
export function formatArea(area: number, unit: Unit, precision: number = 2): string {
  return `${area.toFixed(precision)} ${unit}²`;
}

// Get unit name
export function getUnitName(unit: Unit): string {
  switch (unit) {
    case 'ft':
      return 'square feet';
    case 'm':
      return 'square meters';
    case 'yd':
      return 'square yards';
    case 'in':
      return 'square inches';
    default:
      return '';
  }
}

// Generate unique ID
export function generateId(): string {
  return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export calculation as text
export function exportToText(result: CalculationResult): string {
  let text = 'ROOM AREA CALCULATION\n';
  text += '=====================\n\n';
  text += `Dimensions:\n`;
  text += `  Length: ${result.dimensions.length} ${result.dimensions.unit}\n`;
  text += `  Width: ${result.dimensions.width} ${result.dimensions.unit}\n\n`;
  text += `Calculated Area: ${formatArea(result.area, result.unit)}\n`;
  text += `(${getUnitName(result.unit)})\n\n`;
  text += 'Unit Conversions:\n';
  text += `  ${result.conversions.sqft.toFixed(2)} sq ft\n`;
  text += `  ${result.conversions.sqm.toFixed(2)} sq m\n`;
  text += `  ${result.conversions.sqyd.toFixed(2)} sq yd\n\n`;
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
    localStorage.setItem('room-area-calculator-history', JSON.stringify(trimmedHistory));
  } catch (e) {
    // Ignore localStorage errors
  }
}

// Get history from localStorage
export function getHistory(): CalculationHistory[] {
  try {
    const stored = localStorage.getItem('room-area-calculator-history');
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
    localStorage.removeItem('room-area-calculator-history');
  } catch (e) {
    // Ignore errors
  }
}

// Calculate tiles needed (optional feature)
export function calculateTilesNeeded(
  roomArea: number,
  tileLength: number,
  tileWidth: number,
  wastagePercent: number = 10
): number {
  if (tileLength <= 0 || tileWidth <= 0) return 0;
  
  const tileArea = tileLength * tileWidth;
  const tilesNeeded = roomArea / tileArea;
  const tilesWithWastage = tilesNeeded * (1 + wastagePercent / 100);
  
  return Math.ceil(tilesWithWastage);
}

// Calculate paint needed (optional feature)
export function calculatePaintNeeded(
  roomArea: number,
  coveragePerGallon: number = 350 // sq ft per gallon
): number {
  if (coveragePerGallon <= 0) return 0;
  return Math.ceil(roomArea / coveragePerGallon);
}
