import {
  CalculatorInputs,
  CalculationResult,
  CompactionFactor,
  HistoryEntry,
  InputUnit,
  OutputUnit,
  ShapeType,
  SoilType,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const SHAPE_LABELS: Record<ShapeType, string> = {
  rectangle: "Rectangle",
  square:    "Square",
  triangle:  "Triangle",
  circular:  "Circular",
  custom:    "Custom Area",
};

export const ALL_SHAPES: ShapeType[] = [
  "rectangle", "square", "triangle", "circular", "custom",
];

export const INPUT_UNIT_LABELS: Record<InputUnit, string> = {
  ft: "Feet (ft)",
  m:  "Meters (m)",
  yd: "Yards (yd)",
};

export const INPUT_UNIT_SHORT: Record<InputUnit, string> = {
  ft: "ft", m: "m", yd: "yd",
};

export const ALL_INPUT_UNITS: InputUnit[] = ["ft", "m", "yd"];

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  ft3: "Cubic Feet (ft³)",
  m3:  "Cubic Meters (m³)",
  yd3: "Cubic Yards (yd³)",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  ft3: "ft³", m3: "m³", yd3: "yd³",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = ["ft3", "m3", "yd3"];

export const COMPACTION_LABELS: Record<CompactionFactor, string> = {
  loose:    "Loose Soil (×1.10)",
  moderate: "Moderate Compaction (×1.20)",
  heavy:    "Heavy Compaction (×1.30)",
};

export const COMPACTION_VALUES: Record<CompactionFactor, number> = {
  loose:    1.10,
  moderate: 1.20,
  heavy:    1.30,
};

export const ALL_COMPACTIONS: CompactionFactor[] = ["loose", "moderate", "heavy"];

export const SOIL_LABELS: Record<SoilType, string> = {
  sand:    "Sand",
  clay:    "Clay",
  topsoil: "Top Soil",
  gravel:  "Gravel",
  mixed:   "Mixed Fill",
};

export const ALL_SOIL_TYPES: SoilType[] = ["sand", "clay", "topsoil", "gravel", "mixed"];

// Default truck capacity in m³ per soil type
export const TRUCK_CAPACITY_M3: Record<SoilType, number> = {
  sand:    8,
  clay:    7,
  topsoil: 8,
  gravel:  9,
  mixed:   8,
};

// ── Unit conversion: input → meters ──────────────────────────────────────────

const UNIT_TO_M: Record<InputUnit, number> = {
  ft: 0.3048,
  m:  1,
  yd: 0.9144,
};

// ── m³ → output unit ──────────────────────────────────────────────────────────

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
  const u   = INPUT_UNIT_SHORT[inputs.unit];
  const cf  = COMPACTION_VALUES[inputs.compaction];
  let rawM3 = 0;
  const steps: string[] = [];
  let formula = "";

  if (inputs.shape === "rectangle") {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth);
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const lm = l * toM, wm = w * toM, dm = d * toM;
    rawM3 = lm * wm * dm;
    formula = "Volume = Length × Width × Depth";
    steps.push(`Length = ${l} ${u} = ${lm.toFixed(4)} m`);
    steps.push(`Width  = ${w} ${u} = ${wm.toFixed(4)} m`);
    steps.push(`Depth  = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Raw Volume = ${lm.toFixed(4)} × ${wm.toFixed(4)} × ${dm.toFixed(4)} = ${rawM3.toFixed(4)} m³`);

  } else if (inputs.shape === "square") {
    const s = parseFloat(inputs.length);
    const d = parseFloat(inputs.depth);
    if (!s || !d || s <= 0 || d <= 0) return null;
    const sm = s * toM, dm = d * toM;
    rawM3 = sm * sm * dm;
    formula = "Volume = Side² × Depth";
    steps.push(`Side  = ${s} ${u} = ${sm.toFixed(4)} m`);
    steps.push(`Depth = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Raw Volume = ${sm.toFixed(4)}² × ${dm.toFixed(4)} = ${rawM3.toFixed(4)} m³`);

  } else if (inputs.shape === "triangle") {
    const b = parseFloat(inputs.length);
    const h = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth);
    if (!b || !h || !d || b <= 0 || h <= 0 || d <= 0) return null;
    const bm = b * toM, hm = h * toM, dm = d * toM;
    rawM3 = 0.5 * bm * hm * dm;
    formula = "Volume = 0.5 × Base × Height × Depth";
    steps.push(`Base   = ${b} ${u} = ${bm.toFixed(4)} m`);
    steps.push(`Height = ${h} ${u} = ${hm.toFixed(4)} m`);
    steps.push(`Depth  = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Raw Volume = 0.5 × ${bm.toFixed(4)} × ${hm.toFixed(4)} × ${dm.toFixed(4)} = ${rawM3.toFixed(4)} m³`);

  } else if (inputs.shape === "circular") {
    const dia = parseFloat(inputs.diameter);
    const d   = parseFloat(inputs.depth);
    if (!dia || !d || dia <= 0 || d <= 0) return null;
    const r = (dia * toM) / 2;
    const dm = d * toM;
    rawM3 = Math.PI * r * r * dm;
    formula = "Volume = π × r² × Depth";
    steps.push(`Diameter = ${dia} ${u} → r = ${(dia / 2).toFixed(4)} ${u} = ${r.toFixed(4)} m`);
    steps.push(`Depth    = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Raw Volume = π × ${r.toFixed(4)}² × ${dm.toFixed(4)} = ${rawM3.toFixed(4)} m³`);

  } else if (inputs.shape === "custom") {
    const area = parseFloat(inputs.customArea);
    const d    = parseFloat(inputs.depth);
    if (!area || !d || area <= 0 || d <= 0) return null;
    const areaM2 = area * toM * toM;
    const dm = d * toM;
    rawM3 = areaM2 * dm;
    formula = "Volume = Area × Depth";
    steps.push(`Area  = ${area} ${u}² = ${areaM2.toFixed(4)} m²`);
    steps.push(`Depth = ${d} ${u} = ${dm.toFixed(4)} m`);
    steps.push(`Raw Volume = ${areaM2.toFixed(4)} × ${dm.toFixed(4)} = ${rawM3.toFixed(4)} m³`);
  }

  if (rawM3 <= 0 || isNaN(rawM3)) return null;

  const adjustedM3 = rawM3 * cf;
  steps.push(`Compaction factor = ×${cf}`);
  steps.push(`Adjusted Volume = ${rawM3.toFixed(4)} × ${cf} = ${adjustedM3.toFixed(4)} m³`);

  const ft3 = m3ToOutput(adjustedM3, "ft3");
  const m3  = adjustedM3;
  const yd3 = m3ToOutput(adjustedM3, "yd3");

  // Truckload estimation
  const customTruck = parseFloat(inputs.truckCapacity);
  const truckCapM3  = customTruck > 0
    ? m3ToOutput(1, inputs.outputUnit) > 0
      ? customTruck / m3ToOutput(1, inputs.outputUnit)   // convert from output unit to m³
      : TRUCK_CAPACITY_M3[inputs.soilType]
    : TRUCK_CAPACITY_M3[inputs.soilType];

  const truckCapInOutputUnit = m3ToOutput(truckCapM3, inputs.outputUnit);
  const volumeInOutputUnit   = m3ToOutput(adjustedM3, inputs.outputUnit);
  const truckloads = truckCapInOutputUnit > 0
    ? Math.ceil(volumeInOutputUnit / truckCapInOutputUnit)
    : undefined;

  // Cost
  const costRate = parseFloat(inputs.costPerUnit);
  const estimatedCost = costRate > 0 ? volumeInOutputUnit * costRate : undefined;

  return {
    rawVolumeM3: rawM3,
    adjustedVolumeM3: adjustedM3,
    volumeInUnit: volumeInOutputUnit,
    outputUnit: inputs.outputUnit,
    inputUnit: inputs.unit,
    shape: inputs.shape,
    compactionFactor: cf,
    formula,
    steps,
    ft3,
    m3,
    yd3,
    truckloads,
    truckCapacity: truckCapInOutputUnit,
    estimatedCost,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function smartFormat(value: number): string {
  if (value === 0) return "0";
  if (value < 0.001) return value.toExponential(3);
  if (value < 1)     return value.toFixed(4);
  if (value < 10)    return value.toFixed(3);
  if (value < 10000) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
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

const HISTORY_KEY = "earth-filling-calculator-history";
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
    "Earth Filling Calculator – Estimate",
    "=".repeat(45),
    "",
    `Shape            : ${SHAPE_LABELS[result.shape]}`,
    `Input Unit       : ${u}`,
    `Compaction       : ${COMPACTION_LABELS[inputs.compaction]}`,
    `Soil Type        : ${SOIL_LABELS[inputs.soilType]}`,
    `Formula          : ${result.formula}`,
    "",
    "── Calculation Steps ──",
    ...result.steps,
    "",
    "── Volume Results ──",
    `Raw Volume       : ${smartFormat(result.rawVolumeM3)} m³`,
    `Adjusted Volume  : ${smartFormat(result.adjustedVolumeM3)} m³ (×${result.compactionFactor})`,
    `Cubic Feet       : ${smartFormat(result.ft3)} ft³`,
    `Cubic Meters     : ${smartFormat(result.m3)} m³`,
    `Cubic Yards      : ${smartFormat(result.yd3)} yd³`,
  ];
  if (result.truckloads !== undefined) {
    lines.push(`Truckloads       : ${result.truckloads} trucks (${smartFormat(result.truckCapacity)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}/truck)`);
  }
  if (result.estimatedCost !== undefined) {
    lines.push(`Estimated Cost   : $${smartFormat(result.estimatedCost)}`);
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
