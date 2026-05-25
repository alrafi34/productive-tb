import { SMPSInputs, SMPSResult, HistoryEntry, LoadType } from "./types";

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
export function validateInputs(inputs: SMPSInputs): string | null {
  const { outputVoltage, outputCurrent, efficiency, inputVoltage } = inputs;

  if (outputVoltage <= 0) {
    return "Output voltage must be greater than 0";
  }
  if (outputVoltage > 1000) {
    return "Output voltage exceeds typical range (>1000V)";
  }
  if (outputCurrent <= 0) {
    return "Output current must be greater than 0";
  }
  if (outputCurrent > 1000) {
    return "Output current exceeds typical range (>1000A)";
  }
  if (efficiency <= 0 || efficiency > 100) {
    return "Efficiency must be between 0% and 100%";
  }
  if (efficiency < 50) {
    return "Efficiency below 50% is unrealistic for SMPS";
  }
  if (inputVoltage !== undefined && inputVoltage <= 0) {
    return "Input voltage must be greater than 0";
  }
  if (inputVoltage !== undefined && inputVoltage > 1000) {
    return "Input voltage exceeds typical range (>1000V)";
  }

  return null;
}

// Calculate SMPS parameters
export function calculateSMPS(inputs: SMPSInputs): SMPSResult {
  const { outputVoltage, outputCurrent, efficiency, inputVoltage, loadType } = inputs;

  // Calculate output power
  const outputPower = outputVoltage * outputCurrent;

  // Calculate input power
  const efficiencyDecimal = efficiency / 100;
  const inputPower = outputPower / efficiencyDecimal;

  // Calculate power loss
  const powerLoss = inputPower - outputPower;
  const lossPercentage = (powerLoss / inputPower) * 100;

  // Calculate input current if input voltage is provided
  let inputCurrent: number | undefined;
  if (inputVoltage) {
    inputCurrent = inputPower / inputVoltage;
  }

  // Get efficiency rating
  const efficiencyRating = getEfficiencyRating(efficiency);

  // Generate warnings
  const warnings = generateWarnings(inputs, powerLoss, lossPercentage);

  // Generate calculation steps
  const steps = generateSteps(inputs, outputPower, inputPower, powerLoss, inputCurrent);

  return {
    outputPower,
    inputPower,
    inputCurrent,
    powerLoss,
    lossPercentage,
    efficiencyRating,
    warnings,
    steps,
  };
}

// Get efficiency rating
function getEfficiencyRating(efficiency: number): string {
  if (efficiency >= 95) return "Excellent";
  if (efficiency >= 90) return "Very Good";
  if (efficiency >= 85) return "Good";
  if (efficiency >= 80) return "Fair";
  if (efficiency >= 70) return "Poor";
  return "Very Poor";
}

// Generate warnings
function generateWarnings(inputs: SMPSInputs, powerLoss: number, lossPercentage: number): string[] {
  const warnings: string[] = [];

  if (inputs.efficiency < 70) {
    warnings.push("Very low efficiency detected. Consider design improvements or component upgrades.");
  }

  if (inputs.efficiency < 80) {
    warnings.push("Low efficiency may cause excessive heat generation. Ensure adequate cooling.");
  }

  if (powerLoss > 50) {
    warnings.push("High power loss detected. This will generate significant heat and reduce battery life.");
  }

  if (lossPercentage > 20) {
    warnings.push("Power loss exceeds 20%. Consider improving efficiency to reduce energy waste.");
  }

  if (inputs.outputVoltage > 48 && inputs.efficiency < 85) {
    warnings.push("High voltage with low efficiency may pose safety risks. Review design specifications.");
  }

  if (inputs.outputCurrent > 10 && inputs.efficiency < 90) {
    warnings.push("High current applications require high efficiency to minimize losses and heat.");
  }

  if (inputs.loadType === 'inductive' && inputs.efficiency > 95) {
    warnings.push("Very high efficiency with inductive loads may indicate measurement errors.");
  }

  return warnings;
}

// Generate calculation steps
function generateSteps(
  inputs: SMPSInputs,
  outputPower: number,
  inputPower: number,
  powerLoss: number,
  inputCurrent?: number
): string[] {
  const { outputVoltage, outputCurrent, efficiency, inputVoltage, loadType } = inputs;

  const steps = [
    "SMPS Calculation",
    "",
    "Given:",
    `  Output Voltage (Vout) = ${outputVoltage} V`,
    `  Output Current (Iout) = ${outputCurrent} A`,
    `  Efficiency (η) = ${efficiency}%`,
    inputVoltage ? `  Input Voltage (Vin) = ${inputVoltage} V` : "",
    `  Load Type = ${loadType}`,
    "",
    "Step 1: Calculate Output Power",
    `  Formula: Pout = Vout × Iout`,
    `  Pout = ${outputVoltage} × ${outputCurrent}`,
    `  Pout = ${formatNumber(outputPower, 2)} W`,
    "",
    "Step 2: Calculate Input Power",
    `  Formula: Pin = Pout / η`,
    `  Pin = ${formatNumber(outputPower, 2)} / ${efficiency / 100}`,
    `  Pin = ${formatNumber(inputPower, 2)} W`,
    "",
    "Step 3: Calculate Power Loss",
    `  Formula: Ploss = Pin - Pout`,
    `  Ploss = ${formatNumber(inputPower, 2)} - ${formatNumber(outputPower, 2)}`,
    `  Ploss = ${formatNumber(powerLoss, 2)} W`,
    "",
    inputCurrent ? "Step 4: Calculate Input Current" : "",
    inputCurrent ? `  Formula: Iin = Pin / Vin` : "",
    inputCurrent ? `  Iin = ${formatNumber(inputPower, 2)} / ${inputVoltage}` : "",
    inputCurrent ? `  Iin = ${formatNumber(inputCurrent, 3)} A` : "",
    inputCurrent ? "" : "",
    "Results:",
    `  Output Power: ${formatNumber(outputPower, 2)} W`,
    `  Input Power: ${formatNumber(inputPower, 2)} W`,
    `  Power Loss: ${formatNumber(powerLoss, 2)} W (${formatNumber((powerLoss / inputPower) * 100, 2)}%)`,
    inputCurrent ? `  Input Current: ${formatNumber(inputCurrent, 3)} A` : "",
    `  Efficiency Rating: ${getEfficiencyRating(efficiency)}`
  ];

  return steps.filter(step => step !== "");
}

// Get common presets
export function getPresets() {
  return [
    {
      name: "5V USB Charger",
      description: "Standard USB power supply",
      outputVoltage: 5,
      outputCurrent: 2,
      efficiency: 85,
      inputVoltage: 230,
      loadType: 'resistive' as LoadType
    },
    {
      name: "12V LED Driver",
      description: "LED strip power supply",
      outputVoltage: 12,
      outputCurrent: 3,
      efficiency: 90,
      inputVoltage: 230,
      loadType: 'resistive' as LoadType
    },
    {
      name: "24V Industrial",
      description: "Industrial automation supply",
      outputVoltage: 24,
      outputCurrent: 5,
      efficiency: 92,
      inputVoltage: 230,
      loadType: 'mixed' as LoadType
    },
    {
      name: "48V Telecom",
      description: "Telecommunications equipment",
      outputVoltage: 48,
      outputCurrent: 10,
      efficiency: 94,
      inputVoltage: 230,
      loadType: 'mixed' as LoadType
    },
    {
      name: "3.3V Logic Supply",
      description: "Digital circuit power",
      outputVoltage: 3.3,
      outputCurrent: 1.5,
      efficiency: 88,
      inputVoltage: 12,
      loadType: 'resistive' as LoadType
    },
    {
      name: "19V Laptop Adapter",
      description: "Laptop power adapter",
      outputVoltage: 19,
      outputCurrent: 4.74,
      efficiency: 89,
      inputVoltage: 230,
      loadType: 'mixed' as LoadType
    },
  ];
}

// Get efficiency color
export function getEfficiencyColor(efficiency: number): string {
  if (efficiency >= 90) return 'text-green-600';
  if (efficiency >= 80) return 'text-yellow-600';
  if (efficiency >= 70) return 'text-orange-600';
  return 'text-red-600';
}

// Get efficiency background color
export function getEfficiencyBgColor(efficiency: number): string {
  if (efficiency >= 90) return 'bg-green-50 border-green-200';
  if (efficiency >= 80) return 'bg-yellow-50 border-yellow-200';
  if (efficiency >= 70) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

// History management
const HISTORY_KEY = 'smps-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(inputs: SMPSInputs, result: SMPSResult): void {
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
export function exportToText(inputs: SMPSInputs, result: SMPSResult): string {
  const lines = [
    "SMPS Calculator - Analysis Report",
    "=".repeat(60),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `Output Voltage: ${inputs.outputVoltage} V`,
    `Output Current: ${inputs.outputCurrent} A`,
    `Efficiency: ${inputs.efficiency}%`,
    inputs.inputVoltage ? `Input Voltage: ${inputs.inputVoltage} V` : "",
    `Load Type: ${inputs.loadType}`,
    "",
    "RESULTS:",
    "-".repeat(60),
    `Output Power: ${formatNumber(result.outputPower, 2)} W`,
    `Input Power: ${formatNumber(result.inputPower, 2)} W`,
    result.inputCurrent ? `Input Current: ${formatNumber(result.inputCurrent, 3)} A` : "",
    `Power Loss: ${formatNumber(result.powerLoss, 2)} W`,
    `Loss Percentage: ${formatNumber(result.lossPercentage, 2)}%`,
    `Efficiency Rating: ${result.efficiencyRating}`,
  ];

  if (result.warnings.length > 0) {
    lines.push(
      "",
      "WARNINGS:",
      "-".repeat(60)
    );
    result.warnings.forEach(warning => lines.push(`• ${warning}`));
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
    "Generated by SMPS Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: SMPSInputs, result: SMPSResult): string {
  const headers = ["Parameter", "Value", "Unit"];
  const rows = [
    headers.join(","),
    `"Output Voltage","${inputs.outputVoltage}","V"`,
    `"Output Current","${inputs.outputCurrent}","A"`,
    `"Efficiency","${inputs.efficiency}","%"`,
    inputs.inputVoltage ? `"Input Voltage","${inputs.inputVoltage}","V"` : "",
    `"Load Type","${inputs.loadType}",""`,
    `"Output Power","${formatNumber(result.outputPower, 2)}","W"`,
    `"Input Power","${formatNumber(result.inputPower, 2)}","W"`,
    result.inputCurrent ? `"Input Current","${formatNumber(result.inputCurrent, 3)}","A"` : "",
    `"Power Loss","${formatNumber(result.powerLoss, 2)}","W"`,
    `"Loss Percentage","${formatNumber(result.lossPercentage, 2)}","%"`,
    `"Efficiency Rating","${result.efficiencyRating}",""`
  ];

  return rows.filter(row => row !== "").join("\n");
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