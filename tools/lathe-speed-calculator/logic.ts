import { LatheInputs, LatheResult, HistoryEntry, Material, MaterialData, SpeedStatus } from "./types";

// ── Material database (speeds in m/min for HSS tools on lathe) ─────────────
export const MATERIAL_DATA: Record<Material, MaterialData> = {
  "mild-steel":      { label: "Mild Steel",       metricSpeed: 30,  minSpeed: 25,  maxSpeed: 35,  note: "Use coolant. Good for general turning." },
  "carbon-steel":    { label: "Carbon Steel",      metricSpeed: 25,  minSpeed: 20,  maxSpeed: 30,  note: "Reduce speed for harder grades. Use cutting oil." },
  "stainless-steel": { label: "Stainless Steel",   metricSpeed: 20,  minSpeed: 15,  maxSpeed: 25,  note: "Use sharp tools and steady feed to avoid work hardening." },
  "aluminum":        { label: "Aluminum",           metricSpeed: 90,  minSpeed: 60,  maxSpeed: 150, note: "High speeds possible. Use sharp tools and lubrication." },
  "brass":           { label: "Brass",              metricSpeed: 100, minSpeed: 60,  maxSpeed: 120, note: "Free-machining. Excellent surface finish achievable." },
  "copper":          { label: "Copper",             metricSpeed: 60,  minSpeed: 40,  maxSpeed: 80,  note: "Tends to smear. Use sharp tools and light cuts." },
  "cast-iron":       { label: "Cast Iron",          metricSpeed: 25,  minSpeed: 18,  maxSpeed: 30,  note: "Dry machining preferred. Avoid coolant shock." },
  "titanium":        { label: "Titanium",           metricSpeed: 15,  minSpeed: 10,  maxSpeed: 20,  note: "Low speeds required. Use flood coolant to manage heat." },
  "plastic":         { label: "Plastic",            metricSpeed: 120, minSpeed: 80,  maxSpeed: 200, note: "High speeds OK. Avoid heat buildup to prevent melting." },
  "custom":          { label: "Custom Material",    metricSpeed: 0,   minSpeed: 0,   maxSpeed: 0,   note: "Enter your own cutting speed values." },
};

export const ALL_MATERIALS = Object.keys(MATERIAL_DATA) as Material[];

// ── Conversion constants ───────────────────────────────────────────────────
const M_MIN_TO_SFM = 3.28084;
const SFM_TO_M_MIN = 1 / M_MIN_TO_SFM;
const MM_TO_INCH   = 1 / 25.4;
const INCH_TO_MM   = 25.4;

// ── Core formula ───────────────────────────────────────────────────────────
/** RPM = (1000 × Vc) / (π × D)  [Vc in m/min, D in mm] */
export function calcRPMMetric(cuttingSpeedMmin: number, diameterMm: number): number {
  return (1000 * cuttingSpeedMmin) / (Math.PI * diameterMm);
}

/** RPM = (12 × SFM) / (π × D)  [D in inches] */
export function calcRPMImperial(sfm: number, diameterInch: number): number {
  return (12 * sfm) / (Math.PI * diameterInch);
}

// ── Speed status ───────────────────────────────────────────────────────────
export function getSpeedStatus(vcMmin: number, material: Material): SpeedStatus {
  const data = MATERIAL_DATA[material];
  if (material === "custom" || data.minSpeed === 0) return "unknown";
  if (vcMmin < data.minSpeed * 0.8) return "low";
  if (vcMmin > data.maxSpeed * 1.2) return "high";
  return "optimal";
}

export const STATUS_LABELS: Record<SpeedStatus, string> = {
  low:     "Below Recommended",
  optimal: "Optimal Range",
  high:    "Above Recommended",
  unknown: "—",
};

export const STATUS_COLORS: Record<SpeedStatus, string> = {
  low:     "bg-blue-100 text-blue-800 border-blue-200",
  optimal: "bg-green-100 text-green-800 border-green-200",
  high:    "bg-red-100 text-red-800 border-red-200",
  unknown: "bg-gray-100 text-gray-600 border-gray-200",
};

// ── Safety messages ────────────────────────────────────────────────────────
function getSafetyMessage(status: SpeedStatus, material: Material): string {
  const mat = MATERIAL_DATA[material].label;
  switch (status) {
    case "optimal": return `Safe operating range for ${mat}.`;
    case "low":     return `Speed is below recommended range for ${mat}. May cause poor finish or tool chatter.`;
    case "high":    return `Speed exceeds recommended range for ${mat}. Risk of tool wear and overheating.`;
    default:        return "Verify cutting speed against material specifications.";
  }
}

function getHint(status: SpeedStatus): string {
  switch (status) {
    case "optimal": return "Cutting parameters are within the recommended range for good tool life and surface finish.";
    case "low":     return "Increase cutting speed for smoother finish and better chip formation.";
    case "high":    return "Reduce cutting speed to extend tool life and prevent overheating.";
    default:        return "Enter material and cutting speed to get machining recommendations.";
  }
}

// ── Main calculate function ────────────────────────────────────────────────
export function calculate(inputs: LatheInputs): LatheResult | null {
  const isMetric = inputs.unitSystem === "metric";
  const dRaw  = parseFloat(inputs.diameter);
  const vcRaw = parseFloat(inputs.cuttingSpeed);

  if (isNaN(dRaw) || dRaw <= 0) return null;
  if (isNaN(vcRaw) || vcRaw <= 0) return null;

  // Normalise to metric for status check
  const vcMmin = isMetric ? vcRaw : vcRaw * SFM_TO_M_MIN;
  const dMm    = isMetric ? dRaw  : dRaw * INCH_TO_MM;

  const rpm = isMetric
    ? calcRPMMetric(vcRaw, dRaw)
    : calcRPMImperial(vcRaw, dRaw);

  const status = getSpeedStatus(vcMmin, inputs.material);

  // RPM range: ±5% of recommended speed
  const mat = MATERIAL_DATA[inputs.material];
  let rpmMin = 0;
  let rpmMax = 0;
  if (mat.minSpeed > 0) {
    rpmMin = isMetric
      ? calcRPMMetric(mat.minSpeed, dMm)
      : calcRPMImperial(mat.minSpeed * M_MIN_TO_SFM, dRaw);
    rpmMax = isMetric
      ? calcRPMMetric(mat.maxSpeed, dMm)
      : calcRPMImperial(mat.maxSpeed * M_MIN_TO_SFM, dRaw);
  }

  return {
    rpm,
    rpmMin,
    rpmMax,
    safetyMessage: getSafetyMessage(status, inputs.material),
    hint: getHint(status),
    speedStatus: status,
  };
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validateDiameter(val: string): string | null {
  if (!val || val.trim() === "") return "Workpiece diameter is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Diameter must be greater than zero.";
  return null;
}

export function validateCuttingSpeed(val: string): string | null {
  if (!val || val.trim() === "") return "Cutting speed is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Cutting speed must be greater than zero.";
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(val: number, precision: number): string {
  if (!isFinite(val) || isNaN(val)) return "—";
  return val.toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

// ── Debounce ───────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────
const HISTORY_KEY = "lathe-speed-calc-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: LatheInputs, result: LatheResult): void {
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
  } catch {}
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
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export ─────────────────────────────────────────────────────────────────
export function exportToText(inputs: LatheInputs, result: LatheResult): string {
  const isMetric = inputs.unitSystem === "metric";
  const dUnit  = isMetric ? "mm" : "in";
  const vcUnit = isMetric ? "m/min" : "SFM";
  const mat    = MATERIAL_DATA[inputs.material];

  const lines = [
    "=== Lathe Speed Calculator Result ===",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "--- Inputs ---",
    `Material: ${mat.label}`,
    `Unit System: ${inputs.unitSystem}`,
    `Workpiece Diameter: ${inputs.diameter} ${dUnit}`,
    `Cutting Speed: ${inputs.cuttingSpeed} ${vcUnit}`,
    `Decimal Precision: ${inputs.precision}`,
    "",
    "--- Results ---",
    `Recommended Spindle Speed: ${formatNum(result.rpm, inputs.precision)} RPM`,
    result.rpmMin > 0
      ? `Recommended RPM Range: ${formatNum(result.rpmMin, 0)} – ${formatNum(result.rpmMax, 0)} RPM`
      : "",
    `Speed Status: ${STATUS_LABELS[result.speedStatus]}`,
    `Safety Note: ${result.safetyMessage}`,
    "",
    "--- Formula ---",
    isMetric
      ? `RPM = (1000 × ${inputs.cuttingSpeed}) ÷ (π × ${inputs.diameter}) = ${formatNum(result.rpm, inputs.precision)}`
      : `RPM = (12 × ${inputs.cuttingSpeed}) ÷ (π × ${inputs.diameter}) = ${formatNum(result.rpm, inputs.precision)}`,
    "",
    "Generated by ProductiveToolbox.com",
  ];

  return lines.filter((l) => l !== "").join("\n");
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
