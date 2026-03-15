export type WorkerMessage = {
  id: string;
  file: File;
  settings: {
    quality: number;
    maxWidth: number;
    maxHeight: number;
    format: 'jpeg' | 'png' | 'webp';
    targetSizeKB: number;
  };
  originalSize: number;
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
  const { id, file, settings, originalSize } = e.data;

  try {
    const bitmap = await createImageBitmap(file);
    
    let { width, height } = bitmap;
    let originalWidth = width;
    let originalHeight = height;

    if (settings.maxWidth && width > settings.maxWidth) {
      height = (height * settings.maxWidth) / width;
      width = settings.maxWidth;
    }
    if (settings.maxHeight && height > settings.maxHeight) {
      width = (width * settings.maxHeight) / height;
      height = settings.maxHeight;
    }

    const mimeType = `image/${settings.format === 'jpeg' ? 'jpeg' : settings.format}`;
    
    let blob: Blob;
    
    if (settings.targetSizeKB > 0) {
      const targetBytes = settings.targetSizeKB * 1024;
      
      if (settings.format === 'png') {
        let scale = 1.0;
        let bestBlob: Blob | null = null;
        let bestWidth = width;
        let bestHeight = height;
        
        for (let attempt = 0; attempt < 15; attempt++) {
          const testWidth = Math.round(width * scale);
          const testHeight = Math.round(height * scale);
          
          if (testWidth < 10 || testHeight < 10) break;
          
          const canvas = new OffscreenCanvas(testWidth, testHeight);
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Failed to get canvas context');
          
          ctx.drawImage(bitmap, 0, 0, testWidth, testHeight);
          const testBlob = await canvas.convertToBlob({ type: mimeType });
          
          if (testBlob.size <= targetBytes) {
            bestBlob = testBlob;
            bestWidth = testWidth;
            bestHeight = testHeight;
            break;
          }
          
          scale *= 0.8;
        }
        
        if (!bestBlob || bestBlob.size > targetBytes) {
          throw new Error(`Cannot compress PNG to ${settings.targetSizeKB}KB. Minimum achievable size is larger. Try reducing target size.`);
        }
        
        blob = bestBlob;
        width = bestWidth;
        height = bestHeight;
      } else {
        let minQuality = 0.01;
        let maxQuality = 0.95;
        let quality = 0.5;
        let scale = 1.0;
        let bestBlob: Blob | null = null;
        let bestWidth = width;
        let bestHeight = height;
        
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        ctx.drawImage(bitmap, 0, 0, width, height);
        
        blob = await canvas.convertToBlob({ type: mimeType, quality });
        
        if (blob.size > targetBytes) {
          for (let i = 0; i < 20; i++) {
            quality = (minQuality + maxQuality) / 2;
            const testBlob = await canvas.convertToBlob({ type: mimeType, quality });
            
            if (testBlob.size <= targetBytes) {
              bestBlob = testBlob;
              minQuality = quality;
            } else {
              maxQuality = quality;
            }
            
            if (maxQuality - minQuality < 0.005) break;
          }
          
          if (bestBlob && bestBlob.size <= targetBytes) {
            blob = bestBlob;
          } else {
            blob = await canvas.convertToBlob({ type: mimeType, quality: minQuality });
          }
          
          if (blob.size > targetBytes) {
            for (let attempt = 0; attempt < 15; attempt++) {
              scale *= 0.75;
              const newWidth = Math.round(width * scale);
              const newHeight = Math.round(height * scale);
              
              if (newWidth < 10 || newHeight < 10) break;
              
              const resizedCanvas = new OffscreenCanvas(newWidth, newHeight);
              const resizedCtx = resizedCanvas.getContext('2d');
              if (!resizedCtx) throw new Error('Failed to get canvas context');
              
              resizedCtx.drawImage(bitmap, 0, 0, newWidth, newHeight);
              const testBlob = await resizedCanvas.convertToBlob({ type: mimeType, quality: 0.7 });
              
              if (testBlob.size <= targetBytes) {
                blob = testBlob;
                width = newWidth;
                height = newHeight;
                break;
              }
            }
            
            if (blob.size > targetBytes) {
              throw new Error(`Cannot compress to ${settings.targetSizeKB}KB. Minimum achievable size is ${Math.round(blob.size / 1024)}KB. Try increasing target size.`);
            }
          }
        }
      }
    } else {
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');
      
      ctx.drawImage(bitmap, 0, 0, width, height);
      
      const quality = settings.format === 'png' ? undefined : settings.quality / 100;
      blob = await canvas.convertToBlob({ type: mimeType, quality });
      
      if (blob.size > originalSize && settings.format !== 'png') {
        let minQuality = 0.1;
        let maxQuality = quality || 0.9;
        let testQuality = maxQuality * 0.7;
        
        for (let i = 0; i < 10; i++) {
          const testBlob = await canvas.convertToBlob({ type: mimeType, quality: testQuality });
          
          if (testBlob.size <= originalSize) {
            if (testBlob.size >= originalSize * 0.95) {
              blob = testBlob;
              break;
            }
            minQuality = testQuality;
          } else {
            maxQuality = testQuality;
          }
          
          testQuality = (minQuality + maxQuality) / 2;
          
          if (maxQuality - minQuality < 0.01) {
            blob = await canvas.convertToBlob({ type: mimeType, quality: minQuality });
            break;
          }
        }
      }
    }
    
    bitmap.close();

    self.postMessage({ id, blob, width, height });
  } catch (error) {
    self.postMessage({ 
      id, 
      error: error instanceof Error ? error.message : 'Compression failed' 
    });
  }
};
