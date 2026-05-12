export type ResistanceUnit = "Ω" | "kΩ" | "MΩ";
export type CapacitanceUnit = "F" | "mF" | "µF" | "nF" | "pF";
export type ChargePercentage = 50 | 63 | 90 | 95 | 99;

export interface CalculationInput {
  resistance: number;
  resistanceUnit: ResistanceUnit;
  capacitance: number;
  capacitanceUnit: CapacitanceUnit;
  targetPercentage: ChargePercentage;
  voltage?: number; // Optional for visualization
}

export interface CalculationResult {
  timeConstant: number; // τ (tau) in seconds
  chargeTime: number; // Time to reach target percentage in seconds
  fullChargeTime: number; // ~5τ in seconds
  targetPercentage: number;
  resistance: number; // in Ohms
  capacitance: number; // in Farads
  formula: string;
  steps: string[];
  conversions: {
    unit: string;
    value: string;
  }[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}
