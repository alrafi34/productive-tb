import { DimensionUnit, MaterialType, RoomAcousticsCalculation, RoomMode, HistoryEntry } from "./types";

const HISTORY_KEY = "room-acoustics-calculator-history";
const MAX_HISTORY = 10;

// Material absorption coefficients (average across frequencies)
const ABSORPTION_COEFFICIENTS: Record<MaterialType, number> = {
  "concrete": 0.02,
  "wood": 0.10,
  "carpet": 0.40,
  "glass": 0.05,
  "acoustic-panel": 0.80,
  "curtains": 0.50,
  "plaster": 0.03,
  "brick": 0.03
};

export function getMaterialAbsorption(material: MaterialType): number {
  return ABSORPTION_COEFFICIENTS[material] || 0.02;
}

export function convertToMeters(value: number, unit: DimensionUnit): number {
  return unit === "ft" ? value * 0.3048 : value;
}

export function convertFromMeters(value: number, unit: DimensionUnit): number {
  return unit === "ft" ? value / 0.3048 : value;
}

export function calculateVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

export function calculateSurfaceArea(length: number, width: number, height: number): number {
  return 2 * (length * width + length * height + width * height);
}

export function calculateTotalAbsorption(
  length: number,
  width: number,
  height: number,
  wallMaterial: MaterialType,
  floorMaterial: MaterialType,
  ceilingMaterial: MaterialType
): number {
  const wallArea = 2 * (length * height + width * height);
  const floorArea = length * width;
  const ceilingArea = length * width;
  
  const wallAbsorption = wallArea * getMaterialAbsorption(wallMaterial);
  const floorAbsorption = floorArea * getMaterialAbsorption(floorMaterial);
  const ceilingAbsorption = ceilingArea * getMaterialAbsorption(ceilingMaterial);
  
  return wallAbsorption + floorAbsorption + ceilingAbsorption;
}

export function calculateRT60(volume: number, totalAbsorption: number): number {
  if (totalAbsorption === 0) return 0;
  // Sabine formula: RT60 = 0.161 × V / A
  return (0.161 * volume) / totalAbsorption;
}

export function getSpeedOfSound(temperature: number, humidity: number): number {
  // Simplified formula for speed of sound in air
  // c ≈ 331.3 + 0.606 × T (where T is in Celsius)
  // Humidity has minor effect, adding ~0.1% per 10% RH
  const baseSpeed = 331.3 + (0.606 * temperature);
  const humidityAdjustment = (humidity / 100) * 0.01 * baseSpeed;
  return baseSpeed + humidityAdjustment;
}

export function calculateRoomModes(
  length: number,
  width: number,
  height: number,
  speedOfSound: number
): RoomMode[] {
  const modes: RoomMode[] = [];
  
  // Calculate first 6 room modes (axial modes)
  // Axial modes: f = (c / 2) × (n / L)
  
  // Length modes
  for (let n = 1; n <= 2; n++) {
    modes.push({
      mode: `${n},0,0`,
      frequency: Math.round((speedOfSound / 2) * (n / length)),
      type: "Axial (Length)"
    });
  }
  
  // Width modes
  for (let n = 1; n <= 2; n++) {
    modes.push({
      mode: `0,${n},0`,
      frequency: Math.round((speedOfSound / 2) * (n / width)),
      type: "Axial (Width)"
    });
  }
  
  // Height modes
  for (let n = 1; n <= 2; n++) {
    modes.push({
      mode: `0,0,${n}`,
      frequency: Math.round((speedOfSound / 2) * (n / height)),
      type: "Axial (Height)"
    });
  }
  
  // Sort by frequency
  modes.sort((a, b) => a.frequency - b.frequency);
  
  return modes;
}

export function getAcousticQuality(rt60: number): { rating: string; quality: string; description: string; color: string } {
  if (rt60 < 0.3) {
    return {
      rating: "Too Dead",
      quality: "Poor",
      description: "Room is over-damped, may sound lifeless",
      color: "red"
    };
  } else if (rt60 >= 0.3 && rt60 < 0.5) {
    return {
      rating: "Excellent",
      quality: "Excellent for Recording",
      description: "Ideal for recording studios and critical listening",
      color: "green"
    };
  } else if (rt60 >= 0.5 && rt60 < 0.8) {
    return {
      rating: "Very Good",
      quality: "Good for Speech",
      description: "Suitable for speech, podcasts, and general use",
      color: "blue"
    };
  } else if (rt60 >= 0.8 && rt60 < 1.2) {
    return {
      rating: "Fair",
      quality: "Acceptable",
      description: "May need some acoustic treatment",
      color: "yellow"
    };
  } else if (rt60 >= 1.2 && rt60 < 2.0) {
    return {
      rating: "Poor",
      quality: "Too Reverberant",
      description: "Significant acoustic treatment recommended",
      color: "orange"
    };
  } else {
    return {
      rating: "Very Poor",
      quality: "Highly Reverberant",
      description: "Extensive acoustic treatment required",
      color: "red"
    };
  }
}

export function getRecommendations(rt60: number, totalAbsorption: number): string[] {
  const recommendations: string[] = [];
  
  if (rt60 < 0.3) {
    recommendations.push("Consider removing some absorption to add life to the room");
    recommendations.push("Replace some acoustic panels with reflective surfaces");
    recommendations.push("Add diffusion elements to balance the acoustics");
  } else if (rt60 >= 1.2) {
    recommendations.push("Add acoustic panels to walls and ceiling");
    recommendations.push("Install carpet or rugs on hard floors");
    recommendations.push("Use heavy curtains on windows");
    recommendations.push("Consider bass traps in corners for low-frequency control");
  } else if (rt60 >= 0.8) {
    recommendations.push("Add moderate acoustic treatment to reduce reverberation");
    recommendations.push("Focus on first reflection points");
    recommendations.push("Consider adding soft furnishings");
  } else {
    recommendations.push("Room acoustics are well-balanced");
    recommendations.push("Fine-tune with targeted absorption if needed");
    recommendations.push("Consider bass traps for low-frequency management");
  }
  
  return recommendations;
}

export function performRoomAcousticsCalculation(
  length: number,
  width: number,
  height: number,
  dimensionUnit: DimensionUnit,
  wallMaterial: MaterialType,
  floorMaterial: MaterialType,
  ceilingMaterial: MaterialType,
  temperature: number,
  humidity: number
): RoomAcousticsCalculation {
  // Convert to meters for calculations
  const lengthM = convertToMeters(length, dimensionUnit);
  const widthM = convertToMeters(width, dimensionUnit);
  const heightM = convertToMeters(height, dimensionUnit);
  
  const volume = calculateVolume(lengthM, widthM, heightM);
  const surfaceArea = calculateSurfaceArea(lengthM, widthM, heightM);
  const totalAbsorption = calculateTotalAbsorption(lengthM, widthM, heightM, wallMaterial, floorMaterial, ceilingMaterial);
  const rt60 = calculateRT60(volume, totalAbsorption);
  const speedOfSound = getSpeedOfSound(temperature, humidity);
  const roomModes = calculateRoomModes(lengthM, widthM, heightM, speedOfSound);
  const acousticAssessment = getAcousticQuality(rt60);
  
  return {
    length,
    width,
    height,
    dimensionUnit,
    wallMaterial,
    floorMaterial,
    ceilingMaterial,
    temperature,
    humidity,
    volume,
    surfaceArea,
    totalAbsorption,
    rt60,
    acousticQuality: acousticAssessment.quality,
    acousticRating: acousticAssessment.rating,
    roomModes,
    timestamp: Date.now()
  };
}

export function validateInputs(
  length: number,
  width: number,
  height: number,
  temperature: number,
  humidity: number
): string | null {
  if (isNaN(length) || length <= 0) return "Length must be greater than 0";
  if (isNaN(width) || width <= 0) return "Width must be greater than 0";
  if (isNaN(height) || height <= 0) return "Height must be greater than 0";
  if (isNaN(temperature)) return "Temperature must be a valid number";
  if (isNaN(humidity) || humidity < 0 || humidity > 100) return "Humidity must be between 0 and 100";
  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getDimensionUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "feet" : "meters";
}

export function getVolumeUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "ft³" : "m³";
}

export function getAreaUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "ft²" : "m²";
}

export function getRoomPresets() {
  return [
    {
      name: "Small Studio",
      description: "Home recording setup",
      length: 4,
      width: 3.5,
      height: 2.8,
      wallMaterial: "acoustic-panel" as MaterialType,
      floorMaterial: "carpet" as MaterialType,
      ceilingMaterial: "acoustic-panel" as MaterialType
    },
    {
      name: "Medium Studio",
      description: "Professional recording room",
      length: 6,
      width: 5,
      height: 3,
      wallMaterial: "acoustic-panel" as MaterialType,
      floorMaterial: "wood" as MaterialType,
      ceilingMaterial: "acoustic-panel" as MaterialType
    },
    {
      name: "Living Room",
      description: "Typical residential space",
      length: 5,
      width: 4,
      height: 2.7,
      wallMaterial: "plaster" as MaterialType,
      floorMaterial: "carpet" as MaterialType,
      ceilingMaterial: "plaster" as MaterialType
    },
    {
      name: "Office",
      description: "Meeting or workspace",
      length: 4,
      width: 4,
      height: 2.8,
      wallMaterial: "plaster" as MaterialType,
      floorMaterial: "carpet" as MaterialType,
      ceilingMaterial: "plaster" as MaterialType
    },
    {
      name: "Podcast Room",
      description: "Voice recording space",
      length: 3,
      width: 3,
      height: 2.5,
      wallMaterial: "acoustic-panel" as MaterialType,
      floorMaterial: "carpet" as MaterialType,
      ceilingMaterial: "acoustic-panel" as MaterialType
    },
    {
      name: "Concert Hall",
      description: "Large performance space",
      length: 20,
      width: 15,
      height: 8,
      wallMaterial: "wood" as MaterialType,
      floorMaterial: "wood" as MaterialType,
      ceilingMaterial: "plaster" as MaterialType
    }
  ];
}

export function getMaterialPresets() {
  return [
    { name: "Concrete", value: "concrete" as MaterialType, absorption: 0.02 },
    { name: "Wood", value: "wood" as MaterialType, absorption: 0.10 },
    { name: "Carpet", value: "carpet" as MaterialType, absorption: 0.40 },
    { name: "Glass", value: "glass" as MaterialType, absorption: 0.05 },
    { name: "Acoustic Panel", value: "acoustic-panel" as MaterialType, absorption: 0.80 },
    { name: "Curtains", value: "curtains" as MaterialType, absorption: 0.50 },
    { name: "Plaster", value: "plaster" as MaterialType, absorption: 0.03 },
    { name: "Brick", value: "brick" as MaterialType, absorption: 0.03 }
  ];
}

// History management
export function saveToHistory(calculation: RoomAcousticsCalculation): void {
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
export function exportToText(calculation: RoomAcousticsCalculation): string {
  const assessment = getAcousticQuality(calculation.rt60);
  const recommendations = getRecommendations(calculation.rt60, calculation.totalAbsorption);
  
  return `ROOM ACOUSTICS CALCULATION REPORT
Generated: ${new Date(calculation.timestamp).toLocaleString()}

ROOM DIMENSIONS
Length: ${calculation.length} ${calculation.dimensionUnit}
Width: ${calculation.width} ${calculation.dimensionUnit}
Height: ${calculation.height} ${calculation.dimensionUnit}
Volume: ${formatNumber(calculation.volume)} m³
Surface Area: ${formatNumber(calculation.surfaceArea)} m²

MATERIALS
Walls: ${calculation.wallMaterial}
Floor: ${calculation.floorMaterial}
Ceiling: ${calculation.ceilingMaterial}

ENVIRONMENTAL CONDITIONS
Temperature: ${calculation.temperature}°C
Humidity: ${calculation.humidity}%

ACOUSTIC ANALYSIS
Total Absorption: ${formatNumber(calculation.totalAbsorption)} sabins
RT60 (Reverberation Time): ${formatNumber(calculation.rt60)} seconds
Acoustic Rating: ${assessment.rating}
Quality: ${assessment.quality}
Assessment: ${assessment.description}

ROOM MODES (First 6 frequencies)
${calculation.roomModes.map(mode => `${mode.mode} - ${mode.frequency} Hz (${mode.type})`).join('\n')}

RECOMMENDATIONS
${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
`;
}

export function exportToJSON(calculation: RoomAcousticsCalculation): string {
  return JSON.stringify(calculation, null, 2);
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
