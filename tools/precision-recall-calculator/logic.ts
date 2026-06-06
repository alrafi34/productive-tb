import type { CMInputs, MetricsResult, HistoryEntry } from "./types";

// ── Core metrics calculation ──────────────────────────────────────────────────
export function calculateMetrics(inputs: CMInputs): MetricsResult {
  const { tp, fp, fn, tn } = inputs;

  const total = tp + fp + fn + tn;
  const positives = tp + fn;
  const negatives = tn + fp;

  const precision   = (tp + fp) === 0 ? 0 : tp / (tp + fp);
  const recall      = (tp + fn) === 0 ? 0 : tp / (tp + fn);
  const f1          = (precision + recall) === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  const accuracy    = total === 0 ? 0 : (tp + tn) / total;
  const specificity = (tn + fp) === 0 ? 0 : tn / (tn + fp);
  const npv         = (tn + fn) === 0 ? 0 : tn / (tn + fn);
  const fpr         = (fp + tn) === 0 ? 0 : fp / (fp + tn);
  const fnr         = (fn + tp) === 0 ? 0 : fn / (fn + tp);

  // Matthews Correlation Coefficient
  const mccDenom = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  const mcc = mccDenom === 0 ? 0 : ((tp * tn) - (fp * fn)) / mccDenom;

  // Step-by-step explanations per metric
  const steps: MetricsResult["steps"] = {
    precision: [
      `Precision = TP ÷ (TP + FP)`,
      `         = ${tp} ÷ (${tp} + ${fp})`,
      `         = ${tp} ÷ ${tp + fp}`,
      `         = ${pct(precision)}`,
    ],
    recall: [
      `Recall = TP ÷ (TP + FN)`,
      `       = ${tp} ÷ (${tp} + ${fn})`,
      `       = ${tp} ÷ ${tp + fn}`,
      `       = ${pct(recall)}`,
    ],
    f1: [
      `F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)`,
      `   = 2 × (${fmt(precision)} × ${fmt(recall)}) ÷ (${fmt(precision)} + ${fmt(recall)})`,
      `   = ${fmt(2 * precision * recall)} ÷ ${fmt(precision + recall)}`,
      `   = ${pct(f1)}`,
    ],
    accuracy: [
      `Accuracy = (TP + TN) ÷ (TP + FP + FN + TN)`,
      `         = (${tp} + ${tn}) ÷ ${total}`,
      `         = ${tp + tn} ÷ ${total}`,
      `         = ${pct(accuracy)}`,
    ],
    specificity: [
      `Specificity = TN ÷ (TN + FP)`,
      `            = ${tn} ÷ (${tn} + ${fp})`,
      `            = ${tn} ÷ ${tn + fp}`,
      `            = ${pct(specificity)}`,
    ],
    mcc: [
      `MCC = (TP×TN − FP×FN) ÷ √((TP+FP)(TP+FN)(TN+FP)(TN+FN))`,
      `    = (${tp * tn} − ${fp * fn}) ÷ √(${(tp + fp) * (tp + fn) * (tn + fp) * (tn + fn)})`,
      `    = ${fmt(mcc)}`,
    ],
  };

  return {
    precision, recall, f1, accuracy, specificity,
    npv, fpr, fnr, mcc,
    total, positives, negatives,
    steps,
  };
}

// ── Formatters ────────────────────────────────────────────────────────────────
export function pct(v: number, decimals = 2): string {
  if (!isFinite(v)) return "—";
  return `${(v * 100).toFixed(decimals)}%`;
}

export function fmt(v: number, decimals = 4): string {
  if (!isFinite(v)) return "—";
  return v.toFixed(decimals);
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateInputs(inputs: CMInputs): string | null {
  const vals = [inputs.tp, inputs.fp, inputs.fn, inputs.tn];
  if (vals.some((v) => v < 0)) return "All values must be ≥ 0.";
  if (!Number.isInteger(inputs.tp) || !Number.isInteger(inputs.fp) ||
      !Number.isInteger(inputs.fn) || !Number.isInteger(inputs.tn))
    return "Confusion matrix values must be whole numbers.";
  return null;
}

// ── Preset scenarios ──────────────────────────────────────────────────────────
export const PRESETS = [
  { label: "Balanced (good)", tp: 90, fp: 10, fn: 15, tn: 885 },
  { label: "High precision", tp: 80, fp: 5,  fn: 40, tn: 875 },
  { label: "High recall",    tp: 95, fp: 40, fn: 5,  tn: 860 },
  { label: "Spam detector",  tp: 200,fp: 25, fn: 40, tn: 735 },
  { label: "Medical test",   tp: 50, fp: 10, fn: 5,  tn: 935 },
  { label: "Low performer",  tp: 40, fp: 60, fn: 50, tn: 850 },
];

// ── Export helpers ────────────────────────────────────────────────────────────
export function buildExportText(inputs: CMInputs, result: MetricsResult): string {
  return [
    "Precision Recall Calculator – Report",
    "=====================================",
    "Confusion Matrix",
    "----------------",
    `  True Positives (TP):  ${inputs.tp}`,
    `  False Positives (FP): ${inputs.fp}`,
    `  False Negatives (FN): ${inputs.fn}`,
    `  True Negatives (TN):  ${inputs.tn}`,
    `  Total Samples:        ${result.total}`,
    "",
    "Metrics",
    "-------",
    `  Precision:    ${pct(result.precision)}`,
    `  Recall:       ${pct(result.recall)}`,
    `  F1 Score:     ${pct(result.f1)}`,
    `  Accuracy:     ${pct(result.accuracy)}`,
    `  Specificity:  ${pct(result.specificity)}`,
    `  NPV:          ${pct(result.npv)}`,
    `  FPR:          ${pct(result.fpr)}`,
    `  FNR:          ${pct(result.fnr)}`,
    `  MCC:          ${fmt(result.mcc)}`,
  ].join("\n");
}

export function buildExportCSV(inputs: CMInputs, result: MetricsResult): string {
  const header = "metric,value";
  const rows = [
    ["TP", inputs.tp],
    ["FP", inputs.fp],
    ["FN", inputs.fn],
    ["TN", inputs.tn],
    ["Total", result.total],
    ["Precision", (result.precision * 100).toFixed(4)],
    ["Recall", (result.recall * 100).toFixed(4)],
    ["F1_Score", (result.f1 * 100).toFixed(4)],
    ["Accuracy", (result.accuracy * 100).toFixed(4)],
    ["Specificity", (result.specificity * 100).toFixed(4)],
    ["NPV", (result.npv * 100).toFixed(4)],
    ["FPR", (result.fpr * 100).toFixed(4)],
    ["FNR", (result.fnr * 100).toFixed(4)],
    ["MCC", result.mcc.toFixed(6)],
  ];
  return [header, ...rows.map(([k, v]) => `${k},${v}`)].join("\n");
}

export function buildExportJSON(inputs: CMInputs, result: MetricsResult) {
  return JSON.stringify({
    confusion_matrix: { tp: inputs.tp, fp: inputs.fp, fn: inputs.fn, tn: inputs.tn },
    metrics: {
      precision: result.precision,
      recall: result.recall,
      f1_score: result.f1,
      accuracy: result.accuracy,
      specificity: result.specificity,
      npv: result.npv,
      false_positive_rate: result.fpr,
      false_negative_rate: result.fnr,
      mcc: result.mcc,
    },
  }, null, 2);
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "precision-recall-calculator-history";
const MAX_HISTORY = 15;

export function saveHistory(inputs: CMInputs, result: MetricsResult, label?: string): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    inputs,
    result,
    label,
  };
  const existing = getHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...existing].slice(0, MAX_HISTORY)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}
