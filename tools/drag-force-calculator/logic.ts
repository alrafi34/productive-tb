import { DragInputs, DragResult, HistoryEntry, VelocityUnit } from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "km/h": 1 / 3.6,
  "mph":  0.44704,
  "ft/s": 0.3048,
};

export const VELOCITY_LABELS: Record<VelocityUnit, string> = {
  "m/s":  "Meters per second (m/s)",
  "km/h": "Kilometers per hour (km/h)",
  "mph":  "Miles per hour (mph)",
  "ft/s": "Feet per second (ft/s)",
};

export const ALL_VELOCITY_UNITS: VelocityUnit[] = ["m/s", "km/h", "mph", "ft/s"];

// ── Fluid density presets ──────────────────────────────────────────────────

export const FLUID_DENSITY: Record<string, number> = {
  air:   1.225,
  water: 1000,
};

// ── Drag coefficient presets ───────────────────────────────────────────────

export interface CdPreset {
  label: string;
  cd: number;
  description: string;
}

export const CD_PRESETS: CdPreset[] = [
  { label: "Sphere",          cd: 0.47, description: "Standard sphere in turbulent flow" },
  { label: "Car (sedan)",     cd: 0.30, description: "Typical modern passenger car" },
  { label: "Car (SUV)",       cd: 0.40, description: "Typical SUV or crossover" },
  { label: "Cyclist",         cd: 0.90, description: "Upright cyclist on a road bike" },
  { label: "Cube",            cd: 1.05, description: "Flat-faced cube, blunt body" },
  { label: "Airfoil",         cd: 0.04, description: "Streamlined airfoil at low AoA" },
  { label: "Flat Plate",      cd: 1.28, description: "Flat plate perpendicular to flow" },
  { label: "Bicycle (aero)",  cd: 0.63, description: "Aerodynamic tuck position" },
  { label: "Skydiver",        cd: 1.00, description: "Spread-eagle freefall position" },
  { label: "Streamlined Body",cd: 0.04, description: "Highly streamlined teardrop shape" },
];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateVelocity(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a velocity value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Velocity must be a valid number.";
  if (num <= 0) return "Velocity must be greater than zero.";
  return null;
}

export function validateDensity(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a fluid density.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Density must be a valid number.";
  if (num <= 0) return "Density must be greater than zero.";
  return null;
}

export function validateCd(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a drag coefficient.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Drag coefficient must be a valid number.";
  if (num <= 0) return "Drag coefficient must be greater than zero.";
  if (num > 10) return "Drag coefficient seems unusually high (typical range: 0.01–2.0).";
  return null;
}

export function validateArea(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a cross-sectional area.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Area must be a valid number.";
  if (num <= 0) return "Area must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: DragInputs): DragResult | null {
  if (
    validateVelocity(inputs.velocity) ||
    validateDensity(inputs.density) ||
    validateCd(inputs.dragCoefficient) ||
    validateArea(inputs.area)
  ) return null;

  const velocityMs = parseFloat(inputs.velocity) * VELOCITY_TO_MS[inputs.velocityUnit];
  const rho        = parseFloat(inputs.density);
  const cd         = parseFloat(inputs.dragCoefficient);
  const area       = parseFloat(inputs.area);

  // F = 0.5 × ρ × v² × Cd × A
  const dragForceN = 0.5 * rho * Math.pow(velocityMs, 2) * cd * area;

  const formula = `F = 0.5 × ${rho} × ${formatNum(velocityMs, 4)}² × ${cd} × ${area} = ${formatNum(dragForceN, 4)} N`;

  return {
    dragForceN,
    dragForceKN:  dragForceN / 1000,
    dragForceLbf: dragForceN / 4.44822,
    velocityMs,
    densityUsed:  rho,
    cdUsed:       cd,
    areaUsed:     area,
    formula,
  };
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

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "drag-force-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: DragInputs, result: DragResult): void {
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

export function exportToText(inputs: DragInputs, result: DragResult): string {
  const p = inputs.precision;
  return [
    "Drag Force Calculator – Result",
    "=".repeat(45),
    "",
    `Fluid Type        : ${inputs.fluidType === "custom" ? "Custom" : inputs.fluidType.charAt(0).toUpperCase() + inputs.fluidType.slice(1)}`,
    `Velocity          : ${inputs.velocity} ${inputs.velocityUnit} (${formatNum(result.velocityMs, p)} m/s)`,
    `Fluid Density (ρ) : ${inputs.density} kg/m³`,
    `Drag Coefficient  : ${inputs.dragCoefficient}`,
    `Frontal Area (A)  : ${inputs.area} m²`,
    "",
    `Drag Force (N)    : ${formatNum(result.dragForceN, p)} N`,
    `Drag Force (kN)   : ${formatNum(result.dragForceKN, p)} kN`,
    `Drag Force (lbf)  : ${formatNum(result.dragForceLbf, p)} lbf`,
    "",
    `Formula: ${result.formula}`,
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
