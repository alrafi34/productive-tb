export interface ExponentHistoryEntry {
  id: string;
  timestamp: number;
  base: number;
  exponent: number;
  result: number;
  precision: number;
}

export interface Fraction {
  num: number;
  den: number;
}

/* An exponent typed as a decimal ("0.5") or a fraction ("1/3", "-2/3").
   A typed fraction is kept exactly, since 0.333… is not 1/3. */
export function parseExponent(input: string): { value: number; fraction?: Fraction } | null {
  const text = input.trim();
  const m = /^([+-]?\d+)\s*\/\s*([+-]?\d+)$/.exec(text);
  if (m) {
    const num = Number(m[1]);
    const den = Number(m[2]);
    if (den === 0) return null;
    const sign = den < 0 ? -1 : 1;
    return { value: num / den, fraction: reduce(sign * num, sign * den) };
  }
  if (text === "" || !/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(text)) return null;
  return { value: Number(text) };
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function reduce(num: number, den: number): Fraction {
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

/* The simplest fraction within 1e-9 of x (continued fractions), if its
   denominator stays small enough to be what the user meant. */
export function toFraction(x: number, maxDen = 1000): Fraction | null {
  if (!isFinite(x)) return null;
  let h0 = 1, h1 = Math.floor(x), k0 = 0, k1 = 1;
  let rest = x - Math.floor(x);
  while (Math.abs(h1 / k1 - x) > 1e-9) {
    if (rest < 1e-12) break;
    const inv = 1 / rest;
    const a = Math.floor(inv);
    rest = inv - a;
    [h0, h1] = [h1, a * h1 + h0];
    [k0, k1] = [k1, a * k1 + k0];
    if (k1 > maxDen) return null;
  }
  return reduce(h1, k1);
}

/* base^exponent over the real numbers. Math.pow gives NaN for every negative
   base with a non-integer exponent, but an odd root of a negative number is
   real: (−8)^(1/3) = −2. Returns NaN only when the result is not real. */
export function calculatePower(base: number, exponent: number, fraction?: Fraction): number {
  if (base >= 0 || Number.isInteger(exponent)) return Math.pow(base, exponent);
  const f = fraction ?? toFraction(exponent);
  if (!f || f.den % 2 === 0) return NaN;
  const magnitude = Math.pow(-base, f.num / f.den);
  return f.num % 2 === 0 ? magnitude : -magnitude;
}

/* The principal complex value of base^exponent, for results that are not real. */
export function complexPower(base: number, exponent: number): { re: number; im: number } {
  const r = Math.pow(Math.abs(base), exponent);
  const angle = (base < 0 ? Math.PI : 0) * exponent;
  return { re: r * Math.cos(angle), im: r * Math.sin(angle) };
}

export function formatComplex(z: { re: number; im: number }, precision: number): string {
  const round = (v: number) => {
    const n = Number(v.toFixed(precision));
    return Object.is(n, -0) ? 0 : n;
  };
  const re = round(z.re);
  const im = round(z.im);
  const imPart = Math.abs(im) === 1 ? "i" : `${Math.abs(im)}i`;
  if (im === 0) return `${re}`;
  if (re === 0) return `${im < 0 ? "−" : ""}${imPart}`;
  return `${re} ${im < 0 ? "−" : "+"} ${imPart}`;
}

/* Root notation for a fractional exponent: (−8)^(2/3) → "(∛(−8))²". */
export function getRootSteps(base: number, fraction: Fraction): string {
  const { num, den } = fraction;
  if (den <= 1) return "";
  const radical = den === 2 ? "√" : den === 3 ? "∛" : den === 4 ? "∜" : `${den}√`;
  const root = `${radical}(${base < 0 ? `−${-base}` : base})`;
  if (num === 1) return root;
  if (num === -1) return `1 / ${root}`;
  const power = Math.abs(num);
  const powered = `(${root})^${power}`;
  return num < 0 ? `1 / ${powered}` : powered;
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
