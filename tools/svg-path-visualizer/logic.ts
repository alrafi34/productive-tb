import { PathConfig, SamplePath } from "./types";

export type { PathConfig } from "./types";

export const defaultConfig: PathConfig = {
  path: "M10 10 H 90 V 90 H 10 Z",
  strokeColor: "#000000",
  strokeWidth: 2,
  fillColor: "none",
  viewBoxX: 0,
  viewBoxY: 0,
  viewBoxWidth: 100,
  viewBoxHeight: 100,
  showGrid: true,
  gridSize: 10
};

export function validateSVGPath(path: string): { isValid: boolean; error?: string } {
  if (!path.trim()) {
    return { isValid: false, error: "Path cannot be empty" };
  }

  // Basic SVG path command validation
  const validCommands = /^[MmLlHhVvCcSsQqTtAaZz0-9\s,.-]+$/;
  if (!validCommands.test(path)) {
    return { isValid: false, error: "Invalid characters in path" };
  }

  // Check if path starts with a move command
  const trimmedPath = path.trim();
  if (!/^[Mm]/.test(trimmedPath)) {
    return { isValid: false, error: "Path must start with M or m command" };
  }

  return { isValid: true };
}

export function generateSVGCode(config: PathConfig): string {
  const { path, strokeColor, strokeWidth, fillColor, viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight } = config;
  
  return `<svg viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
</svg>`;
}

export function createGridPattern(gridSize: number, viewBoxWidth: number, viewBoxHeight: number): string {
  const lines: string[] = [];
  
  // Vertical lines
  for (let x = 0; x <= viewBoxWidth; x += gridSize) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${viewBoxHeight}" stroke="#e0e0e0" stroke-width="0.5" />`);
  }
  
  // Horizontal lines
  for (let y = 0; y <= viewBoxHeight; y += gridSize) {
    lines.push(`<line x1="0" y1="${y}" x2="${viewBoxWidth}" y2="${y}" stroke="#e0e0e0" stroke-width="0.5" />`);
  }
  
  return lines.join('\n  ');
}

export const samplePaths: SamplePath[] = [
  {
    name: "Square",
    path: "M10 10 H 90 V 90 H 10 Z",
    description: "Simple square shape"
  },
  {
    name: "Triangle",
    path: "M50 10 L90 90 L10 90 Z",
    description: "Equilateral triangle"
  },
  {
    name: "Circle",
    path: "M50 10 A20 20 0 1 1 49.9 10",
    description: "Circle using arc commands"
  },
  {
    name: "Star",
    path: "M50 5 L61 35 L95 35 L69 57 L80 91 L50 70 L20 91 L31 57 L5 35 L39 35 Z",
    description: "Five-pointed star"
  },
  {
    name: "Heart",
    path: "M50 85 C20 60, 5 25, 25 25 C35 15, 45 20, 50 30 C55 20, 65 15, 75 25 C95 25, 80 60, 50 85 Z",
    description: "Heart shape with curves"
  },
  {
    name: "Wave",
    path: "M10 50 Q30 20 50 50 T90 50",
    description: "Smooth wave using quadratic curves"
  },
  {
    name: "Arrow",
    path: "M10 50 L40 50 L40 30 L80 50 L40 70 L40 50",
    description: "Right-pointing arrow"
  },
  {
    name: "Hexagon",
    path: "M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z",
    description: "Regular hexagon"
  }
];

export function extractPathFromSVG(svgContent: string): string[] {
  const paths: string[] = [];
  const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  
  return paths;
}

export function calculatePathBounds(path: string): { minX: number; minY: number; maxX: number; maxY: number } | null {
  // Simple bounds calculation - in a real implementation, you'd parse the path more thoroughly
  const numbers = path.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (!numbers || numbers.length < 2) return null;
  
  const coords = numbers.map(Number);
  const xCoords = coords.filter((_, i) => i % 2 === 0);
  const yCoords = coords.filter((_, i) => i % 2 === 1);
  
  return {
    minX: Math.min(...xCoords),
    minY: Math.min(...yCoords),
    maxX: Math.max(...xCoords),
    maxY: Math.max(...yCoords)
  };
}