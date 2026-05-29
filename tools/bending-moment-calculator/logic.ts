import {
  BendingMomentInputs,
  BendingMomentResult,
  HistoryEntry,
  LengthUnit,
  ForceUnit,
  MomentUnit,
} from "./types";

// ── Unit conversions ──────────────────────────────────────────────────────

export const LENGTH_TO_M: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  ft: 0.3048,
  in: 0.0254,
};

export const FORCE_TO_N: Record<ForceUnit, number> = {
  N: 1,
  kN: 1000,
  lbf: 4.44822,
  kip: 4448.22,
};

// Convert Nm to output unit
export function nmToUnit(nm: number, unit: MomentUnit): number {
  switch (unit) {
    case "Nm":    return nm;
    case "kNm":   return nm / 1000;
    case "lb-ft": return nm * 0.737562;
    case "lb-in": return nm * 8.85075;
    case "kip-ft":return nm * 0.000737562;
    default:      return nm;
  }
}

export const LENGTH_LABELS: Record<LengthUnit, string> = {
  mm: "Millimeter (mm)",
  cm: "Centimeter (cm)",
  m:  "Meter (m)",
  ft: "Foot (ft)",
  in: "Inch (in)",
};

export const LENGTH_SHORT: Record<LengthUnit, string> = {
  mm: "mm", cm: "cm", m: "m", ft: "ft", in: "in",
};

export const FORCE_LABELS: Record<ForceUnit, string> = {
  N:   "Newton (N)",
  kN:  "Kilonewton (kN)",
  lbf: "Pound-force (lbf)",
  kip: "Kip (kip)",
};

export const FORCE_SHORT: Record<ForceUnit, string> = {
  N: "N", kN: "kN", lbf: "lbf", kip: "kip",
};

export const MOMENT_LABELS: Record<MomentUnit, string> = {
  "Nm":     "Newton-meter (Nm)",
  "kNm":    "Kilonewton-meter (kNm)",
  "lb-ft":  "Pound-foot (lb-ft)",
  "lb-in":  "Pound-inch (lb-in)",
  "kip-ft": "Kip-foot (kip-ft)",
};

export const ALL_LENGTH_UNITS: LengthUnit[] = ["mm", "cm", "m", "ft", "in"];
export const ALL_FORCE_UNITS: ForceUnit[] = ["N", "kN", "lbf", "kip"];
export const ALL_MOMENT_UNITS: MomentUnit[] = ["Nm", "kNm", "lb-ft", "lb-in", "kip-ft"];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateLength(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid beam length.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Beam length must be greater than zero.";
  return null;
}

export function validateLoad(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid load value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Load must be greater than zero.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

const CURVE_POINTS = 100;

export function calculate(inputs: BendingMomentInputs): BendingMomentResult | null {
  const lenErr = validateLength(inputs.length);
  const loadErr = inputs.loadType !== "multiple-point" ? validateLoad(inputs.load) : null;
  if (lenErr || loadErr) return null;

  const L = parseFloat(inputs.length) * LENGTH_TO_M[inputs.lengthUnit];
  const F = parseFloat(inputs.load) * FORCE_TO_N[inputs.forceUnit];
  const a = parseFloat(inputs.loadPosition) * LENGTH_TO_M[inputs.lengthUnit] || L / 2;

  let maxMomentNm = 0;
  let maxMomentPosition = 0;
  let reactionA = 0;
  let reactionB: number | null = null;
  let formula = "";
  let formulaLabel = "";
  let momentCurve: { x: number; y: number }[] = [];
  let shearCurve: { x: number; y: number }[] = [];

  const bt = inputs.beamType;
  const lt = inputs.loadType;

  // ── Simply Supported ──────────────────────────────────────────────────
  if (bt === "simply-supported" || bt === "overhanging") {
    if (lt === "point-center") {
      // M = (F × L) / 4
      maxMomentNm = (F * L) / 4;
      maxMomentPosition = L / 2;
      reactionA = F / 2;
      reactionB = F / 2;
      formula = `M = (F × L) / 4 = (${formatNum(F, 2)} N × ${formatNum(L, 2)} m) / 4`;
      formulaLabel = "Simply Supported – Center Point Load: M = (F × L) / 4";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = x <= L / 2 ? (F / 2) * x : (F / 2) * (L - x);
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = x < L / 2 ? F / 2 : -F / 2;
        return { x: x / L, y: v };
      });
    } else if (lt === "point-any") {
      // M_max at load point = F × a × (L - a) / L
      const b = L - a;
      reactionA = (F * b) / L;
      reactionB = (F * a) / L;
      maxMomentNm = (F * a * b) / L;
      maxMomentPosition = a;
      formula = `M = (F × a × b) / L = (${formatNum(F, 2)} × ${formatNum(a, 2)} × ${formatNum(b, 2)}) / ${formatNum(L, 2)}`;
      formulaLabel = "Simply Supported – Point Load at Any Position: M = F·a·b / L";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = x <= a ? reactionA * x : reactionA * x - F * (x - a);
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = x < a ? reactionA : reactionA - F;
        return { x: x / L, y: v };
      });
    } else if (lt === "udl") {
      // M = (w × L²) / 8
      const w = F; // F is used as w (N/m) for UDL
      maxMomentNm = (w * L * L) / 8;
      maxMomentPosition = L / 2;
      reactionA = (w * L) / 2;
      reactionB = (w * L) / 2;
      formula = `M = (w × L²) / 8 = (${formatNum(w, 2)} N/m × ${formatNum(L, 2)}² m) / 8`;
      formulaLabel = "Simply Supported – UDL: M = (w × L²) / 8";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = (w / 2) * x * (L - x);
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = (w * L) / 2 - w * x;
        return { x: x / L, y: v };
      });
    } else if (lt === "multiple-point") {
      // Sum of multiple point loads
      const validLoads = inputs.pointLoads.filter(
        (pl) => parseFloat(pl.magnitude) > 0 && parseFloat(pl.position) >= 0
      );
      if (validLoads.length === 0) return null;
      const loads = validLoads.map((pl) => ({
        F: parseFloat(pl.magnitude) * FORCE_TO_N[inputs.forceUnit],
        a: parseFloat(pl.position) * LENGTH_TO_M[inputs.lengthUnit],
      }));
      const totalF = loads.reduce((s, l) => s + l.F, 0);
      reactionA = loads.reduce((s, l) => s + l.F * (L - l.a), 0) / L;
      reactionB = totalF - reactionA;
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        let m = reactionA * x;
        for (const ld of loads) {
          if (x > ld.a) m -= ld.F * (x - ld.a);
        }
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        let v = reactionA;
        for (const ld of loads) {
          if (x >= ld.a) v -= ld.F;
        }
        return { x: x / L, y: v };
      });
      maxMomentNm = Math.max(...momentCurve.map((p) => Math.abs(p.y)));
      maxMomentPosition = (momentCurve.find((p) => Math.abs(p.y) === maxMomentNm)?.x ?? 0.5) * L;
      formula = `Multiple point loads — superposition of M = R_A × x − Σ F_i × (x − a_i)`;
      formulaLabel = "Simply Supported – Multiple Point Loads";
    }
  }

  // ── Cantilever ────────────────────────────────────────────────────────
  else if (bt === "cantilever") {
    reactionB = null;
    if (lt === "point-center" || lt === "point-any") {
      // M = F × a (at fixed end, load at distance a from free end)
      const loadDist = lt === "point-center" ? L : a;
      maxMomentNm = F * loadDist;
      maxMomentPosition = 0;
      reactionA = F;
      formula = `M = F × L = ${formatNum(F, 2)} N × ${formatNum(loadDist, 2)} m`;
      formulaLabel = "Cantilever – Point Load: M = F × L";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = x <= loadDist ? F * (loadDist - x) : 0;
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = x <= loadDist ? F : 0;
        return { x: x / L, y: v };
      });
    } else if (lt === "udl") {
      // M = (w × L²) / 2
      const w = F;
      maxMomentNm = (w * L * L) / 2;
      maxMomentPosition = 0;
      reactionA = w * L;
      formula = `M = (w × L²) / 2 = (${formatNum(w, 2)} N/m × ${formatNum(L, 2)}²) / 2`;
      formulaLabel = "Cantilever – UDL: M = (w × L²) / 2";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = (w / 2) * (L - x) * (L - x);
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = w * (L - x);
        return { x: x / L, y: v };
      });
    } else if (lt === "multiple-point") {
      const validLoads = inputs.pointLoads.filter(
        (pl) => parseFloat(pl.magnitude) > 0 && parseFloat(pl.position) >= 0
      );
      if (validLoads.length === 0) return null;
      const loads = validLoads.map((pl) => ({
        F: parseFloat(pl.magnitude) * FORCE_TO_N[inputs.forceUnit],
        a: parseFloat(pl.position) * LENGTH_TO_M[inputs.lengthUnit],
      }));
      reactionA = loads.reduce((s, l) => s + l.F, 0);
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        let m = 0;
        for (const ld of loads) {
          if (x <= ld.a) m += ld.F * (ld.a - x);
        }
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        let v = 0;
        for (const ld of loads) {
          if (x <= ld.a) v += ld.F;
        }
        return { x: x / L, y: v };
      });
      maxMomentNm = Math.max(...momentCurve.map((p) => Math.abs(p.y)));
      maxMomentPosition = 0;
      formula = `M = Σ F_i × (a_i − x) at fixed end`;
      formulaLabel = "Cantilever – Multiple Point Loads";
    }
  }

  // ── Fixed (both ends) ─────────────────────────────────────────────────
  else if (bt === "fixed") {
    if (lt === "point-center") {
      // M_max at ends = F × L / 8, M at center = F × L / 8
      maxMomentNm = (F * L) / 8;
      maxMomentPosition = 0;
      reactionA = F / 2;
      reactionB = F / 2;
      formula = `M_end = (F × L) / 8 = (${formatNum(F, 2)} × ${formatNum(L, 2)}) / 8`;
      formulaLabel = "Fixed Beam – Center Point Load: M = F·L / 8";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = x <= L / 2
          ? -(F * L) / 8 + (F / 2) * x
          : -(F * L) / 8 + (F / 2) * x - F * (x - L / 2);
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = x < L / 2 ? F / 2 : -F / 2;
        return { x: x / L, y: v };
      });
    } else if (lt === "point-any") {
      const b = L - a;
      reactionA = (F * b * b * (3 * a + b)) / (L * L * L);
      reactionB = (F * a * a * (a + 3 * b)) / (L * L * L);
      const MA = -(F * a * b * b) / (L * L);
      maxMomentNm = Math.max(Math.abs(MA), Math.abs((F * a * a * b) / (L * L)));
      maxMomentPosition = a;
      formula = `M_A = −F·a·b²/L², M_B = F·a²·b/L²`;
      formulaLabel = "Fixed Beam – Point Load at Any Position";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        let m = MA + reactionA * x;
        if (x > a) m -= F * (x - a);
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = x < a ? reactionA : reactionA - F;
        return { x: x / L, y: v };
      });
    } else if (lt === "udl") {
      // M_max at ends = w × L² / 12, M at center = w × L² / 24
      const w = F;
      maxMomentNm = (w * L * L) / 12;
      maxMomentPosition = 0;
      reactionA = (w * L) / 2;
      reactionB = (w * L) / 2;
      formula = `M_end = (w × L²) / 12 = (${formatNum(w, 2)} × ${formatNum(L, 2)}²) / 12`;
      formulaLabel = "Fixed Beam – UDL: M_end = w·L² / 12";
      momentCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const m = -(w * L * L) / 12 + (w * L / 2) * x - (w * x * x) / 2;
        return { x: x / L, y: m };
      });
      shearCurve = Array.from({ length: CURVE_POINTS + 1 }, (_, i) => {
        const x = (i / CURVE_POINTS) * L;
        const v = (w * L) / 2 - w * x;
        return { x: x / L, y: v };
      });
    } else {
      // fallback to simply supported for multiple
      return calculate({ ...inputs, beamType: "simply-supported" });
    }
  }

  // Normalize moment curve for display
  if (momentCurve.length === 0) return null;

  const maxAbsMoment = Math.max(...momentCurve.map((p) => Math.abs(p.y)));
  if (maxAbsMoment === 0) return null;

  // Ensure maxMomentNm is set for multiple-point cases
  if (maxMomentNm === 0) {
    maxMomentNm = maxAbsMoment;
  }

  return {
    maxMoment: nmToUnit(maxMomentNm, inputs.outputUnit),
    maxMomentNm,
    maxMomentKNm:   maxMomentNm / 1000,
    maxMomentLbFt:  maxMomentNm * 0.737562,
    maxMomentLbIn:  maxMomentNm * 8.85075,
    maxMomentKipFt: maxMomentNm * 0.000737562,
    momentAtPosition: maxMomentNm,
    reactionA,
    reactionB,
    formula,
    formulaLabel,
    momentCurve,
    shearCurve,
    maxMomentPosition,
    lengthM: L,
    loadN: F,
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

const HISTORY_KEY = "bending-moment-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: BendingMomentInputs, result: BendingMomentResult): void {
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

export function exportToText(inputs: BendingMomentInputs, result: BendingMomentResult): string {
  const p = inputs.precision;
  const beamLabels: Record<string, string> = {
    "simply-supported": "Simply Supported",
    "cantilever": "Cantilever",
    "fixed": "Fixed (Both Ends)",
    "overhanging": "Overhanging",
  };
  const loadLabels: Record<string, string> = {
    "point-center": "Point Load (Center)",
    "point-any": "Point Load (Any Position)",
    "udl": "Uniformly Distributed Load (UDL)",
    "multiple-point": "Multiple Point Loads",
  };
  return [
    "Bending Moment Calculator – Result",
    "=".repeat(45),
    "",
    `Beam Type    : ${beamLabels[inputs.beamType]}`,
    `Load Type    : ${loadLabels[inputs.loadType]}`,
    `Beam Length  : ${inputs.length} ${LENGTH_SHORT[inputs.lengthUnit]} (${formatNum(result.lengthM, p)} m)`,
    inputs.loadType !== "multiple-point"
      ? `Load         : ${inputs.load} ${FORCE_SHORT[inputs.forceUnit]} (${formatNum(result.loadN, p)} N)`
      : `Loads        : ${inputs.pointLoads.length} point loads`,
    "",
    `Max Moment (Nm)   : ${formatNum(result.maxMomentNm, p)} Nm`,
    `Max Moment (kNm)  : ${formatNum(result.maxMomentKNm, p)} kNm`,
    `Max Moment (lb-ft): ${formatNum(result.maxMomentLbFt, p)} lb-ft`,
    `Max Moment (lb-in): ${formatNum(result.maxMomentLbIn, p)} lb-in`,
    "",
    `Reaction A   : ${formatNum(result.reactionA, p)} N`,
    result.reactionB !== null ? `Reaction B   : ${formatNum(result.reactionB, p)} N` : "",
    "",
    `Formula: ${result.formula}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
