import {
  MachInputs,
  MachResult,
  MachClassification,
  HistoryEntry,
  SpeedUnit,
  TempUnit,
  Medium,
} from "./types";

// ── Unit conversion factors ───────────────────────────────────────────────

export const SPEED_TO_MS: Record<SpeedUnit, number> = {
  "m/s":   1,
  "km/h":  1 / 3.6,
  "mph":   0.44704,
  "ft/s":  0.3048,
  "knots": 0.514444,
};

export const MS_TO_UNIT: Record<SpeedUnit, number> = {
  "m/s":   1,
  "km/h":  3.6,
  "mph":   2.23694,
  "ft/s":  3.28084,
  "knots": 1.94384,
};

export const SPEED_LABELS: Record<SpeedUnit, string> = {
  "m/s":   "Meters per second (m/s)",
  "km/h":  "Kilometers per hour (km/h)",
  "mph":   "Miles per hour (mph)",
  "ft/s":  "Feet per second (ft/s)",
  "knots": "Knots (kn)",
};

export const ALL_SPEED_UNITS: SpeedUnit[] = ["m/s", "km/h", "mph", "ft/s", "knots"];

export const TEMP_LABELS: Record<TempUnit, string> = {
  C: "Celsius (°C)",
  F: "Fahrenheit (°F)",
  K: "Kelvin (K)",
};

export const ALL_TEMP_UNITS: TempUnit[] = ["C", "F", "K"];

// ── Medium speed of sound at 20°C ─────────────────────────────────────────
// For Helium & Hydrogen we use the exact formula: a = sqrt(γ * R_specific * T)
// Dry Air: γ=1.4, R=287.05 J/(kg·K)  → a = sqrt(1.4 * 287.05 * T)
// Helium:  γ=1.667, R=2077 J/(kg·K)  → a = sqrt(1.667 * 2077 * T)
// Hydrogen:γ=1.4,  R=4124 J/(kg·K)  → a = sqrt(1.4 * 4124 * T)

interface MediumParams {
  gamma: number;
  R: number;
  label: string;
  icon: string;
}

export const MEDIUM_PARAMS: Record<string, MediumParams> = {
  "dry-air":  { gamma: 1.4,   R: 287.05, label: "Dry Air",  icon: "🌬️" },
  "helium":   { gamma: 1.667, R: 2077,   label: "Helium",   icon: "🎈" },
  "hydrogen": { gamma: 1.4,   R: 4124,   label: "Hydrogen", icon: "⚗️" },
};

// ── Temperature conversion ─────────────────────────────────────────────────

export function toKelvin(value: number, unit: TempUnit): number {
  switch (unit) {
    case "C": return value + 273.15;
    case "F": return (value - 32) * (5 / 9) + 273.15;
    case "K": return value;
  }
}

// ── Speed of sound ─────────────────────────────────────────────────────────

export function calcSpeedOfSound(tempK: number, medium: Medium, customMs?: number): number {
  if (medium === "custom") return customMs ?? 343;
  const p = MEDIUM_PARAMS[medium];
  return Math.sqrt(p.gamma * p.R * tempK);
}

// ── Classification ─────────────────────────────────────────────────────────

export function classify(mach: number): MachClassification {
  if (mach < 0.8)                    return "subsonic";
  if (mach >= 0.8 && mach < 1.0)    return "transonic";
  if (mach >= 1.0 && mach <= 1.0)   return "sonic";      // exact 1
  if (mach > 1.0 && mach <= 1.0001) return "sonic";
  if (mach > 1.0 && mach < 1.2)     return "transonic";
  if (mach >= 1.2 && mach < 5.0)    return "supersonic";
  return "hypersonic";
}

export const CLASSIFICATION_LABELS: Record<MachClassification, string> = {
  subsonic:   "Subsonic",
  transonic:  "Transonic",
  sonic:      "Sonic",
  supersonic: "Supersonic",
  hypersonic: "Hypersonic",
};

export const CLASSIFICATION_DESCRIPTIONS: Record<MachClassification, string> = {
  subsonic:   "Object travels slower than the speed of sound. No shock waves form.",
  transonic:  "Object approaches or just exceeds the speed of sound. Mixed subsonic/supersonic regions appear.",
  sonic:      "Object travels exactly at the speed of sound. Mach 1.",
  supersonic: "Object travels faster than sound. Shock waves form and compressibility effects dominate.",
  hypersonic: "Object exceeds Mach 5. Extreme heating and complex aerodynamic effects occur.",
};

export const CLASSIFICATION_COLORS: Record<MachClassification, string> = {
  subsonic:   "bg-blue-100 border-blue-300 text-blue-800",
  transonic:  "bg-yellow-100 border-yellow-300 text-yellow-800",
  sonic:      "bg-orange-100 border-orange-300 text-orange-800",
  supersonic: "bg-red-100 border-red-300 text-red-800",
  hypersonic: "bg-purple-100 border-purple-300 text-purple-800",
};

export const CLASSIFICATION_DOT: Record<MachClassification, string> = {
  subsonic:   "bg-blue-500",
  transonic:  "bg-yellow-500",
  sonic:      "bg-orange-500",
  supersonic: "bg-red-500",
  hypersonic: "bg-purple-500",
};

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: MachInputs): MachResult | null {
  const tempVal = parseFloat(inputs.temperature);
  if (isNaN(tempVal)) return null;

  const tempK = toKelvin(tempVal, inputs.tempUnit);
  if (tempK <= 0) return null;

  const customSoundMs = inputs.medium === "custom" ? parseFloat(inputs.customSoundSpeed) : undefined;
  if (inputs.medium === "custom" && (isNaN(customSoundMs!) || customSoundMs! <= 0)) return null;

  const soundMs = calcSpeedOfSound(tempK, inputs.medium, customSoundMs);

  let machNumber: number;
  let speedMs: number;

  if (inputs.mode === "mach") {
    const rawSpeed = parseFloat(inputs.speed);
    if (isNaN(rawSpeed) || rawSpeed <= 0) return null;
    speedMs = rawSpeed * SPEED_TO_MS[inputs.speedUnit];
    machNumber = speedMs / soundMs;
  } else if (inputs.mode === "speed") {
    const rawMach = parseFloat(inputs.machNumber);
    if (isNaN(rawMach) || rawMach <= 0) return null;
    machNumber = rawMach;
    speedMs = rawMach * soundMs;
  } else {
    // mode === "sound": output only speed of sound
    machNumber = 1; // placeholder — result display handles sound mode
    speedMs = soundMs;
  }

  const classification = classify(machNumber);

  const formulaSubstituted =
    inputs.mode === "mach"
      ? `M = ${formatNum(speedMs, 2)} / ${formatNum(soundMs, 2)}`
      : inputs.mode === "speed"
      ? `v = ${inputs.machNumber} × ${formatNum(soundMs, 2)}`
      : `a = √(γ × R × ${formatNum(tempK, 2)})`;

  return {
    machNumber,
    speedMs,
    speedOfSoundMs: soundMs,
    classification,
    temperatureK: tempK,
    speedKmh:   speedMs * MS_TO_UNIT["km/h"],
    speedMph:   speedMs * MS_TO_UNIT["mph"],
    speedFts:   speedMs * MS_TO_UNIT["ft/s"],
    speedKnots: speedMs * MS_TO_UNIT["knots"],
    soundKmh:   soundMs * MS_TO_UNIT["km/h"],
    formulaSubstituted,
  };
}

// ── Formatting ─────────────────────────────────────────────────────────────

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

// ── Validation ─────────────────────────────────────────────────────────────

export function validateSpeed(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a speed value.";
  const n = parseFloat(value);
  if (isNaN(n)) return "Speed must be a valid number.";
  if (n <= 0) return "Speed must be greater than zero.";
  return null;
}

export function validateMach(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a Mach number.";
  const n = parseFloat(value);
  if (isNaN(n)) return "Mach number must be a valid number.";
  if (n <= 0) return "Mach number must be greater than zero.";
  return null;
}

export function validateTemp(value: string, unit: TempUnit): string | null {
  if (!value || value.trim() === "") return "Please enter a temperature.";
  const n = parseFloat(value);
  if (isNaN(n)) return "Temperature must be a valid number.";
  const k = toKelvin(n, unit);
  if (k <= 0) return "Temperature results in non-physical Kelvin value (≤ 0 K).";
  return null;
}

export function validateCustomSound(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a custom speed of sound.";
  const n = parseFloat(value);
  if (isNaN(n)) return "Must be a valid number.";
  if (n <= 0) return "Speed of sound must be greater than zero.";
  return null;
}

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ───────────────────────────────────────────────────────────

const HISTORY_KEY = "mach-number-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: MachInputs, result: MachResult): void {
  try {
    const h = getHistory();
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: MachInputs, result: MachResult): string {
  const p = inputs.precision;
  const MODE_LABEL: Record<string, string> = {
    mach: "Calculate Mach Number",
    speed: "Calculate Speed",
    sound: "Calculate Speed of Sound",
  };
  return [
    "Mach Number Calculator – Result",
    "=".repeat(45),
    "",
    `Calculation Mode  : ${MODE_LABEL[inputs.mode]}`,
    `Medium            : ${inputs.medium}`,
    `Temperature       : ${inputs.temperature} °${inputs.tempUnit} (${formatNum(result.temperatureK, 2)} K)`,
    "",
    `Mach Number       : ${formatNum(result.machNumber, p)}`,
    `Classification    : ${CLASSIFICATION_LABELS[result.classification]}`,
    `Speed             : ${formatNum(result.speedMs, p)} m/s`,
    `Speed of Sound    : ${formatNum(result.speedOfSoundMs, p)} m/s`,
    "",
    `Speed Conversions:`,
    `  km/h   : ${formatNum(result.speedKmh, p)}`,
    `  mph    : ${formatNum(result.speedMph, p)}`,
    `  ft/s   : ${formatNum(result.speedFts, p)}`,
    `  knots  : ${formatNum(result.speedKnots, p)}`,
    "",
    `Formula: ${result.formulaSubstituted}`,
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

// ── Quick Presets ──────────────────────────────────────────────────────────

export const QUICK_PRESETS = [
  { label: "Subsonic Jet",       speed: "250",  speedUnit: "m/s"  as SpeedUnit, temperature: "11",  tempUnit: "C" as TempUnit, medium: "dry-air" as Medium },
  { label: "Speed of Sound",     speed: "343",  speedUnit: "m/s"  as SpeedUnit, temperature: "20",  tempUnit: "C" as TempUnit, medium: "dry-air" as Medium },
  { label: "Supersonic F-15",    speed: "830",  speedUnit: "m/s"  as SpeedUnit, temperature: "0",   tempUnit: "C" as TempUnit, medium: "dry-air" as Medium },
  { label: "SR-71 Blackbird",    speed: "980",  speedUnit: "m/s"  as SpeedUnit, temperature: "-50", tempUnit: "C" as TempUnit, medium: "dry-air" as Medium },
  { label: "Hypersonic Missile", speed: "6000", speedUnit: "km/h" as SpeedUnit, temperature: "20",  tempUnit: "C" as TempUnit, medium: "dry-air" as Medium },
];
