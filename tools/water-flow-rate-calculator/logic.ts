import {
  CalculationMode,
  FlowRateUnit,
  VelocityUnit,
  DiameterUnit,
  WaterFlowInputs,
  WaterFlowCalculation,
  WaterFlowPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "water-flow-rate-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate water flow using Q = A × v
 * Where A = π × (D/2)²
 */
export function calculateWaterFlow(inputs: WaterFlowInputs): WaterFlowCalculation {
  const { mode, diameter, velocity, flowRate, diameterUnit, velocityUnit, flowRateUnit } = inputs;
  
  let D = 0; // diameter in mm
  let V = 0; // velocity in m/s
  let Q = 0; // flow rate in m³/s
  const notes: string[] = [];
  
  if (mode === "flow-rate") {
    // Calculate flow rate from diameter and velocity
    if (!diameter || !velocity) {
      throw new Error("Diameter and velocity are required");
    }
    
    D = diameter;
    V = velocity;
    
    // Convert diameter to meters
    const D_m = D / 1000;
    
    // Calculate area: A = π × (D/2)²
    const area = Math.PI * Math.pow(D_m / 2, 2);
    
    // Calculate flow rate: Q = A × v
    Q = area * V;
    
    notes.push("Calculated flow rate using Q = A × v");
  } else if (mode === "velocity") {
    // Calculate velocity from flow rate and diameter
    if (!flowRate || !diameter) {
      throw new Error("Flow rate and diameter are required");
    }
    
    D = diameter;
    
    // Convert flow rate from L/min to m³/s
    Q = flowRate / 60000;
    
    // Convert diameter to meters
    const D_m = D / 1000;
    
    // Calculate area
    const area = Math.PI * Math.pow(D_m / 2, 2);
    
    // Calculate velocity: v = Q / A
    V = Q / area;
    
    notes.push("Calculated velocity using v = Q / A");
  } else if (mode === "diameter") {
    // Calculate diameter from flow rate and velocity
    if (!flowRate || !velocity) {
      throw new Error("Flow rate and velocity are required");
    }
    
    V = velocity;
    
    // Convert flow rate from L/min to m³/s
    Q = flowRate / 60000;
    
    // Calculate diameter: D = √((4 × Q) / (π × v))
    const D_m = Math.sqrt((4 * Q) / (Math.PI * V));
    D = D_m * 1000; // Convert to mm
    
    notes.push("Calculated diameter using D = √((4 × Q) / (π × v))");
  }
  
  // Calculate cross-sectional area
  const D_m = D / 1000;
  const crossSectionalArea = Math.PI * Math.pow(D_m / 2, 2);
  
  // Add velocity recommendations
  if (V < 0.6) {
    notes.push("⚠️ Low velocity (<0.6 m/s) may cause sediment deposition");
  } else if (V > 3.0) {
    notes.push("⚠️ High velocity (>3.0 m/s) may cause noise and erosion");
  } else {
    notes.push("✓ Velocity within recommended range (0.6-3.0 m/s)");
  }
  
  // Add flow rate notes
  const flowRateInLPM = Q * 60000;
  if (flowRateInLPM < 10) {
    notes.push("Low flow rate - suitable for small fixtures");
  } else if (flowRateInLPM > 500) {
    notes.push("High flow rate - verify pipe material and pressure rating");
  }
  
  // Add diameter notes
  if (D < 15) {
    notes.push("⚠️ Very small pipe diameter - may restrict flow");
  } else if (D > 100) {
    notes.push("Large pipe diameter - suitable for main supply lines");
  }
  
  // Convert to all units
  const flowRateInCubicMetersPerSecond = Q;
  const flowRateInLitersPerMinute = Q * 60000;
  const flowRateInGallonsPerMinute = Q * 15850.32;
  const velocityInMetersPerSecond = V;
  const velocityInFeetPerSecond = V / 0.3048;
  const diameterInMillimeters = D;
  const diameterInInches = D / 25.4;
  
  return {
    mode,
    flowRate: Q,
    velocity: V,
    diameter: D,
    crossSectionalArea,
    flowRateInCubicMetersPerSecond,
    flowRateInLitersPerMinute,
    flowRateInGallonsPerMinute,
    velocityInMetersPerSecond,
    velocityInFeetPerSecond,
    diameterInMillimeters,
    diameterInInches,
    diameterUnit,
    velocityUnit,
    flowRateUnit,
    timestamp: Date.now(),
    notes
  };
}

export function getWaterFlowPresets(): WaterFlowPreset[] {
  return [
    {
      name: "Kitchen Faucet",
      description: "Standard kitchen sink flow",
      diameter: 15,
      velocity: 1.5,
      category: "Residential"
    },
    {
      name: "Bathroom Sink",
      description: "Typical bathroom fixture",
      diameter: 12,
      velocity: 1.2,
      category: "Residential"
    },
    {
      name: "Shower Head",
      description: "Single shower fixture",
      diameter: 15,
      velocity: 2.0,
      category: "Residential"
    },
    {
      name: "Toilet Supply",
      description: "Toilet tank fill line",
      diameter: 10,
      velocity: 1.0,
      category: "Residential"
    },
    {
      name: "Main House Supply",
      description: "Residential main line",
      diameter: 25,
      velocity: 2.0,
      category: "Residential"
    },
    {
      name: "Commercial Building",
      description: "Multi-story supply",
      diameter: 50,
      velocity: 2.5,
      category: "Commercial"
    }
  ];
}

// History management
export function saveToHistory(calculation: WaterFlowCalculation): void {
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
export function exportToText(calculation: WaterFlowCalculation): string {
  const lines = [
    "WATER FLOW RATE CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Calculation Mode: ${getModeLabel(calculation.mode)}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50)
  ];
  
  lines.push(`Pipe Diameter: ${formatNumber(calculation.diameterInMillimeters, 2)} mm (${formatNumber(calculation.diameterInInches, 2)} in)`);
  lines.push(`Flow Velocity: ${formatNumber(calculation.velocityInMetersPerSecond, 3)} m/s (${formatNumber(calculation.velocityInFeetPerSecond, 3)} ft/s)`);
  
  lines.push("");
  lines.push("CALCULATED RESULTS:");
  lines.push("-".repeat(50));
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateInCubicMetersPerSecond, 6)} m³/s`);
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateInLitersPerMinute, 2)} L/min`);
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateInGallonsPerMinute, 2)} GPM`);
  lines.push(`Cross-sectional Area: ${formatNumber(calculation.crossSectionalArea * 1000000, 2)} mm²`);
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Water Flow Rate Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(calculation: WaterFlowCalculation): string {
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Calculation Mode", getModeLabel(calculation.mode), ""],
    ["Pipe Diameter", formatNumber(calculation.diameterInMillimeters, 2), "mm"],
    ["Pipe Diameter", formatNumber(calculation.diameterInInches, 2), "inches"],
    ["Flow Velocity", formatNumber(calculation.velocityInMetersPerSecond, 3), "m/s"],
    ["Flow Velocity", formatNumber(calculation.velocityInFeetPerSecond, 3), "ft/s"],
    ["Flow Rate", formatNumber(calculation.flowRateInCubicMetersPerSecond, 6), "m³/s"],
    ["Flow Rate", formatNumber(calculation.flowRateInLitersPerMinute, 2), "L/min"],
    ["Flow Rate", formatNumber(calculation.flowRateInGallonsPerMinute, 2), "GPM"],
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
    case "flow-rate":
      return "Calculate Flow Rate";
    case "velocity":
      return "Calculate Velocity";
    case "diameter":
      return "Calculate Pipe Diameter";
    default:
      return mode;
  }
}

export function validateInputs(mode: CalculationMode, diameter: number | undefined, velocity: number | undefined, flowRate: number | undefined): string | null {
  if (mode === "flow-rate") {
    if (!diameter || diameter <= 0) {
      return "Diameter must be greater than 0";
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
  } else if (mode === "diameter") {
    if (!flowRate || flowRate <= 0) {
      return "Flow rate must be greater than 0";
    }
    if (!velocity || velocity <= 0) {
      return "Velocity must be greater than 0";
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
