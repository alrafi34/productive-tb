import { BinaryToDecimalInputs, BinaryToDecimalResult, BitBreakdown, HistoryEntry } from "./types";

// Convert binary to decimal with step-by-step breakdown
export function convertBinaryToDecimal(inputs: BinaryToDecimalInputs): BinaryToDecimalResult {
  const { binaryInput } = inputs;
  
  // Clean input - remove spaces and non-binary characters
  const binaryClean = binaryInput.replace(/\s+/g, '').replace(/[^01]/g, '');
  
  if (!binaryClean) {
    throw new Error("Please enter a valid binary number");
  }
  
  const steps: string[] = [];
  const bitBreakdown: BitBreakdown[] = [];
  
  steps.push('BINARY TO DECIMAL CONVERSION');
  steps.push('');
  steps.push(`Binary Input: ${binaryClean}`);
  steps.push(`Length: ${binaryClean.length} bits`);
  steps.push('');
  steps.push('Conversion Formula:');
  steps.push('Decimal = Σ (bit × 2^position)');
  steps.push('');
  steps.push('Step-by-Step Calculation:');
  steps.push('');
  
  let decimal = 0;
  const length = binaryClean.length;
  
  // Process each bit from right to left
  for (let i = 0; i < length; i++) {
    const position = length - 1 - i;
    const bit = binaryClean[i];
    const power = position;
    const value = parseInt(bit) * Math.pow(2, power);
    
    bitBreakdown.push({
      position: i,
      bit,
      power,
      value
    });
    
    decimal += value;
    
    steps.push(`Position ${position}: ${bit} × 2^${power} = ${bit} × ${Math.pow(2, power)} = ${value}`);
  }
  
  steps.push('');
  steps.push('Final Calculation:');
  
  const calculation = bitBreakdown
    .map(b => `${b.value}`)
    .join(' + ');
  
  steps.push(`${calculation} = ${decimal}`);
  steps.push('');
  steps.push(`Result: ${binaryClean} (binary) = ${decimal} (decimal)`);
  
  return {
    decimal,
    binaryClean,
    steps,
    bitBreakdown
  };
}

// Validate binary input
export function validateBinaryInput(input: string): string | null {
  if (!input || input.trim() === '') {
    return "Please enter a binary number";
  }
  
  const cleaned = input.replace(/\s+/g, '');
  
  if (!/^[01]+$/.test(cleaned)) {
    return "Invalid binary number. Use only 0 and 1";
  }
  
  if (cleaned.length > 64) {
    return "Binary number too long (max 64 bits)";
  }
  
  return null;
}

// Format binary with spacing every 4 bits
export function formatBinary(binary: string): string {
  const cleaned = binary.replace(/\s+/g, '');
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
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
const HISTORY_KEY = 'binary-to-decimal-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(binary: string, decimal: number): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      binary,
      decimal
    };
    
    // Avoid duplicates
    const exists = history.some(h => h.binary === binary);
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
export function exportToText(binary: string, result: BinaryToDecimalResult): string {
  const lines: string[] = [];
  
  lines.push('BINARY TO DECIMAL CONVERSION - REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT:');
  lines.push('-'.repeat(60));
  lines.push(`Binary: ${binary}`);
  lines.push(`Cleaned: ${result.binaryClean}`);
  lines.push(`Length: ${result.binaryClean.length} bits`);
  lines.push('');
  lines.push('OUTPUT:');
  lines.push('-'.repeat(60));
  lines.push(`Decimal: ${result.decimal}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(60));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('BIT BREAKDOWN:');
  lines.push('-'.repeat(60));
  lines.push('Position | Bit | Power | Value');
  lines.push('-'.repeat(60));
  result.bitBreakdown.forEach(b => {
    lines.push(`${b.power.toString().padStart(8)} | ${b.bit.padStart(3)} | 2^${b.power.toString().padStart(2)} | ${b.value.toString().padStart(10)}`);
  });
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by Binary to Decimal Calculator');
  
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
const SETTINGS_KEY = 'binary-to-decimal-calculator-settings';

export function saveSettings(settings: Partial<BinaryToDecimalInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<BinaryToDecimalInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get example binary numbers
export function getExamples() {
  return [
    { binary: '1010', decimal: 10, description: 'Simple 4-bit' },
    { binary: '11111111', decimal: 255, description: '8-bit maximum' },
    { binary: '10000000', decimal: 128, description: 'Single high bit' },
    { binary: '1101', decimal: 13, description: 'Mixed bits' },
    { binary: '11110000', decimal: 240, description: 'Nibble pattern' },
    { binary: '101010', decimal: 42, description: 'Alternating pattern' }
  ];
}
