"use client";

import { useState, useRef, useCallback } from "react";
import { 
  compressImage, 
  formatFileSize, 
  calculateSavings, 
  generateId, 
  isValidImageFile,
  getPresetSettings 
} from "./logic";
import type { ImageFile, CompressionSettings, CompressionPreset } from "./types";
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
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(isValidImageFile);
    
    const newImages: ImageFile[] = validFiles.map(file => ({
      id: generateId(),
      file,
      originalSize: file.size,
      compressedSize: 0,
      originalUrl: URL.createObjectURL(file),
      compressedUrl: '',
      width: 0,
      height: 0,
      status: 'pending',
    }));

    setImages(prev => [...prev, ...newImages]);

    // Auto-compress
    for (const img of newImages) {
      await compressImageFile(img);
    }
  }, [settings]);

  const compressImageFile = async (img: ImageFile) => {
    setImages(prev => prev.map(i => 
      i.id === img.id ? { ...i, status: 'compressing' } : i
    ));

    try {
      const { blob, width, height } = await compressImage(img.file, settings);
      const compressedUrl = URL.createObjectURL(blob);

      setImages(prev => prev.map(i => 
        i.id === img.id 
          ? { 
              ...i, 
              compressedSize: blob.size,
              compressedUrl,
              width,
              height,
              status: 'completed' 
            } 
          : i
      ));
    } catch (error) {
      setImages(prev => prev.map(i => 
        i.id === img.id 
          ? { ...i, status: 'error', error: 'Compression failed' } 
          : i
      ));
    }
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

  const downloadImage = (img: ImageFile) => {
    const a = document.createElement('a');
    a.href = img.compressedUrl;
    a.download = `compressed-${img.file.name}`;
    a.click();
  };

  const downloadAll = async () => {
    const completedImages = images.filter(img => img.status === 'completed');
    
    if (completedImages.length === 1) {
      downloadImage(completedImages[0]);
      return;
    }

    // For multiple images, download individually
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Compression Settings
            </h3>
            
            {/* Presets */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handlePreset('high')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  settings.quality === 90
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                High Quality
              </button>
              <button
                onClick={() => handlePreset('balanced')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  settings.quality === 75
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Balanced
              </button>
              <button
                onClick={() => handlePreset('maximum')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
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
                className="w-full"
              />
            </div>

            {/* Format Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <div className="flex gap-2">
                {(['jpeg', 'png', 'webp'] as const).map(format => (
                  <button
                    key={format}
                    onClick={() => setSettings({ ...settings, format })}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      settings.format === format
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
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
                        <span className="text-primary">Compressing...</span>
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
              disabled={!images.some(img => img.status === 'completed')}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              📥 Download All
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              🗑️ Clear All
            </button>
          </div>
        )}
      </div>

      <ImageCompressorSEOContent />
      
      <RelatedTools
        tools={[
          {
            slug: "image-resizer",
            name: "Image Resizer",
            description: "Resize images to custom dimensions with aspect ratio control.",
            icon: "📐",
            category: "image"
          },
          {
            slug: "image-format-converter",
            name: "Image Format Converter",
            description: "Convert images between JPG, PNG, and WebP formats.",
            icon: "🔄",
            category: "image"
          },
          {
            slug: "image-cropper",
            name: "Image Cropper",
            description: "Crop and trim images to remove unwanted areas.",
            icon: "✂️",
            category: "image"
          }
        ]}
      />
    </>
  );
}
