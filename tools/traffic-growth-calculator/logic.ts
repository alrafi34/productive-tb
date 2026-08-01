// ── Traffic Growth Calculator Logic ──

export type GrowthModel = "compound" | "linear";

export const DURATION_OPTIONS = [1, 3, 6, 12, 18, 24, 36, 60] as const;
export type Duration = (typeof DURATION_OPTIONS)[number];

export interface PresetDef { label: string; traffic: number }

export const PRESETS: PresetDef[] = [
  { label: "Small Blog",        traffic: 1000    },
  { label: "Growing Website",   traffic: 10000   },
  { label: "Business Website",  traffic: 50000   },
  { label: "Large Website",     traffic: 500000  },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface GrowthInputs {
  currentTraffic: number;
  growthRate: number;
  duration: number;
  model: GrowthModel;
  compareEnabled: boolean;
  growthRateB: number;
}

export interface ProjectionRow {
  month: number;
  start: number;
  growth: number;
  end: number;
}

export interface GrowthResult {
  futureTraffic: number;
  additionalVisitors: number;
  growthPercent: number;
  growthMultiplier: number;
  averageMonthlyIncrease: number;
  totalVisitorsDuringForecast: number;
  projection: ProjectionRow[];
  doublingTimeMonths: number | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: GrowthInputs;
  result: GrowthResult;
}

// ── Growth math ────────────────────────────────────────────────────────────────

function trafficAtMonth(current: number, ratePct: number, month: number, model: GrowthModel): number {
  const r = ratePct / 100;
  if (model === "compound") return current * Math.pow(1 + r, month);
  return current + current * r * month;
}

export function buildProjection(current: number, ratePct: number, duration: number, model: GrowthModel): ProjectionRow[] {
  const rows: ProjectionRow[] = [];
  let prevEnd = current;
  for (let m = 1; m <= duration; m++) {
    const end = trafficAtMonth(current, ratePct, m, model);
    rows.push({ month: m, start: prevEnd, growth: end - prevEnd, end });
    prevEnd = end;
  }
  return rows;
}

export function doublingTime(ratePct: number, model: GrowthModel): number | null {
  if (ratePct <= 0) return null;
  const r = ratePct / 100;
  if (model === "compound") return Math.log(2) / Math.log(1 + r);
  return 1 / r; // linear: months to add 100% of current = 1 / r
}

export function calculateGrowth(inputs: GrowthInputs): GrowthResult {
  const { currentTraffic, growthRate, duration, model } = inputs;
  const projection = buildProjection(currentTraffic, growthRate, duration, model);
  const futureTraffic = projection.length ? projection[projection.length - 1].end : currentTraffic;
  const additionalVisitors = futureTraffic - currentTraffic;
  const growthPercent = currentTraffic > 0 ? (additionalVisitors / currentTraffic) * 100 : 0;
  const growthMultiplier = currentTraffic > 0 ? futureTraffic / currentTraffic : 0;
  const averageMonthlyIncrease = duration > 0 ? additionalVisitors / duration : 0;
  const totalVisitorsDuringForecast = projection.reduce((sum, r) => sum + r.end, 0);

  return {
    futureTraffic,
    additionalVisitors,
    growthPercent,
    growthMultiplier,
    averageMonthlyIncrease,
    totalVisitorsDuringForecast,
    projection,
    doublingTimeMonths: doublingTime(growthRate, model),
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: GrowthInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (!isFinite(inputs.currentTraffic) || inputs.currentTraffic <= 0) {
    e.currentTraffic = "Please enter a valid traffic value.";
  }
  if (!isFinite(inputs.growthRate) || inputs.growthRate < 0 || inputs.growthRate > 1000) {
    e.growthRate = "Growth rate must be between 0% and 1000%.";
  }
  if (inputs.compareEnabled && (!isFinite(inputs.growthRateB) || inputs.growthRateB < 0 || inputs.growthRateB > 1000)) {
    e.growthRateB = "Growth rate must be between 0% and 1000%.";
  }
  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatPercent(n: number, decimals = 2): string {
  return `${n.toFixed(decimals)}%`;
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: GrowthInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("traffic", String(inputs.currentTraffic));
  url.searchParams.set("rate", String(inputs.growthRate));
  url.searchParams.set("months", String(inputs.duration));
  url.searchParams.set("model", inputs.model);
  if (inputs.compareEnabled) url.searchParams.set("rateB", String(inputs.growthRateB));
  return url.toString();
}

export function parseShareParams(): Partial<GrowthInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const traffic = p.get("traffic");
  if (!traffic) return null;
  const rateB = p.get("rateB");
  return {
    currentTraffic: parseFloat(traffic) || 0,
    growthRate: parseFloat(p.get("rate") ?? "5") || 0,
    duration: parseInt(p.get("months") ?? "12", 10) || 12,
    model: (p.get("model") === "linear" ? "linear" : "compound") as GrowthModel,
    compareEnabled: !!rateB,
    growthRateB: rateB ? parseFloat(rateB) || 0 : 12,
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "traffic-growth-calculator-history";

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
  return [
    "Traffic Growth Calculator Report",
    "=================================",
    `Generated: ${ts}`,
    `Growth Model: ${inputs.model === "compound" ? "Compound Growth" : "Linear Growth"}`,
    `Current Monthly Traffic: ${formatFull(inputs.currentTraffic)}`,
    `Monthly Growth Rate: ${inputs.growthRate}%`,
    `Forecast Duration: ${inputs.duration} months`,
    "",
    "RESULTS",
    `Projected Monthly Traffic: ${formatFull(result.futureTraffic)}`,
    `Additional Visitors: ${formatFull(result.additionalVisitors)}`,
    `Growth: ${formatPercent(result.growthPercent)}`,
    `Growth Multiplier: ${result.growthMultiplier.toFixed(2)}×`,
    `Average Monthly Increase: ${formatFull(result.averageMonthlyIncrease)}`,
    `Total Visitors During Forecast: ${formatFull(result.totalVisitorsDuringForecast)}`,
    result.doublingTimeMonths !== null ? `Estimated Doubling Time: ${result.doublingTimeMonths.toFixed(1)} months` : "",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].filter(Boolean).join("\n");
}

export function buildCSVReport(result: GrowthResult, inputs: GrowthInputs): string {
  const rows: (string | number)[][] = [
    ["Traffic Growth Calculator Report", new Date().toISOString()],
    [],
    ["Growth Model", inputs.model],
    ["Current Monthly Traffic", inputs.currentTraffic],
    ["Monthly Growth Rate %", inputs.growthRate],
    ["Forecast Duration (months)", inputs.duration],
    [],
    ["Month", "Starting Traffic", "Growth", "Ending Traffic"],
    ...result.projection.map((r) => [r.month, Math.round(r.start), Math.round(r.growth), Math.round(r.end)]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: GrowthResult, inputs: GrowthInputs): string {
  return JSON.stringify(
    {
      inputs: {
        currentTraffic: inputs.currentTraffic,
        growthRate: inputs.growthRate,
        duration: inputs.duration,
        model: inputs.model,
      },
      results: {
        futureTraffic: Math.round(result.futureTraffic),
        additionalVisitors: Math.round(result.additionalVisitors),
        growthPercent: parseFloat(result.growthPercent.toFixed(2)),
        growthMultiplier: parseFloat(result.growthMultiplier.toFixed(4)),
        averageMonthlyIncrease: Math.round(result.averageMonthlyIncrease),
        totalVisitorsDuringForecast: Math.round(result.totalVisitorsDuringForecast),
        doublingTimeMonths: result.doublingTimeMonths !== null ? parseFloat(result.doublingTimeMonths.toFixed(2)) : null,
      },
      monthlyProjection: result.projection.map((r) => ({
        month: r.month,
        start: Math.round(r.start),
        growth: Math.round(r.growth),
        end: Math.round(r.end),
      })),
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: GrowthResult, inputs: GrowthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const rows = result.projection
    .map((r) => `<tr><td>${r.month}</td><td>${formatFull(r.start)}</td><td>${formatFull(r.growth)}</td><td>${formatFull(r.end)}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><head><title>Traffic Growth Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 720px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td, th { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: left; }
    th { color: #6b7280; text-transform: uppercase; font-size: 11px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Traffic Growth Calculator Report</h1>
    <p class="meta">Generated ${ts} — ${inputs.model === "compound" ? "Compound" : "Linear"} Growth, ${inputs.growthRate}% / month, ${inputs.duration} months</p>
    <h2>Summary</h2>
    <table>
      <tr><td>Current Monthly Traffic</td><td>${formatFull(inputs.currentTraffic)}</td></tr>
      <tr><td>Projected Monthly Traffic</td><td><strong>${formatFull(result.futureTraffic)}</strong></td></tr>
      <tr><td>Additional Visitors</td><td>${formatFull(result.additionalVisitors)}</td></tr>
      <tr><td>Growth</td><td>${formatPercent(result.growthPercent)}</td></tr>
      <tr><td>Total Visitors During Forecast</td><td>${formatFull(result.totalVisitorsDuringForecast)}</td></tr>
    </table>
    <h2>Monthly Projection</h2>
    <table>
      <thead><tr><th>Month</th><th>Starting Traffic</th><th>Growth</th><th>Ending Traffic</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: GrowthInputs = {
  currentTraffic: 10000,
  growthRate: 5,
  duration: 12,
  model: "compound",
  compareEnabled: false,
  growthRateB: 12,
};
