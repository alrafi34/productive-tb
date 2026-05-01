import { DoorCalculation, HistoryEntry, DoorPreset, Unit } from "./types";

const HISTORY_KEY = "door-area-calculator-history";
const MAX_HISTORY = 10;

// Unit conversion to meters
export function convertToMeters(value: number, unit: Unit): number {
  switch (unit) {
    case "ft": return value * 0.3048;
    case "cm": return value * 0.01;
    case "inches": return value * 0.0254;
    case "m": return value;
    default: return value;
  }
}

// Convert from meters to target unit
export function convertFromMeters(value: number, unit: Unit): number {
  switch (unit) {
    case "ft": return value / 0.3048;
    case "cm": return value / 0.01;
    case "inches": return value / 0.0254;
    case "m": return value;
    default: return value;
  }
}

export function calculateDoorArea(
  height: number,
  width: number,
  unit: Unit,
  includeFrame: boolean = false,
  frameThickness: number = 0
): DoorCalculation {
  let finalHeight = height;
  let finalWidth = width;
  
  // Add frame thickness if included
  if (includeFrame && frameThickness > 0) {
    finalHeight = height + (frameThickness * 2);
    finalWidth = width + (frameThickness * 2);
  }
  
  // Calculate area
  const area = finalHeight * finalWidth;
  
  return {
    height: finalHeight,
    width: finalWidth,
    unit,
    area,
    includeFrame,
    frameThickness: includeFrame ? frameThickness : undefined,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getUnitLabel(unit: Unit): string {
  switch (unit) {
    case "ft": return "ft²";
    case "m": return "m²";
    case "cm": return "cm²";
    case "inches": return "in²";
    default: return unit;
  }
}

export function getUnitDisplayName(unit: Unit): string {
  switch (unit) {
    case "ft": return "Feet";
    case "m": return "Meters";
    case "cm": return "Centimeters";
    case "inches": return "Inches";
    default: return unit;
  }
}

export function getDoorPresets(): DoorPreset[] {
  return [
    {
      name: "Standard Interior Door",
      description: "Common residential door",
      height: 6.67,
      width: 2.67,
      unit: "ft"
    },
    {
      name: "Standard Exterior Door",
      description: "Main entry door",
      height: 7,
      width: 3,
      unit: "ft"
    },
    {
      name: "Double Door",
      description: "Wide entry or patio",
      height: 7,
      width: 6,
      unit: "ft"
    },
    {
      name: "Closet Door",
      description: "Standard closet",
      height: 6.67,
      width: 2,
      unit: "ft"
    },
    {
      name: "Commercial Door",
      description: "Office or retail",
      height: 7,
      width: 3.5,
      unit: "ft"
    },
    {
      name: "Garage Door (Single)",
      description: "Single car garage",
      height: 7,
      width: 9,
      unit: "ft"
    }
  ];
}

// History management
export function saveToHistory(calculation: DoorCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    calculation,
    timestamp: Date.now()
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  if (typeof window !== "undefined") {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(HISTORY_KEY);
  }
}

// Export functions
export function exportToText(calculation: DoorCalculation): string {
  let text = `Door Area Calculation Results\n`;
  text += `=============================\n\n`;
  text += `Dimensions:\n`;
  text += `  Height: ${formatNumber(calculation.height)} ${calculation.unit}\n`;
  text += `  Width: ${formatNumber(calculation.width)} ${calculation.unit}\n`;
  
  if (calculation.includeFrame && calculation.frameThickness) {
    text += `  Frame Thickness: ${formatNumber(calculation.frameThickness)} ${calculation.unit}\n`;
    text += `  (Dimensions include frame)\n`;
  }
  
  text += `\nCalculated Area:\n`;
  text += `  ${formatNumber(calculation.area)} ${getUnitLabel(calculation.unit)}\n`;
  text += `\nGenerated: ${new Date().toLocaleString()}\n`;
  
  return text;
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

// Convert area between units
export function convertArea(area: number, fromUnit: Unit, toUnit: Unit): number {
  // Convert to square meters first
  const areaInSqMeters = area * Math.pow(convertToMeters(1, fromUnit), 2);
  // Convert to target unit
  return areaInSqMeters / Math.pow(convertToMeters(1, toUnit), 2);
}
