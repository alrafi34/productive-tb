import { BeamInputs, BeamResult, SectionDimensions, SectionType, HistoryEntry } from "./types";

// ── Material elastic moduli (GPa) ─────────────────────────────────────────
export const MATERIALS: Record<string, { label: string; E_GPa: number }> = {
  steel:     { label: "Steel",     E_GPa: 200 },
  aluminum:  { label: "Aluminum",  E_GPa: 69  },
  concrete:  { label: "Concrete",  E_GPa: 30  },
  wood:      { label: "Wood",      E_GPa: 12  },
  custom:    { label: "Custom",    E_GPa: 0   },
};

// ── Default inputs (US defaults) ─────────────────────────────────────────
export const DEFAULT_INPUTS: BeamInputs = {
  beamType:     "simply-supported",
  loadType:     "point-center",
  length:       "10",
  load:         "10",
  loadPosition: "5",
  material:     "steel",
  customE:      "200",
  sectionType:  "rectangle",
  section: { width: 4, height: 6 },
  unitSystem:   "imperial",
  precision:    2,
};

// ── Moment of Inertia (mm^4 or in^4) ─────────────────────────────────────
export function calcMomentOfInertia(type: SectionType, s: SectionDimensions): number {
  switch (type) {
    case "rectangle": {
      const b = s.width ?? 1, h = s.height ?? 1;
      return (b * Math.pow(h, 3)) / 12;
    }
    case "circle": {
      const d = s.diameter ?? 1;
      return (Math.PI * Math.pow(d, 4)) / 64;
    }
    case "i-beam": {
      const bf = s.flangeWidth ?? 1, tf = s.flangeThickness ?? 1;
      const hw = s.webHeight ?? 1, tw = s.webThickness ?? 1;
      const totalH = hw + 2 * tf;
      const Igross = (bf * Math.pow(totalH, 3)) / 12;
      const Iweb   = ((bf - tw) * Math.pow(hw, 3)) / 12;
      return Igross - Iweb;
    }
    case "pipe": {
      const od = s.outerDiameter ?? 2, id = s.innerDiameter ?? 1;
      return (Math.PI / 64) * (Math.pow(od, 4) - Math.pow(id, 4));
    }
    case "custom":
      return s.customI ?? 1;
    default:
      return 1;
  }
}

export function sectionLabel(type: SectionType): string {
  const map: Record<SectionType, string> = {
    rectangle: "Rectangle",
    circle:    "Circular",
    "i-beam":  "I-Beam",
    pipe:      "Pipe",
    custom:    "Custom I",
  };
  return map[type];
}

// ── Unit helpers ──────────────────────────────────────────────────────────
// Imperial: length in ft → convert to in for formula; load in kip; E in ksi; I in in^4 → deflection in in
// Metric:   length in m  → convert to mm; load in kN; E in GPa → kN/mm²; I in mm^4 → deflection in mm

function toBaseLength(val: number, system: "metric" | "imperial"): number {
  return system === "metric" ? val * 1000 : val * 12; // m→mm or ft→in
}

function toBaseLoad(val: number, system: "metric" | "imperial"): number {
  return system === "metric" ? val : val; // kN or kip — same numeric
}

function toBaseUDL(val: number, system: "metric" | "imperial"): number {
  // kN/m → kN/mm  or  kip/ft → kip/in
  return system === "metric" ? val / 1000 : val / 12;
}

function toBaseE(E_GPa: number, system: "metric" | "imperial"): number {
  // GPa → kN/mm²  or  ksi → kip/in²
  return system === "metric" ? E_GPa : E_GPa * 1000; // 1 GPa = 1 kN/mm²; 1 ksi = 1 kip/in²
}

function deflectionUnit(system: "metric" | "imperial"): string {
  return system === "metric" ? "mm" : "in";
}

function forceUnit(system: "metric" | "imperial"): string {
  return system === "metric" ? "kN" : "kip";
}

function momentUnit(system: "metric" | "imperial"): string {
  return system === "metric" ? "kN·m" : "kip·ft";
}

// ── Deflection curve generation (normalised y, 0..1 range) ───────────────
function genDeflectionCurve(
  beamType: string, loadType: string,
  L: number, P: number, E: number, I: number, a?: number,
  points = 60
): { x: number; y: number }[] {
  const EI = E * I;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * L;
    let y = 0;
    if (beamType === "simply-supported") {
      if (loadType === "point-center") {
        // δ(x) = Px(3L²-4x²)/(48EI) for x ≤ L/2
        const xi = Math.min(x, L - x);
        y = (P * xi * (3 * L * L - 4 * xi * xi)) / (48 * EI);
      } else if (loadType === "point-any" && a !== undefined) {
        const b = L - a;
        if (x <= a) y = (P * b * x * (L * L - b * b - x * x)) / (6 * EI * L);
        else        y = (P * a * (L - x) * (2 * L * x - x * x - a * a)) / (6 * EI * L);
      } else if (loadType === "udl") {
        y = (P * x * (L * L * L - 2 * L * x * x + x * x * x)) / (24 * EI);
      } else if (loadType === "moment") {
        y = (P * x * (2 * L * L - 3 * L * x + x * x)) / (6 * EI * L);
      }
    } else if (beamType === "cantilever") {
      if (loadType === "point-center" || loadType === "point-any") {
        const a2 = a ?? L;
        if (x <= a2) y = (P * x * x * (3 * a2 - x)) / (6 * EI);
        else         y = (P * a2 * a2 * (3 * x - a2)) / (6 * EI);
      } else if (loadType === "udl") {
        y = (P * x * x * (6 * L * L - 4 * L * x + x * x)) / (24 * EI);
      } else if (loadType === "moment") {
        y = (P * x * x) / (2 * EI);
      }
    } else if (beamType === "fixed") {
      if (loadType === "point-center") {
        const xi = Math.min(x, L - x);
        y = (P * xi * xi * (3 * L - 4 * xi)) / (48 * EI);
      } else if (loadType === "udl") {
        y = (P * x * x * (L - x) * (L - x)) / (24 * EI);
      }
    } else if (beamType === "overhanging") {
      // Treat as simply supported for curve shape
      y = (P * x * (L * L * L - 2 * L * x * x + x * x * x)) / (24 * EI);
    }
    pts.push({ x: x / L, y });
  }
  const maxY = Math.max(...pts.map(p => Math.abs(p.y)), 1e-12);
  return pts.map(p => ({ x: p.x, y: p.y / maxY }));
}

// ── Moment curve (normalised) ─────────────────────────────────────────────
function genMomentCurve(
  beamType: string, loadType: string,
  L: number, P: number, a?: number, points = 60
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * L;
    let m = 0;
    if (beamType === "simply-supported") {
      if (loadType === "point-center") {
        m = x <= L / 2 ? P * x / 2 : P * (L - x) / 2;
      } else if (loadType === "point-any" && a !== undefined) {
        const b = L - a;
        m = x <= a ? P * b * x / L : P * a * (L - x) / L;
      } else if (loadType === "udl") {
        m = P * x * (L - x) / 2;
      }
    } else if (beamType === "cantilever") {
      const a2 = a ?? L;
      if (loadType === "point-center" || loadType === "point-any") {
        m = x <= a2 ? P * (a2 - x) : 0;
      } else if (loadType === "udl") {
        m = P * (L - x) * (L - x) / 2;
      }
    } else if (beamType === "fixed") {
      if (loadType === "point-center") {
        m = x <= L / 2 ? P * x / 4 - P * L / 8 : P * (L - x) / 4 - P * L / 8;
      } else if (loadType === "udl") {
        m = P * L * L / 12 - P * x * (L - x) / 2;
      }
    }
    pts.push({ x: x / L, y: m });
  }
  const maxM = Math.max(...pts.map(p => Math.abs(p.y)), 1e-12);
  return pts.map(p => ({ x: p.x, y: p.y / maxM }));
}

// ── Shear curve (normalised) ──────────────────────────────────────────────
function genShearCurve(
  beamType: string, loadType: string,
  L: number, P: number, a?: number, points = 60
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * L;
    let v = 0;
    if (beamType === "simply-supported") {
      if (loadType === "point-center") {
        v = x < L / 2 ? P / 2 : -P / 2;
      } else if (loadType === "point-any" && a !== undefined) {
        const b = L - a;
        v = x < a ? P * b / L : -P * a / L;
      } else if (loadType === "udl") {
        v = P * (L / 2 - x);
      }
    } else if (beamType === "cantilever") {
      const a2 = a ?? L;
      if (loadType === "point-center" || loadType === "point-any") {
        v = x <= a2 ? -P : 0;
      } else if (loadType === "udl") {
        v = -P * (L - x);
      }
    } else if (beamType === "fixed") {
      if (loadType === "point-center") {
        v = x < L / 2 ? P / 2 : -P / 2;
      } else if (loadType === "udl") {
        v = P * (L / 2 - x);
      }
    }
    pts.push({ x: x / L, y: v });
  }
  const maxV = Math.max(...pts.map(p => Math.abs(p.y)), 1e-12);
  return pts.map(p => ({ x: p.x, y: p.y / maxV }));
}

// ── Main calculation ──────────────────────────────────────────────────────
export function calculate(inputs: BeamInputs): BeamResult {
  const sys = inputs.unitSystem;
  const L_raw = parseFloat(inputs.length);
  const P_raw = parseFloat(inputs.load);
  const a_raw = parseFloat(inputs.loadPosition);

  // Convert to base units (mm or in)
  const L = toBaseLength(L_raw, sys);
  const a = isNaN(a_raw) ? L / 2 : toBaseLength(a_raw, sys);

  // Elastic modulus
  const E_GPa = inputs.material === "custom"
    ? parseFloat(inputs.customE) || 200
    : MATERIALS[inputs.material]?.E_GPa ?? 200;
  const E = toBaseE(E_GPa, sys);

  // Moment of inertia
  const I = calcMomentOfInertia(inputs.sectionType, inputs.section);

  const EI = E * I;

  // Load
  const P_base = toBaseLoad(P_raw, sys);
  const w_base = toBaseUDL(P_raw, sys); // for UDL

  let maxDeflection = 0;
  let slope = 0;
  let reactionA = 0;
  let reactionB: number | null = null;
  let maxMoment = 0;
  let maxShear = 0;
  let formula = "";
  const steps: string[] = [];

  const bt = inputs.beamType;
  const lt = inputs.loadType;

  if (bt === "simply-supported") {
    if (lt === "point-center") {
      maxDeflection = (P_base * Math.pow(L, 3)) / (48 * EI);
      slope = (P_base * L * L) / (16 * EI);
      reactionA = P_base / 2;
      reactionB = P_base / 2;
      maxMoment = (P_base * L) / 4;
      maxShear = P_base / 2;
      formula = "δ_max = PL³ / (48EI)";
      steps.push(`L = ${L_raw} ${sys === "metric" ? "m" : "ft"} = ${L.toFixed(1)} ${sys === "metric" ? "mm" : "in"}`);
      steps.push(`P = ${P_raw} ${forceUnit(sys)}`);
      steps.push(`E = ${E_GPa} ${sys === "metric" ? "GPa" : "ksi"} = ${E.toExponential(3)} ${sys === "metric" ? "kN/mm²" : "kip/in²"}`);
      steps.push(`I = ${I.toExponential(3)} ${sys === "metric" ? "mm⁴" : "in⁴"}`);
      steps.push(`EI = ${EI.toExponential(3)}`);
      steps.push(`δ_max = (${P_raw} × ${L.toFixed(1)}³) / (48 × ${EI.toExponential(3)})`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else if (lt === "point-any") {
      const b = L - a;
      maxDeflection = (P_base * b * (L * L - b * b) * Math.sqrt(3)) / (27 * EI * L) * Math.sqrt(L * L - b * b);
      // More accurate: at x = sqrt((L²-b²)/3)
      const x_max = Math.sqrt((L * L - b * b) / 3);
      maxDeflection = (P_base * b * x_max * (L * L - b * b - x_max * x_max)) / (6 * EI * L);
      slope = (P_base * a * b * (a + 2 * b)) / (6 * EI * L) * Math.sqrt(3 * a * (a + 2 * b));
      reactionA = P_base * b / L;
      reactionB = P_base * a / L;
      maxMoment = P_base * a * b / L;
      maxShear = Math.max(reactionA, reactionB);
      formula = "δ_max = Pb(L²-b²)^(3/2) / (9√3·EIL)";
      steps.push(`a = ${a_raw} ${sys === "metric" ? "m" : "ft"}, b = L - a = ${(L_raw - a_raw).toFixed(2)} ${sys === "metric" ? "m" : "ft"}`);
      steps.push(`R_A = Pb/L = ${reactionA.toFixed(4)} ${forceUnit(sys)}`);
      steps.push(`R_B = Pa/L = ${reactionB.toFixed(4)} ${forceUnit(sys)}`);
      steps.push(`M_max = Pab/L = ${maxMoment.toFixed(4)} ${sys === "metric" ? "kN·mm" : "kip·in"}`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else if (lt === "udl") {
      maxDeflection = (5 * w_base * Math.pow(L, 4)) / (384 * EI);
      slope = (w_base * Math.pow(L, 3)) / (24 * EI);
      reactionA = w_base * L / 2;
      reactionB = w_base * L / 2;
      maxMoment = (w_base * L * L) / 8;
      maxShear = w_base * L / 2;
      formula = "δ_max = 5wL⁴ / (384EI)";
      steps.push(`w = ${P_raw} ${sys === "metric" ? "kN/m" : "kip/ft"} = ${w_base.toExponential(3)} ${sys === "metric" ? "kN/mm" : "kip/in"}`);
      steps.push(`δ_max = (5 × ${w_base.toExponential(3)} × ${L.toFixed(1)}⁴) / (384 × ${EI.toExponential(3)})`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else if (lt === "moment") {
      maxDeflection = (P_base * L * L) / (9 * Math.sqrt(3) * EI);
      slope = (P_base * L) / (3 * EI);
      reactionA = P_base / L;
      reactionB = -P_base / L;
      maxMoment = P_base;
      maxShear = P_base / L;
      formula = "δ_max = ML² / (9√3·EI)";
      steps.push(`M = ${P_raw} ${sys === "metric" ? "kN·m" : "kip·ft"}`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    }
  } else if (bt === "cantilever") {
    const a2 = (lt === "point-any") ? a : L;
    if (lt === "point-center" || lt === "point-any") {
      maxDeflection = (P_base * Math.pow(a2, 2) * (3 * L - a2)) / (6 * EI);
      slope = (P_base * a2 * a2) / (2 * EI);
      reactionA = P_base;
      reactionB = null;
      maxMoment = P_base * a2;
      maxShear = P_base;
      formula = lt === "point-center" ? "δ_max = PL³ / (3EI)" : "δ_tip = Pa²(3L-a) / (6EI)";
      steps.push(`L = ${L_raw} ${sys === "metric" ? "m" : "ft"} = ${L.toFixed(1)} ${sys === "metric" ? "mm" : "in"}`);
      steps.push(`P = ${P_raw} ${forceUnit(sys)}`);
      steps.push(`δ_max = (${P_raw} × ${a2.toFixed(1)}² × (3×${L.toFixed(1)} - ${a2.toFixed(1)})) / (6 × ${EI.toExponential(3)})`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else if (lt === "udl") {
      maxDeflection = (w_base * Math.pow(L, 4)) / (8 * EI);
      slope = (w_base * Math.pow(L, 3)) / (6 * EI);
      reactionA = w_base * L;
      reactionB = null;
      maxMoment = (w_base * L * L) / 2;
      maxShear = w_base * L;
      formula = "δ_max = wL⁴ / (8EI)";
      steps.push(`w = ${P_raw} ${sys === "metric" ? "kN/m" : "kip/ft"}`);
      steps.push(`δ_max = (${w_base.toExponential(3)} × ${L.toFixed(1)}⁴) / (8 × ${EI.toExponential(3)})`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else if (lt === "moment") {
      maxDeflection = (P_base * L * L) / (2 * EI);
      slope = (P_base * L) / EI;
      reactionA = 0;
      reactionB = null;
      maxMoment = P_base;
      maxShear = 0;
      formula = "δ_max = ML² / (2EI)";
      steps.push(`M = ${P_raw} ${sys === "metric" ? "kN·m" : "kip·ft"}`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    }
  } else if (bt === "fixed") {
    if (lt === "point-center") {
      maxDeflection = (P_base * Math.pow(L, 3)) / (192 * EI);
      slope = 0;
      reactionA = P_base / 2;
      reactionB = P_base / 2;
      maxMoment = (P_base * L) / 8;
      maxShear = P_base / 2;
      formula = "δ_max = PL³ / (192EI)";
      steps.push(`δ_max = (${P_raw} × ${L.toFixed(1)}³) / (192 × ${EI.toExponential(3)})`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else if (lt === "udl") {
      maxDeflection = (w_base * Math.pow(L, 4)) / (384 * EI);
      slope = 0;
      reactionA = w_base * L / 2;
      reactionB = w_base * L / 2;
      maxMoment = (w_base * L * L) / 12;
      maxShear = w_base * L / 2;
      formula = "δ_max = wL⁴ / (384EI)";
      steps.push(`δ_max = (${w_base.toExponential(3)} × ${L.toFixed(1)}⁴) / (384 × ${EI.toExponential(3)})`);
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    } else {
      // fallback to simply-supported for other load types
      maxDeflection = (P_base * Math.pow(L, 3)) / (192 * EI);
      reactionA = P_base / 2;
      reactionB = P_base / 2;
      maxMoment = (P_base * L) / 8;
      maxShear = P_base / 2;
      formula = "δ_max = PL³ / (192EI)";
      steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
    }
  } else if (bt === "overhanging") {
    // Treat as simply supported with UDL for simplicity
    maxDeflection = (5 * w_base * Math.pow(L, 4)) / (384 * EI);
    reactionA = w_base * L / 2;
    reactionB = w_base * L / 2;
    maxMoment = (w_base * L * L) / 8;
    maxShear = w_base * L / 2;
    formula = "δ_max = 5wL⁴ / (384EI) (approx.)";
    steps.push(`δ_max = ${maxDeflection.toFixed(4)} ${deflectionUnit(sys)}`);
  }

  // Convert moment back to display units (kN·m or kip·ft)
  const momentDisplayFactor = sys === "metric" ? 1 / 1000 : 1 / 12;
  const maxMomentDisplay = maxMoment * momentDisplayFactor;
  const reactionADisplay = reactionA;
  const reactionBDisplay = reactionB;

  // Safety note
  let safetyNote = "";
  const deflMM = sys === "metric" ? maxDeflection : maxDeflection * 25.4;
  const L_mm = sys === "metric" ? L : L * 25.4;
  const ratio = L_mm / deflMM;
  if (ratio < 300) safetyNote = "⚠️ Deflection exceeds L/300 — consider a stiffer section or shorter span.";
  else if (ratio < 360) safetyNote = "⚠️ Deflection is near L/360 limit for floor beams. Review serviceability.";
  else safetyNote = "✓ Deflection is within typical serviceability limits (L/360 or better).";

  // Curves
  const deflCurve = genDeflectionCurve(bt, lt, L, lt === "udl" ? w_base : P_base, E, I, a);
  const momCurve  = genMomentCurve(bt, lt, L, lt === "udl" ? w_base : P_base, a);
  const shearCurve = genShearCurve(bt, lt, L, lt === "udl" ? w_base : P_base, a);

  return {
    maxDeflection,
    deflectionUnit: deflectionUnit(sys),
    slope,
    reactionA: reactionADisplay,
    reactionB: reactionBDisplay,
    maxMoment: maxMomentDisplay,
    maxShear,
    momentOfInertia: I,
    elasticModulus: E_GPa,
    formula,
    steps,
    deflectionCurve: deflCurve,
    momentCurve: momCurve,
    shearCurve,
    safetyNote,
  };
}

// ── Validation ────────────────────────────────────────────────────────────
export function validateInputs(inputs: BeamInputs): string | null {
  const L = parseFloat(inputs.length);
  const P = parseFloat(inputs.load);
  if (isNaN(L) || L <= 0) return "Beam length must be greater than zero.";
  if (isNaN(P) || P < 0) return "Load value must be zero or greater.";
  if (inputs.loadType === "point-any") {
    const a = parseFloat(inputs.loadPosition);
    if (isNaN(a) || a < 0 || a > L) return "Load position must be between 0 and beam length.";
  }
  if (inputs.material === "custom") {
    const E = parseFloat(inputs.customE);
    if (isNaN(E) || E <= 0) return "Custom elastic modulus must be greater than zero.";
  }
  const I = calcMomentOfInertia(inputs.sectionType, inputs.section);
  if (I <= 0) return "Moment of inertia must be greater than zero. Check section dimensions.";
  return null;
}

// ── Formatting ────────────────────────────────────────────────────────────
export function formatNum(val: number, precision: number): string {
  if (!isFinite(val)) return "—";
  if (Math.abs(val) >= 1e6) return val.toExponential(precision);
  return val.toFixed(precision);
}

// ── Debounce ──────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── LocalStorage history ──────────────────────────────────────────────────
const HISTORY_KEY = "beam-deflection-history";

export function saveToHistory(inputs: BeamInputs, result: BeamResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };
  history.unshift(entry);
  if (history.length > 20) history.pop();
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export ────────────────────────────────────────────────────────────────
export function exportToText(inputs: BeamInputs, result: BeamResult): string {
  const sys = inputs.unitSystem;
  const fu = sys === "metric" ? "kN" : "kip";
  const mu = sys === "metric" ? "kN·m" : "kip·ft";
  return [
    "=== Beam Deflection Calculator ===",
    `Beam Type:        ${inputs.beamType}`,
    `Load Type:        ${inputs.loadType}`,
    `Beam Length:      ${inputs.length} ${sys === "metric" ? "m" : "ft"}`,
    `Load:             ${inputs.load} ${inputs.loadType === "udl" ? (sys === "metric" ? "kN/m" : "kip/ft") : fu}`,
    `Material:         ${inputs.material} (E = ${result.elasticModulus} ${sys === "metric" ? "GPa" : "ksi"})`,
    `Section:          ${inputs.sectionType} (I = ${result.momentOfInertia.toExponential(3)} ${sys === "metric" ? "mm⁴" : "in⁴"})`,
    "",
    "=== Results ===",
    `Max Deflection:   ${formatNum(result.maxDeflection, 4)} ${result.deflectionUnit}`,
    `Slope:            ${formatNum(result.slope, 6)} rad`,
    `Reaction A:       ${formatNum(result.reactionA, 4)} ${fu}`,
    result.reactionB !== null ? `Reaction B:       ${formatNum(result.reactionB, 4)} ${fu}` : "",
    `Max Moment:       ${formatNum(result.maxMoment, 4)} ${mu}`,
    `Max Shear:        ${formatNum(result.maxShear, 4)} ${fu}`,
    "",
    `Formula:          ${result.formula}`,
    "",
    result.safetyNote,
  ].filter(l => l !== undefined).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── Presets ───────────────────────────────────────────────────────────────
export const PRESETS = [
  {
    label: "Steel Floor Beam",
    inputs: { beamType: "simply-supported" as const, loadType: "udl" as const, length: "20", load: "2", material: "steel", sectionType: "i-beam" as const, section: { flangeWidth: 6, flangeThickness: 0.5, webHeight: 10, webThickness: 0.3 }, unitSystem: "imperial" as const },
  },
  {
    label: "Cantilever Shelf",
    inputs: { beamType: "cantilever" as const, loadType: "point-center" as const, length: "4", load: "0.5", material: "steel", sectionType: "rectangle" as const, section: { width: 2, height: 3 }, unitSystem: "imperial" as const },
  },
  {
    label: "Concrete Beam",
    inputs: { beamType: "simply-supported" as const, loadType: "point-center" as const, length: "6", load: "20", material: "concrete", sectionType: "rectangle" as const, section: { width: 300, height: 500 }, unitSystem: "metric" as const },
  },
  {
    label: "Fixed Beam UDL",
    inputs: { beamType: "fixed" as const, loadType: "udl" as const, length: "15", load: "1.5", material: "steel", sectionType: "i-beam" as const, section: { flangeWidth: 5, flangeThickness: 0.4, webHeight: 8, webThickness: 0.25 }, unitSystem: "imperial" as const },
  },
];
