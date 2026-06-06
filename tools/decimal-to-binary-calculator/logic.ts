import { DecimalToBinaryInputs, DecimalToBinaryResult, ConversionStep, HistoryEntry } from "./types";

// Convert decimal to binary with step-by-step breakdown
export function convertDecimalToBinary(inputs: DecimalToBinaryInputs): DecimalToBinaryResult {
  const decimal = parseInt(inputs.decimalInput);
  
  if (isNaN(decimal) || decimal < 0) {
    throw new Error("Please enter a valid positive integer");
  }
  
  const steps: string[] = [];
  const conversionSteps: ConversionStep[] = [];
  
  steps.push('DECIMAL TO BINARY CONVERSION');
  steps.push('');
  steps.push(`Decimal Input: ${decimal}`);
  steps.push('');
  steps.push('Conversion Method: Repeated Division by 2');
  steps.push('');
  
  // Special case for 0
  if (decimal === 0) {
    steps.push('Special case: 0 in decimal = 0 in binary');
    return {
      binary: '0',
      decimal: 0,
      steps,
      conversionSteps: []
    };
  }
  
  steps.push('Division Steps:');
  steps.push('');
  
  let num = decimal;
  let binary = '';
  
  // Perform repeated division by 2
  while (num > 0) {
    const remainder = num % 2;
    const quotient = Math.floor(num / 2);
    
    conversionSteps.push({
      dividend: num,
      divisor: 2,
      quotient,
      remainder
    });
    
    steps.push(`${num} ÷ 2 = ${quotient} remainder ${remainder}`);
    
    binary = remainder + binary;
    num = quotient;
  }
  
  steps.push('');
  steps.push('Reading remainders from bottom to top:');
  steps.push(`Binary = ${binary}`);
  steps.push('');
  steps.push(`Result: ${decimal} (decimal) = ${binary} (binary)`);
  steps.push('');
  steps.push('Verification:');
  
  // Verify by converting back
  let verification = 0;
  for (let i = 0; i < binary.length; i++) {
    const bit = parseInt(binary[binary.length - 1 - i]);
    const value = bit * Math.pow(2, i);
    verification += value;
    steps.push(`Position ${i}: ${bit} × 2^${i} = ${value}`);
  }
  
  steps.push(`Total: ${verification} ✓`);
  
  return {
    binary,
    decimal,
    steps,
    conversionSteps
  };
}

// Validate decimal input
export function validateDecimalInput(input: string): string | null {
  if (!input || input.trim() === '') {
    return "Please enter a decimal number";
  }
  
  const num = parseInt(input);
  
  if (isNaN(num)) {
    return "Invalid number. Please enter a valid integer";
  }
  
  if (num < 0) {
    return "Please enter a positive number (0 or greater)";
  }
  
  if (num > Number.MAX_SAFE_INTEGER) {
    return "Number too large. Maximum: " + Number.MAX_SAFE_INTEGER;
  }
  
  return null;
}

// Format binary with spacing every 4 bits
export function formatBinary(binary: string): string {
  return binary.replace(/(.{4})/g, '$1 ').trim();
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History management
const HISTORY_KEY = 'decimal-to-binary-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(decimal: number, binary: string): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      decimal,
      binary
    };
    
    // Avoid duplicates
    const exists = history.some(h => h.decimal === decimal);
    if (exists) return;
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

// Export to text
export function exportToText(result: DecimalToBinaryResult): string {
  const lines: string[] = [];
  
  lines.push('DECIMAL TO BINARY CONVERSION - REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT:');
  lines.push('-'.repeat(60));
  lines.push(`Decimal: ${result.decimal}`);
  lines.push('');
  lines.push('OUTPUT:');
  lines.push('-'.repeat(60));
  lines.push(`Binary: ${result.binary}`);
  lines.push(`Formatted: ${formatBinary(result.binary)}`);
  lines.push(`Length: ${result.binary.length} bits`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(60));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('DIVISION TABLE:');
  lines.push('-'.repeat(60));
  lines.push('Dividend | Divisor | Quotient | Remainder');
  lines.push('-'.repeat(60));
  result.conversionSteps.forEach(s => {
    lines.push(`${s.dividend.toString().padStart(8)} | ${s.divisor.toString().padStart(7)} | ${s.quotient.toString().padStart(8)} | ${s.remainder.toString().padStart(9)}`);
  });
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by Decimal to Binary Calculator');
  
  return lines.join('\n');
}

// Download file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Save last used settings
const SETTINGS_KEY = 'decimal-to-binary-calculator-settings';

export function saveSettings(settings: Partial<DecimalToBinaryInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<DecimalToBinaryInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get example decimal numbers
export function getExamples() {
  return [
    { decimal: 10, binary: '1010', description: 'Simple example' },
    { decimal: 25, binary: '11001', description: 'Two-digit' },
    { decimal: 42, binary: '101010', description: 'Answer to everything' },
    { decimal: 128, binary: '10000000', description: 'Power of 2' },
    { decimal: 255, binary: '11111111', description: '8-bit maximum' },
    { decimal: 1024, binary: '10000000000', description: '1 KB' }
  ];
}
