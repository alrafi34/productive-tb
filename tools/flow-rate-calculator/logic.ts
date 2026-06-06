import {
  CalcMode,
  VolumeUnit,
  TimeUnit,
  DiameterUnit,
  VelocityUnit,
  AreaUnit,
  DensityUnit,
  FlowUnit,
  VolumeTimeInputs,
  PipeVelocityInputs,
  AreaVelocityInputs,
  MassFlowInputs,
  FlowResult,
  HistoryEntry,
} from "./types";

// ── Unit conversion factors to SI ─────────────────────────────────────────────

export const VOLUME_TO_M3: Record<VolumeUnit, number> = {
  m3:  1,
  L:   0.001,
  gal: 0.00378541,
  ft3: 0.0283168,
  mL:  0.000001,
  cm3: 0.000001,
};

export const TIME_TO_S: Record<TimeUnit, number> = {
  s:   1,
  min: 60,
  hr:  3600,
};

export const DIAMETER_TO_M: Record<DiameterUnit, number> = {
  m:  1,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  ft: 0.3048,
};

export const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "ft/s": 0.3048,
  "cm/s": 0.01,
  "km/h": 0.277778,
  "mph":  0.44704,
};

export const AREA_TO_M2: Record<AreaUnit, number> = {
  m2:  1,
  cm2: 0.0001,
  mm2: 0.000001,
  ft2: 0.092903,
  in2: 0.00064516,
};

export const DENSITY_TO_KGM3: Record<DensityUnit, number> = {
  "kg/m3":  1,
  "g/cm3":  1000,
  "lb/ft3": 16.0185,
  "lb/gal": 119.826,
};

// Flow rate: m³/s → target
export const FLOW_FROM_M3S: Record<FlowUnit, number> = {
  "m3/s":   1,
  "m3/min": 60,
  "m3/hr":  3600,
  "L/s":    1000,
  "L/min":  60000,
  "L/hr":   3600000,
  "gal/min":15850.3,
  "gal/hr": 951019,
  "ft3/s":  35.3147,
  "ft3/min":2118.88,
  "CFM":    2118.88,
};

// Flow rate: target → m³/s
export const FLOW_TO_M3S: Record<FlowUnit, number> = {
  "m3/s":   1,
  "m3/min": 1 / 60,
  "m3/hr":  1 / 3600,
  "L/s":    0.001,
  "L/min":  0.001 / 60,
  "L/hr":   0.001 / 3600,
  "gal/min":6.30902e-5,
  "gal/hr": 1.05150e-6,
  "ft3/s":  0.0283168,
  "ft3/min":4.71947e-4,
  "CFM":    4.71947e-4,
};

// Mass flow: kg/s → target
export const MASS_FLOW_FROM_KGS: Record<string, number> = {
  "kg/s":   1,
  "kg/min": 60,
  "kg/hr":  3600,
  "lb/s":   2.20462,
  "lb/min": 132.277,
  "lb/hr":  7936.64,
  "g/s":    1000,
};

// ── Labels ────────────────────────────────────────────────────────────────────

export const VOLUME_LABELS: Record<VolumeUnit, string> = {
  m3:  "m³ (cubic meters)",
  L:   "L (liters)",
  gal: "gal (US gallons)",
  ft3: "ft³ (cubic feet)",
  mL:  "mL (milliliters)",
  cm3: "cm³ (cubic centimeters)",
};

export const TIME_LABELS: Record<TimeUnit, string> = {
  s:   "seconds",
  min: "minutes",
  hr:  "hours",
};

export const DIAMETER_LABELS: Record<DiameterUnit, string> = {
  m:  "m (meters)",
  cm: "cm (centimeters)",
  mm: "mm (millimeters)",
  in: "in (inches)",
  ft: "ft (feet)",
};

export const VELOCITY_LABELS: Record<VelocityUnit, string> = {
  "m/s":  "m/s",
  "ft/s": "ft/s",
  "cm/s": "cm/s",
  "km/h": "km/h",
  "mph":  "mph",
};

export const AREA_LABELS: Record<AreaUnit, string> = {
  m2:  "m² (square meters)",
  cm2: "cm² (square centimeters)",
  mm2: "mm² (square millimeters)",
  ft2: "ft² (square feet)",
  in2: "in² (square inches)",
};

export const DENSITY_LABELS: Record<DensityUnit, string> = {
  "kg/m3":  "kg/m³",
  "g/cm3":  "g/cm³",
  "lb/ft3": "lb/ft³",
  "lb/gal": "lb/gal",
};

export const FLOW_LABELS: Record<FlowUnit, string> = {
  "m3/s":   "m³/s",
  "m3/min": "m³/min",
  "m3/hr":  "m³/hr",
  "L/s":    "L/s",
  "L/min":  "L/min",
  "L/hr":   "L/hr",
  "gal/min":"gal/min (GPM)",
  "gal/hr": "gal/hr",
  "ft3/s":  "ft³/s",
  "ft3/min":"ft³/min",
  "CFM":    "CFM (ft³/min)",
};

// ── Fluid presets ─────────────────────────────────────────────────────────────

export const FLUID_PRESETS = [
  { label: "Water (20°C)",    density: "998",   densityUnit: "kg/m3" as DensityUnit },
  { label: "Seawater",        density: "1025",  densityUnit: "kg/m3" as DensityUnit },
  { label: "Air (20°C)",      density: "1.204", densityUnit: "kg/m3" as DensityUnit },
  { label: "Engine Oil",      density: "876",   densityUnit: "kg/m3" as DensityUnit },
  { label: "Gasoline",        density: "720",   densityUnit: "kg/m3" as DensityUnit },
  { label: "Mercury",         density: "13546", densityUnit: "kg/m3" as DensityUnit },
];

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(n: number, digits = 4): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-4) return n.toExponential(digits);
  return parseFloat(n.toPrecision(digits + 1)).toString();
}

export function fmtDisplay(n: number): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 0.0001) return n.toExponential(3);
  if (abs >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return parseFloat(n.toPrecision(5)).toString();
}

// ── Validation ────────────────────────────────────────────────────────────────

export function validatePositive(val: string, label: string): string | null {
  const n = parseFloat(val);
  if (val.trim() === "" || isNaN(n)) return `${label} is required.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── Build conversions list ────────────────────────────────────────────────────

function buildConversions(qSI: number): { label: string; value: string }[] {
  return [
    { label: "m³/s",    value: fmtDisplay(qSI) },
    { label: "m³/min",  value: fmtDisplay(qSI * 60) },
    { label: "m³/hr",   value: fmtDisplay(qSI * 3600) },
    { label: "L/s",     value: fmtDisplay(qSI * 1000) },
    { label: "L/min",   value: fmtDisplay(qSI * 60000) },
    { label: "L/hr",    value: fmtDisplay(qSI * 3600000) },
    { label: "gal/min", value: fmtDisplay(qSI * 15850.3) },
    { label: "ft³/s",   value: fmtDisplay(qSI * 35.3147) },
    { label: "CFM",     value: fmtDisplay(qSI * 2118.88) },
  ];
}

function buildMassConversions(mSI: number): { label: string; value: string }[] {
  return [
    { label: "kg/s",   value: fmtDisplay(mSI) },
    { label: "kg/min", value: fmtDisplay(mSI * 60) },
    { label: "kg/hr",  value: fmtDisplay(mSI * 3600) },
    { label: "lb/s",   value: fmtDisplay(mSI * 2.20462) },
    { label: "lb/min", value: fmtDisplay(mSI * 132.277) },
    { label: "lb/hr",  value: fmtDisplay(mSI * 7936.64) },
    { label: "g/s",    value: fmtDisplay(mSI * 1000) },
  ];
}

// ── Calculation functions ─────────────────────────────────────────────────────

export function calcVolumeTime(inputs: VolumeTimeInputs): FlowResult {
  const vSI = parseFloat(inputs.volume) * VOLUME_TO_M3[inputs.volumeUnit];
  const tSI = parseFloat(inputs.time) * TIME_TO_S[inputs.timeUnit];
  const qSI = vSI / tSI;

  const steps = [
    `Convert volume: ${inputs.volume} ${inputs.volumeUnit} = ${fmt(vSI)} m³`,
    `Convert time: ${inputs.time} ${inputs.timeUnit} = ${fmt(tSI)} s`,
    `Q = V / t`,
    `Q = ${fmt(vSI)} / ${fmt(tSI)}`,
    `Q = ${fmt(qSI)} m³/s`,
  ];

  return {
    qSI,
    conversions: buildConversions(qSI),
    formula: "Q = V / t",
    formulaSubstituted: `Q = ${fmt(vSI)} m³ / ${fmt(tSI)} s`,
    steps,
  };
}

export function calcPipeVelocity(inputs: PipeVelocityInputs): FlowResult {
  const dSI = parseFloat(inputs.diameter) * DIAMETER_TO_M[inputs.diameterUnit];
  const vSI = parseFloat(inputs.velocity) * VELOCITY_TO_MS[inputs.velocityUnit];
  const area = Math.PI * Math.pow(dSI, 2) / 4;
  const qSI = area * vSI;

  const steps = [
    `Convert diameter: ${inputs.diameter} ${inputs.diameterUnit} = ${fmt(dSI)} m`,
    `Convert velocity: ${inputs.velocity} ${inputs.velocityUnit} = ${fmt(vSI)} m/s`,
    `A = π × d² / 4`,
    `A = π × (${fmt(dSI)})² / 4 = ${fmt(area)} m²`,
    `Q = A × v`,
    `Q = ${fmt(area)} × ${fmt(vSI)}`,
    `Q = ${fmt(qSI)} m³/s`,
  ];

  return {
    qSI,
    conversions: buildConversions(qSI),
    formula: "Q = (π × d²/4) × v",
    formulaSubstituted: `Q = (π × ${fmt(dSI)}²/4) × ${fmt(vSI)}`,
    steps,
  };
}

export function calcAreaVelocity(inputs: AreaVelocityInputs): FlowResult {
  const aSI = parseFloat(inputs.area) * AREA_TO_M2[inputs.areaUnit];
  const vSI = parseFloat(inputs.velocity) * VELOCITY_TO_MS[inputs.velocityUnit];
  const qSI = aSI * vSI;

  const steps = [
    `Convert area: ${inputs.area} ${inputs.areaUnit} = ${fmt(aSI)} m²`,
    `Convert velocity: ${inputs.velocity} ${inputs.velocityUnit} = ${fmt(vSI)} m/s`,
    `Q = A × v`,
    `Q = ${fmt(aSI)} × ${fmt(vSI)}`,
    `Q = ${fmt(qSI)} m³/s`,
  ];

  return {
    qSI,
    conversions: buildConversions(qSI),
    formula: "Q = A × v",
    formulaSubstituted: `Q = ${fmt(aSI)} m² × ${fmt(vSI)} m/s`,
    steps,
  };
}

export function calcMassFlow(inputs: MassFlowInputs): FlowResult {
  const qSI = parseFloat(inputs.flowRate) * FLOW_TO_M3S[inputs.flowRateUnit];
  const rhoSI = parseFloat(inputs.density) * DENSITY_TO_KGM3[inputs.densityUnit];
  const mSI = rhoSI * qSI;

  const steps = [
    `Convert flow rate: ${inputs.flowRate} ${inputs.flowRateUnit} = ${fmt(qSI)} m³/s`,
    `Convert density: ${inputs.density} ${inputs.densityUnit} = ${fmt(rhoSI)} kg/m³`,
    `ṁ = ρ × Q`,
    `ṁ = ${fmt(rhoSI)} × ${fmt(qSI)}`,
    `ṁ = ${fmt(mSI)} kg/s`,
  ];

  return {
    qSI,
    massFlowSI: mSI,
    conversions: buildConversions(qSI),
    massConversions: buildMassConversions(mSI),
    formula: "ṁ = ρ × Q",
    formulaSubstituted: `ṁ = ${fmt(rhoSI)} kg/m³ × ${fmt(qSI)} m³/s`,
    steps,
  };
}

// ── History ───────────────────────────────────────────────────────────────────

const HISTORY_KEY = "flow-rate-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(mode: CalcMode, result: FlowResult, label: string): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      mode,
      timestamp: Date.now(),
      result,
      label,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.splice(MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // localStorage unavailable
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
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

export function exportToText(mode: CalcMode, result: FlowResult, label: string): string {
  const lines = [
    "Flow Rate Calculator – Calculation Report",
    "==========================================",
    `Mode: ${label}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "Formula:",
    result.formula,
    "",
    "Substituted:",
    result.formulaSubstituted,
    "",
    "Steps:",
    ...result.steps,
    "",
    "Volumetric Flow Rate Conversions:",
    ...result.conversions.map((c) => `  ${c.label}: ${c.value}`),
  ];

  if (result.massConversions) {
    lines.push("", "Mass Flow Rate Conversions:");
    result.massConversions.forEach((c) => lines.push(`  ${c.label}: ${c.value}`));
  }

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
