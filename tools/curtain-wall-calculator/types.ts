export type Unit = "meters" | "feet";

export interface CurtainWallCalculation {
  width: number;
  height: number;
  panelWidth: number;
  panelHeight: number;
  glassRatio: number;
  frameThickness: number;
  unit: Unit;
  totalArea: number;
  panelArea: number;
  panelCount: number;
  glassArea: number;
  frameArea: number;
  panelsWide: number;
  panelsHigh: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: CurtainWallCalculation;
}

export interface PresetTemplate {
  name: string;
  description: string;
  width: number;
  height: number;
  panelWidth: number;
  panelHeight: number;
  glassRatio: number;
  category: string;
}
