export type ImageFile = {
  id: string;
  file: File;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  width: number;
  height: number;
  status: 'pending' | 'compressing' | 'completed' | 'error';
  error?: string;
};

export type CompressionSettings = {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  format: 'jpeg' | 'png' | 'webp';
  maintainAspectRatio: boolean;
};

export type CompressionPreset = 'high' | 'balanced' | 'maximum';
