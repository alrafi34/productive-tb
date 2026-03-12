export interface AspectRatio {
  width: number;
  height: number;
  simplified?: string;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Preset {
  id: string;
  label: string;
  ratio: string;
  width: number;
  height: number;
  description: string;
  icon: string;
}

export interface ImageInfo {
  width: number;
  height: number;
  ratio: string;
  simplified: string;
  url: string;
  fileName: string;
  fileSize: number;
}

export interface CSSOutput {
  aspectRatio: string;
  paddingTop: string;
  container: string;
}

export interface ConversionResult {
  originalWidth: number;
  originalHeight: number;
  originalRatio: string;
  newWidth: number;
  newHeight: number;
  newRatio: string;
  method: 'fit-width' | 'fit-height';
}
