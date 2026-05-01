import { Unit, PaintCalculation, CalculationHistory } from './types';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate wall area from room dimensions
export const calculateRoomWallArea = (length: number, width: number, height: number): number => {
  return 2 * (length + width) * height;
};

// Calculate paint required
export const calculatePaintRequired = (
  area: number,
  openingsArea: number,
  coats: number,
  coverage: number
): number => {
  const netArea = Math.max(0, area - openingsArea);
  return (netArea * coats) / coverage;
};

// Round up to nearest 0.5 or 1
export const roundPaintAmount = (amount: number): number => {
  if (amount <= 1) {
    return Math.ceil(amount * 2) / 2; // Round to nearest 0.5
  }
  return Math.ceil(amount);
};

// Format paint amount
export const formatPaintAmount = (amount: number, unit: Unit): string => {
  return `${amount.toFixed(2)} liters`;
};

// Get default coverage based on unit
export const getDefaultCoverage = (unit: Unit): number => {
  return unit === 'ft' ? 350 : 32.5; // 350 sq ft/liter or 32.5 sq m/liter
};

// Convert area between units
export const convertArea = (area: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit === toUnit) return area;
  
  if (fromUnit === 'ft' && toUnit === 'm') {
    return area / 10.7639; // sq ft to sq m
  } else if (fromUnit === 'm' && toUnit === 'ft') {
    return area * 10.7639; // sq m to sq ft
  }
  
  return area;
};

// Save to history
export const saveToHistory = (calculation: PaintCalculation, mode: string): void => {
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
  localStorage.setItem('paint-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('paint-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('paint-calculator-history');
};

// Export to text
export const exportToText = (calculation: PaintCalculation, mode: string): string => {
  let text = '═══════════════════════════════════════\n';
  text += '     PAINT CALCULATION REPORT\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += `Calculation Mode: ${mode === 'room' ? 'Room Dimensions' : 'Custom Area'}\n\n`;
  
  text += 'DETAILS:\n';
  text += '───────────────────────────────────────\n';
  text += `Total Wall Area:      ${calculation.totalArea.toFixed(2)} ${calculation.unit}²\n`;
  text += `Openings Area:        ${calculation.openingsArea.toFixed(2)} ${calculation.unit}²\n`;
  text += `Net Paintable Area:   ${calculation.netArea.toFixed(2)} ${calculation.unit}²\n`;
  text += `Number of Coats:      ${calculation.coats}\n`;
  text += `Coverage per Liter:   ${calculation.coverage.toFixed(0)} ${calculation.unit}²\n\n`;
  
  text += 'RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Paint Required:       ${calculation.paintRequired.toFixed(2)} liters\n`;
  text += `Recommended Purchase: ${calculation.recommendedPurchase} liters\n`;
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

// Get unit name
export const getUnitName = (unit: Unit): string => {
  return unit === 'ft' ? 'Square Feet' : 'Square Meters';
};
