export interface ExponentHistoryEntry {
  id: string;
  timestamp: number;
  base: number;
  exponent: number;
  result: number;
  precision: number;
}

export function calculatePower(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

export function formatValue(value: number, precision: number, scientific: boolean): string {
  if (!isFinite(value)) return value.toString();
  if (scientific && (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))) {
    return value.toExponential(precision);
  }
  return Number(value.toFixed(precision)).toString();
}

export function getExpansionSteps(base: number, exponent: number): string {
  if (!Number.isInteger(exponent) || exponent <= 0 || exponent > 10) return "";
  
  const steps = Array(exponent).fill(base).join(' × ');
  return steps;
}

const STORAGE_KEY = 'exponent_calculator_history';

export function getHistory(): ExponentHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: ExponentHistoryEntry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function clearHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteHistoryEntry(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}
