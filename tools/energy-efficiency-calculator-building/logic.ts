import {
  Unit,
  BuildingType,
  ClimateZone,
  EnergyCalculation,
  HistoryEntry,
  BuildingPreset
} from "./types";

// Unit conversion
export function convertToSqFt(value: number, unit: Unit): number {
  return unit === "sqm" ? value * 10.7639 : value;
}

export function convertFromSqFt(value: number, unit: Unit): number {
  return unit === "sqm" ? value / 10.7639 : value;
}

// Building presets
export function getBuildingPresets(): BuildingPreset[] {
  return [
    { name: "Small House", area: 1500, energy: 18000, occupancy: 3, type: "residential" },
    { name: "Medium House", area: 2500, energy: 28000, occupancy: 4, type: "residential" },
    { name: "Large House", area: 4000, energy: 40000, occupancy: 6, type: "residential" },
    { name: "Apartment", area: 1000, energy: 10000, occupancy: 2, type: "residential" },
    { name: "Small Office", area: 3000, energy: 36000, occupancy: 15, type: "commercial" },
    { name: "Retail Store", area: 5000, energy: 60000, occupancy: 20, type: "commercial" },
    { name: "Warehouse", area: 10000, energy: 80000, occupancy: 10, type: "industrial" },
    { name: "Factory", area: 20000, energy: 200000, occupancy: 50, type: "industrial" }
  ];
}

// Calculate EUI (Energy Use Intensity)
export function calculateEUI(area: number, energy: number): number {
  if (area <= 0) return 0;
  return energy / area;
}

// Calculate EUI per person
export function calculateEUIPerPerson(energy: number, occupancy: number): number {
  if (occupancy <= 0) return 0;
  return energy / occupancy;
}

// Classify efficiency rating
export function classifyEfficiency(
  eui: number,
  buildingType: BuildingType,
  climateZone: ClimateZone
): string {
  // Adjust thresholds based on building type and climate
  let highThreshold = 8;
  let moderateThreshold = 15;
  
  // Building type adjustments
  if (buildingType === "commercial") {
    highThreshold = 12;
    moderateThreshold = 20;
  } else if (buildingType === "industrial") {
    highThreshold = 15;
    moderateThreshold = 25;
  }
  
  // Climate zone adjustments
  if (climateZone === "cold") {
    highThreshold += 2;
    moderateThreshold += 3;
  } else if (climateZone === "hot") {
    highThreshold += 1;
    moderateThreshold += 2;
  }
  
  if (eui < highThreshold) return "Excellent";
  if (eui < moderateThreshold) return "Good";
  if (eui < moderateThreshold * 1.5) return "Fair";
  return "Poor";
}

// Generate suggestions
export function generateSuggestions(
  eui: number,
  rating: string,
  buildingType: BuildingType
): string[] {
  const suggestions: string[] = [];
  
  if (rating === "Excellent") {
    suggestions.push("Your building has excellent energy efficiency");
    suggestions.push("Continue monitoring to maintain performance");
    suggestions.push("Consider renewable energy sources for further improvement");
  } else if (rating === "Good") {
    suggestions.push("Your building has good energy efficiency");
    suggestions.push("Consider upgrading to LED lighting");
    suggestions.push("Improve insulation in walls and attic");
    suggestions.push("Install programmable thermostats");
  } else if (rating === "Fair") {
    suggestions.push("Your building has moderate energy efficiency");
    suggestions.push("Conduct an energy audit to identify issues");
    suggestions.push("Upgrade to energy-efficient HVAC systems");
    suggestions.push("Seal air leaks around windows and doors");
    suggestions.push("Consider solar panels or renewable energy");
  } else {
    suggestions.push("Your building has poor energy efficiency");
    suggestions.push("Immediate energy audit recommended");
    suggestions.push("Replace old HVAC systems with efficient models");
    suggestions.push("Add insulation to reduce heat loss/gain");
    suggestions.push("Upgrade to energy-efficient windows");
    suggestions.push("Install smart energy management systems");
  }
  
  // Building-specific suggestions
  if (buildingType === "commercial") {
    suggestions.push("Optimize lighting schedules for business hours");
    suggestions.push("Use occupancy sensors for lighting control");
  } else if (buildingType === "industrial") {
    suggestions.push("Optimize equipment operation schedules");
    suggestions.push("Implement waste heat recovery systems");
  }
  
  return suggestions;
}

// Main calculation function
export function calculateEnergyEfficiency(
  buildingArea: number,
  annualEnergy: number,
  occupancy: number,
  buildingType: BuildingType,
  climateZone: ClimateZone,
  unit: Unit
): EnergyCalculation {
  const areaInSqFt = convertToSqFt(buildingArea, unit);
  const eui = calculateEUI(areaInSqFt, annualEnergy);
  const euiPerPerson = calculateEUIPerPerson(annualEnergy, occupancy);
  const efficiencyRating = classifyEfficiency(eui, buildingType, climateZone);
  const suggestions = generateSuggestions(eui, efficiencyRating, buildingType);
  
  return {
    buildingArea,
    annualEnergy,
    occupancy,
    buildingType,
    climateZone,
    unit,
    eui,
    euiPerPerson,
    efficiencyRating,
    suggestions,
    timestamp: Date.now()
  };
}

// Validation
export function validateInputs(
  buildingArea: number,
  annualEnergy: number,
  occupancy: number
): string | null {
  if (buildingArea <= 0) {
    return "Building area must be greater than zero";
  }
  
  if (annualEnergy <= 0) {
    return "Annual energy consumption must be greater than zero";
  }
  
  if (occupancy < 0) {
    return "Occupancy cannot be negative";
  }
  
  if (buildingArea > 1000000) {
    return "Building area is too large";
  }
  
  if (annualEnergy > 100000000) {
    return "Energy consumption value is too large";
  }
  
  return null;
}

// Format numbers
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Get unit label
export function getUnitLabel(unit: Unit): string {
  return unit === "sqft" ? "sq ft" : "m²";
}

// Get building type label
export function getBuildingTypeLabel(type: BuildingType): string {
  const labels = {
    residential: "Residential",
    commercial: "Commercial",
    industrial: "Industrial"
  };
  return labels[type];
}

// Get climate zone label
export function getClimateZoneLabel(zone: ClimateZone): string {
  const labels = {
    cold: "Cold",
    moderate: "Moderate",
    hot: "Hot"
  };
  return labels[zone];
}

// History management
const HISTORY_KEY = "energy-efficiency-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: EnergyCalculation): void {
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

// Export functions
export function exportToText(calculation: EnergyCalculation): string {
  let text = "BUILDING ENERGY EFFICIENCY REPORT\n";
  text += "=".repeat(50) + "\n\n";
  text += `Building Area: ${formatNumber(calculation.buildingArea)} ${getUnitLabel(calculation.unit)}\n`;
  text += `Annual Energy Use: ${formatNumber(calculation.annualEnergy, 0)} kWh\n`;
  text += `Occupancy: ${calculation.occupancy} people\n`;
  text += `Building Type: ${getBuildingTypeLabel(calculation.buildingType)}\n`;
  text += `Climate Zone: ${getClimateZoneLabel(calculation.climateZone)}\n\n`;
  
  text += `RESULTS:\n`;
  text += `Energy Use Intensity (EUI): ${formatNumber(calculation.eui, 2)} kWh/${getUnitLabel(calculation.unit)}/year\n`;
  if (calculation.occupancy > 0) {
    text += `Energy per Person: ${formatNumber(calculation.euiPerPerson, 0)} kWh/person/year\n`;
  }
  text += `Efficiency Rating: ${calculation.efficiencyRating}\n\n`;
  
  text += `RECOMMENDATIONS:\n`;
  calculation.suggestions.forEach((suggestion, i) => {
    text += `${i + 1}. ${suggestion}\n`;
  });
  
  text += `\nGenerated: ${new Date().toLocaleString()}\n`;
  return text;
}

export function exportToCSV(calculation: EnergyCalculation): string {
  let csv = "Metric,Value\n";
  csv += `Building Area,${calculation.buildingArea} ${getUnitLabel(calculation.unit)}\n`;
  csv += `Annual Energy,${calculation.annualEnergy} kWh\n`;
  csv += `Occupancy,${calculation.occupancy}\n`;
  csv += `Building Type,${getBuildingTypeLabel(calculation.buildingType)}\n`;
  csv += `Climate Zone,${getClimateZoneLabel(calculation.climateZone)}\n`;
  csv += `EUI,${formatNumber(calculation.eui, 2)} kWh/${getUnitLabel(calculation.unit)}/year\n`;
  csv += `Energy per Person,${formatNumber(calculation.euiPerPerson, 0)} kWh/person/year\n`;
  csv += `Efficiency Rating,${calculation.efficiencyRating}\n`;
  return csv;
}

export function downloadFile(content: string, filename: string, type: string = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
