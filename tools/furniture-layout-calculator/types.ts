export type Unit = "feet" | "meters";

export interface FurnitureItem {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  rotated: boolean;
}

export interface RoomDimensions {
  width: number;
  height: number;
  unit: Unit;
}

export interface LayoutResult {
  roomArea: number;
  usedArea: number;
  freeArea: number;
  efficiency: number;
  furniture: FurnitureItem[];
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  layout: LayoutResult;
  roomDimensions: RoomDimensions;
}

export interface FurniturePreset {
  name: string;
  width: number;
  height: number;
  category: string;
  color: string;
}
