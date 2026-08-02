// ── P-Value Calculator Logic ──

export type TestType = "z" | "t1" | "t2" | "tpaired" | "chisq" | "correlation" | "f";
export type TailType = "left" | "right" | "two";

// ── Statistical math helpers ────────────────────────────────────────────────

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}

export function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function lgamma(x: number): number {
  const g = 7;
  const coeff = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = coeff[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += coeff[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function betacf(x: number, a: number, b: number): number {
  const MAXIT = 200, EPS = 3e-9, FPMIN = 1e-300;
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1, d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c; h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}

function regularizedIncompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  if (x < (a + 1) / (a + b + 2)) return (bt * betacf(x, a, b)) / a;
  return 1 - (bt * betacf(1 - x, b, a)) / b;
}

export function studentTCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  const ib = regularizedIncompleteBeta(x, df / 2, 0.5);
  return t >= 0 ? 1 - 0.5 * ib : 0.5 * ib;
}

function gser(a: number, x: number): number {
  const ITMAX = 200, EPS = 3e-9;
  if (x <= 0) return 0;
  let ap = a, sum = 1 / a, del = sum;
  for (let n = 1; n <= ITMAX; n++) {
    ap += 1; del *= x / ap; sum += del;
    if (Math.abs(del) < Math.abs(sum) * EPS) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
}

function gcf(a: number, x: number): number {
  const ITMAX = 200, EPS = 3e-9, FPMIN = 1e-300;
  let b = x + 1 - a, c = 1 / FPMIN, d = 1 / b, h = d;
  for (let i = 1; i <= ITMAX; i++) {
    const an = -i * (i - a);
    b += 2; d = an * d + b; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = b + an / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}

function regularizedLowerIncompleteGamma(a: number, x: number): number {
  if (x < 0 || a <= 0) return 0;
  if (x === 0) return 0;
  if (x < a + 1) return gser(a, x);
  return 1 - gcf(a, x);
}

export function chiSquareCDF(x: number, df: number): number {
  if (x <= 0) return 0;
  return regularizedLowerIncompleteGamma(df / 2, x / 2);
}

export function fCDF(x: number, d1: number, d2: number): number {
  if (x <= 0) return 0;
  const xt = (d1 * x) / (d1 * x + d2);
  return regularizedIncompleteBeta(xt, d1 / 2, d2 / 2);
}

// ── Test metadata ────────────────────────────────────────────────────────────

export const TEST_TYPES: { key: TestType; label: string; usesDf: boolean; usesTwoDf: boolean; usesTail: boolean; usesCorrelationInputs: boolean }[] = [
  { key: "z", label: "Z-Test", usesDf: false, usesTwoDf: false, usesTail: true, usesCorrelationInputs: false },
  { key: "t1", label: "One Sample T-Test", usesDf: true, usesTwoDf: false, usesTail: true, usesCorrelationInputs: false },
  { key: "t2", label: "Two Sample T-Test", usesDf: true, usesTwoDf: false, usesTail: true, usesCorrelationInputs: false },
  { key: "tpaired", label: "Paired T-Test", usesDf: true, usesTwoDf: false, usesTail: true, usesCorrelationInputs: false },
  { key: "chisq", label: "Chi-Square Test", usesDf: true, usesTwoDf: false, usesTail: false, usesCorrelationInputs: false },
  { key: "correlation", label: "Correlation Test", usesDf: false, usesTwoDf: false, usesTail: true, usesCorrelationInputs: true },
  { key: "f", label: "F-Test", usesDf: false, usesTwoDf: true, usesTail: false, usesCorrelationInputs: false },
];

export const ALPHA_PRESETS = [0.10, 0.05, 0.01];

// ── Result type ──────────────────────────────────────────────────────────────

export interface PValueResult {
  testType: TestType;
  tail: TailType;
  statistic: number;
  df: number | null;
  df2: number | null;
  alpha: number;
  pValue: number | null;
  significant: boolean | null;
  error: string | null;
}

function withError(testType: TestType, tail: TailType, statistic: number, alpha: number, error: string): PValueResult {
  return { testType, tail, statistic, df: null, df2: null, alpha, pValue: null, significant: null, error };
}

function tailedP(cdf: number, tail: TailType, statistic: number): number {
  if (tail === "left") return cdf;
  if (tail === "right") return 1 - cdf;
  // two-tailed, symmetric distribution
  const oneTail = statistic >= 0 ? 1 - cdf : cdf;
  return Math.min(1, 2 * oneTail);
}

export interface PValueInputs {
  testType: TestType;
  tail: TailType;
  statistic: number;
  df: number;
  df2: number;
  correlationR: number;
  correlationN: number;
  alpha: number;
}

export function calculatePValue(inputs: PValueInputs): PValueResult {
  const { testType, tail, alpha } = inputs;

  if (!Number.isFinite(alpha) || alpha <= 0 || alpha >= 1) {
    return withError(testType, tail, inputs.statistic, alpha, "Significance level (α) must be between 0 and 1.");
  }

  if (testType === "z") {
    const z = inputs.statistic;
    if (!Number.isFinite(z)) return withError(testType, tail, z, alpha, "Enter a valid test statistic.");
    const p = tailedP(normalCDF(z), tail, z);
    return finalize(testType, tail, z, null, null, alpha, p);
  }

  if (testType === "t1" || testType === "t2" || testType === "tpaired") {
    const t = inputs.statistic, df = inputs.df;
    if (!Number.isFinite(t)) return withError(testType, tail, t, alpha, "Enter a valid test statistic.");
    if (!Number.isFinite(df) || df < 1 || !Number.isInteger(df)) return withError(testType, tail, t, alpha, "Degrees of freedom must be a whole number of at least 1.");
    const p = tailedP(studentTCDF(t, df), tail, t);
    return finalize(testType, tail, t, df, null, alpha, p);
  }

  if (testType === "chisq") {
    const x = inputs.statistic, df = inputs.df;
    if (!Number.isFinite(x) || x < 0) return withError(testType, tail, x, alpha, "Chi-square statistic must be zero or greater.");
    if (!Number.isFinite(df) || df < 1 || !Number.isInteger(df)) return withError(testType, tail, x, alpha, "Degrees of freedom must be a whole number of at least 1.");
    const p = 1 - chiSquareCDF(x, df);
    return finalize(testType, "right", x, df, null, alpha, p);
  }

  if (testType === "f") {
    const x = inputs.statistic, d1 = inputs.df, d2 = inputs.df2;
    if (!Number.isFinite(x) || x < 0) return withError(testType, tail, x, alpha, "F statistic must be zero or greater.");
    if (!Number.isFinite(d1) || d1 < 1 || !Number.isInteger(d1)) return withError(testType, tail, x, alpha, "Numerator degrees of freedom must be a whole number of at least 1.");
    if (!Number.isFinite(d2) || d2 < 1 || !Number.isInteger(d2)) return withError(testType, tail, x, alpha, "Denominator degrees of freedom must be a whole number of at least 1.");
    const p = 1 - fCDF(x, d1, d2);
    return finalize(testType, "right", x, d1, d2, alpha, p);
  }

  // correlation
  const r = inputs.correlationR, n = inputs.correlationN;
  if (!Number.isFinite(r) || r < -1 || r > 1) return withError(testType, tail, r, alpha, "Correlation coefficient (r) must be between -1 and 1.");
  if (!Number.isFinite(n) || n < 3 || !Number.isInteger(n)) return withError(testType, tail, r, alpha, "Sample size must be a whole number of at least 3.");
  if (Math.abs(r) === 1) return withError(testType, tail, r, alpha, "Correlation of exactly ±1 is undefined for this test — the standard error is zero.");
  const df = n - 2;
  const t = (r * Math.sqrt(df)) / Math.sqrt(1 - r * r);
  const p = tailedP(studentTCDF(t, df), tail, t);
  return finalize(testType, tail, t, df, null, alpha, p);
}

function finalize(testType: TestType, tail: TailType, statistic: number, df: number | null, df2: number | null, alpha: number, pValue: number): PValueResult {
  const clamped = Math.min(1, Math.max(0, pValue));
  return { testType, tail, statistic, df, df2, alpha, pValue: clamped, significant: clamped <= alpha, error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatPValue(p: number | null, precision: number): string {
  if (p === null || !Number.isFinite(p)) return "—";
  if (p < Math.pow(10, -precision) && p > 0) return p.toExponential(2);
  return formatNum(p, precision);
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const PRECISION_OPTIONS = [2, 3, 4, 5, 6];
export const DEFAULT_PRECISION = 4;

export const TEST_TYPE_LABELS: Record<TestType, string> = {
  z: "Z-Test",
  t1: "One Sample T-Test",
  t2: "Two Sample T-Test",
  tpaired: "Paired T-Test",
  chisq: "Chi-Square Test",
  correlation: "Correlation Test",
  f: "F-Test",
};

export const TAIL_LABELS: Record<TailType, string> = {
  left: "Left-Tailed",
  right: "Right-Tailed",
  two: "Two-Tailed",
};

// ── Presets (matching the tool spec's real-world examples) ─────────────────────

export const PRESETS: Record<TestType, { statistic?: number; df?: number; df2?: number; correlationR?: number; correlationN?: number; tail: TailType }> = {
  z: { statistic: 2.31, tail: "two" },
  t1: { statistic: 1.12, df: 28, tail: "two" },
  t2: { statistic: 2.18, df: 18, tail: "two" },
  tpaired: { statistic: 2.18, df: 18, tail: "two" },
  chisq: { statistic: 11.45, df: 5, tail: "right" },
  correlation: { correlationR: 0.45, correlationN: 30, tail: "two" },
  f: { statistic: 3.2, df: 4, df2: 20, tail: "right" },
};

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  precision: number;
  result: PValueResult;
}

const STORAGE_KEY = "p-value-calculator-history";

export function saveHistory(result: PValueResult, precision: number): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), precision, result };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export interface ShareState {
  testType: TestType;
  tail: TailType;
  statistic: string;
  df: string;
  df2: string;
  correlationR: string;
  correlationN: string;
  alpha: string;
  precision: number;
}

export function buildShareUrl(state: ShareState): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  const p = url.searchParams;
  p.set("test", state.testType);
  p.set("tail", state.tail);
  p.set("stat", state.statistic);
  p.set("df", state.df);
  p.set("df2", state.df2);
  p.set("r", state.correlationR);
  p.set("n", state.correlationN);
  p.set("alpha", state.alpha);
  p.set("prec", String(state.precision));
  return url.toString();
}

export function parseShareParams(): ShareState | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const test = p.get("test");
  if (!test) return null;
  return {
    testType: test as TestType,
    tail: (p.get("tail") as TailType) ?? "two",
    statistic: p.get("stat") ?? "",
    df: p.get("df") ?? "",
    df2: p.get("df2") ?? "",
    correlationR: p.get("r") ?? "",
    correlationN: p.get("n") ?? "",
    alpha: p.get("alpha") ?? "0.05",
    precision: parseInt(p.get("prec") ?? "4", 10) || 4,
  };
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: PValueResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "P-Value Calculation Report",
    "===========================",
    `Generated: ${ts}`,
    "",
    `Test: ${TEST_TYPE_LABELS[result.testType]}`,
    `Tail: ${TAIL_LABELS[result.tail]}`,
    `Test Statistic: ${formatNum(result.statistic, precision)}`,
  ];
  if (result.df !== null) lines.push(`Degrees of Freedom: ${result.df}`);
  if (result.df2 !== null) lines.push(`Degrees of Freedom (denominator): ${result.df2}`);
  lines.push(
    `Significance Level (α): ${result.alpha}`,
    `P-Value: ${formatPValue(result.pValue, precision)}`,
    `Decision: ${result.significant ? "Reject Null Hypothesis" : "Fail to Reject Null Hypothesis"}`,
    `Interpretation: The observed result is ${result.significant ? "" : "not "}statistically significant at α = ${result.alpha}.`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com"
  );
  return lines.join("\n");
}

export function buildCSVReport(result: PValueResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Test", TEST_TYPE_LABELS[result.testType]],
    ["Tail", TAIL_LABELS[result.tail]],
    ["Test Statistic", formatNum(result.statistic, precision)],
    ["Degrees of Freedom", result.df ?? ""],
    ["Degrees of Freedom (denominator)", result.df2 ?? ""],
    ["Alpha", result.alpha],
    ["P-Value", formatPValue(result.pValue, precision)],
    ["Decision", result.significant ? "Reject Null Hypothesis" : "Fail to Reject Null Hypothesis"],
    ["Timestamp", new Date().toISOString()],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: PValueResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: PValueResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>P-Value Calculation Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>P-Value Calculation Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Test</td><td>${TEST_TYPE_LABELS[result.testType]}</td></tr>
      <tr><td>P-Value</td><td><strong>${formatPValue(result.pValue, precision)}</strong></td></tr>
      <tr><td>Decision</td><td>${result.significant ? "Reject Null Hypothesis" : "Fail to Reject Null Hypothesis"}</td></tr>
      <tr><td>Test Statistic</td><td>${formatNum(result.statistic, precision)}</td></tr>
      <tr><td>Degrees of Freedom</td><td>${result.df ?? "—"}</td></tr>
      <tr><td>Significance Level (α)</td><td>${result.alpha}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#374151;">The observed result is ${result.significant ? "" : "not "}statistically significant at α = ${result.alpha}.</p>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
