// ── Click Heatmap Density Calculator Logic ──

export interface ClickPoint {
  id: string;
  x: number;
  y: number;
}

export type PaletteKey = "classic" | "inferno" | "magma" | "viridis" | "plasma" | "grayscale";

export interface Palette {
  key: PaletteKey;
  label: string;
  stops: [number, string][];
}

export const PALETTES: Palette[] = [
  { key: "classic", label: "Classic Heatmap", stops: [[0, "#0000ff"], [0.25, "#00ffff"], [0.5, "#00ff00"], [0.75, "#ffff00"], [1, "#ff0000"]] },
  { key: "inferno", label: "Inferno", stops: [[0, "#000004"], [0.3, "#57106e"], [0.6, "#bc3754"], [0.85, "#f98c0a"], [1, "#fcffa4"]] },
  { key: "magma", label: "Magma", stops: [[0, "#000004"], [0.3, "#51127c"], [0.6, "#b73779"], [0.85, "#fc8961"], [1, "#fcfdbf"]] },
  { key: "viridis", label: "Viridis", stops: [[0, "#440154"], [0.3, "#3b528b"], [0.6, "#21918c"], [0.85, "#5ec962"], [1, "#fde725"]] },
  { key: "plasma", label: "Plasma", stops: [[0, "#0d0887"], [0.3, "#7e03a8"], [0.6, "#cc4778"], [0.85, "#f89441"], [1, "#f0f921"]] },
  { key: "grayscale", label: "Grayscale", stops: [[0, "#111111"], [0.5, "#888888"], [1, "#ffffff"]] },
];

export function getPalette(key: PaletteKey): Palette {
  return PALETTES.find((p) => p.key === key) ?? PALETTES[0];
}

export interface HeatmapSettings {
  radius: number;
  intensity: number;
  opacity: number;
  blur: number;
  palette: PaletteKey;
  showGrid: boolean;
  showLabels: boolean;
  zoom: number;
}

export const DEFAULT_SETTINGS: HeatmapSettings = {
  radius: 35,
  intensity: 75,
  opacity: 80,
  blur: 40,
  palette: "classic",
  showGrid: false,
  showLabels: false,
  zoom: 100,
};

export const ZOOM_LEVELS = [50, 100, 150, 200, 400];
export const RANDOM_COUNT_OPTIONS = [100, 500, 1000, 5000, 10000];

export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 560;

let idCounter = 0;
export function makePointId(): string {
  idCounter += 1;
  return `p${Date.now().toString(36)}${idCounter}`;
}

// ── Random data generation ──────────────────────────────────────────────────

export function generateRandomPoints(count: number, width = CANVAS_WIDTH, height = CANVAS_HEIGHT): ClickPoint[] {
  const clusterCount = Math.max(2, Math.min(6, Math.round(count / 400)));
  const centers = Array.from({ length: clusterCount }, () => ({
    x: width * 0.1 + Math.random() * width * 0.8,
    y: height * 0.1 + Math.random() * height * 0.8,
  }));

  const points: ClickPoint[] = [];
  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    if (Math.random() < 0.7) {
      const c = centers[Math.floor(Math.random() * centers.length)];
      const spread = Math.min(width, height) * 0.12;
      x = c.x + (Math.random() - 0.5) * 2 * spread * Math.random();
      y = c.y + (Math.random() - 0.5) * 2 * spread * Math.random();
    } else {
      x = Math.random() * width;
      y = Math.random() * height;
    }
    points.push({ id: makePointId(), x: clamp(x, 0, width), y: clamp(y, 0, height) });
  }
  return points;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// ── CSV / JSON parsing ───────────────────────────────────────────────────────

export interface ParseResult {
  points: ClickPoint[];
  ignoredRows: number;
  error: string | null;
}

function detectDelimiter(firstLine: string): string {
  const candidates = [",", ";", "\t"];
  let best = ",";
  let bestCount = -1;
  for (const c of candidates) {
    const count = firstLine.split(c).length;
    if (count > bestCount) { bestCount = count; best = c; }
  }
  return best;
}

export function parseCSV(text: string, width = CANVAS_WIDTH, height = CANVAS_HEIGHT): ParseResult {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { points: [], ignoredRows: 0, error: "The CSV file is empty." };

  const delimiter = detectDelimiter(lines[0]);
  let ignoredRows = 0;
  const points: ClickPoint[] = [];

  for (const line of lines) {
    const parts = line.split(delimiter).map((p) => p.trim());
    if (parts.length < 2) { ignoredRows++; continue; }
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (isNaN(x) || isNaN(y)) { ignoredRows++; continue; }
    points.push({ id: makePointId(), x: clamp(x, 0, width), y: clamp(y, 0, height) });
  }

  if (points.length === 0) return { points: [], ignoredRows, error: "No valid x,y coordinates were found in this CSV." };
  return { points, ignoredRows, error: null };
}

export function parseJSONPoints(text: string, width = CANVAS_WIDTH, height = CANVAS_HEIGHT): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { points: [], ignoredRows: 0, error: "This file is not valid JSON." };
  }
  if (!Array.isArray(data)) return { points: [], ignoredRows: 0, error: "Expected a JSON array of { x, y } objects." };

  let ignoredRows = 0;
  const points: ClickPoint[] = [];
  for (const item of data) {
    if (
      item && typeof item === "object" &&
      typeof (item as Record<string, unknown>).x === "number" &&
      typeof (item as Record<string, unknown>).y === "number"
    ) {
      const { x, y } = item as { x: number; y: number };
      points.push({ id: makePointId(), x: clamp(x, 0, width), y: clamp(y, 0, height) });
    } else {
      ignoredRows++;
    }
  }
  if (points.length === 0) return { points: [], ignoredRows, error: "No valid { x, y } coordinate objects were found." };
  return { points, ignoredRows, error: null };
}

export function buildCSVFromPoints(points: ClickPoint[]): string {
  return ["x,y", ...points.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`)].join("\n");
}

export function buildJSONFromPoints(points: ClickPoint[]): string {
  return JSON.stringify(points.map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) })), null, 2);
}

// ── Statistics ────────────────────────────────────────────────────────────────

export interface HeatmapStats {
  totalClicks: number;
  uniqueClicks: number;
  averageDensity: number;
  maxDensity: number;
  minDensity: number;
  medianDensity: number;
  hotspotCount: number;
  coldZoneCount: number;
  averageDistance: number;
  distanceIsApproximate: boolean;
  clickClusters: number;
  coveragePercent: number;
  mostActiveRegion: string;
  leastActiveRegion: string;
  heatDistributionScore: number;
  densityScore: number;
  interactionScore: number;
}

const REGION_LABELS = ["Top-Left", "Top-Center", "Top-Right", "Middle-Left", "Center", "Middle-Right", "Bottom-Left", "Bottom-Center", "Bottom-Right"];

export function computeStats(densityAlpha: Uint8ClampedArray, width: number, height: number, points: ClickPoint[]): HeatmapStats {
  const totalClicks = points.length;
  const uniqueSet = new Set(points.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`));
  const uniqueClicks = uniqueSet.size;

  const nonZero: number[] = [];
  let sum = 0;
  let coveredPixels = 0;
  const pixelCount = width * height;

  for (let i = 0; i < pixelCount; i++) {
    const d = densityAlpha[i * 4 + 3];
    if (d > 0) {
      nonZero.push(d);
      sum += d;
      coveredPixels++;
    }
  }

  const averageDensity = nonZero.length ? sum / nonZero.length : 0;
  const maxDensity = nonZero.length ? Math.max(...nonZero) : 0;
  const minDensity = nonZero.length ? Math.min(...nonZero) : 0;
  const sorted = [...nonZero].sort((a, b) => a - b);
  const medianDensity = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const coveragePercent = pixelCount ? (coveredPixels / pixelCount) * 100 : 0;

  // Grid-based hotspot / cold-zone / region detection (coarse cells for performance).
  const cols = 24, rows = 15;
  const cellW = width / cols, cellH = height / rows;
  const cellAvg: number[] = new Array(cols * rows).fill(0);
  const cellCount: number[] = new Array(cols * rows).fill(0);

  for (let y = 0; y < height; y++) {
    const cy = Math.min(rows - 1, Math.floor(y / cellH));
    for (let x = 0; x < width; x++) {
      const d = densityAlpha[(y * width + x) * 4 + 3];
      if (d === 0) continue;
      const cx = Math.min(cols - 1, Math.floor(x / cellW));
      const idx = cy * cols + cx;
      cellAvg[idx] += d;
      cellCount[idx] += 1;
    }
  }
  for (let i = 0; i < cellAvg.length; i++) {
    cellAvg[i] = cellCount[i] ? cellAvg[i] / cellCount[i] : 0;
  }

  const hotThreshold = maxDensity * 0.65;
  const coldThreshold = maxDensity * 0.2;
  let hotspotCount = 0;
  let coldZoneCount = 0;
  const visited = new Array(cols * rows).fill(false);

  const floodCount = (predicate: (v: number) => boolean): number => {
    let clusters = 0;
    for (let i = 0; i < cellAvg.length; i++) {
      if (visited[i] || !predicate(cellAvg[i])) continue;
      clusters++;
      const stack = [i];
      visited[i] = true;
      while (stack.length) {
        const cur = stack.pop()!;
        const cx = cur % cols, cy = Math.floor(cur / cols);
        const neighbors = [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]];
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
          const nIdx = ny * cols + nx;
          if (!visited[nIdx] && predicate(cellAvg[nIdx])) {
            visited[nIdx] = true;
            stack.push(nIdx);
          }
        }
      }
    }
    return clusters;
  };

  hotspotCount = maxDensity > 0 ? floodCount((v) => v >= hotThreshold) : 0;
  visited.fill(false);
  coldZoneCount = maxDensity > 0 ? floodCount((v) => v > 0 && v < coldThreshold) : 0;

  // Most / least active named region (3x3 grid).
  const rCols = 3, rRows = 3;
  const rCellW = width / rCols, rCellH = height / rRows;
  const regionSum = new Array(9).fill(0);
  const regionCount = new Array(9).fill(0);
  for (let y = 0; y < height; y += 2) {
    const ry = Math.min(rRows - 1, Math.floor(y / rCellH));
    for (let x = 0; x < width; x += 2) {
      const d = densityAlpha[(y * width + x) * 4 + 3];
      if (d === 0) continue;
      const rx = Math.min(rCols - 1, Math.floor(x / rCellW));
      const idx = ry * rCols + rx;
      regionSum[idx] += d;
      regionCount[idx] += 1;
    }
  }
  const regionAvg = regionSum.map((s, i) => (regionCount[i] ? s / regionCount[i] : 0));
  let mostIdx = 0, leastIdx = 0;
  for (let i = 1; i < 9; i++) {
    if (regionAvg[i] > regionAvg[mostIdx]) mostIdx = i;
    if (regionAvg[i] < regionAvg[leastIdx]) leastIdx = i;
  }
  const mostActiveRegion = maxDensity > 0 ? REGION_LABELS[mostIdx] : "—";
  const leastActiveRegion = maxDensity > 0 ? REGION_LABELS[leastIdx] : "—";

  // Average distance between clicks (capped for performance).
  const sample = points.length > 500 ? sampleArray(points, 500) : points;
  let averageDistance = 0;
  if (sample.length > 1) {
    let distSum = 0, pairs = 0;
    for (let i = 0; i < sample.length; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        distSum += Math.hypot(sample[i].x - sample[j].x, sample[i].y - sample[j].y);
        pairs++;
      }
    }
    averageDistance = pairs ? distSum / pairs : 0;
  }

  // Click clusters via spatial-hash union-find.
  const clickClusters = countClickClusters(points, 45);

  const heatDistributionScore = nonZero.length > 1
    ? clamp01(100 - (stdDev(nonZero) / (averageDensity || 1)) * 100)
    : 0;
  const densityScore = Math.round(clamp01((averageDensity / 255) * 100));
  const interactionScore = Math.round(clamp01((totalClicks / ((width * height) / 20000)) * 10));

  return {
    totalClicks,
    uniqueClicks,
    averageDensity: round2(averageDensity),
    maxDensity,
    minDensity,
    medianDensity,
    hotspotCount,
    coldZoneCount,
    averageDistance: round2(averageDistance),
    distanceIsApproximate: points.length > 500,
    clickClusters,
    coveragePercent: round2(coveragePercent),
    mostActiveRegion,
    leastActiveRegion,
    heatDistributionScore: Math.round(heatDistributionScore),
    densityScore,
    interactionScore: Math.round(interactionScore),
  };
}

function sampleArray<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0 && copy.length - i < n; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function stdDev(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(100, n));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function countClickClusters(points: ClickPoint[], threshold: number): number {
  if (points.length === 0) return 0;
  const bucketSize = threshold;
  const buckets = new Map<string, number[]>();
  const key = (x: number, y: number) => `${Math.floor(x / bucketSize)},${Math.floor(y / bucketSize)}`;

  points.forEach((p, i) => {
    const k = key(p.x, p.y);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(i);
  });

  const parent = points.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const union = (a: number, b: number) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; };

  points.forEach((p, i) => {
    const bx = Math.floor(p.x / bucketSize), by = Math.floor(p.y / bucketSize);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const neighbors = buckets.get(`${bx + dx},${by + dy}`);
        if (!neighbors) continue;
        for (const j of neighbors) {
          if (j <= i) continue;
          if (Math.hypot(p.x - points[j].x, p.y - points[j].y) <= threshold) union(i, j);
        }
      }
    }
  });

  const roots = new Set(points.map((_, i) => find(i)));
  return roots.size;
}

// ── LocalStorage: session recovery (points + settings only, not image) ────────

const SESSION_KEY = "click-heatmap-density-calculator-session";

export interface SessionData {
  points: ClickPoint[];
  settings: HeatmapSettings;
}

export function saveSession(data: SessionData): void {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch {}
}

export function loadSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as SessionData;
  } catch { return null; }
}

export function clearSession(): void {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function buildStatsText(stats: HeatmapStats): string {
  return [
    "Click Heatmap Density Calculator — Statistics",
    "===============================================",
    `Total Clicks: ${stats.totalClicks}`,
    `Unique Clicks: ${stats.uniqueClicks}`,
    `Average Density: ${stats.averageDensity}`,
    `Maximum Density: ${stats.maxDensity}`,
    `Minimum Density: ${stats.minDensity}`,
    `Median Density: ${stats.medianDensity}`,
    `Hotspot Count: ${stats.hotspotCount}`,
    `Cold Zone Count: ${stats.coldZoneCount}`,
    `Coverage: ${stats.coveragePercent}%`,
    `Average Distance Between Clicks: ${stats.averageDistance}px${stats.distanceIsApproximate ? " (approx.)" : ""}`,
    `Click Clusters: ${stats.clickClusters}`,
    `Most Active Region: ${stats.mostActiveRegion}`,
    `Least Active Region: ${stats.leastActiveRegion}`,
    `Heat Distribution Score: ${stats.heatDistributionScore}/100`,
    `Density Score: ${stats.densityScore}/100`,
    `Interaction Score: ${stats.interactionScore}/100`,
  ].join("\n");
}
