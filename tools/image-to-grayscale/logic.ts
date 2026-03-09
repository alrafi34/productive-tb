import { GrayscaleOptions, ProcessedImage } from "./types";

export async function convertToGrayscale(
  file: File,
  options: GrayscaleOptions
): Promise<ProcessedImage> {
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

        let width = img.width;
        let height = img.height;

        // Resize if needed
        if (options.maxWidth && width > options.maxWidth) {
          height = (height * options.maxWidth) / width;
          width = options.maxWidth;
        }
        if (options.maxHeight && height > options.maxHeight) {
          width = (width * options.maxHeight) / height;
          height = options.maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw original image
        ctx.drawImage(img, 0, 0, width, height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Apply grayscale filter
        const intensity = options.intensity / 100;
        const brightness = options.brightness;
        const contrast = (options.contrast + 100) / 100;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate grayscale using luminosity method
          let gray = 0.299 * r + 0.587 * g + 0.114 * b;

          // Apply intensity (blend with original)
          const finalR = r * (1 - intensity) + gray * intensity;
          const finalG = g * (1 - intensity) + gray * intensity;
          const finalB = b * (1 - intensity) + gray * intensity;

          // Apply brightness and contrast
          let adjustedR = ((finalR - 128) * contrast + 128) + brightness;
          let adjustedG = ((finalG - 128) * contrast + 128) + brightness;
          let adjustedB = ((finalB - 128) * contrast + 128) + brightness;

          // Invert if needed
          if (options.invert) {
            adjustedR = 255 - adjustedR;
            adjustedG = 255 - adjustedG;
            adjustedB = 255 - adjustedB;
          }

          // Clamp values
          data[i] = Math.max(0, Math.min(255, adjustedR));
          data[i + 1] = Math.max(0, Math.min(255, adjustedG));
          data[i + 2] = Math.max(0, Math.min(255, adjustedB));
        }

        // Put modified image data back
        ctx.putImageData(imageData, 0, 0);

        const grayscaleUrl = canvas.toDataURL('image/png');

        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          originalUrl: e.target?.result as string,
          grayscaleUrl,
          width,
          height,
          size: file.size,
        });
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function convertMultipleToGrayscale(
  files: File[],
  options: GrayscaleOptions
): Promise<ProcessedImage[]> {
  const promises = files.map(file => convertToGrayscale(file, options));
  return Promise.all(promises);
}

export function downloadImage(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace(/\.[^/.]+$/, '') + '-grayscale.png';
  link.click();
}

export function downloadAllImages(images: ProcessedImage[]): void {
  images.forEach((image, index) => {
    setTimeout(() => downloadImage(image.grayscaleUrl, image.name), index * 100);
  });
}

export async function copyImageToClipboard(url: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);
  } catch (error) {
    console.error('Failed to copy image:', error);
    throw error;
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
