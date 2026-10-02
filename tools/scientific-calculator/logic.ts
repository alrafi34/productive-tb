import { AngleMode, CalculationHistory } from './types';
import { calculatePower } from '@/tools/exponent-calculator/logic';

const HISTORY_KEY = 'scientific-calculator-history';
const MAX_HISTORY = 50;

// Convert degrees to radians
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Convert radians to degrees
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Format number for display
export function formatNumber(num: number): string {
  if (!isFinite(num)) return 'Error';
  if (Math.abs(num) < 1e-10) return '0';
  
  // Scientific notation for very large or small numbers
  if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Regular formatting
  const str = num.toString();
  if (str.length > 12) {
    return parseFloat(num.toPrecision(10)).toString();
  }
  return str;
}

// Evaluate mathematical expression
/*
 * Evaluates a calculator expression with a small recursive-descent parser
 * (no eval): numbers (including 1.2e+10), π and e, + − × ÷ * /, ^ (right
 * associative, so 2^3^2 = 2^9 and −2^2 = −4), postfix ! for factorials,
 * brackets (missing closing ones at the end are added), implied
 * multiplication (2π, 3(4+1), 2sin(30)) and sin, cos, tan, asin, acos,
 * atan, log (base 10), ln and sqrt / √, in degrees or radians.
 */
export function evaluateExpression(expr: string, angleMode: AngleMode): { result: number; error?: string } {
  if (!expr || expr.trim() === '') return { result: 0 };

  const src = expr.replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  let i = 0;
  const peek = () => src[i];
  const fail = (msg: string): never => { throw new Error(msg); };
  const FUNCS = ['asin', 'acos', 'atan', 'sqrt', 'sin', 'cos', 'tan', 'log', 'ln'];

  const toRad = (x: number) => (angleMode === 'deg' ? toRadians(x) : x);
  const fromRad = (x: number) => (angleMode === 'deg' ? toDegrees(x) : x);

  const applyFunc = (fn: string, x: number): number => {
    switch (fn) {
      case 'sin': return Math.sin(toRad(x));
      case 'cos': return Math.cos(toRad(x));
      case 'tan': {
        const r = toRad(x);
        // tan(90°), tan(270°), …: undefined rather than a huge number
        if (Math.abs(Math.cos(r)) < 1e-12) fail('tan is undefined here');
        return Math.tan(r);
      }
      case 'asin': if (x < -1 || x > 1) fail('asin needs a value from −1 to 1'); return fromRad(Math.asin(x));
      case 'acos': if (x < -1 || x > 1) fail('acos needs a value from −1 to 1'); return fromRad(Math.acos(x));
      case 'atan': return fromRad(Math.atan(x));
      case 'log': if (x <= 0) fail('log needs a positive number'); return Math.log10(x);
      case 'ln': if (x <= 0) fail('ln needs a positive number'); return Math.log(x);
      case 'sqrt': if (x < 0) fail('Square root of a negative number'); return Math.sqrt(x);
      default: return fail('Unknown function');
    }
  };

  const startsPrimary = () => {
    const c = peek();
    return c !== undefined && (/[\d.(πe√]/.test(c) || FUNCS.some((f) => src.startsWith(f, i)));
  };

  function primary(): number {
    const c = peek();
    if (c === undefined) return fail('Incomplete expression');
    if (c === '(') {
      i++;
      const v = expression();
      if (peek() === ')') i++;
      else if (i < src.length) fail('Missing )');
      return v;
    }
    if (/[\d.]/.test(c)) {
      const m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(src.slice(i));
      if (!m) return fail('Invalid number');
      i += m[0].length;
      return parseFloat(m[0]);
    }
    if (c === 'π') { i++; return Math.PI; }
    if (c === '√') { i++; return applyFunc('sqrt', postfix()); }
    const fn = FUNCS.find((f) => src.startsWith(f, i));
    if (fn) {
      i += fn.length;
      if (peek() !== '(') return fail(`${fn} needs brackets, e.g. ${fn}(30)`);
      return applyFunc(fn, primary());
    }
    if (c === 'e') { i++; return Math.E; }
    return fail(`Unexpected "${c}"`);
  }

  function postfix(): number {
    let v = primary();
    while (peek() === '!') {
      i++;
      if (!Number.isInteger(v) || v < 0) fail('Factorial needs a whole number ≥ 0');
      v = factorial(v);
    }
    return v;
  }

  function power(): number {
    const base = postfix();
    if (peek() === '^') {
      i++;
      const exponent = unary();
      if (base === 0 && exponent < 0) fail('0 to a negative power is undefined (division by zero)');
      // Odd roots of negative numbers are real: (−8)^(1/3) = −2
      const v = calculatePower(base, exponent);
      if (Number.isNaN(v)) fail('No real result: an even root of a negative number');
      return v;
    }
    return base;
  }

  function unary(): number {
    if (peek() === '-') { i++; return -unary(); }
    if (peek() === '+') { i++; return unary(); }
    return power();
  }

  function term(): number {
    let v = unary();
    for (;;) {
      const c = peek();
      if (c === '*') { i++; v *= unary(); }
      else if (c === '/') {
        i++;
        const d = unary();
        if (d === 0) fail('Cannot divide by zero');
        v /= d;
      } else if (startsPrimary()) v *= power();
      else return v;
    }
  }

  function expression(): number {
    let v = term();
    for (;;) {
      const c = peek();
      if (c === '+') { i++; v += term(); }
      else if (c === '-') { i++; v -= term(); }
      else return v;
    }
  }

  try {
    const result = expression();
    if (i < src.length) fail(`Unexpected "${src[i]}"`);
    if (Number.isNaN(result)) return { result: 0, error: 'No real result' };
    if (!isFinite(result)) return { result: 0, error: 'Result is too large' };
    return { result };
  } catch (err) {
    return { result: 0, error: err instanceof Error ? err.message : 'Invalid expression' };
  }
}

export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Prevent overflow
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// History management
export function saveToHistory(expression: string, result: string): void {
  if (typeof window === 'undefined') return;

  const history = getHistory();
  const item: CalculationHistory = {
    id: crypto.randomUUID(),
    expression,
    result,
    timestamp: Date.now()
  };

  history.unshift(item);
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): CalculationHistory[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export history as JSON
export function exportHistoryAsJSON(history: CalculationHistory[]): void {
  const json = JSON.stringify(history, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `calculator-history-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Generate random number
export function generateRandomNumber(min: number = 0, max: number = 100): number {
  return Math.random() * (max - min) + min;
}
