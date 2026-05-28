export type ForceUnit = "N" | "kN" | "lbf";
export type DistanceUnit = "mm" | "cm" | "m" | "in" | "ft";
export type TorqueUnit = "Nm" | "kNm" | "lb-ft" | "lb-in" | "oz-in";
export type Precision = 2 | 4 | 6;

export interface TorqueInputs {
  force: string;
  forceUnit: ForceUnit;
  distance: string;
  distanceUnit: DistanceUnit;
  angle: number;
  useAngle: boolean;
  precision: Precision;
}

export interface TorqueResult {
  torqueNm: number;
  torqueKNm: number;
  torqueLbFt: number;
  torqueLbIn: number;
  torqueOzIn: number;
  forceN: number;
  distanceM: number;
  angleRad: number;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: TorqueInputs;
  result: TorqueResult;
}
