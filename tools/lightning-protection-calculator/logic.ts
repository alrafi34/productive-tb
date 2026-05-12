import { LightningProtectionInputs, LightningProtectionResult, RiskLevel, StructureType, ProtectionLevel } from "./types";

// Map risk level to numeric factor
export function getRiskFactor(riskLevel: RiskLevel): number {
  const riskMap = {
    'low': 0.2,
    'medium': 0.5,
    'high': 0.8,
    'very-high': 1.0,
  };
  return riskMap[riskLevel];
}

// Map structure type to numeric factor
export function getStructureFactor(structureType: StructureType): number {
  const structureMap = {
    'residential': 0.3,
    'commercial': 0.5,
    'industrial': 0.7,
    'critical': 1.0,
    'open-field': 0.4,
  };
  return structureMap[structureType];
}

// Get risk level label
export function getRiskLevelLabel(riskLevel: RiskLevel): string {
  const labels = {
    'low': 'Low Risk Area',
    'medium': 'Medium Risk Area',
    'high': 'High Risk Area',
    'very-high': 'Very High Risk Area',
  };
  return labels[riskLevel];
}

// Get structure type label
export function getStructureTypeLabel(structureType: StructureType): string {
  const labels = {
    'residential': 'Residential Building',
    'commercial': 'Commercial Building',
    'industrial': 'Industrial Facility',
    'critical': 'Critical Infrastructure',
    'open-field': 'Open Field Structure',
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

// Calculate lightning protection requirements
export function calculateLightningProtection(inputs: LightningProtectionInputs): LightningProtectionResult {
  const { height, area, riskLevel, structureType, groundResistance, precision = 2 } = inputs;

  // Calculate individual factors
  const heightFactor = Math.min(height / 100, 2.0); // Normalize to 0-2 range
  const areaFactor = Math.min(area / 1000, 1.5); // Normalize to 0-1.5 range
  const riskFactor = getRiskFactor(riskLevel);
  const structureFactor = getStructureFactor(structureType);

  // Calculate overall risk score (weighted average)
  const riskScore = (
    heightFactor * 0.35 +
    areaFactor * 0.25 +
    riskFactor * 0.25 +
    structureFactor * 0.15
  );

  // Determine protection level
  let protectionLevel: ProtectionLevel;
  let protectionLevelText: string;
  let systemType: string;
  let recommendation: string;
  let estimatedCost: string;

  if (riskScore < 0.3) {
    protectionLevel = 'minimal';
    protectionLevelText = 'Minimal Protection Required';
    systemType = 'Basic grounding system';
    recommendation = 'Install basic grounding system with proper earthing. Minimal lightning protection required for this structure.';
    estimatedCost = '$500 - $2,000';
  } else if (riskScore < 0.5) {
    protectionLevel = 'basic';
    protectionLevelText = 'Basic Protection Required';
    systemType = 'Single air terminal with down conductors';
    recommendation = 'Install lightning rod system with single air terminal, down conductors, and proper grounding. Basic surge protection recommended.';
    estimatedCost = '$2,000 - $5,000';
  } else if (riskScore < 0.7) {
    protectionLevel = 'moderate';
    protectionLevelText = 'Moderate Protection Required';
    systemType = 'Multiple air terminals with mesh system';
    recommendation = 'Install comprehensive lightning protection system with multiple air terminals, mesh conductors, and surge protection devices. Professional installation required.';
    estimatedCost = '$5,000 - $15,000';
  } else if (riskScore < 0.9) {
    protectionLevel = 'high';
    protectionLevelText = 'High-Level Protection Required';
    systemType = 'Advanced multi-point protection system';
    recommendation = 'Install advanced lightning protection system with multiple air terminals, mesh network, surge arresters, and comprehensive grounding. Certified engineering design required.';
    estimatedCost = '$15,000 - $50,000';
  } else {
    protectionLevel = 'advanced';
    protectionLevelText = 'Advanced Protection System Required';
    systemType = 'Critical infrastructure protection system';
    recommendation = 'Install state-of-the-art lightning protection system with early streamer emission (ESE) terminals, comprehensive surge protection, and redundant grounding. Professional engineering design and certification mandatory.';
    estimatedCost = '$50,000+';
  }

  // Determine grounding requirements
  const groundingRequired = groundResistance === undefined || groundResistance > 10;

  // Generate safety warning
  let safetyWarning = '';
  if (riskScore >= 0.7) {
    safetyWarning = '⚠️ HIGH RISK: Professional engineering consultation strongly recommended. This is an estimation tool only.';
  } else if (riskScore >= 0.5) {
    safetyWarning = '⚠️ MODERATE RISK: Consider professional assessment for proper system design.';
  } else {
    safetyWarning = 'ℹ️ Note: This is a preliminary estimation. Consult local building codes and standards.';
  }

  // Generate calculation steps
  const steps = generateSteps(inputs, heightFactor, areaFactor, riskFactor, structureFactor, riskScore, precision);

  return {
    riskScore,
    protectionLevel,
    protectionLevelText,
    recommendation,
    systemType,
    safetyWarning,
    heightFactor,
    areaFactor,
    riskFactor,
    structureFactor,
    groundingRequired,
    estimatedCost,
    steps,
  };
}

function generateSteps(
  inputs: LightningProtectionInputs,
  heightFactor: number,
  areaFactor: number,
  riskFactor: number,
  structureFactor: number,
  riskScore: number,
  precision: number
): string[] {
  const steps: string[] = [];

  steps.push(
    "Lightning Protection Risk Assessment",
    "",
    "Given:",
    `  Building Height = ${inputs.height} m`,
    `  Building Area = ${inputs.area} m²`,
    `  Location Risk = ${getRiskLevelLabel(inputs.riskLevel)}`,
    `  Structure Type = ${getStructureTypeLabel(inputs.structureType)}`,
    inputs.groundResistance !== undefined ? `  Ground Resistance = ${inputs.groundResistance} Ω` : "",
    "",
    "Step 1: Calculate Height Factor",
    `  Height Factor = min(Height / 100, 2.0)`,
    `  Height Factor = min(${inputs.height} / 100, 2.0)`,
    `  Height Factor = ${formatNumber(heightFactor, precision)}`,
    "",
    "Step 2: Calculate Area Factor",
    `  Area Factor = min(Area / 1000, 1.5)`,
    `  Area Factor = min(${inputs.area} / 1000, 1.5)`,
    `  Area Factor = ${formatNumber(areaFactor, precision)}`,
    "",
    "Step 3: Determine Risk Factor",
    `  Risk Factor (${inputs.riskLevel}) = ${formatNumber(riskFactor, precision)}`,
    "",
    "Step 4: Determine Structure Factor",
    `  Structure Factor (${inputs.structureType}) = ${formatNumber(structureFactor, precision)}`,
    "",
    "Step 5: Calculate Overall Risk Score",
    `  Risk Score = (Height × 0.35) + (Area × 0.25) + (Risk × 0.25) + (Structure × 0.15)`,
    `  Risk Score = (${formatNumber(heightFactor, precision)} × 0.35) + (${formatNumber(areaFactor, precision)} × 0.25) + (${formatNumber(riskFactor, precision)} × 0.25) + (${formatNumber(structureFactor, precision)} × 0.15)`,
    `  Risk Score = ${formatNumber(riskScore, precision)}`,
    "",
    "Step 6: Determine Protection Level",
    `  Risk Score ${formatNumber(riskScore, precision)} → ${getProtectionLevelFromScore(riskScore)}`
  );

  return steps.filter(step => step !== "");
}

function getProtectionLevelFromScore(score: number): string {
  if (score < 0.3) return "Minimal Protection Required";
  if (score < 0.5) return "Basic Protection Required";
  if (score < 0.7) return "Moderate Protection Required";
  if (score < 0.9) return "High-Level Protection Required";
  return "Advanced Protection System Required";
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
    `Risk Score: ${formatNumber(result.riskScore, inputs.precision || 2)}`,
    `Protection Level: ${result.protectionLevelText}`,
    `Height Factor: ${formatNumber(result.heightFactor, inputs.precision || 2)}`,
    `Area Factor: ${formatNumber(result.areaFactor, inputs.precision || 2)}`,
    `Risk Factor: ${formatNumber(result.riskFactor, inputs.precision || 2)}`,
    `Structure Factor: ${formatNumber(result.structureFactor, inputs.precision || 2)}`,
    "",
    "RECOMMENDATIONS:",
    "-".repeat(60),
    `System Type: ${result.systemType}`,
    `Recommendation: ${result.recommendation}`,
    `Estimated Cost: ${result.estimatedCost}`,
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
