"use client";

import { useState, useRef } from "react";
import { Upload, Copy, Download, RotateCcw, Image as ImageIcon, X, FileDown } from "lucide-react";
import { Base64Options, EncodedImage } from "./types";
import { encodeImageToBase64, encodeMultipleImages, formatFileSize, copyToClipboard, downloadAsFile, downloadAllAsFile } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function Base64ImageEncoderUI() {
  const [encodedImages, setEncodedImages] = useState<EncodedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<EncodedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [options, setOptions] = useState<Base64Options>({
    maxWidth: undefined,
    maxHeight: undefined,
    quality: 92,
    outputFormat: 'original',
    addLineBreaks: false,
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

      const encoded = await encodeMultipleImages(imageFiles, options);
      setEncodedImages(prev => [...prev, ...encoded]);
      if (encoded.length > 0) {
        setSelectedImage(encoded[0]);
      }
    } catch (error) {
      console.error('Error encoding images:', error);
      alert('Failed to encode images');
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

  const handleCopy = async (base64: string, id: string) => {
    await copyToClipboard(base64);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (image: EncodedImage) => {
    downloadAsFile(image.base64, `${image.name}-base64.txt`);
  };

  const handleDownloadAll = () => {
    if (encodedImages.length > 0) {
      downloadAllAsFile(encodedImages);
    }
  };

  const handleRemove = (id: string) => {
    setEncodedImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(encodedImages[0] || null);
    }
  };

  const handleClear = () => {
    setEncodedImages([]);
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
          <h3 className="font-semibold text-gray-900 mb-3">Encoding Options</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality ({options.quality}%)</label>
              <input
                type="range"
                value={options.quality}
                onChange={(e) => setOptions({ ...options, quality: parseInt(e.target.value) })}
                min="1"
                max="100"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select
                value={options.outputFormat}
                onChange={(e) => setOptions({ ...options, outputFormat: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="original">Original</option>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.addLineBreaks}
              onChange={(e) => setOptions({ ...options, addLineBreaks: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Add line breaks (76 chars per line)</span>
          </label>
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
            <ImageIcon className="w-5 h-5" />
            Select Images
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Supports: PNG, JPG, GIF, SVG, WebP
          </p>
        </div>

        {isProcessing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Processing images...</p>
          </div>
        )}

        {/* Encoded Images List */}
        {encodedImages.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Encoded Images ({encodedImages.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadAll}
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
              {encodedImages.map((image) => (
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
                      src={image.preview}
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
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatFileSize(image.originalSize)}</span>
                    <span>→ {formatFileSize(image.size)}</span>
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

            {/* Preview */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                <img
                  src={selectedImage.preview}
                  alt={selectedImage.name}
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            </div>

            {/* Base64 Output */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base64 String</label>
              <textarea
                value={selectedImage.base64}
                readOnly
                className="w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-xs resize-none"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleCopy(selectedImage.base64, selectedImage.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied === selectedImage.id ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => handleDownload(selectedImage)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-xs text-gray-500">Original Size</p>
                <p className="text-sm font-semibold text-gray-900">{formatFileSize(selectedImage.originalSize)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Base64 Size</p>
                <p className="text-sm font-semibold text-gray-900">{formatFileSize(selectedImage.size)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">MIME Type</p>
                <p className="text-sm font-semibold text-gray-900">{selectedImage.mimeType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Size Increase</p>
                <p className="text-sm font-semibold text-gray-900">
                  {Math.round((selectedImage.size / selectedImage.originalSize) * 100)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="base64-image-encoder"
        tools={['image-compressor', 'image-resizer', 'text-to-clipboard']}
      />
    </>
  );
}
