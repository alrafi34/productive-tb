import {
  OccupancyType,
  RiskLevel,
  Material,
  MaterialPreset,
  FireLoadInputs,
  FireLoadCalculation,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "fire-safety-load-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate fire load using: Fire Load (MJ/m²) = (Sum of (Mass × Calorific Value)) / Floor Area
 */
export function calculateFireLoad(inputs: FireLoadInputs): FireLoadCalculation {
  const { floorArea, materials, occupancyType } = inputs;
  const notes: string[] = [];
  
  // Calculate total heat energy
  let totalHeatEnergy = 0;
  const materialBreakdown = materials.map(material => {
    const energy = material.mass * material.calorificValue;
    totalHeatEnergy += energy;
    return {
      name: material.name,
      mass: material.mass,
      calorificValue: material.calorificValue,
      energy
    };
  });
  
  // Calculate fire load density
  const fireLoadDensity = floorArea > 0 ? totalHeatEnergy / floorArea : 0;
  
  // Determine risk level
  const riskLevel = getRiskLevel(fireLoadDensity);
  
  // Add notes based on results
  notes.push(`Total combustible materials: ${materials.length}`);
  notes.push(`Total mass: ${materials.reduce((sum, m) => sum + m.mass, 0).toFixed(2)} kg`);
  
  if (fireLoadDensity < 400) {
    notes.push("✓ Low fire load - typical for offices and residential spaces");
  } else if (fireLoadDensity < 800) {
    notes.push("⚠️ Medium fire load - requires standard fire protection measures");
  } else if (fireLoadDensity < 1200) {
    notes.push("⚠️ High fire load - enhanced fire protection recommended");
  } else {
    notes.push("🚨 Very high fire load - special fire safety measures required");
  }
  
  // Add occupancy-specific notes
  const occupancyNotes = getOccupancyNotes(occupancyType, fireLoadDensity);
  notes.push(...occupancyNotes);
  
  return {
    floorArea,
    materials,
    occupancyType,
    totalHeatEnergy,
    fireLoadDensity,
    riskLevel,
    materialBreakdown,
    timestamp: Date.now(),
    notes
  };
}

function getRiskLevel(fireLoadDensity: number): RiskLevel {
  if (fireLoadDensity < 400) return "low";
  if (fireLoadDensity < 800) return "medium";
  if (fireLoadDensity < 1200) return "high";
  return "very-high";
}

function getOccupancyNotes(occupancyType: OccupancyType, fireLoadDensity: number): string[] {
  const notes: string[] = [];
  
  switch (occupancyType) {
    case "residential":
      if (fireLoadDensity > 600) {
        notes.push("Fire load exceeds typical residential range (300-600 MJ/m²)");
      }
      break;
    case "office":
      if (fireLoadDensity > 500) {
        notes.push("Fire load exceeds typical office range (200-500 MJ/m²)");
      }
      break;
    case "commercial":
      if (fireLoadDensity > 800) {
        notes.push("Fire load exceeds typical commercial range (400-800 MJ/m²)");
      }
      break;
    case "industrial":
      if (fireLoadDensity > 1500) {
        notes.push("Very high industrial fire load - verify with fire safety engineer");
      }
      break;
    case "warehouse":
      if (fireLoadDensity > 2000) {
        notes.push("Extremely high warehouse fire load - special suppression systems required");
      }
      break;
  }
  
  return notes;
}

export function getMaterialPresets(): MaterialPreset[] {
  return [
    // Wood and Paper
    { name: "Wood (general)", calorificValue: 17, category: "Wood & Paper" },
    { name: "Hardwood", calorificValue: 18, category: "Wood & Paper" },
    { name: "Softwood", calorificValue: 16, category: "Wood & Paper" },
    { name: "Plywood", calorificValue: 17, category: "Wood & Paper" },
    { name: "Paper", calorificValue: 16, category: "Wood & Paper" },
    { name: "Cardboard", calorificValue: 15, category: "Wood & Paper" },
    { name: "Books", calorificValue: 16, category: "Wood & Paper" },
    
    // Plastics
    { name: "Plastic (general)", calorificValue: 35, category: "Plastics" },
    { name: "Polyethylene (PE)", calorificValue: 43, category: "Plastics" },
    { name: "Polypropylene (PP)", calorificValue: 43, category: "Plastics" },
    { name: "PVC", calorificValue: 20, category: "Plastics" },
    { name: "Polystyrene (PS)", calorificValue: 40, category: "Plastics" },
    { name: "Acrylic", calorificValue: 28, category: "Plastics" },
    
    // Textiles
    { name: "Cotton", calorificValue: 18, category: "Textiles" },
    { name: "Wool", calorificValue: 20, category: "Textiles" },
    { name: "Synthetic fabrics", calorificValue: 30, category: "Textiles" },
    { name: "Carpet", calorificValue: 22, category: "Textiles" },
    { name: "Upholstery", calorificValue: 25, category: "Textiles" },
    
    // Fuels
    { name: "Diesel", calorificValue: 45, category: "Fuels" },
    { name: "Gasoline", calorificValue: 47, category: "Fuels" },
    { name: "Kerosene", calorificValue: 46, category: "Fuels" },
    { name: "Oil", calorificValue: 44, category: "Fuels" },
    
    // Other
    { name: "Rubber", calorificValue: 30, category: "Other" },
    { name: "Foam", calorificValue: 25, category: "Other" },
    { name: "Leather", calorificValue: 19, category: "Other" },
    { name: "Wax", calorificValue: 42, category: "Other" }
  ];
}

export function createEmptyMaterial(): Material {
  return {
    id: `material-${Date.now()}-${Math.random()}`,
    name: "",
    mass: 0,
    calorificValue: 0
  };
}

export function getSampleData(): Material[] {
  return [
    {
      id: `material-${Date.now()}-1`,
      name: "Wood furniture",
      mass: 50,
      calorificValue: 17
    },
    {
      id: `material-${Date.now()}-2`,
      name: "Paper documents",
      mass: 20,
      calorificValue: 16
    },
    {
      id: `material-${Date.now()}-3`,
      name: "Plastic items",
      mass: 15,
      calorificValue: 35
    }
  ];
}

// History management
export function saveToHistory(calculation: FireLoadCalculation): void {
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
export function exportToText(calculation: FireLoadCalculation): string {
  const lines = [
    "FIRE SAFETY LOAD CALCULATION REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Occupancy Type: ${getOccupancyLabel(calculation.occupancyType)}`,
    `Floor Area: ${calculation.floorArea} m²`,
    "",
    "MATERIAL BREAKDOWN:",
    "-".repeat(50)
  ];
  
  calculation.materialBreakdown.forEach((material, index) => {
    lines.push(`${index + 1}. ${material.name}`);
    lines.push(`   Mass: ${material.mass} kg`);
    lines.push(`   Calorific Value: ${material.calorificValue} MJ/kg`);
    lines.push(`   Heat Energy: ${formatNumber(material.energy, 2)} MJ`);
    lines.push("");
  });
  
  lines.push("CALCULATED RESULTS:");
  lines.push("-".repeat(50));
  lines.push(`Total Heat Energy: ${formatNumber(calculation.totalHeatEnergy, 2)} MJ`);
  lines.push(`Fire Load Density: ${formatNumber(calculation.fireLoadDensity, 2)} MJ/m²`);
  lines.push(`Risk Level: ${getRiskLevelLabel(calculation.riskLevel)}`);
  
  if (calculation.notes.length > 0) {
    lines.push("");
    lines.push("NOTES:");
    lines.push("-".repeat(50));
    calculation.notes.forEach(note => lines.push(`• ${note}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Fire Safety Load Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(calculation: FireLoadCalculation): string {
  const rows = [
    ["Material", "Mass (kg)", "Calorific Value (MJ/kg)", "Heat Energy (MJ)"]
  ];
  
  calculation.materialBreakdown.forEach(material => {
    rows.push([
      material.name,
      material.mass.toString(),
      material.calorificValue.toString(),
      formatNumber(material.energy, 2)
    ]);
  });
  
  rows.push([]);
  rows.push(["Summary", "", "", ""]);
  rows.push(["Floor Area", `${calculation.floorArea} m²`, "", ""]);
  rows.push(["Total Heat Energy", `${formatNumber(calculation.totalHeatEnergy, 2)} MJ`, "", ""]);
  rows.push(["Fire Load Density", `${formatNumber(calculation.fireLoadDensity, 2)} MJ/m²`, "", ""]);
  rows.push(["Risk Level", getRiskLevelLabel(calculation.riskLevel), "", ""]);
  
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
  return value.toFixed(decimals);
}

export function getOccupancyLabel(type: OccupancyType): string {
  const labels: Record<OccupancyType, string> = {
    residential: "Residential",
    commercial: "Commercial",
    industrial: "Industrial",
    warehouse: "Warehouse",
    office: "Office"
  };
  return labels[type];
}

export function getRiskLevelLabel(level: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    "very-high": "Very High Risk"
  };
  return labels[level];
}

export function getRiskLevelColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    low: "text-green-700 bg-green-100 border-green-200",
    medium: "text-yellow-700 bg-yellow-100 border-yellow-200",
    high: "text-orange-700 bg-orange-100 border-orange-200",
    "very-high": "text-red-700 bg-red-100 border-red-200"
  };
  return colors[level];
}

export function validateInputs(floorArea: number, materials: Material[]): string | null {
  if (!floorArea || floorArea <= 0) {
    return "Floor area must be greater than 0";
  }
  
  if (materials.length === 0) {
    return "Please add at least one material";
  }
  
  for (const material of materials) {
    if (!material.name || material.name.trim() === "") {
      return "All materials must have a name";
    }
    if (material.mass <= 0) {
      return "Material mass must be greater than 0";
    }
    if (material.calorificValue <= 0) {
      return "Calorific value must be greater than 0";
    }
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
