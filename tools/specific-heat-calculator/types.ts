export type CalcMode = "Q" | "m" | "c" | "deltaT";
export type MassUnit = "kg" | "g" | "lb";
export type HeatUnit = "J/kgC" | "kJ/kgC" | "cal/gC";
export type TempUnit = "C" | "F" | "K";
export type Precision = 2 | 4 | 6;

export interface SpecificHeatInputs {
  mode: CalcMode;
  mass: string;
  massUnit: MassUnit;
  specificHeat: string;
  heatUnit: HeatUnit;
  initialTemp: string;
  finalTemp: string;
  tempUnit: TempUnit;
  heatEnergy: string;
  precision: Precision;
  material: string;
}

export interface SpecificHeatResult {
  value: number;
  unit: string;
  label: string;
  // conversions
  Q_J: number;
  Q_kJ: number;
  Q_kcal: number;
  Q_BTU: number;
  deltaT: number;
  // formula display
  formula: string;
  breakdown: string;
  steps: string[];
  interpretation: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SpecificHeatInputs;
  result: SpecificHeatResult;
}
