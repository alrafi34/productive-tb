import {
  FrequencyUnit,
  CapacitanceUnit,
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

const CAPACITANCE_TO_FARADS: Record<CapacitanceUnit, number> = {
  F: 1,
  mF: 1e-3,
  µF: 1e-6,
  nF: 1e-9,
  pF: 1e-12,
};

// Convert to base units
export const toHertz = (value: number, unit: FrequencyUnit): number => {
  return value * FREQUENCY_TO_HZ[unit];
};

export const toFarads = (value: number, unit: CapacitanceUnit): number => {
  return value * CAPACITANCE_TO_FARADS[unit];
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

// Calculate capacitive reactance: XC = 1 / (2πfC)
export const calculateCapacitiveReactance = (input: CalculationInput): CalculationResult => {
  const { frequency, frequencyUnit, capacitance, capacitanceUnit } = input;
  
  // Convert to base units
  const f = toHertz(frequency, frequencyUnit);
  const C = toFarads(capacitance, capacitanceUnit);
  
  // Calculate XC = 1 / (2πfC)
  const XC = 1 / (2 * Math.PI * f * C);
  
  // Generate steps
  const steps = [
    `XC = 1 / (2πfC)`,
    `XC = 1 / (2 × π × ${formatNumber(f)} Hz × ${formatNumber(C)} F)`,
    `XC = 1 / (2 × ${formatNumber(Math.PI, 6)} × ${formatNumber(f)} × ${formatNumber(C)})`,
    `XC = 1 / ${formatNumber(2 * Math.PI * f * C)}`,
    `XC = ${formatNumber(XC)} Ω`,
  ];
  
  return {
    reactance: XC,
    frequency: f,
    capacitance: C,
    formula: "XC = 1 / (2πfC)",
    steps,
  };
};

// Validate input
export const validateInput = (input: CalculationInput): string | null => {
  const { frequency, capacitance } = input;
  
  if (!frequency || frequency <= 0) {
    return "Frequency must be greater than 0";
  }
  
  if (!capacitance || capacitance <= 0) {
    return "Capacitance must be greater than 0";
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
const HISTORY_KEY = "capacitive-reactance-calculator-history";
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
  let text = "Capacitive Reactance Calculator Result\n";
  text += "=".repeat(40) + "\n\n";
  
  text += "Inputs:\n";
  text += `  Frequency: ${input.frequency} ${input.frequencyUnit}\n`;
  text += `  Capacitance: ${input.capacitance} ${input.capacitanceUnit}\n\n`;
  
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
  { label: "50 Hz, 10 µF", frequency: 50, frequencyUnit: "Hz" as FrequencyUnit, capacitance: 10, capacitanceUnit: "µF" as CapacitanceUnit },
  { label: "60 Hz, 1 µF", frequency: 60, frequencyUnit: "Hz" as FrequencyUnit, capacitance: 1, capacitanceUnit: "µF" as CapacitanceUnit },
  { label: "1 kHz, 100 nF", frequency: 1, frequencyUnit: "kHz" as FrequencyUnit, capacitance: 100, capacitanceUnit: "nF" as CapacitanceUnit },
  { label: "10 kHz, 10 nF", frequency: 10, frequencyUnit: "kHz" as FrequencyUnit, capacitance: 10, capacitanceUnit: "nF" as CapacitanceUnit },
  { label: "100 kHz, 1 nF", frequency: 100, frequencyUnit: "kHz" as FrequencyUnit, capacitance: 1, capacitanceUnit: "nF" as CapacitanceUnit },
  { label: "1 MHz, 100 pF", frequency: 1, frequencyUnit: "MHz" as FrequencyUnit, capacitance: 100, capacitanceUnit: "pF" as CapacitanceUnit },
];
