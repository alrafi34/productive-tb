import { GlassLayer, BackgroundScene, GlassPreset, NoiseSettings, ExportFormat } from './types';

// Glass presets
export const GLASS_PRESETS: GlassPreset[] = [
  {
    name: 'Classic Glass',
    description: 'Traditional frosted glass effect',
    settings: {
      blur: 12,
      opacity: 0.15,
      tintColor: '#ffffff',
      borderWidth: 1,
      borderOpacity: 0.25,
      shadowBlur: 32,
      shadowOpacity: 0.2,
      borderRadius: 16
    }
  },
  {
    name: 'Frosted Glass',
    description: 'Heavy blur with subtle tint',
    settings: {
      blur: 20,
      opacity: 0.1,
      tintColor: '#ffffff',
      borderWidth: 1,
      borderOpacity: 0.3,
      shadowBlur: 40,
      shadowOpacity: 0.15,
      borderRadius: 20
    }
  },
  {
    name: 'Dark Glass',
    description: 'Dark mode glassmorphism',
    settings: {
      blur: 16,
      opacity: 0.2,
      tintColor: '#000000',
      borderWidth: 1,
      borderOpacity: 0.2,
      shadowBlur: 24,
      shadowOpacity: 0.4,
      borderRadius: 16
    }
  },
  {
    name: 'Neon Glass',
    description: 'Vibrant colored glass',
    settings: {
      blur: 14,
      opacity: 0.12,
      tintColor: '#8b5cf6',
      borderWidth: 2,
      borderOpacity: 0.4,
      shadowBlur: 36,
      shadowOpacity: 0.3,
      borderRadius: 18
    }
  },
  {
    name: 'Ultra Blur',
    description: 'Maximum blur effect',
    settings: {
      blur: 40,
      opacity: 0.08,
      tintColor: '#ffffff',
      borderWidth: 1,
      borderOpacity: 0.2,
      shadowBlur: 50,
      shadowOpacity: 0.25,
      borderRadius: 24
    }
  },
  {
    name: 'Subtle UI Glass',
    description: 'Minimal glass for UI elements',
    settings: {
      blur: 8,
      opacity: 0.18,
      tintColor: '#ffffff',
      borderWidth: 1,
      borderOpacity: 0.3,
      shadowBlur: 20,
      shadowOpacity: 0.15,
      borderRadius: 12
    }
  }
];

// Background scenes
export const BACKGROUND_SCENES: BackgroundScene[] = [
  {
    id: 'light-gradient',
    name: 'Light Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'dark-gradient',
    name: 'Dark Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: 'colorful-gradient',
    name: 'Colorful Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'blue-gradient',
    name: 'Blue Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'ocean-gradient',
    name: 'Ocean Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)'
  }
];

// Default glass layer
export const DEFAULT_GLASS_LAYER: GlassLayer = {
  id: '1',
  name: 'Glass Layer 1',
  blur: 12,
  opacity: 0.15,
  tintColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#ffffff',
  borderOpacity: 0.25,
  shadowBlur: 32,
  shadowSpread: 0,
  shadowOpacity: 0.2,
  borderRadius: 16,
  width: 400,
  height: 300,
  x: 50,
  y: 50,
  zIndex: 1
};

// Generate CSS for glass layer
export function generateGlassCSS(layer: GlassLayer, includeVendorPrefixes: boolean = true): string {
  const { r, g, b } = hexToRgb(layer.tintColor);
  const { r: br, g: bg, b: bb } = hexToRgb(layer.borderColor);
  
  let css = `.glass-layer {\n`;
  
  if (includeVendorPrefixes) {
    css += `  -webkit-backdrop-filter: blur(${layer.blur}px);\n`;
  }
  css += `  backdrop-filter: blur(${layer.blur}px);\n`;
  css += `  background: rgba(${r}, ${g}, ${b}, ${layer.opacity});\n`;
  css += `  border: ${layer.borderWidth}px solid rgba(${br}, ${bg}, ${bb}, ${layer.borderOpacity});\n`;
  css += `  box-shadow: 0 ${layer.shadowSpread}px ${layer.shadowBlur}px rgba(0, 0, 0, ${layer.shadowOpacity});\n`;
  css += `  border-radius: ${layer.borderRadius}px;\n`;
  css += `}`;
  
  return css;
}

// Generate Tailwind CSS
export function generateTailwindCSS(layer: GlassLayer): string {
  const { r, g, b } = hexToRgb(layer.tintColor);
  
  return `backdrop-blur-${getTailwindBlur(layer.blur)} bg-[rgba(${r},${g},${b},${layer.opacity})] border border-white/[${layer.borderOpacity}] shadow-${getTailwindShadow(layer.shadowBlur)} rounded-${getTailwindRadius(layer.borderRadius)}`;
}

// Generate SCSS
export function generateSCSS(layer: GlassLayer): string {
  const { r, g, b } = hexToRgb(layer.tintColor);
  const { r: br, g: bg, b: bb } = hexToRgb(layer.borderColor);
  
  return `$glass-blur: ${layer.blur}px;
$glass-bg: rgba(${r}, ${g}, ${b}, ${layer.opacity});
$glass-border: ${layer.borderWidth}px solid rgba(${br}, ${bg}, ${bb}, ${layer.borderOpacity});
$glass-shadow: 0 ${layer.shadowSpread}px ${layer.shadowBlur}px rgba(0, 0, 0, ${layer.shadowOpacity});
$glass-radius: ${layer.borderRadius}px;

.glass-layer {
  backdrop-filter: blur($glass-blur);
  -webkit-backdrop-filter: blur($glass-blur);
  background: $glass-bg;
  border: $glass-border;
  box-shadow: $glass-shadow;
  border-radius: $glass-radius;
}`;
}

// Generate JSON config
export function generateJSON(layer: GlassLayer): string {
  return JSON.stringify({
    blur: layer.blur,
    opacity: layer.opacity,
    tintColor: layer.tintColor,
    borderWidth: layer.borderWidth,
    borderColor: layer.borderColor,
    borderOpacity: layer.borderOpacity,
    shadowBlur: layer.shadowBlur,
    shadowSpread: layer.shadowSpread,
    shadowOpacity: layer.shadowOpacity,
    borderRadius: layer.borderRadius
  }, null, 2);
}

// Generate minified CSS
export function generateMinifiedCSS(layer: GlassLayer): string {
  const { r, g, b } = hexToRgb(layer.tintColor);
  const { r: br, g: bg, b: bb } = hexToRgb(layer.borderColor);
  
  return `.glass-layer{backdrop-filter:blur(${layer.blur}px);-webkit-backdrop-filter:blur(${layer.blur}px);background:rgba(${r},${g},${b},${layer.opacity});border:${layer.borderWidth}px solid rgba(${br},${bg},${bb},${layer.borderOpacity});box-shadow:0 ${layer.shadowSpread}px ${layer.shadowBlur}px rgba(0,0,0,${layer.shadowOpacity});border-radius:${layer.borderRadius}px}`;
}

// Generate noise texture
export function generateNoiseTexture(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * settings.intensity;
    data[i] = 255;     // Red
    data[i + 1] = 255; // Green
    data[i + 2] = 255; // Blue
    data[i + 3] = noise * settings.opacity * 255; // Alpha
  }

  ctx.putImageData(imageData, 0, 0);
}

// Helper functions
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

function getTailwindBlur(blur: number): string {
  if (blur <= 4) return 'sm';
  if (blur <= 8) return 'md';
  if (blur <= 12) return 'lg';
  if (blur <= 16) return 'xl';
  if (blur <= 24) return '2xl';
  return '3xl';
}

function getTailwindShadow(blur: number): string {
  if (blur <= 10) return 'sm';
  if (blur <= 20) return 'md';
  if (blur <= 30) return 'lg';
  if (blur <= 40) return 'xl';
  return '2xl';
}

function getTailwindRadius(radius: number): string {
  if (radius <= 4) return 'sm';
  if (radius <= 8) return 'md';
  if (radius <= 12) return 'lg';
  if (radius <= 16) return 'xl';
  if (radius <= 24) return '2xl';
  return '3xl';
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

// Download file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Apply glass style to element
export function applyGlassStyle(element: HTMLElement, layer: GlassLayer): void {
  const { r, g, b } = hexToRgb(layer.tintColor);
  const { r: br, g: bg, b: bb } = hexToRgb(layer.borderColor);
  
  element.style.backdropFilter = `blur(${layer.blur}px)`;
  (element.style as any).webkitBackdropFilter = `blur(${layer.blur}px)`;
  element.style.background = `rgba(${r}, ${g}, ${b}, ${layer.opacity})`;
  element.style.border = `${layer.borderWidth}px solid rgba(${br}, ${bg}, ${bb}, ${layer.borderOpacity})`;
  element.style.boxShadow = `0 ${layer.shadowSpread}px ${layer.shadowBlur}px rgba(0, 0, 0, ${layer.shadowOpacity})`;
  element.style.borderRadius = `${layer.borderRadius}px`;
}
