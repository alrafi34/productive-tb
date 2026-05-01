import { LightingCalculation, HistoryEntry, RoomPreset, LightingTypeInfo, AreaUnit, LightingType, RoomType } from "./types";

const HISTORY_KEY = "lighting-load-calculator-history";
const MAX_HISTORY = 10;

// Conversion constants
const SQFT_TO_SQM = 0.092903;
const HOURS_PER_DAY = 8; // Average lighting usage per day

// Convert area to square meters
export function convertToSquareMeters(value: number, unit: AreaUnit): number {
  return unit === "sqft" ? value * SQFT_TO_SQM : value;
}

// Get lumens per watt based on lighting type
export function getLumensPerWatt(type: LightingType): number {
  switch (type) {
    case "LED": return 100;
    case "CFL": return 60;
    case "Incandescent": return 15;
    default: return 100;
  }
}

// Calculate total lumens required
export function calculateTotalLumens(area: number, lux: number): number {
  return area * lux;
}

// Calculate watts from lumens
export function calculateWatts(lumens: number, lumensPerWatt: number): number {
  return lumens / lumensPerWatt;
}

// Apply efficiency factor
export function applyEfficiencyFactor(watts: number, factor: number): number {
  return watts / factor;
}

// Calculate monthly energy consumption (kWh)
export function calculateMonthlyKWh(watts: number, hoursPerDay: number = HOURS_PER_DAY): number {
  const dailyKWh = (watts * hoursPerDay) / 1000;
  return dailyKWh * 30; // 30 days per month
}

// Suggest number of fixtures (assuming ~800 lumens per fixture)
export function suggestFixtures(totalLumens: number, lumensPerFixture: number = 800): number {
  return Math.ceil(totalLumens / lumensPerFixture);
}

// Main calculation function
export function performLightingCalculation(
  area: number,
  areaUnit: AreaUnit,
  lux: number,
  roomType: RoomType,
  lightingType: LightingType,
  efficiencyFactor: number
): LightingCalculation {
  // Convert area to square meters for calculation
  const areaInSqM = convertToSquareMeters(area, areaUnit);
  
  // Calculate total lumens
  const totalLumens = calculateTotalLumens(areaInSqM, lux);
  
  // Get efficiency for lighting type
  const lumensPerWatt = getLumensPerWatt(lightingType);
  
  // Calculate base watts
  const totalWatts = calculateWatts(totalLumens, lumensPerWatt);
  
  // Apply efficiency factor
  const adjustedWatts = applyEfficiencyFactor(totalWatts, efficiencyFactor);
  
  // Convert to kilowatts
  const kilowatts = adjustedWatts / 1000;
  
  // Calculate monthly consumption
  const monthlyKWh = calculateMonthlyKWh(adjustedWatts);
  
  // Suggest number of fixtures
  const suggestedFixtures = suggestFixtures(totalLumens);
  
  return {
    area,
    areaUnit,
    lux,
    roomType,
    lightingType,
    efficiencyFactor,
    totalLumens,
    lumensPerWatt,
    totalWatts,
    adjustedWatts,
    kilowatts,
    monthlyKWh,
    suggestedFixtures,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getAreaUnitLabel(unit: AreaUnit): string {
  return unit === "sqft" ? "sq ft" : "m²";
}

// Room presets with recommended lux values
export function getRoomPresets(): RoomPreset[] {
  return [
    {
      name: "Living Room",
      type: "living-room",
      lux: 150,
      description: "Comfortable ambient lighting"
    },
    {
      name: "Bedroom",
      type: "bedroom",
      lux: 100,
      description: "Soft, relaxing lighting"
    },
    {
      name: "Office",
      type: "office",
      lux: 300,
      description: "Bright task lighting"
    },
    {
      name: "Kitchen",
      type: "kitchen",
      lux: 250,
      description: "Bright work area lighting"
    },
    {
      name: "Bathroom",
      type: "bathroom",
      lux: 200,
      description: "Clear, functional lighting"
    },
    {
      name: "Hallway",
      type: "hallway",
      lux: 100,
      description: "Basic navigation lighting"
    }
  ];
}

// Lighting type information
export function getLightingTypes(): LightingTypeInfo[] {
  return [
    {
      name: "LED",
      type: "LED",
      lumensPerWatt: 100,
      efficiency: "High Efficiency"
    },
    {
      name: "CFL",
      type: "CFL",
      lumensPerWatt: 60,
      efficiency: "Medium Efficiency"
    },
    {
      name: "Incandescent",
      type: "Incandescent",
      lumensPerWatt: 15,
      efficiency: "Low Efficiency"
    }
  ];
}

// Get lux value for room type
export function getLuxForRoomType(roomType: RoomType): number {
  const presets = getRoomPresets();
  const preset = presets.find(p => p.type === roomType);
  return preset ? preset.lux : 150;
}

// History management
export function saveToHistory(calculation: LightingCalculation): void {
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
export function exportToText(calculation: LightingCalculation, electricityRate?: number): string {
  let text = `Lighting Load Calculation Results\n`;
  text += `==================================\n\n`;
  
  text += `Room Details:\n`;
  text += `  Area: ${formatNumber(calculation.area)} ${getAreaUnitLabel(calculation.areaUnit)}\n`;
  text += `  Room Type: ${calculation.roomType.replace('-', ' ')}\n`;
  text += `  Required Lux: ${calculation.lux}\n`;
  text += `  Lighting Type: ${calculation.lightingType}\n`;
  text += `  Efficiency Factor: ${formatNumber(calculation.efficiencyFactor, 2)}\n\n`;
  
  text += `Calculation:\n`;
  text += `  Total Lumens Required: ${formatNumber(calculation.totalLumens, 0)} lumens\n`;
  text += `  Lumens per Watt: ${calculation.lumensPerWatt} lm/W\n`;
  text += `  Base Power: ${formatNumber(calculation.totalWatts)} W\n`;
  text += `  Adjusted Power: ${formatNumber(calculation.adjustedWatts)} W\n\n`;
  
  text += `Results:\n`;
  text += `  Total Lighting Load: ${formatNumber(calculation.adjustedWatts)} W (${formatNumber(calculation.kilowatts, 3)} kW)\n`;
  text += `  Estimated Monthly Usage: ${formatNumber(calculation.monthlyKWh)} kWh\n`;
  text += `  Suggested Fixtures: ${calculation.suggestedFixtures}\n`;
  
  if (electricityRate) {
    const monthlyCost = calculation.monthlyKWh * electricityRate;
    text += `  Estimated Monthly Cost: $${formatNumber(monthlyCost)}\n`;
  }
  
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

// Calculate estimated cost
export function calculateMonthlyCost(monthlyKWh: number, ratePerKWh: number): number {
  return monthlyKWh * ratePerKWh;
}

// Validation
export function validateInputs(area: number, lux: number): string | null {
  if (!area || area <= 0) {
    return "Area must be greater than 0";
  }
  
  if (!lux || lux <= 0) {
    return "Lux value must be greater than 0";
  }
  
  return null;
}
