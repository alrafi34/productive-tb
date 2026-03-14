export type Currency = "$" | "€" | "£" | "¥";

export interface ROIResult {
  gainLoss: number;
  roiPercentage: number;
  isProfit: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  initialInvestment: number;
  currentValue: number;
  gainLoss: number;
  roiPercentage: number;
  currency: Currency;
}

export function calculateROI(
  initialInvestment: number,
  currentValue: number
): ROIResult {
  const gainLoss = currentValue - initialInvestment;
  const roiPercentage = (gainLoss / initialInvestment) * 100;

  return {
    gainLoss,
    roiPercentage: isFinite(roiPercentage) ? roiPercentage : 0,
    isProfit: gainLoss >= 0
  };
}

export function formatCurrency(value: number, currency: Currency, precision: number = 2): string {
  if (isNaN(value)) return `${currency}0`;
  return `${currency}${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  }).format(Math.abs(value))}`;
}

export function formatPercentage(value: number, precision: number = 2): string {
  if (isNaN(value)) return "0%";
  return `${value.toFixed(precision)}%`;
}

export function generateCSV(history: HistoryEntry[]): string {
  const headers = ['Date', 'Initial Investment', 'Current Value', 'Gain/Loss', 'ROI %'];
  const rows = history.map(entry => [
    new Date(entry.timestamp).toLocaleDateString(),
    `${entry.currency}${entry.initialInvestment.toFixed(2)}`,
    `${entry.currency}${entry.currentValue.toFixed(2)}`,
    `${entry.currency}${entry.gainLoss.toFixed(2)}`,
    `${entry.roiPercentage.toFixed(2)}%`
  ]);

  const csvContent = [
    `Investment ROI Calculation History - ${new Date().toLocaleDateString()}`,
    '',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}

export function downloadCSV(content: string, filename: string = 'investment-roi-history.csv') {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const STORAGE_KEY = 'investment_roi_history';

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: HistoryEntry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, 10);
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
