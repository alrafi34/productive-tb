import {
  BoltLoadInputs,
  BoltLoadResult,
  BoltGrade,
  GradeData,
  HistoryEntry,
  ThreadType,
} from "./types";

// ── Grade data (yield strength in MPa) ────────────────────────────────────
export const GRADE_DATA: Record<BoltGrade, GradeData> = {
  "4.6":    { label: "4.6 (Metric)",          yieldStrengthMPa: 240,  ultimateMPa: 400  },
  "5.8":    { label: "5.8 (Metric)",          yieldStrengthMPa: 400,  ultimateMPa: 500  },
  "8.8":    { label: "8.8 (Metric)",          yieldStrengthMPa: 640,  ultimateMPa: 800  },
  "10.9":   { label: "10.9 (Metric)",         yieldStrengthMPa: 900,  ultimateMPa: 1040 },
  "12.9":   { label: "12.9 (Metric)",         yieldStrengthMPa: 1080, ultimateMPa: 1220 },
  "grade2": { label: "Grade 2 (Imperial)",    yieldStrengthMPa: 248,  ultimateMPa: 379  },
  "grade5": { label: "Grade 5 (Imperial)",    yieldStrengthMPa: 635,  ultimateMPa: 827  },
  "grade8": { label: "Grade 8 (Imperial)",    yieldStrengthMPa: 896,  ultimateMPa: 1034 },
  "custom": { label: "Custom Material",       yieldStrengthMPa: 0,    ultimateMPa: 0    },
};

export const ALL_GRADES: BoltGrade[] = [
  "4.6", "5.8", "8.8", "10.9", "12.9",
  "grade2", "grade5", "grade8", "custom",
];

// ── Standard coarse thread stress areas (mm²) keyed by nominal diameter mm ─
// ISO 898 / ASME B1.1 tensile stress areas
const METRIC_COARSE_STRESS_AREA: Record<number, number> = {
  3: 5.03, 4: 8.78, 5: 14.2, 6: 20.1, 8: 36.6, 10: 58.0,
  12: 84.3, 14: 115, 16: 157, 18: 192, 20: 245, 22: 303,
  24: 353, 27: 459, 30: 561, 33: 694, 36: 817, 39: 976,
  42: 1120, 45: 1310, 48: 1470,
};

const METRIC_FINE_STRESS_AREA: Record<number, number> = {
  8: 39.2, 10: 61.2, 12: 92.1, 14: 125, 16: 167, 18: 216,
  20: 272, 22: 333, 24: 384, 27: 496, 30: 621, 33: 761,
  36: 915, 39: 1090,
};

// Imperial UNC stress areas (in²) keyed by nominal diameter in inches (fraction as decimal)
const IMPERIAL_COARSE_STRESS_AREA: Record<number, number> = {
  0.25: 0.0318, 0.3125: 0.0524, 0.375: 0.0775, 0.4375: 0.1063,
  0.5: 0.1419, 0.5625: 0.182, 0.625: 0.226, 0.75: 0.334,
  0.875: 0.462, 1.0: 0.606, 1.125: 0.763, 1.25: 0.969,
  1.375: 1.155, 1.5: 1.405,
};

const IMPERIAL_FINE_STRESS_AREA: Record<number, number> = {
  0.25: 0.0364, 0.3125: 0.0580, 0.375: 0.0878, 0.4375: 0.1187,
  0.5: 0.1599, 0.5625: 0.203, 0.625: 0.256, 0.75: 0.373,
  0.875: 0.509, 1.0: 0.663, 1.125: 0.856, 1.25: 1.073,
};

// ── Compute tensile stress area ────────────────────────────────────────────
function computeStressArea(
  diamMm: number,
  threadType: ThreadType,
  customPitchMm: number
): number {
  if (threadType === "custom" && customPitchMm > 0) {
    // ISO formula: As = π/4 × (d - 0.9382p)²
    const d2 = diamMm - 0.9382 * customPitchMm;
    return (Math.PI / 4) * d2 * d2;
  }

  const table =
    threadType === "fine" ? METRIC_FINE_STRESS_AREA : METRIC_COARSE_STRESS_AREA;

  // Find nearest standard diameter
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  let nearest = keys[0];
  let minDiff = Math.abs(diamMm - keys[0]);
  for (const k of keys) {
    const diff = Math.abs(diamMm - k);
    if (diff < minDiff) { minDiff = diff; nearest = k; }
  }

  // If within 10% of a standard size, use table value; otherwise interpolate
  if (minDiff / nearest < 0.1) return table[nearest];

  // Fallback: approximate using ISO formula with standard pitch
  // Coarse pitch approximation: p ≈ 0.15 × d^0.9 (rough)
  const approxPitch = threadType === "fine" ? 0.1 * diamMm : 0.15 * Math.pow(diamMm, 0.9);
  const d2 = diamMm - 0.9382 * approxPitch;
  return (Math.PI / 4) * d2 * d2;
}

function computeImperialStressArea(
  diamIn: number,
  threadType: ThreadType,
  customTpi: number
): number {
  if (threadType === "custom" && customTpi > 0) {
    // ASME formula: As = π/4 × (d - 0.9743/n)²
    const d2 = diamIn - 0.9743 / customTpi;
    return (Math.PI / 4) * d2 * d2;
  }

  const table =
    threadType === "fine" ? IMPERIAL_FINE_STRESS_AREA : IMPERIAL_COARSE_STRESS_AREA;

  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  let nearest = keys[0];
  let minDiff = Math.abs(diamIn - keys[0]);
  for (const k of keys) {
    const diff = Math.abs(diamIn - k);
    if (diff < minDiff) { minDiff = diff; nearest = k; }
  }

  if (minDiff / nearest < 0.1) return table[nearest]; // in²

  // Fallback: approximate
  const approxTpi = threadType === "fine" ? 20 : 13;
  const d2 = diamIn - 0.9743 / approxTpi;
  return (Math.PI / 4) * d2 * d2;
}

// ── Core calculation ───────────────────────────────────────────────────────
export function calculate(inputs: BoltLoadInputs): BoltLoadResult | null {
  const diam = parseFloat(inputs.diameter);
  const sy = parseFloat(inputs.yieldStrength);
  const extLoad = parseFloat(inputs.externalLoad) || 0;
  const sf = parseFloat(inputs.safetyFactor) || 2.0;
  const p = inputs.tighteningPercent / 100;
  const customPitch = parseFloat(inputs.customPitch) || 0;

  if (!diam || diam <= 0 || !sy || sy <= 0) return null;

  let stressAreaMm2: number;

  if (inputs.unitSystem === "metric") {
    stressAreaMm2 = computeStressArea(diam, inputs.threadType, customPitch);
  } else {
    // Imperial: convert in² → mm²
    const areaIn2 = computeImperialStressArea(diam, inputs.threadType, customPitch);
    stressAreaMm2 = areaIn2 * 645.16;
  }

  // Yield strength in MPa
  let syMPa: number;
  if (inputs.unitSystem === "imperial") {
    syMPa = sy * 0.00689476; // psi → MPa
  } else {
    syMPa = sy;
  }

  // Preload force (N)
  const preloadForceN = stressAreaMm2 * syMPa * p;

  // Clamp load ≈ 90% of preload (accounting for friction losses)
  const clampLoadN = preloadForceN * 0.9;

  // External load in N
  let extLoadN: number;
  if (inputs.unitSystem === "imperial") {
    extLoadN = extLoad * 4.44822; // lbf → N
  } else {
    extLoadN = extLoad;
  }

  // Tensile stress from external load
  const tensileStressMPa = extLoadN > 0 ? extLoadN / stressAreaMm2 : preloadForceN / stressAreaMm2;
  const tensileStressPsi = tensileStressMPa * 145.038;

  // Yield utilization
  const yieldUtilizationPct = (tensileStressMPa / syMPa) * 100;

  // Safety factor
  const computedSF = syMPa / tensileStressMPa;

  // Status
  let status: "safe" | "warning" | "danger";
  let statusLabel: string;
  if (computedSF >= sf) {
    status = "safe";
    statusLabel = "Safe Operating Range";
  } else if (computedSF >= 1.5) {
    status = "warning";
    statusLabel = "Approaching Yield Limit";
  } else {
    status = "danger";
    statusLabel = "Bolt May Fail Under Load";
  }

  return {
    stressAreaMm2,
    preloadForceN,
    preloadForcekN: preloadForceN / 1000,
    preloadForceLbf: preloadForceN * 0.224809,
    clampLoadN,
    clampLoadkN: clampLoadN / 1000,
    clampLoadLbf: clampLoadN * 0.224809,
    tensileStressMPa,
    tensileStressPsi,
    yieldUtilizationPct,
    safetyFactor: computedSF,
    status,
    statusLabel,
  };
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validateDiameter(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a bolt diameter.";
  const n = parseFloat(value);
  if (isNaN(n) || n <= 0) return "Diameter must be a positive number.";
  return null;
}

export function validateYieldStrength(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter yield strength.";
  const n = parseFloat(value);
  if (isNaN(n) || n <= 0) return "Yield strength must be a positive number.";
  return null;
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

// ── LocalStorage ───────────────────────────────────────────────────────────
const HISTORY_KEY = "bolt-load-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: BoltLoadInputs, result: BoltLoadResult): void {
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
export function exportToText(inputs: BoltLoadInputs, result: BoltLoadResult): string {
  const p = inputs.precision;
  const isMetric = inputs.unitSystem === "metric";
  return [
    "Bolt Load Calculator – Result",
    "=".repeat(45),
    "",
    `Bolt Diameter    : ${inputs.diameter} ${inputs.diameterUnit}`,
    `Bolt Grade       : ${GRADE_DATA[inputs.grade].label}`,
    `Yield Strength   : ${inputs.yieldStrength} ${isMetric ? "MPa" : "psi"}`,
    `Tightening       : ${inputs.tighteningPercent}%`,
    `Thread Type      : ${inputs.threadType}`,
    `External Load    : ${inputs.externalLoad || "0"} ${isMetric ? "N" : "lbf"}`,
    `Safety Factor    : ${inputs.safetyFactor}`,
    "",
    `Stress Area      : ${formatNum(result.stressAreaMm2, p)} mm²`,
    `Preload Force    : ${formatNum(result.preloadForcekN, p)} kN (${formatNum(result.preloadForceLbf, p)} lbf)`,
    `Clamp Load       : ${formatNum(result.clampLoadkN, p)} kN (${formatNum(result.clampLoadLbf, p)} lbf)`,
    `Tensile Stress   : ${formatNum(result.tensileStressMPa, p)} MPa (${formatNum(result.tensileStressPsi, p)} psi)`,
    `Yield Utilization: ${formatNum(result.yieldUtilizationPct, p)}%`,
    `Safety Factor    : ${formatNum(result.safetyFactor, p)}`,
    `Status           : ${result.statusLabel}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function exportToCSV(inputs: BoltLoadInputs, result: BoltLoadResult): string {
  const isMetric = inputs.unitSystem === "metric";
  const header = "Diameter,Grade,YieldStrength,Tightening%,StressArea_mm2,PreloadForce_kN,ClampLoad_kN,TensileStress_MPa,SafetyFactor,Status";
  const row = [
    `${inputs.diameter} ${inputs.diameterUnit}`,
    GRADE_DATA[inputs.grade].label,
    `${inputs.yieldStrength} ${isMetric ? "MPa" : "psi"}`,
    `${inputs.tighteningPercent}%`,
    formatNum(result.stressAreaMm2, 2),
    formatNum(result.preloadForcekN, 2),
    formatNum(result.clampLoadkN, 2),
    formatNum(result.tensileStressMPa, 2),
    formatNum(result.safetyFactor, 2),
    result.statusLabel,
  ].join(",");
  return `${header}\n${row}`;
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
