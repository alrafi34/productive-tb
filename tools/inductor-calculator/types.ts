export type CalculationMode = 
  | "inductance-solenoid" 
  | "inductance-air-core" 
  | "reactance";

export type InductanceUnit = "H" | "mH" | "µH" | "nH";
export type FrequencyUnit = "Hz" | "kHz" | "MHz";
export type LengthUnit = "m" | "cm" | "mm";
export type AreaUnit = "m²" | "cm²" | "mm²";
export type PermeabilityType = "air" | "iron" | "custom";

export interface CalculationInput {
  mode: CalculationMode;
  
  // Solenoid inputs
  turns?: number;
  length?: number;
  lengthUnit?: LengthUnit;
  area?: number;
  areaUnit?: AreaUnit;
  permeabilityType?: PermeabilityType;
  customPermeability?: number;
  
  // Air-core inputs
  radius?: number;
  radiusUnit?: LengthUnit;
  
  // Reactance inputs
  inductance?: number;
  inductanceUnit?: InductanceUnit;
  frequency?: number;
  frequencyUnit?: FrequencyUnit;
}

export interface CalculationResult {
  value: number;
  unit: string;
  formula: string;
  steps: string[];
  conversions: { unit: string; value: string }[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  mode: CalculationMode;
  input: CalculationInput;
  result: CalculationResult;
}
