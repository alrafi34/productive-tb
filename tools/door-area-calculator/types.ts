export type Unit = "ft" | "m" | "cm" | "inches";

export interface DoorCalculation {
  height: number;
  width: number;
  unit: Unit;
  area: number;
  includeFrame: boolean;
  frameThickness?: number;
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: DoorCalculation;
  timestamp: number;
}

export interface DoorPreset {
  name: string;
  description: string;
  height: number;
  width: number;
  unit: Unit;
}
