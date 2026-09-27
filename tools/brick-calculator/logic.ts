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
/* Half brick = one wythe (a single layer, e.g. veneer); full brick = two */
export const getWythes = (thickness: WallThickness): number => (thickness === 'half' ? 1 : 2);

// Wall thickness in feet: the brick widths plus the collar joint between wythes
export const getWallThickness = (thickness: WallThickness, brickWidthIn = 3.625, mortarIn = 0.375): number => {
  const wythes = getWythes(thickness);
  return inchesToFeet(wythes * brickWidthIn + (wythes - 1) * mortarIn);
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
  const thicknessFt = getWallThickness(wallThickness, brickWidth, mortarThickness);
  
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
  
  // Masons count bricks by wall face: one brick plus its bed and head
  // joint covers (length + joint) × (height + joint), for each wythe
  const faceAreaFt = (brickLFt + mortarFt) * (brickHFt + mortarFt);
  let bricksNeeded = faceAreaFt > 0 ? (wallArea / faceAreaFt) * getWythes(wallThickness) : 0;
  
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
    { name: 'US Modular (7⅝×3⅝×2¼")', length: 7.625, width: 3.625, height: 2.25, unit: 'in' },
    { name: 'UK/EU (215×102.5×65 mm)', length: 8.465, width: 4.035, height: 2.559, unit: 'in' },
    { name: 'Queen (9⅝×2¾×2¾")', length: 9.625, width: 2.75, height: 2.75, unit: 'in' },
    { name: 'King (9⅝×2¾×2⅝")', length: 9.625, width: 2.75, height: 2.625, unit: 'in' },
    { name: 'Utility (11⅝×3⅝×3⅝")', length: 11.625, width: 3.625, height: 3.625, unit: 'in' },
    { name: 'Traditional (9×4½×3")', length: 9, width: 4.5, height: 3, unit: 'in' },
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
  if (typeof window === 'undefined') return [];
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
