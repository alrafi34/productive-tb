import { CalculationMode, DimensionUnit, AreaUnit, CalculationInputs, CalculationResult, HistoryEntry } from "./types";

// Conversion factors to square meters
const DIMENSION_TO_METERS: Record<DimensionUnit, number> = {
  m: 1,
  ft: 0.3048,
  yd: 0.9144,
};

const AREA_TO_SQM: Record<AreaUnit, number> = {
  sqft: 0.092903,
  sqyd: 0.836127,
  acre: 4046.85642,
  hectare: 10000,
  decimal: 40.4686,
  katha: 66.89,
  bigha: 1337.8,
  sqkm: 1000000,
  sqm: 1,
};

// Format number with precision and comma separators
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Get unit display name
export function getUnitName(unit: DimensionUnit | AreaUnit): string {
  const unitNames: Record<string, string> = {
    m: "Meters",
    ft: "Feet", 
    yd: "Yards",
    sqft: "Square Feet",
    sqyd: "Square Yards",
    acre: "Acres",
    hectare: "Hectares",
    decimal: "Decimals",
    katha: "Katha",
    bigha: "Bigha",
    sqkm: "Square Kilometers",
    sqm: "Square Meters",
  };
  return unitNames[unit] || unit;
}

// Validate inputs
export function validateInputs(inputs: CalculationInputs): string | null {
  if (inputs.mode === 'dimensions') {
    const length = parseFloat(inputs.dimensions.length);
    const width = parseFloat(inputs.dimensions.width);
    
    if (!inputs.dimensions.length || !inputs.dimensions.width) {
      return "Please enter both length and width.";
    }
    if (isNaN(length) || isNaN(width)) {
      return "Please enter valid numeric dimensions.";
    }
    if (length <= 0 || width <= 0) {
      return "Length and width must be greater than zero.";
    }
  } else {
    const value = parseFloat(inputs.conversion.value);
    
    if (!inputs.conversion.value) {
      return "Please enter an area value to convert.";
    }
    if (isNaN(value)) {
      return "Please enter a valid numeric area value.";
    }
    if (value <= 0) {
      return "Area value must be greater than zero.";
    }
  }
  return null;
}

// Calculate area in square meters
export function calculateSquareMeters(inputs: CalculationInputs): CalculationResult | null {
  const error = validateInputs(inputs);
  if (error) return null;

  let squareMeters: number;
  let inputSummary: string;
  let formula: string | undefined;

  if (inputs.mode === 'dimensions') {
    const length = parseFloat(inputs.dimensions.length);
    const width = parseFloat(inputs.dimensions.width);
    const unit = inputs.dimensions.unit;
    
    // Convert dimensions to meters
    const lengthM = length * DIMENSION_TO_METERS[unit];
    const widthM = width * DIMENSION_TO_METERS[unit];
    
    squareMeters = lengthM * widthM;
    inputSummary = `${length} × ${width} ${getUnitName(unit)}`;
    formula = unit === 'm' 
      ? `Area = ${length} × ${width} = ${formatNumber(squareMeters, inputs.precision)} m²`
      : `Area = ${length} × ${width} ${unit} = ${formatNumber(lengthM, 4)} × ${formatNumber(widthM, 4)} m = ${formatNumber(squareMeters, inputs.precision)} m²`;
  } else {
    const value = parseFloat(inputs.conversion.value);
    const unit = inputs.conversion.unit;
    
    squareMeters = value * AREA_TO_SQM[unit];
    inputSummary = `${formatNumber(value, inputs.precision)} ${getUnitName(unit)}`;
    formula = `${formatNumber(value, inputs.precision)} ${getUnitName(unit)} = ${formatNumber(squareMeters, inputs.precision)} m²`;
  }

  // Calculate conversions
  const conversions = {
    sqft: squareMeters / AREA_TO_SQM.sqft,
    sqyd: squareMeters / AREA_TO_SQM.sqyd,
    acre: squareMeters / AREA_TO_SQM.acre,
    hectare: squareMeters / AREA_TO_SQM.hectare,
    sqkm: squareMeters / AREA_TO_SQM.sqkm,
  };

  return {
    squareMeters,
    conversions,
    inputSummary,
    formula,
  };
}

// Get land size comparison
export function getLandSizeComparison(squareMeters: number): string {
  if (squareMeters < 10) {
    return "About the size of a small room";
  } else if (squareMeters < 50) {
    return "About the size of a studio apartment";
  } else if (squareMeters < 100) {
    return "About the size of a tennis court";
  } else if (squareMeters < 500) {
    return "About the size of a basketball court";
  } else if (squareMeters < 1000) {
    return "About the size of 2-3 houses";
  } else if (squareMeters < 4000) {
    return "About the size of half a football field";
  } else if (squareMeters < 10000) {
    return "About the size of a football field";
  } else if (squareMeters < 40000) {
    return "About the size of 4-5 football fields";
  } else {
    return "Large agricultural or commercial land";
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// LocalStorage history management
const HISTORY_KEY = "land-area-calculator-sqm-history";
const MAX_HISTORY = 5;

export function saveToHistory(inputs: CalculationInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore localStorage errors
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

// Export to text
export function exportToText(inputs: CalculationInputs, result: CalculationResult): string {
  const lines = [
    "Land Area Calculator (Square Meter) – Calculation Report",
    "=".repeat(60),
    "",
    "INPUT:",
    `  ${result.inputSummary}`,
    "",
    "RESULT:",
    `  Area: ${formatNumber(result.squareMeters, inputs.precision)} m²`,
    "",
    "CONVERSIONS:",
    `  Square Feet    : ${formatNumber(result.conversions.sqft, inputs.precision)} sq ft`,
    `  Square Yards   : ${formatNumber(result.conversions.sqyd, inputs.precision)} sq yd`,
    `  Acres          : ${formatNumber(result.conversions.acre, 4)} acres`,
    `  Hectares       : ${formatNumber(result.conversions.hectare, 4)} hectares`,
    `  Square Km      : ${formatNumber(result.conversions.sqkm, 6)} km²`,
    "",
    "FORMULA:",
    `  ${result.formula}`,
    "",
    "COMPARISON:",
    `  ${getLandSizeComparison(result.squareMeters)}`,
    "",
    "=".repeat(60),
    `Generated: ${new Date().toLocaleString()}`,
  ];
  return lines.join("\n");
}

// Download file helper
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

// Generate share URL
export function generateShareUrl(inputs: CalculationInputs): string {
  const params = new URLSearchParams();
  params.set("mode", inputs.mode);
  
  if (inputs.mode === "dimensions") {
    params.set("l", inputs.dimensions.length);
    params.set("w", inputs.dimensions.width);
    params.set("du", inputs.dimensions.unit);
  } else {
    params.set("v", inputs.conversion.value);
    params.set("cu", inputs.conversion.unit);
  }
  
  params.set("p", inputs.precision.toString());
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// Parse share URL params
export function parseShareParams(): Partial<CalculationInputs> | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode") as CalculationMode;
    
    if (!mode || !["dimensions", "conversion"].includes(mode)) return null;
    
    const result: Partial<CalculationInputs> = { mode };
    
    if (mode === "dimensions") {
      const l = params.get("l");
      const w = params.get("w");
      const du = params.get("du") as DimensionUnit;
      
      if (l && w) {
        result.dimensions = {
          length: l,
          width: w,
          unit: (du && ["m", "ft", "yd"].includes(du)) ? du : "m",
        };
      }
    } else {
      const v = params.get("v");
      const cu = params.get("cu") as AreaUnit;
      
      if (v) {
        result.conversion = {
          value: v,
          unit: (cu && Object.keys(AREA_TO_SQM).includes(cu)) ? cu : "sqft",
        };
      }
    }
    
    const p = params.get("p");
    if (p) {
      const precision = parseInt(p);
      if (!isNaN(precision) && [0, 2, 4].includes(precision)) {
        result.precision = precision;
      }
    }
    
    return result;
  } catch {
    return null;
  }
}