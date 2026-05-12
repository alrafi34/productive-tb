export type ResistanceUnit = 'Ω' | 'kΩ' | 'MΩ';

export interface Resistor {
  id: string;
  value: string;
  unit: ResistanceUnit;
}

export interface CalculationResult {
  totalResistance: number;
  unit: ResistanceUnit;
  formattedValue: string;
  resistors: Resistor[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: CalculationResult;
}
