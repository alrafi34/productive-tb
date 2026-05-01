import { HVACCalculation, HistoryEntry, RoomPreset, DimensionUnit, InsulationQuality, WindowCount, SunExposure, EquipmentLoad, ClimateZone } from "./types";

const HISTORY_KEY = "hvac-load-calculator-history";
const MAX_HISTORY = 10;

// Conversion constants
const FT_TO_M = 0.3048;
const BTU_TO_KW = 0.000293071;
const BTU_PER_TON = 12000;

// Base factors
const BASE_BTU_PER_SQFT = 20;
const BTU_PER_OCCUPANT = 600;

// Convert dimension to feet
export function convertToFeet(value: number, unit: DimensionUnit): number {
  return unit === "m" ? value / FT_TO_M : value;
}

// Calculate room area in square feet
export function calculateArea(length: number, width: number, unit: DimensionUnit): number {
  const l = convertToFeet(length, unit);
  const w = convertToFeet(width, unit);
  return l * w;
}

// Calculate base load
export function calculateBaseLoad(area: number): number {
  return area * BASE_BTU_PER_SQFT;
}

// Calculate occupant load
export function calculateOccupantLoad(occupants: number): number {
  return occupants * BTU_PER_OCCUPANT;
}

// Calculate window load
export function calculateWindowLoad(windows: WindowCount): number {
  switch (windows) {
    case "none": return 0;
    case "few": return 1000;
    case "many": return 2000;
    default: return 0;
  }
}

// Calculate equipment load
export function calculateEquipmentLoad(equipment: EquipmentLoad): number {
  switch (equipment) {
    case "none": return 0;
    case "moderate": return 1000;
    case "high": return 2500;
    default: return 0;
  }
}

// Calculate sun exposure load
export function calculateSunExposureLoad(sunExposure: SunExposure, area: number): number {
  switch (sunExposure) {
    case "low": return 0;
    case "medium": return area * 2;
    case "high": return area * 4;
    default: return 0;
  }
}

// Get insulation factor
export function getInsulationFactor(insulation: InsulationQuality): number {
  switch (insulation) {
    case "poor": return 1.2;
    case "average": return 1.1;
    case "good": return 1.0;
    default: return 1.1;
  }
}

// Get climate factor
export function getClimateFactor(climate: ClimateZone): number {
  switch (climate) {
    case "cool": return 1.0;
    case "moderate": return 1.1;
    case "hot": return 1.2;
    default: return 1.1;
  }
}

// Convert BTU to kW
export function btuToKW(btu: number): number {
  return btu * BTU_TO_KW;
}

// Convert BTU to Tons
export function btuToTons(btu: number): number {
  return btu / BTU_PER_TON;
}

// Main calculation function
export function performHVACCalculation(
  length: number,
  width: number,
  height: number,
  dimensionUnit: DimensionUnit,
  insulation: InsulationQuality,
  occupants: number,
  windows: WindowCount,
  sunExposure: SunExposure,
  equipment: EquipmentLoad,
  climate: ClimateZone
): HVACCalculation {
  // Calculate area
  const area = calculateArea(length, width, dimensionUnit);
  
  // Calculate individual loads
  const baseLoad = calculateBaseLoad(area);
  const occupantLoad = calculateOccupantLoad(occupants);
  const windowLoad = calculateWindowLoad(windows);
  const equipmentLoadValue = calculateEquipmentLoad(equipment);
  const sunExposureLoad = calculateSunExposureLoad(sunExposure, area);
  
  // Sum all loads
  let totalLoad = baseLoad + occupantLoad + windowLoad + equipmentLoadValue + sunExposureLoad;
  
  // Apply factors
  const insulationFactor = getInsulationFactor(insulation);
  const climateFactor = getClimateFactor(climate);
  
  totalLoad = totalLoad * insulationFactor * climateFactor;
  
  // Convert to other units
  const totalBTU = Math.round(totalLoad);
  const totalKW = btuToKW(totalBTU);
  const recommendedTons = btuToTons(totalBTU);
  
  return {
    length,
    width,
    height,
    dimensionUnit,
    insulation,
    occupants,
    windows,
    sunExposure,
    equipment,
    climate,
    area,
    baseLoad,
    occupantLoad,
    windowLoad,
    equipmentLoadValue,
    sunExposureLoad,
    totalBTU,
    totalKW,
    recommendedTons,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getDimensionUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "feet" : "meters";
}

// Room presets
export function getRoomPresets(): RoomPreset[] {
  return [
    {
      name: "Small Bedroom",
      length: 10,
      width: 10,
      height: 8,
      occupants: 1,
      description: "Single occupant bedroom"
    },
    {
      name: "Master Bedroom",
      length: 14,
      width: 12,
      height: 9,
      occupants: 2,
      description: "Double occupant bedroom"
    },
    {
      name: "Living Room",
      length: 18,
      width: 14,
      height: 9,
      occupants: 4,
      description: "Family living space"
    },
    {
      name: "Small Office",
      length: 12,
      width: 10,
      height: 9,
      occupants: 2,
      description: "Home or small office"
    },
    {
      name: "Conference Room",
      length: 20,
      width: 15,
      height: 10,
      occupants: 8,
      description: "Meeting space"
    },
    {
      name: "Open Office",
      length: 30,
      width: 20,
      height: 10,
      occupants: 10,
      description: "Large workspace"
    }
  ];
}

// Get recommended AC size description
export function getACRecommendation(tons: number): string {
  if (tons < 0.5) return "Window AC (5,000 BTU)";
  if (tons < 1) return "Window AC (6,000-8,000 BTU)";
  if (tons < 1.5) return "1 Ton Split AC";
  if (tons < 2) return "1.5 Ton Split AC";
  if (tons < 2.5) return "2 Ton Split AC";
  if (tons < 3) return "2.5 Ton Split AC";
  return `${Math.ceil(tons)} Ton Central AC`;
}

// History management
export function saveToHistory(calculation: HVACCalculation): void {
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
export function exportToText(calculation: HVACCalculation): string {
  let text = `HVAC Load Calculation Results\n`;
  text += `==============================\n\n`;
  
  text += `Room Details:\n`;
  text += `  Dimensions: ${formatNumber(calculation.length)} × ${formatNumber(calculation.width)} × ${formatNumber(calculation.height)} ${calculation.dimensionUnit}\n`;
  text += `  Area: ${formatNumber(calculation.area)} sq ft\n`;
  text += `  Occupants: ${calculation.occupants}\n`;
  text += `  Insulation: ${calculation.insulation}\n`;
  text += `  Windows: ${calculation.windows}\n`;
  text += `  Sun Exposure: ${calculation.sunExposure}\n`;
  text += `  Equipment: ${calculation.equipment}\n`;
  text += `  Climate: ${calculation.climate}\n\n`;
  
  text += `Load Breakdown:\n`;
  text += `  Base Load: ${formatNumber(calculation.baseLoad, 0)} BTU/hr\n`;
  text += `  Occupant Load: ${formatNumber(calculation.occupantLoad, 0)} BTU/hr\n`;
  text += `  Window Load: ${formatNumber(calculation.windowLoad, 0)} BTU/hr\n`;
  text += `  Equipment Load: ${formatNumber(calculation.equipmentLoadValue, 0)} BTU/hr\n`;
  text += `  Sun Exposure Load: ${formatNumber(calculation.sunExposureLoad, 0)} BTU/hr\n`;
  text += `  Insulation Factor: ${formatNumber(getInsulationFactor(calculation.insulation), 2)}x\n`;
  text += `  Climate Factor: ${formatNumber(getClimateFactor(calculation.climate), 2)}x\n\n`;
  
  text += `Results:\n`;
  text += `  Total Cooling Load: ${formatNumber(calculation.totalBTU, 0)} BTU/hr\n`;
  text += `  Cooling Capacity: ${formatNumber(calculation.totalKW, 2)} kW\n`;
  text += `  Recommended AC Size: ${formatNumber(calculation.recommendedTons, 2)} Tons\n`;
  text += `  Recommendation: ${getACRecommendation(calculation.recommendedTons)}\n\n`;
  
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
export function validateInputs(length: number, width: number, height: number, occupants: number): string | null {
  if (!length || length <= 0) {
    return "Length must be greater than 0";
  }
  
  if (!width || width <= 0) {
    return "Width must be greater than 0";
  }
  
  if (!height || height <= 0) {
    return "Height must be greater than 0";
  }
  
  if (!occupants || occupants < 0) {
    return "Number of occupants must be 0 or greater";
  }
  
  return null;
}
