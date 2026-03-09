import { ExifRemovalOptions, ProcessedImage } from "./types";

export async function removeExifData(
  file: File,
  options: ExifRemovalOptions
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

        // Draw image (this strips EXIF data)
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output format and quality
        const mimeType = `image/${options.outputFormat}`;
        const quality = options.compress ? options.quality / 100 : 0.92;

        // Export as new image (without EXIF)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            const cleanUrl = URL.createObjectURL(blob);

            resolve({
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              originalUrl: e.target?.result as string,
              cleanUrl,
              originalSize: file.size,
              cleanSize: blob.size,
              width,
              height,
              hadExif: file.type === 'image/jpeg', // JPEG typically has EXIF
            });
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function removeExifFromMultiple(
  files: File[],
  options: ExifRemovalOptions
): Promise<ProcessedImage[]> {
  const promises = files.map(file => removeExifData(file, options));
  return Promise.all(promises);
}

export function downloadImage(url: string, filename: string, format: string): void {
  const link = document.createElement('a');
  link.href = url;
  const ext = format === 'jpeg' ? 'jpg' : format;
  link.download = filename.replace(/\.[^/.]+$/, '') + `-clean.${ext}`;
  link.click();
}

export function downloadAllImages(images: ProcessedImage[], format: string): void {
  images.forEach((image, index) => {
    setTimeout(() => downloadImage(image.cleanUrl, image.name, format), index * 100);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function calculateSavings(original: number, clean: number): string {
  const savings = ((original - clean) / original) * 100;
  return savings > 0 ? `${savings.toFixed(1)}%` : '0%';
}
