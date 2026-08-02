// ── Query Optimization Calculator Logic ──

export type OptimizationType =
  | "Added Index" | "Composite Index" | "Query Rewrite" | "Partitioning" | "Caching"
  | "Materialized View" | "Execution Plan Improvement" | "JOIN Optimization" | "Normalization" | "Denormalization" | "Other";

export type DatabaseEngine = "MySQL" | "PostgreSQL" | "SQL Server" | "Oracle" | "SQLite" | "MariaDB" | "MongoDB" | "Redis" | "Other";

export const OPTIMIZATION_TYPES: OptimizationType[] = [
  "Added Index", "Composite Index", "Query Rewrite", "Partitioning", "Caching",
  "Materialized View", "Execution Plan Improvement", "JOIN Optimization", "Normalization", "Denormalization", "Other",
];

export const DATABASE_ENGINES: DatabaseEngine[] = ["MySQL", "PostgreSQL", "SQL Server", "Oracle", "SQLite", "MariaDB", "MongoDB", "Redis", "Other"];

export type Rating = "Poor" | "Fair" | "Good" | "Excellent" | "Outstanding";

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

export function classifyRating(improvementPct: number): Rating {
  if (improvementPct >= 90) return "Outstanding";
  if (improvementPct >= 70) return "Excellent";
  if (improvementPct >= 40) return "Good";
  if (improvementPct >= 10) return "Fair";
  return "Poor";
}

export interface QueryOptimizationResult {
  originalTimeMs: number;
  optimizedTimeMs: number;
  improvementPct: number;
  speedMultiplier: number;
  timeSavedMs: number;
  rowsBefore: number | null;
  rowsAfter: number | null;
  rowsReductionPct: number | null;
  dailyExecutions: number | null;
  dailyTimeSavedMs: number | null;
  monthlyTimeSavedMs: number | null;
  yearlyTimeSavedMs: number | null;
  rating: Rating;
  efficiencyScore: number;
  optimizationType: OptimizationType;
  databaseEngine: DatabaseEngine;
  regressed: boolean;
}

export interface QueryOptimizationError {
  error: string;
}

export function isQueryOptimizationError(r: QueryOptimizationResult | QueryOptimizationError | null): r is QueryOptimizationError {
  return r !== null && "error" in r;
}

export function calculateQueryOptimization(
  originalTimeMs: number, optimizedTimeMs: number,
  rowsBefore: number | null, rowsAfter: number | null,
  dailyExecutions: number | null,
  optimizationType: OptimizationType, databaseEngine: DatabaseEngine,
  decimals: number
): QueryOptimizationResult | QueryOptimizationError {
  if (!isFinite(originalTimeMs) || originalTimeMs <= 0) return { error: "Original execution time must be greater than zero." };
  if (!isFinite(optimizedTimeMs) || optimizedTimeMs <= 0) return { error: "Optimized execution time must be greater than zero." };
  if (originalTimeMs < 0 || optimizedTimeMs < 0) return { error: "Execution time values cannot be negative." };
  if (rowsBefore !== null && (rowsBefore < 0 || !isFinite(rowsBefore))) return { error: "Rows scanned cannot be negative." };
  if (rowsAfter !== null && (rowsAfter < 0 || !isFinite(rowsAfter))) return { error: "Rows scanned cannot be negative." };
  if (rowsAfter !== null && rowsBefore === null) return { error: "Enter rows scanned before optimization to calculate rows reduction." };
  if (dailyExecutions !== null && (dailyExecutions < 0 || !isFinite(dailyExecutions))) return { error: "Daily executions cannot be negative." };

  const improvementPct = ((originalTimeMs - optimizedTimeMs) / originalTimeMs) * 100;
  const speedMultiplier = originalTimeMs / optimizedTimeMs;
  const timeSavedMs = originalTimeMs - optimizedTimeMs;
  const regressed = optimizedTimeMs > originalTimeMs;

  let rowsReductionPct: number | null = null;
  if (rowsBefore !== null && rowsBefore > 0 && rowsAfter !== null) {
    rowsReductionPct = ((rowsBefore - rowsAfter) / rowsBefore) * 100;
  }

  let dailyTimeSavedMs: number | null = null;
  let monthlyTimeSavedMs: number | null = null;
  let yearlyTimeSavedMs: number | null = null;
  if (dailyExecutions !== null && dailyExecutions > 0) {
    dailyTimeSavedMs = timeSavedMs * dailyExecutions;
    monthlyTimeSavedMs = dailyTimeSavedMs * 30;
    yearlyTimeSavedMs = dailyTimeSavedMs * 365;
  }

  const rating = classifyRating(improvementPct);
  const efficiencyScore = rowsReductionPct !== null
    ? Math.max(0, Math.min(100, (improvementPct + rowsReductionPct) / 2))
    : Math.max(0, Math.min(100, improvementPct));

  return {
    originalTimeMs, optimizedTimeMs,
    improvementPct: round(improvementPct, decimals),
    speedMultiplier: round(speedMultiplier, decimals),
    timeSavedMs: round(timeSavedMs, decimals),
    rowsBefore, rowsAfter,
    rowsReductionPct: rowsReductionPct !== null ? round(rowsReductionPct, decimals) : null,
    dailyExecutions,
    dailyTimeSavedMs: dailyTimeSavedMs !== null ? round(dailyTimeSavedMs, decimals) : null,
    monthlyTimeSavedMs: monthlyTimeSavedMs !== null ? round(monthlyTimeSavedMs, decimals) : null,
    yearlyTimeSavedMs: yearlyTimeSavedMs !== null ? round(yearlyTimeSavedMs, decimals) : null,
    rating, efficiencyScore: round(efficiencyScore, decimals),
    optimizationType, databaseEngine, regressed,
  };
}

// ── Formatting ──

export function formatNum(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

export function formatMsDuration(ms: number): string {
  const abs = Math.abs(ms);
  if (abs < 1000) return `${formatNum(ms, 1)} ms`;
  const seconds = ms / 1000;
  if (Math.abs(seconds) < 60) return `${formatNum(seconds, 1)} seconds`;
  const minutes = seconds / 60;
  if (Math.abs(minutes) < 60) return `${formatNum(minutes, 1)} minutes`;
  const hours = minutes / 60;
  if (Math.abs(hours) < 24) return `${formatNum(hours, 1)} hours`;
  const days = hours / 24;
  return `${formatNum(days, 1)} days`;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Presets ──

export interface QueryPreset {
  name: string;
  originalTimeMs: number;
  optimizedTimeMs: number;
  rowsBefore: string;
  rowsAfter: string;
  dailyExecutions: string;
  optimizationType: OptimizationType;
}

export const SAMPLE_PRESETS: QueryPreset[] = [
  { name: "Typical Indexed Query", originalTimeMs: 2500, optimizedTimeMs: 450, rowsBefore: "2500000", rowsAfter: "75000", dailyExecutions: "80000", optimizationType: "Added Index" },
  { name: "Large Table Scan Fix", originalTimeMs: 8000, optimizedTimeMs: 1200, rowsBefore: "10000000", rowsAfter: "500000", dailyExecutions: "5000", optimizationType: "Composite Index" },
  { name: "JOIN Optimization", originalTimeMs: 1500, optimizedTimeMs: 600, rowsBefore: "800000", rowsAfter: "800000", dailyExecutions: "20000", optimizationType: "JOIN Optimization" },
  { name: "Caching Layer Added", originalTimeMs: 900, optimizedTimeMs: 15, rowsBefore: "", rowsAfter: "", dailyExecutions: "150000", optimizationType: "Caching" },
];

// ── LocalStorage: last-session input ──

const INPUT_KEY = "query-optimization-calculator-input";

export interface SavedInput {
  originalTime: string;
  optimizedTime: string;
  rowsBefore: string;
  rowsAfter: string;
  dailyExecutions: string;
  optimizationType: OptimizationType;
  databaseEngine: DatabaseEngine;
  decimals: number;
}

export function saveInput(data: SavedInput): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify(data)); } catch {}
}

export function loadInput(): SavedInput | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: SavedInput;
  improvementPct: number;
  rating: Rating;
}

const HISTORY_KEY = "query-optimization-calculator-history";

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

// ── Shareable URL ──

export function buildShareUrl(input: SavedInput): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  const p = url.searchParams;
  p.set("orig", input.originalTime);
  p.set("opt", input.optimizedTime);
  if (input.rowsBefore) p.set("rb", input.rowsBefore);
  if (input.rowsAfter) p.set("ra", input.rowsAfter);
  if (input.dailyExecutions) p.set("exec", input.dailyExecutions);
  p.set("type", input.optimizationType);
  p.set("engine", input.databaseEngine);
  return url.toString();
}

export function parseShareParams(): SavedInput | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const orig = p.get("orig");
  if (!orig) return null;
  return {
    originalTime: orig,
    optimizedTime: p.get("opt") ?? "500",
    rowsBefore: p.get("rb") ?? "",
    rowsAfter: p.get("ra") ?? "",
    dailyExecutions: p.get("exec") ?? "",
    optimizationType: (p.get("type") as OptimizationType) ?? "Added Index",
    databaseEngine: (p.get("engine") as DatabaseEngine) ?? "PostgreSQL",
    decimals: 2,
  };
}

// ── Export helpers ──

export function buildTextReport(result: QueryOptimizationResult): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Query Optimization Calculator Report",
    "=======================================",
    `Generated: ${ts}`,
    `Optimization Type: ${result.optimizationType}`,
    `Database Engine: ${result.databaseEngine}`,
    "",
    `Original Query: ${formatNum(result.originalTimeMs)} ms`,
    `Optimized Query: ${formatNum(result.optimizedTimeMs)} ms`,
    `Performance Improvement: ${formatNum(result.improvementPct)}%`,
    `Speed Increase: ${formatNum(result.speedMultiplier)}× Faster`,
    `Execution Time Saved: ${formatNum(result.timeSavedMs)} ms`,
  ];
  if (result.rowsReductionPct !== null) {
    lines.push("", `Rows Scanned Before: ${formatNum(result.rowsBefore ?? 0, 0)}`, `Rows Scanned After: ${formatNum(result.rowsAfter ?? 0, 0)}`, `Rows Reduced: ${formatNum(result.rowsReductionPct)}%`);
  }
  if (result.dailyTimeSavedMs !== null) {
    lines.push(
      "",
      `Daily Time Saved: ${formatMsDuration(result.dailyTimeSavedMs)}`,
      `Monthly Time Saved: ${formatMsDuration(result.monthlyTimeSavedMs ?? 0)}`,
      `Yearly Time Saved: ${formatMsDuration(result.yearlyTimeSavedMs ?? 0)}`
    );
  }
  lines.push(
    "",
    `Optimization Rating: ${result.rating}`,
    `Efficiency Score: ${formatNum(result.efficiencyScore)}%`,
    "",
    "Generated by Query Optimization Calculator — https://productivetoolbox.com"
  );
  return lines.join("\n");
}

export function buildCSVReport(result: QueryOptimizationResult): string {
  const rows = [
    "Metric,Value",
    `Optimization Type,${result.optimizationType}`,
    `Database Engine,${result.databaseEngine}`,
    `Original Time (ms),${result.originalTimeMs}`,
    `Optimized Time (ms),${result.optimizedTimeMs}`,
    `Performance Improvement (%),${result.improvementPct}`,
    `Speed Multiplier,${result.speedMultiplier}`,
    `Time Saved (ms),${result.timeSavedMs}`,
  ];
  if (result.rowsReductionPct !== null) {
    rows.push(`Rows Before,${result.rowsBefore}`, `Rows After,${result.rowsAfter}`, `Rows Reduction (%),${result.rowsReductionPct}`);
  }
  if (result.dailyTimeSavedMs !== null) {
    rows.push(`Daily Time Saved (ms),${result.dailyTimeSavedMs}`, `Monthly Time Saved (ms),${result.monthlyTimeSavedMs}`, `Yearly Time Saved (ms),${result.yearlyTimeSavedMs}`);
  }
  rows.push(`Optimization Rating,${result.rating}`, `Efficiency Score (%),${result.efficiencyScore}`);
  return rows.join("\n");
}

export function buildJSONReport(result: QueryOptimizationResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: QueryOptimizationResult): string {
  return `<!DOCTYPE html><html><head><title>Query Optimization Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Query Optimization Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Optimization Type: ${result.optimizationType} · Database Engine: ${result.databaseEngine}</p>
  <table>
    <tbody>
      <tr><td>Original Query</td><td>${formatNum(result.originalTimeMs)} ms</td></tr>
      <tr><td>Optimized Query</td><td>${formatNum(result.optimizedTimeMs)} ms</td></tr>
      <tr><td>Performance Improvement</td><td>${formatNum(result.improvementPct)}%</td></tr>
      <tr><td>Speed Increase</td><td>${formatNum(result.speedMultiplier)}× Faster</td></tr>
      <tr><td>Execution Time Saved</td><td>${formatNum(result.timeSavedMs)} ms</td></tr>
      ${result.rowsReductionPct !== null ? `<tr><td>Rows Reduced</td><td>${formatNum(result.rowsReductionPct)}%</td></tr>` : ""}
      ${result.dailyTimeSavedMs !== null ? `<tr><td>Daily Time Saved</td><td>${formatMsDuration(result.dailyTimeSavedMs)}</td></tr>` : ""}
      ${result.monthlyTimeSavedMs !== null ? `<tr><td>Monthly Time Saved</td><td>${formatMsDuration(result.monthlyTimeSavedMs)}</td></tr>` : ""}
      <tr><td>Optimization Rating</td><td>${result.rating}</td></tr>
    </tbody>
  </table>
  </body></html>`;
}
