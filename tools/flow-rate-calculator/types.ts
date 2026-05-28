export type CalcMode =
  | "volume-time"
  | "pipe-velocity"
  | "area-velocity"
  | "mass-flow";

// ── Volume units ──────────────────────────────────────────────────────────────
export type VolumeUnit = "m3" | "L" | "gal" | "ft3" | "mL" | "cm3";
export type TimeUnit = "s" | "min" | "hr";

// ── Diameter / length units ───────────────────────────────────────────────────
export type DiameterUnit = "m" | "cm" | "mm" | "in" | "ft";

// ── Velocity units ────────────────────────────────────────────────────────────
export type VelocityUnit = "m/s" | "ft/s" | "cm/s" | "km/h" | "mph";

// ── Area units ────────────────────────────────────────────────────────────────
export type AreaUnit = "m2" | "cm2" | "mm2" | "ft2" | "in2";

// ── Density units ─────────────────────────────────────────────────────────────
export type DensityUnit = "kg/m3" | "g/cm3" | "lb/ft3" | "lb/gal";

// ── Flow rate units ───────────────────────────────────────────────────────────
export type FlowUnit = "m3/s" | "m3/min" | "m3/hr" | "L/s" | "L/min" | "L/hr" | "gal/min" | "gal/hr" | "ft3/s" | "ft3/min" | "CFM";

// ── Mass flow units ───────────────────────────────────────────────────────────
export type MassFlowUnit = "kg/s" | "kg/min" | "kg/hr" | "lb/s" | "lb/min" | "lb/hr" | "g/s";

// ── Inputs per mode ───────────────────────────────────────────────────────────
export interface VolumeTimeInputs {
  volume: string;
  volumeUnit: VolumeUnit;
  time: string;
  timeUnit: TimeUnit;
}

export interface PipeVelocityInputs {
  diameter: string;
  diameterUnit: DiameterUnit;
  velocity: string;
  velocityUnit: VelocityUnit;
}

export interface AreaVelocityInputs {
  area: string;
  areaUnit: AreaUnit;
  velocity: string;
  velocityUnit: VelocityUnit;
}

export interface MassFlowInputs {
  flowRate: string;
  flowRateUnit: FlowUnit;
  density: string;
  densityUnit: DensityUnit;
}

// ── Result ────────────────────────────────────────────────────────────────────
export interface FlowResult {
  /** Primary volumetric flow in m³/s */
  qSI: number;
  /** Primary mass flow in kg/s (only for mass-flow mode) */
  massFlowSI?: number;
  /** Human-readable conversions */
  conversions: { label: string; value: string }[];
  /** Mass flow conversions (mass-flow mode) */
  massConversions?: { label: string; value: string }[];
  /** Formula string shown to user */
  formula: string;
  /** Substituted formula */
  formulaSubstituted: string;
  /** Step-by-step breakdown */
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  mode: CalcMode;
  timestamp: number;
  result: FlowResult;
  label: string;
}
