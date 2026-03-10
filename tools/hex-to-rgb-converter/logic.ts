export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
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
