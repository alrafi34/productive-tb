export type BeamType = "simply-supported" | "cantilever" | "fixed" | "overhanging";
export type LoadType = "point-center" | "point-any" | "udl" | "moment";
export type SectionType = "rectangle" | "circle" | "i-beam" | "pipe" | "custom";
export type UnitSystem = "metric" | "imperial";
export type Precision = 2 | 4 | 6;

export interface SectionDimensions {
  // Rectangle
  width?: number;   // b
  height?: number;  // h
  // Circle
  diameter?: number;
  // I-Beam
  flangeWidth?: number;
  flangeThickness?: number;
  webHeight?: number;
  webThickness?: number;
  // Pipe
  outerDiameter?: number;
  innerDiameter?: number;
  // Custom
  customI?: number; // mm^4 or in^4
}

export interface BeamInputs {
  beamType: BeamType;
  loadType: LoadType;
  length: string;          // m or ft
  load: string;            // kN, N, kip, lbf  (or kN/m, lbf/ft for UDL)
  loadPosition: string;    // m or ft from left (for point-any)
  material: string;        // "steel" | "aluminum" | "concrete" | "wood" | "custom"
  customE: string;         // GPa or ksi
  sectionType: SectionType;
  section: SectionDimensions;
  unitSystem: UnitSystem;
  precision: Precision;
}

export interface BeamResult {
  maxDeflection: number;   // mm or in
  deflectionUnit: string;
  slope: number;           // radians
  reactionA: number;       // kN or kip
  reactionB: number | null;
  maxMoment: number;       // kNm or kip-ft
  maxShear: number;        // kN or kip
  momentOfInertia: number; // mm^4 or in^4
  elasticModulus: number;  // GPa or ksi
  formula: string;
  steps: string[];
  deflectionCurve: { x: number; y: number }[]; // normalised 0-1 for SVG
  momentCurve: { x: number; y: number }[];
  shearCurve: { x: number; y: number }[];
  safetyNote: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BeamInputs;
  result: BeamResult;
}
