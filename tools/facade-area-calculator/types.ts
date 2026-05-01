export type Unit = "meters" | "feet";

export interface WallSection {
  id: string;
  width: number;
  height: number;
}

export interface Opening {
  id: string;
  width: number;
  height: number;
  quantity: number;
}

export interface FacadeCalculation {
  wallSections: WallSection[];
  openings: Opening[];
  unit: Unit;
  totalWallArea: number;
  totalOpeningsArea: number;
  netArea: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: FacadeCalculation;
}
