export type InputMode = "dimensions" | "volume";
export type DimensionUnit = "m" | "ft";
export type VolumeUnit = "m3" | "ft3";
export type AirflowUnit = "m3h" | "CFM";

export interface ACHCalculation {
  mode: InputMode;
  
  // Dimensions mode
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: DimensionUnit;
  
  // Volume mode
  volume?: number;
  volumeUnit?: VolumeUnit;
  
  // Common
  airflow: number;
  airflowUnit: AirflowUnit;
  
  // Results
  calculatedVolume: number; // in m³
  normalizedAirflow: number; // in m³/h
  ach: number;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: ACHCalculation;
  timestamp: number;
}

export interface ACHRange {
  name: string;
  min: number;
  max: number;
  description: string;
  color: string;
}
