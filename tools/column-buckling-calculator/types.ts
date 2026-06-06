export type LengthUnit = "mm" | "cm" | "m" | "in" | "ft";
export type ModulusUnit = "MPa" | "GPa" | "psi";
export type MoiUnit = "mm4" | "cm4" | "m4" | "in4";
export type EndCondition = "pinned-pinned" | "fixed-fixed" | "fixed-free" | "fixed-pinned";
export type LoadUnit = "N" | "kN" | "MN" | "lbf" | "kip";
export type Precision = 2 | 4 | 6;

export interface BucklingInputs {
  length: string;
  lengthUnit: LengthUnit;
  modulus: string;
  modulusUnit: ModulusUnit;
  momentOfInertia: string;
  moiUnit: MoiUnit;
  endCondition: EndCondition;
  material: string;
  safetyFactor: string;
  axialLoad: string;
  axialLoadUnit: LoadUnit;
  showAxialLoad: boolean;
  outputUnit: LoadUnit;
  precision: Precision;
}

export interface BucklingResult {
  pcrN: number;             // Critical load in Newtons
  pcrKN: number;
  pcrMN: number;
  pcrLbf: number;
  pcrKip: number;
  effectiveLength: number;  // Ke * L in metres
  slendernessRatio: number | null;
  safetyStatus: "safe" | "warning" | "danger" | "unknown";
  safetyMessage: string;
  kFactor: number;
  formulaSteps: {
    L_m: number;
    E_Pa: number;
    I_m4: number;
    K: number;
    KL_m: number;
  };
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BucklingInputs;
  result: BucklingResult;
}
