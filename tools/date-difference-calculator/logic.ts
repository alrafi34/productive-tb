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
  let days = endDate.getDate() - startDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const prevMonth = endDate.getMonth() === 0 ? 11 : endDate.getMonth() - 1;
    const prevYear = endDate.getMonth() === 0 ? endDate.getFullYear() - 1 : endDate.getFullYear();
    days += getDaysInMonth(prevYear, prevMonth);
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total values
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
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

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  const date = new Date(dateString);
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
