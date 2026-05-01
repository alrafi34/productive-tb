export type Unit = 'ft' | 'm' | 'cm' | 'in';
export type CalculationMode = 'dimension' | 'area';

export interface RoomDimensions {
  length: string;
  width: string;
}

export interface TileSize {
  length: string;
  width: string;
}

export interface TileCalculation {
  totalArea: number;
  tileArea: number;
  tilesNeeded: number;
  tilesWithWaste: number;
  wastePercentage: number;
  unit: Unit;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: TileCalculation;
  mode: CalculationMode;
}

export interface TilePreset {
  name: string;
  length: number;
  width: number;
  unit: Unit;
}
