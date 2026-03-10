export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
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

export function generateAnalogous(baseHex: string): string[] {
  const rgb = hexToRgb(baseHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = hslToRgb((h - 30 + 360) % 360, s, l);
  const hsl2 = hslToRgb((h - 15 + 360) % 360, s, l);
  const hsl3 = hslToRgb((h + 15) % 360, s, l);
  const hsl4 = hslToRgb((h + 30) % 360, s, l);
  return [
    rgbToHex(hsl1.r, hsl1.g, hsl1.b),
    rgbToHex(hsl2.r, hsl2.g, hsl2.b),
    baseHex,
    rgbToHex(hsl3.r, hsl3.g, hsl3.b),
    rgbToHex(hsl4.r, hsl4.g, hsl4.b)
  ];
}

export function generateComplementary(baseHex: string): string[] {
  const rgb = hexToRgb(baseHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = hslToRgb((h + 180) % 360, s, l);
  const hsl2 = hslToRgb(h, s, Math.max(l - 20, 10));
  const hsl3 = hslToRgb((h + 180) % 360, s, Math.max(l - 20, 10));
  const hsl4 = hslToRgb(h, s, Math.min(l + 20, 90));
  return [
    baseHex,
    rgbToHex(hsl1.r, hsl1.g, hsl1.b),
    rgbToHex(hsl2.r, hsl2.g, hsl2.b),
    rgbToHex(hsl3.r, hsl3.g, hsl3.b),
    rgbToHex(hsl4.r, hsl4.g, hsl4.b)
  ];
}

export function generateTriadic(baseHex: string): string[] {
  const rgb = hexToRgb(baseHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = hslToRgb((h + 120) % 360, s, l);
  const hsl2 = hslToRgb((h + 240) % 360, s, l);
  const hsl3 = hslToRgb(h, s, Math.max(l - 15, 10));
  const hsl4 = hslToRgb((h + 120) % 360, s, Math.max(l - 15, 10));
  return [
    baseHex,
    rgbToHex(hsl1.r, hsl1.g, hsl1.b),
    rgbToHex(hsl2.r, hsl2.g, hsl2.b),
    rgbToHex(hsl3.r, hsl3.g, hsl3.b),
    rgbToHex(hsl4.r, hsl4.g, hsl4.b)
  ];
}

export function generateMonochromatic(baseHex: string): string[] {
  const rgb = hexToRgb(baseHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = hslToRgb(h, s, Math.min(l + 30, 90));
  const hsl2 = hslToRgb(h, s, Math.min(l + 15, 85));
  const hsl3 = hslToRgb(h, s, Math.max(l - 15, 15));
  const hsl4 = hslToRgb(h, s, Math.max(l - 30, 10));
  return [
    rgbToHex(hsl1.r, hsl1.g, hsl1.b),
    rgbToHex(hsl2.r, hsl2.g, hsl2.b),
    baseHex,
    rgbToHex(hsl3.r, hsl3.g, hsl3.b),
    rgbToHex(hsl4.r, hsl4.g, hsl4.b)
  ];
}

export function generateTetradic(baseHex: string): string[] {
  const rgb = hexToRgb(baseHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = hslToRgb((h + 90) % 360, s, l);
  const hsl2 = hslToRgb((h + 180) % 360, s, l);
  const hsl3 = hslToRgb((h + 270) % 360, s, l);
  const hsl4 = hslToRgb(h, s, Math.max(l - 15, 10));
  return [
    baseHex,
    rgbToHex(hsl1.r, hsl1.g, hsl1.b),
    rgbToHex(hsl2.r, hsl2.g, hsl2.b),
    rgbToHex(hsl3.r, hsl3.g, hsl3.b),
    rgbToHex(hsl4.r, hsl4.g, hsl4.b)
  ];
}

export function generateRandom(): string[] {
  return Array.from({ length: 5 }, () => rgbToHex(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const rgb = hexToRgb(hex);
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const l1 = getLuminance(hex1), l2 = getLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
