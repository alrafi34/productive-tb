import { Unit, WallSection, Opening, FacadeCalculation, HistoryEntry } from "./types";

const HISTORY_KEY = "facade-area-calculator-history";
const MAX_HISTORY = 10;

// Conversion factors
const SQM_TO_SQFT = 10.7639;
const SQFT_TO_SQM = 0.092903;

/**
 * Calculate total wall area
 */
export function calculateTotalWallArea(walls: WallSection[]): number {
  return walls.reduce((sum, wall) => {
    return sum + (wall.width * wall.height);
  }, 0);
}

/**
 * Calculate total openings area
 */
export function calculateTotalOpeningsArea(openings: Opening[]): number {
  return openings.reduce((sum, opening) => {
    return sum + (opening.width * opening.height * opening.quantity);
  }, 0);
}

/**
 * Calculate facade area
 */
export function calculateFacadeArea(
  wallSections: WallSection[],
  openings: Opening[],
  unit: Unit
): FacadeCalculation {
  const totalWallArea = calculateTotalWallArea(wallSections);
  const totalOpeningsArea = calculateTotalOpeningsArea(openings);
  const netArea = Math.max(0, totalWallArea - totalOpeningsArea);
  
  return {
    wallSections,
    openings,
    unit,
    totalWallArea,
    totalOpeningsArea,
    netArea,
    timestamp: Date.now()
  };
}

/**
 * Convert area between units
 */
export function convertArea(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === "meters" && toUnit === "feet") {
    return value * SQM_TO_SQFT;
  } else if (fromUnit === "feet" && toUnit === "meters") {
    return value * SQFT_TO_SQM;
  }
  
  return value;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create new wall section
 */
export function createWallSection(width: number = 0, height: number = 0): WallSection {
  return {
    id: generateId(),
    width,
    height
  };
}

/**
 * Create new opening
 */
export function createOpening(width: number = 0, height: number = 0, quantity: number = 1): Opening {
  return {
    id: generateId(),
    width,
    height,
    quantity
  };
}

/**
 * Validate wall section
 */
export function validateWallSection(wall: WallSection): string | null {
  if (wall.width <= 0) {
    return "Width must be greater than 0";
  }
  if (wall.height <= 0) {
    return "Height must be greater than 0";
  }
  return null;
}

/**
 * Validate opening
 */
export function validateOpening(opening: Opening): string | null {
  if (opening.width <= 0) {
    return "Opening width must be greater than 0";
  }
  if (opening.height <= 0) {
    return "Opening height must be greater than 0";
  }
  if (opening.quantity <= 0) {
    return "Quantity must be at least 1";
  }
  return null;
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
  return unit === "meters" ? "m²" : "ft²";
}

/**
 * Get linear unit label
 */
export function getLinearUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m" : "ft";
}

/**
 * Export to CSV
 */
export function exportToCSV(calculation: FacadeCalculation): string {
  const lines: string[] = [];
  
  // Header
  lines.push("FACADE AREA CALCULATION");
  lines.push(`Date: ${new Date(calculation.timestamp).toLocaleString()}`);
  lines.push(`Unit: ${calculation.unit}`);
  lines.push("");
  
  // Wall sections
  lines.push("WALL SECTIONS");
  lines.push("Width,Height,Area");
  calculation.wallSections.forEach((wall, index) => {
    const area = wall.width * wall.height;
    lines.push(`${wall.width},${wall.height},${formatNumber(area, 2)}`);
  });
  lines.push(`Total Wall Area:,${formatNumber(calculation.totalWallArea, 2)}`);
  lines.push("");
  
  // Openings
  if (calculation.openings.length > 0) {
    lines.push("OPENINGS");
    lines.push("Width,Height,Quantity,Area");
    calculation.openings.forEach((opening) => {
      const area = opening.width * opening.height * opening.quantity;
      lines.push(`${opening.width},${opening.height},${opening.quantity},${formatNumber(area, 2)}`);
    });
    lines.push(`Total Openings Area:,${formatNumber(calculation.totalOpeningsArea, 2)}`);
    lines.push("");
  }
  
  // Summary
  lines.push("SUMMARY");
  lines.push(`Total Wall Area,${formatNumber(calculation.totalWallArea, 2)} ${getUnitLabel(calculation.unit)}`);
  lines.push(`Total Openings,${formatNumber(calculation.totalOpeningsArea, 2)} ${getUnitLabel(calculation.unit)}`);
  lines.push(`Net Facade Area,${formatNumber(calculation.netArea, 2)} ${getUnitLabel(calculation.unit)}`);
  
  return lines.join("\n");
}

/**
 * Export to text
 */
export function exportToText(calculation: FacadeCalculation): string {
  const unitLabel = getUnitLabel(calculation.unit);
  const linearUnit = getLinearUnitLabel(calculation.unit);
  
  const lines: string[] = [
    "FACADE AREA CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Unit: ${calculation.unit}`,
    "",
    "WALL SECTIONS:",
    "-".repeat(50)
  ];
  
  calculation.wallSections.forEach((wall, index) => {
    const area = wall.width * wall.height;
    lines.push(`Wall ${index + 1}: ${wall.width} ${linearUnit} × ${wall.height} ${linearUnit} = ${formatNumber(area, 2)} ${unitLabel}`);
  });
  
  lines.push("");
  lines.push(`Total Wall Area: ${formatNumber(calculation.totalWallArea, 2)} ${unitLabel}`);
  
  if (calculation.openings.length > 0) {
    lines.push("");
    lines.push("OPENINGS:");
    lines.push("-".repeat(50));
    
    calculation.openings.forEach((opening, index) => {
      const area = opening.width * opening.height * opening.quantity;
      lines.push(`Opening ${index + 1}: ${opening.width} ${linearUnit} × ${opening.height} ${linearUnit} × ${opening.quantity} = ${formatNumber(area, 2)} ${unitLabel}`);
    });
    
    lines.push("");
    lines.push(`Total Openings Area: ${formatNumber(calculation.totalOpeningsArea, 2)} ${unitLabel}`);
  }
  
  lines.push("");
  lines.push("SUMMARY:");
  lines.push("-".repeat(50));
  lines.push(`Net Facade Area: ${formatNumber(calculation.netArea, 2)} ${unitLabel}`);
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Facade Area Calculator");
  
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
export function saveToHistory(calculation: FacadeCalculation): void {
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
