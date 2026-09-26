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

/* Largest plot count accepted; the layout preview draws at most MAX_PREVIEW_PLOTS. */
export const MAX_PLOTS = 100_000;
export const MAX_PREVIEW_PLOTS = 200;

export function validatePlots(value: string): string | null {
  if (!value || value.trim() === "") return "Number of plots is required.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid number.";
  if (num <= 0) return "Number of plots must be greater than zero.";
  if (num !== Math.floor(num)) return "Number of plots must be a whole number.";
  if (num > MAX_PLOTS) return `Up to ${MAX_PLOTS.toLocaleString("en-US")} plots are supported.`;
  return null;
}

/* Width, length and road width are lengths: metres when the land is measured
   in square metres or hectares, feet for every other unit. */
export type LengthUnit = "ft" | "m";

export function lengthUnitFor(landUnit: Unit): LengthUnit {
  return landUnit === "sqm" || landUnit === "hectare" ? "m" : "ft";
}

/* rows × cols that is exactly numPlots, with plots as close to square as the
   land allows. A prime count leaves a single row or column. Factor pairs are
   found by walking up to √numPlots and trying both orientations of each. */
function findBestGrid(numPlots: number, width?: number, length?: number): { rows: number; cols: number } {
  const aspect = width && length ? width / length : 1;
  let best = { rows: 1, cols: numPlots };
  let bestScore = Infinity;
  const consider = (rows: number, cols: number) => {
    // plot width ÷ plot length; 1 is a square plot
    const score = Math.abs(Math.log((aspect * rows) / cols));
    if (score < bestScore - 1e-9 || (Math.abs(score - bestScore) <= 1e-9 && rows < best.rows)) {
      bestScore = score;
      best = { rows, cols };
    }
  };
  for (let f = 1; f * f <= numPlots; f++) {
    if (numPlots % f !== 0) continue;
    consider(f, numPlots / f);
    consider(numPlots / f, f);
  }
  return best;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const landErr = validatePositive(inputs.totalLand, "Total land");
  const plotErr = validatePlots(inputs.numPlots);

  if (landErr || plotErr) return null;

  const totalLand = parseFloat(inputs.totalLand);
  const numPlots = parseInt(inputs.numPlots);
  const roadWidth = parseFloat(inputs.roadWidth) || 0;
  const lengthUnit = lengthUnitFor(inputs.landUnit);
  const areaUnitOfLengths: Unit = lengthUnit === "m" ? "sqm" : "sqft";
  const warnings: string[] = [];

  const width = parseFloat(inputs.landWidth);
  const length = parseFloat(inputs.landLength);
  const hasDims = width > 0 && length > 0;

  let rows = 1;
  let cols = numPlots;
  let gridOk = true;
  if (inputs.divisionMode === "custom-grid") {
    const r = parseInt(inputs.customRows);
    const c = parseInt(inputs.customCols);
    if (r > 0 && c > 0) {
      if (r * c === numPlots) {
        rows = r;
        cols = c;
      } else {
        gridOk = false;
        warnings.push(`Rows × columns (${r} × ${c} = ${r * c}) must equal the number of plots (${numPlots}).`);
      }
    } else {
      ({ rows, cols } = findBestGrid(numPlots, width, length));
    }
  } else if (inputs.divisionMode === "equal-width") {
    // side-by-side strips: every plot runs the full length of the land
    rows = 1;
    cols = numPlots;
  } else if (inputs.divisionMode === "equal-length") {
    // stacked strips: every plot runs the full width of the land
    rows = numPlots;
    cols = 1;
  } else {
    ({ rows, cols } = findBestGrid(numPlots, width, length));
  }

  // Roads run between the rows and between the columns; where they cross,
  // the crossing is counted once.
  let roadArea = 0;
  let plotWidth: number | undefined;
  let plotLength: number | undefined;
  if (hasDims && gridOk) {
    const netWidth = width - roadWidth * (cols - 1);
    const netLength = length - roadWidth * (rows - 1);
    if (netWidth <= 0 || netLength <= 0) {
      warnings.push("The roads are wider than the land leaves room for — reduce the road width or the number of plots.");
    } else {
      if (roadWidth > 0) {
        const roadLinear =
          (rows - 1) * width * roadWidth +
          (cols - 1) * length * roadWidth -
          (rows - 1) * (cols - 1) * roadWidth * roadWidth;
        roadArea = convertArea(roadLinear, areaUnitOfLengths, inputs.landUnit);
      }
      plotWidth = netWidth / cols;
      plotLength = netLength / rows;
      const dimsArea = convertArea(width * length, areaUnitOfLengths, inputs.landUnit);
      if (Math.abs(dimsArea - totalLand) / totalLand > 0.02) {
        warnings.push(
          `Width × length is ${formatNumber(dimsArea)} ${UNIT_SHORT[inputs.landUnit]}, which differs from the total land entered; plot dimensions follow width × length.`
        );
      }
    }
  } else if (roadWidth > 0 && !hasDims) {
    warnings.push(`Road width needs the land's width and length (${lengthUnit}) to work out the road area.`);
  }

  const usableLand = totalLand - roadArea;
  const plotSize = usableLand / numPlots;

  return {
    plotSize,
    plotSizeUnit: inputs.landUnit,
    usableLand,
    roadArea,
    remainingLand: 0,
    suggestedRows: rows,
    suggestedCols: cols,
    plotWidth,
    plotLength,
    lengthUnit,
    warnings,
    totalArea: totalLand,
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
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
  if (typeof window === 'undefined') return [];
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
    result.plotWidth && result.plotLength ? `Plot Dimensions: ${formatNumber(result.plotWidth)} × ${formatNumber(result.plotLength)} ${result.lengthUnit}` : "",
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
