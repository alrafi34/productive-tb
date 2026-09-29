import { addDays, daysBetween } from "@/lib/dates";

/* Adds or subtracts years, months, weeks and days from a date. Months are
   added on the calendar and clamp to the end of a shorter month
   (January 31 + 1 month = February 28 or 29), as in spreadsheets. */

export type Offset = { years: number; months: number; weeks: number; days: number };

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

export function addMonths(d: Date, months: number): Date {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + months;
  const targetYear = y + Math.floor(m / 12);
  const targetMonth = ((m % 12) + 12) % 12;
  const day = Math.min(d.getUTCDate(), daysInMonth(targetYear, targetMonth));
  return new Date(Date.UTC(targetYear, targetMonth, day, 12));
}

export function applyOffset(d: Date, o: Offset, sign: 1 | -1): Date {
  const withMonths = addMonths(d, sign * (o.years * 12 + o.months));
  return addDays(withMonths, sign * (o.weeks * 7 + o.days));
}

/* Weekend days as JavaScript weekday numbers (0 = Sunday). They differ by
   country, so the visitor chooses them. */
export const WEEKENDS = {
  satSun: { label: "Saturday & Sunday", days: [6, 0] },
  friSat: { label: "Friday & Saturday", days: [5, 6] },
  sun: { label: "Sunday only", days: [0] },
  none: { label: "No weekend (count every day)", days: [] as number[] },
} as const;
export type Weekend = keyof typeof WEEKENDS;

/* Moves `count` working days forward (or back), skipping weekend days. */
export function addBusinessDays(d: Date, count: number, weekend: readonly number[]): Date {
  if (weekend.length >= 7) return d;
  const step = count >= 0 ? 1 : -1;
  let left = Math.abs(count);
  let cur = d;
  while (left > 0) {
    cur = addDays(cur, step);
    if (!weekend.includes(cur.getUTCDay())) left--;
  }
  return cur;
}

/* ISO 8601 week number (weeks start on Monday; week 1 contains January 4). */
export function isoWeek(d: Date): number {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

export function dayOfYear(d: Date): number {
  return daysBetween(new Date(Date.UTC(d.getUTCFullYear(), 0, 1, 12)), d) + 1;
}
