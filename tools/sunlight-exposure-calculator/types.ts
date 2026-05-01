export type SurfaceType = "wall" | "roof" | "ground";

export interface SunlightInputs {
  latitude: number;
  longitude: number;
  date: Date;
  time: number; // Hours in 24h format (e.g., 14.5 for 2:30 PM)
  buildingHeight: number;
  buildingOrientation: number; // 0-360 degrees
  surfaceType: SurfaceType;
}

export interface SunPosition {
  elevation: number; // Altitude angle in degrees
  azimuth: number; // Compass direction in degrees
  declination: number;
  hourAngle: number;
}

export interface ShadowData {
  length: number;
  direction: number; // Degrees
  visible: boolean; // False if sun is below horizon
}

export interface SunlightCalculation {
  inputs: SunlightInputs;
  sunPosition: SunPosition;
  shadowData: ShadowData;
  exposurePercentage: number;
  sunlightIntensity: number; // 0-100%
  timestamp: number;
}

export interface LocationPreset {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: SunlightCalculation;
}
