export type Unit = "sqft" | "sqm" | "decimal" | "acre" | "katha" | "bigha" | "hectare";
export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

export interface CalculatorInputs {
  totalPrice: string;
  area: string;
  areaUnit: Unit;
  currency: Currency;
  precision: number;
}

export interface CalculationResult {
  pricePerSqFt: number;
  totalAreaSqFt: number;
  totalPrice: number;
  currency: Currency;
  areaUnit: Unit;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
