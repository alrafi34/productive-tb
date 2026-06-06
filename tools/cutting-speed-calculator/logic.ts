import { CuttingInputs, CuttingResult, HistoryEntry, Material, MaterialData } from "./types";

// ── Material database (speeds in m/min for HSS tools) ──────────────────────
export const MATERIAL_DATA: Record<Material, MaterialData> = {
  "mild-steel":      { label: "Mild Steel",       minSpeed: 25,  maxSpeed: 35,  note: "Good for HSS tools. Use coolant for best finish." },
  "stainless-steel": { label: "Stainless Steel",  minSpeed: 15,  maxSpeed: 25,  note: "Use sharp tools and steady feed to avoid work hardening." },
  "aluminum":        { label: "Aluminum",          minSpeed: 150, maxSpeed: 300, note: "High speeds possible. Use sharp tools and lubrication." },
  "brass":           { label: "Brass",             minSpeed: 60,  maxSpeed: 90,  note: "Free-machining. Excellent surface finish achievable." },
  "cast-iron":       { label: "Cast Iron",         minSpeed: 20,  maxSpeed: 30,  note: "Dry machining preferred. Avoid coolant shock." },
  "titanium":        { label: "Titanium",          minSpeed: 10,  maxSpeed: 20,  note: "Low speeds required. Use flood coolant to manage heat." },
  "copper":          { label: "Copper",            minSpeed: 50,  maxSpeed: 80,  note: "Tends to smear. Use sharp tools and light cuts." },
  "plastic":         { label: "Plastic",           minSpeed: 100, maxSpeed: 200, note: "High speeds OK. Avoid heat buildup to prevent melting." },
  "custom":          { label: "Custom Material",   minSpeed: 0,   maxSpeed: 0,   note: "Enter your own cutting speed values." },
};

export const ALL_MATERIALS = Object.keys(MATERIAL_DATA) as Material[];

// ── Conversion constants ───────────────────────────────────────────────────
const M_MIN_TO_FT_MIN = 3.28084;
const FT_MIN_TO_M_MIN = 1 / M_MIN_TO_FT_MIN;
const MM_TO_INCH = 1 / 25.4;
const INCH_TO_MM = 25.4;

// ── Core formulas ──────────────────────────────────────────────────────────
/** Vc = (π × D × RPM) / 1000  [D in mm → Vc in m/min] */
export function calcCuttingSpeedMetric(diameterMm: number, rpm: number): number {
  return (Math.PI * diameterMm * rpm) / 1000;
}

/** RPM = (1000 × Vc) / (π × D)  [Vc in m/min, D in mm] */
export function calcRPMMetric(cuttingSpeedMmin: number, diameterMm: number): number {
  return (1000 * cuttingSpeedMmin) / (Math.PI * diameterMm);
}

/** Feed Rate = RPM × Flutes × Feed Per Tooth  [mm/min] */
export function calcFeedRate(rpm: number, flutes: number, feedPerTooth: number): number {
  return rpm * flutes * feedPerTooth;
}

/** Machining Time = Length / Feed Rate  [min] */
export function calcMachiningTime(lengthMm: number, feedRateMmMin: number): number {
  return lengthMm / feedRateMmMin;
}

// ── Main calculate function ────────────────────────────────────────────────
export function calculate(inputs: CuttingInputs): CuttingResult | null {
  const isMetric = inputs.unitSystem === "metric";

  // Parse values
  const diamRaw = parseFloat(inputs.diameter);
  const rpmRaw = parseFloat(inputs.rpm);
  const vcRaw = parseFloat(inputs.cuttingSpeed);
  const fptRaw = parseFloat(inputs.feedPerTooth);
  const flutesRaw = parseFloat(inputs.flutes);
  const frRaw = parseFloat(inputs.feedRate);
  const lenRaw = parseFloat(inputs.length);

  // Convert diameter to mm
  const diamMm = isMetric ? diamRaw : (isNaN(diamRaw) ? NaN : diamRaw * INCH_TO_MM);

  // Convert cutting speed to m/min
  const vcMmin = isNaN(vcRaw) ? NaN : (isMetric ? vcRaw : vcRaw * FT_MIN_TO_M_MIN);

  // Convert feed per tooth to mm
  const fptMm = isNaN(fptRaw) ? NaN : (isMetric ? fptRaw : fptRaw * INCH_TO_MM);

  // Convert feed rate to mm/min
  const frMmMin = isNaN(frRaw) ? NaN : (isMetric ? frRaw : frRaw * INCH_TO_MM);

  // Convert length to mm
  const lenMm = isNaN(lenRaw) ? NaN : (isMetric ? lenRaw : lenRaw * INCH_TO_MM);

  let cuttingSpeed = NaN;
  let rpm = NaN;
  let feedRate = NaN;
  let machiningTime = NaN;

  switch (inputs.mode) {
    case "cutting-speed":
      if (!isNaN(diamMm) && diamMm > 0 && !isNaN(rpmRaw) && rpmRaw > 0) {
        cuttingSpeed = calcCuttingSpeedMetric(diamMm, rpmRaw);
        rpm = rpmRaw;
      }
      break;

    case "rpm":
      if (!isNaN(vcMmin) && vcMmin > 0 && !isNaN(diamMm) && diamMm > 0) {
        rpm = calcRPMMetric(vcMmin, diamMm);
        cuttingSpeed = vcMmin;
      }
      break;

    case "feed-rate":
      if (!isNaN(rpmRaw) && rpmRaw > 0 && !isNaN(flutesRaw) && flutesRaw > 0 && !isNaN(fptMm) && fptMm > 0) {
        feedRate = calcFeedRate(rpmRaw, flutesRaw, fptMm);
        rpm = rpmRaw;
        // also compute cutting speed if diameter given
        if (!isNaN(diamMm) && diamMm > 0) {
          cuttingSpeed = calcCuttingSpeedMetric(diamMm, rpmRaw);
        }
      }
      break;

    case "machining-time":
      if (!isNaN(lenMm) && lenMm > 0) {
        // Use provided feed rate or compute from RPM/flutes/fpt
        let fr = frMmMin;
        if (isNaN(fr) && !isNaN(rpmRaw) && rpmRaw > 0 && !isNaN(flutesRaw) && flutesRaw > 0 && !isNaN(fptMm) && fptMm > 0) {
          fr = calcFeedRate(rpmRaw, flutesRaw, fptMm);
        }
        if (!isNaN(fr) && fr > 0) {
          machiningTime = calcMachiningTime(lenMm, fr);
          feedRate = fr;
          rpm = isNaN(rpmRaw) ? NaN : rpmRaw;
          if (!isNaN(diamMm) && diamMm > 0 && !isNaN(rpmRaw) && rpmRaw > 0) {
            cuttingSpeed = calcCuttingSpeedMetric(diamMm, rpmRaw);
          }
        }
      }
      break;
  }

  if (isNaN(cuttingSpeed) && isNaN(rpm) && isNaN(feedRate) && isNaN(machiningTime)) return null;

  // Convert outputs back to user's unit system
  const vcDisplay = isMetric ? cuttingSpeed : cuttingSpeed * M_MIN_TO_FT_MIN;
  const vcAlt = isMetric ? cuttingSpeed * M_MIN_TO_FT_MIN : cuttingSpeed * FT_MIN_TO_M_MIN;
  const frDisplay = isMetric ? feedRate : feedRate * MM_TO_INCH;

  return {
    cuttingSpeed: isNaN(vcDisplay) ? 0 : vcDisplay,
    rpm: isNaN(rpm) ? 0 : rpm,
    feedRate: isNaN(frDisplay) ? 0 : frDisplay,
    machiningTime: isNaN(machiningTime) ? 0 : machiningTime,
    cuttingSpeedAlt: isNaN(vcAlt) ? 0 : vcAlt,
    rpmDisplay: isNaN(rpm) ? 0 : rpm,
  };
}

// ── Speed range status ─────────────────────────────────────────────────────
export type SpeedStatus = "too-slow" | "optimal" | "safe" | "too-fast" | "unknown";

export function getSpeedStatus(vcMmin: number, material: Material): SpeedStatus {
  const data = MATERIAL_DATA[material];
  if (material === "custom" || data.minSpeed === 0) return "unknown";
  if (vcMmin < data.minSpeed * 0.7) return "too-slow";
  if (vcMmin > data.maxSpeed * 1.3) return "too-fast";
  if (vcMmin >= data.minSpeed && vcMmin <= data.maxSpeed) return "optimal";
  return "safe";
}

export const STATUS_LABELS: Record<SpeedStatus, string> = {
  "too-slow": "Too Slow",
  "optimal":  "Optimal",
  "safe":     "Safe Range",
  "too-fast": "Too Fast",
  "unknown":  "—",
};

export const STATUS_COLORS: Record<SpeedStatus, string> = {
  "too-slow": "bg-blue-100 text-blue-800 border-blue-200",
  "optimal":  "bg-green-100 text-green-800 border-green-200",
  "safe":     "bg-yellow-100 text-yellow-800 border-yellow-200",
  "too-fast": "bg-red-100 text-red-800 border-red-200",
  "unknown":  "bg-gray-100 text-gray-600 border-gray-200",
};

// ── Validation ─────────────────────────────────────────────────────────────
export function validateDiameter(val: string): string | null {
  if (!val || val.trim() === "") return "Tool diameter is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Tool diameter must be greater than zero.";
  return null;
}

export function validateRPM(val: string): string | null {
  if (!val || val.trim() === "") return "Spindle RPM is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "RPM must be a positive number.";
  return null;
}

export function validateCuttingSpeed(val: string): string | null {
  if (!val || val.trim() === "") return "Cutting speed is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Cutting speed must be greater than zero.";
  return null;
}

export function validateFeedPerTooth(val: string): string | null {
  if (!val || val.trim() === "") return "Feed per tooth is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Feed per tooth must be greater than zero.";
  return null;
}

export function validateFlutes(val: string): string | null {
  if (!val || val.trim() === "") return "Number of flutes is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Flutes must be a positive number.";
  return null;
}

export function validateLength(val: string): string | null {
  if (!val || val.trim() === "") return "Machining length is required.";
  const n = parseFloat(val);
  if (isNaN(n) || n <= 0) return "Length must be greater than zero.";
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(val: number, precision: number): string {
  if (!isFinite(val)) return "—";
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
const HISTORY_KEY = "cutting-speed-calc-history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: CuttingInputs, result: CuttingResult): void {
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
export function exportToText(inputs: CuttingInputs, result: CuttingResult): string {
  const isMetric = inputs.unitSystem === "metric";
  const vcUnit = isMetric ? "m/min" : "ft/min";
  const dUnit = isMetric ? "mm" : "in";
  const frUnit = isMetric ? "mm/min" : "in/min";
  const lenUnit = isMetric ? "mm" : "in";
  const mat = MATERIAL_DATA[inputs.material];

  const lines = [
    "=== Cutting Speed Calculator Result ===",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "--- Inputs ---",
    `Mode: ${inputs.mode}`,
    `Material: ${mat.label}`,
    `Unit System: ${inputs.unitSystem}`,
    inputs.diameter ? `Tool Diameter: ${inputs.diameter} ${dUnit}` : "",
    inputs.rpm ? `Spindle RPM: ${inputs.rpm} RPM` : "",
    inputs.cuttingSpeed ? `Cutting Speed: ${inputs.cuttingSpeed} ${vcUnit}` : "",
    inputs.flutes ? `Number of Flutes: ${inputs.flutes}` : "",
    inputs.feedPerTooth ? `Feed Per Tooth: ${inputs.feedPerTooth} ${dUnit}/tooth` : "",
    inputs.length ? `Machining Length: ${inputs.length} ${lenUnit}` : "",
    "",
    "--- Results ---",
    result.cuttingSpeed ? `Cutting Speed: ${result.cuttingSpeed.toFixed(2)} ${vcUnit}` : "",
    result.rpm ? `Spindle RPM: ${Math.round(result.rpm)} RPM` : "",
    result.feedRate ? `Feed Rate: ${result.feedRate.toFixed(2)} ${frUnit}` : "",
    result.machiningTime ? `Machining Time: ${result.machiningTime.toFixed(3)} min` : "",
    "",
    "--- Material Reference ---",
    `Recommended Speed: ${mat.minSpeed}–${mat.maxSpeed} m/min`,
    `Note: ${mat.note}`,
    "",
    "Generated by engineeringcalcs.com",
  ];

  return lines.filter((l) => l !== "").join("\n");
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
