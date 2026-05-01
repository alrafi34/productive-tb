import { Unit, TimePeriod, RainwaterHarvestingInputs, RainwaterHarvestingCalculation, RainwaterPreset, HistoryEntry } from "./types";

const HISTORY_KEY = "rainwater-harvesting-calculator-history";
const MAX_HISTORY = 10;

// Average household water consumption: ~150 liters/person/day or ~40 gallons/person/day
const AVERAGE_HOUSEHOLD_CONSUMPTION_LITERS_MONTH = 12000; // 4 people × 150L × 30 days / 1.5
const AVERAGE_HOUSEHOLD_CONSUMPTION_GALLONS_MONTH = 3170; // 4 people × 40gal × 30 days / 1.5

/**
 * Calculate rainwater harvesting potential
 * Formula: Volume = Area × Rainfall × Runoff Coefficient
 */
export function calculateRainwaterHarvesting(inputs: RainwaterHarvestingInputs): RainwaterHarvestingCalculation {
  const { roofArea, rainfall, runoffCoefficient, timePeriod, unit } = inputs;
  
  let yearlyWaterCollected = 0;
  const notes: string[] = [];
  
  if (unit === "metric") {
    // Metric: Area (m²) × Rainfall (mm) × Coefficient = Liters
    // 1 mm of rain on 1 m² = 1 liter
    yearlyWaterCollected = roofArea * rainfall * runoffCoefficient;
  } else {
    // Imperial: Area (ft²) × Rainfall (inches) × 0.623 × Coefficient = Gallons
    yearlyWaterCollected = roofArea * rainfall * 0.623 * runoffCoefficient;
  }
  
  const monthlyWaterCollected = yearlyWaterCollected / 12;
  const dailyAverage = yearlyWaterCollected / 365;
  
  // Suggested tank size: typically 20-30% of annual collection or 1-2 months storage
  const suggestedTankSizeMin = Math.round(monthlyWaterCollected * 1);
  const suggestedTankSizeMax = Math.round(monthlyWaterCollected * 2);
  
  // Calculate household supply months
  const avgConsumption = unit === "metric" 
    ? AVERAGE_HOUSEHOLD_CONSUMPTION_LITERS_MONTH 
    : AVERAGE_HOUSEHOLD_CONSUMPTION_GALLONS_MONTH;
  const householdMonthsSupply = yearlyWaterCollected / avgConsumption;
  
  // Add notes based on results
  if (runoffCoefficient < 0.7) {
    notes.push("⚠️ Low runoff coefficient - consider improving collection efficiency");
  } else if (runoffCoefficient >= 0.85) {
    notes.push("✓ Excellent runoff coefficient for water collection");
  }
  
  if (unit === "metric") {
    if (yearlyWaterCollected > 100000) {
      notes.push("💧 Large collection capacity - suitable for commercial or agricultural use");
    } else if (yearlyWaterCollected > 50000) {
      notes.push("💧 Good collection capacity for residential use");
    } else if (yearlyWaterCollected < 20000) {
      notes.push("💧 Modest collection - best for supplemental water supply");
    }
  } else {
    if (yearlyWaterCollected > 26400) { // ~100,000 liters
      notes.push("💧 Large collection capacity - suitable for commercial or agricultural use");
    } else if (yearlyWaterCollected > 13200) { // ~50,000 liters
      notes.push("💧 Good collection capacity for residential use");
    } else if (yearlyWaterCollected < 5280) { // ~20,000 liters
      notes.push("💧 Modest collection - best for supplemental water supply");
    }
  }
  
  if (householdMonthsSupply >= 12) {
    notes.push("🏠 Can supply average household water needs for a full year");
  } else if (householdMonthsSupply >= 6) {
    notes.push("🏠 Can supply significant portion of household water needs");
  }
  
  notes.push("💡 Install first-flush diverters to improve water quality");
  notes.push("💡 Regular maintenance ensures optimal collection efficiency");
  
  return {
    roofArea,
    rainfall,
    runoffCoefficient,
    timePeriod,
    unit,
    totalWaterCollected: timePeriod === "yearly" ? yearlyWaterCollected : monthlyWaterCollected,
    monthlyWaterCollected,
    yearlyWaterCollected,
    suggestedTankSizeMin,
    suggestedTankSizeMax,
    dailyAverage,
    householdMonthsSupply,
    timestamp: Date.now(),
    notes
  };
}

export function getRainwaterPresets(): RainwaterPreset[] {
  return [
    {
      name: "Small Residential (Metric)",
      description: "50m² roof, 800mm rainfall, 80% efficiency",
      roofArea: 50,
      rainfall: 800,
      runoffCoefficient: 0.8,
      unit: "metric",
      category: "Residential"
    },
    {
      name: "Medium Residential (Metric)",
      description: "100m² roof, 1000mm rainfall, 80% efficiency",
      roofArea: 100,
      rainfall: 1000,
      runoffCoefficient: 0.8,
      unit: "metric",
      category: "Residential"
    },
    {
      name: "Large Residential (Metric)",
      description: "150m² roof, 1200mm rainfall, 85% efficiency",
      roofArea: 150,
      rainfall: 1200,
      runoffCoefficient: 0.85,
      unit: "metric",
      category: "Residential"
    },
    {
      name: "Small Commercial (Metric)",
      description: "300m² roof, 1000mm rainfall, 75% efficiency",
      roofArea: 300,
      rainfall: 1000,
      runoffCoefficient: 0.75,
      unit: "metric",
      category: "Commercial"
    },
    {
      name: "Farm Building (Metric)",
      description: "500m² roof, 900mm rainfall, 70% efficiency",
      roofArea: 500,
      rainfall: 900,
      runoffCoefficient: 0.7,
      unit: "metric",
      category: "Agricultural"
    },
    {
      name: "Small Home (Imperial)",
      description: "500ft² roof, 30in rainfall, 80% efficiency",
      roofArea: 500,
      rainfall: 30,
      runoffCoefficient: 0.8,
      unit: "imperial",
      category: "Residential"
    }
  ];
}

// History management
export function saveToHistory(calculation: RainwaterHarvestingCalculation): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

// Export functions
export function exportToText(calculation: RainwaterHarvestingCalculation): string {
  const unitLabel = calculation.unit === "metric" ? "liters" : "gallons";
  const areaUnit = calculation.unit === "metric" ? "m²" : "ft²";
  const rainfallUnit = calculation.unit === "metric" ? "mm" : "inches";
  
  const lines = [
    "RAINWATER HARVESTING CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Unit System: ${calculation.unit === 'metric' ? 'Metric' : 'Imperial'}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Roof Area: ${formatNumber(calculation.roofArea, 2)} ${areaUnit}`,
    `Annual Rainfall: ${formatNumber(calculation.rainfall, 2)} ${rainfallUnit}`,
    `Runoff Coefficient: ${calculation.runoffCoefficient} (${(calculation.runoffCoefficient * 100).toFixed(0)}%)`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Yearly Collection: ${formatNumber(calculation.yearlyWaterCollected, 0)} ${unitLabel}`,
    `Monthly Average: ${formatNumber(calculation.monthlyWaterCollected, 0)} ${unitLabel}`,
    `Daily Average: ${formatNumber(calculation.dailyAverage, 1)} ${unitLabel}`,
    "",
    "TANK RECOMMENDATIONS:",
    "-".repeat(50),
    `Suggested Tank Size: ${formatNumber(calculation.suggestedTankSizeMin, 0)} - ${formatNumber(calculation.suggestedTankSizeMax, 0)} ${unitLabel}`,
    "",
    "HOUSEHOLD COMPARISON:",
    "-".repeat(50),
    `Household Supply: ${formatNumber(calculation.householdMonthsSupply, 1)} months`,
    `(Based on average 4-person household consumption)`
  ];
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Rainwater Harvesting Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(calculation: RainwaterHarvestingCalculation): string {
  const unitLabel = calculation.unit === "metric" ? "liters" : "gallons";
  const areaUnit = calculation.unit === "metric" ? "m²" : "ft²";
  const rainfallUnit = calculation.unit === "metric" ? "mm" : "inches";
  
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Roof Area", calculation.roofArea.toString(), areaUnit],
    ["Annual Rainfall", calculation.rainfall.toString(), rainfallUnit],
    ["Runoff Coefficient", calculation.runoffCoefficient.toString(), ""],
    ["Yearly Collection", formatNumber(calculation.yearlyWaterCollected, 0), unitLabel],
    ["Monthly Average", formatNumber(calculation.monthlyWaterCollected, 0), unitLabel],
    ["Daily Average", formatNumber(calculation.dailyAverage, 1), unitLabel],
    ["Suggested Tank Min", formatNumber(calculation.suggestedTankSizeMin, 0), unitLabel],
    ["Suggested Tank Max", formatNumber(calculation.suggestedTankSizeMax, 0), unitLabel],
    ["Household Supply", formatNumber(calculation.householdMonthsSupply, 1), "months"]
  ];
  
  return rows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validateInputs(roofArea: number, rainfall: number, runoffCoefficient: number): string | null {
  if (roofArea <= 0) {
    return "Roof area must be greater than 0";
  }
  
  if (rainfall <= 0) {
    return "Rainfall must be greater than 0";
  }
  
  if (runoffCoefficient <= 0 || runoffCoefficient > 1) {
    return "Runoff coefficient must be between 0 and 1";
  }
  
  return null;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
