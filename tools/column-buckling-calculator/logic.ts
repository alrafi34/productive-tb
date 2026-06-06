import {
  BucklingInputs,
  BucklingResult,
  HistoryEntry,
  LengthUnit,
  ModulusUnit,
  MoiUnit,
  EndCondition,
  LoadUnit,
} from "./types";

// ── K Factors ────────────────────────────────────────────────────────────────
export const K_FACTORS: Record<EndCondition, number> = {
  "pinned-pinned": 1.0,
  "fixed-fixed":   0.5,
  "fixed-free":    2.0,
  "fixed-pinned":  0.7,
};

export const END_CONDITION_LABELS: Record<EndCondition, string> = {
  "pinned-pinned": "Pinned-Pinned (K = 1.0)",
  "fixed-fixed":   "Fixed-Fixed (K = 0.5)",
  "fixed-free":    "Fixed-Free / Cantilever (K = 2.0)",
  "fixed-pinned":  "Fixed-Pinned (K = 0.7)",
};

export const END_CONDITION_DESC: Record<EndCondition, string> = {
  "pinned-pinned": "Both ends free to rotate, no lateral displacement",
  "fixed-fixed":   "Both ends fully fixed, strongest against buckling",
  "fixed-free":    "One end fixed, one end free (cantilever column)",
  "fixed-pinned":  "One end fixed, one end pinned",
};

// ── Materials ─────────────────────────────────────────────────────────────────
export const MATERIALS: Record<string, { label: string; E_GPa: number }> = {
  steel:     { label: "Structural Steel",  E_GPa: 200 },
  aluminum:  { label: "Aluminum Alloy",    E_GPa: 69 },
  concrete:  { label: "Concrete",          E_GPa: 25 },
  titanium:  { label: "Titanium",          E_GPa: 116 },
  custom:    { label: "Custom",            E_GPa: 0 },
};

// ── Unit Conversion to SI ─────────────────────────────────────────────────────
function toMetres(v: number, unit: LengthUnit): number {
  const f: Record<LengthUnit, number> = {
    mm: 1e-3,
    cm: 1e-2,
    m:  1,
    in: 0.0254,
    ft: 0.3048,
  };
  return v * f[unit];
}

function toPascals(v: number, unit: ModulusUnit): number {
  const f: Record<ModulusUnit, number> = {
    MPa: 1e6,
    GPa: 1e9,
    psi: 6894.757,
  };
  return v * f[unit];
}

function toM4(v: number, unit: MoiUnit): number {
  const f: Record<MoiUnit, number> = {
    mm4: 1e-12,
    cm4: 1e-8,
    m4:  1,
    in4: 4.16231e-7,
  };
  return v * f[unit];
}

function fromNewtons(n: number, unit: LoadUnit): number {
  const f: Record<LoadUnit, number> = {
    N:   1,
    kN:  1e-3,
    MN:  1e-6,
    lbf: 0.224809,
    kip: 0.000224809,
  };
  return n * f[unit];
}

// ── Debounce ──────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── Format ────────────────────────────────────────────────────────────────────
export function formatNum(v: number, precision: number): string {
  if (!isFinite(v)) return "—";
  // Smart formatting: avoid unnecessary decimals for very large numbers
  if (Math.abs(v) >= 1e6) return v.toExponential(precision);
  return v.toFixed(precision);
}

export function formatLoad(n: number): string {
  const absN = Math.abs(n);
  if (absN >= 1e9)  return `${(n / 1e9).toPrecision(4)} GN`;
  if (absN >= 1e6)  return `${(n / 1e6).toPrecision(4)} MN`;
  if (absN >= 1e3)  return `${(n / 1e3).toPrecision(4)} kN`;
  return `${n.toPrecision(4)} N`;
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateInputs(inp: BucklingInputs): string | null {
  const L = parseFloat(inp.length);
  if (!inp.length || isNaN(L) || L <= 0)      return "Column length must be a positive number.";
  const E = parseFloat(inp.modulus);
  if (!inp.modulus || isNaN(E) || E <= 0)     return "Young's modulus must be a positive number.";
  const I = parseFloat(inp.momentOfInertia);
  if (!inp.momentOfInertia || isNaN(I) || I <= 0) return "Moment of inertia must be a positive number.";
  if (inp.showAxialLoad) {
    const P = parseFloat(inp.axialLoad);
    if (!inp.axialLoad || isNaN(P) || P < 0)  return "Axial load must be a non-negative number.";
  }
  const sf = parseFloat(inp.safetyFactor);
  if (isNaN(sf) || sf <= 0)                   return "Safety factor must be greater than zero.";
  return null;
}

// ── Main Calculation ──────────────────────────────────────────────────────────
export function calculate(inp: BucklingInputs): BucklingResult {
  const L_m   = toMetres(parseFloat(inp.length), inp.lengthUnit);
  const E_Pa  = toPascals(parseFloat(inp.modulus), inp.modulusUnit);
  const I_m4  = toM4(parseFloat(inp.momentOfInertia), inp.moiUnit);
  const K     = K_FACTORS[inp.endCondition];
  const KL_m  = K * L_m;

  // Euler: Pcr = π² × E × I / (K × L)²
  const pcrN = (Math.PI ** 2 * E_Pa * I_m4) / (KL_m ** 2);

  const sf = parseFloat(inp.safetyFactor) || 1;
  const allowableN = pcrN / sf;

  // Slenderness ratio (approximate if area not provided — use radius of gyration estimate)
  // We can compute r = sqrt(I/A) but without A, we skip that.
  // Instead compute KL/r if we have r (not available), so we show effective length only.
  const slendernessRatio = null; // not computed without section area

  // Safety interpretation
  let safetyStatus: BucklingResult["safetyStatus"] = "unknown";
  let safetyMessage = "";

  if (inp.showAxialLoad && inp.axialLoad) {
    const P = fromNewtons(parseFloat(inp.axialLoad) /* already in user unit */, "N");
    // Convert axial load to Newtons
    const axialN = parseFloat(inp.axialLoad) * (
      inp.axialLoadUnit === "N"   ? 1 :
      inp.axialLoadUnit === "kN"  ? 1e3 :
      inp.axialLoadUnit === "MN"  ? 1e6 :
      inp.axialLoadUnit === "lbf" ? 4.44822 :
      inp.axialLoadUnit === "kip" ? 4448.22 : 1
    );
    void P;
    const ratio = axialN / allowableN;
    if (ratio <= 0.75)        { safetyStatus = "safe";    safetyMessage = `✓ Safe — Applied load is ${(ratio * 100).toFixed(1)}% of the allowable load.`; }
    else if (ratio <= 1.0)    { safetyStatus = "warning"; safetyMessage = `⚠ Caution — Applied load is ${(ratio * 100).toFixed(1)}% of the allowable load. Consider a larger safety factor.`; }
    else                      { safetyStatus = "danger";  safetyMessage = `✕ Unsafe — Applied load exceeds the allowable load by ${((ratio - 1) * 100).toFixed(1)}%. Column may buckle.`; }
  } else {
    // Slenderness warning based on KL
    if (KL_m > 10)  { safetyStatus = "warning"; safetyMessage = "⚠ Long slender column — highly susceptible to buckling. Verify with detailed analysis."; }
    else             { safetyStatus = "safe";    safetyMessage = "✓ Buckling load computed. Enter the axial load to check safety."; }
  }

  return {
    pcrN,
    pcrKN:  pcrN / 1e3,
    pcrMN:  pcrN / 1e6,
    pcrLbf: pcrN * 0.224809,
    pcrKip: pcrN * 0.000224809,
    effectiveLength: KL_m,
    slendernessRatio,
    safetyStatus,
    safetyMessage,
    kFactor: K,
    formulaSteps: { L_m, E_Pa, I_m4, K, KL_m },
  };
}

// ── Output value helper ────────────────────────────────────────────────────────
export function getOutputValue(result: BucklingResult, unit: LoadUnit): number {
  const map: Record<LoadUnit, number> = {
    N:   result.pcrN,
    kN:  result.pcrKN,
    MN:  result.pcrMN,
    lbf: result.pcrLbf,
    kip: result.pcrKip,
  };
  return map[unit];
}

export const LOAD_UNIT_LABELS: Record<LoadUnit, string> = {
  N:   "N (Newtons)",
  kN:  "kN (Kilonewtons)",
  MN:  "MN (Meganewtons)",
  lbf: "lbf (Pound-force)",
  kip: "kip (Kilopound)",
};

export const MOI_UNIT_LABELS: Record<MoiUnit, string> = {
  mm4: "mm⁴",
  cm4: "cm⁴",
  m4:  "m⁴",
  in4: "in⁴",
};

export const LENGTH_UNIT_LABELS: Record<LengthUnit, string> = {
  mm: "mm",
  cm: "cm",
  m:  "m",
  in: "in",
  ft: "ft",
};

export const MODULUS_UNIT_LABELS: Record<ModulusUnit, string> = {
  MPa: "MPa",
  GPa: "GPa",
  psi: "psi",
};

// ── LocalStorage ──────────────────────────────────────────────────────────────
const HISTORY_KEY = "column-buckling-history";

export function saveToHistory(inputs: BucklingInputs, result: BucklingResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };
  history.unshift(entry);
  const trimmed = history.slice(0, 20);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed)); } catch { /* noop */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* noop */ }
}

// ── Export ────────────────────────────────────────────────────────────────────
export function exportToText(inputs: BucklingInputs, result: BucklingResult): string {
  const lines = [
    "Column Buckling Calculator – Results",
    "=====================================",
    `Material:              ${inputs.material === "custom" ? "Custom" : MATERIALS[inputs.material]?.label ?? inputs.material}`,
    `Column Length:         ${inputs.length} ${inputs.lengthUnit}`,
    `Young's Modulus (E):   ${inputs.modulus} ${inputs.modulusUnit}`,
    `Moment of Inertia (I): ${inputs.momentOfInertia} ${inputs.moiUnit}`,
    `End Condition:         ${END_CONDITION_LABELS[inputs.endCondition]}`,
    `Effective Length (KL): ${result.effectiveLength.toFixed(4)} m`,
    "",
    "Critical Buckling Load (Pcr):",
    `  ${result.pcrN.toPrecision(6)} N`,
    `  ${result.pcrKN.toPrecision(6)} kN`,
    `  ${result.pcrMN.toPrecision(6)} MN`,
    `  ${result.pcrLbf.toPrecision(6)} lbf`,
    `  ${result.pcrKip.toPrecision(6)} kip`,
    "",
    `Safety: ${result.safetyMessage}`,
    "",
    "Formula: Pcr = π² × E × I / (K × L)²",
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
