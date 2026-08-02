// ── User Growth Rate Calculator Logic ──

export type TimePeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";

export const PERIOD_META: Record<TimePeriod, { label: string; periodsPerYear: number | null }> = {
  daily: { label: "Daily", periodsPerYear: 365 },
  weekly: { label: "Weekly", periodsPerYear: 52 },
  monthly: { label: "Monthly", periodsPerYear: 12 },
  quarterly: { label: "Quarterly", periodsPerYear: 4 },
  yearly: { label: "Yearly", periodsPerYear: 1 },
  custom: { label: "Custom", periodsPerYear: null },
};

export const PERIOD_ORDER: TimePeriod[] = ["daily", "weekly", "monthly", "quarterly", "yearly", "custom"];

export interface Tier {
  key: string;
  label: string;
  color: string;
  bg: string;
  text: string;
  dot: string;
  message: string;
}

export const TIERS: Tier[] = [
  { key: "declining", label: "Declining", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", message: "User base is declining." },
  { key: "no-change", label: "No Change", color: "#9ca3af", bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400", message: "No change detected." },
  { key: "slow", label: "Slow Growth", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500", message: "Slow growth." },
  { key: "healthy", label: "Healthy Growth", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", message: "Healthy growth." },
  { key: "strong", label: "Strong Growth", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", message: "Strong growth." },
  { key: "excellent", label: "Excellent Growth", color: "#069D63", bg: "bg-green-50", text: "text-green-800", dot: "bg-green-600", message: "Excellent user acquisition." },
];

export function getTier(ratePct: number): Tier {
  if (ratePct < 0) return TIERS[0];
  if (ratePct === 0) return TIERS[1];
  if (ratePct <= 5) return TIERS[2];
  if (ratePct <= 20) return TIERS[3];
  if (ratePct <= 50) return TIERS[4];
  return TIERS[5];
}

export type Direction = "positive" | "negative" | "none";

export function getDirection(net: number): Direction {
  if (net > 0) return "positive";
  if (net < 0) return "negative";
  return "none";
}

// ── Presets ────────────────────────────────────────────────────────────────────

export interface Preset {
  label: string;
  icon: string;
  startingUsers: number;
  endingUsers: number;
}

export const PRESETS: Preset[] = [
  { label: "SaaS Startup", icon: "🚀", startingUsers: 1000, endingUsers: 1250 },
  { label: "Scaling SaaS", icon: "📈", startingUsers: 50000, endingUsers: 62500 },
  { label: "Declining App", icon: "📉", startingUsers: 8000, endingUsers: 7200 },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface GrowthInputs {
  startingUsers: number;
  endingUsers: number;
  timePeriod: TimePeriod;
  decimalPrecision: number;
  projectionPeriods: number;
}

export interface GrowthResult {
  growthRatePct: number;
  netChange: number;
  direction: Direction;
  tier: Tier;
  annualizedPct: number | null;
  projection: number[];
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: GrowthInputs;
  result: GrowthResult;
}

export function getWarning(inputs: GrowthInputs): string | null {
  if (inputs.startingUsers <= 0) return "Starting users must be greater than zero.";
  if (inputs.endingUsers < 0) return "Ending users cannot be negative.";
  return null;
}

export function calculateGrowth(inputs: GrowthInputs): GrowthResult {
  const warning = getWarning(inputs);
  const startingUsers = Math.max(0, inputs.startingUsers);
  const endingUsers = Math.max(0, inputs.endingUsers);

  const growthRatePct = startingUsers > 0 ? ((endingUsers - startingUsers) / startingUsers) * 100 : 0;
  const netChange = endingUsers - startingUsers;
  const direction = getDirection(netChange);
  const tier = getTier(growthRatePct);

  const periodsPerYear = PERIOD_META[inputs.timePeriod].periodsPerYear;
  const annualizedPct = periodsPerYear !== null && periodsPerYear !== 1
    ? (Math.pow(1 + growthRatePct / 100, periodsPerYear) - 1) * 100
    : null;

  const periods = Math.min(60, Math.max(1, Math.round(inputs.projectionPeriods)));
  const projection: number[] = [endingUsers];
  for (let i = 1; i <= periods; i++) {
    projection.push(projection[i - 1] * (1 + growthRatePct / 100));
  }

  const formula = "Growth Rate (%) = ((Ending Users − Starting Users) ÷ Starting Users) × 100";
  const breakdown = `((${endingUsers} − ${startingUsers}) ÷ ${startingUsers}) × 100 = ${growthRatePct.toFixed(2)}%`;

  return { growthRatePct, netChange, direction, tier, annualizedPct, projection, formula, breakdown, warning };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatSigned(n: number): string {
  const rounded = Math.round(n);
  return (rounded >= 0 ? "+" : "") + rounded.toLocaleString("en-US");
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

export function buildShareUrl(inputs: GrowthInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("starting", String(inputs.startingUsers));
  url.searchParams.set("ending", String(inputs.endingUsers));
  url.searchParams.set("period", inputs.timePeriod);
  url.searchParams.set("precision", String(inputs.decimalPrecision));
  return url.toString();
}

export function parseShareParams(): Partial<GrowthInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const starting = p.get("starting");
  if (!starting) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  const period = p.get("period");
  return {
    startingUsers: num("starting", 1000),
    endingUsers: num("ending", 1250),
    timePeriod: (PERIOD_ORDER.includes(period as TimePeriod) ? period : "monthly") as TimePeriod,
    decimalPrecision: num("precision", 2),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "user-growth-rate-calculator-history";

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

export function buildTextReport(result: GrowthResult, inputs: GrowthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "User Growth Rate Report",
    "========================",
    `Generated: ${ts}`,
    "",
    `Starting Users: ${formatFull(inputs.startingUsers)}`,
    `Ending Users: ${formatFull(inputs.endingUsers)}`,
    `Time Period: ${PERIOD_META[inputs.timePeriod].label}`,
    `Growth Rate: ${result.growthRatePct.toFixed(inputs.decimalPrecision)}%`,
    `Net Growth: ${formatSigned(result.netChange)} Users`,
    `Growth Status: ${result.tier.label}`,
  ];
  if (result.annualizedPct !== null) lines.push(`Annualized Growth Rate: ${result.annualizedPct.toFixed(inputs.decimalPrecision)}%`);
  lines.push("", `Formula: ${result.formula}`, `Calculation: ${result.breakdown}`, "", result.tier.message, "", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: GrowthResult, inputs: GrowthInputs): string {
  const rows: (string | number)[][] = [
    ["User Growth Rate Calculator Report", new Date().toISOString()],
    [],
    ["Metric", "Value"],
    ["Starting Users", inputs.startingUsers],
    ["Ending Users", inputs.endingUsers],
    ["Time Period", PERIOD_META[inputs.timePeriod].label],
    ["Growth Rate (%)", result.growthRatePct.toFixed(2)],
    ["Net Growth", result.netChange.toFixed(0)],
    ["Growth Status", result.tier.label],
  ];
  if (result.annualizedPct !== null) rows.push(["Annualized Growth Rate (%)", result.annualizedPct.toFixed(2)]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: GrowthResult, inputs: GrowthInputs): string {
  return JSON.stringify(
    {
      inputs: { startingUsers: inputs.startingUsers, endingUsers: inputs.endingUsers, timePeriod: inputs.timePeriod },
      results: {
        growthRatePct: parseFloat(result.growthRatePct.toFixed(2)),
        netChange: result.netChange,
        growthStatus: result.tier.label,
        annualizedPct: result.annualizedPct !== null ? parseFloat(result.annualizedPct.toFixed(2)) : null,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: GrowthResult, inputs: GrowthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const annRow = result.annualizedPct !== null ? `<tr><td>Annualized Growth Rate</td><td>${result.annualizedPct.toFixed(inputs.decimalPrecision)}%</td></tr>` : "";
  return `<!DOCTYPE html><html><head><title>User Growth Rate Report</title>
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
    <h1>User Growth Rate Report</h1>
    <p class="meta">Generated ${ts} — ${PERIOD_META[inputs.timePeriod].label}</p>
    <h2>Summary</h2>
    <table>
      <tr><td>Starting Users</td><td>${formatFull(inputs.startingUsers)}</td></tr>
      <tr><td>Ending Users</td><td>${formatFull(inputs.endingUsers)}</td></tr>
      <tr><td>Growth Rate</td><td><strong>${result.growthRatePct.toFixed(inputs.decimalPrecision)}%</strong></td></tr>
      <tr><td>Net Growth</td><td>${formatSigned(result.netChange)} Users</td></tr>
      <tr><td>Growth Status</td><td>${result.tier.label}</td></tr>
      ${annRow}
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

export const DEFAULT_INPUTS: GrowthInputs = {
  startingUsers: 1000,
  endingUsers: 1250,
  timePeriod: "monthly",
  decimalPrecision: 2,
  projectionPeriods: 6,
};
