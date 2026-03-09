import { DitheringOptions, ProcessedImage } from "./types";

export async function applyDithering(
  file: File,
  options: DitheringOptions
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
        ctx.drawImage(img, 0, 0, width, height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Convert to grayscale first
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = gray;
        }

        // Apply dithering algorithm
        switch (options.algorithm) {
          case 'floyd-steinberg':
            floydSteinbergDither(data, width, height, options.threshold, options.invert);
            break;
          case 'atkinson':
            atkinsonDither(data, width, height, options.threshold, options.invert);
            break;
          case 'jarvis':
            jarvisDither(data, width, height, options.threshold, options.invert);
            break;
        }

        // Apply pixel size effect
        if (options.pixelSize > 1) {
          applyPixelation(data, width, height, options.pixelSize);
        }

        ctx.putImageData(imageData, 0, 0);
        const ditheredUrl = canvas.toDataURL('image/png');

        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          originalUrl: e.target?.result as string,
          ditheredUrl,
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

function floydSteinbergDither(data: Uint8ClampedArray, width: number, height: number, threshold: number, invert: boolean) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldPixel = data[idx];
      const newPixel = oldPixel < threshold ? (invert ? 255 : 0) : (invert ? 0 : 255);
      const error = oldPixel - newPixel;

      data[idx] = data[idx + 1] = data[idx + 2] = newPixel;

      // Distribute error to neighboring pixels
      distributeError(data, width, height, x + 1, y, error * 7 / 16);
      distributeError(data, width, height, x - 1, y + 1, error * 3 / 16);
      distributeError(data, width, height, x, y + 1, error * 5 / 16);
      distributeError(data, width, height, x + 1, y + 1, error * 1 / 16);
    }
  }
}

function atkinsonDither(data: Uint8ClampedArray, width: number, height: number, threshold: number, invert: boolean) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldPixel = data[idx];
      const newPixel = oldPixel < threshold ? (invert ? 255 : 0) : (invert ? 0 : 255);
      const error = oldPixel - newPixel;

      data[idx] = data[idx + 1] = data[idx + 2] = newPixel;

      // Atkinson dithering pattern
      const errorFraction = error / 8;
      distributeError(data, width, height, x + 1, y, errorFraction);
      distributeError(data, width, height, x + 2, y, errorFraction);
      distributeError(data, width, height, x - 1, y + 1, errorFraction);
      distributeError(data, width, height, x, y + 1, errorFraction);
      distributeError(data, width, height, x + 1, y + 1, errorFraction);
      distributeError(data, width, height, x, y + 2, errorFraction);
    }
  }
}

function jarvisDither(data: Uint8ClampedArray, width: number, height: number, threshold: number, invert: boolean) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldPixel = data[idx];
      const newPixel = oldPixel < threshold ? (invert ? 255 : 0) : (invert ? 0 : 255);
      const error = oldPixel - newPixel;

      data[idx] = data[idx + 1] = data[idx + 2] = newPixel;

      // Jarvis-Judice-Ninke dithering pattern
      distributeError(data, width, height, x + 1, y, error * 7 / 48);
      distributeError(data, width, height, x + 2, y, error * 5 / 48);
      distributeError(data, width, height, x - 2, y + 1, error * 3 / 48);
      distributeError(data, width, height, x - 1, y + 1, error * 5 / 48);
      distributeError(data, width, height, x, y + 1, error * 7 / 48);
      distributeError(data, width, height, x + 1, y + 1, error * 5 / 48);
      distributeError(data, width, height, x + 2, y + 1, error * 3 / 48);
      distributeError(data, width, height, x - 2, y + 2, error * 1 / 48);
      distributeError(data, width, height, x - 1, y + 2, error * 3 / 48);
      distributeError(data, width, height, x, y + 2, error * 5 / 48);
      distributeError(data, width, height, x + 1, y + 2, error * 3 / 48);
      distributeError(data, width, height, x + 2, y + 2, error * 1 / 48);
    }
  }
}

function distributeError(data: Uint8ClampedArray, width: number, height: number, x: number, y: number, error: number) {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    const idx = (y * width + x) * 4;
    data[idx] = data[idx + 1] = data[idx + 2] = Math.max(0, Math.min(255, data[idx] + error));
  }
}

function applyPixelation(data: Uint8ClampedArray, width: number, height: number, pixelSize: number) {
  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const idx = (y * width + x) * 4;
      const color = data[idx];

      // Apply same color to block
      for (let py = 0; py < pixelSize && y + py < height; py++) {
        for (let px = 0; px < pixelSize && x + px < width; px++) {
          const blockIdx = ((y + py) * width + (x + px)) * 4;
          data[blockIdx] = data[blockIdx + 1] = data[blockIdx + 2] = color;
        }
      }
    }
  }
}

export async function applyDitheringToMultiple(
  files: File[],
  options: DitheringOptions
): Promise<ProcessedImage[]> {
  const promises = files.map(file => applyDithering(file, options));
  return Promise.all(promises);
}

export function downloadImage(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace(/\.[^/.]+$/, '') + '-dithered.png';
  link.click();
}

export function downloadAllImages(images: ProcessedImage[]): void {
  images.forEach((image, index) => {
    setTimeout(() => downloadImage(image.ditheredUrl, image.name), index * 100);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
