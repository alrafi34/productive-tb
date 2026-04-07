export interface VideoInfo {
  duration: number;
  width: number;
  height: number;
  fileName: string;
  fileSize: number;
  format: string;
}

export interface ExtractedFrame {
  id: string;
  timestamp: number;
  dataUrl: string;
  blob?: Blob;
  width: number;
  height: number;
  fileName: string;
  quality: number;
  format: 'png' | 'jpeg' | 'webp';
}

export interface ExtractionOptions {
  quality: number; // 0.1 to 1.0
  format: 'png' | 'jpeg' | 'webp';
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio: boolean;
}

// Optimized video loading with preload control
export const loadVideoFile = (file: File): Promise<{ video: HTMLVideoElement; info: VideoInfo }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    
    // Optimize for large files
    video.preload = 'metadata'; // Only load metadata, not the entire video
    video.crossOrigin = 'anonymous';
    
    video.onloadedmetadata = () => {
      const info: VideoInfo = {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        fileName: file.name,
        fileSize: file.size,
        format: file.type
      };
      resolve({ video, info });
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load video file'));
    };
    
    video.src = url;
    video.load();
  });
};

// Calculate optimal canvas size to prevent memory issues
const calculateOptimalSize = (
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number,
  maintainAspectRatio: boolean = true
): { width: number; height: number } => {
  let width = originalWidth;
  let height = originalHeight;
  
  // Set reasonable defaults for max dimensions to prevent memory issues
  const defaultMaxWidth = 3840; // 4K width
  const defaultMaxHeight = 2160; // 4K height
  
  const finalMaxWidth = maxWidth || defaultMaxWidth;
  const finalMaxHeight = maxHeight || defaultMaxHeight;
  
  if (maintainAspectRatio) {
    const aspectRatio = originalWidth / originalHeight;
    
    if (width > finalMaxWidth) {
      width = finalMaxWidth;
      height = width / aspectRatio;
    }
    
    if (height > finalMaxHeight) {
      height = finalMaxHeight;
      width = height * aspectRatio;
    }
  } else {
    width = Math.min(width, finalMaxWidth);
    height = Math.min(height, finalMaxHeight);
  }
  
  return { width: Math.floor(width), height: Math.floor(height) };
};

// Optimized frame extraction with quality and size controls
export const extractFrame = (
  video: HTMLVideoElement, 
  options: ExtractionOptions = {
    quality: 0.9,
    format: 'png',
    maintainAspectRatio: true
  },
  timestamp?: number
): Promise<ExtractedFrame> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      const currentTime = timestamp !== undefined ? timestamp : video.currentTime;
      
      // Calculate optimal canvas size
      let { width, height } = calculateOptimalSize(
        video.videoWidth,
        video.videoHeight,
        options.maxWidth,
        options.maxHeight,
        options.maintainAspectRatio
      );
      
      canvas.width = width;
      canvas.height = height;
      
      // Optimize rendering for high-resolution videos
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Draw the current frame with optimized scaling
      ctx.drawImage(video, 0, 0, width, height);
      
      // Convert to blob for better memory management
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        
        const dataUrl = URL.createObjectURL(blob);
        const extension = options.format === 'jpeg' ? 'jpg' : options.format;
        
        const frame: ExtractedFrame = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: currentTime,
          dataUrl,
          blob,
          width,
          height,
          fileName: `frame-${Math.floor(currentTime)}s.${extension}`,
          quality: options.quality,
          format: options.format
        };
        
        resolve(frame);
      }, `image/${options.format}`, options.quality);
      
    } catch (error) {
      reject(error);
    }
  });
};

export const downloadFrame = (frame: ExtractedFrame) => {
  const link = document.createElement('a');
  link.download = frame.fileName;
  
  // Use blob URL if available for better performance
  if (frame.blob) {
    const url = URL.createObjectURL(frame.blob);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up blob URL after download
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } else {
    link.href = frame.dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const copyFrameToClipboard = async (frame: ExtractedFrame): Promise<void> => {
  try {
    let blob: Blob;
    
    // Use existing blob if available
    if (frame.blob) {
      blob = frame.blob;
    } else {
      // Convert data URL to blob
      const response = await fetch(frame.dataUrl);
      blob = await response.blob();
    }
    
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
  } catch (error) {
    throw new Error('Failed to copy frame to clipboard');
  }
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimeWithMs = (seconds: number): string => {
  const time = formatTime(seconds);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${time}.${ms.toString().padStart(3, '0')}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatBitrate = (bitsPerSecond: number): string => {
  if (bitsPerSecond < 1000) return `${Math.round(bitsPerSecond)} bps`;
  if (bitsPerSecond < 1000000) return `${Math.round(bitsPerSecond / 1000)} Kbps`;
  return `${Math.round(bitsPerSecond / 1000000)} Mbps`;
};

export const getResolutionLabel = (width: number, height: number): string => {
  if (width >= 7680 && height >= 4320) return '8K';
  if (width >= 3840 && height >= 2160) return '4K';
  if (width >= 2560 && height >= 1440) return '1440p';
  if (width >= 1920 && height >= 1080) return '1080p';
  if (width >= 1280 && height >= 720) return '720p';
  if (width >= 854 && height >= 480) return '480p';
  return `${width}×${height}`;
};

export const isValidVideoFile = (file: File): boolean => {
  const validTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/x-flv',
    'video/3gpp',
    'video/x-matroska'
  ];
  return validTypes.includes(file.type);
};

// Check if file is likely to cause performance issues
export const checkVideoPerformance = (file: File): {
  isLargeFile: boolean;
  isLikelyHighRes: boolean;
  warnings: string[];
} => {
  const warnings: string[] = [];
  const isLargeFile = file.size > 500 * 1024 * 1024; // > 500MB
  const isLikelyHighRes = file.size > 100 * 1024 * 1024; // > 100MB likely high-res
  
  if (isLargeFile) {
    warnings.push('Large file detected. Consider using lower quality settings for better performance.');
  }
  
  if (isLikelyHighRes) {
    warnings.push('High-resolution video detected. Frame extraction may take longer.');
  }
  
  return { isLargeFile, isLikelyHighRes, warnings };
};

export const seekToTime = (video: HTMLVideoElement, time: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      reject(new Error('Seek timeout'));
    }, 5000); // 5 second timeout
    
    const onSeeked = () => {
      clearTimeout(timeout);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      resolve();
    };
    
    const onError = () => {
      clearTimeout(timeout);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      reject(new Error('Seek failed'));
    };
    
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);
    video.currentTime = Math.max(0, Math.min(time, video.duration));
  });
};

// Memory management utilities
export const cleanupFrame = (frame: ExtractedFrame) => {
  if (frame.dataUrl.startsWith('blob:')) {
    URL.revokeObjectURL(frame.dataUrl);
  }
};

export const cleanupFrames = (frames: ExtractedFrame[]) => {
  frames.forEach(cleanupFrame);
};

// Batch frame extraction for performance
export const extractMultipleFrames = async (
  video: HTMLVideoElement,
  timestamps: number[],
  options: ExtractionOptions,
  onProgress?: (progress: number) => void
): Promise<ExtractedFrame[]> => {
  const frames: ExtractedFrame[] = [];
  
  for (let i = 0; i < timestamps.length; i++) {
    try {
      await seekToTime(video, timestamps[i]);
      // Small delay to ensure frame is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const frame = await extractFrame(video, options, timestamps[i]);
      frames.push(frame);
      
      if (onProgress) {
        onProgress((i + 1) / timestamps.length);
      }
    } catch (error) {
      console.warn(`Failed to extract frame at ${timestamps[i]}s:`, error);
    }
  }
  
  return frames;
};

// Performance monitoring
export const getVideoStats = (video: HTMLVideoElement, file: File) => {
  const bitrate = (file.size * 8) / video.duration; // bits per second
  const pixelCount = video.videoWidth * video.videoHeight;
  const isHighRes = pixelCount > 2073600; // > 1080p
  const isLongVideo = video.duration > 3600; // > 1 hour
  
  return {
    bitrate: Math.round(bitrate),
    pixelCount,
    isHighRes,
    isLongVideo,
    estimatedMemoryUsage: (pixelCount * 4) / (1024 * 1024), // MB for RGBA
    recommendedQuality: isHighRes ? 0.8 : 0.9
  };
};

// Advanced seeking with frame accuracy
export const seekToFrame = async (
  video: HTMLVideoElement,
  frameNumber: number,
  fps: number = 30
): Promise<void> => {
  const time = frameNumber / fps;
  return seekToTime(video, time);
};

// Estimate FPS from video
export const estimateFPS = (video: HTMLVideoElement): number => {
  // This is an approximation - actual FPS detection would require more complex analysis
  const duration = video.duration;
  if (duration < 1) return 30; // Default fallback
  
  // Common frame rates
  const commonFPS = [23.976, 24, 25, 29.97, 30, 50, 59.94, 60];
  
  // For now, return a reasonable default
  // In a real implementation, you'd analyze the video stream
  return 30;
};

// Memory-efficient thumbnail generation
export const generateThumbnails = async (
  video: HTMLVideoElement,
  count: number = 10,
  options: Partial<ExtractionOptions> = {}
): Promise<ExtractedFrame[]> => {
  const thumbnailOptions: ExtractionOptions = {
    quality: 0.6,
    format: 'jpeg',
    maxWidth: 320,
    maxHeight: 180,
    maintainAspectRatio: true,
    ...options
  };
  
  const interval = video.duration / (count + 1);
  const timestamps = Array.from({ length: count }, (_, i) => (i + 1) * interval);
  
  return extractMultipleFrames(video, timestamps, thumbnailOptions);
};