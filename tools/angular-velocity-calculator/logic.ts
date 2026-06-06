import {
  AngularVelocityInputs,
  AngularVelocityResult,
  HistoryEntry,
  AngleUnit,
  TimeUnit,
  LinearVelocityUnit,
  RadiusUnit,
  FrequencyUnit,
  PeriodUnit,
  ResultUnit,
} from "./types";

// ── Unit conversion maps ────────────────────────────────────────────────────

export const ANGLE_TO_RAD: Record<AngleUnit, number> = {
  deg: Math.PI / 180,
  rad: 1,
  rev: 2 * Math.PI,
};

export const TIME_TO_S: Record<TimeUnit, number> = {
  s:   1,
  min: 60,
  h:   3600,
};

export const VELOCITY_TO_MS: Record<LinearVelocityUnit, number> = {
  ms:  1,
  kmh: 1 / 3.6,
  fts: 0.3048,
  mph: 0.44704,
};

export const RADIUS_TO_M: Record<RadiusUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m:  1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
};

export const FREQUENCY_TO_HZ: Record<FrequencyUnit, number> = {
  Hz:  1,
  kHz: 1000,
  MHz: 1_000_000,
};

export const PERIOD_TO_S: Record<PeriodUnit, number> = {
  ms:  0.001,
  s:   1,
  min: 60,
};

// ── Label maps ──────────────────────────────────────────────────────────────

export const ANGLE_LABELS: Record<AngleUnit, string> = {
  deg: "Degrees (°)",
  rad: "Radians (rad)",
  rev: "Revolutions (rev)",
};

export const TIME_LABELS: Record<TimeUnit, string> = {
  s:   "Seconds (s)",
  min: "Minutes (min)",
  h:   "Hours (h)",
};

export const VELOCITY_LABELS: Record<LinearVelocityUnit, string> = {
  ms:  "m/s",
  kmh: "km/h",
  fts: "ft/s",
  mph: "mph",
};

export const RADIUS_LABELS: Record<RadiusUnit, string> = {
  mm: "mm",
  cm: "cm",
  m:  "m",
  km: "km",
  in: "inch",
  ft: "ft",
};

export const FREQUENCY_LABELS: Record<FrequencyUnit, string> = {
  Hz:  "Hz",
  kHz: "kHz",
  MHz: "MHz",
};

export const PERIOD_LABELS: Record<PeriodUnit, string> = {
  ms:  "Milliseconds (ms)",
  s:   "Seconds (s)",
  min: "Minutes (min)",
};

export const RESULT_UNIT_LABELS: Record<ResultUnit, string> = {
  "rad/s": "rad/s",
  "deg/s": "deg/s",
  "rev/s": "rev/s",
  "rpm":   "RPM",
};

export const MODE_LABELS: Record<string, string> = {
  displacement: "Angular Displacement + Time",
  linear:       "Linear Velocity + Radius",
  rpm:          "RPM Conversion",
  frequency:    "Frequency Conversion",
  period:       "Period Conversion",
};

export const ALL_ANGLE_UNITS: AngleUnit[]           = ["deg", "rad", "rev"];
export const ALL_TIME_UNITS: TimeUnit[]             = ["s", "min", "h"];
export const ALL_VELOCITY_UNITS: LinearVelocityUnit[] = ["ms", "kmh", "fts", "mph"];
export const ALL_RADIUS_UNITS: RadiusUnit[]         = ["mm", "cm", "m", "km", "in", "ft"];
export const ALL_FREQUENCY_UNITS: FrequencyUnit[]   = ["Hz", "kHz", "MHz"];
export const ALL_PERIOD_UNITS: PeriodUnit[]         = ["ms", "s", "min"];
export const ALL_RESULT_UNITS: ResultUnit[]         = ["rad/s", "deg/s", "rev/s", "rpm"];

// ── Validation ──────────────────────────────────────────────────────────────

export function validatePositive(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Enter a ${label} value.`;
  const n = parseFloat(value);
  if (isNaN(n)) return `${label} must be a number.`;
  if (n <= 0)   return `${label} must be greater than zero.`;
  return null;
}

export function validateNonNegative(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Enter a ${label} value.`;
  const n = parseFloat(value);
  if (isNaN(n)) return `${label} must be a number.`;
  if (n < 0)    return `${label} cannot be negative.`;
  return null;
}

export function validateInputs(inputs: AngularVelocityInputs): Record<string, string | null> {
  const errs: Record<string, string | null> = {};
  switch (inputs.mode) {
    case "displacement":
      errs.theta = validateNonNegative(inputs.theta, "Angular displacement");
      errs.time  = validatePositive(inputs.time, "Time");
      break;
    case "linear":
      errs.velocity = validateNonNegative(inputs.velocity, "Linear velocity");
      errs.radius   = validatePositive(inputs.radius, "Radius");
      break;
    case "rpm":
      errs.rpm = validateNonNegative(inputs.rpm, "RPM");
      break;
    case "frequency":
      errs.frequency = validateNonNegative(inputs.frequency, "Frequency");
      break;
    case "period":
      errs.period = validatePositive(inputs.period, "Period");
      break;
  }
  return errs;
}

// ── Core calculation ────────────────────────────────────────────────────────

export function calculate(inputs: AngularVelocityInputs): AngularVelocityResult | null {
  const errs = validateInputs(inputs);
  if (Object.values(errs).some(Boolean)) return null;

  let radPerS = 0;
  let formula = "";
  const steps: string[] = [];

  switch (inputs.mode) {
    case "displacement": {
      const thetaRaw = parseFloat(inputs.theta);
      const timeRaw  = parseFloat(inputs.time);
      const thetaRad = thetaRaw * ANGLE_TO_RAD[inputs.thetaUnit];
      const timeS    = timeRaw  * TIME_TO_S[inputs.timeUnit];
      radPerS = thetaRad / timeS;
      formula = `ω = θ / t = ${formatNum(thetaRad, 4)} rad / ${formatNum(timeS, 4)} s`;
      steps.push(`Step 1: Convert θ → ${formatNum(thetaRad, 6)} rad`);
      steps.push(`Step 2: Convert t → ${formatNum(timeS, 4)} s`);
      steps.push(`Step 3: ω = ${formatNum(thetaRad, 6)} / ${formatNum(timeS, 4)} = ${formatNum(radPerS, 6)} rad/s`);
      break;
    }
    case "linear": {
      const vRaw  = parseFloat(inputs.velocity);
      const rRaw  = parseFloat(inputs.radius);
      const vMs   = vRaw * VELOCITY_TO_MS[inputs.velocityUnit];
      const rM    = rRaw * RADIUS_TO_M[inputs.radiusUnit];
      radPerS = vMs / rM;
      formula = `ω = v / r = ${formatNum(vMs, 4)} m/s / ${formatNum(rM, 4)} m`;
      steps.push(`Step 1: Convert v → ${formatNum(vMs, 6)} m/s`);
      steps.push(`Step 2: Convert r → ${formatNum(rM, 6)} m`);
      steps.push(`Step 3: ω = ${formatNum(vMs, 6)} / ${formatNum(rM, 6)} = ${formatNum(radPerS, 6)} rad/s`);
      break;
    }
    case "rpm": {
      const rpmVal = parseFloat(inputs.rpm);
      radPerS = (2 * Math.PI * rpmVal) / 60;
      formula = `ω = (2π × RPM) / 60 = (2π × ${rpmVal}) / 60`;
      steps.push(`Step 1: ω = 2 × π × ${rpmVal} / 60`);
      steps.push(`Step 2: ω = ${formatNum(2 * Math.PI * rpmVal, 6)} / 60`);
      steps.push(`Step 3: ω = ${formatNum(radPerS, 6)} rad/s`);
      break;
    }
    case "frequency": {
      const fRaw = parseFloat(inputs.frequency);
      const fHz  = fRaw * FREQUENCY_TO_HZ[inputs.frequencyUnit];
      radPerS = 2 * Math.PI * fHz;
      formula = `ω = 2πf = 2π × ${formatNum(fHz, 4)} Hz`;
      steps.push(`Step 1: Convert f → ${formatNum(fHz, 6)} Hz`);
      steps.push(`Step 2: ω = 2 × π × ${formatNum(fHz, 6)}`);
      steps.push(`Step 3: ω = ${formatNum(radPerS, 6)} rad/s`);
      break;
    }
    case "period": {
      const tRaw = parseFloat(inputs.period);
      const tS   = tRaw * PERIOD_TO_S[inputs.periodUnit];
      radPerS = (2 * Math.PI) / tS;
      formula = `ω = 2π / T = 2π / ${formatNum(tS, 4)} s`;
      steps.push(`Step 1: Convert T → ${formatNum(tS, 6)} s`);
      steps.push(`Step 2: ω = 2 × π / ${formatNum(tS, 6)}`);
      steps.push(`Step 3: ω = ${formatNum(radPerS, 6)} rad/s`);
      break;
    }
  }

  return {
    radPerS,
    degPerS: radPerS * (180 / Math.PI),
    revPerS: radPerS / (2 * Math.PI),
    rpm:     (radPerS * 60) / (2 * Math.PI),
    formula,
    steps,
  };
}

// ── Primary display value ────────────────────────────────────────────────────

export function getPrimaryValue(result: AngularVelocityResult, unit: ResultUnit): number {
  switch (unit) {
    case "rad/s": return result.radPerS;
    case "deg/s": return result.degPerS;
    case "rev/s": return result.revPerS;
    case "rpm":   return result.rpm;
  }
}

// ── Formatting ───────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (!isFinite(value)) return "—";
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.0001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ── Debounce ─────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ─────────────────────────────────────────────────────

const HISTORY_KEY = "angular-velocity-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: AngularVelocityInputs, result: AngularVelocityResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ───────────────────────────────────────────────────────────────────

export function exportToText(inputs: AngularVelocityInputs, result: AngularVelocityResult): string {
  const p = inputs.precision;
  return [
    "Angular Velocity Calculator – Result",
    "=".repeat(45),
    "",
    `Method  : ${MODE_LABELS[inputs.mode]}`,
    "",
    ...result.steps,
    "",
    `ω (rad/s) : ${formatNum(result.radPerS, p)}`,
    `ω (deg/s) : ${formatNum(result.degPerS, p)}`,
    `ω (rev/s) : ${formatNum(result.revPerS, p)}`,
    `ω (RPM)   : ${formatNum(result.rpm, p)}`,
    "",
    `Formula: ${result.formula}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
