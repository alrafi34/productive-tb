export type VelocityUnit = "m/s" | "km/h" | "mph" | "ft/s";
export type FluidType = "air" | "water" | "custom";
export type Precision = 2 | 4 | 6;

export interface DragInputs {
  fluidType: FluidType;
  velocity: string;
  velocityUnit: VelocityUnit;
  density: string;
  dragCoefficient: string;
  area: string;
  precision: Precision;
}

export interface DragResult {
  dragForceN: number;
  dragForceKN: number;
  dragForceLbf: number;
  velocityMs: number;
  densityUsed: number;
  cdUsed: number;
  areaUsed: number;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DragInputs;
  result: DragResult;
}
