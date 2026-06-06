export type InputMode = "manual" | "csv";

export interface ComparisonRow {
  index: number;
  actual: string;
  predicted: string;
  correct: boolean;
}

export interface AccuracyResult {
  accuracy: number;          // 0–100
  correct: number;
  incorrect: number;
  total: number;
  rows: ComparisonRow[];
  classSummary: ClassSummary[];
  tier: "excellent" | "good" | "moderate" | "poor";
  tierLabel: string;
}

export interface ClassSummary {
  label: string;
  total: number;
  correct: number;
  accuracy: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: AccuracyResult;
  snippet: string;   // short preview like "5 samples, 80%"
}
