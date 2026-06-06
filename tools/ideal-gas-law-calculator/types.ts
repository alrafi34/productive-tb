export type SolveFor = "P" | "V" | "n" | "T";

export type PressureUnit = "Pa" | "kPa" | "bar" | "atm" | "psi" | "mmHg";
export type VolumeUnit = "m3" | "L" | "mL" | "ft3";
export type TemperatureUnit = "K" | "C" | "F";
export type Precision = 2 | 4 | 6;

export interface GasInputs {
  solveFor: SolveFor;
  // Pressure
  pressure: string;
  pressureUnit: PressureUnit;
  // Volume
  volume: string;
  volumeUnit: VolumeUnit;
  // Moles
  moles: string;
  // Temperature
  temperature: string;
  temperatureUnit: TemperatureUnit;
  // Settings
  precision: Precision;
}

export interface GasResult {
  value: number;
  unit: string;
  formulaUsed: string;
  formulaSubstituted: string;
  // SI intermediates
  P_Pa: number;
  V_m3: number;
  n_mol: number;
  T_K: number;
  R_used: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: GasInputs;
  result: GasResult;
}
