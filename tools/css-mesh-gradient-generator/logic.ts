import { GradientPoint, MeshGradientConfig, MeshPreset } from './types';

export const defaultMeshConfig: Omit<MeshGradientConfig, 'canvasWidth' | 'canvasHeight'> = {
  points: [
    { id: '1', color: '#FF6B6B', x: 20, y: 30, size: 300, blur: 120, opacity: 0.8 },
    { id: '2', color: '#4ECDC4', x: 70, y: 60, size: 250, blur: 100, opacity: 0.7 },
    { id: '3', color: '#FFE66D', x: 40, y: 80, size: 200, blur: 80, opacity: 0.6 }
  ],
  backgroundColor: '#0f172a',
  noiseIntensity: 0
};

export const meshPresets: MeshPreset[] = [
  {
    name: 'Aurora',
    description: 'Northern lights inspired gradient',
    config: {
      points: [
        { id: '1', color: '#00ff87', x: 15, y: 25, size: 400, blur: 150, opacity: 0.7 },
        { id: '2', color: '#60efff', x: 75, y: 40, size: 350, blur: 120, opacity: 0.6 },
        { id: '3', color: '#0061ff', x: 45, y: 75, size: 300, blur: 100, opacity: 0.8 }
      ],
      backgroundColor: '#0a0a0a',
      noiseIntensity: 15
    }
  },
  {
    name: 'Sunset',
    description: 'Warm sunset colors',
    config: {
      points: [
        { id: '1', color: '#ff9a56', x: 25, y: 20, size: 450, blur: 180, opacity: 0.9 },
        { id: '2', color: '#ff6b9d', x: 70, y: 50, size: 300, blur: 120, opacity: 0.7 },
        { id: '3', color: '#c44569', x: 50, y: 85, size: 250, blur: 90, opacity: 0.6 }
      ],
      backgroundColor: '#2c1810',
      noiseIntensity: 10
    }
  },
  {
    name: 'Ocean',
    description: 'Deep ocean blues and teals',
    config: {
      points: [
        { id: '1', color: '#0077be', x: 30, y: 35, size: 380, blur: 140, opacity: 0.8 },
        { id: '2', color: '#00a8cc', x: 65, y: 65, size: 320, blur: 110, opacity: 0.7 },
        { id: '3', color: '#40e0d0', x: 20, y: 75, size: 280, blur: 95, opacity: 0.6 }
      ],
      backgroundColor: '#001122',
      noiseIntensity: 8
    }
  },
  {
    name: 'Purple Dream',
    description: 'Dreamy purple and pink tones',
    config: {
      points: [
        { id: '1', color: '#8b5cf6', x: 40, y: 25, size: 350, blur: 130, opacity: 0.8 },
        { id: '2', color: '#ec4899', x: 75, y: 55, size: 300, blur: 110, opacity: 0.7 },
        { id: '3', color: '#f97316', x: 25, y: 80, size: 250, blur: 85, opacity: 0.6 }
      ],
      backgroundColor: '#1a0b2e',
      noiseIntensity: 12
    }
  },
  {
    name: 'Neon Glow',
    description: 'Electric neon colors',
    config: {
      points: [
        { id: '1', color: '#00ff41', x: 20, y: 30, size: 300, blur: 100, opacity: 0.9 },
        { id: '2', color: '#ff0080', x: 80, y: 45, size: 280, blur: 90, opacity: 0.8 },
        { id: '3', color: '#0080ff', x: 50, y: 75, size: 260, blur: 80, opacity: 0.7 }
      ],
      backgroundColor: '#000000',
      noiseIntensity: 20
    }
  },
  {
    name: 'Pastel Sky',
    description: 'Soft pastel colors',
    config: {
      points: [
        { id: '1', color: '#ffeaa7', x: 35, y: 20, size: 400, blur: 160, opacity: 0.6 },
        { id: '2', color: '#fab1a0', x: 70, y: 50, size: 350, blur: 140, opacity: 0.5 },
        { id: '3', color: '#fd79a8', x: 30, y: 80, size: 300, blur: 120, opacity: 0.4 }
      ],
      backgroundColor: '#f8f9fa',
      noiseIntensity: 5
    }
  }
];

export const generateMeshCSS = (config: MeshGradientConfig): string => {
  const gradients = config.points.map(point => {
    const hexOpacity = Math.round(point.opacity * 255).toString(16).padStart(2, '0');
    const colorWithOpacity = `${point.color}${hexOpacity}`;
    const blurPercent = Math.min(50, point.blur / 10); // Convert blur to percentage
    return `radial-gradient(circle at ${point.x}% ${point.y}%, ${colorWithOpacity} 0%, transparent ${blurPercent}%)`;
  });

  let css = `background: ${config.backgroundColor};`;
  css += `\nbackground-image: ${gradients.join(',\n  ')};`;
  
  if (config.noiseIntensity > 0) {
    const noiseOpacity = (config.noiseIntensity / 100).toFixed(2);
    css += `\nbackground-blend-mode: overlay;`;
    css += `\nfilter: contrast(1.1) brightness(1.1);`;
  }

  return css;
};

export const generateSCSSVariables = (config: MeshGradientConfig): string => {
  let scss = `$mesh-background-color: ${config.backgroundColor};\n`;
  scss += `$mesh-noise-intensity: ${config.noiseIntensity}%;\n\n`;
  
  config.points.forEach((point, index) => {
    scss += `$mesh-point-${index + 1}-color: ${point.color};\n`;
    scss += `$mesh-point-${index + 1}-position: ${point.x}% ${point.y}%;\n`;
    scss += `$mesh-point-${index + 1}-size: ${point.blur}px;\n`;
    scss += `$mesh-point-${index + 1}-opacity: ${point.opacity};\n\n`;
  });

  scss += `.mesh-gradient {\n  ${generateMeshCSS(config).replace(/\n/g, '\n  ')}\n}`;
  
  return scss;
};

export const generateSVG = (config: MeshGradientConfig): string => {
  const { canvasWidth, canvasHeight } = config;
  
  let svg = `<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>`;
  
  config.points.forEach((point, index) => {
    const cx = (point.x / 100) * canvasWidth;
    const cy = (point.y / 100) * canvasHeight;
    const r = point.size;
    
    svg += `<radialGradient id="grad${index}" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse">`;
    svg += `<stop offset="0%" style="stop-color:${point.color};stop-opacity:${point.opacity}" />`;
    svg += `<stop offset="100%" style="stop-color:${point.color};stop-opacity:0" />`;
    svg += `</radialGradient>`;
  });
  
  svg += `</defs>`;
  svg += `<rect width="100%" height="100%" fill="${config.backgroundColor}" />`;
  
  config.points.forEach((point, index) => {
    svg += `<rect width="100%" height="100%" fill="url(#grad${index})" />`;
  });
  
  svg += `</svg>`;
  
  return svg;
};

export const generateRandomMesh = (): GradientPoint[] => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  
  const pointCount = Math.floor(Math.random() * 4) + 3; // 3-6 points
  const points: GradientPoint[] = [];
  
  for (let i = 0; i < pointCount; i++) {
    points.push({
      id: `random-${i}`,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
      size: Math.random() * 200 + 200, // 200-400px
      blur: Math.random() * 100 + 80, // 80-180px
      opacity: Math.random() * 0.4 + 0.5 // 0.5-0.9
    });
  }
  
  return points;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};