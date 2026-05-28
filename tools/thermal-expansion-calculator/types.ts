export type ExpansionType = "linear" | "area" | "volume";
export type TempUnit = "C" | "F" | "K";
export type DimUnit = "m" | "cm" | "mm" | "ft" | "in";
export type Precision = 2 | 4 | 6;

export interface ThermalExpansionInputs {
  expansionType: ExpansionType;
  material: string;
  alpha: string; // coefficient of thermal expansion (per °C)
  dimension: string; // initial length / area / volume
  dimUnit: DimUnit;
  initialTemp: string;
  finalTemp: string;
  tempUnit: TempUnit;
  precision: Precision;
  // compare mode
  compareMode: boolean;
  material2: string;
  alpha2: string;
}

export interface ThermalExpansionResult {
  deltaT: number; // °C
  delta: number; // change in dimension (in selected unit)
  finalDim: number; // final dimension (in selected unit)
  percentChange: number;
  formula: string;
  breakdown: string;
  // compare
  delta2?: number;
  finalDim2?: number;
  percentChange2?: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ThermalExpansionInputs;
  result: ThermalExpansionResult;
}
