import { ForceInputs, ForceResult, HistoryEntry, MassUnit, AccelUnit } from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const MASS_TO_KG: Record<MassUnit, number> = {
  kg: 1,
  g:  0.001,
  lb: 0.453592,
  t:  1000,
};

export const ACCEL_TO_MS2: Record<AccelUnit, number> = {
  "m/s2":  1,
  "ft/s2": 0.3048,
};

export const MASS_LABELS: Record<MassUnit, string> = {
  kg: "Kilogram (kg)",
  g:  "Gram (g)",
  lb: "Pound (lb)",
  t:  "Metric Ton (t)",
};

export const MASS_SHORT: Record<MassUnit, string> = {
  kg: "kg",
  g:  "g",
  lb: "lb",
  t:  "t",
};

export const ACCEL_LABELS: Record<AccelUnit, string> = {
  "m/s2":  "m/s²",
  "ft/s2": "ft/s²",
};

export const ACCEL_SHORT: Record<AccelUnit, string> = {
  "m/s2":  "m/s²",
  "ft/s2": "ft/s²",
};

export const ALL_MASS_UNITS: MassUnit[]  = ["kg", "g", "lb", "t"];
export const ALL_ACCEL_UNITS: AccelUnit[] = ["m/s2", "ft/s2"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateMass(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a mass value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Mass must be a valid number.";
  if (num <= 0) return "Mass must be greater than zero.";
  return null;
}

export function validateAccel(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter an acceleration value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Acceleration must be a valid number.";
  if (num === 0) return "Acceleration is usually non-zero for force calculations.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: ForceInputs): ForceResult | null {
  if (validateMass(inputs.mass) || validateAccel(inputs.accel)) return null;

  const massKg   = parseFloat(inputs.mass)  * MASS_TO_KG[inputs.massUnit];
  const accelMs2 = parseFloat(inputs.accel) * ACCEL_TO_MS2[inputs.accelUnit];
  const forceN   = massKg * accelMs2;

  const formula = `F = m × a = ${formatNum(massKg, 4)} kg × ${formatNum(accelMs2, 4)} m/s² = ${formatNum(forceN, 4)} N`;

  return {
    forceN,
    forceKN:   forceN / 1000,
    forceLbf:  forceN * 0.224809,
    massKg,
    accelMs2,
    formula,
  };
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.001 && value !== 0)) {
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

const HISTORY_KEY = "force-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ForceInputs, result: ForceResult): void {
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

export function exportToText(inputs: ForceInputs, result: ForceResult): string {
  const p = inputs.precision;
  return [
    "Force Calculator – Result",
    "=".repeat(45),
    "",
    `Mass         : ${inputs.mass} ${MASS_SHORT[inputs.massUnit]} (${formatNum(result.massKg, p)} kg)`,
    `Acceleration : ${inputs.accel} ${ACCEL_SHORT[inputs.accelUnit]} (${formatNum(result.accelMs2, p)} m/s²)`,
    "",
    `Force (N)    : ${formatNum(result.forceN, p)} N`,
    `Force (kN)   : ${formatNum(result.forceKN, p)} kN`,
    `Force (lbf)  : ${formatNum(result.forceLbf, p)} lbf`,
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
