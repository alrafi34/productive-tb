export type ShapeType =
  | "rectangle"
  | "hollow-rectangle"
  | "circle"
  | "hollow-circle"
  | "triangle"
  | "i-beam"
  | "t-beam"
  | "channel"
  | "pipe";

export type LengthUnit = "mm" | "cm" | "m" | "in" | "ft";
export type Precision = 2 | 4 | 6;

export interface ShapeDimensions {
  // Rectangle / Hollow Rectangle
  width?: string;
  height?: string;
  innerWidth?: string;
  innerHeight?: string;
  // Circle / Hollow Circle / Pipe
  diameter?: string;
  outerDiameter?: string;
  innerDiameter?: string;
  // Triangle
  base?: string;
  // I-Beam
  flangeWidth?: string;
  flangeThickness?: string;
  webHeight?: string;
  webThickness?: string;
  // T-Beam
  tFlangeWidth?: string;
  tFlangeThickness?: string;
  tWebHeight?: string;
  tWebThickness?: string;
  // Channel
  chFlangeWidth?: string;
  chFlangeThickness?: string;
  chWebHeight?: string;
  chWebThickness?: string;
}

export interface MOIInputs {
  shape: ShapeType;
  unit: LengthUnit;
  dims: ShapeDimensions;
  precision: Precision;
}

export interface MOIResult {
  Ix: number;
  Iy: number;
  Ip: number; // polar moment
  Sx: number; // section modulus x
  Sy: number; // section modulus y
  area: number;
  centroidX: number;
  centroidY: number;
  unitLabel: string; // e.g. "mm⁴"
  areaUnitLabel: string; // e.g. "mm²"
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: MOIInputs;
  result: MOIResult;
}
