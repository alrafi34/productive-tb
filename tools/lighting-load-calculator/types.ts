export type AreaUnit = "sqft" | "sqm";
export type LightingType = "LED" | "CFL" | "Incandescent";
export type RoomType = "living-room" | "bedroom" | "office" | "kitchen" | "bathroom" | "hallway" | "custom";

export interface LightingCalculation {
  area: number;
  areaUnit: AreaUnit;
  lux: number;
  roomType: RoomType;
  lightingType: LightingType;
  efficiencyFactor: number;
  
  // Results
  totalLumens: number;
  lumensPerWatt: number;
  totalWatts: number;
  adjustedWatts: number;
  kilowatts: number;
  monthlyKWh: number;
  suggestedFixtures: number;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: LightingCalculation;
  timestamp: number;
}

export interface RoomPreset {
  name: string;
  type: RoomType;
  lux: number;
  description: string;
}

export interface LightingTypeInfo {
  name: string;
  type: LightingType;
  lumensPerWatt: number;
  efficiency: string;
}
