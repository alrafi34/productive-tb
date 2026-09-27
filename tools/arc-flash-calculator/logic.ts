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

  if (voltage < 208 || voltage > 15000) {
    return "IEEE 1584 covers system voltages from 208 V to 15,000 V";
  }
  if (faultCurrent < 0.7 || faultCurrent > 106) {
    return "IEEE 1584 covers bolted fault currents from 0.7 to 106 kA";
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
/*
 * IEEE 1584-2002 empirical model (208 V to 15 kV, 0.7 to 106 kA bolted
 * fault). The standard also asks for a second run at 85% of the arcing
 * current with its own clearing time on low-voltage systems; that needs the
 * protective device curve, so it is left to a full study.
 */
interface EquipmentModel { gap: number; x: number; enclosed: boolean; label: string }

function getEquipmentModel(equipmentType: string | undefined, kV: number): EquipmentModel {
  const type = equipmentType === 'switchgear' || equipmentType === 'open' || equipmentType === 'mcc' ? equipmentType : 'panel';
  if (kV <= 1) {
    if (type === 'switchgear') return { gap: 32, x: 1.473, enclosed: true, label: 'Switchgear' };
    if (type === 'open') return { gap: 40, x: 2.0, enclosed: false, label: 'Open air / cable' };
    return { gap: 25, x: 1.641, enclosed: true, label: type === 'mcc' ? 'MCC' : 'Panelboard' };
  }
  if (type === 'open') return { gap: kV <= 5 ? 102 : 153, x: 2.0, enclosed: false, label: 'Open air / cable' };
  // Switchgear, MCCs and panels above 1 kV use the switchgear values
  return { gap: kV <= 5 ? 102 : 153, x: 0.973, enclosed: true, label: 'Switchgear' };
}

export function calculateArcFlash(inputs: ArcFlashInputs): ArcFlashResult {
  const { voltage, faultCurrent, workingDistance, exposureTime = 0.1, equipmentType, grounding = 'grounded', precision = 2 } = inputs;

  const kV = voltage / 1000;
  const m = getEquipmentModel(equipmentType, kV);
  const lgIbf = Math.log10(faultCurrent);

  // Arcing current, kA
  const lgIa = kV < 1
    ? (m.enclosed ? -0.097 : -0.153) + 0.662 * lgIbf + 0.0966 * kV + 0.000526 * m.gap
      + 0.5588 * kV * lgIbf - 0.00304 * m.gap * lgIbf
    : 0.00402 + 0.983 * lgIbf;
  const arcingCurrent = Math.pow(10, lgIa);

  // Normalized incident energy (0.2 s, 610 mm), J/cm²
  const K1 = m.enclosed ? -0.555 : -0.792;
  const K2 = grounding === 'grounded' ? -0.113 : 0;
  const En = Math.pow(10, K1 + K2 + 1.081 * lgIa + 0.0011 * m.gap);

  const Cf = kV <= 1 ? 1.5 : 1.0;
  const scaled = 4.184 * Cf * En * (exposureTime / 0.2); // J/cm² at 610 mm
  const Dmm = workingDistance * 25.4;
  const incidentEnergy = (scaled * Math.pow(610 / Dmm, m.x)) / 4.184; // cal/cm²

  // Arc flash boundary: where the energy falls to 1.2 cal/cm² (5.0 J/cm²)
  const safetyDistance = Math.pow((scaled * Math.pow(610, m.x)) / 5.0, 1 / m.x) / 25.4;

  const riskLevel = getRiskLevel(incidentEnergy);
  const ppeCategory = getPPECategory(incidentEnergy);
  const warning = getWarning(riskLevel, incidentEnergy);
  const steps = generateSteps(inputs, { kV, m, arcingCurrent, En, Cf, incidentEnergy, safetyDistance, K1, K2 }, precision);

  return {
    incidentEnergy,
    riskLevel,
    ppeCategory,
    safetyDistance,
    arcingCurrent,
    warning,
    steps,
  };
}

// Risk level by incident energy, cal/cm²
function getRiskLevel(incidentEnergy: number): 'low' | 'medium' | 'high' | 'extreme' {
  if (incidentEnergy < 1.2) return 'low';
  if (incidentEnergy < 8) return 'medium';
  if (incidentEnergy <= 40) return 'high';
  return 'extreme';
}

// Minimum arc rating of the PPE (NFPA 70E category ratings: 4, 8, 25, 40 cal/cm²)
function getPPECategory(incidentEnergy: number): string {
  if (incidentEnergy < 1.2) return 'Below 1.2 cal/cm²';
  if (incidentEnergy <= 4) return 'Arc rating ≥ 4 cal/cm² (Category 1)';
  if (incidentEnergy <= 8) return 'Arc rating ≥ 8 cal/cm² (Category 2)';
  if (incidentEnergy <= 25) return 'Arc rating ≥ 25 cal/cm² (Category 3)';
  if (incidentEnergy <= 40) return 'Arc rating ≥ 40 cal/cm² (Category 4)';
  return 'Above 40 cal/cm²: de-energize';
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
interface StepValues {
  kV: number; m: EquipmentModel; arcingCurrent: number; En: number; Cf: number;
  incidentEnergy: number; safetyDistance: number; K1: number; K2: number;
}

function generateSteps(inputs: ArcFlashInputs, v: StepValues, precision: number): string[] {
  const { voltage, faultCurrent, workingDistance, exposureTime = 0.1, grounding = 'grounded' } = inputs;
  const f = (n: number) => formatNumber(n, precision);
  return [
    "Arc Flash Calculation (IEEE 1584-2002)",
    "",
    "Given:",
    `  System voltage = ${voltage} V (${f(v.kV)} kV)`,
    `  Bolted fault current Ibf = ${faultCurrent} kA`,
    `  Working distance D = ${workingDistance} in (${f(workingDistance * 25.4)} mm)`,
    `  Arc duration t = ${exposureTime} s`,
    `  Equipment = ${v.m.label}: gap G = ${v.m.gap} mm, distance exponent x = ${v.m.x}`,
    `  System = ${grounding === 'grounded' ? 'solidly grounded' : 'ungrounded or resistance grounded'}`,
    "",
    "Step 1: Arcing current",
    v.kV < 1
      ? "  lg Ia = K + 0.662 lg Ibf + 0.0966 V + 0.000526 G + 0.5588 V lg Ibf − 0.00304 G lg Ibf"
      : "  lg Ia = 0.00402 + 0.983 lg Ibf",
    `  Ia = ${f(v.arcingCurrent)} kA`,
    "",
    "Step 2: Normalized incident energy (0.2 s, 610 mm)",
    `  lg En = K1 + K2 + 1.081 lg Ia + 0.0011 G  (K1 = ${v.K1}, K2 = ${v.K2})`,
    `  En = ${f(v.En)} J/cm²`,
    "",
    "Step 3: Incident energy at the working distance",
    `  E = 4.184 × Cf × En × (t / 0.2) × (610 / D)^x  (Cf = ${v.Cf})`,
    `  E = ${f(v.incidentEnergy * 4.184)} J/cm² = ${f(v.incidentEnergy)} cal/cm²`,
    "",
    "Step 4: Arc flash boundary (E = 1.2 cal/cm²)",
    `  DB = ${f(v.safetyDistance)} in (${f(v.safetyDistance * 25.4)} mm)`,
    "",
    "Results:",
    `  Incident energy: ${f(v.incidentEnergy)} cal/cm²`,
    `  PPE: ${getPPECategory(v.incidentEnergy)}`,
    `  Risk level: ${getRiskLevel(v.incidentEnergy).toUpperCase()}`,
    `  Arc flash boundary: ${f(v.safetyDistance)} in`,
  ];
}

// Get common presets
export function getPresets() {
  return [
    { name: "480V Panel", description: "480V, 20kA, 18 inches", voltage: 480, faultCurrent: 20, workingDistance: 18, equipmentType: 'panel' },
    { name: "600V Switchgear", description: "600V, 35kA, 24 inches", voltage: 600, faultCurrent: 35, workingDistance: 24, equipmentType: 'switchgear' },
    { name: "240V MCC", description: "240V, 15kA, 18 inches", voltage: 240, faultCurrent: 15, workingDistance: 18, equipmentType: 'mcc' },
    { name: "4.16kV Switchgear", description: "4160V, 25kA, 36 inches", voltage: 4160, faultCurrent: 25, workingDistance: 36, equipmentType: 'switchgear' },
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