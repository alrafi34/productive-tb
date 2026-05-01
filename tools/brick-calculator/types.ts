export type Unit = 'ft' | 'm';
export type WallThickness = 'half' | 'full';

export interface WallDimensions {
  length: string;
  height: string;
  thickness: WallThickness;
}

export interface BrickSize {
  length: string;
  width: string;
  height: string;
}

export interface BrickPreset {
  name: string;
  length: number;
  width: number;
  height: number;
  unit: 'in';
}

export interface BrickCalculation {
  wallArea: number;
  wallVolume: number;
  brickVolume: number;
  bricksNeeded: number;
  bricksWithWastage: number;
  wastagePercentage: number;
  openingsArea: number;
  unit: Unit;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: BrickCalculation;
}
