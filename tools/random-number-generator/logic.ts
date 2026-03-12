export interface RngHistoryRecord {
  id: string;
  time: string;
  range: string;
  result: string;
  timestamp: number;
}

export function getRandomInt(min: number, max: number, secure: boolean = false): number {
  if (secure && typeof window !== 'undefined' && window.crypto) {
    const range = max - min + 1;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return min + (array[0] % range);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDecimal(min: number, max: number, precision: number): number {
  const factor = Math.pow(10, precision);
  const val = Math.random() * (max - min) + min;
  return Math.round(val * factor) / factor;
}

export function generateBatch(
  min: number, 
  max: number, 
  count: number, 
  unique: boolean, 
  secure: boolean,
  isDecimal: boolean,
  precision: number
): number[] {
  const results: number[] = [];
  const rangeSize = max - min + 1;

  if (unique && !isDecimal && count > rangeSize) {
    count = rangeSize; // Cap at max unique possible
  }

  const seen = new Set<number>();

  while (results.length < count) {
    let val: number;
    if (isDecimal) {
      val = getRandomDecimal(min, max, precision);
    } else {
      val = getRandomInt(min, max, secure);
    }

    if (unique) {
      if (!seen.has(val)) {
        seen.add(val);
        results.push(val);
      }
      // Infinite loop protection if range is too small but precision makes it unique
      if (isDecimal && results.length > 10000) break; 
    } else {
      results.push(val);
    }
    
    if (results.length > 50000) break; // Performance safety cap
  }

  return results;
}

export function getRandomListItem<T>(list: T[]): T | null {
  if (list.length === 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function getRandomHexColor(): string {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + hex.padStart(6, '0');
}

export function formatRngCSV(numbers: number[]): string {
  return "Index,Value\n" + numbers.map((n, i) => `${i + 1},${n}`).join("\n");
}
