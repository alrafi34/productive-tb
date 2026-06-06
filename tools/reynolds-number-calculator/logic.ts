import {
  ReynoldsInputs,
  ReynoldsResult,
  HistoryEntry,
  VelocityUnit,
  DiameterUnit,
  DensityUnit,
  ViscosityUnit,
  FlowRegime,
  FluidPreset,
} from "./types";

// ── Unit conversion factors to SI ─────────────────────────────────────────

export const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "ft/s": 0.3048,
  "cm/s": 0.01,
};

export const DIAMETER_TO_M: Record<DiameterUnit, number> = {
  m:   1,
  cm:  0.01,
  mm:  0.001,
  in:  0.0254,
  ft:  0.3048,
};

export const DENSITY_TO_KGM3: Record<DensityUnit, number> = {
  "kg/m3":  1,
  "g/cm3":  1000,
  "lb/ft3": 16.0185,
};

export const VISCOSITY_TO_PAS: Record<ViscosityUnit, number> = {
  "Pa·s": 1,
  "cP":   0.001,
};

// ── Labels ─────────────────────────────────────────────────────────────────

export const VELOCITY_LABELS: Record<VelocityUnit, string> = {
  "m/s":  "Meters per second (m/s)",
  "ft/s": "Feet per second (ft/s)",
  "cm/s": "Centimeters per second (cm/s)",
};

export const DIAMETER_LABELS: Record<DiameterUnit, string> = {
  m:   "Meter (m)",
  cm:  "Centimeter (cm)",
  mm:  "Millimeter (mm)",
  in:  "Inch (in)",
  ft:  "Foot (ft)",
};

export const DENSITY_LABELS: Record<DensityUnit, string> = {
  "kg/m3":  "kg/m³",
  "g/cm3":  "g/cm³",
  "lb/ft3": "lb/ft³",
};

export const VISCOSITY_LABELS: Record<ViscosityUnit, string> = {
  "Pa·s": "Pascal-second (Pa·s)",
  "cP":   "Centipoise (cP)",
};

export const ALL_VELOCITY_UNITS: VelocityUnit[] = ["m/s", "ft/s", "cm/s"];
export const ALL_DIAMETER_UNITS: DiameterUnit[] = ["m", "cm", "mm", "in", "ft"];
export const ALL_DENSITY_UNITS: DensityUnit[] = ["kg/m3", "g/cm3", "lb/ft3"];
export const ALL_VISCOSITY_UNITS: ViscosityUnit[] = ["Pa·s", "cP"];

// ── Fluid presets ──────────────────────────────────────────────────────────

export const FLUID_PRESETS: FluidPreset[] = [
  {
    label:        "Water (20°C)",
    density:      "998",
    densityUnit:  "kg/m3",
    viscosity:    "1.002",
    viscosityUnit: "cP",
    hint:         "Looks like Water",
  },
  {
    label:        "Air (20°C)",
    density:      "1.204",
    densityUnit:  "kg/m3",
    viscosity:    "0.01813",
    viscosityUnit: "cP",
    hint:         "Looks like Air",
  },
  {
    label:        "Engine Oil (40°C)",
    density:      "876",
    densityUnit:  "kg/m3",
    viscosity:    "74",
    viscosityUnit: "cP",
    hint:         "Looks like Engine Oil",
  },
  {
    label:        "Seawater (20°C)",
    density:      "1025",
    densityUnit:  "kg/m3",
    viscosity:    "1.08",
    viscosityUnit: "cP",
    hint:         "Looks like Seawater",
  },
];

// ── Validation ─────────────────────────────────────────────────────────────

export function validatePositive(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `Please enter a ${label}.`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${label} must be a valid number.`;
  if (num <= 0) return `${label} must be greater than zero.`;
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: ReynoldsInputs): ReynoldsResult | null {
  if (
    validatePositive(inputs.velocity, "Fluid Velocity") ||
    validatePositive(inputs.diameter, "Pipe Diameter") ||
    validatePositive(inputs.density, "Fluid Density") ||
    validatePositive(inputs.viscosity, "Dynamic Viscosity")
  ) {
    return null;
  }

  const velocitySI  = parseFloat(inputs.velocity)  * VELOCITY_TO_MS[inputs.velocityUnit];
  const diameterSI  = parseFloat(inputs.diameter)  * DIAMETER_TO_M[inputs.diameterUnit];
  const densitySI   = parseFloat(inputs.density)   * DENSITY_TO_KGM3[inputs.densityUnit];
  const viscositySI = parseFloat(inputs.viscosity) * VISCOSITY_TO_PAS[inputs.viscosityUnit];

  const re = (densitySI * velocitySI * diameterSI) / viscositySI;

  const regime: FlowRegime =
    re < 2300 ? "laminar" : re <= 4000 ? "transitional" : "turbulent";

  const formulaSubstituted = `Re = (${fmtSci(densitySI)} × ${fmtSci(velocitySI)} × ${fmtSci(diameterSI)}) / ${fmtSci(viscositySI)}`;

  return { re, regime, velocitySI, diameterSI, densitySI, viscositySI, formulaSubstituted };
}

// ── Flow regime helpers ────────────────────────────────────────────────────

export const REGIME_LABELS: Record<FlowRegime, string> = {
  laminar:      "Laminar Flow",
  transitional: "Transitional Flow",
  turbulent:    "Turbulent Flow",
};

export const REGIME_DESCRIPTIONS: Record<FlowRegime, string> = {
  laminar:
    "Flow is smooth and orderly. Fluid moves in parallel layers with no disruption between them. Viscous forces dominate.",
  transitional:
    "Flow is in an unstable state between laminar and turbulent. Behavior is unpredictable and may switch between regimes.",
  turbulent:
    "Flow is chaotic with strong mixing. Inertial forces dominate. Common in most engineering pipe systems.",
};

export const REGIME_COLORS: Record<FlowRegime, string> = {
  laminar:      "green",
  transitional: "yellow",
  turbulent:    "red",
};

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatRe(value: number, decimals: number): string {
  if (value >= 1e6 || (value < 0.001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtSci(value: number): string {
  if (value >= 1e6 || (value < 0.001 && value !== 0)) {
    return value.toExponential(4);
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "reynolds-number-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ReynoldsInputs, result: ReynoldsResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
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

export function exportToText(inputs: ReynoldsInputs, result: ReynoldsResult): string {
  const p = inputs.precision;
  return [
    "Reynolds Number Calculator – Result",
    "=".repeat(45),
    "",
    `Fluid Velocity   : ${inputs.velocity} ${inputs.velocityUnit} (${formatRe(result.velocitySI, p)} m/s)`,
    `Pipe Diameter    : ${inputs.diameter} ${inputs.diameterUnit} (${formatRe(result.diameterSI, p)} m)`,
    `Fluid Density    : ${inputs.density} ${inputs.densityUnit} (${formatRe(result.densitySI, p)} kg/m³)`,
    `Dynamic Viscosity: ${inputs.viscosity} ${inputs.viscosityUnit} (${formatRe(result.viscositySI, p)} Pa·s)`,
    "",
    `Reynolds Number  : ${formatRe(result.re, p)}`,
    `Flow Regime      : ${REGIME_LABELS[result.regime]}`,
    "",
    `Formula: Re = (ρ × V × D) / μ`,
    `Substituted: ${result.formulaSubstituted}`,
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

// ── Auto-detect fluid hint ─────────────────────────────────────────────────

export function detectFluidHint(density: string, viscosity: string, densityUnit: DensityUnit, viscosityUnit: ViscosityUnit): string | null {
  const rho = parseFloat(density) * DENSITY_TO_KGM3[densityUnit];
  const mu  = parseFloat(viscosity) * VISCOSITY_TO_PAS[viscosityUnit];
  if (isNaN(rho) || isNaN(mu)) return null;

  if (rho >= 990 && rho <= 1010 && mu >= 0.0008 && mu <= 0.0015) return "Looks like Water";
  if (rho >= 1.1 && rho <= 1.3 && mu >= 0.000015 && mu <= 0.00002) return "Looks like Air";
  if (rho >= 850 && rho <= 920 && mu >= 0.05 && mu <= 0.2) return "Looks like Engine Oil";
  if (rho >= 1020 && rho <= 1030 && mu >= 0.001 && mu <= 0.0015) return "Looks like Seawater";
  return null;
}
