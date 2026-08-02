// ── Percentile Calculator Logic ──

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

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

export type PercentileMethod = "linear" | "inclusive" | "exclusive" | "nearest-rank";

export const PERCENTILE_METHODS: { id: PercentileMethod; label: string; description: string }[] = [
  { id: "linear", label: "Linear Interpolation (Default)", description: "Interpolates between the two closest ranked values — the most widely used method (Excel's PERCENTILE.INC)." },
  { id: "inclusive", label: "Inclusive Method", description: "Includes both endpoints of the dataset in the ranking, producing the same result as linear interpolation for most datasets." },
  { id: "exclusive", label: "Exclusive Method", description: "Excludes the endpoints from the ranking (Excel's PERCENTILE.EXC), which shifts results slightly toward the center for small datasets." },
  { id: "nearest-rank", label: "Nearest Rank Method", description: "Selects the value at the nearest whole rank without interpolating — simple and commonly used in official statistics." },
];

// Percentile value for a given method. Dataset must already be sorted ascending.
export function percentileOf(sorted: number[], p: number, method: PercentileMethod = "linear"): number {
  const n = sorted.length;
  if (n === 0) return NaN;
  if (n === 1) return sorted[0];

  if (method === "nearest-rank") {
    const rank = Math.max(1, Math.min(n, Math.ceil((p / 100) * n)));
    return sorted[rank - 1];
  }

  if (method === "exclusive") {
    const pos = (p / 100) * (n + 1);
    if (pos <= 1) return sorted[0];
    if (pos >= n) return sorted[n - 1];
    const lower = Math.floor(pos) - 1;
    const frac = pos - Math.floor(pos);
    return sorted[lower] + frac * (sorted[lower + 1] - sorted[lower]);
  }

  // "linear" and "inclusive" both use Excel's PERCENTILE.INC interpolation.
  const rank = (p / 100) * (n - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sorted[lower];
  const frac = rank - lower;
  return sorted[lower] + frac * (sorted[upper] - sorted[lower]);
}

// Inverse: percentile rank of a given value within the dataset — the percentage
// of values at or below it. Verified against worked examples: [50,60,70,80,90], value 70 → 60th
// percentile; [55,60,62,67,70,72,75,80], value 72 → 75th percentile.
export function percentileRankOf(sorted: number[], value: number): number {
  const n = sorted.length;
  if (n === 0) return NaN;
  let countAtOrBelow = 0;
  for (const v of sorted) {
    if (v <= value) countAtOrBelow++;
  }
  return (countAtOrBelow / n) * 100;
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function sampleStdDev(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;
  const m = mean(values);
  const variance = values.reduce((a, v) => a + (v - m) ** 2, 0) / (n - 1);
  return Math.sqrt(variance);
}

function countDuplicates(sorted: number[]): number {
  let dup = 0;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) dup++;
  }
  return dup;
}

export interface CommonPercentile {
  label: string;
  p: number;
  value: number;
}

export interface PercentileResult {
  sorted: number[];
  count: number;
  targetPercentile: number;
  targetValue: number;
  method: PercentileMethod;
  min: number;
  max: number;
  range: number;
  mean: number;
  median: number;
  stdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  duplicateCount: number;
  commonPercentiles: CommonPercentile[];
  rank: string;
}

const COMMON_PS = [1, 5, 10, 25, 50, 75, 90, 95, 99];

export function calculatePercentile(values: number[], targetPercentile: number, decimals: number, method: PercentileMethod = "linear"): PercentileResult | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const round2 = (v: number) => round(v, decimals);

  const targetValue = round2(percentileOf(sorted, targetPercentile, method));
  const q1 = round2(percentileOf(sorted, 25, method));
  const median = round2(percentileOf(sorted, 50, method));
  const q3 = round2(percentileOf(sorted, 75, method));

  const commonPercentiles: CommonPercentile[] = COMMON_PS.map((p) => ({
    label: `P${p}`,
    p,
    value: round2(percentileOf(sorted, p, method)),
  }));

  const n = sorted.length;
  const rankPosition = (targetPercentile / 100) * (n - 1) + 1;

  return {
    sorted, count: n, targetPercentile, targetValue, method,
    min: round2(sorted[0]), max: round2(sorted[n - 1]), range: round2(sorted[n - 1] - sorted[0]),
    mean: round2(mean(values)), median, stdDev: round2(sampleStdDev(values)),
    q1, q3, iqr: round2(q3 - q1),
    duplicateCount: countDuplicates(sorted),
    commonPercentiles,
    rank: `Interpolated position ${round2(rankPosition)} of ${n}`,
  };
}

export interface MultiplePercentileResult {
  p: number;
  value: number;
  valid: boolean;
}

export function calculateMultiplePercentiles(values: number[], percentileList: string, decimals: number, method: PercentileMethod = "linear"): MultiplePercentileResult[] {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const parts = percentileList.split(/[,;\s]+/).map((t) => t.trim()).filter(Boolean);
  return parts.map((token) => {
    const p = Number(token);
    const valid = Number.isFinite(p) && p >= 0 && p <= 100;
    return { p: valid ? p : NaN, value: valid ? round(percentileOf(sorted, p, method), decimals) : NaN, valid };
  });
}

export function calculatePercentileRank(values: number[], targetValue: number, decimals: number): number | null {
  if (values.length === 0 || !Number.isFinite(targetValue)) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return round(percentileRankOf(sorted, targetValue), decimals);
}

// ── Sample data ──

export const SAMPLE_DATASETS: { name: string; text: string; percentile: number }[] = [
  { name: "Test Scores (30 students)", text: "62, 68, 71, 74, 75, 78, 79, 80, 81, 82, 83, 84, 85, 85, 86, 87, 88, 88, 89, 90, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99", percentile: 90 },
  { name: "Response Times (ms)", text: "120, 135, 142, 150, 155, 160, 165, 170, 178, 185, 190, 200, 210, 225, 250, 300, 450", percentile: 95 },
  { name: "Household Income ($1000s)", text: "28, 32, 35, 38, 41, 44, 47, 50, 54, 58, 63, 69, 76, 85, 98, 120, 160", percentile: 50 },
];

export function generateRandomSample(): string {
  const count = 20 + Math.floor(Math.random() * 30);
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    values.push(Math.round((70 + z * 15) * 10) / 10);
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

const INPUT_KEY = "percentile-calculator-input";

export function saveInput(text: string, targetPercentile: number, decimals: number): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ text, targetPercentile, decimals })); } catch {}
}

export function loadInput(): { text: string; targetPercentile: number; decimals: number } | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  targetPercentile: number;
  targetValue: number;
}

const HISTORY_KEY = "percentile-calculator-history";

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

// ── Shareable URL ──

export function buildShareUrl(text: string, targetPercentile: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("data", text);
  url.searchParams.set("p", String(targetPercentile));
  return url.toString();
}

export function parseShareParams(): { text: string; targetPercentile: number } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const data = p.get("data");
  if (!data) return null;
  return { text: data, targetPercentile: parseFloat(p.get("p") ?? "50") || 50 };
}

// ── Export helpers ──

const METHOD_LABELS: Record<PercentileMethod, string> = {
  linear: "Linear Interpolation", inclusive: "Inclusive Method", exclusive: "Exclusive Method", "nearest-rank": "Nearest Rank Method",
};

export function buildTextReport(result: PercentileResult, values: number[]): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Percentile Calculator Report",
    "==============================",
    `Generated: ${ts}`,
    `Method: ${METHOD_LABELS[result.method]}`,
    "",
    `Dataset Count: ${result.count}`,
    `Target Percentile: P${result.targetPercentile}`,
    `Value at P${result.targetPercentile}: ${result.targetValue}`,
    `Rank: ${result.rank}`,
    "",
    `Min: ${result.min}`,
    `Max: ${result.max}`,
    `Range: ${result.range}`,
    `Mean: ${result.mean}`,
    `Median (P50): ${result.median}`,
    `Standard Deviation: ${result.stdDev}`,
    `Q1 (P25): ${result.q1}`,
    `Q3 (P75): ${result.q3}`,
    `IQR: ${result.iqr}`,
    `Duplicate Values: ${result.duplicateCount}`,
    "",
    "Common Percentiles:",
    ...result.commonPercentiles.map((c) => `${c.label}: ${c.value}`),
    "",
    "Original Dataset:",
    values.join(", "),
    "",
    "Generated by Percentile Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: PercentileResult): string {
  const rows = [
    "Statistic,Value",
    `Sample Size (n),${result.count}`, `Min,${result.min}`, `Max,${result.max}`, `Range,${result.range}`,
    `Mean,${result.mean}`, `Median,${result.median}`, `Standard Deviation,${result.stdDev}`,
    `Q1,${result.q1}`, `Q3,${result.q3}`, `IQR,${result.iqr}`, `Duplicate Values,${result.duplicateCount}`,
    "",
    "Percentile,Value",
    ...result.commonPercentiles.map((c) => `${c.p},${c.value}`),
    `${result.targetPercentile} (target),${result.targetValue}`,
  ];
  return rows.join("\n");
}

export function buildJSONReport(result: PercentileResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: PercentileResult): string {
  return `<!DOCTYPE html><html><head><title>Percentile Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} h2{font-size:15px;margin-top:24px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Percentile Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")} · Method: ${METHOD_LABELS[result.method]}</p>
  <p>Target Percentile: P${result.targetPercentile} = ${result.targetValue}</p>
  <h2>Descriptive Statistics</h2>
  <table>
    <tbody>
      <tr><td>Sample Size (n)</td><td>${result.count}</td></tr>
      <tr><td>Min</td><td>${result.min}</td></tr>
      <tr><td>Max</td><td>${result.max}</td></tr>
      <tr><td>Range</td><td>${result.range}</td></tr>
      <tr><td>Mean</td><td>${result.mean}</td></tr>
      <tr><td>Median</td><td>${result.median}</td></tr>
      <tr><td>Standard Deviation</td><td>${result.stdDev}</td></tr>
      <tr><td>Q1</td><td>${result.q1}</td></tr>
      <tr><td>Q3</td><td>${result.q3}</td></tr>
      <tr><td>IQR</td><td>${result.iqr}</td></tr>
    </tbody>
  </table>
  <h2>Common Percentiles</h2>
  <table>
    <thead><tr><th>Percentile</th><th>Value</th></tr></thead>
    <tbody>
      ${result.commonPercentiles.map((c) => `<tr><td>${c.label}</td><td>${c.value}</td></tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
}
