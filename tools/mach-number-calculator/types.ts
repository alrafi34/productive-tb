export type CalcMode = "mach" | "speed" | "sound";
export type SpeedUnit = "m/s" | "km/h" | "mph" | "ft/s" | "knots";
export type TempUnit = "C" | "F" | "K";
export type Medium = "dry-air" | "helium" | "hydrogen" | "custom";
export type Precision = 2 | 4 | 6;

export interface MachInputs {
  mode: CalcMode;
  // Mode 1 & 2 shared
  speed: string;
  speedUnit: SpeedUnit;
  // Mode 1 & 3 shared
  temperature: string;
  tempUnit: TempUnit;
  medium: Medium;
  customSoundSpeed: string;
  // Mode 2 only
  machNumber: string;
  precision: Precision;
}

export interface MachResult {
  machNumber: number;
  speedMs: number;
  speedOfSoundMs: number;
  classification: MachClassification;
  temperatureK: number;
  // multi-unit conversions for speed
  speedKmh: number;
  speedMph: number;
  speedFts: number;
  speedKnots: number;
  // multi-unit for speed of sound
  soundKmh: number;
  formulaSubstituted: string;
}

export type MachClassification =
  | "subsonic"
  | "transonic"
  | "sonic"
  | "supersonic"
  | "hypersonic";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: MachInputs;
  result: MachResult;
}
