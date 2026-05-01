import { 
  DimensionUnit, 
  SunExposure, 
  InsulationQuality, 
  EquipmentLoad, 
  CoolingLoadCalculation, 
  HistoryEntry, 
  RoomPreset 
} from "./types";

// Constants
const BTU_PER_SQ_FT = 20;
const BTU_PER_PERSON = 600;
const BTU_PER_WINDOW = 500;
const BTU_TO_TONS = 12000;
const FT_TO_M_FACTOR = 0.3048;
const SQ_FT_TO_SQ_M_FACTOR = 0.092903;

// Equipment load values in BTU
const EQUIPMENT_BTU_VALUES = {
  none: 0,
  low: 500,
  medium: 1000,
  high: 2000
};

// Sunlight factors (multipliers)
const SUNLIGHT_FACTORS = {
  low: 1.10,    // +10%
  medium: 1.20, // +20%
  high: 1.30    // +30%
};

// Insulation factors (multipliers)
const INSULATION_FACTORS = {
  good: 0.90,    // -10%
  average: 1.00, // 0%
  poor: 1.15     // +15%
};

export function convertDimensions(value: number, from: DimensionUnit, to: DimensionUnit): number {
  if (from === to) return value;
  if (from === "m" && to === "ft") return value / FT_TO_M_FACTOR;
  if (from === "ft" && to === "m") return value * FT_TO_M_FACTOR;
  return value;
}

export function convertArea(value: number, from: DimensionUnit, to: DimensionUnit): number {
  if (from === to) return value;
  if (from === "m" && to === "ft") return value / SQ_FT_TO_SQ_M_FACTOR;
  if (from === "ft" && to === "m") return value * SQ_FT_TO_SQ_M_FACTOR;
  return value;
}

export function performCoolingLoadCalculation(
  length: number,
  width: number,
  height: number,
  dimensionUnit: DimensionUnit,
  occupants: number,
  sunExposure: SunExposure,
  insulation: InsulationQuality,
  equipment: EquipmentLoad,
  windows: number
): CoolingLoadCalculation {
  // Convert to square feet for calculation
  const lengthFt = convertDimensions(length, dimensionUnit, "ft");
  const widthFt = convertDimensions(width, dimensionUnit, "ft");
  const heightFt = convertDimensions(height, dimensionUnit, "ft");
  
  // Calculate area in square feet
  const areaFt = lengthFt * widthFt;
  
  // Base cooling load
  const baseBTU = areaFt * BTU_PER_SQ_FT;
  
  // Occupancy load (first person is included in base, additional people add BTU)
  const occupancyLoad = Math.max(0, occupants - 1) * BTU_PER_PERSON;
  
  // Equipment load
  const equipmentLoadValue = EQUIPMENT_BTU_VALUES[equipment];
  
  // Window load
  const windowLoad = windows * BTU_PER_WINDOW;
  
  // Calculate subtotal before adjustments
  const subtotal = baseBTU + occupancyLoad + equipmentLoadValue + windowLoad;
  
  // Apply sunlight factor
  const sunlightFactor = SUNLIGHT_FACTORS[sunExposure];
  const afterSunlight = subtotal * sunlightFactor;
  
  // Apply insulation factor
  const insulationFactor = INSULATION_FACTORS[insulation];
  const totalBTU = afterSunlight * insulationFactor;
  
  // Convert to tons
  const recommendedTons = totalBTU / BTU_TO_TONS;
  
  // Convert area back to original unit for display
  const displayArea = convertArea(areaFt, "ft", dimensionUnit);
  
  return {
    length,
    width,
    height,
    dimensionUnit,
    occupants,
    sunExposure,
    insulation,
    equipment,
    windows,
    area: displayArea,
    baseBTU,
    occupancyLoad,
    equipmentLoadValue,
    windowLoad,
    sunlightFactor,
    insulationFactor,
    totalBTU,
    recommendedTons,
    timestamp: Date.now()
  };
}

export function getACRecommendation(tons: number): string {
  if (tons <= 0.5) return "0.5 Ton Window AC";
  if (tons <= 0.75) return "0.75 Ton Split AC";
  if (tons <= 1.0) return "1 Ton Split AC";
  if (tons <= 1.5) return "1.5 Ton Split AC";
  if (tons <= 2.0) return "2 Ton Split AC";
  if (tons <= 2.5) return "2.5 Ton Central AC";
  if (tons <= 3.0) return "3 Ton Central AC";
  if (tons <= 4.0) return "4 Ton Central AC";
  if (tons <= 5.0) return "5 Ton Central AC";
  return `${Math.ceil(tons)} Ton Commercial AC`;
}

export function getLoadIntensity(btu: number): { level: string; color: string; description: string } {
  if (btu < 6000) return { level: "Low", color: "green", description: "Minimal cooling required" };
  if (btu < 12000) return { level: "Medium", color: "yellow", description: "Standard cooling load" };
  if (btu < 24000) return { level: "High", color: "orange", description: "Heavy cooling required" };
  return { level: "Very High", color: "red", description: "Commercial-grade cooling" };
}

export function validateInputs(length: number, width: number, height: number, occupants: number, windows: number): string | null {
  if (isNaN(length) || length <= 0) return "Length must be greater than 0";
  if (isNaN(width) || width <= 0) return "Width must be greater than 0";
  if (isNaN(height) || height <= 0) return "Height must be greater than 0";
  if (isNaN(occupants) || occupants < 0) return "Number of occupants cannot be negative";
  if (isNaN(windows) || windows < 0) return "Number of windows cannot be negative";
  if (length > 1000 || width > 1000 || height > 100) return "Dimensions seem unrealistic";
  if (occupants > 100) return "Number of occupants seems unrealistic";
  if (windows > 50) return "Number of windows seems unrealistic";
  return null;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function getDimensionUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "feet" : "meters";
}

export function getAreaUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "sq ft" : "sq m";
}

// Room presets
export function getRoomPresets(): RoomPreset[] {
  return [
    {
      name: "Small Bedroom",
      description: "Typical single bedroom",
      length: 10,
      width: 10,
      height: 9,
      occupants: 1
    },
    {
      name: "Master Bedroom",
      description: "Large bedroom with ensuite",
      length: 14,
      width: 12,
      height: 9,
      occupants: 2
    },
    {
      name: "Living Room",
      description: "Standard family living room",
      length: 16,
      width: 12,
      height: 9,
      occupants: 4
    },
    {
      name: "Office Room",
      description: "Home office or study",
      length: 12,
      width: 10,
      height: 9,
      occupants: 2
    },
    {
      name: "Conference Room",
      description: "Meeting room for 8-10 people",
      length: 20,
      width: 12,
      height: 9,
      occupants: 8
    },
    {
      name: "Open Office",
      description: "Large workspace area",
      length: 30,
      width: 20,
      height: 9,
      occupants: 15
    }
  ];
}

// History management
const HISTORY_KEY = "cooling-load-calculator-history";
const MAX_HISTORY_ITEMS = 10;

export function saveToHistory(calculation: CoolingLoadCalculation): void {
  try {
    const history = getHistory();
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      calculation,
      timestamp: Date.now()
    };
    
    history.unshift(newEntry);
    
    // Keep only the latest items
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn("Failed to clear history:", error);
  }
}

// Export functionality
export function exportToText(calculation: CoolingLoadCalculation): string {
  const { area, totalBTU, recommendedTons, dimensionUnit } = calculation;
  const areaUnit = getAreaUnitLabel(dimensionUnit);
  const intensity = getLoadIntensity(totalBTU);
  const acRecommendation = getACRecommendation(recommendedTons);
  
  return `COOLING LOAD CALCULATION REPORT
Generated: ${new Date().toLocaleString()}

ROOM SPECIFICATIONS:
- Dimensions: ${calculation.length} × ${calculation.width} × ${calculation.height} ${dimensionUnit}
- Area: ${formatNumber(area)} ${areaUnit}
- Occupants: ${calculation.occupants}
- Windows: ${calculation.windows}
- Sun Exposure: ${calculation.sunExposure.charAt(0).toUpperCase() + calculation.sunExposure.slice(1)}
- Insulation: ${calculation.insulation.charAt(0).toUpperCase() + calculation.insulation.slice(1)}
- Equipment Load: ${calculation.equipment.charAt(0).toUpperCase() + calculation.equipment.slice(1)}

LOAD BREAKDOWN:
- Base Load: ${formatNumber(calculation.baseBTU)} BTU/hr
- Occupancy Load: ${formatNumber(calculation.occupancyLoad)} BTU/hr
- Equipment Load: ${formatNumber(calculation.equipmentLoadValue)} BTU/hr
- Window Load: ${formatNumber(calculation.windowLoad)} BTU/hr
- Sunlight Factor: ${formatNumber((calculation.sunlightFactor - 1) * 100)}%
- Insulation Factor: ${formatNumber((calculation.insulationFactor - 1) * 100)}%

RESULTS:
- Total Cooling Load: ${formatNumber(totalBTU)} BTU/hr
- Equivalent Capacity: ${formatNumber(recommendedTons, 2)} Tons
- Load Intensity: ${intensity.level}
- Recommended AC: ${acRecommendation}

Note: This is an estimate. Consult with HVAC professionals for final system sizing.`;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}