import {
  Unit,
  RetainingWallInputs,
  RetainingWallCalculation,
  WallPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "retaining-wall-history";
const MAX_HISTORY = 10;

// Convert between units
export function convertLength(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  // metric to imperial: multiply by 3.28084 (m to ft)
  // imperial to metric: divide by 3.28084 (ft to m)
  if (fromUnit === "metric" && toUnit === "imperial") {
    return value * 3.28084;
  } else {
    return value / 3.28084;
  }
}

// Calculate earth pressure coefficient (Ka) using Rankine theory
export function calculateEarthPressureCoefficient(
  frictionAngle: number,
  backfillSlope: number = 0
): number {
  // Convert to radians
  const phiRad = (frictionAngle * Math.PI) / 180;
  const betaRad = (backfillSlope * Math.PI) / 180;
  
  // Simplified Rankine formula for active earth pressure
  // Ka = cos(β) × [cos(β) - sqrt(cos²(β) - cos²(φ))] / [cos(β) + sqrt(cos²(β) - cos²(φ))]
  // For β = 0 (horizontal backfill): Ka = tan²(45° - φ/2)
  
  if (backfillSlope === 0) {
    return Math.pow(Math.tan(Math.PI / 4 - phiRad / 2), 2);
  }
  
  // Simplified approximation for sloped backfill
  const cosBeta = Math.cos(betaRad);
  const cosPhi = Math.cos(phiRad);
  const term = Math.pow(cosBeta, 2) - Math.pow(cosPhi, 2);
  
  if (term < 0) {
    // Fallback to horizontal case if calculation is invalid
    return Math.pow(Math.tan(Math.PI / 4 - phiRad / 2), 2);
  }
  
  const sqrtTerm = Math.sqrt(term);
  const Ka = cosBeta * (cosBeta - sqrtTerm) / (cosBeta + sqrtTerm);
  
  return Math.max(0.2, Math.min(Ka, 1.0)); // Clamp between reasonable values
}

// Calculate lateral force and pressure
export function calculateLateralForce(
  Ka: number,
  soilDensity: number,
  wallHeight: number
): { force: number; pressure: number } {
  // Lateral force per unit length: P = 0.5 × Ka × γ × H²
  const force = 0.5 * Ka * soilDensity * Math.pow(wallHeight, 2);
  
  // Maximum lateral pressure at base: p = Ka × γ × H
  const pressure = Ka * soilDensity * wallHeight;
  
  return {
    force: parseFloat(force.toFixed(2)),
    pressure: parseFloat(pressure.toFixed(2))
  };
}

// Estimate recommended base width
export function calculateBaseWidth(wallHeight: number, safetyFactor: number): number {
  // Rule of thumb: base width = 0.5 to 0.7 × wall height
  // Adjust based on safety factor
  const baseRatio = 0.5 + (safetyFactor - 1.0) * 0.1;
  return parseFloat((wallHeight * Math.min(baseRatio, 0.7)).toFixed(2));
}

// Calculate volumes
export function calculateVolumes(
  wallHeight: number,
  wallLength: number,
  wallThickness: number,
  baseWidth: number
): { concrete: number; backfill: number } {
  // Concrete volume (simplified rectangular wall)
  const concrete = wallHeight * wallLength * wallThickness;
  
  // Backfill volume (triangular approximation behind wall)
  const backfill = 0.5 * wallHeight * (baseWidth - wallThickness) * wallLength;
  
  return {
    concrete: parseFloat(concrete.toFixed(2)),
    backfill: parseFloat(backfill.toFixed(2))
  };
}

// Get status based on calculations
export function getStatus(
  wallHeight: number,
  lateralForce: number,
  safetyFactor: number
): "safe" | "caution" | "unsafe" {
  // Simple heuristic based on wall height and safety factor
  if (safetyFactor >= 2.0 && wallHeight <= 3.0) return "safe";
  if (safetyFactor >= 1.5 && wallHeight <= 4.0) return "caution";
  if (wallHeight > 6.0 || safetyFactor < 1.5) return "unsafe";
  return "caution";
}

// Generate engineering notes
export function generateNotes(calculation: RetainingWallCalculation): string[] {
  const notes: string[] = [];
  
  if (calculation.wallHeight > 6.0) {
    notes.push("High wall - professional structural engineering required");
  } else if (calculation.wallHeight > 4.0) {
    notes.push("Medium to high wall - consider professional design review");
  } else if (calculation.wallHeight > 2.0) {
    notes.push("Standard wall height - verify local building codes");
  } else {
    notes.push("Low wall - suitable for basic applications");
  }
  
  if (calculation.safetyFactor < 1.5) {
    notes.push("Low safety factor - increase base width or wall thickness");
  } else if (calculation.safetyFactor >= 2.0) {
    notes.push("Good safety factor - design has adequate margin");
  }
  
  if (calculation.backfillSlope > 20) {
    notes.push("Sloped backfill increases lateral pressure significantly");
  }
  
  if (calculation.frictionAngle < 25) {
    notes.push("Low friction angle - consider soil improvement or drainage");
  } else if (calculation.frictionAngle > 35) {
    notes.push("Good soil friction angle - favorable for stability");
  }
  
  if (calculation.lateralForce > 50) {
    notes.push("High lateral force - ensure adequate foundation design");
  }
  
  notes.push("These are preliminary estimates - consult a structural engineer for final design");
  notes.push("Consider drainage system behind wall to reduce hydrostatic pressure");
  
  return notes;
}

// Main calculation function
export function calculateRetainingWall(inputs: RetainingWallInputs): RetainingWallCalculation {
  const {
    wallHeight,
    wallLength,
    wallThickness,
    soilDensity,
    frictionAngle,
    backfillSlope,
    safetyFactor,
    unit
  } = inputs;
  
  // Convert to metric if needed for calculations
  const H = unit === "imperial" ? wallHeight / 3.28084 : wallHeight;
  const L = unit === "imperial" ? wallLength / 3.28084 : wallLength;
  const T = unit === "imperial" ? wallThickness / 3.28084 : wallThickness;
  const gamma = unit === "imperial" ? soilDensity * 0.157 : soilDensity; // pcf to kN/m³
  
  // Calculate earth pressure coefficient
  const Ka = calculateEarthPressureCoefficient(frictionAngle, backfillSlope);
  
  // Calculate lateral force and pressure
  const { force, pressure } = calculateLateralForce(Ka, gamma, H);
  
  // Calculate recommended base width
  const baseWidth = calculateBaseWidth(H, safetyFactor);
  
  // Calculate volumes
  const { concrete, backfill } = calculateVolumes(H, L, T, baseWidth);
  
  // Determine status
  const status = getStatus(H, force, safetyFactor);
  
  const calculation: RetainingWallCalculation = {
    id: Date.now().toString(),
    wallHeight,
    wallLength,
    wallThickness,
    soilDensity,
    frictionAngle,
    backfillSlope,
    safetyFactor,
    unit,
    earthPressureCoefficient: parseFloat(Ka.toFixed(3)),
    lateralForce: force,
    lateralPressure: pressure,
    recommendedBaseWidth: unit === "imperial" ? parseFloat((baseWidth * 3.28084).toFixed(2)) : baseWidth,
    concreteVolume: unit === "imperial" ? parseFloat((concrete * 35.3147).toFixed(2)) : concrete,
    backfillVolume: unit === "imperial" ? parseFloat((backfill * 35.3147).toFixed(2)) : backfill,
    status,
    notes: []
  };
  
  calculation.notes = generateNotes(calculation);
  
  return calculation;
}

// Wall presets
export function getWallPresets(): WallPreset[] {
  return [
    {
      name: "Small Garden Wall",
      description: "Low decorative or garden wall",
      wallHeight: 1.0,
      wallLength: 5.0,
      wallThickness: 0.2,
      soilDensity: 18,
      frictionAngle: 30,
      backfillSlope: 0
    },
    {
      name: "Standard Retaining Wall",
      description: "Typical residential retaining wall",
      wallHeight: 2.0,
      wallLength: 10.0,
      wallThickness: 0.3,
      soilDensity: 18,
      frictionAngle: 30,
      backfillSlope: 0
    },
    {
      name: "Medium Height Wall",
      description: "Commercial or larger residential wall",
      wallHeight: 3.0,
      wallLength: 15.0,
      wallThickness: 0.4,
      soilDensity: 18,
      frictionAngle: 32,
      backfillSlope: 0
    },
    {
      name: "Tall Retaining Wall",
      description: "Large commercial or infrastructure wall",
      wallHeight: 4.0,
      wallLength: 20.0,
      wallThickness: 0.5,
      soilDensity: 18,
      frictionAngle: 32,
      backfillSlope: 0
    },
    {
      name: "Sloped Backfill Wall",
      description: "Wall with sloped terrain behind",
      wallHeight: 2.5,
      wallLength: 10.0,
      wallThickness: 0.35,
      soilDensity: 18,
      frictionAngle: 30,
      backfillSlope: 15
    }
  ];
}

// History management
export function saveToHistory(calculation: RetainingWallCalculation): void {
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
export function exportToText(calculation: RetainingWallCalculation): string {
  const unitLabel = calculation.unit === "metric" ? "m" : "ft";
  const volumeUnit = calculation.unit === "metric" ? "m³" : "ft³";
  const pressureUnit = calculation.unit === "metric" ? "kN/m" : "lb/ft";
  
  const lines = [
    "RETAINING WALL CALCULATION REPORT",
    "=".repeat(50),
    "",
    "INPUT PARAMETERS:",
    `Wall Height: ${formatNumber(calculation.wallHeight)} ${unitLabel}`,
    `Wall Length: ${formatNumber(calculation.wallLength)} ${unitLabel}`,
    `Wall Thickness: ${formatNumber(calculation.wallThickness)} ${unitLabel}`,
    `Soil Density: ${formatNumber(calculation.soilDensity)} ${calculation.unit === "metric" ? "kN/m³" : "pcf"}`,
    `Friction Angle: ${formatNumber(calculation.frictionAngle)}°`,
    `Backfill Slope: ${formatNumber(calculation.backfillSlope)}°`,
    `Safety Factor: ${calculation.safetyFactor}`,
    "",
    "RESULTS:",
    `Earth Pressure Coefficient (Ka): ${calculation.earthPressureCoefficient}`,
    `Lateral Force: ${formatNumber(calculation.lateralForce)} ${pressureUnit}`,
    `Lateral Pressure: ${formatNumber(calculation.lateralPressure)} ${calculation.unit === "metric" ? "kN/m²" : "psf"}`,
    `Recommended Base Width: ${formatNumber(calculation.recommendedBaseWidth)} ${unitLabel}`,
    `Concrete Volume: ${formatNumber(calculation.concreteVolume)} ${volumeUnit}`,
    `Backfill Volume: ${formatNumber(calculation.backfillVolume)} ${volumeUnit}`,
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

export function exportToCSV(calculation: RetainingWallCalculation): string {
  const unitLabel = calculation.unit === "metric" ? "m" : "ft";
  const volumeUnit = calculation.unit === "metric" ? "m³" : "ft³";
  
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Wall Height", calculation.wallHeight.toString(), unitLabel],
    ["Wall Length", calculation.wallLength.toString(), unitLabel],
    ["Wall Thickness", calculation.wallThickness.toString(), unitLabel],
    ["Soil Density", calculation.soilDensity.toString(), calculation.unit === "metric" ? "kN/m³" : "pcf"],
    ["Friction Angle", calculation.frictionAngle.toString(), "degrees"],
    ["Backfill Slope", calculation.backfillSlope.toString(), "degrees"],
    ["Safety Factor", calculation.safetyFactor.toString(), ""],
    ["Earth Pressure Coefficient", calculation.earthPressureCoefficient.toString(), ""],
    ["Lateral Force", calculation.lateralForce.toString(), calculation.unit === "metric" ? "kN/m" : "lb/ft"],
    ["Lateral Pressure", calculation.lateralPressure.toString(), calculation.unit === "metric" ? "kN/m²" : "psf"],
    ["Recommended Base Width", calculation.recommendedBaseWidth.toString(), unitLabel],
    ["Concrete Volume", calculation.concreteVolume.toString(), volumeUnit],
    ["Backfill Volume", calculation.backfillVolume.toString(), volumeUnit],
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
    case "caution":
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
    case "caution":
      return "bg-yellow-50 border-yellow-200";
    case "unsafe":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}
