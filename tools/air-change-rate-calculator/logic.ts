import { ACHCalculation, HistoryEntry, ACHRange, InputMode, DimensionUnit, VolumeUnit, AirflowUnit } from "./types";

const HISTORY_KEY = "air-change-rate-calculator-history";
const MAX_HISTORY = 10;

// Conversion constants
const CFM_TO_M3H = 1.699;
const FT3_TO_M3 = 0.0283168;
const FT_TO_M = 0.3048;

// Convert dimension to meters
export function convertToMeters(value: number, unit: DimensionUnit): number {
  return unit === "ft" ? value * FT_TO_M : value;
}

// Convert volume to cubic meters
export function convertVolumeToM3(value: number, unit: VolumeUnit): number {
  return unit === "ft3" ? value * FT3_TO_M3 : value;
}

// Convert airflow to m³/h
export function convertAirflowToM3H(value: number, unit: AirflowUnit): number {
  return unit === "CFM" ? value * CFM_TO_M3H : value;
}

// Calculate room volume from dimensions
export function calculateRoomVolume(length: number, width: number, height: number, unit: DimensionUnit): number {
  const l = convertToMeters(length, unit);
  const w = convertToMeters(width, unit);
  const h = convertToMeters(height, unit);
  return l * w * h;
}

// Calculate ACH
export function calculateACH(volume: number, airflow: number): number {
  if (volume <= 0) return 0;
  return airflow / volume;
}

// Main calculation function
export function performACHCalculation(
  mode: InputMode,
  airflow: number,
  airflowUnit: AirflowUnit,
  length?: number,
  width?: number,
  height?: number,
  dimensionUnit?: DimensionUnit,
  volume?: number,
  volumeUnit?: VolumeUnit
): ACHCalculation {
  let calculatedVolume = 0;
  
  if (mode === "dimensions" && length && width && height && dimensionUnit) {
    calculatedVolume = calculateRoomVolume(length, width, height, dimensionUnit);
  } else if (mode === "volume" && volume && volumeUnit) {
    calculatedVolume = convertVolumeToM3(volume, volumeUnit);
  }
  
  const normalizedAirflow = convertAirflowToM3H(airflow, airflowUnit);
  const ach = calculateACH(calculatedVolume, normalizedAirflow);
  
  return {
    mode,
    length,
    width,
    height,
    dimensionUnit,
    volume,
    volumeUnit,
    airflow,
    airflowUnit,
    calculatedVolume,
    normalizedAirflow,
    ach,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getAirflowUnitLabel(unit: AirflowUnit): string {
  return unit === "CFM" ? "CFM" : "m³/h";
}

export function getVolumeUnitLabel(unit: VolumeUnit): string {
  return unit === "ft3" ? "ft³" : "m³";
}

export function getDimensionUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "feet" : "meters";
}

// ACH ranges for different space types
export function getACHRanges(): ACHRange[] {
  return [
    {
      name: "Very Low",
      min: 0,
      max: 0.5,
      description: "Poor ventilation - not recommended",
      color: "#ef4444"
    },
    {
      name: "Low",
      min: 0.5,
      max: 2,
      description: "Residential spaces",
      color: "#f59e0b"
    },
    {
      name: "Moderate",
      min: 2,
      max: 6,
      description: "Offices, classrooms",
      color: "#10b981"
    },
    {
      name: "High",
      min: 6,
      max: 15,
      description: "Hospitals, labs, kitchens",
      color: "#3b82f6"
    },
    {
      name: "Very High",
      min: 15,
      max: Infinity,
      description: "Cleanrooms, industrial",
      color: "#8b5cf6"
    }
  ];
}

export function getACHCategory(ach: number): ACHRange | null {
  const ranges = getACHRanges();
  return ranges.find(range => ach >= range.min && ach < range.max) || null;
}

// History management
export function saveToHistory(calculation: ACHCalculation): void {
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
export function exportToText(calculation: ACHCalculation): string {
  let text = `Air Change Rate Calculation Results\n`;
  text += `====================================\n\n`;
  
  if (calculation.mode === "dimensions") {
    text += `Input Mode: Room Dimensions\n\n`;
    text += `Dimensions:\n`;
    text += `  Length: ${formatNumber(calculation.length!)} ${calculation.dimensionUnit}\n`;
    text += `  Width: ${formatNumber(calculation.width!)} ${calculation.dimensionUnit}\n`;
    text += `  Height: ${formatNumber(calculation.height!)} ${calculation.dimensionUnit}\n`;
  } else {
    text += `Input Mode: Direct Volume\n\n`;
    text += `Volume: ${formatNumber(calculation.volume!)} ${calculation.volumeUnit}\n`;
  }
  
  text += `\nAirflow: ${formatNumber(calculation.airflow)} ${getAirflowUnitLabel(calculation.airflowUnit)}\n\n`;
  text += `Calculated Values:\n`;
  text += `  Room Volume: ${formatNumber(calculation.calculatedVolume)} m³\n`;
  text += `  Normalized Airflow: ${formatNumber(calculation.normalizedAirflow)} m³/h\n\n`;
  text += `Air Changes per Hour (ACH): ${formatNumber(calculation.ach)}\n\n`;
  
  const category = getACHCategory(calculation.ach);
  if (category) {
    text += `Ventilation Level: ${category.name}\n`;
    text += `Description: ${category.description}\n\n`;
  }
  
  text += `Generated: ${new Date().toLocaleString()}\n`;
  
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

// Validation
export function validateInputs(
  mode: InputMode,
  airflow: number,
  length?: number,
  width?: number,
  height?: number,
  volume?: number
): string | null {
  if (!airflow || airflow <= 0) {
    return "Please enter a valid airflow value greater than 0";
  }
  
  if (mode === "dimensions") {
    if (!length || length <= 0 || !width || width <= 0 || !height || height <= 0) {
      return "Please enter valid room dimensions greater than 0";
    }
  } else {
    if (!volume || volume <= 0) {
      return "Please enter a valid volume greater than 0";
    }
  }
  
  return null;
}

// Check if ACH is unrealistic
export function isUnrealisticACH(ach: number): boolean {
  return ach > 50 || ach < 0.1;
}
