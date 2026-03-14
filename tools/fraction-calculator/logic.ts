import { Fraction, FractionResult, FractionOperation, CalculationHistory } from './types';

const HISTORY_KEY = 'fraction-calculator-history';
const MAX_HISTORY = 30;

// Calculate Greatest Common Divisor (GCD)
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Simplify a fraction
export function simplifyFraction(numerator: number, denominator: number): Fraction {
  if (denominator === 0) {
    return { numerator: 0, denominator: 1 };
  }

  const divisor = gcd(numerator, denominator);
  let num = numerator / divisor;
  let den = denominator / divisor;

  // Keep negative sign in numerator
  if (den < 0) {
    num = -num;
    den = -den;
  }

  return { numerator: num, denominator: den };
}

// Convert improper fraction to mixed number
export function toMixedNumber(numerator: number, denominator: number): {
  whole: number;
  numerator: number;
  denominator: number;
} | undefined {
  if (denominator === 0 || Math.abs(numerator) < Math.abs(denominator)) {
    return undefined;
  }

  const isNegative = (numerator < 0) !== (denominator < 0);
  const absNum = Math.abs(numerator);
  const absDen = Math.abs(denominator);

  const whole = Math.floor(absNum / absDen);
  const remainder = absNum % absDen;

  return {
    whole: isNegative ? -whole : whole,
    numerator: remainder,
    denominator: absDen
  };
}

// Add two fractions
export function addFractions(a: Fraction, b: Fraction): FractionResult {
  const steps: string[] = [];
  steps.push(`${a.numerator}/${a.denominator} + ${b.numerator}/${b.denominator}`);

  const numerator = a.numerator * b.denominator + b.numerator * a.denominator;
  const denominator = a.denominator * b.denominator;

  steps.push(`= (${a.numerator}×${b.denominator} + ${b.numerator}×${a.denominator}) / (${a.denominator}×${b.denominator})`);
  steps.push(`= (${a.numerator * b.denominator} + ${b.numerator * a.denominator}) / ${denominator}`);
  steps.push(`= ${numerator}/${denominator}`);

  const simplified = simplifyFraction(numerator, denominator);
  const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);
  const decimal = simplified.numerator / simplified.denominator;

  if (simplified.numerator !== numerator || simplified.denominator !== denominator) {
    steps.push(`Simplified: ${simplified.numerator}/${simplified.denominator}`);
  }

  return { numerator, denominator, simplified, mixedNumber, decimal, steps };
}

// Subtract two fractions
export function subtractFractions(a: Fraction, b: Fraction): FractionResult {
  const steps: string[] = [];
  steps.push(`${a.numerator}/${a.denominator} − ${b.numerator}/${b.denominator}`);

  const numerator = a.numerator * b.denominator - b.numerator * a.denominator;
  const denominator = a.denominator * b.denominator;

  steps.push(`= (${a.numerator}×${b.denominator} − ${b.numerator}×${a.denominator}) / (${a.denominator}×${b.denominator})`);
  steps.push(`= (${a.numerator * b.denominator} − ${b.numerator * a.denominator}) / ${denominator}`);
  steps.push(`= ${numerator}/${denominator}`);

  const simplified = simplifyFraction(numerator, denominator);
  const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);
  const decimal = simplified.numerator / simplified.denominator;

  if (simplified.numerator !== numerator || simplified.denominator !== denominator) {
    steps.push(`Simplified: ${simplified.numerator}/${simplified.denominator}`);
  }

  return { numerator, denominator, simplified, mixedNumber, decimal, steps };
}

// Multiply two fractions
export function multiplyFractions(a: Fraction, b: Fraction): FractionResult {
  const steps: string[] = [];
  steps.push(`${a.numerator}/${a.denominator} × ${b.numerator}/${b.denominator}`);

  const numerator = a.numerator * b.numerator;
  const denominator = a.denominator * b.denominator;

  steps.push(`= (${a.numerator}×${b.numerator}) / (${a.denominator}×${b.denominator})`);
  steps.push(`= ${numerator}/${denominator}`);

  const simplified = simplifyFraction(numerator, denominator);
  const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);
  const decimal = simplified.numerator / simplified.denominator;

  if (simplified.numerator !== numerator || simplified.denominator !== denominator) {
    steps.push(`Simplified: ${simplified.numerator}/${simplified.denominator}`);
  }

  return { numerator, denominator, simplified, mixedNumber, decimal, steps };
}

// Divide two fractions
export function divideFractions(a: Fraction, b: Fraction): FractionResult {
  const steps: string[] = [];
  steps.push(`${a.numerator}/${a.denominator} ÷ ${b.numerator}/${b.denominator}`);

  if (b.numerator === 0) {
    return {
      numerator: 0,
      denominator: 1,
      simplified: { numerator: 0, denominator: 1 },
      decimal: 0,
      steps: ['Error: Cannot divide by zero']
    };
  }

  steps.push(`= ${a.numerator}/${a.denominator} × ${b.denominator}/${b.numerator}`);

  const numerator = a.numerator * b.denominator;
  const denominator = a.denominator * b.numerator;

  steps.push(`= (${a.numerator}×${b.denominator}) / (${a.denominator}×${b.numerator})`);
  steps.push(`= ${numerator}/${denominator}`);

  const simplified = simplifyFraction(numerator, denominator);
  const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator);
  const decimal = simplified.numerator / simplified.denominator;

  if (simplified.numerator !== numerator || simplified.denominator !== denominator) {
    steps.push(`Simplified: ${simplified.numerator}/${simplified.denominator}`);
  }

  return { numerator, denominator, simplified, mixedNumber, decimal, steps };
}

// Perform operation
export function calculateFractions(
  a: Fraction,
  b: Fraction,
  operation: FractionOperation
): FractionResult {
  switch (operation) {
    case 'add':
      return addFractions(a, b);
    case 'subtract':
      return subtractFractions(a, b);
    case 'multiply':
      return multiplyFractions(a, b);
    case 'divide':
      return divideFractions(a, b);
    default:
      return {
        numerator: 0,
        denominator: 1,
        simplified: { numerator: 0, denominator: 1 },
        decimal: 0
      };
  }
}

// Format fraction for display
export function formatFraction(fraction: Fraction): string {
  if (fraction.denominator === 1) {
    return fraction.numerator.toString();
  }
  return `${fraction.numerator}/${fraction.denominator}`;
}

// Format mixed number for display
export function formatMixedNumber(mixed: { whole: number; numerator: number; denominator: number }): string {
  if (mixed.numerator === 0) {
    return mixed.whole.toString();
  }
  return `${mixed.whole} ${mixed.numerator}/${mixed.denominator}`;
}

// Generate random fraction
export function generateRandomFraction(maxValue: number = 10): Fraction {
  const numerator = Math.floor(Math.random() * maxValue) + 1;
  const denominator = Math.floor(Math.random() * maxValue) + 1;
  return { numerator, denominator };
}

// History management
export function saveToHistory(
  fractionA: Fraction,
  fractionB: Fraction,
  operation: FractionOperation,
  result: FractionResult
): void {
  if (typeof window === 'undefined') return;

  const history = getHistory();
  const item: CalculationHistory = {
    id: crypto.randomUUID(),
    fractionA,
    fractionB,
    operation,
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

// Validate fraction
export function isValidFraction(numerator: number, denominator: number): boolean {
  return !isNaN(numerator) && !isNaN(denominator) && denominator !== 0;
}
