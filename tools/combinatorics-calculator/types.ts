export type Operation =
  | "factorial"
  | "permutation"
  | "combination"
  | "perm-repetition"
  | "comb-repetition"
  | "circular"
  | "multiset";

export interface MultisetGroup {
  count: number;
}

export interface CalcResult {
  value: number | null;         // null when overflow
  valueStr: string;             // formatted string (may be sci notation)
  formula: string;              // e.g. "10! ÷ (3! × 7!)"
  steps: string[];              // step-by-step lines
  explanation: string;
  notation: string;             // e.g. "10C3"
  overflow: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  operation: Operation;
  n: number;
  r: number;
  multiset: MultisetGroup[];
  result: CalcResult;
}
