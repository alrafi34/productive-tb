import {
  CalculationMode,
  Unit,
  BuildingHeightInputs,
  BuildingHeightCalculation,
  ScenarioPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "building-height-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate building height based on FAR and other parameters
 */
export function calculateBuildingHeight(inputs: BuildingHeightInputs): BuildingHeightCalculation {
  const { plotArea, far, floorHeight, roadWidth, setback, calculationMode, unit, roadWidthFactor = 1.5 } = inputs;
  const notes: string[] = [];
  
  // Method 1: FAR-Based Calculation
  const totalBuildableArea = plotArea * far;
  const numberOfFloors = totalBuildableArea / plotArea;
  const buildingHeightFAR = numberOfFloors * floorHeight;
  
  notes.push(`FAR-based calculation: ${formatNumber(numberOfFloors, 2)} floors × ${floorHeight} ${unit === "feet" ? "ft" : "m"} = ${formatNumber(buildingHeightFAR, 2)} ${unit === "feet" ? "ft" : "m"}`);
  
  // Method 2: Road Width Based Calculation
  const heightByRoadWidth = (roadWidth - setback) * roadWidthFactor;
  notes.push(`Road width rule: (${roadWidth} - ${setback}) × ${roadWidthFactor} = ${formatNumber(heightByRoadWidth, 2)} ${unit === "feet" ? "ft" : "m"}`);
  
  // Determine applicable height based on mode
  let applicableHeight = buildingHeightFAR;
  
  if (calculationMode === "far-based") {
    applicableHeight = buildingHeightFAR;
    notes.push("✓ Using FAR-based height calculation");
  } else if (calculationMode === "road-width-based") {
    applicableHeight = heightByRoadWidth;
    notes.push("✓ Using road width-based height calculation");
  } else if (calculationMode === "custom") {
    // Use the minimum of both for safety
    applicableHeight = Math.min(buildingHeightFAR, heightByRoadWidth);
    notes.push("✓ Using minimum of FAR and road width rules for compliance");
  }
  
  // Add contextual notes
  if (far < 1.0) {
    notes.push("⚠️ Low FAR - suitable for low-density residential areas");
  } else if (far >= 1.0 && far <= 2.5) {
    notes.push("✓ Moderate FAR - typical for residential/mixed-use areas");
  } else if (far > 2.5 && far <= 4.0) {
    notes.push("✓ High FAR - suitable for commercial/urban areas");
  } else if (far > 4.0) {
    notes.push("⚠️ Very high FAR - verify local zoning regulations");
  }
  
  // Floor height validation
  if (floorHeight < 8) {
    notes.push("⚠️ Floor height is low - ensure it meets minimum standards");
  } else if (floorHeight >= 8 && floorHeight <= 12) {
    notes.push("✓ Standard floor height for residential/commercial use");
  } else if (floorHeight > 12) {
    notes.push("✓ High floor height - suitable for commercial/industrial use");
  }
  
  // Setback considerations
  if (setback < roadWidth * 0.2) {
    notes.push("⚠️ Small setback - verify local building codes");
  } else {
    notes.push("✓ Adequate setback distance");
  }
  
  // Building classification
  const floors = Math.floor(numberOfFloors);
  if (floors <= 2) {
    notes.push("Low-rise building (1-2 floors)");
  } else if (floors <= 7) {
    notes.push("Mid-rise building (3-7 floors)");
  } else if (floors <= 25) {
    notes.push("High-rise building (8-25 floors)");
  } else {
    notes.push("Super high-rise building (25+ floors)");
  }
  
  return {
    plotArea,
    far,
    floorHeight,
    roadWidth,
    setback,
    calculationMode,
    unit,
    totalBuildableArea,
    numberOfFloors,
    buildingHeight: buildingHeightFAR,
    heightByRoadWidth,
    applicableHeight,
    timestamp: Date.now(),
    notes
  };
}

export function getScenarioPresets(): ScenarioPreset[] {
  return [
    {
      name: "Small Residential Plot",
      description: "Typical single-family home",
      plotArea: 2000,
      far: 1.5,
      floorHeight: 10,
      roadWidth: 20,
      setback: 5,
      category: "Residential"
    },
    {
      name: "Medium Residential",
      description: "Multi-family residential building",
      plotArea: 5000,
      far: 2.0,
      floorHeight: 10,
      roadWidth: 30,
      setback: 10,
      category: "Residential"
    },
    {
      name: "Commercial Building",
      description: "Small commercial complex",
      plotArea: 8000,
      far: 2.5,
      floorHeight: 12,
      roadWidth: 40,
      setback: 15,
      category: "Commercial"
    },
    {
      name: "Urban Mixed-Use",
      description: "High-density mixed-use development",
      plotArea: 10000,
      far: 3.5,
      floorHeight: 11,
      roadWidth: 50,
      setback: 20,
      category: "Mixed-Use"
    },
    {
      name: "High-Rise Tower",
      description: "Urban high-rise building",
      plotArea: 15000,
      far: 4.0,
      floorHeight: 12,
      roadWidth: 60,
      setback: 25,
      category: "High-Rise"
    },
    {
      name: "Industrial Facility",
      description: "Industrial/warehouse building",
      plotArea: 20000,
      far: 1.0,
      floorHeight: 15,
      roadWidth: 40,
      setback: 20,
      category: "Industrial"
    }
  ];
}

// History management
export function saveToHistory(calculation: BuildingHeightCalculation): void {
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
export function exportToText(calculation: BuildingHeightCalculation): string {
  const lines = [
    "BUILDING HEIGHT CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Plot Area: ${formatNumber(calculation.plotArea, 0)} ${calculation.unit === "feet" ? "sq ft" : "sq m"}`,
    `FAR (Floor Area Ratio): ${formatNumber(calculation.far, 2)}`,
    `Floor Height: ${calculation.floorHeight} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Road Width: ${calculation.roadWidth} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Setback: ${calculation.setback} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Calculation Mode: ${getCalculationModeLabel(calculation.calculationMode)}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Total Buildable Area: ${formatNumber(calculation.totalBuildableArea, 0)} ${calculation.unit === "feet" ? "sq ft" : "sq m"}`,
    `Number of Floors: ${formatNumber(calculation.numberOfFloors, 2)}`,
    `Building Height (FAR): ${formatNumber(calculation.buildingHeight, 2)} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Height by Road Width: ${formatNumber(calculation.heightByRoadWidth || 0, 2)} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Applicable Height: ${formatNumber(calculation.applicableHeight, 2)} ${calculation.unit === "feet" ? "ft" : "m"}`
  ];
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES & RECOMMENDATIONS:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Building Height Calculator");
  
  return lines.join("\n");
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
  return value.toFixed(decimals);
}

export function getCalculationModeLabel(mode: CalculationMode): string {
  const labels: Record<CalculationMode, string> = {
    "far-based": "FAR Based",
    "road-width-based": "Road Width Based",
    "custom": "Custom (Minimum of Both)"
  };
  return labels[mode];
}

export function validateInputs(
  plotArea: number,
  far: number,
  floorHeight: number,
  roadWidth: number,
  setback: number
): string | null {
  if (!plotArea || plotArea <= 0) {
    return "Plot area must be greater than 0";
  }
  
  if (!far || far <= 0) {
    return "FAR must be greater than 0";
  }
  
  if (far > 10) {
    return "FAR seems unusually high (typical range: 0.5 - 5.0)";
  }
  
  if (!floorHeight || floorHeight <= 0) {
    return "Floor height must be greater than 0";
  }
  
  if (floorHeight < 7) {
    return "Floor height is too low (minimum recommended: 8 ft or 2.4 m)";
  }
  
  if (!roadWidth || roadWidth <= 0) {
    return "Road width must be greater than 0";
  }
  
  if (setback < 0) {
    return "Setback cannot be negative";
  }
  
  if (setback >= roadWidth) {
    return "Setback should be less than road width";
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
