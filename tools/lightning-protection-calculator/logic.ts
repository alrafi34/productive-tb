import { LightningProtectionInputs, LightningProtectionResult, RiskLevel, StructureType, ProtectionLevel } from "./types";

// Get risk level label
export function getRiskLevelLabel(riskLevel: RiskLevel): string {
  const labels = {
    'low': 'Low (Ng ≈ 0.5: UK, Ireland, Scandinavia, US Pacific coast)',
    'medium': 'Medium (Ng ≈ 2: most of Europe, US Northeast)',
    'high': 'High (Ng ≈ 5: US Midwest and Southeast)',
    'very-high': 'Very high (Ng ≈ 10: Florida, US Gulf Coast)',
  };
  return labels[riskLevel];
}

// Get structure type label
export function getStructureTypeLabel(structureType: StructureType): string {
  const labels = {
    'residential': 'Residential building',
    'commercial': 'Commercial or public building',
    'industrial': 'Industrial / flammable contents',
    'critical': 'Critical service (hospital, data center)',
    'open-field': 'Isolated structure in open ground',
  };
  return labels[structureType];
}

// Format number with precision
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Debounce function
export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// Validate inputs
export function validateInputs(inputs: LightningProtectionInputs): string | null {
  const { height, area, groundResistance } = inputs;

  if (height === undefined || height === null || height <= 0) {
    return "Building height must be greater than zero";
  }

  if (height > 500) {
    return "Building height seems unusually high. Please verify the value.";
  }

  if (area === undefined || area === null || area <= 0) {
    return "Building area must be greater than zero";
  }

  if (area > 100000) {
    return "Building area seems unusually large. Please verify the value.";
  }

  if (groundResistance !== undefined && groundResistance !== null) {
    if (groundResistance < 0) {
      return "Ground resistance cannot be negative";
    }
    if (groundResistance > 1000) {
      return "Ground resistance seems unusually high. Please verify the value.";
    }
  }

  return null;
}

/*
 * Risk assessment after IEC 62305-2 and NFPA 780 Annex L: the expected
 * number of direct strikes a year, Nd = Ng × Ad × Cd × 10⁻⁶, against a
 * tolerable number Nc = 1.5 × 10⁻³ / C. When Nd > Nc a lightning protection
 * system is recommended, and the required efficiency E = 1 − Nc / Nd picks
 * the protection level (I to IV).
 */

// Ground flash density Ng (flashes per km² per year) for each location choice;
// typical values from lightning detection network maps, not a local measurement
export const FLASH_DENSITY: Record<RiskLevel, number> = {
  'low': 0.5,
  'medium': 2,
  'high': 5,
  'very-high': 10,
};

// Location factor Cd and the product C of the NFPA 780 coefficients
// (construction, contents, occupancy, consequence) for each structure choice
export const STRUCTURE_COEFFICIENTS: Record<StructureType, { cd: number; c: number }> = {
  'residential': { cd: 0.5, c: 1 },
  'commercial': { cd: 0.5, c: 3 },
  'industrial': { cd: 0.5, c: 5 },
  'critical': { cd: 0.5, c: 10 },
  'open-field': { cd: 1, c: 1 },
};

// Collection area of a building with a square footprint (IEC 62305-2)
export function collectionArea(area: number, height: number): number {
  const side = Math.sqrt(area);
  return area + 6 * height * (side + side) + 9 * Math.PI * height * height;
}

// Small numbers such as strikes per year keep three significant figures
export function formatSmall(value: number): string {
  if (value === 0) return '0';
  return Math.abs(value) < 0.01 ? value.toExponential(2) : value.toPrecision(3);
}

export function calculateLightningProtection(inputs: LightningProtectionInputs): LightningProtectionResult {
  const { height, area, riskLevel, structureType, groundResistance, precision = 2 } = inputs;

  const flashDensity = FLASH_DENSITY[riskLevel];
  const { cd, c } = STRUCTURE_COEFFICIENTS[structureType];
  const area_d = collectionArea(area, height);
  const expectedStrikes = flashDensity * area_d * cd * 1e-6;
  const tolerableStrikes = 1.5e-3 / c;
  const riskScore = expectedStrikes / tolerableStrikes;
  const efficiency = expectedStrikes > tolerableStrikes ? 1 - tolerableStrikes / expectedStrikes : 0;

  let protectionLevel: ProtectionLevel;
  let protectionLevelText: string;
  let systemType: string;
  let recommendation: string;

  if (efficiency <= 0) {
    protectionLevel = 'minimal';
    protectionLevelText = 'Protection Optional';
    systemType = 'No lightning protection system required by risk';
    recommendation = 'Expected strikes are below the tolerable frequency, so an external lightning protection system is optional. Surge protective devices on the incoming power and data lines are still worthwhile.';
  } else if (efficiency <= 0.8) {
    protectionLevel = 'basic';
    protectionLevelText = 'Protection Level IV';
    systemType = 'Class IV lightning protection system';
    recommendation = 'Install air terminals, down conductors and an earth termination system designed to protection level IV (mesh about 20 m × 20 m, rolling sphere radius 60 m), with surge protection at the service entrance.';
  } else if (efficiency <= 0.9) {
    protectionLevel = 'moderate';
    protectionLevelText = 'Protection Level III';
    systemType = 'Class III lightning protection system';
    recommendation = 'Install a lightning protection system to protection level III (mesh about 15 m × 15 m, rolling sphere radius 45 m), with surge protection at the service entrance.';
  } else if (efficiency <= 0.95) {
    protectionLevel = 'high';
    protectionLevelText = 'Protection Level II';
    systemType = 'Class II lightning protection system';
    recommendation = 'Install a lightning protection system to protection level II (mesh about 10 m × 10 m, rolling sphere radius 30 m), with coordinated surge protection. Have it designed by a qualified engineer.';
  } else {
    protectionLevel = 'advanced';
    protectionLevelText = efficiency <= 0.98 ? 'Protection Level I' : 'Protection Level I + Extra Measures';
    systemType = 'Class I lightning protection system';
    recommendation = 'Install a lightning protection system to protection level I (mesh about 5 m × 5 m, rolling sphere radius 20 m) with coordinated surge protection' + (efficiency > 0.98 ? ', plus additional protection measures, because the required efficiency exceeds 98%.' : '.') + ' A full risk assessment by a qualified engineer is required.';
  }

  // Earth termination below 10 Ω is the usual target (IEC 62305-3, NFPA 780)
  const groundingRequired = groundResistance === undefined || groundResistance === null || groundResistance > 10;

  let safetyWarning = '';
  if (riskScore >= 10) {
    safetyWarning = '⚠️ HIGH RISK: Have a qualified engineer carry out a full IEC 62305-2 or NFPA 780 risk assessment.';
  } else if (riskScore > 1) {
    safetyWarning = '⚠️ Protection recommended: confirm with a full risk assessment and your local code.';
  } else {
    safetyWarning = 'ℹ️ This is a screening estimate. Local codes, insurers or the building use may still require protection.';
  }

  const steps = generateSteps(inputs, { flashDensity, cd, c, area_d, expectedStrikes, tolerableStrikes, efficiency, protectionLevelText }, precision);

  return {
    riskScore,
    protectionLevel,
    protectionLevelText,
    recommendation,
    systemType,
    safetyWarning,
    collectionArea: area_d,
    flashDensity,
    expectedStrikes,
    tolerableStrikes,
    efficiency,
    groundingRequired,
    steps,
  };
}

interface StepValues {
  flashDensity: number; cd: number; c: number; area_d: number;
  expectedStrikes: number; tolerableStrikes: number; efficiency: number; protectionLevelText: string;
}

function generateSteps(inputs: LightningProtectionInputs, v: StepValues, precision: number): string[] {
  const side = Math.sqrt(inputs.area);
  const steps = [
    "Lightning Risk Assessment (IEC 62305-2 / NFPA 780 Annex L)",
    "",
    "Given:",
    `  Height H = ${inputs.height} m, footprint = ${inputs.area} m² (square, side ${formatNumber(side, precision)} m)`,
    `  Location: ${getRiskLevelLabel(inputs.riskLevel)}, Ng = ${v.flashDensity} flashes/km²/year`,
    `  Structure: ${getStructureTypeLabel(inputs.structureType)}, Cd = ${v.cd}, C = ${v.c}`,
    inputs.groundResistance !== undefined && inputs.groundResistance !== null ? `  Ground resistance = ${inputs.groundResistance} Ω` : "",
    "",
    "Step 1: Collection area",
    "  Ad = L × W + 6H(L + W) + 9πH²",
    `  Ad = ${formatNumber(v.area_d, 0)} m²`,
    "",
    "Step 2: Expected direct strikes per year",
    "  Nd = Ng × Ad × Cd × 10⁻⁶",
    `  Nd = ${v.flashDensity} × ${formatNumber(v.area_d, 0)} × ${v.cd} × 10⁻⁶ = ${formatSmall(v.expectedStrikes)} per year (one in ${formatNumber(1 / v.expectedStrikes, 0)} years)`,
    "",
    "Step 3: Tolerable strike frequency",
    "  Nc = 1.5 × 10⁻³ / C",
    `  Nc = ${formatSmall(v.tolerableStrikes)} per year`,
    "",
    "Step 4: Compare",
    v.efficiency > 0
      ? `  Nd > Nc, required efficiency E = 1 − Nc / Nd = ${formatNumber(v.efficiency * 100, 1)}%`
      : "  Nd ≤ Nc: protection is optional",
    `  Result: ${v.protectionLevelText}`,
  ];
  return steps.filter((s) => s !== "");
}

// Get common presets
export function getPresets() {
  return [
    {
      name: "Small House",
      description: "Single-family home",
      height: 8,
      area: 150,
      riskLevel: 'medium' as RiskLevel,
      structureType: 'residential' as StructureType,
    },
    {
      name: "Large House",
      description: "Two-story residence",
      height: 12,
      area: 300,
      riskLevel: 'medium' as RiskLevel,
      structureType: 'residential' as StructureType,
    },
    {
      name: "Office Building",
      description: "5-story commercial",
      height: 20,
      area: 2000,
      riskLevel: 'medium' as RiskLevel,
      structureType: 'commercial' as StructureType,
    },
    {
      name: "Warehouse",
      description: "Industrial facility",
      height: 15,
      area: 5000,
      riskLevel: 'high' as RiskLevel,
      structureType: 'industrial' as StructureType,
    },
    {
      name: "High-Rise",
      description: "20-story building",
      height: 80,
      area: 8000,
      riskLevel: 'high' as RiskLevel,
      structureType: 'commercial' as StructureType,
    },
    {
      name: "Data Center",
      description: "Critical infrastructure",
      height: 12,
      area: 1000,
      riskLevel: 'very-high' as RiskLevel,
      structureType: 'critical' as StructureType,
    },
  ];
}

// History management
const HISTORY_KEY = 'lightning-protection-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LightningProtectionInputs;
  result: LightningProtectionResult;
}

export function saveToHistory(inputs: LightningProtectionInputs, result: LightningProtectionResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
      history.pop();
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

// Export to text
export function exportToText(inputs: LightningProtectionInputs, result: LightningProtectionResult): string {
  const lines = [
    "Lightning Protection Calculator - Assessment Report",
    "=".repeat(60),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "BUILDING PARAMETERS:",
    "-".repeat(60),
    `Building Height: ${inputs.height} meters`,
    `Building Area: ${inputs.area} square meters`,
    `Location Risk Level: ${getRiskLevelLabel(inputs.riskLevel)}`,
    `Structure Type: ${getStructureTypeLabel(inputs.structureType)}`,
  ];

  if (inputs.groundResistance !== undefined) {
    lines.push(`Ground Resistance: ${inputs.groundResistance} Ω`);
  }

  lines.push(
    "",
    "RISK ASSESSMENT:",
    "-".repeat(60),
    `Nd / Nc: ${formatNumber(result.riskScore, inputs.precision || 2)}`,
    `Protection Level: ${result.protectionLevelText}`,
    `Collection Area (Ad): ${formatNumber(result.collectionArea, 0)} m²`,
    `Expected Strikes (Nd): ${formatSmall(result.expectedStrikes)} per year`,
    `Tolerable Strikes (Nc): ${formatSmall(result.tolerableStrikes)} per year`,
    "",
    "RECOMMENDATIONS:",
    "-".repeat(60),
    `System Type: ${result.systemType}`,
    `Recommendation: ${result.recommendation}`,
    `Grounding Required: ${result.groundingRequired ? 'Yes' : 'No'}`,
    "",
    "SAFETY WARNING:",
    "-".repeat(60),
    result.safetyWarning,
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  );
  
  lines.push(...result.steps);
  
  lines.push(
    "",
    "=".repeat(60),
    "DISCLAIMER:",
    "This is a preliminary estimation tool for educational purposes only.",
    "Professional engineering consultation is required for actual system design.",
    "Always comply with local building codes and lightning protection standards.",
    "",
    "Generated by Lightning Protection Calculator"
  );

  return lines.join("\n");
}

// Download file
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
