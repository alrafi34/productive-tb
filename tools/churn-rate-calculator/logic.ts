// ── Churn Rate Calculator Logic ──

export type Mode = "customer" | "revenue" | "monthly" | "quarterly" | "annual";

export const MODE_META: Record<Mode, { label: string; short: string; hint: string; periodLabel: string }> = {
  customer: { label: "Customer Churn Rate", short: "Customer Churn", hint: "Churn Rate = (Lost Customers ÷ Starting Customers) × 100", periodLabel: "period" },
  revenue: { label: "Revenue Churn Rate", short: "Revenue Churn", hint: "Revenue Churn = (Lost Revenue ÷ Starting Revenue) × 100", periodLabel: "period" },
  monthly: { label: "Monthly Churn", short: "Monthly Churn", hint: "Same formula as Customer Churn, measured over one month", periodLabel: "month" },
  quarterly: { label: "Quarterly Churn", short: "Quarterly Churn", hint: "Same formula as Customer Churn, measured over one quarter", periodLabel: "quarter" },
  annual: { label: "Annual Churn", short: "Annual Churn", hint: "Same formula as Customer Churn, measured over one year", periodLabel: "year" },
};

export const MODE_ORDER: Mode[] = ["customer", "revenue", "monthly", "quarterly", "annual"];

export const CUSTOMER_MODES: Mode[] = ["customer", "monthly", "quarterly", "annual"];

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

// ── Performance tiers ─────────────────────────────────────────────────────────

export type TierKey = "excellent" | "healthy" | "average" | "high" | "critical";

export interface Tier {
  key: TierKey;
  max: number;
  label: string;
  color: string;
  bg: string;
  text: string;
  dot: string;
  explanation: string;
  recommendations: string[];
}

export const TIERS: Tier[] = [
  {
    key: "excellent", max: 3, label: "Excellent", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500",
    explanation: "Your churn rate is well below industry average and indicates outstanding customer retention.",
    recommendations: [
      "Maintain your current onboarding quality — it's clearly working.",
      "Keep collecting customer feedback to catch emerging issues early.",
    ],
  },
  {
    key: "healthy", max: 5, label: "Healthy", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500",
    explanation: "Your churn rate is below industry average and indicates strong customer retention.",
    recommendations: [
      "Increase customer engagement through regular check-ins and product education.",
      "Launch a loyalty or rewards program to reward long-term customers.",
    ],
  },
  {
    key: "average", max: 8, label: "Average", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500",
    explanation: "Your churn rate is in line with typical industry benchmarks, but there is room to improve retention.",
    recommendations: [
      "Reduce onboarding friction to help new customers reach value faster.",
      "Improve customer support responsiveness and proactive outreach.",
      "Increase customer engagement through regular check-ins and product education.",
    ],
  },
  {
    key: "high", max: 12, label: "High", color: "#f97316", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500",
    explanation: "Your churn rate is relatively high. Review customer retention strategies before scaling acquisition.",
    recommendations: [
      "Reduce onboarding friction to help new customers reach value faster.",
      "Improve customer support responsiveness and proactive outreach.",
      "Improve product quality and address recurring customer complaints.",
      "Introduce win-back campaigns for at-risk customers before they cancel.",
    ],
  },
  {
    key: "critical", max: Infinity, label: "Critical", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500",
    explanation: "Your churn rate is critical. Acquisition spend is being offset by customer loss — retention should be the top priority.",
    recommendations: [
      "Conduct exit surveys to understand exactly why customers are leaving.",
      "Improve product quality and address recurring customer complaints.",
      "Improve customer support responsiveness and proactive outreach.",
      "Launch win-back campaigns immediately for at-risk and recently churned customers.",
      "Reduce onboarding friction to help new customers reach value faster.",
    ],
  },
];

export function getTier(churnPct: number): Tier {
  return TIERS.find((t) => churnPct <= t.max) ?? TIERS[TIERS.length - 1];
}

// ── Presets ────────────────────────────────────────────────────────────────────

export interface Preset {
  label: string;
  icon: string;
  mode: Mode;
  startingCustomers?: number;
  lostCustomers?: number;
  startingRevenue?: number;
  lostRevenue?: number;
  expansionRevenue?: number;
}

export const PRESETS: Preset[] = [
  { label: "SaaS Startup", icon: "🚀", mode: "customer", startingCustomers: 1000, lostCustomers: 80 },
  { label: "Subscription Box", icon: "📦", mode: "customer", startingCustomers: 250, lostCustomers: 50 },
  { label: "Enterprise SaaS", icon: "🏢", mode: "customer", startingCustomers: 5000, lostCustomers: 650 },
  { label: "Revenue Churn (MRR)", icon: "💵", mode: "revenue", startingRevenue: 100000, lostRevenue: 8000, expansionRevenue: 2000 },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface ChurnInputs {
  mode: Mode;
  currency: string;
  startingCustomers: number;
  lostCustomers: number;
  newCustomersAcquired: number;
  endingCustomersOverride: number | null;
  startingRevenue: number;
  lostRevenue: number;
  expansionRevenue: number;
  arpu: number;
  cac: number;
  avgLifetimeOverride: number | null;
}

export interface ChurnResult {
  churnRatePct: number;
  retentionRatePct: number;
  customersLost: number;
  customersRemaining: number;
  totalCustomers: number;
  netRevenueChurnPct: number | null;
  periodComparisonLabel: string | null;
  periodComparisonValue: number | null;
  customerLifetimeMonths: number | null;
  ltv: number | null;
  ltvCacRatio: number | null;
  healthScore: number;
  tier: Tier;
  projection: number[];
  retainedPct: number;
  lostPct: number;
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ChurnInputs;
  result: ChurnResult;
}

// ── Validation ─────────────────────────────────────────────────────────────────

export function getWarning(inputs: ChurnInputs): string | null {
  if (inputs.mode === "revenue") {
    if (inputs.startingRevenue <= 0) return "Starting revenue must be greater than zero.";
    if (inputs.lostRevenue > inputs.startingRevenue) return "Lost revenue cannot exceed starting revenue.";
    return null;
  }
  if (inputs.startingCustomers <= 0) return "Starting customers must be greater than zero.";
  if (inputs.lostCustomers > inputs.startingCustomers) return "Lost customers cannot exceed starting customers.";
  return null;
}

// ── Main calculation ────────────────────────────────────────────────────────────

export function calculateChurn(inputs: ChurnInputs): ChurnResult {
  const warning = getWarning(inputs);

  let churnRatePct = 0;
  let netRevenueChurnPct: number | null = null;
  let customersLost = 0;
  let customersRemaining = 0;
  let totalCustomers = 0;
  let formula = "";
  let breakdown = "";
  let monthlyEquivalentRate = 0;

  if (inputs.mode === "revenue") {
    const starting = Math.max(0, inputs.startingRevenue);
    const lost = Math.min(Math.max(0, inputs.lostRevenue), starting || inputs.lostRevenue);
    churnRatePct = starting > 0 ? (lost / starting) * 100 : 0;
    netRevenueChurnPct = starting > 0 ? ((lost - Math.max(0, inputs.expansionRevenue)) / starting) * 100 : 0;
    formula = "Revenue Churn = (Lost Revenue ÷ Starting Revenue) × 100";
    breakdown = `${lost.toFixed(2)} ÷ ${starting.toFixed(2)} × 100 = ${churnRatePct.toFixed(2)}%`;
    totalCustomers = starting;
    customersLost = lost;
    customersRemaining = starting - lost + Math.max(0, inputs.expansionRevenue);
    monthlyEquivalentRate = churnRatePct / 100;
  } else {
    const starting = Math.max(0, inputs.startingCustomers);
    const lost = Math.min(Math.max(0, inputs.lostCustomers), starting || inputs.lostCustomers);
    churnRatePct = starting > 0 ? (lost / starting) * 100 : 0;
    formula = "Customer Churn Rate = (Lost Customers ÷ Starting Customers) × 100";
    breakdown = `${lost} ÷ ${starting} × 100 = ${churnRatePct.toFixed(2)}%`;
    customersLost = lost;
    customersRemaining = starting - lost + Math.max(0, inputs.newCustomersAcquired);
    totalCustomers = starting;

    if (inputs.mode === "monthly") monthlyEquivalentRate = churnRatePct / 100;
    else if (inputs.mode === "quarterly") monthlyEquivalentRate = 1 - Math.pow(1 - churnRatePct / 100, 1 / 3);
    else if (inputs.mode === "annual") monthlyEquivalentRate = 1 - Math.pow(1 - churnRatePct / 100, 1 / 12);
    else monthlyEquivalentRate = churnRatePct / 100;
  }

  const retentionRatePct = 100 - churnRatePct;

  let periodComparisonLabel: string | null = null;
  let periodComparisonValue: number | null = null;
  if (inputs.mode === "monthly") {
    periodComparisonLabel = "Annualized Churn";
    periodComparisonValue = (1 - Math.pow(1 - churnRatePct / 100, 12)) * 100;
  } else if (inputs.mode === "quarterly") {
    periodComparisonLabel = "Annualized Churn";
    periodComparisonValue = (1 - Math.pow(1 - churnRatePct / 100, 4)) * 100;
  } else if (inputs.mode === "annual") {
    periodComparisonLabel = "Monthly Equivalent Churn";
    periodComparisonValue = (1 - Math.pow(1 - churnRatePct / 100, 1 / 12)) * 100;
  }

  const customerLifetimeMonths =
    inputs.avgLifetimeOverride && inputs.avgLifetimeOverride > 0
      ? inputs.avgLifetimeOverride
      : monthlyEquivalentRate > 0
      ? Math.min(600, 1 / monthlyEquivalentRate)
      : null;

  const ltv = inputs.arpu > 0 && customerLifetimeMonths !== null ? inputs.arpu * customerLifetimeMonths : null;
  const ltvCacRatio = ltv !== null && inputs.cac > 0 ? ltv / inputs.cac : null;

  const tier = getTier(churnRatePct);
  const healthScore = Math.max(0, Math.min(100, 100 - churnRatePct * 5));

  const retainedPct = Math.max(0, Math.min(100, retentionRatePct));
  const lostPct = Math.max(0, Math.min(100, churnRatePct));

  const baseValue = inputs.mode === "revenue" ? Math.max(0, inputs.startingRevenue) : Math.max(0, inputs.startingCustomers);
  const projection: number[] = [baseValue];
  for (let i = 1; i <= 12; i++) {
    projection.push(projection[i - 1] * (1 - Math.min(1, Math.max(0, monthlyEquivalentRate))));
  }

  return {
    churnRatePct, retentionRatePct, customersLost, customersRemaining, totalCustomers,
    netRevenueChurnPct, periodComparisonLabel, periodComparisonValue,
    customerLifetimeMonths, ltv, ltvCacRatio,
    healthScore, tier, projection, retainedPct, lostPct,
    formula, breakdown, warning,
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

export function buildShareUrl(inputs: ChurnInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  url.searchParams.set("currency", inputs.currency);
  url.searchParams.set("startingCustomers", String(inputs.startingCustomers));
  url.searchParams.set("lostCustomers", String(inputs.lostCustomers));
  url.searchParams.set("newCustomers", String(inputs.newCustomersAcquired));
  url.searchParams.set("startingRevenue", String(inputs.startingRevenue));
  url.searchParams.set("lostRevenue", String(inputs.lostRevenue));
  url.searchParams.set("expansionRevenue", String(inputs.expansionRevenue));
  url.searchParams.set("arpu", String(inputs.arpu));
  url.searchParams.set("cac", String(inputs.cac));
  return url.toString();
}

export function parseShareParams(): Partial<ChurnInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode");
  if (!mode) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    mode: (MODE_ORDER.includes(mode as Mode) ? mode : "customer") as Mode,
    currency: p.get("currency") ?? "USD",
    startingCustomers: num("startingCustomers", 1000),
    lostCustomers: num("lostCustomers", 50),
    newCustomersAcquired: num("newCustomers", 0),
    startingRevenue: num("startingRevenue", 50000),
    lostRevenue: num("lostRevenue", 4000),
    expansionRevenue: num("expansionRevenue", 0),
    arpu: num("arpu", 0),
    cac: num("cac", 0),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "churn-rate-calculator-history";

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

export function buildTextReport(result: ChurnResult, inputs: ChurnInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Customer Churn Report",
    "======================",
    `Generated: ${ts}`,
    `Mode: ${MODE_META[inputs.mode].label}`,
    "",
    inputs.mode === "revenue"
      ? `Starting Revenue: ${formatMoney(inputs.startingRevenue, inputs.currency)}`
      : `Starting Customers: ${formatFull(inputs.startingCustomers)}`,
    inputs.mode === "revenue"
      ? `Lost Revenue: ${formatMoney(inputs.lostRevenue, inputs.currency)}`
      : `Lost Customers: ${formatFull(inputs.lostCustomers)}`,
    `Churn Rate: ${result.churnRatePct.toFixed(2)}%`,
    `Retention Rate: ${result.retentionRatePct.toFixed(2)}%`,
    `Performance: ${result.tier.label}`,
  ];
  if (result.netRevenueChurnPct !== null) lines.push(`Net Revenue Churn: ${result.netRevenueChurnPct.toFixed(2)}%`);
  if (result.periodComparisonValue !== null) lines.push(`${result.periodComparisonLabel}: ${result.periodComparisonValue.toFixed(2)}%`);
  if (result.ltv !== null) lines.push(`Customer Lifetime Value: ${formatMoney(result.ltv, inputs.currency)}`);
  if (result.ltvCacRatio !== null) lines.push(`LTV:CAC Ratio: ${result.ltvCacRatio.toFixed(2)}:1`);
  lines.push("", `Formula: ${result.formula}`, `Calculation: ${result.breakdown}`, "", result.tier.explanation, "", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: ChurnResult, inputs: ChurnInputs): string {
  const rows: (string | number)[][] = [
    ["Churn Rate Calculator Report", new Date().toISOString()],
    [],
    ["Mode", MODE_META[inputs.mode].label],
    ["Currency", inputs.currency],
    [],
    ["Metric", "Value"],
    ["Churn Rate (%)", result.churnRatePct.toFixed(2)],
    ["Retention Rate (%)", result.retentionRatePct.toFixed(2)],
    ["Performance", result.tier.label],
    ["Health Score", result.healthScore.toFixed(0)],
  ];
  if (result.netRevenueChurnPct !== null) rows.push(["Net Revenue Churn (%)", result.netRevenueChurnPct.toFixed(2)]);
  if (result.periodComparisonValue !== null) rows.push([result.periodComparisonLabel ?? "", result.periodComparisonValue.toFixed(2)]);
  if (result.ltv !== null) rows.push(["Customer LTV", result.ltv.toFixed(2)]);
  if (result.ltvCacRatio !== null) rows.push(["LTV:CAC Ratio", result.ltvCacRatio.toFixed(2)]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ChurnResult, inputs: ChurnInputs): string {
  return JSON.stringify(
    {
      mode: inputs.mode,
      currency: inputs.currency,
      results: {
        churnRatePct: parseFloat(result.churnRatePct.toFixed(2)),
        retentionRatePct: parseFloat(result.retentionRatePct.toFixed(2)),
        netRevenueChurnPct: result.netRevenueChurnPct !== null ? parseFloat(result.netRevenueChurnPct.toFixed(2)) : null,
        periodComparisonLabel: result.periodComparisonLabel,
        periodComparisonValue: result.periodComparisonValue !== null ? parseFloat(result.periodComparisonValue.toFixed(2)) : null,
        performance: result.tier.label,
        healthScore: result.healthScore,
        customerLifetimeMonths: result.customerLifetimeMonths,
        ltv: result.ltv,
        ltvCacRatio: result.ltvCacRatio,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ChurnResult, inputs: ChurnInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const extraRows = [
    result.netRevenueChurnPct !== null ? `<tr><td>Net Revenue Churn</td><td>${result.netRevenueChurnPct.toFixed(2)}%</td></tr>` : "",
    result.periodComparisonValue !== null ? `<tr><td>${result.periodComparisonLabel}</td><td>${result.periodComparisonValue.toFixed(2)}%</td></tr>` : "",
    result.ltv !== null ? `<tr><td>Customer LTV</td><td>${formatMoney(result.ltv, inputs.currency)}</td></tr>` : "",
    result.ltvCacRatio !== null ? `<tr><td>LTV:CAC Ratio</td><td>${result.ltvCacRatio.toFixed(2)}:1</td></tr>` : "",
  ].join("");
  return `<!DOCTYPE html><html><head><title>Churn Rate Report</title>
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
    <h1>Customer Churn Report</h1>
    <p class="meta">Generated ${ts} — ${MODE_META[inputs.mode].label}</p>
    <h2>Churn Summary</h2>
    <table>
      <tr><td>Churn Rate</td><td><strong>${result.churnRatePct.toFixed(2)}%</strong></td></tr>
      <tr><td>Retention Rate</td><td>${result.retentionRatePct.toFixed(2)}%</td></tr>
      <tr><td>Performance</td><td>${result.tier.label}</td></tr>
      <tr><td>Health Score</td><td>${result.healthScore.toFixed(0)} / 100</td></tr>
      ${extraRows}
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

export const DEFAULT_INPUTS: ChurnInputs = {
  mode: "customer",
  currency: "USD",
  startingCustomers: 1000,
  lostCustomers: 50,
  newCustomersAcquired: 0,
  endingCustomersOverride: null,
  startingRevenue: 50000,
  lostRevenue: 4000,
  expansionRevenue: 0,
  arpu: 0,
  cac: 0,
  avgLifetimeOverride: null,
};
