import { ColorBand, ResistorBands, ResistorResult, HistoryEntry, ColorInfo } from "./types";

const STORAGE_KEY = "resistor-color-code-history";

export const COLOR_MAP: Record<ColorBand, ColorInfo> = {
  black: { name: 'Black', hex: '#000000', digit: 0, multiplier: 1 },
  brown: { name: 'Brown', hex: '#8B4513', digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100 },
  red: { name: 'Red', hex: '#FF0000', digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50 },
  orange: { name: 'Orange', hex: '#FFA500', digit: 3, multiplier: 1000, tempCoeff: 15 },
  yellow: { name: 'Yellow', hex: '#FFFF00', digit: 4, multiplier: 10000, tempCoeff: 25 },
  green: { name: 'Green', hex: '#00FF00', digit: 5, multiplier: 100000, tolerance: 0.5 },
  blue: { name: 'Blue', hex: '#0000FF', digit: 6, multiplier: 1000000, tolerance: 0.25 },
  violet: { name: 'Violet', hex: '#9400D3', digit: 7, multiplier: 10000000, tolerance: 0.1 },
  gray: { name: 'Gray', hex: '#808080', digit: 8, multiplier: 100000000, tolerance: 0.05 },
  white: { name: 'White', hex: '#FFFFFF', digit: 9, multiplier: 1000000000 },
  gold: { name: 'Gold', hex: '#FFD700', multiplier: 0.1, tolerance: 5 },
  silver: { name: 'Silver', hex: '#C0C0C0', multiplier: 0.01, tolerance: 10 },
  none: { name: 'None', hex: '#FFFFFF', tolerance: 20 },
};

export const DIGIT_COLORS: ColorBand[] = [
  'black', 'brown', 'red', 'orange', 'yellow', 
  'green', 'blue', 'violet', 'gray', 'white'
];

export const MULTIPLIER_COLORS: ColorBand[] = [
  'black', 'brown', 'red', 'orange', 'yellow', 
  'green', 'blue', 'violet', 'gray', 'white', 'gold', 'silver'
];

export const TOLERANCE_COLORS: ColorBand[] = [
  'brown', 'red', 'green', 'blue', 'violet', 'gray', 'gold', 'silver', 'none'
];

export const TEMP_COEFF_COLORS: ColorBand[] = [
  'brown', 'red', 'orange', 'yellow'
];

export function calculateResistance(bands: ResistorBands): ResistorResult {
  const { bandCount, band1, band2, band3, multiplier, tolerance, tempCoeff } = bands;
  
  let baseValue: number;
  let steps: string[] = [];
  
  if (bandCount === 4) {
    // 4-band: digit1 + digit2 + multiplier + tolerance
    const digit1 = COLOR_MAP[band1].digit ?? 0;
    const digit2 = COLOR_MAP[band2].digit ?? 0;
    const mult = COLOR_MAP[multiplier].multiplier ?? 1;
    
    baseValue = (digit1 * 10 + digit2) * mult;
    
    steps.push(`Band 1 (${COLOR_MAP[band1].name}): ${digit1}`);
    steps.push(`Band 2 (${COLOR_MAP[band2].name}): ${digit2}`);
    steps.push(`Base value: ${digit1}${digit2} = ${digit1 * 10 + digit2}`);
    steps.push(`Multiplier (${COLOR_MAP[multiplier].name}): ×${mult}`);
    steps.push(`Resistance: ${digit1 * 10 + digit2} × ${mult} = ${baseValue} Ω`);
  } else {
    // 5-band and 6-band: digit1 + digit2 + digit3 + multiplier + tolerance (+ tempCoeff)
    const digit1 = COLOR_MAP[band1].digit ?? 0;
    const digit2 = COLOR_MAP[band2].digit ?? 0;
    const digit3 = COLOR_MAP[band3].digit ?? 0;
    const mult = COLOR_MAP[multiplier].multiplier ?? 1;
    
    baseValue = (digit1 * 100 + digit2 * 10 + digit3) * mult;
    
    steps.push(`Band 1 (${COLOR_MAP[band1].name}): ${digit1}`);
    steps.push(`Band 2 (${COLOR_MAP[band2].name}): ${digit2}`);
    steps.push(`Band 3 (${COLOR_MAP[band3].name}): ${digit3}`);
    steps.push(`Base value: ${digit1}${digit2}${digit3} = ${digit1 * 100 + digit2 * 10 + digit3}`);
    steps.push(`Multiplier (${COLOR_MAP[multiplier].name}): ×${mult}`);
    steps.push(`Resistance: ${digit1 * 100 + digit2 * 10 + digit3} × ${mult} = ${baseValue} Ω`);
  }
  
  const toleranceValue = COLOR_MAP[tolerance].tolerance ?? 20;
  const toleranceStr = `±${toleranceValue}%`;
  
  steps.push(`Tolerance (${COLOR_MAP[tolerance].name}): ${toleranceStr}`);
  
  let tempCoeffStr: string | undefined;
  if (bandCount === 6 && tempCoeff) {
    const tempCoeffValue = COLOR_MAP[tempCoeff].tempCoeff;
    tempCoeffStr = tempCoeffValue ? `${tempCoeffValue} ppm/°C` : undefined;
    if (tempCoeffStr) {
      steps.push(`Temperature Coefficient (${COLOR_MAP[tempCoeff].name}): ${tempCoeffStr}`);
    }
  }
  
  const resistanceFormatted = formatResistance(baseValue);
  const minValue = formatResistance(baseValue * (1 - toleranceValue / 100));
  const maxValue = formatResistance(baseValue * (1 + toleranceValue / 100));
  
  const formula = bandCount === 4 
    ? `R = (D1 × 10 + D2) × Multiplier`
    : `R = (D1 × 100 + D2 × 10 + D3) × Multiplier`;
  
  return {
    resistance: baseValue,
    resistanceFormatted,
    tolerance: toleranceStr,
    toleranceValue,
    tempCoeff: tempCoeffStr,
    minValue,
    maxValue,
    formula,
    steps
  };
}

export function formatResistance(ohms: number): string {
  if (ohms >= 1000000) {
    const value = ohms / 1000000;
    return `${formatNumber(value)}MΩ`;
  } else if (ohms >= 1000) {
    const value = ohms / 1000;
    return `${formatNumber(value)}kΩ`;
  } else {
    return `${formatNumber(ohms)}Ω`;
  }
}

export function formatNumber(num: number): string {
  // Remove trailing zeros after decimal point
  const str = num.toFixed(6);
  return parseFloat(str).toString();
}

export function saveToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  };
  
  history.unshift(newEntry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const filtered = history.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function exportToText(bands: ResistorBands, result: ResistorResult): string {
  let text = `Resistor Color Code Calculation\n`;
  text += `================================\n\n`;
  text += `Band Configuration: ${bands.bandCount}-band resistor\n\n`;
  text += `Colors:\n`;
  text += `  Band 1: ${COLOR_MAP[bands.band1].name}\n`;
  text += `  Band 2: ${COLOR_MAP[bands.band2].name}\n`;
  if (bands.bandCount >= 5) {
    text += `  Band 3: ${COLOR_MAP[bands.band3].name}\n`;
  }
  text += `  Multiplier: ${COLOR_MAP[bands.multiplier].name}\n`;
  text += `  Tolerance: ${COLOR_MAP[bands.tolerance].name}\n`;
  if (bands.bandCount === 6 && bands.tempCoeff) {
    text += `  Temp Coefficient: ${COLOR_MAP[bands.tempCoeff].name}\n`;
  }
  text += `\nResult:\n`;
  text += `  Resistance: ${result.resistanceFormatted}\n`;
  text += `  Tolerance: ${result.tolerance}\n`;
  text += `  Range: ${result.minValue} to ${result.maxValue}\n`;
  if (result.tempCoeff) {
    text += `  Temperature Coefficient: ${result.tempCoeff}\n`;
  }
  text += `\nFormula: ${result.formula}\n\n`;
  text += `Calculation Steps:\n`;
  result.steps.forEach((step, idx) => {
    text += `  ${idx + 1}. ${step}\n`;
  });
  
  return text;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const EXAMPLE_PRESETS = [
  {
    name: '1kΩ ±5%',
    description: 'Common pull-up resistor',
    bands: { bandCount: 4 as const, band1: 'brown' as const, band2: 'black' as const, band3: 'black' as const, multiplier: 'red' as const, tolerance: 'gold' as const }
  },
  {
    name: '10kΩ ±5%',
    description: 'Standard resistor value',
    bands: { bandCount: 4 as const, band1: 'brown' as const, band2: 'black' as const, band3: 'black' as const, multiplier: 'orange' as const, tolerance: 'gold' as const }
  },
  {
    name: '470Ω ±5%',
    description: 'LED current limiting',
    bands: { bandCount: 4 as const, band1: 'yellow' as const, band2: 'violet' as const, band3: 'black' as const, multiplier: 'brown' as const, tolerance: 'gold' as const }
  },
  {
    name: '100kΩ ±1%',
    description: 'Precision resistor',
    bands: { bandCount: 5 as const, band1: 'brown' as const, band2: 'black' as const, band3: 'black' as const, multiplier: 'orange' as const, tolerance: 'brown' as const }
  }
];

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
