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

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type FieldSpec = { min: number; max: number; names?: string[]; nameBase?: number };
const FIELDS: Record<keyof CronState, FieldSpec> = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  dayOfMonth: { min: 1, max: 31 },
  month: { min: 1, max: 12, names: MONTH_ABBR, nameBase: 1 },
  // 7 is also accepted for Sunday, as in most cron implementations
  dayOfWeek: { min: 0, max: 7, names: DAY_ABBR, nameBase: 0 },
};

function toNumber(token: string, spec: FieldSpec): number | null {
  if (/^\d+$/.test(token)) return Number(token);
  const i = spec.names?.indexOf(token.toUpperCase()) ?? -1;
  return i >= 0 ? i + (spec.nameBase ?? 0) : null;
}

/* Expands one cron field ("*", "5", "1-5", "* /15", "10-50/10", "MON-FRI", lists
   of these) to the sorted values it matches, or null when it is invalid. */
export function expandField(field: string, spec: FieldSpec): number[] | null {
  const values = new Set<number>();
  for (const item of field.split(",")) {
    const m = /^([^/]+)(?:\/(\d+))?$/.exec(item);
    if (!m) return null;
    const step = m[2] === undefined ? 1 : Number(m[2]);
    if (step < 1) return null;
    let start: number | null;
    let end: number | null;
    if (m[1] === "*") {
      start = spec.min;
      end = spec.max;
    } else if (m[1].includes("-")) {
      const [x, y, extra] = m[1].split("-");
      if (extra !== undefined) return null;
      start = toNumber(x, spec);
      end = toNumber(y, spec);
    } else {
      start = toNumber(m[1], spec);
      // "5/15" means from 5 to the maximum in steps of 15
      end = m[2] === undefined ? start : spec.max;
    }
    if (start === null || end === null || start < spec.min || end > spec.max || start > end) return null;
    for (let v = start; v <= end; v += step) values.add(v);
  }
  return [...values].sort((x, y) => x - y);
}

export function validateCronExpression(expression: string): { valid: boolean; error?: string } {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { valid: false, error: "Cron expression must have exactly 5 fields" };
  }
  const labels: [keyof CronState, string][] = [
    ["minute", "minute field (0-59)"],
    ["hour", "hour field (0-23)"],
    ["dayOfMonth", "day of month field (1-31)"],
    ["month", "month field (1-12 or JAN-DEC)"],
    ["dayOfWeek", "day of week field (0-7 or SUN-SAT)"],
  ];
  for (let i = 0; i < 5; i++) {
    const [key, label] = labels[i];
    if (!expandField(parts[i], FIELDS[key])) return { valid: false, error: `Invalid ${label}` };
  }
  return { valid: true };
}

const pad = (n: number) => String(n).padStart(2, "0");

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function ordinal(n: number): string {
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th";
  return `${n}${s}`;
}

/* "1-5" → "Monday to Friday", "1,15" → "1st and 15th" … */
function describeList(field: string, spec: FieldSpec, name: (n: number) => string): string {
  return joinList(
    field.split(",").map((item) => {
      const [range, step] = item.split("/");
      if (range === "*") return step ? `every ${ordinal(Number(step))}` : "every";
      if (range.includes("-")) {
        const [x, y] = range.split("-").map((t) => toNumber(t, spec)!);
        return `${name(x)} to ${name(y)}${step ? ` (every ${ordinal(Number(step))})` : ""}`;
      }
      const v = toNumber(range, spec)!;
      return step ? `every ${ordinal(Number(step))} from ${name(v)}` : name(v);
    }),
  );
}

/* A plain-English reading of a cron schedule, e.g. "At 09:00 on Monday to Friday". */
export function generateHumanDescription(state: CronState): string {
  const expr = buildCronExpression(state);
  if (!validateCronExpression(expr).valid) return "Invalid cron expression";

  const minutes = expandField(state.minute, FIELDS.minute)!;
  const hours = expandField(state.hour, FIELDS.hour)!;
  const everyMinute = state.minute === "*";
  const everyHour = state.hour === "*";
  const minuteStep = /^\*\/(\d+)$/.exec(state.minute)?.[1];
  const hourStep = /^\*\/(\d+)$/.exec(state.hour)?.[1];
  // A plain hour range such as 9-17
  const hourRange = /^(\d+)-(\d+)$/.exec(state.hour)?.slice(1).map(Number);

  let time: string;
  if (everyMinute && everyHour) time = "Every minute";
  else if (minuteStep && everyHour) time = `Every ${minuteStep} minutes`;
  else if ((everyMinute || minuteStep) && hourRange) {
    time = `Every ${minuteStep ? `${minuteStep} minutes` : "minute"} from ${pad(hourRange[0])}:00 to ${pad(hourRange[1])}:59`;
  } else if (everyMinute) time = `Every minute during hour ${describeList(state.hour, FIELDS.hour, pad)}`;
  else if (everyHour && minutes.length === 1) time = minutes[0] === 0 ? "Every hour, on the hour" : `At minute ${minutes[0]} of every hour`;
  else if (everyHour && minutes.length <= 12) time = `At minutes ${joinList(minutes.map(String))} of every hour`;
  else if (hourRange && minutes.length === 1) {
    time = `Every hour from ${pad(hourRange[0])}:${pad(minutes[0])} to ${pad(hourRange[1])}:${pad(minutes[0])}`;
  }
  else if (hourStep && minutes.length === 1) time = `Every ${hourStep} hours${minutes[0] ? ` at minute ${minutes[0]}` : ""}`;
  else if (!everyHour && minutes.length * hours.length <= 8) {
    time = `At ${joinList(hours.flatMap((h) => minutes.map((m) => `${pad(h)}:${pad(m)}`)))}`;
  } else if (everyHour) {
    time = `At minute ${describeList(state.minute, FIELDS.minute, String)} of every hour`;
  } else {
    time = `At minute ${describeList(state.minute, FIELDS.minute, String)} past hour ${describeList(state.hour, FIELDS.hour, String)}`;
  }

  const parts = [time];
  const dayName = (n: number) => DAY_NAMES[n % 7];
  const dom = state.dayOfMonth !== "*" ? `on the ${describeList(state.dayOfMonth, FIELDS.dayOfMonth, ordinal)} of the month` : "";
  let dow = "";
  if (state.dayOfWeek !== "*") {
    const days = expandField(state.dayOfWeek, FIELDS.dayOfWeek)!.map((d) => d % 7);
    const set = [...new Set(days)].sort().join(",");
    dow = set === "1,2,3,4,5" ? "on weekdays" : set === "0,6" ? "on weekends" : `on ${describeList(state.dayOfWeek, FIELDS.dayOfWeek, dayName)}`;
  }
  // When both day fields are restricted, cron runs on days matching either one
  if (dom && dow) parts.push(`${dom} or ${dow}`);
  else if (dom || dow) parts.push(dom || dow);
  if (state.month !== "*") parts.push(`in ${describeList(state.month, FIELDS.month, (n) => MONTH_NAMES[n])}`);
  return parts.join(" ");
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