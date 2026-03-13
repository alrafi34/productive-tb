export interface StatisticalResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  variance: number;
  standardDeviation: number;
  sampleVariance: number;
  sampleStandardDeviation: number;
}

export interface DatasetHistory {
  id: string;
  data: number[];
  timestamp: number;
  label?: string;
}

export function parseNumbers(input: string): number[] {
  if (!input.trim()) return [];

  const separators = /[,\s\t\n]+/;
  const parts = input.trim().split(separators).filter(part => part.length > 0);

  const numbers: number[] = [];
  for (const part of parts) {
    const num = parseFloat(part);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  return numbers;
}

export function calculateStatistics(numbers: number[]): StatisticalResult | null {
  if (numbers.length === 0) return null;

  const count = numbers.length;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / count;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const median = count % 2 === 0
    ? (sortedNumbers[count / 2 - 1] + sortedNumbers[count / 2]) / 2
    : sortedNumbers[Math.floor(count / 2)];

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const range = max - min;

  const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
  const sumSquaredDifferences = squaredDifferences.reduce((acc, val) => acc + val, 0);

  const variance = sumSquaredDifferences / count;
  const standardDeviation = Math.sqrt(variance);

  const sampleVariance = count > 1 ? sumSquaredDifferences / (count - 1) : 0;
  const sampleStandardDeviation = Math.sqrt(sampleVariance);

  return {
    count,
    sum,
    mean: Math.round(mean * 10000) / 10000,
    median: Math.round(median * 10000) / 10000,
    min,
    max,
    range,
    variance: Math.round(variance * 10000) / 10000,
    standardDeviation: Math.round(standardDeviation * 10000) / 10000,
    sampleVariance: Math.round(sampleVariance * 10000) / 10000,
    sampleStandardDeviation: Math.round(sampleStandardDeviation * 10000) / 10000
  };
}

export function generateRandomDataset(count: number = 20, min: number = 1, max: number = 100): number[] {
  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
}

export function formatNumber(num: number): string {
  if (Number.isInteger(num)) return num.toString();
  return num.toFixed(4).replace(/\.?0+$/, '');
}

export function createResultsSummary(data: number[], stats: StatisticalResult, isPopulation: boolean): string {
  const dataStr = data.join(', ');
  const sdValue = isPopulation ? stats.standardDeviation : stats.sampleStandardDeviation;
  const varValue = isPopulation ? stats.variance : stats.sampleVariance;

  return `Dataset: ${dataStr}

Count: ${stats.count}
Sum: ${stats.sum}
Mean: ${formatNumber(stats.mean)}
Median: ${formatNumber(stats.median)}
Minimum: ${stats.min}
Maximum: ${stats.max}
Range: ${stats.range}
Variance: ${formatNumber(varValue)}
Standard Deviation: ${formatNumber(sdValue)}`;
}

export function exportAsCSV(data: number[], stats: StatisticalResult, isPopulation: boolean): string {
  const sdValue = isPopulation ? stats.standardDeviation : stats.sampleStandardDeviation;
  const varValue = isPopulation ? stats.variance : stats.sampleVariance;

  const lines = [
    'Statistic,Value',
    `Count,${stats.count}`,
    `Sum,${stats.sum}`,
    `Mean,${formatNumber(stats.mean)}`,
    `Median,${formatNumber(stats.median)}`,
    `Minimum,${stats.min}`,
    `Maximum,${stats.max}`,
    `Range,${stats.range}`,
    `Variance,${formatNumber(varValue)}`,
    `Standard Deviation,${formatNumber(sdValue)}`,
    '',
    'Data Points',
    data.join('\n')
  ];

  return lines.join('\n');
}

export function exportAsJSON(data: number[], stats: StatisticalResult, isPopulation: boolean): string {
  const sdValue = isPopulation ? stats.standardDeviation : stats.sampleStandardDeviation;
  const varValue = isPopulation ? stats.variance : stats.sampleVariance;

  const result = {
    metadata: {
      type: isPopulation ? 'population' : 'sample',
      timestamp: new Date().toISOString()
    },
    statistics: {
      count: stats.count,
      sum: stats.sum,
      mean: stats.mean,
      median: stats.median,
      minimum: stats.min,
      maximum: stats.max,
      range: stats.range,
      variance: varValue,
      standardDeviation: sdValue
    },
    data: data
  };

  return JSON.stringify(result, null, 2);
}

export function saveToHistory(data: number[], label?: string): DatasetHistory {
  return {
    id: crypto.randomUUID(),
    data,
    timestamp: Date.now(),
    label
  };
}

export function getHistoryFromStorage(): DatasetHistory[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem('std-dev-calculator-history');
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveHistoryToStorage(history: DatasetHistory[]): void {
  if (typeof window === 'undefined') return;

  const trimmed = history.slice(0, 20);
  localStorage.setItem('std-dev-calculator-history', JSON.stringify(trimmed));
}

export function clearHistoryFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('std-dev-calculator-history');
}

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

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
