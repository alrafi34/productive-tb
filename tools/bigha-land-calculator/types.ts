export type Region = "bangladesh" | "westbengal" | "assam" | "nepal" | "custom";

export type Unit = "bigha" | "katha" | "decimal" | "acre" | "sqft" | "sqm" | "hectare";

export interface CalculatorInputs {
  value: string;
  fromUnit: Unit;
  region: Region;
  precision: number;
  customBigha: string; // sq ft per bigha when region === "custom"
}

export interface ConversionResult {
  squareFeet: number;
  bigha: number;
  katha: number;
  decimal: number;
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
