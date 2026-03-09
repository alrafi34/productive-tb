"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, RotateCcw, Copy, FileDown, X } from "lucide-react";
import { GrayscaleOptions, ProcessedImage } from "./types";
import { convertToGrayscale, convertMultipleToGrayscale, downloadImage, downloadAllImages, copyImageToClipboard, formatFileSize } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ImageToGrayscaleUI() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [comparePosition, setComparePosition] = useState(50);
  const [options, setOptions] = useState<GrayscaleOptions>({
    intensity: 100,
    invert: false,
    brightness: 0,
    contrast: 0,
    maxWidth: undefined,
    maxHeight: undefined,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      reprocessImage(selectedImage.id);
    }
  }, [options]);

  const reprocessImage = async (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    try {
      const response = await fetch(image.originalUrl);
      const blob = await response.blob();
      const file = new File([blob], image.name, { type: blob.type });
      
      const processed = await convertToGrayscale(file, options);
      
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, grayscaleUrl: processed.grayscaleUrl } : img
      ));
      
      if (selectedImage?.id === imageId) {
        setSelectedImage(prev => prev ? { ...prev, grayscaleUrl: processed.grayscaleUrl } : null);
      }
    } catch (error) {
      console.error('Error reprocessing image:', error);
    }
  };

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

      const processed = await convertMultipleToGrayscale(imageFiles, options);
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

  const handleCopyImage = async (url: string, id: string) => {
    try {
      await copyImageToClipboard(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      alert('Failed to copy image. Your browser may not support this feature.');
    }
  };

  const handleRemove = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(images[0] || null);
    }
  };

  const handleClear = () => {
    setImages([]);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Options */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3">Filter Options</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensity ({options.intensity}%)
              </label>
              <input
                type="range"
                value={options.intensity}
                onChange={(e) => setOptions({ ...options, intensity: parseInt(e.target.value) })}
                min="0"
                max="100"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Original</span>
                <span>Full Grayscale</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brightness ({options.brightness > 0 ? '+' : ''}{options.brightness})
              </label>
              <input
                type="range"
                value={options.brightness}
                onChange={(e) => setOptions({ ...options, brightness: parseInt(e.target.value) })}
                min="-100"
                max="100"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Darker</span>
                <span>Brighter</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contrast ({options.contrast > 0 ? '+' : ''}{options.contrast})
              </label>
              <input
                type="range"
                value={options.contrast}
                onChange={(e) => setOptions({ ...options, contrast: parseInt(e.target.value) })}
                min="-100"
                max="100"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Less</span>
                <span>More</span>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.invert}
                  onChange={(e) => setOptions({ ...options, invert: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Invert Colors</span>
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
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
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
            Select Images
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Supports: PNG, JPG, GIF, SVG
          </p>
        </div>

        {isProcessing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Processing images...</p>
          </div>
        )}

        {/* Image Gallery */}
        {images.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Processed Images ({images.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadAllImages(images)}
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
                      src={image.grayscaleUrl}
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
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {image.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {image.width}×{image.height} • {formatFileSize(image.size)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Selected Image Comparison */}
        {selectedImage && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Before & After Comparison
            </h3>

            {/* Comparison Slider */}
            <div className="relative mb-6 overflow-hidden rounded-lg" style={{ height: '400px' }}>
              <img
                src={selectedImage.originalUrl}
                alt="Original"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
              >
                <img
                  src={selectedImage.grayscaleUrl}
                  alt="Grayscale"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                style={{ left: `${comparePosition}%` }}
                onMouseDown={(e) => {
                  const container = e.currentTarget.parentElement;
                  if (!container) return;
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    setComparePosition(Math.max(0, Math.min(100, percentage)));
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-xs">⟷</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => downloadImage(selectedImage.grayscaleUrl, selectedImage.name)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={() => handleCopyImage(selectedImage.grayscaleUrl, selectedImage.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied === selectedImage.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="image-to-grayscale"
        tools={['image-compressor', 'image-resizer', 'favicon-generator']}
      />
    </>
  );
}
