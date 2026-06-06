import {
  NaturalFrequencyInputs,
  NaturalFrequencyResult,
  HistoryEntry,
  MassUnit,
  SpringKUnit,
  LengthUnit,
  BeamLengthUnit,
  YoungModulusUnit,
  MomentUnit,
  DensityUnit,
  TorsionalKUnit,
  MomentOfInertiaUnit,
} from "./types";

// ── Unit conversions ───────────────────────────────────────────────────────

export const MASS_TO_KG: Record<MassUnit, number> = {
  kg: 1,
  g:  0.001,
  lb: 0.453592,
};

export const SPRING_K_TO_NM: Record<SpringKUnit, number> = {
  "N/m":   1,
  "kN/m":  1000,
  "lb/in": 175.1268,
};

export const LENGTH_TO_M: Record<LengthUnit, number> = {
  m:  1,
  cm: 0.01,
  ft: 0.3048,
  in: 0.0254,
};

export const BEAM_LENGTH_TO_M: Record<BeamLengthUnit, number> = {
  m:  1,
  cm: 0.01,
  ft: 0.3048,
  in: 0.0254,
};

export const YOUNG_TO_PA: Record<YoungModulusUnit, number> = {
  GPa: 1e9,
  MPa: 1e6,
  psi: 6894.76,
};

export const MOMENT_TO_M4: Record<MomentUnit, number> = {
  m4:  1,
  cm4: 1e-8,
  in4: 4.16231e-7,
};

export const DENSITY_TO_KGM3: Record<DensityUnit, number> = {
  "kg/m3":  1,
  "lb/ft3": 16.0185,
};

export const TORSIONAL_K_TO_NM_RAD: Record<TorsionalKUnit, number> = {
  "N·m/rad":   1,
  "lb·in/rad": 0.112985,
};

export const MOI_TO_KGM2: Record<MomentOfInertiaUnit, number> = {
  "kg·m2":  1,
  "lb·in2": 2.9264e-4,
};

// ── Labels ─────────────────────────────────────────────────────────────────

export const MASS_LABELS: Record<MassUnit, string> = {
  kg: "kg (Kilogram)",
  g:  "g (Gram)",
  lb: "lb (Pound)",
};

export const SPRING_K_LABELS: Record<SpringKUnit, string> = {
  "N/m":   "N/m (Newton per meter)",
  "kN/m":  "kN/m (Kilonewton per meter)",
  "lb/in": "lb/in (Pound per inch)",
};

export const LENGTH_LABELS: Record<LengthUnit, string> = {
  m:  "m (Meter)",
  cm: "cm (Centimeter)",
  ft: "ft (Foot)",
  in: "in (Inch)",
};

export const BEAM_LENGTH_LABELS: Record<BeamLengthUnit, string> = {
  m:  "m (Meter)",
  cm: "cm (Centimeter)",
  ft: "ft (Foot)",
  in: "in (Inch)",
};

export const YOUNG_LABELS: Record<YoungModulusUnit, string> = {
  GPa: "GPa (Gigapascal)",
  MPa: "MPa (Megapascal)",
  psi: "psi (Pounds per sq. inch)",
};

export const MOMENT_LABELS: Record<MomentUnit, string> = {
  m4:  "m⁴",
  cm4: "cm⁴",
  in4: "in⁴",
};

export const DENSITY_LABELS: Record<DensityUnit, string> = {
  "kg/m3":  "kg/m³",
  "lb/ft3": "lb/ft³",
};

export const TORSIONAL_K_LABELS: Record<TorsionalKUnit, string> = {
  "N·m/rad":   "N·m/rad",
  "lb·in/rad": "lb·in/rad",
};

export const MOI_LABELS: Record<MomentOfInertiaUnit, string> = {
  "kg·m2":  "kg·m²",
  "lb·in2": "lb·in²",
};

// ── Validation ─────────────────────────────────────────────────────────────

export function validatePositive(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Please enter ${label}.`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${label} must be a valid number.`;
  if (num <= 0) return `${label} must be greater than zero.`;
  return null;
}

// ── Core calculations ──────────────────────────────────────────────────────

export function calculateSpringMass(inputs: NaturalFrequencyInputs): NaturalFrequencyResult | null {
  const { mass, massUnit, springConstant, springKUnit } = inputs.springMass;
  const mErr = validatePositive(mass, "mass");
  const kErr = validatePositive(springConstant, "spring constant");
  if (mErr || kErr) return null;

  const mKg = parseFloat(mass) * MASS_TO_KG[massUnit];
  const kNm = parseFloat(springConstant) * SPRING_K_TO_NM[springKUnit];

  const omega = Math.sqrt(kNm / mKg);
  const freq  = omega / (2 * Math.PI);
  const period = 1 / freq;

  return {
    frequencyHz: freq,
    angularFrequencyRad: omega,
    periodSeconds: period,
    formula: "f = (1 / 2π) × √(k / m)",
    stepByStep: [
      `Convert mass: ${mass} ${massUnit} = ${formatNum(mKg, 6)} kg`,
      `Convert spring constant: ${springConstant} ${springKUnit} = ${formatNum(kNm, 4)} N/m`,
      `Calculate k/m: ${formatNum(kNm, 4)} / ${formatNum(mKg, 6)} = ${formatNum(kNm / mKg, 4)}`,
      `Angular frequency ω = √(k/m) = √(${formatNum(kNm / mKg, 4)}) = ${formatNum(omega, 6)} rad/s`,
      `Natural frequency f = ω / 2π = ${formatNum(omega, 6)} / ${formatNum(2 * Math.PI, 6)} = ${formatNum(freq, inputs.precision)} Hz`,
    ],
  };
}

export function calculatePendulum(inputs: NaturalFrequencyInputs): NaturalFrequencyResult | null {
  const { length, lengthUnit } = inputs.pendulum;
  const lErr = validatePositive(length, "pendulum length");
  if (lErr) return null;

  const g = 9.80665; // standard gravity m/s²
  const lM = parseFloat(length) * LENGTH_TO_M[lengthUnit];

  const omega = Math.sqrt(g / lM);
  const freq  = omega / (2 * Math.PI);
  const period = 1 / freq;

  return {
    frequencyHz: freq,
    angularFrequencyRad: omega,
    periodSeconds: period,
    formula: "f = (1 / 2π) × √(g / L)",
    stepByStep: [
      `Convert length: ${length} ${lengthUnit} = ${formatNum(lM, 6)} m`,
      `Standard gravity: g = 9.80665 m/s²`,
      `Calculate g/L: ${g} / ${formatNum(lM, 6)} = ${formatNum(g / lM, 4)}`,
      `Angular frequency ω = √(g/L) = √(${formatNum(g / lM, 4)}) = ${formatNum(omega, 6)} rad/s`,
      `Natural frequency f = ω / 2π = ${formatNum(omega, 6)} / ${formatNum(2 * Math.PI, 6)} = ${formatNum(freq, inputs.precision)} Hz`,
    ],
  };
}

export function calculateBeam(inputs: NaturalFrequencyInputs): NaturalFrequencyResult | null {
  const { beamLength, beamLengthUnit, youngModulus, youngModulusUnit, momentOfInertia, momentUnit, density, densityUnit, crossSectionArea } = inputs.beam;
  const lErr = validatePositive(beamLength, "beam length");
  const eErr = validatePositive(youngModulus, "Young's modulus");
  const iErr = validatePositive(momentOfInertia, "moment of inertia");
  const rhoErr = validatePositive(density, "density");
  const aErr = validatePositive(crossSectionArea, "cross-section area");
  if (lErr || eErr || iErr || rhoErr || aErr) return null;

  const L   = parseFloat(beamLength) * BEAM_LENGTH_TO_M[beamLengthUnit];
  const E   = parseFloat(youngModulus) * YOUNG_TO_PA[youngModulusUnit];
  const I   = parseFloat(momentOfInertia) * MOMENT_TO_M4[momentUnit];
  const rho = parseFloat(density) * DENSITY_TO_KGM3[densityUnit];
  const A   = parseFloat(crossSectionArea); // already in m²

  // Simply supported beam, first mode: ω = (π²/L²) × √(EI / ρA)
  const beta = Math.PI / L; // β₁L = π for simply supported
  const omega = (beta * beta) * Math.sqrt((E * I) / (rho * A));
  const freq  = omega / (2 * Math.PI);
  const period = 1 / freq;

  return {
    frequencyHz: freq,
    angularFrequencyRad: omega,
    periodSeconds: period,
    formula: "f = (π² / 2πL²) × √(EI / ρA)",
    stepByStep: [
      `Beam length L = ${formatNum(L, 4)} m`,
      `Young's modulus E = ${formatNum(E, 4)} Pa`,
      `Moment of inertia I = ${formatNum(I, 8)} m⁴`,
      `Density ρ = ${formatNum(rho, 4)} kg/m³`,
      `Cross-section area A = ${formatNum(A, 6)} m²`,
      `EI = ${formatNum(E * I, 4)} N·m²`,
      `ρA = ${formatNum(rho * A, 6)} kg/m`,
      `ω = (π/L)² × √(EI/ρA) = ${formatNum(omega, 6)} rad/s`,
      `f = ω / 2π = ${formatNum(freq, inputs.precision)} Hz`,
    ],
  };
}

export function calculateTorsional(inputs: NaturalFrequencyInputs): NaturalFrequencyResult | null {
  const { torsionalStiffness, torsionalKUnit, momentOfInertia, momentOfInertiaUnit } = inputs.torsional;
  const kErr = validatePositive(torsionalStiffness, "torsional stiffness");
  const jErr = validatePositive(momentOfInertia, "mass moment of inertia");
  if (kErr || jErr) return null;

  const kt = parseFloat(torsionalStiffness) * TORSIONAL_K_TO_NM_RAD[torsionalKUnit];
  const J  = parseFloat(momentOfInertia) * MOI_TO_KGM2[momentOfInertiaUnit];

  const omega = Math.sqrt(kt / J);
  const freq  = omega / (2 * Math.PI);
  const period = 1 / freq;

  return {
    frequencyHz: freq,
    angularFrequencyRad: omega,
    periodSeconds: period,
    formula: "f = (1 / 2π) × √(kₜ / J)",
    stepByStep: [
      `Convert torsional stiffness: ${torsionalStiffness} ${torsionalKUnit} = ${formatNum(kt, 6)} N·m/rad`,
      `Convert mass moment of inertia: ${momentOfInertia} ${momentOfInertiaUnit} = ${formatNum(J, 6)} kg·m²`,
      `Calculate kₜ/J: ${formatNum(kt, 4)} / ${formatNum(J, 6)} = ${formatNum(kt / J, 4)}`,
      `Angular frequency ω = √(kₜ/J) = ${formatNum(omega, 6)} rad/s`,
      `Natural frequency f = ω / 2π = ${formatNum(freq, inputs.precision)} Hz`,
    ],
  };
}

export function calculate(inputs: NaturalFrequencyInputs): NaturalFrequencyResult | null {
  switch (inputs.system) {
    case "spring-mass": return calculateSpringMass(inputs);
    case "pendulum":    return calculatePendulum(inputs);
    case "beam":        return calculateBeam(inputs);
    case "torsional":   return calculateTorsional(inputs);
    default:            return null;
  }
}

// ── Validation per system ──────────────────────────────────────────────────

export function getErrors(inputs: NaturalFrequencyInputs): Record<string, string | null> {
  switch (inputs.system) {
    case "spring-mass":
      return {
        mass:           validatePositive(inputs.springMass.mass, "mass"),
        springConstant: validatePositive(inputs.springMass.springConstant, "spring constant"),
      };
    case "pendulum":
      return {
        length: validatePositive(inputs.pendulum.length, "pendulum length"),
      };
    case "beam":
      return {
        beamLength:       validatePositive(inputs.beam.beamLength, "beam length"),
        youngModulus:     validatePositive(inputs.beam.youngModulus, "Young's modulus"),
        momentOfInertia:  validatePositive(inputs.beam.momentOfInertia, "moment of inertia"),
        density:          validatePositive(inputs.beam.density, "density"),
        crossSectionArea: validatePositive(inputs.beam.crossSectionArea, "cross-section area"),
      };
    case "torsional":
      return {
        torsionalStiffness: validatePositive(inputs.torsional.torsionalStiffness, "torsional stiffness"),
        momentOfInertia:    validatePositive(inputs.torsional.momentOfInertia, "mass moment of inertia"),
      };
    default:
      return {};
  }
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

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ───────────────────────────────────────────────────────────

const HISTORY_KEY = "natural-frequency-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: NaturalFrequencyInputs, result: NaturalFrequencyResult, systemLabel: string): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result, systemLabel });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: NaturalFrequencyInputs, result: NaturalFrequencyResult): string {
  const p = inputs.precision;
  const systemNames: Record<string, string> = {
    "spring-mass": "Spring-Mass System",
    "pendulum":    "Pendulum System",
    "beam":        "Beam Vibration (Simply Supported)",
    "torsional":   "Torsional System",
  };

  const lines = [
    "Natural Frequency Calculator – Result",
    "=".repeat(45),
    "",
    `System: ${systemNames[inputs.system]}`,
    "",
  ];

  if (inputs.system === "spring-mass") {
    lines.push(`Mass (m)            : ${inputs.springMass.mass} ${inputs.springMass.massUnit}`);
    lines.push(`Spring Constant (k) : ${inputs.springMass.springConstant} ${inputs.springMass.springKUnit}`);
  } else if (inputs.system === "pendulum") {
    lines.push(`Pendulum Length (L) : ${inputs.pendulum.length} ${inputs.pendulum.lengthUnit}`);
  } else if (inputs.system === "beam") {
    lines.push(`Beam Length         : ${inputs.beam.beamLength} ${inputs.beam.beamLengthUnit}`);
    lines.push(`Young's Modulus     : ${inputs.beam.youngModulus} ${inputs.beam.youngModulusUnit}`);
    lines.push(`Moment of Inertia   : ${inputs.beam.momentOfInertia} ${inputs.beam.momentUnit}`);
    lines.push(`Density             : ${inputs.beam.density} ${inputs.beam.densityUnit}`);
    lines.push(`Cross-Section Area  : ${inputs.beam.crossSectionArea} m²`);
  } else if (inputs.system === "torsional") {
    lines.push(`Torsional Stiffness : ${inputs.torsional.torsionalStiffness} ${inputs.torsional.torsionalKUnit}`);
    lines.push(`Mass Moment of Inertia: ${inputs.torsional.momentOfInertia} ${inputs.torsional.momentOfInertiaUnit}`);
  }

  lines.push("");
  lines.push("Formula:");
  lines.push(`  ${result.formula}`);
  lines.push("");
  lines.push(`Natural Frequency   : ${formatNum(result.frequencyHz, p)} Hz`);
  lines.push(`Angular Frequency   : ${formatNum(result.angularFrequencyRad, p)} rad/s`);
  lines.push(`Period              : ${formatNum(result.periodSeconds, p)} s`);
  lines.push("");
  lines.push("Step-by-Step:");
  result.stepByStep.forEach((step, i) => lines.push(`  ${i + 1}. ${step}`));
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
