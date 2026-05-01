import {
  WidthFactor,
  Unit,
  SafetyLevel,
  EmergencyExitInputs,
  EmergencyExitCalculation,
  OccupancyPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "emergency-exit-width-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate emergency exit width using: Required Width = Occupants × Width Factor
 */
export function calculateEmergencyExitWidth(inputs: EmergencyExitInputs): EmergencyExitCalculation {
  const { occupants, widthFactor, numberOfExits, unit } = inputs;
  const notes: string[] = [];
  
  // Calculate total required width (in inches)
  const totalRequiredWidth = occupants * widthFactor;
  
  // Calculate width per exit
  const widthPerExit = totalRequiredWidth / numberOfExits;
  
  // Convert to different units
  const totalWidthInInches = totalRequiredWidth;
  const totalWidthInFeet = totalRequiredWidth / 12;
  const totalWidthInMeters = totalRequiredWidth * 0.0254;
  
  const widthPerExitInInches = widthPerExit;
  const widthPerExitInFeet = widthPerExit / 12;
  const widthPerExitInMeters = widthPerExit * 0.0254;
  
  // Determine safety level
  const safetyLevel = getSafetyLevel(widthPerExit, occupants, numberOfExits);
  
  // Add notes based on calculations
  notes.push(`Total occupant load: ${occupants} persons`);
  notes.push(`Width factor: ${widthFactor} inches per person (${getWidthFactorDescription(widthFactor)})`);
  notes.push(`Number of exits: ${numberOfExits}`);
  
  // Minimum width recommendations
  if (widthPerExit < 32) {
    notes.push("⚠️ Exit width below minimum 32 inches - may not meet code requirements");
  } else if (widthPerExit < 36) {
    notes.push("⚠️ Exit width meets minimum but consider wider for better flow");
  } else {
    notes.push("✓ Exit width meets standard requirements");
  }
  
  // Multiple exits recommendations
  if (occupants > 500 && numberOfExits < 2) {
    notes.push("⚠️ High occupancy - consider adding more exits");
  } else if (occupants > 1000 && numberOfExits < 3) {
    notes.push("⚠️ Very high occupancy - additional exits recommended");
  }
  
  // Exit distribution
  if (numberOfExits > 1) {
    notes.push(`Each exit should be at least ${formatNumber(widthPerExitInInches, 1)} inches wide`);
  }
  
  // Code compliance notes
  if (widthFactor === 0.2) {
    notes.push("Using stair width factor (0.2 in/person) - typical for vertical egress");
  } else if (widthFactor === 0.3) {
    notes.push("Using door/corridor width factor (0.3 in/person) - typical for level egress");
  } else if (widthFactor === 0.15) {
    notes.push("Using sprinklered building factor (0.15 in/person) - reduced requirement");
  }
  
  return {
    occupants,
    widthFactor,
    numberOfExits,
    unit,
    totalRequiredWidth,
    widthPerExit,
    totalWidthInInches,
    totalWidthInFeet,
    totalWidthInMeters,
    widthPerExitInInches,
    widthPerExitInFeet,
    widthPerExitInMeters,
    safetyLevel,
    timestamp: Date.now(),
    notes
  };
}

function getSafetyLevel(widthPerExit: number, occupants: number, exits: number): SafetyLevel {
  // Check if width per exit is below minimum
  if (widthPerExit < 32) {
    return "critical";
  }
  
  // Check if exits are insufficient for occupancy
  const recommendedExits = Math.ceil(occupants / 500);
  if (exits < recommendedExits && occupants > 500) {
    return "warning";
  }
  
  // Check if width is marginal
  if (widthPerExit < 36) {
    return "warning";
  }
  
  return "safe";
}

function getWidthFactorDescription(factor: WidthFactor): string {
  switch (factor) {
    case 0.2:
      return "stairs/vertical egress";
    case 0.3:
      return "doors/level egress";
    case 0.15:
      return "sprinklered building";
    default:
      return "standard";
  }
}

export function getOccupancyPresets(): OccupancyPreset[] {
  return [
    {
      name: "Small Office",
      description: "50 occupants, single exit",
      occupants: 50,
      widthFactor: 0.3,
      numberOfExits: 1,
      category: "Office"
    },
    {
      name: "Medium Office",
      description: "150 occupants, two exits",
      occupants: 150,
      widthFactor: 0.3,
      numberOfExits: 2,
      category: "Office"
    },
    {
      name: "Classroom",
      description: "30 students, single exit",
      occupants: 30,
      widthFactor: 0.3,
      numberOfExits: 1,
      category: "Educational"
    },
    {
      name: "Lecture Hall",
      description: "200 occupants, two exits",
      occupants: 200,
      widthFactor: 0.2,
      numberOfExits: 2,
      category: "Educational"
    },
    {
      name: "Restaurant",
      description: "100 occupants, two exits",
      occupants: 100,
      widthFactor: 0.3,
      numberOfExits: 2,
      category: "Assembly"
    },
    {
      name: "Theater",
      description: "300 occupants, three exits",
      occupants: 300,
      widthFactor: 0.2,
      numberOfExits: 3,
      category: "Assembly"
    },
    {
      name: "Retail Store",
      description: "200 occupants, two exits",
      occupants: 200,
      widthFactor: 0.3,
      numberOfExits: 2,
      category: "Mercantile"
    },
    {
      name: "Shopping Mall",
      description: "1000 occupants, four exits",
      occupants: 1000,
      widthFactor: 0.15,
      numberOfExits: 4,
      category: "Mercantile"
    }
  ];
}

// History management
export function saveToHistory(calculation: EmergencyExitCalculation): void {
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
export function exportToText(calculation: EmergencyExitCalculation): string {
  const lines = [
    "EMERGENCY EXIT WIDTH CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Number of Occupants: ${calculation.occupants}`,
    `Width Factor: ${calculation.widthFactor} inches/person`,
    `Number of Exits: ${calculation.numberOfExits}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Total Required Width: ${formatNumber(calculation.totalWidthInInches, 1)} inches`,
    `Total Required Width: ${formatNumber(calculation.totalWidthInFeet, 2)} feet`,
    `Total Required Width: ${formatNumber(calculation.totalWidthInMeters, 2)} meters`,
    "",
    `Width Per Exit: ${formatNumber(calculation.widthPerExitInInches, 1)} inches`,
    `Width Per Exit: ${formatNumber(calculation.widthPerExitInFeet, 2)} feet`,
    `Width Per Exit: ${formatNumber(calculation.widthPerExitInMeters, 2)} meters`,
    "",
    `Safety Level: ${getSafetyLevelLabel(calculation.safetyLevel)}`
  ];
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Emergency Exit Width Calculator");
  
  return lines.join("\n");
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
  return value.toFixed(decimals);
}

export function getSafetyLevelLabel(level: SafetyLevel): string {
  const labels: Record<SafetyLevel, string> = {
    safe: "Safe - Meets Requirements",
    warning: "Warning - Review Recommended",
    critical: "Critical - Below Minimum"
  };
  return labels[level];
}

export function getSafetyLevelColor(level: SafetyLevel): string {
  const colors: Record<SafetyLevel, string> = {
    safe: "text-green-700 bg-green-100 border-green-200",
    warning: "text-yellow-700 bg-yellow-100 border-yellow-200",
    critical: "text-red-700 bg-red-100 border-red-200"
  };
  return colors[level];
}

export function getWidthFactorLabel(factor: WidthFactor): string {
  const labels: Record<WidthFactor, string> = {
    0.2: "0.2 in/person (Stairs)",
    0.3: "0.3 in/person (Doors/Level)",
    0.15: "0.15 in/person (Sprinklered)"
  };
  return labels[factor];
}

export function validateInputs(occupants: number, numberOfExits: number): string | null {
  if (!occupants || occupants <= 0) {
    return "Number of occupants must be greater than 0";
  }
  
  if (!numberOfExits || numberOfExits <= 0) {
    return "Number of exits must be at least 1";
  }
  
  if (occupants < numberOfExits) {
    return "Number of exits cannot exceed number of occupants";
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
