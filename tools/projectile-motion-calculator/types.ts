export type VelocityUnit = "m/s" | "km/h" | "ft/s" | "mph";
export type Precision = 2 | 4 | 6;

export interface ProjectileInputs {
  velocity: string;
  velocityUnit: VelocityUnit;
  angle: number;
  gravity: number;
  launchHeight: string;
  precision: Precision;
}

export interface ProjectileResult {
  vx: number;           // horizontal velocity (m/s)
  vy: number;           // vertical velocity (m/s)
  maxHeight: number;    // maximum height (m)
  range: number;        // horizontal range (m)
  flightTime: number;   // total time of flight (s)
  peakTime: number;     // time to reach max height (s)
  landingSpeed: number; // speed at landing (m/s)
  trajectoryPoints: { x: number; y: number }[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ProjectileInputs;
  result: ProjectileResult;
}
