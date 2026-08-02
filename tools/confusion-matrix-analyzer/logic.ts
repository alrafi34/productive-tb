// ── Confusion Matrix Analyzer Logic ──

export type InputMode = "manual" | "labels";

// ── Binary manual-count metrics ─────────────────────────────────────────────

export interface BinaryMetrics {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  total: number;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  specificity: number | null;
  npv: number | null;
  fpr: number | null;
  fnr: number | null;
  f1: number | null;
  balancedAccuracy: number | null;
  mcc: number | null;
  error: string | null;
}

function safeDiv(a: number, b: number): number | null {
  return b === 0 ? null : a / b;
}

export function calculateBinaryMetrics(tp: number, fp: number, fn: number, tn: number): BinaryMetrics {
  const base = { tp, fp, fn, tn, total: 0, accuracy: null, precision: null, recall: null, specificity: null, npv: null, fpr: null, fnr: null, f1: null, balancedAccuracy: null, mcc: null, error: null as string | null };
  if (![tp, fp, fn, tn].every(Number.isFinite)) {
    return { ...base, error: "Enter valid numbers for TP, FP, FN, and TN." };
  }
  if (tp < 0 || fp < 0 || fn < 0 || tn < 0) {
    return { ...base, error: "TP, FP, FN, and TN cannot be negative." };
  }
  const total = tp + fp + fn + tn;
  if (total === 0) {
    return { ...base, error: "Enter at least one non-zero value to analyze." };
  }
  const precision = safeDiv(tp, tp + fp);
  const recall = safeDiv(tp, tp + fn);
  const specificity = safeDiv(tn, tn + fp);
  const npv = safeDiv(tn, tn + fn);
  const fpr = safeDiv(fp, fp + tn);
  const fnr = safeDiv(fn, fn + tp);
  const accuracy = (tp + tn) / total;
  const f1 = precision !== null && recall !== null && precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : null;
  const balancedAccuracy = recall !== null && specificity !== null ? (recall + specificity) / 2 : null;
  const mccDenomSq = (tp + fp) * (tp + fn) * (tn + fp) * (tn + fn);
  const mcc = mccDenomSq > 0 ? (tp * tn - fp * fn) / Math.sqrt(mccDenomSq) : null;

  return { tp, fp, fn, tn, total, accuracy, precision, recall, specificity, npv, fpr, fnr, f1, balancedAccuracy, mcc, error: null };
}

// ── Actual vs. Predicted label parsing ──────────────────────────────────────

export function parseLabelList(text: string): string[] {
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

export interface CSVParseResult {
  actual: string[];
  predicted: string[];
  error: string | null;
}

export function parseCSV(text: string): CSVParseResult {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return { actual: [], predicted: [], error: "CSV must include a header row and at least one data row." };
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const actualIdx = header.indexOf("actual");
  const predictedIdx = header.indexOf("predicted");
  if (actualIdx === -1 || predictedIdx === -1) {
    return { actual: [], predicted: [], error: "CSV must include \"Actual\" and \"Predicted\" columns." };
  }
  const actual: string[] = [];
  const predicted: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    if (cols[actualIdx] === undefined || cols[predictedIdx] === undefined) continue;
    actual.push(cols[actualIdx]);
    predicted.push(cols[predictedIdx]);
  }
  return { actual, predicted, error: null };
}

// ── Multi-class confusion matrix ────────────────────────────────────────────

export interface ClassMetrics {
  className: string;
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  support: number;
  precision: number | null;
  recall: number | null;
  f1: number | null;
}

export interface MatrixResult {
  classes: string[];
  matrix: number[][];
  total: number;
  accuracy: number | null;
  perClass: ClassMetrics[];
  macroPrecision: number | null;
  macroRecall: number | null;
  macroF1: number | null;
  weightedPrecision: number | null;
  weightedRecall: number | null;
  weightedF1: number | null;
  binary: BinaryMetrics | null;
  error: string | null;
}

function emptyMatrixResult(error: string): MatrixResult {
  return { classes: [], matrix: [], total: 0, accuracy: null, perClass: [], macroPrecision: null, macroRecall: null, macroF1: null, weightedPrecision: null, weightedRecall: null, weightedF1: null, binary: null, error };
}

export function buildConfusionMatrix(actualRaw: string[], predictedRaw: string[], caseInsensitive: boolean): MatrixResult {
  if (actualRaw.length === 0 || predictedRaw.length === 0) {
    return emptyMatrixResult("Enter both Actual and Predicted labels to analyze.");
  }
  if (actualRaw.length !== predictedRaw.length) {
    return emptyMatrixResult(`Actual (${actualRaw.length} rows) and Predicted (${predictedRaw.length} rows) must contain the same number of rows.`);
  }

  const norm = (s: string) => (caseInsensitive ? s.toLowerCase() : s);
  const actual = actualRaw.map(norm);
  const predicted = predictedRaw.map(norm);

  const classes = Array.from(new Set([...actual, ...predicted])).sort();
  const index = new Map(classes.map((c, i) => [c, i]));
  const n = classes.length;
  const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < actual.length; i++) {
    const ai = index.get(actual[i])!;
    const pi = index.get(predicted[i])!;
    matrix[ai][pi]++;
  }

  const total = actual.length;
  let correct = 0;
  for (let i = 0; i < n; i++) correct += matrix[i][i];
  const accuracy = total > 0 ? correct / total : null;

  const perClass: ClassMetrics[] = classes.map((className, i) => {
    const tp = matrix[i][i];
    let fp = 0, fn = 0;
    for (let j = 0; j < n; j++) {
      if (j !== i) { fp += matrix[j][i]; fn += matrix[i][j]; }
    }
    const tn = total - tp - fp - fn;
    const support = matrix[i].reduce((a, b) => a + b, 0);
    const precision = safeDiv(tp, tp + fp);
    const recall = safeDiv(tp, tp + fn);
    const f1 = precision !== null && recall !== null && precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : null;
    return { className, tp, fp, fn, tn, support, precision, recall, f1 };
  });

  const validPrecisions = perClass.map((c) => c.precision).filter((v): v is number => v !== null);
  const validRecalls = perClass.map((c) => c.recall).filter((v): v is number => v !== null);
  const validF1s = perClass.map((c) => c.f1).filter((v): v is number => v !== null);
  const macroPrecision = validPrecisions.length ? validPrecisions.reduce((a, b) => a + b, 0) / validPrecisions.length : null;
  const macroRecall = validRecalls.length ? validRecalls.reduce((a, b) => a + b, 0) / validRecalls.length : null;
  const macroF1 = validF1s.length ? validF1s.reduce((a, b) => a + b, 0) / validF1s.length : null;

  const weightedPrecision = total > 0 ? perClass.reduce((a, c) => a + (c.precision ?? 0) * c.support, 0) / total : null;
  const weightedRecall = total > 0 ? perClass.reduce((a, c) => a + (c.recall ?? 0) * c.support, 0) / total : null;
  const weightedF1 = total > 0 ? perClass.reduce((a, c) => a + (c.f1 ?? 0) * c.support, 0) / total : null;

  const binary = n === 2 ? calculateBinaryMetrics(matrix[1][1], matrix[0][1], matrix[1][0], matrix[0][0]) : null;

  return { classes, matrix, total, accuracy, perClass, macroPrecision, macroRecall, macroF1, weightedPrecision, weightedRecall, weightedF1, binary, error: null };
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

export const PRECISION_OPTIONS = [2, 3, 4, 5, 6];
export const DEFAULT_PRECISION = 4;
export const DEFAULT_TP = 95;
export const DEFAULT_FP = 10;
export const DEFAULT_FN = 8;
export const DEFAULT_TN = 130;

export const SAMPLE_ACTUAL = ["Cat", "Dog", "Dog", "Cat", "Bird", "Cat", "Dog", "Bird", "Cat", "Dog"];
export const SAMPLE_PREDICTED = ["Cat", "Dog", "Cat", "Cat", "Bird", "Cat", "Dog", "Bird", "Dog", "Dog"];

export function generateSampleLabels(): { actual: string; predicted: string } {
  return { actual: SAMPLE_ACTUAL.join("\n"), predicted: SAMPLE_PREDICTED.join("\n") };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: InputMode;
  summary: string;
}

const STORAGE_KEY = "confusion-matrix-analyzer-history";

export function saveHistory(mode: InputMode, summary: string): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), mode, summary };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildBinaryTextReport(m: BinaryMetrics, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Confusion Matrix Analysis Report (Binary)",
    "===========================================",
    `Generated: ${ts}`,
    "",
    `TP: ${m.tp}  FP: ${m.fp}  FN: ${m.fn}  TN: ${m.tn}  Total: ${m.total}`,
    "",
    `Accuracy: ${formatNum(m.accuracy, precision)}`,
    `Precision: ${formatNum(m.precision, precision)}`,
    `Recall (Sensitivity): ${formatNum(m.recall, precision)}`,
    `Specificity: ${formatNum(m.specificity, precision)}`,
    `Negative Predictive Value: ${formatNum(m.npv, precision)}`,
    `False Positive Rate: ${formatNum(m.fpr, precision)}`,
    `False Negative Rate: ${formatNum(m.fnr, precision)}`,
    `F1 Score: ${formatNum(m.f1, precision)}`,
    `Balanced Accuracy: ${formatNum(m.balancedAccuracy, precision)}`,
    `Matthews Correlation Coefficient: ${formatNum(m.mcc, precision)}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ].join("\n");
}

export function buildBinaryCSVReport(m: BinaryMetrics, precision: number): string {
  const rows: (string | number)[][] = [
    ["Metric", "Value"],
    ["TP", m.tp], ["FP", m.fp], ["FN", m.fn], ["TN", m.tn], ["Total", m.total],
    ["Accuracy", formatNum(m.accuracy, precision)],
    ["Precision", formatNum(m.precision, precision)],
    ["Recall", formatNum(m.recall, precision)],
    ["Specificity", formatNum(m.specificity, precision)],
    ["NPV", formatNum(m.npv, precision)],
    ["FPR", formatNum(m.fpr, precision)],
    ["FNR", formatNum(m.fnr, precision)],
    ["F1 Score", formatNum(m.f1, precision)],
    ["Balanced Accuracy", formatNum(m.balancedAccuracy, precision)],
    ["MCC", formatNum(m.mcc, precision)],
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildBinaryJSONReport(m: BinaryMetrics): string {
  return JSON.stringify({ ...m, generatedAt: new Date().toISOString() }, null, 2);
}

export function buildMatrixTextReport(r: MatrixResult, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const lines = [
    "Confusion Matrix Analysis Report",
    "===================================",
    `Generated: ${ts}`,
    `Classes: ${r.classes.join(", ")}`,
    `Total Samples: ${r.total}`,
    `Overall Accuracy: ${formatNum(r.accuracy, precision)}`,
    "",
    "Per-Class Metrics",
    "-----------------",
    ...r.perClass.map((c) => `${c.className}: Precision=${formatNum(c.precision, precision)}, Recall=${formatNum(c.recall, precision)}, F1=${formatNum(c.f1, precision)}, Support=${c.support}`),
    "",
    `Macro Avg — Precision: ${formatNum(r.macroPrecision, precision)}, Recall: ${formatNum(r.macroRecall, precision)}, F1: ${formatNum(r.macroF1, precision)}`,
    `Weighted Avg — Precision: ${formatNum(r.weightedPrecision, precision)}, Recall: ${formatNum(r.weightedRecall, precision)}, F1: ${formatNum(r.weightedF1, precision)}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildMatrixCSVReport(r: MatrixResult): string {
  const header = ["Actual \\ Predicted", ...r.classes];
  const rows = r.matrix.map((row, i) => [r.classes[i], ...row]);
  const matrixCsv = [header, ...rows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const metricsHeader = ["Class", "Precision", "Recall", "F1", "Support"];
  const metricsRows = r.perClass.map((c) => [c.className, c.precision ?? "", c.recall ?? "", c.f1 ?? "", c.support]);
  const metricsCsv = [metricsHeader, ...metricsRows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  return `${matrixCsv}\n\n${metricsCsv}`;
}

export function buildMatrixJSONReport(r: MatrixResult): string {
  return JSON.stringify({ ...r, generatedAt: new Date().toISOString() }, null, 2);
}
