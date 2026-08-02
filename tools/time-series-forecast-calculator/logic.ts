// ── Time Series Forecast Calculator Logic ──

export type ForecastMethod =
  | "naive"
  | "drift"
  | "sma"
  | "wma"
  | "ses"
  | "linear"
  | "poly2"
  | "seasonal-naive";

export interface MethodMeta {
  id: ForecastMethod;
  label: string;
  shortLabel: string;
  usesWindow?: boolean;
  usesAlpha?: boolean;
  usesSeasonalPeriod?: boolean;
}

export const METHODS: MethodMeta[] = [
  { id: "naive", label: "Naive Forecast", shortLabel: "Naive" },
  { id: "drift", label: "Drift Method", shortLabel: "Drift" },
  { id: "sma", label: "Moving Average", shortLabel: "Moving Avg", usesWindow: true },
  { id: "wma", label: "Weighted Moving Average", shortLabel: "Weighted MA", usesWindow: true },
  { id: "ses", label: "Simple Exponential Smoothing", shortLabel: "Exp. Smoothing", usesAlpha: true },
  { id: "linear", label: "Linear Trend Regression", shortLabel: "Linear Trend" },
  { id: "poly2", label: "Polynomial Trend", shortLabel: "Polynomial" },
  { id: "seasonal-naive", label: "Seasonal Naive", shortLabel: "Seasonal Naive", usesSeasonalPeriod: true },
];

export function methodMeta(m: ForecastMethod): MethodMeta {
  return METHODS.find((x) => x.id === m) as MethodMeta;
}

// ── Parsing ──

export interface ParsedSeries {
  labels: string[];
  values: number[];
  invalidLines: string[];
}

export function parseDataset(input: string): ParsedSeries {
  const rawLines = input.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  if (rawLines.length <= 1) {
    const tokens = input.split(/[\s,;\t]+/).map((t) => t.trim()).filter(Boolean);
    const values: number[] = [];
    const labels: string[] = [];
    const invalidLines: string[] = [];
    for (const tok of tokens) {
      const n = Number(tok);
      if (tok !== "" && !isNaN(n) && isFinite(n)) {
        values.push(n);
        labels.push(String(values.length));
      } else {
        invalidLines.push(tok);
      }
    }
    return { labels, values, invalidLines };
  }

  const values: number[] = [];
  const labels: string[] = [];
  const invalidLines: string[] = [];
  for (const line of rawLines) {
    const parts = line.split(/[,\t]+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length === 1) {
      const n = Number(parts[0]);
      if (!isNaN(n) && isFinite(n)) {
        values.push(n);
        labels.push(String(values.length));
      } else {
        invalidLines.push(line);
      }
    } else {
      const last = parts[parts.length - 1];
      const n = Number(last);
      if (!isNaN(n) && isFinite(n)) {
        values.push(n);
        labels.push(parts.slice(0, -1).join(" "));
      } else {
        invalidLines.push(line);
      }
    }
  }
  return { labels, values, invalidLines };
}

// ── Result shapes ──

export interface FitPoint {
  index: number;
  actual: number;
  fitted: number | null;
  residual: number | null;
}

export interface ForecastPoint {
  period: number;
  value: number;
}

export interface ForecastResult {
  method: ForecastMethod;
  points: FitPoint[];
  forecast: ForecastPoint[];
  mae: number;
  rmse: number;
  mape: number;
  average: number;
  min: number;
  max: number;
  growthRate: number;
  trendLine: { slope: number; intercept: number } | null;
}

export interface ForecastParams {
  method: ForecastMethod;
  window: number;
  alpha: number;
  seasonalPeriod: number;
  horizon: number;
  decimals: number;
}

export function isForecastError(r: ForecastResult | { error: string } | null): r is { error: string } {
  return r !== null && "error" in r;
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

function errorStats(points: FitPoint[], decimals: number): { mae: number; rmse: number; mape: number } {
  const withResidual = points.filter((p) => p.residual !== null);
  if (withResidual.length === 0) return { mae: 0, rmse: 0, mape: 0 };
  const n = withResidual.length;
  const mae = withResidual.reduce((a, p) => a + Math.abs(p.residual as number), 0) / n;
  const rmse = Math.sqrt(withResidual.reduce((a, p) => a + (p.residual as number) ** 2, 0) / n);
  const mapeItems = withResidual.filter((p) => p.actual !== 0);
  const mape = mapeItems.length
    ? (mapeItems.reduce((a, p) => a + Math.abs((p.residual as number) / p.actual), 0) / mapeItems.length) * 100
    : 0;
  return { mae: round(mae, decimals), rmse: round(rmse, decimals), mape: round(mape, decimals) };
}

function buildResult(
  method: ForecastMethod,
  points: FitPoint[],
  forecast: ForecastPoint[],
  values: number[],
  decimals: number,
  trendLine: { slope: number; intercept: number } | null = null
): ForecastResult {
  const { mae, rmse, mape } = errorStats(points, decimals);
  const average = round(mean(values), decimals);
  const min = round(Math.min(...values), decimals);
  const max = round(Math.max(...values), decimals);
  const first = values[0];
  const last = values[values.length - 1];
  const growthRate = first !== 0 ? round(((last - first) / Math.abs(first)) * 100, decimals) : 0;
  return { method, points, forecast, mae, rmse, mape, average, min, max, growthRate, trendLine };
}

// ── Naive Forecast ──

function computeNaive(values: number[], p: ForecastParams): ForecastResult {
  const n = values.length;
  const points: FitPoint[] = values.map((v, i) => {
    if (i === 0) return { index: 0, actual: v, fitted: null, residual: null };
    const fitted = round(values[i - 1], p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  const last = values[n - 1];
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) forecast.push({ period: n + h, value: round(last, p.decimals) });
  return buildResult("naive", points, forecast, values, p.decimals);
}

// ── Drift Method ──

function computeDrift(values: number[], p: ForecastParams): ForecastResult {
  const n = values.length;
  const points: FitPoint[] = values.map((v, i) => {
    if (i < 1) return { index: i, actual: v, fitted: null, residual: null };
    const fitted = round(i === 1 ? values[0] : values[i - 1] + (values[i - 1] - values[0]) / (i - 1), p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  const slope = n > 1 ? (values[n - 1] - values[0]) / (n - 1) : 0;
  const last = values[n - 1];
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) forecast.push({ period: n + h, value: round(last + h * slope, p.decimals) });
  return buildResult("drift", points, forecast, values, p.decimals, { slope: round(slope, 6), intercept: round(values[0], 6) });
}

// ── Moving Average ──

function computeSMA(values: number[], p: ForecastParams): ForecastResult | { error: string } {
  const n = values.length;
  const window = Math.max(1, p.window);
  if (n < window) return { error: `At least ${window} observations are required for a window of ${window}.` };
  const points: FitPoint[] = values.map((v, i) => {
    if (i < window) return { index: i, actual: v, fitted: null, residual: null };
    let sum = 0;
    for (let k = 1; k <= window; k++) sum += values[i - k];
    const fitted = round(sum / window, p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  let sum = 0;
  for (let k = 0; k < window; k++) sum += values[n - 1 - k];
  const lastAvg = round(sum / window, p.decimals);
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) forecast.push({ period: n + h, value: lastAvg });
  return buildResult("sma", points, forecast, values, p.decimals);
}

// ── Weighted Moving Average ──

function computeWMA(values: number[], p: ForecastParams): ForecastResult | { error: string } {
  const n = values.length;
  const window = Math.max(1, p.window);
  if (n < window) return { error: `At least ${window} observations are required for a window of ${window}.` };
  const weightSum = (window * (window + 1)) / 2;
  const points: FitPoint[] = values.map((v, i) => {
    if (i < window) return { index: i, actual: v, fitted: null, residual: null };
    let weighted = 0;
    for (let w = 0; w < window; w++) weighted += values[i - window + w] * (w + 1);
    const fitted = round(weighted / weightSum, p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  let weighted = 0;
  for (let w = 0; w < window; w++) weighted += values[n - window + w] * (w + 1);
  const lastWeighted = round(weighted / weightSum, p.decimals);
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) forecast.push({ period: n + h, value: lastWeighted });
  return buildResult("wma", points, forecast, values, p.decimals);
}

// ── Simple Exponential Smoothing ──

function computeSES(values: number[], p: ForecastParams): ForecastResult {
  const n = values.length;
  let prevS = values[0];
  const points: FitPoint[] = [{ index: 0, actual: values[0], fitted: round(prevS, p.decimals), residual: null }];
  for (let t = 1; t < n; t++) {
    const s = p.alpha * values[t] + (1 - p.alpha) * prevS;
    points.push({ index: t, actual: values[t], fitted: round(s, p.decimals), residual: round(values[t] - s, p.decimals) });
    prevS = s;
  }
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) forecast.push({ period: n + h, value: round(prevS, p.decimals) });
  return buildResult("ses", points, forecast, values, p.decimals);
}

// ── Linear Trend Regression ──

function computeLinear(values: number[], p: ForecastParams): ForecastResult {
  const n = values.length;
  const xs = values.map((_, i) => i);
  const mx = mean(xs);
  const my = mean(values);
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (values[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const slope = sxx === 0 ? 0 : sxy / sxx;
  const intercept = my - slope * mx;
  const points: FitPoint[] = values.map((v, i) => {
    const fitted = round(intercept + slope * i, p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) {
    const x = n - 1 + h;
    forecast.push({ period: n + h, value: round(intercept + slope * x, p.decimals) });
  }
  return buildResult("linear", points, forecast, values, p.decimals, { slope: round(slope, 6), intercept: round(intercept, 6) });
}

// ── Polynomial Trend (Quadratic) ──

function solve3x3(A: number[][], B: number[]): [number, number, number] | null {
  const M = A.map((row, i) => [...row, B[i]]);
  for (let col = 0; col < 3; col++) {
    let pivot = col;
    for (let r = col + 1; r < 3; r++) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    if (Math.abs(M[pivot][col]) < 1e-10) return null;
    [M[col], M[pivot]] = [M[pivot], M[col]];
    for (let r = 0; r < 3; r++) {
      if (r === col) continue;
      const factor = M[r][col] / M[col][col];
      for (let c2 = col; c2 < 4; c2++) M[r][c2] -= factor * M[col][c2];
    }
  }
  return [M[0][3] / M[0][0], M[1][3] / M[1][1], M[2][3] / M[2][2]];
}

function computePoly2(values: number[], p: ForecastParams): ForecastResult | { error: string } {
  const n = values.length;
  if (n < 4) return { error: "At least four observations are required for polynomial trend fitting." };
  let s1 = 0, s2 = 0, s3 = 0, s4 = 0, t0 = 0, t1 = 0, t2 = 0;
  for (let i = 0; i < n; i++) {
    const x = i;
    const y = values[i];
    const x2 = x * x;
    s1 += x; s2 += x2; s3 += x2 * x; s4 += x2 * x2;
    t0 += y; t1 += x * y; t2 += x2 * y;
  }
  const coeffs = solve3x3(
    [[n, s1, s2], [s1, s2, s3], [s2, s3, s4]],
    [t0, t1, t2]
  );
  if (!coeffs) return { error: "Could not fit a polynomial trend to this dataset — try a different method." };
  const [a, b, c] = coeffs;
  const points: FitPoint[] = values.map((v, i) => {
    const fitted = round(a + b * i + c * i * i, p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) {
    const x = n - 1 + h;
    forecast.push({ period: n + h, value: round(a + b * x + c * x * x, p.decimals) });
  }
  return buildResult("poly2", points, forecast, values, p.decimals);
}

// ── Seasonal Naive ──

function computeSeasonalNaive(values: number[], p: ForecastParams): ForecastResult | { error: string } {
  const n = values.length;
  const period = Math.max(2, p.seasonalPeriod);
  if (n < period * 2) {
    return { error: `At least ${period * 2} observations are required for a seasonal period of ${period} (two full cycles).` };
  }
  const points: FitPoint[] = values.map((v, i) => {
    if (i < period) return { index: i, actual: v, fitted: null, residual: null };
    const fitted = round(values[i - period], p.decimals);
    return { index: i, actual: v, fitted, residual: round(v - fitted, p.decimals) };
  });
  const forecast: ForecastPoint[] = [];
  for (let h = 1; h <= p.horizon; h++) {
    const srcIdx = n - period + ((h - 1) % period);
    forecast.push({ period: n + h, value: round(values[srcIdx], p.decimals) });
  }
  return buildResult("seasonal-naive", points, forecast, values, p.decimals);
}

// ── Dispatcher ──

export function computeForecast(values: number[], p: ForecastParams): ForecastResult | { error: string } {
  const n = values.length;
  if (n === 0) return { error: "No valid numeric data found." };
  if (n < 3) return { error: "At least three observations are required." };
  if (p.horizon < 1) return { error: "Forecast period must be greater than zero." };

  switch (p.method) {
    case "naive": return computeNaive(values, p);
    case "drift": return computeDrift(values, p);
    case "sma": return computeSMA(values, p);
    case "wma": return computeWMA(values, p);
    case "ses": return computeSES(values, p);
    case "linear": return computeLinear(values, p);
    case "poly2": return computePoly2(values, p);
    case "seasonal-naive": return computeSeasonalNaive(values, p);
  }
}

// ── Sample data ──

export const SAMPLE_DATASETS: { name: string; text: string; method: ForecastMethod; window?: number; seasonalPeriod?: number }[] = [
  { name: "Monthly Sales (Upward Trend)", text: "Jan,120\nFeb,135\nMar,150\nApr,162\nMay,170\nJun,180", method: "linear" },
  { name: "Daily Website Visitors", text: "210, 240, 235, 260, 280, 300", method: "sma", window: 3 },
  { name: "Quarterly Revenue", text: "1200, 1300, 1400, 1450, 1600, 1700, 1800", method: "linear" },
  { name: "Seasonal Retail Demand", text: "200, 220, 260, 180, 210, 235, 275, 190, 225, 250, 290, 205", method: "seasonal-naive", seasonalPeriod: 4 },
];

export function generateRandomSample(): string {
  const count = 20 + Math.floor(Math.random() * 20);
  let value = 50 + Math.random() * 50;
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    value = Math.max(1, value + z * 4 + 0.6);
    values.push(Math.round(value * 100) / 100);
  }
  return values.join(", ");
}

// ── Formatting ──

export function formatNum(n: number | null): string {
  if (n === null || !isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: last-session input ──

const INPUT_KEY = "time-series-forecast-calculator-input";

export interface SavedInput {
  text: string;
  method: ForecastMethod;
  window: number;
  alpha: number;
  seasonalPeriod: number;
  horizon: number;
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
  nextForecast: number;
  method: ForecastMethod;
}

const HISTORY_KEY = "time-series-forecast-calculator-history";

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

// ── Export helpers ──

const METHOD_LABELS: Record<ForecastMethod, string> = {
  naive: "Naive Forecast",
  drift: "Drift Method",
  sma: "Moving Average",
  wma: "Weighted Moving Average",
  ses: "Simple Exponential Smoothing",
  linear: "Linear Trend Regression",
  poly2: "Polynomial Trend",
  "seasonal-naive": "Seasonal Naive",
};

export function buildTextReport(result: ForecastResult, params: ForecastParams): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Time Series Forecast Calculator Report",
    "========================================",
    `Generated: ${ts}`,
    `Method: ${METHOD_LABELS[result.method]}`,
  ];
  if (methodMeta(result.method).usesWindow) lines.push(`Window Size: ${params.window}`);
  if (methodMeta(result.method).usesAlpha) lines.push(`Alpha: ${params.alpha}`);
  if (methodMeta(result.method).usesSeasonalPeriod) lines.push(`Seasonal Period: ${params.seasonalPeriod}`);
  lines.push(
    "",
    `Historical Points: ${result.points.length}`,
    `Average: ${result.average}`,
    `Min: ${result.min}`,
    `Max: ${result.max}`,
    `Growth Rate: ${result.growthRate}%`,
    "",
    `MAE: ${result.mae}`,
    `RMSE: ${result.rmse}`,
    `MAPE: ${result.mape}%`,
  );
  if (result.trendLine) lines.push(`Trend: slope=${result.trendLine.slope}, intercept=${result.trendLine.intercept}`);
  lines.push(
    "",
    "Period, Forecast:",
    ...result.forecast.map((f) => `${f.period}, ${f.value}`),
    "",
    "Generated by Time Series Forecast Calculator — https://productivetoolbox.com",
  );
  return lines.join("\n");
}

export function buildCSVReport(result: ForecastResult, excelCompatible = false): string {
  const rows = [
    "Index,Actual,Fitted,Residual",
    ...result.points.map((p) => `${p.index + 1},${p.actual},${p.fitted ?? ""},${p.residual ?? ""}`),
    "",
    "Forecast Period,Forecast Value",
    ...result.forecast.map((f) => `${f.period},${f.value}`),
  ];
  const csv = rows.join("\n");
  return excelCompatible ? `﻿${csv}` : csv;
}

export function buildJSONReport(result: ForecastResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: ForecastResult): string {
  return `<!DOCTYPE html><html><head><title>Time Series Forecast Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Time Series Forecast Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Method: ${METHOD_LABELS[result.method]}</p>
  <table>
    <thead><tr><th>Index</th><th>Actual</th><th>Fitted</th><th>Residual</th></tr></thead>
    <tbody>
      ${result.points.map((p) => `<tr><td>${p.index + 1}</td><td>${p.actual}</td><td>${formatNum(p.fitted)}</td><td>${formatNum(p.residual)}</td></tr>`).join("")}
    </tbody>
  </table>
  <h2 style="font-size:16px;margin-top:24px">Forecast</h2>
  <table>
    <thead><tr><th>Period</th><th>Forecast</th></tr></thead>
    <tbody>
      ${result.forecast.map((f) => `<tr><td>${f.period}</td><td>${f.value}</td></tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
}
