export type Unit = "ft" | "m";
export type Currency = "USD" | "EUR" | "GBP" | "BDT" | "INR";
export type Thickness = "4in" | "5in" | "9in" | "12in";

export interface CalculatorInputs {
  perimeter: string;
  unit: Unit;
  wallHeight: string;
  thickness: Thickness;
  materialCostPerSqft: string;
  laborCostPerSqft: string;
  plasterCost: string;
  gateCost: string;
  miscCost: string;
  currency: Currency;
  precision: number;
}

export interface CalculationResult {
  wallArea: number;
  materialCost: number;
  laborCost: number;
  plasterCost: number;
  gateCost: number;
  miscCost: number;
  subtotal: number;
  totalCost: number;
  unit: Unit;
  currency: Currency;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
