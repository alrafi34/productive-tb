// ── Outlier Detection Calculator Logic ──

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

export type OutlierMethod = "iqr" | "zscore" | "modified-zscore" | "percentile" | "custom";

export const METHODS: { id: OutlierMethod; label: string; defaultThreshold: number; thresholdLabel: string }[] = [
  { id: "iqr", label: "IQR Rule (1.5×)", defaultThreshold: 1.5, thresholdLabel: "IQR Multiplier (k)" },
  { id: "zscore", label: "Z-Score Method", defaultThreshold: 3, thresholdLabel: "Z-Score Threshold" },
  { id: "modified-zscore", label: "Modified Z-Score (MAD)", defaultThreshold: 3.5, thresholdLabel: "Modified Z-Score Threshold" },
  { id: "percentile", label: "Percentile-Based", defaultThreshold: 0, thresholdLabel: "Percentile Bounds" },
  { id: "custom", label: "Custom Threshold", defaultThreshold: 0, thresholdLabel: "Min / Max Bounds" },
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

function median(sorted: number[]): number {
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
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

function modeOf(values: number[]): { modes: number[]; frequency: number } {
  const freq = new Map<number, number>();
  values.forEach((v) => freq.set(v, (freq.get(v) ?? 0) + 1));
  const maxFreq = Math.max(...freq.values());
  if (maxFreq <= 1) return { modes: [], frequency: 1 };
  const modes = [...freq.entries()].filter(([, c]) => c === maxFreq).map(([v]) => v).sort((a, b) => a - b);
  return { modes, frequency: maxFreq };
}

export interface ScoredPoint {
  index: number;
  value: number;
  score: number;
  isOutlier: boolean;
}

export interface DetectOptions {
  method: OutlierMethod;
  threshold: number;
  lowerPercentile: number;
  upperPercentile: number;
  customMin: number | null;
  customMax: number | null;
  decimals: number;
}

export interface OutlierResult {
  method: OutlierMethod;
  threshold: number;
  points: ScoredPoint[];
  outliers: ScoredPoint[];
  outlierCount: number;
  outlierPct: number;
  lowerBound: number | null;
  upperBound: number | null;
  q1: number;
  q3: number;
  iqr: number;
  mean: number;
  stdDev: number;
  variance: number;
  median: number;
  mad: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  decimals: number;
}

export function detectOutliers(values: number[], opts: DetectOptions): OutlierResult | null {
  if (values.length === 0) return null;
  const { method, threshold, lowerPercentile, upperPercentile, customMin, customMax, decimals } = opts;
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const q1 = percentileOf(sorted, 25);
  const q3 = percentileOf(sorted, 75);
  const iqr = q3 - q1;
  const m = mean(values);
  const sd = stdDevPopulation(values);
  const variance = sd * sd;
  const med = median(sorted);
  const absDevs = values.map((v) => Math.abs(v - med)).sort((a, b) => a - b);
  const mad = median(absDevs);
  const { modes } = modeOf(values);

  let lowerBound: number | null = null;
  let upperBound: number | null = null;
  let points: ScoredPoint[];

  if (method === "iqr") {
    lowerBound = q1 - threshold * iqr;
    upperBound = q3 + threshold * iqr;
    points = values.map((v, i) => {
      const beyond = v < (lowerBound as number) ? (lowerBound as number) - v : v > (upperBound as number) ? v - (upperBound as number) : 0;
      return {
        index: i, value: v,
        score: round(iqr === 0 ? 0 : beyond / iqr, decimals),
        isOutlier: v < (lowerBound as number) || v > (upperBound as number),
      };
    });
  } else if (method === "zscore") {
    points = values.map((v, i) => {
      const z = sd === 0 ? 0 : (v - m) / sd;
      return { index: i, value: v, score: round(z, decimals), isOutlier: Math.abs(z) > threshold };
    });
  } else if (method === "modified-zscore") {
    points = values.map((v, i) => {
      const mz = mad === 0 ? 0 : (0.6745 * (v - med)) / mad;
      return { index: i, value: v, score: round(mz, decimals), isOutlier: Math.abs(mz) > threshold };
    });
  } else if (method === "percentile") {
    lowerBound = percentileOf(sorted, lowerPercentile);
    upperBound = percentileOf(sorted, upperPercentile);
    points = values.map((v, i) => {
      const beyond = v < (lowerBound as number) ? (lowerBound as number) - v : v > (upperBound as number) ? v - (upperBound as number) : 0;
      const range = (upperBound as number) - (lowerBound as number);
      return {
        index: i, value: v,
        score: round(range === 0 ? 0 : beyond / range, decimals),
        isOutlier: v < (lowerBound as number) || v > (upperBound as number),
      };
    });
  } else {
    lowerBound = customMin;
    upperBound = customMax;
    points = values.map((v, i) => ({
      index: i, value: v,
      score: round(v, decimals),
      isOutlier: (lowerBound !== null && v < lowerBound) || (upperBound !== null && v > upperBound),
    }));
  }

  const outliers = points.filter((p) => p.isOutlier);

  return {
    method, threshold, points, outliers,
    outlierCount: outliers.length,
    outlierPct: round((outliers.length / n) * 100, decimals),
    lowerBound: lowerBound !== null ? round(lowerBound, decimals) : null,
    upperBound: upperBound !== null ? round(upperBound, decimals) : null,
    q1: round(q1, decimals), q3: round(q3, decimals), iqr: round(iqr, decimals),
    mean: round(m, decimals), stdDev: round(sd, decimals), variance: round(variance, decimals),
    median: round(med, decimals), mad: round(mad, decimals),
    mode: modes.map((v) => round(v, decimals)),
    min: round(sorted[0], decimals), max: round(sorted[n - 1], decimals), range: round(sorted[n - 1] - sorted[0], decimals),
    decimals,
  };
}

// ── Sample data ──

export const SAMPLE_DATASETS: { name: string; text: string; method: OutlierMethod }[] = [
  { name: "Exam Scores with Outliers", text: "62, 65, 68, 70, 72, 74, 75, 76, 78, 80, 82, 85, 88, 90, 15, 99", method: "iqr" },
  { name: "Server Response Times (ms)", text: "120, 130, 125, 128, 135, 122, 140, 500, 118, 132, 127, 131", method: "zscore" },
  { name: "Sensor Readings", text: "22.1, 22.4, 22.0, 22.3, 22.5, 22.2, 22.6, 45.8, 22.1, 22.3", method: "modified-zscore" },
];

export function generateRandomSample(): string {
  const count = 20 + Math.floor(Math.random() * 20);
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    values.push(Math.round((50 + z * 8) * 10) / 10);
  }
  // inject one or two outliers
  const outlierCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < outlierCount; i++) {
    values.push(Math.round((50 + (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 20)) * 10) / 10);
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

const INPUT_KEY = "outlier-detection-calculator-input";

export interface SavedInput {
  text: string;
  method: OutlierMethod;
  threshold: number;
  lowerPercentile: number;
  upperPercentile: number;
  customMin: string;
  customMax: string;
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
  outlierCount: number;
}

const HISTORY_KEY = "outlier-detection-calculator-history";

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

const METHOD_LABELS: Record<OutlierMethod, string> = {
  iqr: "IQR Rule", zscore: "Z-Score Method", "modified-zscore": "Modified Z-Score (MAD)",
  percentile: "Percentile-Based", custom: "Custom Threshold",
};

export function cleanDataset(result: OutlierResult): number[] {
  return result.points.filter((p) => !p.isOutlier).map((p) => p.value);
}

export function buildTextReport(result: OutlierResult, values: number[]): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Outlier Detection Calculator Report",
    "======================================",
    `Generated: ${ts}`,
    `Method: ${METHOD_LABELS[result.method]}`,
    `Threshold: ${result.threshold}`,
    "",
    `Dataset Count: ${result.points.length}`,
    `Outliers Found: ${result.outlierCount} (${result.outlierPct}%)`,
  ];
  if (result.lowerBound !== null) lines.push(`Lower Bound: ${result.lowerBound}`, `Upper Bound: ${result.upperBound}`);
  lines.push(
    "",
    `Mean: ${result.mean}`,
    `Median: ${result.median}`,
    `Mode: ${result.mode.length ? result.mode.join(", ") : "None"}`,
    `Min: ${result.min}`,
    `Max: ${result.max}`,
    `Range: ${result.range}`,
    `Std Dev: ${result.stdDev}`,
    `Variance: ${result.variance}`,
    `MAD: ${result.mad}`,
    `Q1: ${result.q1}`,
    `Q3: ${result.q3}`,
    `IQR: ${result.iqr}`,
    "",
    "Outlier Values:",
    result.outliers.map((o) => `${o.value} (score: ${o.score})`).join(", ") || "None",
    "",
    "Original Dataset:",
    values.join(", "),
    "",
    "Generated by Outlier Detection Calculator — https://productivetoolbox.com",
  );
  return lines.join("\n");
}

export function buildCSVReport(result: OutlierResult): string {
  const rows = ["Index,Value,Score,Is Outlier", ...result.points.map((p) => `${p.index + 1},${p.value},${p.score},${p.isOutlier}`)];
  return rows.join("\n");
}

export function buildJSONReport(result: OutlierResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: OutlierResult): string {
  return `<!DOCTYPE html><html><head><title>Outlier Detection Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px} .outlier{color:#dc2626;font-weight:bold}</style>
  </head><body>
  <h1>Outlier Detection Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Method: ${METHOD_LABELS[result.method]} · Threshold: ${result.threshold} · Outliers: ${result.outlierCount} (${result.outlierPct}%)</p>
  <table>
    <thead><tr><th>Index</th><th>Value</th><th>Score</th><th>Outlier?</th></tr></thead>
    <tbody>
      ${result.points.map((p) => `<tr class="${p.isOutlier ? "outlier" : ""}"><td>${p.index + 1}</td><td>${p.value}</td><td>${p.score}</td><td>${p.isOutlier ? "Yes" : "No"}</td></tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
}
