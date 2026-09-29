/* Countdown to a date and time in the visitor's own timezone. */

export type Remaining = { past: boolean; totalMs: number; days: number; hours: number; minutes: number; seconds: number };

export function remaining(target: number, now: number): Remaining {
  const diff = target - now;
  const past = diff < 0;
  let s = Math.floor(Math.abs(diff) / 1000);
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const minutes = Math.floor(s / 60);
  return { past, totalMs: Math.abs(diff), days, hours, minutes, seconds: s - minutes * 60 };
}

/* Easter Sunday (Gregorian), anonymous Gregorian algorithm (Meeus/Jones/Butcher). */
export function easter(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  return { month, day: ((h + l - 7 * m + 114) % 31) + 1 };
}

/* The nth given weekday of a month (month 1–12, weekday 0 = Sunday). */
export function nthWeekday(year: number, month: number, weekday: number, n: number): number {
  const first = new Date(year, month - 1, 1).getDay();
  return 1 + ((weekday - first + 7) % 7) + (n - 1) * 7;
}

export type Preset = { id: string; name: string; date: (year: number) => { month: number; day: number } };

export const PRESETS: Preset[] = [
  { id: "new-year", name: "New Year's Day", date: () => ({ month: 1, day: 1 }) },
  { id: "valentines", name: "Valentine's Day", date: () => ({ month: 2, day: 14 }) },
  { id: "easter", name: "Easter Sunday", date: (y) => easter(y) },
  { id: "halloween", name: "Halloween", date: () => ({ month: 10, day: 31 }) },
  { id: "thanksgiving", name: "Thanksgiving (US)", date: (y) => ({ month: 11, day: nthWeekday(y, 11, 4, 4) }) },
  { id: "christmas", name: "Christmas Day", date: () => ({ month: 12, day: 25 }) },
];

/* The next occurrence of a preset from `now`, at midnight local time. */
export function nextOccurrence(p: Preset, now: Date): Date {
  for (const y of [now.getFullYear(), now.getFullYear() + 1]) {
    const { month, day } = p.date(y);
    const d = new Date(y, month - 1, day, 0, 0, 0);
    if (d.getTime() > now.getTime()) return d;
  }
  const { month, day } = p.date(now.getFullYear() + 1);
  return new Date(now.getFullYear() + 1, month - 1, day);
}

/* "2026-12-25T00:00" for <input type="datetime-local"> in local time */
export function toLocalInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
