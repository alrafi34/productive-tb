import { addDays, daysBetween } from "@/lib/dates";

/* Pregnancy dating. Gestational age is counted from the first day of the
   last menstrual period (LMP); a pregnancy lasts 280 days (40 weeks) from the
   LMP, or 266 days (38 weeks) from conception, on average (Naegele's rule). */

export type Method = "lmp" | "conception" | "ivf" | "ultrasound";

export type DatingInput =
  | { method: "lmp"; lmp: Date; cycleLength: number }
  | { method: "conception"; conception: Date }
  /* Embryo age at transfer: 3 or 5 days */
  | { method: "ivf"; transfer: Date; embryoDays: 3 | 5 }
  | { method: "ultrasound"; scan: Date; weeks: number; days: number };

/* The date that counts as "LMP" for gestational age (day 0 of pregnancy). */
export function gestationStart(i: DatingInput): Date {
  switch (i.method) {
    case "lmp":
      // A longer cycle means later ovulation: shift by the difference from 28 days
      return addDays(i.lmp, i.cycleLength - 28);
    case "conception":
      return addDays(i.conception, -14);
    case "ivf":
      // Transfer of a day-5 embryo equals conception 5 days earlier
      return addDays(i.transfer, -14 - i.embryoDays);
    case "ultrasound":
      return addDays(i.scan, -(i.weeks * 7 + i.days));
  }
}

export function dueDate(i: DatingInput): Date {
  return addDays(gestationStart(i), 280);
}

export type Progress = { weeks: number; days: number; totalDays: number; trimester: 0 | 1 | 2 | 3; percent: number; daysToGo: number };

/* Gestational age on a given day. Trimesters: 1 up to 13w6d, 2 from 14w0d to
   27w6d, 3 from 28w0d. trimester 0 means the date is before the pregnancy. */
export function progressOn(start: Date, on: Date): Progress {
  const total = daysBetween(start, on);
  const weeks = Math.floor(total / 7);
  const days = total - weeks * 7;
  const trimester = total < 0 ? 0 : weeks < 14 ? 1 : weeks < 28 ? 2 : 3;
  return {
    weeks,
    days,
    totalDays: total,
    trimester,
    percent: Math.min(Math.max((total / 280) * 100, 0), 100),
    daysToGo: 280 - total,
  };
}

/* Key dates, as days after the gestation start */
export const MILESTONES: { label: string; day: number; note: string }[] = [
  { label: "Conception (approx.)", day: 14, note: "About two weeks after the start of the last period" },
  { label: "First trimester ends", day: 13 * 7 + 6, note: "End of week 13" },
  { label: "Anatomy scan window", day: 18 * 7, note: "Usually between 18 and 22 weeks" },
  { label: "Third trimester begins", day: 28 * 7, note: "Week 28" },
  { label: "Early term", day: 37 * 7, note: "37 weeks 0 days" },
  { label: "Full term", day: 39 * 7, note: "39 weeks 0 days to 40 weeks 6 days" },
  { label: "Due date", day: 280, note: "40 weeks 0 days" },
  { label: "Late term", day: 41 * 7, note: "41 weeks 0 days" },
];
