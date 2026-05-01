import { Unit, WallThickness, BrickCalculation, CalculationHistory, BrickPreset } from './types';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to feet (base unit)
export const convertToFeet = (value: number, unit: Unit): number => {
  if (unit === 'm') {
    return value * 3.28084;
  }
  return value;
};

// Convert inches to feet
export const inchesToFeet = (inches: number): number => {
  return inches / 12;
};

// Get wall thickness in feet
export const getWallThickness = (thickness: WallThickness): number => {
  return thickness === 'half' ? inchesToFeet(4.5) : inchesToFeet(9);
};

// Calculate wall volume
export const calculateWallVolume = (
  length: number,
  height: number,
  thickness: number
): number => {
  return length * height * thickness;
};

// Calculate brick volume (including mortar)
export const calculateBrickVolume = (
  length: number,
  width: number,
  height: number,
  mortarThickness: number
): number => {
  const l = length + mortarThickness;
  const w = width + mortarThickness;
  const h = height + mortarThickness;
  return l * w * h;
};

// Calculate bricks needed
export const calculateBricksNeeded = (
  wallLength: number,
  wallHeight: number,
  wallThickness: WallThickness,
  brickLength: number,
  brickWidth: number,
  brickHeight: number,
  mortarThickness: number,
  openingsArea: number,
  wastagePercentage: number,
  unit: Unit
): BrickCalculation => {
  // Convert all to feet
  const lengthFt = convertToFeet(wallLength, unit);
  const heightFt = convertToFeet(wallHeight, unit);
  const thicknessFt = getWallThickness(wallThickness);
  
  // Convert brick dimensions from inches to feet
  const brickLFt = inchesToFeet(brickLength);
  const brickWFt = inchesToFeet(brickWidth);
  const brickHFt = inchesToFeet(brickHeight);
  const mortarFt = inchesToFeet(mortarThickness);
  
  // Calculate volumes
  const wallVolume = calculateWallVolume(lengthFt, heightFt, thicknessFt);
  const brickVolume = calculateBrickVolume(brickLFt, brickWFt, brickHFt, mortarFt);
  
  // Calculate wall area
  const wallArea = lengthFt * heightFt;
  
  // Convert openings to square feet if needed
  const openingsAreaFt = convertToFeet(openingsArea, unit) * convertToFeet(1, unit);
  
  // Calculate bricks
  let bricksNeeded = wallVolume / brickVolume;
  
  // Subtract openings (proportional to wall area)
  if (openingsAreaFt > 0 && wallArea > 0) {
    const openingRatio = openingsAreaFt / wallArea;
    bricksNeeded = bricksNeeded * (1 - openingRatio);
  }
  
  // Add wastage
  const bricksWithWastage = bricksNeeded * (1 + wastagePercentage / 100);
  
  return {
    wallArea: unit === 'ft' ? wallArea : wallArea / 10.7639,
    wallVolume: unit === 'ft' ? wallVolume : wallVolume / 35.3147,
    brickVolume,
    bricksNeeded: Math.ceil(bricksNeeded),
    bricksWithWastage: Math.ceil(bricksWithWastage),
    wastagePercentage,
    openingsArea: openingsAreaFt,
    unit
  };
};

// Brick presets
export const getBrickPresets = (): BrickPreset[] => {
  return [
    { name: 'Standard (9×4.5×3")', length: 9, width: 4.5, height: 3, unit: 'in' },
    { name: 'Modular (7.6×3.6×2.3")', length: 7.6, width: 3.6, height: 2.3, unit: 'in' },
    { name: 'Queen (9.6×2.8×2.8")', length: 9.6, width: 2.8, height: 2.8, unit: 'in' },
    { name: 'King (9.6×2.8×3.2")', length: 9.6, width: 2.8, height: 3.2, unit: 'in' },
    { name: 'Utility (11.6×3.6×3.6")', length: 11.6, width: 3.6, height: 3.6, unit: 'in' },
  ];
};

// Format number
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// Get unit name
export const getUnitName = (unit: Unit): string => {
  return unit === 'ft' ? 'Square Feet' : 'Square Meters';
};

// Save to history
export const saveToHistory = (calculation: BrickCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 10 entries
  const trimmed = history.slice(0, 10);
  localStorage.setItem('brick-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('brick-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('brick-calculator-history');
};

// Export to text
export const exportToText = (calculation: BrickCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '     BRICK CALCULATION REPORT\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'WALL DETAILS:\n';
  text += '───────────────────────────────────────\n';
  text += `Wall Area:            ${calculation.wallArea.toFixed(2)} ${calculation.unit}²\n`;
  text += `Wall Volume:          ${calculation.wallVolume.toFixed(2)} ${calculation.unit}³\n`;
  text += `Openings Area:        ${calculation.openingsArea.toFixed(2)} sq ft\n`;
  text += `Wastage Percentage:   ${calculation.wastagePercentage}%\n\n`;
  
  text += 'RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Bricks Needed:        ${formatNumber(calculation.bricksNeeded)} bricks\n`;
  text += `With Wastage (${calculation.wastagePercentage}%):    ${formatNumber(calculation.bricksWithWastage)} bricks\n`;
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
