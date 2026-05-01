export type Unit = "feet" | "meters";

export interface WallInput {
  id: string;
  width: number;
  height: number;
}

export interface PanelSize {
  width: number;
  height: number;
}

export interface CladdingCalculation {
  walls: WallInput[];
  panelSize: PanelSize;
  unit: Unit;
  wastagePercentage: number;
  costPerPanel: number;
  totalWallArea: number;
  panelArea: number;
  basePanelsRequired: number;
  wastageQuantity: number;
  totalPanelsRequired: number;
  totalCost: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: CladdingCalculation;
}

export interface PresetTemplate {
  name: string;
  description: string;
  panelWidth: number;
  panelHeight: number;
  wastage: number;
  category: string;
}
