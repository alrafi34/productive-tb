import { TorqueInputs, TorqueResult, HistoryEntry, ForceUnit, DistanceUnit } from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

export const FORCE_TO_N: Record<ForceUnit, number> = {
  N:   1,
  kN:  1000,
  lbf: 4.44822,
};

export const DISTANCE_TO_M: Record<DistanceUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m:  1,
  in: 0.0254,
  ft: 0.3048,
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

export const DISTANCE_LABELS: Record<DistanceUnit, string> = {
  mm: "Millimeter (mm)",
  cm: "Centimeter (cm)",
  m:  "Meter (m)",
  in: "Inch (in)",
  ft: "Foot (ft)",
};

export const DISTANCE_SHORT: Record<DistanceUnit, string> = {
  mm: "mm",
  cm: "cm",
  m:  "m",
  in: "in",
  ft: "ft",
};

export const ALL_FORCE_UNITS: ForceUnit[] = ["N", "kN", "lbf"];
export const ALL_DISTANCE_UNITS: DistanceUnit[] = ["mm", "cm", "m", "in", "ft"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateForce(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid force value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Force must be greater than zero.";
  return null;
}

export function validateDistance(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid distance value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Distance must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: TorqueInputs): TorqueResult | null {
  if (validateForce(inputs.force) || validateDistance(inputs.distance)) return null;

  const forceN    = parseFloat(inputs.force) * FORCE_TO_N[inputs.forceUnit];
  const distanceM = parseFloat(inputs.distance) * DISTANCE_TO_M[inputs.distanceUnit];
  const angleRad  = inputs.useAngle ? (inputs.angle * Math.PI) / 180 : Math.PI / 2;
  const sinAngle  = inputs.useAngle ? Math.sin(angleRad) : 1;

  const torqueNm = forceN * distanceM * sinAngle;

  const formula = inputs.useAngle
    ? `τ = F × r × sin(θ) = ${formatNum(forceN, 4)} N × ${formatNum(distanceM, 4)} m × sin(${inputs.angle}°)`
    : `τ = F × r = ${formatNum(forceN, 4)} N × ${formatNum(distanceM, 4)} m`;

  return {
    torqueNm,
    torqueKNm:  torqueNm / 1000,
    torqueLbFt: torqueNm * 0.737562,
    torqueLbIn: torqueNm * 8.85075,
    torqueOzIn: torqueNm * 141.612,
    forceN,
    distanceM,
    angleRad,
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

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "torque-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: TorqueInputs, result: TorqueResult): void {
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

export function exportToText(inputs: TorqueInputs, result: TorqueResult): string {
  const p = inputs.precision;
  return [
    "Torque Calculator – Result",
    "=".repeat(45),
    "",
    `Force        : ${inputs.force} ${FORCE_SHORT[inputs.forceUnit]} (${formatNum(result.forceN, p)} N)`,
    `Distance     : ${inputs.distance} ${DISTANCE_SHORT[inputs.distanceUnit]} (${formatNum(result.distanceM, p)} m)`,
    inputs.useAngle ? `Angle        : ${inputs.angle}°` : "Angle        : 90° (perpendicular)",
    "",
    `Torque (Nm)  : ${formatNum(result.torqueNm, p)} Nm`,
    `Torque (kNm) : ${formatNum(result.torqueKNm, p)} kNm`,
    `Torque (lb-ft): ${formatNum(result.torqueLbFt, p)} lb-ft`,
    `Torque (lb-in): ${formatNum(result.torqueLbIn, p)} lb-in`,
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
