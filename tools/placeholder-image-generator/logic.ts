export interface PlaceholderConfig {
  width: number;
  height: number;
  text: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  showBorder: boolean;
}

export const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const generateSVG = (config: PlaceholderConfig): string => {
  const { width, height, text, bgColor, textColor, fontSize, showBorder } = config;
  
  const borderStroke = showBorder ? `<rect width="${width}" height="${height}" fill="none" stroke="${textColor}" stroke-width="2"/>` : '';
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  ${borderStroke}
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" fill="${textColor}" font-weight="500">
    ${text}
  </text>
</svg>`;
};

export const downloadSVG = (svg: string, filename: string) => {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.svg`;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadPNG = (svg: string, filename: string, width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;
  
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}.png`;
    link.click();
  };
  img.src = 'data:image/svg+xml;base64,' + btoa(svg);
};

export const copySVGToClipboard = async (svg: string): Promise<boolean> => {
  try {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/svg+xml': blob })
    ]);
    return true;
  } catch {
    return false;
  }
};

export const copyPNGToClipboard = async (svg: string, width: number, height: number): Promise<boolean> => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return false;
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]).then(() => resolve(true)).catch(() => resolve(false));
          } else {
            resolve(false);
          }
        }, 'image/png');
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svg);
    });
  } catch {
    return false;
  }
};

export const saveToHistory = (config: PlaceholderConfig) => {
  const history = JSON.parse(localStorage.getItem('placeholderHistory') || '[]');
  history.unshift({ ...config, id: Date.now() });
  localStorage.setItem('placeholderHistory', JSON.stringify(history.slice(0, 10)));
};

export const getHistory = (): (PlaceholderConfig & { id: number })[] => {
  return JSON.parse(localStorage.getItem('placeholderHistory') || '[]');
};

export const clearHistory = () => {
  localStorage.removeItem('placeholderHistory');
};

export const COMMON_SIZES = [
  { name: 'Thumbnail', width: 200, height: 200 },
  { name: 'Square', width: 400, height: 400 },
  { name: 'Portrait', width: 400, height: 600 },
  { name: 'Landscape', width: 800, height: 600 },
  { name: 'Social', width: 1200, height: 628 },
  { name: 'Banner', width: 1920, height: 400 },
];

export const validateDimensions = (width: number, height: number): { valid: boolean; message?: string } => {
  if (width < 50 || height < 50) {
    return { valid: false, message: 'Minimum size is 50×50 pixels' };
  }
  if (width > 5000 || height > 5000) {
    return { valid: false, message: 'Maximum size is 5000×5000 pixels' };
  }
  return { valid: true };
};

export const smartFontSize = (width: number, height: number): number => {
  const minDim = Math.min(width, height);
  return Math.max(12, Math.min(72, Math.floor(minDim / 10)));
};
