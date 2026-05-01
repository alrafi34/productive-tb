import {
  Unit,
  FurnitureItem,
  RoomDimensions,
  LayoutConstraints,
  SpaceOptimizationResult,
  HistoryEntry,
  FurniturePreset
} from "./types";

// Unit conversion
export function convertToFeet(value: number, unit: Unit): number {
  return unit === "meters" ? value * 3.28084 : value;
}

export function convertFromFeet(value: number, unit: Unit): number {
  return unit === "meters" ? value / 3.28084 : value;
}

// Furniture presets
export function getFurniturePresets(): FurniturePreset[] {
  return [
    { name: "Queen Bed", width: 5, length: 6.67, category: "Bedroom" },
    { name: "King Bed", width: 6.33, length: 6.67, category: "Bedroom" },
    { name: "Single Bed", width: 3.17, length: 6.25, category: "Bedroom" },
    { name: "Sofa (3-Seater)", width: 7, length: 3, category: "Living Room" },
    { name: "Loveseat", width: 5, length: 3, category: "Living Room" },
    { name: "Coffee Table", width: 4, length: 2, category: "Living Room" },
    { name: "Dining Table (4-Seat)", width: 4, length: 3, category: "Dining" },
    { name: "Dining Table (6-Seat)", width: 6, length: 3, category: "Dining" },
    { name: "Office Desk", width: 5, length: 2.5, category: "Office" },
    { name: "Wardrobe", width: 4, length: 2, category: "Bedroom" },
    { name: "Bookshelf", width: 3, length: 1, category: "Office" },
    { name: "TV Stand", width: 5, length: 1.5, category: "Living Room" }
  ];
}

// Room templates
export function getRoomTemplates() {
  return [
    { name: "Small Bedroom", width: 10, length: 10, unit: "feet" as Unit },
    { name: "Master Bedroom", width: 14, length: 16, unit: "feet" as Unit },
    { name: "Living Room", width: 16, length: 20, unit: "feet" as Unit },
    { name: "Home Office", width: 10, length: 12, unit: "feet" as Unit },
    { name: "Studio Apartment", width: 20, length: 25, unit: "feet" as Unit },
    { name: "Dining Room", width: 12, length: 14, unit: "feet" as Unit }
  ];
}

// Collision detection
function checkCollision(item1: FurnitureItem, item2: FurnitureItem, buffer: number = 0): boolean {
  const w1 = item1.rotated ? item1.length : item1.width;
  const l1 = item1.rotated ? item1.width : item1.length;
  const w2 = item2.rotated ? item2.length : item2.width;
  const l2 = item2.rotated ? item2.width : item2.length;

  return !(
    item1.x + w1 + buffer <= item2.x ||
    item2.x + w2 + buffer <= item1.x ||
    item1.y + l1 + buffer <= item2.y ||
    item2.y + l2 + buffer <= item1.y
  );
}

// Check if item fits in room
function fitsInRoom(item: FurnitureItem, roomWidth: number, roomLength: number): boolean {
  const w = item.rotated ? item.length : item.width;
  const l = item.rotated ? item.width : item.length;
  return item.x + w <= roomWidth && item.y + l <= roomLength;
}

// Simple placement algorithm
function placeItem(
  item: FurnitureItem,
  placedItems: FurnitureItem[],
  roomWidth: number,
  roomLength: number,
  constraints: LayoutConstraints
): FurnitureItem | null {
  const gridStep = 0.5; // feet
  const buffer = constraints.minWalkingSpace;

  // Try placing at different positions
  for (let y = 0; y <= roomLength; y += gridStep) {
    for (let x = 0; x <= roomWidth; x += gridStep) {
      const testItem = { ...item, x, y, rotated: false };
      
      // Check if fits in room
      if (!fitsInRoom(testItem, roomWidth, roomLength)) continue;
      
      // Check collisions with placed items
      let hasCollision = false;
      for (const placed of placedItems) {
        if (checkCollision(testItem, placed, buffer)) {
          hasCollision = true;
          break;
        }
      }
      
      if (!hasCollision) {
        return testItem;
      }
      
      // Try rotated if allowed
      if (constraints.allowRotation) {
        const rotatedItem = { ...item, x, y, rotated: true };
        if (fitsInRoom(rotatedItem, roomWidth, roomLength)) {
          hasCollision = false;
          for (const placed of placedItems) {
            if (checkCollision(rotatedItem, placed, buffer)) {
              hasCollision = true;
              break;
            }
          }
          if (!hasCollision) {
            return rotatedItem;
          }
        }
      }
    }
  }
  
  return null;
}

// Calculate space optimization
export function calculateSpaceOptimization(
  roomDimensions: RoomDimensions,
  furniture: FurnitureItem[],
  constraints: LayoutConstraints
): SpaceOptimizationResult {
  const roomWidth = convertToFeet(roomDimensions.width, roomDimensions.unit);
  const roomLength = convertToFeet(roomDimensions.length, roomDimensions.unit);
  const roomArea = roomWidth * roomLength;
  
  const placedFurniture: FurnitureItem[] = [];
  const overflowItems: FurnitureItem[] = [];
  
  // Try to place each furniture item
  for (const item of furniture) {
    const placed = placeItem(item, placedFurniture, roomWidth, roomLength, constraints);
    if (placed) {
      placedFurniture.push(placed);
    } else {
      overflowItems.push(item);
    }
  }
  
  // Calculate occupied area
  let occupiedArea = 0;
  for (const item of placedFurniture) {
    const w = item.rotated ? item.length : item.width;
    const l = item.rotated ? item.width : item.length;
    occupiedArea += w * l;
  }
  
  const freeSpace = roomArea - occupiedArea;
  const walkableSpace = freeSpace; // Simplified
  const efficiencyScore = (occupiedArea / roomArea) * 100;
  
  // Generate warnings and suggestions
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  if (overflowItems.length > 0) {
    warnings.push(`${overflowItems.length} item(s) could not be placed due to space constraints`);
    suggestions.push("Consider removing or resizing furniture items");
  }
  
  if (efficiencyScore > 70) {
    warnings.push("Room may feel overcrowded");
    suggestions.push("Consider reducing furniture or increasing walking space");
  } else if (efficiencyScore < 30) {
    suggestions.push("Room has plenty of space for additional furniture");
  }
  
  if (constraints.minWalkingSpace < 2) {
    warnings.push("Walking space is below recommended minimum (2 ft)");
  }
  
  if (placedFurniture.length > 0 && placedFurniture.length < furniture.length) {
    suggestions.push("Try enabling rotation or reducing minimum walking space");
  }
  
  return {
    roomArea,
    occupiedArea,
    freeSpace,
    walkableSpace,
    efficiencyScore,
    placedFurniture,
    overflowItems,
    warnings,
    suggestions,
    timestamp: Date.now()
  };
}

// Validation
export function validateInputs(
  roomWidth: number,
  roomLength: number,
  minWalkingSpace: number
): string | null {
  if (roomWidth <= 0 || roomLength <= 0) {
    return "Room dimensions must be greater than zero";
  }
  
  if (roomWidth > 1000 || roomLength > 1000) {
    return "Room dimensions are too large";
  }
  
  if (minWalkingSpace < 0) {
    return "Walking space cannot be negative";
  }
  
  if (minWalkingSpace > 10) {
    return "Walking space is too large";
  }
  
  return null;
}

// Format numbers
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// History management
const HISTORY_KEY = "interior-space-optimization-history";
const MAX_HISTORY = 20;

export function saveToHistory(
  result: SpaceOptimizationResult,
  roomDimensions: RoomDimensions
): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc-${Date.now()}`,
    timestamp: Date.now(),
    result,
    roomDimensions
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

// Export functions
export function exportToText(
  result: SpaceOptimizationResult,
  roomDimensions: RoomDimensions
): string {
  let text = "INTERIOR SPACE OPTIMIZATION REPORT\n";
  text += "=" .repeat(50) + "\n\n";
  text += `Room Dimensions: ${roomDimensions.width} × ${roomDimensions.length} ${roomDimensions.unit}\n`;
  text += `Room Area: ${formatNumber(result.roomArea)} sq ft\n\n`;
  text += `Efficiency Score: ${formatNumber(result.efficiencyScore)}%\n`;
  text += `Occupied Area: ${formatNumber(result.occupiedArea)} sq ft\n`;
  text += `Free Space: ${formatNumber(result.freeSpace)} sq ft\n\n`;
  
  text += `Placed Furniture (${result.placedFurniture.length}):\n`;
  result.placedFurniture.forEach((item, i) => {
    text += `  ${i + 1}. ${item.name} - ${item.width}×${item.length} ft${item.rotated ? " (rotated)" : ""}\n`;
  });
  
  if (result.overflowItems.length > 0) {
    text += `\nOverflow Items (${result.overflowItems.length}):\n`;
    result.overflowItems.forEach((item, i) => {
      text += `  ${i + 1}. ${item.name} - ${item.width}×${item.length} ft\n`;
    });
  }
  
  if (result.warnings.length > 0) {
    text += `\nWarnings:\n`;
    result.warnings.forEach(w => text += `  • ${w}\n`);
  }
  
  if (result.suggestions.length > 0) {
    text += `\nSuggestions:\n`;
    result.suggestions.forEach(s => text += `  • ${s}\n`);
  }
  
  text += `\nGenerated: ${new Date().toLocaleString()}\n`;
  return text;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

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
