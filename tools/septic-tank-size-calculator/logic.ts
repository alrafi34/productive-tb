import { Unit, RetentionTime, SludgeFactor, SepticTankInputs, SepticTankCalculation, SepticTankPreset, HistoryEntry } from "./types";

const HISTORY_KEY = "septic-tank-size-calculator-history";
const MAX_HISTORY = 10;

// Standard tank sizes in liters
const STANDARD_TANK_SIZES = [
  500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7500, 10000, 15000, 20000
];

/**
 * Calculate septic tank size
 * Formula: Volume = Users × Usage × Retention × (1 + Sludge Factor)
 */
export function calculateSepticTankSize(inputs: SepticTankInputs): SepticTankCalculation {
  const { numberOfUsers, waterUsagePerPerson, retentionTime, sludgeFactor, unit } = inputs;
  
  // Calculate daily flow
  const dailyFlow = numberOfUsers * waterUsagePerPerson;
  
  // Calculate base volume (without sludge)
  const baseVolume = dailyFlow * retentionTime;
  
  // Calculate adjusted volume (with sludge accumulation)
  const adjustedVolume = baseVolume * (1 + sludgeFactor);
  
  // Round to nearest standard tank size
  const recommendedTankSize = findNearestStandardSize(adjustedVolume);
  
  // Convert to other units
  const volumeInCubicMeters = adjustedVolume / 1000;
  const volumeInGallons = adjustedVolume * 0.264172;
  
  // Suggest dimensions for rectangular tank (L:W:D = 2:1:1.5 ratio)
  const volumeM3 = adjustedVolume / 1000;
  const suggestedDepth = Math.pow(volumeM3 / 3, 1/3) * 1.5;
  const suggestedWidth = Math.pow(volumeM3 / 3, 1/3);
  const suggestedLength = Math.pow(volumeM3 / 3, 1/3) * 2;
  
  const notes: string[] = [];
  
  // Add notes based on calculations
  if (numberOfUsers <= 3) {
    notes.push("💡 Small household - consider a compact septic system");
  } else if (numberOfUsers <= 6) {
    notes.push("💡 Medium household - standard residential septic tank");
  } else {
    notes.push("💡 Large household - may require commercial-grade system");
  }
  
  if (waterUsagePerPerson < 100) {
    notes.push("⚠️ Low water usage - ensure adequate flow for proper operation");
  } else if (waterUsagePerPerson > 180) {
    notes.push("⚠️ High water usage - consider water conservation measures");
  }
  
  if (retentionTime < 2) {
    notes.push("⚠️ Short retention time - may not meet local regulations");
  } else if (retentionTime >= 2) {
    notes.push("✓ Adequate retention time for proper settling");
  }
  
  if (sludgeFactor === 0.5) {
    notes.push("💡 High sludge factor - plan for frequent pumping");
  }
  
  notes.push("🔧 Regular maintenance and pumping every 2-3 years recommended");
  notes.push("📋 Check local building codes for minimum tank size requirements");
  
  return {
    numberOfUsers,
    waterUsagePerPerson,
    retentionTime,
    sludgeFactor,
    unit,
    dailyFlow,
    baseVolume,
    adjustedVolume,
    recommendedTankSize,
    volumeInCubicMeters,
    volumeInGallons,
    suggestedLength,
    suggestedWidth,
    suggestedDepth,
    timestamp: Date.now(),
    notes
  };
}

function findNearestStandardSize(volume: number): number {
  // Find the smallest standard size that's >= the calculated volume
  for (const size of STANDARD_TANK_SIZES) {
    if (size >= volume) {
      return size;
    }
  }
  // If larger than all standard sizes, round up to nearest 1000
  return Math.ceil(volume / 1000) * 1000;
}

export function getSepticTankPresets(): SepticTankPreset[] {
  return [
    {
      name: "Small House (1-3 people)",
      description: "100 L/day/person, 2 days retention",
      numberOfUsers: 2,
      waterUsagePerPerson: 100,
      retentionTime: 2,
      sludgeFactor: 0.3,
      category: "Residential"
    },
    {
      name: "Medium House (4-5 people)",
      description: "120 L/day/person, 2 days retention",
      numberOfUsers: 5,
      waterUsagePerPerson: 120,
      retentionTime: 2,
      sludgeFactor: 0.3,
      category: "Residential"
    },
    {
      name: "Large House (6-8 people)",
      description: "130 L/day/person, 2 days retention",
      numberOfUsers: 7,
      waterUsagePerPerson: 130,
      retentionTime: 2,
      sludgeFactor: 0.3,
      category: "Residential"
    },
    {
      name: "Small Apartment Building",
      description: "10 people, 110 L/day/person",
      numberOfUsers: 10,
      waterUsagePerPerson: 110,
      retentionTime: 2,
      sludgeFactor: 0.3,
      category: "Multi-Family"
    },
    {
      name: "Guest House / B&B",
      description: "15 people, 150 L/day/person",
      numberOfUsers: 15,
      waterUsagePerPerson: 150,
      retentionTime: 2,
      sludgeFactor: 0.5,
      category: "Commercial"
    },
    {
      name: "Small Office Building",
      description: "20 people, 80 L/day/person",
      numberOfUsers: 20,
      waterUsagePerPerson: 80,
      retentionTime: 1.5,
      sludgeFactor: 0.2,
      category: "Commercial"
    }
  ];
}

// History management
export function saveToHistory(calculation: SepticTankCalculation): void {
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
export function exportToText(calculation: SepticTankCalculation): string {
  const lines = [
    "SEPTIC TANK SIZE CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Number of Users: ${calculation.numberOfUsers}`,
    `Water Usage per Person: ${calculation.waterUsagePerPerson} L/day`,
    `Retention Time: ${calculation.retentionTime} days`,
    `Sludge Accumulation Factor: ${(calculation.sludgeFactor * 100).toFixed(0)}%`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Daily Flow: ${formatNumber(calculation.dailyFlow, 0)} L/day`,
    `Base Volume: ${formatNumber(calculation.baseVolume, 0)} liters`,
    `Adjusted Volume (with sludge): ${formatNumber(calculation.adjustedVolume, 0)} liters`,
    `Recommended Tank Size: ${formatNumber(calculation.recommendedTankSize, 0)} liters`,
    `Volume in Cubic Meters: ${formatNumber(calculation.volumeInCubicMeters, 2)} m³`,
    `Volume in Gallons: ${formatNumber(calculation.volumeInGallons, 0)} gallons`,
    "",
    "SUGGESTED DIMENSIONS (Rectangular Tank):",
    "-".repeat(50),
    `Length: ${formatNumber(calculation.suggestedLength || 0, 2)} m`,
    `Width: ${formatNumber(calculation.suggestedWidth || 0, 2)} m`,
    `Depth: ${formatNumber(calculation.suggestedDepth || 0, 2)} m`
  ];
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES & RECOMMENDATIONS:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Septic Tank Size Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(calculation: SepticTankCalculation): string {
  const rows = [
    ["Parameter", "Value", "Unit"],
    ["Number of Users", calculation.numberOfUsers.toString(), "people"],
    ["Water Usage per Person", calculation.waterUsagePerPerson.toString(), "L/day"],
    ["Retention Time", calculation.retentionTime.toString(), "days"],
    ["Sludge Factor", (calculation.sludgeFactor * 100).toFixed(0), "%"],
    ["Daily Flow", formatNumber(calculation.dailyFlow, 0), "L/day"],
    ["Base Volume", formatNumber(calculation.baseVolume, 0), "liters"],
    ["Adjusted Volume", formatNumber(calculation.adjustedVolume, 0), "liters"],
    ["Recommended Tank Size", formatNumber(calculation.recommendedTankSize, 0), "liters"],
    ["Volume (Cubic Meters)", formatNumber(calculation.volumeInCubicMeters, 2), "m³"],
    ["Volume (Gallons)", formatNumber(calculation.volumeInGallons, 0), "gallons"],
    ["Suggested Length", formatNumber(calculation.suggestedLength || 0, 2), "m"],
    ["Suggested Width", formatNumber(calculation.suggestedWidth || 0, 2), "m"],
    ["Suggested Depth", formatNumber(calculation.suggestedDepth || 0, 2), "m"]
  ];
  
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
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validateInputs(numberOfUsers: number, waterUsagePerPerson: number): string | null {
  if (numberOfUsers <= 0) {
    return "Number of users must be greater than 0";
  }
  
  if (waterUsagePerPerson <= 0) {
    return "Water usage must be greater than 0";
  }
  
  if (waterUsagePerPerson < 50) {
    return "Water usage seems too low. Typical range is 80-200 L/day";
  }
  
  if (waterUsagePerPerson > 300) {
    return "Water usage seems too high. Please verify the value";
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
