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

export function convertTimeToTimezone(date: Date, timezone: string): ConvertedTime {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(date);
  const hour = parseInt(parts.find(p => p.type === "hour")?.value || "0");
  const minute = parseInt(parts.find(p => p.type === "minute")?.value || "0");
  const day = parseInt(parts.find(p => p.type === "day")?.value || "1");
  const month = parseInt(parts.find(p => p.type === "month")?.value || "1");
  const year = parseInt(parts.find(p => p.type === "year")?.value || "2024");

  const isDaytime = hour >= 6 && hour < 18;
  const isWorkingHours = hour >= 9 && hour < 18;

  const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const convertedDate = new Date(year, month - 1, day);
  const dayDifference = Math.floor((convertedDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  const city = POPULAR_CITIES.find(c => c.timezone === timezone) || {
    name: timezone,
    timezone,
    country: ""
  };

  return {
    city,
    time: new Date(year, month - 1, day, hour, minute),
    formatted: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    hour,
    minute,
    isDaytime,
    isWorkingHours,
    dayDifference
  };
}

export function getTimeDifference(baseTime: Date, targetTimezone: string, baseTimezone: string): number {
  const baseConverted = convertTimeToTimezone(baseTime, baseTimezone);
  const targetConverted = convertTimeToTimezone(baseTime, targetTimezone);

  const baseMinutes = baseConverted.hour * 60 + baseConverted.minute;
  const targetMinutes = targetConverted.hour * 60 + targetConverted.minute;

  let diff = targetMinutes - baseMinutes;
  diff += (targetConverted.dayDifference - baseConverted.dayDifference) * 24 * 60;

  return diff / 60;
}

export function formatTimeDifference(hours: number): string {
  if (hours === 0) return "Same time";
  const sign = hours > 0 ? "+" : "";
  const absHours = Math.abs(hours);
  if (Number.isInteger(absHours)) {
    return `${sign}${absHours}h`;
  }
  return `${sign}${absHours.toFixed(1)}h`;
}

export function searchCities(query: string): City[] {
  const q = query.toLowerCase();
  return POPULAR_CITIES.filter(
    city =>
      city.name.toLowerCase().includes(q) ||
      city.country.toLowerCase().includes(q) ||
      city.timezone.toLowerCase().includes(q)
  ).slice(0, 10);
}

export function saveFavoriteCities(cities: City[]): void {
  localStorage.setItem("tz-favorites", JSON.stringify(cities));
}

export function loadFavoriteCities(): City[] {
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
  try {
    const saved = localStorage.getItem("tz-selected");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
