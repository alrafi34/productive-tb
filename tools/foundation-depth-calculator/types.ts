export type UnitSystem = 'imperial' | 'metric';

/** Presumptive soil classes of IRC Table R401.4.1, plus a value from a soils report. */
export type SoilClass = 'bedrock' | 'sedimentary-rock' | 'gravel' | 'sand' | 'clay' | 'custom';

/** Continuous footing under a wall, or an isolated square footing under a column. */
export type FootingKind = 'wall' | 'column';

export interface SoilPreset {
  soil: SoilClass;
  name: string;
  /** Unified Soil Classification symbols the class covers. */
  uscs: string;
  /** Presumptive allowable bearing pressure, psf. */
  psf: number;
}

export interface FoundationInputs {
  system: UnitSystem;
  kind: FootingKind;
  soil: SoilClass;
  /** Frost depth: inches (imperial) or mm (metric). */
  frostDepth: number;
  /** Wall load per unit length (plf | kN/m) or column load (lb | kN). Optional. */
  load?: number;
  /** Allowable bearing when soil = 'custom': psf | kPa. */
  customBearing?: number;
}

export interface FoundationResult {
  system: UnitSystem;
  kind: FootingKind;
  soil: SoilClass;
  /** Bottom of footing below finished grade, in (imperial) or mm (metric). */
  minDepth: number;
  depthGovernedBy: 'frost' | 'code-minimum';
  /** Allowable bearing used, psf | kPa. */
  bearing: number;
  /** Wall footing width, or column footing side: in | mm. Absent without a load. */
  width?: number;
  widthGovernedBy?: 'load' | 'code-minimum';
  /** Column footing plan area: ft² | m². */
  area?: number;
  notes: string[];
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  inputs: FoundationInputs;
  result: FoundationResult;
}
