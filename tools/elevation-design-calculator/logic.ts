import { Unit, DesignMode, ElevationCalculation, HistoryEntry, PresetTemplate } from "./types";

const GOLDEN_RATIO = 1.618;
const IDEAL_RATIO_MIN = 1.5;
const IDEAL_RATIO_MAX = 1.8;

export function calculateElevation(
  width: number,
  height: number,
  floors: number,
  unit: Unit,
  designMode: DesignMode,
  customRatio: number
): ElevationCalculation {
  let calculatedHeight = height;
  let recommendedHeight: number | undefined;

  // Calculate based on design mode
  if (designMode === "golden-ratio") {
    recommendedHeight = width * GOLDEN_RATIO;
    calculatedHeight = recommendedHeight;
  } else if (designMode === "custom" && customRatio > 0) {
    recommendedHeight = width * customRatio;
    calculatedHeight = recommendedHeight;
  }

  const floorHeight = calculatedHeight / floors;
  const widthToHeightRatio = calculatedHeight / width;
  const isBalanced = widthToHeightRatio >= IDEAL_RATIO_MIN && widthToHeightRatio <= IDEAL_RATIO_MAX;

  return {
    width,
    height: calculatedHeight,
    floors,
    unit,
    designMode,
    customRatio,
    floorHeight,
    widthToHeightRatio,
    recommendedHeight,
    isBalanced,
    timestamp: Date.now()
  };
}

export function validateInputs(width: number, height: number, floors: number, customRatio: number, designMode: DesignMode): string | null {
  if (width <= 0) return "Width must be greater than 0";
  if (height <= 0) return "Height must be greater than 0";
  if (floors <= 0) return "Number of floors must be at least 1";
  if (designMode === "custom" && customRatio <= 0) return "Custom ratio must be greater than 0";
  return null;
}

export function getRecommendation(ratio: number): string {
  if (ratio < IDEAL_RATIO_MIN) {
    return "Building appears too wide. Consider increasing height for better proportions.";
  } else if (ratio > IDEAL_RATIO_MAX) {
    return "Building appears too tall. Consider increasing width or reducing height.";
  } else {
    return "Elevation proportions are well-balanced.";
  }
}

export function getPresetTemplates(): PresetTemplate[] {
  return [
    {
      name: "Small Residential",
      description: "2-story house",
      width: 30,
      height: 24,
      floors: 2,
      designMode: "standard",
      category: "Residential"
    },
    {
      name: "Medium Residential",
      description: "3-story building",
      width: 40,
      height: 36,
      floors: 3,
      designMode: "standard",
      category: "Residential"
    },
    {
      name: "Commercial Building",
      description: "4-story office",
      width: 60,
      height: 48,
      floors: 4,
      designMode: "standard",
      category: "Commercial"
    },
    {
      name: "Golden Ratio Design",
      description: "Aesthetically balanced",
      width: 40,
      height: 64.7,
      floors: 4,
      designMode: "golden-ratio",
      category: "Design"
    },
    {
      name: "High-Rise",
      description: "10-story building",
      width: 80,
      height: 120,
      floors: 10,
      designMode: "standard",
      category: "Commercial"
    },
    {
      name: "Low-Rise Commercial",
      description: "Single story retail",
      width: 50,
      height: 15,
      floors: 1,
      designMode: "standard",
      category: "Commercial"
    }
  ];
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getUnitLabel(unit: Unit): string {
  return unit === "feet" ? "ft" : "m";
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History Management
const HISTORY_KEY = "elevation-design-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: ElevationCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc-${Date.now()}`,
    timestamp: Date.now(),
    calculation
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Export Functions
export function exportToText(calculation: ElevationCalculation): string {
  const unit = getUnitLabel(calculation.unit);
  return `ELEVATION DESIGN CALCULATION
========================

Building Dimensions:
- Width: ${formatNumber(calculation.width, 2)} ${unit}
- Height: ${formatNumber(calculation.height, 2)} ${unit}
- Number of Floors: ${calculation.floors}

Calculated Values:
- Floor Height: ${formatNumber(calculation.floorHeight, 2)} ${unit}
- Width-to-Height Ratio: ${formatNumber(calculation.widthToHeightRatio, 3)}
- Design Mode: ${calculation.designMode}
${calculation.recommendedHeight ? `- Recommended Height: ${formatNumber(calculation.recommendedHeight, 2)} ${unit}` : ''}

Status: ${calculation.isBalanced ? 'Balanced ✓' : 'Needs Adjustment'}
Recommendation: ${getRecommendation(calculation.widthToHeightRatio)}

Generated: ${new Date(calculation.timestamp).toLocaleString()}
`;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
