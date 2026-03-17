export type WorkerMessage = {
  id: string;
  file: File;
  settings: {
    width: number;
    height: number;
    quality: number;
    format: 'jpeg' | 'png' | 'webp';
  };
};

export type WorkerResponse = {
  id: string;
  blob: Blob;
  width: number;
  height: number;
} | {
  id: string;
  error: string;
};

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { id, file, settings } = e.data;

  try {
    const bitmap = await createImageBitmap(file);
    
    const canvas = new OffscreenCanvas(settings.width, settings.height);
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Failed to get canvas context');

    if (settings.format === 'png') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, settings.width, settings.height);

    const mimeType = `image/${settings.format === 'jpeg' ? 'jpeg' : settings.format}`;
    const quality = settings.format === 'png' ? undefined : settings.quality / 100;
    
    const blob = await canvas.convertToBlob({ type: mimeType, quality });
    
    bitmap.close();

    self.postMessage({ id, blob, width: settings.width, height: settings.height });
  } catch (error) {
    self.postMessage({ 
      id, 
      error: error instanceof Error ? error.message : 'Resize failed' 
    });
  }
};
