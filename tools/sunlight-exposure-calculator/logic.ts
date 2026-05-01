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
 * Calculate hour angle
 */
function calculateHourAngle(time: number): number {
  // H = 15° × (time - 12)
  return 15 * (time - 12);
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
  const { latitude, date, time } = inputs;
  
  const dayOfYear = getDayOfYear(date);
  const declination = calculateDeclination(dayOfYear);
  const hourAngle = calculateHourAngle(time);
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
    // Wall exposure depends on angle between sun and wall orientation
    const angleDiff = Math.abs(normalizeAngle(azimuth - buildingOrientation));
    const facingFactor = Math.cos(toRadians(Math.min(angleDiff, 180 - angleDiff)));
    
    // Also factor in elevation (lower sun = less direct light on vertical surfaces)
    const elevationFactor = Math.sin(toRadians(elevation));
    
    exposure = Math.max(0, facingFactor * elevationFactor * 100);
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

function normalizeAngle(angle: number): number {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
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
  if (latitude < -90 || latitude > 90) {
    return "Latitude must be between -90 and 90 degrees";
  }
  
  if (longitude < -180 || longitude > 180) {
    return "Longitude must be between -180 and 180 degrees";
  }
  
  if (buildingHeight <= 0) {
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
