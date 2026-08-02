// ── Log Transformation Calculator Logic ──

export type LogBase = "ln" | "log10" | "log2" | "custom";
export type InputMode = "single" | "multiple";

export const LOG_BASES: { key: LogBase; label: string }[] = [
  { key: "ln", label: "Natural Log (ln)" },
  { key: "log10", label: "Base 10 (log10)" },
  { key: "log2", label: "Base 2 (log2)" },
  { key: "custom", label: "Custom Base" },
];

export function transform(value: number, base: LogBase, customBase: number): number | null {
  if (!Number.isFinite(value) || value <= 0) return null;
  switch (base) {
    case "ln": return Math.log(value);
    case "log10": return Math.log10(value);
    case "log2": return Math.log2(value);
    default:
      if (!Number.isFinite(customBase) || customBase <= 0 || customBase === 1) return null;
      return Math.log(value) / Math.log(customBase);
  }
}

export function logBaseLabel(base: LogBase, customBase: number): string {
  if (base === "ln") return "ln";
  if (base === "log10") return "log₁₀";
  if (base === "log2") return "log₂";
  return `log base ${Number.isFinite(customBase) ? customBase : "?"}`;
}

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
  range: number;
}

function median(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function computeStats(values: number[]): DatasetStats {
  if (values.length === 0) return { count: 0, min: 0, max: 0, mean: 0, median: 0, stdDev: 0, range: 0 };
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return {
    count: values.length, min: sorted[0], max: sorted[sorted.length - 1],
    mean, median: median(sorted), stdDev: Math.sqrt(variance), range: sorted[sorted.length - 1] - sorted[0],
  };
}

// ── Result ────────────────────────────────────────────────────────────────────

export interface RowResult {
  original: number;
  transformed: number | null;
}

export interface TransformResult {
  rows: RowResult[];
  validCount: number;
  invalidCount: number;
  originalStats: DatasetStats;
  transformedStats: DatasetStats;
  error: string | null;
}

export function transformDataset(values: number[], base: LogBase, customBase: number, ignoreInvalid: boolean): TransformResult {
  if (values.length === 0) {
    return { rows: [], validCount: 0, invalidCount: 0, originalStats: computeStats([]), transformedStats: computeStats([]), error: "Enter a dataset to transform." };
  }
  if (base === "custom" && (!Number.isFinite(customBase) || customBase <= 0 || customBase === 1)) {
    return { rows: [], validCount: 0, invalidCount: 0, originalStats: computeStats(values), transformedStats: computeStats([]), error: "Custom base must be greater than 0 and cannot equal 1." };
  }

  const rows: RowResult[] = values.map((v) => ({ original: v, transformed: transform(v, base, customBase) }));
  const invalidCount = rows.filter((r) => r.transformed === null).length;
  const validCount = rows.length - invalidCount;

  if (invalidCount > 0 && !ignoreInvalid) {
    return {
      rows, validCount, invalidCount,
      originalStats: computeStats(values), transformedStats: computeStats([]),
      error: "Logarithm is only defined for numbers greater than zero. Enable \"Ignore Invalid Values\" to skip them automatically.",
    };
  }

  const transformedValues = rows.map((r) => r.transformed).filter((v): v is number => v !== null);
  return {
    rows, validCount, invalidCount,
    originalStats: computeStats(values),
    transformedStats: computeStats(transformedValues),
    error: null,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5, 6];
export const DEFAULT_PRECISION = 4;

export function generateSampleDataset(): string {
  const samples = [
    [10, 25, 50, 100, 250, 500, 1000],
    [1, 2, 4, 8, 16, 32, 64],
    [5, 15, 45, 135, 405],
    [100, 1000, 10000, 100000],
  ];
  return samples[Math.floor(Math.random() * samples.length)].join(", ");
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  base: LogBase;
  customBase: number;
}

const STORAGE_KEY = "log-transformation-calculator-history";
const INPUT_KEY = "log-transformation-calculator-input";

export function saveHistory(input: string, base: LogBase, customBase: number): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), input, base, customBase };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

export function saveInput(input: string, base: LogBase, customBase: number, mode: InputMode, singleValue: string): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ input, base, customBase, mode, singleValue })); } catch {}
}

export function loadInput(): { input: string; base: LogBase; customBase: number; mode: InputMode; singleValue: string } | null {
  try { const raw = localStorage.getItem(INPUT_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: TransformResult, base: LogBase, customBase: number, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Log Transformation Report",
    "===========================",
    `Generated: ${ts}`,
    `Base: ${logBaseLabel(base, customBase)}`,
    `Valid Values: ${result.validCount}`,
    `Invalid Values: ${result.invalidCount}`,
    "",
    "Original -> Transformed",
    ...result.rows.map((r) => `${formatNum(r.original, precision)} -> ${formatNum(r.transformed, precision)}`),
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: TransformResult): string {
  const rows: (string | number)[][] = [["Original", "Transformed"]];
  result.rows.forEach((r) => rows.push([r.original, r.transformed ?? ""]));
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: TransformResult, base: LogBase, customBase: number): string {
  return JSON.stringify(
    {
      base: logBaseLabel(base, customBase),
      data: result.rows.map((r) => ({ original: r.original, transformed: r.transformed })),
      originalStats: result.originalStats,
      transformedStats: result.transformedStats,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}
