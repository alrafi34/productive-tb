// ── Regression Calculator Logic (Simple Linear Regression — Least Squares) ──

export interface DataPoint {
  id: string;
  x: number;
  y: number;
}

let idCounter = 0;
export function makeId(): string {
  idCounter += 1;
  return `pt-${Date.now().toString(36)}-${idCounter}`;
}

export function makePoint(x: number, y: number): DataPoint {
  return { id: makeId(), x, y };
}

const LINE_SPLIT_RE = /\r?\n/;
const PAIR_SPLIT_RE = /[,\t; ]+/;

export interface ParseResult {
  points: DataPoint[];
  invalidLines: string[];
}

export function parsePastedPairs(text: string): ParseResult {
  const lines = text.split(LINE_SPLIT_RE).map((l) => l.trim()).filter(Boolean);
  const points: DataPoint[] = [];
  const invalidLines: string[] = [];
  for (const line of lines) {
    const parts = line.split(PAIR_SPLIT_RE).filter(Boolean);
    if (parts.length < 2) { invalidLines.push(line); continue; }
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) { invalidLines.push(line); continue; }
    points.push(makePoint(x, y));
  }
  return { points, invalidLines };
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export interface Prediction {
  x: number;
  actual: number;
  predicted: number;
  residual: number;
}

export interface RegressionResult {
  n: number;
  slope: number;
  intercept: number;
  r: number;
  rSquared: number;
  meanX: number;
  meanY: number;
  varianceX: number;
  varianceY: number;
  sst: number;
  ssr: number;
  sse: number;
  mse: number;
  rmse: number;
  mae: number;
  standardError: number;
  predictions: Prediction[];
}

export function calculateRegression(points: DataPoint[]): RegressionResult | null {
  const n = points.length;
  if (n < 2) return null;
  const x = points.map((p) => p.x);
  const y = points.map((p) => p.y);
  const mx = mean(x);
  const my = mean(y);

  let sumXY = 0, sumXX = 0;
  for (let i = 0; i < n; i++) {
    sumXY += (x[i] - mx) * (y[i] - my);
    sumXX += (x[i] - mx) * (x[i] - mx);
  }
  const slope = sumXX === 0 ? 0 : sumXY / sumXX;
  const intercept = my - slope * mx;

  const predictions: Prediction[] = points.map((p) => {
    const predicted = intercept + slope * p.x;
    return { x: p.x, actual: p.y, predicted, residual: p.y - predicted };
  });

  const sse = predictions.reduce((acc, p) => acc + p.residual * p.residual, 0);
  const sst = y.reduce((acc, yi) => acc + (yi - my) * (yi - my), 0);
  const ssr = sst - sse;
  const rSquared = sst === 0 ? 0 : Math.max(0, ssr / sst);
  const r = Math.sign(slope) * Math.sqrt(rSquared);

  const varianceX = sumXX / n;
  const varianceY = sst / n;
  const mse = sse / n;
  const rmse = Math.sqrt(mse);
  const mae = predictions.reduce((acc, p) => acc + Math.abs(p.residual), 0) / n;
  const standardError = n > 2 ? Math.sqrt(sse / (n - 2)) : 0;

  return {
    n, slope, intercept, r, rSquared, meanX: mx, meanY: my,
    varianceX, varianceY, sst, ssr, sse, mse, rmse, mae, standardError, predictions,
  };
}

export function predictY(slope: number, intercept: number, x: number): number {
  return intercept + slope * x;
}

export function classifyStrength(r: number): string {
  const abs = Math.abs(r);
  if (abs >= 0.999) return "Perfect";
  if (abs >= 0.9) return "Very Strong";
  if (abs >= 0.7) return "Strong";
  if (abs >= 0.4) return "Moderate";
  if (abs >= 0.1) return "Weak";
  return "Negligible";
}

// ── Outlier detection (standardized residuals) ──

export interface OutlierInfo {
  index: number;
  residual: number;
  zScore: number;
}

export function detectOutliers(predictions: Prediction[]): OutlierInfo[] {
  const n = predictions.length;
  if (n < 3) return [];
  const residuals = predictions.map((p) => p.residual);
  const rMean = mean(residuals);
  const rStd = Math.sqrt(residuals.reduce((a, r) => a + (r - rMean) ** 2, 0) / n) || 1;
  return residuals
    .map((r, i) => ({ index: i, residual: r, zScore: (r - rMean) / rStd }))
    .filter((o) => Math.abs(o.zScore) > 2);
}

// ── CSV / paste column parsing ──

export interface CSVParseResult {
  headers: string[];
  rows: string[][];
  numericColumns: number[];
}

function detectDelimiter(line: string): string {
  if (line.includes("\t")) return "\t";
  if (line.includes(",")) return ",";
  if (line.includes(";")) return ";";
  return /\s+/.test(line) ? "\\s+" : ",";
}

export function parseCSV(text: string): CSVParseResult {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [], numericColumns: [] };
  const delim = detectDelimiter(lines[0]);
  const splitLine = (l: string) => (delim === "\\s+" ? l.split(/\s+/) : l.split(delim)).map((c) => c.trim());

  const first = splitLine(lines[0]);
  const hasHeader = first.some((c) => c !== "" && isNaN(Number(c)));
  const headers = hasHeader ? first : first.map((_, i) => `Column ${i + 1}`);
  const dataLines = hasHeader ? lines.slice(1) : lines;
  const rows = dataLines.map(splitLine);

  const colCount = headers.length;
  const numericColumns: number[] = [];
  for (let c = 0; c < colCount; c++) {
    const numericCount = rows.filter((r) => r[c] !== undefined && !isNaN(Number(r[c])) && r[c] !== "").length;
    if (numericCount >= rows.length * 0.7 && numericCount > 0) numericColumns.push(c);
  }
  return { headers, rows, numericColumns };
}

export function pointsFromColumns(parsed: CSVParseResult, colX: number, colY: number): DataPoint[] {
  const points: DataPoint[] = [];
  for (const row of parsed.rows) {
    const x = Number(row[colX]);
    const y = Number(row[colY]);
    if (!isNaN(x) && !isNaN(y) && isFinite(x) && isFinite(y)) points.push(makePoint(x, y));
  }
  return points;
}

// ── Sample datasets ──

export interface SampleDataset {
  name: string;
  points: [number, number][];
}

export const SAMPLE_DATASETS: SampleDataset[] = [
  { name: "Spec Example", points: [[1, 2], [2, 4], [3, 5], [4, 4], [5, 5]] },
  { name: "Advertising vs. Sales", points: [[10, 25], [15, 32], [20, 41], [25, 48], [30, 55], [35, 61], [40, 70]] },
  { name: "Study Hours vs. Exam Score", points: [[1, 52], [2, 58], [3, 63], [4, 68], [5, 74], [6, 79], [7, 85], [8, 90]] },
  { name: "Simple Increasing Trend", points: [[1, 2], [2, 3], [3, 5], [4, 7], [5, 8]] },
];

export function generateRandomDataset(): SampleDataset {
  const n = 12 + Math.floor(Math.random() * 15);
  const slope = (Math.random() - 0.5) * 6;
  const noise = 5 + Math.random() * 15;
  const points: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const xi = Math.round(Math.random() * 100 * 10) / 10;
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const yi = Math.round((slope * xi + z * noise + 20) * 10) / 10;
    points.push([xi, yi]);
  }
  return { name: "Random Dataset", points };
}

// ── Formatting ──

export function formatNum(n: number, decimals = 4): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── LocalStorage: last-session input ──

const INPUT_KEY = "regression-calculator-input";

export function saveInput(points: DataPoint[], decimals: number): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ points, decimals })); } catch {}
}

export function loadInput(): { points: DataPoint[]; decimals: number } | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  points: DataPoint[];
  result: RegressionResult;
}

const HISTORY_KEY = "regression-calculator-history";

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

export function buildTextReport(result: RegressionResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Regression Calculator Report",
    "=============================",
    `Generated: ${ts}`,
    "",
    `Sample Size (n): ${result.n}`,
    `Regression Equation: Y = ${formatNum(result.intercept, 3)} + ${formatNum(result.slope, 3)}X`,
    `Slope (b): ${formatNum(result.slope)}`,
    `Intercept (a): ${formatNum(result.intercept)}`,
    `Correlation Coefficient (r): ${formatNum(result.r)}`,
    `R² (Coefficient of Determination): ${formatNum(result.rSquared)}`,
    "",
    `Mean X: ${formatNum(result.meanX)}`,
    `Mean Y: ${formatNum(result.meanY)}`,
    `Variance X: ${formatNum(result.varianceX)}`,
    `Variance Y: ${formatNum(result.varianceY)}`,
    "",
    `SST (Total Sum of Squares): ${formatNum(result.sst)}`,
    `SSR (Regression Sum of Squares): ${formatNum(result.ssr)}`,
    `SSE (Error Sum of Squares): ${formatNum(result.sse)}`,
    `MSE (Mean Squared Error): ${formatNum(result.mse)}`,
    `RMSE (Root Mean Squared Error): ${formatNum(result.rmse)}`,
    `MAE (Mean Absolute Error): ${formatNum(result.mae)}`,
    `Standard Error: ${formatNum(result.standardError)}`,
    "",
    "Predictions (X, Actual Y, Predicted Y, Residual):",
    ...result.predictions.map((p) => `${p.x}, ${p.actual}, ${formatNum(p.predicted, 3)}, ${formatNum(p.residual, 3)}`),
    "",
    "Generated by Regression Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: RegressionResult): string {
  const summary: [string, string][] = [
    ["Sample Size", String(result.n)],
    ["Slope", formatNum(result.slope)],
    ["Intercept", formatNum(result.intercept)],
    ["Correlation Coefficient (r)", formatNum(result.r)],
    ["R Squared", formatNum(result.rSquared)],
    ["SST", formatNum(result.sst)],
    ["SSR", formatNum(result.ssr)],
    ["SSE", formatNum(result.sse)],
    ["MSE", formatNum(result.mse)],
    ["RMSE", formatNum(result.rmse)],
    ["MAE", formatNum(result.mae)],
    ["Standard Error", formatNum(result.standardError)],
  ];
  const lines = [
    "Metric,Value", ...summary.map(([k, v]) => `"${k}","${v}"`), "",
    "X,Actual Y,Predicted Y,Residual",
    ...result.predictions.map((p) => `${p.x},${p.actual},${formatNum(p.predicted, 4)},${formatNum(p.residual, 4)}`),
  ];
  return lines.join("\n");
}

export function buildJSONReport(result: RegressionResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: RegressionResult): string {
  return `<!DOCTYPE html><html><head><title>Regression Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Regression Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <table>
    <tr><td>Regression Equation</td><td>Y = ${formatNum(result.intercept, 3)} + ${formatNum(result.slope, 3)}X</td></tr>
    <tr><td>Correlation Coefficient (r)</td><td>${formatNum(result.r)}</td></tr>
    <tr><td>R² (Coefficient of Determination)</td><td>${formatNum(result.rSquared)}</td></tr>
    <tr><td>Sample Size</td><td>${result.n}</td></tr>
    <tr><td>RMSE</td><td>${formatNum(result.rmse)}</td></tr>
    <tr><td>MAE</td><td>${formatNum(result.mae)}</td></tr>
    <tr><td>Standard Error</td><td>${formatNum(result.standardError)}</td></tr>
  </table>
  </body></html>`;
}
