import { WindowEntry, WindowCalculation, HistoryEntry, Unit } from "./types";

const HISTORY_KEY = "window-area-calculator-history";
const MAX_HISTORY = 10;

export function calculateWindowArea(width: number, height: number): number {
  return width * height;
}

export function calculateTotalArea(windows: WindowEntry[]): number {
  return windows.reduce((sum, window) => sum + window.area, 0);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getUnitLabel(unit: Unit): string {
  switch (unit) {
    case "mm": return "mm²";
    case "cm": return "cm²";
    case "m": return "m²";
    case "inches": return "in²";
    case "ft": return "ft²";
    default: return unit;
  }
}

export function getUnitDisplayName(unit: Unit): string {
  switch (unit) {
    case "mm": return "Millimeters";
    case "cm": return "Centimeters";
    case "m": return "Meters";
    case "inches": return "Inches";
    case "ft": return "Feet";
    default: return unit;
  }
}

// Convert to base unit (meters) for comparison
export function convertToMeters(value: number, unit: Unit): number {
  switch (unit) {
    case "mm": return value / 1000;
    case "cm": return value / 100;
    case "m": return value;
    case "inches": return value * 0.0254;
    case "ft": return value * 0.3048;
    default: return value;
  }
}

// Convert from meters to target unit
export function convertFromMeters(value: number, unit: Unit): number {
  switch (unit) {
    case "mm": return value * 1000;
    case "cm": return value * 100;
    case "m": return value;
    case "inches": return value / 0.0254;
    case "ft": return value / 0.3048;
    default: return value;
  }
}

// History management
export function saveToHistory(calculation: WindowCalculation): void {
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
export function exportToText(calculation: WindowCalculation): string {
  let text = `Window Area Calculation Results\n`;
  text += `================================\n\n`;
  text += `Unit: ${getUnitDisplayName(calculation.unit)}\n\n`;
  text += `Windows:\n`;
  text += `--------\n`;
  
  calculation.windows.forEach((window, index) => {
    text += `Window ${index + 1}:\n`;
    text += `  Width: ${formatNumber(window.width)} ${calculation.unit}\n`;
    text += `  Height: ${formatNumber(window.height)} ${calculation.unit}\n`;
    text += `  Area: ${formatNumber(window.area)} ${getUnitLabel(calculation.unit)}\n\n`;
  });
  
  text += `Total Area: ${formatNumber(calculation.totalArea)} ${getUnitLabel(calculation.unit)}\n`;
  text += `\nGenerated: ${new Date().toLocaleString()}\n`;
  
  return text;
}

export function exportToCSV(calculation: WindowCalculation): string {
  let csv = `Window,Width (${calculation.unit}),Height (${calculation.unit}),Area (${getUnitLabel(calculation.unit)})\n`;
  
  calculation.windows.forEach((window, index) => {
    csv += `${index + 1},${window.width},${window.height},${window.area}\n`;
  });
  
  csv += `\nTotal Area,,,${calculation.totalArea}\n`;
  
  return csv;
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

// Generate unique ID
export function generateId(): string {
  return `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Debounce function
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
