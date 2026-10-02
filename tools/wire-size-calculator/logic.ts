import {
  WireData,
  WireSizeInputs,
  WireSizeResult,
  HistoryEntry,
  Preset,
  MaterialType,
} from "./types";

const HISTORY_KEY = "wire-size-calculator-history";
const MAX_HISTORY = 20;

// Metric (IEC) cable sizes with ampacity and resistance values
export const WIRE_TABLE: WireData[] = [
  {
    sizeMetric: "1.0",
    sizeAWG: "",
    ampacityCopper: 10,
    ampacityAluminum: 0,
    resistanceCopper: 18.1,
    resistanceAluminum: 0,
  },
  {
    sizeMetric: "1.5",
    sizeAWG: "",
    ampacityCopper: 15,
    ampacityAluminum: 12,
    resistanceCopper: 12.1,
    resistanceAluminum: 19.8,
  },
  {
    sizeMetric: "2.5",
    sizeAWG: "",
    ampacityCopper: 21,
    ampacityAluminum: 16,
    resistanceCopper: 7.41,
    resistanceAluminum: 12.2,
  },
  {
    sizeMetric: "4",
    sizeAWG: "",
    ampacityCopper: 28,
    ampacityAluminum: 22,
    resistanceCopper: 4.61,
    resistanceAluminum: 7.58,
  },
  {
    sizeMetric: "6",
    sizeAWG: "",
    ampacityCopper: 36,
    ampacityAluminum: 28,
    resistanceCopper: 3.08,
    resistanceAluminum: 5.06,
  },
  {
    sizeMetric: "10",
    sizeAWG: "",
    ampacityCopper: 50,
    ampacityAluminum: 39,
    resistanceCopper: 1.83,
    resistanceAluminum: 3.01,
  },
  {
    sizeMetric: "16",
    sizeAWG: "",
    ampacityCopper: 68,
    ampacityAluminum: 53,
    resistanceCopper: 1.15,
    resistanceAluminum: 1.89,
  },
  {
    sizeMetric: "25",
    sizeAWG: "",
    ampacityCopper: 89,
    ampacityAluminum: 69,
    resistanceCopper: 0.727,
    resistanceAluminum: 1.20,
  },
  {
    sizeMetric: "35",
    sizeAWG: "",
    ampacityCopper: 110,
    ampacityAluminum: 85,
    resistanceCopper: 0.524,
    resistanceAluminum: 0.862,
  },
  {
    sizeMetric: "50",
    sizeAWG: "",
    ampacityCopper: 134,
    ampacityAluminum: 104,
    resistanceCopper: 0.387,
    resistanceAluminum: 0.641,
  },
  {
    sizeMetric: "70",
    sizeAWG: "",
    ampacityCopper: 171,
    ampacityAluminum: 133,
    resistanceCopper: 0.268,
    resistanceAluminum: 0.443,
  },
  {
    sizeMetric: "95",
    sizeAWG: "",
    ampacityCopper: 207,
    ampacityAluminum: 161,
    resistanceCopper: 0.193,
    resistanceAluminum: 0.320,
  },
  {
    sizeMetric: "120",
    sizeAWG: "",
    ampacityCopper: 239,
    ampacityAluminum: 186,
    resistanceCopper: 0.153,
    resistanceAluminum: 0.253,
  },
  {
    sizeMetric: "150",
    sizeAWG: "",
    ampacityCopper: 276,
    ampacityAluminum: 215,
    resistanceCopper: 0.124,
    resistanceAluminum: 0.206,
  },
  {
    sizeMetric: "185",
    sizeAWG: "",
    ampacityCopper: 322,
    ampacityAluminum: 251,
    resistanceCopper: 0.0991,
    resistanceAluminum: 0.164,
  },
  {
    sizeMetric: "240",
    sizeAWG: "",
    ampacityCopper: 390,
    ampacityAluminum: 304,
    resistanceCopper: 0.0754,
    resistanceAluminum: 0.125,
  },
];

/* US (NEC) conductor sizes. sizeMetric is the conductor's actual area in mm².
   Ampacity: NEC Table 310.16, 75 °C column (typical terminations), capped by
   the small-conductor rule of NEC 240.4(D): 14 AWG copper 15 A, 12 AWG 20 A,
   10 AWG 30 A; 12 AWG aluminum 15 A, 10 AWG 25 A. Aluminum is not used at
   14 AWG. Resistance: NEC Chapter 9 Table 8, stranded, at 75 °C, in Ω/km. */
export const AWG_TABLE: WireData[] = [
  { sizeAWG: "14", sizeMetric: "2.08", ampacityCopper: 15, ampacityAluminum: 0, resistanceCopper: 10.3018, resistanceAluminum: 0 },
  { sizeAWG: "12", sizeMetric: "3.31", ampacityCopper: 20, ampacityAluminum: 15, resistanceCopper: 6.4961, resistanceAluminum: 10.6627 },
  { sizeAWG: "10", sizeMetric: "5.26", ampacityCopper: 30, ampacityAluminum: 25, resistanceCopper: 4.0682, resistanceAluminum: 6.6929 },
  { sizeAWG: "8", sizeMetric: "8.37", ampacityCopper: 50, ampacityAluminum: 40, resistanceCopper: 2.5525, resistanceAluminum: 4.1995 },
  { sizeAWG: "6", sizeMetric: "13.3", ampacityCopper: 65, ampacityAluminum: 50, resistanceCopper: 1.6109, resistanceAluminum: 2.6509 },
  { sizeAWG: "4", sizeMetric: "21.2", ampacityCopper: 85, ampacityAluminum: 65, resistanceCopper: 1.0105, resistanceAluminum: 1.6667 },
  { sizeAWG: "3", sizeMetric: "26.7", ampacityCopper: 100, ampacityAluminum: 75, resistanceCopper: 0.8038, resistanceAluminum: 1.3222 },
  { sizeAWG: "2", sizeMetric: "33.6", ampacityCopper: 115, ampacityAluminum: 90, resistanceCopper: 0.6365, resistanceAluminum: 1.0466 },
  { sizeAWG: "1", sizeMetric: "42.4", ampacityCopper: 130, ampacityAluminum: 100, resistanceCopper: 0.5052, resistanceAluminum: 0.8301 },
  { sizeAWG: "1/0", sizeMetric: "53.5", ampacityCopper: 150, ampacityAluminum: 120, resistanceCopper: 0.4003, resistanceAluminum: 0.6594 },
  { sizeAWG: "2/0", sizeMetric: "67.4", ampacityCopper: 175, ampacityAluminum: 135, resistanceCopper: 0.3173, resistanceAluminum: 0.5217 },
  { sizeAWG: "3/0", sizeMetric: "85.0", ampacityCopper: 200, ampacityAluminum: 155, resistanceCopper: 0.2513, resistanceAluminum: 0.4134 },
  { sizeAWG: "4/0", sizeMetric: "107", ampacityCopper: 230, ampacityAluminum: 180, resistanceCopper: 0.1995, resistanceAluminum: 0.3281 },
  { sizeAWG: "250 kcmil", sizeMetric: "127", ampacityCopper: 255, ampacityAluminum: 205, resistanceCopper: 0.169, resistanceAluminum: 0.2779 },
  { sizeAWG: "350 kcmil", sizeMetric: "177", ampacityCopper: 310, ampacityAluminum: 250, resistanceCopper: 0.1204, resistanceAluminum: 0.1985 },
];

export function wireTable(unit: 'mm²' | 'AWG'): WireData[] {
  return unit === 'AWG' ? AWG_TABLE : WIRE_TABLE;
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format number with specified decimal places
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Get wire size display
export function getWireSize(wire: WireData, unit: 'mm²' | 'AWG'): string {
  if (unit === 'mm²') return `${wire.sizeMetric} mm²`;
  return wire.sizeAWG.includes('kcmil') ? wire.sizeAWG : `${wire.sizeAWG} AWG`;
}

// Calculate voltage drop
function calculateVoltageDrop(
  current: number,
  distance: number,
  resistance: number,
  phaseType: 'single' | 'three'
): number {
  // Distance in meters, resistance in Ohms/km
  // Convert distance to km
  const distanceKm = distance / 1000;
  
  if (phaseType === 'single') {
    // Single phase: VD = 2 × L × I × R / 1000
    return 2 * distance * current * resistance / 1000;
  } else {
    // Three phase: VD = √3 × L × I × R / 1000
    return Math.sqrt(3) * distance * current * resistance / 1000;
  }
}

// Calculate wire size
export function calculateWireSize(inputs: WireSizeInputs): WireSizeResult {
  const { current, voltage, distance, material, phaseType, voltageDropLimit, wireUnit } = inputs;

  // Calculate maximum allowable voltage drop
  const maxVoltageDrop = (voltage * voltageDropLimit) / 100;

  // Filter wires based on material and ampacity
  const table = wireTable(wireUnit);
  const suitableWires = table.filter(wire => {
    const ampacity = material === 'copper' ? wire.ampacityCopper : wire.ampacityAluminum;
    return ampacity >= current && ampacity > 0;
  });

  if (suitableWires.length === 0) {
    throw new Error("Current exceeds maximum wire capacity. Consider parallel conductors or higher voltage.");
  }

  // Find the smallest wire that meets voltage drop requirements
  let recommendedWire: WireData | null = null;
  let actualVoltageDrop = 0;

  for (const wire of suitableWires) {
    const resistance = material === 'copper' ? wire.resistanceCopper : wire.resistanceAluminum;
    const vd = calculateVoltageDrop(current, distance, resistance, phaseType);

    if (vd <= maxVoltageDrop) {
      recommendedWire = wire;
      actualVoltageDrop = vd;
      break;
    }
  }

  // If no wire meets voltage drop, use the largest available
  if (!recommendedWire) {
    recommendedWire = suitableWires[suitableWires.length - 1];
    const resistance = material === 'copper' 
      ? recommendedWire.resistanceCopper 
      : recommendedWire.resistanceAluminum;
    actualVoltageDrop = calculateVoltageDrop(current, distance, resistance, phaseType);
  }

  const voltageDropPercentage = (actualVoltageDrop / voltage) * 100;
  const voltageAtLoad = voltage - actualVoltageDrop;
  // Loss in the conductors: 2·I²R for single phase (I × VD), 3·I²R for three phase (√3 × I × VD)
  const powerLoss = (phaseType === 'three' ? Math.sqrt(3) : 1) * current * actualVoltageDrop;
  const isSafe = voltageDropPercentage <= voltageDropLimit;

  // Get alternative wire sizes (next 2 larger sizes)
  const recommendedIndex = table.findIndex(w => w.sizeMetric === recommendedWire!.sizeMetric);
  const alternativeWires = table.slice(recommendedIndex + 1, recommendedIndex + 3).filter(wire => {
    const ampacity = material === 'copper' ? wire.ampacityCopper : wire.ampacityAluminum;
    return ampacity > 0;
  });

  // Generate warnings
  const warnings: string[] = [];

  if (!isSafe) {
    warnings.push(`Voltage drop (${formatNumber(voltageDropPercentage, 2)}%) exceeds ${voltageDropLimit}% limit. Consider larger wire or shorter distance.`);
  }

  if (voltageDropPercentage > 5) {
    warnings.push("Voltage drop exceeds 5%. This may cause equipment malfunction or damage.");
  }

  if (distance > 100 && phaseType === 'single') {
    warnings.push("Long cable run detected. Consider three-phase system for better efficiency.");
  }

  if (material === 'aluminum' && current < 20) {
    warnings.push("Aluminum wire is not recommended for low current applications. Consider copper.");
  }

  if (powerLoss > 100) {
    warnings.push(`High power loss (${formatNumber(powerLoss, 2)}W). Consider larger wire to reduce energy waste.`);
  }

  // Generate calculation steps
  const resistance = material === 'copper' 
    ? recommendedWire.resistanceCopper 
    : recommendedWire.resistanceAluminum;

  const steps = [
    `${phaseType === 'single' ? 'Single' : 'Three'} Phase Wire Size Calculation`,
    "",
    "Given:",
    `Current (I): ${current} A`,
    `Voltage (V): ${voltage} V`,
    `Distance (L): ${distance} m`,
    `Material: ${material.charAt(0).toUpperCase() + material.slice(1)}`,
    `Max Voltage Drop: ${voltageDropLimit}% (${formatNumber(maxVoltageDrop, 2)} V)`,
    "",
    "Step 1: Select Wire Based on Ampacity",
    `Minimum ampacity required: ${current} A`,
    `Selected wire: ${getWireSize(recommendedWire, wireUnit)}`,
    `Wire ampacity: ${material === 'copper' ? recommendedWire.ampacityCopper : recommendedWire.ampacityAluminum} A`,
    `Wire resistance: ${formatNumber(resistance, 4)} Ω/km`,
    "",
    "Step 2: Calculate Voltage Drop",
    phaseType === 'single' 
      ? `Formula: VD = 2 × L × I × R / 1000`
      : `Formula: VD = √3 × L × I × R / 1000`,
    phaseType === 'single'
      ? `VD = 2 × ${distance} × ${current} × ${formatNumber(resistance, 4)} / 1000`
      : `VD = 1.732 × ${distance} × ${current} × ${formatNumber(resistance, 4)} / 1000`,
    `VD = ${formatNumber(actualVoltageDrop, 2)} V`,
    `VD% = ${formatNumber(voltageDropPercentage, 2)}%`,
    "",
    "Step 3: Verify Safety",
    `Voltage at load: ${formatNumber(voltageAtLoad, 2)} V`,
    `Power loss: ${formatNumber(powerLoss, 2)} W`,
    `Status: ${isSafe ? 'Safe - Within limits' : 'Warning - Exceeds voltage drop limit'}`,
  ];

  return {
    recommendedWire,
    actualVoltageDrop,
    voltageDropPercentage,
    voltageAtLoad,
    powerLoss,
    isSafe,
    alternativeWires,
    warnings,
    steps,
  };
}

// Validation
export function validateInputs(inputs: WireSizeInputs): string | null {
  if (inputs.current <= 0) return "Current must be greater than zero";
  if (isNaN(inputs.current)) return "Current must be a valid number";
  if (inputs.distance <= 0) return "Distance must be greater than zero";
  if (isNaN(inputs.distance)) return "Distance must be a valid number";
  if (inputs.distance > 1000) return "Distance exceeds practical limits (max 1000m)";
  if (inputs.current > 500) return "Current exceeds calculator limits (max 500A)";
  return null;
}

// Presets
export function getPresets(): Preset[] {
  return [
    {
      name: "Home Lighting Circuit",
      description: "Typical residential lighting",
      current: 10,
      voltage: 230,
      distance: 15,
      material: 'copper',
      phaseType: 'single',
      voltageDropLimit: 3,
    },
    {
      name: "Kitchen Appliances",
      description: "Heavy-duty kitchen circuit",
      current: 20,
      voltage: 230,
      distance: 20,
      material: 'copper',
      phaseType: 'single',
      voltageDropLimit: 3,
    },
    {
      name: "Air Conditioner (Split)",
      description: "1.5 ton AC unit",
      current: 10,
      voltage: 230,
      distance: 25,
      material: 'copper',
      phaseType: 'single',
      voltageDropLimit: 2,
    },
    {
      name: "Electric Water Heater",
      description: "3kW water heater",
      current: 15,
      voltage: 230,
      distance: 30,
      material: 'copper',
      phaseType: 'single',
      voltageDropLimit: 3,
    },
    {
      name: "Industrial Motor (3-Phase)",
      description: "5.5kW motor",
      current: 10,
      voltage: 400,
      distance: 50,
      material: 'copper',
      phaseType: 'three',
      voltageDropLimit: 3,
    },
    {
      name: "Solar Panel Array",
      description: "DC solar installation",
      current: 25,
      voltage: 240,
      distance: 40,
      material: 'copper',
      phaseType: 'single',
      voltageDropLimit: 2,
    },
  ];
}

// History management
export function saveToHistory(inputs: WireSizeInputs, result: WireSizeResult): void {
  if (typeof window === 'undefined') return;

  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };

  const history = getHistory();
  history.unshift(entry);

  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(inputs: WireSizeInputs, result: WireSizeResult): string {
  let text = "Wire Size Calculator - Calculation Report\n";
  text += "=".repeat(50) + "\n\n";
  text += `Date: ${new Date().toLocaleString()}\n\n`;

  text += "Input Parameters:\n";
  text += "-".repeat(50) + "\n";
  text += `Current: ${inputs.current} A\n`;
  text += `Voltage: ${inputs.voltage} V\n`;
  text += `Distance: ${inputs.distance} m\n`;
  text += `Material: ${inputs.material.charAt(0).toUpperCase() + inputs.material.slice(1)}\n`;
  text += `Phase Type: ${inputs.phaseType === 'single' ? 'Single Phase' : 'Three Phase'}\n`;
  text += `Voltage Drop Limit: ${inputs.voltageDropLimit}%\n`;

  text += "\nResults:\n";
  text += "-".repeat(50) + "\n";
  text += `Recommended Wire: ${getWireSize(result.recommendedWire, inputs.wireUnit)}\n`;
  text += `Voltage Drop: ${formatNumber(result.actualVoltageDrop, 2)} V (${formatNumber(result.voltageDropPercentage, 2)}%)\n`;
  text += `Voltage at Load: ${formatNumber(result.voltageAtLoad, 2)} V\n`;
  text += `Power Loss: ${formatNumber(result.powerLoss, 2)} W\n`;
  text += `Status: ${result.isSafe ? 'Safe' : 'Warning - Check Configuration'}\n`;

  if (result.warnings.length > 0) {
    text += "\nWarnings:\n";
    text += "-".repeat(50) + "\n";
    result.warnings.forEach((warning, index) => {
      text += `${index + 1}. ${warning}\n`;
    });
  }

  if (result.alternativeWires.length > 0) {
    text += "\nAlternative Wire Sizes:\n";
    text += "-".repeat(50) + "\n";
    result.alternativeWires.forEach((wire, index) => {
      text += `${index + 1}. ${getWireSize(wire, inputs.wireUnit)}\n`;
    });
  }

  text += "\nCalculation Steps:\n";
  text += "-".repeat(50) + "\n";
  text += result.steps.join("\n");

  text += "\n\n" + "=".repeat(50) + "\n";
  text += "Generated by Wire Size Calculator\n";
  text += "Note: Always consult local electrical codes and a licensed electrician.\n";

  return text;
}

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
