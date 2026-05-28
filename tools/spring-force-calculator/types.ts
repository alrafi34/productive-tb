export type SpringConstantUnit = "N/m" | "lb/in" | "kN/m";
export type DisplacementUnit = "m" | "cm" | "mm" | "in";
export type MotionType = "compression" | "extension";
export type Precision = 2 | 4 | 6;

export interface SpringForceInputs {
  springConstant: string;
  springConstantUnit: SpringConstantUnit;
  displacement: string;
  displacementUnit: DisplacementUnit;
  motionType: MotionType;
  precision: Precision;
}

export interface SpringForceResult {
  forceN: number;
  forceKN: number;
  forceLbf: number;
  springConstantNm: number;
  displacementM: number;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SpringForceInputs;
  result: SpringForceResult;
}
