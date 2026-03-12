import { AspectRatio, Dimensions, Preset, ImageInfo, CSSOutput, ConversionResult } from './types';

// Calculate Greatest Common Divisor
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Simplify aspect ratio
export function simplifyRatio(width: number, height: number): string {
  if (!width || !height || width <= 0 || height <= 0) return '';
  
  const divisor = gcd(Math.round(width), Math.round(height));
  const simplifiedWidth = Math.round(width / divisor);
  const simplifiedHeight = Math.round(height / divisor);
  
  return `${simplifiedWidth}:${simplifiedHeight}`;
}

// Parse aspect ratio string (e.g., "16:9" or "16/9")
export function parseRatio(ratio: string): { width: number; height: number } | null {
  const cleaned = ratio.trim().replace(/\s+/g, '');
  const separators = [':', '/', 'x', 'X', '×'];
  
  for (const sep of separators) {
    if (cleaned.includes(sep)) {
      const parts = cleaned.split(sep);
      if (parts.length === 2) {
        const w = parseFloat(parts[0]);
        const h = parseFloat(parts[1]);
        if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
          return { width: w, height: h };
        }
      }
    }
  }
  
  return null;
}

// Calculate height from width and ratio
export function calculateHeight(width: number, ratioWidth: number, ratioHeight: number): number {
  if (!width || !ratioWidth || !ratioHeight) return 0;
  return Math.round((width * ratioHeight) / ratioWidth);
}

// Calculate width from height and ratio
export function calculateWidth(height: number, ratioWidth: number, ratioHeight: number): number {
  if (!height || !ratioWidth || !ratioHeight) return 0;
  return Math.round((height * ratioWidth) / ratioHeight);
}

// Preset aspect ratios
export const PRESETS: Preset[] = [
  {
    id: 'square',
    label: '1:1',
    ratio: '1:1',
    width: 1,
    height: 1,
    description: 'Square (Instagram)',
    icon: '⬛'
  },
  {
    id: 'classic',
    label: '4:3',
    ratio: '4:3',
    width: 4,
    height: 3,
    description: 'Classic TV',
    icon: '📺'
  },
  {
    id: 'hd',
    label: '16:9',
    ratio: '16:9',
    width: 16,
    height: 9,
    description: 'HD Video',
    icon: '🎬'
  },
  {
    id: 'ultrawide',
    label: '21:9',
    ratio: '21:9',
    width: 21,
    height: 9,
    description: 'Ultrawide',
    icon: '🖥️'
  },
  {
    id: 'photo',
    label: '3:2',
    ratio: '3:2',
    width: 3,
    height: 2,
    description: 'Photography',
    icon: '📷'
  },
  {
    id: 'vertical',
    label: '9:16',
    ratio: '9:16',
    width: 9,
    height: 16,
    description: 'Vertical Video',
    icon: '📱'
  },
  {
    id: 'cinema',
    label: '2.39:1',
    ratio: '2.39:1',
    width: 239,
    height: 100,
    description: 'Cinema',
    icon: '🎥'
  },
  {
    id: 'golden',
    label: '1.618:1',
    ratio: '1.618:1',
    width: 1618,
    height: 1000,
    description: 'Golden Ratio',
    icon: '✨'
  }
];

// Generate CSS aspect ratio code
export function generateCSS(ratioWidth: number, ratioHeight: number): CSSOutput {
  const paddingPercent = ((ratioHeight / ratioWidth) * 100).toFixed(2);
  
  return {
    aspectRatio: `aspect-ratio: ${ratioWidth} / ${ratioHeight};`,
    paddingTop: `padding-top: ${paddingPercent}%;`,
    container: `.container {
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
  width: 100%;
  overflow: hidden;
}`
  };
}

// Process uploaded image
export function processImage(file: File): Promise<ImageInfo> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const ratio = `${width}:${height}`;
        const simplified = simplifyRatio(width, height);
        
        resolve({
          width,
          height,
          ratio,
          simplified,
          url: e.target?.result as string,
          fileName: file.name,
          fileSize: file.size
        });
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Convert resolution to different aspect ratio
export function convertResolution(
  originalWidth: number,
  originalHeight: number,
  targetRatioWidth: number,
  targetRatioHeight: number,
  method: 'fit-width' | 'fit-height' = 'fit-width'
): ConversionResult {
  let newWidth: number;
  let newHeight: number;
  
  if (method === 'fit-width') {
    // Keep width, adjust height
    newWidth = originalWidth;
    newHeight = calculateHeight(originalWidth, targetRatioWidth, targetRatioHeight);
  } else {
    // Keep height, adjust width
    newHeight = originalHeight;
    newWidth = calculateWidth(originalHeight, targetRatioWidth, targetRatioHeight);
  }
  
  return {
    originalWidth,
    originalHeight,
    originalRatio: simplifyRatio(originalWidth, originalHeight),
    newWidth,
    newHeight,
    newRatio: simplifyRatio(newWidth, newHeight),
    method
  };
}

// Export functions
export function exportAsJSON(data: any): void {
  const content = JSON.stringify(data, null, 2);
  downloadFile(content, `aspect-ratio-${Date.now()}.json`, 'application/json');
}

export function exportAsText(data: any): void {
  const content = `Width: ${data.width}px
Height: ${data.height}px
Aspect Ratio: ${data.ratio}
Simplified: ${data.simplified || data.ratio}`;
  
  downloadFile(content, `dimensions-${Date.now()}.txt`, 'text/plain');
}

function downloadFile(content: string, filename: string, type: string): void {
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

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Common resolutions
export const COMMON_RESOLUTIONS = [
  { label: '720p HD', width: 1280, height: 720 },
  { label: '1080p Full HD', width: 1920, height: 1080 },
  { label: '1440p 2K', width: 2560, height: 1440 },
  { label: '4K UHD', width: 3840, height: 2160 },
  { label: '8K UHD', width: 7680, height: 4320 },
  { label: 'iPhone 14', width: 1170, height: 2532 },
  { label: 'iPad Pro', width: 2048, height: 2732 }
];
