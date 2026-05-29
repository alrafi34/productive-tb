export type BeamType = "simply-supported" | "cantilever" | "fixed" | "overhanging";
export type LoadType = "point-center" | "point-any" | "udl" | "multiple-point";
export type LengthUnit = "mm" | "cm" | "m" | "ft" | "in";
export type ForceUnit = "N" | "kN" | "lbf" | "kip";
export type MomentUnit = "Nm" | "kNm" | "lb-ft" | "lb-in" | "kip-ft";
export type Precision = 2 | 4 | 6;

export interface PointLoad {
  id: string;
  magnitude: string;
  position: string;
}

export interface BendingMomentInputs {
  beamType: BeamType;
  loadType: LoadType;
  length: string;
  lengthUnit: LengthUnit;
  load: string;
  forceUnit: ForceUnit;
  loadPosition: string;
  pointLoads: PointLoad[];
  outputUnit: MomentUnit;
  precision: Precision;
}

export interface BendingMomentResult {
  maxMoment: number;
  maxMomentNm: number;
  maxMomentKNm: number;
  maxMomentLbFt: number;
  maxMomentLbIn: number;
  maxMomentKipFt: number;
  momentAtPosition: number;
  reactionA: number;
  reactionB: number | null;
  formula: string;
  formulaLabel: string;
  momentCurve: { x: number; y: number }[];
  shearCurve: { x: number; y: number }[];
  maxMomentPosition: number;
  lengthM: number;
  loadN: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BendingMomentInputs;
  result: BendingMomentResult;
}
