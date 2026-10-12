export type VisualStyle = "bars" | "mirror" | "wave" | "circle" | "spectrogram";

export type Theme = { name: string; colors: string[]; bg: string };

export const THEMES: Theme[] = [
  { name: "Neon", colors: ["#22d3ee", "#818cf8", "#e879f9"], bg: "#0b1020" },
  { name: "Sunset", colors: ["#fde047", "#fb923c", "#ec4899"], bg: "#1c1023" },
  { name: "Forest", colors: ["#a3e635", "#22c55e", "#058554"], bg: "#08140f" },
  { name: "Ocean", colors: ["#7dd3fc", "#0ea5e9", "#2563eb"], bg: "#06121f" },
  { name: "Fire", colors: ["#fef08a", "#f97316", "#dc2626"], bg: "#140806" },
  { name: "Mono", colors: ["#ffffff", "#e5e7eb", "#9ca3af"], bg: "#000000" },
];

export const ASPECTS = {
  "16:9": { w: 1280, h: 720, label: "16:9 (YouTube)" },
  "1:1": { w: 1080, h: 1080, label: "1:1 (Instagram post)" },
  "9:16": { w: 1080, h: 1920, label: "9:16 (Reels, TikTok, Shorts)" },
} as const;
export type Aspect = keyof typeof ASPECTS;

export type Scene = {
  style: VisualStyle;
  colors: string[];
  bg: string;
  image: ImageBitmap | null;
  title: string;
  artist: string;
  sensitivity: number;
  sampleRate: number;
};

/* Log-spaced bands from 30 Hz to 16 kHz: the low end, where most musical
   energy is, gets as many bars as the highs instead of a handful */
export function bands(freq: Uint8Array, sampleRate: number, count: number, sens: number): number[] {
  const nyquist = sampleRate / 2;
  const binHz = nyquist / freq.length;
  const lo = 30, hi = Math.min(16000, nyquist);
  const out: number[] = [];
  for (let k = 0; k < count; k++) {
    const f0 = lo * Math.pow(hi / lo, k / count);
    const f1 = lo * Math.pow(hi / lo, (k + 1) / count);
    const b0 = Math.min(freq.length - 1, Math.floor(f0 / binHz));
    const b1 = Math.min(freq.length - 1, Math.max(b0, Math.ceil(f1 / binHz) - 1));
    let m = 0;
    for (let b = b0; b <= b1; b++) if (freq[b] > m) m = freq[b];
    out.push(Math.min(1, (m / 255) * sens));
  }
  return out;
}

function gradient(ctx: CanvasRenderingContext2D, colors: string[], x0: number, y0: number, x1: number, y1: number) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  colors.forEach((c, i) => g.addColorStop(i / Math.max(1, colors.length - 1), c));
  return g;
}

function background(ctx: CanvasRenderingContext2D, w: number, h: number, s: Scene) {
  ctx.fillStyle = s.bg;
  ctx.fillRect(0, 0, w, h);
  if (s.image) {
    const r = Math.max(w / s.image.width, h / s.image.height);
    const iw = s.image.width * r, ih = s.image.height * r;
    ctx.drawImage(s.image, (w - iw) / 2, (h - ih) / 2, iw, ih);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, w, h);
  }
}

function labels(ctx: CanvasRenderingContext2D, w: number, h: number, s: Scene) {
  if (!s.title && !s.artist) return;
  const unit = Math.min(w, h) / 20;
  const centred = s.style === "circle";
  ctx.textAlign = centred ? "center" : "left";
  ctx.textBaseline = "alphabetic";
  const x = centred ? w / 2 : unit * 1.5;
  let y = centred ? h - unit * 2.4 : unit * 2.6;
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = unit / 3;
  if (s.title) {
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${Math.round(unit * 1.25)}px system-ui, -apple-system, Segoe UI, sans-serif`;
    ctx.fillText(s.title, x, y, w - unit * 3);
    y += unit * 1.4;
  }
  if (s.artist) {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = `500 ${Math.round(unit * 0.85)}px system-ui, -apple-system, Segoe UI, sans-serif`;
    ctx.fillText(s.artist, x, y, w - unit * 3);
  }
  ctx.shadowBlur = 0;
}

function roundedBar(ctx: CanvasRenderingContext2D, x: number, y: number, bw: number, bh: number) {
  const r = Math.min(bw / 2, bh / 2, 8);
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, r);
  else ctx.rect(x, y, bw, bh);
  ctx.fill();
}

/* The spectrogram scrolls, so it keeps its own picture between frames */
export class Spectrogram {
  private canvas: HTMLCanvasElement | null = null;
  private lut: Uint8ClampedArray = new Uint8ClampedArray(0);
  private lutKey = "";

  draw(ctx: CanvasRenderingContext2D, w: number, h: number, freq: Uint8Array, s: Scene, advance: boolean) {
    const key = s.colors.join() + s.bg;
    if (key !== this.lutKey) { this.lut = makeLut(s.colors, s.bg); this.lutKey = key; }
    if (!this.canvas || this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = w;
      this.canvas.height = h;
      const c = this.canvas.getContext("2d")!;
      c.fillStyle = s.bg;
      c.fillRect(0, 0, w, h);
    }
    const off = this.canvas.getContext("2d")!;
    if (advance) {
      const step = 3;
      off.drawImage(this.canvas, -step, 0);
      const col = off.createImageData(step, h);
      const values = bands(freq, s.sampleRate, h, s.sensitivity);
      for (let y = 0; y < h; y++) {
        const v = Math.round(values[h - 1 - y] * 255) * 4;
        for (let x = 0; x < step; x++) {
          const i = (y * step + x) * 4;
          col.data[i] = this.lut[v];
          col.data[i + 1] = this.lut[v + 1];
          col.data[i + 2] = this.lut[v + 2];
          col.data[i + 3] = 255;
        }
      }
      off.putImageData(col, w - step, 0);
    }
    ctx.drawImage(this.canvas, 0, 0);
  }

  reset() {
    this.canvas = null;
  }
}

function hexRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", "").padEnd(6, "0").slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* 256 colours from the background through the theme colours */
function makeLut(colors: string[], bg: string): Uint8ClampedArray {
  const stops = [bg, ...[...colors].reverse()].map(hexRgb);
  const lut = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = (i / 255) * (stops.length - 1);
    const a = Math.floor(t), b = Math.min(stops.length - 1, a + 1), f = t - a;
    for (let c = 0; c < 3; c++) lut[i * 4 + c] = stops[a][c] + (stops[b][c] - stops[a][c]) * f;
    lut[i * 4 + 3] = 255;
  }
  return lut;
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  freq: Uint8Array,
  wave: Uint8Array,
  s: Scene,
  spectrogram: Spectrogram,
  live: boolean,
) {
  const { width: w, height: h } = ctx.canvas;
  const unit = Math.min(w, h) / 20;

  if (s.style === "spectrogram") {
    spectrogram.draw(ctx, w, h, freq, s, live);
    labels(ctx, w, h, s);
    return;
  }

  background(ctx, w, h, s);
  ctx.fillStyle = gradient(ctx, s.colors, 0, 0, w, 0);
  ctx.strokeStyle = ctx.fillStyle;

  if (s.style === "bars" || s.style === "mirror") {
    const count = w > h ? 72 : 48;
    const values = bands(freq, s.sampleRate, count, s.sensitivity);
    const margin = unit * 1.5;
    const slot = (w - margin * 2) / count;
    const bw = slot * 0.7;
    if (s.style === "bars") {
      const base = h - margin;
      const maxH = h * 0.62;
      values.forEach((v, i) => {
        const bh = Math.max(3, v * maxH);
        roundedBar(ctx, margin + i * slot + (slot - bw) / 2, base - bh, bw, bh);
      });
    } else {
      const mid = h * 0.58;
      const maxH = h * 0.3;
      values.forEach((v, i) => {
        const bh = Math.max(2, v * maxH);
        roundedBar(ctx, margin + i * slot + (slot - bw) / 2, mid - bh, bw, bh * 2);
      });
    }
  } else if (s.style === "wave") {
    const mid = h * 0.58;
    const amp = h * 0.3 * s.sensitivity;
    ctx.lineWidth = Math.max(2, unit / 5);
    ctx.lineJoin = "round";
    ctx.shadowColor = s.colors[1] ?? s.colors[0];
    ctx.shadowBlur = unit / 2;
    ctx.beginPath();
    const n = wave.length;
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * w;
      const y = mid + Math.max(-1, Math.min(1, (wave[i] - 128) / 128 * s.sensitivity)) * (amp / s.sensitivity);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  } else if (s.style === "circle") {
    const cx = w / 2, cy = h * 0.46;
    const radius = Math.min(w, h) * 0.2;
    const count = 120;
    const values = bands(freq, s.sampleRate, count / 2, s.sensitivity);
    const bass = values.slice(0, 6).reduce((a, b) => a + b, 0) / 6;
    const r = radius * (1 + bass * 0.12);
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(2, (2 * Math.PI * r) / count * 0.55);
    ctx.strokeStyle = gradient(ctx, s.colors, cx - r * 2, cy - r * 2, cx + r * 2, cy + r * 2);
    for (let i = 0; i < count; i++) {
      // Mirrored left and right, lows at the top
      const v = values[i < count / 2 ? i : count - 1 - i];
      const a = (i / count) * Math.PI * 2 - Math.PI / 2;
      const len = 4 + v * radius * 0.9;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.lineTo(cx + Math.cos(a) * (r + len), cy + Math.sin(a) * (r + len));
      ctx.stroke();
    }
    ctx.fillStyle = s.image ? "rgba(255,255,255,0.12)" : gradient(ctx, s.colors, cx - r, cy - r, cx + r, cy + r);
    ctx.globalAlpha = s.image ? 1 : 0.25 + bass * 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  labels(ctx, w, h, s);
}
