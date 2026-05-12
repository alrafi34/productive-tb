import {
  FrequencyUnit,
  InductanceUnit,
  CalculationInput,
  CalculationResult,
  HistoryEntry,
} from "./types";

// Unit conversion maps
const FREQUENCY_TO_HZ: Record<FrequencyUnit, number> = {
  Hz: 1,
  kHz: 1000,
  MHz: 1000000,
};

const INDUCTANCE_TO_HENRIES: Record<InductanceUnit, number> = {
  H: 1,
  mH: 1e-3,
  µH: 1e-6,
  nH: 1e-9,
};

// Convert to base units
export const toHertz = (value: number, unit: FrequencyUnit): number => {
  return value * FREQUENCY_TO_HZ[unit];
};

export const toHenries = (value: number, unit: InductanceUnit): number => {
  return value * INDUCTANCE_TO_HENRIES[unit];
};

// Format number with appropriate precision
export const formatNumber = (num: number, decimals: number = 4): string => {
  if (num === 0) return "0";
  
  const absNum = Math.abs(num);
  
  // Use scientific notation for very large or very small numbers
  if (absNum < 0.001 || absNum >= 1e6) {
    return num.toExponential(3);
  }
  
  // Otherwise use fixed decimal
  const str = num.toFixed(decimals);
  // Remove trailing zeros
  return parseFloat(str).toString();
};

// Calculate inductive reactance: XL = 2πfL
export const calculateInductiveReactance = (input: CalculationInput): CalculationResult => {
  const { frequency, frequencyUnit, inductance, inductanceUnit } = input;
  
  // Convert to base units
  const f = toHertz(frequency, frequencyUnit);
  const L = toHenries(inductance, inductanceUnit);
  
  // Calculate XL = 2πfL
  const XL = 2 * Math.PI * f * L;
  
  // Generate steps
  const steps = [
    `XL = 2πfL`,
    `XL = 2 × π × ${formatNumber(f)} Hz × ${formatNumber(L)} H`,
    `XL = 2 × ${formatNumber(Math.PI, 6)} × ${formatNumber(f)} × ${formatNumber(L)}`,
    `XL = ${formatNumber(2 * Math.PI * f * L)}`,
    `XL = ${formatNumber(XL)} Ω`,
  ];
  
  return {
    reactance: XL,
    frequency: f,
    inductance: L,
    formula: "XL = 2πfL",
    steps,
  };
};

// Validate input
export const validateInput = (input: CalculationInput): string | null => {
  const { frequency, inductance } = input;
  
  if (!frequency || frequency <= 0) {
    return "Frequency must be greater than 0";
  }
  
  if (!inductance || inductance <= 0) {
    return "Inductance must be greater than 0";
  }
  
  return null;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// History management
const HISTORY_KEY = "inductive-reactance-calculator-history";
const MAX_HISTORY = 10;

export const saveToHistory = (input: CalculationInput, result: CalculationResult): void => {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    input,
    result,
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

// Export functions
export const exportToText = (input: CalculationInput, result: CalculationResult): string => {
  let text = "Inductive Reactance Calculator Result\n";
  text += "=".repeat(40) + "\n\n";
  
  text += "Inputs:\n";
  text += `  Frequency: ${input.frequency} ${input.frequencyUnit}\n`;
  text += `  Inductance: ${input.inductance} ${input.inductanceUnit}\n\n`;
  
  text += `Formula: ${result.formula}\n\n`;
  
  text += "Steps:\n";
  result.steps.forEach((step, i) => {
    text += `  ${i + 1}. ${step}\n`;
  });
  
  text += `\nResult: ${formatNumber(result.reactance)} Ω\n`;
  
  return text;
};

export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Common presets
export const COMMON_PRESETS = [
  { label: "50 Hz, 0.1 H", frequency: 50, frequencyUnit: "Hz" as FrequencyUnit, inductance: 0.1, inductanceUnit: "H" as InductanceUnit },
  { label: "60 Hz, 0.05 H", frequency: 60, frequencyUnit: "Hz" as FrequencyUnit, inductance: 0.05, inductanceUnit: "H" as InductanceUnit },
  { label: "1 kHz, 10 mH", frequency: 1, frequencyUnit: "kHz" as FrequencyUnit, inductance: 10, inductanceUnit: "mH" as InductanceUnit },
  { label: "10 kHz, 1 mH", frequency: 10, frequencyUnit: "kHz" as FrequencyUnit, inductance: 1, inductanceUnit: "mH" as InductanceUnit },
  { label: "100 kHz, 100 µH", frequency: 100, frequencyUnit: "kHz" as FrequencyUnit, inductance: 100, inductanceUnit: "µH" as InductanceUnit },
  { label: "1 MHz, 10 µH", frequency: 1, frequencyUnit: "MHz" as FrequencyUnit, inductance: 10, inductanceUnit: "µH" as InductanceUnit },
];
