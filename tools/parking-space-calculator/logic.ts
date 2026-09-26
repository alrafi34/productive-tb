import {
  InputMode,
  LayoutType,
  Unit,
  ParkingSpaceInputs,
  ParkingSpaceCalculation,
  LayoutPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "parking-space-calculator-history";
const MAX_HISTORY = 10;

const FT_PER_M = 3.28084;

/**
 * Area one stall occupies in a double-loaded bay: its width measured along the
 * aisle × (its depth perpendicular to the aisle + half the aisle it shares).
 * All lengths in one unit; the result is in that unit squared.
 *   90°:      w × (l + a/2)
 *   angle θ:  (w / sin θ) × (l·sin θ + w·cos θ + a/2)
 *   parallel: l × (w + a/2)   — the car's length runs along the curb
 */
export function areaPerStall(layoutType: LayoutType, spaceWidth: number, spaceLength: number, aisleWidth: number): number {
  const halfAisle = aisleWidth / 2;
  if (layoutType === "parallel") return spaceLength * (spaceWidth + halfAisle);
  if (layoutType === "perpendicular") return spaceWidth * (spaceLength + halfAisle);
  const theta = layoutType === "angled-60" ? Math.PI / 3 : Math.PI / 4;
  const alongAisle = spaceWidth / Math.sin(theta);
  const depth = spaceLength * Math.sin(theta) + spaceWidth * Math.cos(theta);
  return alongAisle * (depth + halfAisle);
}

/** Convert a length between the calculator's two units. */
export function convertLength(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;
  return from === "feet" ? value / FT_PER_M : value * FT_PER_M;
}

/**
 * Calculate parking capacity based on area and layout
 */
export function calculateParkingCapacity(inputs: ParkingSpaceInputs): ParkingSpaceCalculation {
  const { inputMode, totalArea, width, length, unit, layoutType, spaceWidth, spaceLength, aisleWidth } = inputs;
  const notes: string[] = [];
  
  // Calculate total area
  let area = 0;
  if (inputMode === "total-area" && totalArea) {
    area = totalArea;
  } else if (inputMode === "dimensions" && width && length) {
    area = width * length;
    notes.push(`Calculated area: ${width} × ${length} = ${formatNumber(area, 0)} ${unit === "feet" ? "sq ft" : "sq m"}`);
  }
  
  // Area per stall from the stall and aisle inputs, in the same unit as the lot
  const areaPerSpace = areaPerStall(layoutType, spaceWidth, spaceLength, aisleWidth);
  const areaUnit = unit === "feet" ? "sq ft" : "sq m";
  
  // Calculate estimated capacity (the epsilon keeps 5,400 / 270 from flooring to 19)
  const estimatedCapacity = Math.floor(area / areaPerSpace + 1e-9);
  
  // Calculate used and unused area
  const usedArea = estimatedCapacity * areaPerSpace;
  const unusedArea = area - usedArea;
  const efficiencyPercentage = (usedArea / area) * 100;
  
  // Add notes based on layout type
  notes.push(`Layout type: ${getLayoutTypeLabel(layoutType)}`);
  notes.push(`Space per vehicle: ${formatNumber(areaPerSpace, 1)} ${areaUnit} (stall + half the aisle)`);
  notes.push("Net capacity: entrances, landscaping and end-of-row losses usually cost another 10–25%");
  
  if (efficiencyPercentage > 90) {
    notes.push("✓ High space efficiency - good utilization");
  } else if (efficiencyPercentage > 75) {
    notes.push("✓ Good space efficiency");
  } else if (efficiencyPercentage > 60) {
    notes.push("⚠️ Moderate efficiency - consider layout optimization");
  } else {
    notes.push("⚠️ Low efficiency - area may be too small or irregular");
  }
  
  // Layout-specific recommendations
  if (layoutType === "perpendicular") {
    notes.push("90° parking provides maximum capacity but requires wider aisles");
  } else if (layoutType === "angled-60") {
    notes.push("60° angled parking offers good balance of capacity and traffic flow");
  } else if (layoutType === "angled-45") {
    notes.push("45° angled parking provides easiest maneuvering");
  } else if (layoutType === "parallel") {
    notes.push("Parallel parking uses most space per vehicle but works for narrow areas");
  }
  
  // Capacity recommendations
  if (estimatedCapacity < 10) {
    notes.push("Small parking area - suitable for residential or small business");
  } else if (estimatedCapacity < 50) {
    notes.push("Medium parking area - suitable for offices or retail");
  } else if (estimatedCapacity < 200) {
    notes.push("Large parking area - suitable for shopping centers or events");
  } else {
    notes.push("Very large parking area - consider multiple zones and circulation patterns");
  }
  
  return {
    inputMode,
    totalArea: area,
    unit,
    layoutType,
    spaceWidth,
    spaceLength,
    aisleWidth,
    estimatedCapacity,
    areaPerSpace,
    usedArea,
    unusedArea,
    efficiencyPercentage,
    timestamp: Date.now(),
    notes
  };
}

export function getLayoutPresets(): LayoutPreset[] {
  return [
    {
      name: "Standard 90° Parking",
      description: "Maximum capacity, perpendicular layout",
      layoutType: "perpendicular",
      spaceWidth: 8.5,
      spaceLength: 18,
      aisleWidth: 24,
      category: "Standard"
    },
    {
      name: "Compact 90° Parking",
      description: "Smaller spaces for compact cars",
      layoutType: "perpendicular",
      spaceWidth: 7.5,
      spaceLength: 16,
      aisleWidth: 22,
      category: "Compact"
    },
    {
      name: "60° Angled Parking",
      description: "Good balance of capacity and flow",
      layoutType: "angled-60",
      spaceWidth: 8.5,
      spaceLength: 18,
      aisleWidth: 18,
      category: "Angled"
    },
    {
      name: "45° Angled Parking",
      description: "Easy maneuvering, one-way traffic",
      layoutType: "angled-45",
      spaceWidth: 8.5,
      spaceLength: 18,
      aisleWidth: 13,
      category: "Angled"
    },
    {
      name: "Parallel Parking",
      description: "For narrow streets or limited space",
      layoutType: "parallel",
      spaceWidth: 8,
      spaceLength: 22,
      aisleWidth: 12,
      category: "Parallel"
    },
    {
      name: "Accessible Parking",
      description: "ADA compliant spaces",
      layoutType: "perpendicular",
      spaceWidth: 11,
      spaceLength: 18,
      aisleWidth: 24,
      category: "Accessible"
    }
  ];
}

export function getRecommendedAisleWidth(layoutType: LayoutType, unit: Unit = "feet"): number {
  const recommendations: Record<LayoutType, number> = {
    "perpendicular": 24,
    "angled-60": 18,
    "angled-45": 13,
    "parallel": 12
  };
  return Number(convertLength(recommendations[layoutType], "feet", unit).toFixed(2));
}

// History management
export function saveToHistory(calculation: ParkingSpaceCalculation): void {
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
export function exportToText(calculation: ParkingSpaceCalculation): string {
  const lines = [
    "PARKING SPACE CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Total Area: ${formatNumber(calculation.totalArea, 0)} ${calculation.unit === "feet" ? "sq ft" : "sq m"}`,
    `Layout Type: ${getLayoutTypeLabel(calculation.layoutType)}`,
    `Space Width: ${calculation.spaceWidth} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Space Length: ${calculation.spaceLength} ${calculation.unit === "feet" ? "ft" : "m"}`,
    `Aisle Width: ${calculation.aisleWidth} ${calculation.unit === "feet" ? "ft" : "m"}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Estimated Capacity: ${calculation.estimatedCapacity} vehicles`,
    `Area Per Space: ${formatNumber(calculation.areaPerSpace, 1)} ${calculation.unit === "feet" ? "sq ft" : "sq m"}`,
    `Used Area: ${formatNumber(calculation.usedArea, 0)} ${calculation.unit === "feet" ? "sq ft" : "sq m"}`,
    `Unused Area: ${formatNumber(calculation.unusedArea, 0)} ${calculation.unit === "feet" ? "sq ft" : "sq m"}`,
    `Efficiency: ${formatNumber(calculation.efficiencyPercentage, 1)}%`
  ];
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Parking Space Calculator");
  
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

export function getLayoutTypeLabel(type: LayoutType): string {
  const labels: Record<LayoutType, string> = {
    "perpendicular": "Perpendicular (90°)",
    "angled-60": "Angled (60°)",
    "angled-45": "Angled (45°)",
    "parallel": "Parallel"
  };
  return labels[type];
}

export function getInputModeLabel(mode: InputMode): string {
  const labels: Record<InputMode, string> = {
    "total-area": "Total Area",
    "dimensions": "Custom Dimensions"
  };
  return labels[mode];
}

export function validateInputs(
  inputMode: InputMode,
  totalArea: number | undefined,
  width: number | undefined,
  length: number | undefined,
  spaceWidth?: number,
  spaceLength?: number,
  aisleWidth?: number
): string | null {
  if (inputMode === "total-area") {
    if (!totalArea || totalArea <= 0) {
      return "Total area must be greater than 0";
    }
  } else if (inputMode === "dimensions") {
    if (!width || width <= 0) {
      return "Width must be greater than 0";
    }
    if (!length || length <= 0) {
      return "Length must be greater than 0";
    }
  }
  if (spaceWidth !== undefined && !(spaceWidth > 0)) return "Space width must be greater than 0";
  if (spaceLength !== undefined && !(spaceLength > 0)) return "Space length must be greater than 0";
  if (aisleWidth !== undefined && !(aisleWidth >= 0)) return "Aisle width cannot be negative";
  
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
