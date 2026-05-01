export type Unit = 'ft' | 'm';
export type CalculationMode = 'room' | 'custom';

export interface RoomDimensions {
  length: string;
  width: string;
  height: string;
}

export interface PaintCalculation {
  totalArea: number;
  openingsArea: number;
  netArea: number;
  coats: number;
  coverage: number;
  paintRequired: number;
  recommendedPurchase: number;
  unit: Unit;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: PaintCalculation;
  mode: CalculationMode;
}
