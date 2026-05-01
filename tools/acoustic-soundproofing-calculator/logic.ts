import { 
  WallType, 
  InsulationMaterial, 
  AcousticCalculation, 
  HistoryEntry, 
  RoomPreset, 
  NoiseSourcePreset, 
  DesiredLevelPreset 
} from "./types";

// Wall transmission loss values (approximate dB reduction)
const WALL_TRANSMISSION_LOSS: Record<WallType, number> = {
  basic: 20,
  drywall: 30,
  concrete: 50,
  glass: 15
};

// Insulation material bonus (additional dB reduction)
const INSULATION_BONUS: Record<InsulationMaterial, number> = {
  none: 0,
  foam: 5,
  mineralwool: 10,
  fiberglass: 8,
  mlv: 12
};

export function getWallTransmissionLoss(wallType: WallType): number {
  return WALL_TRANSMISSION_LOSS[wallType] || 20;
}

export function getInsulationBonus(material: InsulationMaterial): number {
  return INSULATION_BONUS[material] || 0;
}

export function calculateRoomVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

export function calculateRoomSurfaceArea(length: number, width: number, height: number): number {
  // Total surface area (walls + ceiling + floor)
  return 2 * (length * width + length * height + width * height);
}

export function performAcousticCalculation(
  length: number,
  width: number,
  height: number,
  noiseSourceLevel: number,
  desiredNoiseLevel: number,
  wallType: WallType,
  insulationMaterial: InsulationMaterial
): AcousticCalculation {
  // Calculate room properties
  const roomVolume = calculateRoomVolume(length, width, height);
  const roomSurfaceArea = calculateRoomSurfaceArea(length, width, height);
  
  // Calculate required reduction
  const requiredReduction = Math.max(0, noiseSourceLevel - desiredNoiseLevel);
  
  // Get base wall performance
  const baseWallTransmissionLoss = getWallTransmissionLoss(wallType);
  
  // Get insulation bonus
  const materialBonus = getInsulationBonus(insulationMaterial);
  
  // Calculate total reduction achieved
  const totalReduction = baseWallTransmissionLoss + materialBonus;
  
  // Calculate additional reduction needed
  const additionalReductionNeeded = Math.max(0, requiredReduction - totalReduction);
  
  // Calculate achieved noise level
  const achievedNoiseLevel = noiseSourceLevel - totalReduction;
  
  // Determine difficulty level
  const { level: difficultyLevel, color: difficultyColor } = getDifficultyLevel(additionalReductionNeeded);
  
  // Generate recommendation
  const recommendation = generateRecommendation(
    additionalReductionNeeded,
    wallType,
    insulationMaterial,
    requiredReduction
  );
  
  return {
    length,
    width,
    height,
    noiseSourceLevel,
    desiredNoiseLevel,
    wallType,
    insulationMaterial,
    roomVolume,
    roomSurfaceArea,
    requiredReduction,
    baseWallTransmissionLoss,
    additionalReductionNeeded,
    materialBonus,
    totalReduction,
    achievedNoiseLevel,
    difficultyLevel,
    difficultyColor,
    recommendation,
    timestamp: Date.now()
  };
}

export function getDifficultyLevel(additionalNeeded: number): { level: string; color: string; description: string } {
  if (additionalNeeded === 0) return { level: "Achieved", color: "green", description: "Target noise level achieved" };
  if (additionalNeeded <= 5) return { level: "Easy", color: "blue", description: "Minor improvements needed" };
  if (additionalNeeded <= 10) return { level: "Moderate", color: "yellow", description: "Standard soundproofing required" };
  if (additionalNeeded <= 20) return { level: "Challenging", color: "orange", description: "Significant soundproofing needed" };
  return { level: "Very Difficult", color: "red", description: "Professional acoustic treatment required" };
}

export function generateRecommendation(
  additionalNeeded: number,
  wallType: WallType,
  currentInsulation: InsulationMaterial,
  totalRequired: number
): string {
  const recommendations: string[] = [];
  
  if (additionalNeeded === 0) {
    return "Current setup meets your soundproofing requirements. Ensure proper sealing of gaps and doors.";
  }
  
  // Wall upgrade recommendations
  if (wallType === "basic" || wallType === "glass") {
    recommendations.push("Upgrade to double-layer drywall or concrete walls");
  }
  
  // Insulation recommendations
  if (currentInsulation === "none") {
    if (additionalNeeded <= 10) {
      recommendations.push("Add foam panels or fiberglass insulation");
    } else {
      recommendations.push("Install mineral wool or mass-loaded vinyl (MLV) insulation");
    }
  } else if (currentInsulation === "foam" && additionalNeeded > 5) {
    recommendations.push("Upgrade to mineral wool or MLV for better performance");
  }
  
  // Additional treatments based on difficulty
  if (additionalNeeded > 10) {
    recommendations.push("Install acoustic panels on walls and ceiling");
    recommendations.push("Add door sweeps and seal all gaps");
  }
  
  if (additionalNeeded > 20) {
    recommendations.push("Consider room-within-room construction");
    recommendations.push("Install resilient channels or sound isolation clips");
    recommendations.push("Use acoustic caulk for all seams");
  }
  
  if (additionalNeeded > 30) {
    recommendations.push("Consult with professional acoustic engineer");
    recommendations.push("Consider floating floor system");
    recommendations.push("Install specialized acoustic doors and windows");
  }
  
  // General recommendations
  if (totalRequired > 25) {
    recommendations.push("Seal all electrical outlets and switches");
    recommendations.push("Add mass to walls (multiple drywall layers)");
  }
  
  return recommendations.length > 0 
    ? recommendations.join(". ") + "."
    : "Improve sealing and add basic acoustic treatment.";
}

export function validateInputs(
  length: number,
  width: number,
  height: number,
  noiseSourceLevel: number,
  desiredNoiseLevel: number
): string | null {
  if (isNaN(length) || length <= 0) return "Length must be greater than 0";
  if (isNaN(width) || width <= 0) return "Width must be greater than 0";
  if (isNaN(height) || height <= 0) return "Height must be greater than 0";
  if (isNaN(noiseSourceLevel)) return "Noise source level is required";
  if (isNaN(desiredNoiseLevel)) return "Desired noise level is required";
  if (desiredNoiseLevel > noiseSourceLevel) return "Desired noise level should be lower than source level";
  if (length > 100 || width > 100 || height > 50) return "Room dimensions seem unrealistic";
  if (noiseSourceLevel < 0 || noiseSourceLevel > 140) return "Noise source level should be between 0-140 dB";
  if (desiredNoiseLevel < 0 || desiredNoiseLevel > 140) return "Desired noise level should be between 0-140 dB";
  
  return null;
}

export function formatNumber(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// Room presets
export function getRoomPresets(): RoomPreset[] {
  return [
    {
      name: "Recording Studio",
      description: "Professional music recording space",
      length: 5,
      width: 4,
      height: 3,
      noiseSourceLevel: 90,
      desiredNoiseLevel: 40
    },
    {
      name: "Home Bedroom",
      description: "Quiet sleeping environment",
      length: 4,
      width: 4,
      height: 2.7,
      noiseSourceLevel: 70,
      desiredNoiseLevel: 35
    },
    {
      name: "Office Meeting Room",
      description: "Private conference space",
      length: 6,
      width: 4,
      height: 3,
      noiseSourceLevel: 60,
      desiredNoiseLevel: 35
    },
    {
      name: "Home Theater",
      description: "Movie and entertainment room",
      length: 6,
      width: 5,
      height: 3,
      noiseSourceLevel: 85,
      desiredNoiseLevel: 45
    },
    {
      name: "Podcast Room",
      description: "Voice recording and streaming",
      length: 3,
      width: 3,
      height: 2.7,
      noiseSourceLevel: 70,
      desiredNoiseLevel: 30
    },
    {
      name: "Practice Room",
      description: "Musical instrument practice",
      length: 4,
      width: 3,
      height: 2.7,
      noiseSourceLevel: 95,
      desiredNoiseLevel: 50
    }
  ];
}

// Noise source presets
export function getNoiseSourcePresets(): NoiseSourcePreset[] {
  return [
    { name: "Quiet Room", level: 30, description: "Library, quiet office" },
    { name: "Normal Conversation", level: 50, description: "Typical speech level" },
    { name: "Loud Conversation", level: 60, description: "Raised voices, group discussion" },
    { name: "Traffic Noise", level: 70, description: "Busy street, highway" },
    { name: "Vacuum Cleaner", level: 75, description: "Household appliances" },
    { name: "Loud Music", level: 90, description: "Home stereo, instruments" },
    { name: "Power Tools", level: 100, description: "Drills, saws, machinery" },
    { name: "Industrial Noise", level: 110, description: "Heavy machinery, construction" }
  ];
}

// Desired level presets
export function getDesiredLevelPresets(): DesiredLevelPreset[] {
  return [
    { name: "Silent", level: 25, description: "Recording studio, sleep" },
    { name: "Very Quiet", level: 30, description: "Bedroom, library" },
    { name: "Quiet", level: 40, description: "Office, study room" },
    { name: "Moderate", level: 50, description: "Living room, casual space" },
    { name: "Acceptable", level: 60, description: "Minimal soundproofing" }
  ];
}

// History management
const HISTORY_KEY = "acoustic-soundproofing-calculator-history";
const MAX_HISTORY_ITEMS = 10;

export function saveToHistory(calculation: AcousticCalculation): void {
  try {
    const history = getHistory();
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      calculation,
      timestamp: Date.now()
    };
    
    history.unshift(newEntry);
    
    // Keep only the latest items
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn("Failed to clear history:", error);
  }
}

// Export functionality
export function exportToText(calculation: AcousticCalculation): string {
  const difficulty = getDifficultyLevel(calculation.additionalReductionNeeded);
  
  return `ACOUSTIC SOUNDPROOFING CALCULATION REPORT
Generated: ${new Date().toLocaleString()}

ROOM SPECIFICATIONS:
- Dimensions: ${formatNumber(calculation.length)} × ${formatNumber(calculation.width)} × ${formatNumber(calculation.height)} meters
- Volume: ${formatNumber(calculation.roomVolume)} m³
- Surface Area: ${formatNumber(calculation.roomSurfaceArea)} m²

NOISE LEVELS:
- Source Noise Level: ${calculation.noiseSourceLevel} dB
- Desired Noise Level: ${calculation.desiredNoiseLevel} dB
- Required Reduction: ${calculation.requiredReduction} dB

CURRENT SETUP:
- Wall Type: ${calculation.wallType.charAt(0).toUpperCase() + calculation.wallType.slice(1)}
- Base Wall Performance: ${calculation.baseWallTransmissionLoss} dB
- Insulation Material: ${calculation.insulationMaterial === "none" ? "None" : calculation.insulationMaterial.charAt(0).toUpperCase() + calculation.insulationMaterial.slice(1)}
- Insulation Bonus: ${calculation.materialBonus} dB

RESULTS:
- Total Reduction Achieved: ${calculation.totalReduction} dB
- Achieved Noise Level: ${calculation.achievedNoiseLevel} dB
- Additional Reduction Needed: ${calculation.additionalReductionNeeded} dB
- Difficulty Level: ${difficulty.level}
- Assessment: ${difficulty.description}

RECOMMENDATIONS:
${calculation.recommendation}

Note: This is an estimate based on simplified acoustic principles. Consult with acoustic professionals for detailed soundproofing design.`;
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