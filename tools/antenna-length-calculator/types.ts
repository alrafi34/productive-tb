export type AntennaType = 'quarter' | 'half' | 'full' | 'dipole' | 'monopole';
export type FrequencyUnit = 'hz' | 'khz' | 'mhz' | 'ghz';
export type LengthUnit = 'm' | 'cm' | 'mm' | 'in' | 'ft';

export interface AntennaInputs {
  frequency: number;
  frequencyUnit: FrequencyUnit;
  antennaType: AntennaType;
  velocityFactor: number;
  lengthUnit: LengthUnit;
  precision: number;
}

export interface AntennaResult {
  frequency: number;
  frequencyHz: number;
  wavelength: number;
  wavelengthMeters: number;
  antennaLength: number;
  antennaLengthMeters: number;
  antennaType: AntennaType;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: AntennaInputs;
  result: AntennaResult;
}
