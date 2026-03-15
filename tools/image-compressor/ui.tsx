"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { 
  formatFileSize, 
  calculateSavings, 
  generateId, 
  isValidImageFile,
  getPresetSettings 
} from "./logic";
import type { ImageFile, CompressionSettings, CompressionPreset } from "./types";
import type { WorkerMessage, WorkerResponse } from "./compression.worker";
import ImageCompressorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
export default function ImageCompressorUI() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 75,
    maxWidth: 0,
    maxHeight: 0,
    format: 'jpeg',
    maintainAspectRatio: true,
    targetSizeKB: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{id: string; name: string; progress: number}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  const getImageFormat = (file: File): 'jpeg' | 'png' | 'webp' => {
    if (file.type === 'image/png') return 'png';
    if (file.type === 'image/webp') return 'webp';
    return 'jpeg';
  };
  useEffect(() => {
    workerRef.current = new Worker(new URL('./compression.worker.ts', import.meta.url));
    
    workerRef.current.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const response = e.data;
      
      if ('error' in response) {
        setImages(prev => prev.map(i => 
          i.id === response.id 
            ? { ...i, status: 'error', error: response.error } 
            : i
        ));
      } else {
        const compressedUrl = URL.createObjectURL(response.blob);
        setImages(prev => prev.map(i => 
          i.id === response.id 
            ? { 
                ...i, 
                compressedSize: response.blob.size,
                compressedUrl,
                width: response.width,
                height: response.height,
                status: 'completed' 
              } 
            : i
        ));
      }
      
      setImages(prev => {
        const stillCompressing = prev.some(img => img.status === 'compressing');
        if (!stillCompressing) setIsCompressing(false);
        return prev;
      });
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const validFiles = Array.from(files).filter(isValidImageFile);
    
    const uploadingItems = validFiles.map(file => ({
      id: generateId(),
      name: file.name,
      progress: 0,
    }));
    setUploadingFiles(uploadingItems);

    const newImages: ImageFile[] = [];
    
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const id = uploadingItems[i].id;
      
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        
        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setUploadingFiles(prev => 
              prev.map(item => item.id === id ? { ...item, progress } : item)
            );
          }
        };
        
        reader.onload = () => {
          const originalUrl = URL.createObjectURL(file);
          newImages.push({
            id,
            file,
            originalSize: file.size,
            compressedSize: 0,
            originalUrl,
            compressedUrl: '',
            width: 0,
            height: 0,
            status: 'pending',
          });
          resolve();
        };
        
        reader.readAsArrayBuffer(file);
      });
    }
    
    setImages(prev => [...prev, ...newImages]);
    setUploadingFiles([]);
  }, []);
  const compressImages = useCallback((imagesToCompress: ImageFile[]) => {
    if (!workerRef.current || imagesToCompress.length === 0) return;
    
    setIsCompressing(true);
    
    imagesToCompress.forEach(img => {
      setImages(prev => prev.map(i => 
        i.id === img.id ? { ...i, status: 'compressing' } : i
      ));
      
      const format = getImageFormat(img.file);
      
      const message: WorkerMessage = {
        id: img.id,
        file: img.file,
        originalSize: img.originalSize,
        settings: {
          quality: settings.quality,
          maxWidth: settings.maxWidth,
          maxHeight: settings.maxHeight,
          format: format,
          targetSizeKB: settings.targetSizeKB,
        },
      };
      
      workerRef.current!.postMessage(message);
    });
  }, [settings]);

  const compressAll = () => {
    const pendingImages = images.filter(img => img.status === 'pending');
    compressImages(pendingImages);
  };

  const recompressAll = () => {
    const completedImages = images.filter(img => img.status === 'completed');
    completedImages.forEach(img => {
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    
    setImages(prev => prev.map(img => ({
      ...img,
      status: 'pending',
      compressedSize: 0,
      compressedUrl: '',
    })));
    
    setTimeout(() => compressImages(images), 0);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };
  const handlePreset = (preset: CompressionPreset) => {
    const presetSettings = getPresetSettings(preset);
    setSettings(prev => ({ ...prev, ...presetSettings }));
  };

  const hasPendingImages = images.some(img => img.status === 'pending');
  const hasCompletedImages = images.some(img => img.status === 'completed');
  const downloadImage = (img: ImageFile) => {
    const a = document.createElement('a');
    a.href = img.compressedUrl;
    const format = getImageFormat(img.file);
    const originalName = img.file.name.replace(/\.[^/.]+$/, '');
    const extension = format === 'jpeg' ? 'jpg' : format;
    a.download = `compressed-${originalName}.${extension}`;
    a.click();
  };
  const downloadAll = async () => {
    const completedImages = images.filter(img => img.status === 'completed');
    
    if (completedImages.length === 1) {
      downloadImage(completedImages[0]);
      return;
    }
    completedImages.forEach(img => downloadImage(img));
  };
  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };
  const clearAll = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  };
  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSavings = calculateSavings(totalOriginalSize, totalCompressedSize);
  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="text-5xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Drop images here or click to upload
          </h3>
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, and WebP • Max 20MB per file
          </p>
        </div>
        {/* Settings */}
        {images.length > 0 && (
          <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Compression Settings
              </h3>
              <div className="flex gap-2">
                {hasPendingImages && (
                  <button
                    onClick={compressAll}
                    disabled={isCompressing}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    {isCompressing ? '⏳ Compressing...' : '🚀 Compress All'}
                  </button>
                )}
                {hasCompletedImages && !hasPendingImages && (
                  <button
                    onClick={recompressAll}
                    disabled={isCompressing}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    {isCompressing ? '⏳ Recompressing...' : '🔄 Recompress All'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Presets */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => handlePreset('high')}
                disabled={isCompressing}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                  settings.quality === 90
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                High Quality
              </button>
              <button
                onClick={() => handlePreset('balanced')}
                disabled={isCompressing}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                  settings.quality === 75
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Balanced
              </button>
              <button
                onClick={() => handlePreset('maximum')}
                disabled={isCompressing}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                  settings.quality === 60
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Maximum Compression
              </button>
            </div>
            {/* Quality Slider */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {settings.quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
                disabled={isCompressing || settings.targetSizeKB > 0}
                className="w-full disabled:opacity-50"
              />
              {settings.targetSizeKB > 0 && (
                <p className="text-xs text-orange-600 mt-1">Quality slider disabled when target size is set</p>
              )}
            </div>

            {/* Target Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Size (Optional)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="e.g., 500"
                  value={settings.targetSizeKB || ''}
                  onChange={(e) => setSettings({ ...settings, targetSizeKB: parseInt(e.target.value) || 0 })}
                  disabled={isCompressing}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-50"
                />
                <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">KB or less</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use quality slider. If set, compressor will try to achieve this file size.
              </p>
            </div>
            {/* Max Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Width (px)
                </label>
                <input
                  type="number"
                  placeholder="Original"
                  value={settings.maxWidth || ''}
                  onChange={(e) => setSettings({ ...settings, maxWidth: parseInt(e.target.value) || 0 })}
                  disabled={isCompressing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Height (px)
                </label>
                <input
                  type="number"
                  placeholder="Original"
                  value={settings.maxHeight || ''}
                  onChange={(e) => setSettings({ ...settings, maxHeight: parseInt(e.target.value) || 0 })}
                  disabled={isCompressing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        )}
        {/* Upload Progress */}
        {uploadingFiles.length > 0 && (
          <div className="mt-6 bg-gradient-to-br from-primary/5 to-purple-50 rounded-xl border border-primary/20 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Uploading Images...
                </h3>
                <p className="text-sm text-gray-600">Please wait while we load your images</p>
              </div>
            </div>
            <div className="space-y-3">
              {uploadingFiles.map(file => (
                <div key={file.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 truncate flex-1 mr-4">{file.name}</span>
                    <span className="text-sm font-bold text-primary">{file.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${file.progress}%` }}
                    >
                      <div className="h-full w-full bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">Original Size</div>
              <div className="text-lg font-bold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {formatFileSize(totalOriginalSize)}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">Compressed Size</div>
              <div className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                {formatFileSize(totalCompressedSize)}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-xs text-gray-400 mb-1">Total Savings</div>
              <div className="text-lg font-bold text-green-600" style={{ fontFamily: "var(--font-heading)" }}>
                {totalSavings}%
              </div>
            </div>
          </div>
        )}
        {/* Images List */}
        {images.length > 0 && (
          <div className="mt-6 space-y-4">
            {images.map(img => (
              <div key={img.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="flex-shrink-0">
                    <img
                      src={img.compressedUrl || img.originalUrl}
                      alt={img.file.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate mb-1">
                      {img.file.name}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatFileSize(img.originalSize)}</span>
                      {img.status === 'completed' && (
                        <>
                          <span>→</span>
                          <span className="text-primary font-semibold">
                            {formatFileSize(img.compressedSize)}
                          </span>
                          <span className="text-green-600 font-semibold">
                            ({calculateSavings(img.originalSize, img.compressedSize)}% saved)
                          </span>
                        </>
                      )}
                      {img.status === 'compressing' && (
                        <span className="flex items-center gap-2 text-primary font-semibold">
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Compressing...
                        </span>
                      )}
                      {img.status === 'error' && (
                        <span className="text-red-500">{img.error}</span>
                      )}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2">
                    {img.status === 'completed' && (
                      <button
                        onClick={() => downloadImage(img)}
                        className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Download
                      </button>
                    )}
                    <button
                      onClick={() => removeImage(img.id)}
                      className="px-3 py-1.5 border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Action Buttons */}
        {images.length > 0 && (
          <div className="mt-6 flex gap-3 flex-wrap">
            <button
              onClick={downloadAll}
              disabled={!hasCompletedImages}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              📥 Download All
            </button>
            <button
              onClick={clearAll}
              disabled={isCompressing}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 disabled:opacity-40 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              🗑️ Clear All
            </button>
          </div>
        )}
      </div>
      <ImageCompressorSEOContent />
      
      <RelatedTools currentTool="image-compressor" tools={["image-resizer", "image-to-grayscale", "exif-remover"]} />
    </>
  );
}
