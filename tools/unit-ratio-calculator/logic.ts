export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  return b === 0 ? a : gcd(b, a % b);
}

export function gcdArray(numbers: number[]): number {
  return numbers.reduce((acc, num) => gcd(acc, num));
}

export function parseRatioInput(input: string): number[] {
  const separators = /[:\s,]+/;
  return input
    .split(separators)
    .map(s => parseFloat(s.trim()))
    .filter(n => !isNaN(n) && n > 0);
}

export function normalizeDecimals(numbers: number[]): number[] {
  const hasDecimals = numbers.some(n => !Number.isInteger(n));
  if (!hasDecimals) return numbers;
  
  let maxDecimals = 0;
  numbers.forEach(n => {
    const str = n.toString();
    const decimalPart = str.split('.')[1];
    if (decimalPart) maxDecimals = Math.max(maxDecimals, decimalPart.length);
  });
  
  const multiplier = Math.pow(10, maxDecimals);
  return numbers.map(n => Math.round(n * multiplier));
}

export function simplifyRatio(numbers: number[]): { simplified: number[], gcd: number, original: number[] } {
  if (numbers.length === 0) return { simplified: [], gcd: 1, original: [] };
  
  const normalized = normalizeDecimals(numbers);
  const divisor = gcdArray(normalized);
  const simplified = normalized.map(n => n / divisor);
  
  return { simplified, gcd: divisor, original: numbers };
}

export function generateEquivalentRatios(simplified: number[], count: number = 5): number[][] {
  const equivalents: number[][] = [];
  for (let i = 1; i <= count; i++) {
    equivalents.push(simplified.map(n => n * i));
  }
  return equivalents;
}

export function formatRatio(numbers: number[]): string {
  return numbers.map(n => Number.isInteger(n) ? n.toString() : n.toFixed(2)).join(' : ');
}

export function calculateRatioPercentages(numbers: number[]): number[] {
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return numbers.map(n => (n / total) * 100);
}
