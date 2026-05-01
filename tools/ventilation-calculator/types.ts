export type DimensionUnit = "ft" | "m";
export type AirflowUnit = "CFM" | "m3h" | "Ls";
export type CalculationMode = "room-volume" | "occupancy";

export interface VentilationCalculation {
  mode: CalculationMode;
  
  // Room volume mode
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: DimensionUnit;
  ach?: number;
  roomVolume?: number;
  
  // Occupancy mode
  numberOfPeople?: number;
  airflowPerPerson?: number;
  
  // Results
  airflowCFM: number;
  airflowM3H: number;
  airflowLs: number;
  outputUnit: AirflowUnit;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: VentilationCalculation;
  timestamp: number;
}

export interface RoomPreset {
  name: string;
  description: string;
  ach: number;
  length?: number;
  width?: number;
  height?: number;
}
