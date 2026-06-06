import {
  SpecificHeatInputs,
  SpecificHeatResult,
  HistoryEntry,
  MassUnit,
  HeatUnit,
  TempUnit,
} from "./types";

// ── Material presets (J/kg°C) ────────────────────────────────────────────────
export const MATERIAL_PRESETS: { label: string; value: number; unit: HeatUnit }[] = [
  { label: "Water",     value: 4186,  unit: "J/kgC" },
  { label: "Aluminum",  value: 900,   unit: "J/kgC" },
  { label: "Copper",    value: 385,   unit: "J/kgC" },
  { label: "Iron",      value: 450,   unit: "J/kgC" },
  { label: "Steel",     value: 490,   unit: "J/kgC" },
  { label: "Air",       value: 1005,  unit: "J/kgC" },
  { label: "Gold",      value: 129,   unit: "J/kgC" },
  { label: "Silver",    value: 235,   unit: "J/kgC" },
  { label: "Ice",       value: 2090,  unit: "J/kgC" },
  { label: "Glass",     value: 840,   unit: "J/kgC" },
];

// ── Unit conversion factors ──────────────────────────────────────────────────
export function toKg(value: number, unit: MassUnit): number {
  switch (unit) {
    case "kg": return value;
    case "g":  return value / 1000;
    case "lb": return value * 0.453592;
  }
}

export function toJkgC(value: number, unit: HeatUnit): number {
  switch (unit) {
    case "J/kgC":   return value;
    case "kJ/kgC":  return value * 1000;
    case "cal/gC":  return value * 4186;
  }
}

export function toCelsius(value: number, unit: TempUnit): number {
  switch (unit) {
    case "C": return value;
    case "F": return (value - 32) * 5 / 9;
    case "K": return value - 273.15;
  }
}

// ── Validation ───────────────────────────────────────────────────────────────
export function validatePositive(val: string, label: string): string | null {
  const n = parseFloat(val);
  if (val.trim() === "" || isNaN(n)) return `${label} is required.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

export function validateNonNegative(val: string, label: string): string | null {
  const n = parseFloat(val);
  if (val.trim() === "" || isNaN(n)) return `${label} is required.`;
  if (n < 0) return `${label} cannot be negative.`;
  return null;
}

export function validateTemp(val: string, label: string, unit: TempUnit): string | null {
  const n = parseFloat(val);
  if (val.trim() === "" || isNaN(n)) return `${label} is required.`;
  if (unit === "K" && n < 0) return `${label} cannot be negative in Kelvin.`;
  return null;
}

// ── Core calculation ─────────────────────────────────────────────────────────
export function calculate(inputs: SpecificHeatInputs): SpecificHeatResult {
  const { mode, massUnit, heatUnit, tempUnit, precision } = inputs;

  const massRaw = parseFloat(inputs.mass);
  const cRaw    = parseFloat(inputs.specificHeat);
  const t1Raw   = parseFloat(inputs.initialTemp);
  const t2Raw   = parseFloat(inputs.finalTemp);
  const qRaw    = parseFloat(inputs.heatEnergy);

  // Convert to SI
  const m_kg  = toKg(massRaw, massUnit);
  const c_SI  = toJkgC(cRaw, heatUnit);
  const t1_C  = toCelsius(t1Raw, tempUnit);
  const t2_C  = toCelsius(t2Raw, tempUnit);
  const dT    = t2_C - t1_C;

  let value: number;
  let unit: string;
  let label: string;
  let formula: string;
  let breakdown: string;
  let steps: string[];

  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: precision ?? 2 });

  if (mode === "Q") {
    value = m_kg * c_SI * dT;
    unit  = "J";
    label = "Heat Energy (Q)";
    formula = "Q = m × c × ΔT";
    breakdown = `Q = ${fmt(m_kg)} kg × ${fmt(c_SI)} J/kg°C × ${fmt(dT)}°C`;
    steps = [
      `Given:`,
      `  Mass (m) = ${massRaw} ${massUnit} = ${fmt(m_kg)} kg`,
      `  Specific Heat (c) = ${cRaw} ${heatUnit} = ${fmt(c_SI)} J/kg°C`,
      `  Initial Temp (T₁) = ${t1Raw} ${tempUnit} = ${fmt(t1_C)}°C`,
      `  Final Temp (T₂) = ${t2Raw} ${tempUnit} = ${fmt(t2_C)}°C`,
      ``,
      `Step 1: Calculate ΔT`,
      `  ΔT = T₂ − T₁ = ${fmt(t2_C)} − ${fmt(t1_C)} = ${fmt(dT)}°C`,
      ``,
      `Step 2: Apply Q = m × c × ΔT`,
      `  Q = ${fmt(m_kg)} × ${fmt(c_SI)} × ${fmt(dT)}`,
      `  Q = ${fmt(value)} J`,
    ];
  } else if (mode === "m") {
    const dT_SI = dT;
    value = qRaw / (c_SI * dT_SI);
    unit  = "kg";
    label = "Mass (m)";
    formula = "m = Q / (c × ΔT)";
    breakdown = `m = ${fmt(qRaw)} J / (${fmt(c_SI)} × ${fmt(dT_SI)})`;
    steps = [
      `Given:`,
      `  Heat Energy (Q) = ${fmt(qRaw)} J`,
      `  Specific Heat (c) = ${cRaw} ${heatUnit} = ${fmt(c_SI)} J/kg°C`,
      `  Initial Temp (T₁) = ${t1Raw} ${tempUnit} = ${fmt(t1_C)}°C`,
      `  Final Temp (T₂) = ${t2Raw} ${tempUnit} = ${fmt(t2_C)}°C`,
      ``,
      `Step 1: Calculate ΔT`,
      `  ΔT = T₂ − T₁ = ${fmt(t2_C)} − ${fmt(t1_C)} = ${fmt(dT_SI)}°C`,
      ``,
      `Step 2: Apply m = Q / (c × ΔT)`,
      `  m = ${fmt(qRaw)} / (${fmt(c_SI)} × ${fmt(dT_SI)})`,
      `  m = ${fmt(value)} kg`,
    ];
  } else if (mode === "c") {
    value = qRaw / (m_kg * dT);
    unit  = "J/kg°C";
    label = "Specific Heat (c)";
    formula = "c = Q / (m × ΔT)";
    breakdown = `c = ${fmt(qRaw)} J / (${fmt(m_kg)} kg × ${fmt(dT)}°C)`;
    steps = [
      `Given:`,
      `  Heat Energy (Q) = ${fmt(qRaw)} J`,
      `  Mass (m) = ${massRaw} ${massUnit} = ${fmt(m_kg)} kg`,
      `  Initial Temp (T₁) = ${t1Raw} ${tempUnit} = ${fmt(t1_C)}°C`,
      `  Final Temp (T₂) = ${t2Raw} ${tempUnit} = ${fmt(t2_C)}°C`,
      ``,
      `Step 1: Calculate ΔT`,
      `  ΔT = T₂ − T₁ = ${fmt(t2_C)} − ${fmt(t1_C)} = ${fmt(dT)}°C`,
      ``,
      `Step 2: Apply c = Q / (m × ΔT)`,
      `  c = ${fmt(qRaw)} / (${fmt(m_kg)} × ${fmt(dT)})`,
      `  c = ${fmt(value)} J/kg°C`,
    ];
  } else {
    // deltaT
    value = qRaw / (m_kg * c_SI);
    unit  = "°C";
    label = "Temperature Change (ΔT)";
    formula = "ΔT = Q / (m × c)";
    breakdown = `ΔT = ${fmt(qRaw)} J / (${fmt(m_kg)} kg × ${fmt(c_SI)} J/kg°C)`;
    steps = [
      `Given:`,
      `  Heat Energy (Q) = ${fmt(qRaw)} J`,
      `  Mass (m) = ${massRaw} ${massUnit} = ${fmt(m_kg)} kg`,
      `  Specific Heat (c) = ${cRaw} ${heatUnit} = ${fmt(c_SI)} J/kg°C`,
      ``,
      `Step 1: Apply ΔT = Q / (m × c)`,
      `  ΔT = ${fmt(qRaw)} / (${fmt(m_kg)} × ${fmt(c_SI)})`,
      `  ΔT = ${fmt(value)}°C`,
    ];
  }

  // Always compute Q in J for conversions
  let Q_J: number;
  if (mode === "Q") {
    Q_J = value;
  } else if (mode === "m") {
    Q_J = qRaw;
  } else if (mode === "c") {
    Q_J = qRaw;
  } else {
    Q_J = qRaw;
  }

  const Q_kJ   = Q_J / 1000;
  const Q_kcal = Q_J / 4186;
  const Q_BTU  = Q_J / 1055.06;

  const interpretation = buildInterpretation(mode, value, unit, dT, inputs);

  return {
    value,
    unit,
    label,
    Q_J,
    Q_kJ,
    Q_kcal,
    Q_BTU,
    deltaT: dT,
    formula,
    breakdown,
    steps,
    interpretation,
  };
}

function buildInterpretation(
  mode: string,
  value: number,
  unit: string,
  dT: number,
  inputs: SpecificHeatInputs
): string {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  if (mode === "Q") {
    const direction = dT >= 0 ? "raise" : "lower";
    return `${fmt(Math.abs(value))} J of heat energy is required to ${direction} the temperature of ${inputs.mass} ${inputs.massUnit} of ${inputs.material || "the material"} by ${fmt(Math.abs(dT))}°C.`;
  }
  if (mode === "m") {
    return `A mass of ${fmt(value)} kg is needed to absorb or release the specified heat energy with the given temperature change.`;
  }
  if (mode === "c") {
    return `The specific heat capacity of the material is ${fmt(value)} J/kg°C.`;
  }
  return `The temperature will change by ${fmt(value)}°C when the specified heat energy is applied.`;
}

// ── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── LocalStorage history ─────────────────────────────────────────────────────
const HISTORY_KEY = "specific-heat-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: SpecificHeatInputs, result: SpecificHeatResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {
    // ignore
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

// ── Export ───────────────────────────────────────────────────────────────────
export function exportToText(inputs: SpecificHeatInputs, result: SpecificHeatResult): string {
  const lines = [
    "Specific Heat Calculator – Calculation Report",
    "=".repeat(50),
    `Date: ${new Date().toLocaleString()}`,
    "",
    "Inputs:",
    `  Calculation Mode: ${inputs.mode}`,
    `  Mass: ${inputs.mass} ${inputs.massUnit}`,
    `  Specific Heat: ${inputs.specificHeat} ${inputs.heatUnit}`,
    `  Initial Temperature: ${inputs.initialTemp} ${inputs.tempUnit}`,
    `  Final Temperature: ${inputs.finalTemp} ${inputs.tempUnit}`,
    inputs.mode !== "Q" ? `  Heat Energy: ${inputs.heatEnergy} J` : "",
    "",
    "Result:",
    `  ${result.label}: ${result.value.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${result.unit}`,
    "",
    "Conversions:",
    `  Heat Energy: ${result.Q_J.toLocaleString("en-US", { maximumFractionDigits: 4 })} J`,
    `  Heat Energy: ${result.Q_kJ.toLocaleString("en-US", { maximumFractionDigits: 4 })} kJ`,
    `  Heat Energy: ${result.Q_kcal.toLocaleString("en-US", { maximumFractionDigits: 4 })} kcal`,
    `  Heat Energy: ${result.Q_BTU.toLocaleString("en-US", { maximumFractionDigits: 4 })} BTU`,
    "",
    "Formula:",
    `  ${result.formula}`,
    `  ${result.breakdown}`,
    "",
    "Interpretation:",
    `  ${result.interpretation}`,
  ];
  return lines.filter((l) => l !== undefined).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatNum(n: number, precision: number = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: precision });
}
