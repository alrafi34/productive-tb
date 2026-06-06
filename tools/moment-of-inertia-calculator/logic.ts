import { MOIInputs, MOIResult, ShapeDimensions, ShapeType, LengthUnit, HistoryEntry } from "./types";

// ── Unit conversion to mm ──────────────────────────────────────────────────
export const UNIT_TO_MM: Record<LengthUnit, number> = {
  mm: 1,
  cm: 10,
  m:  1000,
  in: 25.4,
  ft: 304.8,
};

export const UNIT_LABELS: Record<LengthUnit, string> = {
  mm: "Millimeter (mm)",
  cm: "Centimeter (cm)",
  m:  "Meter (m)",
  in: "Inch (in)",
  ft: "Foot (ft)",
};

export const ALL_UNITS: LengthUnit[] = ["mm", "cm", "m", "in", "ft"];

export const SHAPE_LABELS: Record<ShapeType, string> = {
  "rectangle":        "Rectangle",
  "hollow-rectangle": "Hollow Rectangle",
  "circle":           "Solid Circle",
  "hollow-circle":    "Hollow Circle",
  "triangle":         "Triangle",
  "i-beam":           "I-Beam",
  "t-beam":           "T-Beam",
  "channel":          "Channel Section",
  "pipe":             "Pipe Section",
};

export const SHAPE_HINTS: Record<ShapeType, string> = {
  "rectangle":        "Used commonly in beam and column design.",
  "hollow-rectangle": "Used in box beams and structural hollow sections.",
  "circle":           "Common in shaft and solid rod calculations.",
  "hollow-circle":    "Common in pipe and hollow shaft calculations.",
  "triangle":         "Used in truss members and wedge analysis.",
  "i-beam":           "Standard structural steel section for beams.",
  "t-beam":           "Used in reinforced concrete and composite beams.",
  "channel":          "C-channel sections used in framing and supports.",
  "pipe":             "Circular hollow section for piping and shafts.",
};

export const SHAPE_ICON: Record<ShapeType, string> = {
  "rectangle":        "▭",
  "hollow-rectangle": "▭",
  "circle":           "○",
  "hollow-circle":    "◎",
  "triangle":         "△",
  "i-beam":           "I",
  "t-beam":           "T",
  "channel":          "C",
  "pipe":             "◎",
};

// ── Default dimensions (US-friendly defaults in inches) ────────────────────
export const DEFAULT_DIMS: Record<ShapeType, ShapeDimensions> = {
  "rectangle":        { width: "4", height: "8" },
  "hollow-rectangle": { width: "6", height: "10", innerWidth: "4", innerHeight: "8" },
  "circle":           { diameter: "4" },
  "hollow-circle":    { outerDiameter: "5", innerDiameter: "3" },
  "triangle":         { base: "6", height: "8" },
  "i-beam":           { flangeWidth: "6", flangeThickness: "0.5", webHeight: "10", webThickness: "0.375" },
  "t-beam":           { tFlangeWidth: "6", tFlangeThickness: "0.5", tWebHeight: "8", tWebThickness: "0.375" },
  "channel":          { chFlangeWidth: "4", chFlangeThickness: "0.5", chWebHeight: "8", chWebThickness: "0.375" },
  "pipe":             { outerDiameter: "4", innerDiameter: "3.5" },
};

// ── Unit label for results ─────────────────────────────────────────────────
function getUnitLabel(unit: LengthUnit): string {
  return `${unit}⁴`;
}
function getAreaUnitLabel(unit: LengthUnit): string {
  return `${unit}²`;
}

// ── Parse helper ──────────────────────────────────────────────────────────
function p(v: string | undefined): number {
  return parseFloat(v ?? "0") || 0;
}

// ── Core calculation ───────────────────────────────────────────────────────
export function calculate(inputs: MOIInputs): MOIResult | null {
  const err = validateInputs(inputs);
  if (err) return null;

  const d = inputs.dims;
  let Ix = 0, Iy = 0, area = 0, centroidX = 0, centroidY = 0, formula = "";

  switch (inputs.shape) {
    case "rectangle": {
      const b = p(d.width), h = p(d.height);
      Ix = (b * Math.pow(h, 3)) / 12;
      Iy = (h * Math.pow(b, 3)) / 12;
      area = b * h;
      centroidX = b / 2;
      centroidY = h / 2;
      formula = `Ix = bh³/12 = ${b}×${h}³/12 | Iy = hb³/12 = ${h}×${b}³/12`;
      break;
    }
    case "hollow-rectangle": {
      const b = p(d.width), h = p(d.height), bi = p(d.innerWidth), hi = p(d.innerHeight);
      Ix = (b * Math.pow(h, 3) - bi * Math.pow(hi, 3)) / 12;
      Iy = (h * Math.pow(b, 3) - hi * Math.pow(bi, 3)) / 12;
      area = b * h - bi * hi;
      centroidX = b / 2;
      centroidY = h / 2;
      formula = `Ix = (bh³ - b_i·h_i³)/12 | Iy = (hb³ - h_i·b_i³)/12`;
      break;
    }
    case "circle": {
      const r = p(d.diameter) / 2;
      Ix = (Math.PI * Math.pow(r * 2, 4)) / 64;
      Iy = Ix;
      area = Math.PI * r * r;
      centroidX = r;
      centroidY = r;
      formula = `I = πd⁴/64 = π×${p(d.diameter)}⁴/64`;
      break;
    }
    case "hollow-circle":
    case "pipe": {
      const D = p(d.outerDiameter), di = p(d.innerDiameter);
      Ix = (Math.PI * (Math.pow(D, 4) - Math.pow(di, 4))) / 64;
      Iy = Ix;
      area = (Math.PI / 4) * (D * D - di * di);
      centroidX = D / 2;
      centroidY = D / 2;
      formula = `I = π(D⁴ - d⁴)/64 = π(${D}⁴ - ${di}⁴)/64`;
      break;
    }
    case "triangle": {
      const b = p(d.base), h = p(d.height);
      Ix = (b * Math.pow(h, 3)) / 36;
      Iy = (h * Math.pow(b, 3)) / 48;
      area = (b * h) / 2;
      centroidX = b / 3;
      centroidY = h / 3;
      formula = `Ix = bh³/36 | Iy = hb³/48`;
      break;
    }
    case "i-beam": {
      const bf = p(d.flangeWidth), tf = p(d.flangeThickness);
      const hw = p(d.webHeight), tw = p(d.webThickness);
      const H = hw + 2 * tf;
      // Ix = (bf*H³ - (bf-tw)*hw³) / 12
      Ix = (bf * Math.pow(H, 3) - (bf - tw) * Math.pow(hw, 3)) / 12;
      // Iy = (2*tf*bf³ + hw*tw³) / 12
      Iy = (2 * tf * Math.pow(bf, 3) + hw * Math.pow(tw, 3)) / 12;
      area = 2 * bf * tf + hw * tw;
      centroidX = bf / 2;
      centroidY = H / 2;
      formula = `Ix = (bf·H³ - (bf-tw)·hw³)/12 | Iy = (2tf·bf³ + hw·tw³)/12`;
      break;
    }
    case "t-beam": {
      const bf = p(d.tFlangeWidth), tf = p(d.tFlangeThickness);
      const hw = p(d.tWebHeight), tw = p(d.tWebThickness);
      const H = hw + tf;
      const A_flange = bf * tf;
      const A_web = hw * tw;
      area = A_flange + A_web;
      // centroid from bottom
      const yc = (A_flange * (hw + tf / 2) + A_web * (hw / 2)) / area;
      centroidY = yc;
      centroidX = bf / 2;
      // Ix about centroid using parallel axis theorem
      const Ix_flange = (bf * Math.pow(tf, 3)) / 12 + A_flange * Math.pow(hw + tf / 2 - yc, 2);
      const Ix_web = (tw * Math.pow(hw, 3)) / 12 + A_web * Math.pow(hw / 2 - yc, 2);
      Ix = Ix_flange + Ix_web;
      Iy = (tf * Math.pow(bf, 3) + hw * Math.pow(tw, 3)) / 12;
      formula = `Ix = Σ(I_centroid + A·d²) using parallel axis theorem`;
      break;
    }
    case "channel": {
      const bf = p(d.chFlangeWidth), tf = p(d.chFlangeThickness);
      const hw = p(d.chWebHeight), tw = p(d.chWebThickness);
      const H = hw + 2 * tf;
      Ix = (bf * Math.pow(H, 3) - (bf - tw) * Math.pow(hw, 3)) / 12;
      const A_flanges = 2 * bf * tf;
      const A_web = hw * tw;
      area = A_flanges + A_web;
      // centroid x from back of web
      const xc = (A_flanges * (bf / 2) + A_web * (tw / 2)) / area;
      centroidX = xc;
      centroidY = H / 2;
      Iy = (2 * tf * Math.pow(bf, 3) / 3 + hw * Math.pow(tw, 3) / 12) - area * xc * xc;
      formula = `Ix = (bf·H³ - (bf-tw)·hw³)/12 | Iy via parallel axis`;
      break;
    }
  }

  const Ip = Ix + Iy;
  const Sx = centroidY > 0 ? Ix / centroidY : 0;
  const Sy = centroidX > 0 ? Iy / centroidX : 0;

  return {
    Ix,
    Iy,
    Ip,
    Sx,
    Sy,
    area,
    centroidX,
    centroidY,
    unitLabel: getUnitLabel(inputs.unit),
    areaUnitLabel: getAreaUnitLabel(inputs.unit),
    formula,
  };
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validateInputs(inputs: MOIInputs): string | null {
  const d = inputs.dims;
  const pos = (v: string | undefined, label: string) => {
    const n = parseFloat(v ?? "");
    if (isNaN(n) || n <= 0) return `${label} must be greater than zero.`;
    return null;
  };

  switch (inputs.shape) {
    case "rectangle":
      return pos(d.width, "Width") ?? pos(d.height, "Height");
    case "hollow-rectangle": {
      const e = pos(d.width, "Width") ?? pos(d.height, "Height") ??
                pos(d.innerWidth, "Inner width") ?? pos(d.innerHeight, "Inner height");
      if (e) return e;
      if (p(d.innerWidth) >= p(d.width)) return "Inner width must be less than outer width.";
      if (p(d.innerHeight) >= p(d.height)) return "Inner height must be less than outer height.";
      return null;
    }
    case "circle":
      return pos(d.diameter, "Diameter");
    case "hollow-circle":
    case "pipe": {
      const e = pos(d.outerDiameter, "Outer diameter") ?? pos(d.innerDiameter, "Inner diameter");
      if (e) return e;
      if (p(d.innerDiameter) >= p(d.outerDiameter)) return "Inner diameter must be less than outer diameter.";
      return null;
    }
    case "triangle":
      return pos(d.base, "Base") ?? pos(d.height, "Height");
    case "i-beam":
      return pos(d.flangeWidth, "Flange width") ?? pos(d.flangeThickness, "Flange thickness") ??
             pos(d.webHeight, "Web height") ?? pos(d.webThickness, "Web thickness");
    case "t-beam":
      return pos(d.tFlangeWidth, "Flange width") ?? pos(d.tFlangeThickness, "Flange thickness") ??
             pos(d.tWebHeight, "Web height") ?? pos(d.tWebThickness, "Web thickness");
    case "channel":
      return pos(d.chFlangeWidth, "Flange width") ?? pos(d.chFlangeThickness, "Flange thickness") ??
             pos(d.chWebHeight, "Web height") ?? pos(d.chWebThickness, "Web thickness");
  }
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(value: number, decimals: number): string {
  if (value === 0) return "0";
  if (Math.abs(value) >= 1e9 || (Math.abs(value) < 0.001 && value !== 0)) {
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
const HISTORY_KEY = "moment-of-inertia-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: MOIInputs, result: MOIResult): void {
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
export function exportToText(inputs: MOIInputs, result: MOIResult): string {
  const p = inputs.precision;
  const u = result.unitLabel;
  const au = result.areaUnitLabel;
  return [
    "Moment of Inertia Calculator – Result",
    "=".repeat(50),
    "",
    `Shape        : ${SHAPE_LABELS[inputs.shape]}`,
    `Unit         : ${inputs.unit}`,
    "",
    `Ix           : ${formatNum(result.Ix, p)} ${u}`,
    `Iy           : ${formatNum(result.Iy, p)} ${u}`,
    `Polar (Ip)   : ${formatNum(result.Ip, p)} ${u}`,
    `Section Mod Sx: ${formatNum(result.Sx, p)} ${inputs.unit}³`,
    `Section Mod Sy: ${formatNum(result.Sy, p)} ${inputs.unit}³`,
    `Area         : ${formatNum(result.area, p)} ${au}`,
    `Centroid X   : ${formatNum(result.centroidX, p)} ${inputs.unit}`,
    `Centroid Y   : ${formatNum(result.centroidY, p)} ${inputs.unit}`,
    "",
    `Formula: ${result.formula}`,
    "",
    "=".repeat(50),
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
