import { FaviconOptions, FaviconSize } from "./types";

// 180 = Apple touch icon; 192 and 512 = Android / web app manifest icons
export const STANDARD_SIZES = [16, 32, 48, 64, 128, 180, 192, 256, 512];

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
  link.download = filename || (favicon.size === 180 ? "apple-touch-icon.png" : `favicon-${favicon.size}x${favicon.size}.png`);
  link.click();
}

export function downloadAllFavicons(favicons: FaviconSize[]): void {
  favicons.forEach(favicon => {
    setTimeout(() => downloadFavicon(favicon), 100);
  });
}

/*
 * A real multi-size favicon.ico: an ICONDIR header, one 16-byte entry per
 * image, then each image stored as PNG (valid in ICO files since Windows
 * Vista and read by every current browser). Sizes above 256 cannot go in.
 */
export function buildIco(favicons: FaviconSize[]): Blob {
  const images = favicons
    .filter((f) => f.size <= 256)
    .sort((a, b) => a.size - b.size)
    .map((f) => ({ size: f.size, bytes: Uint8Array.from(atob(f.base64), (c) => c.charCodeAt(0)) }));
  const headerSize = 6 + images.length * 16;
  const total = headerSize + images.reduce((n, img) => n + img.bytes.length, 0);
  const buffer = new ArrayBuffer(total);
  const view = new DataView(buffer);
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, images.length, true);
  let offset = headerSize;
  images.forEach((img, i) => {
    const entry = 6 + i * 16;
    view.setUint8(entry, img.size >= 256 ? 0 : img.size); // width (0 means 256)
    view.setUint8(entry + 1, img.size >= 256 ? 0 : img.size); // height
    view.setUint8(entry + 2, 0); // palette colors
    view.setUint8(entry + 3, 0); // reserved
    view.setUint16(entry + 4, 1, true); // color planes
    view.setUint16(entry + 6, 32, true); // bits per pixel
    view.setUint32(entry + 8, img.bytes.length, true);
    view.setUint32(entry + 12, offset, true);
    new Uint8Array(buffer, offset, img.bytes.length).set(img.bytes);
    offset += img.bytes.length;
  });
  return new Blob([buffer], { type: "image/x-icon" });
}

/* favicon.ico with the classic 16, 32 and 48 px sizes (whichever were made). */
export function downloadIco(favicons: FaviconSize[]): boolean {
  const icoSizes = favicons.filter((f) => [16, 32, 48].includes(f.size));
  const chosen = icoSizes.length ? icoSizes : favicons.filter((f) => f.size <= 256).slice(0, 1);
  if (!chosen.length) return false;
  const url = URL.createObjectURL(buildIco(chosen));
  const a = document.createElement("a");
  a.href = url;
  a.download = "favicon.ico";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
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
  const lines = ['<link rel="icon" href="/favicon.ico" sizes="any">'];
  for (const favicon of favicons) {
    if (favicon.size === 180) {
      lines.push('<link rel="apple-touch-icon" href="/apple-touch-icon.png">');
    } else {
      lines.push(`<link rel="icon" type="image/png" sizes="${favicon.size}x${favicon.size}" href="/favicon-${favicon.size}x${favicon.size}.png">`);
    }
  }
  return lines.join('\n');
}
