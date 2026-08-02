// ── Chi-Square Calculator Logic ──

export type TestMode = "goodness-of-fit" | "independence";

// ── Gamma / incomplete gamma (for chi-square p-value) ──────────────────────

function logGamma(x: number): number {
  const cof = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < cof.length; i++) a += cof[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

// Regularized upper incomplete gamma Q(a, x) — used for the chi-square p-value.
function gammaQ(a: number, x: number): number {
  if (x < 0 || a <= 0) return NaN;
  if (x === 0) return 1;
  if (x < a + 1) {
    return 1 - gammaSeriesP(a, x);
  }
  return gammaContinuedFractionQ(a, x);
}

function gammaSeriesP(a: number, x: number): number {
  const gln = logGamma(a);
  let ap = a;
  let sum = 1 / a;
  let del = sum;
  for (let n = 1; n <= 200; n++) {
    ap += 1;
    del *= x / ap;
    sum += del;
    if (Math.abs(del) < Math.abs(sum) * 1e-14) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - gln);
}

function gammaContinuedFractionQ(a: number, x: number): number {
  const gln = logGamma(a);
  const FPMIN = 1e-300;
  let b = x + 1 - a;
  let c = 1 / FPMIN;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i <= 200; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = b + an / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-14) break;
  }
  return Math.exp(-x + a * Math.log(x) - gln) * h;
}

export function chiSquarePValue(chi2: number, df: number): number {
  if (df <= 0 || !Number.isFinite(chi2) || chi2 < 0) return NaN;
  if (chi2 === 0) return 1;
  const p = gammaQ(df / 2, chi2 / 2);
  return Math.min(1, Math.max(0, p));
}

// ── Goodness of Fit ──────────────────────────────────────────────────────

export interface GoodnessRow {
  label: string;
  observed: number;
  expected: number;
}

export interface GoodnessResult {
  chi2: number;
  df: number;
  pValue: number;
  contributions: number[];
  isSignificant: boolean;
  lowExpectedWarning: boolean;
  error: string | null;
}

export function calculateGoodnessOfFit(rows: GoodnessRow[], alpha: number): GoodnessResult {
  const base: GoodnessResult = { chi2: 0, df: 0, pValue: 1, contributions: [], isSignificant: false, lowExpectedWarning: false, error: null };

  if (rows.length < 2) return { ...base, error: "Enter at least two categories." };
  for (const r of rows) {
    if (!Number.isFinite(r.observed) || !Number.isFinite(r.expected)) return { ...base, error: "Please enter valid numeric values for every cell." };
    if (r.observed < 0 || r.expected < 0) return { ...base, error: "Frequencies cannot be negative." };
    if (r.expected === 0) return { ...base, error: "Expected frequency cannot be zero." };
  }

  const contributions = rows.map((r) => ((r.observed - r.expected) ** 2) / r.expected);
  const chi2 = contributions.reduce((s, c) => s + c, 0);
  const df = rows.length - 1;
  const pValue = chiSquarePValue(chi2, df);
  const isSignificant = pValue < alpha;
  const lowExpectedWarning = rows.some((r) => r.expected < 5);

  return { chi2, df, pValue, contributions, isSignificant, lowExpectedWarning, error: null };
}

// ── Test of Independence ────────────────────────────────────────────────

export interface IndependenceResult {
  observed: number[][];
  expected: number[][];
  contributions: number[][];
  residuals: number[][];
  rowTotals: number[];
  colTotals: number[];
  grandTotal: number;
  chi2: number;
  df: number;
  pValue: number;
  cramersV: number;
  isSignificant: boolean;
  lowExpectedWarning: boolean;
  error: string | null;
}

export function calculateIndependence(observed: number[][], alpha: number): IndependenceResult {
  const base: IndependenceResult = {
    observed, expected: [], contributions: [], residuals: [], rowTotals: [], colTotals: [], grandTotal: 0,
    chi2: 0, df: 0, pValue: 1, cramersV: 0, isSignificant: false, lowExpectedWarning: false, error: null,
  };

  const rows = observed.length;
  const cols = rows > 0 ? observed[0].length : 0;
  if (rows < 2 || cols < 2) return { ...base, error: "Enter at least a 2×2 table." };

  for (const row of observed) {
    for (const v of row) {
      if (!Number.isFinite(v)) return { ...base, error: "Please enter valid numeric values for every cell." };
      if (v < 0) return { ...base, error: "Frequencies cannot be negative." };
    }
  }

  const rowTotals = observed.map((row) => row.reduce((s, v) => s + v, 0));
  const colTotals = Array.from({ length: cols }, (_, j) => observed.reduce((s, row) => s + row[j], 0));
  const grandTotal = rowTotals.reduce((s, v) => s + v, 0);

  if (grandTotal === 0) return { ...base, error: "Table cannot be entirely zero." };

  const expected = observed.map((row, i) => row.map((_, j) => (rowTotals[i] * colTotals[j]) / grandTotal));

  for (const row of expected) {
    for (const v of row) {
      if (v === 0) return { ...base, error: "Expected frequency of zero detected — check your row and column totals." };
    }
  }

  const contributions = observed.map((row, i) => row.map((o, j) => ((o - expected[i][j]) ** 2) / expected[i][j]));
  const residuals = observed.map((row, i) => row.map((o, j) => (o - expected[i][j]) / Math.sqrt(expected[i][j])));
  const chi2 = contributions.reduce((s, row) => s + row.reduce((a, b) => a + b, 0), 0);
  const df = (rows - 1) * (cols - 1);
  const pValue = chiSquarePValue(chi2, df);
  const cramersV = Math.sqrt(chi2 / (grandTotal * (Math.min(rows, cols) - 1)));
  const isSignificant = pValue < alpha;
  const lowExpectedWarning = expected.some((row) => row.some((v) => v < 5));

  return { observed, expected, contributions, residuals, rowTotals, colTotals, grandTotal, chi2, df, pValue, cramersV, isSignificant, lowExpectedWarning, error: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null | undefined, precision = 4): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function cramersVLabel(v: number): string {
  if (v < 0.1) return "Negligible";
  if (v < 0.2) return "Weak";
  if (v < 0.4) return "Moderate";
  if (v < 0.6) return "Relatively Strong";
  if (v < 0.8) return "Strong";
  return "Very Strong";
}

// ── Defaults & significance levels ──────────────────────────────────────

export const SIGNIFICANCE_LEVELS = [0.10, 0.05, 0.01] as const;
export const DEFAULT_ALPHA = 0.05;

export const DEFAULT_GOODNESS_ROWS: GoodnessRow[] = [
  { label: "Category 1", observed: 50, expected: 40 },
  { label: "Category 2", observed: 40, expected: 40 },
  { label: "Category 3", observed: 30, expected: 40 },
];

export const DEFAULT_INDEPENDENCE_ROW_LABELS = ["X", "Y", "Z"];
export const DEFAULT_INDEPENDENCE_COL_LABELS = ["A", "B", "C"];
export const DEFAULT_INDEPENDENCE_TABLE: number[][] = [
  [10, 20, 15],
  [18, 25, 12],
  [14, 22, 19],
];

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: TestMode;
  chi2: number;
  df: number;
  pValue: number;
  isSignificant: boolean;
}

const STORAGE_KEY = "chi-square-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), ...entry };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildGoodnessTextReport(rows: GoodnessRow[], result: GoodnessResult, alpha: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Chi-Square Goodness of Fit Report",
    "===================================",
    `Generated: ${ts}`,
    "",
    ...rows.map((r, i) => `${r.label}: Observed = ${r.observed}, Expected = ${r.expected}, Contribution = ${formatNum(result.contributions[i], 4)}`),
    "",
    `Chi-Square Statistic: ${formatNum(result.chi2, 4)}`,
    `Degrees of Freedom: ${result.df}`,
    `P-value: ${formatNum(result.pValue, 4)}`,
    `Significance Level: ${alpha}`,
    `Decision: ${result.isSignificant ? "Reject the null hypothesis" : "Fail to reject the null hypothesis"}`,
    "",
    "Formula: χ² = Σ ((Observed − Expected)² / Expected)",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildIndependenceTextReport(rowLabels: string[], colLabels: string[], result: IndependenceResult, alpha: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Chi-Square Test of Independence Report",
    "========================================",
    `Generated: ${ts}`,
    "",
    `Table: ${rowLabels.length} rows × ${colLabels.length} columns`,
    `Grand Total: ${result.grandTotal}`,
    "",
    `Chi-Square Statistic: ${formatNum(result.chi2, 4)}`,
    `Degrees of Freedom: ${result.df}`,
    `P-value: ${formatNum(result.pValue, 4)}`,
    `Cramér's V: ${formatNum(result.cramersV, 4)} (${cramersVLabel(result.cramersV)})`,
    `Significance Level: ${alpha}`,
    `Decision: ${result.isSignificant ? "Reject the null hypothesis (variables are associated)" : "Fail to reject the null hypothesis (no significant association)"}`,
    "",
    "Formula: Expected = (Row Total × Column Total) / Grand Total, χ² = Σ ((Observed − Expected)² / Expected)",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildGoodnessCSV(rows: GoodnessRow[], result: GoodnessResult): string {
  const header = ["Category", "Observed", "Expected", "Contribution"];
  const body = rows.map((r, i) => [r.label, r.observed, r.expected, formatNum(result.contributions[i], 4)]);
  const summary = [["", "", "", ""], ["Chi-Square", formatNum(result.chi2, 4), "df", result.df], ["P-value", formatNum(result.pValue, 4), "", ""]];
  return [header, ...body, ...summary].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildIndependenceCSV(rowLabels: string[], colLabels: string[], result: IndependenceResult): string {
  const header = ["", ...colLabels, "Row Total"];
  const body = result.observed.map((row, i) => [rowLabels[i], ...row, result.rowTotals[i]]);
  const totalsRow = ["Column Total", ...result.colTotals, result.grandTotal];
  const summary = [[], ["Chi-Square", formatNum(result.chi2, 4)], ["Degrees of Freedom", result.df], ["P-value", formatNum(result.pValue, 4)], ["Cramér's V", formatNum(result.cramersV, 4)]];
  return [header, ...body, totalsRow, ...summary].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildGoodnessJSON(rows: GoodnessRow[], result: GoodnessResult, alpha: number): string {
  return JSON.stringify({ mode: "goodness-of-fit", rows, chi2: result.chi2, df: result.df, pValue: result.pValue, alpha, isSignificant: result.isSignificant, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildIndependenceJSON(rowLabels: string[], colLabels: string[], result: IndependenceResult, alpha: number): string {
  return JSON.stringify({
    mode: "independence", rowLabels, colLabels, observed: result.observed, expected: result.expected,
    chi2: result.chi2, df: result.df, pValue: result.pValue, cramersV: result.cramersV, alpha,
    isSignificant: result.isSignificant, generatedAt: new Date().toISOString(),
  }, null, 2);
}
