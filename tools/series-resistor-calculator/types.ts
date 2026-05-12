export type ResistanceUnit = "Ω" | "kΩ" | "MΩ";

export interface Resistor {
  id: string;
  value: number;
  unit: ResistanceUnit;
}

export interface CalculationResult {
  totalResistance: number;
  unit: ResistanceUnit;
  resistors: Resistor[];
  conversions: { unit: string; value: string }[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: CalculationResult;
}
