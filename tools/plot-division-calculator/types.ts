export type Unit = "sqft" | "sqm" | "decimal" | "acre" | "bigha" | "katha" | "hectare";

export interface CalculatorInputs {
  totalLand: string;
  landUnit: Unit;
  numPlots: string;
  landWidth: string;
  landLength: string;
  roadWidth: string;
  divisionMode: "equal-area" | "equal-width" | "equal-length" | "custom-grid";
  customRows: string;
  customCols: string;
}

export interface CalculationResult {
  plotSize: number;
  plotSizeUnit: Unit;
  usableLand: number;
  roadArea: number;
  remainingLand: number;
  suggestedRows: number;
  suggestedCols: number;
  plotWidth?: number;
  plotLength?: number;
  totalArea: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
