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

/* Reads inches the way they are written on a US tape measure or a height:
   "10", "5.375", "5 3/8", "3/4", "5' 10\"", "5 ft 10 in", "5ft 10 1/2in".
   Returns NaN when the text is not a length. */
export function parseInches(raw: string): number {
  const s = raw.trim().toLowerCase().replace(/[″”]/g, '"').replace(/[′’]/g, "'");
  if (!s) return NaN;
  const num = (t: string): number => {
    const m = t.trim().match(/^(\d+(?:\.\d+)?)?\s*(?:(\d+)\s*\/\s*(\d+))?$/);
    if (!m || (!m[1] && !m[2])) return NaN;
    const whole = m[1] ? parseFloat(m[1]) : 0;
    const frac = m[2] ? Number(m[2]) / Number(m[3]) : 0;
    return m[3] === '0' ? NaN : whole + frac;
  };
  const feetMatch = s.match(/^(.*?)\s*(?:'|ft|feet|foot)\s*(.*?)\s*(?:"|in|inch|inches)?$/);
  if (feetMatch) {
    const feet = num(feetMatch[1]);
    const inches = feetMatch[2] ? num(feetMatch[2]) : 0;
    return Number.isFinite(feet) && Number.isFinite(inches) ? feet * 12 + inches : NaN;
  }
  return num(s.replace(/\s*(?:"|in|inch|inches)$/, ''));
}

/* 3.937 → "3 15/16" (nearest 1/16 inch, reduced), as read on a tape measure. */
export function toFractionalInches(inches: number, denominator = 16): string {
  const sign = inches < 0 ? '-' : '';
  let whole = Math.floor(Math.abs(inches));
  let n = Math.round((Math.abs(inches) - whole) * denominator);
  let d = denominator;
  if (n === d) { whole += 1; n = 0; }
  while (n > 0 && n % 2 === 0 && d % 2 === 0) { n /= 2; d /= 2; }
  if (n === 0) return `${sign}${whole}`;
  return whole ? `${sign}${whole} ${n}/${d}` : `${sign}${n}/${d}`;
}

/* 70 → 5′ 10″ */
export function toFeetInches(inches: number): string {
  const total = Math.round(inches * 10) / 10;
  const feet = Math.floor(total / 12);
  const rest = Math.round((total - feet * 12) * 10) / 10;
  return `${feet}′ ${rest}″`;
}

export function formatValue(value: number): string {
  // Format to maximum 4 decimal places
  const rounded = Number(value.toFixed(4));
  // A non-zero value that rounds to 0 keeps four significant digits instead
  if (rounded === 0 && value !== 0) return Number(value.toPrecision(4)).toString();
  return rounded.toString();
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
