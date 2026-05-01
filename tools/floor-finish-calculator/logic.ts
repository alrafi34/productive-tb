import { Unit, MaterialType, FloorFinishCalculation, HistoryEntry, PresetTemplate } from "./types";

export function calculateFloorFinish(
  roomLength: number,
  roomWidth: number,
  materialLength: number,
  materialWidth: number,
  wastagePercentage: number,
  unit: Unit,
  materialType: MaterialType
): FloorFinishCalculation {
  // Calculate total floor area
  const totalArea = roomLength * roomWidth;
  
  // Calculate single material unit area
  const materialArea = materialLength * materialWidth;
  
  // Calculate base units required
  const unitsRequired = totalArea / materialArea;
  
  // Calculate wastage amount
  const wastageAmount = unitsRequired * (wastagePercentage / 100);
  
  // Calculate final units with wastage
  const finalUnits = Math.ceil(unitsRequired + wastageAmount);
  
  return {
    roomLength,
    roomWidth,
    materialLength,
    materialWidth,
    wastagePercentage,
    unit,
    materialType,
    totalArea,
    materialArea,
    unitsRequired,
    wastageAmount,
    finalUnits,
    timestamp: Date.now()
  };
}

export function validateInputs(
  roomLength: number,
  roomWidth: number,
  materialLength: number,
  materialWidth: number,
  wastagePercentage: number
): string | null {
  if (roomLength <= 0) return "Room length must be greater than 0";
  if (roomWidth <= 0) return "Room width must be greater than 0";
  if (materialLength <= 0) return "Material length must be greater than 0";
  if (materialWidth <= 0) return "Material width must be greater than 0";
  if (wastagePercentage < 0) return "Wastage percentage cannot be negative";
  if (wastagePercentage > 50) return "Wastage percentage seems too high (max 50%)";
  return null;
}

export function getMaterialTypeLabel(type: MaterialType): string {
  const labels: Record<MaterialType, string> = {
    tile: "Tile",
    wood: "Wood Plank",
    laminate: "Laminate",
    marble: "Marble",
    custom: "Custom Material"
  };
  return labels[type];
}

export function getUnitLabel(unit: Unit): string {
  return unit === "feet" ? "sq ft" : "m²";
}

export function getLinearUnitLabel(unit: Unit): string {
  return unit === "feet" ? "ft" : "m";
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
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

export function getPresetTemplates(): PresetTemplate[] {
  return [
    {
      name: "Standard Tile 12×12",
      description: "Common ceramic tile",
      materialLength: 1,
      materialWidth: 1,
      materialType: "tile",
      category: "Tile"
    },
    {
      name: "Large Tile 24×24",
      description: "Large format tile",
      materialLength: 2,
      materialWidth: 2,
      materialType: "tile",
      category: "Tile"
    },
    {
      name: "Wood Plank 6×48",
      description: "Standard wood flooring",
      materialLength: 4,
      materialWidth: 0.5,
      materialType: "wood",
      category: "Wood"
    },
    {
      name: "Laminate 8×48",
      description: "Standard laminate plank",
      materialLength: 4,
      materialWidth: 0.67,
      materialType: "laminate",
      category: "Laminate"
    },
    {
      name: "Marble Tile 18×18",
      description: "Premium marble tile",
      materialLength: 1.5,
      materialWidth: 1.5,
      materialType: "marble",
      category: "Marble"
    },
    {
      name: "Small Tile 6×6",
      description: "Mosaic or small tile",
      materialLength: 0.5,
      materialWidth: 0.5,
      materialType: "tile",
      category: "Tile"
    }
  ];
}

// History Management
const HISTORY_KEY = "floor-finish-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: FloorFinishCalculation): void {
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
export function exportToCSV(calculation: FloorFinishCalculation): string {
  const unit = getLinearUnitLabel(calculation.unit);
  const areaUnit = getUnitLabel(calculation.unit);
  
  const headers = ["Room Length", "Room Width", "Total Area", "Material Size", "Material Area", "Units Required", "Wastage %", "Wastage Amount", "Final Units"];
  const values = [
    `${calculation.roomLength} ${unit}`,
    `${calculation.roomWidth} ${unit}`,
    `${formatNumber(calculation.totalArea, 2)} ${areaUnit}`,
    `${calculation.materialLength}×${calculation.materialWidth} ${unit}`,
    `${formatNumber(calculation.materialArea, 2)} ${areaUnit}`,
    formatNumber(calculation.unitsRequired, 2),
    `${calculation.wastagePercentage}%`,
    formatNumber(calculation.wastageAmount, 2),
    calculation.finalUnits.toString()
  ];
  
  return `${headers.join(",")}\n${values.join(",")}`;
}

export function exportToText(calculation: FloorFinishCalculation): string {
  const unit = getLinearUnitLabel(calculation.unit);
  const areaUnit = getUnitLabel(calculation.unit);
  
  return `FLOOR FINISH CALCULATION
=======================

Room Dimensions:
- Length: ${calculation.roomLength} ${unit}
- Width: ${calculation.roomWidth} ${unit}
- Total Area: ${formatNumber(calculation.totalArea, 2)} ${areaUnit}

Material Details:
- Type: ${getMaterialTypeLabel(calculation.materialType)}
- Size: ${calculation.materialLength} × ${calculation.materialWidth} ${unit}
- Unit Area: ${formatNumber(calculation.materialArea, 2)} ${areaUnit}

Calculation:
- Base Units Required: ${formatNumber(calculation.unitsRequired, 2)}
- Wastage Percentage: ${calculation.wastagePercentage}%
- Wastage Amount: ${formatNumber(calculation.wastageAmount, 2)} units
- Final Units Required: ${calculation.finalUnits} units

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
