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

export type WeekendType = 'two-day' | 'one-day-saturday' | 'one-day-sunday' | 'none';

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

  const holidaySet = new Set(holidays.map(h => h.trim()));
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
    const dateString = current.toISOString().split('T')[0];
    
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

  const totalDays = Math.floor((end.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + (includeStartDate ? 1 : 0);

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
      const date = new Date(line);
      return !isNaN(date.getTime());
    });
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDatePlusWeeks(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + (weeks * 7));
  return date.toISOString().split('T')[0];
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