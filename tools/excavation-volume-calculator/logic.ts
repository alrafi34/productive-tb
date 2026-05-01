import { ExcavationCalculation, ExcavationShape, Unit, HistoryEntry, ExcavationPreset } from "./types";

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Unit conversion constants
const METERS_TO_FEET = 3.28084;
const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;

// Validation
export function validateInputs(shape: ExcavationShape, length?: number, width?: number, depth?: number, radius?: number): string | null {
  if (shape === "rectangular" || shape === "trench") {
    if (!length || length <= 0) return "Length must be greater than zero";
    if (!width || width <= 0) return "Width must be greater than zero";
    if (!depth || depth <= 0) return "Depth must be greater than zero";
  } else if (shape === "circular") {
    if (!radius || radius <= 0) return "Radius must be greater than zero";
    if (!depth || depth <= 0) return "Depth must be greater than zero";
  }
  return null;
}

// Core calculation function
export function calculateExcavationVolume(
  shape: ExcavationShape,
  unit: Unit,
  length?: number,
  width?: number,
  depth?: number,
  radius?: number
): ExcavationCalculation {
  let volumeInSelectedUnit = 0;
  
  // Calculate volume based on shape
  if (shape === "rectangular" || shape === "trench") {
    if (length && width && depth) {
      volumeInSelectedUnit = length * width * depth;
    }
  } else if (shape === "circular") {
    if (radius && depth) {
      volumeInSelectedUnit = Math.PI * Math.pow(radius, 2) * depth;
    }
  }
  
  // Convert to cubic meters for standardization
  let volumeInCubicMeters: number;
  if (unit === "feet") {
    // Convert cubic feet to cubic meters
    volumeInCubicMeters = volumeInSelectedUnit / Math.pow(METERS_TO_FEET, 3);
  } else {
    volumeInCubicMeters = volumeInSelectedUnit;
  }
  
  // Calculate other unit conversions
  const volumeInCubicFeet = volumeInCubicMeters * Math.pow(METERS_TO_FEET, 3);
  const volumeInCubicYards = volumeInCubicMeters * CUBIC_METERS_TO_CUBIC_YARDS;

  return {
    id: generateId(),
    timestamp: Date.now(),
    shape,
    unit,
    length,
    width,
    depth: depth || 0,
    radius,
    volume: volumeInSelectedUnit,
    volumeInCubicMeters,
    volumeInCubicFeet,
    volumeInCubicYards
  };
}

// Format number
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

// Get shape label
export function getShapeLabel(shape: ExcavationShape): string {
  const labels = {
    rectangular: "Rectangular",
    trench: "Trench",
    circular: "Circular Pit"
  };
  return labels[shape];
}

// Get unit label
export function getUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m" : "ft";
}

export function getCubicUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m³" : "ft³";
}

// Get formula for shape
export function getFormula(shape: ExcavationShape): string {
  if (shape === "rectangular" || shape === "trench") {
    return "Volume = Length × Width × Depth";
  } else {
    return "Volume = π × Radius² × Depth";
  }
}

// Get excavation presets
export function getExcavationPresets(): ExcavationPreset[] {
  return [
    {
      name: "Small Foundation",
      description: "Typical house foundation",
      shape: "rectangular",
      length: 10,
      width: 8,
      depth: 1.5,
      unit: "meters",
      category: "Foundation"
    },
    {
      name: "Large Foundation",
      description: "Commercial building foundation",
      shape: "rectangular",
      length: 20,
      width: 15,
      depth: 2,
      unit: "meters",
      category: "Foundation"
    },
    {
      name: "Utility Trench",
      description: "Standard utility line trench",
      shape: "trench",
      length: 30,
      width: 0.6,
      depth: 1.2,
      unit: "meters",
      category: "Trench"
    },
    {
      name: "Drainage Trench",
      description: "Surface drainage trench",
      shape: "trench",
      length: 50,
      width: 0.8,
      depth: 1,
      unit: "meters",
      category: "Trench"
    },
    {
      name: "Small Pit",
      description: "Inspection or utility pit",
      shape: "circular",
      radius: 1.5,
      depth: 2,
      unit: "meters",
      category: "Pit"
    },
    {
      name: "Large Pit",
      description: "Tank or cistern excavation",
      shape: "circular",
      radius: 3,
      depth: 3,
      unit: "meters",
      category: "Pit"
    }
  ];
}

// History management
const STORAGE_KEY = "excavation-volume-calculator-history";

export function saveToHistory(calculation: ExcavationCalculation): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      calculation
    };
    
    history.unshift(entry);
    
    // Keep only last 10 entries
    const trimmedHistory = history.slice(0, 10);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear history:", error);
  }
}

// Export functions
export function exportToText(calculation: ExcavationCalculation): string {
  const unit = getUnitLabel(calculation.unit);
  const cubicUnit = getCubicUnitLabel(calculation.unit);
  
  const lines = [
    "EXCAVATION VOLUME CALCULATION REPORT",
    "=" + "=".repeat(40),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Calculation ID: ${calculation.id}`,
    "",
    "EXCAVATION PARAMETERS:",
    "-".repeat(45),
    `Shape: ${getShapeLabel(calculation.shape)}`,
    `Unit: ${calculation.unit}`,
  ];

  if (calculation.shape === "rectangular" || calculation.shape === "trench") {
    lines.push(
      `Length: ${formatNumber(calculation.length || 0, 2)} ${unit}`,
      `Width: ${formatNumber(calculation.width || 0, 2)} ${unit}`,
      `Depth: ${formatNumber(calculation.depth, 2)} ${unit}`
    );
  } else {
    lines.push(
      `Radius: ${formatNumber(calculation.radius || 0, 2)} ${unit}`,
      `Depth: ${formatNumber(calculation.depth, 2)} ${unit}`
    );
  }

  lines.push(
    "",
    "CALCULATION:",
    "-".repeat(45),
    `Formula: ${getFormula(calculation.shape)}`,
    "",
    "RESULTS:",
    "=".repeat(45),
    `Volume: ${formatNumber(calculation.volume, 2)} ${cubicUnit}`,
    "",
    "CONVERSIONS:",
    "-".repeat(45),
    `Cubic Meters: ${formatNumber(calculation.volumeInCubicMeters, 2)} m³`,
    `Cubic Feet: ${formatNumber(calculation.volumeInCubicFeet, 2)} ft³`,
    `Cubic Yards: ${formatNumber(calculation.volumeInCubicYards, 2)} yd³`,
    "",
    "Generated by Excavation Volume Calculator",
    `Report generated on ${new Date().toLocaleString()}`
  );

  return lines.join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string = "text/plain"): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Estimate truck loads (optional feature)
export function estimateTruckLoads(volumeInCubicMeters: number, truckCapacity: number = 10): number {
  return Math.ceil(volumeInCubicMeters / truckCapacity);
}

// Estimate excavation cost (optional feature)
export function estimateExcavationCost(volumeInCubicMeters: number, costPerCubicMeter: number = 15): number {
  return volumeInCubicMeters * costPerCubicMeter;
}