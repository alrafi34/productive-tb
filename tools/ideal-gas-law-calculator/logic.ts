import {
  GasInputs,
  GasResult,
  HistoryEntry,
  PressureUnit,
  VolumeUnit,
  TemperatureUnit,
} from "./types";

// ── Gas constant ─────────────────────────────────────────────────────────────
export const R_SI = 8.314472; // J/(mol·K) = Pa·m³/(mol·K)

// ── Unit labels ───────────────────────────────────────────────────────────────
export const PRESSURE_LABELS: Record<PressureUnit, string> = {
  Pa: "Pascal (Pa)",
  kPa: "Kilopascal (kPa)",
  bar: "Bar",
  atm: "Atmosphere (atm)",
  psi: "PSI (lb/in²)",
  mmHg: "mmHg (Torr)",
};

export const VOLUME_LABELS: Record<VolumeUnit, string> = {
  m3: "Cubic Meter (m³)",
  L: "Liter (L)",
  mL: "Milliliter (mL)",
  ft3: "Cubic Foot (ft³)",
};

export const TEMPERATURE_LABELS: Record<TemperatureUnit, string> = {
  K: "Kelvin (K)",
  C: "Celsius (°C)",
  F: "Fahrenheit (°F)",
};

export const ALL_PRESSURE_UNITS: PressureUnit[] = ["Pa", "kPa", "bar", "atm", "psi", "mmHg"];
export const ALL_VOLUME_UNITS: VolumeUnit[] = ["m3", "L", "mL", "ft3"];
export const ALL_TEMPERATURE_UNITS: TemperatureUnit[] = ["K", "C", "F"];

// ── Unit conversion to SI ─────────────────────────────────────────────────────
export function pressureToSI(value: number, unit: PressureUnit): number {
  switch (unit) {
    case "Pa":   return value;
    case "kPa":  return value * 1000;
    case "bar":  return value * 100000;
    case "atm":  return value * 101325;
    case "psi":  return value * 6894.757;
    case "mmHg": return value * 133.322;
  }
}

export function pressureFromSI(value: number, unit: PressureUnit): number {
  switch (unit) {
    case "Pa":   return value;
    case "kPa":  return value / 1000;
    case "bar":  return value / 100000;
    case "atm":  return value / 101325;
    case "psi":  return value / 6894.757;
    case "mmHg": return value / 133.322;
  }
}

export function volumeToSI(value: number, unit: VolumeUnit): number {
  switch (unit) {
    case "m3":  return value;
    case "L":   return value * 0.001;
    case "mL":  return value * 0.000001;
    case "ft3": return value * 0.0283168;
  }
}

export function volumeFromSI(value: number, unit: VolumeUnit): number {
  switch (unit) {
    case "m3":  return value;
    case "L":   return value / 0.001;
    case "mL":  return value / 0.000001;
    case "ft3": return value / 0.0283168;
  }
}

export function temperatureToK(value: number, unit: TemperatureUnit): number {
  switch (unit) {
    case "K": return value;
    case "C": return value + 273.15;
    case "F": return (value - 32) * (5 / 9) + 273.15;
  }
}

export function temperatureFromK(value: number, unit: TemperatureUnit): number {
  switch (unit) {
    case "K": return value;
    case "C": return value - 273.15;
    case "F": return (value - 273.15) * (9 / 5) + 32;
  }
}

// ── Pressure unit short labels ────────────────────────────────────────────────
export const PRESSURE_SHORT: Record<PressureUnit, string> = {
  Pa: "Pa", kPa: "kPa", bar: "bar", atm: "atm", psi: "psi", mmHg: "mmHg",
};

export const VOLUME_SHORT: Record<VolumeUnit, string> = {
  m3: "m³", L: "L", mL: "mL", ft3: "ft³",
};

export const TEMPERATURE_SHORT: Record<TemperatureUnit, string> = {
  K: "K", C: "°C", F: "°F",
};

// ── Validation ────────────────────────────────────────────────────────────────
export function validatePositive(val: string, label: string): string | null {
  if (val === "" || val === undefined) return `${label} is required.`;
  const n = parseFloat(val);
  if (isNaN(n)) return `${label} must be a number.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

export function validateTemperature(val: string, unit: TemperatureUnit): string | null {
  if (val === "" || val === undefined) return "Temperature is required.";
  const n = parseFloat(val);
  if (isNaN(n)) return "Temperature must be a number.";
  const kelvin = temperatureToK(n, unit);
  if (kelvin <= 0) {
    const minVal = unit === "K" ? "0 K" : unit === "C" ? "-273.15 °C" : "-459.67 °F";
    return `Temperature cannot be at or below absolute zero (min: ${minVal}).`;
  }
  return null;
}

// ── Scientific notation formatting ───────────────────────────────────────────
export function formatSci(value: number, precision: number): string {
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e-4 && abs < 1e7) {
    return value.toFixed(precision);
  }
  return value.toExponential(precision);
}

// ── Core calculation ──────────────────────────────────────────────────────────
export function calculate(inputs: GasInputs): GasResult {
  const { solveFor, pressureUnit, volumeUnit, temperatureUnit, precision } = inputs;

  // Convert known values to SI
  const P_in = parseFloat(inputs.pressure);
  const V_in = parseFloat(inputs.volume);
  const n_in = parseFloat(inputs.moles);
  const T_in = parseFloat(inputs.temperature);

  const P_Pa = solveFor !== "P" ? pressureToSI(P_in, pressureUnit) : 0;
  const V_m3 = solveFor !== "V" ? volumeToSI(V_in, volumeUnit) : 0;
  const n_mol = solveFor !== "n" ? n_in : 0;
  const T_K   = solveFor !== "T" ? temperatureToK(T_in, temperatureUnit) : 0;
  const R = R_SI;

  let resultSI: number;
  let formulaUsed: string;
  let formulaSubstituted: string;
  let resultUnit: string;
  let resultValue: number;

  switch (solveFor) {
    case "P": {
      resultSI = (n_mol * R * T_K) / V_m3;
      resultValue = pressureFromSI(resultSI, pressureUnit);
      resultUnit = PRESSURE_SHORT[pressureUnit];
      formulaUsed = "P = nRT / V";
      formulaSubstituted = `P = (${formatSci(n_mol, 4)} × ${R.toFixed(4)} × ${formatSci(T_K, 4)}) / ${formatSci(V_m3, 6)}`;
      break;
    }
    case "V": {
      resultSI = (n_mol * R * T_K) / P_Pa;
      resultValue = volumeFromSI(resultSI, volumeUnit);
      resultUnit = VOLUME_SHORT[volumeUnit];
      formulaUsed = "V = nRT / P";
      formulaSubstituted = `V = (${formatSci(n_mol, 4)} × ${R.toFixed(4)} × ${formatSci(T_K, 4)}) / ${formatSci(P_Pa, 4)}`;
      break;
    }
    case "n": {
      resultSI = (P_Pa * V_m3) / (R * T_K);
      resultValue = resultSI; // mol is SI
      resultUnit = "mol";
      formulaUsed = "n = PV / RT";
      formulaSubstituted = `n = (${formatSci(P_Pa, 4)} × ${formatSci(V_m3, 6)}) / (${R.toFixed(4)} × ${formatSci(T_K, 4)})`;
      break;
    }
    case "T": {
      resultSI = (P_Pa * V_m3) / (n_mol * R);
      resultValue = temperatureFromK(resultSI, temperatureUnit);
      resultUnit = TEMPERATURE_SHORT[temperatureUnit];
      formulaUsed = "T = PV / nR";
      formulaSubstituted = `T = (${formatSci(P_Pa, 4)} × ${formatSci(V_m3, 6)}) / (${formatSci(n_mol, 4)} × ${R.toFixed(4)})`;
      break;
    }
  }

  return {
    value: resultValue!,
    unit: resultUnit!,
    formulaUsed: formulaUsed!,
    formulaSubstituted: formulaSubstituted!,
    P_Pa: solveFor === "P" ? resultSI! : P_Pa,
    V_m3: solveFor === "V" ? resultSI! : V_m3,
    n_mol: solveFor === "n" ? resultSI! : n_mol,
    T_K:   solveFor === "T" ? resultSI! : T_K,
    R_used: R,
  };
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "ideal-gas-law-history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: GasInputs, result: GasResult): void {
  try {
    const existing = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    const updated = [entry, ...existing].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export function exportToText(inputs: GasInputs, result: GasResult): string {
  const lines: string[] = [
    "Ideal Gas Law Calculation",
    "=".repeat(40),
    `Solving for: ${inputs.solveFor === "P" ? "Pressure" : inputs.solveFor === "V" ? "Volume" : inputs.solveFor === "n" ? "Moles" : "Temperature"}`,
    "",
    "Known Variables:",
  ];

  if (inputs.solveFor !== "P") lines.push(`  Pressure (P) = ${inputs.pressure} ${PRESSURE_SHORT[inputs.pressureUnit]}`);
  if (inputs.solveFor !== "V") lines.push(`  Volume (V)   = ${inputs.volume} ${VOLUME_SHORT[inputs.volumeUnit]}`);
  if (inputs.solveFor !== "n") lines.push(`  Moles (n)    = ${inputs.moles} mol`);
  if (inputs.solveFor !== "T") lines.push(`  Temperature (T) = ${inputs.temperature} ${TEMPERATURE_SHORT[inputs.temperatureUnit]}`);

  lines.push(
    "",
    "Calculated:",
    `  ${inputs.solveFor === "P" ? "Pressure" : inputs.solveFor === "V" ? "Volume" : inputs.solveFor === "n" ? "Moles" : "Temperature"} = ${formatSci(result.value, inputs.precision)} ${result.unit}`,
    "",
    "Formula:",
    `  ${result.formulaUsed}`,
    "",
    "Substitution:",
    `  ${result.formulaSubstituted}`,
    "",
    "Gas Constant (R) = 8.314472 J/(mol·K)",
    "",
    `Generated: ${new Date().toLocaleString()}`,
  );

  return lines.join("\n");
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
