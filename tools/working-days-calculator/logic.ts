export interface WorkingDaysResult {
  workingDays: number;
  totalDays: number;
  weekendDays: number;
  holidayDays: number;
  startDate: Date;
  endDate: Date;
}

export interface Holiday {
  date: string;
  name?: string;
}

export type WeekendType =
  | 'two-day'
  | 'fri-sat'
  | 'one-day-friday'
  | 'one-day-saturday'
  | 'one-day-sunday'
  | 'none';

/* Timezones whose working week ends on Friday and Saturday (Bangladesh, and
   Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Jordan, Iraq and Egypt). */
const FRI_SAT_TIMEZONES = new Set([
  'Asia/Dhaka', 'Asia/Riyadh', 'Asia/Qatar', 'Asia/Kuwait', 'Asia/Bahrain',
  'Asia/Muscat', 'Asia/Amman', 'Asia/Baghdad', 'Africa/Cairo',
]);

/* The weekend most visitors in this timezone work to. */
export function getDefaultWeekendType(timeZone?: string): WeekendType {
  let zone = timeZone;
  if (zone === undefined) {
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      zone = '';
    }
  }
  return zone && FRI_SAT_TIMEZONES.has(zone) ? 'fri-sat' : 'two-day';
}

/* A date picker's "YYYY-MM-DD" as local midnight. new Date("YYYY-MM-DD")
   reads it as UTC midnight, which is the previous day (and weekday)
   anywhere west of UTC. */
export function parseDateInput(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
}

/* "YYYY-MM-DD" for a date in the visitor's own timezone. */
export function toDateString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function calculateWorkingDays(
  startDate: Date,
  endDate: Date,
  holidays: string[] = [],
  includeStartDate: boolean = true,
  weekendType: WeekendType = 'two-day'
): WorkingDaysResult {
  if (startDate > endDate) {
    throw new Error("Start date must be before or equal to end date");
  }

  const holidaySet = new Set(holidays.map(h => toDateString(parseDateInput(h))));
  let workingDays = 0;
  let weekendDays = 0;
  let holidayDays = 0;
  
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  // If not including start date, move to next day
  if (!includeStartDate) {
    current.setDate(current.getDate() + 1);
  }

  while (current <= end) {
    const dayOfWeek = current.getDay();
    const dateString = toDateString(current);
    
    const isWeekend = getIsWeekend(dayOfWeek, weekendType);
    const isHoliday = holidaySet.has(dateString);
    
    if (isWeekend) {
      weekendDays++;
    } else if (isHoliday) {
      holidayDays++;
    } else {
      workingDays++;
    }
    
    current.setDate(current.getDate() + 1);
  }

  // Rounded, so a daylight-saving change inside the range does not drop a day
  const totalDays = Math.round((end.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + (includeStartDate ? 1 : 0);

  return {
    workingDays,
    totalDays,
    weekendDays,
    holidayDays,
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  };
}

function getIsWeekend(dayOfWeek: number, weekendType: WeekendType): boolean {
  switch (weekendType) {
    case 'two-day':
      return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
    case 'fri-sat':
      return dayOfWeek === 5 || dayOfWeek === 6; // Friday = 5, Saturday = 6
    case 'one-day-friday':
      return dayOfWeek === 5; // Friday only
    case 'one-day-saturday':
      return dayOfWeek === 6; // Saturday only
    case 'one-day-sunday':
      return dayOfWeek === 0; // Sunday only
    case 'none':
      return false; // No weekends
    default:
      return dayOfWeek === 0 || dayOfWeek === 6;
  }
}

export function getWeekendDescription(weekendType: WeekendType): string {
  switch (weekendType) {
    case 'two-day':
      return 'Saturday & Sunday';
    case 'fri-sat':
      return 'Friday & Saturday';
    case 'one-day-friday':
      return 'Friday only';
    case 'one-day-saturday':
      return 'Saturday only';
    case 'one-day-sunday':
      return 'Sunday only';
    case 'none':
      return 'No weekends';
    default:
      return 'Saturday & Sunday';
  }
}

export function parseHolidays(holidayText: string): string[] {
  return holidayText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .filter(line => {
      // Basic date validation
      const date = parseDateInput(line);
      return !isNaN(date.getTime());
    });
}

export function getTodayString(): string {
  return toDateString(new Date());
}

export function getDatePlusWeeks(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + (weeks * 7));
  return toDateString(date);
}

export function formatResultText(result: WorkingDaysResult, weekendType: WeekendType): string {
  const startStr = result.startDate.toLocaleDateString();
  const endStr = result.endDate.toLocaleDateString();
  
  return `Working Days Calculation

Start Date: ${startStr}
End Date: ${endStr}
Weekend Type: ${getWeekendDescription(weekendType)}

Calendar Days: ${result.totalDays}
Weekend Days: ${result.weekendDays}
Holiday Days: ${result.holidayDays}

Working Days: ${result.workingDays}

Calculated via Productive Toolbox`;
}

export const commonHolidays = {
  us: [
    { date: "2024-01-01", name: "New Year's Day" },
    { date: "2024-07-04", name: "Independence Day" },
    { date: "2024-12-25", name: "Christmas Day" },
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-07-04", name: "Independence Day" },
    { date: "2025-12-25", name: "Christmas Day" },
  ],
  uk: [
    { date: "2024-01-01", name: "New Year's Day" },
    { date: "2024-12-25", name: "Christmas Day" },
    { date: "2024-12-26", name: "Boxing Day" },
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-12-25", name: "Christmas Day" },
    { date: "2025-12-26", name: "Boxing Day" },
  ]
};