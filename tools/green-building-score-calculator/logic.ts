import {
  MaterialType,
  SiteType,
  WasteManagement,
  ScoreInputs,
  ScoreBreakdown,
  GreenBuildingScore,
  HistoryEntry,
  PresetTemplate
} from "./types";

// Weights for each category (must sum to 1.0)
const WEIGHTS = {
  energy: 0.25,
  water: 0.15,
  materials: 0.15,
  indoor: 0.15,
  site: 0.10,
  renewable: 0.10,
  waste: 0.10
};

// Material scores
const MATERIAL_SCORES: Record<MaterialType, number> = {
  standard: 40,
  recycled: 70,
  "eco-certified": 90
};

// Site scores
const SITE_SCORES: Record<SiteType, number> = {
  urban: 90,
  suburban: 70,
  rural: 50
};

// Waste management scores
const WASTE_SCORES: Record<WasteManagement, number> = {
  none: 30,
  basic: 60,
  advanced: 90
};

export function calculateGreenBuildingScore(inputs: ScoreInputs): GreenBuildingScore {
  // Get individual scores
  const materialScore = MATERIAL_SCORES[inputs.materialSustainability];
  const siteScore = SITE_SCORES[inputs.siteSustainability];
  const wasteScore = WASTE_SCORES[inputs.wasteManagement];

  // Calculate breakdown
  const breakdown: ScoreBreakdown = {
    energy: inputs.energyEfficiency * WEIGHTS.energy,
    water: inputs.waterEfficiency * WEIGHTS.water,
    materials: materialScore * WEIGHTS.materials,
    indoor: inputs.indoorQuality * WEIGHTS.indoor,
    site: siteScore * WEIGHTS.site,
    renewable: inputs.renewableEnergy * WEIGHTS.renewable,
    waste: wasteScore * WEIGHTS.waste
  };

  // Calculate total score
  const totalScore = Math.round(
    breakdown.energy +
    breakdown.water +
    breakdown.materials +
    breakdown.indoor +
    breakdown.site +
    breakdown.renewable +
    breakdown.waste
  );

  // Determine rating
  const rating = getRating(totalScore);

  // Generate suggestions
  const suggestions = generateSuggestions(inputs, breakdown, totalScore);

  return {
    totalScore,
    rating,
    breakdown,
    inputs,
    suggestions,
    timestamp: Date.now()
  };
}

export function getRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Poor";
}

export function getRatingColor(rating: string): string {
  switch (rating) {
    case "Excellent": return "green";
    case "Very Good": return "blue";
    case "Good": return "yellow";
    case "Average": return "orange";
    default: return "red";
  }
}

export function generateSuggestions(
  inputs: ScoreInputs,
  breakdown: ScoreBreakdown,
  totalScore: number
): string[] {
  const suggestions: string[] = [];

  // Energy efficiency suggestions
  if (inputs.energyEfficiency < 70) {
    suggestions.push("Improve insulation to increase energy efficiency");
    suggestions.push("Consider installing energy-efficient windows and doors");
  }
  if (inputs.energyEfficiency < 50) {
    suggestions.push("Upgrade to LED lighting throughout the building");
  }

  // Water efficiency suggestions
  if (inputs.waterEfficiency < 70) {
    suggestions.push("Install low-flow fixtures to reduce water consumption");
    suggestions.push("Consider rainwater harvesting system");
  }
  if (inputs.waterEfficiency < 50) {
    suggestions.push("Implement greywater recycling for irrigation");
  }

  // Material suggestions
  if (inputs.materialSustainability === "standard") {
    suggestions.push("Use recycled or eco-certified materials where possible");
    suggestions.push("Source locally produced materials to reduce carbon footprint");
  }

  // Indoor quality suggestions
  if (inputs.indoorQuality < 70) {
    suggestions.push("Improve natural ventilation and air quality systems");
    suggestions.push("Maximize natural daylight with strategic window placement");
  }

  // Site suggestions
  if (inputs.siteSustainability === "rural") {
    suggestions.push("Consider site impact and minimize land disturbance");
  }

  // Renewable energy suggestions
  if (inputs.renewableEnergy < 50) {
    suggestions.push("Install solar panels or other renewable energy systems");
    suggestions.push("Consider geothermal heating/cooling systems");
  }

  // Waste management suggestions
  if (inputs.wasteManagement === "none" || inputs.wasteManagement === "basic") {
    suggestions.push("Implement comprehensive waste management and recycling program");
    suggestions.push("Plan for construction waste reduction and recycling");
  }

  // Overall suggestions based on score
  if (totalScore < 60) {
    suggestions.push("Focus on major improvements in energy and water efficiency first");
  }

  return suggestions;
}

export function getMaterialLabel(material: MaterialType): string {
  const labels: Record<MaterialType, string> = {
    standard: "Standard Materials",
    recycled: "Recycled Materials",
    "eco-certified": "Eco-certified Materials"
  };
  return labels[material];
}

export function getSiteLabel(site: SiteType): string {
  const labels: Record<SiteType, string> = {
    urban: "Urban (Low Impact)",
    suburban: "Suburban",
    rural: "Rural (High Impact)"
  };
  return labels[site];
}

export function getWasteLabel(waste: WasteManagement): string {
  const labels: Record<WasteManagement, string> = {
    none: "No Plan",
    basic: "Basic Recycling",
    advanced: "Advanced Waste Management"
  };
  return labels[waste];
}

export function getPresetTemplates(): PresetTemplate[] {
  return [
    {
      name: "Eco-Friendly Home",
      description: "High sustainability residential",
      category: "Residential",
      inputs: {
        energyEfficiency: 85,
        waterEfficiency: 80,
        materialSustainability: "eco-certified",
        indoorQuality: 85,
        siteSustainability: "suburban",
        renewableEnergy: 70,
        wasteManagement: "advanced"
      }
    },
    {
      name: "Standard Office",
      description: "Average commercial building",
      category: "Commercial",
      inputs: {
        energyEfficiency: 60,
        waterEfficiency: 55,
        materialSustainability: "standard",
        indoorQuality: 65,
        siteSustainability: "urban",
        renewableEnergy: 30,
        wasteManagement: "basic"
      }
    },
    {
      name: "Green Office",
      description: "Sustainable commercial space",
      category: "Commercial",
      inputs: {
        energyEfficiency: 80,
        waterEfficiency: 75,
        materialSustainability: "recycled",
        indoorQuality: 80,
        siteSustainability: "urban",
        renewableEnergy: 60,
        wasteManagement: "advanced"
      }
    },
    {
      name: "Basic House",
      description: "Standard residential building",
      category: "Residential",
      inputs: {
        energyEfficiency: 50,
        waterEfficiency: 45,
        materialSustainability: "standard",
        indoorQuality: 55,
        siteSustainability: "suburban",
        renewableEnergy: 20,
        wasteManagement: "basic"
      }
    }
  ];
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History Management
const HISTORY_KEY = "green-building-score-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: GreenBuildingScore): void {
  if (typeof window === "undefined") return;
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc-${Date.now()}`,
    timestamp: Date.now(),
    calculation
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export Functions
export function exportToText(calculation: GreenBuildingScore): string {
  return `GREEN BUILDING SCORE REPORT
${"=".repeat(50)}

Overall Score: ${calculation.totalScore}/100
Rating: ${calculation.rating}

SCORE BREAKDOWN:
${"-".repeat(50)}
Energy Efficiency: ${formatNumber(calculation.breakdown.energy, 1)} (${calculation.inputs.energyEfficiency}%)
Water Efficiency: ${formatNumber(calculation.breakdown.water, 1)} (${calculation.inputs.waterEfficiency}%)
Materials: ${formatNumber(calculation.breakdown.materials, 1)} (${getMaterialLabel(calculation.inputs.materialSustainability)})
Indoor Quality: ${formatNumber(calculation.breakdown.indoor, 1)} (${calculation.inputs.indoorQuality}%)
Site Impact: ${formatNumber(calculation.breakdown.site, 1)} (${getSiteLabel(calculation.inputs.siteSustainability)})
Renewable Energy: ${formatNumber(calculation.breakdown.renewable, 1)} (${calculation.inputs.renewableEnergy}%)
Waste Management: ${formatNumber(calculation.breakdown.waste, 1)} (${getWasteLabel(calculation.inputs.wasteManagement)})

RECOMMENDATIONS:
${"-".repeat(50)}
${calculation.suggestions.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Generated: ${new Date(calculation.timestamp).toLocaleString()}
Calculated via Productive Toolbox
`;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
