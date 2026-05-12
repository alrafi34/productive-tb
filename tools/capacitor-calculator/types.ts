export type CalculationMode = 
  | "charge" 
  | "capacitance" 
  | "voltage" 
  | "energy";

export type CapacitanceUnit = "F" | "mF" | "µF" | "nF" | "pF";
export type VoltageUnit = "V" | "mV" | "kV";
export type ChargeUnit = "C" | "mC" | "µC" | "nC";
export type EnergyUnit = "J" | "mJ" | "µJ";

export interface CalculationInput {
  mode: CalculationMode;
  capacitance?: number;
  capacitanceUnit?: CapacitanceUnit;
  voltage?: number;
  voltageUnit?: VoltageUnit;
  charge?: number;
  chargeUnit?: ChargeUnit;
  energy?: number;
  energyUnit?: EnergyUnit;
}

export interface CalculationResult {
  value: number;
  unit: string;
  formula: string;
  steps: string[];
  conversions: { unit: string; value: string }[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: CalculationMode;
  input: CalculationInput;
  result: CalculationResult;
}
