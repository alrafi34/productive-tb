// ── Data Growth Calculator Logic ──

export type StorageUnit = "MB" | "GB" | "TB" | "PB";
export type GrowthType = "fixed" | "percentage";
export type GrowthInterval = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
export type DurationUnit = "days" | "weeks" | "months" | "years";

export const UNIT_TO_MB: Record<StorageUnit, number> = {
  MB: 1,
  GB: 1024,
  TB: 1024 * 1024,
  PB: 1024 * 1024 * 1024,
};

export const UNIT_ORDER: StorageUnit[] = ["MB", "GB", "TB", "PB"];

export const GROWTH_INTERVAL_META: Record<GrowthInterval, { label: string; periodLabel: string; daysPerPeriod: number }> = {
  daily: { label: "Daily", periodLabel: "Day", daysPerPeriod: 1 },
  weekly: { label: "Weekly", periodLabel: "Week", daysPerPeriod: 7 },
  monthly: { label: "Monthly", periodLabel: "Month", daysPerPeriod: 30 },
  quarterly: { label: "Quarterly", periodLabel: "Quarter", daysPerPeriod: 90 },
  yearly: { label: "Yearly", periodLabel: "Year", daysPerPeriod: 365 },
};

export const GROWTH_INTERVAL_ORDER: GrowthInterval[] = ["daily", "weekly", "monthly", "quarterly", "yearly"];

export const DURATION_UNIT_META: Record<DurationUnit, { label: string; daysPerUnit: number }> = {
  days: { label: "Days", daysPerUnit: 1 },
  weeks: { label: "Weeks", daysPerUnit: 7 },
  months: { label: "Months", daysPerUnit: 30 },
  years: { label: "Years", daysPerUnit: 365 },
};

export const DURATION_UNIT_ORDER: DurationUnit[] = ["days", "weeks", "months", "years"];

// ── Presets ────────────────────────────────────────────────────────────────────

export interface Preset {
  label: string;
  icon: string;
  initialSize: number;
  storageUnit: StorageUnit;
  growthType: GrowthType;
  growthValue: number;
  growthInterval: GrowthInterval;
  projectionDuration: number;
  durationUnit: DurationUnit;
}

export const PRESETS: Preset[] = [
  { label: "Fixed Monthly Backup Growth", icon: "💾", initialSize: 100, storageUnit: "GB", growthType: "fixed", growthValue: 10, growthInterval: "monthly", projectionDuration: 24, durationUnit: "months" },
  { label: "Compounding Database Growth", icon: "🗄️", initialSize: 2, storageUnit: "TB", growthType: "percentage", growthValue: 15, growthInterval: "monthly", projectionDuration: 12, durationUnit: "months" },
  { label: "Daily Backup Accumulation", icon: "📦", initialSize: 500, storageUnit: "GB", growthType: "fixed", growthValue: 2, growthInterval: "daily", projectionDuration: 365, durationUnit: "days" },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface DataGrowthInputs {
  initialSize: number;
  storageUnit: StorageUnit;
  growthType: GrowthType;
  growthValue: number;
  growthInterval: GrowthInterval;
  projectionDuration: number;
  durationUnit: DurationUnit;
  decimalPrecision: number;
  costPerGB: number;
}

export interface TimelineRow {
  period: number;
  sizeMB: number;
}

export interface DataGrowthResult {
  initialMB: number;
  finalMB: number;
  totalGrowthMB: number;
  percentageIncrease: number;
  averageGrowthPerPeriodMB: number;
  periods: number;
  timeline: TimelineRow[];
  chartData: number[];
  estimatedCost: number | null;
  highGrowthWarning: string | null;
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DataGrowthInputs;
  result: DataGrowthResult;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function toMB(size: number, unit: StorageUnit): number {
  return size * UNIT_TO_MB[unit];
}

export function formatSize(sizeMB: number, precision: number): string {
  const abs = Math.abs(sizeMB);
  let unit: StorageUnit = "MB";
  let value = sizeMB;
  if (abs >= UNIT_TO_MB.PB) { unit = "PB"; value = sizeMB / UNIT_TO_MB.PB; }
  else if (abs >= UNIT_TO_MB.TB) { unit = "TB"; value = sizeMB / UNIT_TO_MB.TB; }
  else if (abs >= UNIT_TO_MB.GB) { unit = "GB"; value = sizeMB / UNIT_TO_MB.GB; }
  return `${value.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision })} ${unit}`;
}

export function durationToPeriods(duration: number, durationUnit: DurationUnit, growthInterval: GrowthInterval): number {
  const totalDays = duration * DURATION_UNIT_META[durationUnit].daysPerUnit;
  return totalDays / GROWTH_INTERVAL_META[growthInterval].daysPerPeriod;
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Validation ─────────────────────────────────────────────────────────────────

export function getWarning(inputs: DataGrowthInputs): string | null {
  if (inputs.initialSize <= 0) return "Initial data size must be greater than zero.";
  if (inputs.growthValue < 0) return "Growth value cannot be negative.";
  if (inputs.growthType === "percentage" && inputs.growthValue >= 100 && inputs.growthInterval !== "yearly") {
    return null;
  }
  if (inputs.projectionDuration <= 0) return "Projection duration must be greater than zero.";
  return null;
}

// ── Main calculation ────────────────────────────────────────────────────────────

export function calculateDataGrowth(inputs: DataGrowthInputs): DataGrowthResult {
  const warning = getWarning(inputs);
  const initialMB = toMB(Math.max(0, inputs.initialSize), inputs.storageUnit);
  const periods = Math.max(0, durationToPeriods(inputs.projectionDuration, inputs.durationUnit, inputs.growthInterval));

  const sizeAtPeriod = (p: number): number => {
    if (inputs.growthType === "fixed") {
      const growthMB = toMB(Math.max(0, inputs.growthValue), inputs.storageUnit);
      return initialMB + growthMB * p;
    }
    return initialMB * Math.pow(1 + Math.max(0, inputs.growthValue) / 100, p);
  };

  const finalMB = sizeAtPeriod(periods);
  const totalGrowthMB = finalMB - initialMB;
  const percentageIncrease = initialMB > 0 ? (totalGrowthMB / initialMB) * 100 : 0;
  const averageGrowthPerPeriodMB = periods > 0 ? totalGrowthMB / periods : 0;

  // Chart data — up to 60 sampled points across the projection
  const steps = Math.min(60, Math.max(1, Math.round(periods)) || 1);
  const chartData: number[] = [];
  for (let i = 0; i <= steps; i++) {
    chartData.push(sizeAtPeriod((periods * i) / steps));
  }

  // Timeline table — evenly spaced checkpoints
  const checkpointFractions = [0, 0.25, 0.5, 0.75, 1];
  const timeline: TimelineRow[] = Array.from(
    new Map(
      checkpointFractions.map((f) => {
        const p = Math.round(periods * f);
        return [p, { period: p, sizeMB: sizeAtPeriod(p) }];
      })
    ).values()
  ).sort((a, b) => a.period - b.period);

  // Cost estimate
  const estimatedCost = inputs.costPerGB > 0 ? (finalMB / UNIT_TO_MB.GB) * inputs.costPerGB : null;

  // High growth warning — check size 3 years out
  const threeYearPeriods = durationToPeriods(3, "years", inputs.growthInterval);
  const sizeIn3Years = sizeAtPeriod(threeYearPeriods);
  const highGrowthWarning = sizeIn3Years >= UNIT_TO_MB.TB * 100
    ? `This growth rate will exceed 100 TB within 3 years (projected: ${formatSize(sizeIn3Years, 1)}).`
    : null;

  const formula = inputs.growthType === "fixed"
    ? "Final Size = Initial Size + (Growth × Number of Periods)"
    : "Final Size = Initial Size × (1 + Growth Rate)^Periods";
  const breakdown = inputs.growthType === "fixed"
    ? `${formatSize(initialMB, 2)} + (${inputs.growthValue} ${inputs.storageUnit} × ${periods.toFixed(1)}) = ${formatSize(finalMB, inputs.decimalPrecision)}`
    : `${formatSize(initialMB, 2)} × (1 + ${inputs.growthValue}%)^${periods.toFixed(1)} = ${formatSize(finalMB, inputs.decimalPrecision)}`;

  return {
    initialMB, finalMB, totalGrowthMB, percentageIncrease, averageGrowthPerPeriodMB, periods,
    timeline, chartData, estimatedCost, highGrowthWarning, formula, breakdown, warning,
  };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: DataGrowthInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("initial", String(inputs.initialSize));
  url.searchParams.set("unit", inputs.storageUnit);
  url.searchParams.set("growthType", inputs.growthType);
  url.searchParams.set("growthValue", String(inputs.growthValue));
  url.searchParams.set("interval", inputs.growthInterval);
  url.searchParams.set("duration", String(inputs.projectionDuration));
  url.searchParams.set("durationUnit", inputs.durationUnit);
  return url.toString();
}

export function parseShareParams(): Partial<DataGrowthInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const initial = p.get("initial");
  if (!initial) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  const unit = p.get("unit");
  const growthType = p.get("growthType");
  const interval = p.get("interval");
  const durationUnit = p.get("durationUnit");
  return {
    initialSize: num("initial", 100),
    storageUnit: (UNIT_ORDER.includes(unit as StorageUnit) ? unit : "GB") as StorageUnit,
    growthType: (growthType === "percentage" ? "percentage" : "fixed") as GrowthType,
    growthValue: num("growthValue", 10),
    growthInterval: (GROWTH_INTERVAL_ORDER.includes(interval as GrowthInterval) ? interval : "monthly") as GrowthInterval,
    projectionDuration: num("duration", 12),
    durationUnit: (DURATION_UNIT_ORDER.includes(durationUnit as DurationUnit) ? durationUnit : "months") as DurationUnit,
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "data-growth-calculator-history";

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

export function buildTextReport(result: DataGrowthResult, inputs: DataGrowthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const p = inputs.decimalPrecision;
  const lines = [
    "Data Growth Report",
    "===================",
    `Generated: ${ts}`,
    "",
    `Initial Size: ${formatSize(result.initialMB, p)}`,
    `Final Size: ${formatSize(result.finalMB, p)}`,
    `Total Growth: ${formatSize(result.totalGrowthMB, p)}`,
    `Percentage Increase: ${result.percentageIncrease.toFixed(p)}%`,
    `Average Growth per Period: ${formatSize(result.averageGrowthPerPeriodMB, p)}`,
    `Projection Duration: ${inputs.projectionDuration} ${DURATION_UNIT_META[inputs.durationUnit].label} (${result.periods.toFixed(1)} ${GROWTH_INTERVAL_META[inputs.growthInterval].label} periods)`,
  ];
  if (result.estimatedCost !== null) lines.push(`Estimated Storage Cost: $${result.estimatedCost.toFixed(2)}`);
  lines.push("", `Formula: ${result.formula}`, `Calculation: ${result.breakdown}`);
  if (result.highGrowthWarning) lines.push("", `⚠ ${result.highGrowthWarning}`);
  lines.push("", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: DataGrowthResult, inputs: DataGrowthInputs): string {
  const p = inputs.decimalPrecision;
  const rows: (string | number)[][] = [
    ["Data Growth Calculator Report", new Date().toISOString()],
    [],
    ["Metric", "Value"],
    ["Initial Size", formatSize(result.initialMB, p)],
    ["Final Size", formatSize(result.finalMB, p)],
    ["Total Growth", formatSize(result.totalGrowthMB, p)],
    ["Percentage Increase (%)", result.percentageIncrease.toFixed(2)],
    ["Average Growth per Period", formatSize(result.averageGrowthPerPeriodMB, p)],
    ["Projection Duration", `${inputs.projectionDuration} ${DURATION_UNIT_META[inputs.durationUnit].label}`],
    [],
    ["Period", "Projected Size (MB)", "Projected Size"],
    ...result.timeline.map((row) => [row.period, row.sizeMB.toFixed(2), formatSize(row.sizeMB, p)]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: DataGrowthResult, inputs: DataGrowthInputs): string {
  return JSON.stringify(
    {
      inputs: {
        initialSize: inputs.initialSize,
        storageUnit: inputs.storageUnit,
        growthType: inputs.growthType,
        growthValue: inputs.growthValue,
        growthInterval: inputs.growthInterval,
        projectionDuration: inputs.projectionDuration,
        durationUnit: inputs.durationUnit,
      },
      results: {
        initialMB: parseFloat(result.initialMB.toFixed(2)),
        finalMB: parseFloat(result.finalMB.toFixed(2)),
        totalGrowthMB: parseFloat(result.totalGrowthMB.toFixed(2)),
        percentageIncrease: parseFloat(result.percentageIncrease.toFixed(2)),
        estimatedCost: result.estimatedCost,
        timeline: result.timeline.map((r) => ({ period: r.period, sizeMB: parseFloat(r.sizeMB.toFixed(2)) })),
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: DataGrowthResult, inputs: DataGrowthInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const p = inputs.decimalPrecision;
  const rows = result.timeline
    .map((row) => `<tr><td>Period ${row.period}</td><td>${formatSize(row.sizeMB, p)}</td></tr>`)
    .join("");
  const costRow = result.estimatedCost !== null ? `<tr><td>Estimated Storage Cost</td><td>$${result.estimatedCost.toFixed(2)}</td></tr>` : "";
  return `<!DOCTYPE html><html><head><title>Data Growth Report</title>
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
    <h1>Data Growth Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Summary</h2>
    <table>
      <tr><td>Initial Size</td><td>${formatSize(result.initialMB, p)}</td></tr>
      <tr><td>Final Size</td><td><strong>${formatSize(result.finalMB, p)}</strong></td></tr>
      <tr><td>Total Growth</td><td>${formatSize(result.totalGrowthMB, p)}</td></tr>
      <tr><td>Percentage Increase</td><td>${result.percentageIncrease.toFixed(p)}%</td></tr>
      ${costRow}
    </table>
    <h2>Growth Timeline</h2>
    <table>
      ${rows}
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

export const DEFAULT_INPUTS: DataGrowthInputs = {
  initialSize: 100,
  storageUnit: "GB",
  growthType: "fixed",
  growthValue: 10,
  growthInterval: "monthly",
  projectionDuration: 12,
  durationUnit: "months",
  decimalPrecision: 2,
  costPerGB: 0,
};
