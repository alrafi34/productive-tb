export type Unit = "feet" | "meters";

export interface Room {
  id: string;
  length: number;
  width: number;
  doors: number;
  doorWidth: number;
}

export interface SkirtingCalculation {
  rooms: Room[];
  unit: Unit;
  costPerUnit: number;
  totalSkirtingLength: number;
  totalCost: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: SkirtingCalculation;
}
