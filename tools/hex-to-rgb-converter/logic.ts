export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.trim().replace(/^#/, '');
  // #RGB and #RGBA shorthand double each digit; any alpha digits are ignored here
  if (cleanHex.length === 3 || cleanHex.length === 4) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length === 8) cleanHex = cleanHex.slice(0, 6);
  if (!/^[0-9A-F]{6}$/i.test(cleanHex)) return null;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('').toUpperCase();
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

export function generatePalette(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const { r, g, b } = rgb;
  return {
    lighter: rgbToHex(Math.min(r + 40, 255), Math.min(g + 40, 255), Math.min(b + 40, 255)),
    light: rgbToHex(Math.min(r + 20, 255), Math.min(g + 20, 255), Math.min(b + 20, 255)),
    base: hex.toUpperCase(),
    dark: rgbToHex(Math.max(r - 20, 0), Math.max(g - 20, 0), Math.max(b - 20, 0)),
    darker: rgbToHex(Math.max(r - 40, 0), Math.max(g - 40, 0), Math.max(b - 40, 0)),
    complementary: rgbToHex(255 - r, 255 - g, 255 - b),
  };
}

/** True when the HEX code carries an alpha channel (#RGBA or #RRGGBBAA) */
export function hexHasAlpha(hex: string): boolean {
  const h = hex.trim().replace(/^#/, '');
  return /^([0-9A-F]{4}|[0-9A-F]{8})$/i.test(h);
}

/**
 * Reads an RGB triple typed as "255, 87, 51", "255 87 51", "rgb(255, 87, 51)"
 * or "rgb(255 87 51)". Values must be whole numbers from 0 to 255.
 */
export function parseRgb(text: string): { r: number; g: number; b: number } | null {
  const m = text.trim().match(/^(?:rgba?\s*\()?\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*\)?$/i);
  if (!m) return null;
  const [r, g, b] = [m[1], m[2], m[3]].map(Number);
  if ([r, g, b].some(v => v > 255)) return null;
  return { r, g, b };
}

export interface HexStep {
  channel: 'Red' | 'Green' | 'Blue';
  pair: string;   // e.g. "FF"
  high: number;   // first digit's value (0–15)
  low: number;    // second digit's value (0–15)
  value: number;  // high × 16 + low
}

/** The per-channel working for HEX → RGB: FF = 15 × 16 + 15 = 255 */
export function hexSteps(r: number, g: number, b: number): HexStep[] {
  const channels: [HexStep['channel'], number][] = [['Red', r], ['Green', g], ['Blue', b]];
  return channels.map(([channel, value]) => ({
    channel,
    pair: value.toString(16).padStart(2, '0').toUpperCase(),
    high: Math.floor(value / 16),
    low: value % 16,
    value,
  }));
}

/** 0–1 floats as used by Unity, SwiftUI, OpenGL and shader code */
export function rgbToUnit(r: number, g: number, b: number): string {
  const f = (v: number) => Number((v / 255).toFixed(3)).toString();
  return `${f(r)}, ${f(g)}, ${f(b)}`;
}
