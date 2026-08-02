// ── Recall Calculator Logic ──

export type InputMode = "simple" | "confusion-matrix";
export type OutputFormat = "decimal" | "percentage" | "both";

export interface RatingTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const RATING_TIERS: RatingTier[] = [
  { label: "Poor Recall", min: -Infinity, max: 50, color: "#DC2626" },
  { label: "Moderate Recall", min: 50, max: 75, color: "#F59E0B" },
  { label: "Good Recall", min: 75, max: 90, color: "#D97706" },
  { label: "Excellent Recall", min: 90, max: Infinity, color: "#058554" },
];

export function classifyRecall(percentage: number): RatingTier {
  return RATING_TIERS.find((t) => percentage > t.min && percentage <= t.max) ?? RATING_TIERS.find((t) => percentage <= t.min) ?? RATING_TIERS[0];
}

export interface ConfusionCounts {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface RecallResult {
  tp: number;
  fn: number;
  fp: number | null;
  tn: number | null;
  denominator: number;
  recall: number | null;
  percentage: number | null;
  rating: RatingTier | null;
  precision: number | null; // bonus context in confusion-matrix mode
  accuracy: number | null; // bonus context in confusion-matrix mode
  error: string | null;
}

export function calculateRecall(tp: number, fn: number, fp: number | null = null, tn: number | null = null): RecallResult {
  const base = { tp, fn, fp, tn, denominator: 0, recall: null, percentage: null, rating: null, precision: null, accuracy: null, error: null };

  const requiredValid = [tp, fn].every(Number.isFinite);
  if (!requiredValid) {
    return { ...base, error: "Enter valid numbers for True Positive and False Negative." };
  }
  if (tp < 0 || fn < 0) {
    return { ...base, error: "True Positive and False Negative must be zero or greater." };
  }
  if (fp !== null && (!Number.isFinite(fp) || fp < 0)) {
    return { ...base, error: "False Positive must be zero or greater." };
  }
  if (tn !== null && (!Number.isFinite(tn) || tn < 0)) {
    return { ...base, error: "True Negative must be zero or greater." };
  }

  const denominator = tp + fn;
  if (denominator === 0) {
    return { ...base, denominator, recall: 0, percentage: 0, error: "Recall cannot be calculated because TP + FN equals zero." };
  }

  const recall = tp / denominator;
  const percentage = recall * 100;

  let precision: number | null = null;
  let accuracy: number | null = null;
  if (fp !== null) {
    precision = tp + fp === 0 ? null : tp / (tp + fp);
  }
  if (fp !== null && tn !== null) {
    const total = tp + fp + fn + tn;
    accuracy = total === 0 ? null : (tp + tn) / total;
  }

  return { tp, fn, fp, tn, denominator, recall, percentage, rating: classifyRecall(percentage), precision, accuracy, error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5];
export const DEFAULT_PRECISION = 2;
export const DEFAULT_TP = 80;
export const DEFAULT_FN = 20;
export const DEFAULT_FP = 10;
export const DEFAULT_TN = 190;

export const PRESETS: { label: string; tp: number; fn: number }[] = [
  { label: "Disease Screening", tp: 950, fn: 50 },
  { label: "Fraud Detection", tp: 12, fn: 3 },
  { label: "Spam Filter", tp: 80, fn: 20 },
];

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(mode: InputMode, tp: number, fn: number, fp: number, tn: number, precision: number, format: OutputFormat): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  url.searchParams.set("tp", String(tp));
  url.searchParams.set("fn", String(fn));
  if (mode === "confusion-matrix") {
    url.searchParams.set("fp", String(fp));
    url.searchParams.set("tn", String(tn));
  }
  url.searchParams.set("precision", String(precision));
  url.searchParams.set("format", format);
  return url.toString();
}

export interface ShareParams {
  mode: InputMode;
  tp: number;
  fn: number;
  fp: number;
  tn: number;
  precision: number;
  format: OutputFormat;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const tpParam = p.get("tp");
  const fnParam = p.get("fn");
  if (tpParam === null || fnParam === null) return null;
  return {
    mode: p.get("mode") === "confusion-matrix" ? "confusion-matrix" : "simple",
    tp: parseFloat(tpParam),
    fn: parseFloat(fnParam),
    fp: parseFloat(p.get("fp") ?? String(DEFAULT_FP)),
    tn: parseFloat(p.get("tn") ?? String(DEFAULT_TN)),
    precision: parseInt(p.get("precision") ?? "2", 10) || 2,
    format: (p.get("format") as OutputFormat) ?? "both",
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: RecallResult;
}

const STORAGE_KEY = "recall-calculator-history";

export function saveHistory(result: RecallResult): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), result };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: RecallResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Recall Calculation Report",
    "===========================",
    `Generated: ${ts}`,
    "",
    `True Positive (TP): ${result.tp}`,
    `False Negative (FN): ${result.fn}`,
    `TP + FN: ${result.denominator}`,
    `Recall: ${formatNum(result.recall, precision)}`,
    `Recall (%): ${formatNum(result.percentage, precision)}%`,
    `Rating: ${result.rating?.label ?? "—"}`,
    ...(result.fp !== null ? [`False Positive (FP): ${result.fp}`] : []),
    ...(result.tn !== null ? [`True Negative (TN): ${result.tn}`] : []),
    ...(result.precision !== null ? [`Precision: ${formatNum(result.precision, precision)}`] : []),
    ...(result.accuracy !== null ? [`Accuracy: ${formatNum(result.accuracy, precision)}`] : []),
    "",
    "Formula: Recall = TP ÷ (TP + FN)",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: RecallResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["True Positive (TP)", result.tp],
    ["False Negative (FN)", result.fn],
    ["TP + FN", result.denominator],
    ["Recall", formatNum(result.recall, precision)],
    ["Recall (%)", `${formatNum(result.percentage, precision)}%`],
    ["Rating", result.rating?.label ?? ""],
  ];
  if (result.fp !== null) rows.push(["False Positive (FP)", result.fp]);
  if (result.tn !== null) rows.push(["True Negative (TN)", result.tn]);
  if (result.precision !== null) rows.push(["Precision", formatNum(result.precision, precision)]);
  if (result.accuracy !== null) rows.push(["Accuracy", formatNum(result.accuracy, precision)]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: RecallResult): string {
  return JSON.stringify(
    {
      tp: result.tp,
      fn: result.fn,
      fp: result.fp,
      tn: result.tn,
      denominator: result.denominator,
      recall: result.recall,
      percentage: result.percentage,
      rating: result.rating?.label ?? null,
      precision: result.precision,
      accuracy: result.accuracy,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: RecallResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Recall Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Recall Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Recall</td><td><strong>${formatNum(result.recall, precision)}</strong></td></tr>
      <tr><td>Recall (%)</td><td><strong>${formatNum(result.percentage, precision)}%</strong></td></tr>
      <tr><td>Rating</td><td>${result.rating?.label ?? "—"}</td></tr>
      <tr><td>True Positive (TP)</td><td>${result.tp}</td></tr>
      <tr><td>False Negative (FN)</td><td>${result.fn}</td></tr>
      <tr><td>TP + FN</td><td>${result.denominator}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
