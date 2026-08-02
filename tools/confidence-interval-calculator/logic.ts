// ── Confidence Interval Calculator Logic ──

export type CalcType = "mean-known" | "mean-unknown" | "proportion" | "margin-of-error" | "sample-size";
export type MoeBasis = "mean-known" | "mean-unknown" | "proportion";
export type SampleSizeBasis = "mean" | "proportion";

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

// Peter Acklam's rational approximation for the inverse standard normal CDF (probit).
export function invNorm(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0, -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0, 3.754408661907416e0];
  const plow = 0.02425, phigh = 1 - plow;
  let q: number, r: number;
  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= phigh) {
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
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

export function regularizedIncompleteBeta(x: number, a: number, b: number): number {
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

// Bisection inverse of the Student's t CDF — monotonic, so this converges reliably.
export function invT(p: number, df: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;
  let lo = -1000, hi = 1000;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (studentTCDF(mid, df) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// ── Confidence level → critical value ───────────────────────────────────────

export function zCritical(confidenceLevel: number): number {
  const alpha = 1 - confidenceLevel / 100;
  return invNorm(1 - alpha / 2);
}

export function tCritical(confidenceLevel: number, df: number): number {
  const alpha = 1 - confidenceLevel / 100;
  return invT(1 - alpha / 2, df);
}

export const CONFIDENCE_PRESETS = [80, 85, 90, 95, 98, 99];

// ── Result types ─────────────────────────────────────────────────────────────

export interface CIResult {
  calcType: CalcType;
  confidenceLevel: number;
  criticalValue: number;
  criticalValueType: "Z" | "t";
  degreesOfFreedom: number | null;
  standardError: number;
  marginOfError: number;
  center: number | null;
  lower: number | null;
  upper: number | null;
  sampleSize: number;
  requiredSampleSize: number | null;
  error: string | null;
}

function baseResult(calcType: CalcType, confidenceLevel: number, sampleSize: number): CIResult {
  return {
    calcType, confidenceLevel, criticalValue: 0, criticalValueType: "Z", degreesOfFreedom: null,
    standardError: 0, marginOfError: 0, center: null, lower: null, upper: null,
    sampleSize, requiredSampleSize: null, error: null,
  };
}

function withError(calcType: CalcType, confidenceLevel: number, sampleSize: number, error: string): CIResult {
  return { ...baseResult(calcType, confidenceLevel, sampleSize), error };
}

function validateConfidence(confidenceLevel: number): string | null {
  if (!Number.isFinite(confidenceLevel) || confidenceLevel <= 0 || confidenceLevel >= 100) {
    return "Confidence level must be between 0 and 100 (exclusive).";
  }
  return null;
}

// A. Mean — Known Population Standard Deviation
export function calcMeanKnown(params: { sampleMean: number; popStdDev: number; sampleSize: number; confidenceLevel: number }): CIResult {
  const { sampleMean, popStdDev, sampleSize, confidenceLevel } = params;
  const confErr = validateConfidence(confidenceLevel);
  if (confErr) return withError("mean-known", confidenceLevel, sampleSize, confErr);
  if (![sampleMean, popStdDev, sampleSize].every(Number.isFinite)) return withError("mean-known", confidenceLevel, sampleSize, "Enter valid numbers for all fields.");
  if (sampleSize < 1 || !Number.isInteger(sampleSize)) return withError("mean-known", confidenceLevel, sampleSize, "Sample size must be a positive whole number.");
  if (popStdDev <= 0) return withError("mean-known", confidenceLevel, sampleSize, "Population standard deviation must be greater than zero.");

  const z = zCritical(confidenceLevel);
  const se = popStdDev / Math.sqrt(sampleSize);
  const moe = z * se;
  const result = baseResult("mean-known", confidenceLevel, sampleSize);
  return { ...result, criticalValue: z, criticalValueType: "Z", standardError: se, marginOfError: moe, center: sampleMean, lower: sampleMean - moe, upper: sampleMean + moe };
}

// B. Mean — Unknown Population Standard Deviation (Student's t)
export function calcMeanUnknown(params: { sampleMean: number; sampleStdDev: number; sampleSize: number; confidenceLevel: number }): CIResult {
  const { sampleMean, sampleStdDev, sampleSize, confidenceLevel } = params;
  const confErr = validateConfidence(confidenceLevel);
  if (confErr) return withError("mean-unknown", confidenceLevel, sampleSize, confErr);
  if (![sampleMean, sampleStdDev, sampleSize].every(Number.isFinite)) return withError("mean-unknown", confidenceLevel, sampleSize, "Enter valid numbers for all fields.");
  if (sampleSize < 2 || !Number.isInteger(sampleSize)) return withError("mean-unknown", confidenceLevel, sampleSize, "Sample size must be a whole number of at least 2.");
  if (sampleStdDev <= 0) return withError("mean-unknown", confidenceLevel, sampleSize, "Sample standard deviation must be greater than zero.");

  const df = sampleSize - 1;
  const t = tCritical(confidenceLevel, df);
  const se = sampleStdDev / Math.sqrt(sampleSize);
  const moe = t * se;
  const result = baseResult("mean-unknown", confidenceLevel, sampleSize);
  return { ...result, criticalValue: t, criticalValueType: "t", degreesOfFreedom: df, standardError: se, marginOfError: moe, center: sampleMean, lower: sampleMean - moe, upper: sampleMean + moe };
}

// C. Population Proportion
export function calcProportion(params: { sampleProportion: number; sampleSize: number; confidenceLevel: number }): CIResult {
  const { sampleProportion, sampleSize, confidenceLevel } = params;
  const confErr = validateConfidence(confidenceLevel);
  if (confErr) return withError("proportion", confidenceLevel, sampleSize, confErr);
  if (![sampleProportion, sampleSize].every(Number.isFinite)) return withError("proportion", confidenceLevel, sampleSize, "Enter valid numbers for all fields.");
  if (sampleSize < 1 || !Number.isInteger(sampleSize)) return withError("proportion", confidenceLevel, sampleSize, "Sample size must be a positive whole number.");
  if (sampleProportion < 0 || sampleProportion > 1) return withError("proportion", confidenceLevel, sampleSize, "Sample proportion must be between 0 and 1.");

  const z = zCritical(confidenceLevel);
  const se = Math.sqrt((sampleProportion * (1 - sampleProportion)) / sampleSize);
  const moe = z * se;
  const result = baseResult("proportion", confidenceLevel, sampleSize);
  return { ...result, criticalValue: z, criticalValueType: "Z", standardError: se, marginOfError: moe, center: sampleProportion, lower: sampleProportion - moe, upper: sampleProportion + moe };
}

// D. Margin of Error (standalone — no center value required)
export function calcMarginOfError(params: { basis: MoeBasis; stdDev: number; proportion: number; sampleSize: number; confidenceLevel: number }): CIResult {
  const { basis, stdDev, proportion, sampleSize, confidenceLevel } = params;
  const confErr = validateConfidence(confidenceLevel);
  if (confErr) return withError("margin-of-error", confidenceLevel, sampleSize, confErr);
  if (sampleSize < 1 || !Number.isInteger(sampleSize)) return withError("margin-of-error", confidenceLevel, sampleSize, "Sample size must be a positive whole number.");

  if (basis === "proportion") {
    if (!Number.isFinite(proportion) || proportion < 0 || proportion > 1) return withError("margin-of-error", confidenceLevel, sampleSize, "Sample proportion must be between 0 and 1.");
    const z = zCritical(confidenceLevel);
    const se = Math.sqrt((proportion * (1 - proportion)) / sampleSize);
    const result = baseResult("margin-of-error", confidenceLevel, sampleSize);
    return { ...result, criticalValue: z, criticalValueType: "Z", standardError: se, marginOfError: z * se, center: proportion };
  }

  if (!Number.isFinite(stdDev) || stdDev <= 0) return withError("margin-of-error", confidenceLevel, sampleSize, "Standard deviation must be greater than zero.");
  const se = stdDev / Math.sqrt(sampleSize);
  if (basis === "mean-unknown") {
    if (sampleSize < 2) return withError("margin-of-error", confidenceLevel, sampleSize, "Sample size must be at least 2 when using the sample standard deviation.");
    const df = sampleSize - 1;
    const t = tCritical(confidenceLevel, df);
    const result = baseResult("margin-of-error", confidenceLevel, sampleSize);
    return { ...result, criticalValue: t, criticalValueType: "t", degreesOfFreedom: df, standardError: se, marginOfError: t * se };
  }
  const z = zCritical(confidenceLevel);
  const result = baseResult("margin-of-error", confidenceLevel, sampleSize);
  return { ...result, criticalValue: z, criticalValueType: "Z", standardError: se, marginOfError: z * se };
}

// E. Sample Size Estimator
export function calcSampleSize(params: { basis: SampleSizeBasis; marginOfError: number; stdDev: number; proportion: number; confidenceLevel: number }): CIResult {
  const { basis, marginOfError, stdDev, proportion, confidenceLevel } = params;
  const confErr = validateConfidence(confidenceLevel);
  if (confErr) return withError("sample-size", confidenceLevel, 0, confErr);
  if (!Number.isFinite(marginOfError) || marginOfError <= 0) return withError("sample-size", confidenceLevel, 0, "Margin of error must be greater than zero.");

  const z = zCritical(confidenceLevel);
  let n: number;
  if (basis === "proportion") {
    if (!Number.isFinite(proportion) || proportion < 0 || proportion > 1) return withError("sample-size", confidenceLevel, 0, "Estimated proportion must be between 0 and 1.");
    n = (z * z * proportion * (1 - proportion)) / (marginOfError * marginOfError);
  } else {
    if (!Number.isFinite(stdDev) || stdDev <= 0) return withError("sample-size", confidenceLevel, 0, "Standard deviation must be greater than zero.");
    n = Math.pow((z * stdDev) / marginOfError, 2);
  }
  const required = Math.ceil(n);
  const result = baseResult("sample-size", confidenceLevel, required);
  return { ...result, criticalValue: z, criticalValueType: "Z", marginOfError, requiredSampleSize: required, center: basis === "proportion" ? proportion : stdDev };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const PRECISION_OPTIONS = [2, 3, 4, 5];
export const DEFAULT_PRECISION = 2;

// ── Presets (real-world examples, matching the tool spec) ──────────────────────

export const PRESETS = {
  "mean-known": { sampleMean: 100, popStdDev: 15, sampleSize: 100, confidenceLevel: 90 },
  "mean-unknown": { sampleMean: 75, sampleStdDev: 12, sampleSize: 64, confidenceLevel: 95 },
  proportion: { sampleProportion: 0.62, sampleSize: 500, confidenceLevel: 99 },
  "margin-of-error": { stdDev: 12, proportion: 0.5, sampleSize: 64, confidenceLevel: 95 },
  "sample-size": { marginOfError: 0.05, stdDev: 15, proportion: 0.5, confidenceLevel: 95 },
} as const;

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  precision: number;
  result: CIResult;
}

const STORAGE_KEY = "confidence-interval-calculator-history";

export function saveHistory(result: CIResult, precision: number): void {
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
  calcType: CalcType;
  confidenceLevel: number;
  precision: number;
  sampleMean: string;
  popStdDev: string;
  sampleStdDev: string;
  sampleProportion: string;
  sampleSize: string;
  moeBasis: MoeBasis;
  ssBasis: SampleSizeBasis;
  marginOfErrorInput: string;
}

export function buildShareUrl(state: ShareState): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  const p = url.searchParams;
  p.set("type", state.calcType);
  p.set("cl", String(state.confidenceLevel));
  p.set("prec", String(state.precision));
  p.set("mean", state.sampleMean);
  p.set("popsd", state.popStdDev);
  p.set("samplesd", state.sampleStdDev);
  p.set("prop", state.sampleProportion);
  p.set("n", state.sampleSize);
  p.set("moebasis", state.moeBasis);
  p.set("ssbasis", state.ssBasis);
  p.set("moe", state.marginOfErrorInput);
  return url.toString();
}

export function parseShareParams(): ShareState | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const type = p.get("type");
  if (!type) return null;
  return {
    calcType: (type as CalcType) ?? "mean-unknown",
    confidenceLevel: parseFloat(p.get("cl") ?? "95") || 95,
    precision: parseInt(p.get("prec") ?? "2", 10) || 2,
    sampleMean: p.get("mean") ?? "",
    popStdDev: p.get("popsd") ?? "",
    sampleStdDev: p.get("samplesd") ?? "",
    sampleProportion: p.get("prop") ?? "",
    sampleSize: p.get("n") ?? "",
    moeBasis: (p.get("moebasis") as MoeBasis) ?? "mean-unknown",
    ssBasis: (p.get("ssbasis") as SampleSizeBasis) ?? "proportion",
    marginOfErrorInput: p.get("moe") ?? "",
  };
}

// ── Export helpers ────────────────────────────────────────────────────────────

const CALC_TYPE_LABELS: Record<CalcType, string> = {
  "mean-known": "Confidence Interval for Mean (Known σ)",
  "mean-unknown": "Confidence Interval for Mean (Unknown σ)",
  proportion: "Confidence Interval for Proportion",
  "margin-of-error": "Margin of Error",
  "sample-size": "Required Sample Size",
};

export function buildTextReport(result: CIResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Confidence Interval Calculation Report",
    "========================================",
    `Generated: ${ts}`,
    "",
    `Calculation Type: ${CALC_TYPE_LABELS[result.calcType]}`,
    `Confidence Level: ${result.confidenceLevel}%`,
    `Sample Size: ${result.sampleSize}`,
  ];
  if (result.degreesOfFreedom !== null) lines.push(`Degrees of Freedom: ${result.degreesOfFreedom}`);
  lines.push(`Critical Value (${result.criticalValueType}): ${formatNum(result.criticalValue, precision)}`);
  if (result.standardError) lines.push(`Standard Error: ${formatNum(result.standardError, precision)}`);
  if (result.marginOfError) lines.push(`Margin of Error: ${formatNum(result.marginOfError, precision)}`);
  if (result.lower !== null && result.upper !== null) {
    lines.push(`Confidence Interval: ${formatNum(result.lower, precision)} to ${formatNum(result.upper, precision)}`);
  }
  if (result.requiredSampleSize !== null) lines.push(`Required Sample Size: ${result.requiredSampleSize}`);
  lines.push("", "Generated by Productive Toolbox — https://productivetoolbox.com");
  return lines.join("\n");
}

export function buildCSVReport(result: CIResult, precision: number): string {
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Calculation Type", CALC_TYPE_LABELS[result.calcType]],
    ["Confidence Level", `${result.confidenceLevel}%`],
    ["Sample Size", result.sampleSize],
    ["Degrees of Freedom", result.degreesOfFreedom ?? ""],
    ["Critical Value", `${result.criticalValueType} = ${formatNum(result.criticalValue, precision)}`],
    ["Standard Error", formatNum(result.standardError, precision)],
    ["Margin of Error", formatNum(result.marginOfError, precision)],
    ["Lower Limit", formatNum(result.lower, precision)],
    ["Upper Limit", formatNum(result.upper, precision)],
    ["Required Sample Size", result.requiredSampleSize ?? ""],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: CIResult): string {
  return JSON.stringify({ ...result, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildPrintHTML(result: CIResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const ciRow = result.lower !== null && result.upper !== null
    ? `<tr><td>Confidence Interval</td><td><strong>${formatNum(result.lower, precision)} to ${formatNum(result.upper, precision)}</strong></td></tr>`
    : "";
  const ssRow = result.requiredSampleSize !== null
    ? `<tr><td>Required Sample Size</td><td><strong>${result.requiredSampleSize}</strong></td></tr>`
    : "";
  return `<!DOCTYPE html><html><head><title>Confidence Interval Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>${CALC_TYPE_LABELS[result.calcType]}</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      ${ciRow}
      ${ssRow}
      <tr><td>Confidence Level</td><td>${result.confidenceLevel}%</td></tr>
      <tr><td>Sample Size</td><td>${result.sampleSize}</td></tr>
      <tr><td>Critical Value (${result.criticalValueType})</td><td>${formatNum(result.criticalValue, precision)}</td></tr>
      <tr><td>Standard Error</td><td>${formatNum(result.standardError, precision)}</td></tr>
      <tr><td>Margin of Error</td><td>${formatNum(result.marginOfError, precision)}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
