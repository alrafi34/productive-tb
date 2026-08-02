// ── Variance Calculator Logic ──

export type CalculationMode = "population" | "sample" | "both";

export interface ParsedDataset {
  values: number[];
  invalidCount: number;
  invalidTokens: string[];
}

export function parseDataset(text: string): ParsedDataset {
  const normalized = text.replace(/[,\t]/g, " ").replace(/\r/g, " ");
  const tokens = normalized.split(/\s+/).map((t) => t.trim()).filter(Boolean);

  const values: number[] = [];
  const invalidTokens: string[] = [];

  for (const token of tokens) {
    const n = Number(token);
    if (Number.isFinite(n)) values.push(n);
    else invalidTokens.push(token);
  }

  return { values, invalidCount: invalidTokens.length, invalidTokens: invalidTokens.slice(0, 20) };
}

export interface SquaredDeviation {
  value: number;
  deviation: number;
  squaredDeviation: number;
}

export interface VarianceStats {
  count: number;
  sum: number;
  mean: number;
  min: number | null;
  max: number | null;
  range: number | null;
  sumSquaredDeviations: number;
  populationVariance: number | null;
  sampleVariance: number | null;
  populationStdDev: number | null;
  sampleStdDev: number | null;
  sortedValues: number[];
  deviations: SquaredDeviation[];
}

export function computeStats(values: number[]): VarianceStats {
  const count = values.length;
  if (count === 0) {
    return {
      count: 0, sum: 0, mean: 0, min: null, max: null, range: null,
      sumSquaredDeviations: 0, populationVariance: null, sampleVariance: null,
      populationStdDev: null, sampleStdDev: null, sortedValues: [], deviations: [],
    };
  }

  let sum = 0;
  let min = values[0];
  let max = values[0];
  for (const v of values) {
    sum += v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const mean = sum / count;

  const deviations: SquaredDeviation[] = values.map((v) => {
    const deviation = v - mean;
    return { value: v, deviation, squaredDeviation: deviation * deviation };
  });
  const sumSquaredDeviations = deviations.reduce((acc, d) => acc + d.squaredDeviation, 0);

  const populationVariance = sumSquaredDeviations / count;
  const sampleVariance = count > 1 ? sumSquaredDeviations / (count - 1) : null;
  const populationStdDev = Math.sqrt(populationVariance);
  const sampleStdDev = sampleVariance !== null ? Math.sqrt(sampleVariance) : null;

  return {
    count, sum, mean, min, max, range: max - min,
    sumSquaredDeviations, populationVariance, sampleVariance, populationStdDev, sampleStdDev,
    sortedValues: [...values].sort((a, b) => a - b),
    deviations,
  };
}

export interface VarianceResult {
  stats: VarianceStats;
  invalidCount: number;
  invalidTokens: string[];
  warning: string | null;
  isLargeDataset: boolean;
}

export function calculateVariance(text: string): VarianceResult {
  const parsed = parseDataset(text);
  const stats = computeStats(parsed.values);

  let warning: string | null = null;
  if (parsed.values.length === 0) warning = "No valid numbers found.";
  else if (parsed.values.length === 1) warning = "Sample variance requires at least two numbers.";
  else if (parsed.invalidCount > 0) warning = "Remove invalid values before calculating for an accurate result.";

  return {
    stats,
    invalidCount: parsed.invalidCount,
    invalidTokens: parsed.invalidTokens,
    warning,
    isLargeDataset: parsed.values.length >= 10000,
  };
}

// ── Sample data ────────────────────────────────────────────────────────────────

export const SAMPLE_DATASETS: { label: string; icon: string; data: string }[] = [
  { label: "Classroom Scores", icon: "🎓", data: "10, 12, 15, 18, 20" },
  { label: "Line-Separated Set", icon: "📋", data: "5\n8\n10\n15\n22\n30" },
  { label: "Test Scores", icon: "📝", data: "95,88,91,87,90,92,89" },
];

export function generateRandomDataset(count = 20): string {
  const values = Array.from({ length: count }, () => Math.floor(Math.random() * 1000));
  return values.join(", ");
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(text: string, precision: number, mode: CalculationMode): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("data", text);
  url.searchParams.set("precision", String(precision));
  url.searchParams.set("mode", mode);
  return url.toString();
}

export function parseShareParams(): { text: string; precision: number; mode: CalculationMode } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const data = p.get("data");
  if (!data) return null;
  const modeParam = p.get("mode");
  const mode: CalculationMode = modeParam === "population" || modeParam === "sample" || modeParam === "both" ? modeParam : "both";
  return { text: data, precision: parseInt(p.get("precision") ?? "4", 10) || 4, mode };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  text: string;
  stats: VarianceStats;
}

const STORAGE_KEY = "variance-calculator-history";

export function saveHistory(text: string, stats: VarianceStats): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), text, stats };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: VarianceResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { stats } = result;
  const lines = [
    "Variance Calculation Report",
    "============================",
    `Generated: ${ts}`,
    "",
    `Count: ${stats.count}`,
    `Sum: ${formatNum(stats.sum, precision)}`,
    `Mean: ${formatNum(stats.mean, precision)}`,
    `Minimum: ${formatNum(stats.min, precision)}`,
    `Maximum: ${formatNum(stats.max, precision)}`,
    `Range: ${formatNum(stats.range, precision)}`,
    "",
    `Population Variance: ${formatNum(stats.populationVariance, precision)}`,
    `Sample Variance: ${formatNum(stats.sampleVariance, precision)}`,
    `Population Standard Deviation: ${formatNum(stats.populationStdDev, precision)}`,
    `Sample Standard Deviation: ${formatNum(stats.sampleStdDev, precision)}`,
  ];
  if (result.invalidCount > 0) lines.push(`Invalid Values Ignored: ${result.invalidCount}`);
  lines.push(
    "",
    "Formulas:",
    "Mean = Σx / n",
    "Population Variance = Σ(x − μ)² / n",
    "Sample Variance = Σ(x − x̄)² / (n − 1)",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com"
  );
  return lines.join("\n");
}

export function buildCSVReport(result: VarianceResult, precision: number): string {
  const { stats } = result;
  const rows: (string | number)[][] = [
    ["Statistic", "Value"],
    ["Count", stats.count],
    ["Sum", formatNum(stats.sum, precision)],
    ["Mean", formatNum(stats.mean, precision)],
    ["Minimum", formatNum(stats.min, precision)],
    ["Maximum", formatNum(stats.max, precision)],
    ["Range", formatNum(stats.range, precision)],
    ["Population Variance", formatNum(stats.populationVariance, precision)],
    ["Sample Variance", formatNum(stats.sampleVariance, precision)],
    ["Population Standard Deviation", formatNum(stats.populationStdDev, precision)],
    ["Sample Standard Deviation", formatNum(stats.sampleStdDev, precision)],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: VarianceResult): string {
  const { stats } = result;
  return JSON.stringify(
    {
      results: {
        count: stats.count,
        sum: stats.sum,
        mean: stats.mean,
        min: stats.min,
        max: stats.max,
        range: stats.range,
        populationVariance: stats.populationVariance,
        sampleVariance: stats.sampleVariance,
        populationStdDev: stats.populationStdDev,
        sampleStdDev: stats.sampleStdDev,
        invalidCount: result.invalidCount,
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: VarianceResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { stats } = result;
  return `<!DOCTYPE html><html><head><title>Variance Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Variance Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Population Variance</td><td><strong>${formatNum(stats.populationVariance, precision)}</strong></td></tr>
      <tr><td>Sample Variance</td><td><strong>${formatNum(stats.sampleVariance, precision)}</strong></td></tr>
      <tr><td>Population Std Dev</td><td>${formatNum(stats.populationStdDev, precision)}</td></tr>
      <tr><td>Sample Std Dev</td><td>${formatNum(stats.sampleStdDev, precision)}</td></tr>
      <tr><td>Count</td><td>${stats.count}</td></tr>
      <tr><td>Sum</td><td>${formatNum(stats.sum, precision)}</td></tr>
      <tr><td>Mean</td><td>${formatNum(stats.mean, precision)}</td></tr>
      <tr><td>Minimum</td><td>${formatNum(stats.min, precision)}</td></tr>
      <tr><td>Maximum</td><td>${formatNum(stats.max, precision)}</td></tr>
      <tr><td>Range</td><td>${formatNum(stats.range, precision)}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

export const DEFAULT_TEXT = "10, 12, 15, 18, 20";
export const DEFAULT_PRECISION = 4;
