// ── Correlation Coefficient Calculator Logic ──

export type CorrelationMethod = "pearson" | "spearman" | "kendall";

const LINE_SPLIT_RE = /\r?\n/;

export interface ParsedSeries {
  values: number[];
  invalidTokens: string[];
}

export function parseSeries(input: string): ParsedSeries {
  const lines = input.split(LINE_SPLIT_RE).map((l) => l.trim()).filter(Boolean);
  const values: number[] = [];
  const invalidTokens: string[] = [];
  for (const line of lines) {
    const n = Number(line);
    if (line !== "" && !isNaN(n) && isFinite(n)) values.push(n);
    else invalidTokens.push(line);
  }
  return { values, invalidTokens };
}

export interface PairResult {
  x: number[];
  y: number[];
  invalidX: string[];
  invalidY: string[];
  lengthMismatch: boolean;
}

export function pairSeries(xText: string, yText: string): PairResult {
  const px = parseSeries(xText);
  const py = parseSeries(yText);
  const n = Math.min(px.values.length, py.values.length);
  return {
    x: px.values.slice(0, n),
    y: py.values.slice(0, n),
    invalidX: px.invalidTokens,
    invalidY: py.invalidTokens,
    lengthMismatch: px.values.length !== py.values.length,
  };
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export interface CorrelationResult {
  method: CorrelationMethod;
  n: number;
  r: number;
  rSquared: number;
  meanX: number;
  meanY: number;
  varianceX: number;
  varianceY: number;
  covariance: number;
  slope: number;
  intercept: number;
  strength: string;
  direction: "Positive" | "Negative" | "None";
  interpretation: string;
}

export function classifyCorrelation(r: number): { strength: string; direction: "Positive" | "Negative" | "None"; interpretation: string } {
  const abs = Math.abs(r);
  let strength: string;
  if (abs >= 0.999) strength = "Perfect";
  else if (abs >= 0.9) strength = "Very Strong";
  else if (abs >= 0.7) strength = "Strong";
  else if (abs >= 0.4) strength = "Moderate";
  else if (abs >= 0.1) strength = "Weak";
  else strength = "Negligible";

  const direction: "Positive" | "Negative" | "None" = r > 0.001 ? "Positive" : r < -0.001 ? "Negative" : "None";
  const interpretation = direction === "None" ? "No Correlation" : `${strength} ${direction} ${direction === "Positive" || direction === "Negative" ? "Correlation" : ""}`.trim();
  return { strength, direction, interpretation };
}

export function calculatePearson(x: number[], y: number[]): CorrelationResult | null {
  const n = x.length;
  if (n < 2) return null;
  const mx = mean(x);
  const my = mean(y);
  let sumXY = 0, sumXX = 0, sumYY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    sumXY += dx * dy;
    sumXX += dx * dx;
    sumYY += dy * dy;
  }
  const denom = Math.sqrt(sumXX * sumYY);
  const r = denom === 0 ? 0 : sumXY / denom;
  const varianceX = sumXX / n;
  const varianceY = sumYY / n;
  const covariance = sumXY / n;
  const slope = sumXX === 0 ? 0 : sumXY / sumXX;
  const intercept = my - slope * mx;
  const { strength, direction, interpretation } = classifyCorrelation(r);
  return {
    method: "pearson", n, r, rSquared: r * r,
    meanX: mx, meanY: my, varianceX, varianceY, covariance, slope, intercept,
    strength, direction, interpretation,
  };
}

function rankValues(values: number[]): number[] {
  const indexed = values.map((v, i) => ({ v, i }));
  indexed.sort((a, b) => a.v - b.v);
  const ranks = new Array(values.length).fill(0);
  let i = 0;
  while (i < indexed.length) {
    let j = i;
    while (j + 1 < indexed.length && indexed[j + 1].v === indexed[i].v) j++;
    const avgRank = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[indexed[k].i] = avgRank;
    i = j + 1;
  }
  return ranks;
}

export function calculateSpearman(x: number[], y: number[]): CorrelationResult | null {
  if (x.length < 2) return null;
  const rx = rankValues(x);
  const ry = rankValues(y);
  const base = calculatePearson(rx, ry);
  if (!base) return null;
  return { ...base, method: "spearman" };
}

const KENDALL_MAX_N = 3000;

export function calculateKendall(x: number[], y: number[]): CorrelationResult | null {
  const n = x.length;
  if (n < 2) return null;
  const capped = n > KENDALL_MAX_N;
  const limit = capped ? KENDALL_MAX_N : n;
  let concordant = 0, discordant = 0, tiesX = 0, tiesY = 0;
  for (let i = 0; i < limit; i++) {
    for (let j = i + 1; j < limit; j++) {
      const dx = x[i] - x[j];
      const dy = y[i] - y[j];
      if (dx === 0 && dy === 0) continue;
      if (dx === 0) { tiesX++; continue; }
      if (dy === 0) { tiesY++; continue; }
      if (dx * dy > 0) concordant++;
      else discordant++;
    }
  }
  const total = (limit * (limit - 1)) / 2;
  const denom = Math.sqrt((total - tiesX) * (total - tiesY));
  const r = denom === 0 ? 0 : (concordant - discordant) / denom;
  const pearsonBase = calculatePearson(x, y);
  const { strength, direction, interpretation } = classifyCorrelation(r);
  return {
    method: "kendall", n: limit, r, rSquared: r * r,
    meanX: pearsonBase?.meanX ?? 0, meanY: pearsonBase?.meanY ?? 0,
    varianceX: pearsonBase?.varianceX ?? 0, varianceY: pearsonBase?.varianceY ?? 0,
    covariance: pearsonBase?.covariance ?? 0,
    slope: pearsonBase?.slope ?? 0, intercept: pearsonBase?.intercept ?? 0,
    strength, direction, interpretation,
  };
}

export function calculateCorrelation(x: number[], y: number[], method: CorrelationMethod): CorrelationResult | null {
  if (method === "pearson") return calculatePearson(x, y);
  if (method === "spearman") return calculateSpearman(x, y);
  return calculateKendall(x, y);
}

export function isKendallCapped(n: number): boolean {
  return n > KENDALL_MAX_N;
}

// ── Outlier detection (based on standardized residuals from the regression line) ──

export interface OutlierInfo {
  index: number;
  residual: number;
  zScore: number;
}

export function detectOutliers(x: number[], y: number[], slope: number, intercept: number): OutlierInfo[] {
  const n = x.length;
  if (n < 3) return [];
  const residuals = x.map((xi, i) => y[i] - (intercept + slope * xi));
  const rMean = mean(residuals);
  const rStd = Math.sqrt(residuals.reduce((a, r) => a + (r - rMean) ** 2, 0) / n) || 1;
  return residuals
    .map((r, i) => ({ index: i, residual: r, zScore: (r - rMean) / rStd }))
    .filter((o) => Math.abs(o.zScore) > 2);
}

// ── Data quality helpers ──

export function detectDuplicatePairs(x: number[], y: number[]): number {
  const seen = new Set<string>();
  let dupes = 0;
  for (let i = 0; i < x.length; i++) {
    const key = `${x[i]}|${y[i]}`;
    if (seen.has(key)) dupes++;
    else seen.add(key);
  }
  return dupes;
}

// ── CSV / Excel paste parsing ──

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

export function extractColumn(parsed: CSVParseResult, colIndex: number): string {
  return parsed.rows.map((r) => r[colIndex]).filter((v) => v !== undefined && v !== "").join("\n");
}

// ── Sample datasets ──

export interface SampleDataset {
  name: string;
  x: string;
  y: string;
}

export const SAMPLE_DATASETS: SampleDataset[] = [
  { name: "Perfect Positive", x: "10\n20\n30\n40\n50", y: "15\n25\n35\n45\n55" },
  { name: "Perfect Negative", x: "1\n2\n3\n4\n5", y: "10\n8\n6\n4\n2" },
  { name: "Advertising vs Sales", x: "120\n140\n150\n180\n200", y: "12\n14\n15\n18\n20" },
  { name: "Weak Correlation", x: "5\n12\n8\n19\n3\n14\n9\n17", y: "22\n18\n25\n15\n27\n19\n21\n16" },
  { name: "No Correlation", x: "1\n2\n3\n4\n5\n6\n7\n8", y: "50\n12\n38\n41\n9\n47\n23\n33" },
];

export function generateRandomDataset(): SampleDataset {
  const n = 12 + Math.floor(Math.random() * 15);
  const slope = (Math.random() - 0.5) * 6;
  const noise = 5 + Math.random() * 15;
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i < n; i++) {
    const xi = Math.round((Math.random() * 100) * 10) / 10;
    const u1 = Math.random(), u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const yi = Math.round((slope * xi + z * noise + 20) * 10) / 10;
    x.push(xi);
    y.push(yi);
  }
  return { name: "Random Dataset", x: x.join("\n"), y: y.join("\n") };
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

const INPUT_KEY = "correlation-coefficient-calculator-input";

export function saveInput(xText: string, yText: string, method: CorrelationMethod, decimals: number): void {
  try { localStorage.setItem(INPUT_KEY, JSON.stringify({ xText, yText, method, decimals })); } catch {}
}

export function loadInput(): { xText: string; yText: string; method: CorrelationMethod; decimals: number } | null {
  try {
    const raw = localStorage.getItem(INPUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── History ──

export interface HistoryEntry {
  id: string;
  timestamp: number;
  xText: string;
  yText: string;
  method: CorrelationMethod;
  result: CorrelationResult;
}

const HISTORY_KEY = "correlation-coefficient-calculator-history";

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

export function buildTextReport(result: CorrelationResult, x: number[], y: number[]): string {
  const ts = new Date().toLocaleString("en-US");
  const methodLabel = result.method === "pearson" ? "Pearson" : result.method === "spearman" ? "Spearman Rank" : "Kendall Tau";
  return [
    "Correlation Coefficient Calculator Report",
    "==========================================",
    `Generated: ${ts}`,
    `Method: ${methodLabel}`,
    "",
    `Sample Size (n): ${result.n}`,
    `Correlation Coefficient (r): ${formatNum(result.r)}`,
    `Coefficient of Determination (R²): ${formatNum(result.rSquared)}`,
    `Interpretation: ${result.interpretation}`,
    "",
    `Mean X: ${formatNum(result.meanX)}`,
    `Mean Y: ${formatNum(result.meanY)}`,
    `Variance X: ${formatNum(result.varianceX)}`,
    `Variance Y: ${formatNum(result.varianceY)}`,
    `Covariance: ${formatNum(result.covariance)}`,
    "",
    `Regression Line: Y = ${formatNum(result.intercept, 3)} + ${formatNum(result.slope, 3)}X`,
    "",
    `Dataset (X, Y):`,
    ...x.map((xi, i) => `${xi}, ${y[i]}`),
    "",
    "Generated by Correlation Coefficient Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: CorrelationResult, x: number[], y: number[]): string {
  const summary: [string, string][] = [
    ["Method", result.method],
    ["Sample Size", String(result.n)],
    ["Correlation Coefficient (r)", formatNum(result.r)],
    ["R Squared", formatNum(result.rSquared)],
    ["Mean X", formatNum(result.meanX)],
    ["Mean Y", formatNum(result.meanY)],
    ["Variance X", formatNum(result.varianceX)],
    ["Variance Y", formatNum(result.varianceY)],
    ["Covariance", formatNum(result.covariance)],
    ["Slope", formatNum(result.slope, 3)],
    ["Intercept", formatNum(result.intercept, 3)],
    ["Interpretation", result.interpretation],
  ];
  const lines = ["Metric,Value", ...summary.map(([k, v]) => `"${k}","${v}"`), "", "X,Y", ...x.map((xi, i) => `${xi},${y[i]}`)];
  return lines.join("\n");
}

export function buildJSONReport(result: CorrelationResult, x: number[], y: number[]): string {
  return JSON.stringify({ ...result, x, y, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: CorrelationResult): string {
  const methodLabel = result.method === "pearson" ? "Pearson" : result.method === "spearman" ? "Spearman Rank" : "Kendall Tau";
  return `<!DOCTYPE html><html><head><title>Correlation Report</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111} h1{font-size:20px} table{border-collapse:collapse;width:100%;margin-top:16px} td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}</style>
  </head><body>
  <h1>Correlation Coefficient Report</h1>
  <p>Generated: ${new Date().toLocaleString("en-US")}</p>
  <p>Method: ${methodLabel}</p>
  <table>
    <tr><td>Correlation Coefficient (r)</td><td>${formatNum(result.r)}</td></tr>
    <tr><td>Coefficient of Determination (R²)</td><td>${formatNum(result.rSquared)}</td></tr>
    <tr><td>Interpretation</td><td>${result.interpretation}</td></tr>
    <tr><td>Sample Size</td><td>${result.n}</td></tr>
    <tr><td>Mean X</td><td>${formatNum(result.meanX)}</td></tr>
    <tr><td>Mean Y</td><td>${formatNum(result.meanY)}</td></tr>
    <tr><td>Regression Line</td><td>Y = ${formatNum(result.intercept, 3)} + ${formatNum(result.slope, 3)}X</td></tr>
  </table>
  </body></html>`;
}
