export type FractionOperation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  numerator: number;
  denominator: number;
  simplified: Fraction;
  mixedNumber?: {
    whole: number;
    numerator: number;
    denominator: number;
  };
  decimal: number;
  steps?: string[];
}

export interface CalculationHistory {
  id: string;
  fractionA: Fraction;
  fractionB: Fraction;
  operation: FractionOperation;
  result: FractionResult;
  timestamp: number;
}
