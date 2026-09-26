import {
  SurfaceType,
  SunlightInputs,
  SunPosition,
  ShadowData,
  SunlightCalculation,
  LocationPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "sunlight-exposure-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate day of year (1-365)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Calculate solar declination angle
 */
function calculateDeclination(dayOfYear: number): number {
  // Simplified formula: δ = 23.45° × sin((360/365) × (284 + N))
  const angle = (360 / 365) * (284 + dayOfYear);
  return 23.45 * Math.sin(toRadians(angle));
}

/**
 * Equation of time in minutes: how far the sun runs ahead of (+) or behind
 * (−) a uniform clock on this day of the year.
 */
export function equationOfTime(dayOfYear: number): number {
  const b = toRadians((360 / 365) * (dayOfYear - 81));
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

/**
 * Local solar time (hours) for a clock time at a longitude in a time zone:
 * 4 minutes per degree between the longitude and its zone's meridian
 * (15° × UTC offset), plus the equation of time.
 */
export function solarTime(clockTime: number, longitude: number, utcOffset: number, dayOfYear: number): number {
  return clockTime + (4 * (longitude - 15 * utcOffset) + equationOfTime(dayOfYear)) / 60;
}

/** Clock time (hours) at which the sun is due south/north (solar noon). */
export function solarNoonClockTime(longitude: number, utcOffset: number, date: Date): number {
  return 12 - (4 * (longitude - 15 * utcOffset) + equationOfTime(getDayOfYear(date))) / 60;
}

/** The time zone's UTC offset in hours on a given date (daylight saving included). */
export function utcOffsetFor(timeZone: string, date: Date): number {
  const noon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  const name = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
    .formatToParts(noon)
    .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(name);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) + Number(m[3]) / 60) : 0;
}

/**
 * Calculate hour angle from local solar time
 */
function calculateHourAngle(solarTimeHours: number): number {
  // H = 15° × (solar time − 12)
  return 15 * (solarTimeHours - 12);
}

/**
 * Calculate solar elevation (altitude) angle
 */
function calculateElevation(
  latitude: number,
  declination: number,
  hourAngle: number
): number {
  const lat = toRadians(latitude);
  const dec = toRadians(declination);
  const ha = toRadians(hourAngle);
  
  const sinElevation = 
    Math.sin(lat) * Math.sin(dec) + 
    Math.cos(lat) * Math.cos(dec) * Math.cos(ha);
  
  return toDegrees(Math.asin(sinElevation));
}

/**
 * Calculate solar azimuth angle
 */
function calculateAzimuth(
  latitude: number,
  declination: number,
  hourAngle: number,
  elevation: number
): number {
  const lat = toRadians(latitude);
  const dec = toRadians(declination);
  const ha = toRadians(hourAngle);
  const elev = toRadians(elevation);
  
  const cosAzimuth = 
    (Math.sin(dec) - Math.sin(lat) * Math.sin(elev)) / 
    (Math.cos(lat) * Math.cos(elev));
  
  let azimuth = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosAzimuth))));
  
  // Adjust for afternoon (hour angle > 0)
  if (hourAngle > 0) {
    azimuth = 360 - azimuth;
  }
  
  return azimuth;
}

/**
 * Calculate sun position
 */
export function calculateSunPosition(inputs: SunlightInputs): SunPosition {
  const { latitude, longitude, date, time } = inputs;
  // Without a time zone, assume the one nominally centred on this longitude
  const utcOffset = inputs.utcOffset ?? Math.round(longitude / 15);
  
  const dayOfYear = getDayOfYear(date);
  const declination = calculateDeclination(dayOfYear);
  const hourAngle = calculateHourAngle(solarTime(time, longitude, utcOffset, dayOfYear));
  const elevation = calculateElevation(latitude, declination, hourAngle);
  const azimuth = calculateAzimuth(latitude, declination, hourAngle, elevation);
  
  return {
    elevation,
    azimuth,
    declination,
    hourAngle
  };
}

/**
 * Calculate shadow data
 */
export function calculateShadow(
  sunPosition: SunPosition,
  buildingHeight: number,
  buildingOrientation: number
): ShadowData {
  const { elevation, azimuth } = sunPosition;
  
  // Sun below horizon - no shadow
  if (elevation <= 0) {
    return {
      length: 0,
      direction: 0,
      visible: false
    };
  }
  
  // Shadow length = height / tan(elevation)
  const shadowLength = buildingHeight / Math.tan(toRadians(elevation));
  
  // Shadow direction is opposite to sun azimuth
  const shadowDirection = (azimuth + 180) % 360;
  
  return {
    length: shadowLength,
    direction: shadowDirection,
    visible: true
  };
}

/**
 * Calculate sunlight exposure percentage
 */
export function calculateExposure(
  sunPosition: SunPosition,
  surfaceType: SurfaceType,
  buildingOrientation: number
): number {
  const { elevation, azimuth } = sunPosition;
  
  // No exposure if sun is below horizon
  if (elevation <= 0) {
    return 0;
  }
  
  let exposure = 0;
  
  if (surfaceType === "roof") {
    // Roof exposure depends on elevation angle
    // Maximum at 90° (sun directly overhead)
    exposure = Math.sin(toRadians(elevation)) * 100;
  } else if (surfaceType === "wall") {
    // Incidence on a vertical surface whose outward normal points at the wall's
    // orientation: cos θ = cos(elevation) · cos(azimuth − orientation). It is
    // negative when the sun is behind the wall, which gets no direct light.
    const cosIncidence =
      Math.cos(toRadians(elevation)) * Math.cos(toRadians(azimuth - buildingOrientation));
    exposure = Math.max(0, cosIncidence * 100);
  } else if (surfaceType === "ground") {
    // Ground exposure similar to roof but inverted
    exposure = Math.sin(toRadians(elevation)) * 100;
  }
  
  return Math.max(0, Math.min(100, exposure));
}

/**
 * Calculate sunlight intensity (0-100%)
 */
export function calculateIntensity(elevation: number): number {
  if (elevation <= 0) return 0;
  
  // Intensity increases with elevation, accounting for atmospheric absorption
  // Maximum intensity at 90° elevation
  const atmosphericFactor = Math.pow(Math.sin(toRadians(elevation)), 0.7);
  return atmosphericFactor * 100;
}

/**
 * Main calculation function
 */
export function calculateSunlightExposure(inputs: SunlightInputs): SunlightCalculation {
  const sunPosition = calculateSunPosition(inputs);
  const shadowData = calculateShadow(
    sunPosition,
    inputs.buildingHeight,
    inputs.buildingOrientation
  );
  const exposurePercentage = calculateExposure(
    sunPosition,
    inputs.surfaceType,
    inputs.buildingOrientation
  );
  const sunlightIntensity = calculateIntensity(sunPosition.elevation);
  
  return {
    inputs,
    sunPosition,
    shadowData,
    exposurePercentage,
    sunlightIntensity,
    timestamp: Date.now()
  };
}

/**
 * Get location presets
 */
export function getLocationPresets(): LocationPreset[] {
  return [
    { name: "Dhaka, Bangladesh", latitude: 23.8103, longitude: 90.4125, timezone: "Asia/Dhaka" },
    { name: "New York, USA", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York" },
    { name: "London, UK", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London" },
    { name: "Tokyo, Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" },
    { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney" },
    { name: "Dubai, UAE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai" },
    { name: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore" },
    { name: "Los Angeles, USA", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles" }
  ];
}

/**
 * Utility functions
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/* UTC offsets in use around the world, in hours. */
export const UTC_OFFSETS: number[] = [
  -12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5,
  5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14,
];

export function formatUtcOffset(offset: number): string {
  const sign = offset < 0 ? "−" : "+";
  const abs = Math.abs(offset);
  const minutes = Math.round((abs % 1) * 60);
  return `UTC${sign}${Math.floor(abs)}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""}`;
}

/* A date input's "YYYY-MM-DD" as local midnight (new Date("YYYY-MM-DD") is UTC). */
export function parseDateInput(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
}

/* A date as a date input's "YYYY-MM-DD", in local time. */
export function toDateInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function validateInputs(
  latitude: number,
  longitude: number,
  buildingHeight: number
): string | null {
  // NaN (an empty or whitespace field) fails every comparison, so test it first
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    return "Latitude must be between -90 and 90 degrees";
  }
  
  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return "Longitude must be between -180 and 180 degrees";
  }
  
  if (!Number.isFinite(buildingHeight) || buildingHeight <= 0) {
    return "Building height must be greater than 0";
  }
  
  return null;
}

// History management
export function saveToHistory(calculation: SunlightCalculation): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
