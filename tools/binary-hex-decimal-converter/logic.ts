export interface ConversionResult {
  binary: string;
  decimal: string;
  hex: string;
  octal: string;
  bitLength: number;
}

export interface ConversionHistory {
  id: string;
  decimal: number;
  timestamp: number;
}

// Parse input from any base
export function parseInput(input: string, base: 'binary' | 'decimal' | 'hex' | 'octal'): number | null {
  if (!input.trim()) return null;

  try {
    let value: number;

    if (base === 'binary') {
      if (!/^[01]+$/.test(input)) return null;
      value = parseInt(input, 2);
    } else if (base === 'decimal') {
      value = parseInt(input, 10);
      if (isNaN(value)) return null;
    } else if (base === 'hex') {
      if (!/^[0-9a-fA-F]+$/.test(input)) return null;
      value = parseInt(input, 16);
    } else if (base === 'octal') {
      if (!/^[0-7]+$/.test(input)) return null;
      value = parseInt(input, 8);
    } else {
      return null;
    }

    if (!Number.isInteger(value) || value < 0) return null;
    return value;
  } catch {
    return null;
  }
}

// Convert decimal to all bases
export function convertFromDecimal(decimal: number, uppercase: boolean = true): ConversionResult {
  const binary = decimal.toString(2);
  const hex = uppercase ? decimal.toString(16).toUpperCase() : decimal.toString(16);
  const octal = decimal.toString(8);

  return {
    binary,
    decimal: decimal.toString(),
    hex,
    octal,
    bitLength: binary.length
  };
}

// Group binary digits
export function groupBinary(binary: string, groupSize: number = 4): string {
  const groups = [];
  for (let i = binary.length; i > 0; i -= groupSize) {
    groups.unshift(binary.slice(Math.max(0, i - groupSize), i));
  }
  return groups.join(' ');
}

// Validate input for each base
export function validateInput(input: string, base: 'binary' | 'decimal' | 'hex' | 'octal'): boolean {
  if (!input.trim()) return false;

  if (base === 'binary') return /^[01]+$/.test(input);
  if (base === 'decimal') return /^\d+$/.test(input);
  if (base === 'hex') return /^[0-9a-fA-F]+$/i.test(input);
  if (base === 'octal') return /^[0-7]+$/.test(input);

  return false;
}

// Auto-detect base from input
export function autoDetectBase(input: string): 'binary' | 'decimal' | 'hex' | 'octal' | null {
  const trimmed = input.trim().toLowerCase();

  if (trimmed.startsWith('0b')) {
    return /^0b[01]+$/.test(trimmed) ? 'binary' : null;
  }
  if (trimmed.startsWith('0x')) {
    return /^0x[0-9a-f]+$/.test(trimmed) ? 'hex' : null;
  }
  if (trimmed.startsWith('0o')) {
    return /^0o[0-7]+$/.test(trimmed) ? 'octal' : null;
  }

  if (/^[01]+$/.test(trimmed)) return 'binary';
  if (/^[0-7]+$/.test(trimmed)) return 'octal';
  if (/^[0-9a-f]+$/.test(trimmed)) return 'hex';
  if (/^\d+$/.test(trimmed)) return 'decimal';

  return null;
}

// Generate random number
export function generateRandomNumber(maxBits: number = 32): number {
  const max = Math.pow(2, maxBits) - 1;
  return Math.floor(Math.random() * max);
}

// Local storage helpers
const HISTORY_KEY = 'binary-hex-decimal-history';
const MAX_HISTORY = 20;

export function saveToHistory(decimal: number): void {
  if (typeof window === 'undefined') return;

  const stored = getHistory();
  const item: ConversionHistory = {
    id: crypto.randomUUID(),
    decimal,
    timestamp: Date.now()
  };

  stored.unshift(item);
  const trimmed = stored.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): ConversionHistory[] {
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

// Export functions
export function exportAsJSON(data: ConversionResult[], filename: string = 'conversions'): void {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
