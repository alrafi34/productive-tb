import { TankShape, Unit, WaterTankInputs, WaterTankCalculation, WaterTankPreset, HistoryEntry } from "./types";

const HISTORY_KEY = "water-tank-capacity-calculator-history";
const MAX_HISTORY = 10;

// Conversion factors to meters
const UNIT_TO_METERS: Record<Unit, number> = {
  meters: 1,
  centimeters: 0.01,
  feet: 0.3048,
  inches: 0.0254
};

/**
 * Calculate water tank capacity
 */
export function calculateWaterTankCapacity(inputs: WaterTankInputs): WaterTankCalculation {
  const { shape, unit, length, width, height, radius, cylinderHeight } = inputs;
  
  // Convert all dimensions to meters
  const conversionFactor = UNIT_TO_METERS[unit];
  
  let volumeInCubicMeters = 0;
  const notes: string[] = [];
  
  if (shape === "rectangular") {
    const l = (length || 0) * conversionFactor;
    const w = (width || 0) * conversionFactor;
    const h = (height || 0) * conversionFactor;
    
    volumeInCubicMeters = l * w * h;
    notes.push(`Formula: Volume = Length × Width × Height`);
    notes.push(`Calculation: ${length} × ${width} × ${height} = ${volumeInCubicMeters.toFixed(3)} m³`);
  } else if (shape === "cylindrical-vertical" || shape === "cylindrical-horizontal") {
    const r = (radius || 0) * conversionFactor;
    const h = (cylinderHeight || 0) * conversionFactor;
    
    volumeInCubicMeters = Math.PI * r * r * h;
    notes.push(`Formula: Volume = π × r² × h`);
    notes.push(`Calculation: π × ${radius}² × ${cylinderHeight} = ${volumeInCubicMeters.toFixed(3)} m³`);
  }
  
  // Convert to other units
  const volumeInCubicFeet = volumeInCubicMeters * 35.3147;
  const capacityInLiters = volumeInCubicMeters * 1000;
  const capacityInGallons = capacityInLiters * 0.264172;
  
  // Add capacity-based notes
  if (capacityInLiters < 500) {
    notes.push("💧 Small tank - suitable for household backup or garden use");
  } else if (capacityInLiters < 2000) {
    notes.push("💧 Medium tank - good for residential water storage");
  } else if (capacityInLiters < 10000) {
    notes.push("💧 Large tank - suitable for multi-family or commercial use");
  } else {
    notes.push("💧 Very large tank - industrial or community water storage");
  }
  
  if (shape === "rectangular") {
    notes.push("📐 Rectangular tanks are easier to install in corners and against walls");
  } else {
    notes.push("🔵 Cylindrical tanks are structurally stronger and more efficient");
  }
  
  notes.push("🔧 Ensure proper foundation and support for the tank weight when full");
  notes.push("💡 Consider overflow protection and regular cleaning maintenance");
  
  return {
    shape,
    unit,
    length,
    width,
    height,
    radius,
    cylinderHeight,
    volumeInCubicMeters,
    volumeInCubicFeet,
    capacityInLiters,
    capacityInGallons,
    timestamp: Date.now(),
    notes
  };
}

export function getWaterTankPresets(): WaterTankPreset[] {
  return [
    {
      name: "Small Rectangular Tank",
      description: "1m × 1m × 1m (1000 liters)",
      shape: "rectangular",
      unit: "meters",
      length: 1,
      width: 1,
      height: 1,
      category: "Residential"
    },
    {
      name: "Medium Rectangular Tank",
      description: "2m × 1.5m × 1.5m (4500 liters)",
      shape: "rectangular",
      unit: "meters",
      length: 2,
      width: 1.5,
      height: 1.5,
      category: "Residential"
    },
    {
      name: "Large Rectangular Tank",
      description: "3m × 2m × 2m (12000 liters)",
      shape: "rectangular",
      unit: "meters",
      length: 3,
      width: 2,
      height: 2,
      category: "Commercial"
    },
    {
      name: "Small Cylindrical Tank",
      description: "0.5m radius × 1.5m height (1178 liters)",
      shape: "cylindrical-vertical",
      unit: "meters",
      radius: 0.5,
      cylinderHeight: 1.5,
      category: "Residential"
    },
    {
      name: "Medium Cylindrical Tank",
      description: "1m radius × 2m height (6283 liters)",
      shape: "cylindrical-vertical",
      unit: "meters",
      radius: 1,
      cylinderHeight: 2,
      category: "Residential"
    },
    {
      name: "Large Cylindrical Tank",
      description: "1.5m radius × 3m height (21206 liters)",
      shape: "cylindrical-vertical",
      unit: "meters",
      radius: 1.5,
      cylinderHeight: 3,
      category: "Commercial"
    }
  ];
}

export function getUnitLabel(unit: Unit): string {
  const labels: Record<Unit, string> = {
    meters: "m",
    centimeters: "cm",
    feet: "ft",
    inches: "in"
  };
  return labels[unit];
}

export function getShapeLabel(shape: TankShape): string {
  const labels: Record<TankShape, string> = {
    rectangular: "Rectangular",
    "cylindrical-vertical": "Cylindrical (Vertical)",
    "cylindrical-horizontal": "Cylindrical (Horizontal)"
  };
  return labels[shape];
}

// History management
export function saveToHistory(calculation: WaterTankCalculation): void {
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
export function exportToText(calculation: WaterTankCalculation): string {
  const unitLabel = getUnitLabel(calculation.unit);
  
  const lines = [
    "WATER TANK CAPACITY CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Tank Shape: ${getShapeLabel(calculation.shape)}`,
    `Unit: ${calculation.unit}`,
    "",
    "DIMENSIONS:",
    "-".repeat(50)
  ];
  
  if (calculation.shape === "rectangular") {
    lines.push(`Length: ${calculation.length} ${unitLabel}`);
    lines.push(`Width: ${calculation.width} ${unitLabel}`);
    lines.push(`Height: ${calculation.height} ${unitLabel}`);
  } else {
    lines.push(`Radius: ${calculation.radius} ${unitLabel}`);
    lines.push(`Height: ${calculation.cylinderHeight} ${unitLabel}`);
  }
  
  lines.push("");
  lines.push("CALCULATED RESULTS:");
  lines.push("-".repeat(50));
  lines.push(`Volume: ${formatNumber(calculation.volumeInCubicMeters, 3)} m³`);
  lines.push(`Volume: ${formatNumber(calculation.volumeInCubicFeet, 2)} ft³`);
  lines.push(`Capacity: ${formatNumber(calculation.capacityInLiters, 0)} liters`);
  lines.push(`Capacity: ${formatNumber(calculation.capacityInGallons, 0)} gallons`);
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Water Tank Capacity Calculator");
  
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
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validateInputs(shape: TankShape, length: number | undefined, width: number | undefined, height: number | undefined, radius: number | undefined, cylinderHeight: number | undefined): string | null {
  if (shape === "rectangular") {
    if (!length || length <= 0) {
      return "Length must be greater than 0";
    }
    if (!width || width <= 0) {
      return "Width must be greater than 0";
    }
    if (!height || height <= 0) {
      return "Height must be greater than 0";
    }
  } else {
    if (!radius || radius <= 0) {
      return "Radius must be greater than 0";
    }
    if (!cylinderHeight || cylinderHeight <= 0) {
      return "Height must be greater than 0";
    }
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
