import { FilterValues, FilterPreset } from './types';

export const defaultFilters: FilterValues = {
  grayscale: 0,
  sepia: 0,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  invert: 0,
  hueRotate: 0,
  opacity: 100
};

export const filterPresets: FilterPreset[] = [
  {
    name: 'Vintage',
    values: { ...defaultFilters, sepia: 50, contrast: 120, brightness: 110, saturate: 80 }
  },
  {
    name: 'Black & White',
    values: { ...defaultFilters, grayscale: 100, contrast: 110 }
  },
  {
    name: 'Warm Tone',
    values: { ...defaultFilters, sepia: 30, brightness: 110, saturate: 120, hueRotate: 15 }
  },
  {
    name: 'Cold Tone',
    values: { ...defaultFilters, brightness: 90, contrast: 110, hueRotate: 200, saturate: 110 }
  },
  {
    name: 'Instagram Style',
    values: { ...defaultFilters, contrast: 130, brightness: 110, saturate: 120, sepia: 20 }
  },
  {
    name: 'Dramatic Contrast',
    values: { ...defaultFilters, contrast: 180, brightness: 120, saturate: 140 }
  },
  {
    name: 'Soft Blur',
    values: { ...defaultFilters, blur: 3, brightness: 105, contrast: 95 }
  }
];

export const generateFilterCSS = (filters: FilterValues): string => {
  const filterParts: string[] = [];
  
  if (filters.grayscale !== 0) filterParts.push(`grayscale(${filters.grayscale}%)`);
  if (filters.sepia !== 0) filterParts.push(`sepia(${filters.sepia}%)`);
  if (filters.blur !== 0) filterParts.push(`blur(${filters.blur}px)`);
  if (filters.brightness !== 100) filterParts.push(`brightness(${filters.brightness}%)`);
  if (filters.contrast !== 100) filterParts.push(`contrast(${filters.contrast}%)`);
  if (filters.saturate !== 100) filterParts.push(`saturate(${filters.saturate}%)`);
  if (filters.invert !== 0) filterParts.push(`invert(${filters.invert}%)`);
  if (filters.hueRotate !== 0) filterParts.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.opacity !== 100) filterParts.push(`opacity(${filters.opacity}%)`);
  
  return filterParts.length > 0 ? `filter: ${filterParts.join(' ')};` : 'filter: none;';
};

export const applyFiltersToImage = (filters: FilterValues): string => {
  const filterParts: string[] = [];
  
  if (filters.grayscale !== 0) filterParts.push(`grayscale(${filters.grayscale}%)`);
  if (filters.sepia !== 0) filterParts.push(`sepia(${filters.sepia}%)`);
  if (filters.blur !== 0) filterParts.push(`blur(${filters.blur}px)`);
  if (filters.brightness !== 100) filterParts.push(`brightness(${filters.brightness}%)`);
  if (filters.contrast !== 100) filterParts.push(`contrast(${filters.contrast}%)`);
  if (filters.saturate !== 100) filterParts.push(`saturate(${filters.saturate}%)`);
  if (filters.invert !== 0) filterParts.push(`invert(${filters.invert}%)`);
  if (filters.hueRotate !== 0) filterParts.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.opacity !== 100) filterParts.push(`opacity(${filters.opacity}%)`);
  
  return filterParts.join(' ');
};

export const downloadFilteredImage = async (imageElement: HTMLImageElement, filters: FilterValues, filename: string = 'filtered-image.png') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;

  ctx.filter = applyFiltersToImage(filters);
  ctx.drawImage(imageElement, 0, 0);

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  });
};

export const loadImageFromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};