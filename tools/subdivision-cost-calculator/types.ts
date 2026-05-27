export type Currency = "USD" | "EUR" | "GBP" | "AUD" | "CAD";
export type LandUnit = "acres" | "sqft" | "sqm" | "hectares";

export interface CalculatorInputs {
  landSize: string;
  landUnit: LandUnit;
  numPlots: string;
  surveyCost: string;
  legalFees: string;
  permitCost: string;
  utilityCost: string;
  roadCost: string;
  drainageCost: string;
  miscCost: string;
  currency: Currency;
}

export interface CostItem {
  label: string;
  value: number;
  pct: number;
}

export interface CalculationResult {
  totalCost: number;
  costPerPlot: number;
  landPerPlot: number;
  landUnit: LandUnit;
  currency: Currency;
  breakdown: CostItem[];
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
