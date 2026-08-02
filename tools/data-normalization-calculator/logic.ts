// ── Data Normalization Calculator Logic ──

export type NormMethod = "minmax" | "minmax-custom" | "zscore" | "decimal" | "unitvector" | "meannorm" | "robust";

export const NORM_METHODS: { key: NormMethod; label: string }[] = [
  { key: "minmax", label: "Min-Max (0–1)" },
  { key: "minmax-custom", label: "Min-Max (Custom Range)" },
  { key: "zscore", label: "Z-Score Standardization" },
  { key: "decimal", label: "Decimal Scaling" },
  { key: "unitvector", label: "Unit Vector (L2)" },
  { key: "meannorm", label: "Mean Normalization" },
  { key: "robust", label: "Robust Scaling (Median & IQR)" },
];

// ── Parsing ──────────────────────────────────────────────────────────────────

export function parseDataset(text: string): { values: number[]; invalidTokens: string[] } {
  const tokens = text.split(/[\s,;]+/).map((t) => t.trim()).filter(Boolean);
  const values: number[] = [];
  const invalidTokens: string[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (Number.isFinite(n)) values.push(n); else invalidTokens.push(token);
  }
  return { values, invalidTokens };
}

// ── Statistics ────────────────────────────────────────────────────────────────

export interface DatasetStats {
  count: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  stdDev: number;
  variance: number;
  q1: number;
  q3: number;
  iqr: number;
}

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  return sorted[base];
}

export function computeStats(values: number[]): DatasetStats {
  const sorted = [...values].sort((a, b) => a - b);
  const count = values.length;
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = count ? sum / count : 0;
  const variance = count ? values.reduce((a, b) => a + (b - mean) ** 2, 0) / count : 0;
  const stdDev = Math.sqrt(variance);
  const median = count ? quantile(sorted, 0.5) : 0;
  const q1 = count ? quantile(sorted, 0.25) : 0;
  const q3 = count ? quantile(sorted, 0.75) : 0;
  return {
    count, min: count ? sorted[0] : 0, max: count ? sorted[count - 1] : 0,
    mean, median, stdDev, variance, q1, q3, iqr: q3 - q1,
  };
}

// ── Normalization ────────────────────────────────────────────────────────────

export interface NormalizationResult {
  method: NormMethod;
  original: number[];
  normalized: number[];
  originalStats: DatasetStats;
  normalizedStats: DatasetStats;
  decimalScalingFactor: number | null;
  error: string | null;
}

function withError(method: NormMethod, values: number[], error: string): NormalizationResult {
  const stats = computeStats(values);
  return { method, original: values, normalized: [], originalStats: stats, normalizedStats: computeStats([]), decimalScalingFactor: null, error };
}

export function normalize(values: number[], method: NormMethod, customMin: number, customMax: number): NormalizationResult {
  if (values.length === 0) return withError(method, values, "Enter a dataset to normalize.");
  const stats = computeStats(values);

  if (method === "minmax" || method === "minmax-custom") {
    const newMin = method === "minmax-custom" ? customMin : 0;
    const newMax = method === "minmax-custom" ? customMax : 1;
    if (method === "minmax-custom" && (!Number.isFinite(newMin) || !Number.isFinite(newMax) || newMin >= newMax)) {
      return withError(method, values, "Custom minimum must be less than custom maximum.");
    }
    const range = stats.max - stats.min;
    if (range === 0) return withError(method, values, "All values are identical — min-max normalization requires a range greater than zero.");
    const normalized = values.map((x) => newMin + ((x - stats.min) * (newMax - newMin)) / range);
    return { method, original: values, normalized, originalStats: stats, normalizedStats: computeStats(normalized), decimalScalingFactor: null, error: null };
  }

  if (method === "zscore") {
    if (stats.stdDev === 0) return withError(method, values, "Standard deviation is zero — all values are identical, so Z-score standardization is undefined.");
    const normalized = values.map((x) => (x - stats.mean) / stats.stdDev);
    return { method, original: values, normalized, originalStats: stats, normalizedStats: computeStats(normalized), decimalScalingFactor: null, error: null };
  }

  if (method === "decimal") {
    const maxAbs = Math.max(...values.map((x) => Math.abs(x)));
    if (maxAbs === 0) return withError(method, values, "All values are zero — decimal scaling requires at least one non-zero value.");
    const j = Math.max(1, Math.ceil(Math.log10(maxAbs + Number.EPSILON)));
    const factor = Math.pow(10, j);
    const normalized = values.map((x) => x / factor);
    return { method, original: values, normalized, originalStats: stats, normalizedStats: computeStats(normalized), decimalScalingFactor: factor, error: null };
  }

  if (method === "unitvector") {
    const magnitude = Math.sqrt(values.reduce((a, b) => a + b * b, 0));
    if (magnitude === 0) return withError(method, values, "All values are zero — unit vector normalization requires a non-zero magnitude.");
    const normalized = values.map((x) => x / magnitude);
    return { method, original: values, normalized, originalStats: stats, normalizedStats: computeStats(normalized), decimalScalingFactor: null, error: null };
  }

  if (method === "meannorm") {
    const range = stats.max - stats.min;
    if (range === 0) return withError(method, values, "All values are identical — mean normalization requires a range greater than zero.");
    const normalized = values.map((x) => (x - stats.mean) / range);
    return { method, original: values, normalized, originalStats: stats, normalizedStats: computeStats(normalized), decimalScalingFactor: null, error: null };
  }

  // robust
  if (stats.iqr === 0) return withError(method, values, "Interquartile range is zero — robust scaling is undefined for this dataset.");
  const normalized = values.map((x) => (x - stats.median) / stats.iqr);
  return { method, original: values, normalized, originalStats: stats, normalizedStats: computeStats(normalized), decimalScalingFactor: null, error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number, precision: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 8, 10];
export const DEFAULT_PRECISION = 4;

export function generateSampleDataset(): string {
  const samples = [
    [10, 20, 30, 40, 50],
    [150, 160, 170, 180, 190, 200],
    [5, 15, 25, 35, 45, 55, 65],
    [2.5, 7.8, 12.1, 18.6, 24.3, 30.9, 41.2],
  ];
  return samples[Math.floor(Math.random() * samples.length)].join(", ");
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  method: NormMethod;
}

const STORAGE_KEY = "data-normalization-calculator-history";
const INPUT_KEY = "data-normalization-calculator-input";

export function saveHistory(input: string, method: NormMethod): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), input, method };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

export function saveInput(input: string, method: NormMethod): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ input, method })); } catch {}
}

export function loadInput(): { input: string; method: NormMethod } | null {
  try { const raw = localStorage.getItem(INPUT_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

// ── Export helpers ────────────────────────────────────────────────────────────

const METHOD_LABELS: Record<NormMethod, string> = Object.fromEntries(NORM_METHODS.map((m) => [m.key, m.label])) as Record<NormMethod, string>;

export function buildTextReport(result: NormalizationResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Data Normalization Report",
    "===========================",
    `Generated: ${ts}`,
    `Method: ${METHOD_LABELS[result.method]}`,
    `Values: ${result.original.length}`,
    "",
    "Original -> Normalized",
    ...result.original.map((v, i) => `${formatNum(v, precision)} -> ${formatNum(result.normalized[i], precision)}`),
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: NormalizationResult): string {
  const rows: (string | number)[][] = [["Original", "Normalized"]];
  result.original.forEach((v, i) => rows.push([v, result.normalized[i]]));
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: NormalizationResult): string {
  return JSON.stringify(
    {
      method: result.method,
      data: result.original.map((v, i) => ({ original: v, normalized: result.normalized[i] })),
      originalStats: result.originalStats,
      normalizedStats: result.normalizedStats,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}
