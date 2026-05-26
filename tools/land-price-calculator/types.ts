export type Unit = "decimal" | "acre" | "katha" | "bigha" | "sqft" | "sqm" | "hectare";

export type Currency = "USD" | "EUR" | "GBP" | "BDT" | "INR";

export interface CalculatorInputs {
  area: string;
  areaUnit: Unit;
  rate: string;
  rateUnit: Unit;
  currency: Currency;
  precision: number;
}

export interface CalculationResult {
  totalPrice: number;
  convertedArea: number;
  areaInRateUnit: number;
  rateApplied: number;
  currency: Currency;
}

export interface CompareEntry {
  label: string;
  area: string;
  areaUnit: Unit;
  rate: string;
  rateUnit: Unit;
  currency: Currency;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
