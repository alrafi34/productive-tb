export type FrequencyUnit = "Hz" | "kHz" | "MHz" | "GHz";
export type MediumType = "vacuum" | "air" | "water" | "copper" | "custom";
export type WavelengthUnit = "m" | "cm" | "mm" | "km";

export interface CalculationInput {
  frequency: number;
  frequencyUnit: FrequencyUnit;
  medium: MediumType;
  customSpeed?: number;
}

export interface WavelengthConversion {
  value: string;
  unit: WavelengthUnit;
}

export interface CalculationResult {
  wavelength: number; // in meters
  wavelengthFormatted: WavelengthConversion;
  frequencyHz: number;
  waveSpeed: number;
  conversions: WavelengthConversion[];
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: CalculationInput;
  result: CalculationResult;
}

export interface Preset {
  label: string;
  frequency: number;
  frequencyUnit: FrequencyUnit;
  medium: MediumType;
  description: string;
}
