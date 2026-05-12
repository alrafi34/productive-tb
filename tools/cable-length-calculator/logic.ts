import {
  CableLengthInputs,
  CableLengthResult,
  HistoryEntry,
  Preset,
  InstallationType,
  CableType,
} from "./types";

const HISTORY_KEY = "cable-length-calculator-history";
const MAX_HISTORY = 20;

// Installation type factors
const INSTALLATION_FACTORS: Record<InstallationType, number> = {
  straight: 1.0,
  conduit: 1.05,
  wall: 1.1,
  underground: 1.15,
  overhead: 1.08,
};

// Recommended slack percentages by cable type
const RECOMMENDED_SLACK: Record<CableType, number> = {
  electrical: 10,
  ethernet: 10,
  fiber: 15,
  coaxial: 10,
};

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format number with specified decimal places
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Convert distance to meters
export function convertToMeters(distance: number, unit: 'm' | 'ft'): number {
  return unit === 'ft' ? distance * 0.3048 : distance;
}

// Convert meters to feet
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}

// Get installation factor
export function getInstallationFactor(type: InstallationType): number {
  return INSTALLATION_FACTORS[type] || 1.0;
}

// Get recommended slack
export function getRecommendedSlack(cableType: CableType): number {
  return RECOMMENDED_SLACK[cableType] || 10;
}

// Calculate cable length
export function calculateCableLength(inputs: CableLengthInputs): CableLengthResult {
  // Convert distance to meters for calculation
  const baseDistanceMeters = convertToMeters(inputs.distance, inputs.distanceUnit);

  // Calculate slack length
  const slackLength = baseDistanceMeters * (inputs.slackPercent / 100);

  // Calculate bend allowance
  const bendAllowance = inputs.bends * inputs.bendAllowance;

  // Get installation factor
  const installationFactor = getInstallationFactor(inputs.installationType);

  // Calculate total length
  const subtotal = baseDistanceMeters + slackLength + bendAllowance;
  const totalLength = subtotal * installationFactor;
  const totalLengthFeet = metersToFeet(totalLength);

  // Generate recommendations
  const recommendations: string[] = [];

  const recommendedSlack = getRecommendedSlack(inputs.cableType);
  if (inputs.slackPercent < recommendedSlack) {
    recommendations.push(`Consider increasing slack to ${recommendedSlack}% for ${inputs.cableType} cables.`);
  }

  if (inputs.cableType === 'fiber' && inputs.bends > 5) {
    recommendations.push("Excessive bends detected. Fiber optic cables are sensitive to tight bends.");
  }

  if (inputs.installationType === 'underground' && inputs.slackPercent < 15) {
    recommendations.push("Underground installations typically require 15-20% slack for settling and repairs.");
  }

  if (inputs.installationType === 'conduit' && inputs.bends > 4) {
    recommendations.push("Multiple bends in conduit may require pull boxes or larger conduit size.");
  }

  if (baseDistanceMeters > 90 && inputs.cableType === 'ethernet') {
    recommendations.push("Ethernet cable runs over 90m (295ft) may experience signal degradation. Consider using fiber or repeaters.");
  }

  if (inputs.slackPercent > 30) {
    recommendations.push("Excessive slack may lead to cable management issues and increased costs.");
  }

  if (inputs.bends === 0 && inputs.installationType !== 'straight') {
    recommendations.push("Consider adding bend allowance for realistic installation conditions.");
  }

  // Generate breakdown
  const breakdown = [
    `Base Distance: ${formatNumber(baseDistanceMeters, 2)} m (${formatNumber(metersToFeet(baseDistanceMeters), 2)} ft)`,
    `Slack (${inputs.slackPercent}%): ${formatNumber(slackLength, 2)} m (${formatNumber(metersToFeet(slackLength), 2)} ft)`,
    `Bend Allowance (${inputs.bends} × ${inputs.bendAllowance}m): ${formatNumber(bendAllowance, 2)} m (${formatNumber(metersToFeet(bendAllowance), 2)} ft)`,
    `Installation Factor (${inputs.installationType}): ${installationFactor}×`,
    `Subtotal: ${formatNumber(subtotal, 2)} m`,
    `Total with Factor: ${formatNumber(totalLength, 2)} m (${formatNumber(totalLengthFeet, 2)} ft)`,
  ];

  return {
    baseDistance: baseDistanceMeters,
    slackLength,
    bendAllowance,
    installationFactor,
    totalLength,
    totalLengthFeet,
    recommendations,
    breakdown,
  };
}

// Validation
export function validateInputs(inputs: CableLengthInputs): string | null {
  if (inputs.distance <= 0) return "Distance must be greater than zero";
  if (isNaN(inputs.distance)) return "Distance must be a valid number";
  if (inputs.slackPercent < 0) return "Slack percentage cannot be negative";
  if (inputs.slackPercent > 50) return "Slack percentage cannot exceed 50%";
  if (inputs.bends < 0) return "Number of bends cannot be negative";
  if (inputs.bendAllowance < 0) return "Bend allowance cannot be negative";
  if (inputs.distance > 1000) return "Distance exceeds practical limits (max 1000m)";
  return null;
}

// Presets
export function getPresets(): Preset[] {
  return [
    {
      name: "Home Electrical Run",
      description: "Typical residential wiring",
      distance: 15,
      distanceUnit: 'm',
      slackPercent: 10,
      bends: 2,
      cableType: 'electrical',
      installationType: 'wall',
    },
    {
      name: "Office Network Cable",
      description: "Ethernet cable to workstation",
      distance: 25,
      distanceUnit: 'm',
      slackPercent: 10,
      bends: 3,
      cableType: 'ethernet',
      installationType: 'conduit',
    },
    {
      name: "Data Center Fiber",
      description: "Fiber optic backbone",
      distance: 50,
      distanceUnit: 'm',
      slackPercent: 15,
      bends: 4,
      cableType: 'fiber',
      installationType: 'overhead',
    },
    {
      name: "Underground Cable",
      description: "Buried electrical cable",
      distance: 30,
      distanceUnit: 'm',
      slackPercent: 20,
      bends: 1,
      cableType: 'electrical',
      installationType: 'underground',
    },
    {
      name: "Outdoor Coaxial",
      description: "Antenna or satellite cable",
      distance: 20,
      distanceUnit: 'm',
      slackPercent: 12,
      bends: 2,
      cableType: 'coaxial',
      installationType: 'overhead',
    },
    {
      name: "Long Ethernet Run",
      description: "Maximum Ethernet distance",
      distance: 90,
      distanceUnit: 'm',
      slackPercent: 10,
      bends: 5,
      cableType: 'ethernet',
      installationType: 'conduit',
    },
  ];
}

// History management
export function saveToHistory(inputs: CableLengthInputs, result: CableLengthResult): void {
  if (typeof window === 'undefined') return;

  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };

  const history = getHistory();
  history.unshift(entry);

  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(inputs: CableLengthInputs, result: CableLengthResult): string {
  let text = "Cable Length Calculator - Calculation Report\n";
  text += "=".repeat(50) + "\n\n";
  text += `Date: ${new Date().toLocaleString()}\n\n`;

  text += "Input Parameters:\n";
  text += "-".repeat(50) + "\n";
  text += `Distance: ${inputs.distance} ${inputs.distanceUnit}\n`;
  text += `Cable Type: ${inputs.cableType.charAt(0).toUpperCase() + inputs.cableType.slice(1)}\n`;
  text += `Installation Type: ${inputs.installationType.charAt(0).toUpperCase() + inputs.installationType.slice(1)}\n`;
  text += `Slack Percentage: ${inputs.slackPercent}%\n`;
  text += `Number of Bends: ${inputs.bends}\n`;
  text += `Bend Allowance: ${inputs.bendAllowance} m per bend\n`;

  text += "\nResults:\n";
  text += "-".repeat(50) + "\n";
  text += `Total Cable Length: ${formatNumber(result.totalLength, 2)} m (${formatNumber(result.totalLengthFeet, 2)} ft)\n`;

  text += "\nBreakdown:\n";
  text += "-".repeat(50) + "\n";
  result.breakdown.forEach(line => {
    text += `${line}\n`;
  });

  if (result.recommendations.length > 0) {
    text += "\nRecommendations:\n";
    text += "-".repeat(50) + "\n";
    result.recommendations.forEach((rec, index) => {
      text += `${index + 1}. ${rec}\n`;
    });
  }

  text += "\n" + "=".repeat(50) + "\n";
  text += "Generated by Cable Length Calculator\n";

  return text;
}

export function exportToCSV(inputs: CableLengthInputs, result: CableLengthResult): string {
  const headers = "Distance,Unit,Cable Type,Installation Type,Slack %,Bends,Total Length (m),Total Length (ft)";
  const data = `${inputs.distance},${inputs.distanceUnit},${inputs.cableType},${inputs.installationType},${inputs.slackPercent},${inputs.bends},${formatNumber(result.totalLength, 2)},${formatNumber(result.totalLengthFeet, 2)}`;
  return `${headers}\n${data}`;
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

// Get cable type label
export function getCableTypeLabel(type: CableType): string {
  const labels: Record<CableType, string> = {
    electrical: 'Electrical',
    ethernet: 'Ethernet (Cat5e/6)',
    fiber: 'Fiber Optic',
    coaxial: 'Coaxial',
  };
  return labels[type] || type;
}

// Get installation type label
export function getInstallationTypeLabel(type: InstallationType): string {
  const labels: Record<InstallationType, string> = {
    straight: 'Straight Run',
    conduit: 'In Conduit',
    wall: 'Wall Routing',
    underground: 'Underground',
    overhead: 'Overhead',
  };
  return labels[type] || type;
}
