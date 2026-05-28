export type VelocityUnit = "m/s" | "km/h" | "mph" | "ft/s";
export type TimeUnit = "s" | "min" | "h";
export type CalcMode = "acceleration" | "finalVelocity" | "initialVelocity" | "time";
export type Precision = 0 | 1 | 2 | 3;

export interface AccelerationInputs {
  mode: CalcMode;
  initialVelocity: string;
  finalVelocity: string;
  time: string;
  acceleration: string;
  velocityUnit: VelocityUnit;
  timeUnit: TimeUnit;
  precision: Precision;
}

export interface AccelerationResult {
  value: number;
  unit: string;
  deltaV: number;
  isDeceleration: boolean;
  formula: string;
  steps: string[];
  // SI values
  initialVelocityMs: number;
  finalVelocityMs: number;
  timeS: number;
  accelerationMs2: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: AccelerationInputs;
  result: AccelerationResult;
}
