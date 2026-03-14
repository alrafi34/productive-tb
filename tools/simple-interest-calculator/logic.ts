export type TimeUnit = 'years' | 'months' | 'days';

export interface InterestHistoryEntry {
  id: string;
  timestamp: number;
  principal: number;
  rate: number;
  time: number;
  unit: TimeUnit;
  interest: number;
  total: number;
}

export function calculateSimpleInterest(
  principal: number,
  rate: number,
  time: number,
  unit: TimeUnit
): { interest: number; total: number } {
  // Convert time to years
  let timeInYears = time;
  if (unit === 'months') {
    timeInYears = time / 12;
  } else if (unit === 'days') {
    timeInYears = time / 365;
  }

  const interest = (principal * rate * timeInYears) / 100;
  const total = principal + interest;

  return { 
    interest: isFinite(interest) ? interest : 0, 
    total: isFinite(total) ? total : 0 
  };
}

export function formatCurrency(value: number, precision: number): string {
  if (isNaN(value)) return "0";
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  }).format(value);
}

const STORAGE_KEY = 'simple_interest_history';

export function getHistory(): InterestHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: InterestHistoryEntry) {
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
