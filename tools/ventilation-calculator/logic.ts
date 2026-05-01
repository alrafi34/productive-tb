import { VentilationCalculation, HistoryEntry, RoomPreset, DimensionUnit, AirflowUnit } from "./types";

const HISTORY_KEY = "ventilation-calculator-history";
const MAX_HISTORY = 10;

// Unit conversion constants
const CFM_TO_M3H = 1.699;
const LS_TO_CFM = 2.118;

// Convert dimension to feet
export function convertToFeet(value: number, unit: DimensionUnit): number {
  return unit === "m" ? value * 3.28084 : value;
}

// Convert dimension to meters
export function convertToMeters(value: number, unit: DimensionUnit): number {
  return unit === "ft" ? value * 0.3048 : value;
}

// Calculate room volume in cubic feet
export function calculateRoomVolume(length: number, width: number, height: number, unit: DimensionUnit): number {
  const l = convertToFeet(length, unit);
  const w = convertToFeet(width, unit);
  const h = convertToFeet(height, unit);
  return l * w * h;
}

// Calculate airflow based on ACH (Air Changes per Hour)
export function calculateACHAirflow(volume: number, ach: number): number {
  // CFM = (Volume in ft³ × ACH) / 60
  return (volume * ach) / 60;
}

// Calculate airflow based on occupancy
export function calculateOccupancyAirflow(people: number, airflowPerPerson: number): number {
  return people * airflowPerPerson;
}

// Convert CFM to m³/h
export function convertCFMtoM3H(cfm: number): number {
  return cfm * CFM_TO_M3H;
}

// Convert CFM to L/s
export function convertCFMtoLs(cfm: number): number {
  return cfm / LS_TO_CFM;
}

// Convert m³/h to CFM
export function convertM3HtoCFM(m3h: number): number {
  return m3h / CFM_TO_M3H;
}

// Convert L/s to CFM
export function convertLstoCFM(ls: number): number {
  return ls * LS_TO_CFM;
}

// Main calculation function
export function calculateVentilation(
  mode: "room-volume" | "occupancy",
  length?: number,
  width?: number,
  height?: number,
  dimensionUnit?: DimensionUnit,
  ach?: number,
  numberOfPeople?: number,
  airflowPerPerson?: number,
  outputUnit: AirflowUnit = "CFM"
): VentilationCalculation {
  let airflowCFM = 0;
  let roomVolume: number | undefined;

  if (mode === "room-volume" && length && width && height && dimensionUnit && ach) {
    roomVolume = calculateRoomVolume(length, width, height, dimensionUnit);
    airflowCFM = calculateACHAirflow(roomVolume, ach);
  } else if (mode === "occupancy" && numberOfPeople && airflowPerPerson) {
    airflowCFM = calculateOccupancyAirflow(numberOfPeople, airflowPerPerson);
  }

  const airflowM3H = convertCFMtoM3H(airflowCFM);
  const airflowLs = convertCFMtoLs(airflowCFM);

  return {
    mode,
    length,
    width,
    height,
    dimensionUnit,
    ach,
    roomVolume,
    numberOfPeople,
    airflowPerPerson,
    airflowCFM,
    airflowM3H,
    airflowLs,
    outputUnit,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getAirflowUnitLabel(unit: AirflowUnit): string {
  switch (unit) {
    case "CFM": return "CFM";
    case "m3h": return "m³/h";
    case "Ls": return "L/s";
    default: return unit;
  }
}

export function getDimensionUnitLabel(unit: DimensionUnit): string {
  return unit === "ft" ? "feet" : "meters";
}

// Room presets with recommended ACH values
export function getRoomPresets(): RoomPreset[] {
  return [
    {
      name: "Storage Room",
      description: "Low ventilation needs",
      ach: 2,
      length: 10,
      width: 10,
      height: 8
    },
    {
      name: "Residential Room",
      description: "Living room, bedroom",
      ach: 4,
      length: 12,
      width: 12,
      height: 8
    },
    {
      name: "Office Space",
      description: "Standard office",
      ach: 6,
      length: 15,
      width: 12,
      height: 9
    },
    {
      name: "Kitchen",
      description: "Residential kitchen",
      ach: 8,
      length: 12,
      width: 10,
      height: 8
    },
    {
      name: "Bathroom",
      description: "Residential bathroom",
      ach: 8,
      length: 8,
      width: 6,
      height: 8
    },
    {
      name: "Workshop",
      description: "Light industrial",
      ach: 10,
      length: 20,
      width: 15,
      height: 10
    },
    {
      name: "Commercial Kitchen",
      description: "Restaurant kitchen",
      ach: 15,
      length: 20,
      width: 15,
      height: 10
    },
    {
      name: "Laboratory",
      description: "Research lab",
      ach: 12,
      length: 15,
      width: 12,
      height: 10
    }
  ];
}

// History management
export function saveToHistory(calculation: VentilationCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    calculation,
    timestamp: Date.now()
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  if (typeof window !== "undefined") {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(HISTORY_KEY);
  }
}

// Export functions
export function exportToText(calculation: VentilationCalculation): string {
  let text = `Ventilation Calculation Results\n`;
  text += `================================\n\n`;
  
  if (calculation.mode === "room-volume") {
    text += `Calculation Mode: Room Volume (ACH-based)\n\n`;
    text += `Room Dimensions:\n`;
    text += `  Length: ${formatNumber(calculation.length!)} ${calculation.dimensionUnit}\n`;
    text += `  Width: ${formatNumber(calculation.width!)} ${calculation.dimensionUnit}\n`;
    text += `  Height: ${formatNumber(calculation.height!)} ${calculation.dimensionUnit}\n`;
    text += `  Volume: ${formatNumber(calculation.roomVolume!)} ft³\n\n`;
    text += `Air Changes per Hour (ACH): ${calculation.ach}\n\n`;
  } else {
    text += `Calculation Mode: Occupancy-based\n\n`;
    text += `Number of People: ${calculation.numberOfPeople}\n`;
    text += `Airflow per Person: ${formatNumber(calculation.airflowPerPerson!)} L/s\n\n`;
  }
  
  text += `Required Airflow:\n`;
  text += `  ${formatNumber(calculation.airflowCFM)} CFM\n`;
  text += `  ${formatNumber(calculation.airflowM3H)} m³/h\n`;
  text += `  ${formatNumber(calculation.airflowLs)} L/s\n\n`;
  text += `Generated: ${new Date().toLocaleString()}\n`;
  
  return text;
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
