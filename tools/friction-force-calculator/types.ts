export type ForceUnit = "N" | "kN" | "lbf";
export type CalcMode = "static" | "kinetic";
export type Precision = 2 | 4 | 6;

export interface FrictionInputs {
  coefficient: string;
  normalForce: string;
  normalForceUnit: ForceUnit;
  calcMode: CalcMode;
  precision: Precision;
}

export interface FrictionResult {
  frictionN: number;
  frictionKN: number;
  frictionLbf: number;
  normalForceN: number;
  coefficientUsed: number;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FrictionInputs;
  result: FrictionResult;
}
