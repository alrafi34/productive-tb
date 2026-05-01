import { DrainageMode, Unit, RoughnessType, DrainageFlowInputs, DrainageFlowCalculation, DrainagePreset, HistoryEntry } from "./types";

const HISTORY_KEY = "drainage-flow-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate drainage flow using Manning's Equation
 * Q = (1/n) × A × R^(2/3) × S^(1/2)
 */
export function calculateDrainageFlow(inputs: DrainageFlowInputs): DrainageFlowCalculation {
  const { mode, unit, pipeDiameter, channelWidth, waterDepth, slope, roughnessCoefficient } = inputs;
  
  let area = 0;
  let wettedPerimeter = 0;
  let hydraulicRadius = 0;
  let flowRate = 0;
  let velocity = 0;
  const notes: string[] = [];
  
  // Convert to metric for calculations
  let D = pipeDiameter || 0;
  let W = channelWidth || 0;
  let H = waterDepth || 0;
  
  if (unit === "imperial") {
    D = D * 0.3048; // ft to m
    W = W * 0.3048;
    H = H * 0.3048;
  }
  
  if (mode === "pipe") {
    // Full pipe flow calculations
    area = Math.PI * Math.pow(D / 2, 2);
    wettedPerimeter = Math.PI * D;
    hydraulicRadius = area / wettedPerimeter;
    
    notes.push("Assuming full pipe flow condition");
    notes.push(`Pipe diameter: ${D.toFixed(3)} m`);
  } else {
    // Open channel (rectangular) calculations
    area = W * H;
    wettedPerimeter = W + 2 * H;
    hydraulicRadius = area / wettedPerimeter;
    
    notes.push("Rectangular open channel flow");
    notes.push(`Channel width: ${W.toFixed(3)} m, Depth: ${H.toFixed(3)} m`);
  }
  
  // Manning's Equation: Q = (1/n) × A × R^(2/3) × S^(1/2)
  flowRate = (1 / roughnessCoefficient) * area * Math.pow(hydraulicRadius, 2/3) * Math.sqrt(slope);
  
  // Calculate velocity: V = Q / A
  velocity = area > 0 ? flowRate / area : 0;
  
  // Unit conversions
  const flowRateLitersPerSecond = flowRate * 1000;
  const flowRateGallonsPerMinute = flowRate * 15850.32; // m³/s to GPM
  
  // Add notes based on results
  if (velocity < 0.6) {
    notes.push("⚠️ Low velocity may cause sediment deposition");
  } else if (velocity > 3.0) {
    notes.push("⚠️ High velocity may cause erosion");
  } else {
    notes.push("✓ Velocity within acceptable range (0.6-3.0 m/s)");
  }
  
  if (slope < 0.001) {
    notes.push("⚠️ Very low slope - check drainage adequacy");
  } else if (slope > 0.05) {
    notes.push("⚠️ Steep slope - consider erosion control");
  }
  
  return {
    mode,
    unit,
    pipeDiameter,
    channelWidth,
    waterDepth,
    slope,
    roughnessCoefficient,
    roughnessType: inputs.roughnessType,
    crossSectionalArea: area,
    wettedPerimeter,
    hydraulicRadius,
    flowRate,
    flowRateLitersPerSecond,
    flowRateGallonsPerMinute,
    velocity,
    timestamp: Date.now(),
    notes
  };
}

export function getRoughnessPresets(): { type: RoughnessType; name: string; coefficient: number; description: string }[] {
  return [
    { type: "concrete", name: "Concrete", coefficient: 0.013, description: "Smooth concrete pipe/channel" },
    { type: "pvc", name: "PVC", coefficient: 0.009, description: "PVC or plastic pipe" },
    { type: "earth", name: "Earth", coefficient: 0.022, description: "Natural earth channel" },
    { type: "custom", name: "Custom", coefficient: 0.015, description: "Custom roughness value" }
  ];
}

export function getDrainagePresets(): DrainagePreset[] {
  return [
    {
      name: "Small Stormwater Pipe",
      description: "300mm concrete pipe, 1% slope",
      mode: "pipe",
      unit: "metric",
      pipeDiameter: 0.3,
      slope: 0.01,
      roughnessType: "concrete",
      category: "Stormwater"
    },
    {
      name: "Medium Drainage Pipe",
      description: "500mm PVC pipe, 0.5% slope",
      mode: "pipe",
      unit: "metric",
      pipeDiameter: 0.5,
      slope: 0.005,
      roughnessType: "pvc",
      category: "Stormwater"
    },
    {
      name: "Large Sewer Pipe",
      description: "1000mm concrete pipe, 0.2% slope",
      mode: "pipe",
      unit: "metric",
      pipeDiameter: 1.0,
      slope: 0.002,
      roughnessType: "concrete",
      category: "Sewer"
    },
    {
      name: "Small Irrigation Channel",
      description: "1m wide, 0.5m deep, 2% slope",
      mode: "channel",
      unit: "metric",
      channelWidth: 1.0,
      waterDepth: 0.5,
      slope: 0.02,
      roughnessType: "earth",
      category: "Irrigation"
    },
    {
      name: "Roadside Drainage Channel",
      description: "2m wide, 0.8m deep, 1% slope",
      mode: "channel",
      unit: "metric",
      channelWidth: 2.0,
      waterDepth: 0.8,
      slope: 0.01,
      roughnessType: "concrete",
      category: "Stormwater"
    },
    {
      name: "Large Open Channel",
      description: "5m wide, 1.5m deep, 0.5% slope",
      mode: "channel",
      unit: "metric",
      channelWidth: 5.0,
      waterDepth: 1.5,
      slope: 0.005,
      roughnessType: "earth",
      category: "Drainage"
    }
  ];
}

// History management
export function saveToHistory(calculation: DrainageFlowCalculation): void {
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
export function exportToText(calculation: DrainageFlowCalculation): string {
  const lines = [
    "DRAINAGE FLOW CALCULATION REPORT",
    "=" .repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Mode: ${calculation.mode === 'pipe' ? 'Pipe Flow' : 'Open Channel Flow'}`,
    `Unit System: ${calculation.unit === 'metric' ? 'Metric' : 'Imperial'}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50)
  ];
  
  if (calculation.mode === "pipe") {
    lines.push(`Pipe Diameter: ${calculation.pipeDiameter} ${calculation.unit === 'metric' ? 'm' : 'ft'}`);
  } else {
    lines.push(`Channel Width: ${calculation.channelWidth} ${calculation.unit === 'metric' ? 'm' : 'ft'}`);
    lines.push(`Water Depth: ${calculation.waterDepth} ${calculation.unit === 'metric' ? 'm' : 'ft'}`);
  }
  
  lines.push(`Slope: ${calculation.slope} (${(calculation.slope * 100).toFixed(2)}%)`);
  lines.push(`Manning's n: ${calculation.roughnessCoefficient}`);
  lines.push(`Roughness Type: ${calculation.roughnessType}`);
  lines.push("");
  lines.push("CALCULATED RESULTS:");
  lines.push("-".repeat(50));
  lines.push(`Cross-sectional Area: ${formatNumber(calculation.crossSectionalArea, 4)} m²`);
  lines.push(`Wetted Perimeter: ${formatNumber(calculation.wettedPerimeter, 4)} m`);
  lines.push(`Hydraulic Radius: ${formatNumber(calculation.hydraulicRadius, 4)} m`);
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRate, 4)} m³/s`);
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateLitersPerSecond, 2)} L/s`);
  lines.push(`Flow Rate: ${formatNumber(calculation.flowRateGallonsPerMinute, 2)} GPM`);
  lines.push(`Flow Velocity: ${formatNumber(calculation.velocity, 3)} m/s`);
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=" .repeat(50));
  lines.push("Generated by Drainage Flow Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(calculation: DrainageFlowCalculation): string {
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Mode", calculation.mode === 'pipe' ? 'Pipe Flow' : 'Open Channel', ""],
    ["Unit System", calculation.unit === 'metric' ? 'Metric' : 'Imperial', ""]
  ];
  
  if (calculation.mode === "pipe") {
    rows.push(["Pipe Diameter", calculation.pipeDiameter?.toString() || "", calculation.unit === 'metric' ? 'm' : 'ft']);
  } else {
    rows.push(["Channel Width", calculation.channelWidth?.toString() || "", calculation.unit === 'metric' ? 'm' : 'ft']);
    rows.push(["Water Depth", calculation.waterDepth?.toString() || "", calculation.unit === 'metric' ? 'm' : 'ft']);
  }
  
  rows.push(["Slope", calculation.slope.toString(), ""]);
  rows.push(["Manning's n", calculation.roughnessCoefficient.toString(), ""]);
  rows.push(["Cross-sectional Area", formatNumber(calculation.crossSectionalArea, 4), "m²"]);
  rows.push(["Wetted Perimeter", formatNumber(calculation.wettedPerimeter, 4), "m"]);
  rows.push(["Hydraulic Radius", formatNumber(calculation.hydraulicRadius, 4), "m"]);
  rows.push(["Flow Rate", formatNumber(calculation.flowRate, 4), "m³/s"]);
  rows.push(["Flow Rate", formatNumber(calculation.flowRateLitersPerSecond, 2), "L/s"]);
  rows.push(["Flow Rate", formatNumber(calculation.flowRateGallonsPerMinute, 2), "GPM"]);
  rows.push(["Flow Velocity", formatNumber(calculation.velocity, 3), "m/s"]);
  
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

export function validateInputs(mode: DrainageMode, pipeDiameter: number | undefined, channelWidth: number | undefined, waterDepth: number | undefined, slope: number, roughness: number): string | null {
  if (mode === "pipe") {
    if (!pipeDiameter || pipeDiameter <= 0) {
      return "Pipe diameter must be greater than 0";
    }
  } else {
    if (!channelWidth || channelWidth <= 0) {
      return "Channel width must be greater than 0";
    }
    if (!waterDepth || waterDepth <= 0) {
      return "Water depth must be greater than 0";
    }
  }
  
  if (slope <= 0) {
    return "Slope must be greater than 0";
  }
  
  if (roughness <= 0) {
    return "Manning's roughness coefficient must be greater than 0";
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
