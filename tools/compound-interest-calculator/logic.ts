export type CompoundingFrequency = 'annual' | 'semi-annual' | 'quarterly' | 'monthly' | 'daily';

export interface CompoundInterestResult {
  futureValue: number;
  interestEarned: number;
  yearlyBreakdown: YearlyData[];
}

export interface YearlyData {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  principal: number;
  rate: number;
  time: number;
  frequency: CompoundingFrequency;
  futureValue: number;
  interestEarned: number;
}

const FREQUENCY_MAP: Record<CompoundingFrequency, number> = {
  'annual': 1,
  'semi-annual': 2,
  'quarterly': 4,
  'monthly': 12,
  'daily': 365
};

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  frequency: CompoundingFrequency
): CompoundInterestResult {
  const n = FREQUENCY_MAP[frequency];
  const r = rate / 100;
  
  // FV = P × (1 + r/n)^(n × t)
  const futureValue = principal * Math.pow((1 + r / n), n * time);
  const interestEarned = futureValue - principal;
  
  // Generate yearly breakdown
  const yearlyBreakdown: YearlyData[] = [];
  for (let year = 1; year <= time; year++) {
    const yearlyFV = principal * Math.pow((1 + r / n), n * year);
    const yearlyInterest = yearlyFV - principal;
    yearlyBreakdown.push({
      year,
      principal,
      interest: yearlyInterest,
      total: yearlyFV
    });
  }
  
  return {
    futureValue: isFinite(futureValue) ? futureValue : 0,
    interestEarned: isFinite(interestEarned) ? interestEarned : 0,
    yearlyBreakdown
  };
}

export function formatCurrency(value: number, precision: number = 2): string {
  if (isNaN(value)) return "0";
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  }).format(value);
}

export function generateChartData(yearlyBreakdown: YearlyData[]) {
  return yearlyBreakdown.map(data => ({
    year: data.year,
    principal: data.principal,
    total: data.total,
    interest: data.interest
  }));
}

export function generateCSV(yearlyBreakdown: YearlyData[], principal: number, rate: number, frequency: CompoundingFrequency): string {
  const headers = ['Year', 'Principal', 'Interest Earned', 'Total Amount'];
  const rows = yearlyBreakdown.map(data => [
    data.year.toString(),
    formatCurrency(data.principal, 2),
    formatCurrency(data.interest, 2),
    formatCurrency(data.total, 2)
  ]);
  
  const csvContent = [
    `Compound Interest Calculation - ${new Date().toLocaleDateString()}`,
    `Principal: $${formatCurrency(principal, 2)}`,
    `Interest Rate: ${rate}%`,
    `Compounding: ${frequency}`,
    '',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
}

export function downloadCSV(content: string, filename: string = 'compound-interest-calculation.csv') {
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

const STORAGE_KEY = 'compound_interest_history';

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