import { Material, UnitType, Currency, MaterialCalculation, HistoryEntry } from "./types";

const HISTORY_KEY = "material-cost-calculator-history";
const MAX_HISTORY = 10;

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function createEmptyMaterial(): Material {
  return {
    id: generateId(),
    name: "",
    quantity: 0,
    unitPrice: 0,
    unitType: "pcs",
    wastage: 0,
    cost: 0,
    adjustedCost: 0
  };
}

export function calculateMaterialCost(material: Material): Material {
  const cost = material.quantity * material.unitPrice;
  const wastageAmount = cost * (material.wastage / 100);
  const adjustedCost = cost + wastageAmount;
  
  return {
    ...material,
    cost,
    adjustedCost
  };
}

export function calculateTotalCost(materials: Material[], overhead: number): {
  subtotal: number;
  totalWastage: number;
  totalCost: number;
} {
  let subtotal = 0;
  let totalWastage = 0;
  
  materials.forEach(material => {
    subtotal += material.cost;
    totalWastage += (material.adjustedCost - material.cost);
  });
  
  const totalCost = subtotal + totalWastage + overhead;
  
  return {
    subtotal,
    totalWastage,
    totalCost
  };
}

export function performMaterialCalculation(
  materials: Material[],
  overhead: number,
  currency: Currency
): MaterialCalculation {
  // Calculate each material
  const calculatedMaterials = materials.map(calculateMaterialCost);
  
  // Calculate totals
  const { subtotal, totalWastage, totalCost } = calculateTotalCost(calculatedMaterials, overhead);
  
  return {
    materials: calculatedMaterials,
    overhead,
    currency,
    subtotal,
    totalWastage,
    totalCost,
    timestamp: Date.now()
  };
}

export function validateMaterial(material: Material): string | null {
  if (!material.name.trim()) return "Material name is required";
  if (isNaN(material.quantity) || material.quantity < 0) return "Quantity must be 0 or greater";
  if (isNaN(material.unitPrice) || material.unitPrice < 0) return "Unit price must be 0 or greater";
  if (isNaN(material.wastage) || material.wastage < 0 || material.wastage > 100) return "Wastage must be between 0 and 100";
  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(value: number, currency: Currency, decimals: number = 2): string {
  const formatted = formatNumber(value, decimals);
  
  const symbols: Record<Currency, string> = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "INR": "₹",
    "BDT": "৳"
  };
  
  return `${symbols[currency]}${formatted}`;
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "INR": "₹",
    "BDT": "৳"
  };
  return symbols[currency];
}

export function getUnitTypeLabel(unit: UnitType): string {
  const labels: Record<UnitType, string> = {
    "kg": "Kilograms",
    "tons": "Tons",
    "bags": "Bags",
    "pcs": "Pieces",
    "liters": "Liters",
    "m": "Meters",
    "m2": "Square Meters",
    "m3": "Cubic Meters",
    "ft": "Feet",
    "ft2": "Square Feet",
    "ft3": "Cubic Feet"
  };
  return labels[unit];
}

export function getMaterialPresets() {
  return [
    {
      name: "Cement",
      quantity: 10,
      unitPrice: 8,
      unitType: "bags" as UnitType,
      wastage: 5
    },
    {
      name: "Steel Bars",
      quantity: 50,
      unitPrice: 1.2,
      unitType: "kg" as UnitType,
      wastage: 3
    },
    {
      name: "Bricks",
      quantity: 1000,
      unitPrice: 0.5,
      unitType: "pcs" as UnitType,
      wastage: 10
    },
    {
      name: "Sand",
      quantity: 2,
      unitPrice: 30,
      unitType: "tons" as UnitType,
      wastage: 5
    },
    {
      name: "Paint",
      quantity: 20,
      unitPrice: 5,
      unitType: "liters" as UnitType,
      wastage: 10
    },
    {
      name: "Tiles",
      quantity: 100,
      unitPrice: 3,
      unitType: "m2" as UnitType,
      wastage: 15
    }
  ];
}

// History management
export function saveToHistory(calculation: MaterialCalculation): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      calculation,
      timestamp: Date.now()
    };
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}

// Export functions
export function exportToText(calculation: MaterialCalculation): string {
  return `MATERIAL COST CALCULATION REPORT
Generated: ${new Date(calculation.timestamp).toLocaleString()}

MATERIALS
${calculation.materials.map((m, i) => 
  `${i + 1}. ${m.name}
   Quantity: ${formatNumber(m.quantity)} ${m.unitType}
   Unit Price: ${formatCurrency(m.unitPrice, calculation.currency)}
   Wastage: ${m.wastage}%
   Cost: ${formatCurrency(m.cost, calculation.currency)}
   Adjusted Cost: ${formatCurrency(m.adjustedCost, calculation.currency)}`
).join('\n\n')}

SUMMARY
Subtotal: ${formatCurrency(calculation.subtotal, calculation.currency)}
Total Wastage: ${formatCurrency(calculation.totalWastage, calculation.currency)}
Overhead: ${formatCurrency(calculation.overhead, calculation.currency)}
TOTAL COST: ${formatCurrency(calculation.totalCost, calculation.currency)}
`;
}

export function exportToCSV(calculation: MaterialCalculation): string {
  const header = "Material,Quantity,Unit,Unit Price,Wastage %,Cost,Adjusted Cost\n";
  const rows = calculation.materials.map(m => 
    `"${m.name}",${m.quantity},${m.unitType},${m.unitPrice.toFixed(2)},${m.wastage},${m.cost.toFixed(2)},${m.adjustedCost.toFixed(2)}`
  ).join('\n');
  
  const summary = `\n\nSummary\nSubtotal,${calculation.subtotal.toFixed(2)}\nTotal Wastage,${calculation.totalWastage.toFixed(2)}\nOverhead,${calculation.overhead.toFixed(2)}\nTotal Cost,${calculation.totalCost.toFixed(2)}`;
  
  return header + rows + summary;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
