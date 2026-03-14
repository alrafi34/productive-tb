export type TaxOperation = 'add' | 'remove';

export interface TaxCalculationResult {
  basePrice: number;
  taxRate: number;
  taxAmount: number;
  finalPrice: number;
  operation: TaxOperation;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  basePrice: number;
  taxRate: number;
  taxAmount: number;
  finalPrice: number;
  operation: TaxOperation;
}

// Predefined tax rates
export const PREDEFINED_TAX_RATES = [
  { label: '5%', value: 5 },
  { label: '12%', value: 12 },
  { label: '18%', value: 18 },
  { label: '28%', value: 28 }
];

// Add tax (calculate inclusive price)
export function addTax(price: number, taxRate: number): TaxCalculationResult {
  const taxAmount = price * (taxRate / 100);
  const finalPrice = price + taxAmount;
  
  return {
    basePrice: price,
    taxRate,
    taxAmount,
    finalPrice,
    operation: 'add'
  };
}

// Remove tax (calculate exclusive price)
export function removeTax(price: number, taxRate: number): TaxCalculationResult {
  const basePrice = price / (1 + taxRate / 100);
  const taxAmount = price - basePrice;
  
  return {
    basePrice,
    taxRate,
    taxAmount,
    finalPrice: price,
    operation: 'remove'
  };
}

// Main calculation function
export function calculateTax(
  price: number,
  taxRate: number,
  operation: TaxOperation
): TaxCalculationResult {
  if (operation === 'add') {
    return addTax(price, taxRate);
  } else {
    return removeTax(price, taxRate);
  }
}

// Format currency
export function formatCurrency(amount: number, precision: number = 2): string {
  return amount.toFixed(precision);
}

// Generate CSV for export
export function generateCSV(result: TaxCalculationResult): string {
  const headers = ['Operation', 'Base Price', 'Tax Rate (%)', 'Tax Amount', 'Final Price'];
  const row = [
    result.operation === 'add' ? 'Add Tax' : 'Remove Tax',
    formatCurrency(result.basePrice),
    result.taxRate.toString(),
    formatCurrency(result.taxAmount),
    formatCurrency(result.finalPrice)
  ];
  
  return [headers.join(','), row.join(',')].join('\n');
}

// Download CSV
export function downloadCSV(csvContent: string, filename: string = 'gst-vat-calculation.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Local storage functions
const STORAGE_KEY = 'gst-vat-calculator-history';
const LAST_CALCULATION_KEY = 'gst-vat-calculator-last';

export function saveToHistory(entry: HistoryEntry): void {
  try {
    const history = getHistory();
    history.unshift(entry);
    // Keep only last 10 entries
    const trimmedHistory = history.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn('Failed to save to history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear history:', error);
  }
}

export function deleteHistoryEntry(id: string): void {
  try {
    const history = getHistory();
    const filtered = history.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.warn('Failed to delete history entry:', error);
  }
}

export function saveLastCalculation(price: string, taxRate: string, operation: TaxOperation): void {
  try {
    const lastCalc = { price, taxRate, operation };
    localStorage.setItem(LAST_CALCULATION_KEY, JSON.stringify(lastCalc));
  } catch (error) {
    console.warn('Failed to save last calculation:', error);
  }
}

export function getLastCalculation(): { price: string; taxRate: string; operation: TaxOperation } | null {
  try {
    const stored = localStorage.getItem(LAST_CALCULATION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load last calculation:', error);
    return null;
  }
}