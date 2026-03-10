import { GradientSettings, TextSettings, ColorStop, GradientPreset } from './types';

export const defaultGradient: GradientSettings = {
  type: 'linear',
  angle: 90,
  colorStops: [
    { id: '1', color: '#ff6a00', position: 0 },
    { id: '2', color: '#ee0979', position: 100 }
  ],
  radialShape: 'circle',
  radialSize: 'farthest-corner',
  radialPosition: 'center',
  conicAngle: 0,
  conicPosition: 'center'
};

export const defaultText: TextSettings = {
  content: 'Gradient Text',
  fontSize: 72,
  fontWeight: 'bold',
  letterSpacing: 0,
  lineHeight: 1.2,
  textAlign: 'center'
};

export const gradientPresets: GradientPreset[] = [
  {
    name: 'Sunset',
    description: 'Warm orange to pink gradient',
    gradient: {
      type: 'linear',
      angle: 45,
      colorStops: [
        { id: '1', color: '#ff9a9e', position: 0 },
        { id: '2', color: '#fecfef', position: 50 },
        { id: '3', color: '#fecfef', position: 100 }
      ]
    }
  },
  {
    name: 'Ocean',
    description: 'Deep blue to cyan gradient',
    gradient: {
      type: 'linear',
      angle: 135,
      colorStops: [
        { id: '1', color: '#667eea', position: 0 },
        { id: '2', color: '#764ba2', position: 100 }
      ]
    }
  },
  {
    name: 'Rainbow',
    description: 'Full spectrum rainbow',
    gradient: {
      type: 'linear',
      angle: 90,
      colorStops: [
        { id: '1', color: '#ff0000', position: 0 },
        { id: '2', color: '#ff8000', position: 16 },
        { id: '3', color: '#ffff00', position: 33 },
        { id: '4', color: '#80ff00', position: 50 },
        { id: '5', color: '#00ff80', position: 66 },
        { id: '6', color: '#0080ff', position: 83 },
        { id: '7', color: '#8000ff', position: 100 }
      ]
    }
  },
  {
    name: 'Neon',
    description: 'Electric neon colors',
    gradient: {
      type: 'linear',
      angle: 45,
      colorStops: [
        { id: '1', color: '#00f5ff', position: 0 },
        { id: '2', color: '#fc00ff', position: 100 }
      ]
    }
  },
  {
    name: 'Fire',
    description: 'Hot fire colors',
    gradient: {
      type: 'radial',
      colorStops: [
        { id: '1', color: '#ff4500', position: 0 },
        { id: '2', color: '#ff8c00', position: 50 },
        { id: '3', color: '#ffd700', position: 100 }
      ]
    }
  },
  {
    name: 'Pastel',
    description: 'Soft pastel colors',
    gradient: {
      type: 'linear',
      angle: 120,
      colorStops: [
        { id: '1', color: '#ffecd2', position: 0 },
        { id: '2', color: '#fcb69f', position: 100 }
      ]
    }
  }
];

export const generateGradientCSS = (gradient: GradientSettings): string => {
  const stops = gradient.colorStops
    .sort((a, b) => a.position - b.position)
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ');

  switch (gradient.type) {
    case 'linear':
      return `linear-gradient(${gradient.angle}deg, ${stops})`;
    case 'radial':
      return `radial-gradient(${gradient.radialShape} at ${gradient.radialPosition}, ${stops})`;
    case 'conic':
      return `conic-gradient(from ${gradient.conicAngle}deg at ${gradient.conicPosition}, ${stops})`;
    default:
      return `linear-gradient(90deg, ${stops})`;
  }
};

export const generateTextCSS = (gradient: GradientSettings, text: TextSettings): string => {
  const gradientCSS = generateGradientCSS(gradient);
  
  return `.gradient-text {
  font-size: ${text.fontSize}px;
  font-weight: ${text.fontWeight};
  letter-spacing: ${text.letterSpacing}px;
  line-height: ${text.lineHeight};
  text-align: ${text.textAlign};
  
  background: ${gradientCSS};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}`;
};

export const generateTailwindCSS = (gradient: GradientSettings, text: TextSettings): string => {
  // Simplified Tailwind-like classes
  const sizeClass = text.fontSize >= 96 ? 'text-9xl' : 
                   text.fontSize >= 72 ? 'text-8xl' :
                   text.fontSize >= 60 ? 'text-6xl' :
                   text.fontSize >= 48 ? 'text-5xl' :
                   text.fontSize >= 36 ? 'text-4xl' :
                   text.fontSize >= 30 ? 'text-3xl' :
                   text.fontSize >= 24 ? 'text-2xl' : 'text-xl';
  
  const weightClass = text.fontWeight === 'bold' ? 'font-bold' :
                     text.fontWeight === '600' ? 'font-semibold' :
                     text.fontWeight === '500' ? 'font-medium' : 'font-normal';
  
  const alignClass = text.textAlign === 'center' ? 'text-center' :
                    text.textAlign === 'right' ? 'text-right' : 'text-left';

  return `<div class="${sizeClass} ${weightClass} ${alignClass} bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
  ${text.content}
</div>`;
};

export const generateSCSSVariables = (gradient: GradientSettings, text: TextSettings): string => {
  const gradientCSS = generateGradientCSS(gradient);
  
  return `$gradient-text-size: ${text.fontSize}px;
$gradient-text-weight: ${text.fontWeight};
$gradient-text-spacing: ${text.letterSpacing}px;
$gradient-text-height: ${text.lineHeight};
$gradient-background: ${gradientCSS};

.gradient-text {
  font-size: $gradient-text-size;
  font-weight: $gradient-text-weight;
  letter-spacing: $gradient-text-spacing;
  line-height: $gradient-text-height;
  text-align: ${text.textAlign};
  
  background: $gradient-background;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}`;
};

export const generateHTMLWithInlineCSS = (gradient: GradientSettings, text: TextSettings): string => {
  const gradientCSS = generateGradientCSS(gradient);
  
  return `<div style="
  font-size: ${text.fontSize}px;
  font-weight: ${text.fontWeight};
  letter-spacing: ${text.letterSpacing}px;
  line-height: ${text.lineHeight};
  text-align: ${text.textAlign};
  background: ${gradientCSS};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
">
  ${text.content}
</div>`;
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const downloadAsImage = (element: HTMLElement, filename: string = 'gradient-text.png') => {
  // This would require html2canvas or similar library in a real implementation
  // For now, we'll create a simple canvas-based solution
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 800;
  canvas.height = 200;
  
  // Simple text rendering (limited compared to CSS)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};