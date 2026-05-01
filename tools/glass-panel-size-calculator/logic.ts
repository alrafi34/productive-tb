import { Unit, FrameType, Clearances, GlassCalculation, HistoryEntry, FramePreset } from "./types";

const HISTORY_KEY = "glass-panel-size-calculator-history";
const MAX_HISTORY = 10;

// Conversion factors
const MM_TO_CM = 0.1;
const MM_TO_INCH = 0.0393701;
const CM_TO_MM = 10;
const INCH_TO_MM = 25.4;

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convert value to mm (base unit)
 */
export function convertToMM(value: number, fromUnit: Unit): number {
  switch (fromUnit) {
    case "mm":
      return value;
    case "cm":
      return value * CM_TO_MM;
    case "inch":
      return value * INCH_TO_MM;
    default:
      return value;
  }
}

/**
 * Convert value from mm to target unit
 */
export function convertFromMM(value: number, toUnit: Unit): number {
  switch (toUnit) {
    case "mm":
      return value;
    case "cm":
      return value * MM_TO_CM;
    case "inch":
      return value * MM_TO_INCH;
    default:
      return value;
  }
}

/**
 * Calculate glass panel dimensions
 */
export function calculateGlassPanelSize(
  openingWidth: number,
  openingHeight: number,
  clearances: Clearances,
  panelCount: number,
  gapBetweenPanels: number,
  unit: Unit,
  frameType: FrameType
): GlassCalculation {
  // Calculate glass height
  const glassHeight = openingHeight - (clearances.top + clearances.bottom);
  
  // Calculate available width
  const availableWidth = openingWidth - (clearances.left + clearances.right);
  
  // Calculate total gap width
  const totalGapWidth = panelCount > 1 ? (panelCount - 1) * gapBetweenPanels : 0;
  
  // Calculate panel width
  const panelWidth = panelCount > 0 ? (availableWidth - totalGapWidth) / panelCount : 0;
  
  // Calculate total glass area (all panels combined)
  const totalGlassArea = panelWidth * glassHeight * panelCount;
  
  return {
    openingWidth,
    openingHeight,
    clearances,
    panelCount,
    gapBetweenPanels,
    unit,
    frameType,
    panelWidth,
    glassHeight,
    totalGlassArea,
    availableWidth,
    totalGapWidth,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(
  openingWidth: number,
  openingHeight: number,
  clearances: Clearances,
  panelCount: number,
  gapBetweenPanels: number
): string | null {
  if (openingWidth <= 0) {
    return "Opening width must be greater than 0";
  }
  if (openingHeight <= 0) {
    return "Opening height must be greater than 0";
  }
  if (panelCount <= 0) {
    return "Panel count must be at least 1";
  }
  if (clearances.left < 0 || clearances.right < 0 || clearances.top < 0 || clearances.bottom < 0) {
    return "Clearances cannot be negative";
  }
  if (gapBetweenPanels < 0) {
    return "Gap between panels cannot be negative";
  }
  
  // Check if clearances are too large
  const totalHorizontalClearance = clearances.left + clearances.right;
  const totalVerticalClearance = clearances.top + clearances.bottom;
  
  if (totalHorizontalClearance >= openingWidth) {
    return "Total horizontal clearance exceeds opening width";
  }
  if (totalVerticalClearance >= openingHeight) {
    return "Total vertical clearance exceeds opening height";
  }
  
  // Check if panel width would be too small
  const availableWidth = openingWidth - totalHorizontalClearance;
  const totalGapWidth = panelCount > 1 ? (panelCount - 1) * gapBetweenPanels : 0;
  const panelWidth = (availableWidth - totalGapWidth) / panelCount;
  
  if (panelWidth <= 0) {
    return "Panel width is too small. Reduce panel count or gaps.";
  }
  
  return null;
}

/**
 * Get warning message for small panels
 */
export function getWarningMessage(panelWidth: number, unit: Unit): string | null {
  // Convert to mm for comparison
  const widthInMM = convertToMM(panelWidth, unit);
  
  if (widthInMM < 100) {
    return "⚠️ Panel width is very small. Consider reducing panel count.";
  }
  if (widthInMM < 200) {
    return "⚠️ Panel width is small. Verify this is suitable for installation.";
  }
  
  return null;
}

/**
 * Get frame presets
 */
export function getFramePresets(): FramePreset[] {
  return [
    {
      name: "Frameless",
      type: "frameless",
      description: "Minimal clearance for frameless installation",
      clearances: { left: 2, right: 2, top: 2, bottom: 2 }
    },
    {
      name: "Aluminum Frame",
      type: "aluminum",
      description: "Standard aluminum frame clearance",
      clearances: { left: 5, right: 5, top: 5, bottom: 5 }
    },
    {
      name: "Sliding System",
      type: "sliding",
      description: "Sliding door/window system clearance",
      clearances: { left: 10, right: 10, top: 10, bottom: 10 }
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
  switch (unit) {
    case "mm":
      return "mm";
    case "cm":
      return "cm";
    case "inch":
      return "in";
    default:
      return unit;
  }
}

/**
 * Get area unit label
 */
export function getAreaUnitLabel(unit: Unit): string {
  switch (unit) {
    case "mm":
      return "mm²";
    case "cm":
      return "cm²";
    case "inch":
      return "in²";
    default:
      return unit + "²";
  }
}

/**
 * Export to text
 */
export function exportToText(calculation: GlassCalculation): string {
  const unitLabel = getUnitLabel(calculation.unit);
  const areaLabel = getAreaUnitLabel(calculation.unit);
  
  const lines: string[] = [
    "GLASS PANEL SIZE CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Unit: ${calculation.unit}`,
    `Frame Type: ${calculation.frameType}`,
    "",
    "OPENING DIMENSIONS:",
    "-".repeat(50),
    `Opening Width: ${formatNumber(calculation.openingWidth, 2)} ${unitLabel}`,
    `Opening Height: ${formatNumber(calculation.openingHeight, 2)} ${unitLabel}`,
    "",
    "CLEARANCES:",
    "-".repeat(50),
    `Left: ${formatNumber(calculation.clearances.left, 2)} ${unitLabel}`,
    `Right: ${formatNumber(calculation.clearances.right, 2)} ${unitLabel}`,
    `Top: ${formatNumber(calculation.clearances.top, 2)} ${unitLabel}`,
    `Bottom: ${formatNumber(calculation.clearances.bottom, 2)} ${unitLabel}`,
    "",
    "PANEL CONFIGURATION:",
    "-".repeat(50),
    `Number of Panels: ${calculation.panelCount}`,
    `Gap Between Panels: ${formatNumber(calculation.gapBetweenPanels, 2)} ${unitLabel}`,
    "",
    "CALCULATED DIMENSIONS:",
    "-".repeat(50),
    `Panel Width: ${formatNumber(calculation.panelWidth, 2)} ${unitLabel}`,
    `Glass Height: ${formatNumber(calculation.glassHeight, 2)} ${unitLabel}`,
    `Total Glass Area: ${formatNumber(calculation.totalGlassArea, 2)} ${areaLabel}`,
    "",
    "ADDITIONAL INFO:",
    "-".repeat(50),
    `Available Width: ${formatNumber(calculation.availableWidth, 2)} ${unitLabel}`,
    `Total Gap Width: ${formatNumber(calculation.totalGapWidth, 2)} ${unitLabel}`,
    "",
    "=".repeat(50),
    "Generated by Glass Panel Size Calculator"
  ];
  
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
export function saveToHistory(calculation: GlassCalculation): void {
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
