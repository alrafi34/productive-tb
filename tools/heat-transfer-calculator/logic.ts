import {
  HeatTransferInputs,
  HeatTransferResult,
  HistoryEntry,
  AreaUnit,
  ThicknessUnit,
  ConductivityUnit,
  HeatCoeffUnit,
  TemperatureUnit,
} from "./types";

// ── Unit conversion factors ────────────────────────────────────────────────

export const AREA_TO_M2: Record<AreaUnit, number> = {
  m2:  1,
  cm2: 1e-4,
  ft2: 0.092903,
  in2: 6.4516e-4,
};

export const THICKNESS_TO_M: Record<ThicknessUnit, number> = {
  m:  1,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  ft: 0.3048,
};

export const K_TO_SI: Record<ConductivityUnit, number> = {
  "W/mK":      1,
  "BTU/hrftF": 1.73073,
};

export const H_TO_SI: Record<HeatCoeffUnit, number> = {
  "W/m2K":      1,
  "BTU/hrft2F": 5.67826,
};

// ── Labels ─────────────────────────────────────────────────────────────────

export const AREA_LABELS: Record<AreaUnit, string> = {
  m2:  "Square Meter (m²)",
  cm2: "Square Centimeter (cm²)",
  ft2: "Square Foot (ft²)",
  in2: "Square Inch (in²)",
};

export const AREA_SHORT: Record<AreaUnit, string> = {
  m2:  "m²",
  cm2: "cm²",
  ft2: "ft²",
  in2: "in²",
};

export const THICKNESS_LABELS: Record<ThicknessUnit, string> = {
  m:  "Meter (m)",
  cm: "Centimeter (cm)",
  mm: "Millimeter (mm)",
  in: "Inch (in)",
  ft: "Foot (ft)",
};

export const THICKNESS_SHORT: Record<ThicknessUnit, string> = {
  m:  "m",
  cm: "cm",
  mm: "mm",
  in: "in",
  ft: "ft",
};

export const K_LABELS: Record<ConductivityUnit, string> = {
  "W/mK":      "W/m·K (SI)",
  "BTU/hrftF": "BTU/hr·ft·°F (Imperial)",
};

export const H_LABELS: Record<HeatCoeffUnit, string> = {
  "W/m2K":      "W/m²·K (SI)",
  "BTU/hrft2F": "BTU/hr·ft²·°F (Imperial)",
};

export const TEMP_LABELS: Record<TemperatureUnit, string> = {
  C: "Celsius (°C)",
  F: "Fahrenheit (°F)",
  K: "Kelvin (K)",
};

export const ALL_AREA_UNITS: AreaUnit[] = ["m2", "cm2", "ft2", "in2"];
export const ALL_THICKNESS_UNITS: ThicknessUnit[] = ["m", "cm", "mm", "in", "ft"];
export const ALL_K_UNITS: ConductivityUnit[] = ["W/mK", "BTU/hrftF"];
export const ALL_H_UNITS: HeatCoeffUnit[] = ["W/m2K", "BTU/hrft2F"];
export const ALL_TEMP_UNITS: TemperatureUnit[] = ["C", "F", "K"];

// ── Temperature conversion helpers ────────────────────────────────────────

/** Convert a temperature value to Kelvin */
export function toKelvin(value: number, unit: TemperatureUnit): number {
  if (unit === "K") return value;
  if (unit === "C") return value + 273.15;
  return (value - 32) * (5 / 9) + 273.15; // F
}

/** Convert a temperature difference to Kelvin (ΔT) */
export function deltaTtoK(value: number, unit: TemperatureUnit): number {
  if (unit === "K" || unit === "C") return value; // 1°C diff = 1 K diff
  return value * (5 / 9); // 1°F diff = 5/9 K diff
}

// ── Material presets ───────────────────────────────────────────────────────

export const MATERIAL_PRESETS = [
  { label: "Copper",    k: "401",   kUnit: "W/mK" as ConductivityUnit },
  { label: "Aluminum",  k: "205",   kUnit: "W/mK" as ConductivityUnit },
  { label: "Steel",     k: "50",    kUnit: "W/mK" as ConductivityUnit },
  { label: "Glass",     k: "1.05",  kUnit: "W/mK" as ConductivityUnit },
  { label: "Concrete",  k: "1.7",   kUnit: "W/mK" as ConductivityUnit },
  { label: "Wood",      k: "0.15",  kUnit: "W/mK" as ConductivityUnit },
  { label: "Fiberglass",k: "0.04",  kUnit: "W/mK" as ConductivityUnit },
  { label: "Air",       k: "0.026", kUnit: "W/mK" as ConductivityUnit },
];

// Convection scenario presets
export const CONVECTION_PRESETS = [
  { label: "Natural Air",    h: "10",  hUnit: "W/m2K" as HeatCoeffUnit, area: "2",  areaUnit: "m2" as AreaUnit, deltaT: "30" },
  { label: "Forced Air",     h: "50",  hUnit: "W/m2K" as HeatCoeffUnit, area: "1",  areaUnit: "m2" as AreaUnit, deltaT: "20" },
  { label: "Water Cooling",  h: "500", hUnit: "W/m2K" as HeatCoeffUnit, area: "0.5",areaUnit: "m2" as AreaUnit, deltaT: "15" },
  { label: "HVAC Duct",      h: "25",  hUnit: "W/m2K" as HeatCoeffUnit, area: "5",  areaUnit: "m2" as AreaUnit, deltaT: "20" },
];

// ── Validation ─────────────────────────────────────────────────────────────

export function validatePositive(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Please enter ${label}.`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${label} must be a valid number.`;
  if (num <= 0) return `${label} must be greater than zero.`;
  return null;
}

export function validateNonNegative(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Please enter ${label}.`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${label} must be a valid number.`;
  if (num < 0) return `${label} cannot be negative.`;
  return null;
}

export function validateEmissivity(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter emissivity.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Emissivity must be a valid number.";
  if (num < 0 || num > 1) return "Emissivity must be between 0 and 1.";
  return null;
}

export function validateTemperature(value: string, label: string, unit: TemperatureUnit): string | null {
  if (!value || value.trim() === "") return `Please enter ${label}.`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${label} must be a valid number.`;
  if (unit === "K" && num < 0) return `${label} cannot be negative in Kelvin.`;
  if (unit === "C" && num < -273.15) return `${label} is below absolute zero.`;
  if (unit === "F" && num < -459.67) return `${label} is below absolute zero.`;
  return null;
}

// ── Core calculations ──────────────────────────────────────────────────────

const SIGMA = 5.67e-8; // Stefan-Boltzmann constant W/m²·K⁴

export function calculateConduction(inputs: HeatTransferInputs): HeatTransferResult | null {
  const c = inputs.conduction;
  const kSI    = parseFloat(c.k) * K_TO_SI[c.kUnit];
  const areaSI = parseFloat(c.area) * AREA_TO_M2[c.areaUnit];
  const dTK    = deltaTtoK(parseFloat(c.deltaT), c.tempUnit);
  const LSI    = parseFloat(c.thickness) * THICKNESS_TO_M[c.thicknessUnit];

  const Q_W = (kSI * areaSI * dTK) / LSI;

  const tempSymbol = c.tempUnit === "F" ? "°F" : c.tempUnit === "C" ? "°C" : "K";
  const formula = `Q = (k × A × ΔT) / L`;
  const breakdown = `Q = (${c.k} ${c.kUnit === "W/mK" ? "W/m·K" : "BTU/hr·ft·°F"} × ${c.area} ${AREA_SHORT[c.areaUnit]} × ${c.deltaT} ${tempSymbol}) / ${c.thickness} ${THICKNESS_SHORT[c.thicknessUnit]} = ${formatNum(Q_W, inputs.precision)} W`;
  const interpretation = interpretHeatRate(Q_W);

  return buildResult(Q_W, formula, breakdown, interpretation);
}

export function calculateConvection(inputs: HeatTransferInputs): HeatTransferResult | null {
  const c = inputs.convection;
  const hSI    = parseFloat(c.h) * H_TO_SI[c.hUnit];
  const areaSI = parseFloat(c.area) * AREA_TO_M2[c.areaUnit];
  const dTK    = deltaTtoK(parseFloat(c.deltaT), c.tempUnit);

  const Q_W = hSI * areaSI * dTK;

  const tempSymbol = c.tempUnit === "F" ? "°F" : c.tempUnit === "C" ? "°C" : "K";
  const formula = `Q = h × A × ΔT`;
  const breakdown = `Q = ${c.h} ${c.hUnit === "W/m2K" ? "W/m²·K" : "BTU/hr·ft²·°F"} × ${c.area} ${AREA_SHORT[c.areaUnit]} × ${c.deltaT} ${tempSymbol} = ${formatNum(Q_W, inputs.precision)} W`;
  const interpretation = interpretHeatRate(Q_W);

  return buildResult(Q_W, formula, breakdown, interpretation);
}

export function calculateRadiation(inputs: HeatTransferInputs): HeatTransferResult | null {
  const r = inputs.radiation;
  const e      = parseFloat(r.emissivity);
  const areaSI = parseFloat(r.area) * AREA_TO_M2[r.areaUnit];
  const T1K    = toKelvin(parseFloat(r.T1), r.tempUnit);
  const T2K    = toKelvin(parseFloat(r.T2), r.tempUnit);

  const Q_W = e * SIGMA * areaSI * (Math.pow(T1K, 4) - Math.pow(T2K, 4));

  const tempSymbol = r.tempUnit === "F" ? "°F" : r.tempUnit === "C" ? "°C" : "K";
  const formula = `Q = ε × σ × A × (T₁⁴ − T₂⁴)`;
  const breakdown = `Q = ${r.emissivity} × 5.67×10⁻⁸ × ${r.area} ${AREA_SHORT[r.areaUnit]} × (${r.T1}${tempSymbol}⁴ − ${r.T2}${tempSymbol}⁴) = ${formatNum(Q_W, inputs.precision)} W`;
  const interpretation = interpretHeatRate(Q_W);

  return buildResult(Q_W, formula, breakdown, interpretation);
}

function buildResult(Q_W: number, formula: string, breakdown: string, interpretation: string): HeatTransferResult {
  return {
    Q_W,
    Q_kW:   Q_W / 1000,
    Q_BTU:  Q_W * 3.41214,
    Q_kcal: Q_W * 0.859845,
    formula,
    breakdown,
    interpretation,
  };
}

function interpretHeatRate(Q: number): string {
  const absQ = Math.abs(Q);
  if (absQ < 1)       return "Very low heat transfer — typical for insulation or small surfaces.";
  if (absQ < 100)     return "Low heat transfer — typical for small electronics or thin panels.";
  if (absQ < 1000)    return "Moderate heat transfer — typical for HVAC components or small heat exchangers.";
  if (absQ < 10000)   return "High heat transfer — typical for industrial heating or large HVAC systems.";
  if (absQ < 100000)  return "Very high heat transfer — typical for industrial furnaces or large heat exchangers.";
  return "Extreme heat transfer — typical for power plants or large industrial processes.";
}

export function calculate(inputs: HeatTransferInputs): HeatTransferResult | null {
  if (inputs.mode === "conduction") return calculateConduction(inputs);
  if (inputs.mode === "convection") return calculateConvection(inputs);
  return calculateRadiation(inputs);
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (!isFinite(value)) return "—";
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

const HISTORY_KEY = "heat-transfer-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: HeatTransferInputs, result: HeatTransferResult): void {
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

export function exportToText(inputs: HeatTransferInputs, result: HeatTransferResult): string {
  const p = inputs.precision;
  const modeLabel = inputs.mode.charAt(0).toUpperCase() + inputs.mode.slice(1);
  const lines: string[] = [
    "Heat Transfer Calculator – Result",
    "=".repeat(45),
    "",
    `Transfer Mode : ${modeLabel}`,
    "",
  ];

  if (inputs.mode === "conduction") {
    const c = inputs.conduction;
    lines.push(`Thermal Conductivity (k) : ${c.k} ${c.kUnit}`);
    lines.push(`Surface Area (A)         : ${c.area} ${AREA_SHORT[c.areaUnit]}`);
    lines.push(`Temperature Difference   : ${c.deltaT} ${c.tempUnit}`);
    lines.push(`Material Thickness (L)   : ${c.thickness} ${THICKNESS_SHORT[c.thicknessUnit]}`);
  } else if (inputs.mode === "convection") {
    const c = inputs.convection;
    lines.push(`Heat Transfer Coeff (h)  : ${c.h} ${c.hUnit}`);
    lines.push(`Surface Area (A)         : ${c.area} ${AREA_SHORT[c.areaUnit]}`);
    lines.push(`Temperature Difference   : ${c.deltaT} ${c.tempUnit}`);
  } else {
    const r = inputs.radiation;
    lines.push(`Emissivity (ε)           : ${r.emissivity}`);
    lines.push(`Surface Area (A)         : ${r.area} ${AREA_SHORT[r.areaUnit]}`);
    lines.push(`Surface Temperature (T₁) : ${r.T1} ${r.tempUnit}`);
    lines.push(`Surrounding Temp (T₂)    : ${r.T2} ${r.tempUnit}`);
  }

  lines.push("");
  lines.push(`Formula      : ${result.formula}`);
  lines.push(`Breakdown    : ${result.breakdown}`);
  lines.push("");
  lines.push(`Result (W)   : ${formatNum(result.Q_W, p)} W`);
  lines.push(`Result (kW)  : ${formatNum(result.Q_kW, p)} kW`);
  lines.push(`Result (BTU/hr): ${formatNum(result.Q_BTU, p)} BTU/hr`);
  lines.push(`Result (kcal/hr): ${formatNum(result.Q_kcal, p)} kcal/hr`);
  lines.push("");
  lines.push(`Interpretation: ${result.interpretation}`);
  lines.push("");
  lines.push("=".repeat(45));
  lines.push(`Generated: ${new Date().toLocaleString()}`);

  return lines.join("\n");
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
