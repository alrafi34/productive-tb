export interface ExifRemovalOptions {
  outputFormat: 'jpeg' | 'png' | 'webp';
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  compress: boolean;
}

export interface ProcessedImage {
  id: string;
  name: string;
  originalUrl: string;
  cleanUrl: string;
  originalSize: number;
  cleanSize: number;
  width: number;
  height: number;
  hadExif: boolean;
}
