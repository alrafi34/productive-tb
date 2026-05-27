import {
  CalculationResult,
  CalculatorInputs,
  AreaUnit,
  CropType,
  SoilType,
  ClimateType,
  IrrigationMethod,
  GrowthStage,
  HistoryEntry,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const AREA_UNIT_LABELS: Record<AreaUnit, string> = {
  acre: "Acre",
  hectare: "Hectare",
  sqm: "Square Meter",
  sqft: "Square Foot",
  decimal: "Decimal",
};

export const AREA_UNIT_SHORT: Record<AreaUnit, string> = {
  acre: "acre",
  hectare: "ha",
  sqm: "sq m",
  sqft: "sq ft",
  decimal: "decimal",
};

export const ALL_AREA_UNITS: AreaUnit[] = ["acre", "hectare", "sqm", "sqft", "decimal"];

export const CROP_LABELS: Record<CropType, string> = {
  rice: "Rice",
  wheat: "Wheat",
  corn: "Corn / Maize",
  vegetables: "Vegetables",
  potato: "Potato",
  tomato: "Tomato",
  sugarcane: "Sugarcane",
  cotton: "Cotton",
  banana: "Banana",
  custom: "Custom Crop",
};

export const ALL_CROPS: CropType[] = [
  "rice", "wheat", "corn", "vegetables", "potato",
  "tomato", "sugarcane", "cotton", "banana", "custom",
];

export const SOIL_LABELS: Record<SoilType, string> = {
  clay: "Clay",
  loam: "Loam",
  sandy: "Sandy",
  silty: "Silty",
};

export const ALL_SOILS: SoilType[] = ["clay", "loam", "sandy", "silty"];

export const CLIMATE_LABELS: Record<ClimateType, string> = {
  cold: "Cold",
  moderate: "Moderate",
  hot: "Hot",
  very_hot: "Very Hot",
};

export const ALL_CLIMATES: ClimateType[] = ["cold", "moderate", "hot", "very_hot"];

export const IRRIGATION_LABELS: Record<IrrigationMethod, string> = {
  surface: "Surface Irrigation",
  sprinkler: "Sprinkler",
  drip: "Drip Irrigation",
  flood: "Flood Irrigation",
};

export const ALL_IRRIGATION_METHODS: IrrigationMethod[] = ["surface", "sprinkler", "drip", "flood"];

export const GROWTH_STAGE_LABELS: Record<GrowthStage, string> = {
  initial: "Initial Stage",
  development: "Development Stage",
  mid_season: "Mid Season",
  late_season: "Late Season",
};

export const ALL_GROWTH_STAGES: GrowthStage[] = ["initial", "development", "mid_season", "late_season"];

// ── Constants ─────────────────────────────────────────────────────────────────

// Reference ET (mm/day) by climate
const ET_VALUES: Record<ClimateType, number> = {
  cold: 2,
  moderate: 4,
  hot: 6,
  very_hot: 8,
};

// Crop coefficients (Kc)
const CROP_KC: Record<CropType, number> = {
  rice: 1.20,
  wheat: 1.10,
  corn: 0.95,
  vegetables: 0.90,
  potato: 1.05,
  tomato: 1.00,
  sugarcane: 1.25,
  cotton: 1.15,
  banana: 1.20,
  custom: 1.00,
};

// Soil adjustment factors
const SOIL_FACTORS: Record<SoilType, number> = {
  clay: 0.90,
  loam: 1.00,
  sandy: 1.20,
  silty: 1.05,
};

// Irrigation efficiency
const IRRIGATION_EFFICIENCY: Record<IrrigationMethod, number> = {
  surface: 0.60,
  sprinkler: 0.75,
  drip: 0.90,
  flood: 0.50,
};

// Growth stage multipliers
const GROWTH_STAGE_FACTORS: Record<GrowthStage, number> = {
  initial: 0.70,
  development: 0.90,
  mid_season: 1.00,
  late_season: 0.80,
};

// ── Area Conversion ──────────────────────────────────────────────────────────

export function convertToSqm(area: number, unit: AreaUnit): number {
  switch (unit) {
    case "acre":    return area * 4046.86;
    case "hectare": return area * 10000;
    case "sqm":     return area;
    case "sqft":    return area * 0.0929;
    case "decimal": return area * 40.4686;
    default:        return area;
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

export function fmtNum(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtLiters(liters: number): string {
  if (liters >= 1_000_000) {
    return `${fmtNum(liters / 1_000_000, 2)} ML`;
  }
  if (liters >= 1_000) {
    return `${fmtNum(liters / 1_000, 1)} kL`;
  }
  return `${fmtNum(liters, 0)} L`;
}

// ── Core Calculation ──────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const area = parseFloat(inputs.landArea);
  if (!area || area <= 0) return null;

  const areaInSqm = convertToSqm(area, inputs.areaUnit);
  const rainfall = parseFloat(inputs.rainfall) || 0;

  const etRate = ET_VALUES[inputs.climate];
  const cropKc = CROP_KC[inputs.cropType];
  const soilFactor = SOIL_FACTORS[inputs.soilType];
  const efficiency = IRRIGATION_EFFICIENCY[inputs.irrigationMethod];
  const growthFactor = GROWTH_STAGE_FACTORS[inputs.growthStage];

  // Water depth needed (mm/day) before efficiency
  // Formula: ET × Kc × soilFactor × growthFactor / efficiency
  const rawDepthMm = (etRate * cropKc * soilFactor * growthFactor) / efficiency;

  // Rainfall reduction (mm/day → liters/day)
  const rainfallDepthMm = Math.min(rainfall, rawDepthMm);
  const netDepthMm = Math.max(0, rawDepthMm - rainfallDepthMm);

  // Convert mm/day to liters/day: 1 mm over 1 sqm = 1 liter
  const dailyWaterLiters = netDepthMm * areaInSqm;
  const rainfallReductionLiters = rainfallDepthMm * areaInSqm;

  const recommendations = generateRecommendations(inputs, dailyWaterLiters, netDepthMm);
  const efficiencyTip = getEfficiencyTip(inputs.irrigationMethod);
  const rainfallNote = rainfall > 0
    ? `Recent rainfall reduces irrigation need by ${fmtNum((rainfallDepthMm / rawDepthMm) * 100, 0)}%.`
    : "";

  return {
    landArea: area,
    areaUnit: inputs.areaUnit,
    landAreaInSqm: areaInSqm,
    cropType: inputs.cropType,
    soilType: inputs.soilType,
    climate: inputs.climate,
    irrigationMethod: inputs.irrigationMethod,
    growthStage: inputs.growthStage,
    rainfall,

    dailyWaterLiters,
    dailyWaterDepthMm: netDepthMm,
    weeklyWaterLiters: dailyWaterLiters * 7,
    monthlyWaterLiters: dailyWaterLiters * 30,

    etRate,
    cropCoefficient: cropKc,
    soilFactor,
    irrigationEfficiency: efficiency,
    growthStageFactor: growthFactor,
    rainfallReductionLiters,

    recommendations,
    efficiencyTip,
    rainfallNote,
  };
}

function generateRecommendations(
  inputs: CalculatorInputs,
  dailyLiters: number,
  depthMm: number,
): string[] {
  const recs: string[] = [];

  // Crop-specific
  if (inputs.cropType === "rice") {
    recs.push("Rice requires continuous flooding. Maintain 5–10 cm standing water during vegetative stage.");
  } else if (inputs.cropType === "sugarcane") {
    recs.push("Sugarcane needs frequent irrigation. Irrigate every 7–10 days during dry periods.");
  } else if (inputs.cropType === "wheat") {
    recs.push("Wheat is sensitive to waterlogging. Avoid over-irrigation, especially at tillering stage.");
  } else if (inputs.cropType === "vegetables") {
    recs.push("Vegetables need consistent moisture. Use mulching to reduce evaporation.");
  } else {
    recs.push(`Apply ${fmtNum(depthMm, 1)} mm of water per day for optimal crop growth.`);
  }

  // Irrigation method
  if (inputs.irrigationMethod === "drip") {
    recs.push("Drip irrigation delivers water directly to roots, minimizing evaporation losses.");
  } else if (inputs.irrigationMethod === "flood") {
    recs.push("Consider upgrading to drip or sprinkler to reduce water use by up to 40%.");
  } else if (inputs.irrigationMethod === "surface") {
    recs.push("Level the field properly to ensure uniform water distribution.");
  }

  // Climate
  if (inputs.climate === "very_hot" || inputs.climate === "hot") {
    recs.push("Irrigate during early morning or evening to reduce evaporation losses.");
  }

  // Soil
  if (inputs.soilType === "sandy") {
    recs.push("Sandy soil drains quickly. Irrigate more frequently in smaller amounts.");
  } else if (inputs.soilType === "clay") {
    recs.push("Clay soil retains water longer. Allow soil to partially dry between irrigations.");
  }

  return recs;
}

function getEfficiencyTip(method: IrrigationMethod): string {
  switch (method) {
    case "drip":
      return "Drip irrigation is 90% efficient — the most water-saving method available.";
    case "sprinkler":
      return "Sprinkler irrigation is 75% efficient. Can reduce water use by 25% vs. surface methods.";
    case "surface":
      return "Surface irrigation is 60% efficient. Switching to drip can save up to 33% water.";
    case "flood":
      return "Flood irrigation is only 50% efficient. Upgrading to drip can save up to 44% water.";
    default:
      return "";
  }
}

// ── LocalStorage History ──────────────────────────────────────────────────────

const HISTORY_KEY = "irrigation_calculator_history";
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

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  return [
    "Irrigation Water Calculator – Results",
    "=".repeat(42),
    `Land: ${fmtNum(result.landArea, 2)} ${AREA_UNIT_LABELS[result.areaUnit]} (${fmtNum(result.landAreaInSqm, 0)} sq m)`,
    `Crop: ${CROP_LABELS[result.cropType]}`,
    `Soil: ${SOIL_LABELS[result.soilType]}`,
    `Climate: ${CLIMATE_LABELS[result.climate]}`,
    `Irrigation: ${IRRIGATION_LABELS[result.irrigationMethod]}`,
    `Growth Stage: ${GROWTH_STAGE_LABELS[result.growthStage]}`,
    `Rainfall: ${result.rainfall} mm`,
    "",
    "Results:",
    `Daily Water Requirement: ${fmtNum(result.dailyWaterLiters, 0)} liters/day`,
    `Water Depth: ${fmtNum(result.dailyWaterDepthMm, 2)} mm/day`,
    `Weekly Requirement: ${fmtNum(result.weeklyWaterLiters, 0)} liters/week`,
    `Monthly Requirement: ${fmtNum(result.monthlyWaterLiters, 0)} liters/month`,
    "",
    "Recommendations:",
    ...result.recommendations.map((r) => `• ${r}`),
    "",
    result.efficiencyTip,
    result.rainfallNote,
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
