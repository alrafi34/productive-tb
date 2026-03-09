export interface ImageFile {
  id: string;
  file: File;
  originalUrl: string;
  resizedUrl: string | null;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  originalSize: number;
  resizedSize: number | null;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
}

export interface ResizePreset {
  name: string;
  width: number;
  height: number;
  description: string;
}

export interface ResizeStats {
  originalSize: number;
  resizedSize: number;
  savings: number;
  savingsPercent: number;
}
