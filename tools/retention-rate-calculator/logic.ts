// ── Retention Rate Calculator Logic ──

export type MetricType = "customers" | "employees" | "users" | "subscribers" | "members";
export type Period = "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";

export const METRIC_META: Record<MetricType, { label: string; singular: string }> = {
  customers:   { label: "Customers",   singular: "customer" },
  employees:   { label: "Employees",   singular: "employee" },
  users:       { label: "Users",       singular: "user" },
  subscribers: { label: "Subscribers", singular: "subscriber" },
  members:     { label: "Members",     singular: "member" },
};

export const METRIC_ORDER: MetricType[] = ["customers", "employees", "users", "subscribers", "members"];

export const PERIOD_META: Record<Period, { label: string; periodsPerYear: number | null }> = {
  daily:     { label: "Daily",     periodsPerYear: 365 },
  weekly:    { label: "Weekly",    periodsPerYear: 52 },
  monthly:   { label: "Monthly",   periodsPerYear: 12 },
  quarterly: { label: "Quarterly", periodsPerYear: 4 },
  yearly:    { label: "Yearly",    periodsPerYear: 1 },
  custom:    { label: "Custom Period", periodsPerYear: null },
};

export const PERIOD_ORDER: Period[] = ["daily", "weekly", "monthly", "quarterly", "yearly", "custom"];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface RetentionInputs {
  startingUsers: number;
  endingUsers: number;
  newUsers: number;
  metricType: MetricType;
  period: Period;
  decimalPlaces: number;
}

export type PerformanceStatus = "Excellent" | "Very Good" | "Good" | "Average" | "Needs Improvement";

export interface RetentionResult {
  retainedUsers: number;
  lostUsers: number;
  retentionRate: number;
  churnRate: number;
  status: PerformanceStatus;
  color: string;
  insight: string;
  compoundedAnnual: number | null;
  exceedsHundred: boolean;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function classifyRetention(rate: number): { status: PerformanceStatus; color: string } {
  if (rate >= 90) return { status: "Excellent", color: "#058554" };
  if (rate >= 80) return { status: "Very Good", color: "#2563eb" };
  if (rate >= 70) return { status: "Good", color: "#0891b2" };
  if (rate >= 60) return { status: "Average", color: "#d97706" };
  return { status: "Needs Improvement", color: "#dc2626" };
}

export function calculateRetention(inputs: RetentionInputs): RetentionResult | null {
  const { startingUsers, endingUsers, newUsers, decimalPlaces, metricType, period } = inputs;
  if (startingUsers <= 0) return null;

  const round = (n: number) => parseFloat(n.toFixed(decimalPlaces));
  const retainedUsers = endingUsers - newUsers;
  const lostUsers = Math.max(0, startingUsers - retainedUsers);
  const rawRate = (retainedUsers / startingUsers) * 100;
  const retentionRate = round(rawRate);
  const churnRate = round(clamp(100 - rawRate, -1000, 100));
  const exceedsHundred = retentionRate > 100;

  const { status, color } = classifyRetention(clamp(retentionRate, 0, 999));

  const periodsPerYear = PERIOD_META[period].periodsPerYear;
  const compoundedAnnual = periodsPerYear && periodsPerYear > 1
    ? round(Math.pow(clamp(rawRate, 0, 100) / 100, periodsPerYear) * 100)
    : null;

  const metricLabel = METRIC_META[metricType].label.toLowerCase();
  const periodLabel = PERIOD_META[period].label.toLowerCase();

  let insight = `Your ${periodLabel} ${metricLabel} retention rate of ${retentionRate}% is rated ${status}.`;
  if (status === "Excellent") insight += " You're retaining the vast majority of your original cohort — focus on sustaining what's working.";
  else if (status === "Very Good") insight += " You're performing above the 80% benchmark most subscription businesses target.";
  else if (status === "Good") insight += " There's room to close the gap toward the 80-90% range typical of top-performing teams.";
  else if (status === "Average") insight += " Consider investigating why a meaningful share of your original cohort didn't stick around.";
  else insight += " This is a strong signal to investigate churn drivers before scaling acquisition further.";

  if (compoundedAnnual !== null && period !== "yearly") {
    insight += ` If this rate holds steady, it compounds to roughly ${compoundedAnnual}% retained after a full year.`;
  }

  return { retainedUsers, lostUsers, retentionRate, churnRate, status, color, insight, compoundedAnnual, exceedsHundred };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: RetentionInputs): ValidationErrors {
  const e: ValidationErrors = {};
  const label = METRIC_META[inputs.metricType].label;

  if (!inputs.startingUsers || inputs.startingUsers <= 0) e.startingUsers = `Starting ${label.toLowerCase()} must be greater than zero.`;
  if (inputs.endingUsers < 0) e.endingUsers = `Ending ${label.toLowerCase()} cannot be negative.`;
  if (inputs.newUsers < 0) e.newUsers = `New ${label.toLowerCase()} cannot be negative.`;
  if (inputs.newUsers > inputs.endingUsers) e.newUsers = `New ${label.toLowerCase()} cannot exceed ending ${label.toLowerCase()}.`;

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL (query parameters) ──────────────────────────────────────────

export function buildShareUrl(inputs: RetentionInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("start", String(inputs.startingUsers));
  url.searchParams.set("end", String(inputs.endingUsers));
  url.searchParams.set("new", String(inputs.newUsers));
  url.searchParams.set("metric", inputs.metricType);
  url.searchParams.set("period", inputs.period);
  return url.toString();
}

export function parseShareParams(): Partial<RetentionInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const start = p.get("start");
  if (!start) return null;
  return {
    startingUsers: parseFloat(start) || 0,
    endingUsers: parseFloat(p.get("end") ?? "0") || 0,
    newUsers: parseFloat(p.get("new") ?? "0") || 0,
    metricType: (METRIC_ORDER.includes(p.get("metric") as MetricType) ? p.get("metric") : "customers") as MetricType,
    period: (PERIOD_ORDER.includes(p.get("period") as Period) ? p.get("period") : "monthly") as Period,
  };
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "retention-rate-calculator-inputs";

export function saveInputs(inputs: RetentionInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): RetentionInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as RetentionInputs;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: RetentionInputs;
  result: RetentionResult;
}

const HISTORY_KEY = "retention-rate-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: RetentionResult, inputs: RetentionInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const label = METRIC_META[inputs.metricType].label;
  return [
    "Retention Rate Calculator Report",
    "=================================",
    `Generated: ${ts}`,
    `Metric: ${label} · Period: ${PERIOD_META[inputs.period].label}`,
    "",
    `Starting ${label}: ${formatNumber(inputs.startingUsers)}`,
    `Ending ${label}: ${formatNumber(inputs.endingUsers)}`,
    `New ${label} Acquired: ${formatNumber(inputs.newUsers)}`,
    "",
    `Retained ${label}: ${formatNumber(result.retainedUsers)}`,
    `Lost ${label}: ${formatNumber(result.lostUsers)}`,
    `Retention Rate: ${result.retentionRate}%`,
    `Churn Rate: ${result.churnRate}%`,
    `Performance: ${result.status}`,
    result.compoundedAnnual !== null ? `Compounded Annual Retention: ${result.compoundedAnnual}%` : "",
    "",
    "Formula: Retention Rate (%) = ((Ending − New) ÷ Starting) × 100",
    "",
    result.insight,
    "",
    "Generated by Retention Rate Calculator — https://productivetoolbox.com",
  ].filter(Boolean).join("\n");
}

export function buildCSVReport(result: RetentionResult, inputs: RetentionInputs): string {
  const label = METRIC_META[inputs.metricType].label;
  const rows = [
    ["Metric", "Value"],
    [`Starting ${label}`, inputs.startingUsers],
    [`Ending ${label}`, inputs.endingUsers],
    [`New ${label}`, inputs.newUsers],
    [`Retained ${label}`, result.retainedUsers],
    [`Lost ${label}`, result.lostUsers],
    ["Retention Rate", `${result.retentionRate}%`],
    ["Churn Rate", `${result.churnRate}%`],
    ["Performance", result.status],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildJSONReport(result: RetentionResult, inputs: RetentionInputs): string {
  return JSON.stringify(
    {
      metricType: inputs.metricType,
      period: inputs.period,
      startingUsers: inputs.startingUsers,
      endingUsers: inputs.endingUsers,
      newUsers: inputs.newUsers,
      retainedUsers: result.retainedUsers,
      lostUsers: result.lostUsers,
      retentionRate: result.retentionRate,
      churnRate: result.churnRate,
      status: result.status,
      compoundedAnnual: result.compoundedAnnual,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: RetentionResult, inputs: RetentionInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const label = METRIC_META[inputs.metricType].label;
  return `<!DOCTYPE html><html><head><title>Retention Rate Report</title>
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
    <h1>Retention Rate Calculator Report</h1>
    <p class="meta">Generated ${ts} — ${label} · ${PERIOD_META[inputs.period].label}</p>
    <h2>Inputs</h2>
    <table>
      <tr><td>Starting ${label}</td><td>${formatNumber(inputs.startingUsers)}</td></tr>
      <tr><td>Ending ${label}</td><td>${formatNumber(inputs.endingUsers)}</td></tr>
      <tr><td>New ${label} Acquired</td><td>${formatNumber(inputs.newUsers)}</td></tr>
    </table>
    <h2>Results</h2>
    <table>
      <tr><td>Retained ${label}</td><td>${formatNumber(result.retainedUsers)}</td></tr>
      <tr><td>Lost ${label}</td><td>${formatNumber(result.lostUsers)}</td></tr>
      <tr><td>Retention Rate</td><td><strong>${result.retentionRate}%</strong></td></tr>
      <tr><td>Churn Rate</td><td>${result.churnRate}%</td></tr>
      <tr><td>Performance</td><td>${result.status}</td></tr>
    </table>
    <h2>Formula</h2>
    <table>
      <tr><td colspan="2">Retention Rate (%) = ((Ending − New) ÷ Starting) × 100</td></tr>
      <tr><td colspan="2">((${formatNumber(inputs.endingUsers)} − ${formatNumber(inputs.newUsers)}) ÷ ${formatNumber(inputs.startingUsers)}) × 100 = ${result.retentionRate}%</td></tr>
    </table>
    <h2>Insight</h2>
    <table><tr><td colspan="2">${result.insight}</td></tr></table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs + presets ───────────────────────────────────────────────────

export const DEFAULT_INPUTS: RetentionInputs = {
  startingUsers: 1000,
  endingUsers: 850,
  newUsers: 150,
  metricType: "customers",
  period: "monthly",
  decimalPlaces: 2,
};

export const PRESETS: { label: string; inputs: Partial<RetentionInputs> }[] = [
  { label: "SaaS Customers",  inputs: { metricType: "customers",   startingUsers: 500,  endingUsers: 450,  newUsers: 50 } },
  { label: "Employees",       inputs: { metricType: "employees",   startingUsers: 120,  endingUsers: 118,  newUsers: 8  } },
  { label: "Community Members", inputs: { metricType: "members",   startingUsers: 2000, endingUsers: 1850, newUsers: 150 } },
];
