// ── Mean Calculator Logic ──

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

export interface MeanStats {
  count: number;
  sum: number;
  mean: number;
  min: number | null;
  max: number | null;
  range: number | null;
}

export function computeStats(values: number[]): MeanStats {
  const count = values.length;
  if (count === 0) {
    return { count: 0, sum: 0, mean: 0, min: null, max: null, range: null };
  }
  let sum = 0;
  let min = values[0];
  let max = values[0];
  for (const v of values) {
    sum += v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { count, sum, mean: sum / count, min, max, range: max - min };
}

export interface MeanResult {
  stats: MeanStats;
  invalidCount: number;
  invalidTokens: string[];
  warning: string | null;
  isLargeDataset: boolean;
}

export function calculateMean(text: string): MeanResult {
  const parsed = parseDataset(text);
  const stats = computeStats(parsed.values);

  let warning: string | null = null;
  if (parsed.values.length === 0) warning = "No numbers were detected.";
  else if (parsed.invalidCount > 0) warning = "Some values are invalid and were ignored.";

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
  { label: "Simple Set", icon: "🔢", data: "10, 20, 30, 40, 50" },
  { label: "Decimal Set", icon: "🔣", data: "2.5, 3.75, 4.5, 5.25" },
  { label: "Line-Separated Set", icon: "📋", data: "4\n8\n12\n16" },
];

export function generateRandomDataset(count = 20): string {
  const values = Array.from({ length: count }, () => Math.floor(Math.random() * 1000));
  return values.join(", ");
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number, precision: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(text: string, precision: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("data", text);
  url.searchParams.set("precision", String(precision));
  return url.toString();
}

export function parseShareParams(): { text: string; precision: number } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const data = p.get("data");
  if (!data) return null;
  return { text: data, precision: parseInt(p.get("precision") ?? "2", 10) || 2 };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  text: string;
  stats: MeanStats;
}

const STORAGE_KEY = "mean-calculator-history";

export function saveHistory(text: string, stats: MeanStats): void {
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

export function buildTextReport(result: MeanResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { stats } = result;
  const lines = [
    "Mean Calculation Report",
    "========================",
    `Generated: ${ts}`,
    "",
    `Count: ${stats.count}`,
    `Sum: ${formatNum(stats.sum, precision)}`,
    `Mean: ${formatNum(stats.mean, precision)}`,
    `Minimum: ${stats.min !== null ? formatNum(stats.min, precision) : "—"}`,
    `Maximum: ${stats.max !== null ? formatNum(stats.max, precision) : "—"}`,
    `Range: ${stats.range !== null ? formatNum(stats.range, precision) : "—"}`,
  ];
  if (result.invalidCount > 0) lines.push(`Invalid Values Ignored: ${result.invalidCount}`);
  lines.push("", "Formula: Mean = (Sum of All Numbers) ÷ (Total Count)", "", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: MeanResult, precision: number): string {
  const { stats } = result;
  const rows: (string | number)[][] = [
    ["Statistic", "Value"],
    ["Mean", formatNum(stats.mean, precision)],
    ["Count", stats.count],
    ["Sum", formatNum(stats.sum, precision)],
    ["Minimum", stats.min !== null ? formatNum(stats.min, precision) : ""],
    ["Maximum", stats.max !== null ? formatNum(stats.max, precision) : ""],
    ["Range", stats.range !== null ? formatNum(stats.range, precision) : ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: MeanResult): string {
  return JSON.stringify(
    {
      results: {
        mean: result.stats.mean,
        count: result.stats.count,
        sum: result.stats.sum,
        min: result.stats.min,
        max: result.stats.max,
        range: result.stats.range,
        invalidCount: result.invalidCount,
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: MeanResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { stats } = result;
  return `<!DOCTYPE html><html><head><title>Mean Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Mean Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Mean</td><td><strong>${formatNum(stats.mean, precision)}</strong></td></tr>
      <tr><td>Count</td><td>${stats.count}</td></tr>
      <tr><td>Sum</td><td>${formatNum(stats.sum, precision)}</td></tr>
      <tr><td>Minimum</td><td>${stats.min !== null ? formatNum(stats.min, precision) : "—"}</td></tr>
      <tr><td>Maximum</td><td>${stats.max !== null ? formatNum(stats.max, precision) : "—"}</td></tr>
      <tr><td>Range</td><td>${stats.range !== null ? formatNum(stats.range, precision) : "—"}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

export const DEFAULT_TEXT = "10, 20, 30, 40, 50";
export const DEFAULT_PRECISION = 2;
