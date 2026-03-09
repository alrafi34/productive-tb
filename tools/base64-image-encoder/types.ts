export interface Base64Options {
  maxWidth?: number;
  maxHeight?: number;
  quality: number;
  outputFormat: 'original' | 'png' | 'jpeg' | 'webp';
  addLineBreaks: boolean;
}

export interface EncodedImage {
  id: string;
  name: string;
  base64: string;
  size: number;
  originalSize: number;
  mimeType: string;
  preview: string;
}
