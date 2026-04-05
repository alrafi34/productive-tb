export interface CronState {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface CronPreset {
  name: string;
  expression: string;
  description: string;
}

export const CRON_PRESETS: CronPreset[] = [
  { name: "Every minute", expression: "* * * * *", description: "Runs every minute" },
  { name: "Every 5 minutes", expression: "*/5 * * * *", description: "Runs every 5 minutes" },
  { name: "Every 15 minutes", expression: "*/15 * * * *", description: "Runs every 15 minutes" },
  { name: "Every 30 minutes", expression: "*/30 * * * *", description: "Runs every 30 minutes" },
  { name: "Every hour", expression: "0 * * * *", description: "Runs every hour at minute 0" },
  { name: "Every 2 hours", expression: "0 */2 * * *", description: "Runs every 2 hours" },
  { name: "Every 6 hours", expression: "0 */6 * * *", description: "Runs every 6 hours" },
  { name: "Daily at midnight", expression: "0 0 * * *", description: "Runs daily at 00:00" },
  { name: "Daily at 3:30 AM", expression: "30 3 * * *", description: "Runs daily at 03:30" },
  { name: "Weekly on Monday", expression: "0 0 * * 1", description: "Runs every Monday at 00:00" },
  { name: "Monthly on 1st", expression: "0 0 1 * *", description: "Runs on the 1st of every month at 00:00" },
  { name: "Weekdays at 9 AM", expression: "0 9 * * 1-5", description: "Runs Monday to Friday at 09:00" },
];

export const MINUTE_OPTIONS = [
  { value: "*", label: "Every minute" },
  { value: "*/5", label: "Every 5 minutes" },
  { value: "*/10", label: "Every 10 minutes" },
  { value: "*/15", label: "Every 15 minutes" },
  { value: "*/30", label: "Every 30 minutes" },
  { value: "0", label: "At minute 0" },
  { value: "custom", label: "Custom minute" }
];

export const HOUR_OPTIONS = [
  { value: "*", label: "Every hour" },
  { value: "*/2", label: "Every 2 hours" },
  { value: "*/6", label: "Every 6 hours" },
  { value: "*/12", label: "Every 12 hours" },
  { value: "0", label: "At hour 0 (midnight)" },
  { value: "custom", label: "Custom hour" }
];

export const DAY_OF_MONTH_OPTIONS = [
  { value: "*", label: "Every day" },
  { value: "1", label: "1st of month" },
  { value: "15", label: "15th of month" },
  { value: "custom", label: "Custom day" }
];

export const MONTH_OPTIONS = [
  { value: "*", label: "Every month" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
];

export const DAY_OF_WEEK_OPTIONS = [
  { value: "*", label: "Every day" },
  { value: "1-5", label: "Weekdays (Mon-Fri)" },
  { value: "6,0", label: "Weekends (Sat-Sun)" },
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" }
];

export function buildCronExpression(state: CronState): string {
  return [state.minute, state.hour, state.dayOfMonth, state.month, state.dayOfWeek].join(" ");
}

export function parseCronExpression(expression: string): CronState | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4]
  };
}

export function validateCronExpression(expression: string): { valid: boolean; error?: string } {
  const parts = expression.trim().split(/\s+/);
  
  if (parts.length !== 5) {
    return { valid: false, error: "Cron expression must have exactly 5 fields" };
  }
  
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  
  // Basic validation
  if (!isValidCronField(minute, 0, 59)) {
    return { valid: false, error: "Invalid minute field (0-59)" };
  }
  if (!isValidCronField(hour, 0, 23)) {
    return { valid: false, error: "Invalid hour field (0-23)" };
  }
  if (!isValidCronField(dayOfMonth, 1, 31)) {
    return { valid: false, error: "Invalid day of month field (1-31)" };
  }
  if (!isValidCronField(month, 1, 12)) {
    return { valid: false, error: "Invalid month field (1-12)" };
  }
  if (!isValidCronField(dayOfWeek, 0, 6)) {
    return { valid: false, error: "Invalid day of week field (0-6)" };
  }
  
  return { valid: true };
}

function isValidCronField(field: string, min: number, max: number): boolean {
  if (field === "*") return true;
  
  // Handle step values (*/5)
  if (field.startsWith("*/")) {
    const step = parseInt(field.substring(2));
    return !isNaN(step) && step > 0 && step <= max;
  }
  
  // Handle ranges (1-5)
  if (field.includes("-")) {
    const [start, end] = field.split("-").map(n => parseInt(n));
    return !isNaN(start) && !isNaN(end) && start >= min && end <= max && start <= end;
  }
  
  // Handle lists (1,3,5)
  if (field.includes(",")) {
    const values = field.split(",").map(n => parseInt(n));
    return values.every(v => !isNaN(v) && v >= min && v <= max);
  }
  
  // Handle single values
  const value = parseInt(field);
  return !isNaN(value) && value >= min && value <= max;
}

export function generateHumanDescription(state: CronState): string {
  const parts: string[] = [];
  
  // Frequency
  if (state.minute === "*" && state.hour === "*") {
    parts.push("Runs every minute");
  } else if (state.minute.startsWith("*/") && state.hour === "*") {
    const interval = state.minute.substring(2);
    parts.push(`Runs every ${interval} minutes`);
  } else if (state.minute === "0" && state.hour.startsWith("*/")) {
    const interval = state.hour.substring(2);
    parts.push(`Runs every ${interval} hours`);
  } else if (state.minute === "0" && state.hour === "*") {
    parts.push("Runs every hour");
  } else {
    // Specific time
    const minute = state.minute === "*" ? "every minute" : `minute ${state.minute}`;
    const hour = state.hour === "*" ? "every hour" : formatHour(state.hour);
    
    if (state.hour === "*") {
      parts.push(`Runs at ${minute} of every hour`);
    } else {
      parts.push(`Runs at ${hour}:${state.minute.padStart(2, "0")}`);
    }
  }
  
  // Day constraints
  if (state.dayOfWeek !== "*") {
    if (state.dayOfWeek === "1-5") {
      parts.push("on weekdays");
    } else if (state.dayOfWeek === "6,0") {
      parts.push("on weekends");
    } else {
      const days = formatDayOfWeek(state.dayOfWeek);
      parts.push(`on ${days}`);
    }
  } else if (state.dayOfMonth !== "*") {
    if (state.dayOfMonth === "1") {
      parts.push("on the 1st of the month");
    } else {
      parts.push(`on day ${state.dayOfMonth} of the month`);
    }
  }
  
  // Month constraints
  if (state.month !== "*") {
    const monthName = formatMonth(state.month);
    parts.push(`in ${monthName}`);
  }
  
  return parts.join(" ");
}

function formatHour(hour: string): string {
  if (hour === "*") return "every hour";
  if (hour.startsWith("*/")) return `every ${hour.substring(2)} hours`;
  
  const h = parseInt(hour);
  if (h === 0) return "00";
  if (h < 10) return `0${h}`;
  return h.toString();
}

function formatDayOfWeek(dayOfWeek: string): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  if (dayOfWeek.includes(",")) {
    return dayOfWeek.split(",").map(d => days[parseInt(d)]).join(", ");
  }
  
  if (dayOfWeek.includes("-")) {
    const [start, end] = dayOfWeek.split("-").map(d => parseInt(d));
    return `${days[start]} to ${days[end]}`;
  }
  
  return days[parseInt(dayOfWeek)];
}

function formatMonth(month: string): string {
  const months = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  if (month.includes(",")) {
    return month.split(",").map(m => months[parseInt(m)]).join(", ");
  }
  
  return months[parseInt(month)];
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadCronSchedule(expression: string, description: string): void {
  const content = `Cron Expression: ${expression}\nDescription: ${description}\nGenerated: ${new Date().toISOString()}`;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cron-schedule.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}