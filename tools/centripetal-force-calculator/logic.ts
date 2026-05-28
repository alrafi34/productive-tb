import {
  CentripetalInputs,
  CentripetalResult,
  HistoryEntry,
  MassUnit,
  VelocityUnit,
  RadiusUnit,
} from "./types";

// ── Unit conversion factors to SI ─────────────────────────────────────────

export const MASS_TO_KG: Record<MassUnit, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.453592,
  t: 1000,
};

export const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  mph: 0.44704,
};

export const RADIUS_TO_M: Record<RadiusUnit, number> = {
  m: 1,
  cm: 0.01,
  ft: 0.3048,
};

// ── Labels ─────────────────────────────────────────────────────────────────

export const MASS_LABELS: Record<MassUnit, string> = {
  kg: "Kilogram (kg)",
  g: "Gram (g)",
  lb: "Pound (lb)",
  t: "Metric Ton (t)",
};

export const MASS_SHORT: Record<MassUnit, string> = {
  kg: "kg",
  g: "g",
  lb: "lb",
  t: "t",
};

export const VELOCITY_LABELS: Record<VelocityUnit, string> = {
  "m/s": "Meters/sec (m/s)",
  "km/h": "Kilometers/hr (km/h)",
  mph: "Miles/hr (mph)",
};

export const VELOCITY_SHORT: Record<VelocityUnit, string> = {
  "m/s": "m/s",
  "km/h": "km/h",
  mph: "mph",
};

export const RADIUS_LABELS: Record<RadiusUnit, string> = {
  m: "Meters (m)",
  cm: "Centimeters (cm)",
  ft: "Feet (ft)",
};

export const RADIUS_SHORT: Record<RadiusUnit, string> = {
  m: "m",
  cm: "cm",
  ft: "ft",
};

export const ALL_MASS_UNITS: MassUnit[] = ["kg", "g", "lb", "t"];
export const ALL_VELOCITY_UNITS: VelocityUnit[] = ["m/s", "km/h", "mph"];
export const ALL_RADIUS_UNITS: RadiusUnit[] = ["m", "cm", "ft"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateMass(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a mass value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Mass must be a valid number.";
  if (num <= 0) return "Mass must be greater than zero.";
  return null;
}

export function validateVelocity(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a velocity value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Velocity must be a valid number.";
  if (num <= 0) return "Velocity must be greater than zero.";
  return null;
}

export function validateRadius(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a radius value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Radius must be a valid number.";
  if (num <= 0) return "Radius must be greater than zero.";
  return null;
}

export function validateOmega(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter an angular velocity value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Angular velocity must be a valid number.";
  if (num <= 0) return "Angular velocity must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: CentripetalInputs): CentripetalResult | null {
  const massKg = parseFloat(inputs.mass) * MASS_TO_KG[inputs.massUnit];
  const radiusM = parseFloat(inputs.radius) * RADIUS_TO_M[inputs.radiusUnit];

  if (inputs.mode === "velocity") {
    const velocityMs = parseFloat(inputs.velocity) * VELOCITY_TO_MS[inputs.velocityUnit];
    const forceN = (massKg * velocityMs * velocityMs) / radiusM;

    const mStr = formatNum(massKg, 4);
    const vStr = formatNum(velocityMs, 4);
    const rStr = formatNum(radiusM, 4);
    const fStr = formatNum(forceN, 4);

    const steps = [
      `F = mv² / r`,
      `F = (${mStr} × ${vStr}²) / ${rStr}`,
      `F = (${mStr} × ${formatNum(velocityMs * velocityMs, 4)}) / ${rStr}`,
      `F = ${formatNum(massKg * velocityMs * velocityMs, 4)} / ${rStr}`,
      `F = ${fStr} N`,
    ];

    return {
      forceN,
      forceKN: forceN / 1000,
      forceLbf: forceN * 0.224809,
      massKg,
      velocityMs,
      radiusM,
      omegaRads: velocityMs / radiusM,
      formula: `F = mv² / r = ${mStr} × ${vStr}² / ${rStr} = ${fStr} N`,
      steps,
    };
  } else {
    const omegaRads = parseFloat(inputs.omega);
    const forceN = massKg * radiusM * omegaRads * omegaRads;

    const mStr = formatNum(massKg, 4);
    const rStr = formatNum(radiusM, 4);
    const wStr = formatNum(omegaRads, 4);
    const fStr = formatNum(forceN, 4);

    const steps = [
      `F = mrω²`,
      `F = ${mStr} × ${rStr} × ${wStr}²`,
      `F = ${mStr} × ${rStr} × ${formatNum(omegaRads * omegaRads, 4)}`,
      `F = ${formatNum(massKg * radiusM, 4)} × ${formatNum(omegaRads * omegaRads, 4)}`,
      `F = ${fStr} N`,
    ];

    return {
      forceN,
      forceKN: forceN / 1000,
      forceLbf: forceN * 0.224809,
      massKg,
      velocityMs: omegaRads * radiusM,
      radiusM,
      omegaRads,
      formula: `F = mrω² = ${mStr} × ${rStr} × ${wStr}² = ${fStr} N`,
      steps,
    };
  }
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

const HISTORY_KEY = "centripetal-force-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CentripetalInputs, result: CentripetalResult): void {
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

export function exportToText(inputs: CentripetalInputs, result: CentripetalResult): string {
  const p = inputs.precision;
  const lines = [
    "Centripetal Force Calculator – Result",
    "=".repeat(45),
    "",
    `Mode         : ${inputs.mode === "velocity" ? "Velocity Formula (F = mv²/r)" : "Angular Velocity Formula (F = mrω²)"}`,
    `Mass         : ${inputs.mass} ${MASS_SHORT[inputs.massUnit]} (${formatNum(result.massKg, p)} kg)`,
  ];

  if (inputs.mode === "velocity") {
    lines.push(`Velocity     : ${inputs.velocity} ${VELOCITY_SHORT[inputs.velocityUnit]} (${formatNum(result.velocityMs, p)} m/s)`);
  } else {
    lines.push(`Angular Vel. : ${inputs.omega} rad/s`);
  }

  lines.push(
    `Radius       : ${inputs.radius} ${RADIUS_SHORT[inputs.radiusUnit]} (${formatNum(result.radiusM, p)} m)`,
    "",
    `Force (N)    : ${formatNum(result.forceN, p)} N`,
    `Force (kN)   : ${formatNum(result.forceKN, p)} kN`,
    `Force (lbf)  : ${formatNum(result.forceLbf, p)} lbf`,
    "",
    `Formula: ${result.formula}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  );

  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
