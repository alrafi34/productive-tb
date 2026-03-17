"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { ImageFile, ResizeSettings } from './types';
import { 
  calculateAspectRatio, 
  getImageDimensions, 
  formatFileSize, 
  calculateStats,
  isValidImageFile,
  resizeByPercentage,
  RESIZE_PRESETS
} from './logic';
import type { WorkerMessage, WorkerResponse } from './resize.worker';
import ImageResizerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function ImageResizerUI() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ResizeSettings>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    quality: 90,
    format: 'jpeg',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./resize.worker.ts', import.meta.url));
    
    workerRef.current.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const response = e.data;
      
      if ('error' in response) {
        setImages(prev => prev.map(i => 
          i.id === response.id 
            ? { ...i, status: 'error', error: response.error } 
            : i
        ));
      } else {
        const resizedUrl = URL.createObjectURL(response.blob);
        setImages(prev => prev.map(i => 
          i.id === response.id 
            ? { 
                ...i, 
                resizedUrl,
                newWidth: response.width,
                newHeight: response.height,
                resizedSize: response.blob.size,
                status: 'completed' 
              } 
            : i
        ));
      }
      
      setImages(prev => {
        const stillProcessing = prev.some(img => img.status === 'processing');
        if (!stillProcessing) setIsProcessing(false);
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
    if (validFiles.length === 0) {
      alert('Please upload valid image files (JPG, PNG, WebP)');
      return;
    }

    const newImages: ImageFile[] = [];
    let hasPngImages = false;

    for (const file of validFiles) {
      try {
        const dimensions = await getImageDimensions(file);
        const url = URL.createObjectURL(file);

        // Check if any uploaded file is PNG
        if (file.type === 'image/png') {
          hasPngImages = true;
        }

        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalUrl: url,
          resizedUrl: null,
          originalWidth: dimensions.width,
          originalHeight: dimensions.height,
          newWidth: settings.width,
          newHeight: settings.height,
          originalSize: file.size,
          resizedSize: null,
          status: 'pending',
        });
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }

    // Auto-set format to PNG if PNG images are uploaded to preserve transparency
    if (hasPngImages && settings.format !== 'png') {
      setSettings((prev) => ({ ...prev, format: 'png' }));
    }

    setImages((prev) => [...prev, ...newImages]);
  }, [settings.width, settings.height, settings.format]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) files.push(file);
      }
    }

    if (files.length > 0) {
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      handleFiles(dataTransfer.files);
    }
  }, [handleFiles]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste as any);
    return () => document.removeEventListener('paste', handlePaste as any);
  }, [handlePaste]);

  const updateDimensions = (width?: number, height?: number) => {
    if (settings.maintainAspectRatio && images.length > 0) {
      const firstImage = images[0];
      const newDims = calculateAspectRatio(
        firstImage.originalWidth,
        firstImage.originalHeight,
        width,
        height
      );
      setSettings((prev) => ({ ...prev, width: newDims.width, height: newDims.height }));
    } else {
      setSettings((prev) => ({
        ...prev,
        ...(width !== undefined && { width }),
        ...(height !== undefined && { height }),
      }));
    }
  };

  const applyPreset = (width: number, height: number) => {
    setSettings((prev) => ({ ...prev, width, height }));
  };

  const applyPercentage = (percentage: number) => {
    if (images.length === 0) return;
    const firstImage = images[0];
    const newDims = resizeByPercentage(firstImage.originalWidth, firstImage.originalHeight, percentage);
    setSettings((prev) => ({ ...prev, width: newDims.width, height: newDims.height }));
  };

  const resizeImages = useCallback((imagesToResize: ImageFile[]) => {
    if (!workerRef.current || imagesToResize.length === 0) return;
    
    setIsProcessing(true);
    
    imagesToResize.forEach(img => {
      setImages(prev => prev.map(i => 
        i.id === img.id ? { ...i, status: 'processing' } : i
      ));
      
      let resizeSettings = { ...settings };

      if (settings.maintainAspectRatio) {
        const newDims = calculateAspectRatio(
          img.originalWidth,
          img.originalHeight,
          settings.width,
          undefined
        );
        resizeSettings = { ...settings, width: newDims.width, height: newDims.height };
      }
      
      const message: WorkerMessage = {
        id: img.id,
        file: img.file,
        settings: {
          width: resizeSettings.width,
          height: resizeSettings.height,
          quality: resizeSettings.quality,
          format: resizeSettings.format,
        },
      };
      
      workerRef.current!.postMessage(message);
    });
  }, [settings]);

  const resizeAllImages = () => {
    const pendingImages = images.filter(img => img.status === 'pending');
    resizeImages(pendingImages);
  };

  const resizeSingleImage = (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (image) resizeImages([image]);
  };

  const downloadImage = (image: ImageFile) => {
    if (!image.resizedUrl) return;
    const a = document.createElement('a');
    a.href = image.resizedUrl;
    a.download = `resized-${image.file.name}`;
    a.click();
  };

  const downloadAll = () => {
    images.forEach((image) => {
      if (image.resizedUrl) {
        setTimeout(() => downloadImage(image), 100);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.originalUrl);
        if (image.resizedUrl) URL.revokeObjectURL(image.resizedUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.originalUrl);
      if (image.resizedUrl) URL.revokeObjectURL(image.resizedUrl);
    });
    setImages([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging ? 'border-[#058554] bg-green-50' : 'border-gray-300 hover:border-[#058554]'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-5xl mb-4">📐</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Images to Resize</h3>
        <p className="text-gray-600 mb-4">
          Drag and drop, click to upload, or paste from clipboard
        </p>
        <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <>
          {/* Resize Settings */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Resize Settings</h3>

            {/* Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={settings.width}
                  onChange={(e) => updateDimensions(parseInt(e.target.value), undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={settings.height}
                  onChange={(e) => updateDimensions(undefined, parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            {/* Aspect Ratio Toggle */}
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintainAspectRatio}
                onChange={(e) => setSettings((prev) => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm font-medium text-gray-700">Maintain Aspect Ratio</span>
            </label>

            {/* Percentage Buttons */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resize by Percentage
              </label>
              <div className="flex flex-wrap gap-2">
                {[25, 50, 75, 100, 150, 200].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => applyPercentage(percent)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#058554] hover:text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Presets
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {RESIZE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset.width, preset.height)}
                    className="px-3 py-2 bg-gray-100 hover:bg-[#058554] hover:text-white rounded-lg transition-colors text-sm font-medium"
                    title={preset.description}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Format & Quality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Format
                </label>
                <select
                  value={settings.format}
                  onChange={(e) => setSettings((prev) => ({ ...prev, format: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              {(settings.format === 'jpeg' || settings.format === 'webp') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality: {settings.quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={settings.quality}
                    onChange={(e) => setSettings((prev) => ({ ...prev, quality: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={resizeAllImages}
                disabled={isProcessing || !images.some(img => img.status === 'pending')}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isProcessing ? '⏳ Processing...' : 'Resize All Images'}
              </button>
              {images.some((img) => img.resizedUrl) && (
                <button
                  onClick={downloadAll}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Download All
                </button>
              )}
              <button
                onClick={clearAll}
                disabled={isProcessing}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Images Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image) => {
              const stats = image.resizedSize ? calculateStats(image.originalSize, image.resizedSize) : null;

              return (
                <div key={image.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900 truncate flex-1">{image.file.name}</h4>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="text-red-600 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Before/After Preview */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Original</p>
                      <img
                        src={image.originalUrl}
                        alt="Original"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        {image.originalWidth} × {image.originalHeight}
                      </p>
                      <p className="text-xs text-gray-600">{formatFileSize(image.originalSize)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Resized</p>
                      {image.resizedUrl ? (
                        <>
                          <img
                            src={image.resizedUrl}
                            alt="Resized"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <p className="text-xs text-gray-600 mt-1">
                            {image.newWidth} × {image.newHeight}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatFileSize(image.resizedSize || 0)}
                          </p>
                        </>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Not resized yet</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  {stats && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Size Change:</strong>{' '}
                        {stats.savings > 0 ? (
                          <span className="text-green-600">
                            -{formatFileSize(stats.savings)} ({stats.savingsPercent.toFixed(1)}% smaller)
                          </span>
                        ) : (
                          <span className="text-red-600">
                            +{formatFileSize(Math.abs(stats.savings))} ({Math.abs(stats.savingsPercent).toFixed(1)}% larger)
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Status & Actions */}
                  <div className="flex gap-2">
                    {image.status === 'pending' && (
                      <button
                        onClick={() => resizeSingleImage(image.id)}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        Resize
                      </button>
                    )}
                    {image.status === 'processing' && (
                      <div className="flex-1 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-center font-medium flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    )}
                    {image.status === 'completed' && (
                      <button
                        onClick={() => downloadImage(image)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Download
                      </button>
                    )}
                    {image.status === 'error' && (
                      <div className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-center font-medium text-sm">
                        {image.error}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <ImageResizerSEOContent />
      
      <RelatedTools currentTool="image-resizer" tools={["word-counter", "text-reverser", "paragraph-formatter"]} />
    </div>
  );
}
