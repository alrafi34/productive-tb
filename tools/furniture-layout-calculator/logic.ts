import {
  Unit,
  FurnitureItem,
  RoomDimensions,
  LayoutResult,
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
    { name: "Queen Bed", width: 5, height: 6.67, category: "Bedroom", color: "#3b82f6" },
    { name: "King Bed", width: 6.33, height: 6.67, category: "Bedroom", color: "#3b82f6" },
    { name: "Single Bed", width: 3.17, height: 6.25, category: "Bedroom", color: "#3b82f6" },
    { name: "Sofa (3-Seater)", width: 7, height: 3, category: "Living Room", color: "#8b5cf6" },
    { name: "Loveseat", width: 5, height: 3, category: "Living Room", color: "#8b5cf6" },
    { name: "Coffee Table", width: 4, height: 2, category: "Living Room", color: "#f59e0b" },
    { name: "Dining Table (4)", width: 4, height: 3, category: "Dining", color: "#f59e0b" },
    { name: "Dining Table (6)", width: 6, height: 3, category: "Dining", color: "#f59e0b" },
    { name: "Office Desk", width: 5, height: 2.5, category: "Office", color: "#10b981" },
    { name: "Wardrobe", width: 4, height: 2, category: "Bedroom", color: "#6366f1" },
    { name: "Bookshelf", width: 3, height: 1, category: "Office", color: "#10b981" },
    { name: "TV Stand", width: 5, height: 1.5, category: "Living Room", color: "#ec4899" },
    { name: "Nightstand", width: 2, height: 1.5, category: "Bedroom", color: "#6366f1" },
    { name: "Dresser", width: 4, height: 1.5, category: "Bedroom", color: "#6366f1" },
    { name: "Armchair", width: 3, height: 3, category: "Living Room", color: "#8b5cf6" },
    { name: "Side Table", width: 2, height: 2, category: "Living Room", color: "#f59e0b" }
  ];
}

// Room templates
export function getRoomTemplates() {
  return [
    { name: "Small Bedroom", width: 10, height: 10, unit: "feet" as Unit },
    { name: "Master Bedroom", width: 14, height: 16, unit: "feet" as Unit },
    { name: "Living Room", width: 16, height: 20, unit: "feet" as Unit },
    { name: "Home Office", width: 10, height: 12, unit: "feet" as Unit },
    { name: "Studio Apartment", width: 20, height: 25, unit: "feet" as Unit },
    { name: "Dining Room", width: 12, height: 14, unit: "feet" as Unit }
  ];
}

// Collision detection
export function checkCollision(item1: FurnitureItem, item2: FurnitureItem): boolean {
  const w1 = item1.rotated ? item1.height : item1.width;
  const h1 = item1.rotated ? item1.width : item1.height;
  const w2 = item2.rotated ? item2.height : item2.width;
  const h2 = item2.rotated ? item2.width : item2.height;

  return !(
    item1.x + w1 <= item2.x ||
    item2.x + w2 <= item1.x ||
    item1.y + h1 <= item2.y ||
    item2.y + h2 <= item1.y
  );
}

// Check if item is within room bounds
export function isWithinBounds(
  item: FurnitureItem,
  roomWidth: number,
  roomHeight: number
): boolean {
  const w = item.rotated ? item.height : item.width;
  const h = item.rotated ? item.width : item.height;
  return item.x >= 0 && item.y >= 0 && item.x + w <= roomWidth && item.y + h <= roomHeight;
}

// Snap to grid
export function snapToGrid(value: number, gridSize: number = 0.5): number {
  return Math.round(value / gridSize) * gridSize;
}

// Auto-arrange furniture
export function autoArrangeFurniture(
  furniture: FurnitureItem[],
  roomWidth: number,
  roomHeight: number
): FurnitureItem[] {
  const arranged: FurnitureItem[] = [];
  const gridStep = 0.5;
  const padding = 1; // 1 ft padding between items

  for (const item of furniture) {
    let placed = false;
    
    // Try to place item
    for (let y = 0; y <= roomHeight && !placed; y += gridStep) {
      for (let x = 0; x <= roomWidth && !placed; x += gridStep) {
        const testItem = { ...item, x, y, rotated: false };
        const w = testItem.width;
        const h = testItem.height;
        
        // Check if fits in room
        if (x + w > roomWidth || y + h > roomHeight) continue;
        
        // Check collisions with placed items
        let hasCollision = false;
        for (const placedItem of arranged) {
          const pw = placedItem.rotated ? placedItem.height : placedItem.width;
          const ph = placedItem.rotated ? placedItem.width : placedItem.height;
          
          // Check with padding
          if (!(
            x + w + padding <= placedItem.x ||
            placedItem.x + pw + padding <= x ||
            y + h + padding <= placedItem.y ||
            placedItem.y + ph + padding <= y
          )) {
            hasCollision = true;
            break;
          }
        }
        
        if (!hasCollision) {
          arranged.push(testItem);
          placed = true;
        }
      }
    }
    
    // If not placed, try rotated
    if (!placed) {
      for (let y = 0; y <= roomHeight && !placed; y += gridStep) {
        for (let x = 0; x <= roomWidth && !placed; x += gridStep) {
          const testItem = { ...item, x, y, rotated: true };
          const w = testItem.height;
          const h = testItem.width;
          
          if (x + w > roomWidth || y + h > roomHeight) continue;
          
          let hasCollision = false;
          for (const placedItem of arranged) {
            const pw = placedItem.rotated ? placedItem.height : placedItem.width;
            const ph = placedItem.rotated ? placedItem.width : placedItem.height;
            
            if (!(
              x + w + padding <= placedItem.x ||
              placedItem.x + pw + padding <= x ||
              y + h + padding <= placedItem.y ||
              placedItem.y + ph + padding <= y
            )) {
              hasCollision = true;
              break;
            }
          }
          
          if (!hasCollision) {
            arranged.push(testItem);
            placed = true;
          }
        }
      }
    }
    
    // If still not placed, add at origin (will show as overlapping)
    if (!placed) {
      arranged.push({ ...item, x: 0, y: 0, rotated: false });
    }
  }
  
  return arranged;
}

// Calculate layout result
export function calculateLayout(
  furniture: FurnitureItem[],
  roomDimensions: RoomDimensions
): LayoutResult {
  const roomWidth = convertToFeet(roomDimensions.width, roomDimensions.unit);
  const roomHeight = convertToFeet(roomDimensions.height, roomDimensions.unit);
  const roomArea = roomWidth * roomHeight;
  
  let usedArea = 0;
  for (const item of furniture) {
    const w = item.rotated ? item.height : item.width;
    const h = item.rotated ? item.width : item.height;
    usedArea += w * h;
  }
  
  const freeArea = roomArea - usedArea;
  const efficiency = roomArea > 0 ? (usedArea / roomArea) * 100 : 0;
  
  return {
    roomArea,
    usedArea,
    freeArea,
    efficiency,
    furniture,
    timestamp: Date.now()
  };
}

// Validation
export function validateInputs(
  roomWidth: number,
  roomHeight: number
): string | null {
  if (roomWidth <= 0 || roomHeight <= 0) {
    return "Room dimensions must be greater than zero";
  }
  
  if (roomWidth > 1000 || roomHeight > 1000) {
    return "Room dimensions are too large";
  }
  
  return null;
}

// Format numbers
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// History management
const HISTORY_KEY = "furniture-layout-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(
  layout: LayoutResult,
  roomDimensions: RoomDimensions
): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `layout-${Date.now()}`,
    timestamp: Date.now(),
    layout,
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
  layout: LayoutResult,
  roomDimensions: RoomDimensions
): string {
  let text = "FURNITURE LAYOUT PLAN\n";
  text += "=".repeat(50) + "\n\n";
  text += `Room Dimensions: ${roomDimensions.width} × ${roomDimensions.height} ${roomDimensions.unit}\n`;
  text += `Room Area: ${formatNumber(layout.roomArea)} sq ft\n\n`;
  text += `Space Efficiency: ${formatNumber(layout.efficiency)}%\n`;
  text += `Used Area: ${formatNumber(layout.usedArea)} sq ft\n`;
  text += `Free Area: ${formatNumber(layout.freeArea)} sq ft\n\n`;
  
  text += `Furniture Items (${layout.furniture.length}):\n`;
  layout.furniture.forEach((item, i) => {
    const w = item.rotated ? item.height : item.width;
    const h = item.rotated ? item.width : item.height;
    text += `  ${i + 1}. ${item.name}\n`;
    text += `     Size: ${w}×${h} ft${item.rotated ? " (rotated)" : ""}\n`;
    text += `     Position: (${formatNumber(item.x, 1)}, ${formatNumber(item.y, 1)})\n`;
  });
  
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

// Generate random color
export function getRandomColor(): string {
  const colors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#6366f1", "#ec4899", "#14b8a6"];
  return colors[Math.floor(Math.random() * colors.length)];
}
