/* Sleep cycle timing. Sleep runs in cycles of roughly 90 minutes (70–120 in
   practice); waking at the end of a cycle, rather than in deep sleep, tends to
   feel easier. Times are minutes after midnight, wrapping around the day. */

export const MINUTES_PER_DAY = 1440;

const wrap = (m: number) => ((Math.round(m) % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

export type Option = { cycles: number; time: number; sleepMinutes: number };

/* Bedtimes for waking at `wake`: go to bed early enough to fall asleep and
   complete n full cycles. Longest sleep first. */
export function bedtimesFor(wake: number, cycleMinutes = 90, fallAsleep = 15, cycles = [6, 5, 4, 3]): Option[] {
  return cycles.map((n) => ({ cycles: n, sleepMinutes: n * cycleMinutes, time: wrap(wake - n * cycleMinutes - fallAsleep) }));
}

/* Wake-up times when going to bed at `bed`. Shortest sleep first. */
export function wakeTimesFor(bed: number, cycleMinutes = 90, fallAsleep = 15, cycles = [3, 4, 5, 6]): Option[] {
  return cycles.map((n) => ({ cycles: n, sleepMinutes: n * cycleMinutes, time: wrap(bed + fallAsleep + n * cycleMinutes) }));
}

export function parseTime(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  return h < 24 && min < 60 ? h * 60 + min : null;
}

/* In the visitor's own 12- or 24-hour style */
export function formatTime(minutes: number): string {
  const d = new Date(Date.UTC(2000, 0, 1, Math.floor(minutes / 60), minutes % 60));
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(d);
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/* Recommended total sleep per 24 hours by age group
   (American Academy of Sleep Medicine consensus, 2016). */
export const RECOMMENDED: { group: string; hours: string }[] = [
  { group: "Infants 4–12 months", hours: "12–16 (including naps)" },
  { group: "Children 1–2 years", hours: "11–14 (including naps)" },
  { group: "Children 3–5 years", hours: "10–13 (including naps)" },
  { group: "Children 6–12 years", hours: "9–12" },
  { group: "Teenagers 13–18 years", hours: "8–10" },
  { group: "Adults 18 and over", hours: "7 or more (7–9)" },
];
