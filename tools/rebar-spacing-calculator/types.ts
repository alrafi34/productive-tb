export type CalculationMode = 'spacing' | 'bars';
export type Unit = 'mm' | 'inch';

export interface SpacingInputs {
  width: string;
  numberOfBars: string;
  barDiameter: string;
  clearCover: string;
}

export interface BarsInputs {
  width: string;
  desiredSpacing: string;
  barDiameter: string;
  clearCover: string;
}

export interface SpacingCalculation {
  id: string;
  mode: CalculationMode;
  width: number;
  numberOfBars?: number;
  desiredSpacing?: number;
  barDiameter: number;
  clearCover: number;
  effectiveWidth: number;
  spacing?: number;
  clearSpacing?: number;
  calculatedBars?: number;
  unit: Unit;
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: SpacingCalculation;
}
