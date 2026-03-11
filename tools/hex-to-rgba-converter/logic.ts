import { RGBAColor, HSLAColor, ColorShade, OpacityStep } from "./types";

// Validate HEX color
export function isValidHex(hex: string): boolean {
  const cleaned = hex.replace('#', '');
  return /^[0-9A-F]{3}$|^[0-9A-F]{6}$|^[0-9A-F]{8}$/i.test(cleaned);
}

// Convert HEX to RGBA
export function hexToRgba(hex: string, alpha: number = 1): RGBAColor | null {
  if (!isValidHex(hex)) return null;
  
  let h = hex.replace('#', '');
  
  // Convert 3-digit to 6-digit
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  
  // Extract alpha from 8-digit hex
  if (h.length === 8) {
    alpha = parseInt(h.substring(6, 8), 16) / 255;
    h = h.substring(0, 6);
  }
  
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  
  return { r, g, b, a: alpha };
}

// Convert RGBA to HEX
export function rgbaToHex(rgba: RGBAColor, includeAlpha: boolean = false): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  const hex = '#' + toHex(rgba.r) + toHex(rgba.g) + toHex(rgba.b);
  
  if (includeAlpha && rgba.a < 1) {
    return hex + toHex(rgba.a * 255);
  }
  
  return hex.toUpperCase();
}

// Convert RGBA to HSLA
export function rgbaToHsla(rgba: RGBAColor): HSLAColor {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
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
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: rgba.a
  };
}

// Format RGBA string
export function formatRgba(rgba: RGBAColor): string {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

// Format RGB string
export function formatRgb(rgba: RGBAColor): string {
  return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
}

// Format HSLA string
export function formatHsla(hsla: HSLAColor): string {
  return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
}

// Generate lighter/darker shades
export function generateShades(rgba: RGBAColor): ColorShade[] {
  const shades: ColorShade[] = [];
  const percentages = [20, 10, -10, -20];
  const labels = ['20% Lighter', '10% Lighter', '10% Darker', '20% Darker'];
  
  percentages.forEach((percent, i) => {
    const factor = 1 + (percent / 100);
    const newRgba: RGBAColor = {
      r: Math.max(0, Math.min(255, Math.round(rgba.r * factor))),
      g: Math.max(0, Math.min(255, Math.round(rgba.g * factor))),
      b: Math.max(0, Math.min(255, Math.round(rgba.b * factor))),
      a: rgba.a
    };
    
    shades.push({
      label: labels[i],
      rgba: newRgba,
      hex: rgbaToHex(newRgba)
    });
  });
  
  return shades;
}

// Generate opacity steps
export function generateOpacitySteps(rgba: RGBAColor): OpacityStep[] {
  const steps: OpacityStep[] = [];
  
  for (let i = 10; i >= 0; i--) {
    const alpha = i / 10;
    steps.push({
      alpha,
      rgba: formatRgba({ ...rgba, a: alpha })
    });
  }
  
  return steps;
}

// Generate transparent gradient
export function generateTransparentGradient(rgba: RGBAColor): string {
  const solid = formatRgba({ ...rgba, a: 1 });
  const transparent = formatRgba({ ...rgba, a: 0 });
  return `linear-gradient(to right, ${solid}, ${transparent})`;
}

// Generate CSS utility classes
export function generateCssUtilities(rgba: RGBAColor, name: string = 'primary'): string {
  const steps = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  let css = '';
  
  steps.forEach(step => {
    const alpha = step / 100;
    const colorValue = formatRgba({ ...rgba, a: alpha });
    css += `.bg-${name}-${step} { background: ${colorValue}; }\n`;
    css += `.text-${name}-${step} { color: ${colorValue}; }\n`;
    css += `.border-${name}-${step} { border-color: ${colorValue}; }\n\n`;
  });
  
  return css;
}

// Check if color is too transparent
export function isLowOpacity(alpha: number): boolean {
  return alpha < 0.1;
}

// Calculate contrast ratio (simplified)
export function getContrastWarning(rgba: RGBAColor): string | null {
  const luminance = (0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b) / 255;
  
  if (rgba.a < 0.5) {
    return 'Low opacity may affect readability';
  }
  
  if (luminance < 0.2) {
    return 'Dark color - ensure sufficient contrast with background';
  }
  
  if (luminance > 0.8) {
    return 'Light color - ensure sufficient contrast with background';
  }
  
  return null;
}

// Local storage helpers
const STORAGE_KEY = 'hex-to-rgba-last-color';

export function saveLastColor(hex: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, hex);
  }
}

export function loadLastColor(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY);
  }
  return null;
}
