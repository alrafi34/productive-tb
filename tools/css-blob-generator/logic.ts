import { BlobValues, BlobPreset, BlobAnimation, AnimationKeyframe, BlobStyle } from './types';

// Generate border-radius CSS string
export function generateBorderRadius(values: BlobValues): string {
  const horizontal = `${values.topLeftH}% ${values.topRightH}% ${values.bottomRightH}% ${values.bottomLeftH}%`;
  const vertical = `${values.topLeftV}% ${values.topRightV}% ${values.bottomRightV}% ${values.bottomLeftV}%`;
  return `${horizontal} / ${vertical}`;
}

// Generate random blob values
export function generateRandomBlob(): BlobValues {
  return {
    topLeftH: Math.floor(Math.random() * 60) + 20,
    topRightH: Math.floor(Math.random() * 60) + 20,
    bottomRightH: Math.floor(Math.random() * 60) + 20,
    bottomLeftH: Math.floor(Math.random() * 60) + 20,
    topLeftV: Math.floor(Math.random() * 60) + 20,
    topRightV: Math.floor(Math.random() * 60) + 20,
    bottomRightV: Math.floor(Math.random() * 60) + 20,
    bottomLeftV: Math.floor(Math.random() * 60) + 20
  };
}

// Preset blobs
export const BLOB_PRESETS: BlobPreset[] = [
  {
    id: 'soft',
    name: 'Soft Blob',
    description: 'Gentle organic shape',
    icon: '🌊',
    values: {
      topLeftH: 60, topRightH: 40, bottomRightH: 30, bottomLeftH: 70,
      topLeftV: 50, topRightV: 30, bottomRightV: 70, bottomLeftV: 40
    }
  },
  {
    id: 'sharp',
    name: 'Sharp Blob',
    description: 'Angular organic shape',
    icon: '⚡',
    values: {
      topLeftH: 80, topRightH: 20, bottomRightH: 75, bottomLeftH: 25,
      topLeftV: 30, topRightV: 70, bottomRightV: 25, bottomLeftV: 75
    }
  },
  {
    id: 'circle',
    name: 'Circle Blob',
    description: 'Nearly circular',
    icon: '⭕',
    values: {
      topLeftH: 50, topRightH: 50, bottomRightH: 50, bottomLeftH: 50,
      topLeftV: 50, topRightV: 50, bottomRightV: 50, bottomLeftV: 50
    }
  },
  {
    id: 'wave',
    name: 'Wave Blob',
    description: 'Flowing wave shape',
    icon: '🌀',
    values: {
      topLeftH: 40, topRightH: 60, bottomRightH: 40, bottomLeftH: 60,
      topLeftV: 60, topRightV: 40, bottomRightV: 60, bottomLeftV: 40
    }
  },
  {
    id: 'organic',
    name: 'Organic Blob',
    description: 'Natural irregular shape',
    icon: '🍃',
    values: {
      topLeftH: 65, topRightH: 35, bottomRightH: 55, bottomLeftH: 45,
      topLeftV: 42, topRightV: 58, bottomRightV: 48, bottomLeftV: 52
    }
  },
  {
    id: 'drop',
    name: 'Drop Blob',
    description: 'Water drop shape',
    icon: '💧',
    values: {
      topLeftH: 70, topRightH: 30, bottomRightH: 50, bottomLeftH: 50,
      topLeftV: 30, topRightV: 70, bottomRightV: 50, bottomLeftV: 50
    }
  }
];

// Generate blob animation
export function generateBlobAnimation(
  startValues: BlobValues,
  duration: string = '8s'
): BlobAnimation {
  const midValues = generateRandomBlob();
  
  const keyframes: AnimationKeyframe[] = [
    {
      percentage: 0,
      borderRadius: generateBorderRadius(startValues)
    },
    {
      percentage: 50,
      borderRadius: generateBorderRadius(midValues)
    },
    {
      percentage: 100,
      borderRadius: generateBorderRadius(startValues)
    }
  ];

  const css = `@keyframes blob-animation {
  0% {
    border-radius: ${keyframes[0].borderRadius};
  }
  50% {
    border-radius: ${keyframes[1].borderRadius};
  }
  100% {
    border-radius: ${keyframes[2].borderRadius};
  }
}

.blob {
  animation: blob-animation ${duration} ease-in-out infinite;
}`;

  return {
    name: 'blob-animation',
    duration,
    keyframes,
    css
  };
}

// Generate complete CSS
export function generateCompleteCSS(
  values: BlobValues,
  width: string = '400px',
  height: string = '400px',
  background: string = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
): string {
  return `.blob {
  width: ${width};
  height: ${height};
  background: ${background};
  border-radius: ${generateBorderRadius(values)};
}`;
}

// Generate responsive CSS
export function generateResponsiveCSS(values: BlobValues): string {
  return `.blob {
  aspect-ratio: 1;
  width: min(40vw, 400px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${generateBorderRadius(values)};
}`;
}

// Convert blob to SVG path
export function generateSVGPath(values: BlobValues, size: number = 400): string {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;

  // Calculate control points based on border-radius values
  const points = [
    { x: centerX, y: 0 }, // Top
    { x: size, y: centerY }, // Right
    { x: centerX, y: size }, // Bottom
    { x: 0, y: centerY } // Left
  ];

  // Apply border-radius transformations
  const tlh = (values.topLeftH / 100) * radius;
  const trh = (values.topRightH / 100) * radius;
  const brh = (values.bottomRightH / 100) * radius;
  const blh = (values.bottomLeftH / 100) * radius;

  const tlv = (values.topLeftV / 100) * radius;
  const trv = (values.topRightV / 100) * radius;
  const brv = (values.bottomRightV / 100) * radius;
  const blv = (values.bottomLeftV / 100) * radius;

  // Create SVG path using cubic bezier curves
  const path = `M ${centerX},${tlv}
    C ${centerX + trh},${tlv} ${size - trh},${centerY - trv} ${size - trh},${centerY}
    C ${size - trh},${centerY + brv} ${centerX + brh},${size - brv} ${centerX},${size - brv}
    C ${centerX - blh},${size - brv} ${blh},${centerY + blv} ${blh},${centerY}
    C ${blh},${centerY - tlv} ${centerX - tlh},${tlv} ${centerX},${tlv}
    Z`;

  return path;
}

// Generate complete SVG
export function generateSVG(values: BlobValues, size: number = 400): string {
  const path = generateSVGPath(values, size);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="${path}" fill="url(#blob-gradient)" />
</svg>`;
}

// Export functions
export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportSVG(values: BlobValues): void {
  const svg = generateSVG(values);
  downloadFile(svg, `blob-${Date.now()}.svg`, 'image/svg+xml');
}

export function exportCSS(css: string): void {
  downloadFile(css, `blob-${Date.now()}.css`, 'text/css');
}

export function exportJSON(values: BlobValues): void {
  const json = JSON.stringify(values, null, 2);
  downloadFile(json, `blob-values-${Date.now()}.json`, 'application/json');
}

// Gradient presets
export const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
];

// Solid color presets
export const COLOR_PRESETS = [
  '#667eea',
  '#f5576c',
  '#00f2fe',
  '#38f9d7',
  '#fee140',
  '#330867',
  '#fed6e3',
  '#fecfef'
];
