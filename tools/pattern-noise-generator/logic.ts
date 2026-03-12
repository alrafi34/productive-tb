import { NoiseSettings, PreviewSettings, ExportSettings, PatternType, ColorMode, NoisePreset, GeneratedTexture, NoiseHistory } from './types';

// Noise generation presets
export const NOISE_PRESETS: NoisePreset[] = [
  {
    name: 'Subtle UI Grain',
    description: 'Light grain for modern UI backgrounds',
    settings: {
      intensity: 15,
      grainSize: 1,
      opacity: 0.05,
      contrast: 30,
      colorMode: 'white',
      patternType: 'static-grain'
    }
  },
  {
    name: 'Film Grain',
    description: 'Classic film texture effect',
    settings: {
      intensity: 45,
      grainSize: 2,
      opacity: 0.12,
      contrast: 60,
      colorMode: 'black',
      patternType: 'film-grain'
    }
  },
  {
    name: 'Glassmorphism',
    description: 'Perfect for glass effect backgrounds',
    settings: {
      intensity: 25,
      grainSize: 1,
      opacity: 0.08,
      contrast: 40,
      colorMode: 'white',
      patternType: 'speckle'
    }
  },
  {
    name: 'Dust Texture',
    description: 'Organic dust particle effect',
    settings: {
      intensity: 35,
      grainSize: 3,
      opacity: 0.15,
      contrast: 50,
      colorMode: 'multi-color',
      patternType: 'dust'
    }
  },
  {
    name: 'Perlin Noise',
    description: 'Smooth organic noise pattern',
    settings: {
      intensity: 40,
      grainSize: 4,
      opacity: 0.10,
      contrast: 45,
      colorMode: 'custom',
      patternType: 'perlin'
    }
  },
  {
    name: 'Dark Mode Grain',
    description: 'Optimized for dark UI themes',
    settings: {
      intensity: 20,
      grainSize: 1,
      opacity: 0.06,
      contrast: 35,
      colorMode: 'white',
      patternType: 'static-grain'
    }
  }
];

// Default settings
export const DEFAULT_NOISE_SETTINGS: NoiseSettings = {
  intensity: 30,
  grainSize: 2,
  opacity: 0.08,
  contrast: 50,
  resolution: 256,
  patternType: 'static-grain',
  colorMode: 'white',
  customColor: '#ffffff',
  seamless: true,
  animated: false,
  animationSpeed: 1
};

export const DEFAULT_PREVIEW_SETTINGS: PreviewSettings = {
  zoom: 1,
  backgroundColor: '#f8f9fa',
  overlayMode: true,
  backgroundType: 'light'
};

// Noise generation algorithms
export class NoiseGenerator {
  private static seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  static generateStaticGrain(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * settings.intensity / 100;
      const value = this.getColorValue(noise, settings);
      
      data[i] = value.r;     // Red
      data[i + 1] = value.g; // Green
      data[i + 2] = value.b; // Blue
      data[i + 3] = Math.floor(noise * 255 * settings.opacity); // Alpha
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static generateFilmGrain(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let y = 0; y < canvas.height; y += settings.grainSize) {
      for (let x = 0; x < canvas.width; x += settings.grainSize) {
        const noise = (Math.random() - 0.5) * 2 * settings.intensity / 100;
        const value = this.getColorValue(Math.abs(noise), settings);
        
        for (let dy = 0; dy < settings.grainSize && y + dy < canvas.height; dy++) {
          for (let dx = 0; dx < settings.grainSize && x + dx < canvas.width; dx++) {
            const index = ((y + dy) * canvas.width + (x + dx)) * 4;
            data[index] = value.r;
            data[index + 1] = value.g;
            data[index + 2] = value.b;
            data[index + 3] = Math.floor(Math.abs(noise) * 255 * settings.opacity);
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static generateSpeckle(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numSpeckles = (canvas.width * canvas.height * settings.intensity) / 10000;
    
    for (let i = 0; i < numSpeckles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * settings.grainSize + 0.5;
      const opacity = Math.random() * settings.opacity;
      
      const color = this.getColorValue(Math.random(), settings);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  static generateDust(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numParticles = (canvas.width * canvas.height * settings.intensity) / 8000;
    
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * settings.grainSize * 2 + 1;
      const opacity = Math.random() * settings.opacity * 0.8;
      
      const color = this.getColorValue(Math.random(), settings);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  static generatePerlin(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    const scale = settings.grainSize * 0.01;
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const noise = this.perlinNoise(x * scale, y * scale) * settings.intensity / 100;
        const value = this.getColorValue(Math.abs(noise), settings);
        const index = (y * canvas.width + x) * 4;
        
        data[index] = value.r;
        data[index + 1] = value.g;
        data[index + 2] = value.b;
        data[index + 3] = Math.floor(Math.abs(noise) * 255 * settings.opacity);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private static perlinNoise(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    
    const u = this.fade(xf);
    const v = this.fade(yf);
    
    const aa = this.seededRandom(xi + yi * 256);
    const ab = this.seededRandom(xi + (yi + 1) * 256);
    const ba = this.seededRandom((xi + 1) + yi * 256);
    const bb = this.seededRandom((xi + 1) + (yi + 1) * 256);
    
    const x1 = this.lerp(aa, ba, u);
    const x2 = this.lerp(ab, bb, u);
    
    return this.lerp(x1, x2, v);
  }

  private static fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private static lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private static getColorValue(noise: number, settings: NoiseSettings): { r: number; g: number; b: number } {
    const intensity = Math.floor(noise * 255 * settings.contrast / 100);
    
    switch (settings.colorMode) {
      case 'white':
        return { r: 255, g: 255, b: 255 };
      case 'black':
        return { r: 0, g: 0, b: 0 };
      case 'custom':
        const hex = settings.customColor.replace('#', '');
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16)
        };
      case 'multi-color':
        return {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255)
        };
      default:
        return { r: intensity, g: intensity, b: intensity };
    }
  }

  static generateNoise(canvas: HTMLCanvasElement, settings: NoiseSettings): void {
    canvas.width = settings.resolution;
    canvas.height = settings.resolution;

    switch (settings.patternType) {
      case 'static-grain':
        this.generateStaticGrain(canvas, settings);
        break;
      case 'film-grain':
        this.generateFilmGrain(canvas, settings);
        break;
      case 'speckle':
        this.generateSpeckle(canvas, settings);
        break;
      case 'dust':
        this.generateDust(canvas, settings);
        break;
      case 'perlin':
        this.generatePerlin(canvas, settings);
        break;
    }

    if (settings.seamless) {
      this.makeSeamless(canvas);
    }
  }

  private static makeSeamless(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Blend edges for seamless tiling
    const blendSize = Math.min(width, height) * 0.1;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < blendSize; x++) {
        const leftIndex = (y * width + x) * 4;
        const rightIndex = (y * width + (width - blendSize + x)) * 4;
        const blend = x / blendSize;
        
        for (let c = 0; c < 4; c++) {
          const blended = data[leftIndex + c] * (1 - blend) + data[rightIndex + c] * blend;
          data[leftIndex + c] = blended;
          data[rightIndex + c] = blended;
        }
      }
    }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < blendSize; y++) {
        const topIndex = (y * width + x) * 4;
        const bottomIndex = ((height - blendSize + y) * width + x) * 4;
        const blend = y / blendSize;
        
        for (let c = 0; c < 4; c++) {
          const blended = data[topIndex + c] * (1 - blend) + data[bottomIndex + c] * blend;
          data[topIndex + c] = blended;
          data[bottomIndex + c] = blended;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

// Export functions
export function generateCSS(settings: NoiseSettings, dataUrl: string, exportSettings: ExportSettings): string {
  const css = `background-image: url("${dataUrl}");
background-size: ${exportSettings.backgroundSize}px;
background-repeat: repeat;
opacity: ${exportSettings.cssOpacity};
mix-blend-mode: ${settings.colorMode === 'black' ? 'multiply' : 'screen'};`;

  return css;
}

export function generateSVGPattern(settings: NoiseSettings): string {
  const svg = `<svg width="${settings.resolution}" height="${settings.resolution}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="noise">
      <feTurbulence baseFrequency="${settings.grainSize * 0.01}" numOctaves="1" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="discrete" tableValues="0 ${settings.opacity}"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" filter="url(#noise)" fill="${settings.customColor}"/>
</svg>`;

  return svg;
}

export function downloadFile(content: string | Blob, filename: string, mimeType: string): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

// History management
export function saveToHistory(settings: NoiseSettings, canvas: HTMLCanvasElement): void {
  if (typeof window === 'undefined') return;

  const history = getHistory();
  const thumbnail = canvas.toDataURL('image/png', 0.1);
  
  const entry: NoiseHistory = {
    id: Date.now().toString(),
    name: `${settings.patternType} - ${new Date().toLocaleTimeString()}`,
    settings,
    timestamp: Date.now(),
    thumbnail
  };

  history.unshift(entry);
  const limitedHistory = history.slice(0, 20);
  
  localStorage.setItem('noise-generator-history', JSON.stringify(limitedHistory));
}

export function getHistory(): NoiseHistory[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('noise-generator-history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('noise-generator-history');
}

// Animation utilities
export function createAnimationFrames(canvas: HTMLCanvasElement, settings: NoiseSettings, frameCount: number = 8): HTMLCanvasElement[] {
  const frames: HTMLCanvasElement[] = [];
  
  for (let i = 0; i < frameCount; i++) {
    const frameCanvas = document.createElement('canvas');
    const animatedSettings = { ...settings };
    
    // Vary settings slightly for each frame
    animatedSettings.intensity += (Math.random() - 0.5) * 10;
    animatedSettings.grainSize += (Math.random() - 0.5) * 0.5;
    
    NoiseGenerator.generateNoise(frameCanvas, animatedSettings);
    frames.push(frameCanvas);
  }
  
  return frames;
}