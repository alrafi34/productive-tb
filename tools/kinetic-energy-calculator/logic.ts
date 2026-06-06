import { KEInputs, KEResult, HistoryEntry, MassUnit, VelocityUnit } from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const MASS_TO_KG: Record<MassUnit, number> = {
  kg: 1,
  g:  0.001,
  lb: 0.453592,
  t:  1000,
};

export const VEL_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "km/h": 1 / 3.6,
  "mph":  0.44704,
  "ft/s": 0.3048,
};

export const MASS_LABELS: Record<MassUnit, string> = {
  kg: "Kilograms (kg)",
  g:  "Grams (g)",
  lb: "Pounds (lb)",
  t:  "Metric Tons (t)",
};

export const MASS_SHORT: Record<MassUnit, string> = {
  kg: "kg",
  g:  "g",
  lb: "lb",
  t:  "t",
};

export const VEL_LABELS: Record<VelocityUnit, string> = {
  "m/s":  "Meters per second (m/s)",
  "km/h": "Kilometers per hour (km/h)",
  "mph":  "Miles per hour (mph)",
  "ft/s": "Feet per second (ft/s)",
};

export const VEL_SHORT: Record<VelocityUnit, string> = {
  "m/s":  "m/s",
  "km/h": "km/h",
  "mph":  "mph",
  "ft/s": "ft/s",
};

export const ALL_MASS_UNITS: MassUnit[]     = ["kg", "g", "lb", "t"];
export const ALL_VEL_UNITS: VelocityUnit[]  = ["m/s", "km/h", "mph", "ft/s"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateMass(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a mass value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Mass must be a valid number.";
  if (num <= 0)   return "Mass must be greater than zero.";
  return null;
}

export function validateVelocity(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a velocity value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Velocity must be a valid number.";
  if (num <= 0)   return "Velocity must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: KEInputs): KEResult | null {
  if (validateMass(inputs.mass) || validateVelocity(inputs.velocity)) return null;

  const massKg = parseFloat(inputs.mass)     * MASS_TO_KG[inputs.massUnit];
  const velMs  = parseFloat(inputs.velocity) * VEL_TO_MS[inputs.velocityUnit];
  const keJ    = 0.5 * massKg * velMs * velMs;

  const formula = `KE = ½ × ${formatNum(massKg, 4)} kg × (${formatNum(velMs, 4)} m/s)² = ${formatNum(keJ, 4)} J`;

  return {
    keJ,
    keKJ:      keJ / 1000,
    keMJ:      keJ / 1_000_000,
    keCalorie: keJ / 4.184,
    keKWh:     keJ / 3_600_000,
    massKg,
    velMs,
    formula,
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

const HISTORY_KEY = "kinetic-energy-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: KEInputs, result: KEResult): void {
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

export function exportToText(inputs: KEInputs, result: KEResult): string {
  const p = inputs.precision;
  return [
    "Kinetic Energy Calculator – Result",
    "=".repeat(45),
    "",
    `Mass         : ${inputs.mass} ${MASS_SHORT[inputs.massUnit]} (${formatNum(result.massKg, p)} kg)`,
    `Velocity     : ${inputs.velocity} ${VEL_SHORT[inputs.velocityUnit]} (${formatNum(result.velMs, p)} m/s)`,
    "",
    `KE (Joules)  : ${formatNum(result.keJ, p)} J`,
    `KE (kJ)      : ${formatNum(result.keKJ, p)} kJ`,
    `KE (MJ)      : ${formatNum(result.keMJ, p)} MJ`,
    `KE (Cal)     : ${formatNum(result.keCalorie, p)} cal`,
    `KE (kWh)     : ${formatNum(result.keKWh, p)} kWh`,
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
