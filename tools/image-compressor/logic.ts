import type { CompressionSettings, ImageFile } from "./types";

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function calculateSavings(original: number, compressed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

export function getPresetSettings(preset: 'high' | 'balanced' | 'maximum'): Partial<CompressionSettings> {
  switch (preset) {
    case 'high':
      return { quality: 90 };
    case 'balanced':
      return { quality: 75 };
    case 'maximum':
      return { quality: 60 };
  }
}

export async function compressImage(
  file: File,
  settings: CompressionSettings
): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  
  let { width, height } = bitmap;

  if (settings.maxWidth && width > settings.maxWidth) {
    height = (height * settings.maxWidth) / width;
    width = settings.maxWidth;
  }
  if (settings.maxHeight && height > settings.maxHeight) {
    width = (width * settings.maxHeight) / height;
    height = settings.maxHeight;
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvas.convertToBlob({
    type: `image/${settings.format}`,
    quality: settings.quality / 100,
  });

  return { blob, width, height };
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
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
