export type Unit = "feet" | "meters";
export type DesignMode = "standard" | "golden-ratio" | "custom";

export interface ElevationCalculation {
  width: number;
  height: number;
  floors: number;
  unit: Unit;
  designMode: DesignMode;
  customRatio: number;
  floorHeight: number;
  widthToHeightRatio: number;
  recommendedHeight?: number;
  isBalanced: boolean;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: ElevationCalculation;
}

export interface PresetTemplate {
  name: string;
  description: string;
  width: number;
  height: number;
  floors: number;
  designMode: DesignMode;
  category: string;
}
