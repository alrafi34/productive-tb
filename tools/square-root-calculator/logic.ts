export interface SqrtHistoryEntry {
  id: string;
  timestamp: number;
  input: number;
  result: number;
  precision: number;
}

export function calculateSqrt(value: number): number {
  return Math.sqrt(value);
}

export function formatValue(value: number, precision: number): string {
  if (Object.is(value, -0)) value = 0;
  return Number(value.toFixed(precision)).toString();
}

const STORAGE_KEY = 'square_root_history';

export function getHistory(): SqrtHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: SqrtHistoryEntry) {
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

export function generateBatchResults(input: string, precision: number): { input: string, result: string }[] {
  const parts = input.split(/[\s,]+/).filter(p => p.trim() !== "");
  return parts.map(p => {
    const n = parseFloat(p);
    if (isNaN(n)) return { input: p, result: "Invalid" };
    if (n < 0) return { input: p, result: "Complex" };
    return { input: p, result: formatValue(calculateSqrt(n), precision) };
  });
}

export interface SimplifiedRadical {
  coefficient: number; // a in a√b
  radicand: number;    // b in a√b (1 for a perfect square)
  square: number;      // the largest perfect square dividing n (a²)
}

/**
 * Writes √n for a whole number n as a√b with b square-free, e.g. √50 = 5√2.
 * Returns null for non-integers, negatives and numbers too large to factor quickly.
 */
export function simplifySqrt(n: number): SimplifiedRadical | null {
  if (!Number.isInteger(n) || n < 1 || n > 1e12) return null;
  let coefficient = 1;
  let radicand = n;
  for (let f = 2; f * f <= radicand; f++) {
    while (radicand % (f * f) === 0) {
      radicand /= f * f;
      coefficient *= f;
    }
  }
  return { coefficient, radicand, square: coefficient * coefficient };
}

/** Text form of a√b: "5√2", "√7" or "6" */
export function formatRadical({ coefficient, radicand }: SimplifiedRadical): string {
  if (radicand === 1) return String(coefficient);
  return `${coefficient === 1 ? "" : coefficient}√${radicand}`;
}
