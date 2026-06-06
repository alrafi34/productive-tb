import type { CMInputs, MetricsResult, HistoryEntry } from "./types";

// ── Core metrics calculation ──────────────────────────────────────────────────
export function calculateMetrics(inputs: CMInputs): MetricsResult {
  const { tp, fp, fn, tn } = inputs;

  const total     = tp + fp + fn + tn;
  const positives = tp + fn;
  const negatives = tn + fp;

  const precision        = (tp + fp) === 0 ? 0 : tp / (tp + fp);
  const recall           = (tp + fn) === 0 ? 0 : tp / (tp + fn);
  const f1               = (precision + recall) === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  const accuracy         = total === 0 ? 0 : (tp + tn) / total;
  const specificity      = (tn + fp) === 0 ? 0 : tn / (tn + fp);
  const npv              = (tn + fn) === 0 ? 0 : tn / (tn + fn);
  const fpr              = (fp + tn) === 0 ? 0 : fp / (fp + tn);
  const fnr              = (fn + tp) === 0 ? 0 : fn / (fn + tp);
  const balancedAccuracy = (recall + specificity) / 2;

  const mccDenom = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  const mcc      = mccDenom === 0 ? 0 : ((tp * tn) - (fp * fn)) / mccDenom;

  const steps: MetricsResult["steps"] = {
    accuracy: [
      `Accuracy = (TP + TN) ÷ (TP + FP + FN + TN)`,
      `         = (${tp} + ${tn}) ÷ ${total}`,
      `         = ${tp + tn} ÷ ${total}`,
      `         = ${pct(accuracy)}`,
    ],
    precision: [
      `Precision = TP ÷ (TP + FP)`,
      `          = ${tp} ÷ (${tp} + ${fp})`,
      `          = ${tp} ÷ ${tp + fp}`,
      `          = ${pct(precision)}`,
    ],
    recall: [
      `Recall = TP ÷ (TP + FN)`,
      `       = ${tp} ÷ (${tp} + ${fn})`,
      `       = ${tp} ÷ ${tp + fn}`,
      `       = ${pct(recall)}`,
    ],
    specificity: [
      `Specificity = TN ÷ (TN + FP)`,
      `            = ${tn} ÷ (${tn} + ${fp})`,
      `            = ${tn} ÷ ${tn + fp}`,
      `            = ${pct(specificity)}`,
    ],
    f1: [
      `F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)`,
      `   = 2 × (${fmt(precision)} × ${fmt(recall)}) ÷ (${fmt(precision)} + ${fmt(recall)})`,
      `   = ${fmt(2 * precision * recall)} ÷ ${fmt(precision + recall)}`,
      `   = ${pct(f1)}`,
    ],
    fpr: [
      `FPR = FP ÷ (FP + TN)`,
      `    = ${fp} ÷ (${fp} + ${tn})`,
      `    = ${fp} ÷ ${fp + tn}`,
      `    = ${pct(fpr)}`,
    ],
    fnr: [
      `FNR = FN ÷ (FN + TP)`,
      `    = ${fn} ÷ (${fn} + ${tp})`,
      `    = ${fn} ÷ ${fn + tp}`,
      `    = ${pct(fnr)}`,
    ],
    npv: [
      `NPV = TN ÷ (TN + FN)`,
      `    = ${tn} ÷ (${tn} + ${fn})`,
      `    = ${tn} ÷ ${tn + fn}`,
      `    = ${pct(npv)}`,
    ],
    balancedAccuracy: [
      `Balanced Accuracy = (Recall + Specificity) ÷ 2`,
      `                  = (${fmt(recall)} + ${fmt(specificity)}) ÷ 2`,
      `                  = ${fmt(recall + specificity)} ÷ 2`,
      `                  = ${pct(balancedAccuracy)}`,
    ],
    mcc: [
      `MCC = (TP×TN − FP×FN) ÷ √((TP+FP)(TP+FN)(TN+FP)(TN+FN))`,
      `    Numerator   = ${tp}×${tn} − ${fp}×${fn} = ${tp * tn - fp * fn}`,
      `    Denominator = √(${tp + fp} × ${tp + fn} × ${tn + fp} × ${tn + fn})`,
      `                = √${(tp + fp) * (tp + fn) * (tn + fp) * (tn + fn)}`,
      `    MCC = ${fmt(mcc)}`,
    ],
  };

  return {
    precision, recall, f1, accuracy, specificity,
    npv, fpr, fnr, mcc, balancedAccuracy,
    support: total, positives, negatives,
    steps,
  };
}

// ── CSV parser ────────────────────────────────────────────────────────────────
export function parseCSV(raw: string): CMInputs | null {
  const lines = raw.trim().split(/\r?\n/);
  let tp = 0, fp = 0, fn = 0, tn = 0;
  let hasHeader = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(",").map((s) => s.trim());
    if (parts.length < 2) continue;
    const a = parts[0].toLowerCase();
    const p = parts[1].toLowerCase();
    if (a === "actual" || a === "true" || a === "label") { hasHeader = true; continue; }
    const ai = parseInt(a, 10);
    const pi = parseInt(p, 10);
    if (isNaN(ai) || isNaN(pi)) {
      // try string labels: pos/neg, 1/0, yes/no
      const actualPos = ["1", "positive", "pos", "yes", "true", "p"].includes(a);
      const actualNeg = ["0", "negative", "neg", "no", "false", "n"].includes(a);
      const predPos   = ["1", "positive", "pos", "yes", "true", "p"].includes(p);
      if (actualPos && predPos) tp++;
      else if (actualPos && !predPos) fn++;
      else if (actualNeg && predPos) fp++;
      else if (actualNeg && !predPos) tn++;
    } else {
      if (ai === 1 && pi === 1) tp++;
      else if (ai === 1 && pi === 0) fn++;
      else if (ai === 0 && pi === 1) fp++;
      else if (ai === 0 && pi === 0) tn++;
    }
  }

  if (tp + fp + fn + tn === 0) return null;
  return { tp, fp, fn, tn };
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
  if (vals.some((v) => !Number.isInteger(v)))
    return "Confusion matrix values must be whole numbers.";
  if (vals.every((v) => v === 0))
    return "At least one value must be greater than 0.";
  return null;
}

// ── Preset scenarios ──────────────────────────────────────────────────────────
export const PRESETS = [
  { label: "Balanced",      tp: 90,  fp: 10, fn: 20, tn: 80  },
  { label: "High precision",tp: 80,  fp: 5,  fn: 40, tn: 875 },
  { label: "High recall",   tp: 95,  fp: 40, fn: 5,  tn: 860 },
  { label: "Spam filter",   tp: 200, fp: 25, fn: 40, tn: 735 },
  { label: "Medical test",  tp: 120, fp: 30, fn: 10, tn: 150 },
  { label: "Low performer", tp: 40,  fp: 60, fn: 50, tn: 850 },
];

// ── Export helpers ────────────────────────────────────────────────────────────
export function buildExportText(inputs: CMInputs, result: MetricsResult): string {
  return [
    "Confusion Matrix Calculator – Report",
    "======================================",
    "Confusion Matrix Inputs",
    "-----------------------",
    `  True Positives (TP):   ${inputs.tp}`,
    `  False Positives (FP):  ${inputs.fp}`,
    `  False Negatives (FN):  ${inputs.fn}`,
    `  True Negatives (TN):   ${inputs.tn}`,
    `  Total Samples:         ${result.support}`,
    "",
    "Metrics",
    "-------",
    `  Accuracy:              ${pct(result.accuracy)}`,
    `  Precision:             ${pct(result.precision)}`,
    `  Recall (Sensitivity):  ${pct(result.recall)}`,
    `  Specificity:           ${pct(result.specificity)}`,
    `  F1 Score:              ${pct(result.f1)}`,
    `  False Positive Rate:   ${pct(result.fpr)}`,
    `  False Negative Rate:   ${pct(result.fnr)}`,
    `  NPV:                   ${pct(result.npv)}`,
    `  Balanced Accuracy:     ${pct(result.balancedAccuracy)}`,
    `  MCC:                   ${fmt(result.mcc)}`,
  ].join("\n");
}

export function buildExportCSV(inputs: CMInputs, result: MetricsResult): string {
  const header = "metric,value";
  const rows = [
    ["TP", inputs.tp],
    ["FP", inputs.fp],
    ["FN", inputs.fn],
    ["TN", inputs.tn],
    ["Total", result.support],
    ["Accuracy",          (result.accuracy          * 100).toFixed(4)],
    ["Precision",         (result.precision         * 100).toFixed(4)],
    ["Recall",            (result.recall            * 100).toFixed(4)],
    ["Specificity",       (result.specificity       * 100).toFixed(4)],
    ["F1_Score",          (result.f1                * 100).toFixed(4)],
    ["FPR",               (result.fpr               * 100).toFixed(4)],
    ["FNR",               (result.fnr               * 100).toFixed(4)],
    ["NPV",               (result.npv               * 100).toFixed(4)],
    ["Balanced_Accuracy", (result.balancedAccuracy  * 100).toFixed(4)],
    ["MCC",               result.mcc.toFixed(6)],
  ];
  return [header, ...rows.map(([k, v]) => `${k},${v}`)].join("\n");
}

export function buildExportJSON(inputs: CMInputs, result: MetricsResult): string {
  return JSON.stringify({
    confusion_matrix: { tp: inputs.tp, fp: inputs.fp, fn: inputs.fn, tn: inputs.tn },
    metrics: {
      accuracy:           result.accuracy,
      precision:          result.precision,
      recall:             result.recall,
      specificity:        result.specificity,
      f1_score:           result.f1,
      false_positive_rate: result.fpr,
      false_negative_rate: result.fnr,
      npv:                result.npv,
      balanced_accuracy:  result.balancedAccuracy,
      mcc:                result.mcc,
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
const HISTORY_KEY = "confusion-matrix-calculator-history";
const MAX_HISTORY = 15;

export function saveHistory(inputs: CMInputs, result: MetricsResult): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    inputs,
    result,
    label: `A:${pct(result.accuracy)} P:${pct(result.precision)} R:${pct(result.recall)} F1:${pct(result.f1)}`,
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
