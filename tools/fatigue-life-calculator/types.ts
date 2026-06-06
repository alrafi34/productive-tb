export type CalculationMethod = "basquin" | "sn-curve" | "miners-rule";
export type MaterialPreset = "steel" | "aluminum" | "titanium" | "copper" | "custom";
export type StressUnit = "MPa" | "psi";
export type TemperatureCondition = "room" | "high" | "extreme";

export interface MinerLoad {
  id: string;
  stressAmplitude: number;
  cycles: number;
}

export interface FatigueInputs {
  method: CalculationMethod;
  material: MaterialPreset;
  stressAmplitude: number;
  stressUnit: StressUnit;
  // Basquin specific
  fatigueStrengthCoefficient: number;
  fatigueStrengthExponent: number;
  // Optional
  appliedCycles?: number;
  safetyFactor: number;
  temperature: TemperatureCondition;
  // Miner's rule
  minerLoads: MinerLoad[];
}

export interface FatigueResult {
  method: CalculationMethod;
  estimatedLifeCycles: number;
  adjustedLifeCycles: number;
  safetyFactor: number;
  damageRatio?: number;
  failurePredicted?: boolean;
  riskLevel: "Safe" | "Low Risk" | "Moderate" | "High Risk" | "Critical";
  enduranceLimit: number;
  exceedsEnduranceLimit: boolean;
  temperatureFactor: number;
  formula: string;
  steps: string[];
  warnings: string[];
  snCurvePoints: { logN: number; stressMPa: number }[];
  userPoint: { logN: number; stressMPa: number } | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FatigueInputs;
  result: FatigueResult;
}

export interface MaterialData {
  name: string;
  sigmaF: number;       // Fatigue strength coefficient (MPa)
  b: number;            // Fatigue strength exponent
  enduranceLimit: number; // MPa
  ultimateStrength: number; // MPa
}
