export type Unit = 'feet' | 'meters';
export type RoomType = 'living_room' | 'bedroom' | 'kitchen' | 'office' | 'bathroom' | 'dining' | 'hallway' | 'garage' | 'custom';

export interface LightingInputs {
  width: number;
  length: number;
  unit: Unit;
  roomType: RoomType;
  customLux?: number;
  lumensPerLight: number;
  ceilingHeight?: number;
}

export interface LightingResult {
  area: number;
  areaInMeters: number;
  luxLevel: number;
  totalLumensRequired: number;
  lightsNeeded: number;
  actualLumens: number;
  luxAchieved: number;
  status: 'under' | 'optimal' | 'over';
  statusMessage: string;
  steps: string[];
}

export interface RoomTypeConfig {
  name: string;
  lux: number;
  description: string;
}
