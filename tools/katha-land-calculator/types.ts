export type Region = "bangladesh" | "westbengal" | "bihar" | "nepal";

export type Unit = "katha" | "decimal" | "bigha" | "acre" | "sqft" | "sqm" | "hectare";

export interface CalculatorInputs {
  value: string;
  fromUnit: Unit;
  region: Region;
  precision: number;
}

export interface ConversionResult {
  squareFeet: number;
  katha: number;
  decimal: number;
  bigha: number;
  acre: number;
  sqft: number;
  sqm: number;
  hectare: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: ConversionResult;
}
