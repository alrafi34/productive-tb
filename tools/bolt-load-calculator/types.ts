export type UnitSystem = "metric" | "imperial";
export type BoltGrade = "4.6" | "5.8" | "8.8" | "10.9" | "12.9" | "grade2" | "grade5" | "grade8" | "custom";
export type ThreadType = "coarse" | "fine" | "custom";
export type DiameterUnit = "mm" | "in";
export type Precision = 2 | 4 | 6;

export interface BoltLoadInputs {
  diameter: string;
  diameterUnit: DiameterUnit;
  unitSystem: UnitSystem;
  grade: BoltGrade;
  yieldStrength: string;       // MPa or psi
  tighteningPercent: number;   // 50–90
  externalLoad: string;        // N or lbf
  threadType: ThreadType;
  customPitch: string;         // mm or tpi
  safetyFactor: string;
  precision: Precision;
}

export interface BoltLoadResult {
  stressAreaMm2: number;
  preloadForceN: number;
  preloadForcekN: number;
  preloadForceLbf: number;
  clampLoadN: number;
  clampLoadkN: number;
  clampLoadLbf: number;
  tensileStressMPa: number;
  tensileStressPsi: number;
  yieldUtilizationPct: number;
  safetyFactor: number;
  status: "safe" | "warning" | "danger";
  statusLabel: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BoltLoadInputs;
  result: BoltLoadResult;
}

export interface GradeData {
  label: string;
  yieldStrengthMPa: number;
  ultimateMPa: number;
}
