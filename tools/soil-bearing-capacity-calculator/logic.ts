import {
  SoilType,
  WaterTablePosition,
  Unit,
  BearingCapacityInputs,
  BearingCapacityFactors,
  BearingCapacityCalculation,
  SoilPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "soil-bearing-capacity-history";
const MAX_HISTORY = 10;

// Calculate bearing capacity factors based on friction angle
export function calculateBearingCapacityFactors(frictionAngle: number): BearingCapacityFactors {
  // Convert to radians
  const phiRad = (frictionAngle * Math.PI) / 180;
  
  // For pure clay (φ = 0)
  if (frictionAngle === 0) {
    return {
      Nc: 5.7,
      Nq: 1.0,
      Ngamma: 0.0
    };
  }
  
  // Terzaghi's bearing capacity factors
  const Nq = Math.exp(Math.PI * Math.tan(phiRad)) * Math.pow(Math.tan(Math.PI / 4 + phiRad / 2), 2);
  const Nc = (Nq - 1) / Math.tan(phiRad);
  const Ngamma = 2 * (Nq + 1) * Math.tan(phiRad);
  
  return {
    Nc: parseFloat(Nc.toFixed(2)),
    Nq: parseFloat(Nq.toFixed(2)),
    Ngamma: parseFloat(Ngamma.toFixed(2))
  };
}

// Calculate water table adjustment factor
export function getWaterTableAdjustment(position: WaterTablePosition): number {
  switch (position) {
    case "low":
      return 0; // No adjustment
    case "medium":
      return 10; // 10% reduction
    case "high":
      return 20; // 20% reduction
    default:
      return 0;
  }
}

// Get status based on safe bearing capacity
export function getStatus(safeBearingCapacity: number): "safe" | "moderate" | "unsafe" {
  if (safeBearingCapacity >= 150) return "safe";
  if (safeBearingCapacity >= 75) return "moderate";
  return "unsafe";
}

// Generate engineering notes
export function generateNotes(calculation: BearingCapacityCalculation): string[] {
  const notes: string[] = [];
  
  if (calculation.frictionAngle === 0) {
    notes.push("Pure cohesive soil (clay) - bearing capacity depends primarily on cohesion");
  }
  
  if (calculation.waterTablePosition === "high") {
    notes.push("High water table significantly reduces bearing capacity - consider dewatering");
  } else if (calculation.waterTablePosition === "medium") {
    notes.push("Water table at foundation level - moderate reduction in bearing capacity");
  }
  
  if (calculation.safeBearingCapacity < 75) {
    notes.push("Low bearing capacity - consider deep foundation or soil improvement");
  } else if (calculation.safeBearingCapacity < 150) {
    notes.push("Moderate bearing capacity - verify with soil testing before construction");
  } else {
    notes.push("Good bearing capacity - suitable for most shallow foundation types");
  }
  
  if (calculation.factorOfSafety < 2.5) {
    notes.push("Consider increasing factor of safety for critical structures");
  }
  
  if (calculation.foundationDepth < 1.0) {
    notes.push("Shallow foundation depth - ensure frost protection and scour protection");
  }
  
  notes.push("These are preliminary estimates - conduct detailed soil investigation for final design");
  
  return notes;
}

// Main calculation function
export function calculateBearingCapacity(inputs: BearingCapacityInputs): BearingCapacityCalculation {
  const {
    soilType,
    foundationWidth,
    foundationDepth,
    unitWeight,
    cohesion,
    frictionAngle,
    factorOfSafety,
    waterTablePosition,
    unit
  } = inputs;
  
  // Convert to meters if needed
  const B = unit === "ft" ? foundationWidth * 0.3048 : foundationWidth;
  const Df = unit === "ft" ? foundationDepth * 0.3048 : foundationDepth;
  const gamma = unitWeight;
  const c = cohesion;
  
  // Calculate bearing capacity factors
  const factors = calculateBearingCapacityFactors(frictionAngle);
  
  // Terzaghi's bearing capacity equation
  // q_ult = c*Nc + γ*Df*Nq + 0.5*γ*B*Nγ
  const ultimateBearingCapacity = 
    (c * factors.Nc) + 
    (gamma * Df * factors.Nq) + 
    (0.5 * gamma * B * factors.Ngamma);
  
  // Apply water table adjustment
  const waterTableAdjustment = getWaterTableAdjustment(waterTablePosition);
  const adjustedUltimate = ultimateBearingCapacity * (1 - waterTableAdjustment / 100);
  
  // Calculate safe bearing capacity
  const safeBearingCapacity = adjustedUltimate / factorOfSafety;
  
  const calculation: BearingCapacityCalculation = {
    id: Date.now().toString(),
    soilType,
    foundationWidth,
    foundationDepth,
    unitWeight,
    cohesion,
    frictionAngle,
    factorOfSafety,
    waterTablePosition,
    unit,
    bearingCapacityFactors: factors,
    ultimateBearingCapacity: parseFloat(adjustedUltimate.toFixed(2)),
    safeBearingCapacity: parseFloat(safeBearingCapacity.toFixed(2)),
    waterTableAdjustment,
    status: getStatus(safeBearingCapacity),
    notes: []
  };
  
  calculation.notes = generateNotes(calculation);
  
  return calculation;
}

// Soil presets
export function getSoilPresets(): SoilPreset[] {
  return [
    {
      name: "Soft Clay",
      type: "clay",
      description: "Low strength cohesive soil",
      typicalCohesion: 25,
      typicalFrictionAngle: 0,
      typicalUnitWeight: 16
    },
    {
      name: "Medium Clay",
      type: "clay",
      description: "Moderate strength cohesive soil",
      typicalCohesion: 50,
      typicalFrictionAngle: 0,
      typicalUnitWeight: 18
    },
    {
      name: "Stiff Clay",
      type: "clay",
      description: "High strength cohesive soil",
      typicalCohesion: 100,
      typicalFrictionAngle: 0,
      typicalUnitWeight: 20
    },
    {
      name: "Loose Sand",
      type: "sand",
      description: "Low density granular soil",
      typicalCohesion: 0,
      typicalFrictionAngle: 28,
      typicalUnitWeight: 16
    },
    {
      name: "Medium Sand",
      type: "sand",
      description: "Medium density granular soil",
      typicalCohesion: 0,
      typicalFrictionAngle: 32,
      typicalUnitWeight: 18
    },
    {
      name: "Dense Sand",
      type: "sand",
      description: "High density granular soil",
      typicalCohesion: 0,
      typicalFrictionAngle: 38,
      typicalUnitWeight: 20
    },
    {
      name: "Silt",
      type: "silt",
      description: "Fine-grained soil",
      typicalCohesion: 15,
      typicalFrictionAngle: 28,
      typicalUnitWeight: 17
    },
    {
      name: "Gravel",
      type: "gravel",
      description: "Coarse granular soil",
      typicalCohesion: 0,
      typicalFrictionAngle: 35,
      typicalUnitWeight: 20
    },
    {
      name: "Rock",
      type: "rock",
      description: "Very high strength material",
      typicalCohesion: 500,
      typicalFrictionAngle: 45,
      typicalUnitWeight: 25
    }
  ];
}

// History management
export function saveToHistory(calculation: BearingCapacityCalculation): void {
  if (typeof window === "undefined") return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    calculation
  };
  
  const newHistory = [entry, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
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
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(calculation: BearingCapacityCalculation): string {
  const lines = [
    "SOIL BEARING CAPACITY CALCULATION REPORT",
    "=" .repeat(50),
    "",
    "INPUT PARAMETERS:",
    `Soil Type: ${calculation.soilType.charAt(0).toUpperCase() + calculation.soilType.slice(1)}`,
    `Foundation Width: ${formatNumber(calculation.foundationWidth)} ${calculation.unit}`,
    `Foundation Depth: ${formatNumber(calculation.foundationDepth)} ${calculation.unit}`,
    `Unit Weight of Soil: ${formatNumber(calculation.unitWeight)} kN/m³`,
    `Cohesion: ${formatNumber(calculation.cohesion)} kPa`,
    `Angle of Internal Friction: ${formatNumber(calculation.frictionAngle)}°`,
    `Factor of Safety: ${calculation.factorOfSafety}`,
    `Water Table Position: ${calculation.waterTablePosition.charAt(0).toUpperCase() + calculation.waterTablePosition.slice(1)}`,
    "",
    "BEARING CAPACITY FACTORS:",
    `Nc: ${calculation.bearingCapacityFactors.Nc}`,
    `Nq: ${calculation.bearingCapacityFactors.Nq}`,
    `Nγ: ${calculation.bearingCapacityFactors.Ngamma}`,
    "",
    "RESULTS:",
    `Ultimate Bearing Capacity: ${formatNumber(calculation.ultimateBearingCapacity)} kN/m²`,
    `Safe Bearing Capacity: ${formatNumber(calculation.safeBearingCapacity)} kN/m²`,
    `Water Table Adjustment: ${calculation.waterTableAdjustment}%`,
    `Status: ${calculation.status.toUpperCase()}`,
    "",
    "ENGINEERING NOTES:",
    ...calculation.notes.map((note, i) => `${i + 1}. ${note}`),
    "",
    `Generated: ${new Date().toLocaleString()}`,
    ""
  ];
  
  return lines.join("\n");
}

export function exportToCSV(calculation: BearingCapacityCalculation): string {
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Soil Type", calculation.soilType, ""],
    ["Foundation Width", calculation.foundationWidth.toString(), calculation.unit],
    ["Foundation Depth", calculation.foundationDepth.toString(), calculation.unit],
    ["Unit Weight", calculation.unitWeight.toString(), "kN/m³"],
    ["Cohesion", calculation.cohesion.toString(), "kPa"],
    ["Friction Angle", calculation.frictionAngle.toString(), "degrees"],
    ["Factor of Safety", calculation.factorOfSafety.toString(), ""],
    ["Water Table", calculation.waterTablePosition, ""],
    ["Nc Factor", calculation.bearingCapacityFactors.Nc.toString(), ""],
    ["Nq Factor", calculation.bearingCapacityFactors.Nq.toString(), ""],
    ["Nγ Factor", calculation.bearingCapacityFactors.Ngamma.toString(), ""],
    ["Ultimate Bearing Capacity", calculation.ultimateBearingCapacity.toString(), "kN/m²"],
    ["Safe Bearing Capacity", calculation.safeBearingCapacity.toString(), "kN/m²"],
    ["Water Table Adjustment", calculation.waterTableAdjustment.toString(), "%"],
    ["Status", calculation.status, ""]
  ];
  
  return rows.map(row => row.join(",")).join("\n");
}

export function downloadFile(content: string, filename: string, type: string = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Utility functions
export function formatNumber(num: number): string {
  return num.toFixed(2);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "safe":
      return "text-green-700";
    case "moderate":
      return "text-yellow-700";
    case "unsafe":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case "safe":
      return "bg-green-50 border-green-200";
    case "moderate":
      return "bg-yellow-50 border-yellow-200";
    case "unsafe":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}
