// ── Precision Calculator Logic ──

export type OutputFormat = "decimal" | "percentage" | "both";

export interface RatingTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const RATING_TIERS: RatingTier[] = [
  { label: "Needs Improvement", min: -Infinity, max: 60, color: "#DC2626" },
  { label: "Moderate", min: 60, max: 70, color: "#F59E0B" },
  { label: "Good", min: 70, max: 80, color: "#D97706" },
  { label: "High", min: 80, max: 90, color: "#2563EB" },
  { label: "Very High", min: 90, max: 95, color: "#058554" },
  { label: "Excellent", min: 95, max: Infinity, color: "#058554" },
];

export function classifyPrecision(percentage: number): RatingTier {
  return RATING_TIERS.find((t) => percentage > t.min && percentage <= t.max) ?? RATING_TIERS.find((t) => percentage <= t.min) ?? RATING_TIERS[0];
}

export interface PrecisionResult {
  tp: number;
  fp: number;
  denominator: number;
  precision: number | null;
  percentage: number | null;
  rating: RatingTier | null;
  error: string | null;
}

export function calculatePrecision(tp: number, fp: number): PrecisionResult {
  if (!Number.isFinite(tp) || !Number.isFinite(fp)) {
    return { tp, fp, denominator: 0, precision: null, percentage: null, rating: null, error: "Enter valid numbers for True Positive and False Positive." };
  }
  if (tp < 0 || fp < 0) {
    return { tp, fp, denominator: 0, precision: null, percentage: null, rating: null, error: "True Positive and False Positive must be zero or greater." };
  }
  const denominator = tp + fp;
  if (denominator === 0) {
    return { tp, fp, denominator, precision: 0, percentage: 0, rating: null, error: "Precision cannot be calculated because TP + FP equals zero." };
  }
  const precision = tp / denominator;
  const percentage = precision * 100;
  return { tp, fp, denominator, precision, percentage, rating: classifyPrecision(percentage), error: null };
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

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4, 5];
export const DEFAULT_PRECISION = 2;
export const DEFAULT_TP = 100;
export const DEFAULT_FP = 10;

export const PRESETS: { label: string; tp: number; fp: number }[] = [
  { label: "Spam Filter", tp: 90, fp: 10 },
  { label: "Fraud Detection", tp: 250, fp: 50 },
  { label: "Medical Screening", tp: 15, fp: 5 },
];

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(tp: number, fp: number, precision: number, format: OutputFormat): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("tp", String(tp));
  url.searchParams.set("fp", String(fp));
  url.searchParams.set("precision", String(precision));
  url.searchParams.set("format", format);
  return url.toString();
}

export interface ShareParams {
  tp: number;
  fp: number;
  precision: number;
  format: OutputFormat;
}

export function parseShareParams(): ShareParams | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const tpParam = p.get("tp");
  const fpParam = p.get("fp");
  if (tpParam === null || fpParam === null) return null;
  return {
    tp: parseFloat(tpParam),
    fp: parseFloat(fpParam),
    precision: parseInt(p.get("precision") ?? "2", 10) || 2,
    format: (p.get("format") as OutputFormat) ?? "both",
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: PrecisionResult;
}

const STORAGE_KEY = "precision-calculator-history";

export function saveHistory(result: PrecisionResult): void {
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

export function buildTextReport(result: PrecisionResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Precision Calculation Report",
    "==============================",
    `Generated: ${ts}`,
    "",
    `True Positive (TP): ${result.tp}`,
    `False Positive (FP): ${result.fp}`,
    `TP + FP: ${result.denominator}`,
    `Precision: ${formatNum(result.precision, precision)}`,
    `Precision (%): ${formatNum(result.percentage, precision)}%`,
    `Rating: ${result.rating?.label ?? "—"}`,
    "",
    "Formula: Precision = TP ÷ (TP + FP)",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: PrecisionResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["True Positive (TP)", result.tp],
    ["False Positive (FP)", result.fp],
    ["TP + FP", result.denominator],
    ["Precision", formatNum(result.precision, precision)],
    ["Precision (%)", `${formatNum(result.percentage, precision)}%`],
    ["Rating", result.rating?.label ?? ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: PrecisionResult): string {
  return JSON.stringify(
    {
      tp: result.tp,
      fp: result.fp,
      denominator: result.denominator,
      precision: result.precision,
      percentage: result.percentage,
      rating: result.rating?.label ?? null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: PrecisionResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Precision Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Precision Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Precision</td><td><strong>${formatNum(result.precision, precision)}</strong></td></tr>
      <tr><td>Precision (%)</td><td><strong>${formatNum(result.percentage, precision)}%</strong></td></tr>
      <tr><td>Rating</td><td>${result.rating?.label ?? "—"}</td></tr>
      <tr><td>True Positive (TP)</td><td>${result.tp}</td></tr>
      <tr><td>False Positive (FP)</td><td>${result.fp}</td></tr>
      <tr><td>TP + FP</td><td>${result.denominator}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
