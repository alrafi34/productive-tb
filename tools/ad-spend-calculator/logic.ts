// ── Ad Spend Calculator Logic ──

export type Mode = "cpc" | "cpm" | "cpa" | "roas" | "roi" | "revenue" | "custom";

export const MODE_META: Record<Mode, { label: string; short: string; hint: string }> = {
  cpc: { label: "CPC Budget Calculator", short: "CPC Budget", hint: "Budget = Desired Clicks × Average CPC" },
  cpm: { label: "CPM Budget Calculator", short: "CPM Budget", hint: "Budget = (Desired Impressions ÷ 1000) × CPM" },
  cpa: { label: "CPA Budget Calculator", short: "CPA Budget", hint: "Budget = Target Conversions × Average CPA" },
  roas: { label: "ROAS Budget Calculator", short: "ROAS Budget", hint: "Budget = Revenue Goal ÷ Expected ROAS" },
  roi: { label: "ROI Budget Calculator", short: "ROI Budget", hint: "Budget = Revenue Goal ÷ (1 + Expected ROI / 100)" },
  revenue: { label: "Revenue Goal Calculator", short: "Revenue Goal", hint: "Required Conversions = Revenue Goal ÷ AOV, then Budget = Conversions × CPA" },
  custom: { label: "Custom Budget Calculator", short: "Custom Budget", hint: "Enter a known total budget directly and break it down into daily, weekly, and monthly spend." },
};

export const MODE_ORDER: Mode[] = ["cpc", "cpm", "cpa", "roas", "roi", "revenue", "custom"];

// ── Currencies ─────────────────────────────────────────────────────────────────

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$", label: "USD ($)" },
  EUR: { symbol: "€", label: "EUR (€)" },
  GBP: { symbol: "£", label: "GBP (£)" },
  CAD: { symbol: "C$", label: "CAD (C$)" },
  AUD: { symbol: "A$", label: "AUD (A$)" },
  JPY: { symbol: "¥", label: "JPY (¥)" },
  INR: { symbol: "₹", label: "INR (₹)" },
  BDT: { symbol: "৳", label: "BDT (৳)" },
  SAR: { symbol: "﷼", label: "SAR (﷼)" },
  AED: { symbol: "د.إ", label: "AED (د.إ)" },
  SGD: { symbol: "S$", label: "SGD (S$)" },
  MYR: { symbol: "RM", label: "MYR (RM)" },
  PKR: { symbol: "₨", label: "PKR (₨)" },
  BRL: { symbol: "R$", label: "BRL (R$)" },
  MXN: { symbol: "MX$", label: "MXN (MX$)" },
  ZAR: { symbol: "R", label: "ZAR (R)" },
};

export const CURRENCY_ORDER = Object.keys(CURRENCIES);

// ── Platform presets (CPC-based) ──────────────────────────────────────────────

export interface PlatformPreset { label: string; icon: string; clicks: number; cpc: number }

export const PLATFORM_PRESETS: PlatformPreset[] = [
  { label: "Google Ads",   icon: "🔍", clicks: 2000, cpc: 2.50 },
  { label: "Facebook Ads", icon: "📘", clicks: 3000, cpc: 1.20 },
  { label: "TikTok Ads",   icon: "🎵", clicks: 4000, cpc: 1.00 },
  { label: "LinkedIn Ads", icon: "💼", clicks: 800,  cpc: 5.50 },
  { label: "Amazon Ads",   icon: "🛒", clicks: 2500, cpc: 1.10 },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface AdSpendInputs {
  mode: Mode;
  currency: string;
  clicks: number;
  cpc: number;
  impressions: number;
  cpm: number;
  conversions: number;
  cpa: number;
  revenueGoal: number;
  roas: number;
  roiPercent: number;
  aov: number;
  customBudget: number;
  campaignDays: number;
  dailyOverride: number | null;
  monthlyOverride: number | null;
  taxPercent: number;
  feePercent: number;
  bufferPercent: number;
}

export interface AdSpendResult {
  baseBudget: number;
  recommendedBudget: number;
  dailyBudget: number;
  weeklyBudget: number;
  monthlyBudget: number;
  projectedRevenue: number | null;
  expectedProfit: number | null;
  roiPercent: number | null;
  roas: number | null;
  requiredConversions: number | null;
  formula: string;
  breakdown: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: AdSpendInputs;
  result: AdSpendResult;
}

// ── Main calculation ────────────────────────────────────────────────────────────

export function calculateAdSpend(inputs: AdSpendInputs): AdSpendResult {
  let baseBudget = 0;
  let formula = "";
  let breakdown = "";
  let projectedRevenue: number | null = null;
  let requiredConversions: number | null = null;

  switch (inputs.mode) {
    case "cpc":
      baseBudget = inputs.clicks * inputs.cpc;
      formula = "Budget = Desired Clicks × Average CPC";
      breakdown = `${inputs.clicks} × ${inputs.cpc} = ${baseBudget.toFixed(2)}`;
      break;
    case "cpm":
      baseBudget = (inputs.impressions / 1000) * inputs.cpm;
      formula = "Budget = (Desired Impressions ÷ 1000) × CPM";
      breakdown = `(${inputs.impressions} ÷ 1000) × ${inputs.cpm} = ${baseBudget.toFixed(2)}`;
      break;
    case "cpa":
      baseBudget = inputs.conversions * inputs.cpa;
      formula = "Budget = Target Conversions × Average CPA";
      breakdown = `${inputs.conversions} × ${inputs.cpa} = ${baseBudget.toFixed(2)}`;
      break;
    case "roas":
      baseBudget = inputs.roas > 0 ? inputs.revenueGoal / inputs.roas : 0;
      formula = "Budget = Revenue Goal ÷ Expected ROAS";
      breakdown = `${inputs.revenueGoal} ÷ ${inputs.roas} = ${baseBudget.toFixed(2)}`;
      projectedRevenue = inputs.revenueGoal;
      break;
    case "roi":
      baseBudget = inputs.revenueGoal / (1 + inputs.roiPercent / 100);
      formula = "Budget = Revenue Goal ÷ (1 + Expected ROI / 100)";
      breakdown = `${inputs.revenueGoal} ÷ (1 + ${inputs.roiPercent}/100) = ${baseBudget.toFixed(2)}`;
      projectedRevenue = inputs.revenueGoal;
      break;
    case "revenue":
      requiredConversions = inputs.aov > 0 ? inputs.revenueGoal / inputs.aov : 0;
      baseBudget = requiredConversions * inputs.cpa;
      formula = "Conversions = Revenue Goal ÷ AOV, then Budget = Conversions × CPA";
      breakdown = `(${inputs.revenueGoal} ÷ ${inputs.aov} = ${requiredConversions.toFixed(1)} conversions) × ${inputs.cpa} = ${baseBudget.toFixed(2)}`;
      projectedRevenue = inputs.revenueGoal;
      break;
    case "custom":
      baseBudget = inputs.customBudget;
      formula = "Budget = Entered Total Budget";
      breakdown = `${baseBudget.toFixed(2)} (entered directly)`;
      break;
  }

  const recommendedBudget =
    baseBudget * (1 + inputs.bufferPercent / 100) * (1 + inputs.feePercent / 100) * (1 + inputs.taxPercent / 100);

  let dailyBudget: number;
  if (inputs.monthlyOverride !== null) {
    dailyBudget = inputs.monthlyOverride / 30;
  } else if (inputs.dailyOverride !== null) {
    dailyBudget = inputs.dailyOverride;
  } else {
    dailyBudget = inputs.campaignDays > 0 ? recommendedBudget / inputs.campaignDays : 0;
  }
  const weeklyBudget = dailyBudget * 7;
  const monthlyBudget = dailyBudget * 30;

  const expectedProfit = projectedRevenue !== null ? projectedRevenue - recommendedBudget : null;
  const roas = projectedRevenue !== null && recommendedBudget > 0 ? projectedRevenue / recommendedBudget : null;
  const roiPercent = projectedRevenue !== null && recommendedBudget > 0 ? ((projectedRevenue - recommendedBudget) / recommendedBudget) * 100 : null;

  return {
    baseBudget, recommendedBudget, dailyBudget, weeklyBudget, monthlyBudget,
    projectedRevenue, expectedProfit, roiPercent, roas, requiredConversions,
    formula, breakdown,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatMoney(n: number, currency: string): string {
  const sym = CURRENCIES[currency]?.symbol ?? "$";
  return sym + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: AdSpendInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  url.searchParams.set("currency", inputs.currency);
  url.searchParams.set("clicks", String(inputs.clicks));
  url.searchParams.set("cpc", String(inputs.cpc));
  url.searchParams.set("impressions", String(inputs.impressions));
  url.searchParams.set("cpm", String(inputs.cpm));
  url.searchParams.set("conversions", String(inputs.conversions));
  url.searchParams.set("cpa", String(inputs.cpa));
  url.searchParams.set("revenueGoal", String(inputs.revenueGoal));
  url.searchParams.set("roas", String(inputs.roas));
  url.searchParams.set("roi", String(inputs.roiPercent));
  url.searchParams.set("aov", String(inputs.aov));
  url.searchParams.set("custom", String(inputs.customBudget));
  url.searchParams.set("days", String(inputs.campaignDays));
  return url.toString();
}

export function parseShareParams(): Partial<AdSpendInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode");
  if (!mode) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    mode: (MODE_ORDER.includes(mode as Mode) ? mode : "cpc") as Mode,
    currency: p.get("currency") ?? "USD",
    clicks: num("clicks", 5000),
    cpc: num("cpc", 0.8),
    impressions: num("impressions", 2000000),
    cpm: num("cpm", 8),
    conversions: num("conversions", 300),
    cpa: num("cpa", 20),
    revenueGoal: num("revenueGoal", 50000),
    roas: num("roas", 5),
    roiPercent: num("roi", 250),
    aov: num("aov", 100),
    customBudget: num("custom", 5000),
    campaignDays: num("days", 30),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "ad-spend-calculator-history";

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

export function buildTextReport(result: AdSpendResult, inputs: AdSpendInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Ad Spend Calculator Report",
    "===========================",
    `Generated: ${ts}`,
    `Mode: ${MODE_META[inputs.mode].label}`,
    "",
    `Estimated Ad Spend: ${formatMoney(result.baseBudget, inputs.currency)}`,
    `Recommended Total Budget (incl. buffer/fee/tax): ${formatMoney(result.recommendedBudget, inputs.currency)}`,
    `Daily Budget: ${formatMoney(result.dailyBudget, inputs.currency)}`,
    `Weekly Budget: ${formatMoney(result.weeklyBudget, inputs.currency)}`,
    `Monthly Budget: ${formatMoney(result.monthlyBudget, inputs.currency)}`,
  ];
  if (result.projectedRevenue !== null) {
    lines.push(
      `Projected Revenue: ${formatMoney(result.projectedRevenue, inputs.currency)}`,
      `Expected Profit: ${formatMoney(result.expectedProfit ?? 0, inputs.currency)}`,
      `ROAS: ${result.roas?.toFixed(2)}×`,
      `ROI: ${result.roiPercent?.toFixed(1)}%`
    );
  }
  lines.push("", `Formula: ${result.formula}`, `Calculation: ${result.breakdown}`, "", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: AdSpendResult, inputs: AdSpendInputs): string {
  const rows: (string | number)[][] = [
    ["Ad Spend Calculator Report", new Date().toISOString()],
    [],
    ["Mode", MODE_META[inputs.mode].label],
    ["Currency", inputs.currency],
    [],
    ["Metric", "Value"],
    ["Estimated Ad Spend", result.baseBudget.toFixed(2)],
    ["Recommended Total Budget", result.recommendedBudget.toFixed(2)],
    ["Daily Budget", result.dailyBudget.toFixed(2)],
    ["Weekly Budget", result.weeklyBudget.toFixed(2)],
    ["Monthly Budget", result.monthlyBudget.toFixed(2)],
  ];
  if (result.projectedRevenue !== null) {
    rows.push(
      ["Projected Revenue", result.projectedRevenue.toFixed(2)],
      ["Expected Profit", (result.expectedProfit ?? 0).toFixed(2)],
      ["ROAS", `${result.roas?.toFixed(2)}x`],
      ["ROI %", `${result.roiPercent?.toFixed(1)}%`]
    );
  }
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: AdSpendResult, inputs: AdSpendInputs): string {
  return JSON.stringify(
    {
      mode: inputs.mode,
      currency: inputs.currency,
      results: {
        baseBudget: parseFloat(result.baseBudget.toFixed(2)),
        recommendedBudget: parseFloat(result.recommendedBudget.toFixed(2)),
        dailyBudget: parseFloat(result.dailyBudget.toFixed(2)),
        weeklyBudget: parseFloat(result.weeklyBudget.toFixed(2)),
        monthlyBudget: parseFloat(result.monthlyBudget.toFixed(2)),
        projectedRevenue: result.projectedRevenue,
        expectedProfit: result.expectedProfit,
        roas: result.roas,
        roiPercent: result.roiPercent,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: AdSpendResult, inputs: AdSpendInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const revenueRows = result.projectedRevenue !== null
    ? `<tr><td>Projected Revenue</td><td>${formatMoney(result.projectedRevenue, inputs.currency)}</td></tr>
       <tr><td>Expected Profit</td><td>${formatMoney(result.expectedProfit ?? 0, inputs.currency)}</td></tr>
       <tr><td>ROAS</td><td>${result.roas?.toFixed(2)}×</td></tr>
       <tr><td>ROI</td><td>${result.roiPercent?.toFixed(1)}%</td></tr>`
    : "";
  return `<!DOCTYPE html><html><head><title>Ad Spend Report</title>
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
    <h1>Ad Spend Calculator Report</h1>
    <p class="meta">Generated ${ts} — ${MODE_META[inputs.mode].label}</p>
    <h2>Budget Summary</h2>
    <table>
      <tr><td>Estimated Ad Spend</td><td><strong>${formatMoney(result.baseBudget, inputs.currency)}</strong></td></tr>
      <tr><td>Recommended Total Budget</td><td>${formatMoney(result.recommendedBudget, inputs.currency)}</td></tr>
      <tr><td>Daily Budget</td><td>${formatMoney(result.dailyBudget, inputs.currency)}</td></tr>
      <tr><td>Weekly Budget</td><td>${formatMoney(result.weeklyBudget, inputs.currency)}</td></tr>
      <tr><td>Monthly Budget</td><td>${formatMoney(result.monthlyBudget, inputs.currency)}</td></tr>
      ${revenueRows}
    </table>
    <h2>Formula</h2>
    <table>
      <tr><td>Formula</td><td>${result.formula}</td></tr>
      <tr><td>Calculation</td><td>${result.breakdown}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: AdSpendInputs = {
  mode: "cpc",
  currency: "USD",
  clicks: 5000,
  cpc: 0.80,
  impressions: 2000000,
  cpm: 8,
  conversions: 300,
  cpa: 20,
  revenueGoal: 50000,
  roas: 5,
  roiPercent: 250,
  aov: 100,
  customBudget: 5000,
  campaignDays: 30,
  dailyOverride: null,
  monthlyOverride: null,
  taxPercent: 0,
  feePercent: 0,
  bufferPercent: 10,
};
