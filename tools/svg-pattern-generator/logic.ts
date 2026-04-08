export interface PatternSettings {
  type: 'dots' | 'grid' | 'lines' | 'diagonal' | 'cross';
  size: number;
  spacing: number;
  strokeWidth: number;
  color: string;
  bgColor: string;
  opacity: number;
}

export function generateSVGPattern(settings: PatternSettings): string {
  const { type, size, spacing, strokeWidth, color, bgColor, opacity } = settings;
  const colorWithOpacity = `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;

  let patternContent = '';

  switch (type) {
    case 'dots':
      patternContent = `<circle cx="${spacing / 2}" cy="${spacing / 2}" r="${size / 2}" fill="${colorWithOpacity}" />`;
      break;
    case 'grid':
      patternContent = `<path d="M ${spacing} 0 L 0 0 0 ${spacing}" fill="none" stroke="${colorWithOpacity}" stroke-width="${strokeWidth}" />`;
      break;
    case 'lines':
      patternContent = `<line x1="0" y1="0" x2="0" y2="${spacing}" stroke="${colorWithOpacity}" stroke-width="${strokeWidth}" />`;
      break;
    case 'diagonal':
      patternContent = `<line x1="0" y1="0" x2="${spacing}" y2="${spacing}" stroke="${colorWithOpacity}" stroke-width="${strokeWidth}" />`;
      break;
    case 'cross':
      patternContent = `<line x1="0" y1="${spacing / 2}" x2="${spacing}" y2="${spacing / 2}" stroke="${colorWithOpacity}" stroke-width="${strokeWidth}" />
      <line x1="${spacing / 2}" y1="0" x2="${spacing / 2}" y2="${spacing}" stroke="${colorWithOpacity}" stroke-width="${strokeWidth}" />`;
      break;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${spacing}" height="${spacing}" viewBox="0 0 ${spacing} ${spacing}">
  <rect width="${spacing}" height="${spacing}" fill="${bgColor}" />
  ${patternContent}
</svg>`;
}

export function generateCSSBackground(svg: string): string {
  const encoded = encodeURIComponent(svg);
  return `background-image: url("data:image/svg+xml,${encoded}");
background-repeat: repeat;`;
}

export function downloadSVG(svg: string, filename: string = 'pattern.svg'): void {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function copySVGToClipboard(svg: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(svg);
    return true;
  } catch {
    return false;
  }
}

export async function copyCSSToClipboard(css: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(css);
    return true;
  } catch {
    return false;
  }
}

export function generateRandomPattern(): PatternSettings {
  const types: PatternSettings['type'][] = ['dots', 'grid', 'lines', 'diagonal', 'cross'];
  const colors = ['#000000', '#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33', '#FF8C33', '#33FFF5'];
  
  return {
    type: types[Math.floor(Math.random() * types.length)],
    size: Math.floor(Math.random() * 20) + 4,
    spacing: Math.floor(Math.random() * 40) + 10,
    strokeWidth: Math.floor(Math.random() * 5) + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    bgColor: '#ffffff',
    opacity: 1
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
