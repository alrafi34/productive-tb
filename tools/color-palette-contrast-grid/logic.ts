import { PaletteColor, ContrastResult, ColorPalette } from './types';

export const defaultPalette: PaletteColor[] = [
  { id: '1', hex: '#000000', name: 'Black' },
  { id: '2', hex: '#ffffff', name: 'White' },
  { id: '3', hex: '#1a73e8', name: 'Blue' },
  { id: '4', hex: '#fbbc05', name: 'Yellow' },
  { id: '5', hex: '#34a853', name: 'Green' }
];

export const palettePresets: ColorPalette[] = [
  {
    id: 'material',
    name: 'Material Design',
    colors: [
      { id: '1', hex: '#1976d2', name: 'Blue' },
      { id: '2', hex: '#388e3c', name: 'Green' },
      { id: '3', hex: '#f57c00', name: 'Orange' },
      { id: '4', hex: '#d32f2f', name: 'Red' },
      { id: '5', hex: '#7b1fa2', name: 'Purple' },
      { id: '6', hex: '#ffffff', name: 'White' },
      { id: '7', hex: '#000000', name: 'Black' }
    ]
  },
  {
    id: 'tailwind',
    name: 'Tailwind Colors',
    colors: [
      { id: '1', hex: '#3b82f6', name: 'Blue-500' },
      { id: '2', hex: '#10b981', name: 'Emerald-500' },
      { id: '3', hex: '#f59e0b', name: 'Amber-500' },
      { id: '4', hex: '#ef4444', name: 'Red-500' },
      { id: '5', hex: '#8b5cf6', name: 'Violet-500' },
      { id: '6', hex: '#f9fafb', name: 'Gray-50' },
      { id: '7', hex: '#111827', name: 'Gray-900' }
    ]
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap Colors',
    colors: [
      { id: '1', hex: '#0d6efd', name: 'Primary' },
      { id: '2', hex: '#198754', name: 'Success' },
      { id: '3', hex: '#ffc107', name: 'Warning' },
      { id: '4', hex: '#dc3545', name: 'Danger' },
      { id: '5', hex: '#6c757d', name: 'Secondary' },
      { id: '6', hex: '#ffffff', name: 'Light' },
      { id: '7', hex: '#212529', name: 'Dark' }
    ]
  }
];

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Calculate relative luminance
export const getLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

// Get WCAG compliance level
export const getWCAGLevel = (ratio: number, isLargeText: boolean = false): 'AAA' | 'AA' | 'AA Large' | 'Fail' => {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3) return 'AA';
    return 'Fail';
  } else {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
  }
};

// Generate all contrast combinations
export const generateContrastGrid = (palette: PaletteColor[], isLargeText: boolean = false): ContrastResult[] => {
  const results: ContrastResult[] = [];
  
  for (const textColor of palette) {
    for (const bgColor of palette) {
      if (textColor.id !== bgColor.id) {
        const ratio = getContrastRatio(textColor.hex, bgColor.hex);
        const wcagLevel = getWCAGLevel(ratio, isLargeText);
        
        results.push({
          textColor: textColor.hex,
          backgroundColor: bgColor.hex,
          ratio,
          wcagLevel,
          normalTextPass: ratio >= 4.5,
          largeTextPass: ratio >= 3
        });
      }
    }
  }
  
  return results;
};

// Sort contrast results
export const sortContrastResults = (results: ContrastResult[], sortBy: string): ContrastResult[] => {
  switch (sortBy) {
    case 'highest':
      return [...results].sort((a, b) => b.ratio - a.ratio);
    case 'lowest':
      return [...results].sort((a, b) => a.ratio - b.ratio);
    case 'accessible':
      return [...results].filter(r => r.normalTextPass || r.largeTextPass);
    case 'fail':
      return [...results].filter(r => r.wcagLevel === 'Fail');
    default:
      return results;
  }
};

// Filter contrast results
export const filterContrastResults = (results: ContrastResult[], filterBy: string): ContrastResult[] => {
  switch (filterBy) {
    case 'aaa':
      return results.filter(r => r.wcagLevel === 'AAA');
    case 'aa':
      return results.filter(r => ['AAA', 'AA'].includes(r.wcagLevel));
    case 'accessible':
      return results.filter(r => r.normalTextPass || r.largeTextPass);
    case 'fail':
      return results.filter(r => r.wcagLevel === 'Fail');
    default:
      return results;
  }
};

// Generate CSS for color pair
export const generateColorPairCSS = (textColor: string, backgroundColor: string): string => {
  return `.color-combination {
  color: ${textColor};
  background-color: ${backgroundColor};
}`;
};

// Generate CSS variables
export const generateCSSVariables = (palette: PaletteColor[]): string => {
  const variables = palette.map((color, index) => 
    `  --color-${index + 1}: ${color.hex};${color.name ? ` /* ${color.name} */` : ''}`
  ).join('\n');
  
  return `:root {\n${variables}\n}`;
};

// Generate SCSS variables
export const generateSCSSVariables = (palette: PaletteColor[]): string => {
  return palette.map((color, index) => 
    `$color-${index + 1}: ${color.hex};${color.name ? ` // ${color.name}` : ''}`
  ).join('\n');
};

// Generate random palette
export const generateRandomPalette = (count: number = 5): PaletteColor[] => {
  const colors: PaletteColor[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
    const lightness = Math.floor(Math.random() * 60) + 20; // 20-80%
    
    // Convert HSL to HEX (simplified)
    const hex = hslToHex(hue, saturation, lightness);
    
    colors.push({
      id: `random-${i}`,
      hex,
      name: `Color ${i + 1}`
    });
  }
  
  return colors;
};

// Simple HSL to HEX conversion
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};