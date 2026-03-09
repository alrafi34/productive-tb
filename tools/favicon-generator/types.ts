export interface FaviconOptions {
  backgroundColor: string;
  padding: number;
  maintainAspectRatio: boolean;
  customSizes: number[];
}

export interface FaviconSize {
  size: number;
  label: string;
  dataUrl: string;
  base64: string;
}

export type FaviconFormat = 'png' | 'ico';
