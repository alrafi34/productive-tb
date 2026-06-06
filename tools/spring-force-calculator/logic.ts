import {
  SpringForceInputs,
  SpringForceResult,
  HistoryEntry,
  SpringConstantUnit,
  DisplacementUnit,
} from "./types";

// ── Unit conversion to SI ──────────────────────────────────────────────────

// Spring constant → N/m
export const K_TO_NM: Record<SpringConstantUnit, number> = {
  "N/m":   1,
  "lb/in": 175.1268,   // 1 lb/in = 175.1268 N/m
  "kN/m":  1000,
};

// Displacement → m
export const X_TO_M: Record<DisplacementUnit, number> = {
  m:   1,
  cm:  0.01,
  mm:  0.001,
  in:  0.0254,
};

export const K_LABELS: Record<SpringConstantUnit, string> = {
  "N/m":   "N/m (Newton per meter)",
  "lb/in": "lb/in (Pound per inch)",
  "kN/m":  "kN/m (Kilonewton per meter)",
};

export const K_SHORT: Record<SpringConstantUnit, string> = {
  "N/m":   "N/m",
  "lb/in": "lb/in",
  "kN/m":  "kN/m",
};

export const X_LABELS: Record<DisplacementUnit, string> = {
  m:   "m (Meter)",
  cm:  "cm (Centimeter)",
  mm:  "mm (Millimeter)",
  in:  "in (Inch)",
};

export const X_SHORT: Record<DisplacementUnit, string> = {
  m:   "m",
  cm:  "cm",
  mm:  "mm",
  in:  "in",
};

export const ALL_K_UNITS: SpringConstantUnit[] = ["N/m", "lb/in", "kN/m"];
export const ALL_X_UNITS: DisplacementUnit[]   = ["m", "cm", "mm", "in"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateSpringConstant(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a spring constant.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Spring constant must be a valid number.";
  if (num <= 0) return "Spring constant must be greater than zero.";
  return null;
}

export function validateDisplacement(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a displacement value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Displacement must be a valid number.";
  if (num < 0) return "Displacement must be a positive value.";
  if (num === 0) return "Displacement must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: SpringForceInputs): SpringForceResult | null {
  if (validateSpringConstant(inputs.springConstant) || validateDisplacement(inputs.displacement)) {
    return null;
  }

  const kNm = parseFloat(inputs.springConstant) * K_TO_NM[inputs.springConstantUnit];
  const xM  = parseFloat(inputs.displacement)   * X_TO_M[inputs.displacementUnit];
  const forceN = kNm * xM;

  const formula = `F = k × x = ${formatNum(kNm, 4)} N/m × ${formatNum(xM, 4)} m = ${formatNum(forceN, 4)} N`;

  return {
    forceN,
    forceKN:  forceN / 1000,
    forceLbf: forceN * 0.224809,
    springConstantNm: kNm,
    displacementM:    xM,
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

const HISTORY_KEY = "spring-force-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: SpringForceInputs, result: SpringForceResult): void {
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

// ── Preferred units persistence ────────────────────────────────────────────

const PREFS_KEY = "spring-force-calculator-prefs";

export function savePrefs(kUnit: SpringConstantUnit, xUnit: DisplacementUnit): void {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify({ kUnit, xUnit })); } catch { /* ignore */ }
}

export function loadPrefs(): { kUnit: SpringConstantUnit; xUnit: DisplacementUnit } | null {
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: SpringForceInputs, result: SpringForceResult): string {
  const p = inputs.precision;
  return [
    "Spring Force Calculator – Result",
    "=".repeat(45),
    "",
    `Spring Constant (k) : ${inputs.springConstant} ${K_SHORT[inputs.springConstantUnit]} (${formatNum(result.springConstantNm, p)} N/m)`,
    `Displacement (x)    : ${inputs.displacement} ${X_SHORT[inputs.displacementUnit]} (${formatNum(result.displacementM, p)} m)`,
    `Motion Type         : ${inputs.motionType === "compression" ? "Compression" : "Extension"}`,
    "",
    "Formula:",
    "  F = k × x",
    `  F = ${formatNum(result.springConstantNm, p)} N/m × ${formatNum(result.displacementM, p)} m`,
    "",
    `Force (N)   : ${formatNum(result.forceN, p)} N`,
    `Force (kN)  : ${formatNum(result.forceKN, p)} kN`,
    `Force (lbf) : ${formatNum(result.forceLbf, p)} lbf`,
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
