import { Base64Options, EncodedImage } from "./types";

export async function encodeImageToBase64(
  file: File,
  options: Base64Options
): Promise<EncodedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas context not available');

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

          // Determine output format
          let mimeType = file.type;
          if (options.outputFormat !== 'original') {
            mimeType = `image/${options.outputFormat}`;
          }

          // Convert to base64
          const quality = options.quality / 100;
          let base64 = canvas.toDataURL(mimeType, quality);

          // Add line breaks if requested
          if (options.addLineBreaks) {
            const parts = base64.split(',');
            const data = parts[1];
            const chunked = data.match(/.{1,76}/g)?.join('\n') || data;
            base64 = `${parts[0]},\n${chunked}`;
          }

          const encodedImage: EncodedImage = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            base64,
            size: base64.length,
            originalSize: file.size,
            mimeType,
            preview: base64.split('\n').join(''),
          };

          resolve(encodedImage);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function encodeMultipleImages(
  files: File[],
  options: Base64Options
): Promise<EncodedImage[]> {
  const promises = files.map(file => encodeImageToBase64(file, options));
  return Promise.all(promises);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(text: string, filename: string = 'base64.txt'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadAllAsFile(images: EncodedImage[]): void {
  const content = images.map(img => {
    return `// ${img.name}\n${img.base64}\n\n`;
  }).join('');
  
  downloadAsFile(content, 'all-base64-images.txt');
}
