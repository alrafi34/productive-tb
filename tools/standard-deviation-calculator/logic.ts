// ── Standard Deviation Calculator Logic ──

export type CalcType = "population" | "sample";

const SPLIT_RE = /[\s,;\t\n]+/;

export interface ParsedDataset {
  values: number[];
  invalidTokens: string[];
}

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

export interface StatsResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  populationVariance: number;
  populationStdDev: number;
  sampleVariance: number;
  sampleStdDev: number;
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  coefficientOfVariation: number;
  standardError: number;
  sorted: number[];
}

function median(sorted: number[]): number {
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function quartile(sorted: number[], q1: boolean): number {
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  const half = q1 ? sorted.slice(0, mid) : sorted.slice(n % 2 === 0 ? mid : mid + 1);
  return half.length ? median(half) : sorted[q1 ? 0 : n - 1];
}

function computeMode(values: number[]): number[] {
  const freq = new Map<number, number>();
  for (const v of values) freq.set(v, (freq.get(v) ?? 0) + 1);
  const maxFreq = Math.max(...freq.values());
  if (maxFreq <= 1) return [];
  return Array.from(freq.entries()).filter(([, c]) => c === maxFreq).map(([v]) => v).sort((a, b) => a - b);
}

export function calculateStats(values: number[], decimals: number): StatsResult | null {
  if (values.length === 0) return null;

  const round = (v: number) => (isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN);
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;

  const sqDiffSum = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const populationVariance = sqDiffSum / n;
  const populationStdDev = Math.sqrt(populationVariance);
  const sampleVariance = n > 1 ? sqDiffSum / (n - 1) : 0;
  const sampleStdDev = Math.sqrt(sampleVariance);

  const min = sorted[0];
  const max = sorted[n - 1];
  const q1 = quartile(sorted, true);
  const q3 = quartile(sorted, false);

  return {
    count: n,
    sum: round(sum),
    mean: round(mean),
    median: round(median(sorted)),
    mode: computeMode(sorted).map(round),
    populationVariance: round(populationVariance),
    populationStdDev: round(populationStdDev),
    sampleVariance: round(sampleVariance),
    sampleStdDev: round(sampleStdDev),
    min: round(min),
    max: round(max),
    range: round(max - min),
    q1: round(q1),
    q3: round(q3),
    iqr: round(q3 - q1),
    coefficientOfVariation: mean !== 0 ? round((sampleStdDev / Math.abs(mean)) * 100) : 0,
    standardError: round(sampleStdDev / Math.sqrt(n)),
    sorted,
  };
}

export function getSD(result: StatsResult, calcType: CalcType): number {
  return calcType === "population" ? result.populationStdDev : result.sampleStdDev;
}
export function getVariance(result: StatsResult, calcType: CalcType): number {
  return calcType === "population" ? result.populationVariance : result.sampleVariance;
}

// ── Sample data ───────────────────────────────────────────────────────────────

export const SAMPLE_TEXT = "10, 20, 30, 40, 50";

export function generateRandomSample(): string {
  const count = 15 + Math.floor(Math.random() * 20);
  const mean = 50 + Math.random() * 50;
  const spread = 10 + Math.random() * 20;
  const values = Array.from({ length: count }, () => {
    // Box-Muller transform for a roughly normal-looking distribution.
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.round((mean + z * spread) * 10) / 10;
  });
  return values.join(", ");
}

// ── Histogram bucketing ────────────────────────────────────────────────────────

export interface HistogramBin {
  min: number;
  max: number;
  count: number;
}

export function buildHistogram(sorted: number[], binCount = 10): HistogramBin[] {
  if (sorted.length === 0) return [];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  if (min === max) return [{ min, max, count: sorted.length }];

  const width = (max - min) / binCount;
  const bins: HistogramBin[] = Array.from({ length: binCount }, (_, i) => ({
    min: min + i * width,
    max: min + (i + 1) * width,
    count: 0,
  }));
  for (const v of sorted) {
    const idx = Math.min(binCount - 1, Math.floor((v - min) / width));
    bins[idx].count++;
  }
  return bins;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

// ── LocalStorage: last-session input ──────────────────────────────────────────

const INPUT_KEY = "standard-deviation-calculator-input";

export function saveInput(text: string, calcType: CalcType, decimals: number): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ text, calcType, decimals })); } catch {}
}

export function loadInput(): { text: string; calcType: CalcType; decimals: number } | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  calcType: CalcType;
  result: StatsResult;
}

const HISTORY_KEY = "standard-deviation-calculator-history";

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

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: StatsResult, calcType: CalcType): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Standard Deviation Calculator Report",
    "=====================================",
    `Generated: ${ts}`,
    `Calculation Type: ${calcType === "population" ? "Population" : "Sample"}`,
    "",
    `Count: ${result.count}`,
    `Sum: ${result.sum}`,
    `Mean: ${result.mean}`,
    `Median: ${result.median}`,
    `Mode: ${result.mode.length ? result.mode.join(", ") : "None"}`,
    `Minimum: ${result.min}`,
    `Maximum: ${result.max}`,
    `Range: ${result.range}`,
    "",
    `Population Variance: ${result.populationVariance}`,
    `Population Standard Deviation: ${result.populationStdDev}`,
    `Sample Variance: ${result.sampleVariance}`,
    `Sample Standard Deviation: ${result.sampleStdDev}`,
    "",
    `Q1: ${result.q1}`,
    `Q3: ${result.q3}`,
    `Interquartile Range: ${result.iqr}`,
    `Coefficient of Variation: ${result.coefficientOfVariation}%`,
    `Standard Error: ${result.standardError}`,
    "",
    `Sorted Dataset: ${result.sorted.join(", ")}`,
    "",
    "Generated by Standard Deviation Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: StatsResult): string {
  const rows: [string, string][] = [
    ["Count", String(result.count)],
    ["Sum", String(result.sum)],
    ["Mean", String(result.mean)],
    ["Median", String(result.median)],
    ["Mode", result.mode.length ? result.mode.join(" ") : "None"],
    ["Minimum", String(result.min)],
    ["Maximum", String(result.max)],
    ["Range", String(result.range)],
    ["Population Variance", String(result.populationVariance)],
    ["Population Standard Deviation", String(result.populationStdDev)],
    ["Sample Variance", String(result.sampleVariance)],
    ["Sample Standard Deviation", String(result.sampleStdDev)],
    ["Q1", String(result.q1)],
    ["Q3", String(result.q3)],
    ["Interquartile Range", String(result.iqr)],
    ["Coefficient of Variation (%)", String(result.coefficientOfVariation)],
    ["Standard Error", String(result.standardError)],
  ];
  return ["Metric,Value", ...rows.map(([k, v]) => `"${k}","${v}"`)].join("\n");
}

export function buildJSONReport(result: StatsResult, calcType: CalcType): string {
  return JSON.stringify({ calcType, ...result, generatedAt: new Date().toISOString() }, null, 2);
}
