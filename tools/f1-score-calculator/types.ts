export type InputMode = "confusion" | "pr";

export interface ConfusionInputs {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface PRInputs {
  precision: number;
  recall: number;
}

export interface F1Result {
  precision: number;
  recall: number;
  f1: number;
  // Extended (only available from confusion matrix)
  accuracy?: number;
  specificity?: number;
  npv?: number;
  mcc?: number;
  total?: number;
  tier: "excellent" | "good" | "moderate" | "poor";
  tierLabel: string;
  explanation: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: InputMode;
  result: F1Result;
  label: string;
}
