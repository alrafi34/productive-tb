// ── F1 Score Calculator Logic ──

export type CalcMode = "metrics" | "confusion";

export interface RatingTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const RATING_TIERS: RatingTier[] = [
  { label: "Needs Improvement", min: -Infinity, max: 60, color: "#DC2626" },
  { label: "Average", min: 60, max: 75, color: "#F59E0B" },
  { label: "Good", min: 75, max: 90, color: "#2563EB" },
  { label: "Excellent", min: 90, max: Infinity, color: "#058554" },
];

export function classifyF1(percentage: number): RatingTier {
  return RATING_TIERS.find((t) => percentage > t.min && percentage <= t.max) ?? RATING_TIERS.find((t) => percentage <= t.min) ?? RATING_TIERS[0];
}

export interface F1Result {
  mode: CalcMode;
  tp: number | null;
  fp: number | null;
  fn: number | null;
  precision: number | null;
  recall: number | null;
  f1: number | null;
  f1Percentage: number | null;
  rating: RatingTier | null;
  error: string | null;
}

export function calculatePrecision(tp: number, fp: number): number {
  return tp + fp === 0 ? 0 : tp / (tp + fp);
}

export function calculateRecall(tp: number, fn: number): number {
  return tp + fn === 0 ? 0 : tp / (tp + fn);
}

export function calculateF1(precision: number, recall: number): number {
  return precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
}

export function calculateFromMetrics(precision: number, recall: number): F1Result {
  if (!Number.isFinite(precision) || !Number.isFinite(recall)) {
    return { mode: "metrics", tp: null, fp: null, fn: null, precision: null, recall: null, f1: null, f1Percentage: null, rating: null, error: "Enter valid numbers for Precision and Recall." };
  }
  if (precision < 0 || precision > 1 || recall < 0 || recall > 1) {
    return { mode: "metrics", tp: null, fp: null, fn: null, precision, recall, f1: null, f1Percentage: null, rating: null, error: "Precision and Recall must be between 0 and 1." };
  }
  const f1 = calculateF1(precision, recall);
  const f1Percentage = f1 * 100;
  return { mode: "metrics", tp: null, fp: null, fn: null, precision, recall, f1, f1Percentage, rating: classifyF1(f1Percentage), error: null };
}

export function calculateFromConfusion(tp: number, fp: number, fn: number): F1Result {
  if (![tp, fp, fn].every(Number.isFinite)) {
    return { mode: "confusion", tp: null, fp: null, fn: null, precision: null, recall: null, f1: null, f1Percentage: null, rating: null, error: "Enter valid numbers for TP, FP, and FN." };
  }
  if (tp < 0 || fp < 0 || fn < 0) {
    return { mode: "confusion", tp, fp, fn, precision: null, recall: null, f1: null, f1Percentage: null, rating: null, error: "True Positive, False Positive, and False Negative cannot be negative." };
  }
  const precision = calculatePrecision(tp, fp);
  const recall = calculateRecall(tp, fn);
  const f1 = calculateF1(precision, recall);
  const f1Percentage = f1 * 100;
  return { mode: "confusion", tp, fp, fn, precision, recall, f1, f1Percentage, rating: classifyF1(f1Percentage), error: null };
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

export const PRECISION_OPTIONS = [2, 3, 4, 5, 6];
export const DEFAULT_PRECISION = 4;
export const DEFAULT_TP = 90;
export const DEFAULT_FP = 10;
export const DEFAULT_FN = 15;
export const DEFAULT_METRIC_PRECISION = 0.82;
export const DEFAULT_METRIC_RECALL = 0.91;

export const CONFUSION_PRESETS: { label: string; tp: number; fp: number; fn: number }[] = [
  { label: "Spam Filter", tp: 90, fp: 10, fn: 15 },
  { label: "Fraud Detection", tp: 450, fp: 40, fn: 70 },
  { label: "Medical Screening", tp: 15, fp: 5, fn: 3 },
];

export const METRIC_PRESETS: { label: string; precision: number; recall: number }[] = [
  { label: "Balanced Model", precision: 0.82, recall: 0.91 },
  { label: "High Precision", precision: 0.95, recall: 0.7 },
  { label: "High Recall", precision: 0.65, recall: 0.95 },
];

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(mode: CalcMode, tp: string, fp: string, fn: string, precision: string, recall: string, decimals: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  url.searchParams.set("tp", tp);
  url.searchParams.set("fp", fp);
  url.searchParams.set("fn", fn);
  url.searchParams.set("precision", precision);
  url.searchParams.set("recall", recall);
  url.searchParams.set("decimals", String(decimals));
  return url.toString();
}

export interface ShareParams {
  mode: CalcMode;
  tp: string;
  fp: string;
  fn: string;
  precision: string;
  recall: string;
  decimals: number;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode");
  if (!mode) return null;
  return {
    mode: mode === "metrics" ? "metrics" : "confusion",
    tp: p.get("tp") ?? "",
    fp: p.get("fp") ?? "",
    fn: p.get("fn") ?? "",
    precision: p.get("precision") ?? "",
    recall: p.get("recall") ?? "",
    decimals: parseInt(p.get("decimals") ?? "4", 10) || 4,
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: F1Result;
}

const STORAGE_KEY = "f1-score-calculator-history";

export function saveHistory(result: F1Result): void {
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

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: F1Result, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "F1 Score Calculation Report",
    "==============================",
    `Generated: ${ts}`,
    `Mode: ${result.mode === "metrics" ? "Precision + Recall" : "Confusion Matrix"}`,
    "",
  ];
  if (result.mode === "confusion") {
    lines.push(`True Positive (TP): ${result.tp}`, `False Positive (FP): ${result.fp}`, `False Negative (FN): ${result.fn}`, "");
  }
  lines.push(
    `Precision: ${formatNum(result.precision, precision)}`,
    `Recall: ${formatNum(result.recall, precision)}`,
    `F1 Score: ${formatNum(result.f1, precision)}`,
    `Rating: ${result.rating?.label ?? "—"}`,
    "",
    "Formula: F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com"
  );
  return lines.join("\n");
}

export function buildCSVReport(result: F1Result, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Mode", result.mode === "metrics" ? "Precision + Recall" : "Confusion Matrix"],
  ];
  if (result.mode === "confusion") {
    rows.push(["True Positive (TP)", result.tp ?? ""], ["False Positive (FP)", result.fp ?? ""], ["False Negative (FN)", result.fn ?? ""]);
  }
  rows.push(
    ["Precision", formatNum(result.precision, precision)],
    ["Recall", formatNum(result.recall, precision)],
    ["F1 Score", formatNum(result.f1, precision)],
    ["Rating", result.rating?.label ?? ""]
  );
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: F1Result): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: F1Result, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const confusionRows = result.mode === "confusion"
    ? `<tr><td>True Positive (TP)</td><td>${result.tp}</td></tr><tr><td>False Positive (FP)</td><td>${result.fp}</td></tr><tr><td>False Negative (FN)</td><td>${result.fn}</td></tr>`
    : "";
  return `<!DOCTYPE html><html><head><title>F1 Score Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>F1 Score Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>F1 Score</td><td><strong>${formatNum(result.f1, precision)}</strong></td></tr>
      <tr><td>Rating</td><td>${result.rating?.label ?? "—"}</td></tr>
      <tr><td>Precision</td><td>${formatNum(result.precision, precision)}</td></tr>
      <tr><td>Recall</td><td>${formatNum(result.recall, precision)}</td></tr>
      ${confusionRows}
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
