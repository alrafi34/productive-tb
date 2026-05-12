export type FrequencyUnit = "Hz" | "kHz" | "MHz";
export type CapacitanceUnit = "F" | "mF" | "µF" | "nF" | "pF";

export interface CalculationInput {
  frequency: number;
  frequencyUnit: FrequencyUnit;
  capacitance: number;
  capacitanceUnit: CapacitanceUnit;
}

export interface CalculationResult {
  reactance: number; // in Ohms
  frequency: number; // in Hz
  capacitance: number; // in Farads
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}
