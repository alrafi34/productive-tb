/* Calendar-date helpers for the health tools. Dates are handled as plain
   calendar days (YYYY-MM-DD) at noon UTC, so adding days is never thrown off
   by daylight saving time or the visitor's timezone. */

const DAY = 86_400_000;

export function parseDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * DAY);
}

/* Whole days from a to b (b − a) */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY);
}

/* Today in the visitor's own timezone, as a noon-UTC calendar date */
export function today(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12));
}

/* "Friday, March 6, 2026" in the visitor's language and date order */
export function formatDate(d: Date, style: "long" | "full" | "medium" = "long"): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: style, timeZone: "UTC" }).format(d);
}
