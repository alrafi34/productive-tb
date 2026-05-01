export type Unit = 'm' | 'ft';

export type RoomShape = 'rectangular' | 'cylindrical' | 'triangular' | 'custom';

export interface RoomDimensions {
  shape: RoomShape;
  unit: Unit;
  // Rectangular
  length?: string;
  width?: string;
  height?: string;
  // Cylindrical
  radius?: string;
  cylinderHeight?: string;
  // Triangular (attic)
  triangleLength?: string;
  triangleWidth?: string;
  wallHeight?: string;
  peakHeight?: string;
}

export interface CalculationResult {
  volume: number;
  unit: Unit;
  shape: RoomShape;
  dimensions: RoomDimensions;
  conversions: {
    cubicMeters: number;
    cubicFeet: number;
    liters: number;
  };
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  result: CalculationResult;
}

export interface RoomPreset {
  name: string;
  length: number;
  width: number;
  height: number;
}
