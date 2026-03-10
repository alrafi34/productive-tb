import { ContrastConfig, ContrastResult, ColorFormats, ColorPreset } from "./types";

export type { ContrastConfig, ContrastResult } from "./types";

export const defaultConfig: ContrastConfig = {
  foregroundColor: "#000000",
  backgroundColor: "#ffffff",
  fontSize: 16
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function calculateContrastRatio(foreground: string, background: string): number {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  if (!fgRgb || !bgRgb) return 1;
  
  const fgLuminance = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function evaluateContrast(ratio: number, fontSize: number): ContrastResult {
  const isLargeText = fontSize >= 18 || fontSize >= 14; // Simplified large text check
  
  return {
    ratio,
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5
  };
}

export function getColorFormats(hex: string): ColorFormats {
  const rgb = hexToRgb(hex);
  if (!rgb) return { hex, rgb: "", hsl: "" };
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  };
}

export function suggestAccessibleColor(baseColor: string, targetColor: string, isBackground: boolean = false): string {
  const baseRgb = hexToRgb(baseColor);
  const targetRgb = hexToRgb(targetColor);
  
  if (!baseRgb || !targetRgb) return baseColor;
  
  // Simple suggestion: make darker or lighter to meet AA standard
  const currentRatio = calculateContrastRatio(baseColor, targetColor);
  
  if (currentRatio >= 4.5) return baseColor;
  
  // Try making the color darker or lighter
  let adjustedColor = baseColor;
  let bestRatio = currentRatio;
  
  for (let i = 0; i < 255; i += 10) {
    const darkerColor = rgbToHex(
      Math.max(0, baseRgb.r - i),
      Math.max(0, baseRgb.g - i),
      Math.max(0, baseRgb.b - i)
    );
    
    const lighterColor = rgbToHex(
      Math.min(255, baseRgb.r + i),
      Math.min(255, baseRgb.g + i),
      Math.min(255, baseRgb.b + i)
    );
    
    const darkerRatio = isBackground 
      ? calculateContrastRatio(targetColor, darkerColor)
      : calculateContrastRatio(darkerColor, targetColor);
      
    const lighterRatio = isBackground
      ? calculateContrastRatio(targetColor, lighterColor)
      : calculateContrastRatio(lighterColor, targetColor);
    
    if (darkerRatio >= 4.5 && darkerRatio > bestRatio) {
      adjustedColor = darkerColor;
      bestRatio = darkerRatio;
      break;
    }
    
    if (lighterRatio >= 4.5 && lighterRatio > bestRatio) {
      adjustedColor = lighterColor;
      bestRatio = lighterRatio;
      break;
    }
  }
  
  return adjustedColor;
}

export const colorPresets: ColorPreset[] = [
  {
    name: "Black on White",
    foreground: "#000000",
    background: "#ffffff",
    description: "Maximum contrast - AAA compliant"
  },
  {
    name: "White on Black",
    foreground: "#ffffff",
    background: "#000000",
    description: "High contrast dark theme"
  },
  {
    name: "Dark Gray on White",
    foreground: "#333333",
    background: "#ffffff",
    description: "Softer than pure black"
  },
  {
    name: "Blue on White",
    foreground: "#0066cc",
    background: "#ffffff",
    description: "Common link color"
  },
  {
    name: "White on Blue",
    foreground: "#ffffff",
    background: "#0066cc",
    description: "Button or header style"
  },
  {
    name: "Yellow on Black",
    foreground: "#ffff00",
    background: "#000000",
    description: "High visibility warning"
  },
  {
    name: "Green on White",
    foreground: "#008000",
    background: "#ffffff",
    description: "Success message color"
  },
  {
    name: "Red on White",
    foreground: "#cc0000",
    background: "#ffffff",
    description: "Error message color"
  }
];

export function generateAccessibilityReport(config: ContrastConfig, result: ContrastResult): string {
  const fgFormats = getColorFormats(config.foregroundColor);
  const bgFormats = getColorFormats(config.backgroundColor);
  
  return `WCAG Contrast Accessibility Report
=====================================

Colors:
- Foreground: ${fgFormats.hex} (${fgFormats.rgb})
- Background: ${bgFormats.hex} (${bgFormats.rgb})

Contrast Ratio: ${result.ratio.toFixed(2)}:1

WCAG 2.1 Compliance:
- Normal Text AA (4.5:1): ${result.normalAA ? 'PASS' : 'FAIL'}
- Normal Text AAA (7:1): ${result.normalAAA ? 'PASS' : 'FAIL'}
- Large Text AA (3:1): ${result.largeAA ? 'PASS' : 'FAIL'}
- Large Text AAA (4.5:1): ${result.largeAAA ? 'PASS' : 'FAIL'}

Font Size: ${config.fontSize}px
Generated: ${new Date().toLocaleString()}`;
}