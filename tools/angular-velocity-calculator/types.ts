export type CalcMode =
  | "displacement"
  | "linear"
  | "rpm"
  | "frequency"
  | "period";

// ── Displacement + Time ─────────────────────────────────────────────────────
export type AngleUnit = "deg" | "rad" | "rev";
export type TimeUnit  = "s" | "min" | "h";

// ── Linear Velocity + Radius ────────────────────────────────────────────────
export type LinearVelocityUnit = "ms" | "kmh" | "fts" | "mph";
export type RadiusUnit         = "mm" | "cm" | "m" | "km" | "in" | "ft";

// ── Frequency ───────────────────────────────────────────────────────────────
export type FrequencyUnit = "Hz" | "kHz" | "MHz";

// ── Period ──────────────────────────────────────────────────────────────────
export type PeriodUnit = "ms" | "s" | "min";

// ── Output ──────────────────────────────────────────────────────────────────
export type ResultUnit = "rad/s" | "deg/s" | "rev/s" | "rpm";
export type Precision  = 2 | 4 | 6 | 8;

export interface AngularVelocityInputs {
  mode: CalcMode;

  // Mode 1
  theta:     string;
  thetaUnit: AngleUnit;
  time:      string;
  timeUnit:  TimeUnit;

  // Mode 2
  velocity:     string;
  velocityUnit: LinearVelocityUnit;
  radius:       string;
  radiusUnit:   RadiusUnit;

  // Mode 3
  rpm: string;

  // Mode 4
  frequency:     string;
  frequencyUnit: FrequencyUnit;

  // Mode 5
  period:     string;
  periodUnit: PeriodUnit;

  // Output
  resultUnit: ResultUnit;
  precision:  Precision;
}

export interface AngularVelocityResult {
  // base result in rad/s
  radPerS: number;
  // converted
  degPerS: number;
  revPerS: number;
  rpm:     number;
  // formula string
  formula: string;
  // step-by-step
  steps: string[];
}

export interface HistoryEntry {
  id:        string;
  timestamp: number;
  inputs:    AngularVelocityInputs;
  result:    AngularVelocityResult;
}
