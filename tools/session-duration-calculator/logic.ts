// ── Session Duration Calculator Logic ──

export type Mode = "time" | "seconds" | "bulk";

export interface TimeModeInputs {
  hours: number;
  minutes: number;
  seconds: number;
  sessions: number;
}

export interface SecondsModeInputs {
  totalSeconds: number;
  sessions: number;
}

export interface SessionDurationInputs {
  mode: Mode;
  time: TimeModeInputs;
  secondsMode: SecondsModeInputs;
  bulkText: string;
}

export interface DurationParts {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SessionDurationResult {
  totalSeconds: number;
  sessions: number;
  averageSeconds: number;
  averageParts: DurationParts;
  totalParts: DurationParts;
  humanReadableAverage: string;
  hhmmssAverage: string;
  decimalMinutesAverage: number;
  decimalHoursAverage: number;
  humanReadableTotal: string;
  hhmmssTotal: string;
  decimalMinutesTotal: number;
  decimalHoursTotal: number;
  bulkDurations: number[];
  ignoredRows: number;
}

export const DEFAULT_INPUTS: SessionDurationInputs = {
  mode: "time",
  time: { hours: 2, minutes: 0, seconds: 0, sessions: 24 },
  secondsMode: { totalSeconds: 5400, sessions: 18 },
  bulkText: "240\n185\n301\n90",
};

export const PRESETS: { label: string; inputs: Partial<SessionDurationInputs> }[] = [
  { label: "2h / 24 sessions", inputs: { mode: "time", time: { hours: 2, minutes: 0, seconds: 0, sessions: 24 } } },
  { label: "3h45m / 150 sessions", inputs: { mode: "time", time: { hours: 3, minutes: 45, seconds: 0, sessions: 150 } } },
  { label: "15480s / 120 sessions", inputs: { mode: "seconds", secondsMode: { totalSeconds: 15480, sessions: 120 } } },
];

// ── Time conversion helpers ────────────────────────────────────────────────────

export function toSeconds(h: number, m: number, s: number): number {
  return h * 3600 + m * 60 + s;
}

export function secondsToParts(totalSeconds: number): DurationParts {
  const safe = Math.max(0, Math.round(totalSeconds));
  return {
    hours: Math.floor(safe / 3600),
    minutes: Math.floor((safe % 3600) / 60),
    seconds: Math.round(safe % 60),
  };
}

export function formatHHMMSS(totalSeconds: number): string {
  const { hours, minutes, seconds } = secondsToParts(totalSeconds);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function formatHumanReadable(totalSeconds: number): string {
  const { hours, minutes, seconds } = secondsToParts(totalSeconds);
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

// ── Bulk parsing ──────────────────────────────────────────────────────────────

const RE_SESSION_EQUALS = /^session\s*\d+\s*=\s*(\d+(?:\.\d+)?)\s*$/i;
const RE_HHMMSS = /^(\d+):(\d{2}):(\d{2})$/;
const RE_MMSS = /^(\d+):(\d{2})$/;
const RE_PLAIN = /^(\d+(?:\.\d+)?)$/;

export function parseBulkLine(line: string): number | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const eqMatch = trimmed.match(RE_SESSION_EQUALS);
  if (eqMatch) return parseFloat(eqMatch[1]);

  const hhmmss = trimmed.match(RE_HHMMSS);
  if (hhmmss) return parseInt(hhmmss[1], 10) * 3600 + parseInt(hhmmss[2], 10) * 60 + parseInt(hhmmss[3], 10);

  const mmss = trimmed.match(RE_MMSS);
  if (mmss) return parseInt(mmss[1], 10) * 60 + parseInt(mmss[2], 10);

  const plain = trimmed.match(RE_PLAIN);
  if (plain) return parseFloat(plain[1]);

  return null;
}

export function parseBulkText(text: string): { durations: number[]; ignoredRows: number } {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const durations: number[] = [];
  let ignoredRows = 0;
  for (const line of lines) {
    const parsed = parseBulkLine(line);
    if (parsed === null || parsed < 0) ignoredRows++;
    else durations.push(parsed);
  }
  return { durations, ignoredRows };
}

// ── Core calculation ─────────────────────────────────────────────────────────

export function calculateSessionDuration(inputs: SessionDurationInputs): SessionDurationResult | null {
  let totalSeconds = 0;
  let sessions = 0;
  let bulkDurations: number[] = [];
  let ignoredRows = 0;

  if (inputs.mode === "time") {
    totalSeconds = toSeconds(inputs.time.hours, inputs.time.minutes, inputs.time.seconds);
    sessions = inputs.time.sessions;
  } else if (inputs.mode === "seconds") {
    totalSeconds = inputs.secondsMode.totalSeconds;
    sessions = inputs.secondsMode.sessions;
  } else {
    const parsed = parseBulkText(inputs.bulkText);
    bulkDurations = parsed.durations;
    ignoredRows = parsed.ignoredRows;
    totalSeconds = bulkDurations.reduce((sum, d) => sum + d, 0);
    sessions = bulkDurations.length;
  }

  if (sessions <= 0 || totalSeconds < 0) return null;

  const averageSeconds = totalSeconds / sessions;

  return {
    totalSeconds,
    sessions,
    averageSeconds,
    averageParts: secondsToParts(averageSeconds),
    totalParts: secondsToParts(totalSeconds),
    humanReadableAverage: formatHumanReadable(averageSeconds),
    hhmmssAverage: formatHHMMSS(averageSeconds),
    decimalMinutesAverage: parseFloat((averageSeconds / 60).toFixed(2)),
    decimalHoursAverage: parseFloat((averageSeconds / 3600).toFixed(4)),
    humanReadableTotal: formatHumanReadable(totalSeconds),
    hhmmssTotal: formatHHMMSS(totalSeconds),
    decimalMinutesTotal: parseFloat((totalSeconds / 60).toFixed(2)),
    decimalHoursTotal: parseFloat((totalSeconds / 3600).toFixed(4)),
    bulkDurations,
    ignoredRows,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: SessionDurationInputs): ValidationErrors {
  const e: ValidationErrors = {};

  if (inputs.mode === "time") {
    if (inputs.time.hours < 0) e.hours = "Hours cannot be negative.";
    if (inputs.time.minutes < 0) e.minutes = "Minutes cannot be negative.";
    if (inputs.time.seconds < 0) e.seconds = "Seconds cannot be negative.";
    if (!inputs.time.sessions || inputs.time.sessions <= 0) e.sessions = "Number of sessions must be greater than zero.";
    if (toSeconds(inputs.time.hours, inputs.time.minutes, inputs.time.seconds) <= 0) e.hours = e.hours || "Enter total session time.";
  } else if (inputs.mode === "seconds") {
    if (inputs.secondsMode.totalSeconds <= 0) e.totalSeconds = "Enter total session time.";
    if (!inputs.secondsMode.sessions || inputs.secondsMode.sessions <= 0) e.sessions = "Number of sessions must be greater than zero.";
  } else {
    const { durations } = parseBulkText(inputs.bulkText);
    if (durations.length === 0) e.bulkText = "Paste one duration per line.";
  }

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: SessionDurationInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  if (inputs.mode === "time") {
    url.searchParams.set("h", String(inputs.time.hours));
    url.searchParams.set("m", String(inputs.time.minutes));
    url.searchParams.set("s", String(inputs.time.seconds));
    url.searchParams.set("sessions", String(inputs.time.sessions));
  } else if (inputs.mode === "seconds") {
    url.searchParams.set("total", String(inputs.secondsMode.totalSeconds));
    url.searchParams.set("sessions", String(inputs.secondsMode.sessions));
  }
  return url.toString();
}

export function parseShareParams(): Partial<SessionDurationInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode") as Mode | null;
  if (!mode) return null;
  if (mode === "time") {
    return {
      mode,
      time: {
        hours: parseFloat(p.get("h") ?? "0") || 0,
        minutes: parseFloat(p.get("m") ?? "0") || 0,
        seconds: parseFloat(p.get("s") ?? "0") || 0,
        sessions: parseFloat(p.get("sessions") ?? "1") || 1,
      },
    };
  }
  if (mode === "seconds") {
    return {
      mode,
      secondsMode: {
        totalSeconds: parseFloat(p.get("total") ?? "0") || 0,
        sessions: parseFloat(p.get("sessions") ?? "1") || 1,
      },
    };
  }
  return null;
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "session-duration-calculator-inputs";

export function saveInputs(inputs: SessionDurationInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): SessionDurationInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as SessionDurationInputs;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SessionDurationInputs;
  result: SessionDurationResult;
}

const HISTORY_KEY = "session-duration-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: SessionDurationResult): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "Session Duration Calculator Report",
    "===================================",
    `Generated: ${ts}`,
    "",
    `Total Session Time: ${result.humanReadableTotal} (${result.hhmmssTotal})`,
    `Number of Sessions: ${result.sessions}`,
    `Total Seconds: ${Math.round(result.totalSeconds)}`,
    "",
    `Average Session Duration: ${result.humanReadableAverage} (${result.hhmmssAverage})`,
    `Average in Decimal Minutes: ${result.decimalMinutesAverage}`,
    `Average in Decimal Hours: ${result.decimalHoursAverage}`,
    "",
    "Formula: Average Session Duration = Total Session Time ÷ Number of Sessions",
    "",
    "Generated by Session Duration Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildCSVReport(result: SessionDurationResult): string {
  const rows = [
    ["Metric", "Value"],
    ["Total Time", result.hhmmssTotal],
    ["Sessions", String(result.sessions)],
    ["Average Duration", result.hhmmssAverage],
    ["Average (seconds)", String(Math.round(result.averageSeconds))],
    ["Total Seconds", String(Math.round(result.totalSeconds))],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildJSONReport(result: SessionDurationResult): string {
  return JSON.stringify(
    {
      total_seconds: Math.round(result.totalSeconds),
      sessions: result.sessions,
      average_seconds: Math.round(result.averageSeconds * 100) / 100,
      formatted_duration: result.hhmmssAverage,
    },
    null,
    2
  );
}

export function buildPrintHTML(result: SessionDurationResult): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>Session Duration Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Session Duration Calculator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Totals</h2>
    <table>
      <tr><td>Total Session Time</td><td>${result.humanReadableTotal} (${result.hhmmssTotal})</td></tr>
      <tr><td>Number of Sessions</td><td>${result.sessions}</td></tr>
      <tr><td>Total Seconds</td><td>${Math.round(result.totalSeconds)}</td></tr>
    </table>
    <h2>Average</h2>
    <table>
      <tr><td>Average Session Duration</td><td><strong>${result.humanReadableAverage}</strong> (${result.hhmmssAverage})</td></tr>
      <tr><td>Decimal Minutes</td><td>${result.decimalMinutesAverage}</td></tr>
      <tr><td>Decimal Hours</td><td>${result.decimalHoursAverage}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}
