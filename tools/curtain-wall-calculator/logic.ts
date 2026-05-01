import { Unit, CurtainWallCalculation, HistoryEntry, PresetTemplate } from "./types";

const HISTORY_KEY = "curtain-wall-calculator-history";
const MAX_HISTORY = 10;

// Conversion factors
const M_TO_FT = 3.28084;
const FT_TO_M = 0.3048;

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convert value between units
 */
export function convertLength(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === "meters" && toUnit === "feet") {
    return value * M_TO_FT;
  } else if (fromUnit === "feet" && toUnit === "meters") {
    return value * FT_TO_M;
  }
  
  return value;
}

/**
 * Convert area between units
 */
export function convertArea(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === "meters" && toUnit === "feet") {
    return value * M_TO_FT * M_TO_FT;
  } else if (fromUnit === "feet" && toUnit === "meters") {
    return value * FT_TO_M * FT_TO_M;
  }
  
  return value;
}

/**
 * Calculate curtain wall dimensions
 */
export function calculateCurtainWall(
  width: number,
  height: number,
  panelWidth: number,
  panelHeight: number,
  glassRatio: number,
  frameThickness: number,
  unit: Unit
): CurtainWallCalculation {
  // Calculate total area
  const totalArea = width * height;
  
  // Calculate panel area
  const panelArea = panelWidth * panelHeight;
  
  // Calculate panel count (rounded up)
  const panelCount = panelArea > 0 ? Math.ceil(totalArea / panelArea) : 0;
  
  // Calculate panels wide and high
  const panelsWide = panelWidth > 0 ? Math.ceil(width / panelWidth) : 0;
  const panelsHigh = panelHeight > 0 ? Math.ceil(height / panelHeight) : 0;
  
  // Calculate glass and frame areas
  const glassArea = totalArea * (glassRatio / 100);
  const frameArea = totalArea - glassArea;
  
  return {
    width,
    height,
    panelWidth,
    panelHeight,
    glassRatio,
    frameThickness,
    unit,
    totalArea,
    panelArea,
    panelCount,
    glassArea,
    frameArea,
    panelsWide,
    panelsHigh,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(
  width: number,
  height: number,
  panelWidth: number,
  panelHeight: number,
  glassRatio: number
): string | null {
  if (width <= 0) {
    return "Width must be greater than 0";
  }
  if (height <= 0) {
    return "Height must be greater than 0";
  }
  if (panelWidth <= 0) {
    return "Panel width must be greater than 0";
  }
  if (panelHeight <= 0) {
    return "Panel height must be greater than 0";
  }
  if (glassRatio < 0 || glassRatio > 100) {
    return "Glass ratio must be between 0 and 100";
  }
  
  return null;
}

/**
 * Get preset templates
 */
export function getPresetTemplates(): PresetTemplate[] {
  return [
    {
      name: "Small Building",
      description: "Typical small commercial building",
      width: 10,
      height: 10,
      panelWidth: 1.5,
      panelHeight: 1.5,
      glassRatio: 80,
      category: "Commercial"
    },
    {
      name: "Mid-Rise Office",
      description: "Standard office building facade",
      width: 20,
      height: 15,
      panelWidth: 1.2,
      panelHeight: 1.8,
      glassRatio: 85,
      category: "Commercial"
    },
    {
      name: "Tower Facade",
      description: "High-rise tower curtain wall",
      width: 30,
      height: 40,
      panelWidth: 1.5,
      panelHeight: 2.0,
      glassRatio: 90,
      category: "High-Rise"
    },
    {
      name: "Retail Storefront",
      description: "Ground floor retail facade",
      width: 15,
      height: 4,
      panelWidth: 2.0,
      panelHeight: 2.0,
      glassRatio: 95,
      category: "Retail"
    },
    {
      name: "Residential Tower",
      description: "Residential high-rise facade",
      width: 25,
      height: 50,
      panelWidth: 1.2,
      panelHeight: 1.5,
      glassRatio: 75,
      category: "Residential"
    },
    {
      name: "Atrium Wall",
      description: "Interior atrium curtain wall",
      width: 12,
      height: 20,
      panelWidth: 1.5,
      panelHeight: 2.5,
      glassRatio: 100,
      category: "Interior"
    }
  ];
}

/**
 * Format number
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Get unit label
 */
export function getUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m" : "ft";
}

/**
 * Get area unit label
 */
export function getAreaUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m²" : "ft²";
}

/**
 * Export to CSV
 */
export function exportToCSV(calculation: CurtainWallCalculation): string {
  const lines: string[] = [];
  
  // Header
  lines.push("CURTAIN WALL CALCULATION");
  lines.push(`Date: ${new Date(calculation.timestamp).toLocaleString()}`);
  lines.push(`Unit: ${calculation.unit}`);
  lines.push("");
  
  // Dimensions
  lines.push("DIMENSIONS");
  lines.push(`Width,${calculation.width} ${getUnitLabel(calculation.unit)}`);
  lines.push(`Height,${calculation.height} ${getUnitLabel(calculation.unit)}`);
  lines.push(`Total Area,${formatNumber(calculation.totalArea, 2)} ${getAreaUnitLabel(calculation.unit)}`);
  lines.push("");
  
  // Panel Info
  lines.push("PANEL INFORMATION");
  lines.push(`Panel Width,${calculation.panelWidth} ${getUnitLabel(calculation.unit)}`);
  lines.push(`Panel Height,${calculation.panelHeight} ${getUnitLabel(calculation.unit)}`);
  lines.push(`Panel Area,${formatNumber(calculation.panelArea, 2)} ${getAreaUnitLabel(calculation.unit)}`);
  lines.push(`Panels Required,${calculation.panelCount}`);
  lines.push(`Panels Wide,${calculation.panelsWide}`);
  lines.push(`Panels High,${calculation.panelsHigh}`);
  lines.push("");
  
  // Material Breakdown
  lines.push("MATERIAL BREAKDOWN");
  lines.push(`Glass Ratio,${calculation.glassRatio}%`);
  lines.push(`Glass Area,${formatNumber(calculation.glassArea, 2)} ${getAreaUnitLabel(calculation.unit)}`);
  lines.push(`Frame Area,${formatNumber(calculation.frameArea, 2)} ${getAreaUnitLabel(calculation.unit)}`);
  
  if (calculation.frameThickness > 0) {
    lines.push(`Frame Thickness,${calculation.frameThickness} mm`);
  }
  
  return lines.join("\n");
}

/**
 * Export to text
 */
export function exportToText(calculation: CurtainWallCalculation): string {
  const unitLabel = getUnitLabel(calculation.unit);
  const areaLabel = getAreaUnitLabel(calculation.unit);
  
  const lines: string[] = [
    "CURTAIN WALL CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Unit: ${calculation.unit}`,
    "",
    "CURTAIN WALL DIMENSIONS:",
    "-".repeat(50),
    `Width: ${formatNumber(calculation.width, 2)} ${unitLabel}`,
    `Height: ${formatNumber(calculation.height, 2)} ${unitLabel}`,
    `Total Area: ${formatNumber(calculation.totalArea, 2)} ${areaLabel}`,
    "",
    "PANEL CONFIGURATION:",
    "-".repeat(50),
    `Panel Size: ${formatNumber(calculation.panelWidth, 2)} ${unitLabel} × ${formatNumber(calculation.panelHeight, 2)} ${unitLabel}`,
    `Panel Area: ${formatNumber(calculation.panelArea, 2)} ${areaLabel}`,
    `Panels Required: ${calculation.panelCount}`,
    `Layout: ${calculation.panelsWide} wide × ${calculation.panelsHigh} high`,
    "",
    "MATERIAL BREAKDOWN:",
    "-".repeat(50),
    `Glass Ratio: ${calculation.glassRatio}%`,
    `Glass Area: ${formatNumber(calculation.glassArea, 2)} ${areaLabel}`,
    `Frame Area: ${formatNumber(calculation.frameArea, 2)} ${areaLabel}`
  ];
  
  if (calculation.frameThickness > 0) {
    lines.push(`Frame Thickness: ${calculation.frameThickness} mm`);
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Curtain Wall Calculator");
  
  return lines.join("\n");
}

/**
 * Download file
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
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

// History management
export function saveToHistory(calculation: CurtainWallCalculation): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: generateId(),
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

/**
 * Debounce function
 */
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
