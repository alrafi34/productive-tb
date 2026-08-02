// ── A/B Test Calculator Logic (Two-Proportion Z-Test) ──

export type TestType = "two-tailed" | "one-tailed";

export interface Variant {
  visitors: number;
  conversions: number;
}

export interface ABTestInputs {
  a: Variant;
  b: Variant;
  confidenceLevel: number; // 90, 95, 99
  testType: TestType;
}

export interface ABTestResult {
  inputs: ABTestInputs;
  crA: number | null; // conversion rate, 0–1
  crB: number | null;
  difference: number | null; // crB - crA
  lift: number | null; // percent
  pooledRate: number | null;
  standardError: number | null;
  zScore: number | null;
  pValue: number | null;
  zCritical: number | null;
  ciLower: number | null; // of the difference, 0–1 scale
  ciUpper: number | null;
  isSignificant: boolean;
  winner: "A" | "B" | "none";
  error: string | null;
}

// ── Standard normal CDF (Abramowitz & Stegun 7.1.26 approximation) ─────────

export function normalCDF(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

const Z_CRITICAL_TWO_TAILED: Record<number, number> = { 90: 1.645, 95: 1.960, 99: 2.576 };
const Z_CRITICAL_ONE_TAILED: Record<number, number> = { 90: 1.282, 95: 1.645, 99: 2.326 };

export function getZCritical(confidenceLevel: number, testType: TestType): number {
  const table = testType === "two-tailed" ? Z_CRITICAL_TWO_TAILED : Z_CRITICAL_ONE_TAILED;
  return table[confidenceLevel] ?? Z_CRITICAL_TWO_TAILED[95];
}

export function calculateABTest(inputs: ABTestInputs): ABTestResult {
  const { a, b, confidenceLevel, testType } = inputs;

  const base: ABTestResult = {
    inputs, crA: null, crB: null, difference: null, lift: null, pooledRate: null,
    standardError: null, zScore: null, pValue: null, zCritical: null,
    ciLower: null, ciUpper: null, isSignificant: false, winner: "none", error: null,
  };

  if (![a.visitors, a.conversions, b.visitors, b.conversions].every(Number.isFinite)) {
    return { ...base, error: "Please enter valid sample sizes." };
  }
  if (a.visitors <= 0 || b.visitors <= 0) {
    return { ...base, error: "Please enter valid sample sizes." };
  }
  if (a.conversions < 0 || b.conversions < 0) {
    return { ...base, error: "Please enter valid sample sizes." };
  }
  if (a.conversions > a.visitors || b.conversions > b.visitors) {
    return { ...base, error: "Conversions cannot be greater than total visitors." };
  }

  const crA = a.conversions / a.visitors;
  const crB = b.conversions / b.visitors;
  const difference = crB - crA;
  const lift = crA === 0 ? (crB === 0 ? 0 : Infinity) : (difference / crA) * 100;

  const pooledRate = (a.conversions + b.conversions) / (a.visitors + b.visitors);
  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / a.visitors + 1 / b.visitors));

  const zScore = standardError === 0 ? 0 : difference / standardError;

  // One-tailed p-value is the tail probability beyond |z|; two-tailed doubles it.
  const pValueFinal = standardError === 0
    ? 1
    : testType === "two-tailed"
      ? 2 * (1 - normalCDF(Math.abs(zScore)))
      : (1 - normalCDF(Math.abs(zScore)));

  const zCritical = getZCritical(confidenceLevel, testType);

  // Unpooled SE for the confidence interval of the difference
  const seUnpooled = Math.sqrt((crA * (1 - crA)) / a.visitors + (crB * (1 - crB)) / b.visitors);
  const ciLower = difference - zCritical * seUnpooled;
  const ciUpper = difference + zCritical * seUnpooled;

  const alpha = 1 - confidenceLevel / 100;
  const isSignificant = pValueFinal < alpha;
  const winner: "A" | "B" | "none" = !isSignificant ? "none" : difference > 0 ? "B" : "A";

  return {
    inputs, crA, crB, difference, lift, pooledRate, standardError,
    zScore, pValue: pValueFinal, zCritical, ciLower, ciUpper, isSignificant, winner, error: null,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatPct(n: number | null, precision = 2): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(precision)}%`;
}

export function formatSignedPct(n: number | null, precision = 2): string {
  if (n === null || !Number.isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(precision)}%`;
}

export function formatNum(n: number | null, precision = 4): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Sample data / presets ────────────────────────────────────────────────

export const SAMPLE_EXAMPLES: { label: string; a: Variant; b: Variant }[] = [
  { label: "Landing Page Redesign", a: { visitors: 10000, conversions: 420 }, b: { visitors: 10200, conversions: 510 } },
  { label: "No Significant Difference", a: { visitors: 3500, conversions: 210 }, b: { visitors: 3450, conversions: 214 } },
  { label: "Checkout Button Color", a: { visitors: 50000, conversions: 2300 }, b: { visitors: 51000, conversions: 2520 } },
  { label: "Email Subject Line", a: { visitors: 8000, conversions: 960 }, b: { visitors: 8100, conversions: 1053 } },
];

export const DEFAULT_A: Variant = { visitors: 10000, conversions: 420 };
export const DEFAULT_B: Variant = { visitors: 10200, conversions: 510 };
export const DEFAULT_CONFIDENCE = 95;
export const DEFAULT_TEST_TYPE: TestType = "two-tailed";
export const DEFAULT_PRECISION = 4;

// ── Shareable URL ─────────────────────────────────────────────────────────

export function buildShareUrl(inputs: ABTestInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("av", String(inputs.a.visitors));
  url.searchParams.set("ac", String(inputs.a.conversions));
  url.searchParams.set("bv", String(inputs.b.visitors));
  url.searchParams.set("bc", String(inputs.b.conversions));
  url.searchParams.set("cl", String(inputs.confidenceLevel));
  url.searchParams.set("tt", inputs.testType);
  return url.toString();
}

export function parseShareParams(): ABTestInputs | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const av = p.get("av"), ac = p.get("ac"), bv = p.get("bv"), bc = p.get("bc");
  if (av === null || ac === null || bv === null || bc === null) return null;
  return {
    a: { visitors: parseFloat(av), conversions: parseFloat(ac) },
    b: { visitors: parseFloat(bv), conversions: parseFloat(bc) },
    confidenceLevel: parseFloat(p.get("cl") ?? "") || DEFAULT_CONFIDENCE,
    testType: p.get("tt") === "one-tailed" ? "one-tailed" : "two-tailed",
  };
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ABTestInputs;
  isSignificant: boolean;
  winner: "A" | "B" | "none";
}

const STORAGE_KEY = "ab-test-calculator-history";

export function saveHistory(result: ABTestResult): void {
  if (result.error) return;
  const history = getHistory();
  const newEntry: HistoryEntry = {
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
    inputs: result.inputs,
    isSignificant: result.isSignificant,
    winner: result.winner,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: ABTestResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { inputs } = result;
  const lines = [
    "A/B Test Analysis Report",
    "=========================",
    `Generated: ${ts}`,
    "",
    `Variant A — Visitors: ${inputs.a.visitors.toLocaleString("en-US")}, Conversions: ${inputs.a.conversions.toLocaleString("en-US")}`,
    `Variant B — Visitors: ${inputs.b.visitors.toLocaleString("en-US")}, Conversions: ${inputs.b.conversions.toLocaleString("en-US")}`,
    `Confidence Level: ${inputs.confidenceLevel}%`,
    `Test Type: ${inputs.testType === "two-tailed" ? "Two-tailed" : "One-tailed"}`,
    "",
    `Conversion Rate A: ${formatPct(result.crA, 2)}`,
    `Conversion Rate B: ${formatPct(result.crB, 2)}`,
    `Absolute Difference: ${formatPct(result.difference, 2)}`,
    `Relative Lift: ${formatSignedPct(result.lift, 2)}`,
    `Z-score: ${formatNum(result.zScore, precision)}`,
    `P-value: ${formatNum(result.pValue, precision)}`,
    `Confidence Interval of Difference: ${formatPct(result.ciLower, 2)} to ${formatPct(result.ciUpper, 2)}`,
    "",
    `Result: ${result.isSignificant ? "Statistically Significant" : "Not Statistically Significant"}`,
    `Winner: ${result.winner === "none" ? "No clear winner" : `Variant ${result.winner}`}`,
    "",
    "Formula: Z = (CRb − CRa) / SE, SE = √(p(1−p)(1/na + 1/nb))",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: ABTestResult, precision: number): string {
  const { inputs } = result;
  const rows: (string | number)[][] = [
    ["Field", "Value"],
    ["Variant A Visitors", inputs.a.visitors],
    ["Variant A Conversions", inputs.a.conversions],
    ["Variant B Visitors", inputs.b.visitors],
    ["Variant B Conversions", inputs.b.conversions],
    ["Confidence Level (%)", inputs.confidenceLevel],
    ["Test Type", inputs.testType],
    ["Conversion Rate A", formatPct(result.crA, 2)],
    ["Conversion Rate B", formatPct(result.crB, 2)],
    ["Absolute Difference", formatPct(result.difference, 2)],
    ["Relative Lift (%)", formatSignedPct(result.lift, 2)],
    ["Z-score", formatNum(result.zScore, precision)],
    ["P-value", formatNum(result.pValue, precision)],
    ["CI Lower", formatPct(result.ciLower, 2)],
    ["CI Upper", formatPct(result.ciUpper, 2)],
    ["Statistically Significant", result.isSignificant ? "Yes" : "No"],
    ["Winner", result.winner === "none" ? "No clear winner" : `Variant ${result.winner}`],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ABTestResult): string {
  return JSON.stringify(
    {
      variantA: result.inputs.a,
      variantB: result.inputs.b,
      confidenceLevel: result.inputs.confidenceLevel,
      testType: result.inputs.testType,
      conversionRateA: result.crA,
      conversionRateB: result.crB,
      difference: result.difference,
      liftPercent: result.lift,
      zScore: result.zScore,
      pValue: result.pValue,
      confidenceInterval: { lower: result.ciLower, upper: result.ciUpper },
      isSignificant: result.isSignificant,
      winner: result.winner,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ABTestResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const { inputs } = result;
  return `<!DOCTYPE html><html><head><title>A/B Test Analysis Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>A/B Test Analysis Report</h1>
    <p class="meta">Generated ${ts}</p>
    <table>
      <tr><td>Result</td><td><strong>${result.isSignificant ? "Statistically Significant" : "Not Statistically Significant"}</strong></td></tr>
      <tr><td>Winner</td><td>${result.winner === "none" ? "No clear winner" : `Variant ${result.winner}`}</td></tr>
      <tr><td>Variant A</td><td>${inputs.a.conversions.toLocaleString("en-US")} / ${inputs.a.visitors.toLocaleString("en-US")} (${formatPct(result.crA, 2)})</td></tr>
      <tr><td>Variant B</td><td>${inputs.b.conversions.toLocaleString("en-US")} / ${inputs.b.visitors.toLocaleString("en-US")} (${formatPct(result.crB, 2)})</td></tr>
      <tr><td>Relative Lift</td><td>${formatSignedPct(result.lift, 2)}</td></tr>
      <tr><td>Z-score</td><td>${formatNum(result.zScore, precision)}</td></tr>
      <tr><td>P-value</td><td>${formatNum(result.pValue, precision)}</td></tr>
      <tr><td>Confidence Interval</td><td>${formatPct(result.ciLower, 2)} to ${formatPct(result.ciUpper, 2)}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
