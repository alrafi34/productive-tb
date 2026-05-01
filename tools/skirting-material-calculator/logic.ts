import { Unit, Room, SkirtingCalculation, HistoryEntry } from "./types";

export function createRoom(length: number = 10, width: number = 12, doors: number = 1, doorWidth: number = 3): Room {
  return {
    id: `room-${Date.now()}-${Math.random()}`,
    length,
    width,
    doors,
    doorWidth
  };
}

export function calculateRoomSkirting(room: Room): number {
  const perimeter = 2 * (room.length + room.width);
  const doorDeduction = room.doors * room.doorWidth;
  return Math.max(0, perimeter - doorDeduction);
}

export function calculateTotalSkirting(rooms: Room[]): number {
  return rooms.reduce((total, room) => total + calculateRoomSkirting(room), 0);
}

export function calculateSkirtingWithCost(
  rooms: Room[],
  unit: Unit,
  costPerUnit: number
): SkirtingCalculation {
  const totalSkirtingLength = calculateTotalSkirting(rooms);
  const totalCost = totalSkirtingLength * costPerUnit;

  return {
    rooms,
    unit,
    costPerUnit,
    totalSkirtingLength,
    totalCost,
    timestamp: Date.now()
  };
}

export function validateRoom(room: Room): string | null {
  if (room.length <= 0) return "Length must be greater than 0";
  if (room.width <= 0) return "Width must be greater than 0";
  if (room.doors < 0) return "Number of doors cannot be negative";
  if (room.doorWidth < 0) return "Door width cannot be negative";
  return null;
}

export function getUnitLabel(unit: Unit): string {
  return unit === "feet" ? "ft" : "m";
}

export function formatNumber(value: number, decimals: number = 2): string {
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
const HISTORY_KEY = "skirting-material-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: SkirtingCalculation): void {
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
  localStorage.removeItem(HISTORY_KEY);
}

// Export Functions
export function exportToCSV(calculation: SkirtingCalculation): string {
  const unit = getUnitLabel(calculation.unit);
  const headers = ["Room #", "Length", "Width", "Doors", "Door Width", "Skirting Length"];
  const rows = calculation.rooms.map((room, index) => [
    `Room ${index + 1}`,
    `${room.length} ${unit}`,
    `${room.width} ${unit}`,
    room.doors.toString(),
    `${room.doorWidth} ${unit}`,
    `${formatNumber(calculateRoomSkirting(room), 2)} ${unit}`
  ]);
  
  const summaryRow = ["", "", "", "", "Total:", `${formatNumber(calculation.totalSkirtingLength, 2)} ${unit}`];
  
  if (calculation.costPerUnit > 0) {
    headers.push("Cost");
    rows.forEach((row, index) => {
      const roomSkirting = calculateRoomSkirting(calculation.rooms[index]);
      row.push(`$${formatNumber(roomSkirting * calculation.costPerUnit, 2)}`);
    });
    summaryRow.push(`$${formatNumber(calculation.totalCost, 2)}`);
  }
  
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(",")),
    summaryRow.join(",")
  ].join("\n");
  
  return csvContent;
}

export function exportToText(calculation: SkirtingCalculation): string {
  const unit = getUnitLabel(calculation.unit);
  
  let text = `SKIRTING MATERIAL CALCULATION
============================

`;

  calculation.rooms.forEach((room, index) => {
    const skirting = calculateRoomSkirting(room);
    text += `Room ${index + 1}:
- Length: ${room.length} ${unit}
- Width: ${room.width} ${unit}
- Doors: ${room.doors}
- Door Width: ${room.doorWidth} ${unit}
- Skirting Required: ${formatNumber(skirting, 2)} ${unit}
`;
    if (calculation.costPerUnit > 0) {
      text += `- Cost: $${formatNumber(skirting * calculation.costPerUnit, 2)}\n`;
    }
    text += "\n";
  });

  text += `SUMMARY
-------
Total Skirting Length: ${formatNumber(calculation.totalSkirtingLength, 2)} ${unit}
`;

  if (calculation.costPerUnit > 0) {
    text += `Cost per ${unit}: $${calculation.costPerUnit}
Total Cost: $${formatNumber(calculation.totalCost, 2)}
`;
  }

  text += `\nGenerated: ${new Date(calculation.timestamp).toLocaleString()}`;
  
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
