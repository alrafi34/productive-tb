/*
 * Sun position from date, time and place, after the NOAA Solar Calculator
 * (Meeus-based; accurate to well under a degree for dates within a few
 * centuries of 2000), including atmospheric refraction near the horizon.
 */

export type Place = { name: string; lat: number; lon: number; timeZone: string };

/* A handful of US, European and Australian cities; anything else is entered
   as latitude/longitude, with times read in the visitor's own time zone. */
export const PLACES: Place[] = [
  { name: "New York", lat: 40.7128, lon: -74.006, timeZone: "America/New_York" },
  { name: "Chicago", lat: 41.8781, lon: -87.6298, timeZone: "America/Chicago" },
  { name: "Denver", lat: 39.7392, lon: -104.9903, timeZone: "America/Denver" },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, timeZone: "America/Los_Angeles" },
  { name: "Miami", lat: 25.7617, lon: -80.1918, timeZone: "America/New_York" },
  { name: "Toronto", lat: 43.6532, lon: -79.3832, timeZone: "America/Toronto" },
  { name: "London", lat: 51.5074, lon: -0.1278, timeZone: "Europe/London" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, timeZone: "Europe/Paris" },
  { name: "Berlin", lat: 52.52, lon: 13.405, timeZone: "Europe/Berlin" },
  { name: "Madrid", lat: 40.4168, lon: -3.7038, timeZone: "Europe/Madrid" },
  { name: "Rome", lat: 41.9028, lon: 12.4964, timeZone: "Europe/Rome" },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686, timeZone: "Europe/Stockholm" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, timeZone: "Australia/Sydney" },
];

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

// Milliseconds the zone is ahead of UTC at a given instant
function zoneOffset(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/* Local wall-clock time ("2026-06-21", "14:30") in a zone → UTC instant. */
export function localToUtc(date: string, time: string, timeZone: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  const first = guess - zoneOffset(guess, timeZone);
  return guess - zoneOffset(first, timeZone);
}

export type SunPosition = { elevation: number; azimuth: number };

export function sunPosition(utcMs: number, lat: number, lon: number): SunPosition {
  const jd = utcMs / 86400000 + 2440587.5;
  const t = (jd - 2451545) / 36525;

  const l0 = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360;
  const m = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  const c =
    Math.sin(rad(m)) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(rad(2 * m)) * (0.019993 - 0.000101 * t) +
    Math.sin(rad(3 * m)) * 0.000289;
  const omega = 125.04 - 1934.136 * t;
  const lambda = l0 + c - 0.00569 - 0.00478 * Math.sin(rad(omega));
  const eps0 = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(rad(omega));
  const decl = Math.asin(Math.sin(rad(eps)) * Math.sin(rad(lambda)));

  const y = Math.tan(rad(eps / 2)) ** 2;
  const eqTime = 4 * deg(
    y * Math.sin(2 * rad(l0)) -
      2 * e * Math.sin(rad(m)) +
      4 * e * y * Math.sin(rad(m)) * Math.cos(2 * rad(l0)) -
      0.5 * y * y * Math.sin(4 * rad(l0)) -
      1.25 * e * e * Math.sin(2 * rad(m)),
  );

  const minutesUtc = (((utcMs % 86400000) + 86400000) % 86400000) / 60000;
  const trueSolar = (((minutesUtc + eqTime + 4 * lon) % 1440) + 1440) % 1440;
  let hourAngle = trueSolar / 4 - 180;
  if (hourAngle < -180) hourAngle += 360;

  const latR = rad(lat);
  const cosZen = Math.min(1, Math.max(-1,
    Math.sin(latR) * Math.sin(decl) + Math.cos(latR) * Math.cos(decl) * Math.cos(rad(hourAngle))));
  const zenith = deg(Math.acos(cosZen));
  const geometric = 90 - zenith;

  const azDen = Math.cos(latR) * Math.sin(rad(zenith));
  let azimuth = 0;
  if (Math.abs(azDen) > 1e-9) {
    const azRaw = deg(Math.acos(Math.min(1, Math.max(-1,
      (Math.sin(latR) * Math.cos(rad(zenith)) - Math.sin(decl)) / azDen))));
    azimuth = hourAngle > 0 ? (azRaw + 180) % 360 : (540 - azRaw) % 360;
  }

  return { elevation: geometric + refraction(geometric), azimuth };
}

// Atmospheric refraction in degrees (NOAA approximation)
function refraction(elevation: number): number {
  if (elevation > 85) return 0;
  const te = Math.tan(rad(elevation));
  let arcsec: number;
  if (elevation > 5) arcsec = 58.1 / te - 0.07 / te ** 3 + 0.000086 / te ** 5;
  else if (elevation > -0.575)
    arcsec = 1735 + elevation * (-518.2 + elevation * (103.4 + elevation * (-12.79 + elevation * 0.711)));
  else arcsec = -20.772 / te;
  return arcsec / 3600;
}

const POINTS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

// 225 → "SW"
export function compassPoint(bearing: number): string {
  return POINTS[Math.round((((bearing % 360) + 360) % 360) / 22.5) % 16];
}

/* The visitor's own zone, used for coordinates typed in by hand. */
export function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}
