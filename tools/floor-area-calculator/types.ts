export type Unit = 'm' | 'ft';

export interface Room {
  id: string;
  name: string;
  length: string;
  width: string;
  unit: Unit;
  floor?: number;
}

export interface CalculatedRoom extends Room {
  area: number;
}

export interface FloorSummary {
  floorNumber: number;
  totalArea: number;
  roomCount: number;
}
