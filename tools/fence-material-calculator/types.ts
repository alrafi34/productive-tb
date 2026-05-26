export type Unit = "ft" | "m";
export type FenceType = "wood" | "vinyl" | "chain-link" | "metal" | "privacy";
export type PropertyMode = "straight" | "perimeter";

export interface FenceInputs {
  fenceType: FenceType;
  unit: Unit;
  propertyMode: PropertyMode;
  fenceLength: string;
  propertyWidth: string;
  propertyLength: string;
  fenceHeight: string;
  panelWidth: string;
  includeGate: boolean;
  gateWidth: string;
  wastePercent: number;
}

export interface FenceResult {
  totalLength: number;
  panels: number;
  panelsWithWaste: number;
  posts: number;
  concreteBags: number;
  rails: number;
  gatePostsExtra: number;
  unit: Unit;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FenceInputs;
  result: FenceResult;
}
