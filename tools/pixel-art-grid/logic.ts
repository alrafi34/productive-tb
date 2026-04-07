import { GridSize, PixelGrid, ExportOptions } from './types';

export function createEmptyGrid(size: GridSize): PixelGrid {
  return Array(size).fill(null).map(() => Array(size).fill(null));
}

export function paintPixel(grid: PixelGrid, x: number, y: number, color: string | null): PixelGrid {
  const newGrid = grid.map(row => [...row]);
  if (x >= 0 && x < newGrid[0].length && y >= 0 && y < newGrid.length) {
    newGrid[y][x] = color;
  }
  return newGrid;
}

export function floodFill(grid: PixelGrid, x: number, y: number, newColor: string | null): PixelGrid {
  const originalColor = grid[y]?.[x];
  if (originalColor === newColor) return grid;
  
  const newGrid = grid.map(row => [...row]);
  const stack: [number, number][] = [[x, y]];
  
  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    if (cx < 0 || cx >= newGrid[0].length || cy < 0 || cy >= newGrid.length) continue;
    if (newGrid[cy][cx] !== originalColor) continue;
    
    newGrid[cy][cx] = newColor;
    
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
  
  return newGrid;
}

export function exportToPNG(grid: PixelGrid, pixelSize: number = 10): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const size = grid.length;
  
  canvas.width = size * pixelSize;
  canvas.height = size * pixelSize;
  
  // Fill with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const color = grid[y][x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  
  return canvas.toDataURL('image/png');
}

export function exportToCSS(grid: PixelGrid): string {
  const size = grid.length;
  let css = `.pixel-art {\n  display: grid;\n  grid-template-columns: repeat(${size}, 1fr);\n  gap: 0;\n  width: ${size * 10}px;\n  height: ${size * 10}px;\n}\n\n`;
  
  let pixelIndex = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const color = grid[y][x];
      if (color) {
        css += `.pixel-art .pixel:nth-child(${pixelIndex + 1}) {\n  background-color: ${color};\n}\n\n`;
      }
      pixelIndex++;
    }
  }
  
  return css;
}

export function exportToJSON(grid: PixelGrid): string {
  return JSON.stringify({
    gridSize: grid.length,
    pixels: grid
  }, null, 2);
}

export function importFromJSON(jsonString: string): PixelGrid | null {
  try {
    const data = JSON.parse(jsonString);
    if (data.pixels && Array.isArray(data.pixels)) {
      return data.pixels;
    }
  } catch (e) {
    // Invalid JSON
  }
  return null;
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function saveToLocalStorage(key: string, grid: PixelGrid) {
  try {
    localStorage.setItem(key, JSON.stringify(grid));
  } catch (e) {
    // Storage full or disabled
  }
}

export function loadFromLocalStorage(key: string): PixelGrid | null {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Invalid data
  }
  return null;
}