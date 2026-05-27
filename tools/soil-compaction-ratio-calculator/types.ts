export type DensityUnit = "g/cm3" | "kg/m3" | "lb/ft3";
export type CompactionStandard = 90 | 92 | 95 | 98 | 100;

export interface CalculatorInputs {
  fieldDensity: string;
  maxDensity: string;
  unit: DensityUnit;
  requiredStandard: CompactionStandard;
}

export interface CalculationResult {
  fieldDensity: number;
  maxDensity: number;
  unit: DensityUnit;
  requiredStandard: CompactionStandard;
  compactionRatio: number;
  difference: number;
  status: "pass" | "warning" | "fail";
  statusLabel: string;
  engineeringNote: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}
