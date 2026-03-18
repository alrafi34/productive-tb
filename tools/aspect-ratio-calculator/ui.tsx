'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Image as ImageIcon, Copy, Check, Download, Upload, Maximize2, Code, RefreshCw } from 'lucide-react';
import { Preset, ImageInfo, CSSOutput } from './types';
import {
  simplifyRatio,
  parseRatio,
  calculateHeight,
  calculateWidth,
  PRESETS,
  generateCSS,
  processImage,
  convertResolution,
  exportAsJSON,
  exportAsText,
  COMMON_RESOLUTIONS
} from './logic';
import AspectRatioCalculatorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

type Tab = 'calculator' | 'converter' | 'image';

export default function AspectRatioCalculatorUI() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  
  // Calculator state
  const [width, setWidth] = useState<string>('1920');
  const [height, setHeight] = useState<string>('1080');
  const [ratio, setRatio] = useState<string>('16:9');
  const [simplified, setSimplified] = useState<string>('16:9');
  const [sliderWidth, setSliderWidth] = useState<number>(1920);
  
  // CSS output
  const [cssOutput, setCssOutput] = useState<CSSOutput | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  
  // Image upload
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Converter state
  const [convertWidth, setConvertWidth] = useState<string>('1920');
  const [convertHeight, setConvertHeight] = useState<string>('1080');
  const [targetRatio, setTargetRatio] = useState<string>('4:3');
  const [conversionResult, setConversionResult] = useState<any>(null);

  // Update calculations when inputs change
  useEffect(() => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    
    if (w > 0 && h > 0) {
      const simplified = simplifyRatio(w, h);
      setSimplified(simplified);
      setRatio(simplified);
      
      const parsed = parseRatio(simplified);
      if (parsed) {
        const css = generateCSS(parsed.width, parsed.height);
        setCssOutput(css);
      }
    }
  }, [width, height]);

  // Handle ratio change
  const handleRatioChange = (newRatio: string) => {
    setRatio(newRatio);
    const parsed = parseRatio(newRatio);
    
    if (parsed) {
      const w = parseFloat(width);
      if (w > 0) {
        const newHeight = calculateHeight(w, parsed.width, parsed.height);
        setHeight(newHeight.toString());
      }
      
      const css = generateCSS(parsed.width, parsed.height);
      setCssOutput(css);
    }
  };

  // Handle width change
  const handleWidthChange = (newWidth: string) => {
    setWidth(newWidth);
    const w = parseFloat(newWidth);
    const parsed = parseRatio(ratio);
    
    if (w > 0 && parsed) {
      const newHeight = calculateHeight(w, parsed.width, parsed.height);
      setHeight(newHeight.toString());
      setSliderWidth(w);
    }
  };

  // Handle height change
  const handleHeightChange = (newHeight: string) => {
    setHeight(newHeight);
    const h = parseFloat(newHeight);
    const parsed = parseRatio(ratio);
    
    if (h > 0 && parsed) {
      const newWidth = calculateWidth(h, parsed.width, parsed.height);
      setWidth(newWidth.toString());
      setSliderWidth(newWidth);
    }
  };

  // Handle slider change
  const handleSliderChange = (value: number) => {
    setSliderWidth(value);
    setWidth(value.toString());
    
    const parsed = parseRatio(ratio);
    if (parsed) {
      const newHeight = calculateHeight(value, parsed.width, parsed.height);
      setHeight(newHeight.toString());
    }
  };

  // Handle preset click
  const handlePresetClick = (preset: Preset) => {
    const newRatio = preset.ratio;
    setRatio(newRatio);
    handleRatioChange(newRatio);
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const info = await processImage(file);
      setImageInfo(info);
    } catch (error) {
      console.error('Image processing failed:', error);
    }
  };

  // Handle conversion
  const handleConvert = () => {
    const w = parseFloat(convertWidth);
    const h = parseFloat(convertHeight);
    const parsed = parseRatio(targetRatio);
    
    if (w > 0 && h > 0 && parsed) {
      const result = convertResolution(w, h, parsed.width, parsed.height, 'fit-width');
      setConversionResult(result);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Calculate preview box dimensions
  const getPreviewDimensions = () => {
    const parsed = parseRatio(ratio);
    if (!parsed) return { width: 200, height: 200 };
    
    const maxSize = 300;
    const aspectRatio = parsed.width / parsed.height;
    
    let previewWidth = maxSize;
    let previewHeight = maxSize / aspectRatio;
    
    if (previewHeight > maxSize) {
      previewHeight = maxSize;
      previewWidth = maxSize * aspectRatio;
    }
    
    return { width: previewWidth, height: previewHeight };
  };

  const previewDims = getPreviewDimensions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'calculator'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'converter'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
            Converter
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'image'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Image Upload
          </button>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Input Panel */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#058554]" />
                Dimensions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg font-mono"
                    placeholder="1920"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg font-mono"
                    placeholder="1080"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Aspect Ratio</label>
                  <input
                    type="text"
                    value={ratio}
                    onChange={(e) => handleRatioChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-lg font-mono"
                    placeholder="16:9"
                  />
                </div>
              </div>

              {simplified && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm text-green-800">
                    <strong>Simplified Ratio:</strong> {simplified}
                  </span>
                </div>
              )}
            </div>

            {/* Visual Preview */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-[#058554]" />
                Visual Preview
              </h3>

              <div className="flex items-center justify-center min-h-[350px] bg-slate-50 rounded-lg p-8">
                <div
                  className="bg-gradient-to-br from-[#058554] to-[#047045] rounded-lg shadow-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    width: `${previewDims.width}px`,
                    height: `${previewDims.height}px`
                  }}
                >
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">{ratio}</div>
                    <div className="text-sm opacity-90 mt-1">{width} × {height}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resize Simulator */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Resize Simulator</h3>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Width: {sliderWidth}px</label>
                  <span className="text-sm text-slate-600">Height: {height}px</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  value={sliderWidth}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                  style={{
                    background: `linear-gradient(to right, #058554 0%, #058554 ${((sliderWidth - 100) / 3900) * 100}%, #e2e8f0 ${((sliderWidth - 100) / 3900) * 100}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>100px</span>
                  <span>4000px</span>
                </div>
              </div>
            </div>

            {/* Preset Ratios */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Preset Aspect Ratios</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      ratio === preset.ratio
                        ? 'border-[#058554] bg-green-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{preset.icon}</div>
                    <div className="font-semibold text-slate-800">{preset.label}</div>
                    <div className="text-xs text-slate-600">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CSS Output */}
            {cssOutput && (
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#058554]" />
                  CSS Code
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Modern (aspect-ratio)</span>
                      <button
                        onClick={() => copyToClipboard(cssOutput.aspectRatio, 'aspect-ratio')}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                      >
                        {copied === 'aspect-ratio' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === 'aspect-ratio' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      {cssOutput.aspectRatio}
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Legacy (padding-top)</span>
                      <button
                        onClick={() => copyToClipboard(cssOutput.paddingTop, 'padding')}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                      >
                        {copied === 'padding' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === 'padding' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      {cssOutput.paddingTop}
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Responsive Container</span>
                      <button
                        onClick={() => copyToClipboard(cssOutput.container, 'container')}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                      >
                        {copied === 'container' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === 'container' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      {cssOutput.container}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(`${width} × ${height}`, 'dimensions')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
              >
                {copied === 'dimensions' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied === 'dimensions' ? 'Copied!' : 'Copy Dimensions'}
              </button>
              <button
                onClick={() => exportAsJSON({ width: parseFloat(width), height: parseFloat(height), ratio, simplified })}
                className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                title="Export as JSON"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => exportAsText({ width: parseFloat(width), height: parseFloat(height), ratio, simplified })}
                className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                title="Export as TXT"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Common Resolutions */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Common Resolutions</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {COMMON_RESOLUTIONS.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setWidth(res.width.toString());
                      setHeight(res.height.toString());
                      setSliderWidth(res.width);
                    }}
                    className="p-3 text-left border-2 border-slate-200 rounded-lg hover:border-[#058554] hover:bg-green-50 transition-all"
                  >
                    <div className="text-sm font-semibold text-slate-800">{res.label}</div>
                    <div className="text-xs text-slate-600">{res.width} × {res.height}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Converter Tab */}
        {activeTab === 'converter' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#058554]" />
                Resolution Converter
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Original Width</label>
                  <input
                    type="number"
                    value={convertWidth}
                    onChange={(e) => setConvertWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                    placeholder="1920"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Original Height</label>
                  <input
                    type="number"
                    value={convertHeight}
                    onChange={(e) => setConvertHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                    placeholder="1080"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Aspect Ratio</label>
                <input
                  type="text"
                  value={targetRatio}
                  onChange={(e) => setTargetRatio(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                  placeholder="4:3"
                />
              </div>

              <button
                onClick={handleConvert}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                Convert Resolution
              </button>

              {conversionResult && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Original</div>
                      <div className="text-lg font-bold text-slate-800">
                        {conversionResult.originalWidth} × {conversionResult.originalHeight}
                      </div>
                      <div className="text-sm text-slate-600">{conversionResult.originalRatio}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Converted</div>
                      <div className="text-lg font-bold text-[#058554]">
                        {conversionResult.newWidth} × {conversionResult.newHeight}
                      </div>
                      <div className="text-sm text-slate-600">{conversionResult.newRatio}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Upload Tab */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#058554]" />
                Image Ratio Detection
              </h3>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-[#058554] hover:bg-slate-50 transition-all"
              >
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-slate-600">Click to upload image</span>
              </button>

              {imageInfo && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{imageInfo.fileName}</p>
                      <p className="text-sm text-slate-600">{(imageInfo.fileSize / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>

                  <div className="relative rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={imageInfo.url}
                      alt="Uploaded"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="text-sm text-slate-600">Dimensions</div>
                      <div className="text-lg font-bold text-slate-800">
                        {imageInfo.width} × {imageInfo.height}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Aspect Ratio</div>
                      <div className="text-lg font-bold text-[#058554]">{imageInfo.simplified}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setWidth(imageInfo.width.toString());
                      setHeight(imageInfo.height.toString());
                      setRatio(imageInfo.simplified);
                      setActiveTab('calculator');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
                  >
                    Use These Dimensions
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AspectRatioCalculatorSEOContent />
      <RelatedTools
        currentTool="aspect-ratio-calculator"
        tools={["image-resizer", "image-compressor", "css-gradient-generator"]}
      />
    </div>
  );
}
