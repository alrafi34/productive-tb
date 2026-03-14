export type AreaType = 'm2' | 'ft2';

export interface AreaHistoryEntry {
  id: string;
  timestamp: number;
  m2Value: number;
  ft2Value: number;
  precision: number;
}

const M2_TO_FT2 = 10.7639104; // More precise value based on 1m = 3.28084ft
const FT2_TO_M2 = 0.09290304;

export function convertArea(value: number, from: AreaType): number {
  if (from === 'm2') {
    return value * M2_TO_FT2;
  } else {
    return value * FT2_TO_M2;
  }
}

export function formatAreaValue(value: number, precision: number): string {
  if (Object.is(value, -0)) value = 0;
  // Use toFixed but remove trailing zeros if not needed, or keep fixed precision
  return Number(value.toFixed(precision)).toString();
}

const STORAGE_KEY = 'area_conversion_history';

export function getHistory(): AreaHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: AreaHistoryEntry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    // Prevent duplicates if same conversion is saved sequentially
    const updated = [entry, ...history.filter(h => !(h.m2Value === entry.m2Value && h.precision === entry.precision))].slice(0, 5);
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

export function processBatchArea(input: string, precision: number, mode: AreaType): { input: string, result: string }[] {
  const parts = input.split(/[\s,]+/).filter(p => p.trim() !== "");
  return parts.map(p => {
    const n = parseFloat(p);
    if (isNaN(n)) return { input: p, result: "Invalid" };
    const result = convertArea(n, mode);
    return { input: p, result: formatAreaValue(result, precision) };
  });
}
