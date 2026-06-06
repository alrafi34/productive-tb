import { PowerLossInputs, PowerLossResult, CalculationMode } from "./types";

// Format number with precision
export function formatNumber(value: number, decimals: number = 2): string {
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 1000000) {
    return value.toExponential(decimals);
  }
  return value.toFixed(decimals);
}

// Debounce function
export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// Validate inputs
export function validateInputs(inputs: PowerLossInputs): string | null {
  const { mode, voltage, current, resistance, powerFactor } = inputs;

  if (mode === 'i-r') {
    if (current === undefined || current === null) {
      return "Current is required for I²R calculation";
    }
    if (current < 0) {
      return "Current cannot be negative";
    }
    if (resistance === undefined || resistance === null) {
      return "Resistance is required for I²R calculation";
    }
    if (resistance < 0) {
      return "Resistance cannot be negative";
    }
  } else if (mode === 'v-i') {
    if (voltage === undefined || voltage === null) {
      return "Voltage is required for V×I calculation";
    }
    if (voltage < 0) {
      return "Voltage cannot be negative";
    }
    if (current === undefined || current === null) {
      return "Current is required for V×I calculation";
    }
    if (current < 0) {
      return "Current cannot be negative";
    }
  } else if (mode === 'mixed') {
    if (voltage === undefined || voltage === null) {
      return "Voltage is required";
    }
    if (voltage < 0) {
      return "Voltage cannot be negative";
    }
    if (current === undefined || current === null) {
      return "Current is required";
    }
    if (current < 0) {
      return "Current cannot be negative";
    }
    if (resistance === undefined || resistance === null) {
      return "Resistance is required";
    }
    if (resistance < 0) {
      return "Resistance cannot be negative";
    }
  }

  if (powerFactor !== undefined && powerFactor !== null) {
    if (powerFactor < 0 || powerFactor > 1) {
      return "Power factor must be between 0 and 1";
    }
  }

  return null;
}

// Determine loss level
function getLossLevel(powerLoss: number, inputPower?: number): 'low' | 'moderate' | 'high' | 'critical' {
  if (inputPower !== undefined && inputPower > 0) {
    const lossPercentage = (powerLoss / inputPower) * 100;
    if (lossPercentage < 5) return 'low';
    if (lossPercentage < 15) return 'moderate';
    if (lossPercentage < 30) return 'high';
    return 'critical';
  }
  
  // Absolute power loss thresholds
  if (powerLoss < 10) return 'low';
  if (powerLoss < 100) return 'moderate';
  if (powerLoss < 500) return 'high';
  return 'critical';
}

// Get warning message
function getWarning(lossLevel: 'low' | 'moderate' | 'high' | 'critical', efficiency?: number): string | undefined {
  if (lossLevel === 'critical') {
    return '⚠️ CRITICAL: Very high power loss detected. System efficiency is severely compromised.';
  }
  if (lossLevel === 'high') {
    return '⚠️ HIGH LOSS: Significant power loss. Consider reducing resistance or current.';
  }
  if (lossLevel === 'moderate') {
    return 'ℹ️ MODERATE LOSS: Power loss is within acceptable range but could be optimized.';
  }
  if (efficiency !== undefined && efficiency < 70) {
    return 'ℹ️ Low efficiency detected. Consider system optimization.';
  }
  return undefined;
}

// Calculate power loss
export function calculatePowerLoss(inputs: PowerLossInputs): PowerLossResult {
  const { mode, voltage, current, resistance, powerFactor, showEfficiency, inputPower, precision = 2 } = inputs;

  let powerLoss: number;
  let calculatedInputPower: number | undefined;
  let efficiency: number | undefined;
  let formula: string;
  let actualPowerFactor = powerFactor || 1;

  // Calculate power loss based on mode
  if (mode === 'i-r') {
    // P_loss = I² × R
    powerLoss = current! * current! * resistance!;
    formula = "P_loss = I² × R";
  } else if (mode === 'v-i') {
    // P = V × I (with power factor if provided)
    powerLoss = voltage! * current! * actualPowerFactor;
    formula = powerFactor ? "P = V × I × PF" : "P = V × I";
  } else {
    // Mixed mode: Calculate both and use I²R for loss
    powerLoss = current! * current! * resistance!;
    calculatedInputPower = voltage! * current! * actualPowerFactor;
    formula = "P_loss = I² × R, P_input = V × I";
  }

  // Calculate efficiency if enabled
  if (showEfficiency) {
    if (inputPower !== undefined && inputPower > 0) {
      calculatedInputPower = inputPower;
      efficiency = ((inputPower - powerLoss) / inputPower) * 100;
    } else if (calculatedInputPower !== undefined && calculatedInputPower > 0) {
      efficiency = ((calculatedInputPower - powerLoss) / calculatedInputPower) * 100;
    } else if (mode === 'v-i') {
      // For V-I mode, the calculated power is the input power
      calculatedInputPower = powerLoss;
      // Can't calculate efficiency without knowing the loss separately
    }
  }

  // Determine loss level
  const lossLevel = getLossLevel(powerLoss, calculatedInputPower);

  // Get warning message
  const warning = getWarning(lossLevel, efficiency);

  // Generate calculation steps
  const steps = generateSteps(inputs, powerLoss, calculatedInputPower, efficiency, actualPowerFactor, precision);

  return {
    mode,
    powerLoss,
    inputPower: calculatedInputPower,
    efficiency,
    voltage,
    current,
    resistance,
    powerFactor: actualPowerFactor,
    formula,
    lossLevel,
    warning,
    steps,
  };
}

function generateSteps(
  inputs: PowerLossInputs,
  powerLoss: number,
  inputPower: number | undefined,
  efficiency: number | undefined,
  powerFactor: number,
  precision: number
): string[] {
  const steps: string[] = [];
  const { mode, voltage, current, resistance } = inputs;

  steps.push("Power Loss Calculation", "");

  if (mode === 'i-r') {
    steps.push(
      "Given:",
      `  Current (I) = ${current} A`,
      `  Resistance (R) = ${resistance} Ω`,
      "",
      "Step 1: Calculate Power Loss using I²R formula",
      `  Formula: P_loss = I² × R`,
      `  P_loss = (${current})² × ${resistance}`,
      `  P_loss = ${current! * current!} × ${resistance}`,
      `  P_loss = ${formatNumber(powerLoss, precision)} W`,
      ""
    );
  } else if (mode === 'v-i') {
    steps.push(
      "Given:",
      `  Voltage (V) = ${voltage} V`,
      `  Current (I) = ${current} A`,
      powerFactor !== 1 ? `  Power Factor (PF) = ${powerFactor}` : "",
      "",
      "Step 1: Calculate Power",
      powerFactor !== 1 ? `  Formula: P = V × I × PF` : `  Formula: P = V × I`,
      powerFactor !== 1 
        ? `  P = ${voltage} × ${current} × ${powerFactor}`
        : `  P = ${voltage} × ${current}`,
      `  P = ${formatNumber(powerLoss, precision)} W`,
      ""
    );
  } else {
    steps.push(
      "Given:",
      `  Voltage (V) = ${voltage} V`,
      `  Current (I) = ${current} A`,
      `  Resistance (R) = ${resistance} Ω`,
      powerFactor !== 1 ? `  Power Factor (PF) = ${powerFactor}` : "",
      "",
      "Step 1: Calculate Power Loss (I²R)",
      `  Formula: P_loss = I² × R`,
      `  P_loss = (${current})² × ${resistance}`,
      `  P_loss = ${current! * current!} × ${resistance}`,
      `  P_loss = ${formatNumber(powerLoss, precision)} W`,
      "",
      "Step 2: Calculate Input Power",
      powerFactor !== 1 ? `  Formula: P_input = V × I × PF` : `  Formula: P_input = V × I`,
      powerFactor !== 1 
        ? `  P_input = ${voltage} × ${current} × ${powerFactor}`
        : `  P_input = ${voltage} × ${current}`,
      `  P_input = ${formatNumber(inputPower!, precision)} W`,
      ""
    );
  }

  if (efficiency !== undefined) {
    steps.push(
      "Step 3: Calculate Efficiency",
      `  Formula: Efficiency = ((P_input - P_loss) / P_input) × 100%`,
      `  Efficiency = ((${formatNumber(inputPower!, precision)} - ${formatNumber(powerLoss, precision)}) / ${formatNumber(inputPower!, precision)}) × 100%`,
      `  Efficiency = ${formatNumber(efficiency, precision)}%`,
      ""
    );
  }

  return steps.filter(step => step !== "");
}

// Get common presets
export function getPresets(mode: CalculationMode) {
  if (mode === 'i-r') {
    return [
      { name: "Low Current Wire", description: "1A through 10Ω", current: 1, resistance: 10 },
      { name: "Medium Current Wire", description: "5A through 2Ω", current: 5, resistance: 2 },
      { name: "High Current Wire", description: "10A through 1Ω", current: 10, resistance: 1 },
      { name: "Transmission Line", description: "50A through 0.5Ω", current: 50, resistance: 0.5 },
      { name: "Heavy Load", description: "100A through 0.1Ω", current: 100, resistance: 0.1 },
      { name: "Electronic Circuit", description: "0.5A through 100Ω", current: 0.5, resistance: 100 },
    ];
  } else if (mode === 'v-i') {
    return [
      { name: "12V DC System", description: "12V, 5A", voltage: 12, current: 5 },
      { name: "24V DC System", description: "24V, 10A", voltage: 24, current: 10 },
      { name: "120V AC Circuit", description: "120V, 15A", voltage: 120, current: 15 },
      { name: "220V AC Circuit", description: "220V, 10A", voltage: 220, current: 10 },
      { name: "240V AC Circuit", description: "240V, 20A", voltage: 240, current: 20 },
      { name: "480V Industrial", description: "480V, 50A", voltage: 480, current: 50 },
    ];
  } else {
    return [
      { name: "Household Circuit", description: "220V, 5A, 10Ω", voltage: 220, current: 5, resistance: 10 },
      { name: "Industrial Motor", description: "480V, 20A, 1Ω", voltage: 480, current: 20, resistance: 1 },
      { name: "DC Power Supply", description: "12V, 10A, 0.5Ω", voltage: 12, current: 10, resistance: 0.5 },
      { name: "Transmission Line", description: "11kV, 100A, 0.2Ω", voltage: 11000, current: 100, resistance: 0.2 },
    ];
  }
}

// History management
const HISTORY_KEY = 'power-loss-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: PowerLossInputs;
  result: PowerLossResult;
}

export function saveToHistory(inputs: PowerLossInputs, result: PowerLossResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

// Export to text
export function exportToText(inputs: PowerLossInputs, result: PowerLossResult): string {
  const modeLabels = {
    'i-r': 'Current & Resistance (I²R)',
    'v-i': 'Voltage & Current (V×I)',
    'mixed': 'Mixed Mode (V, I, R)',
  };

  const lines = [
    "Power Loss Calculator - Calculation Report",
    "=".repeat(60),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
  ];

  if (result.voltage !== undefined) {
    lines.push(`Voltage: ${result.voltage} V`);
  }
  if (result.current !== undefined) {
    lines.push(`Current: ${result.current} A`);
  }
  if (result.resistance !== undefined) {
    lines.push(`Resistance: ${result.resistance} Ω`);
  }
  if (result.powerFactor !== undefined && result.powerFactor !== 1) {
    lines.push(`Power Factor: ${result.powerFactor}`);
  }

  lines.push(
    "",
    "RESULTS:",
    "-".repeat(60),
    `Power Loss: ${formatNumber(result.powerLoss, inputs.precision || 2)} W`,
    `Formula: ${result.formula}`,
    `Loss Level: ${result.lossLevel.toUpperCase()}`
  );

  if (result.inputPower !== undefined) {
    lines.push(`Input Power: ${formatNumber(result.inputPower, inputs.precision || 2)} W`);
  }

  if (result.efficiency !== undefined) {
    lines.push(`Efficiency: ${formatNumber(result.efficiency, inputs.precision || 2)}%`);
  }

  if (result.warning) {
    lines.push(
      "",
      "WARNING:",
      "-".repeat(60),
      result.warning
    );
  }

  lines.push(
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  );

  lines.push(...result.steps);

  lines.push(
    "",
    "=".repeat(60),
    "Generated by Power Loss Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: PowerLossInputs, result: PowerLossResult): string {
  const headers = ["Parameter", "Value", "Unit"];
  const rows = [
    headers.join(","),
    `"Mode","${result.mode}",""`,
  ];

  if (result.voltage !== undefined) {
    rows.push(`"Voltage","${result.voltage}","V"`);
  }
  if (result.current !== undefined) {
    rows.push(`"Current","${result.current}","A"`);
  }
  if (result.resistance !== undefined) {
    rows.push(`"Resistance","${result.resistance}","Ω"`);
  }
  if (result.powerFactor !== undefined && result.powerFactor !== 1) {
    rows.push(`"Power Factor","${result.powerFactor}",""`);
  }

  rows.push(`"Power Loss","${formatNumber(result.powerLoss, inputs.precision || 2)}","W"`);

  if (result.inputPower !== undefined) {
    rows.push(`"Input Power","${formatNumber(result.inputPower, inputs.precision || 2)}","W"`);
  }

  if (result.efficiency !== undefined) {
    rows.push(`"Efficiency","${formatNumber(result.efficiency, inputs.precision || 2)}","%"`);
  }

  rows.push(`"Loss Level","${result.lossLevel}",""`);

  return rows.join("\n");
}

// Download file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
