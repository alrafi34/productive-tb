import { SlipInputs, SlipResult, SlipPreset, AutoCalculateInputs } from "./types";

// Slip presets for common motor configurations
export const SLIP_PRESETS: SlipPreset[] = [
  {
    name: "Standard 4-Pole Motor (50Hz)",
    description: "Typical full-load slip of 4%",
    synchronousSpeed: 1500,
    rotorSpeed: 1440
  },
  {
    name: "High-Efficiency Motor",
    description: "Low slip of 1%",
    synchronousSpeed: 1500,
    rotorSpeed: 1485
  },
  {
    name: "2-Pole Motor (50Hz)",
    description: "High-speed motor with 3% slip",
    synchronousSpeed: 3000,
    rotorSpeed: 2910
  },
  {
    name: "6-Pole Motor (50Hz)",
    description: "Medium-speed motor with 5% slip",
    synchronousSpeed: 1000,
    rotorSpeed: 950
  },
  {
    name: "4-Pole Motor (60Hz)",
    description: "Standard motor with 3% slip",
    synchronousSpeed: 1800,
    rotorSpeed: 1746
  },
  {
    name: "Heavy Load Motor",
    description: "High slip of 7%",
    synchronousSpeed: 1500,
    rotorSpeed: 1395
  }
];

// Calculate slip
export function calculateSlip(inputs: SlipInputs): SlipResult {
  const { synchronousSpeed, rotorSpeed } = inputs;
  
  const steps: string[] = [];
  
  // Calculate speed difference
  const speedDifference = synchronousSpeed - rotorSpeed;
  
  steps.push("Step 1: Calculate Speed Difference");
  steps.push(`Speed Difference = Ns - Nr`);
  steps.push(`Speed Difference = ${synchronousSpeed} - ${rotorSpeed}`);
  steps.push(`Speed Difference = ${speedDifference} RPM`);
  steps.push("");
  
  // Calculate slip (decimal)
  const slip = speedDifference / synchronousSpeed;
  
  steps.push("Step 2: Calculate Slip (Decimal)");
  steps.push(`Formula: s = (Ns - Nr) / Ns`);
  steps.push(`s = (${synchronousSpeed} - ${rotorSpeed}) / ${synchronousSpeed}`);
  steps.push(`s = ${speedDifference} / ${synchronousSpeed}`);
  steps.push(`s = ${slip.toFixed(6)}`);
  steps.push("");
  
  // Calculate slip percentage
  const slipPercentage = slip * 100;
  
  steps.push("Step 3: Convert to Percentage");
  steps.push(`Slip % = s × 100`);
  steps.push(`Slip % = ${slip.toFixed(6)} × 100`);
  steps.push(`Slip % = ${slipPercentage.toFixed(4)}%`);
  
  return {
    slip,
    slipPercentage,
    speedDifference,
    steps
  };
}

// Calculate synchronous speed from frequency and poles
export function calculateSynchronousSpeed(inputs: AutoCalculateInputs): number {
  const { frequency, poles } = inputs;
  return (120 * frequency) / poles;
}

// Validate inputs
export function validateInputs(inputs: SlipInputs): string | null {
  if (inputs.synchronousSpeed <= 0) {
    return "Synchronous speed must be greater than 0 RPM";
  }
  
  if (inputs.rotorSpeed < 0) {
    return "Rotor speed cannot be negative";
  }
  
  if (inputs.rotorSpeed > inputs.synchronousSpeed) {
    return "Rotor speed cannot exceed synchronous speed";
  }
  
  return null;
}

// Get slip interpretation
export function getSlipInterpretation(slipPercentage: number): {
  status: string;
  color: string;
  bgColor: string;
  description: string;
} {
  if (slipPercentage < 1) {
    return {
      status: "Very Low Slip",
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
      description: "Motor is running near synchronous speed with minimal load or high efficiency."
    };
  } else if (slipPercentage >= 1 && slipPercentage < 3) {
    return {
      status: "Low Slip",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
      description: "Excellent operating condition. Motor is running efficiently with light to moderate load."
    };
  } else if (slipPercentage >= 3 && slipPercentage < 5) {
    return {
      status: "Normal Slip",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
      description: "Normal operating condition. Motor is running at typical full-load slip."
    };
  } else if (slipPercentage >= 5 && slipPercentage < 8) {
    return {
      status: "Moderate Slip",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50 border-yellow-200",
      description: "Motor is under heavy load. Check if load is within motor rating."
    };
  } else if (slipPercentage >= 8 && slipPercentage < 15) {
    return {
      status: "High Slip",
      color: "text-orange-700",
      bgColor: "bg-orange-50 border-orange-200",
      description: "Motor is overloaded or has issues. Investigate load conditions and motor health."
    };
  } else {
    return {
      status: "Very High Slip",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      description: "Critical condition! Motor may be severely overloaded or damaged. Immediate attention required."
    };
  }
}

// Format number with specified decimal places
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Debounce function for input handling
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// History management
interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SlipInputs;
  result: SlipResult;
}

const HISTORY_KEY = "slip-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: SlipInputs, result: SlipResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(inputs: SlipInputs, result: SlipResult): string {
  const interpretation = getSlipInterpretation(result.slipPercentage);
  
  const lines = [
    "SLIP CALCULATION REPORT",
    "=".repeat(50),
    "",
    "INPUT PARAMETERS:",
    `Synchronous Speed (Ns): ${inputs.synchronousSpeed} RPM`,
    `Rotor Speed (Nr): ${inputs.rotorSpeed} RPM`,
    "",
    "RESULTS:",
    `Slip (Decimal): ${formatNumber(result.slip, 6)}`,
    `Slip Percentage: ${formatNumber(result.slipPercentage, 4)}%`,
    `Speed Difference: ${result.speedDifference} RPM`,
    "",
    "INTERPRETATION:",
    `Status: ${interpretation.status}`,
    `Description: ${interpretation.description}`,
    "",
    "CALCULATION STEPS:",
    ...result.steps,
    "",
    `Generated: ${new Date().toLocaleString()}`,
    "=".repeat(50)
  ];
  
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Settings management
interface Settings {
  lastInputs: SlipInputs;
  showAutoCalculate: boolean;
}

const SETTINGS_KEY = "slip-calculator-settings";

export function saveSettings(inputs: SlipInputs, showAutoCalculate: boolean): void {
  const settings: Settings = { lastInputs: inputs, showAutoCalculate };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): Partial<Settings> {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore errors
  }
  
  return {};
}
