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

  // Desired spacing is a maximum: round the bar count up so the actual
  // spacing never exceeds it. (Rounding down under-reinforced the section:
  // 1000 mm at 300 mm gave 4 bars at 333 mm.) The epsilon keeps exact
  // divisions such as 900 / 300 from gaining a bar through float error.
  const calculatedBars = Math.ceil(effectiveWidth / spacingMm - 1e-9) + 1;

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

// ACI 318-19 limits, in mm
const ACI_MIN_CLEAR_MM = 25.4;          // 25.2.1: at least 1 in
const ACI_MAX_SLAB_SPACING_MM = 457.2;  // 7.7.2.3 / 24.4.3.3: at most 18 in (slabs)
export const DEFAULT_AGGREGATE_MM = 19.05; // 3/4 in, the common US maximum aggregate

/** ACI 318-19 25.2.1: minimum clear spacing between parallel bars in a layer. */
export const aciMinClearSpacing = (barDiameterMm: number, aggregateMm: number): number =>
  Math.max(ACI_MIN_CLEAR_MM, barDiameterMm, (4 / 3) * aggregateMm);

// Check spacing against ACI 318 (all inputs in mm; messages in the user's unit)
export const checkSpacingValidity = (
  clearSpacing: number,
  barDiameter: number,
  centerSpacing: number,
  aggregateMm: number,
  unit: Unit
): {
  isValid: boolean;
  warning?: string;
} => {
  const show = (mm: number) => `${formatNumber(convertFromMm(mm, unit))} ${unit === 'inch' ? 'in' : 'mm'}`;
  const minClear = aciMinClearSpacing(barDiameter, aggregateMm);

  if (clearSpacing < minClear) {
    return {
      isValid: false,
      warning: `Clear spacing (${show(clearSpacing)}) is below the ACI 318 minimum of ${show(minClear)} — the largest of 1 in, the bar diameter and 4/3 × max aggregate size.`
    };
  }

  if (centerSpacing > ACI_MAX_SLAB_SPACING_MM) {
    return {
      isValid: true,
      warning: `Center spacing (${show(centerSpacing)}) exceeds 18 in — the ACI 318 maximum for slab flexural and shrinkage/temperature reinforcement (also limited to 3h and 5h). Check the limit for your member type.`
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
  if (typeof window === 'undefined') return [];
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
  const u = calculation.unit === 'inch' ? 'in' : 'mm';
  const f = (mm: number) => `${formatNumber(convertFromMm(mm, calculation.unit))} ${u}`;
  let text = '═══════════════════════════════════════\n';
  text += '   REBAR SPACING CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Total Width:      ${f(calculation.width)}\n`;
  text += `Bar Diameter:     ${f(calculation.barDiameter)}\n`;
  text += `Clear Cover:      ${f(calculation.clearCover)}\n`;
  
  if (calculation.mode === 'spacing') {
    text += `Number of Bars:   ${calculation.numberOfBars}\n\n`;
  } else {
    text += `Desired Spacing:  ${f(calculation.desiredSpacing!)} (maximum)\n\n`;
  }
  
  text += 'CALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Effective Width:  ${f(calculation.effectiveWidth)}\n`;
  
  if (calculation.mode === 'spacing') {
    text += `Center-to-Center: ${f(calculation.spacing!)}\n`;
    text += `Clear Spacing:    ${f(calculation.clearSpacing!)}\n`;
  } else {
    text += `Bars Required:    ${calculation.calculatedBars}\n`;
    text += `Actual Spacing:   ${f(calculation.spacing!)}\n`;
    text += `Clear Spacing:    ${f(calculation.clearSpacing!)}\n`;
  }
  
  text += '\nFORMULA USED:\n';
  text += '───────────────────────────────────────\n';
  text += 'Effective Width = Total Width - (2 × Cover)\n';
  
  if (calculation.mode === 'spacing') {
    text += 'Spacing = Effective Width / (Bars - 1)\n';
  } else {
    text += 'Number of Bars = ceil(Effective Width / Max Spacing) + 1\n';
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
