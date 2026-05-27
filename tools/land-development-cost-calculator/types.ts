export type Currency = "USD" | "EUR" | "GBP" | "AUD" | "CAD";
export type AreaUnit = "sqft" | "sqm" | "acre" | "hectare";
export type ProjectType = "residential" | "commercial" | "industrial" | "agricultural";

export interface CustomCostRow {
  id: string;
  label: string;
  value: string;
}

export interface CalculatorInputs {
  // Land info
  landArea: string;
  areaUnit: AreaUnit;
  landPurchase: string;
  // Development costs
  roadCost: string;
  sitePreparation: string;
  drainage: string;
  water: string;
  electricity: string;
  sewer: string;
  permitFees: string;
  engineering: string;
  labor: string;
  materials: string;
  // Adjustments
  contingencyPct: number;
  taxPct: number;
  // Settings
  currency: Currency;
  // Custom rows
  customRows: CustomCostRow[];
}

export interface CostItem {
  label: string;
  value: number;
  pct: number;
}

export interface CalculationResult {
  baseCost: number;
  contingencyAmount: number;
  taxAmount: number;
  totalCost: number;
  costPerUnit: number;
  areaUnit: AreaUnit;
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

export interface ScenarioEntry {
  id: string;
  label: string;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
