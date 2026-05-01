export type Unit = 'ft' | 'm' | 'yd' | 'in';

export interface RoomDimensions {
  length: string;
  width: string;
  unit: Unit;
}

export interface CalculationResult {
  area: number;
  unit: Unit;
  dimensions: RoomDimensions;
  conversions: {
    sqft: number;
    sqm: number;
    sqyd: number;
  };
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  result: CalculationResult;
}
