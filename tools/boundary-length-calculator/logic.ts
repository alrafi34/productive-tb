import { CalculatorInputs, CalculationResult, HistoryEntry, Unit } from "./types";

export const UNIT_LABELS: Record<Unit, string> = {
  m: "Meter",
  ft: "Feet",
  km: "Kilometer",
  cm: "Centimeter",
  in: "Inch",
};

export const UNIT_SHORT: Record<Unit, string> = {
  m: "m",
  ft: "ft",
  km: "km",
  cm: "cm",
  in: "in",
};

export const ALL_UNITS: Unit[] = ["m", "ft", "km", "cm", "in"];

export function validateSide(value: string): string | null {
  if (!value || value.trim() === "") return null;
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid number.";
  if (num < 0) return "Length must be positive.";
  return null;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  let total = 0;
  const breakdown: string[] = [];
  let sidesCount = 0;

  if (inputs.shapeMode === "manual") {
    const validSides = inputs.sides.filter(s => {
      const val = parseFloat(s.value);
      return !isNaN(val) && val > 0;
    });

    if (validSides.length === 0) return null;

    validSides.forEach(side => {
      const val = parseFloat(side.value);
      total += val;
      breakdown.push(`${formatNumber(val, inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
      sidesCount++;
    });
  } else if (inputs.shapeMode === "rectangle") {
    const length = parseFloat(inputs.rectangleLength);
    const width = parseFloat(inputs.rectangleWidth);
    
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return null;
    
    total = 2 * (length + width);
    breakdown.push(`2 × (${formatNumber(length, inputs.precision)} + ${formatNumber(width, inputs.precision)})`);
    sidesCount = 4;
  } else if (inputs.shapeMode === "square") {
    const side = parseFloat(inputs.squareSide);
    
    if (isNaN(side) || side <= 0) return null;
    
    total = 4 * side;
    breakdown.push(`4 × ${formatNumber(side, inputs.precision)}`);
    sidesCount = 4;
  } else if (inputs.shapeMode === "triangle") {
    const s1 = parseFloat(inputs.triangleSide1);
    const s2 = parseFloat(inputs.triangleSide2);
    const s3 = parseFloat(inputs.triangleSide3);
    
    if (isNaN(s1) || isNaN(s2) || isNaN(s3) || s1 <= 0 || s2 <= 0 || s3 <= 0) return null;
    
    total = s1 + s2 + s3;
    breakdown.push(`${formatNumber(s1, inputs.precision)} + ${formatNumber(s2, inputs.precision)} + ${formatNumber(s3, inputs.precision)}`);
    sidesCount = 3;
  }

  if (total === 0) return null;

  return {
    totalBoundary: total,
    unit: inputs.unit,
    sidesCount,
    breakdown,
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "boundary-length-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
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

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const lines = [
    "Boundary Length Calculator – Result",
    "=".repeat(45),
    "",
    `Shape Mode    : ${inputs.shapeMode.charAt(0).toUpperCase() + inputs.shapeMode.slice(1)}`,
    `Unit          : ${UNIT_LABELS[inputs.unit]}`,
    "",
  ];

  if (inputs.shapeMode === "manual") {
    lines.push("Sides:");
    inputs.sides.forEach((side, i) => {
      const val = parseFloat(side.value);
      if (!isNaN(val) && val > 0) {
        lines.push(`  Side ${i + 1}: ${formatNumber(val, inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
      }
    });
  } else if (inputs.shapeMode === "rectangle") {
    lines.push(`Length: ${formatNumber(parseFloat(inputs.rectangleLength), inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
    lines.push(`Width : ${formatNumber(parseFloat(inputs.rectangleWidth), inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
  } else if (inputs.shapeMode === "square") {
    lines.push(`Side  : ${formatNumber(parseFloat(inputs.squareSide), inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
  } else if (inputs.shapeMode === "triangle") {
    lines.push(`Side 1: ${formatNumber(parseFloat(inputs.triangleSide1), inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
    lines.push(`Side 2: ${formatNumber(parseFloat(inputs.triangleSide2), inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
    lines.push(`Side 3: ${formatNumber(parseFloat(inputs.triangleSide3), inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
  }

  lines.push("");
  lines.push(`Total Boundary: ${formatNumber(result.totalBoundary, inputs.precision)} ${UNIT_SHORT[inputs.unit]}`);
  lines.push("");
  lines.push("=".repeat(45));
  lines.push(`Generated: ${new Date().toLocaleString()}`);

  return lines.join("\n");
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
