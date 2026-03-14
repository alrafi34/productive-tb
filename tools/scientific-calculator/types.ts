export type AngleMode = 'deg' | 'rad';

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface MemoryState {
  value: number;
}
