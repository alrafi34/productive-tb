import { FrictionInputs, FrictionResult, HistoryEntry, ForceUnit } from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const FORCE_TO_N: Record<ForceUnit, number> = {
  N:   1,
  kN:  1000,
  lbf: 4.44822,
};

export const FORCE_LABELS: Record<ForceUnit, string> = {
  N:   "Newton (N)",
  kN:  "Kilonewton (kN)",
  lbf: "Pound-force (lbf)",
};

export const FORCE_SHORT: Record<ForceUnit, string> = {
  N:   "N",
  kN:  "kN",
  lbf: "lbf",
};

export const ALL_FORCE_UNITS: ForceUnit[] = ["N", "kN", "lbf"];

// ── Surface presets ────────────────────────────────────────────────────────

export interface SurfacePreset {
  label: string;
  staticMu: number;
  kineticMu: number;
  description: string;
}

export const SURFACE_PRESETS: SurfacePreset[] = [
  { label: "Rubber on Dry Concrete",  staticMu: 0.80, kineticMu: 0.70, description: "High friction — common in road/tire contact" },
  { label: "Steel on Steel (dry)",    staticMu: 0.74, kineticMu: 0.57, description: "Typical for metal-on-metal contact" },
  { label: "Wood on Wood",            staticMu: 0.50, kineticMu: 0.40, description: "Common in furniture and construction" },
  { label: "Rubber on Wet Concrete",  staticMu: 0.50, kineticMu: 0.40, description: "Reduced grip on wet surfaces" },
  { label: "Steel on Ice",            staticMu: 0.10, kineticMu: 0.05, description: "Very low friction — ice skating, hockey" },
  { label: "Glass on Glass",          staticMu: 0.94, kineticMu: 0.40, description: "High static, lower kinetic friction" },
  { label: "Aluminum on Steel",       staticMu: 0.61, kineticMu: 0.47, description: "Common in machining and assembly" },
  { label: "Copper on Steel",         staticMu: 0.53, kineticMu: 0.36, description: "Electrical and mechanical applications" },
  { label: "Teflon on Steel",         staticMu: 0.04, kineticMu: 0.04, description: "Extremely low friction — PTFE coating" },
  { label: "Leather on Metal",        staticMu: 0.60, kineticMu: 0.50, description: "Belts, brakes, and mechanical drives" },
];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateCoefficient(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a coefficient of friction.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Coefficient must be a valid number.";
  if (num < 0) return "Coefficient must be ≥ 0.";
  if (num > 10) return "Coefficient seems unusually high (typical range: 0.01–2.0).";
  return null;
}

export function validateNormalForce(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a normal force value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Normal force must be a valid number.";
  if (num <= 0) return "Normal force must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: FrictionInputs): FrictionResult | null {
  if (validateCoefficient(inputs.coefficient) || validateNormalForce(inputs.normalForce)) return null;

  const mu          = parseFloat(inputs.coefficient);
  const normalForceN = parseFloat(inputs.normalForce) * FORCE_TO_N[inputs.normalForceUnit];
  const frictionN   = mu * normalForceN;

  const formula = `F = μ × N = ${mu} × ${formatNum(normalForceN, 4)} N = ${formatNum(frictionN, 4)} N`;

  return {
    frictionN,
    frictionKN:   frictionN / 1000,
    frictionLbf:  frictionN / 4.44822,
    normalForceN,
    coefficientUsed: mu,
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

const HISTORY_KEY = "friction-force-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: FrictionInputs, result: FrictionResult): void {
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

export function exportToText(inputs: FrictionInputs, result: FrictionResult): string {
  const p = inputs.precision;
  return [
    "Friction Force Calculator – Result",
    "=".repeat(45),
    "",
    `Calculation Mode  : ${inputs.calcMode === "static" ? "Static Friction" : "Kinetic Friction"}`,
    `Coefficient (μ)   : ${inputs.coefficient}`,
    `Normal Force      : ${inputs.normalForce} ${FORCE_SHORT[inputs.normalForceUnit]} (${formatNum(result.normalForceN, p)} N)`,
    "",
    `Friction Force (N)   : ${formatNum(result.frictionN, p)} N`,
    `Friction Force (kN)  : ${formatNum(result.frictionKN, p)} kN`,
    `Friction Force (lbf) : ${formatNum(result.frictionLbf, p)} lbf`,
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
