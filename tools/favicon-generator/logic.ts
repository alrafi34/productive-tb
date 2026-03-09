import { FaviconOptions, FaviconSize } from "./types";

export const STANDARD_SIZES = [16, 32, 48, 64, 128, 192, 256];

export async function generateFavicon(
  file: File,
  size: number,
  options: FaviconOptions
): Promise<FaviconSize> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        canvas.width = size;
        canvas.height = size;

        // Fill background
        if (options.backgroundColor && options.backgroundColor !== 'transparent') {
          ctx.fillStyle = options.backgroundColor;
          ctx.fillRect(0, 0, size, size);
        }

        // Calculate dimensions with padding
        const padding = options.padding;
        const availableSize = size - (padding * 2);

        let drawWidth = availableSize;
        let drawHeight = availableSize;
        let offsetX = padding;
        let offsetY = padding;

        if (options.maintainAspectRatio) {
          const aspectRatio = img.width / img.height;
          if (aspectRatio > 1) {
            drawHeight = availableSize / aspectRatio;
            offsetY = padding + (availableSize - drawHeight) / 2;
          } else {
            drawWidth = availableSize * aspectRatio;
            offsetX = padding + (availableSize - drawWidth) / 2;
          }
        }

        // Draw image
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];

        resolve({
          size,
          label: `${size}×${size}`,
          dataUrl,
          base64,
        });
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function generateMultipleFavicons(
  file: File,
  sizes: number[],
  options: FaviconOptions
): Promise<FaviconSize[]> {
  const promises = sizes.map(size => generateFavicon(file, size, options));
  return Promise.all(promises);
}

export function downloadFavicon(favicon: FaviconSize, filename?: string): void {
  const link = document.createElement('a');
  link.href = favicon.dataUrl;
  link.download = filename || `favicon-${favicon.size}x${favicon.size}.png`;
  link.click();
}

export function downloadAllFavicons(favicons: FaviconSize[]): void {
  favicons.forEach(favicon => {
    setTimeout(() => downloadFavicon(favicon), 100);
  });
}

export async function generateICO(favicons: FaviconSize[]): Promise<string> {
  // Simple ICO generation for modern browsers
  // Note: This creates a basic ICO with the largest size
  const largest = favicons.reduce((prev, current) => 
    current.size > prev.size ? current : prev
  );
  return largest.dataUrl;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateHTMLSnippet(favicons: FaviconSize[]): string {
  return favicons.map(favicon => {
    if (favicon.size === 16 || favicon.size === 32) {
      return `<link rel="icon" type="image/png" sizes="${favicon.size}x${favicon.size}" href="/favicon-${favicon.size}x${favicon.size}.png">`;
    }
    return `<link rel="icon" type="image/png" sizes="${favicon.size}x${favicon.size}" href="/favicon-${favicon.size}x${favicon.size}.png">`;
  }).join('\n');
}
