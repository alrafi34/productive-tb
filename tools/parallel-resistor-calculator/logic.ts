import { Resistor, ResistanceUnit, CalculationResult, HistoryEntry } from "./types";

const STORAGE_KEY = 'parallel_resistor_calculator_history';

export const RESISTANCE_MULTIPLIERS: Record<ResistanceUnit, number> = {
  'Ω': 1,
  'kΩ': 1e3,
  'MΩ': 1e6
};

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatResult(val: number): string {
  if (Math.abs(val) < 1e-6 && val !== 0) {
    return val.toExponential(4);
  }
  if (val >= 1000) {
    return Number(val.toFixed(2)).toLocaleString();
  }
  return Number(val.toFixed(4)).toString();
}

export function calculateParallelResistance(resistors: Resistor[], outputUnit: ResistanceUnit): CalculationResult | null {
  // Filter valid resistors
  const validResistors = resistors.filter(r => {
    const val = parseFloat(r.value);
    return !isNaN(val) && val > 0 && r.value.trim() !== "";
  });

  if (validResistors.length === 0) {
    return null;
  }

  // If only one resistor, return its value
  if (validResistors.length === 1) {
    const val = parseFloat(validResistors[0].value);
    const valInOhms = val * RESISTANCE_MULTIPLIERS[validResistors[0].unit];
    const result = valInOhms / RESISTANCE_MULTIPLIERS[outputUnit];
    
    return {
      totalResistance: result,
      unit: outputUnit,
      formattedValue: formatResult(result),
      resistors: validResistors
    };
  }

  // Calculate parallel resistance: 1/Rtotal = 1/R1 + 1/R2 + ... + 1/Rn
  let reciprocalSum = 0;

  for (const resistor of validResistors) {
    const val = parseFloat(resistor.value);
    const valInOhms = val * RESISTANCE_MULTIPLIERS[resistor.unit];
    reciprocalSum += 1 / valInOhms;
  }

  const totalInOhms = 1 / reciprocalSum;
  const result = totalInOhms / RESISTANCE_MULTIPLIERS[outputUnit];

  return {
    totalResistance: result,
    unit: outputUnit,
    formattedValue: formatResult(result),
    resistors: validResistors
  };
}

export function parseShorthand(input: string): { value: number; unit: ResistanceUnit } | null {
  const trimmed = input.trim().toLowerCase();
  
  // Match patterns like: 10k, 4.7k, 1M, 100, etc.
  const match = trimmed.match(/^([\d.]+)\s*([kmKM])?$/);
  
  if (!match) return null;
  
  const numValue = parseFloat(match[1]);
  if (isNaN(numValue) || numValue <= 0) return null;
  
  const suffix = match[2];
  
  if (!suffix) {
    return { value: numValue, unit: 'Ω' };
  }
  
  if (suffix === 'k' || suffix === 'K') {
    return { value: numValue, unit: 'kΩ' };
  }
  
  if (suffix === 'm' || suffix === 'M') {
    return { value: numValue, unit: 'MΩ' };
  }
  
  return null;
}

// History management
export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: HistoryEntry): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

// Debounce function
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
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
