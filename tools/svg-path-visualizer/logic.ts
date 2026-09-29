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

  // Commands, numbers (including 1e-3 and +5), commas and spaces only
  const validCommands = /^[MmLlHhVvCcSsQqTtAaZzEe0-9\s,.+-]+$/;
  if (!validCommands.test(path)) {
    return { isValid: false, error: "Invalid characters in path" };
  }

  // Check if path starts with a move command
  const trimmedPath = path.trim();
  if (!/^[Mm]/.test(trimmedPath)) {
    return { isValid: false, error: "Path must start with M or m command" };
  }

  if (!parsePath(trimmedPath)) {
    return { isValid: false, error: "A command is missing some of its numbers" };
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
    description: "Isosceles triangle"
  },
  {
    name: "Circle",
    path: "M10 50 A40 40 0 1 0 90 50 A40 40 0 1 0 10 50 Z",
    description: "Circle made of two half-circle arcs"
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
    path: "M10 40 H50 V25 L90 50 L50 75 V60 H10 Z",
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

// ── Path parsing ──

const PARAMS: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
const NAMES: Record<string, string> = {
  M: "Move to", L: "Line to", H: "Horizontal line to", V: "Vertical line to", C: "Cubic Bézier curve to",
  S: "Smooth cubic curve to", Q: "Quadratic Bézier curve to", T: "Smooth quadratic curve to", A: "Arc to", Z: "Close path",
};

export interface PathSegment {
  command: string; // as written: upper case is absolute, lower case relative
  params: number[];
  /* End point in absolute coordinates */
  end: { x: number; y: number };
  /* Control points in absolute coordinates, for curves */
  controls: { x: number; y: number }[];
  description: string;
}

const fmt = (n: number) => String(Math.round(n * 100) / 100);

/* Splits a path into commands with their numbers, resolving relative
   coordinates and repeated parameters (M 0 0 10 10 is a move then a line).
   Returns null when the path cannot be read. */
export function parsePath(d: string): PathSegment[] | null {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g);
  if (!tokens || !/^[Mm]$/.test(tokens[0])) return null;
  const segments: PathSegment[] = [];
  let x = 0, y = 0, startX = 0, startY = 0;
  let i = 0;
  let cmd = "";
  while (i < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[i])) cmd = tokens[i++];
    else if (!cmd) return null;
    const upper = cmd.toUpperCase();
    const rel = cmd !== upper;
    const n = PARAMS[upper];
    if (upper === "Z") {
      x = startX; y = startY;
      segments.push({ command: cmd, params: [], end: { x, y }, controls: [], description: NAMES.Z });
      cmd = "";
      continue;
    }
    const p = tokens.slice(i, i + n).map(Number);
    if (p.length < n || p.some((v) => !Number.isFinite(v))) return null;
    i += n;
    const ox = rel ? x : 0, oy = rel ? y : 0;
    const controls: { x: number; y: number }[] = [];
    let desc = "";
    switch (upper) {
      case "M": case "L": case "T":
        x = ox + p[0]; y = oy + p[1];
        desc = `${NAMES[upper]} (${fmt(x)}, ${fmt(y)})`;
        break;
      case "H": x = ox + p[0]; desc = `${NAMES.H} x = ${fmt(x)}`; break;
      case "V": y = oy + p[0]; desc = `${NAMES.V} y = ${fmt(y)}`; break;
      case "C":
        controls.push({ x: ox + p[0], y: oy + p[1] }, { x: ox + p[2], y: oy + p[3] });
        x = ox + p[4]; y = oy + p[5];
        desc = `${NAMES.C} (${fmt(x)}, ${fmt(y)}) with control points (${fmt(controls[0].x)}, ${fmt(controls[0].y)}) and (${fmt(controls[1].x)}, ${fmt(controls[1].y)})`;
        break;
      case "S": case "Q":
        controls.push({ x: ox + p[0], y: oy + p[1] });
        x = ox + p[2]; y = oy + p[3];
        desc = `${NAMES[upper]} (${fmt(x)}, ${fmt(y)}) with control point (${fmt(controls[0].x)}, ${fmt(controls[0].y)})`;
        break;
      case "A":
        x = ox + p[5]; y = oy + p[6];
        desc = `${NAMES.A} (${fmt(x)}, ${fmt(y)}): radii ${fmt(p[0])} × ${fmt(p[1])}, rotation ${fmt(p[2])}°, ${p[3] ? "large" : "small"} arc, ${p[4] ? "clockwise" : "counter-clockwise"}`;
        break;
    }
    if (upper === "M") { startX = x; startY = y; }
    segments.push({ command: cmd, params: p, end: { x, y }, controls, description: (rel ? "Relative " + desc.charAt(0).toLowerCase() + desc.slice(1) : desc) });
    // Extra coordinate pairs after M are implicit line-to commands
    if (upper === "M") cmd = rel ? "l" : "L";
  }
  return segments;
}

/* Exact bounds from the browser's SVG engine, which accounts for curves
   and arcs; falls back to the parsed end and control points elsewhere. */
export function calculatePathBounds(path: string): { minX: number; minY: number; maxX: number; maxY: number } | null {
  if (typeof document !== "undefined") {
    try {
      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("style", "position:absolute;width:0;height:0;visibility:hidden");
      const el = document.createElementNS(ns, "path");
      el.setAttribute("d", path);
      svg.appendChild(el);
      document.body.appendChild(svg);
      const box = el.getBBox();
      svg.remove();
      if (box.width || box.height) return { minX: box.x, minY: box.y, maxX: box.x + box.width, maxY: box.y + box.height };
    } catch {}
  }
  const segs = parsePath(path);
  if (!segs || !segs.length) return null;
  const pts = segs.flatMap((s) => [s.end, ...s.controls]);
  return {
    minX: Math.min(...pts.map((p) => p.x)),
    minY: Math.min(...pts.map((p) => p.y)),
    maxX: Math.max(...pts.map((p) => p.x)),
    maxY: Math.max(...pts.map((p) => p.y)),
  };
}