export interface DateDifference {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalWeeks: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/* Whole calendar days from a to b; rounding absorbs daylight-saving hours. */
function daysBetween(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / MS_PER_DAY);
}

export function calculateDateDifference(
  startDate: Date,
  endDate: Date,
  includeTime: boolean = false
): DateDifference {
  // Ensure start is before end
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  if (endDate.getDate() < startDate.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }

  // Days counted from the last whole month after the start. A start day the
  // month does not have (the 31st, or 29 Feb) falls on that month's last day.
  const monthIndex = startDate.getMonth() + months;
  const anchorYear = startDate.getFullYear() + years + Math.floor(monthIndex / 12);
  const anchorMonth = monthIndex % 12;
  const anchorDay = Math.min(startDate.getDate(), getDaysInMonth(anchorYear, anchorMonth));
  const days = daysBetween(new Date(anchorYear, anchorMonth, anchorDay), endDate);

  // Calculate total values
  const totalDays = daysBetween(startDate, endDate);
  const totalMonths = years * 12 + months;
  const totalWeeks = Math.floor(totalDays / 7);

  const result: DateDifference = {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    totalWeeks
  };

  // Include time if requested
  if (includeTime) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    result.hours = totalHours % 24;
    result.minutes = totalMinutes % 60;
    result.seconds = totalSeconds % 60;
  }

  return result;
}

export function formatDateDifference(diff: DateDifference, format: 'full' | 'years' | 'months' | 'days' | 'weeks' = 'full'): string {
  switch (format) {
    case 'years':
      return `${diff.years} ${diff.years === 1 ? 'year' : 'years'}`;
    case 'months':
      return `${diff.totalMonths} ${diff.totalMonths === 1 ? 'month' : 'months'}`;
    case 'days':
      return `${diff.totalDays} ${diff.totalDays === 1 ? 'day' : 'days'}`;
    case 'weeks':
      return `${diff.totalWeeks} ${diff.totalWeeks === 1 ? 'week' : 'weeks'}`;
    case 'full':
    default:
      const parts: string[] = [];
      if (diff.years > 0) parts.push(`${diff.years} ${diff.years === 1 ? 'year' : 'years'}`);
      if (diff.months > 0) parts.push(`${diff.months} ${diff.months === 1 ? 'month' : 'months'}`);
      if (diff.days > 0 || parts.length === 0) parts.push(`${diff.days} ${diff.days === 1 ? 'day' : 'days'}`);
      
      if (diff.hours !== undefined || diff.minutes !== undefined || diff.seconds !== undefined) {
        const timeParts: string[] = [];
        if (diff.hours !== undefined && diff.hours > 0) timeParts.push(`${diff.hours}h`);
        if (diff.minutes !== undefined && diff.minutes > 0) timeParts.push(`${diff.minutes}m`);
        if (diff.seconds !== undefined && diff.seconds > 0) timeParts.push(`${diff.seconds}s`);
        if (timeParts.length > 0) parts.push(timeParts.join(' '));
      }
      
      return parts.join(', ');
  }
}

/* "YYYY-MM-DD" in the visitor's own timezone. toISOString() would give the
   UTC date, which is a different day for part of every day. */
export function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/* A date picker's "YYYY-MM-DD" as local midnight. new Date("YYYY-MM-DD")
   reads it as UTC midnight, which is the previous day anywhere west of UTC. */
export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString.trim());
  const date = m
    ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
    : new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

export function getTodayString(): string {
  return formatDate(new Date());
}

export function getDateFromYearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return formatDate(date);
}
