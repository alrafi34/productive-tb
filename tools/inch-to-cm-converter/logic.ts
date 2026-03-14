export type ConversionMode = 'inch-to-cm' | 'cm-to-inch';

export interface ConversionHistoryEntry {
  id: string;
  timestamp: number;
  inputValue: number;
  mode: ConversionMode;
  result: number;
}

export function convertValue(value: number, mode: ConversionMode): number {
  if (mode === 'inch-to-cm') {
    return value * 2.54;
  } else {
    return value / 2.54;
  }
}

export function formatValue(value: number): string {
  // Format to maximum 4 decimal places
  return Number(value.toFixed(4)).toString();
}

const STORAGE_KEY = 'inch_to_cm_history';

export function getHistory(): ConversionHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: ConversionHistoryEntry) {
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
