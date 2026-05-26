export type Region = "bangladesh" | "westbengal" | "bihar" | "nepal" | "global";

export type Unit = "decimal" | "acre" | "katha" | "bigha" | "sqft" | "sqm" | "hectare" | "shotok" | "cent";

export interface CalculatorInputs {
  value: string;
  fromUnit: Unit;
  region: Region;
  precision: number;
}

export interface ConversionResult {
  decimal: number;
  acre: number;
  katha: number;
  bigha: number;
  sqft: number;
  sqm: number;
  hectare: number;
  shotok: number;
  cent: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: ConversionResult;
}
