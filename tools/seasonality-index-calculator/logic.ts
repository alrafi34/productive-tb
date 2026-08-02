// ── Seasonality Index Calculator Logic ──

export type SeasonType = "Monthly" | "Quarterly" | "Weekly" | "Daily" | "Custom";
export const SEASON_TYPES: SeasonType[] = ["Monthly", "Quarterly", "Weekly", "Daily", "Custom"];

export type CalcMethod = "Simple Average" | "Ratio-to-Moving-Average" | "Deseasonalized" | "Custom Seasonal Average";
export const CALC_METHODS: CalcMethod[] = ["Simple Average", "Ratio-to-Moving-Average", "Deseasonalized", "Custom Seasonal Average"];

export interface DataRow {
  period: string;
  value: number;
}

const MONTH_ORDER = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTH_ABBR: Record<string, string> = { jan: "january", feb: "february", mar: "march", apr: "april", jun: "june", jul: "july", aug: "august", sep: "september", sept: "september", oct: "october", nov: "november", dec: "december" };
const QUARTER_ORDER = ["q1", "q2", "q3", "q4"];
const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_ABBR: Record<string, string> = { mon: "monday", tue: "tuesday", tues: "tuesday", wed: "wednesday", thu: "thursday", thur: "thursday", thurs: "thursday", fri: "friday", sat: "saturday", sun: "sunday" };

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

// Returns [normalizedKey, displayLabel, canonicalSortIndex|null]
function normalizeSeasonLabel(raw: string, seasonType: SeasonType): [string, string, number | null] {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();

  if (seasonType === "Monthly") {
    const canon = MONTH_ABBR[lower] ?? lower;
    const idx = MONTH_ORDER.indexOf(canon);
    if (idx >= 0) return [canon, titleCase(canon), idx];
  }
  if (seasonType === "Quarterly") {
    const idx = QUARTER_ORDER.indexOf(lower.replace(/\s+/g, ""));
    if (idx >= 0) return [lower.replace(/\s+/g, ""), lower.toUpperCase().replace(/\s+/g, ""), idx];
  }
  if (seasonType === "Daily") {
    const canon = DAY_ABBR[lower] ?? lower;
    const idx = DAY_ORDER.indexOf(canon);
    if (idx >= 0) return [canon, titleCase(canon), idx];
  }
  if (seasonType === "Weekly") {
    const m = lower.match(/(\d+)/);
    if (m) return [`week${m[1]}`, titleCase(trimmed), parseInt(m[1], 10)];
  }
  return [lower, trimmed, null];
}

export interface ParseResult {
  rows: DataRow[];
  warnings: string[];
}

export function parseDelimitedText(text: string): ParseResult {
  const warnings: string[] = [];
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const rows: DataRow[] = [];
  let missingCount = 0;
  let invalidCount = 0;

  lines.forEach((line, i) => {
    let parts: string[];
    if (line.includes(",")) parts = line.split(",");
    else if (line.includes("\t")) parts = line.split("\t");
    else parts = line.split(/\s{2,}/);

    if (parts.length < 2) { invalidCount++; return; }

    const period = parts[0].trim();
    const valueStr = parts.slice(1).join(" ").trim();

    // Skip an obvious header row on the first line
    if (i === 0) {
      const looksHeader = /^[a-z\s]+$/i.test(valueStr) && isNaN(parseFloat(valueStr));
      if (looksHeader) return;
    }

    if (!period) { missingCount++; return; }

    const cleanedValue = valueStr.replace(/[^0-9.\-]/g, "");
    const value = parseFloat(cleanedValue);
    if (!Number.isFinite(value)) { invalidCount++; return; }

    rows.push({ period, value });
  });

  if (missingCount > 0) warnings.push(`Skipped ${missingCount} row(s) with missing period labels.`);
  if (invalidCount > 0) warnings.push(`Skipped ${invalidCount} row(s) with invalid or missing values.`);

  return { rows, warnings };
}

export interface SeasonResult {
  key: string;
  label: string;
  sortKey: number;
  count: number;
  average: number;
  index: number;
  classification: "above" | "average" | "below";
}

export interface DeseasonalizedPoint {
  period: string;
  value: number;
  deseasonalizedValue: number;
}

export interface TrendInfo {
  direction: "increasing" | "decreasing" | "stable";
  percentChange: number;
}

export interface SeasonalityLevel {
  label: string;
  description: string;
}

export interface CalculationResult {
  seasons: SeasonResult[];
  overallAverage: number | null;
  highest: SeasonResult | null;
  lowest: SeasonResult | null;
  trend: TrendInfo | null;
  seasonalityLevel: SeasonalityLevel | null;
  insights: string[];
  deseasonalized: DeseasonalizedPoint[] | null;
  duplicateWarning: string | null;
  error: string | null;
}

function classify(index: number): "above" | "average" | "below" {
  if (index > 101) return "above";
  if (index < 99) return "below";
  return "average";
}

function detectDuplicates(rows: DataRow[]): string | null {
  const seen = new Map<string, number>();
  rows.forEach((r) => {
    const key = `${r.period.trim().toLowerCase()}::${r.value}`;
    seen.set(key, (seen.get(key) ?? 0) + 1);
  });
  const dupCount = [...seen.values()].filter((c) => c > 1).length;
  if (dupCount === 0) return null;
  return `${dupCount} duplicate row${dupCount === 1 ? "" : "s"} detected (identical period and value entered more than once).`;
}

function computeTrend(rows: DataRow[]): TrendInfo | null {
  const n = rows.length;
  if (n < 2) return null;
  const xs = rows.map((_, i) => i);
  const ys = rows.map((r) => r.value);
  const xMean = xs.reduce((a, b) => a + b, 0) / n;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) { num += (xs[i] - xMean) * (ys[i] - yMean); den += (xs[i] - xMean) ** 2; }
  const slope = den === 0 ? 0 : num / den;
  const first = ys[0];
  const last = ys[n - 1];
  const percentChange = first !== 0 ? ((last - first) / Math.abs(first)) * 100 : 0;
  const direction = Math.abs(slope) < 1e-9 ? "stable" : slope > 0 ? "increasing" : "decreasing";
  return { direction, percentChange };
}

function seasonalityLevelFromSpread(spread: number): SeasonalityLevel {
  if (spread < 15) return { label: "Low Seasonality", description: "Performance is fairly consistent across periods, with little seasonal variation." };
  if (spread < 40) return { label: "Moderate Seasonality", description: "A noticeable seasonal pattern exists — some periods consistently outperform others." };
  return { label: "Strong Seasonality", description: "A strong seasonal pattern is present. Consider planning inventory, staffing, or marketing around peak and low periods." };
}

// ── Centered moving average (generic window length L) ──
function centeredMovingAverage(values: number[], L: number): (number | null)[] {
  const n = values.length;
  const result: (number | null)[] = new Array(n).fill(null);
  if (L < 2 || n < L + 1) return result;

  if (L % 2 === 1) {
    const half = (L - 1) / 2;
    for (let t = half; t < n - half; t++) {
      let sum = 0;
      for (let k = t - half; k <= t + half; k++) sum += values[k];
      result[t] = sum / L;
    }
  } else {
    const half = L / 2;
    for (let t = half; t < n - half; t++) {
      let sum = 0.5 * values[t - half] + 0.5 * values[t + half];
      for (let k = t - half + 1; k <= t + half - 1; k++) sum += values[k];
      result[t] = sum / L;
    }
  }
  return result;
}

export function calculateSeasonality(
  rawRows: DataRow[],
  seasonType: SeasonType,
  method: CalcMethod
): CalculationResult {
  const empty: CalculationResult = {
    seasons: [], overallAverage: null, highest: null, lowest: null, trend: null,
    seasonalityLevel: null, insights: [], deseasonalized: null, duplicateWarning: null, error: null,
  };

  const rows = rawRows.filter((r) => r.period.trim().length > 0 && Number.isFinite(r.value));
  if (rows.length === 0) return { ...empty, error: "No valid data rows found. Add at least two periods with numeric values." };

  const duplicateWarning = detectDuplicates(rows);

  const overallAverage = rows.reduce((s, r) => s + r.value, 0) / rows.length;
  if (overallAverage === 0) return { ...empty, error: "Overall average cannot be zero — the seasonality index is undefined." };

  // Group rows by normalized season label, preserving chronological occurrence order per group
  const groups = new Map<string, { label: string; sortKey: number | null; firstSeen: number; values: number[] }>();
  rows.forEach((r, i) => {
    const [key, label, sortKey] = normalizeSeasonLabel(r.period, seasonType);
    if (!groups.has(key)) groups.set(key, { label, sortKey: sortKey, firstSeen: i, values: [] });
    groups.get(key)!.values.push(r.value);
  });

  if (groups.size < 2) {
    return { ...empty, error: "At least two distinct periods are required to calculate a seasonality index.", duplicateWarning };
  }

  let seasons: SeasonResult[] = [];
  let deseasonalized: DeseasonalizedPoint[] | null = null;

  if (method === "Simple Average" || method === "Deseasonalized") {
    seasons = [...groups.entries()].map(([key, g]) => {
      const average = g.values.reduce((a, b) => a + b, 0) / g.values.length;
      const index = (average / overallAverage) * 100;
      return { key, label: g.label, sortKey: g.sortKey ?? g.firstSeen, count: g.values.length, average, index, classification: classify(index) };
    });

    if (method === "Deseasonalized") {
      const indexByKey = new Map(seasons.map((s) => [s.key, s.index]));
      deseasonalized = rows.map((r) => {
        const [key] = normalizeSeasonLabel(r.period, seasonType);
        const idx = indexByKey.get(key) ?? 100;
        return { period: r.period, value: r.value, deseasonalizedValue: (r.value * 100) / idx };
      });
    }
  } else if (method === "Custom Seasonal Average") {
    seasons = [...groups.entries()].map(([key, g]) => {
      let weightedSum = 0, weightTotal = 0;
      g.values.forEach((v, i) => { const w = i + 1; weightedSum += v * w; weightTotal += w; });
      const average = weightedSum / weightTotal;
      const index = (average / overallAverage) * 100;
      return { key, label: g.label, sortKey: g.sortKey ?? g.firstSeen, count: g.values.length, average, index, classification: classify(index) };
    });
  } else {
    // Ratio-to-Moving-Average
    const L = groups.size;
    const values = rows.map((r) => r.value);
    const cma = centeredMovingAverage(values, L);
    const ratiosByKey = new Map<string, number[]>();
    rows.forEach((r, i) => {
      const c = cma[i];
      if (c === null || c === 0) return;
      const [key] = normalizeSeasonLabel(r.period, seasonType);
      if (!ratiosByKey.has(key)) ratiosByKey.set(key, []);
      ratiosByKey.get(key)!.push((r.value / c) * 100);
    });

    const hasEnoughData = [...groups.keys()].every((k) => (ratiosByKey.get(k)?.length ?? 0) > 0);

    if (!hasEnoughData) {
      // Fall back to Simple Average when there isn't enough data for a moving-average trend
      seasons = [...groups.entries()].map(([key, g]) => {
        const average = g.values.reduce((a, b) => a + b, 0) / g.values.length;
        const index = (average / overallAverage) * 100;
        return { key, label: g.label, sortKey: g.sortKey ?? g.firstSeen, count: g.values.length, average, index, classification: classify(index) };
      });
    } else {
      const rawIndices = [...groups.entries()].map(([key, g]) => {
        const ratios = ratiosByKey.get(key) ?? [];
        const rawIndex = ratios.length > 0 ? ratios.reduce((a, b) => a + b, 0) / ratios.length : 100;
        const average = g.values.reduce((a, b) => a + b, 0) / g.values.length;
        return { key, label: g.label, sortKey: g.sortKey ?? g.firstSeen, count: g.values.length, average, rawIndex };
      });
      const sumRaw = rawIndices.reduce((s, r) => s + r.rawIndex, 0);
      const factor = sumRaw !== 0 ? (rawIndices.length * 100) / sumRaw : 1;
      seasons = rawIndices.map((r) => {
        const index = r.rawIndex * factor;
        return { key: r.key, label: r.label, sortKey: r.sortKey, count: r.count, average: r.average, index, classification: classify(index) };
      });
    }
  }

  seasons.sort((a, b) => a.sortKey - b.sortKey);

  const highest = seasons.reduce((best, s) => (best === null || s.index > best.index ? s : best), null as SeasonResult | null);
  const lowest = seasons.reduce((worst, s) => (worst === null || s.index < worst.index ? s : worst), null as SeasonResult | null);
  const spread = highest && lowest ? highest.index - lowest.index : 0;
  const seasonalityLevel = seasonalityLevelFromSpread(spread);
  const trend = computeTrend(rows);

  const insights: string[] = [];
  if (highest) insights.push(`${highest.label} performs ${Math.abs(highest.index - 100).toFixed(1)}% ${highest.index >= 100 ? "above" : "below"} average.`);
  if (lowest && lowest.key !== highest?.key) insights.push(`${lowest.label} performs ${Math.abs(lowest.index - 100).toFixed(1)}% ${lowest.index >= 100 ? "above" : "below"} average.`);
  if (highest) insights.push(`The strongest seasonal period is ${highest.label}.`);
  if (lowest) insights.push(`The weakest seasonal period is ${lowest.label}.`);
  if (trend && trend.direction !== "stable") {
    insights.push(`The underlying data trend is ${trend.direction} (${trend.percentChange >= 0 ? "+" : ""}${trend.percentChange.toFixed(1)}% from first to last entry).`);
  }

  return {
    seasons, overallAverage, highest, lowest, trend, seasonalityLevel, insights,
    deseasonalized, duplicateWarning, error: null,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const PRECISION_OPTIONS = [0, 1, 2, 3, 4];
export const DEFAULT_PRECISION = 2;
export const DEFAULT_SEASON_TYPE: SeasonType = "Monthly";
export const DEFAULT_METHOD: CalcMethod = "Simple Average";

export const DEFAULT_ROWS: DataRow[] = [
  { period: "January", value: 100 },
  { period: "January", value: 120 },
  { period: "January", value: 110 },
  { period: "February", value: 80 },
  { period: "February", value: 85 },
  { period: "February", value: 90 },
];

export const SAMPLE_DATASETS: { label: string; seasonType: SeasonType; rows: DataRow[] }[] = [
  {
    label: "Monthly Sales (3 Years)",
    seasonType: "Monthly",
    rows: [
      ["January", 42000], ["February", 38500], ["March", 45200], ["April", 47800], ["May", 49500], ["June", 52300],
      ["July", 51200], ["August", 50800], ["September", 53600], ["October", 58900], ["November", 71200], ["December", 89500],
      ["January", 44500], ["February", 40200], ["March", 47100], ["April", 49900], ["May", 51700], ["June", 54800],
      ["July", 53400], ["August", 52900], ["September", 56100], ["October", 61800], ["November", 74600], ["December", 93800],
      ["January", 46800], ["February", 42100], ["March", 49300], ["April", 52200], ["May", 54000], ["June", 57200],
      ["July", 55900], ["August", 55300], ["September", 58700], ["October", 64500], ["November", 78100], ["December", 98200],
    ].map(([period, value]) => ({ period: period as string, value: value as number })),
  },
  {
    label: "Weekly Website Traffic",
    seasonType: "Weekly",
    rows: [
      ["Week 1", 18500], ["Week 2", 16200], ["Week 3", 15100], ["Week 4", 21800],
      ["Week 1", 19200], ["Week 2", 16800], ["Week 3", 15600], ["Week 4", 22600],
      ["Week 1", 19800], ["Week 2", 17100], ["Week 3", 16000], ["Week 4", 23400],
    ].map(([period, value]) => ({ period: period as string, value: value as number })),
  },
  {
    label: "Quarterly Revenue",
    seasonType: "Quarterly",
    rows: [
      ["Q1", 285000], ["Q2", 312000], ["Q3", 298000], ["Q4", 421000],
      ["Q1", 301000], ["Q2", 329000], ["Q3", 315000], ["Q4", 448000],
      ["Q1", 318000], ["Q2", 347000], ["Q3", 332000], ["Q4", 472000],
    ].map(([period, value]) => ({ period: period as string, value: value as number })),
  },
];

// ── LocalStorage session recovery ────────────────────────────────────────

const SESSION_KEY = "seasonality-index-calculator-session";

export interface SessionState {
  rows: DataRow[];
  seasonType: SeasonType;
  method: CalcMethod;
  precision: number;
}

export function saveSession(state: SessionState): void {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(state)); } catch {}
}

export function loadSession(): SessionState | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.rows)) return null;
    return parsed;
  } catch { return null; }
}

export function clearSession(): void {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildCSVReport(result: CalculationResult, precision: number): string {
  const rows: (string | number)[][] = [["Period", "Average", "Seasonality Index", "Classification"]];
  result.seasons.forEach((s) => {
    rows.push([s.label, formatNum(s.average, precision), formatNum(s.index, precision), s.classification]);
  });
  rows.push([]);
  rows.push(["Overall Average", formatNum(result.overallAverage, precision)]);
  if (result.highest) rows.push(["Highest Season", `${result.highest.label} (${formatNum(result.highest.index, precision)})`]);
  if (result.lowest) rows.push(["Lowest Season", `${result.lowest.label} (${formatNum(result.lowest.index, precision)})`]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: CalculationResult): string {
  return JSON.stringify(
    {
      seasons: result.seasons.map((s) => ({ period: s.label, average: s.average, index: s.index, classification: s.classification, count: s.count })),
      overallAverage: result.overallAverage,
      highest: result.highest ? { period: result.highest.label, index: result.highest.index } : null,
      lowest: result.lowest ? { period: result.lowest.label, index: result.lowest.index } : null,
      trend: result.trend,
      seasonalityLevel: result.seasonalityLevel,
      insights: result.insights,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildTextReport(result: CalculationResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Seasonality Index Report",
    "=========================",
    `Generated: ${ts}`,
    "",
    `Overall Average: ${formatNum(result.overallAverage, precision)}`,
    ...(result.highest ? [`Highest Season: ${result.highest.label} (Index ${formatNum(result.highest.index, precision)})`] : []),
    ...(result.lowest ? [`Lowest Season: ${result.lowest.label} (Index ${formatNum(result.lowest.index, precision)})`] : []),
    ...(result.seasonalityLevel ? [`Seasonality Level: ${result.seasonalityLevel.label}`] : []),
    "",
    "Period Breakdown:",
    ...result.seasons.map((s) => `  ${s.label}: Average ${formatNum(s.average, precision)}, Index ${formatNum(s.index, precision)} (${s.classification})`),
    "",
    "Insights:",
    ...result.insights.map((i) => `  • ${i}`),
    "",
    "Formula: Seasonality Index = (Season Average ÷ Overall Average) × 100",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildPrintHTML(result: CalculationResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const rowsHtml = result.seasons
    .map((s) => `<tr><td>${s.label}</td><td>${formatNum(s.average, precision)}</td><td>${formatNum(s.index, precision)}</td><td>${s.classification}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><head><title>Seasonality Index Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 720px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 8px 6px; border-bottom: 1px solid #e5e7eb; font-size: 13px; text-align: left; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Seasonality Index Report</h1>
    <p class="meta">Generated ${ts}</p>
    <p>Overall Average: <strong>${formatNum(result.overallAverage, precision)}</strong></p>
    <table>
      <thead><tr><th>Period</th><th>Average</th><th>Index</th><th>Classification</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
