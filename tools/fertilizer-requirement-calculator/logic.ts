import {
  CalculationResult,
  CalculatorInputs,
  Currency,
  AreaUnit,
  CropType,
  FertilizerType,
  FertilizerComposition,
  NutrientRequirement,
  HistoryEntry,
} from "./types";

// ── Constants ─────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  CAD: "CA$",
  AUD: "A$",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD – US Dollar",
  EUR: "EUR – Euro", 
  GBP: "GBP – British Pound",
  INR: "INR – Indian Rupee",
  CAD: "CAD – Canadian Dollar",
  AUD: "AUD – Australian Dollar",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

export const AREA_UNIT_LABELS: Record<AreaUnit, string> = {
  acre: "Acre",
  hectare: "Hectare",
  sqft: "Square Feet",
  sqm: "Square Meter",
};

export const AREA_UNIT_SHORT: Record<AreaUnit, string> = {
  acre: "acre",
  hectare: "ha",
  sqft: "sq ft",
  sqm: "sq m",
};

export const ALL_AREA_UNITS: AreaUnit[] = ["acre", "hectare", "sqft", "sqm"];

export const CROP_LABELS: Record<CropType, string> = {
  rice: "Rice",
  wheat: "Wheat",
  corn: "Corn/Maize",
  tomato: "Tomato",
  potato: "Potato",
  vegetables: "Mixed Vegetables",
  custom: "Custom Crop",
};

export const ALL_CROPS: CropType[] = ["rice", "wheat", "corn", "tomato", "potato", "vegetables", "custom"];

export const FERTILIZER_LABELS: Record<FertilizerType, string> = {
  urea: "Urea (46% N)",
  dap: "DAP (18-46-0)",
  mop: "MOP (0-0-60)",
  "npk-10-10-10": "NPK 10-10-10",
  "npk-20-20-20": "NPK 20-20-20",
  organic: "Organic Compost",
  custom: "Custom Fertilizer",
};

export const ALL_FERTILIZERS: FertilizerType[] = ["urea", "dap", "mop", "npk-10-10-10", "npk-20-20-20", "organic", "custom"];

// ── Preset Data ──────────────────────────────────────────────────────────────

export const CROP_NUTRIENT_PRESETS: Record<CropType, NutrientRequirement> = {
  rice: { nitrogen: 60, phosphorus: 25, potassium: 30 },
  wheat: { nitrogen: 80, phosphorus: 30, potassium: 40 },
  corn: { nitrogen: 120, phosphorus: 40, potassium: 60 },
  tomato: { nitrogen: 100, phosphorus: 50, potassium: 80 },
  potato: { nitrogen: 90, phosphorus: 35, potassium: 120 },
  vegetables: { nitrogen: 70, phosphorus: 30, potassium: 50 },
  custom: { nitrogen: 0, phosphorus: 0, potassium: 0 },
};

export const FERTILIZER_COMPOSITION_PRESETS: Record<FertilizerType, FertilizerComposition> = {
  urea: { nitrogen: 46, phosphorus: 0, potassium: 0 },
  dap: { nitrogen: 18, phosphorus: 46, potassium: 0 },
  mop: { nitrogen: 0, phosphorus: 0, potassium: 60 },
  "npk-10-10-10": { nitrogen: 10, phosphorus: 10, potassium: 10 },
  "npk-20-20-20": { nitrogen: 20, phosphorus: 20, potassium: 20 },
  organic: { nitrogen: 2, phosphorus: 1, potassium: 1 },
  custom: { nitrogen: 0, phosphorus: 0, potassium: 0 },
};

// ── Area Conversion ──────────────────────────────────────────────────────────

export function convertToAcres(area: number, unit: AreaUnit): number {
  switch (unit) {
    case "acre": return area;
    case "hectare": return area * 2.471;
    case "sqft": return area / 43560;
    case "sqm": return area / 4047;
    default: return area;
  }
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 2): string {
  const sym = CURRENCY_SYMBOLS[currency];
  return `${sym}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function fmtNum(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ── Core Calculation ──────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const area = parseFloat(inputs.landArea);
  if (!area || area <= 0) return null;

  const areaInAcres = convertToAcres(area, inputs.areaUnit);
  const calculations = [];
  let totalFertilizerNeeded = 0;

  // Calculate for each nutrient
  const nutrients: Array<keyof NutrientRequirement> = ["nitrogen", "phosphorus", "potassium"];
  
  for (const nutrient of nutrients) {
    const required = inputs.nutrientRequirement[nutrient] * areaInAcres;
    const composition = inputs.fertilizerComposition[nutrient];
    
    if (required > 0 && composition > 0) {
      const fertilizerNeeded = required / (composition / 100);
      calculations.push({
        nutrient,
        required,
        fertilizerNeeded,
      });
      totalFertilizerNeeded = Math.max(totalFertilizerNeeded, fertilizerNeeded);
    }
  }

  // Calculate total cost if price is provided
  const price = parseFloat(inputs.fertilizerPrice);
  const totalCost = price > 0 ? totalFertilizerNeeded * price : null;

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, totalFertilizerNeeded, areaInAcres);

  return {
    landArea: area,
    areaUnit: inputs.areaUnit,
    landAreaInAcres: areaInAcres,
    cropType: inputs.cropType,
    fertilizerType: inputs.fertilizerType,
    calculations,
    totalFertilizerNeeded,
    totalCost,
    currency: inputs.currency,
    recommendations,
  };
}

function generateRecommendations(inputs: CalculatorInputs, totalFertilizer: number, acres: number): string[] {
  const recommendations = [];
  
  // Application timing
  if (inputs.cropType === "rice") {
    recommendations.push("Apply 50% at planting, 25% at tillering, 25% at panicle initiation");
  } else if (inputs.cropType === "wheat") {
    recommendations.push("Apply 60% at sowing, 40% at crown root initiation");
  } else if (inputs.cropType === "corn") {
    recommendations.push("Apply 30% at planting, 70% at V6-V8 stage");
  } else {
    recommendations.push("Apply in 2-3 split doses during crop growth");
  }

  // Quantity per acre
  const perAcre = totalFertilizer / acres;
  recommendations.push(`Apply ${fmtNum(perAcre, 1)} kg per acre`);

  // Storage advice
  if (totalFertilizer > 100) {
    recommendations.push("Store fertilizer in dry, cool place away from moisture");
  }

  // Soil testing
  recommendations.push("Conduct soil test before application for best results");

  return recommendations;
}

// ── LocalStorage History ──────────────────────────────────────────────────────

const HISTORY_KEY = "fertilizer_calculator_history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {}
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}

// ── Export Functions ──────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  return [
    "Fertilizer Requirement Calculator – Results",
    "=".repeat(45),
    `Crop: ${CROP_LABELS[result.cropType]}`,
    `Land Area: ${fmtNum(result.landArea, 2)} ${AREA_UNIT_LABELS[result.areaUnit]} (${fmtNum(result.landAreaInAcres, 2)} acres)`,
    `Fertilizer: ${FERTILIZER_LABELS[result.fertilizerType]}`,
    "",
    "Nutrient Requirements:",
    ...result.calculations.map(c => 
      `${c.nutrient.charAt(0).toUpperCase() + c.nutrient.slice(1)}: ${fmtNum(c.required, 1)} kg → ${fmtNum(c.fertilizerNeeded, 1)} kg fertilizer`
    ),
    "",
    `Total Fertilizer Required: ${fmtNum(result.totalFertilizerNeeded, 1)} kg`,
    result.totalCost !== null ? `Estimated Cost: ${fmt(result.totalCost, result.currency, 2)}` : "",
    "",
    "Recommendations:",
    ...result.recommendations.map(r => `• ${r}`),
  ]
    .filter(Boolean)
    .join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}