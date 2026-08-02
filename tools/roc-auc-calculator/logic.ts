// ── ROC AUC Calculator Logic ──

export interface DataPoint {
  actual: 0 | 1;
  probability: number;
}

export interface ParseResult {
  points: DataPoint[];
  invalidLines: number[];
}

// Accepts "actual,probability" per line — comma, tab, or space separated. Skips a header row if present.
export function parseDataset(text: string): ParseResult {
  const points: DataPoint[] = [];
  const invalidLines: number[] = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed === "") return;
    const tokens = trimmed.split(/[,\t\s]+/).filter(Boolean);
    if (tokens.length < 2) { invalidLines.push(idx + 1); return; }

    const [actualRaw, probRaw] = tokens;
    if (/^actual$/i.test(actualRaw) || /^label$/i.test(actualRaw)) return; // header row

    const actual = parseFloat(actualRaw);
    const probability = parseFloat(probRaw);

    if ((actual !== 0 && actual !== 1) || !Number.isFinite(probability) || probability < 0 || probability > 1) {
      invalidLines.push(idx + 1);
      return;
    }
    points.push({ actual: actual as 0 | 1, probability });
  });

  return { points, invalidLines };
}

export interface ROCPoint {
  threshold: number;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  tpr: number; // sensitivity / recall
  fpr: number; // 1 - specificity
}

export interface ROCResult {
  rocPoints: ROCPoint[];
  auc: number;
  totalSamples: number;
  totalPositives: number;
  totalNegatives: number;
  error: string | null;
}

export function computeROC(points: DataPoint[]): ROCResult {
  const base: ROCResult = { rocPoints: [], auc: 0, totalSamples: points.length, totalPositives: 0, totalNegatives: 0, error: null };

  if (points.length === 0) return { ...base, error: "No valid data found." };

  const positives = points.filter((p) => p.actual === 1).length;
  const negatives = points.filter((p) => p.actual === 0).length;

  if (positives === 0 || negatives === 0) {
    return { ...base, totalPositives: positives, totalNegatives: negatives, error: "Dataset must contain at least one positive (1) and one negative (0) example." };
  }

  const sorted = [...points].sort((a, b) => b.probability - a.probability);
  const rocPoints: ROCPoint[] = [];
  let tp = 0, fp = 0;
  let prevProb = sorted[0].probability + 1; // sentinel above the highest score

  for (const pt of sorted) {
    if (pt.probability !== prevProb) {
      rocPoints.push({ threshold: prevProb, tp, fp, tn: negatives - fp, fn: positives - tp, tpr: tp / positives, fpr: fp / negatives });
      prevProb = pt.probability;
    }
    if (pt.actual === 1) tp++; else fp++;
  }
  rocPoints.push({ threshold: prevProb, tp, fp, tn: negatives - fp, fn: positives - tp, tpr: tp / positives, fpr: fp / negatives });

  let auc = 0;
  for (let i = 1; i < rocPoints.length; i++) {
    auc += (rocPoints[i].fpr - rocPoints[i - 1].fpr) * (rocPoints[i].tpr + rocPoints[i - 1].tpr) / 2;
  }

  return { rocPoints, auc, totalSamples: points.length, totalPositives: positives, totalNegatives: negatives, error: null };
}

// Downsample ROC points for chart rendering on very large datasets while keeping the exact shape.
export function downsampleROC(rocPoints: ROCPoint[], maxPoints = 400): ROCPoint[] {
  if (rocPoints.length <= maxPoints) return rocPoints;
  const step = (rocPoints.length - 1) / (maxPoints - 1);
  const result: ROCPoint[] = [];
  for (let i = 0; i < maxPoints; i++) {
    result.push(rocPoints[Math.round(i * step)]);
  }
  return result;
}

// ── Threshold explorer ───────────────────────────────────────────────────

export interface ThresholdStats {
  threshold: number;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  f1: number | null;
  sensitivity: number | null;
  specificity: number | null;
}

export function calculateAtThreshold(points: DataPoint[], threshold: number): ThresholdStats {
  let tp = 0, fp = 0, tn = 0, fn = 0;
  for (const p of points) {
    const predictedPositive = p.probability >= threshold;
    if (predictedPositive && p.actual === 1) tp++;
    else if (predictedPositive && p.actual === 0) fp++;
    else if (!predictedPositive && p.actual === 0) tn++;
    else fn++;
  }
  const total = tp + fp + tn + fn;
  const accuracy = total === 0 ? null : (tp + tn) / total;
  const precision = tp + fp === 0 ? null : tp / (tp + fp);
  const recall = tp + fn === 0 ? null : tp / (tp + fn);
  const f1 = precision === null || recall === null || precision + recall === 0 ? null : (2 * precision * recall) / (precision + recall);
  const specificity = tn + fp === 0 ? null : tn / (tn + fp);
  return { threshold, tp, fp, tn, fn, accuracy, precision, recall, f1, sensitivity: recall, specificity };
}

// ── Rating ────────────────────────────────────────────────────────────────

export interface RatingTier {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const AUC_RATING_TIERS: RatingTier[] = [
  { label: "Fails to Discriminate", min: -Infinity, max: 0.6, color: "#DC2626" },
  { label: "Poor Classifier", min: 0.6, max: 0.7, color: "#F59E0B" },
  { label: "Fair Classifier", min: 0.7, max: 0.8, color: "#D97706" },
  { label: "Good Classifier", min: 0.8, max: 0.9, color: "#2563EB" },
  { label: "Excellent Classifier", min: 0.9, max: Infinity, color: "#058554" },
];

export function classifyAUC(auc: number): RatingTier {
  return AUC_RATING_TIERS.find((t) => auc > t.min && auc <= t.max) ?? AUC_RATING_TIERS.find((t) => auc <= t.min) ?? AUC_RATING_TIERS[0];
}

// ── Helpers ───────────────────────────────────────────────────────────────

export function formatNum(n: number | null, precision: number): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export const DEFAULT_PRECISION = 3;
export const DEFAULT_THRESHOLD = 0.5;

export const SAMPLE_DATASET = `Actual,Probability
1,0.98
1,0.87
0,0.75
1,0.70
0,0.62
1,0.95
1,0.82
0,0.74
1,0.60
0,0.21
0,0.35
1,0.55
0,0.18
1,0.66
0,0.42
1,0.91
0,0.28
1,0.77
0,0.49
1,0.83`;

export function generateRandomDataset(n: number): string {
  const lines = ["Actual,Probability"];
  for (let i = 0; i < n; i++) {
    const actual = Math.random() > 0.5 ? 1 : 0;
    // Bias probability toward the correct label so the sample looks like a reasonable classifier.
    const base = actual === 1 ? 0.55 + Math.random() * 0.45 : Math.random() * 0.55;
    lines.push(`${actual},${base.toFixed(3)}`);
  }
  return lines.join("\n");
}

// ── LocalStorage history ─────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  auc: number;
  totalSamples: number;
  totalPositives: number;
  totalNegatives: number;
}

const STORAGE_KEY = "roc-auc-calculator-history";

export function saveHistory(result: ROCResult): void {
  if (result.error) return;
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Math.random().toString(36).slice(2), timestamp: Date.now(),
    auc: result.auc, totalSamples: result.totalSamples, totalPositives: result.totalPositives, totalNegatives: result.totalNegatives,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ───────────────────────────────────────────────────────

export function buildTextReport(result: ROCResult, thresholdStats: ThresholdStats, precision: number): string {
  const ts = new Date().toLocaleString("en-US");
  const rating = classifyAUC(result.auc);
  const lines = [
    "ROC AUC Analysis Report",
    "=========================",
    `Generated: ${ts}`,
    "",
    `Total Samples: ${result.totalSamples}`,
    `Positive Samples: ${result.totalPositives}`,
    `Negative Samples: ${result.totalNegatives}`,
    `Threshold Count: ${result.rocPoints.length}`,
    "",
    `AUC: ${formatNum(result.auc, precision)}`,
    `Rating: ${rating.label}`,
    "",
    `At Threshold = ${formatNum(thresholdStats.threshold, 2)}:`,
    `  TP=${thresholdStats.tp} FP=${thresholdStats.fp} TN=${thresholdStats.tn} FN=${thresholdStats.fn}`,
    `  Accuracy: ${formatNum(thresholdStats.accuracy, precision)}`,
    `  Precision: ${formatNum(thresholdStats.precision, precision)}`,
    `  Recall (Sensitivity): ${formatNum(thresholdStats.recall, precision)}`,
    `  Specificity: ${formatNum(thresholdStats.specificity, precision)}`,
    `  F1 Score: ${formatNum(thresholdStats.f1, precision)}`,
    "",
    "Formula: TPR = TP / (TP + FN), FPR = FP / (FP + TN), AUC = trapezoidal integral of TPR over FPR",
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: ROCResult): string {
  const rows: (string | number)[][] = [["Threshold", "TPR", "FPR", "TP", "FP", "TN", "FN"]];
  for (const p of result.rocPoints) rows.push([formatNum(p.threshold, 4), formatNum(p.tpr, 4), formatNum(p.fpr, 4), p.tp, p.fp, p.tn, p.fn]);
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ROCResult, thresholdStats: ThresholdStats): string {
  return JSON.stringify(
    {
      auc: result.auc,
      totalSamples: result.totalSamples,
      totalPositives: result.totalPositives,
      totalNegatives: result.totalNegatives,
      rating: classifyAUC(result.auc).label,
      rocPoints: result.rocPoints,
      thresholdStats,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}
