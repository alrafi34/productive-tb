import { 
  CalculationMode, 
  TemperatureUnit, 
  HeatLossCalculation, 
  HistoryEntry, 
  MaterialPreset, 
  BuildingPreset 
} from "./types";

// Constants
const WATTS_TO_BTU_HR = 3.412142; // 1 Watt = 3.412142 BTU/hr

// Temperature conversion functions
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

export function convertTemperature(temp: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) return temp;
  if (from === "celsius" && to === "fahrenheit") return celsiusToFahrenheit(temp);
  if (from === "fahrenheit" && to === "celsius") return fahrenheitToCelsius(temp);
  return temp;
}

// Core heat loss calculation: Q = U × A × ΔT
export function calculateHeatLoss(uValue: number, area: number, temperatureDifference: number): number {
  return uValue * area * temperatureDifference;
}

export function performHeatLossCalculation(
  mode: CalculationMode,
  temperatureUnit: TemperatureUnit,
  insideTemp: number,
  outsideTemp: number,
  // Simple mode parameters
  totalArea?: number,
  averageUValue?: number,
  // Detailed mode parameters
  wallArea?: number,
  wallUValue?: number,
  windowArea?: number,
  windowUValue?: number,
  roofArea?: number,
  roofUValue?: number,
  floorArea?: number,
  floorUValue?: number
): HeatLossCalculation {
  // Convert temperatures to Celsius for calculation if needed
  const insideTempC = temperatureUnit === "fahrenheit" ? fahrenheitToCelsius(insideTemp) : insideTemp;
  const outsideTempC = temperatureUnit === "fahrenheit" ? fahrenheitToCelsius(outsideTemp) : outsideTemp;
  
  // Calculate temperature difference
  const temperatureDifference = insideTempC - outsideTempC;
  
  let wallHeatLoss = 0;
  let windowHeatLoss = 0;
  let roofHeatLoss = 0;
  let floorHeatLoss = 0;
  let totalHeatLoss = 0;
  
  if (mode === "simple" && totalArea && averageUValue) {
    // Simple mode: single calculation
    totalHeatLoss = calculateHeatLoss(averageUValue, totalArea, temperatureDifference);
  } else if (mode === "detailed") {
    // Detailed mode: calculate each component
    if (wallArea && wallUValue) {
      wallHeatLoss = calculateHeatLoss(wallUValue, wallArea, temperatureDifference);
    }
    if (windowArea && windowUValue) {
      windowHeatLoss = calculateHeatLoss(windowUValue, windowArea, temperatureDifference);
    }
    if (roofArea && roofUValue) {
      roofHeatLoss = calculateHeatLoss(roofUValue, roofArea, temperatureDifference);
    }
    if (floorArea && floorUValue) {
      floorHeatLoss = calculateHeatLoss(floorUValue, floorArea, temperatureDifference);
    }
    
    totalHeatLoss = wallHeatLoss + windowHeatLoss + roofHeatLoss + floorHeatLoss;
  }
  
  // Convert to BTU/hr
  const totalHeatLossBTU = totalHeatLoss * WATTS_TO_BTU_HR;
  
  return {
    mode,
    temperatureUnit,
    insideTemp,
    outsideTemp,
    totalArea,
    averageUValue,
    wallArea,
    wallUValue,
    windowArea,
    windowUValue,
    roofArea,
    roofUValue,
    floorArea,
    floorUValue,
    temperatureDifference,
    wallHeatLoss,
    windowHeatLoss,
    roofHeatLoss,
    floorHeatLoss,
    totalHeatLoss,
    totalHeatLossBTU,
    timestamp: Date.now()
  };
}

export function validateInputs(
  mode: CalculationMode,
  insideTemp: number,
  outsideTemp: number,
  totalArea?: number,
  averageUValue?: number,
  wallArea?: number,
  wallUValue?: number,
  windowArea?: number,
  windowUValue?: number,
  roofArea?: number,
  roofUValue?: number,
  floorArea?: number,
  floorUValue?: number
): string | null {
  if (isNaN(insideTemp)) return "Inside temperature is required";
  if (isNaN(outsideTemp)) return "Outside temperature is required";
  if (insideTemp <= outsideTemp) return "Inside temperature must be higher than outside temperature for heat loss";
  
  if (mode === "simple") {
    if (!totalArea || totalArea <= 0) return "Total area must be greater than 0";
    if (!averageUValue || averageUValue <= 0) return "U-value must be greater than 0";
    if (totalArea > 10000) return "Total area seems unrealistic (>10,000 m²)";
    if (averageUValue > 10) return "U-value seems unrealistic (>10 W/m²·K)";
  } else if (mode === "detailed") {
    let hasValidInput = false;
    
    if (wallArea && wallArea > 0 && wallUValue && wallUValue > 0) hasValidInput = true;
    if (windowArea && windowArea > 0 && windowUValue && windowUValue > 0) hasValidInput = true;
    if (roofArea && roofArea > 0 && roofUValue && roofUValue > 0) hasValidInput = true;
    if (floorArea && floorArea > 0 && floorUValue && floorUValue > 0) hasValidInput = true;
    
    if (!hasValidInput) return "At least one component (wall, window, roof, or floor) must have both area and U-value";
    
    // Validate individual components
    if (wallArea && wallArea < 0) return "Wall area cannot be negative";
    if (windowArea && windowArea < 0) return "Window area cannot be negative";
    if (roofArea && roofArea < 0) return "Roof area cannot be negative";
    if (floorArea && floorArea < 0) return "Floor area cannot be negative";
    
    if (wallUValue && wallUValue <= 0) return "Wall U-value must be greater than 0";
    if (windowUValue && windowUValue <= 0) return "Window U-value must be greater than 0";
    if (roofUValue && roofUValue <= 0) return "Roof U-value must be greater than 0";
    if (floorUValue && floorUValue <= 0) return "Floor U-value must be greater than 0";
  }
  
  return null;
}

export function formatNumber(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function getHeatLossIntensity(watts: number): { level: string; color: string; description: string } {
  if (watts < 100) return { level: "Very Low", color: "green", description: "Excellent insulation" };
  if (watts < 300) return { level: "Low", color: "blue", description: "Good insulation" };
  if (watts < 600) return { level: "Medium", color: "yellow", description: "Average insulation" };
  if (watts < 1000) return { level: "High", color: "orange", description: "Poor insulation" };
  return { level: "Very High", color: "red", description: "Very poor insulation" };
}

// Material presets with typical U-values
export function getMaterialPresets(): MaterialPreset[] {
  return [
    // Walls
    { name: "Brick Wall (Uninsulated)", category: "Wall", uValue: 2.1, description: "Single brick wall, no insulation" },
    { name: "Brick Wall (Insulated)", category: "Wall", uValue: 0.35, description: "Brick wall with cavity insulation" },
    { name: "Concrete Block", category: "Wall", uValue: 1.5, description: "Standard concrete block wall" },
    { name: "Timber Frame (Insulated)", category: "Wall", uValue: 0.25, description: "Modern timber frame with insulation" },
    { name: "Stud Wall (Uninsulated)", category: "Wall", uValue: 1.8, description: "Timber stud wall, no insulation" },
    
    // Windows
    { name: "Single Glazed", category: "Window", uValue: 5.0, description: "Single pane glass window" },
    { name: "Double Glazed", category: "Window", uValue: 2.8, description: "Standard double glazed window" },
    { name: "Double Glazed (Low-E)", category: "Window", uValue: 1.8, description: "Low-emissivity double glazing" },
    { name: "Triple Glazed", category: "Window", uValue: 1.2, description: "High-performance triple glazing" },
    
    // Roofs
    { name: "Pitched Roof (Uninsulated)", category: "Roof", uValue: 2.3, description: "Traditional pitched roof, no insulation" },
    { name: "Pitched Roof (Insulated)", category: "Roof", uValue: 0.16, description: "Well-insulated pitched roof" },
    { name: "Flat Roof (Uninsulated)", category: "Roof", uValue: 1.5, description: "Flat roof, minimal insulation" },
    { name: "Flat Roof (Insulated)", category: "Roof", uValue: 0.25, description: "Insulated flat roof" },
    
    // Floors
    { name: "Solid Floor (Uninsulated)", category: "Floor", uValue: 0.7, description: "Concrete floor on ground" },
    { name: "Solid Floor (Insulated)", category: "Floor", uValue: 0.25, description: "Insulated concrete floor" },
    { name: "Suspended Floor (Uninsulated)", category: "Floor", uValue: 1.0, description: "Timber floor, no insulation" },
    { name: "Suspended Floor (Insulated)", category: "Floor", uValue: 0.22, description: "Insulated suspended floor" }
  ];
}

// Building presets for quick calculations
export function getBuildingPresets(): BuildingPreset[] {
  return [
    {
      name: "Small House",
      description: "2-bedroom house, average insulation",
      wallArea: 80,
      windowArea: 15,
      roofArea: 60,
      floorArea: 60,
      wallUValue: 0.35,
      windowUValue: 2.8,
      roofUValue: 0.25,
      floorUValue: 0.25
    },
    {
      name: "Medium House",
      description: "3-bedroom house, good insulation",
      wallArea: 120,
      windowArea: 20,
      roofArea: 90,
      floorArea: 90,
      wallUValue: 0.25,
      windowUValue: 1.8,
      roofUValue: 0.16,
      floorUValue: 0.22
    },
    {
      name: "Large House",
      description: "4-bedroom house, modern standards",
      wallArea: 160,
      windowArea: 30,
      roofArea: 120,
      floorArea: 120,
      wallUValue: 0.25,
      windowUValue: 1.2,
      roofUValue: 0.16,
      floorUValue: 0.22
    },
    {
      name: "Old House",
      description: "Victorian house, poor insulation",
      wallArea: 100,
      windowArea: 25,
      roofArea: 80,
      floorArea: 80,
      wallUValue: 2.1,
      windowUValue: 5.0,
      roofUValue: 2.3,
      floorUValue: 1.0
    },
    {
      name: "Apartment",
      description: "2-bedroom apartment, average insulation",
      wallArea: 40,
      windowArea: 10,
      roofArea: 0, // No roof (middle floor)
      floorArea: 70,
      wallUValue: 0.35,
      windowUValue: 2.8,
      roofUValue: 0,
      floorUValue: 0.7
    },
    {
      name: "Office Space",
      description: "Small office, commercial building",
      wallArea: 60,
      windowArea: 20,
      roofArea: 0, // No roof (middle floor)
      floorArea: 100,
      wallUValue: 0.4,
      windowUValue: 2.8,
      roofUValue: 0,
      floorUValue: 0.7
    }
  ];
}

// History management
const HISTORY_KEY = "heat-loss-calculator-history";
const MAX_HISTORY_ITEMS = 10;

export function saveToHistory(calculation: HeatLossCalculation): void {
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
export function exportToText(calculation: HeatLossCalculation): string {
  const tempUnit = calculation.temperatureUnit === "celsius" ? "°C" : "°F";
  const intensity = getHeatLossIntensity(calculation.totalHeatLoss);
  
  let content = `HEAT LOSS CALCULATION REPORT
Generated: ${new Date().toLocaleString()}

TEMPERATURE CONDITIONS:
- Inside Temperature: ${calculation.insideTemp}${tempUnit}
- Outside Temperature: ${calculation.outsideTemp}${tempUnit}
- Temperature Difference: ${formatNumber(calculation.temperatureDifference, 1)}°C

`;

  if (calculation.mode === "simple") {
    content += `SIMPLE MODE CALCULATION:
- Total Area: ${formatNumber(calculation.totalArea || 0)} m²
- Average U-Value: ${formatNumber(calculation.averageUValue || 0)} W/m²·K
- Heat Loss Formula: Q = U × A × ΔT
- Heat Loss Formula: Q = ${formatNumber(calculation.averageUValue || 0)} × ${formatNumber(calculation.totalArea || 0)} × ${formatNumber(calculation.temperatureDifference)}

`;
  } else {
    content += `DETAILED MODE BREAKDOWN:
`;
    if (calculation.wallArea && calculation.wallUValue) {
      content += `- Wall: ${formatNumber(calculation.wallArea)} m² × ${formatNumber(calculation.wallUValue)} W/m²·K = ${formatNumber(calculation.wallHeatLoss)} W
`;
    }
    if (calculation.windowArea && calculation.windowUValue) {
      content += `- Window: ${formatNumber(calculation.windowArea)} m² × ${formatNumber(calculation.windowUValue)} W/m²·K = ${formatNumber(calculation.windowHeatLoss)} W
`;
    }
    if (calculation.roofArea && calculation.roofUValue) {
      content += `- Roof: ${formatNumber(calculation.roofArea)} m² × ${formatNumber(calculation.roofUValue)} W/m²·K = ${formatNumber(calculation.roofHeatLoss)} W
`;
    }
    if (calculation.floorArea && calculation.floorUValue) {
      content += `- Floor: ${formatNumber(calculation.floorArea)} m² × ${formatNumber(calculation.floorUValue)} W/m²·K = ${formatNumber(calculation.floorHeatLoss)} W
`;
    }
    content += `
`;
  }

  content += `RESULTS:
- Total Heat Loss: ${formatNumber(calculation.totalHeatLoss)} W
- Total Heat Loss: ${formatNumber(calculation.totalHeatLossBTU)} BTU/hr
- Heat Loss Intensity: ${intensity.level}
- Assessment: ${intensity.description}

Note: This is an estimate based on simplified calculations. Consult with building professionals for detailed energy assessments.`;

  return content;
}

export function exportToCSV(calculation: HeatLossCalculation): string {
  const headers = ["Component", "Area (m²)", "U-Value (W/m²·K)", "Heat Loss (W)"];
  const rows = [headers.join(",")];
  
  if (calculation.mode === "simple") {
    rows.push(`Total,${calculation.totalArea || 0},${calculation.averageUValue || 0},${formatNumber(calculation.totalHeatLoss)}`);
  } else {
    if (calculation.wallArea && calculation.wallUValue) {
      rows.push(`Wall,${calculation.wallArea},${calculation.wallUValue},${formatNumber(calculation.wallHeatLoss)}`);
    }
    if (calculation.windowArea && calculation.windowUValue) {
      rows.push(`Window,${calculation.windowArea},${calculation.windowUValue},${formatNumber(calculation.windowHeatLoss)}`);
    }
    if (calculation.roofArea && calculation.roofUValue) {
      rows.push(`Roof,${calculation.roofArea},${calculation.roofUValue},${formatNumber(calculation.roofHeatLoss)}`);
    }
    if (calculation.floorArea && calculation.floorUValue) {
      rows.push(`Floor,${calculation.floorArea},${calculation.floorUValue},${formatNumber(calculation.floorHeatLoss)}`);
    }
    rows.push(`Total,-,-,${formatNumber(calculation.totalHeatLoss)}`);
  }
  
  return rows.join("\n");
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