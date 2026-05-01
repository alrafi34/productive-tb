import { MaterialInput, CarbonCalculation, HistoryEntry, MaterialPreset } from "./types";

const HISTORY_KEY = "carbon-footprint-calculator-construction-history";
const MAX_HISTORY = 10;

// Default emission factors (kg CO₂ per unit)
export const MATERIAL_PRESETS: Record<string, MaterialPreset> = {
  cement: {
    name: "Cement",
    unit: "kg",
    emissionFactor: 0.9,
    description: "Portland cement"
  },
  concrete: {
    name: "Concrete",
    unit: "m³",
    emissionFactor: 300,
    description: "Ready-mix concrete"
  },
  steel: {
    name: "Steel",
    unit: "kg",
    emissionFactor: 1.9,
    description: "Structural steel"
  },
  bricks: {
    name: "Bricks",
    unit: "units",
    emissionFactor: 0.25,
    description: "Clay bricks"
  },
  glass: {
    name: "Glass",
    unit: "kg",
    emissionFactor: 1.0,
    description: "Float glass"
  },
  wood: {
    name: "Wood",
    unit: "kg",
    emissionFactor: 0.2,
    description: "Timber/lumber"
  },
  aluminum: {
    name: "Aluminum",
    unit: "kg",
    emissionFactor: 8.2,
    description: "Primary aluminum"
  },
  gypsum: {
    name: "Gypsum Board",
    unit: "m²",
    emissionFactor: 5.5,
    description: "Drywall/plasterboard"
  },
  insulation: {
    name: "Insulation",
    unit: "m³",
    emissionFactor: 45,
    description: "Mineral wool"
  },
  paint: {
    name: "Paint",
    unit: "liters",
    emissionFactor: 2.5,
    description: "Acrylic paint"
  }
};

// Calculate CO2 for a single material
export function calculateMaterialCO2(quantity: number, emissionFactor: number): number {
  return quantity * emissionFactor;
}

// Calculate total carbon footprint
export function calculateTotalCO2(materials: MaterialInput[]): number {
  return materials.reduce((total, material) => total + material.co2, 0);
}

// Find highest contributor
export function findHighestContributor(materials: MaterialInput[]): MaterialInput | null {
  if (materials.length === 0) return null;
  return materials.reduce((max, material) => 
    material.co2 > max.co2 ? material : max
  );
}

// Calculate percentage contribution
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

// Format number with commas
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Create default materials
export function createDefaultMaterials(): MaterialInput[] {
  return [
    {
      id: generateId(),
      name: "Cement",
      quantity: 0,
      unit: "kg",
      emissionFactor: 0.9,
      co2: 0
    },
    {
      id: generateId(),
      name: "Concrete",
      quantity: 0,
      unit: "m³",
      emissionFactor: 300,
      co2: 0
    },
    {
      id: generateId(),
      name: "Steel",
      quantity: 0,
      unit: "kg",
      emissionFactor: 1.9,
      co2: 0
    },
    {
      id: generateId(),
      name: "Bricks",
      quantity: 0,
      unit: "units",
      emissionFactor: 0.25,
      co2: 0
    }
  ];
}

// Update material CO2
export function updateMaterialCO2(material: MaterialInput): MaterialInput {
  return {
    ...material,
    co2: calculateMaterialCO2(material.quantity, material.emissionFactor)
  };
}

// Perform calculation
export function performCalculation(materials: MaterialInput[]): CarbonCalculation {
  const updatedMaterials = materials.map(updateMaterialCO2);
  const totalCO2 = calculateTotalCO2(updatedMaterials);
  const highestContributor = findHighestContributor(updatedMaterials);
  
  return {
    materials: updatedMaterials,
    totalCO2,
    highestContributor,
    timestamp: Date.now()
  };
}

// History management
export function saveToHistory(calculation: CarbonCalculation): void {
  if (typeof window === "undefined") return;
  
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: generateId(),
      calculation,
      timestamp: Date.now()
    };
    
    history.unshift(entry);
    const trimmed = history.slice(0, MAX_HISTORY);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error("Failed to save history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}

// Export functions
export function exportToCSV(calculation: CarbonCalculation): string {
  let csv = "Material,Quantity,Unit,Emission Factor,CO2 (kg)\n";
  
  calculation.materials.forEach(material => {
    if (material.quantity > 0) {
      csv += `${material.name},${material.quantity},${material.unit},${material.emissionFactor},${formatNumber(material.co2)}\n`;
    }
  });
  
  csv += `\nTotal CO2 Emissions,,,${formatNumber(calculation.totalCO2)} kg\n`;
  
  return csv;
}

export function exportToText(calculation: CarbonCalculation): string {
  let text = `CONSTRUCTION CARBON FOOTPRINT CALCULATION\n`;
  text += `${"=".repeat(50)}\n\n`;
  text += `Generated: ${new Date(calculation.timestamp).toLocaleString()}\n\n`;
  
  text += `MATERIALS BREAKDOWN:\n`;
  text += `${"-".repeat(50)}\n`;
  
  calculation.materials.forEach(material => {
    if (material.quantity > 0) {
      const percentage = calculatePercentage(material.co2, calculation.totalCO2);
      text += `\n${material.name}:\n`;
      text += `  Quantity: ${formatNumber(material.quantity, 0)} ${material.unit}\n`;
      text += `  Emission Factor: ${material.emissionFactor} kg CO₂/${material.unit}\n`;
      text += `  CO₂ Emissions: ${formatNumber(material.co2)} kg (${formatNumber(percentage, 1)}%)\n`;
    }
  });
  
  text += `\n${"=".repeat(50)}\n`;
  text += `TOTAL CO₂ EMISSIONS: ${formatNumber(calculation.totalCO2)} kg\n`;
  text += `${"=".repeat(50)}\n\n`;
  
  if (calculation.highestContributor) {
    text += `Highest Contributor: ${calculation.highestContributor.name} (${formatNumber(calculation.highestContributor.co2)} kg CO₂)\n\n`;
  }
  
  text += `Note: Emission factors are approximate values. Actual emissions may vary based on\n`;
  text += `manufacturing processes, transportation, and regional factors.\n`;
  
  return text;
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

// Debounce function
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
