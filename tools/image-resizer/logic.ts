import { ResizeSettings, ResizeStats, ResizePreset } from './types';

export const RESIZE_PRESETS: ResizePreset[] = [
  { name: 'Thumbnail', width: 256, height: 256, description: 'Small thumbnail' },
  { name: 'Small', width: 512, height: 512, description: 'Small image' },
  { name: 'Medium', width: 1024, height: 1024, description: 'Medium size' },
  { name: 'HD', width: 1920, height: 1080, description: 'Full HD' },
  { name: 'Instagram', width: 1080, height: 1080, description: 'Instagram post' },
  { name: 'Facebook', width: 1200, height: 630, description: 'Facebook post' },
];

export function resizeImage(
  file: File,
  settings: ResizeSettings
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        canvas.width = settings.width;
        canvas.height = settings.height;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, settings.width, settings.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, width: settings.width, height: settings.height });
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          `image/${settings.format}`,
          settings.quality / 100
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function calculateAspectRatio(
  originalWidth: number,
  originalHeight: number,
  newWidth?: number,
  newHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  if (newWidth && !newHeight) {
    return { width: newWidth, height: Math.round(newWidth / aspectRatio) };
  }

  if (newHeight && !newWidth) {
    return { width: Math.round(newHeight * aspectRatio), height: newHeight };
  }

  return { width: newWidth || originalWidth, height: newHeight || originalHeight };
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function calculateStats(originalSize: number, resizedSize: number): ResizeStats {
  const savings = originalSize - resizedSize;
  const savingsPercent = (savings / originalSize) * 100;

  return {
    originalSize,
    resizedSize,
    savings,
    savingsPercent,
  };
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

export function resizeByPercentage(
  originalWidth: number,
  originalHeight: number,
  percentage: number
): { width: number; height: number } {
  return {
    width: Math.round(originalWidth * (percentage / 100)),
    height: Math.round(originalHeight * (percentage / 100)),
  };
}
