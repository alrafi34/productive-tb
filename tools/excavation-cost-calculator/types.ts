export type InputUnit = "ft" | "m";
export type OutputUnit = "yd3" | "m3" | "ft3";
export type ExcavationType =
  | "foundation"
  | "basement"
  | "leveling"
  | "trench"
  | "pond"
  | "custom";
export type SoilType = "loose" | "clay" | "sand" | "gravel" | "mixed" | "rock";
export type Currency = "USD" | "EUR" | "GBP" | "BDT" | "INR";

export interface CalculatorInputs {
  unit: InputUnit;
  excavationType: ExcavationType;
  length: string;
  width: string;
  depth: string;
  soilType: SoilType;
  excavationRate: string;   // cost per output unit
  laborCost: string;        // per day
  laborDays: string;
  equipmentCost: string;    // per hour
  equipmentHours: string;
  transportCost: string;    // flat
  currency: Currency;
  outputUnit: OutputUnit;
}

export interface CalculationResult {
  volumeFt3: number;
  volumeM3: number;
  volumeYd3: number;
  volumeInUnit: number;
  outputUnit: OutputUnit;
  soilMultiplier: number;
  baseExcavationCost: number;
  adjustedExcavationCost: number;
  laborTotal: number;
  equipmentTotal: number;
  transportTotal: number;
  totalCost: number;
  currency: Currency;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
