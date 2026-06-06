import {
  AccelerationInputs,
  AccelerationResult,
  HistoryEntry,
  VelocityUnit,
  TimeUnit,
} from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "km/h": 1 / 3.6,
  "mph":  0.44704,
  "ft/s": 0.3048,
};

export const TIME_TO_S: Record<TimeUnit, number> = {
  s:   1,
  min: 60,
  h:   3600,
};

export const VELOCITY_LABELS: Record<VelocityUnit, string> = {
  "m/s":  "Meters per second (m/s)",
  "km/h": "Kilometers per hour (km/h)",
  "mph":  "Miles per hour (mph)",
  "ft/s": "Feet per second (ft/s)",
};

export const TIME_LABELS: Record<TimeUnit, string> = {
  s:   "Seconds (s)",
  min: "Minutes (min)",
  h:   "Hours (h)",
};

export const ALL_VELOCITY_UNITS: VelocityUnit[] = ["m/s", "km/h", "mph", "ft/s"];
export const ALL_TIME_UNITS: TimeUnit[] = ["s", "min", "h"];

// ── Acceleration unit label based on velocity/time units ──────────────────

export function getAccelUnit(vu: VelocityUnit, tu: TimeUnit): string {
  return `${vu}/${tu}`;
}

// ── Validation ─────────────────────────────────────────────────────────────

export function validateVelocity(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Please enter ${label}.`;
  const num = parseFloat(value.replace(",", "."));
  if (isNaN(num)) return "Please enter a valid number.";
  return null;
}

export function validateTime(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a time value.";
  const num = parseFloat(value.replace(",", "."));
  if (isNaN(num)) return "Please enter a valid number.";
  if (num === 0) return "Time cannot be zero.";
  if (num < 0) return "Time must be a positive value.";
  return null;
}

export function validateAcceleration(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter an acceleration value.";
  const num = parseFloat(value.replace(",", "."));
  if (isNaN(num)) return "Please enter a valid number.";
  return null;
}

function parseVal(v: string): number {
  return parseFloat(v.replace(",", "."));
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: AccelerationInputs): AccelerationResult | null {
  const { mode, velocityUnit, timeUnit, precision } = inputs;
  const vFactor = VELOCITY_TO_MS[velocityUnit];
  const tFactor = TIME_TO_S[timeUnit];
  const accelUnit = getAccelUnit(velocityUnit, timeUnit);

  let v1Ms = 0, v2Ms = 0, tS = 0, aMs2 = 0;
  let resultValue = 0;
  let formula = "";
  const steps: string[] = [];

  if (mode === "acceleration") {
    const v1 = parseVal(inputs.initialVelocity);
    const v2 = parseVal(inputs.finalVelocity);
    const t  = parseVal(inputs.time);
    v1Ms = v1 * vFactor;
    v2Ms = v2 * vFactor;
    tS   = t * tFactor;
    aMs2 = (v2Ms - v1Ms) / tS;
    // Convert back to selected units
    const aInUnit = (v2 - v1) / t;
    resultValue = aInUnit;
    formula = `a = (v₂ − v₁) / t`;
    steps.push(
      `Step 1: Identify values`,
      `  v₁ = ${inputs.initialVelocity} ${velocityUnit}`,
      `  v₂ = ${inputs.finalVelocity} ${velocityUnit}`,
      `  t  = ${inputs.time} ${timeUnit}`,
      ``,
      `Step 2: Apply formula`,
      `  a = (v₂ − v₁) / t`,
      `  a = (${inputs.finalVelocity} − ${inputs.initialVelocity}) / ${inputs.time}`,
      `  a = ${formatNum(v2 - v1, precision)} / ${inputs.time}`,
      `  a = ${formatNum(aInUnit, precision)} ${accelUnit}`,
    );
  } else if (mode === "finalVelocity") {
    const v1 = parseVal(inputs.initialVelocity);
    const a  = parseVal(inputs.acceleration);
    const t  = parseVal(inputs.time);
    v1Ms = v1 * vFactor;
    tS   = t * tFactor;
    aMs2 = a * vFactor / tFactor;
    const v2InUnit = v1 + a * t;
    v2Ms = v2InUnit * vFactor;
    resultValue = v2InUnit;
    formula = `v₂ = v₁ + a × t`;
    steps.push(
      `Step 1: Identify values`,
      `  v₁ = ${inputs.initialVelocity} ${velocityUnit}`,
      `  a  = ${inputs.acceleration} ${accelUnit}`,
      `  t  = ${inputs.time} ${timeUnit}`,
      ``,
      `Step 2: Apply formula`,
      `  v₂ = v₁ + a × t`,
      `  v₂ = ${inputs.initialVelocity} + ${inputs.acceleration} × ${inputs.time}`,
      `  v₂ = ${formatNum(v1, precision)} + ${formatNum(a * t, precision)}`,
      `  v₂ = ${formatNum(v2InUnit, precision)} ${velocityUnit}`,
    );
  } else if (mode === "initialVelocity") {
    const v2 = parseVal(inputs.finalVelocity);
    const a  = parseVal(inputs.acceleration);
    const t  = parseVal(inputs.time);
    v2Ms = v2 * vFactor;
    tS   = t * tFactor;
    aMs2 = a * vFactor / tFactor;
    const v1InUnit = v2 - a * t;
    v1Ms = v1InUnit * vFactor;
    resultValue = v1InUnit;
    formula = `v₁ = v₂ − a × t`;
    steps.push(
      `Step 1: Identify values`,
      `  v₂ = ${inputs.finalVelocity} ${velocityUnit}`,
      `  a  = ${inputs.acceleration} ${accelUnit}`,
      `  t  = ${inputs.time} ${timeUnit}`,
      ``,
      `Step 2: Apply formula`,
      `  v₁ = v₂ − a × t`,
      `  v₁ = ${inputs.finalVelocity} − ${inputs.acceleration} × ${inputs.time}`,
      `  v₁ = ${formatNum(v2, precision)} − ${formatNum(parseVal(inputs.acceleration) * t, precision)}`,
      `  v₁ = ${formatNum(v1InUnit, precision)} ${velocityUnit}`,
    );
  } else {
    // mode === "time"
    const v1 = parseVal(inputs.initialVelocity);
    const v2 = parseVal(inputs.finalVelocity);
    const a  = parseVal(inputs.acceleration);
    v1Ms = v1 * vFactor;
    v2Ms = v2 * vFactor;
    aMs2 = a * vFactor / tFactor;
    const tInUnit = (v2 - v1) / a;
    tS = tInUnit * tFactor;
    resultValue = tInUnit;
    formula = `t = (v₂ − v₁) / a`;
    steps.push(
      `Step 1: Identify values`,
      `  v₁ = ${inputs.initialVelocity} ${velocityUnit}`,
      `  v₂ = ${inputs.finalVelocity} ${velocityUnit}`,
      `  a  = ${inputs.acceleration} ${accelUnit}`,
      ``,
      `Step 2: Apply formula`,
      `  t = (v₂ − v₁) / a`,
      `  t = (${inputs.finalVelocity} − ${inputs.initialVelocity}) / ${inputs.acceleration}`,
      `  t = ${formatNum(v2 - v1, precision)} / ${inputs.acceleration}`,
      `  t = ${formatNum(tInUnit, precision)} ${timeUnit}`,
    );
  }

  const deltaV = v2Ms - v1Ms;
  const isDeceleration = mode === "acceleration" ? resultValue < 0 : aMs2 < 0;

  let unit: string;
  if (mode === "acceleration") unit = accelUnit;
  else if (mode === "finalVelocity" || mode === "initialVelocity") unit = velocityUnit;
  else unit = timeUnit;

  return {
    value: resultValue,
    unit,
    deltaV,
    isDeceleration,
    formula,
    steps,
    initialVelocityMs: v1Ms,
    finalVelocityMs: v2Ms,
    timeS: tS,
    accelerationMs2: aMs2,
  };
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (Math.abs(value) >= 1e9 || (Math.abs(value) < 0.0001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "acceleration-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: AccelerationInputs, result: AccelerationResult): void {
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

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: AccelerationInputs, result: AccelerationResult): string {
  const p = inputs.precision;
  const accelUnit = getAccelUnit(inputs.velocityUnit, inputs.timeUnit);
  return [
    "Acceleration Calculator – Result",
    "=".repeat(45),
    "",
    `Mode         : ${inputs.mode}`,
    `Velocity Unit: ${inputs.velocityUnit}`,
    `Time Unit    : ${inputs.timeUnit}`,
    "",
    `Initial Velocity : ${inputs.initialVelocity} ${inputs.velocityUnit}`,
    `Final Velocity   : ${inputs.finalVelocity} ${inputs.velocityUnit}`,
    `Time             : ${inputs.time} ${inputs.timeUnit}`,
    `Acceleration     : ${inputs.acceleration} ${accelUnit}`,
    "",
    `Result: ${formatNum(result.value, p)} ${result.unit}`,
    `Formula: ${result.formula}`,
    "",
    "Step-by-Step:",
    ...result.steps,
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
