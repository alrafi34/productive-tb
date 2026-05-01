import { Unit, WallInput, PanelSize, CladdingCalculation, HistoryEntry, PresetTemplate } from "./types";

const HISTORY_KEY = "cladding-material-calculator-history";
const MAX_HISTORY = 10;

// Conversion factors
const FT_TO_M = 0.3048;
const M_TO_FT = 3.28084;

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create new wall input
 */
export function createWallInput(width: number = 0, height: number = 0): WallInput {
  return {
    id: generateId(),
    width,
    height
  };
}

/**
 * Calculate total wall area
 */
export function calculateTotalWallArea(walls: WallInput[]): number {
  return walls.reduce((sum, wall) => sum + (wall.width * wall.height), 0);
}

/**
 * Calculate panel area
 */
export function calculatePanelArea(panelSize: PanelSize): number {
  return panelSize.width * panelSize.height;
}

/**
 * Calculate cladding materials
 */
export function calculateCladdingMaterials(
  walls: WallInput[],
  panelSize: PanelSize,
  unit: Unit,
  wastagePercentage: number,
  costPerPanel: number = 0
): CladdingCalculation {
  const totalWallArea = calculateTotalWallArea(walls);
  const panelArea = calculatePanelArea(panelSize);
  
  // Prevent division by zero
  if (panelArea === 0) {
    return {
      walls,
      panelSize,
      unit,
      wastagePercentage,
      costPerPanel,
      totalWallArea,
      panelArea: 0,
      basePanelsRequired: 0,
      wastageQuantity: 0,
      totalPanelsRequired: 0,
      totalCost: 0,
      timestamp: Date.now()
    };
  }
  
  const basePanelsRequired = totalWallArea / panelArea;
  const wastageQuantity = basePanelsRequired * (wastagePercentage / 100);
  const totalPanelsRequired = Math.ceil(basePanelsRequired + wastageQuantity);
  const totalCost = totalPanelsRequired * costPerPanel;
  
  return {
    walls,
    panelSize,
    unit,
    wastagePercentage,
    costPerPanel,
    totalWallArea,
    panelArea,
    basePanelsRequired,
    wastageQuantity,
    totalPanelsRequired,
    totalCost,
    timestamp: Date.now()
  };
}

/**
 * Convert area between units
 */
export function convertArea(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === "feet" && toUnit === "meters") {
    return value * FT_TO_M * FT_TO_M;
  } else if (fromUnit === "meters" && toUnit === "feet") {
    return value * M_TO_FT * M_TO_FT;
  }
  
  return value;
}

/**
 * Convert linear measurement between units
 */
export function convertLinear(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === "feet" && toUnit === "meters") {
    return value * FT_TO_M;
  } else if (fromUnit === "meters" && toUnit === "feet") {
    return value * M_TO_FT;
  }
  
  return value;
}

/**
 * Validate wall input
 */
export function validateWallInput(wall: WallInput): string | null {
  if (wall.width <= 0) {
    return "Width must be greater than 0";
  }
  if (wall.height <= 0) {
    return "Height must be greater than 0";
  }
  return null;
}

/**
 * Validate panel size
 */
export function validatePanelSize(panelSize: PanelSize): string | null {
  if (panelSize.width <= 0) {
    return "Panel width must be greater than 0";
  }
  if (panelSize.height <= 0) {
    return "Panel height must be greater than 0";
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
  return unit === "feet" ? "ft²" : "m²";
}

/**
 * Get linear unit label
 */
export function getLinearUnitLabel(unit: Unit): string {
  return unit === "feet" ? "ft" : "m";
}

/**
 * Get preset templates
 */
export function getPresetTemplates(): PresetTemplate[] {
  return [
    {
      name: "Standard Vinyl Siding",
      description: "12\" × 144\" panels",
      panelWidth: 1,
      panelHeight: 12,
      wastage: 10,
      category: "Residential"
    },
    {
      name: "Fiber Cement Board",
      description: "4' × 8' sheets",
      panelWidth: 4,
      panelHeight: 8,
      wastage: 15,
      category: "Residential"
    },
    {
      name: "Metal Panel",
      description: "3' × 10' panels",
      panelWidth: 3,
      panelHeight: 10,
      wastage: 8,
      category: "Commercial"
    },
    {
      name: "Wood Siding",
      description: "6\" × 96\" boards",
      panelWidth: 0.5,
      panelHeight: 8,
      wastage: 12,
      category: "Residential"
    },
    {
      name: "Composite Panel",
      description: "4' × 10' sheets",
      panelWidth: 4,
      panelHeight: 10,
      wastage: 10,
      category: "Commercial"
    },
    {
      name: "Stone Veneer",
      description: "2' × 4' panels",
      panelWidth: 2,
      panelHeight: 4,
      wastage: 15,
      category: "Premium"
    }
  ];
}

/**
 * Export to CSV
 */
export function exportToCSV(calculation: CladdingCalculation): string {
  const lines: string[] = [];
  
  // Header
  lines.push("CLADDING MATERIAL CALCULATION");
  lines.push(`Date: ${new Date(calculation.timestamp).toLocaleString()}`);
  lines.push(`Unit: ${calculation.unit}`);
  lines.push("");
  
  // Wall sections
  lines.push("WALL SECTIONS");
  lines.push("Wall #,Width,Height,Area");
  calculation.walls.forEach((wall, index) => {
    const area = wall.width * wall.height;
    lines.push(`${index + 1},${wall.width},${wall.height},${formatNumber(area, 2)}`);
  });
  lines.push(`Total Wall Area:,${formatNumber(calculation.totalWallArea, 2)}`);
  lines.push("");
  
  // Panel info
  lines.push("PANEL INFORMATION");
  lines.push(`Panel Width,${calculation.panelSize.width} ${getLinearUnitLabel(calculation.unit)}`);
  lines.push(`Panel Height,${calculation.panelSize.height} ${getLinearUnitLabel(calculation.unit)}`);
  lines.push(`Panel Area,${formatNumber(calculation.panelArea, 2)} ${getUnitLabel(calculation.unit)}`);
  lines.push("");
  
  // Calculation
  lines.push("MATERIAL CALCULATION");
  lines.push(`Base Panels Required,${formatNumber(calculation.basePanelsRequired, 2)}`);
  lines.push(`Wastage (${calculation.wastagePercentage}%),${formatNumber(calculation.wastageQuantity, 2)}`);
  lines.push(`Total Panels Required,${calculation.totalPanelsRequired}`);
  
  if (calculation.costPerPanel > 0) {
    lines.push("");
    lines.push("COST ESTIMATION");
    lines.push(`Cost per Panel,$${formatNumber(calculation.costPerPanel, 2)}`);
    lines.push(`Total Cost,$${formatNumber(calculation.totalCost, 2)}`);
  }
  
  return lines.join("\n");
}

/**
 * Export to text
 */
export function exportToText(calculation: CladdingCalculation): string {
  const unitLabel = getUnitLabel(calculation.unit);
  const linearUnit = getLinearUnitLabel(calculation.unit);
  
  const lines: string[] = [
    "CLADDING MATERIAL CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Unit: ${calculation.unit}`,
    "",
    "WALL SECTIONS:",
    "-".repeat(50)
  ];
  
  calculation.walls.forEach((wall, index) => {
    const area = wall.width * wall.height;
    lines.push(`Wall ${index + 1}: ${wall.width} ${linearUnit} × ${wall.height} ${linearUnit} = ${formatNumber(area, 2)} ${unitLabel}`);
  });
  
  lines.push("");
  lines.push(`Total Wall Area: ${formatNumber(calculation.totalWallArea, 2)} ${unitLabel}`);
  
  lines.push("");
  lines.push("PANEL INFORMATION:");
  lines.push("-".repeat(50));
  lines.push(`Panel Size: ${calculation.panelSize.width} ${linearUnit} × ${calculation.panelSize.height} ${linearUnit}`);
  lines.push(`Panel Area: ${formatNumber(calculation.panelArea, 2)} ${unitLabel}`);
  
  lines.push("");
  lines.push("MATERIAL CALCULATION:");
  lines.push("-".repeat(50));
  lines.push(`Base Panels Required: ${formatNumber(calculation.basePanelsRequired, 2)}`);
  lines.push(`Wastage (${calculation.wastagePercentage}%): ${formatNumber(calculation.wastageQuantity, 2)} panels`);
  lines.push(`Total Panels Required: ${calculation.totalPanelsRequired} panels`);
  
  if (calculation.costPerPanel > 0) {
    lines.push("");
    lines.push("COST ESTIMATION:");
    lines.push("-".repeat(50));
    lines.push(`Cost per Panel: $${formatNumber(calculation.costPerPanel, 2)}`);
    lines.push(`Total Cost: $${formatNumber(calculation.totalCost, 2)}`);
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Cladding Material Calculator");
  
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
export function saveToHistory(calculation: CladdingCalculation): void {
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
