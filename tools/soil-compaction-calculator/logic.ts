import {
  Unit,
  CompactionStandard,
  CompactionInputs,
  CompactionCalculation,
  SoilPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "soil-compaction-history";
const MAX_HISTORY = 10;

// Convert between units
export function convertDensity(value: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return value;
  
  // g/cm³ to kN/m³: multiply by 9.81
  // kN/m³ to g/cm³: divide by 9.81
  if (fromUnit === "g/cm3" && toUnit === "kN/m3") {
    return value * 9.81;
  } else {
    return value / 9.81;
  }
}

// Get status based on compaction percentage
export function getStatus(
  compactionPercentage: number,
  requiredCompaction: CompactionStandard
): "pass" | "fail" | "warning" {
  if (compactionPercentage >= requiredCompaction) return "pass";
  if (compactionPercentage >= requiredCompaction - 2) return "warning";
  return "fail";
}

// Generate engineering notes
export function generateNotes(calculation: CompactionCalculation): string[] {
  const notes: string[] = [];
  
  if (calculation.fieldDryDensity > calculation.maxDryDensity) {
    notes.push("Warning: Field density exceeds maximum dry density - verify measurements");
  }
  
  if (calculation.status === "pass") {
    notes.push(`Compaction meets the ${calculation.requiredCompaction}% requirement`);
    if (calculation.compactionPercentage >= 98) {
      notes.push("Excellent compaction achieved - suitable for critical applications");
    }
  } else if (calculation.status === "warning") {
    notes.push(`Compaction is close to requirement but below ${calculation.requiredCompaction}%`);
    notes.push("Consider additional compaction effort or verify testing procedure");
  } else {
    notes.push(`Compaction does not meet the ${calculation.requiredCompaction}% requirement`);
    notes.push("Additional compaction required before proceeding with construction");
  }
  
  if (calculation.compactionPercentage < 85) {
    notes.push("Very low compaction - significant additional effort required");
  } else if (calculation.compactionPercentage < 90) {
    notes.push("Low compaction - multiple passes may be needed");
  }
  
  if (calculation.difference > 5) {
    notes.push(`${calculation.difference.toFixed(1)}% below requirement - substantial improvement needed`);
  } else if (calculation.difference > 0) {
    notes.push(`${calculation.difference.toFixed(1)}% below requirement - minor improvement needed`);
  }
  
  return notes;
}

// Main calculation function
export function calculateCompaction(inputs: CompactionInputs): CompactionCalculation {
  const {
    fieldDryDensity,
    maxDryDensity,
    requiredCompaction,
    unit
  } = inputs;
  
  // Calculate compaction percentage
  const compactionPercentage = (fieldDryDensity / maxDryDensity) * 100;
  
  // Calculate difference from requirement
  const difference = requiredCompaction - compactionPercentage;
  
  // Determine status
  const status = getStatus(compactionPercentage, requiredCompaction);
  
  const calculation: CompactionCalculation = {
    id: Date.now().toString(),
    fieldDryDensity,
    maxDryDensity,
    requiredCompaction,
    unit,
    compactionPercentage: parseFloat(compactionPercentage.toFixed(2)),
    status,
    difference: parseFloat(difference.toFixed(2)),
    notes: []
  };
  
  calculation.notes = generateNotes(calculation);
  
  return calculation;
}

// Soil presets
export function getSoilPresets(): SoilPreset[] {
  return [
    {
      name: "Sandy Soil (Loose)",
      description: "Typical loose sandy soil",
      typicalFieldDensity: 1.60,
      typicalMaxDensity: 1.85,
      unit: "g/cm3"
    },
    {
      name: "Sandy Soil (Compacted)",
      description: "Well-compacted sandy soil",
      typicalFieldDensity: 1.75,
      typicalMaxDensity: 1.85,
      unit: "g/cm3"
    },
    {
      name: "Clay Soil (Loose)",
      description: "Typical loose clay soil",
      typicalFieldDensity: 1.50,
      typicalMaxDensity: 1.75,
      unit: "g/cm3"
    },
    {
      name: "Clay Soil (Compacted)",
      description: "Well-compacted clay soil",
      typicalFieldDensity: 1.65,
      typicalMaxDensity: 1.75,
      unit: "g/cm3"
    },
    {
      name: "Silty Soil",
      description: "Typical silty soil",
      typicalFieldDensity: 1.55,
      typicalMaxDensity: 1.70,
      unit: "g/cm3"
    },
    {
      name: "Gravel (Compacted)",
      description: "Well-compacted gravel",
      typicalFieldDensity: 1.90,
      typicalMaxDensity: 2.00,
      unit: "g/cm3"
    }
  ];
}

// History management
export function saveToHistory(calculation: CompactionCalculation): void {
  if (typeof window === "undefined") return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    calculation
  };
  
  const newHistory = [entry, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
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
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(calculation: CompactionCalculation): string {
  const lines = [
    "SOIL COMPACTION CALCULATION REPORT",
    "=".repeat(50),
    "",
    "INPUT PARAMETERS:",
    `Field Dry Density: ${formatNumber(calculation.fieldDryDensity)} ${getUnitDisplay(calculation.unit)}`,
    `Maximum Dry Density: ${formatNumber(calculation.maxDryDensity)} ${getUnitDisplay(calculation.unit)}`,
    `Required Compaction: ${calculation.requiredCompaction}%`,
    "",
    "RESULTS:",
    `Compaction Percentage: ${formatNumber(calculation.compactionPercentage)}%`,
    `Status: ${calculation.status.toUpperCase()}`,
    `Difference from Requirement: ${formatNumber(calculation.difference)}%`,
    "",
    "ENGINEERING NOTES:",
    ...calculation.notes.map((note, i) => `${i + 1}. ${note}`),
    "",
    `Generated: ${new Date().toLocaleString()}`,
    ""
  ];
  
  return lines.join("\n");
}

export function exportToCSV(calculation: CompactionCalculation): string {
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Field Dry Density", calculation.fieldDryDensity.toString(), getUnitDisplay(calculation.unit)],
    ["Maximum Dry Density", calculation.maxDryDensity.toString(), getUnitDisplay(calculation.unit)],
    ["Required Compaction", calculation.requiredCompaction.toString(), "%"],
    ["Compaction Percentage", calculation.compactionPercentage.toString(), "%"],
    ["Difference", calculation.difference.toString(), "%"],
    ["Status", calculation.status, ""]
  ];
  
  return rows.map(row => row.join(",")).join("\n");
}

export function downloadFile(content: string, filename: string, type: string = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Utility functions
export function formatNumber(num: number): string {
  return num.toFixed(2);
}

export function getUnitDisplay(unit: Unit): string {
  return unit === "g/cm3" ? "g/cm³" : "kN/m³";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "pass":
      return "text-green-700";
    case "warning":
      return "text-yellow-700";
    case "fail":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case "pass":
      return "bg-green-50 border-green-200";
    case "warning":
      return "bg-yellow-50 border-yellow-200";
    case "fail":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

export function getProgressBarColor(status: string): string {
  switch (status) {
    case "pass":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "fail":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
