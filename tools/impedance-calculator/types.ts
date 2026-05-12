export type ResistanceUnit = "Ω" | "kΩ" | "MΩ";

export interface CalculationInput {
  resistance: number;
  resistanceUnit: ResistanceUnit;
  inductiveReactance: number;
  inductiveReactanceUnit: ResistanceUnit;
  capacitiveReactance: number;
  capacitiveReactanceUnit: ResistanceUnit;
}

export interface CalculationResult {
  impedance: number; // in Ohms
  netReactance: number; // in Ohms
  resistance: number; // in Ohms
  inductiveReactance: number; // in Ohms
  capacitiveReactance: number; // in Ohms
  phaseAngle: number; // in degrees
  circuitType: "Inductive" | "Capacitive" | "Resistive" | "Resonant";
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}
