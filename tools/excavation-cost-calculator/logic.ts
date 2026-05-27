import {
  CalculatorInputs,
  CalculationResult,
  Currency,
  ExcavationType,
  HistoryEntry,
  InputUnit,
  OutputUnit,
  SoilType,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const EXCAVATION_TYPE_LABELS: Record<ExcavationType, string> = {
  foundation: "Foundation Excavation",
  basement:   "Basement Digging",
  leveling:   "Land Leveling",
  trench:     "Trench Excavation",
  pond:       "Pond Excavation",
  custom:     "Custom Excavation",
};

export const ALL_EXCAVATION_TYPES: ExcavationType[] = [
  "foundation", "basement", "leveling", "trench", "pond", "custom",
];

export const SOIL_LABELS: Record<SoilType, string> = {
  loose:  "Loose Soil (×1.0)",
  clay:   "Clay Soil (×1.15)",
  sand:   "Sand (×1.10)",
  gravel: "Gravel (×1.20)",
  mixed:  "Mixed Soil (×1.25)",
  rock:   "Hard Rock (×1.80)",
};

export const SOIL_MULTIPLIERS: Record<SoilType, number> = {
  loose:  1.00,
  clay:   1.15,
  sand:   1.10,
  gravel: 1.20,
  mixed:  1.25,
  rock:   1.80,
};

export const ALL_SOIL_TYPES: SoilType[] = [
  "loose", "clay", "sand", "gravel", "mixed", "rock",
];

export const INPUT_UNIT_LABELS: Record<InputUnit, string> = {
  ft: "Feet (ft)",
  m:  "Meters (m)",
};

export const INPUT_UNIT_SHORT: Record<InputUnit, string> = {
  ft: "ft", m: "m",
};

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  yd3: "Cubic Yards (yd³)",
  m3:  "Cubic Meters (m³)",
  ft3: "Cubic Feet (ft³)",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  yd3: "yd³", m3: "m³", ft3: "ft³",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = ["yd3", "m3", "ft3"];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", BDT: "৳", INR: "₹",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", BDT: "BDT (৳)", INR: "INR (₹)",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "BDT", "INR"];

// ── Unit conversion ───────────────────────────────────────────────────────────

const UNIT_TO_FT: Record<InputUnit, number> = { ft: 1, m: 3.28084 };

function ft3ToOutput(ft3: number, unit: OutputUnit): number {
  switch (unit) {
    case "ft3": return ft3;
    case "yd3": return ft3 / 27;
    case "m3":  return ft3 / 35.3147;
    default:    return ft3;
  }
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const ftFactor = UNIT_TO_FT[inputs.unit];
  const u = INPUT_UNIT_SHORT[inputs.unit];

  const l = parseFloat(inputs.length);
  const w = parseFloat(inputs.width);
  const d = parseFloat(inputs.depth);
  const rate = parseFloat(inputs.excavationRate);

  if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
  if (!rate || rate <= 0) return null;

  const lFt = l * ftFactor;
  const wFt = w * ftFactor;
  const dFt = d * ftFactor;
  const volumeFt3 = lFt * wFt * dFt;
  const volumeM3  = volumeFt3 / 35.3147;
  const volumeYd3 = volumeFt3 / 27;
  const volumeInUnit = ft3ToOutput(volumeFt3, inputs.outputUnit);

  const soilMult = SOIL_MULTIPLIERS[inputs.soilType];
  const baseExcavationCost    = volumeInUnit * rate;
  const adjustedExcavationCost = baseExcavationCost * soilMult;

  const laborDays  = parseFloat(inputs.laborDays)      || 0;
  const laborRate  = parseFloat(inputs.laborCost)       || 0;
  const eqHours    = parseFloat(inputs.equipmentHours)  || 0;
  const eqRate     = parseFloat(inputs.equipmentCost)   || 0;
  const transport  = parseFloat(inputs.transportCost)   || 0;

  const laborTotal     = laborDays * laborRate;
  const equipmentTotal = eqHours * eqRate;
  const transportTotal = transport;
  const totalCost = adjustedExcavationCost + laborTotal + equipmentTotal + transportTotal;

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const uShort = OUTPUT_UNIT_SHORT[inputs.outputUnit];

  const steps = [
    `Length = ${l} ${u}, Width = ${w} ${u}, Depth = ${d} ${u}`,
    `Volume = ${l} × ${w} × ${d} = ${(l * w * d).toFixed(2)} ${u}³`,
    `Volume = ${volumeInUnit.toFixed(2)} ${uShort}`,
    `Base Cost = ${volumeInUnit.toFixed(2)} × ${sym}${rate} = ${sym}${baseExcavationCost.toFixed(2)}`,
    `Soil multiplier (${SOIL_LABELS[inputs.soilType]}) = ×${soilMult}`,
    `Adjusted Cost = ${sym}${baseExcavationCost.toFixed(2)} × ${soilMult} = ${sym}${adjustedExcavationCost.toFixed(2)}`,
    ...(laborTotal > 0    ? [`Labor = ${laborDays} days × ${sym}${laborRate} = ${sym}${laborTotal.toFixed(2)}`] : []),
    ...(equipmentTotal > 0 ? [`Equipment = ${eqHours} hrs × ${sym}${eqRate} = ${sym}${equipmentTotal.toFixed(2)}`] : []),
    ...(transportTotal > 0 ? [`Transport/Disposal = ${sym}${transportTotal.toFixed(2)}`] : []),
    `Total = ${sym}${totalCost.toFixed(2)}`,
  ];

  return {
    volumeFt3,
    volumeM3,
    volumeYd3,
    volumeInUnit,
    outputUnit: inputs.outputUnit,
    soilMultiplier: soilMult,
    baseExcavationCost,
    adjustedExcavationCost,
    laborTotal,
    equipmentTotal,
    transportTotal,
    totalCost,
    currency: inputs.currency,
    formula: `Volume × Rate × Soil Multiplier + Labor + Equipment + Transport`,
    steps,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function smartFormat(value: number): string {
  if (value === 0) return "0";
  if (value < 0.01)  return value.toFixed(4);
  if (value < 10)    return value.toFixed(2);
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function formatCurrency(value: number, currency: Currency): string {
  return `${CURRENCY_SYMBOLS[currency]}${smartFormat(value)}`;
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

const HISTORY_KEY = "excavation-cost-calculator-history";
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
  const sym = CURRENCY_SYMBOLS[result.currency];
  const u = INPUT_UNIT_SHORT[inputs.unit];
  const uOut = OUTPUT_UNIT_SHORT[result.outputUnit];
  return [
    "Excavation Cost Calculator – Estimate",
    "=".repeat(45),
    "",
    `Excavation Type  : ${EXCAVATION_TYPE_LABELS[inputs.excavationType]}`,
    `Dimensions       : ${inputs.length} × ${inputs.width} × ${inputs.depth} ${u}`,
    `Soil Type        : ${SOIL_LABELS[inputs.soilType]}`,
    `Rate             : ${sym}${inputs.excavationRate} per ${uOut}`,
    "",
    "── Calculation Steps ──",
    ...result.steps,
    "",
    "── Cost Breakdown ──",
    `Volume           : ${smartFormat(result.volumeInUnit)} ${uOut}`,
    `Base Cost        : ${sym}${smartFormat(result.baseExcavationCost)}`,
    `Adjusted Cost    : ${sym}${smartFormat(result.adjustedExcavationCost)} (×${result.soilMultiplier})`,
    result.laborTotal > 0     ? `Labor            : ${sym}${smartFormat(result.laborTotal)}` : "",
    result.equipmentTotal > 0 ? `Equipment        : ${sym}${smartFormat(result.equipmentTotal)}` : "",
    result.transportTotal > 0 ? `Transport        : ${sym}${smartFormat(result.transportTotal)}` : "",
    `Total Estimate   : ${sym}${smartFormat(result.totalCost)}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
