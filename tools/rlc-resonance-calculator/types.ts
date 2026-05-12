export type ResistanceUnit = "Ω" | "kΩ" | "MΩ";
export type InductanceUnit = "H" | "mH" | "µH";
export type CapacitanceUnit = "F" | "mF" | "µF" | "nF" | "pF";
export type FrequencyUnit = "Hz" | "kHz" | "MHz";

export interface CalculationInput {
  resistance: number;
  resistanceUnit: ResistanceUnit;
  inductance: number;
  inductanceUnit: InductanceUnit;
  capacitance: number;
  capacitanceUnit: CapacitanceUnit;
}

export interface FrequencyConversion {
  value: string;
  unit: FrequencyUnit;
}

export interface CalculationResult {
  resonantFrequency: number; // in Hz
  resonantFrequencyFormatted: FrequencyConversion;
  resistanceOhms: number;
  inductanceHenries: number;
  capacitanceFarads: number;
  conversions: FrequencyConversion[];
  formula: string;
  steps: string[];
  impedance: number;
  qualityFactor: number;
  bandwidth: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}
