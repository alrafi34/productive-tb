import {
  CalculatorInputs,
  CalculationResult,
  ExcavationType,
  HistoryEntry,
  InputUnit,
  OutputUnit,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const EXCAVATION_TYPE_LABELS: Record<ExcavationType, string> = {
  rectangular: "Rectangular",
  circular:    "Circular",
  trench:      "Trench",
  triangular:  "Triangular",
  custom:      "Custom Area",
};

export const ALL_EXCAVATION_TYPES: ExcavationType[] = [
  "rectangular", "circular", "trench", "triangular", "custom",
];

export const INPUT_UNIT_LABELS: Record<InputUnit, string> = {
  m:  "Meters (m)",
  ft: "Feet (ft)",
  yd: "Yards (yd)",
};

export const INPUT_UNIT_SHORT: Record<InputUnit, string> = {
  m: "m", ft: "ft", yd: "yd",
};

export const ALL_INPUT_UNITS: InputUnit[] = ["ft", "m", "yd"];

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  m3:  "Cubic Meters (m³)",
  ft3: "Cubic Feet (ft³)",
  yd3: "Cubic Yards (yd³)",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  m3: "m³", ft3: "ft³", yd3: "yd³",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = ["ft3", "m3", "yd3"];

// ── Unit conversion: input unit → meters (linear) ────────────────────────────

const UNIT_TO_M: Record<InputUnit, number> = {
  m:  1,
  ft: 0.3048,
  yd: 0.9144,
};

// ── Conversion: m³ → output unit ─────────────────────────────────────────────

function m3ToOutput(m3: number, unit: OutputUnit): number {
  switch (unit) {
    case "m3":  return m3;
    case "ft3": return m3 * 35.3147;
    case "yd3": return m3 * 1.30795;
    default:    return m3;
  }
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const toM = UNIT_TO_M[inputs.unit];
  const u = INPUT_UNIT_SHORT[inputs.unit];
  let volumeM3 = 0;
  const steps: string[] = [];
  let formula = "";

  if (inputs.type === "rectangular") {
    const l = parseFloat(inputs.rectangular.length);
    const w = parseFloat(inputs.rectangular.width);
    const d = parseFloat(inputs.rectangular.depth);
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const lm = l * toM, wm = w * toM, dm = d * toM;
    volumeM3 = lm * wm * dm;
    formula = "Volume = Length × Width × Depth";
    steps.push(`Length = ${l} ${u} = ${lm.toFixed(4)} m`);
    steps.push(`Width  = ${w} ${u} = ${wm.toFixed(4)} m`);
    steps.push(`Depth  = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Volume = ${lm.toFixed(4)} × ${wm.toFixed(4)} × ${dm.toFixed(4)}`);
    steps.push(`Volume = ${volumeM3.toFixed(4)} m³`);

  } else if (inputs.type === "circular") {
    const dia = parseFloat(inputs.circular.diameter);
    const d   = parseFloat(inputs.circular.depth);
    if (!dia || !d || dia <= 0 || d <= 0) return null;
    const diam = dia * toM, dm = d * toM;
    const r = diam / 2;
    volumeM3 = Math.PI * r * r * dm;
    formula = "Volume = π × r² × Depth";
    steps.push(`Diameter = ${dia} ${u} → radius = ${(dia / 2).toFixed(4)} ${u} = ${r.toFixed(4)} m`);
    steps.push(`Depth    = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Volume   = π × ${r.toFixed(4)}² × ${dm.toFixed(4)}`);
    steps.push(`Volume   = ${volumeM3.toFixed(4)} m³`);

  } else if (inputs.type === "trench") {
    const l = parseFloat(inputs.trench.length);
    const w = parseFloat(inputs.trench.width);
    const d = parseFloat(inputs.trench.depth);
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const lm = l * toM, wm = w * toM, dm = d * toM;
    volumeM3 = lm * wm * dm;
    formula = "Volume = Length × Width × Depth";
    steps.push(`Length = ${l} ${u} = ${lm.toFixed(4)} m`);
    steps.push(`Width  = ${w} ${u} = ${wm.toFixed(4)} m`);
    steps.push(`Depth  = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Volume = ${lm.toFixed(4)} × ${wm.toFixed(4)} × ${dm.toFixed(4)}`);
    steps.push(`Volume = ${volumeM3.toFixed(4)} m³`);

  } else if (inputs.type === "triangular") {
    const base = parseFloat(inputs.triangular.base);
    const th   = parseFloat(inputs.triangular.triHeight);
    const d    = parseFloat(inputs.triangular.depth);
    if (!base || !th || !d || base <= 0 || th <= 0 || d <= 0) return null;
    const bm = base * toM, thm = th * toM, dm = d * toM;
    volumeM3 = 0.5 * bm * thm * dm;
    formula = "Volume = 0.5 × Base × Height × Depth";
    steps.push(`Base   = ${base} ${u} = ${bm.toFixed(4)} m`);
    steps.push(`Height = ${th} ${u} = ${thm.toFixed(4)} m`);
    steps.push(`Depth  = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Volume = 0.5 × ${bm.toFixed(4)} × ${thm.toFixed(4)} × ${dm.toFixed(4)}`);
    steps.push(`Volume = ${volumeM3.toFixed(4)} m³`);

  } else if (inputs.type === "custom") {
    const area = parseFloat(inputs.custom.area);
    const d    = parseFloat(inputs.custom.depth);
    if (!area || !d || area <= 0 || d <= 0) return null;
    // area is in input unit², depth in input unit
    const areaM2 = area * toM * toM;
    const dm = d * toM;
    volumeM3 = areaM2 * dm;
    formula = "Volume = Area × Depth";
    steps.push(`Area  = ${area} ${u}² = ${areaM2.toFixed(4)} m²`);
    steps.push(`Depth = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Volume = ${areaM2.toFixed(4)} × ${dm.toFixed(4)}`);
    steps.push(`Volume = ${volumeM3.toFixed(4)} m³`);
  }

  if (volumeM3 <= 0 || isNaN(volumeM3)) return null;

  const m3  = volumeM3;
  const ft3 = m3ToOutput(volumeM3, "ft3");
  const yd3 = m3ToOutput(volumeM3, "yd3");

  // Optional weight
  const density = parseFloat(inputs.soilDensity);
  const weightKg   = density > 0 ? volumeM3 * density : undefined;
  const weightTons = weightKg !== undefined ? weightKg / 1000 : undefined;

  // Optional cost
  const costRate = parseFloat(inputs.costPerUnit);
  const volumeForCost = m3ToOutput(volumeM3, inputs.outputUnit);
  const estimatedCost = costRate > 0 ? volumeForCost * costRate : undefined;

  return {
    volumeM3,
    volumeInUnit: m3ToOutput(volumeM3, inputs.outputUnit),
    outputUnit: inputs.outputUnit,
    inputUnit: inputs.unit,
    type: inputs.type,
    formula,
    steps,
    m3,
    ft3,
    yd3,
    weightKg,
    weightTons,
    estimatedCost,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function smartFormat(value: number, decimals = 2): string {
  if (value === 0) return "0";
  if (value < 0.001) return value.toExponential(3);
  if (value < 1)     return value.toFixed(4);
  if (value < 10)    return value.toFixed(3);
  if (value < 10000) return value.toLocaleString("en-US", { maximumFractionDigits: decimals });
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const HISTORY_KEY = "soil-volume-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const u = INPUT_UNIT_SHORT[inputs.unit];
  const lines = [
    "Soil Volume Calculator – Result",
    "=".repeat(45),
    "",
    `Excavation Type  : ${EXCAVATION_TYPE_LABELS[result.type]}`,
    `Mode             : ${inputs.mode === "fill" ? "Fill" : "Excavation"}`,
    `Input Unit       : ${u}`,
    `Formula          : ${result.formula}`,
    "",
    "── Steps ──",
    ...result.steps,
    "",
    "── Volume Results ──",
    `Cubic Meters     : ${smartFormat(result.m3)} m³`,
    `Cubic Feet       : ${smartFormat(result.ft3)} ft³`,
    `Cubic Yards      : ${smartFormat(result.yd3)} yd³`,
  ];
  if (result.weightKg !== undefined) {
    lines.push("", "── Weight Estimate ──");
    lines.push(`Weight           : ${smartFormat(result.weightKg)} kg`);
    lines.push(`                 : ${smartFormat(result.weightTons!)} metric tons`);
  }
  if (result.estimatedCost !== undefined) {
    lines.push("", `Estimated Cost   : $${smartFormat(result.estimatedCost)}`);
  }
  lines.push("", "=".repeat(45), `Generated: ${new Date().toLocaleString()}`);
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
