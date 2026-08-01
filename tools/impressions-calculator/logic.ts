// ── Impressions Calculator Logic ──

export type CalcMode = "reach-frequency" | "cpm-budget" | "ctr-clicks" | "engagement";

// ── Input shapes per mode ─────────────────────────────────────────────────────

export interface ReachFrequencyInputs {
  reach: number;
  frequency: number;
}

export interface CpmBudgetInputs {
  budget: number;
  cpm: number;
}

export interface CtrClicksInputs {
  clicks: number;
  ctr: number; // percentage, e.g. 2.5
}

export interface EngagementInputs {
  followers: number;
  engagementRate: number; // percentage
  reachPct: number;       // estimated reach % of followers
  avgFrequency: number;
}

export type ModeInputs =
  | { mode: "reach-frequency"; inputs: ReachFrequencyInputs }
  | { mode: "cpm-budget";      inputs: CpmBudgetInputs }
  | { mode: "ctr-clicks";      inputs: CtrClicksInputs }
  | { mode: "engagement";      inputs: EngagementInputs };

// ── Result ────────────────────────────────────────────────────────────────────

export interface CalcStep {
  label: string;
  value: string;
}

export interface ImpressionResult {
  mode: CalcMode;
  impressions: number;
  formattedFull: string;   // 1,400,000
  formattedShort: string;  // 1.4M
  formulaUsed: string;
  steps: CalcStep[];
  insights: Insight[];
}

export interface Insight {
  label: string;
  value: string;
  note: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: CalcMode;
  result: ImpressionResult;
  inputs: ModeInputs["inputs"];
}

// ── Formatters ────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatShort(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")}B`;
  if (abs >= 1_000_000)     return `${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (abs >= 1_000)         return `${(n / 1_000).toFixed(1).replace(/\.?0+$/, "")}K`;
  return String(Math.round(n));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Mode label helper ─────────────────────────────────────────────────────────

export const MODE_LABELS: Record<CalcMode, string> = {
  "reach-frequency": "Reach × Frequency",
  "cpm-budget":      "CPM + Budget",
  "ctr-clicks":      "Clicks ÷ CTR",
  "engagement":      "Engagement Rate",
};

// ── Calculators ───────────────────────────────────────────────────────────────

function calcReachFrequency(inp: ReachFrequencyInputs): ImpressionResult {
  const { reach, frequency } = inp;
  const impressions = reach * frequency;
  return {
    mode: "reach-frequency",
    impressions,
    formattedFull: formatFull(impressions),
    formattedShort: formatShort(impressions),
    formulaUsed: "Impressions = Reach × Frequency",
    steps: [
      { label: "Reach",       value: formatFull(reach) },
      { label: "Frequency",   value: frequency.toString() },
      { label: "Impressions", value: formatFull(impressions) },
    ],
    insights: [
      { label: "Reach",              value: formatFull(reach),             note: "Unique users who saw the content at least once" },
      { label: "Average Frequency",  value: frequency.toFixed(2) + "×",    note: "Average number of times each user saw the content" },
      { label: "Total Impressions",  value: formatShort(impressions),      note: "Total ad views including repeat exposures" },
      { label: "Impression / Reach", value: frequency.toFixed(2) + "×",   note: "Each unique user accounts for this many impressions on average" },
    ],
  };
}

function calcCpmBudget(inp: CpmBudgetInputs): ImpressionResult {
  const { budget, cpm } = inp;
  const impressions = cpm > 0 ? (budget / cpm) * 1000 : 0;
  return {
    mode: "cpm-budget",
    impressions,
    formattedFull: formatFull(impressions),
    formattedShort: formatShort(impressions),
    formulaUsed: "Impressions = (Budget ÷ CPM) × 1,000",
    steps: [
      { label: "Budget",            value: "$" + formatFull(budget) },
      { label: "CPM",               value: "$" + cpm.toFixed(2) },
      { label: "Budget ÷ CPM",      value: (cpm > 0 ? (budget / cpm).toFixed(4) : "0") },
      { label: "× 1,000",           value: "= " + formatFull(impressions) + " impressions" },
    ],
    insights: [
      { label: "Total Budget",       value: "$" + formatFull(budget),      note: "Total advertising spend allocated" },
      { label: "CPM Rate",           value: "$" + cpm.toFixed(2),          note: "Cost per 1,000 impressions" },
      { label: "Total Impressions",  value: formatShort(impressions),      note: "Impressions purchasable with the budget at this CPM" },
      { label: "Cost per Impression",value: cpm > 0 ? "$" + (cpm / 1000).toFixed(4) : "—", note: "Effective cost of each single impression" },
    ],
  };
}

function calcCtrClicks(inp: CtrClicksInputs): ImpressionResult {
  const { clicks, ctr } = inp;
  const ctrDecimal = ctr / 100;
  const impressions = ctrDecimal > 0 ? clicks / ctrDecimal : 0;
  return {
    mode: "ctr-clicks",
    impressions,
    formattedFull: formatFull(impressions),
    formattedShort: formatShort(impressions),
    formulaUsed: "Impressions = Clicks ÷ (CTR / 100)",
    steps: [
      { label: "Clicks",           value: formatFull(clicks) },
      { label: "CTR",              value: ctr + "%" },
      { label: "CTR as decimal",   value: ctrDecimal.toFixed(4) },
      { label: "Impressions",      value: formatFull(impressions) },
    ],
    insights: [
      { label: "Total Clicks",       value: formatFull(clicks),            note: "Number of clicks recorded on the ad or link" },
      { label: "CTR",                value: ctr + "%",                     note: "Percentage of impressions that resulted in a click" },
      { label: "Total Impressions",  value: formatShort(impressions),      note: "Impressions implied by click and CTR data" },
      { label: "Non-click Views",    value: ctrDecimal > 0 ? formatShort(impressions - clicks) : "—", note: "Users who saw the ad but did not click" },
    ],
  };
}

function calcEngagement(inp: EngagementInputs): ImpressionResult {
  const { followers, engagementRate, reachPct, avgFrequency } = inp;
  const reach = followers * (reachPct / 100);
  const engagements = followers * (engagementRate / 100);
  const impressions = reach * avgFrequency;
  return {
    mode: "engagement",
    impressions,
    formattedFull: formatFull(impressions),
    formattedShort: formatShort(impressions),
    formulaUsed: "Impressions = (Followers × Reach%) × Avg Frequency",
    steps: [
      { label: "Followers",          value: formatFull(followers) },
      { label: "Reach %",            value: reachPct + "%" },
      { label: "Estimated Reach",    value: formatFull(reach) },
      { label: "Avg Frequency",      value: avgFrequency.toFixed(2) + "×" },
      { label: "Impressions",        value: formatFull(impressions) },
    ],
    insights: [
      { label: "Followers",           value: formatFull(followers),         note: "Total audience size" },
      { label: "Estimated Reach",     value: formatShort(reach),            note: `${reachPct}% of followers estimated to see the post` },
      { label: "Estimated Engagements", value: formatShort(engagements),   note: `${engagementRate}% engagement rate applied to followers` },
      { label: "Total Impressions",   value: formatShort(impressions),      note: "Reach multiplied by average view frequency" },
    ],
  };
}

// ── Main entry point ──────────────────────────────────────────────────────────

export function calculate(data: ModeInputs): ImpressionResult | null {
  if (data.mode === "reach-frequency") return calcReachFrequency(data.inputs as ReachFrequencyInputs);
  if (data.mode === "cpm-budget")      return calcCpmBudget(data.inputs as CpmBudgetInputs);
  if (data.mode === "ctr-clicks")      return calcCtrClicks(data.inputs as CtrClicksInputs);
  if (data.mode === "engagement")      return calcEngagement(data.inputs as EngagementInputs);
  return null;
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validate(data: ModeInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (data.mode === "reach-frequency") {
    const { reach, frequency } = data.inputs as ReachFrequencyInputs;
    if (reach <= 0)     e.reach     = "Reach must be greater than 0";
    if (frequency <= 0) e.frequency = "Frequency must be greater than 0";
  }
  if (data.mode === "cpm-budget") {
    const { budget, cpm } = data.inputs as CpmBudgetInputs;
    if (budget <= 0) e.budget = "Budget must be greater than 0";
    if (cpm <= 0)    e.cpm    = "CPM must be greater than 0";
  }
  if (data.mode === "ctr-clicks") {
    const { clicks, ctr } = data.inputs as CtrClicksInputs;
    if (clicks <= 0)          e.clicks = "Clicks must be greater than 0";
    if (ctr <= 0)             e.ctr    = "CTR must be greater than 0";
    if (ctr > 100)            e.ctr    = "CTR cannot exceed 100%";
  }
  if (data.mode === "engagement") {
    const { followers, engagementRate, reachPct, avgFrequency } = data.inputs as EngagementInputs;
    if (followers <= 0)         e.followers      = "Followers must be greater than 0";
    if (engagementRate <= 0)    e.engagementRate = "Engagement rate must be greater than 0";
    if (engagementRate > 100)   e.engagementRate = "Cannot exceed 100%";
    if (reachPct <= 0)          e.reachPct       = "Reach % must be greater than 0";
    if (reachPct > 100)         e.reachPct       = "Cannot exceed 100%";
    if (avgFrequency <= 0)      e.avgFrequency   = "Frequency must be greater than 0";
  }
  return e;
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "impressions-calculator-history";

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

export function buildTextReport(result: ImpressionResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Impressions Calculator Report",
    "==============================",
    `Generated: ${ts}`,
    `Mode: ${MODE_LABELS[result.mode]}`,
    `Formula: ${result.formulaUsed}`,
    "",
    "CALCULATION STEPS",
    ...result.steps.map((s) => `  ${s.label.padEnd(20)}: ${s.value}`),
    "",
    `ESTIMATED IMPRESSIONS: ${result.formattedFull} (${result.formattedShort})`,
    "",
    "INSIGHTS",
    ...result.insights.map((i) => `  ${i.label.padEnd(22)}: ${i.value}  — ${i.note}`),
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: ImpressionResult): string {
  const ts = new Date().toISOString();
  const rows = [
    ["Impressions Calculator Report", ts],
    [],
    ["Mode", MODE_LABELS[result.mode]],
    ["Formula", result.formulaUsed],
    ["Estimated Impressions (Full)", result.formattedFull],
    ["Estimated Impressions (Short)", result.formattedShort],
    [],
    ["Step", "Value"],
    ...result.steps.map((s) => [s.label, s.value]),
    [],
    ["Insight", "Value", "Note"],
    ...result.insights.map((i) => [i.label, i.value, i.note]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

// ── Sample defaults per mode ──────────────────────────────────────────────────

export const DEFAULTS = {
  "reach-frequency": { reach: 25000, frequency: 3.5 } as ReachFrequencyInputs,
  "cpm-budget":      { budget: 500,  cpm: 8 }         as CpmBudgetInputs,
  "ctr-clicks":      { clicks: 350,  ctr: 2.5 }       as CtrClicksInputs,
  "engagement":      { followers: 50000, engagementRate: 3.5, reachPct: 20, avgFrequency: 1.8 } as EngagementInputs,
};
