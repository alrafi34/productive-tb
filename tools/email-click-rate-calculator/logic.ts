// ── Email Click Rate (CTR) Calculator Logic ──

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
  { key: "poor", max: 1, label: "Poor", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", explanation: "Your click rate is well below industry averages. Review your call-to-action, email design, and content relevance." },
  { key: "below-average", max: 2, label: "Below Average", color: "#f97316", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500", explanation: "Your click rate is below typical benchmarks. Strengthening your call-to-action can help." },
  { key: "average", max: 4, label: "Average", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500", explanation: "Your click rate is in line with typical industry benchmarks." },
  { key: "good", max: 7, label: "Good", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", explanation: "Your click rate is performing well, above the typical industry average." },
  { key: "very-good", max: 10, label: "Very Good", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", explanation: "Your click rate is strong — recipients are clearly engaging with your content." },
  { key: "excellent", max: Infinity, label: "Excellent", color: "#069D63", bg: "bg-green-50", text: "text-green-800", dot: "bg-green-600", explanation: "Excellent click rate — this level of engagement is rare and indicates highly relevant, well-targeted content." },
];

export function getTier(clickRatePct: number): Tier {
  return TIERS.find((t) => clickRatePct <= t.max) ?? TIERS[TIERS.length - 1];
}

export interface Preset {
  label: string;
  icon: string;
  clicks: number;
  delivered: number;
}

export const PRESETS: Preset[] = [
  { label: "Example Campaign 1", icon: "🖱️", clicks: 250, delivered: 5000 },
  { label: "Example Campaign 2", icon: "🖱️", clicks: 62, delivered: 2000 },
  { label: "Example Campaign 3", icon: "🖱️", clicks: 980, delivered: 8500 },
];

export interface ClickRateInputs {
  clicks: number;
  delivered: number;
  decimalPrecision: number;
}

export interface ClickRateResult {
  clickRatePct: number;
  nonClicks: number;
  tier: Tier;
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ClickRateInputs;
  result: ClickRateResult;
}

export function getWarning(inputs: ClickRateInputs): string | null {
  if (inputs.delivered <= 0) return "Delivered emails must be greater than zero.";
  if (inputs.clicks < 0) return "Unique clicks cannot be negative.";
  if (inputs.clicks > inputs.delivered) return "Unique clicks cannot exceed delivered emails.";
  return null;
}

export function calculateClickRate(inputs: ClickRateInputs): ClickRateResult {
  const warning = getWarning(inputs);
  const delivered = Math.max(0, inputs.delivered);
  const clicks = Math.min(Math.max(0, inputs.clicks), delivered || inputs.clicks);

  const clickRatePct = delivered > 0 ? (clicks / delivered) * 100 : 0;
  const nonClicks = Math.max(0, delivered - clicks);
  const tier = getTier(clickRatePct);

  const formula = "Email Click Rate (%) = (Unique Clicks ÷ Delivered Emails) × 100";
  const breakdown = `${clicks} ÷ ${delivered} × 100 = ${clickRatePct.toFixed(2)}%`;

  return { clickRatePct, nonClicks, tier, formula, breakdown, warning };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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

export function buildShareUrl(inputs: ClickRateInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("clicks", String(inputs.clicks));
  url.searchParams.set("delivered", String(inputs.delivered));
  url.searchParams.set("precision", String(inputs.decimalPrecision));
  return url.toString();
}

export function parseShareParams(): Partial<ClickRateInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const delivered = p.get("delivered");
  if (!delivered) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    clicks: num("clicks", 0),
    delivered: num("delivered", 1000),
    decimalPrecision: num("precision", 2),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "email-click-rate-calculator-history";

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

export function buildTextReport(result: ClickRateResult, inputs: ClickRateInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Email Click Rate Report",
    "========================",
    `Generated: ${ts}`,
    "",
    `Delivered Emails: ${formatFull(inputs.delivered)}`,
    `Unique Clicks: ${formatFull(inputs.clicks)}`,
    `Click Rate: ${result.clickRatePct.toFixed(inputs.decimalPrecision)}%`,
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

export function buildCSVReport(result: ClickRateResult, inputs: ClickRateInputs): string {
  const rows: (string | number)[][] = [
    ["Email Click Rate Calculator Report", new Date().toISOString()],
    [],
    ["Metric", "Value"],
    ["Delivered Emails", inputs.delivered],
    ["Unique Clicks", inputs.clicks],
    ["Click Rate (%)", result.clickRatePct.toFixed(2)],
    ["Performance", result.tier.label],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ClickRateResult, inputs: ClickRateInputs): string {
  return JSON.stringify(
    {
      inputs: { clicks: inputs.clicks, delivered: inputs.delivered },
      results: {
        clickRatePct: parseFloat(result.clickRatePct.toFixed(2)),
        performance: result.tier.label,
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ClickRateResult, inputs: ClickRateInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Email Click Rate Report</title>
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
    <h1>Email Click Rate Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Campaign Summary</h2>
    <table>
      <tr><td>Delivered Emails</td><td>${formatFull(inputs.delivered)}</td></tr>
      <tr><td>Unique Clicks</td><td>${formatFull(inputs.clicks)}</td></tr>
      <tr><td>Click Rate</td><td><strong>${result.clickRatePct.toFixed(inputs.decimalPrecision)}%</strong></td></tr>
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

export const DEFAULT_INPUTS: ClickRateInputs = {
  clicks: 0,
  delivered: 1000,
  decimalPrecision: 2,
};
