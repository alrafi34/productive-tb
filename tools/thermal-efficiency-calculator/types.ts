export type CalcMode = "basic" | "carnot" | "engine";

export type EnergyUnit = "J" | "kJ" | "MJ";
export type PowerUnit = "W" | "kW" | "MW";
export type TempUnit = "K" | "C";
export type Precision = 2 | 3 | 4 | 6 | 8;

export interface BasicInputs {
  output: string;
  input: string;
  unit: EnergyUnit | PowerUnit;
}

export interface CarnotInputs {
  th: string;
  tc: string;
  tempUnit: TempUnit;
}

export interface EngineInputs {
  powerOutput: string;
  fuelInput: string;
  unit: PowerUnit;
}

export interface ThermalEfficiencyInputs {
  mode: CalcMode;
  basic: BasicInputs;
  carnot: CarnotInputs;
  engine: EngineInputs;
  precision: Precision;
}

export interface ThermalEfficiencyResult {
  efficiency: number;
  formula: string;
  steps: string[];
  breakdown: string;
  rating: "excellent" | "good" | "fair" | "poor";
  ratingLabel: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ThermalEfficiencyInputs;
  result: ThermalEfficiencyResult;
}
