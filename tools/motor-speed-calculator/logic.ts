import { MotorSpeedInputs, MotorSpeedResult, MotorPreset } from "./types";

// Motor presets for common configurations
export const MOTOR_PRESETS: MotorPreset[] = [
  {
    name: "50 Hz, 2-Pole Motor",
    description: "High-speed motor (3000 RPM synchronous)",
    frequency: 50,
    poles: 2,
    slip: 3
  },
  {
    name: "50 Hz, 4-Pole Motor",
    description: "Standard motor (1500 RPM synchronous)",
    frequency: 50,
    poles: 4,
    slip: 3
  },
  {
    name: "50 Hz, 6-Pole Motor",
    description: "Medium-speed motor (1000 RPM synchronous)",
    frequency: 50,
    poles: 6,
    slip: 3
  },
  {
    name: "60 Hz, 2-Pole Motor",
    description: "High-speed motor (3600 RPM synchronous)",
    frequency: 60,
    poles: 2,
    slip: 3
  },
  {
    name: "60 Hz, 4-Pole Motor",
    description: "Standard motor (1800 RPM synchronous)",
    frequency: 60,
    poles: 4,
    slip: 3
  },
  {
    name: "60 Hz, 6-Pole Motor",
    description: "Medium-speed motor (1200 RPM synchronous)",
    frequency: 60,
    poles: 6,
    slip: 3
  }
];

// Calculate motor speed
export function calculateMotorSpeed(inputs: MotorSpeedInputs): MotorSpeedResult {
  const { frequency, poles, slip } = inputs;
  
  const steps: string[] = [];
  
  // Calculate synchronous speed
  // Ns = (120 × f) / P
  const synchronousSpeed = (120 * frequency) / poles;
  
  steps.push("Step 1: Calculate Synchronous Speed");
  steps.push(`Formula: Ns = (120 × f) / P`);
  steps.push(`Ns = (120 × ${frequency}) / ${poles}`);
  steps.push(`Ns = ${120 * frequency} / ${poles}`);
  steps.push(`Ns = ${synchronousSpeed.toFixed(2)} RPM`);
  steps.push("");
  
  // Calculate actual speed with slip
  // N = Ns × (1 - s/100)
  const actualSpeed = synchronousSpeed * (1 - slip / 100);
  
  steps.push("Step 2: Calculate Actual Motor Speed (with slip)");
  steps.push(`Formula: N = Ns × (1 - s/100)`);
  steps.push(`N = ${synchronousSpeed.toFixed(2)} × (1 - ${slip}/100)`);
  steps.push(`N = ${synchronousSpeed.toFixed(2)} × ${(1 - slip / 100).toFixed(4)}`);
  steps.push(`N = ${actualSpeed.toFixed(2)} RPM`);
  steps.push("");
  
  // Convert to rad/s
  // ω = (2π × N) / 60
  const synchronousSpeedRadS = (2 * Math.PI * synchronousSpeed) / 60;
  const actualSpeedRadS = (2 * Math.PI * actualSpeed) / 60;
  
  steps.push("Step 3: Convert to Radians per Second");
  steps.push(`Formula: ω = (2π × N) / 60`);
  steps.push(`Synchronous: ω = (2π × ${synchronousSpeed.toFixed(2)}) / 60 = ${synchronousSpeedRadS.toFixed(2)} rad/s`);
  steps.push(`Actual: ω = (2π × ${actualSpeed.toFixed(2)}) / 60 = ${actualSpeedRadS.toFixed(2)} rad/s`);
  
  return {
    synchronousSpeed,
    actualSpeed,
    synchronousSpeedRadS,
    actualSpeedRadS,
    slip,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: MotorSpeedInputs): string | null {
  if (inputs.frequency <= 0) {
    return "Frequency must be greater than 0 Hz";
  }
  
  if (inputs.poles <= 0 || inputs.poles % 2 !== 0) {
    return "Number of poles must be a positive even number";
  }
  
  if (inputs.slip < 0 || inputs.slip > 100) {
    return "Slip must be between 0 and 100%";
  }
  
  return null;
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
  inputs: MotorSpeedInputs;
  result: MotorSpeedResult;
}

const HISTORY_KEY = "motor-speed-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: MotorSpeedInputs, result: MotorSpeedResult): void {
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
export function exportToText(inputs: MotorSpeedInputs, result: MotorSpeedResult): string {
  const lines = [
    "MOTOR SPEED CALCULATION REPORT",
    "=" .repeat(50),
    "",
    "INPUT PARAMETERS:",
    `Frequency: ${inputs.frequency} Hz`,
    `Number of Poles: ${inputs.poles}`,
    `Slip: ${inputs.slip}%`,
    "",
    "RESULTS:",
    `Synchronous Speed: ${formatNumber(result.synchronousSpeed, 2)} RPM`,
    `Actual Motor Speed: ${formatNumber(result.actualSpeed, 2)} RPM`,
    `Synchronous Speed: ${formatNumber(result.synchronousSpeedRadS, 2)} rad/s`,
    `Actual Speed: ${formatNumber(result.actualSpeedRadS, 2)} rad/s`,
    "",
    "CALCULATION STEPS:",
    ...result.steps,
    "",
    `Generated: ${new Date().toLocaleString()}`,
    "=" .repeat(50)
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
  lastInputs: MotorSpeedInputs;
}

const SETTINGS_KEY = "motor-speed-calculator-settings";

export function saveSettings(inputs: MotorSpeedInputs): void {
  const settings: Settings = { lastInputs: inputs };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): Partial<MotorSpeedInputs> {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const settings: Settings = JSON.parse(stored);
      return settings.lastInputs;
    }
  } catch {
    // Ignore errors
  }
  
  return {};
}
