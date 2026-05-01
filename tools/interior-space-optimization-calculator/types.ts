export type Unit = "feet" | "meters";

export interface FurnitureItem {
  id: string;
  name: string;
  width: number;
  length: number;
  x: number;
  y: number;
  rotated: boolean;
}

export interface RoomDimensions {
  width: number;
  length: number;
  unit: Unit;
}

export interface LayoutConstraints {
  minWalkingSpace: number;
  wallAlignment: boolean;
  allowRotation: boolean;
}

export interface SpaceOptimizationResult {
  roomArea: number;
  occupiedArea: number;
  freeSpace: number;
  walkableSpace: number;
  efficiencyScore: number;
  placedFurniture: FurnitureItem[];
  overflowItems: FurnitureItem[];
  warnings: string[];
  suggestions: string[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: SpaceOptimizationResult;
  roomDimensions: RoomDimensions;
}

export interface FurniturePreset {
  name: string;
  width: number;
  length: number;
  category: string;
}
