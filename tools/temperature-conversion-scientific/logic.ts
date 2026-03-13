export type TemperatureUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin' | 'Rankine';

export interface TemperatureResult {
  Celsius: number;
  Fahrenheit: number;
  Kelvin: number;
  Rankine: number;
}

export interface TemperatureHistoryEntry {
  id: string;
  timestamp: number;
  inputValue: number;
  inputUnit: TemperatureUnit;
  results: TemperatureResult;
  precision: number;
}

export function convertTemperature(value: number, fromUnit: TemperatureUnit): TemperatureResult {
  let c = 0, f = 0, k = 0, r = 0;

  switch (fromUnit) {
    case 'Celsius':
      c = value;
      k = value + 273.15;
      f = (value * 9/5) + 32;
      r = (value + 273.15) * 9/5;
      break;
    case 'Fahrenheit':
      c = (value - 32) * 5/9;
      k = (value + 459.67) * 5/9;
      f = value;
      r = value + 459.67;
      break;
    case 'Kelvin':
      c = value - 273.15;
      f = (value * 9/5) - 459.67;
      k = value;
      r = value * 9/5;
      break;
    case 'Rankine':
      c = (value - 491.67) * 5/9;
      f = value - 459.67;
      k = value * 5/9;
      r = value;
      break;
  }

  return {
    Celsius: c,
    Fahrenheit: f,
    Kelvin: k,
    Rankine: r
  };
}

export function formatTemperature(value: number, precision: number): string {
  // Handle edge cases like -0 (JavaScript object.is handles -0, we can just check if value is practically 0)
  if (Object.is(value, -0)) value = 0;
  return Number(value.toFixed(precision)).toString();
}

const STORAGE_KEY = 'temperature_history_scientific';

export function getHistory(): TemperatureHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: TemperatureHistoryEntry) {
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
