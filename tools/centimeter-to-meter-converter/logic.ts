export interface CmToMExtry {
  id: string;
  timestamp: number;
  cmValue: number;
  meterValue: number;
  precision: number;
}

export function convertCmToMeter(cm: number): number {
  return cm / 100;
}

export function formatValue(value: number, precision: number): string {
  // Handle edge cases
  if (Object.is(value, -0)) value = 0;
  return Number(value.toFixed(precision)).toString();
}

const STORAGE_KEY = 'cm_to_meter_history';

export function getHistory(): CmToMExtry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: CmToMExtry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, 10);
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
