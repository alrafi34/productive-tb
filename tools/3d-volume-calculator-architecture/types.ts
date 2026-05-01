export type Unit = "meters" | "feet";
export type ShapeType = "rectangular" | "cylinder" | "sphere" | "cone";

export interface RectangularInputs {
  length: number;
  width: number;
  height: number;
}

export interface CylinderInputs {
  radius: number;
  height: number;
}

export interface SphereInputs {
  radius: number;
}

export interface ConeInputs {
  radius: number;
  height: number;
}

export type ShapeInputs = RectangularInputs | CylinderInputs | SphereInputs | ConeInputs;

export interface VolumeCalculation {
  shape: ShapeType;
  volume: number;
  unit: Unit;
  inputs: ShapeInputs;
  formula: string;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: VolumeCalculation;
}

export interface PresetTemplate {
  name: string;
  description: string;
  shape: ShapeType;
  inputs: ShapeInputs;
  category: string;
}
