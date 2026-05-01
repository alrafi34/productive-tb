import { CalculationMode, Unit, SpacingCalculation, CalculationHistory } from './types';

// Constants
const MM_TO_INCH = 0.0393701;
const INCH_TO_MM = 25.4;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to mm
export const convertToMm = (value: number, unit: Unit): number => {
  if (unit === 'inch') {
    return value * INCH_TO_MM;
  }
  return value;
};

// Convert from mm
export const convertFromMm = (value: number, unit: Unit): number => {
  if (unit === 'inch') {
    return value * MM_TO_INCH;
  }
  return value;
};

// Calculate spacing between bars
export const calculateSpacing = (
  width: number,
  numberOfBars: number,
  barDiameter: number,
  clearCover: number,
  unit: Unit
): SpacingCalculation | null => {
  
  if (isNaN(width) || isNaN(numberOfBars) || isNaN(barDiameter) || isNaN(clearCover) ||
      width <= 0 || numberOfBars < 2 || barDiameter <= 0 || clearCover < 0) {
    return null;
  }

  // Convert all to mm for calculation
  const widthMm = convertToMm(width, unit);
  const diameterMm = convertToMm(barDiameter, unit);
  const coverMm = convertToMm(clearCover, unit);

  // Calculate effective width (total width minus covers on both sides)
  const effectiveWidth = widthMm - (2 * coverMm);

  if (effectiveWidth <= 0) {
    return null;
  }

  // Calculate center-to-center spacing
  const spacing = effectiveWidth / (numberOfBars - 1);

  // Calculate clear spacing (spacing between bar surfaces)
  const clearSpacing = spacing - diameterMm;

  if (clearSpacing < 0) {
    return null;
  }

  return {
    id: generateId(),
    mode: 'spacing',
    width: widthMm,
    numberOfBars,
    barDiameter: diameterMm,
    clearCover: coverMm,
    effectiveWidth,
    spacing,
    clearSpacing,
    unit,
    timestamp: Date.now()
  };
};

// Calculate number of bars needed
export const calculateNumberOfBars = (
  width: number,
  desiredSpacing: number,
  barDiameter: number,
  clearCover: number,
  unit: Unit
): SpacingCalculation | null => {
  
  if (isNaN(width) || isNaN(desiredSpacing) || isNaN(barDiameter) || isNaN(clearCover) ||
      width <= 0 || desiredSpacing <= 0 || barDiameter <= 0 || clearCover < 0) {
    return null;
  }

  // Convert all to mm for calculation
  const widthMm = convertToMm(width, unit);
  const spacingMm = convertToMm(desiredSpacing, unit);
  const diameterMm = convertToMm(barDiameter, unit);
  const coverMm = convertToMm(clearCover, unit);

  // Calculate effective width
  const effectiveWidth = widthMm - (2 * coverMm);

  if (effectiveWidth <= 0) {
    return null;
  }

  // Calculate number of bars
  const calculatedBars = Math.floor(effectiveWidth / spacingMm) + 1;

  // Calculate actual spacing achieved
  const actualSpacing = effectiveWidth / (calculatedBars - 1);
  const clearSpacing = actualSpacing - diameterMm;

  return {
    id: generateId(),
    mode: 'bars',
    width: widthMm,
    desiredSpacing: spacingMm,
    calculatedBars,
    barDiameter: diameterMm,
    clearCover: coverMm,
    effectiveWidth,
    spacing: actualSpacing,
    clearSpacing,
    unit,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Check if spacing meets minimum requirements
export const checkSpacingValidity = (clearSpacing: number, barDiameter: number): {
  isValid: boolean;
  warning?: string;
} => {
  // Minimum clear spacing should be at least 1x bar diameter (common rule)
  const minSpacing = barDiameter;
  
  if (clearSpacing < minSpacing) {
    return {
      isValid: false,
      warning: `Clear spacing (${formatNumber(clearSpacing)} mm) is less than minimum recommended (${formatNumber(minSpacing)} mm)`
    };
  }
  
  // Warn if spacing is very tight (less than 1.5x diameter)
  if (clearSpacing < barDiameter * 1.5) {
    return {
      isValid: true,
      warning: `Spacing is tight. Consider reducing bar count or increasing width.`
    };
  }
  
  return { isValid: true };
};

// Save to history
export const saveToHistory = (calculation: SpacingCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('rebar-spacing-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('rebar-spacing-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('rebar-spacing-calculator-history');
};

// Export to text
export const exportToText = (calculation: SpacingCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   REBAR SPACING CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Total Width:      ${formatNumber(calculation.width)} mm\n`;
  text += `Bar Diameter:     ${formatNumber(calculation.barDiameter)} mm\n`;
  text += `Clear Cover:      ${formatNumber(calculation.clearCover)} mm\n`;
  
  if (calculation.mode === 'spacing') {
    text += `Number of Bars:   ${calculation.numberOfBars}\n\n`;
  } else {
    text += `Desired Spacing:  ${formatNumber(calculation.desiredSpacing!)} mm\n\n`;
  }
  
  text += 'CALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Effective Width:  ${formatNumber(calculation.effectiveWidth)} mm\n`;
  
  if (calculation.mode === 'spacing') {
    text += `Center-to-Center: ${formatNumber(calculation.spacing!)} mm\n`;
    text += `Clear Spacing:    ${formatNumber(calculation.clearSpacing!)} mm\n`;
  } else {
    text += `Bars Required:    ${calculation.calculatedBars}\n`;
    text += `Actual Spacing:   ${formatNumber(calculation.spacing!)} mm\n`;
    text += `Clear Spacing:    ${formatNumber(calculation.clearSpacing!)} mm\n`;
  }
  
  text += '\nFORMULA USED:\n';
  text += '───────────────────────────────────────\n';
  text += 'Effective Width = Total Width - (2 × Cover)\n';
  
  if (calculation.mode === 'spacing') {
    text += 'Spacing = Effective Width / (Bars - 1)\n';
  } else {
    text += 'Number of Bars = floor(Effective Width / Spacing) + 1\n';
  }
  
  text += 'Clear Spacing = Spacing - Bar Diameter\n';
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
