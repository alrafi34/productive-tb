export type UnitSystem = "metric" | "imperial";

export type FlowRateUnit = "m3s" | "m3h" | "Ls" | "Lmin" | "GPM" | "ft3s";

export interface PumpEfficiencyInputs {
  unitSystem: UnitSystem;
  flowRate: string;
  flowRateUnit: FlowRateUnit;
  head: string;
  inputPower: string;
  density: string;
  gravity: string;
}

export interface PumpEfficiencyResult {
  efficiency: number;
  hydraulicPowerW: number;
  hydraulicPowerKW: number;
  inputPowerW: number;
  efficiencyRating: "excellent" | "good" | "fair" | "poor";
  formulaSubstituted: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PumpEfficiencyInputs;
  result: PumpEfficiencyResult;
}
