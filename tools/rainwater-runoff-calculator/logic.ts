import {
  RainfallUnit, AreaUnit, SurfaceType,
  CalculatorInputs, CalculationResult, HistoryEntry,
} from "./types";

// ── Surface runoff coefficients ─────────────────────────────────────────────
export const SURFACE_COEFFICIENTS: Record<SurfaceType, number> = {
  concrete:   0.90,
  roof:       0.95,
  grass:      0.30,
  gravel:     0.60,
  bare_soil:  0.50,
  clay_soil:  0.70,
  sandy_soil: 0.20,
  asphalt:    0.85,
  custom:     0.50,
};

export const SURFACE_LABELS: Record<SurfaceType, string> = {
  concrete:   "Concrete / Pavement (0.90)",
  roof:       "Roof Surface (0.95)",
  grass:      "Grass / Lawn (0.30)",
  gravel:     "Gravel (0.60)",
  bare_soil:  "Bare Soil (0.50)",
  clay_soil:  "Clay Soil (0.70)",
  sandy_soil: "Sandy Soil (0.20)",
  asphalt:    "Asphalt (0.85)",
  custom:     "Custom Coefficient",
};

export const ALL_SURFACES: SurfaceType[] = [
  "concrete", "roof", "grass", "gravel",
  "bare_soil", "clay_soil", "sandy_soil", "asphalt", "custom",
];

// ── Unit conversion ─────────────────────────────────────────────────────────
export function toMm(value: number, unit: RainfallUnit): number {
  if (unit === "cm") return value * 10;
  if (unit === "in") return value * 25.4;
  return value; // mm
}

export function toSqm(value: number, unit: AreaUnit): number {
  if (unit === "sqft")   return value * 0.092903;
  if (unit === "acre")   return value * 4046.86;
  if (unit === "hectare") return value * 10000;
  return value; // sqm
}

// ── Core formula ─────────────────────────────────────────────────────────────
// Runoff (liters) = Rainfall (mm) × Area (m²) × Coefficient
// 1 mm of rain on 1 m² = 1 liter
export function calculateRunoff(rainfallMm: number, areaSqm: number, coefficient: number): number {
  return rainfallMm * areaSqm * coefficient;
}

// ── Harvest potential ────────────────────────────────────────────────────────
function harvestPotential(liters: number): CalculationResult["harvestPotential"] {
  if (liters >= 5000) return "High";
  if (liters >= 1000) return "Moderate";
  if (liters >= 200)  return "Low";
  return "Very Low";
}

function harvestNote(potential: CalculationResult["harvestPotential"]): string {
  switch (potential) {
    case "High":     return "Excellent for rainwater harvesting. Consider a large storage tank.";
    case "Moderate": return "Good collection potential. A standard rain barrel or cistern is suitable.";
    case "Low":      return "Limited collection. A small rain barrel may be sufficient.";
    case "Very Low": return "Minimal runoff. Increase catchment area for meaningful collection.";
  }
}

// ── Recommendations ──────────────────────────────────────────────────────────
function buildRecommendations(
  coefficient: number,
  rainfallMm: number,
  areaSqm: number,
  liters: number,
): string[] {
  const recs: string[] = [];

  if (coefficient >= 0.85) {
    recs.push("High runoff coefficient detected. Consider permeable paving or green roofs to reduce runoff.");
  }
  if (coefficient <= 0.25) {
    recs.push("Low runoff coefficient. This surface absorbs most rainfall — good for groundwater recharge.");
  }
  if (rainfallMm > 100) {
    recs.push("Heavy rainfall event. Ensure drainage systems are sized for peak flow.");
  }
  if (areaSqm > 5000) {
    recs.push("Large catchment area. A multi-tank or underground cistern system is recommended.");
  }
  if (liters > 10000) {
    recs.push("High runoff volume. Consider stormwater retention basins or infiltration trenches.");
  }
  if (liters >= 1000 && coefficient >= 0.7) {
    recs.push("Good harvesting potential. Install first-flush diverters to improve water quality.");
  }
  if (recs.length === 0) {
    recs.push("Runoff is within normal range for this surface type and rainfall amount.");
  }
  return recs;
}

// ── Main calculation ─────────────────────────────────────────────────────────
export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const rainfall = parseFloat(inputs.rainfall);
  const area     = parseFloat(inputs.area);

  if (isNaN(rainfall) || rainfall <= 0) return null;
  if (isNaN(area)     || area <= 0)     return null;

  const rainfallMm = toMm(rainfall, inputs.rainfallUnit);
  const areaSqm    = toSqm(area, inputs.areaUnit);

  let coefficient: number;
  if (inputs.surfaceType === "custom") {
    const c = parseFloat(inputs.customCoefficient);
    if (isNaN(c) || c < 0 || c > 1) return null;
    coefficient = c;
  } else {
    coefficient = SURFACE_COEFFICIENTS[inputs.surfaceType];
  }

  const runoffLiters      = calculateRunoff(rainfallMm, areaSqm, coefficient);
  const runoffCubicMeters = runoffLiters / 1000;
  const runoffGallons     = runoffLiters * 0.264172;
  const runoffBarrels     = runoffLiters / 190; // ~190 L per standard barrel

  const potential = harvestPotential(runoffLiters);

  return {
    rainfallMm,
    areaSqm,
    coefficient,
    surfaceType: inputs.surfaceType,
    runoffLiters,
    runoffCubicMeters,
    runoffGallons,
    runoffBarrels,
    harvestPotential: potential,
    harvestNote: harvestNote(potential),
    recommendations: buildRecommendations(coefficient, rainfallMm, areaSqm, runoffLiters),
    timestamp: Date.now(),
  };
}

// ── Formatting ───────────────────────────────────────────────────────────────
export function fmtNum(v: number, decimals = 2): string {
  if (isNaN(v) || !isFinite(v)) return "—";
  return v.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtLiters(v: number): string {
  if (isNaN(v) || !isFinite(v)) return "—";
  return v.toLocaleString("en-US", { maximumFractionDigits: 0 }) + " L";
}

// ── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  } as T;
}

// ── LocalStorage history ─────────────────────────────────────────────────────
const HISTORY_KEY = "rainwater_runoff_calc_history";

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    inputs,
    result,
  };
  history.unshift(entry);
  if (history.length > 20) history.pop();
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export ───────────────────────────────────────────────────────────────────
export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const lines: string[] = [
    "RAINWATER RUNOFF CALCULATOR REPORT",
    "===================================",
    `Date: ${new Date(result.timestamp).toLocaleString("en-US")}`,
    "",
    "INPUTS",
    "------",
    `Rainfall: ${inputs.rainfall} ${inputs.rainfallUnit} (${fmtNum(result.rainfallMm, 2)} mm)`,
    `Land Area: ${inputs.area} ${inputs.areaUnit} (${fmtNum(result.areaSqm, 2)} m²)`,
    `Surface Type: ${SURFACE_LABELS[inputs.surfaceType]}`,
    `Runoff Coefficient: ${result.coefficient}`,
    "",
    "RESULTS",
    "-------",
    `Estimated Runoff: ${fmtNum(result.runoffLiters, 0)} liters`,
    `Equivalent Volume: ${fmtNum(result.runoffCubicMeters, 3)} m³`,
    `In US Gallons: ${fmtNum(result.runoffGallons, 1)} gal`,
    `In Barrels (~190 L): ≈ ${fmtNum(result.runoffBarrels, 1)} barrels`,
    `Harvest Potential: ${result.harvestPotential}`,
    "",
    "RECOMMENDATIONS",
    "---------------",
    ...result.recommendations.map(r => `• ${r}`),
    "",
    "Formula: Runoff (L) = Rainfall (mm) × Area (m²) × Coefficient",
    `Calculation: ${fmtNum(result.rainfallMm, 2)} × ${fmtNum(result.areaSqm, 2)} × ${result.coefficient} = ${fmtNum(result.runoffLiters, 0)} L`,
    "",
    "Generated by Rainwater Runoff Calculator – productiveTB.com",
  ];
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Presets ──────────────────────────────────────────────────────────────────
export const PRESETS: { label: string; description: string; inputs: Partial<CalculatorInputs> }[] = [
  {
    label: "Concrete Driveway",
    description: "50 mm rain · 100 m² · Concrete",
    inputs: { rainfall: "50", rainfallUnit: "mm", area: "100", areaUnit: "sqm", surfaceType: "concrete" },
  },
  {
    label: "Residential Roof",
    description: "30 mm rain · 150 m² · Roof",
    inputs: { rainfall: "30", rainfallUnit: "mm", area: "150", areaUnit: "sqm", surfaceType: "roof" },
  },
  {
    label: "Lawn / Grass",
    description: "25 mm rain · 500 m² · Grass",
    inputs: { rainfall: "25", rainfallUnit: "mm", area: "500", areaUnit: "sqm", surfaceType: "grass" },
  },
  {
    label: "Parking Lot",
    description: "1 in rain · 5000 sqft · Asphalt",
    inputs: { rainfall: "1", rainfallUnit: "in", area: "5000", areaUnit: "sqft", surfaceType: "asphalt" },
  },
  {
    label: "Agricultural Field",
    description: "40 mm rain · 1 acre · Bare Soil",
    inputs: { rainfall: "40", rainfallUnit: "mm", area: "1", areaUnit: "acre", surfaceType: "bare_soil" },
  },
  {
    label: "Large Roof (Harvest)",
    description: "100 mm rain · 200 m² · Roof",
    inputs: { rainfall: "100", rainfallUnit: "mm", area: "200", areaUnit: "sqm", surfaceType: "roof" },
  },
];

// ── Area unit labels ─────────────────────────────────────────────────────────
export const AREA_UNIT_LABELS: Record<AreaUnit, string> = {
  sqm:     "Square Meters (m²)",
  sqft:    "Square Feet (ft²)",
  acre:    "Acres",
  hectare: "Hectares",
};

export const AREA_UNIT_SHORT: Record<AreaUnit, string> = {
  sqm:     "m²",
  sqft:    "ft²",
  acre:    "acre",
  hectare: "ha",
};

export const RAINFALL_UNIT_LABELS: Record<RainfallUnit, string> = {
  mm: "Millimeters (mm)",
  cm: "Centimeters (cm)",
  in: "Inches (in)",
};

export const ALL_AREA_UNITS: AreaUnit[] = ["sqm", "sqft", "acre", "hectare"];
export const ALL_RAINFALL_UNITS: RainfallUnit[] = ["mm", "cm", "in"];
