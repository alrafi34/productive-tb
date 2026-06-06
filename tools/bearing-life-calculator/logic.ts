import { BearingInputs, BearingResult, HistoryEntry, LoadUnit } from "./types";

// ── Reliability factors (ISO 281 a1 factor) ───────────────────────────────
export const RELIABILITY_FACTORS: Record<string, number> = {
  "90": 1.00,
  "95": 0.64,
  "96": 0.55,
  "97": 0.47,
  "98": 0.37,
  "99": 0.25,
};

export const RELIABILITY_LABELS: Record<string, string> = {
  "90": "90% Reliability (L10 Standard)",
  "95": "95% Reliability",
  "96": "96% Reliability",
  "97": "97% Reliability",
  "98": "98% Reliability",
  "99": "99% Reliability",
};

// ── Unit conversions to kN ─────────────────────────────────────────────────
export function toKN(value: number, unit: LoadUnit): number {
  switch (unit) {
    case "kN":  return value;
    case "N":   return value / 1000;
    case "lbf": return value * 0.00444822;
  }
}

export function fromKN(valueKN: number, unit: LoadUnit): number {
  switch (unit) {
    case "kN":  return valueKN;
    case "N":   return valueKN * 1000;
    case "lbf": return valueKN / 0.00444822;
  }
}

export const LOAD_LABELS: Record<LoadUnit, string> = {
  kN: "Kilonewton (kN)",
  N: "Newton (N)",
  lbf: "Pound-force (lbf)",
};

export const LOAD_SHORT: Record<LoadUnit, string> = {
  kN: "kN",
  N: "N",
  lbf: "lbf",
};

export const ALL_LOAD_UNITS: LoadUnit[] = ["kN", "N", "lbf"];

// ── Main calculation ───────────────────────────────────────────────────────
export function calculate(inputs: BearingInputs): BearingResult {
  const C_raw = parseFloat(inputs.dynamicLoadRating);
  const P_raw = parseFloat(inputs.equivalentLoad);
  const rpm   = parseFloat(inputs.rpm);
  const hoursPerDay = parseFloat(inputs.hoursPerDay) || 8;

  const C_kN = toKN(C_raw, inputs.loadUnit);
  const P_kN = toKN(P_raw, inputs.loadUnit);
  const ratio = C_kN / (P_kN * inputs.serviceFactor);

  const exponent = inputs.bearingType === "ball" ? 3 : 10 / 3;

  // L10 in revolutions
  const lifeRevolutions = Math.pow(ratio, exponent) * 1_000_000;
  const lifeMillionRevolutions = lifeRevolutions / 1_000_000;

  // L10 in hours
  const lifeHours = lifeRevolutions / (60 * rpm);
  const lifeYears = lifeHours / (hoursPerDay * 365);

  // Reliability-adjusted life
  const a1 = RELIABILITY_FACTORS[inputs.reliability] ?? 1;
  const adjustedRevolutions = lifeRevolutions * a1;
  const adjustedHours = lifeHours * a1;
  const adjustedYears = lifeYears * a1;

  // Health
  let healthLabel: BearingResult["healthLabel"];
  let healthColor: BearingResult["healthColor"];
  if (adjustedHours >= 20000) {
    healthLabel = "Excellent Life";
    healthColor = "green";
  } else if (adjustedHours >= 8000) {
    healthLabel = "Moderate Life";
    healthColor = "yellow";
  } else if (adjustedHours >= 2000) {
    healthLabel = "Short Life";
    healthColor = "orange";
  } else {
    healthLabel = "High Failure Risk";
    healthColor = "red";
  }

  return {
    lifeRevolutions,
    lifeMillionRevolutions,
    lifeHours,
    lifeYears,
    adjustedRevolutions,
    adjustedHours,
    adjustedYears,
    reliabilityFactor: a1,
    healthLabel,
    healthColor,
    C_kN,
    P_kN,
    ratio,
  };
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validateLoad(val: string, label: string): string | null {
  const n = parseFloat(val);
  if (!val || isNaN(n)) return `${label} is required.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

export function validateRPM(val: string): string | null {
  const n = parseFloat(val);
  if (!val || isNaN(n)) return "RPM is required.";
  if (n <= 0) return "RPM must be greater than zero.";
  if (n > 100000) return "RPM value seems unrealistically high.";
  return null;
}

export function validateHours(val: string): string | null {
  const n = parseFloat(val);
  if (!val || isNaN(n)) return null; // optional-ish
  if (n <= 0 || n > 24) return "Hours per day must be between 1 and 24.";
  return null;
}

export function warnHighLoad(C_kN: number, P_kN: number, sf: number): string | null {
  const ratio = C_kN / (P_kN * sf);
  if (ratio < 1.2) return "⚠ Applied load is extremely high relative to bearing capacity. Bearing life will be very short.";
  if (ratio > 20) return "ℹ Very low load relative to bearing capacity. Bearing life will be extremely long.";
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(n: number, precision: number): string {
  if (!isFinite(n)) return "—";
  if (n >= 1e9)  return (n / 1e9).toFixed(precision) + "B";
  if (n >= 1e6)  return (n / 1e6).toFixed(precision) + "M";
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: precision });
  return n.toFixed(precision);
}

export function formatRevs(n: number): string {
  if (!isFinite(n)) return "—";
  const m = n / 1_000_000;
  if (m >= 1000) return m.toLocaleString("en-US", { maximumFractionDigits: 1 }) + " million";
  if (m >= 1)    return m.toFixed(2) + " million";
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// ── Debounce ───────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  } as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────
const LS_KEY = "bearing-life-calculator-history";

export function saveToHistory(inputs: BearingInputs, result: BearingResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    localStorage.setItem(LS_KEY, JSON.stringify(history.slice(0, 20)));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
}

// ── Export ─────────────────────────────────────────────────────────────────
export function exportToText(inputs: BearingInputs, result: BearingResult): string {
  return `Bearing Life Calculator – Results
==========================================
Bearing Type:         ${inputs.bearingType === "ball" ? "Ball Bearing" : "Roller Bearing"}
Dynamic Load Rating:  ${inputs.dynamicLoadRating} ${LOAD_SHORT[inputs.loadUnit]}
Equivalent Load:      ${inputs.equivalentLoad} ${LOAD_SHORT[inputs.loadUnit]}
Speed:                ${inputs.rpm} RPM
Reliability:          ${inputs.reliability}%
Service Factor:       ${inputs.serviceFactor}
C/P Ratio:            ${result.ratio.toFixed(4)}

L10 Life (Revolutions):   ${result.lifeRevolutions.toLocaleString("en-US", { maximumFractionDigits: 0 })}
L10 Life (Million Rev):   ${result.lifeMillionRevolutions.toFixed(2)}
L10 Life (Hours):         ${result.lifeHours.toFixed(2)}
L10 Life (Years):         ${result.lifeYears.toFixed(4)} (at ${inputs.hoursPerDay} h/day)

Adjusted Life (Hours):    ${result.adjustedHours.toFixed(2)} (at ${inputs.reliability}% reliability)
Health Status:            ${result.healthLabel}

Calculated: ${new Date().toLocaleString()}
`;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
