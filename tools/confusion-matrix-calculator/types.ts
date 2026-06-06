export type InputMode = "direct" | "matrix" | "csv";

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
  npv: number;
  fpr: number;
  fnr: number;
  mcc: number;
  balancedAccuracy: number;
  support: number;
  positives: number;
  negatives: number;
  steps: Record<string, string[]>;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CMInputs;
  result: MetricsResult;
  label?: string;
}
