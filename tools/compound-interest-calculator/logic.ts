export type CompoundingFrequency = 'annual' | 'semi-annual' | 'quarterly' | 'monthly' | 'daily';

export type ContributionFrequency = 'monthly' | 'quarterly' | 'annual';
export type ContributionTiming = 'end' | 'start';

export interface CompoundInterestResult {
  futureValue: number;
  interestEarned: number;
  totalContributions: number;
  yearlyBreakdown: YearlyData[];
}

export interface YearlyData {
  year: number;
  principal: number;
  /** Regular contributions paid in so far (cumulative). */
  contributions: number;
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
  contribution?: number;
  contributionFrequency?: ContributionFrequency;
  contributionTiming?: ContributionTiming;
}

export const CONTRIBUTIONS_PER_YEAR: Record<ContributionFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annual: 1,
};

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
  frequency: CompoundingFrequency,
  contribution: number = 0,
  contributionFrequency: ContributionFrequency = 'monthly',
  timing: ContributionTiming = 'end'
): CompoundInterestResult {
  const n = FREQUENCY_MAP[frequency];
  const r = rate / 100;
  const m = CONTRIBUTIONS_PER_YEAR[contributionFrequency];
  // Growth of 1 unit left in for t years: (1 + r/n)^(n × t)
  const growth = (t: number) => Math.pow(1 + r / n, n * t);

  // Balance after t years. Each contribution grows from the moment it is
  // paid: at the start (0, 1/m, …) or end (1/m, 2/m, …) of its period.
  const balanceAt = (t: number) => {
    let total = principal * growth(t);
    let paid = 0;
    if (contribution > 0) {
      const count = timing === 'start' ? Math.ceil(m * t - 1e-9) : Math.floor(m * t + 1e-9);
      for (let j = 0; j < count; j++) {
        const paidAt = (timing === 'start' ? j : j + 1) / m;
        total += contribution * growth(t - paidAt);
        paid += contribution;
      }
    }
    return { total, paid };
  };

  // FV = P × (1 + r/n)^(n × t) + the grown value of every contribution
  const end = balanceAt(time);
  const futureValue = end.total;
  const interestEarned = futureValue - principal - end.paid;
  
  // Generate yearly breakdown
  const yearlyBreakdown: YearlyData[] = [];
  for (let year = 1; year <= time; year++) {
    const { total, paid } = balanceAt(year);
    yearlyBreakdown.push({
      year,
      principal,
      contributions: paid,
      interest: total - principal - paid,
      total
    });
  }
  
  return {
    futureValue: isFinite(futureValue) ? futureValue : 0,
    interestEarned: isFinite(interestEarned) ? interestEarned : 0,
    totalContributions: end.paid,
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
    contributions: data.contributions,
    total: data.total,
    interest: data.interest
  }));
}

export function generateCSV(
  yearlyBreakdown: YearlyData[],
  principal: number,
  rate: number,
  frequency: CompoundingFrequency,
  contribution: number = 0,
  contributionFrequency: ContributionFrequency = 'monthly',
  timing: ContributionTiming = 'end'
): string {
  const withContributions = contribution > 0;
  const headers = withContributions
    ? ['Year', 'Principal', 'Contributions', 'Interest Earned', 'Total Amount']
    : ['Year', 'Principal', 'Interest Earned', 'Total Amount'];
  // Plain numbers: a thousands separator would split a CSV cell in two
  const rows = yearlyBreakdown.map(data => [
    data.year.toString(),
    data.principal.toFixed(2),
    ...(withContributions ? [data.contributions.toFixed(2)] : []),
    data.interest.toFixed(2),
    data.total.toFixed(2)
  ]);
  
  const csvContent = [
    `Compound Interest Calculation - ${new Date().toLocaleDateString()}`,
    `Principal: ${principal.toFixed(2)}`,
    `Interest Rate: ${rate}%`,
    `Compounding: ${frequency}`,
    ...(withContributions
      ? [`Contribution: ${contribution.toFixed(2)} ${contributionFrequency} (${timing} of period)`]
      : []),
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