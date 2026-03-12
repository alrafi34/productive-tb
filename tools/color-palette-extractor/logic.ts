import { ExtractedColor, ColorPalette, PaletteVariation, GradientStyle, ContrastCheck, ExportFormat, PaletteType } from './types';

// Color conversion utilities
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Median Cut Algorithm for color quantization
class ColorBox {
  colors: number[][];
  
  constructor(colors: number[][]) {
    this.colors = colors;
  }

  getVolume(): number {
    const rMin = Math.min(...this.colors.map(c => c[0]));
    const rMax = Math.max(...this.colors.map(c => c[0]));
    const gMin = Math.min(...this.colors.map(c => c[1]));
    const gMax = Math.max(...this.colors.map(c => c[1]));
    const bMin = Math.min(...this.colors.map(c => c[2]));
    const bMax = Math.max(...this.colors.map(c => c[2]));
    
    return (rMax - rMin) * (gMax - gMin) * (bMax - bMin);
  }

  getAverage(): number[] {
    const total = this.colors.length;
    const sum = this.colors.reduce((acc, color) => {
      acc[0] += color[0];
      acc[1] += color[1];
      acc[2] += color[2];
      return acc;
    }, [0, 0, 0]);

    return [
      Math.round(sum[0] / total),
      Math.round(sum[1] / total),
      Math.round(sum[2] / total)
    ];
  }

  split(): [ColorBox, ColorBox] {
    const rRange = Math.max(...this.colors.map(c => c[0])) - Math.min(...this.colors.map(c => c[0]));
    const gRange = Math.max(...this.colors.map(c => c[1])) - Math.min(...this.colors.map(c => c[1]));
    const bRange = Math.max(...this.colors.map(c => c[2])) - Math.min(...this.colors.map(c => c[2]));

    const sortIndex = rRange >= gRange && rRange >= bRange ? 0 : gRange >= bRange ? 1 : 2;
    
    this.colors.sort((a, b) => a[sortIndex] - b[sortIndex]);
    
    const mid = Math.floor(this.colors.length / 2);
    return [
      new ColorBox(this.colors.slice(0, mid)),
      new ColorBox(this.colors.slice(mid))
    ];
  }
}

export function extractDominantColors(imageData: ImageData, numColors: number = 5): ExtractedColor[] {
  const pixels: number[][] = [];
  const data = imageData.data;
  
  // Sample pixels (every 10th pixel for performance)
  for (let i = 0; i < data.length; i += 40) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    pixels.push([r, g, b]);
  }

  if (pixels.length === 0) {
    return [];
  }

  // Median cut algorithm
  let boxes = [new ColorBox(pixels)];
  
  while (boxes.length < numColors) {
    boxes.sort((a, b) => b.getVolume() - a.getVolume());
    const boxToSplit = boxes.shift();
    if (!boxToSplit || boxToSplit.colors.length < 2) break;
    
    const [box1, box2] = boxToSplit.split();
    boxes.push(box1, box2);
  }

  // Get average color from each box
  const dominantColors = boxes.map(box => {
    const [r, g, b] = box.getAverage();
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    const percentage = (box.colors.length / pixels.length) * 100;

    return {
      hex,
      rgb: { r, g, b },
      hsl,
      percentage
    };
  });

  // Sort by percentage
  return dominantColors.sort((a, b) => b.percentage - a.percentage);
}

// Resize image for faster processing
export function resizeImage(img: HTMLImageElement, maxSize: number = 400): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  let width = img.width;
  let height = img.height;
  
  if (width > height) {
    if (width > maxSize) {
      height = (height * maxSize) / width;
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width = (width * maxSize) / height;
      height = maxSize;
    }
  }
  
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  
  return canvas;
}

// Generate palette variations
export function generateLightPalette(colors: ExtractedColor[]): string[] {
  return colors.map(color => {
    const { h, s } = color.hsl;
    const l = Math.min(color.hsl.l + 30, 90);
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

export function generateDarkPalette(colors: ExtractedColor[]): string[] {
  return colors.map(color => {
    const { h, s } = color.hsl;
    const l = Math.max(color.hsl.l - 30, 10);
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

export function generateSaturatedPalette(colors: ExtractedColor[]): string[] {
  return colors.map(color => {
    const { h, l } = color.hsl;
    const s = Math.min(color.hsl.s + 30, 100);
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

export function generateMutedPalette(colors: ExtractedColor[]): string[] {
  return colors.map(color => {
    const { h, l } = color.hsl;
    const s = Math.max(color.hsl.s - 30, 10);
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

// Generate gradients
export function generateGradients(colors: ExtractedColor[]): GradientStyle[] {
  const gradients: GradientStyle[] = [];
  const angles = [135, 90, 180, 45];
  
  for (let i = 0; i < Math.min(colors.length - 1, 4); i++) {
    const color1 = colors[i].hex;
    const color2 = colors[i + 1].hex;
    const angle = angles[i % angles.length];
    
    gradients.push({
      css: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
      angle,
      colors: [color1, color2]
    });
  }
  
  return gradients;
}

// Contrast ratio calculation
export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function checkAccessibility(colors: ExtractedColor[]): ContrastCheck[] {
  const checks: ContrastCheck[] = [];
  
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const ratio = calculateContrastRatio(colors[i].hex, colors[j].hex);
      checks.push({
        color1: colors[i].hex,
        color2: colors[j].hex,
        ratio: Math.round(ratio * 100) / 100,
        wcagAA: ratio >= 4.5,
        wcagAAA: ratio >= 7
      });
    }
  }
  
  return checks.sort((a, b) => b.ratio - a.ratio);
}

// Export functions
export function exportAsCSS(colors: ExtractedColor[]): string {
  let css = ':root {\n';
  colors.forEach((color, index) => {
    css += `  --color-${index + 1}: ${color.hex};\n`;
  });
  css += '}';
  return css;
}

export function exportAsSCSS(colors: ExtractedColor[]): string {
  const names = ['primary', 'secondary', 'accent', 'neutral', 'background'];
  let scss = '';
  colors.forEach((color, index) => {
    const name = names[index] || `color-${index + 1}`;
    scss += `$${name}: ${color.hex};\n`;
  });
  return scss;
}

export function exportAsJSON(colors: ExtractedColor[]): string {
  const palette = {
    colors: colors.map(c => ({
      hex: c.hex,
      rgb: `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`,
      hsl: `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`,
      percentage: Math.round(c.percentage * 10) / 10
    }))
  };
  return JSON.stringify(palette, null, 2);
}

export function exportAsTailwind(colors: ExtractedColor[]): string {
  const names = ['primary', 'secondary', 'accent', 'neutral', 'background'];
  let config = 'module.exports = {\n  theme: {\n    extend: {\n      colors: {\n';
  colors.forEach((color, index) => {
    const name = names[index] || `color-${index + 1}`;
    config += `        '${name}': '${color.hex}',\n`;
  });
  config += '      }\n    }\n  }\n}';
  return config;
}

// Download utilities
export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPaletteImage(colors: ExtractedColor[], width: number = 800, height: number = 400): void {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Draw color blocks
  const blockWidth = width / colors.length;
  colors.forEach((color, index) => {
    ctx.fillStyle = color.hex;
    ctx.fillRect(index * blockWidth, 0, blockWidth, height * 0.7);
    
    // Draw hex value
    ctx.fillStyle = color.hsl.l > 50 ? '#000000' : '#ffffff';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(color.hex, (index + 0.5) * blockWidth, height * 0.85);
  });
  
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'color-palette.png';
      a.click();
      URL.revokeObjectURL(url);
    }
  });
}

// History management
const HISTORY_KEY = 'color-palette-extractor-history';
const MAX_HISTORY = 10;

export function saveToHistory(palette: ColorPalette): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getHistory();
    history.unshift(palette);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): ColorPalette[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}
