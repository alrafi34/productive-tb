export interface AgeResult {
  years: number;
  months: number;
  days: number;
}

export interface LifetimeStats {
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface NextBirthday {
  months: number;
  days: number;
  totalDaysLeft: number;
  weekdayName: string;
  nextDate: Date;
}

export interface ZodiacInfo {
  western: string;
  westernIcon: string;
}

export interface Milestone {
  name: string;
  date: Date;
  completed: boolean;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getWeekday(date: Date): string {
  return WEEKDAYS[date.getDay()];
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/* A date picker's "YYYY-MM-DD" as local midnight. new Date("YYYY-MM-DD")
   reads it as UTC midnight, which is the previous day anywhere west of UTC. */
export function parseDateInput(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
}

/* Today's date as "YYYY-MM-DD" in the visitor's own timezone. */
export function todayInputValue(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/* Whole calendar days from a to b; rounding absorbs daylight-saving hours. */
function daysBetween(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / MS_PER_DAY);
}

export function calculateExactAge(birthDate: Date, targetDate: Date): AgeResult {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  if (targetDate.getDate() < birthDate.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }

  // Days counted from the last "monthiversary". A birth day the month does not
  // have (the 31st, or 29 Feb) falls on that month's last day.
  const monthIndex = birthDate.getMonth() + months;
  const anchorYear = birthDate.getFullYear() + years + Math.floor(monthIndex / 12);
  const anchorMonth = monthIndex % 12;
  const anchorDay = Math.min(birthDate.getDate(), getDaysInMonth(anchorYear, anchorMonth + 1));
  const days = daysBetween(new Date(anchorYear, anchorMonth, anchorDay), targetDate);

  return { years, months, days };
}

export function calculateLifetimeStats(birthDate: Date, targetDate: Date): LifetimeStats {
  const diffTime = targetDate.getTime() - birthDate.getTime();
  const diffDays = daysBetween(birthDate, targetDate);
  
  // Approximate months
  const age = calculateExactAge(birthDate, targetDate);
  const totalMonths = (age.years * 12) + age.months;
  
  return {
    totalMonths,
    totalWeeks: Math.floor(diffDays / 7),
    totalDays: diffDays,
    totalHours: Math.floor(diffTime / (1000 * 60 * 60)),
    totalMinutes: Math.floor(diffTime / (1000 * 60)),
    totalSeconds: Math.floor(diffTime / 1000)
  };
}

export function calculateNextBirthday(birthDate: Date, targetDate: Date): NextBirthday {
  const today = startOfDay(targetDate);
  let nextBdayYear = today.getFullYear();
  let nextBday = new Date(nextBdayYear, birthDate.getMonth(), birthDate.getDate());

  // A birthday earlier this year is next year's; one that is today stays today
  if (nextBday.getTime() < today.getTime()) {
    nextBdayYear++;
    nextBday = new Date(nextBdayYear, birthDate.getMonth(), birthDate.getDate());
  }

  const totalDaysLeft = daysBetween(today, nextBday);

  const result = calculateExactAge(today, nextBday);

  return {
    months: result.months,
    days: result.days,
    totalDaysLeft,
    weekdayName: getWeekday(nextBday),
    nextDate: nextBday
  };
}

export function getZodiacSigns(birthDate: Date): ZodiacInfo {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // 1-12

  let western = "";
  let westernIcon = "";

  if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) { western = "Capricorn"; westernIcon = "♑"; }
  else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) { western = "Aquarius"; westernIcon = "♒"; }
  else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) { western = "Pisces"; westernIcon = "♓"; }
  else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) { western = "Aries"; westernIcon = "♈"; }
  else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) { western = "Taurus"; westernIcon = "♉"; }
  else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) { western = "Gemini"; westernIcon = "♊"; }
  else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) { western = "Cancer"; westernIcon = "♋"; }
  else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) { western = "Leo"; westernIcon = "♌"; }
  else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) { western = "Virgo"; westernIcon = "♍"; }
  else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) { western = "Libra"; westernIcon = "♎"; }
  else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) { western = "Scorpio"; westernIcon = "♏"; }
  else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) { western = "Sagittarius"; westernIcon = "♐"; }

  return { western, westernIcon };
}

export function getMilestones(birthDate: Date, targetDate: Date): Milestone[] {
  const msPerDay = 1000 * 60 * 60 * 24;
  const bTime = birthDate.getTime();
  const tTime = targetDate.getTime();

  const daysMilestones = [1000, 5000, 10000, 15000, 20000];
  const weeksMilestones = [500, 1000, 2000, 3000]; // Multiplied by 7 for days
  const yearsMilestones = [1, 10, 18, 21, 30, 40, 50, 60, 65, 80] // Exact years

  const results: Milestone[] = [];

  // Add Days Milestones
  for (const d of daysMilestones) {
    const dTime = bTime + (d * msPerDay);
    results.push({ name: `${d.toLocaleString()} Days`, date: new Date(dTime), completed: dTime <= tTime });
  }

  // Add Weeks Milestones
  for (const w of weeksMilestones) {
    const dTime = bTime + (w * 7 * msPerDay);
    results.push({ name: `${w.toLocaleString()} Weeks`, date: new Date(dTime), completed: dTime <= tTime });
  }

  // Add Years Milestones
  for (const y of yearsMilestones) {
    const dDate = new Date(birthDate.getFullYear() + y, birthDate.getMonth(), birthDate.getDate());
    results.push({ name: `${y} Years Old`, date: dDate, completed: dDate.getTime() <= tTime });
  }

  // Sort by date chronologically
  return results.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getAgeProgressDetails(birthDate: Date, targetDate: Date): { percent: number, daysPassedInYear: number, totalDaysInYear: number } {
  let prevBday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (prevBday.getTime() > targetDate.getTime()) {
    prevBday = new Date(targetDate.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate());
  }

  let nextBday = new Date(prevBday.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());

  const totalDaysInYear = Math.ceil((nextBday.getTime() - prevBday.getTime()) / (1000 * 60 * 60 * 24));
  const daysPassedInYear = Math.ceil((targetDate.getTime() - prevBday.getTime()) / (1000 * 60 * 60 * 24));
  const percent = totalDaysInYear === 0 ? 0 : (daysPassedInYear / totalDaysInYear) * 100;

  return {
    percent: Math.min(100, Math.max(0, percent)),
    daysPassedInYear,
    totalDaysInYear
  };
}
