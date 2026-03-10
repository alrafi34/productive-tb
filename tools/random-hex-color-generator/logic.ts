import { ColorData, ColorFormats, GradientData } from './types';

// Generate random hex color
export const generateRandomHex = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

// Convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
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
};

// Generate complete color data
export const generateColorData = (id: string, hex?: string): ColorData => {
  const colorHex = hex || generateRandomHex();
  const rgb = hexToRgb(colorHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    id,
    hex: colorHex,
    rgb,
    hsl,
    locked: false
  };
};

// Get color formats for display
export const getColorFormats = (color: ColorData): ColorFormats => ({
  hex: color.hex,
  rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
  hsl: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
});

// Check if color is light (for text contrast)
export const isLightColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
};

// Generate random gradient
export const generateRandomGradient = (): GradientData => {
  const color1 = generateRandomHex();
  const color2 = generateRandomHex();
  const direction = Math.floor(Math.random() * 360);
  
  return {
    id: `gradient-${Date.now()}`,
    css: `linear-gradient(${direction}deg, ${color1}, ${color2})`,
    colors: [color1, color2],
    direction
  };
};

// Export functions
export const exportAsCSS = (colors: ColorData[]): string => {
  return `:root {
${colors.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}
}`;
};

export const exportAsSCSS = (colors: ColorData[]): string => {
  return colors.map((color, index) => `$color-${index + 1}: ${color.hex};`).join('\n');
};

export const exportAsJSON = (colors: ColorData[]): string => {
  const colorObj = colors.reduce((acc, color, index) => {
    acc[`color${index + 1}`] = {
      hex: color.hex,
      rgb: color.rgb,
      hsl: color.hsl
    };
    return acc;
  }, {} as any);
  
  return JSON.stringify(colorObj, null, 2);
};

export const exportAsTailwind = (colors: ColorData[]): string => {
  const colorNames = ['primary', 'secondary', 'accent', 'neutral', 'base'];
  return `module.exports = {
  theme: {
    extend: {
      colors: {
${colors.map((color, index) => `        '${colorNames[index] || `color-${index + 1}`}': '${color.hex}',`).join('\n')}
      }
    }
  }
}`;
};

// LocalStorage helpers
export const saveToHistory = (colors: ColorData[]): void => {
  try {
    const history = getHistory();
    const newColors = colors.map(c => c.hex);
    const updatedHistory = [...newColors, ...history.filter(h => !newColors.includes(h))].slice(0, 20);
    localStorage.setItem('color-generator-history', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

export const getHistory = (): string[] => {
  try {
    const history = localStorage.getItem('color-generator-history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};