export type FrequencyUnit = "Hz" | "kHz" | "MHz";
export type InductanceUnit = "H" | "mH" | "µH" | "nH";

export interface CalculationInput {
  frequency: number;
  frequencyUnit: FrequencyUnit;
  inductance: number;
  inductanceUnit: InductanceUnit;
}

export interface CalculationResult {
  reactance: number; // in Ohms
  frequency: number; // in Hz
  inductance: number; // in Henries
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}
