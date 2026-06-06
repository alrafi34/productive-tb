export interface CMInputs {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface MetricsResult {
  precision: number;
  recall: number;
  f1: number;
  accuracy: number;
  specificity: number;
  npv: number;           // Negative Predictive Value
  fpr: number;           // False Positive Rate
  fnr: number;           // False Negative Rate
  mcc: number;           // Matthews Correlation Coefficient
  total: number;
  positives: number;     // TP + FN
  negatives: number;     // TN + FP
  steps: Record<string, string[]>;  // formula step-by-step per metric
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CMInputs;
  result: MetricsResult;
  label?: string;
}
