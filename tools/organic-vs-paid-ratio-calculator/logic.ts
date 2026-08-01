// ── Organic vs Paid Ratio Calculator Logic ──

export type ChartType = "pie" | "doughnut" | "hbar" | "vbar";
export type DisplayMode = "percentage" | "absolute" | "both";

export interface PresetDef { label: string; organic: number; paid: number }

export const PRESETS: PresetDef[] = [
  { label: "SEO-Led Blog",       organic: 45000, paid: 5000  },
  { label: "Balanced Business",  organic: 60000, paid: 60000 },
  { label: "Paid-Heavy Startup", organic: 8500,  paid: 34000 },
  { label: "Ecommerce Store",    organic: 50000, paid: 20000 },
];

export type InsightLevel = "paid-heavy" | "paid-leaning" | "balanced" | "organic-leaning" | "organic-strong" | "all-organic" | "all-paid";

export interface InsightMeta {
  label: string;
  message: string;
  color: string;
  bg: string;
  dot: string;
}

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface RatioInputs {
  organic: number;
  paid: number;
  decimalPlaces: number;
  chartType: ChartType;
  displayMode: DisplayMode;
}

export interface RatioResult {
  organic: number;
  paid: number;
  total: number;
  organicPct: number;
  paidPct: number;
  ratioLabel: string;
  difference: number;
  largerSide: "organic" | "paid" | "equal";
  insight: InsightMeta;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: RatioInputs;
  result: RatioResult;
}

// ── Insight classification ────────────────────────────────────────────────────

function getInsight(organicPct: number, paid: number, organic: number): InsightMeta {
  if (paid === 0 && organic > 0) {
    return { label: "All Organic", message: "All traffic is organic — no paid advertising detected. Excellent long-term SEO health.", color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" };
  }
  if (organic === 0 && paid > 0) {
    return { label: "All Paid", message: "All traffic is paid — no organic visibility detected. Consider investing in SEO to reduce ad dependency.", color: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" };
  }
  if (organicPct >= 70) {
    return { label: "Organic-Dominant", message: "Excellent organic performance with low dependency on paid traffic.", color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" };
  }
  if (organicPct > 55) {
    return { label: "Organic-Leaning", message: "Strong organic performance. Your traffic is primarily organic.", color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500" };
  }
  if (organicPct >= 45) {
    return { label: "Balanced", message: "Balanced acquisition strategy.", color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-400" };
  }
  if (organicPct > 20) {
    return { label: "Paid-Leaning", message: "Your marketing depends heavily on paid campaigns. Consider investing more in long-term organic growth.", color: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500" };
  }
  return { label: "Paid-Dominant", message: "Website relies heavily on paid advertising.", color: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" };
}

// ── Ratio formatting ───────────────────────────────────────────────────────────

function trimNumber(n: number, decimals: number): string {
  const v = parseFloat(n.toFixed(decimals));
  return String(v);
}

export function formatRatio(organic: number, paid: number, decimals: number): string {
  if (paid === 0 && organic > 0) return "All Organic";
  if (organic === 0 && paid > 0) return "All Paid";
  if (organic === 0 && paid === 0) return "—";
  if (organic >= paid) return `${trimNumber(organic / paid, decimals)} : 1`;
  return `1 : ${trimNumber(paid / organic, decimals)}`;
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateRatio(inputs: RatioInputs): RatioResult | null {
  const { organic, paid, decimalPlaces } = inputs;
  const total = organic + paid;
  if (total === 0) return null;

  const organicPct = (organic / total) * 100;
  const paidPct = (paid / total) * 100;
  const difference = Math.abs(organic - paid);
  const largerSide: RatioResult["largerSide"] = organic > paid ? "organic" : paid > organic ? "paid" : "equal";

  return {
    organic, paid, total,
    organicPct, paidPct,
    ratioLabel: formatRatio(organic, paid, decimalPlaces),
    difference,
    largerSide,
    insight: getInsight(organicPct, paid, organic),
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(organicRaw: string, paidRaw: string): ValidationErrors {
  const e: ValidationErrors = {};
  const o = Number(organicRaw.replace(/,/g, ""));
  const p = Number(paidRaw.replace(/,/g, ""));

  if (organicRaw.trim() === "" || isNaN(o)) e.organic = "Please enter valid numbers.";
  else if (o < 0) e.organic = "Organic traffic cannot be negative.";

  if (paidRaw.trim() === "" || isNaN(p)) e.paid = "Please enter valid numbers.";
  else if (p < 0) e.paid = "Paid traffic cannot be negative.";

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatPercent(n: number, decimals: number): string {
  return `${n.toFixed(decimals)}%`;
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : Math.round(n);
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: RatioInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("organic", String(inputs.organic));
  url.searchParams.set("paid", String(inputs.paid));
  url.searchParams.set("chart", inputs.chartType);
  return url.toString();
}

export function parseShareParams(): Partial<RatioInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const organic = p.get("organic");
  if (organic === null) return null;
  const chart = p.get("chart");
  return {
    organic: parseFloat(organic) || 0,
    paid: parseFloat(p.get("paid") ?? "0") || 0,
    chartType: (["pie", "doughnut", "hbar", "vbar"].includes(chart ?? "") ? chart : "pie") as ChartType,
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "organic-vs-paid-ratio-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: RatioResult, inputs: RatioInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Organic vs Paid Ratio Calculator Report",
    "========================================",
    `Generated: ${ts}`,
    "",
    `Organic Traffic: ${formatFull(result.organic)}`,
    `Paid Traffic: ${formatFull(result.paid)}`,
    `Total Traffic: ${formatFull(result.total)}`,
    `Organic Share: ${formatPercent(result.organicPct, inputs.decimalPlaces)}`,
    `Paid Share: ${formatPercent(result.paidPct, inputs.decimalPlaces)}`,
    `Organic : Paid Ratio: ${result.ratioLabel}`,
    `Difference: ${formatFull(result.difference)}`,
    `Insight: ${result.insight.message}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: RatioResult): string {
  const rows = [
    ["Organic Traffic", "Paid Traffic", "Total Traffic", "Organic %", "Paid %", "Ratio", "Insight"],
    [
      String(result.organic),
      String(result.paid),
      String(result.total),
      result.organicPct.toFixed(2),
      result.paidPct.toFixed(2),
      result.ratioLabel,
      result.insight.message,
    ],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildPrintHTML(result: RatioResult, inputs: RatioInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Organic vs Paid Ratio Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    p.insight { font-size: 14px; line-height: 1.6; margin-top: 8px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Organic vs Paid Ratio Calculator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Traffic Breakdown</h2>
    <table>
      <tr><td>Organic Traffic</td><td>${formatFull(result.organic)} (${formatPercent(result.organicPct, inputs.decimalPlaces)})</td></tr>
      <tr><td>Paid Traffic</td><td>${formatFull(result.paid)} (${formatPercent(result.paidPct, inputs.decimalPlaces)})</td></tr>
      <tr><td>Total Traffic</td><td><strong>${formatFull(result.total)}</strong></td></tr>
      <tr><td>Ratio</td><td>${result.ratioLabel}</td></tr>
      <tr><td>Difference</td><td>${formatFull(result.difference)}</td></tr>
    </table>
    <h2>Insight</h2>
    <p class="insight">${result.insight.message}</p>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: RatioInputs = {
  organic: 10000,
  paid: 5000,
  decimalPlaces: 2,
  chartType: "pie",
  displayMode: "both",
};
