import { Unit, TileCalculation, CalculationHistory, TilePreset } from './types';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to square feet (base unit for calculation)
export const convertToSquareFeet = (value: number, unit: Unit): number => {
  switch (unit) {
    case 'ft':
      return value;
    case 'm':
      return value * 10.7639;
    case 'cm':
      return value * 0.00107639;
    case 'in':
      return value * 0.00694444;
    default:
      return value;
  }
};

// Calculate room area
export const calculateRoomArea = (length: number, width: number): number => {
  return length * width;
};

// Calculate tile area
export const calculateTileArea = (length: number, width: number): number => {
  return length * width;
};

// Calculate tiles needed
export const calculateTilesNeeded = (
  roomArea: number,
  tileArea: number,
  wastePercentage: number
): TileCalculation => {
  const tilesNeeded = roomArea / tileArea;
  const tilesWithWaste = tilesNeeded * (1 + wastePercentage / 100);
  
  return {
    totalArea: roomArea,
    tileArea,
    tilesNeeded: Math.ceil(tilesNeeded),
    tilesWithWaste: Math.ceil(tilesWithWaste),
    wastePercentage,
    unit: 'ft' // Base unit
  };
};

// Tile presets
export const getTilePresets = (): TilePreset[] => {
  return [
    { name: '12" × 12"', length: 12, width: 12, unit: 'in' },
    { name: '18" × 18"', length: 18, width: 18, unit: 'in' },
    { name: '24" × 24"', length: 24, width: 24, unit: 'in' },
    { name: '1\' × 1\'', length: 1, width: 1, unit: 'ft' },
    { name: '2\' × 2\'', length: 2, width: 2, unit: 'ft' },
    { name: '30cm × 30cm', length: 30, width: 30, unit: 'cm' },
    { name: '50cm × 50cm', length: 50, width: 50, unit: 'cm' },
    { name: '60cm × 60cm', length: 60, width: 60, unit: 'cm' },
  ];
};

// Format area with unit
export const formatArea = (area: number, unit: Unit): string => {
  return `${area.toFixed(2)} ${unit}²`;
};

// Get unit name
export const getUnitName = (unit: Unit): string => {
  const names: Record<Unit, string> = {
    ft: 'Square Feet',
    m: 'Square Meters',
    cm: 'Square Centimeters',
    in: 'Square Inches'
  };
  return names[unit];
};

// Save to history
export const saveToHistory = (calculation: TileCalculation, mode: string): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation,
    mode: mode as any
  };
  
  history.unshift(entry);
  
  // Keep only last 10 entries
  const trimmed = history.slice(0, 10);
  localStorage.setItem('tile-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('tile-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('tile-calculator-history');
};

// Export to text
export const exportToText = (calculation: TileCalculation, mode: string): string => {
  let text = '═══════════════════════════════════════\n';
  text += '     TILE QUANTITY CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += `Calculation Mode: ${mode === 'dimension' ? 'Room Dimensions' : 'Custom Area'}\n\n`;
  
  text += 'DETAILS:\n';
  text += '───────────────────────────────────────\n';
  text += `Total Area:           ${calculation.totalArea.toFixed(2)} sq ft\n`;
  text += `Tile Area:            ${calculation.tileArea.toFixed(4)} sq ft\n`;
  text += `Waste Percentage:     ${calculation.wastePercentage}%\n\n`;
  
  text += 'RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Tiles Needed:         ${calculation.tilesNeeded} tiles\n`;
  text += `With Waste (${calculation.wastePercentage}%):      ${calculation.tilesWithWaste} tiles\n`;
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
