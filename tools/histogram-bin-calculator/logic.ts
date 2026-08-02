// ── Histogram Bin Calculator Logic ──

export interface ParsedDataset {
  values: number[];
  invalidTokens: string[];
}

const SPLIT_RE = /[\s,;\t\n]+/;

export function parseDataset(input: string): ParsedDataset {
  const tokens = input.split(SPLIT_RE).map((t) => t.trim()).filter(Boolean);
  const values: number[] = [];
  const invalidTokens: string[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (token !== "" && !isNaN(n) && isFinite(n)) values.push(n);
    else invalidTokens.push(token);
  }
  return { values, invalidTokens };
}

export type BinMethod = "auto" | "sturges" | "rice" | "sqrt" | "freedman-diaconis" | "scott" | "doane" | "manual";

export const STATISTICAL_METHODS: BinMethod[] = ["sqrt", "sturges", "rice", "scott", "freedman-diaconis", "doane"];

export const BIN_METHODS: { id: BinMethod; label: string; formula: string; description: string }[] = [
  { id: "auto", label: "Auto (Compare All)", formula: "Recommended = median of all methods", description: "Runs every statistical method and recommends the median bin count across all of them, while showing you the full comparison." },
  { id: "sqrt", label: "Square Root Rule", formula: "k = ⌈√n⌉", description: "The simplest rule — bin count is the square root of the sample size. A reasonable default for quick, informal histograms." },
  { id: "sturges", label: "Sturges' Rule", formula: "k = ⌈log₂(n) + 1⌉", description: "Assumes roughly normally distributed data. Works well for small-to-moderate, symmetric datasets, but can under-bin large or skewed data." },
  { id: "rice", label: "Rice Rule", formula: "k = ⌈2 × n^(1/3)⌉", description: "A simple alternative to Sturges' that depends only on sample size and tends to recommend more bins for larger datasets." },
  { id: "scott", label: "Scott's Rule", formula: "width = 3.49 × σ ÷ n^(1/3)", description: "Minimizes the integrated mean squared error for data that is approximately normally distributed, using the standard deviation." },
  { id: "freedman-diaconis", label: "Freedman–Diaconis Rule", formula: "width = 2 × IQR ÷ n^(1/3)", description: "Uses the interquartile range instead of standard deviation, making it robust to outliers and skewed distributions." },
  { id: "doane", label: "Doane's Formula", formula: "k = 1 + log₂(n) + log₂(1 + |g₁|/σ_g₁)", description: "An extension of Sturges' Rule that adjusts for skewness in the data, performing better than Sturges' on non-normal distributions." },
  { id: "manual", label: "Manual Bin Count", formula: "User-specified", description: "Overrides every formula and lets you set the exact number of bins yourself." },
];

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stdDevPopulation(values: number[]): number {
  const m = mean(values);
  const variance = values.reduce((a, v) => a + (v - m) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function percentileOf(sorted: number[], p: number): number {
  const n = sorted.length;
  if (n === 1) return sorted[0];
  const rank = (p / 100) * (n - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sorted[lower];
  const frac = rank - lower;
  return sorted[lower] + frac * (sorted[upper] - sorted[lower]);
}

function medianOf(sorted: number[]): number {
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

// Population-moment skewness (g1 = m3 / m2^1.5) — the form used by Doane's formula.
function momentSkewness(values: number[]): number {
  const n = values.length;
  const m = mean(values);
  const m2 = values.reduce((a, v) => a + (v - m) ** 2, 0) / n;
  const m3 = values.reduce((a, v) => a + (v - m) ** 3, 0) / n;
  if (m2 === 0) return 0;
  return m3 / Math.pow(m2, 1.5);
}

export interface DatasetStatistics {
  n: number;
  min: number;
  max: number;
  range: number;
  mean: number;
  median: number;
  variance: number; // sample variance (n-1)
  stdDev: number; // sample standard deviation (n-1)
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
}

export function computeStatistics(values: number[], decimals: number): DatasetStatistics {
  const sorted = [...values].sort((a, b) => a - b);
  const n = values.length;
  const min = sorted[0];
  const max = sorted[n - 1];
  const m = mean(values);
  const variance = n > 1 ? values.reduce((a, v) => a + (v - m) ** 2, 0) / (n - 1) : 0;
  const q1 = percentileOf(sorted, 25);
  const q3 = percentileOf(sorted, 75);

  return {
    n,
    min: round(min, decimals),
    max: round(max, decimals),
    range: round(max - min, decimals),
    mean: round(m, decimals),
    median: round(medianOf(sorted), decimals),
    variance: round(variance, decimals),
    stdDev: round(Math.sqrt(variance), decimals),
    q1: round(q1, decimals),
    q3: round(q3, decimals),
    iqr: round(q3 - q1, decimals),
    skewness: round(momentSkewness(values), decimals),
  };
}

export interface HistogramBin {
  index: number;
  min: number;
  max: number;
  count: number;
  frequency: number;
  label: string;
}

export interface HistogramResult {
  method: BinMethod;
  binCount: number;
  binWidth: number;
  bins: HistogramBin[];
  min: number;
  max: number;
  range: number;
  n: number;
  maxCount: number;
  stats: DatasetStatistics;
  comparisons: MethodComparison[];
  recommendedBinCount: number;
}

export interface MethodComparison {
  method: BinMethod;
  label: string;
  binCount: number;
}

export function compareAllMethods(values: number[]): MethodComparison[] {
  return STATISTICAL_METHODS.map((id) => ({
    method: id,
    label: BIN_METHODS.find((m) => m.id === id)!.label,
    binCount: computeBinCount(values, id, 0),
  }));
}

function recommendedFromComparisons(comparisons: MethodComparison[]): number {
  const sorted = [...comparisons.map((c) => c.binCount)].sort((a, b) => a - b);
  return Math.max(1, Math.round(medianOf(sorted)));
}

export function computeBinCount(values: number[], method: BinMethod, manualCount: number): number {
  const n = values.length;
  if (method === "manual") return Math.max(1, manualCount);
  if (method === "auto") return recommendedFromComparisons(compareAllMethods(values));

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  switch (method) {
    case "sturges":
      return Math.max(1, Math.ceil(Math.log2(n) + 1));
    case "rice":
      return Math.max(1, Math.ceil(2 * Math.cbrt(n)));
    case "sqrt":
      return Math.max(1, Math.ceil(Math.sqrt(n)));
    case "freedman-diaconis": {
      const sorted = [...values].sort((a, b) => a - b);
      const iqr = percentileOf(sorted, 75) - percentileOf(sorted, 25);
      if (iqr === 0) return Math.max(1, Math.ceil(Math.sqrt(n)));
      const width = (2 * iqr) / Math.cbrt(n);
      return Math.max(1, Math.ceil(range / width));
    }
    case "scott": {
      const sd = stdDevPopulation(values);
      if (sd === 0) return Math.max(1, Math.ceil(Math.sqrt(n)));
      const width = (3.49 * sd) / Math.cbrt(n);
      return Math.max(1, Math.ceil(range / width));
    }
    case "doane": {
      if (n < 3) return Math.max(1, Math.ceil(Math.log2(n) + 1));
      const g1 = momentSkewness(values);
      const sigmaG1 = Math.sqrt((6 * (n - 2)) / ((n + 1) * (n + 3)));
      if (sigmaG1 === 0) return Math.max(1, Math.ceil(Math.log2(n) + 1));
      return Math.max(1, Math.ceil(1 + Math.log2(n) + Math.log2(1 + Math.abs(g1) / sigmaG1)));
    }
  }
}

export function calculateHistogram(values: number[], method: BinMethod, manualCount: number, decimals: number): HistogramResult | null {
  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const n = values.length;

  const binCount = computeBinCount(values, method, manualCount);
  const binWidth = range / binCount;

  const bins: HistogramBin[] = Array.from({ length: binCount }, (_, i) => {
    const binMin = min + i * binWidth;
    const binMax = i === binCount - 1 ? max : min + (i + 1) * binWidth;
    return { index: i, min: round(binMin, decimals), max: round(binMax, decimals), count: 0, frequency: 0, label: "" };
  });

  values.forEach((v) => {
    let idx = Math.floor(((v - min) / range) * binCount);
    if (idx >= binCount) idx = binCount - 1;
    if (idx < 0) idx = 0;
    bins[idx].count++;
  });

  bins.forEach((b) => {
    b.frequency = round((b.count / n) * 100, decimals);
    b.label = `${formatNum(b.min)} – ${formatNum(b.max)}`;
  });

  const comparisons = compareAllMethods(values);

  return {
    method, binCount, binWidth: round(binWidth, decimals), bins,
    min: round(min, decimals), max: round(max, decimals), range: round(range, decimals),
    n, maxCount: Math.max(...bins.map((b) => b.count), 1),
    stats: computeStatistics(values, decimals),
    comparisons,
    recommendedBinCount: recommendedFromComparisons(comparisons),
  };
}

// ── Sample data ──

export const SAMPLE_DATASETS: { name: string; text: string; method: BinMethod }[] = [
  { name: "Exam Scores (40 students)", text: "55, 58, 62, 63, 65, 67, 68, 70, 71, 72, 73, 74, 75, 75, 76, 77, 78, 78, 79, 80, 81, 82, 82, 83, 84, 85, 86, 87, 88, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99", method: "sturges" },
  { name: "Website Load Times (ms)", text: "210, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 380, 400, 420, 450, 480, 520, 600, 750", method: "rice" },
  { name: "Employee Ages", text: "22, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 42, 44, 46, 48, 50, 52, 55, 58, 60", method: "sqrt" },
];

export function generateRandomSample(): string {
  const count = 30 + Math.floor(Math.random() * 40);
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    values.push(Math.round((50 + z * 12) * 10) / 10);
  }
  return values.join(", ");
}

// ── Formatting ──

export function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: last-session input ──

const INPUT_KEY = "histogram-bin-calculator-input";

export interface SavedInput {
  text: string;
  method: BinMethod;
  manualCount: number;
  decimals: number;
}

export function saveInput(data: SavedInput): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify(data)); } catch {}
}

export function loadInput(): SavedInput | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: SavedInput;
  binCount: number;
}

const HISTORY_KEY = "histogram-bin-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export helpers ──

const METHOD_LABELS: Record<BinMethod, string> = {
  auto: "Auto (Compare All)", sturges: "Sturges' Rule", rice: "Rice Rule", sqrt: "Square Root Rule",
  "freedman-diaconis": "Freedman-Diaconis Rule", scott: "Scott's Rule", doane: "Doane's Formula", manual: "Manual Bin Count",
};

export function buildTextReport(result: HistogramResult, values: number[]): string {
  const ts = new Date().toLocaleString("en-US");
  const s = result.stats;
  return [
    "Histogram Bin Calculator Report",
    "==================================",
    `Generated: ${ts}`,
    `Method: ${METHOD_LABELS[result.method]}`,
    "",
    "Descriptive Statistics:",
    `Sample Size (n): ${s.n}`,
    `Min: ${s.min}`,
    `Max: ${s.max}`,
    `Range: ${s.range}`,
    `Mean: ${s.mean}`,
    `Median: ${s.median}`,
    `Variance: ${s.variance}`,
    `Standard Deviation: ${s.stdDev}`,
    `Q1: ${s.q1}`,
    `Q3: ${s.q3}`,
    `IQR: ${s.iqr}`,
    `Skewness: ${s.skewness}`,
    "",
    `Bin Count: ${result.binCount}`,
    `Bin Width: ${result.binWidth}`,
    "",
    "Method Comparison:",
    ...result.comparisons.map((c) => `${c.label}: ${c.binCount} bins`),
    `Recommended (median): ${result.recommendedBinCount} bins`,
    "",
    "Bin Range, Count, Frequency %:",
    ...result.bins.map((b) => `${b.label}, ${b.count}, ${b.frequency}%`),
    "",
    "Original Dataset:",
    values.join(", "),
    "",
    "Generated by Histogram Bin Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: HistogramResult): string {
  const s = result.stats;
  const rows = [
    "Statistic,Value",
    `Sample Size (n),${s.n}`, `Min,${s.min}`, `Max,${s.max}`, `Range,${s.range}`,
    `Mean,${s.mean}`, `Median,${s.median}`, `Variance,${s.variance}`, `Standard Deviation,${s.stdDev}`,
    `Q1,${s.q1}`, `Q3,${s.q3}`, `IQR,${s.iqr}`, `Skewness,${s.skewness}`,
    "",
    "Method,Bin Count",
    ...result.comparisons.map((c) => `${c.label},${c.binCount}`),
    `Recommended (median),${result.recommendedBinCount}`,
    "",
    "Bin Min,Bin Max,Count,Frequency %",
    ...result.bins.map((b) => `${b.min},${b.max},${b.count},${b.frequency}`),
  ];
  return rows.join("\n");
}

export function buildJSONReport(result: HistogramResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: HistogramResult): string {
  const s = result.stats;
  return `<!DOCTYPE html><html><head><title>Histogram Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} h2{font-size:15px;margin-top:24px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Histogram Bin Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Method: ${METHOD_LABELS[result.method]} · Bin Count: ${result.binCount} · Bin Width: ${result.binWidth}</p>
  <h2>Descriptive Statistics</h2>
  <table>
    <tbody>
      <tr><td>Sample Size (n)</td><td>${s.n}</td></tr>
      <tr><td>Min</td><td>${s.min}</td></tr>
      <tr><td>Max</td><td>${s.max}</td></tr>
      <tr><td>Range</td><td>${s.range}</td></tr>
      <tr><td>Mean</td><td>${s.mean}</td></tr>
      <tr><td>Median</td><td>${s.median}</td></tr>
      <tr><td>Variance</td><td>${s.variance}</td></tr>
      <tr><td>Standard Deviation</td><td>${s.stdDev}</td></tr>
      <tr><td>Q1</td><td>${s.q1}</td></tr>
      <tr><td>Q3</td><td>${s.q3}</td></tr>
      <tr><td>IQR</td><td>${s.iqr}</td></tr>
      <tr><td>Skewness</td><td>${s.skewness}</td></tr>
    </tbody>
  </table>
  <h2>Method Comparison</h2>
  <table>
    <thead><tr><th>Method</th><th>Bin Count</th></tr></thead>
    <tbody>
      ${result.comparisons.map((c) => `<tr><td>${c.label}</td><td>${c.binCount}</td></tr>`).join("")}
      <tr><td><strong>Recommended (median)</strong></td><td><strong>${result.recommendedBinCount}</strong></td></tr>
    </tbody>
  </table>
  <h2>Bin Frequency Table</h2>
  <table>
    <thead><tr><th>Bin Range</th><th>Count</th><th>Frequency %</th></tr></thead>
    <tbody>
      ${result.bins.map((b) => `<tr><td>${b.label}</td><td>${b.count}</td><td>${b.frequency}%</td></tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
}
