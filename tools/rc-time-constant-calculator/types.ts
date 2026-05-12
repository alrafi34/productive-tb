export type ResistanceUnit = "Ω" | "kΩ" | "MΩ";
export type CapacitanceUnit = "F" | "mF" | "µF" | "nF" | "pF";
export type TimeUnit = "s" | "ms" | "µs" | "ns";

export interface CalculationInput {
  resistance: number;
  resistanceUnit: ResistanceUnit;
  capacitance: number;
  capacitanceUnit: CapacitanceUnit;
}

export interface TimeConversion {
  value: string;
  unit: TimeUnit;
}

export interface CalculationResult {
  timeConstant: number; // in seconds
  timeConstantFormatted: TimeConversion;
  resistanceOhms: number;
  capacitanceFarads: number;
  conversions: TimeConversion[];
  formula: string;
  steps: string[];
  chargePercentages: {
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
