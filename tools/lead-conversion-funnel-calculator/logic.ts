// ── Lead Conversion Funnel Calculator Logic ──

export const MIN_STAGES = 2;
export const MAX_STAGES = 10;

export interface Stage {
  id: string;
  name: string;
  value: number;
}

export interface FunnelInputs {
  stages: Stage[];
  decimalPlaces: number;
  strictValidation: boolean;
}

// ── Core math (matches the spec's reference pseudo-code) ─────────────────────

export function conversionRate(previous: number, current: number): number {
  if (previous <= 0) return 0;
  return (current / previous) * 100;
}

export function dropOff(previous: number, current: number): number {
  if (previous <= 0) return 0;
  return ((previous - current) / previous) * 100;
}

export function overallConversion(first: number, last: number): number {
  if (first <= 0) return 0;
  return (last / first) * 100;
}

// ── Result types ───────────────────────────────────────────────────────────────

export interface StageResult {
  id: string;
  name: string;
  value: number;
  shareOfFirst: number; // value / first-stage value * 100 — drives funnel width
  conversionFromPrev: number | null; // null for the first stage
  dropOffFromPrev: number | null;
}

export type HealthLabel = "Healthy" | "Needs Attention" | "Critical";

export interface FunnelResult {
  stages: StageResult[];
  overallConversionRate: number;
  efficiencyScore: number; // geometric mean of per-stage conversion rates, 0-100
  bestTransitionIndex: number; // index into stages (1..n-1) with the highest conversion
  worstTransitionIndex: number; // index into stages (1..n-1) with the highest drop-off
  healthLabel: HealthLabel;
  healthColor: string;
  warnings: string[];
  insights: string[];
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function calculateFunnel(inputs: FunnelInputs): FunnelResult {
  const { stages, decimalPlaces } = inputs;
  const round = (n: number) => parseFloat(n.toFixed(decimalPlaces));
  const first = stages[0]?.value ?? 0;

  const results: StageResult[] = stages.map((s, i) => {
    const prev = i > 0 ? stages[i - 1].value : null;
    return {
      id: s.id,
      name: s.name || `Stage ${i + 1}`,
      value: s.value,
      shareOfFirst: first > 0 ? clamp((s.value / first) * 100, 0, 100) : i === 0 ? 100 : 0,
      conversionFromPrev: prev === null ? null : round(conversionRate(prev, s.value)),
      dropOffFromPrev: prev === null ? null : round(dropOff(prev, s.value)),
    };
  });

  const last = stages[stages.length - 1]?.value ?? 0;
  const overallConversionRate = round(overallConversion(first, last));

  const transitions = results.slice(1); // has conversionFromPrev / dropOffFromPrev set
  const transitionCount = transitions.length || 1;
  const efficiencyScore = Math.round(clamp(Math.pow(Math.max(overallConversionRate, 0) / 100, 1 / transitionCount) * 100, 0, 100));

  let bestTransitionIndex = 1;
  let worstTransitionIndex = 1;
  transitions.forEach((t, idx) => {
    const i = idx + 1;
    if ((t.conversionFromPrev ?? 0) > (results[bestTransitionIndex].conversionFromPrev ?? 0)) bestTransitionIndex = i;
    if ((t.dropOffFromPrev ?? 0) > (results[worstTransitionIndex].dropOffFromPrev ?? 0)) worstTransitionIndex = i;
  });

  const maxDropOff = results[worstTransitionIndex]?.dropOffFromPrev ?? 0;
  const healthLabel: HealthLabel = efficiencyScore >= 50 && maxDropOff < 90 ? "Healthy" : efficiencyScore >= 25 && maxDropOff < 90 ? "Needs Attention" : "Critical";
  const healthColor = healthLabel === "Healthy" ? "#058554" : healthLabel === "Needs Attention" ? "#d97706" : "#dc2626";

  const warnings: string[] = [];
  results.forEach((r, i) => {
    if (i === 0) return;
    if ((r.conversionFromPrev ?? 0) > 100) {
      warnings.push(`Warning: Conversion from ${results[i - 1].name} to ${r.name} exceeds 100%. Please verify your inputs.`);
    }
  });

  const worst = results[worstTransitionIndex];
  const best = results[bestTransitionIndex];
  const insights: string[] = [];
  if (worst && (worst.dropOffFromPrev ?? 0) > 0) {
    insights.push(`Your biggest drop-off is between ${results[worstTransitionIndex - 1].name} and ${worst.name} — ${worst.dropOffFromPrev}% of leads are lost at this stage. This is the highest-leverage place to focus optimization efforts first.`);
  }
  if (best) {
    insights.push(`${results[bestTransitionIndex - 1].name} to ${best.name} is your strongest transition at ${best.conversionFromPrev}% conversion — consider what's working here and apply it to weaker stages.`);
  }
  insights.push(`Overall, ${overallConversionRate}% of ${results[0].name.toLowerCase()} become ${results[results.length - 1].name.toLowerCase()}, with a funnel efficiency score of ${efficiencyScore}/100.`);

  return { stages: results, overallConversionRate, efficiencyScore, bestTransitionIndex, worstTransitionIndex, healthLabel, healthColor, warnings, insights };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: FunnelInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (inputs.stages.length < MIN_STAGES) e.stages = `A funnel needs at least ${MIN_STAGES} stages.`;
  if (inputs.stages.length > MAX_STAGES) e.stages = `A funnel can have at most ${MAX_STAGES} stages.`;

  inputs.stages.forEach((s, i) => {
    if (s.value < 0) e[`stage-${s.id}`] = "Values cannot be negative.";
    if (inputs.strictValidation && i > 0 && s.value > inputs.stages[i - 1].value) {
      e[`stage-${s.id}`] = `Cannot exceed the previous stage's value (${inputs.stages[i - 1].name}: ${formatNumber(inputs.stages[i - 1].value)}). Disable strict validation to allow this.`;
    }
  });

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

export function makeStageId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "lead-conversion-funnel-calculator-inputs";

export function saveInputs(inputs: FunnelInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): FunnelInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.stages)) return null;
    return parsed as FunnelInputs;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  label: string;
  inputs: FunnelInputs;
  result: FunnelResult;
}

const HISTORY_KEY = "lead-conversion-funnel-calculator-history";

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

export function buildTextReport(result: FunnelResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Lead Conversion Funnel Report",
    "==============================",
    `Generated: ${ts}`,
    "",
    ...result.stages.map((s, i) =>
      i === 0
        ? `${s.name}: ${formatNumber(s.value)}`
        : `  ↓ ${s.conversionFromPrev}% conversion (${s.dropOffFromPrev}% drop-off)\n${s.name}: ${formatNumber(s.value)}`
    ),
    "",
    `Overall Conversion Rate: ${result.overallConversionRate}%`,
    `Funnel Efficiency Score: ${result.efficiencyScore}/100`,
    `Funnel Health: ${result.healthLabel}`,
    "",
    "Insights:",
    ...result.insights.map((i) => `  - ${i}`),
    result.warnings.length ? "\nWarnings:" : "",
    ...result.warnings.map((w) => `  ! ${w}`),
    "",
    "Generated by Lead Conversion Funnel Calculator — https://productivetoolbox.com",
  ].filter(Boolean).join("\n");
}

export function buildCSVReport(result: FunnelResult): string {
  const rows: (string | number)[][] = [["Stage", "Value", "Conversion %", "Drop-Off %"]];
  result.stages.forEach((s) => rows.push([s.name, s.value, s.conversionFromPrev ?? "", s.dropOffFromPrev ?? ""]));
  return rows.map((r) => r.map((v) => (typeof v === "string" && v.includes(",") ? `"${v}"` : v)).join(",")).join("\n");
}

export function buildJSONReport(result: FunnelResult): string {
  return JSON.stringify(
    {
      stages: result.stages,
      overallConversionRate: result.overallConversionRate,
      efficiencyScore: result.efficiencyScore,
      healthLabel: result.healthLabel,
      insights: result.insights,
      warnings: result.warnings,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: FunnelResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Lead Conversion Funnel Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 680px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td, th { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; text-align: left; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    li { font-size: 14px; margin-bottom: 4px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Lead Conversion Funnel Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Overall Performance</h2>
    <table>
      <tr><td>Overall Conversion Rate</td><td><strong>${result.overallConversionRate}%</strong></td></tr>
      <tr><td>Funnel Efficiency Score</td><td>${result.efficiencyScore}/100</td></tr>
      <tr><td>Funnel Health</td><td>${result.healthLabel}</td></tr>
    </table>
    <h2>Stage Breakdown</h2>
    <table>
      <tr><th>Stage</th><th>Value</th><th>Conversion %</th><th>Drop-Off %</th></tr>
      ${result.stages.map((s) => `<tr><td>${s.name}</td><td>${formatNumber(s.value)}</td><td>${s.conversionFromPrev ?? "—"}</td><td>${s.dropOffFromPrev ?? "—"}</td></tr>`).join("")}
    </table>
    <h2>Insights</h2>
    <ul>${result.insights.map((i) => `<li>${i}</li>`).join("")}</ul>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs + presets ───────────────────────────────────────────────────

export const DEFAULT_INPUTS: FunnelInputs = {
  stages: [
    { id: "s1", name: "Visitors", value: 10000 },
    { id: "s2", name: "Leads", value: 1000 },
    { id: "s3", name: "Qualified Leads", value: 400 },
    { id: "s4", name: "Sales Calls", value: 150 },
    { id: "s5", name: "Customers", value: 100 },
  ],
  decimalPlaces: 2,
  strictValidation: true,
};

export const PRESETS: { label: string; inputs: FunnelInputs }[] = [
  {
    label: "Website → Sales",
    inputs: {
      stages: [
        { id: "p1a", name: "Website Visitors", value: 20000 },
        { id: "p1b", name: "Leads", value: 2000 },
        { id: "p1c", name: "Qualified Leads", value: 700 },
        { id: "p1d", name: "Sales Calls", value: 250 },
        { id: "p1e", name: "Customers", value: 60 },
      ],
      decimalPlaces: 2,
      strictValidation: true,
    },
  },
  {
    label: "SaaS Free Trial",
    inputs: {
      stages: [
        { id: "p2a", name: "Ad Clicks", value: 8500 },
        { id: "p2b", name: "Signups", value: 1150 },
        { id: "p2c", name: "Free Trials", value: 650 },
        { id: "p2d", name: "Paid Customers", value: 145 },
      ],
      decimalPlaces: 2,
      strictValidation: true,
    },
  },
  {
    label: "Agency Consultation",
    inputs: {
      stages: [
        { id: "p3a", name: "Landing Page Visitors", value: 50000 },
        { id: "p3b", name: "Newsletter Subscribers", value: 7800 },
        { id: "p3c", name: "Booked Calls", value: 620 },
        { id: "p3d", name: "Clients", value: 83 },
      ],
      decimalPlaces: 2,
      strictValidation: true,
    },
  },
];
