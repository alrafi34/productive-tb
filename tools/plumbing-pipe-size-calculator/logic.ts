import { 
  FlowRateUnit, 
  VelocityUnit, 
  PipeMaterial, 
  CalculationMode,
  PlumbingPipeInputs, 
  PlumbingPipeCalculation, 
  PlumbingPipePreset,
  HistoryEntry 
} from "./types";

const HISTORY_KEY = "plumbing-pipe-calculator-history";
const MAX_HISTORY = 10;

/**
 * Convert flow rate to m³/s
 */
function convertFlowRateToSI(value: number, unit: FlowRateUnit): number {
  switch (unit) {
    case "liters-per-second":
      return value / 1000;
    case "cubic-meters-per-hour":
      return value / 3600;
    case "gallons-per-minute":
      return value * 0.00006309;
    case "cubic-feet-per-second":
      return value * 0.0283168;
    default:
      return value;
  }
}

/**
 * Convert velocity to m/s
 */
function convertVelocityToSI(value: number, unit: VelocityUnit): number {
  switch (unit) {
    case "meters-per-second":
      return value;
    case "feet-per-second":
      return value * 0.3048;
    default:
      return value;
  }
}

/**
 * Calculate pipe diameter using continuity equation
 * D = √((4 × Q) / (π × V))
 */
export function calculatePlumbingPipe(inputs: PlumbingPipeInputs): PlumbingPipeCalculation {
  const { mode, flowRate, flowRateUnit, velocity, velocityUnit, diameter, pipeMaterial } = inputs;
  
  let Q = 0; // Flow rate in m³/s
  let V = 0; // Velocity in m/s
  let D = 0; // Diameter in mm
  const notes: string[] = [];
  
  if (mode === "diameter") {
    // Calculate diameter from flow rate and velocity
    if (!flowRate || !velocity) {
      throw new Error("Flow rate and velocity are required");
    }
    
    Q = convertFlowRateToSI(flowRate, flowRateUnit);
    V = convertVelocityToSI(velocity, velocityUnit);
    
    // D = √((4 × Q) / (π × V))
    D = Math.sqrt((4 * Q) / (Math.PI * V)) * 1000; // Convert to mm
    
    notes.push(`Calculated diameter from flow rate and velocity`);
  } else if (mode === "velocity") {
    // Calculate velocity from flow rate and diameter
    if (!flowRate || !diameter) {
      throw new Error("Flow rate and diameter are required");
    }
    
    Q = convertFlowRateToSI(flowRate, flowRateUnit);
    D = diameter;
    
    // V = Q / A, where A = π × (D/2)²
    const A = Math.PI * Math.pow((D / 1000) / 2, 2);
    V = Q / A;
    
    notes.push(`Calculated velocity from flow rate and diameter`);
  } else if (mode === "flow-rate") {
    // Calculate flow rate from velocity and diameter
    if (!velocity || !diameter) {
      throw new Error("Velocity and diameter are required");
    }
    
    V = convertVelocityToSI(velocity, velocityUnit);
    D = diameter;
    
    // Q = A × V, where A = π × (D/2)²
    const A = Math.PI * Math.pow((D / 1000) / 2, 2);
    Q = A * V;
    
    notes.push(`Calculated flow rate from velocity and diameter`);
  }
  
  // Calculate cross-sectional area
  const crossSectionalArea = Math.PI * Math.pow((D / 1000) / 2, 2);
  
  // Add velocity recommendations based on pipe material
  const velocityRange = getRecommendedVelocityRange(pipeMaterial);
  if (V < velocityRange.min) {
    notes.push(`⚠️ Velocity below recommended range (${velocityRange.min}-${velocityRange.max} m/s) - risk of sedimentation`);
  } else if (V > velocityRange.max) {
    notes.push(`⚠️ Velocity above recommended range (${velocityRange.min}-${velocityRange.max} m/s) - risk of noise and erosion`);
  } else {
    notes.push(`✓ Velocity within recommended range (${velocityRange.min}-${velocityRange.max} m/s)`);
  }
  
  // Add flow rate notes
  if (Q < 0.0001) {
    notes.push("Very low flow rate - consider smaller pipe size");
  } else if (Q > 0.1) {
    notes.push("High flow rate - verify pipe material can handle pressure");
  }
  
  // Convert to display units
  const flowRateInLitersPerSecond = Q * 1000;
  const flowRateInGPM = Q / 0.00006309;
  const velocityInMetersPerSecond = V;
  const velocityInFeetPerSecond = V / 0.3048;
  
  return {
    mode,
    flowRate: Q,
    velocity: V,
    diameter: D,
    flowRateUnit,
    velocityUnit,
    pipeMaterial,
    diameterInMm: D,
    diameterInInches: D / 25.4,
    crossSectionalArea,
    flowRateInLitersPerSecond,
    flowRateInGPM,
    velocityInMetersPerSecond,
    velocityInFeetPerSecond,
    timestamp: Date.now(),
    notes
  };
}

function getRecommendedVelocityRange(material: PipeMaterial): { min: number; max: number } {
  switch (material) {
    case "pvc":
      return { min: 0.6, max: 2.5 };
    case "copper":
      return { min: 0.9, max: 3.0 };
    case "steel":
      return { min: 1.0, max: 3.5 };
    case "cast-iron":
      return { min: 0.6, max: 2.0 };
    default:
      return { min: 0.6, max: 3.0 };
  }
}

export function getPlumbingPipePresets(): PlumbingPipePreset[] {
  return [
    {
      name: "Residential Water Supply",
      description: "Typical house main line",
      flowRate: 1.5,
      flowRateUnit: "liters-per-second",
      velocity: 1.5,
      velocityUnit: "meters-per-second",
      pipeMaterial: "copper",
      category: "Residential"
    },
    {
      name: "Kitchen Sink",
      description: "Standard kitchen fixture",
      flowRate: 0.3,
      flowRateUnit: "liters-per-second",
      velocity: 1.2,
      velocityUnit: "meters-per-second",
      pipeMaterial: "pvc",
      category: "Residential"
    },
    {
      name: "Bathroom Shower",
      description: "Single shower head",
      flowRate: 0.15,
      flowRateUnit: "liters-per-second",
      velocity: 1.5,
      velocityUnit: "meters-per-second",
      pipeMaterial: "copper",
      category: "Residential"
    },
    {
      name: "Commercial Building",
      description: "Multi-story building supply",
      flowRate: 10,
      flowRateUnit: "liters-per-second",
      velocity: 2.0,
      velocityUnit: "meters-per-second",
      pipeMaterial: "steel",
      category: "Commercial"
    },
    {
      name: "Fire Sprinkler System",
      description: "Fire protection main",
      flowRate: 500,
      flowRateUnit: "gallons-per-minute",
      velocity: 5,
      velocityUnit: "feet-per-second",
      pipeMaterial: "steel",
      category: "Fire Protection"
    },
    {
      name: "Industrial Process",
      description: "High-flow industrial line",
      flowRate: 50,
      flowRateUnit: "cubic-meters-per-hour",
      velocity: 2.5,
      velocityUnit: "meters-per-second",
      pipeMaterial: "steel",
      category: "Industrial"
    }
  ];
}

export function getPipeMaterialInfo(material: PipeMaterial): { name: string; description: string } {
  switch (material) {
    case "pvc":
      return { name: "PVC", description: "Polyvinyl Chloride - lightweight, corrosion resistant" };
    case "copper":
      return { name: "Copper", description: "Durable, antimicrobial properties" };
    case "steel":
      return { name: "Steel", description: "High strength, high pressure applications" };
    case "cast-iron":
      return { name: "Cast Iron", description: "Heavy duty, sound dampening" };
    default:
      return { name: "Unknown", description: "" };
  }
}

// History management
export function saveToHistory(calculation: PlumbingPipeCalculation): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

// Export functions
export function exportToText(calculation: PlumbingPipeCalculation): string {
  const lines = [
    "PLUMBING PIPE SIZE CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Calculation Mode: ${getModeLabel(calculation.mode)}`,
    `Pipe Material: ${getPipeMaterialInfo(calculation.pipeMaterial).name}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50)
  ];
  
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateInLitersPerSecond, 2)} L/s`);
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateInGPM, 2)} GPM`);
  lines.push(`Velocity: ${formatNumber(calculation.velocityInMetersPerSecond, 3)} m/s`);
  lines.push(`Velocity: ${formatNumber(calculation.velocityInFeetPerSecond, 3)} ft/s`);
  
  lines.push("");
  lines.push("CALCULATED RESULTS:");
  lines.push("-".repeat(50));
  lines.push(`Pipe Diameter: ${formatNumber(calculation.diameterInMm, 2)} mm`);
  lines.push(`Pipe Diameter: ${formatNumber(calculation.diameterInInches, 2)} inches`);
  lines.push(`Cross-sectional Area: ${formatNumber(calculation.crossSectionalArea * 1000000, 2)} mm²`);
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Plumbing Pipe Size Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(calculation: PlumbingPipeCalculation): string {
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Calculation Mode", getModeLabel(calculation.mode), ""],
    ["Pipe Material", getPipeMaterialInfo(calculation.pipeMaterial).name, ""],
    ["Flow Rate", formatNumber(calculation.flowRateInLitersPerSecond, 2), "L/s"],
    ["Flow Rate", formatNumber(calculation.flowRateInGPM, 2), "GPM"],
    ["Velocity", formatNumber(calculation.velocityInMetersPerSecond, 3), "m/s"],
    ["Velocity", formatNumber(calculation.velocityInFeetPerSecond, 3), "ft/s"],
    ["Pipe Diameter", formatNumber(calculation.diameterInMm, 2), "mm"],
    ["Pipe Diameter", formatNumber(calculation.diameterInInches, 2), "inches"],
    ["Cross-sectional Area", formatNumber(calculation.crossSectionalArea * 1000000, 2), "mm²"]
  ];
  
  return rows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getModeLabel(mode: CalculationMode): string {
  switch (mode) {
    case "diameter":
      return "Calculate Diameter";
    case "velocity":
      return "Calculate Velocity";
    case "flow-rate":
      return "Calculate Flow Rate";
    default:
      return mode;
  }
}

export function getFlowRateUnitLabel(unit: FlowRateUnit): string {
  switch (unit) {
    case "liters-per-second":
      return "L/s";
    case "cubic-meters-per-hour":
      return "m³/h";
    case "gallons-per-minute":
      return "GPM";
    case "cubic-feet-per-second":
      return "ft³/s";
    default:
      return unit;
  }
}

export function getVelocityUnitLabel(unit: VelocityUnit): string {
  switch (unit) {
    case "meters-per-second":
      return "m/s";
    case "feet-per-second":
      return "ft/s";
    default:
      return unit;
  }
}

export function validateInputs(mode: CalculationMode, flowRate: number | undefined, velocity: number | undefined, diameter: number | undefined): string | null {
  if (mode === "diameter") {
    if (!flowRate || flowRate <= 0) {
      return "Flow rate must be greater than 0";
    }
    if (!velocity || velocity <= 0) {
      return "Velocity must be greater than 0";
    }
  } else if (mode === "velocity") {
    if (!flowRate || flowRate <= 0) {
      return "Flow rate must be greater than 0";
    }
    if (!diameter || diameter <= 0) {
      return "Diameter must be greater than 0";
    }
  } else if (mode === "flow-rate") {
    if (!velocity || velocity <= 0) {
      return "Velocity must be greater than 0";
    }
    if (!diameter || diameter <= 0) {
      return "Diameter must be greater than 0";
    }
  }
  
  return null;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
