// ── Email Open Rate Calculator Logic ──

export interface Tier {
  key: string;
  max: number;
  label: string;
  color: string;
  bg: string;
  text: string;
  dot: string;
  explanation: string;
}

export const TIERS: Tier[] = [
  { key: "poor", max: 10, label: "Poor", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", explanation: "Your open rate is well below industry averages. Review subject lines, sender name, and list quality." },
  { key: "below-average", max: 15, label: "Below Average", color: "#f97316", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500", explanation: "Your open rate is below typical benchmarks. Small improvements to subject lines and send timing can help." },
  { key: "average", max: 20, label: "Average", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500", explanation: "Your open rate is in line with typical industry benchmarks." },
  { key: "good", max: 30, label: "Good", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", explanation: "Your open rate is performing well, above the typical industry average." },
  { key: "excellent", max: 50, label: "Excellent", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", explanation: "Your email campaign is performing significantly above industry averages." },
  { key: "outstanding", max: Infinity, label: "Outstanding", color: "#069D63", bg: "bg-green-50", text: "text-green-800", dot: "bg-green-600", explanation: "Outstanding open rate — this level of engagement is rare and indicates a highly engaged, well-targeted list." },
];

export function getTier(openRatePct: number): Tier {
  return TIERS.find((t) => openRatePct <= t.max) ?? TIERS[TIERS.length - 1];
}

export interface Preset {
  label: string;
  icon: string;
  delivered: number;
  opens: number;
}

export const PRESETS: Preset[] = [
  { label: "Example Campaign 1", icon: "📧", delivered: 1000, opens: 420 },
  { label: "Example Campaign 2", icon: "📧", delivered: 5000, opens: 850 },
  { label: "Example Campaign 3", icon: "📧", delivered: 250, opens: 60 },
];

export interface OpenRateInputs {
  delivered: number;
  opens: number;
  decimalPrecision: number;
}

export interface OpenRateResult {
  openRatePct: number;
  nonOpenPct: number;
  nonOpens: number;
  tier: Tier;
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: OpenRateInputs;
  result: OpenRateResult;
}

export function getWarning(inputs: OpenRateInputs): string | null {
  if (inputs.delivered <= 0) return "Delivered emails must be greater than zero.";
  if (inputs.opens < 0) return "Unique opens cannot be negative.";
  if (inputs.opens > inputs.delivered) return "Unique opens cannot exceed delivered emails.";
  return null;
}

export function calculateOpenRate(inputs: OpenRateInputs): OpenRateResult {
  const warning = getWarning(inputs);
  const delivered = Math.max(0, inputs.delivered);
  const opens = Math.min(Math.max(0, inputs.opens), delivered || inputs.opens);

  const openRatePct = delivered > 0 ? (opens / delivered) * 100 : 0;
  const nonOpens = Math.max(0, delivered - opens);
  const nonOpenPct = 100 - openRatePct;
  const tier = getTier(openRatePct);

  const formula = "Open Rate (%) = (Unique Opens ÷ Delivered Emails) × 100";
  const breakdown = `${opens} ÷ ${delivered} × 100 = ${openRatePct.toFixed(2)}%`;

  return { openRatePct, nonOpenPct, nonOpens, tier, formula, breakdown, warning };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number, precision: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatFull(n: number): string {
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

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: OpenRateInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("delivered", String(inputs.delivered));
  url.searchParams.set("opens", String(inputs.opens));
  url.searchParams.set("precision", String(inputs.decimalPrecision));
  return url.toString();
}

export function parseShareParams(): Partial<OpenRateInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const delivered = p.get("delivered");
  if (!delivered) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    delivered: num("delivered", 1000),
    opens: num("opens", 250),
    decimalPrecision: num("precision", 2),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "email-open-rate-calculator-history";

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

export function buildTextReport(result: OpenRateResult, inputs: OpenRateInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Email Open Rate Report",
    "=======================",
    `Generated: ${ts}`,
    "",
    `Delivered Emails: ${formatFull(inputs.delivered)}`,
    `Unique Opens: ${formatFull(inputs.opens)}`,
    `Open Rate: ${result.openRatePct.toFixed(inputs.decimalPrecision)}%`,
    `Performance: ${result.tier.label}`,
    "",
    `Formula: ${result.formula}`,
    `Calculation: ${result.breakdown}`,
    "",
    result.tier.explanation,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: OpenRateResult, inputs: OpenRateInputs): string {
  const rows: (string | number)[][] = [
    ["Email Open Rate Calculator Report", new Date().toISOString()],
    [],
    ["Metric", "Value"],
    ["Delivered Emails", inputs.delivered],
    ["Unique Opens", inputs.opens],
    ["Open Rate (%)", result.openRatePct.toFixed(2)],
    ["Performance", result.tier.label],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: OpenRateResult, inputs: OpenRateInputs): string {
  return JSON.stringify(
    {
      inputs: { delivered: inputs.delivered, opens: inputs.opens },
      results: {
        openRatePct: parseFloat(result.openRatePct.toFixed(2)),
        performance: result.tier.label,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: OpenRateResult, inputs: OpenRateInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Email Open Rate Report</title>
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
    <h1>Email Open Rate Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Campaign Summary</h2>
    <table>
      <tr><td>Delivered Emails</td><td>${formatFull(inputs.delivered)}</td></tr>
      <tr><td>Unique Opens</td><td>${formatFull(inputs.opens)}</td></tr>
      <tr><td>Open Rate</td><td><strong>${result.openRatePct.toFixed(inputs.decimalPrecision)}%</strong></td></tr>
      <tr><td>Performance</td><td>${result.tier.label}</td></tr>
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

export const DEFAULT_INPUTS: OpenRateInputs = {
  delivered: 1000,
  opens: 250,
  decimalPrecision: 2,
};
