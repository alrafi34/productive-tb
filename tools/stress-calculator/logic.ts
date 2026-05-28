import {
  StressInputs,
  StressResult,
  HistoryEntry,
  ForceUnit,
  AreaUnit,
  StressUnit,
} from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const FORCE_TO_N: Record<ForceUnit, number> = {
  N:   1,
  kN:  1000,
  lbf: 4.44822,
  kgf: 9.80665,
};

export const AREA_TO_M2: Record<AreaUnit, number> = {
  m2:  1,
  cm2: 1e-4,
  mm2: 1e-6,
  in2: 6.4516e-4,
  ft2: 0.092903,
};

// ── Display labels ─────────────────────────────────────────────────────────

export const FORCE_LABELS: Record<ForceUnit, string> = {
  N:   "Newton (N)",
  kN:  "Kilonewton (kN)",
  lbf: "Pound-force (lbf)",
  kgf: "Kilogram-force (kgf)",
};

export const FORCE_SHORT: Record<ForceUnit, string> = {
  N:   "N",
  kN:  "kN",
  lbf: "lbf",
  kgf: "kgf",
};

export const AREA_LABELS: Record<AreaUnit, string> = {
  m2:  "Square Meter (m²)",
  cm2: "Square Centimeter (cm²)",
  mm2: "Square Millimeter (mm²)",
  in2: "Square Inch (in²)",
  ft2: "Square Foot (ft²)",
};

export const AREA_SHORT: Record<AreaUnit, string> = {
  m2:  "m²",
  cm2: "cm²",
  mm2: "mm²",
  in2: "in²",
  ft2: "ft²",
};

export const STRESS_LABELS: Record<StressUnit, string> = {
  Pa:  "Pascal (Pa)",
  kPa: "Kilopascal (kPa)",
  MPa: "Megapascal (MPa)",
  GPa: "Gigapascal (GPa)",
  psi: "Pounds per sq. inch (psi)",
  ksi: "Kilopounds per sq. inch (ksi)",
};

export const ALL_FORCE_UNITS: ForceUnit[] = ["N", "kN", "lbf", "kgf"];
export const ALL_AREA_UNITS: AreaUnit[] = ["m2", "cm2", "mm2", "in2", "ft2"];
export const ALL_STRESS_UNITS: StressUnit[] = ["Pa", "kPa", "MPa", "GPa", "psi", "ksi"];

// ── Stress unit conversion from Pa ────────────────────────────────────────

export const PA_TO_UNIT: Record<StressUnit, number> = {
  Pa:  1,
  kPa: 1e-3,
  MPa: 1e-6,
  GPa: 1e-9,
  psi: 1 / 6894.757,
  ksi: 1 / 6894757,
};

// ── Validation ─────────────────────────────────────────────────────────────

export function validateForce(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a force value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Force must be greater than zero.";
  return null;
}

export function validateArea(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter an area value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Area must be greater than zero.";
  return null;
}

// ── Stress interpretation ──────────────────────────────────────────────────

function getInterpretation(stressMPa: number): string {
  if (stressMPa < 0.001)   return "Negligible stress — well within safe limits for most materials.";
  if (stressMPa < 1)       return "Very low stress — typical for lightly loaded structures.";
  if (stressMPa < 50)      return "Low stress range — safe for most structural steels and alloys.";
  if (stressMPa < 150)     return "Moderate stress range — common in machine components and beams.";
  if (stressMPa < 300)     return "High stress range — verify against material yield strength.";
  if (stressMPa < 600)     return "Very high stress — approaching yield for many structural steels.";
  return "Extreme stress detected — verify units and check against material limits.";
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: StressInputs): StressResult | null {
  if (validateForce(inputs.force) || validateArea(inputs.area)) return null;

  const forceN  = parseFloat(inputs.force) * FORCE_TO_N[inputs.forceUnit];
  const areaM2  = parseFloat(inputs.area)  * AREA_TO_M2[inputs.areaUnit];
  const stressPa = forceN / areaM2;

  const stressMPa = stressPa * PA_TO_UNIT["MPa"];

  const formula = `σ = F / A = ${formatNum(forceN, 4)} N / ${formatNum(areaM2, 8)} m²`;

  return {
    stressPa,
    stressInOutputUnit: stressPa * PA_TO_UNIT[inputs.outputUnit],
    stressPaDisplay:    stressPa,
    stressKPa:          stressPa * PA_TO_UNIT["kPa"],
    stressMPa,
    stressGPa:          stressPa * PA_TO_UNIT["GPa"],
    stressPsi:          stressPa * PA_TO_UNIT["psi"],
    stressKsi:          stressPa * PA_TO_UNIT["ksi"],
    forceN,
    areaM2,
    interpretation: getInterpretation(stressMPa),
    formula,
  };
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (Math.abs(value) >= 1e9 || (Math.abs(value) < 1e-4 && value !== 0)) {
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

const HISTORY_KEY = "stress-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: StressInputs, result: StressResult): void {
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

export function exportToText(inputs: StressInputs, result: StressResult): string {
  const p = inputs.precision;
  return [
    "Stress Calculator – Result",
    "=".repeat(45),
    "",
    `Force        : ${inputs.force} ${FORCE_SHORT[inputs.forceUnit]} (${formatNum(result.forceN, p)} N)`,
    `Area         : ${inputs.area} ${AREA_SHORT[inputs.areaUnit]} (${formatNum(result.areaM2, p)} m²)`,
    "",
    `Stress (Pa)  : ${formatNum(result.stressPaDisplay, p)} Pa`,
    `Stress (kPa) : ${formatNum(result.stressKPa, p)} kPa`,
    `Stress (MPa) : ${formatNum(result.stressMPa, p)} MPa`,
    `Stress (GPa) : ${formatNum(result.stressGPa, p)} GPa`,
    `Stress (psi) : ${formatNum(result.stressPsi, p)} psi`,
    `Stress (ksi) : ${formatNum(result.stressKsi, p)} ksi`,
    "",
    `Formula: ${result.formula}`,
    "",
    `Interpretation: ${result.interpretation}`,
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
