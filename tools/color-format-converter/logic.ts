export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace('#', '');
  if (!/^[0-9A-F]{6}$/i.test(h)) return null;
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

export function cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number } {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

/* HSV (also called HSB): hue, saturation and value/brightness, the model
   used by the colour pickers in Photoshop, Figma and most design apps. */
export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const { h } = rgbToHsl(r, g, b);
  const max = Math.max(r, g, b) / 255, min = Math.min(r, g, b) / 255;
  return { h, s: Math.round(max === 0 ? 0 : ((max - min) / max) * 100), v: Math.round(max * 100) };
}

export type ParsedColor = { r: number; g: number; b: number; a?: number };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// "50%" → 0.5 of `scale`, "128" → 128; NaN when not a number
function num(token: string, scale: number): number {
  const t = token.trim();
  return t.endsWith('%') ? (parseFloat(t) / 100) * scale : parseFloat(t);
}

function alphaOf(token: string | undefined): number | undefined {
  if (token === undefined) return undefined;
  const a = num(token, 1);
  return Number.isFinite(a) ? clamp(a, 0, 1) : undefined;
}

/* Values inside rgb()/hsl()/cmyk(), comma- or space-separated, with an
   optional "/ alpha" as in modern CSS: rgb(255 87 51 / 50%). */
function args(body: string): { parts: string[]; alpha?: string } {
  const [main, alpha] = body.split('/');
  return { parts: main.split(/[\s,]+/).filter(Boolean), alpha: alpha?.trim() };
}

/* Reads #RGB, #RGBA, #RRGGBB and #RRGGBBAA (with or without #), rgb()/rgba(),
   hsl()/hsla() with deg or plain hue, cmyk(), and, in the browser, any CSS
   colour name such as tomato or rebeccapurple. */
export function parseColorInput(raw: string): ParsedColor | null {
  const input = raw.trim().toLowerCase();
  if (!input) return null;

  const hex = input.replace(/^#/, '');
  if (/^([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(hex) && (input.startsWith('#') || /\d/.test(hex) || hex.length >= 6)) {
    const full = hex.length <= 4 ? [...hex].map((c) => c + c).join('') : hex;
    const color: ParsedColor = { r: parseInt(full.slice(0, 2), 16), g: parseInt(full.slice(2, 4), 16), b: parseInt(full.slice(4, 6), 16) };
    if (full.length === 8) color.a = Math.round((parseInt(full.slice(6, 8), 16) / 255) * 100) / 100;
    return color;
  }

  const fn = input.match(/^(rgba?|hsla?|cmyk)\s*\(([^)]*)\)$/);
  if (fn) {
    const { parts, alpha } = args(fn[2]);
    const name = fn[1];
    if (name.startsWith('rgb') && parts.length >= 3) {
      const [r, g, b] = parts.slice(0, 3).map((p) => num(p, 255));
      if ([r, g, b].some((n) => !Number.isFinite(n))) return null;
      const color: ParsedColor = { r: Math.round(clamp(r, 0, 255)), g: Math.round(clamp(g, 0, 255)), b: Math.round(clamp(b, 0, 255)) };
      const a = alphaOf(alpha ?? parts[3]);
      if (a !== undefined) color.a = a;
      return color;
    }
    if (name.startsWith('hsl') && parts.length >= 3) {
      const h = parseFloat(parts[0].replace(/deg$/, ''));
      const s = parseFloat(parts[1]), l = parseFloat(parts[2]);
      if ([h, s, l].some((n) => !Number.isFinite(n))) return null;
      const color: ParsedColor = hslToRgb(((h % 360) + 360) % 360, clamp(s, 0, 100), clamp(l, 0, 100));
      const a = alphaOf(alpha ?? parts[3]);
      if (a !== undefined) color.a = a;
      return color;
    }
    if (name === 'cmyk' && parts.length === 4) {
      const v = parts.map((p) => parseFloat(p));
      if (v.some((n) => !Number.isFinite(n))) return null;
      // Accept 0–100 and 0–1 scales
      const scale = v.every((n) => n <= 1) && parts.every((p) => !p.endsWith('%')) ? 100 : 1;
      const [c, m, y, k] = v.map((n) => clamp(n * scale, 0, 100));
      return cmykToRgb(c, m, y, k);
    }
    return null;
  }

  // CSS colour names, resolved by the browser's own parser
  if (/^[a-z]+$/.test(input) && typeof document !== 'undefined') {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#010203';
    ctx.fillStyle = input;
    const resolved = String(ctx.fillStyle);
    if (resolved === '#010203' && input !== 'black') return null;
    return input === 'transparent' ? { r: 0, g: 0, b: 0, a: 0 } : parseColorInput(resolved);
  }
  return null;
}

export function rgbaToHex8(r: number, g: number, b: number, a: number): string {
  return rgbToHex(r, g, b) + Math.round(clamp(a, 0, 1) * 255).toString(16).padStart(2, '0').toUpperCase();
}
