export type SplitMode = "train-test" | "train-val-test" | "custom";

export type InputMode = "percentage" | "ratio";

export interface SplitResult {
  trainCount: number;
  valCount: number;
  testCount: number;
  trainPct: number;
  valPct: number;
  testPct: number;
  total: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  datasetSize: number;
  mode: SplitMode;
  result: SplitResult;
  label: string;
}
