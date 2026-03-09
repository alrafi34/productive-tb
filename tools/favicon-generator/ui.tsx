"use client";

import { useState, useRef } from "react";
import { Upload, Download, RotateCcw, Copy, Code, ZoomIn, FileDown } from "lucide-react";
import { FaviconOptions, FaviconSize } from "./types";
import { generateMultipleFavicons, downloadFavicon, downloadAllFavicons, copyToClipboard, generateHTMLSnippet, STANDARD_SIZES } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FaviconGeneratorUI() {
  const [favicons, setFavicons] = useState<FaviconSize[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48]);
  const [customSize, setCustomSize] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [options, setOptions] = useState<FaviconOptions>({
    backgroundColor: 'transparent',
    padding: 0,
    maintainAspectRatio: true,
    customSizes: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setIsProcessing(true);
    try {
      const sizes = [...selectedSizes, ...options.customSizes].sort((a, b) => a - b);
      const generated = await generateMultipleFavicons(file, sizes, options);
      setFavicons(generated);
    } catch (error) {
      console.error('Error generating favicons:', error);
      alert('Failed to generate favicons');
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

  const handleSizeToggle = (size: number) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleAddCustomSize = () => {
    const size = parseInt(customSize);
    if (size && size > 0 && size <= 512 && !options.customSizes.includes(size)) {
      setOptions({ ...options, customSizes: [...options.customSizes, size] });
      setCustomSize('');
    }
  };

  const handleRemoveCustomSize = (size: number) => {
    setOptions({ ...options, customSizes: options.customSizes.filter(s => s !== size) });
  };

  const handleCopyBase64 = async (base64: string, size: number) => {
    await copyToClipboard(base64);
    setCopied(`base64-${size}`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyHTML = async () => {
    const html = generateHTMLSnippet(favicons);
    await copyToClipboard(html);
    setCopied('html');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setFavicons([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Options */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3">Favicon Options</h3>
          
          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Standard Sizes</label>
            <div className="flex flex-wrap gap-2">
              {STANDARD_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSizes.includes(size)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {size}×{size}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Sizes</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="Enter size (e.g., 96)"
                min="1"
                max="512"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddCustomSize}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {options.customSizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {options.customSizes.map(size => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm"
                  >
                    {size}×{size}
                    <button
                      onClick={() => handleRemoveCustomSize(size)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Other Options */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={options.backgroundColor === 'transparent' ? '#ffffff' : options.backgroundColor}
                  onChange={(e) => setOptions({ ...options, backgroundColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300"
                />
                <button
                  onClick={() => setOptions({ ...options, backgroundColor: 'transparent' })}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    options.backgroundColor === 'transparent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  Transparent
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Padding ({options.padding}px)</label>
              <input
                type="range"
                value={options.padding}
                onChange={(e) => setOptions({ ...options, padding: parseInt(e.target.value) })}
                min="0"
                max="20"
                className="w-full"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.maintainAspectRatio}
              onChange={(e) => setOptions({ ...options, maintainAspectRatio: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Maintain Aspect Ratio</span>
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
            Drag & Drop Image Here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to select a file
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
          >
            Select Image
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Supports: PNG, JPG, GIF, SVG
          </p>
        </div>

        {isProcessing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Generating favicons...</p>
          </div>
        )}

        {/* Generated Favicons */}
        {favicons.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Generated Favicons ({favicons.length})
                </h3>
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-gray-500" />
                  <input
                    type="range"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    min="1"
                    max="4"
                    step="0.5"
                    className="w-24"
                  />
                  <span className="text-sm text-gray-600">{zoomLevel}x</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadAllFavicons(favicons)}
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
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favicons.map((favicon) => (
                <div key={favicon.size} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div 
                    className="bg-gray-50 rounded-lg p-4 mb-3 flex items-center justify-center"
                    style={{ 
                      backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  >
                    <img
                      src={favicon.dataUrl}
                      alt={`Favicon ${favicon.label}`}
                      style={{ 
                        width: `${favicon.size * zoomLevel}px`,
                        height: `${favicon.size * zoomLevel}px`,
                        imageRendering: 'pixelated'
                      }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 text-center mb-3">
                    {favicon.label}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => downloadFavicon(favicon)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleCopyBase64(favicon.base64, favicon.size)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      {copied === `base64-${favicon.size}` ? 'Copied!' : 'Base64'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* HTML Snippet */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">HTML Code Snippet</h3>
                <button
                  onClick={handleCopyHTML}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Code className="w-4 h-4" />
                  {copied === 'html' ? 'Copied!' : 'Copy HTML'}
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                {generateHTMLSnippet(favicons)}
              </pre>
            </div>
          </>
        )}
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="favicon-generator"
        tools={['image-resizer', 'image-compressor', 'base64-image-encoder']}
      />
    </>
  );
}
