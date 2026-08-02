// ── Moving Average Calculator Logic ──

export type MAType = "sma" | "wma" | "ema";

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

export interface MAPoint {
  index: number;
  value: number;
  ma: number;
}

export interface MAResult {
  type: MAType;
  window: number;
  points: MAPoint[];
  count: number;
  min: number;
  max: number;
  average: number;
  originalCount: number;
}

function round(v: number, decimals: number): number {
  return isFinite(v) ? parseFloat(v.toFixed(decimals)) : NaN;
}

function computeSMA(values: number[], window: number): number[] {
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= window) sum -= values[i - window];
    if (i >= window - 1) result.push(sum / window);
  }
  return result;
}

function computeWMA(values: number[], window: number): number[] {
  const weightSum = (window * (window + 1)) / 2;
  const result: number[] = [];
  for (let i = window - 1; i < values.length; i++) {
    let weighted = 0;
    for (let w = 0; w < window; w++) {
      weighted += values[i - window + 1 + w] * (w + 1);
    }
    result.push(weighted / weightSum);
  }
  return result;
}

function computeEMA(values: number[], window: number): number[] {
  const result: number[] = [];
  const multiplier = 2 / (window + 1);
  let seedSum = 0;
  for (let i = 0; i < window; i++) seedSum += values[i];
  let prevEma = seedSum / window;
  result.push(prevEma);
  for (let i = window; i < values.length; i++) {
    const ema = values[i] * multiplier + prevEma * (1 - multiplier);
    result.push(ema);
    prevEma = ema;
  }
  return result;
}

export function calculateMovingAverage(values: number[], type: MAType, window: number, decimals: number): MAResult | null {
  if (values.length === 0 || window < 2 || window > values.length) return null;

  const raw = type === "sma" ? computeSMA(values, window) : type === "wma" ? computeWMA(values, window) : computeEMA(values, window);

  const points: MAPoint[] = raw.map((ma, i) => ({
    index: window - 1 + i,
    value: values[window - 1 + i],
    ma: round(ma, decimals),
  }));

  const maValues = points.map((p) => p.ma);
  const average = maValues.reduce((a, b) => a + b, 0) / maValues.length;

  return {
    type, window, points,
    count: points.length,
    min: round(Math.min(...maValues), decimals),
    max: round(Math.max(...maValues), decimals),
    average: round(average, decimals),
    originalCount: values.length,
  };
}

export function trendSummary(result: MAResult): string {
  if (result.points.length < 2) return "Not enough data points to determine a trend.";
  const first = result.points[0].ma;
  const last = result.points[result.points.length - 1].ma;
  const change = last - first;
  const pctChange = first !== 0 ? (change / Math.abs(first)) * 100 : 0;
  if (Math.abs(pctChange) < 1) return `The moving average is roughly flat, changing ${pctChange.toFixed(2)}% from start to end.`;
  return change > 0
    ? `The moving average trends upward, rising ${pctChange.toFixed(2)}% from ${first} to ${last}.`
    : `The moving average trends downward, falling ${Math.abs(pctChange).toFixed(2)}% from ${first} to ${last}.`;
}

// ── Sample data ──

export const SAMPLE_TEXT = "10, 20, 30, 40, 50";

export const SAMPLE_DATASETS: { name: string; text: string; window: number }[] = [
  { name: "Spec Example (5 values)", text: "10, 20, 30, 40, 50", window: 3 },
  { name: "Stock Price Series", text: "150, 160, 170, 180, 175, 190, 200", window: 5 },
  { name: "Daily Website Visitors", text: "1200, 1180, 1220, 1300, 1280, 1350, 1400", window: 3 },
];

export function generateRandomSample(): string {
  const count = 20 + Math.floor(Math.random() * 20);
  let value = 50 + Math.random() * 50;
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    value = Math.max(1, value + z * 4);
    values.push(Math.round(value * 100) / 100);
  }
  return values.join(", ");
}

// ── Formatting ──

export function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: last-session input ──

const INPUT_KEY = "moving-average-calculator-input";

export function saveInput(text: string, type: MAType, window: number, decimals: number): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ text, type, window, decimals })); } catch {}
}

export function loadInput(): { text: string; type: MAType; window: number; decimals: number } | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  type: MAType;
  window: number;
  result: MAResult;
}

const HISTORY_KEY = "moving-average-calculator-history";

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

const TYPE_LABELS: Record<MAType, string> = { sma: "Simple Moving Average (SMA)", wma: "Weighted Moving Average (WMA)", ema: "Exponential Moving Average (EMA)" };

export function buildTextReport(result: MAResult, values: number[]): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Moving Average Calculator Report",
    "==================================",
    `Generated: ${ts}`,
    `Method: ${TYPE_LABELS[result.type]}`,
    `Window Size: ${result.window}`,
    "",
    `Dataset Count: ${result.originalCount}`,
    `Moving Average Count: ${result.count}`,
    `Min: ${result.min}`,
    `Max: ${result.max}`,
    `Average: ${result.average}`,
    "",
    trendSummary(result),
    "",
    "Moving Average Values:",
    result.points.map((p) => p.ma).join(", "),
    "",
    "Original Dataset:",
    values.join(", "),
    "",
    "Generated by Moving Average Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: MAResult): string {
  const rows = ["Index,Original Value,Moving Average", ...result.points.map((p) => `${p.index + 1},${p.value},${p.ma}`)];
  return rows.join("\n");
}

export function buildJSONReport(result: MAResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: MAResult): string {
  return `<!DOCTYPE html><html><head><title>Moving Average Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Moving Average Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Method: ${TYPE_LABELS[result.type]} · Window Size: ${result.window}</p>
  <table>
    <thead><tr><th>Index</th><th>Original Value</th><th>Moving Average</th></tr></thead>
    <tbody>
      ${result.points.map((p) => `<tr><td>${p.index + 1}</td><td>${p.value}</td><td>${p.ma}</td></tr>`).join("")}
    </tbody>
  </table>
  </body></html>`;
}
