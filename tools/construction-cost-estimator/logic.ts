import { MaterialQuality, RegionFactor, Currency, AddOns, ConstructionEstimate, CostBreakdown, HistoryEntry } from "./types";

const HISTORY_KEY = "construction-cost-estimator-history";
const MAX_HISTORY = 10;

// Material quality multipliers
const MATERIAL_MULTIPLIERS: Record<MaterialQuality, number> = {
  "low": 0.8,
  "medium": 1.0,
  "high": 1.3,
  "premium": 1.6
};

// Region factor multipliers
const REGION_MULTIPLIERS: Record<RegionFactor, number> = {
  "low": 0.9,
  "standard": 1.0,
  "high": 1.2
};

// Add-on cost percentages (as percentage of base cost)
const ADDON_PERCENTAGES = {
  plumbing: 0.05,      // 5%
  electrical: 0.07,    // 7%
  interiorDesign: 0.10, // 10%
  landscaping: 0.08    // 8%
};

export function getMaterialMultiplier(quality: MaterialQuality): number {
  return MATERIAL_MULTIPLIERS[quality];
}

export function getRegionMultiplier(region: RegionFactor): number {
  return REGION_MULTIPLIERS[region];
}

export function getMaterialQualityLabel(quality: MaterialQuality): string {
  const labels: Record<MaterialQuality, string> = {
    "low": "Low Quality",
    "medium": "Medium Quality",
    "high": "High Quality",
    "premium": "Premium Quality"
  };
  return labels[quality];
}

export function getRegionFactorLabel(region: RegionFactor): string {
  const labels: Record<RegionFactor, string> = {
    "low": "Low Cost Region",
    "standard": "Standard Region",
    "high": "High Cost Region"
  };
  return labels[region];
}

export function performConstructionEstimate(
  area: number,
  costPerSqFt: number,
  materialQuality: MaterialQuality,
  laborMultiplier: number,
  regionFactor: RegionFactor,
  addOns: AddOns,
  currency: Currency
): ConstructionEstimate {
  // Calculate base cost
  const baseCost = area * costPerSqFt;
  
  // Get multipliers
  const materialMult = getMaterialMultiplier(materialQuality);
  const regionMult = getRegionMultiplier(regionFactor);
  
  // Calculate adjustments
  const materialAdjustment = baseCost * (materialMult - 1);
  const laborAdjustment = baseCost * (laborMultiplier - 1);
  const regionAdjustment = baseCost * (regionMult - 1);
  
  // Calculate add-on costs
  const plumbingCost = addOns.plumbing ? baseCost * ADDON_PERCENTAGES.plumbing : 0;
  const electricalCost = addOns.electrical ? baseCost * ADDON_PERCENTAGES.electrical : 0;
  const interiorDesignCost = addOns.interiorDesign ? baseCost * ADDON_PERCENTAGES.interiorDesign : 0;
  const landscapingCost = addOns.landscaping ? baseCost * ADDON_PERCENTAGES.landscaping : 0;
  const totalAddOnsCost = plumbingCost + electricalCost + interiorDesignCost + landscapingCost;
  
  // Calculate total cost
  const totalCost = (baseCost * materialMult * laborMultiplier * regionMult) + totalAddOnsCost;
  
  // Create breakdown
  const breakdown: CostBreakdown[] = [
    { category: "Base Cost", amount: baseCost, percentage: (baseCost / totalCost) * 100 },
    { category: "Material Adjustment", amount: materialAdjustment, percentage: (materialAdjustment / totalCost) * 100 },
    { category: "Labor Adjustment", amount: laborAdjustment, percentage: (laborAdjustment / totalCost) * 100 },
    { category: "Region Adjustment", amount: regionAdjustment, percentage: (regionAdjustment / totalCost) * 100 }
  ];
  
  if (plumbingCost > 0) {
    breakdown.push({ category: "Plumbing", amount: plumbingCost, percentage: (plumbingCost / totalCost) * 100 });
  }
  if (electricalCost > 0) {
    breakdown.push({ category: "Electrical", amount: electricalCost, percentage: (electricalCost / totalCost) * 100 });
  }
  if (interiorDesignCost > 0) {
    breakdown.push({ category: "Interior Design", amount: interiorDesignCost, percentage: (interiorDesignCost / totalCost) * 100 });
  }
  if (landscapingCost > 0) {
    breakdown.push({ category: "Landscaping", amount: landscapingCost, percentage: (landscapingCost / totalCost) * 100 });
  }
  
  return {
    area,
    costPerSqFt,
    materialQuality,
    laborMultiplier,
    regionFactor,
    addOns,
    currency,
    baseCost,
    materialAdjustment,
    laborAdjustment,
    regionAdjustment,
    plumbingCost,
    electricalCost,
    interiorDesignCost,
    landscapingCost,
    totalAddOnsCost,
    totalCost,
    breakdown,
    timestamp: Date.now()
  };
}

export function validateInputs(area: number, costPerSqFt: number, laborMultiplier: number): string | null {
  if (isNaN(area) || area <= 0) return "Area must be greater than 0";
  if (isNaN(costPerSqFt) || costPerSqFt <= 0) return "Cost per sq ft must be greater than 0";
  if (isNaN(laborMultiplier) || laborMultiplier < 0.5 || laborMultiplier > 2.0) return "Labor multiplier must be between 0.5 and 2.0";
  if (area > 1000000) return "Area cannot exceed 1,000,000 sq ft";
  if (costPerSqFt > 10000) return "Cost per sq ft cannot exceed 10,000";
  return null;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(value: number, currency: Currency, decimals: number = 0): string {
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

export function getProjectPresets() {
  return [
    {
      name: "Small House",
      description: "1000 sq ft residential",
      area: 1000,
      costPerSqFt: 50,
      materialQuality: "medium" as MaterialQuality,
      laborMultiplier: 1.0
    },
    {
      name: "Medium House",
      description: "2000 sq ft residential",
      area: 2000,
      costPerSqFt: 60,
      materialQuality: "high" as MaterialQuality,
      laborMultiplier: 1.1
    },
    {
      name: "Large House",
      description: "3500 sq ft residential",
      area: 3500,
      costPerSqFt: 80,
      materialQuality: "premium" as MaterialQuality,
      laborMultiplier: 1.2
    },
    {
      name: "Apartment",
      description: "1200 sq ft unit",
      area: 1200,
      costPerSqFt: 45,
      materialQuality: "medium" as MaterialQuality,
      laborMultiplier: 0.9
    },
    {
      name: "Office Space",
      description: "2500 sq ft commercial",
      area: 2500,
      costPerSqFt: 70,
      materialQuality: "high" as MaterialQuality,
      laborMultiplier: 1.15
    },
    {
      name: "Warehouse",
      description: "5000 sq ft industrial",
      area: 5000,
      costPerSqFt: 35,
      materialQuality: "low" as MaterialQuality,
      laborMultiplier: 0.8
    }
  ];
}

export function getCostIntensity(totalCost: number): { level: string; description: string; color: string } {
  if (totalCost < 50000) {
    return {
      level: "Budget",
      description: "Low-cost project",
      color: "green"
    };
  } else if (totalCost < 150000) {
    return {
      level: "Standard",
      description: "Average-cost project",
      color: "blue"
    };
  } else if (totalCost < 300000) {
    return {
      level: "Premium",
      description: "High-cost project",
      color: "yellow"
    };
  } else if (totalCost < 500000) {
    return {
      level: "Luxury",
      description: "Very high-cost project",
      color: "orange"
    };
  } else {
    return {
      level: "Ultra-Luxury",
      description: "Exceptional-cost project",
      color: "red"
    };
  }
}

// History management
export function saveToHistory(estimate: ConstructionEstimate): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      estimate,
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
export function exportToText(estimate: ConstructionEstimate): string {
  const intensity = getCostIntensity(estimate.totalCost);
  
  return `CONSTRUCTION COST ESTIMATE REPORT
Generated: ${new Date(estimate.timestamp).toLocaleString()}

PROJECT DETAILS
Construction Area: ${formatNumber(estimate.area)} sq ft
Cost per sq ft: ${formatCurrency(estimate.costPerSqFt, estimate.currency)}
Material Quality: ${getMaterialQualityLabel(estimate.materialQuality)}
Labor Multiplier: ${estimate.laborMultiplier.toFixed(2)}x
Region Factor: ${getRegionFactorLabel(estimate.regionFactor)}

ADD-ONS
Plumbing: ${estimate.addOns.plumbing ? 'Yes' : 'No'}
Electrical: ${estimate.addOns.electrical ? 'Yes' : 'No'}
Interior Design: ${estimate.addOns.interiorDesign ? 'Yes' : 'No'}
Landscaping: ${estimate.addOns.landscaping ? 'Yes' : 'No'}

COST BREAKDOWN
Base Cost: ${formatCurrency(estimate.baseCost, estimate.currency)}
Material Adjustment: ${formatCurrency(estimate.materialAdjustment, estimate.currency)}
Labor Adjustment: ${formatCurrency(estimate.laborAdjustment, estimate.currency)}
Region Adjustment: ${formatCurrency(estimate.regionAdjustment, estimate.currency)}
${estimate.plumbingCost > 0 ? `Plumbing: ${formatCurrency(estimate.plumbingCost, estimate.currency)}\n` : ''}${estimate.electricalCost > 0 ? `Electrical: ${formatCurrency(estimate.electricalCost, estimate.currency)}\n` : ''}${estimate.interiorDesignCost > 0 ? `Interior Design: ${formatCurrency(estimate.interiorDesignCost, estimate.currency)}\n` : ''}${estimate.landscapingCost > 0 ? `Landscaping: ${formatCurrency(estimate.landscapingCost, estimate.currency)}\n` : ''}
TOTAL ESTIMATED COST: ${formatCurrency(estimate.totalCost, estimate.currency)}
Project Level: ${intensity.level} - ${intensity.description}
`;
}

export function exportToCSV(estimate: ConstructionEstimate): string {
  const header = "Category,Amount,Percentage\n";
  const rows = estimate.breakdown.map(item => 
    `${item.category},${item.amount.toFixed(2)},${item.percentage.toFixed(2)}%`
  ).join('\n');
  
  return header + rows;
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
