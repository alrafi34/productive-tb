import {
  Unit,
  SlopeStabilityInputs,
  SlopeStabilityCalculation,
  SoilPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "slope-stability-history";
const MAX_HISTORY = 10;

// Calculate Factor of Safety using simplified infinite slope model
export function calculateFactorOfSafety(inputs: SlopeStabilityInputs): number {
  const {
    slopeAngle,
    slopeHeight,
    cohesion,
    frictionAngle,
    unitWeight,
    poreWaterPressureRatio
  } = inputs;
  
  // Convert angles to radians
  const thetaRad = (slopeAngle * Math.PI) / 180;
  const phiRad = (frictionAngle * Math.PI) / 180;
  
  // Assume failure depth is approximately 50% of slope height
  const z = slopeHeight * 0.5;
  
  // Calculate components
  const cosTheta = Math.cos(thetaRad);
  const sinTheta = Math.sin(thetaRad);
  const tanPhi = Math.tan(phiRad);
  
  // Simplified infinite slope formula with pore water pressure
  // FoS = (c + (γ × z × cos²θ × tanφ × (1 - ru))) / (γ × z × sinθ × cosθ)
  
  const numerator = cohesion + (unitWeight * z * Math.pow(cosTheta, 2) * tanPhi * (1 - poreWaterPressureRatio));
  const denominator = unitWeight * z * sinTheta * cosTheta;
  
  // Prevent division by zero
  if (denominator === 0 || slopeAngle === 0) {
    return 999; // Very high FoS for flat slope
  }
  
  const FoS = numerator / denominator;
  
  // Clamp to reasonable range
  return Math.max(0.1, Math.min(FoS, 10));
}

// Get stability status based on Factor of Safety
export function getStabilityStatus(FoS: number): "stable" | "marginal" | "unstable" {
  if (FoS >= 1.3) return "stable";
  if (FoS >= 1.0) return "marginal";
  return "unstable";
}

// Generate engineering notes
export function generateNotes(calculation: SlopeStabilityCalculation): string[] {
  const notes: string[] = [];
  const { factorOfSafety, slopeAngle, cohesion, frictionAngle, poreWaterPressureRatio } = calculation;
  
  // FoS-based notes
  if (factorOfSafety >= 1.5) {
    notes.push("Excellent stability - slope has good safety margin");
  } else if (factorOfSafety >= 1.3) {
    notes.push("Adequate stability - meets typical engineering standards");
  } else if (factorOfSafety >= 1.0) {
    notes.push("Marginal stability - consider slope reinforcement or flattening");
  } else {
    notes.push("Unstable slope - immediate remedial action required");
  }
  
  // Slope angle notes
  if (slopeAngle > 45) {
    notes.push("Very steep slope - consider terracing or retaining structures");
  } else if (slopeAngle > 35) {
    notes.push("Steep slope - ensure adequate drainage and vegetation");
  } else if (slopeAngle < 15) {
    notes.push("Gentle slope - generally stable for most soil conditions");
  }
  
  // Cohesion notes
  if (cohesion < 10) {
    notes.push("Low cohesion - slope relies primarily on friction for stability");
  } else if (cohesion > 50) {
    notes.push("High cohesion - cohesive strength contributes significantly to stability");
  }
  
  // Friction angle notes
  if (frictionAngle < 20) {
    notes.push("Low friction angle - typical of clay soils, consider drainage improvement");
  } else if (frictionAngle > 35) {
    notes.push("High friction angle - typical of sandy/gravelly soils");
  }
  
  // Water condition notes
  if (poreWaterPressureRatio > 0.5) {
    notes.push("High pore water pressure - drainage system critical for stability");
  } else if (poreWaterPressureRatio > 0.3) {
    notes.push("Moderate pore water pressure - ensure adequate drainage");
  } else if (poreWaterPressureRatio === 0) {
    notes.push("Dry conditions assumed - actual water conditions may reduce stability");
  }
  
  // General recommendations
  if (factorOfSafety < 1.3) {
    notes.push("Consider: flattening slope, installing drainage, or adding retaining structures");
  }
  
  notes.push("This is a simplified analysis - detailed geotechnical investigation recommended");
  
  return notes;
}

// Main calculation function
export function calculateSlopeStability(inputs: SlopeStabilityInputs): SlopeStabilityCalculation {
  const {
    slopeAngle,
    slopeHeight,
    cohesion,
    frictionAngle,
    unitWeight,
    poreWaterPressureRatio,
    unit
  } = inputs;
  
  // Convert to metric if needed for calculations
  const H = unit === "imperial" ? slopeHeight / 3.28084 : slopeHeight;
  const c = unit === "imperial" ? cohesion * 0.0479 : cohesion; // psf to kPa
  const gamma = unit === "imperial" ? unitWeight * 0.157 : unitWeight; // pcf to kN/m³
  
  // Calculate Factor of Safety
  const FoS = calculateFactorOfSafety({
    slopeAngle,
    slopeHeight: H,
    cohesion: c,
    frictionAngle,
    unitWeight: gamma,
    poreWaterPressureRatio,
    unit: "metric"
  });
  
  // Determine status
  const status = getStabilityStatus(FoS);
  
  // Calculate failure depth (assumed at 50% of height)
  const failureDepth = H * 0.5;
  
  const calculation: SlopeStabilityCalculation = {
    id: Date.now().toString(),
    slopeAngle,
    slopeHeight,
    cohesion,
    frictionAngle,
    unitWeight,
    poreWaterPressureRatio,
    unit,
    factorOfSafety: parseFloat(FoS.toFixed(2)),
    status,
    failureDepth: unit === "imperial" ? parseFloat((failureDepth * 3.28084).toFixed(2)) : parseFloat(failureDepth.toFixed(2)),
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
      description: "Low strength cohesive soil",
      cohesion: 15,
      frictionAngle: 10,
      unitWeight: 16
    },
    {
      name: "Stiff Clay",
      description: "Medium strength cohesive soil",
      cohesion: 40,
      frictionAngle: 15,
      unitWeight: 18
    },
    {
      name: "Loose Sand",
      description: "Low density granular soil",
      cohesion: 0,
      frictionAngle: 28,
      unitWeight: 16
    },
    {
      name: "Dense Sand",
      description: "High density granular soil",
      cohesion: 0,
      frictionAngle: 38,
      unitWeight: 20
    },
    {
      name: "Silty Soil",
      description: "Mixed fine-grained soil",
      cohesion: 20,
      frictionAngle: 25,
      unitWeight: 17
    },
    {
      name: "Gravel",
      description: "Coarse granular material",
      cohesion: 0,
      frictionAngle: 40,
      unitWeight: 20
    }
  ];
}

// History management
export function saveToHistory(calculation: SlopeStabilityCalculation): void {
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
export function exportToText(calculation: SlopeStabilityCalculation): string {
  const unitLabel = calculation.unit === "metric" ? "m" : "ft";
  const cohesionUnit = calculation.unit === "metric" ? "kPa" : "psf";
  const weightUnit = calculation.unit === "metric" ? "kN/m³" : "pcf";
  
  const lines = [
    "SLOPE STABILITY ANALYSIS REPORT",
    "=".repeat(50),
    "",
    "INPUT PARAMETERS:",
    `Slope Angle: ${formatNumber(calculation.slopeAngle)}°`,
    `Slope Height: ${formatNumber(calculation.slopeHeight)} ${unitLabel}`,
    `Cohesion: ${formatNumber(calculation.cohesion)} ${cohesionUnit}`,
    `Friction Angle: ${formatNumber(calculation.frictionAngle)}°`,
    `Unit Weight: ${formatNumber(calculation.unitWeight)} ${weightUnit}`,
    `Pore Water Pressure Ratio: ${formatNumber(calculation.poreWaterPressureRatio)}`,
    "",
    "RESULTS:",
    `Factor of Safety (FoS): ${calculation.factorOfSafety}`,
    `Stability Status: ${calculation.status.toUpperCase()}`,
    `Assumed Failure Depth: ${formatNumber(calculation.failureDepth)} ${unitLabel}`,
    "",
    "ENGINEERING NOTES:",
    ...calculation.notes.map((note, i) => `${i + 1}. ${note}`),
    "",
    `Generated: ${new Date().toLocaleString()}`,
    ""
  ];
  
  return lines.join("\n");
}

export function exportToCSV(calculation: SlopeStabilityCalculation): string {
  const unitLabel = calculation.unit === "metric" ? "m" : "ft";
  const cohesionUnit = calculation.unit === "metric" ? "kPa" : "psf";
  const weightUnit = calculation.unit === "metric" ? "kN/m³" : "pcf";
  
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Slope Angle", calculation.slopeAngle.toString(), "degrees"],
    ["Slope Height", calculation.slopeHeight.toString(), unitLabel],
    ["Cohesion", calculation.cohesion.toString(), cohesionUnit],
    ["Friction Angle", calculation.frictionAngle.toString(), "degrees"],
    ["Unit Weight", calculation.unitWeight.toString(), weightUnit],
    ["Pore Water Pressure Ratio", calculation.poreWaterPressureRatio.toString(), ""],
    ["Factor of Safety", calculation.factorOfSafety.toString(), ""],
    ["Failure Depth", calculation.failureDepth.toString(), unitLabel],
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
    case "stable":
      return "text-green-700";
    case "marginal":
      return "text-yellow-700";
    case "unstable":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case "stable":
      return "bg-green-50 border-green-200";
    case "marginal":
      return "bg-yellow-50 border-yellow-200";
    case "unstable":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

export function getProgressBarColor(status: string): string {
  switch (status) {
    case "stable":
      return "bg-green-500";
    case "marginal":
      return "bg-yellow-500";
    case "unstable":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
