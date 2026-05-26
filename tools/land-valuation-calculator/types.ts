export type Unit =
  | "sqft" | "sqm" | "acre" | "hectare"
  | "decimal" | "katha" | "bigha" | "marla" | "kanal";

export type Currency = "USD" | "EUR" | "GBP" | "BDT" | "INR";

export interface CalculatorInputs {
  area: string;
  unit: Unit;
  pricePerUnit: string;
  currency: Currency;
  extraCost: string;
  precision: number;
}

export interface CalculationResult {
  landValue: number;
  extraCost: number;
  totalValue: number;
  area: number;
  pricePerUnit: number;
  unit: Unit;
  currency: Currency;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
