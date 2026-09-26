export interface City {
  name: string;
  timezone: string;
  country: string;
}

export interface ConvertedTime {
  city: City;
  time: Date;
  formatted: string;
  hour: number;
  minute: number;
  isDaytime: boolean;
  isWorkingHours: boolean;
  dayDifference: number;
}

export const POPULAR_CITIES: City[] = [
  { name: "New York", timezone: "America/New_York", country: "USA" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" },
  { name: "Chicago", timezone: "America/Chicago", country: "USA" },
  { name: "Denver", timezone: "America/Denver", country: "USA" },
  { name: "Toronto", timezone: "America/Toronto", country: "Canada" },
  { name: "Vancouver", timezone: "America/Vancouver", country: "Canada" },
  { name: "Mexico City", timezone: "America/Mexico_City", country: "Mexico" },
  { name: "São Paulo", timezone: "America/Sao_Paulo", country: "Brazil" },
  { name: "London", timezone: "Europe/London", country: "UK" },
  { name: "Paris", timezone: "Europe/Paris", country: "France" },
  { name: "Berlin", timezone: "Europe/Berlin", country: "Germany" },
  { name: "Amsterdam", timezone: "Europe/Amsterdam", country: "Netherlands" },
  { name: "Madrid", timezone: "Europe/Madrid", country: "Spain" },
  { name: "Rome", timezone: "Europe/Rome", country: "Italy" },
  { name: "Moscow", timezone: "Europe/Moscow", country: "Russia" },
  { name: "Istanbul", timezone: "Europe/Istanbul", country: "Turkey" },
  { name: "Cairo", timezone: "Africa/Cairo", country: "Egypt" },
  { name: "Johannesburg", timezone: "Africa/Johannesburg", country: "South Africa" },
  { name: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
  { name: "Mumbai", timezone: "Asia/Kolkata", country: "India" },
  { name: "Dhaka", timezone: "Asia/Dhaka", country: "Bangladesh" },
  { name: "Bangkok", timezone: "Asia/Bangkok", country: "Thailand" },
  { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", country: "Hong Kong" },
  { name: "Seoul", timezone: "Asia/Seoul", country: "South Korea" },
  { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
  { name: "Auckland", timezone: "Pacific/Auckland", country: "New Zealand" }
];

export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

export interface WallClock {
  year: number;
  month: number; // 1–12
  day: number;
  hour: number;
  minute: number;
}

/** The date and time a clock in `timezone` shows at the instant `date`. */
export function wallClock(date: Date, timezone: string): WallClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parseInt(parts.find((p) => p.type === type)?.value || "0", 10);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour") % 24, minute: get("minute") };
}

/** Minutes `timezone` is ahead of UTC at the instant `date` (DST included). */
export function utcOffsetMinutes(date: Date, timezone: string): number {
  const w = wallClock(date, timezone);
  const asUtc = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute);
  return Math.round((asUtc - Math.floor(date.getTime() / 60000) * 60000) / 60000);
}

/*
 * The instant when a clock in `timezone` shows the given date and time.
 * The offset is looked up twice so a date on the other side of a
 * daylight-saving change from today still converts correctly.
 */
export function zonedTimeToDate(year: number, month: number, day: number, hour: number, minute: number, timezone: string): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  let instant = guess - utcOffsetMinutes(new Date(guess), timezone) * 60000;
  instant = guess - utcOffsetMinutes(new Date(instant), timezone) * 60000;
  return new Date(instant);
}

/**
 * The time in `timezone` at the instant `date`. dayDifference compares its
 * calendar date with the base timezone's date (not the visitor's own).
 */
export function convertTimeToTimezone(date: Date, timezone: string, baseTimezone?: string): ConvertedTime {
  const w = wallClock(date, timezone);
  const { hour, minute } = w;

  const isDaytime = hour >= 6 && hour < 18;
  const isWorkingHours = hour >= 9 && hour < 18;

  const base = baseTimezone ? wallClock(date, baseTimezone) : null;
  const baseDay = base
    ? Date.UTC(base.year, base.month - 1, base.day)
    : Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDifference = Math.round((Date.UTC(w.year, w.month - 1, w.day) - baseDay) / 86400000);

  const city = findCity(timezone);

  return {
    city,
    time: new Date(w.year, w.month - 1, w.day, hour, minute),
    formatted: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    hour,
    minute,
    isDaytime,
    isWorkingHours,
    dayDifference
  };
}

/** Hours `targetTimezone` is ahead of `baseTimezone` at that instant. */
export function getTimeDifference(baseTime: Date, targetTimezone: string, baseTimezone: string): number {
  return (utcOffsetMinutes(baseTime, targetTimezone) - utcOffsetMinutes(baseTime, baseTimezone)) / 60;
}

export function formatTimeDifference(hours: number): string {
  if (hours === 0) return "Same time";
  const sign = hours > 0 ? "+" : "−";
  const totalMinutes = Math.round(Math.abs(hours) * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  // Half- and quarter-hour zones (India +5:30, Nepal +5:45) in hours and minutes
  return m === 0 ? `${sign}${h}h` : `${sign}${h}h ${m}m`;
}

/** Every IANA timezone the browser knows, or just the popular ones. */
export function allTimezones(): string[] {
  try {
    const intl = Intl as unknown as { supportedValuesOf?: (key: string) => string[] };
    const zones = intl.supportedValuesOf?.("timeZone");
    if (zones && zones.length) return zones;
  } catch {
    // older browsers
  }
  return POPULAR_CITIES.map((c) => c.timezone);
}

/** A city entry for any timezone: a popular city, or one named after the zone. */
export function findCity(timezone: string): City {
  const known = POPULAR_CITIES.find((c) => c.timezone === timezone);
  if (known) return known;
  const parts = timezone.split("/");
  return {
    name: parts[parts.length - 1].replace(/_/g, " "),
    timezone,
    country: parts.length > 1 ? parts[0].replace(/_/g, " ") : ""
  };
}

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  const matches = (city: City) =>
    city.name.toLowerCase().includes(q) ||
    city.country.toLowerCase().includes(q) ||
    city.timezone.toLowerCase().replace(/_/g, " ").includes(q);
  const popular = POPULAR_CITIES.filter(matches);
  // Then any other IANA zone ("Phoenix", "Kathmandu", "Adelaide", …)
  const others = allTimezones()
    .filter((tz) => !POPULAR_CITIES.some((c) => c.timezone === tz))
    .map(findCity)
    .filter(matches);
  return [...popular, ...others].slice(0, 12);
}

export function saveFavoriteCities(cities: City[]): void {
  localStorage.setItem("tz-favorites", JSON.stringify(cities));
}

export function loadFavoriteCities(): City[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem("tz-favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveSelectedCities(cities: City[]): void {
  localStorage.setItem("tz-selected", JSON.stringify(cities));
}

export function loadSelectedCities(): City[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem("tz-selected");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
