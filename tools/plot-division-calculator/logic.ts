import { CalculatorInputs, CalculationResult, HistoryEntry, Unit } from "./types";

export const UNIT_TO_SQFT: Record<Unit, number> = {
  sqft: 1,
  sqm: 10.7639,
  decimal: 435.6,
  katha: 720,
  bigha: 14400,
  acre: 43560,
  hectare: 107639,
};

export const UNIT_LABELS: Record<Unit, string> = {
  sqft: "Square Feet",
  sqm: "Square Meter",
  decimal: "Decimal",
  acre: "Acre",
  katha: "Katha",
  bigha: "Bigha",
  hectare: "Hectare",
};

export const UNIT_SHORT: Record<Unit, string> = {
  sqft: "sq ft",
  sqm: "sq m",
  decimal: "Decimal",
  acre: "Acre",
  katha: "Katha",
  bigha: "Bigha",
  hectare: "ha",
};

export const ALL_UNITS: Unit[] = ["sqft", "sqm", "decimal", "acre", "katha", "bigha", "hectare"];

export function convertArea(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  const sqft = value * UNIT_TO_SQFT[fromUnit];
  return sqft / UNIT_TO_SQFT[toUnit];
}

export function validatePositive(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") return null;
  const num = parseFloat(value);
  if (isNaN(num)) return `${fieldName} must be a valid number.`;
  if (num <= 0) return `${fieldName} must be greater than zero.`;
  return null;
}

export function validatePlots(value: string): string | null {
  if (!value || value.trim() === "") return "Number of plots is required.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid number.";
  if (num <= 0) return "Number of plots must be greater than zero.";
  if (num !== Math.floor(num)) return "Number of plots must be a whole number.";
  return null;
}

function findBestGrid(numPlots: number): { rows: number; cols: number } {
  const sqrt = Math.sqrt(numPlots);
  let bestRows = Math.floor(sqrt);
  let bestCols = Math.ceil(numPlots / bestRows);
  
  for (let r = 1; r <= numPlots; r++) {
    if (numPlots % r === 0) {
      const c = numPlots / r;
      const ratio = Math.max(r, c) / Math.min(r, c);
      const currentRatio = Math.max(bestRows, bestCols) / Math.min(bestRows, bestCols);
      if (ratio < currentRatio) {
        bestRows = r;
        bestCols = c;
      }
    }
  }
  
  return { rows: bestRows, cols: bestCols };
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const landErr = validatePositive(inputs.totalLand, "Total land");
  const plotErr = validatePlots(inputs.numPlots);
  
  if (landErr || plotErr) return null;
  
  const totalLand = parseFloat(inputs.totalLand);
  const numPlots = parseInt(inputs.numPlots);
  const roadWidth = parseFloat(inputs.roadWidth) || 0;
  
  let roadArea = 0;
  if (roadWidth > 0 && inputs.landWidth && inputs.landLength) {
    const width = parseFloat(inputs.landWidth);
    const length = parseFloat(inputs.landLength);
    if (!isNaN(width) && !isNaN(length)) {
      const totalAreaCalc = width * length;
      const grid = findBestGrid(numPlots);
      const roadLengthHorizontal = (grid.rows - 1) * width;
      const roadLengthVertical = (grid.cols - 1) * length;
      roadArea = (roadLengthHorizontal + roadLengthVertical) * roadWidth;
      roadArea = convertArea(roadArea, inputs.landUnit, inputs.landUnit);
    }
  }
  
  const usableLand = totalLand - roadArea;
  const plotSize = usableLand / numPlots;
  const remainingLand = usableLand - (plotSize * numPlots);
  
  let plotWidth: number | undefined;
  let plotLength: number | undefined;
  let suggestedRows = 1;
  let suggestedCols = numPlots;
  
  if (inputs.landWidth && inputs.landLength) {
    const width = parseFloat(inputs.landWidth);
    const length = parseFloat(inputs.landLength);
    
    if (!isNaN(width) && !isNaN(length)) {
      if (inputs.divisionMode === "custom-grid" && inputs.customRows && inputs.customCols) {
        const rows = parseInt(inputs.customRows);
        const cols = parseInt(inputs.customCols);
        if (!isNaN(rows) && !isNaN(cols) && rows > 0 && cols > 0) {
          suggestedRows = rows;
          suggestedCols = cols;
        }
      } else {
        const grid = findBestGrid(numPlots);
        suggestedRows = grid.rows;
        suggestedCols = grid.cols;
      }
      
      const effectiveWidth = width - (roadWidth * (suggestedCols - 1) / suggestedCols);
      const effectiveLength = length - (roadWidth * (suggestedRows - 1) / suggestedRows);
      
      plotWidth = effectiveWidth / suggestedCols;
      plotLength = effectiveLength / suggestedRows;
    }
  }
  
  return {
    plotSize,
    plotSizeUnit: inputs.landUnit,
    usableLand,
    roadArea,
    remainingLand,
    suggestedRows,
    suggestedCols,
    plotWidth,
    plotLength,
    totalArea: totalLand,
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

const HISTORY_KEY = "plot-division-calculator-history";
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
  return [
    "Plot Division Calculator – Result",
    "=".repeat(45),
    "",
    `Total Land    : ${formatNumber(parseFloat(inputs.totalLand))} ${UNIT_LABELS[inputs.landUnit]}`,
    `Number of Plots: ${inputs.numPlots}`,
    result.roadArea > 0 ? `Road Area     : ${formatNumber(result.roadArea)} ${UNIT_LABELS[inputs.landUnit]}` : "",
    result.roadArea > 0 ? `Usable Land   : ${formatNumber(result.usableLand)} ${UNIT_LABELS[inputs.landUnit]}` : "",
    "",
    `Plot Size     : ${formatNumber(result.plotSize)} ${UNIT_LABELS[inputs.landUnit]}`,
    result.plotWidth && result.plotLength ? `Plot Dimensions: ${formatNumber(result.plotWidth)} × ${formatNumber(result.plotLength)} ${UNIT_SHORT[inputs.landUnit]}` : "",
    `Suggested Layout: ${result.suggestedRows} × ${result.suggestedCols} grid`,
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
