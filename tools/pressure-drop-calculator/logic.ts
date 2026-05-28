import {
  PressureDropInputs,
  PressureDropResult,
  FluidType,
  PipeMaterial,
  HistoryEntry,
} from "./types";

// ── Pipe roughness (m) ────────────────────────────────────────────────────────
export const ROUGHNESS_PRESETS: Record<PipeMaterial, number> = {
  pvc:       0.0000015,
  steel:     0.000046,
  copper:    0.0000015,
  concrete:  0.0003,
  cast_iron: 0.00026,
  hdpe:      0.0000015,
  custom:    0.000046,
};

export const MATERIAL_LABELS: Record<PipeMaterial, string> = {
  pvc:       "PVC",
  steel:     "Steel",
  copper:    "Copper",
  concrete:  "Concrete",
  cast_iron: "Cast Iron",
  hdpe:      "HDPE",
  custom:    "Custom",
};

// ── Fluid properties at given temperature ────────────────────────────────────
// Returns { density (kg/m³), viscosity (Pa·s) }
export function getFluidProperties(
  fluid: FluidType,
  tempC: number
): { density: number; viscosity: number } {
  switch (fluid) {
    case "water": {
      // Simplified polynomial fits for water (0–100°C)
      const t = Math.max(0, Math.min(100, tempC));
      const density = 999.842 - 0.0622 * t - 0.00363 * t * t;
      // Dynamic viscosity (Pa·s) — Vogel equation approximation
      const viscosity = 0.001 * Math.exp(-3.7188 + 578.919 / (t + 137.546));
      return { density, viscosity };
    }
    case "air": {
      const t = Math.max(-50, Math.min(200, tempC));
      const T = t + 273.15;
      const density = 101325 / (287.058 * T); // ideal gas at 1 atm
      // Sutherland's law
      const viscosity = 1.458e-6 * Math.pow(T, 1.5) / (T + 110.4);
      return { density, viscosity };
    }
    case "oil": {
      // SAE 30 motor oil approximation
      const density = 880 - 0.65 * tempC;
      const viscosity = 0.1 * Math.exp(-0.04 * tempC);
      return { density, viscosity };
    }
    case "steam": {
      // Saturated steam approximation (100–200°C)
      const t = Math.max(100, Math.min(200, tempC));
      const density = 0.6 + 0.012 * (t - 100);
      const viscosity = 1.2e-5 + 5e-8 * (t - 100);
      return { density, viscosity };
    }
    default:
      return { density: 1000, viscosity: 0.001 };
  }
}

// ── Unit conversions ──────────────────────────────────────────────────────────
export function toMeters(value: number, unit: "m" | "ft"): number {
  return unit === "ft" ? value * 0.3048 : value;
}

export function toMetersFromDiameter(value: number, unit: "mm" | "in"): number {
  if (unit === "mm") return value / 1000;
  return value * 0.0254;
}

export function toM3s(value: number, unit: "L/s" | "m3/h" | "GPM"): number {
  if (unit === "L/s")  return value / 1000;
  if (unit === "m3/h") return value / 3600;
  if (unit === "GPM")  return value * 6.30902e-5;
  return value;
}

// ── Friction factor ───────────────────────────────────────────────────────────
export function calculateFrictionFactor(
  re: number,
  roughness: number,
  diameter: number
): number {
  if (re < 2300) {
    return 64 / re;
  }
  if (re <= 4000) {
    // Interpolate between laminar and turbulent
    const fLam = 64 / 2300;
    const fTurb = swameeJain(4000, roughness, diameter);
    const t = (re - 2300) / 1700;
    return fLam + t * (fTurb - fLam);
  }
  return swameeJain(re, roughness, diameter);
}

function swameeJain(re: number, roughness: number, diameter: number): number {
  const relRoughness = roughness / diameter;
  const inner = relRoughness / 3.7 + 5.74 / Math.pow(re, 0.9);
  return 0.25 / Math.pow(Math.log10(inner), 2);
}

// ── Flow regime ───────────────────────────────────────────────────────────────
export function getFlowRegime(
  re: number
): "laminar" | "transitional" | "turbulent" {
  if (re < 2300) return "laminar";
  if (re <= 4000) return "transitional";
  return "turbulent";
}

// ── Main calculation ──────────────────────────────────────────────────────────
export function calculate(inputs: PressureDropInputs): PressureDropResult | null {
  const tempC = parseFloat(inputs.temperature) || 20;

  // Fluid properties
  let density: number;
  let viscosity: number;
  if (inputs.fluidType === "custom") {
    density   = parseFloat(inputs.customDensity);
    viscosity = parseFloat(inputs.customViscosity);
    if (!isFinite(density) || density <= 0) return null;
    if (!isFinite(viscosity) || viscosity <= 0) return null;
  } else {
    const props = getFluidProperties(inputs.fluidType, tempC);
    density   = props.density;
    viscosity = props.viscosity;
  }

  // Pipe geometry
  const lengthRaw    = parseFloat(inputs.pipeLength);
  const diameterRaw  = parseFloat(inputs.pipeDiameter);
  if (!isFinite(lengthRaw)   || lengthRaw   <= 0) return null;
  if (!isFinite(diameterRaw) || diameterRaw <= 0) return null;

  const lengthM   = inputs.unitSystem === "metric"
    ? toMeters(lengthRaw, "m")
    : toMeters(lengthRaw, "ft");
  const diameterM = inputs.unitSystem === "metric"
    ? toMetersFromDiameter(diameterRaw, "mm")
    : toMetersFromDiameter(diameterRaw, "in");

  const area = Math.PI * Math.pow(diameterM / 2, 2);

  // Velocity
  let velocityMs: number;
  if (inputs.flowInputMethod === "velocity") {
    velocityMs = parseFloat(inputs.velocity);
    if (!isFinite(velocityMs) || velocityMs <= 0) return null;
  } else {
    const qRaw = parseFloat(inputs.flowRate);
    if (!isFinite(qRaw) || qRaw <= 0) return null;
    const qM3s = inputs.unitSystem === "metric"
      ? toM3s(qRaw, inputs.flowRateUnit as "L/s" | "m3/h")
      : toM3s(qRaw, "GPM");
    velocityMs = qM3s / area;
  }

  // Roughness
  const roughness = inputs.pipeMaterial === "custom"
    ? parseFloat(inputs.roughness) / 1000 // input in mm → m
    : ROUGHNESS_PRESETS[inputs.pipeMaterial];

  // Reynolds number
  const re = (density * velocityMs * diameterM) / viscosity;

  // Friction factor
  const f = calculateFrictionFactor(re, roughness, diameterM);

  // Darcy–Weisbach
  const pressureDropPa = f * (lengthM / diameterM) * (density * velocityMs ** 2 / 2);

  const flowRegime = getFlowRegime(re);

  const formulaSubstituted = `ΔP = ${f.toFixed(4)} × (${lengthM.toFixed(2)} / ${diameterM.toFixed(4)}) × (${density.toFixed(1)} × ${velocityMs.toFixed(3)}² / 2)`;

  return {
    pressureDropPa,
    pressureDropKPa:    pressureDropPa / 1000,
    pressureDropBar:    pressureDropPa / 100000,
    pressureDropPsi:    pressureDropPa * 0.000145038,
    pressureDropPerMeter: pressureDropPa / lengthM,
    velocity:           velocityMs,
    reynoldsNumber:     re,
    frictionFactor:     f,
    flowRegime,
    density,
    viscosity,
    diameterM,
    lengthM,
    formulaSubstituted,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validatePositive(value: string, label: string): string | null {
  const n = parseFloat(value);
  if (value === "" || value === undefined) return `${label} is required.`;
  if (!isFinite(n)) return `${label} must be a valid number.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

// ── Formatting ────────────────────────────────────────────────────────────────
export function fmt(n: number, decimals = 4): string {
  if (!isFinite(n)) return "—";
  if (n >= 1e6) return n.toExponential(3);
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtPressure(pa: number): string {
  if (pa >= 1e6) return `${fmt(pa / 1e6, 3)} MPa`;
  if (pa >= 1000) return `${fmt(pa / 1000, 3)} kPa`;
  return `${fmt(pa, 1)} Pa`;
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "pressure-drop-history";
const MAX_HISTORY = 20;

export function saveToHistory(
  inputs: PressureDropInputs,
  result: PressureDropResult
): void {
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
export function exportToText(
  inputs: PressureDropInputs,
  result: PressureDropResult
): string {
  const lines = [
    "Pressure Drop Calculation Report",
    "=================================",
    "",
    "INPUTS",
    `  Unit System   : ${inputs.unitSystem === "metric" ? "Metric (SI)" : "Imperial (US)"}`,
    `  Fluid         : ${inputs.fluidType}`,
    `  Temperature   : ${inputs.temperature} °C`,
    `  Pipe Length   : ${inputs.pipeLength} ${inputs.unitSystem === "metric" ? "m" : "ft"}`,
    `  Pipe Diameter : ${inputs.pipeDiameter} ${inputs.unitSystem === "metric" ? "mm" : "in"}`,
    `  Pipe Material : ${inputs.pipeMaterial}`,
    inputs.flowInputMethod === "flowRate"
      ? `  Flow Rate     : ${inputs.flowRate} ${inputs.flowRateUnit}`
      : `  Velocity      : ${inputs.velocity} m/s`,
    "",
    "RESULTS",
    `  Pressure Drop : ${fmt(result.pressureDropKPa, 4)} kPa`,
    `                  ${fmt(result.pressureDropBar, 6)} bar`,
    `                  ${fmt(result.pressureDropPsi, 4)} psi`,
    `  Loss / meter  : ${fmt(result.pressureDropPerMeter, 2)} Pa/m`,
    `  Velocity      : ${fmt(result.velocity, 4)} m/s`,
    `  Reynolds No.  : ${fmt(result.reynoldsNumber, 0)}`,
    `  Flow Regime   : ${result.flowRegime}`,
    `  Friction Factor: ${fmt(result.frictionFactor, 6)}`,
    "",
    "FORMULA",
    `  Darcy–Weisbach: ΔP = f × (L/D) × (ρv²/2)`,
    `  ${result.formulaSubstituted}`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
  ];
  return lines.join("\n");
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

// ── URL params ────────────────────────────────────────────────────────────────
export function encodeToURL(inputs: PressureDropInputs): string {
  const params = new URLSearchParams({
    unit:     inputs.unitSystem,
    fluid:    inputs.fluidType,
    len:      inputs.pipeLength,
    dia:      inputs.pipeDiameter,
    mat:      inputs.pipeMaterial,
    method:   inputs.flowInputMethod,
    flow:     inputs.flowRate,
    flowUnit: inputs.flowRateUnit,
    vel:      inputs.velocity,
    temp:     inputs.temperature,
  });
  return `?${params.toString()}`;
}

export function decodeFromURL(search: string): Partial<PressureDropInputs> {
  const p = new URLSearchParams(search);
  const result: Partial<PressureDropInputs> = {};
  if (p.get("unit"))     result.unitSystem       = p.get("unit") as PressureDropInputs["unitSystem"];
  if (p.get("fluid"))    result.fluidType        = p.get("fluid") as PressureDropInputs["fluidType"];
  if (p.get("len"))      result.pipeLength       = p.get("len")!;
  if (p.get("dia"))      result.pipeDiameter     = p.get("dia")!;
  if (p.get("mat"))      result.pipeMaterial     = p.get("mat") as PressureDropInputs["pipeMaterial"];
  if (p.get("method"))   result.flowInputMethod  = p.get("method") as PressureDropInputs["flowInputMethod"];
  if (p.get("flow"))     result.flowRate         = p.get("flow")!;
  if (p.get("flowUnit")) result.flowRateUnit     = p.get("flowUnit") as PressureDropInputs["flowRateUnit"];
  if (p.get("vel"))      result.velocity         = p.get("vel")!;
  if (p.get("temp"))     result.temperature      = p.get("temp")!;
  return result;
}
