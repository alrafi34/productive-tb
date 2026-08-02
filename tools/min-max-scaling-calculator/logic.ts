// ── Min-Max Scaling Calculator Logic ──

export interface ParsedDataset {
  values: number[];
  invalidLines: number[]; // 1-indexed line numbers that couldn't be parsed
}

// Accepts one value per line, or comma/space/tab separated values, or mixed.
export function parseDataset(text: string): ParsedDataset {
  const values: number[] = [];
  const invalidLines: number[] = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed === "") return;
    const tokens = trimmed.split(/[,\t\s]+/).filter(Boolean);
    for (const token of tokens) {
      const isNumeric = /^-?\d+(\.\d+)?(e-?\d+)?$/i.test(token);
      const n = parseFloat(token);
      if (isNumeric && Number.isFinite(n)) {
        values.push(n);
      } else {
        invalidLines.push(idx + 1);
      }
    }
  });

  return { values, invalidLines };
}

export interface ScalingResult {
  original: number[];
  scaled: number[];
  min: number;
  max: number;
  newMin: number;
  newMax: number;
  count: number;
  error: string | null;
}

export function calculateMinMaxScaling(values: number[], newMin: number, newMax: number): ScalingResult {
  const base: ScalingResult = { original: values, scaled: [], min: 0, max: 0, newMin, newMax, count: values.length, error: null };

  if (values.length < 2) {
    return { ...base, error: "Please enter at least two numeric values." };
  }
  if (!Number.isFinite(newMin) || !Number.isFinite(newMax)) {
    return { ...base, error: "Target minimum and maximum must be valid numbers." };
  }
  if (newMax <= newMin) {
    return { ...base, error: "Target maximum must be greater than target minimum." };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  if (max === min) {
    return { ...base, min, max, error: "Normalization cannot be performed because all values are identical." };
  }

  const scaled = values.map((v) => ((v - min) / (max - min)) * (newMax - newMin) + newMin);

  return { original: values, scaled, min, max, newMin, newMax, count: values.length, error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number, precision: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Sample datasets ───────────────────────────────────────────────────────

export const SAMPLE_DATASETS: { label: string; text: string; newMin: number; newMax: number }[] = [
  { label: "0 to 1 Scaling", text: "10\n20\n30\n40\n50", newMin: 0, newMax: 1 },
  { label: "-1 to 1 Scaling", text: "100\n250\n400\n700", newMin: -1, newMax: 1 },
  { label: "Percentage Scale", text: "5\n10\n15\n20", newMin: 0, newMax: 100 },
  { label: "Test Scores", text: "62, 78, 91, 55, 88, 73, 95, 60", newMin: 0, newMax: 1 },
];

export function generateRandomDataset(n: number): string {
  return Array.from({ length: n }, () => Math.round((Math.random() * 1000 - 200) * 100) / 100).join("\n");
}

export const DEFAULT_TEXT = "10\n20\n30\n40\n50";
export const DEFAULT_NEW_MIN = 0;
export const DEFAULT_NEW_MAX = 1;
export const DEFAULT_PRECISION = 4;

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(text: string, newMin: number, newMax: number, precision: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("data", valuesToCsvParam(text));
  url.searchParams.set("min", String(newMin));
  url.searchParams.set("max", String(newMax));
  url.searchParams.set("precision", String(precision));
  return url.toString();
}

function valuesToCsvParam(text: string): string {
  return parseDataset(text).values.join(",");
}

export interface ShareParams {
  text: string;
  newMin: number;
  newMax: number;
  precision: number;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const data = p.get("data");
  if (data === null) return null;
  return {
    text: data.split(",").join("\n"),
    newMin: parseFloat(p.get("min") ?? "") || DEFAULT_NEW_MIN,
    newMax: parseFloat(p.get("max") ?? "") || DEFAULT_NEW_MAX,
    precision: parseInt(p.get("precision") ?? "", 10) || DEFAULT_PRECISION,
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  count: number;
  newMin: number;
  newMax: number;
}

const STORAGE_KEY = "min-max-scaling-calculator-history";

export function saveHistory(result: ScalingResult): void {
  if (result.error) return;
  const history = getHistory();
  const newEntry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), count: result.count, newMin: result.newMin, newMax: result.newMax };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: ScalingResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Min-Max Scaling Report",
    "========================",
    `Generated: ${ts}`,
    "",
    `Values: ${result.count}`,
    `Original Range: ${formatNum(result.min, precision)} to ${formatNum(result.max, precision)}`,
    `Target Range: ${formatNum(result.newMin, precision)} to ${formatNum(result.newMax, precision)}`,
    "",
    "Original | Scaled",
    ...result.original.map((v, i) => `${formatNum(v, precision)} | ${formatNum(result.scaled[i], precision)}`),
    "",
    "Formula: Scaled = ((X − Min) ÷ (Max − Min)) × (NewMax − NewMin) + NewMin",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: ScalingResult): string {
  const rows: (string | number)[][] = [["Original", "Scaled"], ...result.original.map((v, i) => [v, result.scaled[i]])];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ScalingResult): string {
  return JSON.stringify(
    {
      count: result.count,
      originalMin: result.min,
      originalMax: result.max,
      targetMin: result.newMin,
      targetMax: result.newMax,
      original: result.original,
      scaled: result.scaled,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}
