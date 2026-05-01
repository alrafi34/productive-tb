import {
  SustainabilityInputs,
  SustainabilityWeights,
  SustainabilityResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "sustainability-index-calculator-history";
const MAX_HISTORY = 10;

// Default weights for sustainability calculation
export const DEFAULT_WEIGHTS: SustainabilityWeights = {
  energy: 0.30,
  water: 0.20,
  materials: 0.20,
  waste: 0.15,
  indoor: 0.15
};

/**
 * Calculate sustainability index score
 */
export function calculateSustainabilityIndex(
  inputs: SustainabilityInputs,
  weights: SustainabilityWeights = DEFAULT_WEIGHTS
): SustainabilityResult {
  const { energy, water, materials, waste, indoor } = inputs;
  
  // Calculate weighted contributions
  const energyContribution = energy * weights.energy;
  const waterContribution = water * weights.water;
  const materialsContribution = materials * weights.materials;
  const wasteContribution = waste * weights.waste;
  const indoorContribution = indoor * weights.indoor;
  
  // Calculate total score
  const score = Math.round(
    energyContribution +
    waterContribution +
    materialsContribution +
    wasteContribution +
    indoorContribution
  );
  
  // Determine rating
  let rating: 'Low Sustainability' | 'Moderate Sustainability' | 'High Sustainability';
  if (score < 40) {
    rating = 'Low Sustainability';
  } else if (score < 70) {
    rating = 'Moderate Sustainability';
  } else {
    rating = 'High Sustainability';
  }
  
  // Identify weak and strong areas
  const weakAreas: string[] = [];
  const strongAreas: string[] = [];
  
  if (energy < 40) weakAreas.push('Energy Efficiency');
  else if (energy >= 70) strongAreas.push('Energy Efficiency');
  
  if (water < 40) weakAreas.push('Water Efficiency');
  else if (water >= 70) strongAreas.push('Water Efficiency');
  
  if (materials < 40) weakAreas.push('Material Sustainability');
  else if (materials >= 70) strongAreas.push('Material Sustainability');
  
  if (waste < 40) weakAreas.push('Waste Management');
  else if (waste >= 70) strongAreas.push('Waste Management');
  
  if (indoor < 40) weakAreas.push('Indoor Environmental Quality');
  else if (indoor >= 70) strongAreas.push('Indoor Environmental Quality');
  
  // Generate recommendations
  const recommendations = generateRecommendations(inputs, score);
  
  return {
    score,
    rating,
    inputs,
    breakdown: {
      energyContribution,
      waterContribution,
      materialsContribution,
      wasteContribution,
      indoorContribution
    },
    weakAreas,
    strongAreas,
    recommendations,
    timestamp: Date.now()
  };
}

/**
 * Generate recommendations based on inputs
 */
function generateRecommendations(inputs: SustainabilityInputs, score: number): string[] {
  const recommendations: string[] = [];
  
  if (inputs.energy < 50) {
    recommendations.push('Improve insulation and HVAC efficiency to reduce energy consumption');
    recommendations.push('Consider installing LED lighting and energy-efficient appliances');
  }
  
  if (inputs.water < 50) {
    recommendations.push('Install low-flow fixtures and water-efficient appliances');
    recommendations.push('Implement rainwater harvesting systems');
  }
  
  if (inputs.materials < 50) {
    recommendations.push('Use recycled and locally sourced building materials');
    recommendations.push('Choose materials with low embodied energy');
  }
  
  if (inputs.waste < 50) {
    recommendations.push('Implement comprehensive recycling and composting programs');
    recommendations.push('Design for deconstruction to enable material reuse');
  }
  
  if (inputs.indoor < 50) {
    recommendations.push('Improve natural ventilation and daylighting');
    recommendations.push('Use low-VOC paints and materials for better air quality');
  }
  
  if (score >= 70) {
    recommendations.push('Excellent sustainability performance! Consider green building certification');
  } else if (score >= 40) {
    recommendations.push('Good progress. Focus on weak areas to achieve high sustainability');
  } else {
    recommendations.push('Significant improvements needed across multiple sustainability metrics');
  }
  
  return recommendations;
}

/**
 * Get preset scenarios
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Residential Building',
      description: 'Typical residential sustainability profile',
      category: 'Residential',
      values: { energy: 65, water: 60, materials: 55, waste: 50, indoor: 70 }
    },
    {
      name: 'Commercial Office',
      description: 'Modern office building standards',
      category: 'Commercial',
      values: { energy: 70, water: 65, materials: 60, waste: 55, indoor: 75 }
    },
    {
      name: 'Industrial Facility',
      description: 'Industrial building baseline',
      category: 'Industrial',
      values: { energy: 55, water: 50, materials: 50, waste: 45, indoor: 60 }
    },
    {
      name: 'Green Building',
      description: 'High-performance sustainable building',
      category: 'Green',
      values: { energy: 90, water: 85, materials: 80, waste: 75, indoor: 90 }
    },
    {
      name: 'Legacy Building',
      description: 'Older building needing upgrades',
      category: 'Legacy',
      values: { energy: 35, water: 40, materials: 30, waste: 35, indoor: 45 }
    },
    {
      name: 'LEED Certified',
      description: 'LEED certification baseline',
      category: 'Certified',
      values: { energy: 80, water: 75, materials: 70, waste: 70, indoor: 80 }
    }
  ];
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: SustainabilityInputs): string | null {
  const { energy, water, materials, waste, indoor } = inputs;
  
  if (energy < 0 || energy > 100) return 'Energy efficiency must be between 0 and 100';
  if (water < 0 || water > 100) return 'Water efficiency must be between 0 and 100';
  if (materials < 0 || materials > 100) return 'Material sustainability must be between 0 and 100';
  if (waste < 0 || waste > 100) return 'Waste management must be between 0 and 100';
  if (indoor < 0 || indoor > 100) return 'Indoor quality must be between 0 and 100';
  
  return null;
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

/**
 * Get color for score
 */
export function getScoreColor(score: number): string {
  if (score < 40) return '#ef4444'; // red
  if (score < 70) return '#f59e0b'; // orange
  return '#10b981'; // green
}

/**
 * Get rating color
 */
export function getRatingColor(rating: string): string {
  if (rating === 'Low Sustainability') return 'red';
  if (rating === 'Moderate Sustainability') return 'yellow';
  return 'green';
}

// History management
export function saveToHistory(result: SustainabilityResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    result
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
export function exportToText(result: SustainabilityResult): string {
  const lines = [
    "SUSTAINABILITY INDEX REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "SUSTAINABILITY SCORE:",
    "-".repeat(50),
    `Overall Score: ${result.score}/100`,
    `Rating: ${result.rating}`,
    "",
    "INPUT METRICS:",
    "-".repeat(50),
    `Energy Efficiency: ${result.inputs.energy}/100`,
    `Water Efficiency: ${result.inputs.water}/100`,
    `Material Sustainability: ${result.inputs.materials}/100`,
    `Waste Management: ${result.inputs.waste}/100`,
    `Indoor Environmental Quality: ${result.inputs.indoor}/100`,
    "",
    "WEIGHTED CONTRIBUTIONS:",
    "-".repeat(50),
    `Energy: ${formatNumber(result.breakdown.energyContribution, 1)} points (30%)`,
    `Water: ${formatNumber(result.breakdown.waterContribution, 1)} points (20%)`,
    `Materials: ${formatNumber(result.breakdown.materialsContribution, 1)} points (20%)`,
    `Waste: ${formatNumber(result.breakdown.wasteContribution, 1)} points (15%)`,
    `Indoor Quality: ${formatNumber(result.breakdown.indoorContribution, 1)} points (15%)`
  ];
  
  if (result.strongAreas.length > 0) {
    lines.push("");
    lines.push("STRONG AREAS:");
    lines.push("-".repeat(50));
    result.strongAreas.forEach(area => lines.push(`✓ ${area}`));
  }
  
  if (result.weakAreas.length > 0) {
    lines.push("");
    lines.push("AREAS FOR IMPROVEMENT:");
    lines.push("-".repeat(50));
    result.weakAreas.forEach(area => lines.push(`• ${area}`));
  }
  
  if (result.recommendations.length > 0) {
    lines.push("");
    lines.push("RECOMMENDATIONS:");
    lines.push("-".repeat(50));
    result.recommendations.forEach(rec => lines.push(`• ${rec}`));
  }
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Sustainability Index Calculator");
  
  return lines.join("\n");
}

export function exportToJSON(result: SustainabilityResult): string {
  return JSON.stringify(result, null, 2);
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
