export type CalculationMode = 'dimensions' | 'conversion';

export type DimensionUnit = 'm' | 'ft' | 'yd';

export type AreaUnit = 'sqft' | 'sqyd' | 'acre' | 'hectare' | 'decimal' | 'katha' | 'bigha' | 'sqkm' | 'sqm';

export interface DimensionInputs {
  length: string;
  width: string;
  unit: DimensionUnit;
}

export interface ConversionInputs {
  value: string;
  unit: AreaUnit;
}

export interface CalculationInputs {
  mode: CalculationMode;
  dimensions: DimensionInputs;
  conversion: ConversionInputs;
  precision: number;
}

export interface CalculationResult {
  squareMeters: number;
  conversions: {
    sqft: number;
    sqyd: number;
    acre: number;
    hectare: number;
    sqkm: number;
  };
  inputSummary: string;
  formula?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculationInputs;
  result: CalculationResult;
}