import type {
  ConfusionInputs,
  PRInputs,
  F1Result,
  HistoryEntry,
  InputMode,
} from "./types";

// ── Core calculations ─────────────────────────────────────────────────────────
export function calcF1FromPR(precision: number, recall: number): number {
  if (precision + recall === 0) return 0;
  return (2 * precision * recall) / (precision + recall);
}

export function calcFromConfusion(inputs: ConfusionInputs): F1Result {
  const { tp, fp, fn, tn } = inputs;

  const precision = (tp + fp) === 0 ? 0 : tp / (tp + fp);
  const recall    = (tp + fn) === 0 ? 0 : tp / (tp + fn);
  const f1        = calcF1FromPR(precision, recall);
  const total     = tp + fp + fn + tn;
  const accuracy  = total === 0 ? 0 : (tp + tn) / total;
  const specificity = (tn + fp) === 0 ? 0 : tn / (tn + fp);
  const npv       = (tn + fn) === 0 ? 0 : tn / (tn + fn);
  const mccDenom  = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  const mcc       = mccDenom === 0 ? 0 : ((tp * tn) - (fp * fn)) / mccDenom;

  const steps = [
    `Step 1: Precision`,
    `  Precision = TP ÷ (TP + FP)`,
    `           = ${tp} ÷ (${tp} + ${fp})`,
    `           = ${tp} ÷ ${tp + fp}`,
    `           = ${fmtD(precision)}`,
    ``,
    `Step 2: Recall`,
    `  Recall = TP ÷ (TP + FN)`,
    `         = ${tp} ÷ (${tp} + ${fn})`,
    `         = ${tp} ÷ ${tp + fn}`,
    `         = ${fmtD(recall)}`,
    ``,
    `Step 3: F1 Score`,
    `  F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)`,
    `     = 2 × (${fmtD(precision)} × ${fmtD(recall)}) ÷ (${fmtD(precision)} + ${fmtD(recall)})`,
    `     = ${fmtD(2 * precision * recall)} ÷ ${fmtD(precision + recall)}`,
    `     = ${fmtD(f1)}`,
  ];

  return buildResult(precision, recall, f1, steps, { accuracy, specificity, npv, mcc, total });
}

export function calcFromPR(inputs: PRInputs): F1Result {
  const { precision, recall } = inputs;
  const f1 = calcF1FromPR(precision, recall);

  const steps = [
    `F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)`,
    `   = 2 × (${fmtD(precision)} × ${fmtD(recall)}) ÷ (${fmtD(precision)} + ${fmtD(recall)})`,
    `   = ${fmtD(2 * precision * recall)} ÷ ${fmtD(precision + recall)}`,
    `   = ${fmtD(f1)}`,
  ];

  return buildResult(precision, recall, f1, steps);
}

function buildResult(
  precision: number,
  recall: number,
  f1: number,
  steps: string[],
  extra?: {
    accuracy?: number;
    specificity?: number;
    npv?: number;
    mcc?: number;
    total?: number;
  }
): F1Result {
  let tier: F1Result["tier"];
  let tierLabel: string;
  let explanation: string;

  if (f1 >= 0.9) {
    tier = "excellent"; tierLabel = "Excellent";
    explanation = "Outstanding F1 score — your model achieves high precision and recall simultaneously.";
  } else if (f1 >= 0.75) {
    tier = "good"; tierLabel = "Good";
    explanation = "Good performance. The model balances precision and recall well for most production use cases.";
  } else if (f1 >= 0.5) {
    tier = "moderate"; tierLabel = "Moderate";
    explanation = "Moderate F1. Consider improving recall (reduce false negatives) or precision (reduce false positives).";
  } else {
    tier = "poor"; tierLabel = "Poor";
    explanation = "Low F1 score. The model struggles with either precision, recall, or both. Review training data and thresholds.";
  }

  return { precision, recall, f1, tier, tierLabel, explanation, steps, ...extra };
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateConfusion(inputs: ConfusionInputs): string | null {
  const vals = [inputs.tp, inputs.fp, inputs.fn, inputs.tn];
  if (vals.some((v) => v < 0)) return "All values must be ≥ 0.";
  if (vals.some((v) => !Number.isInteger(v))) return "Confusion matrix values must be whole numbers.";
  if (inputs.tp === 0 && inputs.fp === 0 && inputs.fn === 0)
    return "At least one of TP, FP, or FN must be greater than 0.";
  return null;
}

export function validatePR(inputs: PRInputs): string | null {
  if (inputs.precision < 0 || inputs.precision > 1) return "Precision must be between 0 and 1.";
  if (inputs.recall < 0 || inputs.recall > 1) return "Recall must be between 0 and 1.";
  return null;
}

/**
 * Parse a user input that may be a decimal (0.75) or percentage (75 or 75%).
 * Always returns a 0–1 decimal.
 */
export function parsePRInput(raw: string): number {
  const s = raw.trim().replace("%", "");
  const n = parseFloat(s);
  if (isNaN(n)) return 0;
  // If user typed a number > 1 (e.g. 75), treat as percentage
  return n > 1 ? Math.min(n / 100, 1) : Math.min(Math.max(n, 0), 1);
}

// ── Formatters ────────────────────────────────────────────────────────────────
export function pct(v: number, d = 2): string {
  if (!isFinite(v)) return "—";
  return `${(v * 100).toFixed(d)}%`;
}

export function fmtD(v: number, d = 4): string {
  if (!isFinite(v)) return "—";
  return v.toFixed(d);
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Preset scenarios ──────────────────────────────────────────────────────────
export const PRESETS = [
  { label: "Spam filter",   mode: "confusion" as InputMode, tp: 200, fp: 25,  fn: 40,  tn: 735, pr: null },
  { label: "Medical test",  mode: "confusion" as InputMode, tp: 50,  fp: 5,   fn: 10,  tn: 935, pr: null },
  { label: "Fraud detect",  mode: "confusion" as InputMode, tp: 80,  fp: 20,  fn: 10,  tn: 890, pr: null },
  { label: "High precision",mode: "pr"        as InputMode, tp: 0,   fp: 0,   fn: 0,   tn: 0,   pr: { precision: 0.95, recall: 0.60 } },
  { label: "High recall",   mode: "pr"        as InputMode, tp: 0,   fp: 0,   fn: 0,   tn: 0,   pr: { precision: 0.65, recall: 0.95 } },
  { label: "Balanced",      mode: "pr"        as InputMode, tp: 0,   fp: 0,   fn: 0,   tn: 0,   pr: { precision: 0.82, recall: 0.80 } },
];

// ── Export helpers ────────────────────────────────────────────────────────────
export function buildExportText(mode: InputMode, result: F1Result): string {
  const lines = [
    "F1 Score Calculator – Report",
    "============================",
    `Precision:    ${pct(result.precision)}  (${fmtD(result.precision)})`,
    `Recall:       ${pct(result.recall)}  (${fmtD(result.recall)})`,
    `F1 Score:     ${pct(result.f1)}  (${fmtD(result.f1)})`,
    `Rating:       ${result.tierLabel}`,
  ];
  if (result.accuracy !== undefined) {
    lines.push(`Accuracy:     ${pct(result.accuracy)}`);
    lines.push(`Specificity:  ${pct(result.specificity ?? 0)}`);
    lines.push(`MCC:          ${fmtD(result.mcc ?? 0)}`);
  }
  lines.push("", "Explanation", result.explanation);
  return lines.join("\n");
}

export function buildExportJSON(result: F1Result) {
  const obj: Record<string, number | string> = {
    precision: result.precision,
    recall: result.recall,
    f1_score: result.f1,
    tier: result.tier,
  };
  if (result.accuracy !== undefined) {
    obj.accuracy = result.accuracy;
    obj.specificity = result.specificity ?? 0;
    obj.mcc = result.mcc ?? 0;
  }
  return JSON.stringify(obj, null, 2);
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
const HISTORY_KEY = "f1-score-calculator-history";
const MAX_HISTORY = 15;

export function saveHistory(mode: InputMode, result: F1Result): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    mode,
    result,
    label: `F1: ${pct(result.f1)} · P: ${pct(result.precision)} · R: ${pct(result.recall)}`,
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
