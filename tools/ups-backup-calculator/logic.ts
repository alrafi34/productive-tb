import { UPSBackupInputs, UPSBackupResult, HistoryEntry, Scenario } from "./types";

// Re-export types for UI component
export type { HistoryEntry, Scenario } from "./types";

// Format number with precision
export function formatNumber(value: number, decimals: number = 2): string {
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
export function validateInputs(inputs: UPSBackupInputs): string | null {
  if (inputs.loadPower <= 0) {
    return "Load power must be greater than 0";
  }

  if (inputs.capacityMode === 'va') {
    if (!inputs.vaRating || inputs.vaRating <= 0) {
      return "VA rating must be greater than 0";
    }
  } else if (inputs.capacityMode === 'wh') {
    if (!inputs.wattHour || inputs.wattHour <= 0) {
      return "Watt-hour must be greater than 0";
    }
  } else if (inputs.capacityMode === 'battery') {
    if (!inputs.voltage || inputs.voltage <= 0) {
      return "Voltage must be greater than 0";
    }
    if (!inputs.ampereHour || inputs.ampereHour <= 0) {
      return "Ampere-hour must be greater than 0";
    }
  }

  if (inputs.efficiency <= 0 || inputs.efficiency > 100) {
    return "Efficiency must be between 0 and 100";
  }

  if (inputs.powerFactor <= 0 || inputs.powerFactor > 1) {
    return "Power factor must be between 0 and 1";
  }

  if (inputs.safetyBuffer < 0 || inputs.safetyBuffer > 100) {
    return "Safety buffer must be between 0 and 100";
  }

  return null;
}

// Calculate backup time
export function calculateBackupTime(inputs: UPSBackupInputs): UPSBackupResult {
  const { loadPower, capacityMode, vaRating, wattHour, voltage, ampereHour, efficiency, powerFactor, safetyBuffer } = inputs;

  let totalEnergyWh = 0;

  // Step 1: Calculate total energy based on capacity mode
  if (capacityMode === 'va') {
    // Convert VA to Wh using power factor
    totalEnergyWh = (vaRating! * powerFactor);
  } else if (capacityMode === 'wh') {
    totalEnergyWh = wattHour!;
  } else if (capacityMode === 'battery') {
    // Energy = Voltage × Ampere-hour
    totalEnergyWh = voltage! * ampereHour!;
  }

  // Step 2: Apply efficiency
  const efficiencyFactor = efficiency / 100;
  const afterEfficiency = totalEnergyWh * efficiencyFactor;
  const efficiencyLoss = totalEnergyWh - afterEfficiency;

  // Step 3: Apply safety buffer
  const bufferFactor = 1 - (safetyBuffer / 100);
  const usableEnergyWh = afterEfficiency * bufferFactor;
  const safetyBufferLoss = afterEfficiency - usableEnergyWh;

  // Step 4: Calculate backup time
  const backupTimeHours = usableEnergyWh / loadPower;
  const backupTimeMinutes = Math.floor((backupTimeHours % 1) * 60);
  const backupTimeFormatted = formatTimeHHMM(backupTimeHours);

  // Check for overload
  const isOverload = loadPower > totalEnergyWh;
  let warning: string | undefined;

  if (isOverload) {
    warning = "⚠️ WARNING: Load exceeds battery capacity. UPS may not start or will shut down immediately.";
  } else if (backupTimeHours < 0.1) {
    warning = "⚠️ Very short backup time. Consider increasing battery capacity or reducing load.";
  } else if (backupTimeHours > 24) {
    warning = "ℹ️ Backup time exceeds 24 hours. Verify your inputs are correct.";
  }

  // Generate calculation steps
  const steps = generateSteps(inputs, totalEnergyWh, afterEfficiency, usableEnergyWh, backupTimeHours, efficiencyLoss, safetyBufferLoss);

  return {
    backupTimeHours,
    backupTimeMinutes,
    backupTimeFormatted,
    totalEnergyWh,
    usableEnergyWh,
    efficiencyLoss,
    safetyBufferLoss,
    isOverload,
    warning,
    steps,
  };
}

function generateSteps(
  inputs: UPSBackupInputs,
  totalEnergyWh: number,
  afterEfficiency: number,
  usableEnergyWh: number,
  backupTimeHours: number,
  efficiencyLoss: number,
  safetyBufferLoss: number
): string[] {
  const steps: string[] = [];
  const { capacityMode, vaRating, wattHour, voltage, ampereHour, loadPower, efficiency, powerFactor, safetyBuffer } = inputs;

  steps.push("UPS Backup Time Calculation", "");

  steps.push("Step 1: Calculate Total Energy");
  if (capacityMode === 'va') {
    steps.push(`  VA Rating = ${vaRating} VA`);
    steps.push(`  Power Factor = ${powerFactor}`);
    steps.push(`  Total Energy = ${vaRating} × ${powerFactor} = ${formatNumber(totalEnergyWh, 2)} Wh`);
  } else if (capacityMode === 'wh') {
    steps.push(`  Total Energy = ${wattHour} Wh`);
  } else if (capacityMode === 'battery') {
    steps.push(`  Voltage = ${voltage} V`);
    steps.push(`  Capacity = ${ampereHour} Ah`);
    steps.push(`  Total Energy = ${voltage} × ${ampereHour} = ${formatNumber(totalEnergyWh, 2)} Wh`);
  }
  steps.push("");

  steps.push("Step 2: Apply Efficiency Loss");
  steps.push(`  Efficiency = ${efficiency}%`);
  steps.push(`  After Efficiency = ${formatNumber(totalEnergyWh, 2)} × ${efficiency / 100} = ${formatNumber(afterEfficiency, 2)} Wh`);
  steps.push(`  Efficiency Loss = ${formatNumber(efficiencyLoss, 2)} Wh`);
  steps.push("");

  steps.push("Step 3: Apply Safety Buffer");
  steps.push(`  Safety Buffer = ${safetyBuffer}%`);
  steps.push(`  Usable Energy = ${formatNumber(afterEfficiency, 2)} × ${1 - safetyBuffer / 100} = ${formatNumber(usableEnergyWh, 2)} Wh`);
  steps.push(`  Buffer Reserve = ${formatNumber(safetyBufferLoss, 2)} Wh`);
  steps.push("");

  steps.push("Step 4: Calculate Backup Time");
  steps.push(`  Load Power = ${loadPower} W`);
  steps.push(`  Backup Time = ${formatNumber(usableEnergyWh, 2)} ÷ ${loadPower} = ${formatNumber(backupTimeHours, 2)} hours`);
  steps.push(`  Backup Time = ${formatTimeHHMM(backupTimeHours)}`);
  steps.push("");

  return steps;
}

// Format time as HH:MM
export function formatTimeHHMM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours % 1) * 60);
  
  if (h === 0) {
    return `${m} minutes`;
  } else if (m === 0) {
    return `${h} hour${h !== 1 ? 's' : ''}`;
  } else {
    return `${h} hour${h !== 1 ? 's' : ''} ${m} minute${m !== 1 ? 's' : ''}`;
  }
}

// Common battery presets
export function getBatteryPresets() {
  return [
    { name: "Small UPS (12V 7Ah)", voltage: 12, ampereHour: 7, description: "Home PC backup" },
    { name: "Medium UPS (12V 40Ah)", voltage: 12, ampereHour: 40, description: "Office workstation" },
    { name: "Large UPS (12V 100Ah)", voltage: 12, ampereHour: 100, description: "Server room" },
    { name: "24V System (24V 40Ah)", voltage: 24, ampereHour: 40, description: "Industrial UPS" },
    { name: "48V System (48V 20Ah)", voltage: 48, ampereHour: 20, description: "Telecom backup" },
  ];
}

// Common load presets
export function getLoadPresets() {
  return [
    { name: "Router", power: 15 },
    { name: "Desktop PC", power: 300 },
    { name: "Laptop", power: 65 },
    { name: "Monitor", power: 30 },
    { name: "Server", power: 500 },
    { name: "NAS", power: 50 },
  ];
}

// History management
const HISTORY_KEY = 'ups-backup-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(inputs: UPSBackupInputs, result: UPSBackupResult): void {
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

// Scenario management
const SCENARIOS_KEY = 'ups-backup-calculator-scenarios';

export function saveScenario(name: string, inputs: UPSBackupInputs): void {
  try {
    const scenarios = getScenarios();
    const scenario: Scenario = {
      id: Date.now().toString(),
      name,
      inputs,
    };
    scenarios.push(scenario);
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error('Failed to save scenario:', error);
  }
}

export function getScenarios(): Scenario[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(SCENARIOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load scenarios:', error);
    return [];
  }
}

export function deleteScenario(id: string): void {
  try {
    const scenarios = getScenarios().filter(s => s.id !== id);
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error('Failed to delete scenario:', error);
  }
}

// Export to text
export function exportToText(inputs: UPSBackupInputs, result: UPSBackupResult): string {
  const lines = [
    "UPS Backup Calculator - Calculation Report",
    "=".repeat(60),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `Load Power: ${inputs.loadPower} W`,
  ];

  if (inputs.capacityMode === 'va') {
    lines.push(`VA Rating: ${inputs.vaRating} VA`);
  } else if (inputs.capacityMode === 'wh') {
    lines.push(`Watt-Hour: ${inputs.wattHour} Wh`);
  } else if (inputs.capacityMode === 'battery') {
    lines.push(`Battery Voltage: ${inputs.voltage} V`);
    lines.push(`Battery Capacity: ${inputs.ampereHour} Ah`);
  }

  lines.push(
    `Efficiency: ${inputs.efficiency}%`,
    `Power Factor: ${inputs.powerFactor}`,
    `Safety Buffer: ${inputs.safetyBuffer}%`,
    "",
    "RESULTS:",
    "-".repeat(60),
    `Backup Time: ${formatNumber(result.backupTimeHours, 2)} hours (${result.backupTimeFormatted})`,
    `Total Energy: ${formatNumber(result.totalEnergyWh, 2)} Wh`,
    `Usable Energy: ${formatNumber(result.usableEnergyWh, 2)} Wh`,
    `Efficiency Loss: ${formatNumber(result.efficiencyLoss, 2)} Wh`,
    `Safety Buffer Reserve: ${formatNumber(result.safetyBufferLoss, 2)} Wh`,
  );

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
    "Generated by UPS Backup Calculator"
  );

  return lines.join("\n");
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
