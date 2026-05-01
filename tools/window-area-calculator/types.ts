export type Unit = "mm" | "cm" | "m" | "inches" | "ft";

export interface WindowEntry {
  id: string;
  width: number;
  height: number;
  area: number;
}

export interface WindowCalculation {
  windows: WindowEntry[];
  unit: Unit;
  totalArea: number;
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: WindowCalculation;
  timestamp: number;
}
