/* Time card maths: each day's worked time from clock-in, clock-out and
   unpaid break, the week's total, overtime and pay. Times are "HH:MM"
   (24-hour, as <input type="time"> gives them). */

export type DayEntry = { start: string; end: string; breakMin: string };

export type Rounding = 0 | 5 | 6 | 15;

export type Rules = {
  /* Hours a week after which time counts as overtime (US federal: 40). */
  weeklyLimit: number;
  /* Hours a day after which time counts as overtime, or 0 for none
     (California, for example, uses 8). */
  dailyLimit: number;
  /* Pay multiplier for overtime hours (time and a half = 1.5). */
  overtimeRate: number;
  rounding: Rounding;
};

export type DayResult = { minutes: number; overnight: boolean; error?: string };

export type WeekResult = {
  days: DayResult[];
  totalMin: number;
  regularMin: number;
  overtimeMin: number;
};

/* "09:07" → 547; "" or bad input → null */
export function parseTime(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/* Round a punch to the nearest step (7:53 → 8:00 with 15-minute rounding;
   7:52 → 7:45). 6 minutes is a tenth of an hour. */
export function roundMinutes(min: number, step: Rounding): number {
  if (!step) return min;
  return Math.round(min / step) * step;
}

export function dayMinutes(d: DayEntry, rounding: Rounding): DayResult {
  if (!d.start && !d.end) return { minutes: 0, overnight: false };
  const s = parseTime(d.start), e = parseTime(d.end);
  if (s === null || e === null) return { minutes: 0, overnight: false, error: "Enter both times" };
  const start = roundMinutes(s, rounding);
  let end = roundMinutes(e, rounding);
  if (end === start) return { minutes: 0, overnight: false, error: "Clock-out is the same as clock-in" };
  const overnight = end < start;
  if (overnight) end += 24 * 60; // shift past midnight
  const brk = Math.max(0, Number(d.breakMin) || 0);
  const worked = end - start - brk;
  if (worked < 0) return { minutes: 0, overnight, error: "Break is longer than the shift" };
  return { minutes: worked, overnight };
}

/* Overtime: hours over the daily limit each day, then whatever regular
   time is still over the weekly limit. Hours are never counted twice. */
export function weekTotals(days: DayEntry[], rules: Rules): WeekResult {
  const results = days.map((d) => dayMinutes(d, rules.rounding));
  const daily = rules.dailyLimit > 0 ? rules.dailyLimit * 60 : Infinity;
  let dailyOT = 0, regularSum = 0;
  for (const r of results) {
    const ot = Math.max(0, r.minutes - daily);
    dailyOT += ot;
    regularSum += r.minutes - ot;
  }
  const weekly = rules.weeklyLimit > 0 ? rules.weeklyLimit * 60 : Infinity;
  const weeklyOT = Math.max(0, regularSum - weekly);
  const totalMin = results.reduce((s, r) => s + r.minutes, 0);
  const overtimeMin = dailyOT + weeklyOT;
  return { days: results, totalMin, regularMin: totalMin - overtimeMin, overtimeMin };
}

export function pay(week: WeekResult, hourlyRate: number, overtimeRate: number) {
  const regular = (week.regularMin / 60) * hourlyRate;
  const overtime = (week.overtimeMin / 60) * hourlyRate * overtimeRate;
  return { regular, overtime, total: regular + overtime };
}

/* 510 → "8:30" */
export function hhmm(min: number): string {
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
}

/* 510 → "8.50" (decimal hours, as payroll uses) */
export function decimalHours(min: number): string {
  return (min / 60).toFixed(2);
}

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* Day labels for a week that starts on Sunday (0) or Monday (1). */
export function weekDays(startsOn: 0 | 1): string[] {
  return Array.from({ length: 7 }, (_, i) => DAY_NAMES[(i + startsOn) % 7]);
}

export function toCsv(labels: string[], days: DayEntry[], week: WeekResult): string {
  const rows = [["Day", "Clock in", "Clock out", "Break (min)", "Hours (h:mm)", "Hours (decimal)"]];
  days.forEach((d, i) => {
    const r = week.days[i];
    rows.push([labels[i], d.start, d.end, d.breakMin || "0", hhmm(r.minutes), decimalHours(r.minutes)]);
  });
  rows.push(["Total", "", "", "", hhmm(week.totalMin), decimalHours(week.totalMin)]);
  rows.push(["Regular", "", "", "", hhmm(week.regularMin), decimalHours(week.regularMin)]);
  rows.push(["Overtime", "", "", "", hhmm(week.overtimeMin), decimalHours(week.overtimeMin)]);
  return rows.map((r) => r.join(",")).join("\n") + "\n";
}
