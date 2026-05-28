import { VelocityInputs, VelocityResult, HistoryEntry, DisplacementUnit, TimeUnit } from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const DISPLACEMENT_TO_M: Record<DisplacementUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m:  1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

export const TIME_TO_S: Record<TimeUnit, number> = {
  ms:  0.001,
  s:   1,
  min: 60,
  h:   3600,
};

export const DISPLACEMENT_LABELS: Record<DisplacementUnit, string> = {
  mm: "Millimeters (mm)",
  cm: "Centimeters (cm)",
  m:  "Meters (m)",
  km: "Kilometers (km)",
  in: "Inches (in)",
  ft: "Feet (ft)",
  yd: "Yards (yd)",
  mi: "Miles (mi)",
};

export const DISPLACEMENT_SHORT: Record<DisplacementUnit, string> = {
  mm: "mm",
  cm: "cm",
  m:  "m",
  km: "km",
  in: "in",
  ft: "ft",
  yd: "yd",
  mi: "mi",
};

export const TIME_LABELS: Record<TimeUnit, string> = {
  ms:  "Milliseconds (ms)",
  s:   "Seconds (s)",
  min: "Minutes (min)",
  h:   "Hours (h)",
};

export const TIME_SHORT: Record<TimeUnit, string> = {
  ms:  "ms",
  s:   "s",
  min: "min",
  h:   "h",
};

export const ALL_DISPLACEMENT_UNITS: DisplacementUnit[] = ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"];
export const ALL_TIME_UNITS: TimeUnit[] = ["ms", "s", "min", "h"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateDisplacement(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a displacement value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  return null;
}

export function validateTime(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a time value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num === 0) return "Time cannot be zero.";
  if (num < 0) return "Time must be a positive value.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: VelocityInputs): VelocityResult | null {
  if (validateDisplacement(inputs.displacement) || validateTime(inputs.time)) return null;

  const displacementM = parseFloat(inputs.displacement) * DISPLACEMENT_TO_M[inputs.displacementUnit];
  const timeS         = parseFloat(inputs.time) * TIME_TO_S[inputs.timeUnit];

  const velocityMs = displacementM / timeS;

  const velocityKmh   = velocityMs * 3.6;
  const velocityMph   = velocityMs * 2.23694;
  const velocityFts   = velocityMs * 3.28084;
  const velocityKnots = velocityMs * 1.94384;

  const dLabel = `${inputs.displacement} ${DISPLACEMENT_SHORT[inputs.displacementUnit]}`;
  const tLabel = `${inputs.time} ${TIME_SHORT[inputs.timeUnit]}`;

  const formula = `v = d ÷ t = ${dLabel} ÷ ${tLabel}`;

  const steps = [
    `Step 1: Convert displacement to meters`,
    `  ${inputs.displacement} ${DISPLACEMENT_SHORT[inputs.displacementUnit]} × ${DISPLACEMENT_TO_M[inputs.displacementUnit]} = ${formatNum(displacementM, 4)} m`,
    ``,
    `Step 2: Convert time to seconds`,
    `  ${inputs.time} ${TIME_SHORT[inputs.timeUnit]} × ${TIME_TO_S[inputs.timeUnit]} = ${formatNum(timeS, 4)} s`,
    ``,
    `Step 3: Apply velocity formula`,
    `  v = d ÷ t`,
    `  v = ${formatNum(displacementM, 4)} m ÷ ${formatNum(timeS, 4)} s`,
    `  v = ${formatNum(velocityMs, 4)} m/s`,
  ];

  return {
    velocityMs,
    velocityKmh,
    velocityMph,
    velocityFts,
    velocityKnots,
    displacementM,
    timeS,
    formula,
    steps,
  };
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.0001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "velocity-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: VelocityInputs, result: VelocityResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: VelocityInputs, result: VelocityResult): string {
  const p = inputs.precision;
  return [
    "Velocity Calculator – Result",
    "=".repeat(45),
    "",
    `Displacement : ${inputs.displacement} ${DISPLACEMENT_SHORT[inputs.displacementUnit]} (${formatNum(result.displacementM, p)} m)`,
    `Time         : ${inputs.time} ${TIME_SHORT[inputs.timeUnit]} (${formatNum(result.timeS, p)} s)`,
    "",
    `Velocity (m/s)   : ${formatNum(result.velocityMs, p)} m/s`,
    `Velocity (km/h)  : ${formatNum(result.velocityKmh, p)} km/h`,
    `Velocity (mph)   : ${formatNum(result.velocityMph, p)} mph`,
    `Velocity (ft/s)  : ${formatNum(result.velocityFts, p)} ft/s`,
    `Velocity (knots) : ${formatNum(result.velocityKnots, p)} kn`,
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
