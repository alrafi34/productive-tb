// ── Marketing ROI Calculator Logic ──

// ── Currencies ─────────────────────────────────────────────────────────────────

export interface CurrencyInfo { symbol: string; label: string }

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { symbol: "$",   label: "USD ($)"   },
  EUR: { symbol: "€",   label: "EUR (€)"   },
  GBP: { symbol: "£",   label: "GBP (£)"   },
  CAD: { symbol: "C$",  label: "CAD (C$)"  },
  AUD: { symbol: "A$",  label: "AUD (A$)"  },
  NZD: { symbol: "NZ$", label: "NZD (NZ$)" },
  JPY: { symbol: "¥",   label: "JPY (¥)"   },
  INR: { symbol: "₹",   label: "INR (₹)"   },
  BDT: { symbol: "৳",   label: "BDT (৳)"   },
  PKR: { symbol: "₨",   label: "PKR (₨)"   },
  SAR: { symbol: "﷼",  label: "SAR (﷼)"  },
  AED: { symbol: "د.إ", label: "AED (د.إ)" },
  CUSTOM: { symbol: "$", label: "Custom Symbol" },
};

export const CURRENCY_ORDER = Object.keys(CURRENCIES) as (keyof typeof CURRENCIES)[];

export function getSymbol(currency: string, customSymbol: string): string {
  if (currency === "CUSTOM") return customSymbol.trim() || "$";
  return CURRENCIES[currency]?.symbol ?? "$";
}

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface ROIInputs {
  campaignName: string;
  marketingCost: number;
  revenue: number;
  currency: string;
  customSymbol: string;
  decimalPlaces: number;
}

export type PerformanceBadge = "Excellent" | "Good" | "Average" | "Poor" | "Loss";

export interface ROIResult {
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ratio: number;
  status: string;
  badge: PerformanceBadge;
  color: string;
  performanceScore: number; // 0-100, for the gauge — centered at 50 = break-even
}

const BADGE_COLOR: Record<PerformanceBadge, string> = {
  Excellent: "#058554",
  Good: "#2563eb",
  Average: "#0891b2",
  Poor: "#d97706",
  Loss: "#dc2626",
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function classifyROI(roi: number): { status: string; badge: PerformanceBadge; color: string } {
  if (roi < 0) return { status: "Loss", badge: "Loss", color: BADGE_COLOR.Loss };
  if (roi === 0) return { status: "Break-Even", badge: "Poor", color: BADGE_COLOR.Poor };
  if (roi < 15) return { status: "Low Return", badge: "Poor", color: BADGE_COLOR.Poor };
  if (roi < 75) return { status: "Profitable", badge: "Average", color: BADGE_COLOR.Average };
  if (roi < 200) return { status: "Highly Profitable", badge: "Good", color: BADGE_COLOR.Good };
  return { status: "Excellent Performance", badge: "Excellent", color: BADGE_COLOR.Excellent };
}

export function calculateROI(inputs: ROIInputs): ROIResult | null {
  const { marketingCost, revenue, decimalPlaces } = inputs;
  if (marketingCost <= 0) return null;
  const round = (n: number) => parseFloat(n.toFixed(decimalPlaces));

  const profit = round(revenue - marketingCost);
  const roi = round((profit / marketingCost) * 100);
  const ratio = round(revenue / marketingCost);
  const { status, badge, color } = classifyROI(roi);
  const performanceScore = Math.round(clamp(50 + roi / 2, 0, 100));

  return { cost: marketingCost, revenue, profit, roi, ratio, status, badge, color, performanceScore };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: ROIInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (!inputs.marketingCost || inputs.marketingCost <= 0) e.marketingCost = "Marketing cost must be greater than zero.";
  if (inputs.revenue < 0) e.revenue = "Revenue cannot be negative.";
  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US");
}

export function formatMoney(n: number, currency: string, customSymbol: string, decimalPlaces: number): string {
  const sym = getSymbol(currency, customSymbol);
  const sign = n < 0 ? "-" : "";
  return `${sign}${sym}${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}`;
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL (query parameters) ──────────────────────────────────────────

export function buildShareUrl(inputs: ROIInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("name", inputs.campaignName);
  url.searchParams.set("cost", String(inputs.marketingCost));
  url.searchParams.set("revenue", String(inputs.revenue));
  url.searchParams.set("currency", inputs.currency);
  return url.toString();
}

export function parseShareParams(): Partial<ROIInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const cost = p.get("cost");
  if (!cost) return null;
  return {
    campaignName: p.get("name") ?? "",
    marketingCost: parseFloat(cost) || 0,
    revenue: parseFloat(p.get("revenue") ?? "0") || 0,
    currency: p.get("currency") ?? "USD",
  };
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "marketing-roi-calculator-inputs";

export function saveInputs(inputs: ROIInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): ROIInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as ROIInputs;
  } catch { return null; }
}

// ── History (with favorites) ──────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  favorite: boolean;
  inputs: ROIInputs;
  result: ROIResult;
}

const HISTORY_KEY = "marketing-roi-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp" | "favorite">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now(), favorite: false };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 30))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function toggleFavorite(id: string): void {
  const history = getHistory().map((h) => (h.id === id ? { ...h, favorite: !h.favorite } : h));
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

export function deleteHistoryEntry(id: string): void {
  const history = getHistory().filter((h) => h.id !== id);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: ROIResult, inputs: ROIInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Marketing ROI Calculator Report",
    "================================",
    `Generated: ${ts}`,
    inputs.campaignName ? `Campaign: ${inputs.campaignName}` : "",
    "",
    `Marketing Cost: ${formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}`,
    `Revenue Generated: ${formatMoney(result.revenue, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}`,
    `Net Profit: ${formatMoney(result.profit, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}`,
    `ROI: ${result.roi}%`,
    `Profit Ratio: ${result.ratio}x`,
    `Campaign Status: ${result.status} (${result.badge})`,
    "",
    "Formula: ROI (%) = ((Revenue − Marketing Cost) ÷ Marketing Cost) × 100",
    "",
    "Generated by Marketing ROI Calculator — https://productivetoolbox.com",
  ].filter(Boolean).join("\n");
}

export function buildCSVReport(result: ROIResult, inputs: ROIInputs): string {
  const rows = [
    ["Campaign", "Marketing Cost", "Revenue", "Net Profit", "ROI (%)", "Profit Ratio", "Status"],
    [inputs.campaignName || "Untitled Campaign", result.cost, result.revenue, result.profit, result.roi, result.ratio, result.status],
  ];
  return rows.map((r) => r.map((v) => (typeof v === "string" && v.includes(",") ? `"${v}"` : v)).join(",")).join("\n");
}

export function buildJSONReport(result: ROIResult, inputs: ROIInputs): string {
  return JSON.stringify(
    {
      campaign: inputs.campaignName || "Untitled Campaign",
      currency: inputs.currency,
      marketingCost: result.cost,
      revenue: result.revenue,
      netProfit: result.profit,
      roi: result.roi,
      profitRatio: result.ratio,
      status: result.status,
      performanceBadge: result.badge,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ROIResult, inputs: ROIInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Marketing ROI Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Marketing ROI Calculator Report</h1>
    <p class="meta">Generated ${ts}${inputs.campaignName ? ` — Campaign: ${inputs.campaignName}` : ""}</p>
    <h2>Results</h2>
    <table>
      <tr><td>Marketing Cost</td><td>${formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</td></tr>
      <tr><td>Revenue Generated</td><td>${formatMoney(result.revenue, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</td></tr>
      <tr><td>Net Profit</td><td>${formatMoney(result.profit, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</td></tr>
      <tr><td>ROI</td><td><strong>${result.roi}%</strong></td></tr>
      <tr><td>Profit Ratio</td><td>${result.ratio}×</td></tr>
      <tr><td>Campaign Status</td><td>${result.status}</td></tr>
    </table>
    <h2>Formula</h2>
    <table>
      <tr><td colspan="2">ROI (%) = ((Revenue − Marketing Cost) ÷ Marketing Cost) × 100</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: ROIInputs = {
  campaignName: "",
  marketingCost: 1000,
  revenue: 4500,
  currency: "USD",
  customSymbol: "$",
  decimalPlaces: 2,
};

export const PRESETS: { label: string; cost: number; revenue: number }[] = [
  { label: "Google Ads",    cost: 1000,  revenue: 4500 },
  { label: "Facebook Ads",  cost: 800,   revenue: 2200 },
  { label: "Email Campaign", cost: 200,  revenue: 1600 },
  { label: "Influencer Push", cost: 3000, revenue: 2400 },
];
