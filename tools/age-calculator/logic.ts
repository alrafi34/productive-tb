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
  chinese: string;
  westernIcon: string;
  chineseIcon: string;
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

export function calculateExactAge(birthDate: Date, targetDate: Date): AgeResult {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    // Get days of the previous month
    let prevMonth = targetDate.getMonth();
    let prevYear = targetDate.getFullYear();
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear--;
    }
    days += getDaysInMonth(prevYear, prevMonth);
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export function calculateLifetimeStats(birthDate: Date, targetDate: Date): LifetimeStats {
  const diffTime = targetDate.getTime() - birthDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
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
  let nextBdayYear = targetDate.getFullYear();
  let nextBday = new Date(nextBdayYear, birthDate.getMonth(), birthDate.getDate());

  // If birthday already passed this year, next one is next year
  if (nextBday.getTime() < targetDate.getTime()) {
    nextBdayYear++;
    nextBday = new Date(nextBdayYear, birthDate.getMonth(), birthDate.getDate());
  }

  const diffTime = nextBday.getTime() - targetDate.getTime();
  const totalDaysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const result = calculateExactAge(targetDate, nextBday);

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
  const year = birthDate.getFullYear();

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

  const chineseAnimals = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Sheep"];
  const chineseIcons = ["🐒", "🐓", "🐕", "🐖", "🐀", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐏"];
  const chineseIndex = year % 12;
  const chinese = chineseAnimals[chineseIndex];
  const chineseIcon = chineseIcons[chineseIndex];

  return { western, chinese, westernIcon, chineseIcon };
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
