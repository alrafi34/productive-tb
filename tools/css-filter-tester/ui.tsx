'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Copy, Upload, Download, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { FilterValues, FilterPreset } from './types';
import { 
  defaultFilters, 
  filterPresets, 
  generateFilterCSS, 
  applyFiltersToImage,
  downloadFilteredImage,
  loadImageFromFile 
} from './logic';
import CSSFilterTesterSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

const DEFAULT_PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#f8fafc" />
  <rect x="120" y="90" width="560" height="420" rx="20" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" />
  <g fill="#9ca3af">
    <circle cx="330" cy="250" r="42" />
    <path d="M250 360l90-90 62 62 58-58 90 86H250z" />
  </g>
  <text x="400" y="440" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#6b7280">
    Upload an image to begin
  </text>
</svg>
`)}`;

export default function CSSFilterTester() {
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [imageUrl, setImageUrl] = useState(DEFAULT_PLACEHOLDER_IMAGE);
  const [showComparison, setShowComparison] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const updateFilter = useCallback((key: keyof FilterValues, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const applyPreset = (preset: FilterPreset) => {
    setFilters(preset.values);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const copyCSS = async () => {
    const css = generateFilterCSS(filters);
    try {
      await navigator.clipboard.writeText(css);
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const url = await loadImageFromFile(file);
      setImageUrl(url);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDownload = () => {
    if (imageRef.current) {
      downloadFilteredImage(imageRef.current, filters);
    }
  };

  const filterStyle = applyFiltersToImage(filters);

  const FilterSlider = ({ 
    label, 
    value, 
    min, 
    max, 
    step = 1,
    unit = '%',
    onChange 
  }: { 
    label: string; 
    value: number; 
    min: number; 
    max: number; 
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-600 font-mono">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 space-y-6 sm:space-y-8">

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Image Preview */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
          {/* Upload Area */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Image Preview</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {showComparison ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showComparison ? 'Hide' : 'Compare'}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
            </div>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-primary transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {showComparison ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Original</p>
                    <img
                      src={imageUrl}
                      alt="Original"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Filtered</p>
                    <img
                      ref={imageRef}
                      src={imageUrl}
                      alt="Filtered"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                      style={{ filter: filterStyle }}
                    />
                  </div>
                </div>
              ) : (
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Preview"
                  className="w-full max-h-96 object-contain rounded-lg mx-auto"
                  style={{ filter: filterStyle }}
                />
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!showComparison && (
                <p className="text-sm sm:text-base text-gray-500 mt-4">
                  Drag & drop an image here or click upload
                </p>
              )}
            </div>
          </div>

          {/* CSS Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Generated CSS</h3>
            <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto break-all">
              {generateFilterCSS(filters)}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={copyCSS}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Copy className="w-4 h-4" />
                {copiedCSS ? 'Copied!' : 'Copy CSS'}
              </button>
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          {/* Presets */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Filter Presets</h3>
            <div className="grid grid-cols-1 gap-2">
              {filterPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="text-left px-3 py-2 text-xs sm:text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-6">
            <h3 className="text-base sm:text-lg font-semibold">Filter Controls</h3>
            
            <FilterSlider
              label="Grayscale"
              value={filters.grayscale}
              min={0}
              max={100}
              onChange={(value) => updateFilter('grayscale', value)}
            />
            
            <FilterSlider
              label="Sepia"
              value={filters.sepia}
              min={0}
              max={100}
              onChange={(value) => updateFilter('sepia', value)}
            />
            
            <FilterSlider
              label="Blur"
              value={filters.blur}
              min={0}
              max={20}
              step={0.1}
              unit="px"
              onChange={(value) => updateFilter('blur', value)}
            />
            
            <FilterSlider
              label="Brightness"
              value={filters.brightness}
              min={0}
              max={200}
              onChange={(value) => updateFilter('brightness', value)}
            />
            
            <FilterSlider
              label="Contrast"
              value={filters.contrast}
              min={0}
              max={200}
              onChange={(value) => updateFilter('contrast', value)}
            />
            
            <FilterSlider
              label="Saturate"
              value={filters.saturate}
              min={0}
              max={300}
              onChange={(value) => updateFilter('saturate', value)}
            />
            
            <FilterSlider
              label="Invert"
              value={filters.invert}
              min={0}
              max={100}
              onChange={(value) => updateFilter('invert', value)}
            />
            
            <FilterSlider
              label="Hue Rotate"
              value={filters.hueRotate}
              min={0}
              max={360}
              unit="deg"
              onChange={(value) => updateFilter('hueRotate', value)}
            />
            
            <FilterSlider
              label="Opacity"
              value={filters.opacity}
              min={0}
              max={100}
              onChange={(value) => updateFilter('opacity', value)}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
      </div>

      <CSSFilterTesterSEOContent />
      <RelatedTools
        currentTool="css-filter-tester"
        tools={['css-animation-previewer', 'css-gradient-generator', 'css-box-shadow-generator']}
      />
    </>
  );
}
