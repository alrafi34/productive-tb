// ── Canvas rendering pipeline for the heatmap ──

import { ClickPoint, HeatmapSettings, getPalette } from "./logic";

const stampCache = new Map<string, HTMLCanvasElement>();
const lutCache = new Map<string, Uint8ClampedArray>();

function getStamp(radius: number, blur: number, intensity: number): HTMLCanvasElement {
  const key = `${radius}-${blur}-${intensity}`;
  const cached = stampCache.get(key);
  if (cached) return cached;

  const size = radius * 2;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const alpha = Math.max(0.05, Math.min(1, intensity / 100));
  const innerStop = Math.max(0, Math.min(0.9, (1 - blur / 100) * 0.6));

  const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
  gradient.addColorStop(innerStop, `rgba(255,255,255,${alpha})`);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  stampCache.set(key, canvas);
  return canvas;
}

function getPaletteLUT(key: string, stops: [number, string][]): Uint8ClampedArray {
  const cached = lutCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 256, 0);
  for (const [stop, color] of stops) gradient.addColorStop(stop, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 1);
  const lut = ctx.getImageData(0, 0, 256, 1).data;
  lutCache.set(key, lut);
  return lut;
}

export interface RenderResult {
  densityAlpha: Uint8ClampedArray;
}

export function renderHeatmap(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  points: ClickPoint[],
  settings: HeatmapSettings,
  backgroundImage: HTMLImageElement | null
): RenderResult {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, height);

  if (backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, width, height);
  } else {
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, width, height);
  }

  const mask = document.createElement("canvas");
  mask.width = width;
  mask.height = height;
  const maskCtx = mask.getContext("2d")!;
  maskCtx.globalCompositeOperation = "lighter";

  const stamp = getStamp(settings.radius, settings.blur, settings.intensity);
  const r = settings.radius;
  for (const p of points) {
    maskCtx.drawImage(stamp, p.x - r, p.y - r);
  }

  const maskData = maskCtx.getImageData(0, 0, width, height);
  const densityAlpha = maskData.data;

  if (points.length > 0) {
    const palette = getPalette(settings.palette);
    const lut = getPaletteLUT(palette.key, palette.stops);
    const out = ctx.createImageData(width, height);
    const outData = out.data;
    const opacityFactor = settings.opacity / 100;

    for (let i = 0; i < width * height; i++) {
      const d = densityAlpha[i * 4 + 3];
      if (d === 0) continue;
      const lutIdx = d * 4;
      outData[i * 4] = lut[lutIdx];
      outData[i * 4 + 1] = lut[lutIdx + 1];
      outData[i * 4 + 2] = lut[lutIdx + 2];
      outData[i * 4 + 3] = Math.round((d / 255) * 255 * opacityFactor);
    }

    const overlay = document.createElement("canvas");
    overlay.width = width;
    overlay.height = height;
    overlay.getContext("2d")!.putImageData(out, 0, 0);
    ctx.drawImage(overlay, 0, 0);
  }

  if (settings.showGrid) drawGrid(ctx, width, height);
  if (settings.showLabels) drawLabels(ctx, points);

  return { densityAlpha };
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const step = 50;
  ctx.save();
  ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLabels(ctx: CanvasRenderingContext2D, points: ClickPoint[]): void {
  if (points.length > 200) return; // avoid unreadable clutter / perf hit on huge datasets
  ctx.save();
  ctx.font = "10px monospace";
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.textBaseline = "bottom";
  for (const p of points) {
    ctx.fillText(`${Math.round(p.x)},${Math.round(p.y)}`, p.x + 4, p.y - 4);
  }
  ctx.restore();
}

export function buildHeatSVG(points: ClickPoint[], settings: HeatmapSettings, width: number, height: number): string {
  const palette = getPalette(settings.palette);
  const hotColor = palette.stops[palette.stops.length - 1][1];
  const midColor = palette.stops[Math.floor(palette.stops.length / 2)][1];
  const r = settings.radius;
  const alpha = Math.max(0.05, Math.min(1, settings.intensity / 100)) * (settings.opacity / 100);

  const circles = points
    .map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="url(#heatGradient)" />`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#f9fafb" />
  <defs>
    <radialGradient id="heatGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${hotColor}" stop-opacity="${alpha}" />
      <stop offset="60%" stop-color="${midColor}" stop-opacity="${alpha * 0.6}" />
      <stop offset="100%" stop-color="${midColor}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <g style="mix-blend-mode:screen">${circles}</g>
</svg>`;
}
