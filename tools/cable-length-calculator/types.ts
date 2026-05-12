export type DistanceUnit = 'm' | 'ft';
export type CableType = 'electrical' | 'ethernet' | 'fiber' | 'coaxial';
export type InstallationType = 'straight' | 'conduit' | 'wall' | 'underground' | 'overhead';

export interface CableLengthInputs {
  distance: number;
  distanceUnit: DistanceUnit;
  slackPercent: number;
  bends: number;
  cableType: CableType;
  installationType: InstallationType;
  bendAllowance: number; // meters per bend
}

export interface CableLengthResult {
  baseDistance: number;
  slackLength: number;
  bendAllowance: number;
  installationFactor: number;
  totalLength: number;
  totalLengthFeet: number;
  recommendations: string[];
  breakdown: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CableLengthInputs;
  result: CableLengthResult;
}

export interface Preset {
  name: string;
  description: string;
  distance: number;
  distanceUnit: DistanceUnit;
  slackPercent: number;
  bends: number;
  cableType: CableType;
  installationType: InstallationType;
}
