import { LightingInputs, LightingResult, RoomType, RoomTypeConfig, Unit } from "./types";

// Standard lux levels for different room types
export const ROOM_TYPES: Record<RoomType, RoomTypeConfig> = {
  living_room: { name: 'Living Room', lux: 150, description: 'Comfortable ambient lighting' },
  bedroom: { name: 'Bedroom', lux: 100, description: 'Soft, relaxing lighting' },
  kitchen: { name: 'Kitchen', lux: 300, description: 'Bright task lighting' },
  office: { name: 'Office/Study', lux: 400, description: 'Bright work lighting' },
  bathroom: { name: 'Bathroom', lux: 200, description: 'Clear task lighting' },
  dining: { name: 'Dining Room', lux: 150, description: 'Ambient dining lighting' },
  hallway: { name: 'Hallway/Corridor', lux: 100, description: 'Basic navigation lighting' },
  garage: { name: 'Garage/Workshop', lux: 300, description: 'Bright work area lighting' },
  custom: { name: 'Custom', lux: 0, description: 'Enter custom lux value' }
};

const FEET_TO_METERS = 0.3048;

export function calculateLighting(inputs: LightingInputs): LightingResult {
  const { width, length, unit, roomType, customLux, lumensPerLight, ceilingHeight } = inputs;
  
  const steps: string[] = [];
  
  // Calculate area
  const area = width * length;
  const areaInMeters = unit === 'feet' 
    ? area * FEET_TO_METERS * FEET_TO_METERS 
    : area;
  
  steps.push('Room Lighting Calculation');
  steps.push('');
  steps.push('Step 1: Calculate Room Area');
  steps.push(`Width: ${width} ${unit}`);
  steps.push(`Length: ${length} ${unit}`);
  steps.push(`Area: ${width} × ${length} = ${area.toFixed(2)} ${unit}²`);
  
  if (unit === 'feet') {
    steps.push(`Area in meters: ${areaInMeters.toFixed(2)} m²`);
  }
  steps.push('');
  
  // Determine lux level
  const luxLevel = roomType === 'custom' ? (customLux || 0) : ROOM_TYPES[roomType].lux;
  
  steps.push('Step 2: Determine Required Lux Level');
  steps.push(`Room Type: ${ROOM_TYPES[roomType].name}`);
  steps.push(`Standard Lux Level: ${luxLevel} lux`);
  steps.push('');
  
  // Calculate total lumens required
  const totalLumensRequired = areaInMeters * luxLevel;
  
  steps.push('Step 3: Calculate Total Lumens Required');
  steps.push(`Formula: Total Lumens = Area (m²) × Lux Level`);
  steps.push(`Total Lumens = ${areaInMeters.toFixed(2)} × ${luxLevel}`);
  steps.push(`Total Lumens = ${totalLumensRequired.toFixed(2)} lm`);
  steps.push('');
  
  // Calculate number of lights needed
  const lightsNeeded = Math.ceil(totalLumensRequired / lumensPerLight);
  
  steps.push('Step 4: Calculate Number of Lights');
  steps.push(`Formula: Lights = Total Lumens / Lumens per Light`);
  steps.push(`Lights = ${totalLumensRequired.toFixed(2)} / ${lumensPerLight}`);
  steps.push(`Lights = ${(totalLumensRequired / lumensPerLight).toFixed(2)}`);
  steps.push(`Rounded up: ${lightsNeeded} lights`);
  steps.push('');
  
  // Calculate actual lumens and lux achieved
  const actualLumens = lightsNeeded * lumensPerLight;
  const luxAchieved = actualLumens / areaInMeters;
  
  steps.push('Step 5: Verify Lighting Level');
  steps.push(`Actual Lumens: ${lightsNeeded} × ${lumensPerLight} = ${actualLumens} lm`);
  steps.push(`Lux Achieved: ${actualLumens} / ${areaInMeters.toFixed(2)} = ${luxAchieved.toFixed(2)} lux`);
  
  // Determine status
  let status: 'under' | 'optimal' | 'over';
  let statusMessage: string;
  
  const luxDifference = ((luxAchieved - luxLevel) / luxLevel) * 100;
  
  if (luxDifference < -10) {
    status = 'under';
    statusMessage = 'Under-lit - Consider adding more lights';
  } else if (luxDifference > 30) {
    status = 'over';
    statusMessage = 'Over-lit - May be too bright or wasteful';
  } else {
    status = 'optimal';
    statusMessage = 'Optimal lighting level achieved';
  }
  
  return {
    area,
    areaInMeters,
    luxLevel,
    totalLumensRequired,
    lightsNeeded,
    actualLumens,
    luxAchieved,
    status,
    statusMessage,
    steps
  };
}

export function validateInputs(inputs: LightingInputs): string | null {
  const { width, length, roomType, customLux, lumensPerLight } = inputs;
  
  if (!width || width <= 0) {
    return "Width must be greater than 0";
  }
  
  if (!length || length <= 0) {
    return "Length must be greater than 0";
  }
  
  if (roomType === 'custom' && (!customLux || customLux <= 0)) {
    return "Please enter a custom lux value";
  }
  
  if (!lumensPerLight || lumensPerLight <= 0) {
    return "Lumens per light must be greater than 0";
  }
  
  if (isNaN(width) || isNaN(length) || isNaN(lumensPerLight)) {
    return "Please enter valid numbers";
  }
  
  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getCommonBulbTypes() {
  return [
    { name: 'LED 60W Equivalent', lumens: 800, wattage: 9 },
    { name: 'LED 75W Equivalent', lumens: 1100, wattage: 12 },
    { name: 'LED 100W Equivalent', lumens: 1600, wattage: 16 },
    { name: 'CFL 60W Equivalent', lumens: 800, wattage: 13 },
    { name: 'CFL 75W Equivalent', lumens: 1100, wattage: 18 },
    { name: 'Halogen 60W', lumens: 900, wattage: 43 },
    { name: 'Incandescent 60W', lumens: 800, wattage: 60 },
    { name: 'Incandescent 100W', lumens: 1600, wattage: 100 }
  ];
}

export function getPresetRooms() {
  return [
    {
      name: 'Small Bedroom',
      description: '10ft × 10ft',
      width: 10,
      length: 10,
      unit: 'feet' as Unit,
      roomType: 'bedroom' as RoomType,
      lumensPerLight: 800
    },
    {
      name: 'Living Room',
      description: '15ft × 20ft',
      width: 15,
      length: 20,
      unit: 'feet' as Unit,
      roomType: 'living_room' as RoomType,
      lumensPerLight: 1100
    },
    {
      name: 'Kitchen',
      description: '12ft × 12ft',
      width: 12,
      length: 12,
      unit: 'feet' as Unit,
      roomType: 'kitchen' as RoomType,
      lumensPerLight: 1100
    },
    {
      name: 'Home Office',
      description: '10ft × 12ft',
      width: 10,
      length: 12,
      unit: 'feet' as Unit,
      roomType: 'office' as RoomType,
      lumensPerLight: 1100
    },
    {
      name: 'Bathroom',
      description: '8ft × 8ft',
      width: 8,
      length: 8,
      unit: 'feet' as Unit,
      roomType: 'bathroom' as RoomType,
      lumensPerLight: 800
    },
    {
      name: 'Garage',
      description: '20ft × 20ft',
      width: 20,
      length: 20,
      unit: 'feet' as Unit,
      roomType: 'garage' as RoomType,
      lumensPerLight: 1600
    }
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
  inputs: LightingInputs;
  result: LightingResult;
}

const HISTORY_KEY = 'room-lighting-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: LightingInputs, result: LightingResult): void {
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

export function exportToText(inputs: LightingInputs, result: LightingResult): string {
  const lines: string[] = [];
  
  lines.push('ROOM LIGHTING CALCULATOR - CALCULATION REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('ROOM DETAILS:');
  lines.push('-'.repeat(50));
  lines.push(`Dimensions: ${inputs.width} × ${inputs.length} ${inputs.unit}`);
  lines.push(`Area: ${formatNumber(result.area, 2)} ${inputs.unit}² (${formatNumber(result.areaInMeters, 2)} m²)`);
  lines.push(`Room Type: ${ROOM_TYPES[inputs.roomType].name}`);
  lines.push(`Required Lux Level: ${result.luxLevel} lux`);
  lines.push('');
  lines.push('LIGHTING SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  lines.push(`Lumens per Light: ${inputs.lumensPerLight} lm`);
  lines.push(`Total Lumens Required: ${formatNumber(result.totalLumensRequired, 2)} lm`);
  lines.push('');
  lines.push('CALCULATION RESULTS:');
  lines.push('-'.repeat(50));
  lines.push(`Number of Lights Needed: ${result.lightsNeeded}`);
  lines.push(`Actual Total Lumens: ${result.actualLumens} lm`);
  lines.push(`Lux Achieved: ${formatNumber(result.luxAchieved, 2)} lux`);
  lines.push(`Status: ${result.statusMessage}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Room Lighting Calculator');
  
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
const SETTINGS_KEY = 'room-lighting-calculator-settings';

export function saveSettings(settings: Partial<LightingInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<LightingInputs> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}
