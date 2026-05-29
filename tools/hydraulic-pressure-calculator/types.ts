export type CalcMode = "pressure" | "force" | "area" | "diameter";

export type ForceUnit = "N" | "kN" | "lbf" | "tonf";
export type AreaUnit = "m2" | "cm2" | "mm2" | "in2";
export type PressureUnit = "Pa" | "kPa" | "MPa" | "bar" | "psi";
export type DiameterUnit = "mm" | "cm" | "m" | "in";
export type Precision = 2 | 4 | 6;

export interface HydraulicInputs {
  mode: CalcMode;
  force: string;
  forceUnit: ForceUnit;
  area: string;
  areaUnit: AreaUnit;
  pressure: string;
  pressureUnit: PressureUnit;
  diameter: string;
  diameterUnit: DiameterUnit;
  precision: Precision;
}

export interface HydraulicResult {
  // Pressure outputs (Pa)
  pressurePa: number;
  pressureKPa: number;
  pressureMPa: number;
  pressureBar: number;
  pressurePsi: number;
  // Force outputs (N)
  forceN: number;
  forceKN: number;
  forceLbf: number;
  forceTonf: number;
  // Area outputs (m²)
  areaM2: number;
  areaCm2: number;
  areaMm2: number;
  areaIn2: number;
  // Diameter outputs (m)
  diameterM: number;
  diameterMm: number;
  diameterCm: number;
  diameterIn: number;
  // Formula string
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HydraulicInputs;
  result: HydraulicResult;
}
