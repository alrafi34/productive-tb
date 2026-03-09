"use client";

import { useState, useRef } from "react";
import { Upload, Download, RotateCcw, FileDown, X, Shield, Info } from "lucide-react";
import { ExifRemovalOptions, ProcessedImage } from "./types";
import { removeExifFromMultiple, downloadImage, downloadAllImages, formatFileSize, calculateSavings } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ExifRemoverUI() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<ExifRemovalOptions>({
    outputFormat: 'jpeg',
    quality: 92,
    maxWidth: undefined,
    maxHeight: undefined,
    compress: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    try {
      const imageFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );

      if (imageFiles.length === 0) {
        alert('Please select valid image files');
        return;
      }

      const processed = await removeExifFromMultiple(imageFiles, options);
      setImages(prev => [...prev, ...processed]);
      if (processed.length > 0) {
        setSelectedImage(processed[0]);
      }
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Failed to process images');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
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

  const handleRemove = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(images[0] || null);
    }
  };

  const handleClear = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.originalUrl);
      URL.revokeObjectURL(img.cleanUrl);
    });
    setImages([]);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCleanSize = images.reduce((sum, img) => sum + img.cleanSize, 0);

  return (
    <>
      <div className="space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Privacy First</p>
            <p>All processing happens in your browser. Your images never leave your device.</p>
          </div>
        </div>

        {/* Options */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3">Processing Options</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select
                value={options.outputFormat}
                onChange={(e) => setOptions({ ...options, outputFormat: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality ({options.quality}%)
              </label>
              <input
                type="range"
                value={options.quality}
                onChange={(e) => setOptions({ ...options, quality: parseInt(e.target.value) })}
                min="1"
                max="100"
                className="w-full"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.compress}
                  onChange={(e) => setOptions({ ...options, compress: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Enable Compression</span>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Width (px)</label>
              <input
                type="number"
                value={options.maxWidth || ''}
                onChange={(e) => setOptions({ ...options, maxWidth: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Original"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Height (px)</label>
              <input
                type="number"
                value={options.maxHeight || ''}
                onChange={(e) => setOptions({ ...options, maxHeight: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Original"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
        >
          <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drag & Drop Images Here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to select files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
          >
            <Upload className="w-5 h-5" />
            Select Images
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Supports: JPG, PNG, GIF, WebP • All processing happens locally
          </p>
        </div>

        {isProcessing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Removing EXIF data...</p>
          </div>
        )}

        {/* Processed Images */}
        {images.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Processed Images ({images.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Original: {formatFileSize(totalOriginalSize)} → Clean: {formatFileSize(totalCleanSize)} 
                  <span className="text-green-600 font-semibold ml-2">
                    ({calculateSavings(totalOriginalSize, totalCleanSize)} saved)
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadAllImages(images, options.outputFormat)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <FileDown className="w-4 h-4" />
                  Download All
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedImage?.id === image.id
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={image.cleanUrl}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(image.id);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {image.hadExif && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                        EXIF Removed
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {image.name}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatFileSize(image.originalSize)}</span>
                    <span>→ {formatFileSize(image.cleanSize)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Selected Image Details */}
        {selectedImage && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedImage.name}
            </h3>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original (with EXIF)</label>
                <img
                  src={selectedImage.originalUrl}
                  alt="Original"
                  className="w-full rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clean (EXIF removed)</label>
                <img
                  src={selectedImage.cleanUrl}
                  alt="Clean"
                  className="w-full rounded-lg border border-gray-200"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Original Size</p>
                <p className="text-sm font-semibold text-gray-900">{formatFileSize(selectedImage.originalSize)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Clean Size</p>
                <p className="text-sm font-semibold text-gray-900">{formatFileSize(selectedImage.cleanSize)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dimensions</p>
                <p className="text-sm font-semibold text-gray-900">{selectedImage.width}×{selectedImage.height}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Size Reduction</p>
                <p className="text-sm font-semibold text-green-600">
                  {calculateSavings(selectedImage.originalSize, selectedImage.cleanSize)}
                </p>
              </div>
            </div>

            <button
              onClick={() => downloadImage(selectedImage.cleanUrl, selectedImage.name, options.outputFormat)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Clean Image
            </button>
          </div>
        )}
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="exif-remover"
        tools={['image-compressor', 'image-to-grayscale', 'image-resizer']}
      />
    </>
  );
}
