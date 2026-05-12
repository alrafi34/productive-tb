export type ResistanceUnit = "Ω" | "kΩ" | "MΩ";
export type InductanceUnit = "H" | "mH" | "µH";
export type TimeUnit = "s" | "ms" | "µs" | "ns";

export interface CalculationInput {
  inductance: number;
  inductanceUnit: InductanceUnit;
  resistance: number;
  resistanceUnit: ResistanceUnit;
}

export interface TimeConversion {
  value: string;
  unit: TimeUnit;
}

export interface CalculationResult {
  timeConstant: number; // in seconds
  timeConstantFormatted: TimeConversion;
  inductanceHenries: number;
  resistanceOhms: number;
  conversions: TimeConversion[];
  formula: string;
  steps: string[];
  currentPercentages: {
    percentage: number;
    time: number;
    timeFormatted: TimeConversion;
    timeConstants: string;
  }[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}
