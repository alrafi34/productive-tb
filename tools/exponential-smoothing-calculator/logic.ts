// ── Exponential Smoothing Calculator Logic ──

export type SmoothingMethod = "ses" | "holt" | "holt-winters";
export type SeasonalType = "additive" | "multiplicative";

const SPLIT_RE = /[\s,;\t\n]+/;

export interface ParsedDataset {
  values: number[];
  invalidTokens: string[];
}

export function parseDataset(input: string): ParsedDataset {
  const tokens = input.split(SPLIT_RE).map((t) => t.trim()).filter(Boolean);
  const values: number[] = [];
  const invalidTokens: string[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (token !== "" && !isNaN(n) && isFinite(n)) values.push(n);
    else invalidTokens.push(token);
  }
  return { values, invalidTokens };
}

export interface SmoothingPoint {
  index: number;
  actual: number;
  smoothed: number | null;
  residual: number | null;
}

export interface ForecastPoint {
  period: number;
  forecast: number;
}

export interface SmoothingResult {
  method: SmoothingMethod;
  points: SmoothingPoint[];
  forecast: ForecastPoint[];
  mae: number;
  rmse: number;
  mape: number;
  finalLevel: number;
  finalTrend: number | null;
}

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

function computeErrorStats(points: SmoothingPoint[], decimals: number): { mae: number; rmse: number; mape: number } {
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

// ── Simple Exponential Smoothing ──

export function computeSES(values: number[], alpha: number, forecastPeriods: number, decimals: number): SmoothingResult {
  const n = values.length;
  const points: SmoothingPoint[] = [];
  let prevS = values[0];
  points.push({ index: 0, actual: values[0], smoothed: round(prevS, decimals), residual: null });

  for (let t = 1; t < n; t++) {
    const s = alpha * values[t] + (1 - alpha) * prevS;
    points.push({ index: t, actual: values[t], smoothed: round(s, decimals), residual: round(values[t] - s, decimals) });
    prevS = s;
  }

  const forecast: ForecastPoint[] = [];
  for (let m = 1; m <= forecastPeriods; m++) {
    forecast.push({ period: n + m, forecast: round(prevS, decimals) });
  }

  const { mae, rmse, mape } = computeErrorStats(points, decimals);
  return { method: "ses", points, forecast, mae, rmse, mape, finalLevel: round(prevS, decimals), finalTrend: null };
}

// ── Holt's Double Exponential Smoothing ──

export function computeHolt(values: number[], alpha: number, beta: number, forecastPeriods: number, decimals: number): SmoothingResult {
  const n = values.length;
  const points: SmoothingPoint[] = [];

  let level = values[0];
  let trend = n > 1 ? values[1] - values[0] : 0;
  points.push({ index: 0, actual: values[0], smoothed: round(level, decimals), residual: null });

  for (let t = 1; t < n; t++) {
    const prevLevel = level;
    const prevTrend = trend;
    const oneStepForecast = prevLevel + prevTrend;
    level = alpha * values[t] + (1 - alpha) * (prevLevel + prevTrend);
    trend = beta * (level - prevLevel) + (1 - beta) * prevTrend;
    points.push({
      index: t,
      actual: values[t],
      smoothed: round(oneStepForecast, decimals),
      residual: round(values[t] - oneStepForecast, decimals),
    });
  }

  const forecast: ForecastPoint[] = [];
  for (let m = 1; m <= forecastPeriods; m++) {
    forecast.push({ period: n + m, forecast: round(level + m * trend, decimals) });
  }

  const { mae, rmse, mape } = computeErrorStats(points, decimals);
  return { method: "holt", points, forecast, mae, rmse, mape, finalLevel: round(level, decimals), finalTrend: round(trend, decimals) };
}

// ── Holt-Winters Triple Exponential Smoothing ──

export interface HoltWintersResult extends SmoothingResult {
  seasonalIndices: number[];
}

export function computeHoltWinters(
  values: number[],
  alpha: number,
  beta: number,
  gamma: number,
  period: number,
  seasonalType: SeasonalType,
  forecastPeriods: number,
  decimals: number
): HoltWintersResult | { error: string } {
  const n = values.length;
  if (period < 2) return { error: "Seasonal period must be at least 2." };
  const seasonCount = Math.floor(n / period);
  if (seasonCount < 2) {
    return { error: "Holt-Winters requires enough observations to identify seasonality — at least two full seasonal periods." };
  }

  const seasonAvg: number[] = [];
  for (let s = 0; s < seasonCount; s++) {
    let sum = 0;
    for (let i = 0; i < period; i++) sum += values[s * period + i];
    seasonAvg.push(sum / period);
  }

  const level: number[] = new Array(n).fill(0);
  const trend: number[] = new Array(n).fill(0);
  const seasonal: number[] = new Array(n).fill(0);

  level[period - 1] = seasonAvg[0];
  trend[period - 1] = (seasonAvg[1] - seasonAvg[0]) / period;
  for (let i = 0; i < period; i++) {
    seasonal[i] = seasonalType === "additive" ? values[i] - seasonAvg[0] : values[i] / seasonAvg[0];
  }

  const points: SmoothingPoint[] = [];
  for (let i = 0; i < period; i++) {
    points.push({ index: i, actual: values[i], smoothed: i === period - 1 ? round(level[period - 1], decimals) : null, residual: null });
  }

  for (let t = period; t < n; t++) {
    const prevLevel = level[t - 1];
    const prevTrend = trend[t - 1];
    const seasonRef = seasonal[t - period];

    const oneStepForecast = seasonalType === "additive"
      ? prevLevel + prevTrend + seasonRef
      : (prevLevel + prevTrend) * seasonRef;

    if (seasonalType === "additive") {
      level[t] = alpha * (values[t] - seasonRef) + (1 - alpha) * (prevLevel + prevTrend);
      trend[t] = beta * (level[t] - prevLevel) + (1 - beta) * prevTrend;
      seasonal[t] = gamma * (values[t] - level[t]) + (1 - gamma) * seasonRef;
    } else {
      level[t] = alpha * (values[t] / (seasonRef || 1)) + (1 - alpha) * (prevLevel + prevTrend);
      trend[t] = beta * (level[t] - prevLevel) + (1 - beta) * prevTrend;
      seasonal[t] = gamma * (values[t] / (level[t] || 1)) + (1 - gamma) * seasonRef;
    }

    points.push({
      index: t,
      actual: values[t],
      smoothed: round(oneStepForecast, decimals),
      residual: round(values[t] - oneStepForecast, decimals),
    });
  }

  const finalLevel = level[n - 1];
  const finalTrend = trend[n - 1];
  const forecast: ForecastPoint[] = [];
  for (let m = 1; m <= forecastPeriods; m++) {
    const seasonIdx = n - period + ((m - 1) % period);
    const seasonVal = seasonal[seasonIdx];
    const f = seasonalType === "additive"
      ? finalLevel + m * finalTrend + seasonVal
      : (finalLevel + m * finalTrend) * seasonVal;
    forecast.push({ period: n + m, forecast: round(f, decimals) });
  }

  const { mae, rmse, mape } = computeErrorStats(points, decimals);
  return {
    method: "holt-winters", points, forecast, mae, rmse, mape,
    finalLevel: round(finalLevel, decimals), finalTrend: round(finalTrend, decimals),
    seasonalIndices: seasonal.slice(n - period).map((v) => round(v, decimals)),
  };
}

export function isHoltWintersError(r: HoltWintersResult | { error: string } | null): r is { error: string } {
  return r !== null && "error" in r;
}

// ── Sample data ──

export const SAMPLE_DATASETS: { name: string; text: string; method: SmoothingMethod; period?: number }[] = [
  { name: "Spec Example (Upward Trend)", text: "10, 15, 18, 20, 22, 24, 27, 30", method: "ses" },
  { name: "Sales with Trend", text: "120, 128, 135, 140, 150, 158, 165, 174, 182, 190", method: "holt" },
  { name: "Seasonal Website Traffic", text: "200, 220, 260, 180, 210, 235, 275, 190, 225, 250, 290, 205, 240, 265, 305, 220", method: "holt-winters", period: 4 },
];

export function generateRandomSample(): string {
  const count = 20 + Math.floor(Math.random() * 20);
  let value = 50 + Math.random() * 50;
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    value = Math.max(1, value + z * 4 + 0.5);
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

const INPUT_KEY = "exponential-smoothing-calculator-input";

export interface SavedInput {
  text: string;
  method: SmoothingMethod;
  alpha: number;
  beta: number;
  gamma: number;
  period: number;
  seasonalType: SeasonalType;
  forecastPeriods: number;
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
  finalLevel: number;
  method: SmoothingMethod;
}

const HISTORY_KEY = "exponential-smoothing-calculator-history";

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

const METHOD_LABELS: Record<SmoothingMethod, string> = {
  ses: "Simple Exponential Smoothing",
  holt: "Holt's Double Exponential Smoothing",
  "holt-winters": "Holt-Winters Triple Exponential Smoothing",
};

export function buildTextReport(result: SmoothingResult, alpha: number, beta: number, gamma: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Exponential Smoothing Calculator Report",
    "=========================================",
    `Generated: ${ts}`,
    `Method: ${METHOD_LABELS[result.method]}`,
    `Alpha: ${alpha}`,
  ];
  if (result.method === "holt" || result.method === "holt-winters") lines.push(`Beta: ${beta}`);
  if (result.method === "holt-winters") lines.push(`Gamma: ${gamma}`);
  lines.push(
    "",
    `MAE: ${result.mae}`,
    `RMSE: ${result.rmse}`,
    `MAPE: ${result.mape}%`,
    `Final Level: ${result.finalLevel}`,
  );
  if (result.finalTrend !== null) lines.push(`Final Trend: ${result.finalTrend}`);
  lines.push(
    "",
    "Observation, Actual, Smoothed, Residual:",
    ...result.points.map((p) => `${p.index + 1}, ${p.actual}, ${formatNum(p.smoothed)}, ${formatNum(p.residual)}`),
    "",
    "Forecast (Period, Value):",
    ...result.forecast.map((f) => `${f.period}, ${f.forecast}`),
    "",
    "Generated by Exponential Smoothing Calculator — https://productivetoolbox.com",
  );
  return lines.join("\n");
}

export function buildCSVReport(result: SmoothingResult, excelCompatible = false): string {
  const rows = [
    "Observation,Actual,Smoothed,Residual",
    ...result.points.map((p) => `${p.index + 1},${p.actual},${p.smoothed ?? ""},${p.residual ?? ""}`),
    "",
    "Forecast Period,Forecast Value",
    ...result.forecast.map((f) => `${f.period},${f.forecast}`),
  ];
  const csv = rows.join("\n");
  return excelCompatible ? `﻿${csv}` : csv;
}

export function buildJSONReport(result: SmoothingResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: SmoothingResult, alpha: number): string {
  return `<!DOCTYPE html><html><head><title>Exponential Smoothing Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Exponential Smoothing Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Method: ${METHOD_LABELS[result.method]} · Alpha: ${alpha}</p>
  <table>
    <thead><tr><th>Observation</th><th>Actual</th><th>Smoothed</th><th>Residual</th></tr></thead>
    <tbody>
      ${result.points.map((p) => `<tr><td>${p.index + 1}</td><td>${p.actual}</td><td>${formatNum(p.smoothed)}</td><td>${formatNum(p.residual)}</td></tr>`).join("")}
    </tbody>
  </table>
  <h2 style="font-size:16px;margin-top:24px">Forecast</h2>
  <table>
    <thead><tr><th>Period</th><th>Forecast</th></tr></thead>
    <tbody>
      ${result.forecast.map((f) => `<tr><td>${f.period}</td><td>${f.forecast}</td></tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
}
