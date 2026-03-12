export interface TimestampDetails {
  originalInput: string;
  type: 'seconds' | 'milliseconds' | 'invalid';
  unixMs: number;
  unixS: number;
  utcString: string;
  localString: string;
  isoString: string;
  rfc2822: string;
  relative: string;
  timezones: { name: string, time: string }[];
  formats: { format: string, value: string }[];
}

export interface DiffResult {
  ms: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

const TIMEZONES = [
  { name: 'UTC', zone: 'UTC' },
  { name: 'GMT', zone: 'GMT' },
  { name: 'New York (EST/EDT)', zone: 'America/New_York' },
  { name: 'London (GMT/BST)', zone: 'Europe/London' },
  { name: 'Tokyo (JST)', zone: 'Asia/Tokyo' },
  { name: 'Sydney (AEST/AEDT)', zone: 'Australia/Sydney' },
];

export function parseTimestamp(input: string): { unixMs: number, type: 'seconds' | 'milliseconds' | 'invalid' } {
  const stripped = input.trim();
  if (!stripped) return { unixMs: 0, type: 'invalid' };

  // Check if it's a numeric timestamp string
  if (/^[-]?\d+$/.test(stripped)) {
    const num = parseInt(stripped, 10);
    // Typical heuristics: if less than length 12, it's probably seconds
    // Milliseconds normally start around 13 digits 
    // Example year 2001 ms length = 13
    if (stripped.replace("-", "").length <= 11) {
       return { unixMs: num * 1000, type: 'seconds' };
    } else {
       return { unixMs: num, type: 'milliseconds' };
    }
  }
  
  // Try parsing as generic date string
  const d = new Date(stripped);
  if (!isNaN(d.getTime())) {
     return { unixMs: d.getTime(), type: 'milliseconds' };
  }

  return { unixMs: 0, type: 'invalid' };
}

export function formatTimeZones(date: Date): { name: string, time: string }[] {
  return TIMEZONES.map(tz => {
    try {
      const time = date.toLocaleString('en-US', { timeZone: tz.zone, hour12: false, year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return { name: tz.name, time };
    } catch(e) {
      return { name: tz.name, time: 'Invalid Timezone' };
    }
  });
}

function pad(n: number) { return n < 10 ? '0' + n : n; }

export function getDeveloperFormats(date: Date): { format: string, value: string }[] {
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  
  let rfc2822 = "";
  try {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    rfc2822 = `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} +0000`;
  } catch(e) {}

  return [
    { format: 'ISO 8601', value: date.toISOString() },
    { format: 'RFC 2822', value: rfc2822 },
    { format: 'YYYY-MM-DD', value: `${yyyy}-${mm}-${dd}` },
    { format: 'DD/MM/YYYY', value: `${dd}/${mm}/${yyyy}` },
    { format: 'MM-DD-YYYY', value: `${mm}-${dd}-${yyyy}` },
  ];
}

export function getRelativeTime(unixMs: number, nowMs: number = Date.now()): string {
  const diffMs = nowMs - unixMs;
  const absDiff = Math.abs(diffMs);
  const isPast = diffMs >= 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let prefix = isPast ? "" : "in ";
  let suffix = isPast ? " ago" : "";
  let val = "";

  if (years > 0) val = `${years} year${years > 1 ? 's' : ''}`;
  else if (months > 0) val = `${months} month${months > 1 ? 's' : ''}`;
  else if (days > 0) val = `${days} day${days > 1 ? 's' : ''}`;
  else if (hours > 0) val = `${hours} hour${hours > 1 ? 's' : ''}`;
  else if (minutes > 0) val = `${minutes} minute${minutes > 1 ? 's' : ''}`;
  else val = `${seconds} second${seconds > 1 ? 's' : ''}`;

  if (Math.abs(diffMs) < 1000) return "just now";

  return `${prefix}${val}${suffix}`;
}

export function generateTimestampDetails(input: string): TimestampDetails | null {
  const { unixMs, type } = parseTimestamp(input);
  if (type === 'invalid') return null;

  const d = new Date(unixMs);
  
  return {
    originalInput: input,
    type,
    unixMs,
    unixS: Math.floor(unixMs / 1000),
    utcString: d.toUTCString(),
    localString: d.toString(),
    isoString: d.toISOString(),
    rfc2822: getDeveloperFormats(d).find(f => f.format === 'RFC 2822')?.value || '',
    relative: getRelativeTime(unixMs),
    timezones: formatTimeZones(d),
    formats: getDeveloperFormats(d)
  };
}

export function calculateDifference(unixA: number, unixB: number): DiffResult {
  const diffMs = Math.abs(unixA - unixB);
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const rem1 = diffMs % (1000 * 60 * 60 * 24);
  const hours = Math.floor(rem1 / (1000 * 60 * 60));
  const rem2 = rem1 % (1000 * 60 * 60);
  const minutes = Math.floor(rem2 / (1000 * 60));
  const rem3 = rem2 % (1000 * 60);
  const seconds = Math.floor(rem3 / 1000);

  let parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  
  if (parts.length === 0) parts = ["0 seconds"];

  return { ms: diffMs, days, hours, minutes, seconds, formatted: parts.join(', ') };
}
