import {
  BernoulliInputs,
  BernoulliResult,
  HistoryEntry,
  PressureUnit,
  VelocityUnit,
  HeightUnit,
  DensityUnit,
  SolveFor,
} from "./types";

// ── Unit conversion factors to SI ──────────────────────────────────────────

const PRESSURE_TO_PA: Record<PressureUnit, number> = {
  Pa:  1,
  kPa: 1000,
  bar: 100000,
  psi: 6894.757,
};

const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "ft/s": 0.3048,
};

const HEIGHT_TO_M: Record<HeightUnit, number> = {
  m:  1,
  ft: 0.3048,
};

const DENSITY_TO_KGM3: Record<DensityUnit, number> = {
  "kg/m3":  1,
  "lb/ft3": 16.0185,
};

// ── Pressure back-conversion from Pa ───────────────────────────────────────

const PA_TO_UNIT: Record<PressureUnit, number> = {
  Pa:  1,
  kPa: 0.001,
  bar: 0.00001,
  psi: 0.000145038,
};

const VELOCITY_FROM_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "ft/s": 3.28084,
};

const HEIGHT_FROM_M: Record<HeightUnit, number> = {
  m:  1,
  ft: 3.28084,
};

const DENSITY_FROM_KGM3: Record<DensityUnit, number> = {
  "kg/m3":  1,
  "lb/ft3": 0.0624279,
};

// ── Fluid presets ──────────────────────────────────────────────────────────

export const FLUID_PRESETS = [
  { label: "Water",    density: "1000",  densityUnit: "kg/m3" as DensityUnit },
  { label: "Air",      density: "1.225", densityUnit: "kg/m3" as DensityUnit },
  { label: "Oil",      density: "850",   densityUnit: "kg/m3" as DensityUnit },
  { label: "Gasoline", density: "720",   densityUnit: "kg/m3" as DensityUnit },
  { label: "Seawater", density: "1025",  densityUnit: "kg/m3" as DensityUnit },
];

// ── Solve-for labels ───────────────────────────────────────────────────────

export const SOLVE_FOR_LABELS: Record<SolveFor, string> = {
  P1: "Pressure 1 (P₁)",
  P2: "Pressure 2 (P₂)",
  V1: "Velocity 1 (V₁)",
  V2: "Velocity 2 (V₂)",
  h1: "Height 1 (h₁)",
  h2: "Height 2 (h₂)",
};

// ── Validation ─────────────────────────────────────────────────────────────

export function validateNumber(val: string, label: string): string | null {
  if (val.trim() === "") return `${label} is required.`;
  const n = parseFloat(val);
  if (isNaN(n)) return `${label} must be a valid number.`;
  return null;
}

export function validatePositive(val: string, label: string): string | null {
  const base = validateNumber(val, label);
  if (base) return base;
  if (parseFloat(val) < 0) return `${label} cannot be negative.`;
  return null;
}

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── Format number ──────────────────────────────────────────────────────────

export function fmt(n: number, decimals: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-4 && n !== 0)) {
    return n.toExponential(decimals);
  }
  return n.toFixed(decimals);
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: BernoulliInputs): BernoulliResult {
  const { solveFor } = inputs;

  // Convert all inputs to SI
  const P1_si  = parseFloat(inputs.P1)      * PRESSURE_TO_PA[inputs.P1Unit];
  const P2_si  = parseFloat(inputs.P2)      * PRESSURE_TO_PA[inputs.P2Unit];
  const V1_si  = parseFloat(inputs.V1)      * VELOCITY_TO_MS[inputs.V1Unit];
  const V2_si  = parseFloat(inputs.V2)      * VELOCITY_TO_MS[inputs.V2Unit];
  const h1_si  = parseFloat(inputs.h1)      * HEIGHT_TO_M[inputs.h1Unit];
  const h2_si  = parseFloat(inputs.h2)      * HEIGHT_TO_M[inputs.h2Unit];
  const rho    = parseFloat(inputs.density) * DENSITY_TO_KGM3[inputs.densityUnit];
  const g      = parseFloat(inputs.gravity);

  // Bernoulli: P1 + 0.5ρV1² + ρgh1 = P2 + 0.5ρV2² + ρgh2
  // LHS = P1 + 0.5ρV1² + ρgh1
  // RHS = P2 + 0.5ρV2² + ρgh2

  let resultSI: number;
  let unit: string;
  let label: string;
  let formulaRearranged: string;

  switch (solveFor) {
    case "P1": {
      resultSI = P2_si + 0.5 * rho * (V2_si ** 2 - V1_si ** 2) + rho * g * (h2_si - h1_si);
      const val = resultSI * PA_TO_UNIT[inputs.P1Unit];
      unit = inputs.P1Unit;
      label = "Pressure 1 (P₁)";
      formulaRearranged = "P₁ = P₂ + ½ρ(V₂² − V₁²) + ρg(h₂ − h₁)";
      return buildResult(inputs, val, unit, label, formulaRearranged, resultSI, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g);
    }
    case "P2": {
      resultSI = P1_si + 0.5 * rho * (V1_si ** 2 - V2_si ** 2) + rho * g * (h1_si - h2_si);
      const val = resultSI * PA_TO_UNIT[inputs.P2Unit];
      unit = inputs.P2Unit;
      label = "Pressure 2 (P₂)";
      formulaRearranged = "P₂ = P₁ + ½ρ(V₁² − V₂²) + ρg(h₁ − h₂)";
      return buildResult(inputs, val, unit, label, formulaRearranged, resultSI, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g);
    }
    case "V1": {
      const inner = (2 / rho) * (P2_si - P1_si + 0.5 * rho * V2_si ** 2 + rho * g * (h2_si - h1_si));
      if (inner < 0) throw new Error("Cannot solve V₁: result would be imaginary (check inputs).");
      resultSI = Math.sqrt(inner);
      const val = resultSI * VELOCITY_FROM_MS[inputs.V1Unit];
      unit = inputs.V1Unit;
      label = "Velocity 1 (V₁)";
      formulaRearranged = "V₁ = √[ (2/ρ)(P₂ − P₁ + ½ρV₂² + ρg(h₂ − h₁)) ]";
      return buildResult(inputs, val, unit, label, formulaRearranged, resultSI, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g);
    }
    case "V2": {
      const inner = (2 / rho) * (P1_si - P2_si + 0.5 * rho * V1_si ** 2 + rho * g * (h1_si - h2_si));
      if (inner < 0) throw new Error("Cannot solve V₂: result would be imaginary (check inputs).");
      resultSI = Math.sqrt(inner);
      const val = resultSI * VELOCITY_FROM_MS[inputs.V2Unit];
      unit = inputs.V2Unit;
      label = "Velocity 2 (V₂)";
      formulaRearranged = "V₂ = √[ (2/ρ)(P₁ − P₂ + ½ρV₁² + ρg(h₁ − h₂)) ]";
      return buildResult(inputs, val, unit, label, formulaRearranged, resultSI, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g);
    }
    case "h1": {
      resultSI = (P2_si - P1_si + 0.5 * rho * (V2_si ** 2 - V1_si ** 2) + rho * g * h2_si) / (rho * g);
      const val = resultSI * HEIGHT_FROM_M[inputs.h1Unit];
      unit = inputs.h1Unit;
      label = "Height 1 (h₁)";
      formulaRearranged = "h₁ = [ P₂ − P₁ + ½ρ(V₂² − V₁²) + ρgh₂ ] / (ρg)";
      return buildResult(inputs, val, unit, label, formulaRearranged, resultSI, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g);
    }
    case "h2": {
      resultSI = (P1_si - P2_si + 0.5 * rho * (V1_si ** 2 - V2_si ** 2) + rho * g * h1_si) / (rho * g);
      const val = resultSI * HEIGHT_FROM_M[inputs.h2Unit];
      unit = inputs.h2Unit;
      label = "Height 2 (h₂)";
      formulaRearranged = "h₂ = [ P₁ − P₂ + ½ρ(V₁² − V₂²) + ρgh₁ ] / (ρg)";
      return buildResult(inputs, val, unit, label, formulaRearranged, resultSI, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g);
    }
  }
}

function buildResult(
  inputs: BernoulliInputs,
  value: number,
  unit: string,
  label: string,
  formulaRearranged: string,
  resultSI: number,
  P1_si: number,
  P2_si: number,
  V1_si: number,
  V2_si: number,
  h1_si: number,
  h2_si: number,
  rho: number,
  g: number,
): BernoulliResult {
  const { solveFor, precision } = inputs;

  // Use actual SI values for the solved variable
  const actualP1 = solveFor === "P1" ? resultSI : P1_si;
  const actualP2 = solveFor === "P2" ? resultSI : P2_si;
  const actualV1 = solveFor === "V1" ? resultSI : V1_si;
  const actualV2 = solveFor === "V2" ? resultSI : V2_si;
  const actualH1 = solveFor === "h1" ? resultSI : h1_si;
  const actualH2 = solveFor === "h2" ? resultSI : h2_si;

  const ke1 = 0.5 * rho * actualV1 ** 2;
  const ke2 = 0.5 * rho * actualV2 ** 2;
  const pe1 = rho * g * actualH1;
  const pe2 = rho * g * actualH2;
  const total1 = actualP1 + ke1 + pe1;
  const total2 = actualP2 + ke2 + pe2;

  // Build substituted formula string
  const formulaSubstituted = buildSubstituted(solveFor, P1_si, P2_si, V1_si, V2_si, h1_si, h2_si, rho, g, precision);
  const formulaResult = `${fmt(value, precision)} ${unit}`;

  return {
    value,
    unit,
    label,
    P1_si: actualP1,
    P2_si: actualP2,
    V1_si: actualV1,
    V2_si: actualV2,
    h1_si: actualH1,
    h2_si: actualH2,
    density_si: rho,
    gravity_si: g,
    formulaGeneral: "P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂",
    formulaRearranged,
    formulaSubstituted,
    formulaResult,
    kineticEnergy1: ke1,
    kineticEnergy2: ke2,
    potentialEnergy1: pe1,
    potentialEnergy2: pe2,
    totalEnergy1: total1,
    totalEnergy2: total2,
  };
}

function buildSubstituted(
  solveFor: SolveFor,
  P1: number, P2: number, V1: number, V2: number, h1: number, h2: number,
  rho: number, g: number, precision: number,
): string {
  const f = (n: number) => fmt(n, precision);
  switch (solveFor) {
    case "P1":
      return `${f(P2)} + 0.5×${f(rho)}×(${f(V2)}²−${f(V1)}²) + ${f(rho)}×${f(g)}×(${f(h2)}−${f(h1)})`;
    case "P2":
      return `${f(P1)} + 0.5×${f(rho)}×(${f(V1)}²−${f(V2)}²) + ${f(rho)}×${f(g)}×(${f(h1)}−${f(h2)})`;
    case "V1":
      return `√[(2/${f(rho)})×(${f(P2)}−${f(P1)}+0.5×${f(rho)}×${f(V2)}²+${f(rho)}×${f(g)}×(${f(h2)}−${f(h1)}))]`;
    case "V2":
      return `√[(2/${f(rho)})×(${f(P1)}−${f(P2)}+0.5×${f(rho)}×${f(V1)}²+${f(rho)}×${f(g)}×(${f(h1)}−${f(h2)}))]`;
    case "h1":
      return `[${f(P2)}−${f(P1)}+0.5×${f(rho)}×(${f(V2)}²−${f(V1)}²)+${f(rho)}×${f(g)}×${f(h2)}]/(${f(rho)}×${f(g)})`;
    case "h2":
      return `[${f(P1)}−${f(P2)}+0.5×${f(rho)}×(${f(V1)}²−${f(V2)}²)+${f(rho)}×${f(g)}×${f(h1)}]/(${f(rho)}×${f(g)})`;
  }
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "bernoulli-calc-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: BernoulliInputs, result: BernoulliResult): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };
  const existing = getHistory();
  const updated = [entry, ...existing].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: BernoulliInputs, result: BernoulliResult): string {
  const lines = [
    "Bernoulli Equation Calculator — Result",
    "=".repeat(40),
    `Solving for: ${result.label}`,
    "",
    "Inputs (SI):",
    `  P₁ = ${fmt(result.P1_si, 4)} Pa`,
    `  P₂ = ${fmt(result.P2_si, 4)} Pa`,
    `  V₁ = ${fmt(result.V1_si, 4)} m/s`,
    `  V₂ = ${fmt(result.V2_si, 4)} m/s`,
    `  h₁ = ${fmt(result.h1_si, 4)} m`,
    `  h₂ = ${fmt(result.h2_si, 4)} m`,
    `  ρ  = ${fmt(result.density_si, 4)} kg/m³`,
    `  g  = ${fmt(result.gravity_si, 4)} m/s²`,
    "",
    "Formula:",
    `  ${result.formulaGeneral}`,
    `  Rearranged: ${result.formulaRearranged}`,
    `  Substituted: ${result.formulaSubstituted}`,
    "",
    `Result: ${result.label} = ${result.formulaResult}`,
    "",
    "Energy Terms (Pa):",
    `  Kinetic Energy 1 (½ρV₁²) = ${fmt(result.kineticEnergy1, 2)} Pa`,
    `  Kinetic Energy 2 (½ρV₂²) = ${fmt(result.kineticEnergy2, 2)} Pa`,
    `  Potential Energy 1 (ρgh₁) = ${fmt(result.potentialEnergy1, 2)} Pa`,
    `  Potential Energy 2 (ρgh₂) = ${fmt(result.potentialEnergy2, 2)} Pa`,
    `  Total Energy 1 = ${fmt(result.totalEnergy1, 2)} Pa`,
    `  Total Energy 2 = ${fmt(result.totalEnergy2, 2)} Pa`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
  ];
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
