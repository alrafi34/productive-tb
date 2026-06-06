import { EarthingInputs, EarthingResult, ElectrodeType } from "./types";

export function calculateEarthingResistance(inputs: EarthingInputs): EarthingResult {
  const { soilResistivity, rodLength, rodDiameter, numberOfRods, spacing, electrodeType } = inputs;
  
  const steps: string[] = [];
  let resistance: number;
  let singleRodResistance: number | undefined;
  let efficiencyFactor: number | undefined;
  let formula: string;

  if (electrodeType === 'single_rod' || numberOfRods === 1) {
    // Single rod formula: R = (ρ / (2πL)) × [ln(4L/d) - 1]
    const term1 = soilResistivity / (2 * Math.PI * rodLength);
    const term2 = Math.log((4 * rodLength) / rodDiameter) - 1;
    resistance = term1 * term2;
    
    formula = 'R = (ρ / (2πL)) × [ln(4L/d) - 1]';
    
    steps.push('Single Rod Earthing Resistance Calculation');
    steps.push('');
    steps.push('Given Parameters:');
    steps.push(`Soil Resistivity (ρ): ${soilResistivity} Ω·m`);
    steps.push(`Rod Length (L): ${rodLength} m`);
    steps.push(`Rod Diameter (d): ${rodDiameter} m`);
    steps.push('');
    steps.push('Formula: R = (ρ / (2πL)) × [ln(4L/d) - 1]');
    steps.push('');
    steps.push('Step 1: Calculate 4L/d');
    steps.push(`4L/d = (4 × ${rodLength}) / ${rodDiameter}`);
    steps.push(`4L/d = ${(4 * rodLength / rodDiameter).toFixed(4)}`);
    steps.push('');
    steps.push('Step 2: Calculate ln(4L/d)');
    steps.push(`ln(${(4 * rodLength / rodDiameter).toFixed(4)}) = ${Math.log((4 * rodLength) / rodDiameter).toFixed(6)}`);
    steps.push('');
    steps.push('Step 3: Calculate [ln(4L/d) - 1]');
    steps.push(`${Math.log((4 * rodLength) / rodDiameter).toFixed(6)} - 1 = ${term2.toFixed(6)}`);
    steps.push('');
    steps.push('Step 4: Calculate ρ / (2πL)');
    steps.push(`${soilResistivity} / (2 × π × ${rodLength}) = ${term1.toFixed(6)}`);
    steps.push('');
    steps.push('Step 5: Calculate Final Resistance');
    steps.push(`R = ${term1.toFixed(6)} × ${term2.toFixed(6)}`);
    steps.push(`R = ${resistance.toFixed(4)} Ω`);
    
  } else {
    // Multiple rods
    const term1 = soilResistivity / (2 * Math.PI * rodLength);
    const term2 = Math.log((4 * rodLength) / rodDiameter) - 1;
    singleRodResistance = term1 * term2;
    
    // Efficiency factor based on spacing
    // Simplified model: efficiency decreases as rods get closer
    const spacingRatio = spacing / rodLength;
    efficiencyFactor = Math.min(1, 0.4 + (0.6 * Math.min(spacingRatio / 2, 1)));
    
    resistance = (singleRodResistance / numberOfRods) * (1 / efficiencyFactor);
    
    formula = 'R = (R_single / n) × (1 / η)';
    
    steps.push('Multiple Rods Earthing Resistance Calculation');
    steps.push('');
    steps.push('Given Parameters:');
    steps.push(`Soil Resistivity (ρ): ${soilResistivity} Ω·m`);
    steps.push(`Rod Length (L): ${rodLength} m`);
    steps.push(`Rod Diameter (d): ${rodDiameter} m`);
    steps.push(`Number of Rods (n): ${numberOfRods}`);
    steps.push(`Spacing Between Rods: ${spacing} m`);
    steps.push('');
    steps.push('Step 1: Calculate Single Rod Resistance');
    steps.push('Formula: R_single = (ρ / (2πL)) × [ln(4L/d) - 1]');
    steps.push(`R_single = ${singleRodResistance.toFixed(4)} Ω`);
    steps.push('');
    steps.push('Step 2: Calculate Efficiency Factor (η)');
    steps.push(`Spacing Ratio = ${spacing} / ${rodLength} = ${spacingRatio.toFixed(4)}`);
    steps.push(`Efficiency Factor (η) = ${efficiencyFactor.toFixed(4)}`);
    steps.push('(Higher spacing improves efficiency)');
    steps.push('');
    steps.push('Step 3: Calculate Total Resistance');
    steps.push(`R = (R_single / n) × (1 / η)`);
    steps.push(`R = (${singleRodResistance.toFixed(4)} / ${numberOfRods}) × (1 / ${efficiencyFactor.toFixed(4)})`);
    steps.push(`R = ${resistance.toFixed(4)} Ω`);
  }

  // Determine status based on resistance value
  let status: 'excellent' | 'good' | 'acceptable' | 'poor';
  let statusMessage: string;
  let recommendation: string | undefined;

  if (resistance < 1) {
    status = 'excellent';
    statusMessage = 'Excellent - Very low resistance';
  } else if (resistance < 5) {
    status = 'good';
    statusMessage = 'Good - Within recommended limits';
  } else if (resistance < 10) {
    status = 'acceptable';
    statusMessage = 'Acceptable - Consider improvement';
    recommendation = 'Resistance is acceptable but could be improved by increasing rod length, using multiple rods, or treating the soil.';
  } else {
    status = 'poor';
    statusMessage = 'High - Requires improvement';
    recommendation = getRecommendation(inputs, resistance);
  }

  return {
    resistance,
    singleRodResistance,
    efficiencyFactor,
    status,
    statusMessage,
    recommendation,
    formula,
    steps
  };
}

function getRecommendation(inputs: EarthingInputs, currentResistance: number): string {
  const suggestions: string[] = [];
  
  if (inputs.rodLength < 3) {
    suggestions.push('Increase rod length to 3m or more');
  }
  
  if (inputs.numberOfRods === 1) {
    suggestions.push('Use multiple rods in parallel');
  } else if (inputs.spacing < inputs.rodLength * 2) {
    suggestions.push('Increase spacing between rods (recommended: 2× rod length)');
  }
  
  suggestions.push('Consider soil treatment with salt or bentonite');
  suggestions.push('Use chemical earthing compounds');
  
  return `Resistance of ${currentResistance.toFixed(2)}Ω is high. Recommendations: ${suggestions.join('; ')}.`;
}

export function validateInputs(inputs: EarthingInputs): string | null {
  const { soilResistivity, rodLength, rodDiameter, numberOfRods, spacing } = inputs;
  
  if (!soilResistivity || soilResistivity <= 0) {
    return "Soil resistivity must be greater than 0";
  }
  
  if (!rodLength || rodLength <= 0) {
    return "Rod length must be greater than 0";
  }
  
  if (!rodDiameter || rodDiameter <= 0) {
    return "Rod diameter must be greater than 0";
  }
  
  if (rodDiameter >= rodLength) {
    return "Rod diameter must be less than rod length";
  }
  
  if (numberOfRods < 1) {
    return "Number of rods must be at least 1";
  }
  
  if (numberOfRods > 1 && spacing <= 0) {
    return "Spacing must be greater than 0 for multiple rods";
  }
  
  if (isNaN(soilResistivity) || isNaN(rodLength) || isNaN(rodDiameter)) {
    return "Please enter valid numbers";
  }
  
  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getPresets() {
  return [
    {
      name: 'Standard Rod (Dry Soil)',
      description: '100 Ω·m, 2.5m rod, 16mm dia',
      soilResistivity: 100,
      rodLength: 2.5,
      rodDiameter: 0.016,
      numberOfRods: 1,
      spacing: 5
    },
    {
      name: 'Standard Rod (Moist Soil)',
      description: '50 Ω·m, 2.5m rod, 16mm dia',
      soilResistivity: 50,
      rodLength: 2.5,
      rodDiameter: 0.016,
      numberOfRods: 1,
      spacing: 5
    },
    {
      name: 'Long Rod (High Resistivity)',
      description: '200 Ω·m, 3m rod, 20mm dia',
      soilResistivity: 200,
      rodLength: 3,
      rodDiameter: 0.02,
      numberOfRods: 1,
      spacing: 6
    },
    {
      name: 'Multiple Rods (Dry Soil)',
      description: '100 Ω·m, 4 rods, 2.5m, 5m spacing',
      soilResistivity: 100,
      rodLength: 2.5,
      rodDiameter: 0.016,
      numberOfRods: 4,
      spacing: 5
    },
    {
      name: 'Multiple Rods (Moist Soil)',
      description: '50 Ω·m, 3 rods, 3m, 6m spacing',
      soilResistivity: 50,
      rodLength: 3,
      rodDiameter: 0.02,
      numberOfRods: 3,
      spacing: 6
    },
    {
      name: 'Industrial Setup',
      description: '80 Ω·m, 6 rods, 3m, 6m spacing',
      soilResistivity: 80,
      rodLength: 3,
      rodDiameter: 0.02,
      numberOfRods: 6,
      spacing: 6
    }
  ];
}

export function getSoilTypes() {
  return [
    { name: 'Wet Organic Soil', resistivity: 10 },
    { name: 'Moist Soil', resistivity: 50 },
    { name: 'Dry Soil', resistivity: 100 },
    { name: 'Clay', resistivity: 40 },
    { name: 'Sandy Clay', resistivity: 150 },
    { name: 'Sand', resistivity: 2000 },
    { name: 'Gravel', resistivity: 3000 },
    { name: 'Rock', resistivity: 10000 }
  ];
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

// History management
interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: EarthingInputs;
  result: EarthingResult;
}

const HISTORY_KEY = 'earthing-resistance-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: EarthingInputs, result: EarthingResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result
    };
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

export function exportToText(inputs: EarthingInputs, result: EarthingResult): string {
  const lines: string[] = [];
  
  lines.push('EARTHING RESISTANCE CALCULATOR - CALCULATION REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(50));
  lines.push(`Soil Resistivity: ${inputs.soilResistivity} Ω·m`);
  lines.push(`Rod Length: ${inputs.rodLength} m`);
  lines.push(`Rod Diameter: ${inputs.rodDiameter} m`);
  lines.push(`Number of Rods: ${inputs.numberOfRods}`);
  
  if (inputs.numberOfRods > 1) {
    lines.push(`Spacing Between Rods: ${inputs.spacing} m`);
  }
  
  lines.push('');
  lines.push('CALCULATION RESULTS:');
  lines.push('-'.repeat(50));
  lines.push(`Earthing Resistance: ${formatNumber(result.resistance, 4)} Ω`);
  
  if (result.singleRodResistance) {
    lines.push(`Single Rod Resistance: ${formatNumber(result.singleRodResistance, 4)} Ω`);
  }
  
  if (result.efficiencyFactor) {
    lines.push(`Efficiency Factor: ${formatNumber(result.efficiencyFactor, 4)}`);
  }
  
  lines.push(`Status: ${result.statusMessage}`);
  
  if (result.recommendation) {
    lines.push('');
    lines.push('RECOMMENDATION:');
    lines.push('-'.repeat(50));
    lines.push(result.recommendation);
  }
  
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Earthing Resistance Calculator');
  
  return lines.join('\n');
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

// Save last used settings
const SETTINGS_KEY = 'earthing-resistance-calculator-settings';

export function saveSettings(settings: Partial<EarthingInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<EarthingInputs> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}
