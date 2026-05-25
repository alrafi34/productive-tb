import { ArcFlashInputs, ArcFlashResult, HistoryEntry } from "./types";

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
export function validateInputs(inputs: ArcFlashInputs): string | null {
  const { voltage, faultCurrent, workingDistance, exposureTime } = inputs;

  if (voltage <= 0) {
    return "Voltage must be greater than 0";
  }
  if (voltage > 15000) {
    return "Voltage exceeds typical range (>15kV)";
  }
  if (faultCurrent <= 0) {
    return "Fault current must be greater than 0";
  }
  if (faultCurrent > 100) {
    return "Fault current exceeds typical range (>100kA)";
  }
  if (workingDistance <= 0) {
    return "Working distance must be greater than 0";
  }
  if (workingDistance > 120) {
    return "Working distance exceeds typical range (>120 inches)";
  }
  if (exposureTime !== undefined && exposureTime <= 0) {
    return "Exposure time must be greater than 0";
  }

  return null;
}

// Calculate arc flash incident energy
export function calculateArcFlash(inputs: ArcFlashInputs): ArcFlashResult {
  const { voltage, faultCurrent, workingDistance, exposureTime = 0.1, equipmentType, precision = 2 } = inputs;

  // Simplified IEEE 1584-inspired calculation
  const k = getEquipmentFactor(equipmentType);
  
  // Basic incident energy formula: IE = (k * V * I * t) / (D^2)
  const incidentEnergy = (k * voltage * faultCurrent * exposureTime) / (workingDistance * workingDistance);

  // Determine risk level
  const riskLevel = getRiskLevel(incidentEnergy);

  // Get PPE category
  const ppeCategory = getPPECategory(incidentEnergy);

  // Calculate safe working distance (distance where IE = 1.2 cal/cm²)
  const safetyDistance = Math.sqrt((k * voltage * faultCurrent * exposureTime) / 1.2);

  // Get warning message
  const warning = getWarning(riskLevel, incidentEnergy);

  // Generate calculation steps
  const steps = generateSteps(inputs, incidentEnergy, safetyDistance, k, precision);

  return {
    incidentEnergy,
    riskLevel,
    ppeCategory,
    safetyDistance,
    warning,
    steps,
  };
}

// Get equipment factor
function getEquipmentFactor(equipmentType?: string): number {
  switch (equipmentType) {
    case 'panel': return 0.008;
    case 'switchgear': return 0.012;
    case 'mcc': return 0.010;
    case 'transformer': return 0.015;
    default: return 0.010; // Default factor
  }
}

// Determine risk level
function getRiskLevel(incidentEnergy: number): 'low' | 'medium' | 'high' | 'extreme' {
  if (incidentEnergy < 1.2) return 'low';
  if (incidentEnergy < 4) return 'medium';
  if (incidentEnergy < 8) return 'high';
  return 'extreme';
}

// Get PPE category
function getPPECategory(incidentEnergy: number): string {
  if (incidentEnergy < 1.2) return 'Category 0/1';
  if (incidentEnergy < 4) return 'Category 2';
  if (incidentEnergy < 8) return 'Category 3';
  return 'Category 4';
}

// Get warning message
function getWarning(riskLevel: string, incidentEnergy: number): string | undefined {
  switch (riskLevel) {
    case 'extreme':
      return '⚠️ EXTREME RISK: Very high arc flash hazard detected. Use highest level PPE and restrict access.';
    case 'high':
      return '⚠️ HIGH RISK: Significant arc flash hazard. Use appropriate PPE and maintain controlled access zone.';
    case 'medium':
      return 'ℹ️ MEDIUM RISK: Moderate arc flash hazard. Use proper PPE and follow safety procedures.';
    case 'low':
      return 'ℹ️ LOW RISK: Minimal arc flash hazard. Standard electrical safety practices apply.';
    default:
      return undefined;
  }
}

// Generate calculation steps
function generateSteps(
  inputs: ArcFlashInputs,
  incidentEnergy: number,
  safetyDistance: number,
  k: number,
  precision: number
): string[] {
  const { voltage, faultCurrent, workingDistance, exposureTime = 0.1, equipmentType } = inputs;

  const steps = [
    "Arc Flash Calculation",
    "",
    "Given:",
    `  System Voltage (V) = ${voltage} V`,
    `  Fault Current (I) = ${faultCurrent} kA`,
    `  Working Distance (D) = ${workingDistance} inches`,
    `  Exposure Time (t) = ${exposureTime} seconds`,
    equipmentType ? `  Equipment Type = ${equipmentType}` : "",
    "",
    "Step 1: Determine Equipment Factor",
    `  Equipment Factor (k) = ${k}`,
    "",
    "Step 2: Calculate Incident Energy",
    `  Formula: IE = (k × V × I × t) / D²`,
    `  IE = (${k} × ${voltage} × ${faultCurrent} × ${exposureTime}) / ${workingDistance}²`,
    `  IE = ${formatNumber((k * voltage * faultCurrent * exposureTime), precision)} / ${workingDistance * workingDistance}`,
    `  IE = ${formatNumber(incidentEnergy, precision)} cal/cm²`,
    "",
    "Step 3: Determine Safety Distance",
    `  Safety Distance (IE = 1.2 cal/cm²)`,
    `  D_safe = √((k × V × I × t) / 1.2)`,
    `  D_safe = ${formatNumber(safetyDistance, precision)} inches`,
    "",
    "Results:",
    `  Incident Energy: ${formatNumber(incidentEnergy, precision)} cal/cm²`,
    `  PPE Category: ${getPPECategory(incidentEnergy)}`,
    `  Risk Level: ${getRiskLevel(incidentEnergy).toUpperCase()}`,
    `  Safe Working Distance: ${formatNumber(safetyDistance, precision)} inches`
  ];

  return steps.filter(step => step !== "");
}

// Get common presets
export function getPresets() {
  return [
    { name: "480V Panel", description: "480V, 20kA, 18 inches", voltage: 480, faultCurrent: 20, workingDistance: 18, equipmentType: 'panel' },
    { name: "600V Switchgear", description: "600V, 35kA, 24 inches", voltage: 600, faultCurrent: 35, workingDistance: 24, equipmentType: 'switchgear' },
    { name: "240V MCC", description: "240V, 15kA, 18 inches", voltage: 240, faultCurrent: 15, workingDistance: 18, equipmentType: 'mcc' },
    { name: "4160V Transformer", description: "4160V, 25kA, 36 inches", voltage: 4160, faultCurrent: 25, workingDistance: 36, equipmentType: 'transformer' },
    { name: "208V Panel", description: "208V, 10kA, 18 inches", voltage: 208, faultCurrent: 10, workingDistance: 18, equipmentType: 'panel' },
    { name: "13.8kV Switchgear", description: "13.8kV, 40kA, 48 inches", voltage: 13800, faultCurrent: 40, workingDistance: 48, equipmentType: 'switchgear' },
  ];
}

// History management
const HISTORY_KEY = 'arc-flash-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ArcFlashInputs, result: ArcFlashResult): void {
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
export function exportToText(inputs: ArcFlashInputs, result: ArcFlashResult): string {
  const lines = [
    "Arc Flash Calculator - Safety Assessment Report",
    "=".repeat(60),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `System Voltage: ${inputs.voltage} V`,
    `Fault Current: ${inputs.faultCurrent} kA`,
    `Working Distance: ${inputs.workingDistance} inches`,
    `Exposure Time: ${inputs.exposureTime || 0.1} seconds`,
    inputs.equipmentType ? `Equipment Type: ${inputs.equipmentType}` : "",
    "",
    "RESULTS:",
    "-".repeat(60),
    `Incident Energy: ${formatNumber(result.incidentEnergy, inputs.precision || 2)} cal/cm²`,
    `Risk Level: ${result.riskLevel.toUpperCase()}`,
    `PPE Category: ${result.ppeCategory}`,
    `Safe Working Distance: ${formatNumber(result.safetyDistance, inputs.precision || 2)} inches`,
    "",
    result.warning ? "WARNING:" : "",
    result.warning ? "-".repeat(60) : "",
    result.warning || "",
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  ];

  lines.push(...result.steps);

  lines.push(
    "",
    "=".repeat(60),
    "Generated by Arc Flash Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: ArcFlashInputs, result: ArcFlashResult): string {
  const headers = ["Parameter", "Value", "Unit"];
  const rows = [
    headers.join(","),
    `"System Voltage","${inputs.voltage}","V"`,
    `"Fault Current","${inputs.faultCurrent}","kA"`,
    `"Working Distance","${inputs.workingDistance}","inches"`,
    `"Exposure Time","${inputs.exposureTime || 0.1}","seconds"`,
    inputs.equipmentType ? `"Equipment Type","${inputs.equipmentType}",""` : "",
    `"Incident Energy","${formatNumber(result.incidentEnergy, inputs.precision || 2)}","cal/cm²"`,
    `"Risk Level","${result.riskLevel}",""`,
    `"PPE Category","${result.ppeCategory}",""`,
    `"Safe Working Distance","${formatNumber(result.safetyDistance, inputs.precision || 2)}","inches"`
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