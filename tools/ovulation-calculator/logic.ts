import { addDays } from "@/lib/dates";

/* Ovulation estimate from the calendar method: ovulation happens about one
   luteal phase (usually 12–16 days, 14 on average) before the next period.
   The fertile window is the 5 days before ovulation plus ovulation day itself,
   since sperm can survive up to 5 days and the egg about 24 hours. */

export type Cycle = {
  periodStart: Date;
  ovulation: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
  /* Due date if conception happens this cycle: ovulation + 266 days */
  dueDate: Date;
};

export function cycleFrom(periodStart: Date, cycleLength: number, lutealLength = 14): Cycle {
  const ovulation = addDays(periodStart, cycleLength - lutealLength);
  return {
    periodStart,
    ovulation,
    fertileStart: addDays(ovulation, -5),
    fertileEnd: ovulation,
    nextPeriod: addDays(periodStart, cycleLength),
    dueDate: addDays(ovulation, 266),
  };
}

export function nextCycles(lastPeriod: Date, cycleLength: number, lutealLength: number, count = 6): Cycle[] {
  return Array.from({ length: count }, (_, i) => cycleFrom(addDays(lastPeriod, i * cycleLength), cycleLength, lutealLength));
}
