import {
  HydraulicInputs,
  HydraulicResult,
  HistoryEntry,
  ForceUnit,
  AreaUnit,
  PressureUnit,
  DiameterUnit,
} from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

// Force → N
export const FORCE_TO_N: Record<ForceUnit, number> = {
  N:    1,
  kN:   1000,
  lbf:  4.44822,
  tonf: 8896.44,
};

// Area → m²
export const AREA_TO_M2: Record<AreaUnit, number> = {
  m2:  1,
  cm2: 1e-4,
  mm2: 1e-6,
  in2: 6.4516e-4,
};

// Pressure → Pa
export const PRESSURE_TO_PA: Record<PressureUnit, number> = {
  Pa:  1,
  kPa: 1000,
  MPa: 1e6,
  bar: 1e5,
  psi: 6894.757,
};

// Diameter → m
export const DIAM_TO_M: Record<DiameterUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m:  1,
  in: 0.0254,
};

// ── Labels ─────────────────────────────────────────────────────────────────

export const FORCE_LABELS: Record<ForceUnit, string> = {
  N:    "N (Newton)",
  kN:   "kN (Kilonewton)",
  lbf:  "lbf (Pound-force)",
  tonf: "tonf (Ton-force)",
};

export const FORCE_SHORT: Record<ForceUnit, string> = {
  N: "N", kN: "kN", lbf: "lbf", tonf: "tonf",
};

export const AREA_LABELS: Record<AreaUnit, string> = {
  m2:  "m² (Square meter)",
  cm2: "cm² (Square centimeter)",
  mm2: "mm² (Square millimeter)",
  in2: "in² (Square inch)",
};

export const AREA_SHORT: Record<AreaUnit, string> = {
  m2: "m²", cm2: "cm²", mm2: "mm²", in2: "in²",
};

export const PRESSURE_LABELS: Record<PressureUnit, string> = {
  Pa:  "Pa (Pascal)",
  kPa: "kPa (Kilopascal)",
  MPa: "MPa (Megapascal)",
  bar: "bar",
  psi: "PSI (Pound per sq. inch)",
};

export const PRESSURE_SHORT: Record<PressureUnit, string> = {
  Pa: "Pa", kPa: "kPa", MPa: "MPa", bar: "bar", psi: "PSI",
};

export const DIAM_LABELS: Record<DiameterUnit, string> = {
  mm: "mm (Millimeter)",
  cm: "cm (Centimeter)",
  m:  "m (Meter)",
  in: "in (Inch)",
};

export const DIAM_SHORT: Record<DiameterUnit, string> = {
  mm: "mm", cm: "cm", m: "m", in: "in",
};

export const ALL_FORCE_UNITS: ForceUnit[]    = ["N", "kN", "lbf", "tonf"];
export const ALL_AREA_UNITS: AreaUnit[]      = ["m2", "cm2", "mm2", "in2"];
export const ALL_PRESSURE_UNITS: PressureUnit[] = ["Pa", "kPa", "MPa", "bar", "psi"];
export const ALL_DIAM_UNITS: DiameterUnit[]  = ["mm", "cm", "m", "in"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateForce(v: string): string | null {
  if (!v || v.trim() === "") return "Please enter a force value.";
  const n = parseFloat(v);
  if (isNaN(n)) return "Force must be a valid number.";
  if (n <= 0) return "Force must be greater than zero.";
  return null;
}

export function validateArea(v: string): string | null {
  if (!v || v.trim() === "") return "Please enter an area value.";
  const n = parseFloat(v);
  if (isNaN(n)) return "Area must be a valid number.";
  if (n <= 0) return "Area must be greater than zero.";
  return null;
}

export function validatePressure(v: string): string | null {
  if (!v || v.trim() === "") return "Please enter a pressure value.";
  const n = parseFloat(v);
  if (isNaN(n)) return "Pressure must be a valid number.";
  if (n <= 0) return "Pressure must be greater than zero.";
  return null;
}

export function validateDiameter(v: string): string | null {
  if (!v || v.trim() === "") return "Please enter a diameter value.";
  const n = parseFloat(v);
  if (isNaN(n)) return "Diameter must be a valid number.";
  if (n <= 0) return "Diameter must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

function buildResult(pressurePa: number, forceN: number, areaM2: number): HydraulicResult {
  const diamM = Math.sqrt((4 * areaM2) / Math.PI);
  return {
    pressurePa,
    pressureKPa: pressurePa / 1000,
    pressureMPa: pressurePa / 1e6,
    pressureBar: pressurePa / 1e5,
    pressurePsi: pressurePa / 6894.757,
    forceN,
    forceKN:   forceN / 1000,
    forceLbf:  forceN / 4.44822,
    forceTonf: forceN / 8896.44,
    areaM2,
    areaCm2: areaM2 * 1e4,
    areaMm2: areaM2 * 1e6,
    areaIn2: areaM2 / 6.4516e-4,
    diameterM:  diamM,
    diameterMm: diamM * 1000,
    diameterCm: diamM * 100,
    diameterIn: diamM / 0.0254,
    formula: "",
  };
}

export function calculate(inputs: HydraulicInputs): HydraulicResult | null {
  const { mode } = inputs;

  if (mode === "pressure") {
    if (validateForce(inputs.force) || validateArea(inputs.area)) return null;
    const fN   = parseFloat(inputs.force) * FORCE_TO_N[inputs.forceUnit];
    const aM2  = parseFloat(inputs.area)  * AREA_TO_M2[inputs.areaUnit];
    const pPa  = fN / aM2;
    const r    = buildResult(pPa, fN, aM2);
    r.formula  = `P = F / A = ${formatNum(fN, 4)} N / ${formatNum(aM2, 6)} m² = ${formatNum(pPa, 4)} Pa`;
    return r;
  }

  if (mode === "force") {
    if (validatePressure(inputs.pressure) || validateArea(inputs.area)) return null;
    const pPa  = parseFloat(inputs.pressure) * PRESSURE_TO_PA[inputs.pressureUnit];
    const aM2  = parseFloat(inputs.area)     * AREA_TO_M2[inputs.areaUnit];
    const fN   = pPa * aM2;
    const r    = buildResult(pPa, fN, aM2);
    r.formula  = `F = P × A = ${formatNum(pPa, 4)} Pa × ${formatNum(aM2, 6)} m² = ${formatNum(fN, 4)} N`;
    return r;
  }

  if (mode === "area") {
    if (validateForce(inputs.force) || validatePressure(inputs.pressure)) return null;
    const fN   = parseFloat(inputs.force)    * FORCE_TO_N[inputs.forceUnit];
    const pPa  = parseFloat(inputs.pressure) * PRESSURE_TO_PA[inputs.pressureUnit];
    const aM2  = fN / pPa;
    const r    = buildResult(pPa, fN, aM2);
    r.formula  = `A = F / P = ${formatNum(fN, 4)} N / ${formatNum(pPa, 4)} Pa = ${formatNum(aM2, 6)} m²`;
    return r;
  }

  if (mode === "diameter") {
    if (validateForce(inputs.force) || validatePressure(inputs.pressure)) return null;
    const fN   = parseFloat(inputs.force)    * FORCE_TO_N[inputs.forceUnit];
    const pPa  = parseFloat(inputs.pressure) * PRESSURE_TO_PA[inputs.pressureUnit];
    const aM2  = fN / pPa;
    const dM   = Math.sqrt((4 * aM2) / Math.PI);
    const r    = buildResult(pPa, fN, aM2);
    r.formula  = `d = √(4A/π) = √(4 × ${formatNum(aM2, 6)} / π) = ${formatNum(dM * 1000, 4)} mm`;
    return r;
  }

  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (!isFinite(value)) return "—";
  if (Math.abs(value) >= 1e9 || (Math.abs(value) < 0.0001 && value !== 0)) {
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

const HISTORY_KEY = "hydraulic-pressure-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: HydraulicInputs, result: HydraulicResult): void {
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

export function exportToText(inputs: HydraulicInputs, result: HydraulicResult): string {
  const p = inputs.precision;
  const modeLabel: Record<string, string> = {
    pressure: "Calculate Pressure",
    force:    "Calculate Force",
    area:     "Calculate Area",
    diameter: "Calculate Piston Diameter",
  };
  return [
    "Hydraulic Pressure Calculator – Result",
    "=".repeat(45),
    "",
    `Calculation Mode : ${modeLabel[inputs.mode]}`,
    "",
    "Inputs:",
    inputs.mode !== "pressure"
      ? `  Pressure : ${inputs.pressure} ${PRESSURE_SHORT[inputs.pressureUnit]}`
      : "",
    inputs.mode !== "force"
      ? `  Force    : ${inputs.force} ${FORCE_SHORT[inputs.forceUnit]}`
      : "",
    inputs.mode === "pressure" || inputs.mode === "force"
      ? `  Area     : ${inputs.area} ${AREA_SHORT[inputs.areaUnit]}`
      : "",
    "",
    "Formula:",
    `  ${result.formula}`,
    "",
    "Pressure Results:",
    `  Pa  : ${formatNum(result.pressurePa,  p)}`,
    `  kPa : ${formatNum(result.pressureKPa, p)}`,
    `  MPa : ${formatNum(result.pressureMPa, p)}`,
    `  bar : ${formatNum(result.pressureBar, p)}`,
    `  PSI : ${formatNum(result.pressurePsi, p)}`,
    "",
    "Force Results:",
    `  N    : ${formatNum(result.forceN,    p)}`,
    `  kN   : ${formatNum(result.forceKN,   p)}`,
    `  lbf  : ${formatNum(result.forceLbf,  p)}`,
    `  tonf : ${formatNum(result.forceTonf, p)}`,
    "",
    "Area Results:",
    `  m²  : ${formatNum(result.areaM2,  p)}`,
    `  cm² : ${formatNum(result.areaCm2, p)}`,
    `  mm² : ${formatNum(result.areaMm2, p)}`,
    `  in² : ${formatNum(result.areaIn2, p)}`,
    "",
    "Piston Diameter:",
    `  mm : ${formatNum(result.diameterMm, p)}`,
    `  cm : ${formatNum(result.diameterCm, p)}`,
    `  in : ${formatNum(result.diameterIn, p)}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter((l) => l !== "").join("\n");
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
