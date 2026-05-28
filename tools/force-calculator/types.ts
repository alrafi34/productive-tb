export type MassUnit = "kg" | "g" | "lb" | "t";
export type AccelUnit = "m/s2" | "ft/s2";
export type Precision = 2 | 4 | 6;

export interface ForceInputs {
  mass: string;
  massUnit: MassUnit;
  accel: string;
  accelUnit: AccelUnit;
  precision: Precision;
}

export interface ForceResult {
  forceN: number;
  forceKN: number;
  forceLbf: number;
  massKg: number;
  accelMs2: number;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ForceInputs;
  result: ForceResult;
}
