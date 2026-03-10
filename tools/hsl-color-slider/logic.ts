import { HSLColor, ColorFormats, ColorPalette, PaletteType } from './types';

export const hslToHex = (h: number, s: number, l: number): string => {
  const sNorm = s / 100;
  const lNorm = l / 100;
  
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

export const hslToRgb = (h: number, s: number, l: number): string => {
  const hex = hslToHex(h, s, l);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export const formatHSL = (color: HSLColor): string => {
  return `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)`;
};

export const getColorFormats = (color: HSLColor): ColorFormats => ({
  hsl: formatHSL(color),
  hex: hslToHex(color.h, color.s, color.l),
  rgb: hslToRgb(color.h, color.s, color.l)
});

export const generateRandomColor = (): HSLColor => ({
  h: Math.floor(Math.random() * 360),
  s: Math.floor(Math.random() * 101),
  l: Math.floor(Math.random() * 101)
});

export const getComplementaryColor = (color: HSLColor): HSLColor => ({
  ...color,
  h: (color.h + 180) % 360
});

export const generatePalette = (baseColor: HSLColor, type: PaletteType): ColorPalette => {
  const colors: HSLColor[] = [baseColor];
  
  switch (type) {
    case 'analogous':
      colors.push(
        { ...baseColor, h: (baseColor.h + 30) % 360 },
        { ...baseColor, h: (baseColor.h - 30 + 360) % 360 }
      );
      break;
    case 'triadic':
      colors.push(
        { ...baseColor, h: (baseColor.h + 120) % 360 },
        { ...baseColor, h: (baseColor.h + 240) % 360 }
      );
      break;
    case 'tetradic':
      colors.push(
        { ...baseColor, h: (baseColor.h + 90) % 360 },
        { ...baseColor, h: (baseColor.h + 180) % 360 },
        { ...baseColor, h: (baseColor.h + 270) % 360 }
      );
      break;
    case 'monochromatic':
      colors.push(
        { ...baseColor, l: Math.max(10, baseColor.l - 20) },
        { ...baseColor, l: Math.min(90, baseColor.l + 20) },
        { ...baseColor, s: Math.max(10, baseColor.s - 30) }
      );
      break;
    case 'complementary':
      colors.push(getComplementaryColor(baseColor));
      break;
  }
  
  return {
    name: type.charAt(0).toUpperCase() + type.slice(1),
    colors
  };
};

export const exportColorData = (color: HSLColor, palette?: ColorPalette) => {
  const formats = getColorFormats(color);
  return {
    color: formats,
    palette: palette?.colors.map(c => getColorFormats(c)),
    timestamp: new Date().toISOString()
  };
};