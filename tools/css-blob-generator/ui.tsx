'use client';

import React, { useState, useEffect } from 'react';
import { Shuffle, Copy, Check, Download, Play, Pause, Code, Image as ImageIcon, Sparkles } from 'lucide-react';
import { BlobValues, BackgroundType } from './types';
import {
  generateBorderRadius,
  generateRandomBlob,
  BLOB_PRESETS,
  generateBlobAnimation,
  generateCompleteCSS,
  generateResponsiveCSS,
  generateSVG,
  exportSVG,
  exportCSS,
  exportJSON,
  GRADIENT_PRESETS,
  COLOR_PRESETS
} from './logic';
import CSSBlobGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

type Tab = 'generator' | 'animation' | 'export';

export default function CSSBlobGeneratorUI() {
  const [activeTab, setActiveTab] = useState<Tab>('generator');
  
  // Blob values
  const [values, setValues] = useState<BlobValues>({
    topLeftH: 60, topRightH: 40, bottomRightH: 30, bottomLeftH: 70,
    topLeftV: 50, topRightV: 30, bottomRightV: 70, bottomLeftV: 40
  });

  // Preview settings
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('gradient');
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_PRESETS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [blobSize, setBlobSize] = useState(300);

  // Animation
  const [animation, setAnimation] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDuration, setAnimationDuration] = useState('8');

  // Copy states
  const [copied, setCopied] = useState<string | null>(null);

  // Generate border-radius string
  const borderRadius = generateBorderRadius(values);

  // Update animation when values change
  useEffect(() => {
    const anim = generateBlobAnimation(values, `${animationDuration}s`);
    setAnimation(anim);
  }, [values, animationDuration]);

  // Handle slider change
  const handleSliderChange = (key: keyof BlobValues, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  // Generate random blob
  const handleRandomize = () => {
    setValues(generateRandomBlob());
  };

  // Apply preset
  const handlePreset = (presetValues: BlobValues) => {
    setValues(presetValues);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get background style
  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'gradient':
        return selectedGradient;
      case 'solid':
        return selectedColor;
      case 'transparent':
        return 'transparent';
    }
  };

  const sliders: Array<{ key: keyof BlobValues; label: string; group: 'horizontal' | 'vertical' }> = [
    { key: 'topLeftH', label: 'Top Left', group: 'horizontal' },
    { key: 'topRightH', label: 'Top Right', group: 'horizontal' },
    { key: 'bottomRightH', label: 'Bottom Right', group: 'horizontal' },
    { key: 'bottomLeftH', label: 'Bottom Left', group: 'horizontal' },
    { key: 'topLeftV', label: 'Top Left', group: 'vertical' },
    { key: 'topRightV', label: 'Top Right', group: 'vertical' },
    { key: 'bottomRightV', label: 'Bottom Right', group: 'vertical' },
    { key: 'bottomLeftV', label: 'Bottom Left', group: 'vertical' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            CSS Border-Radius Blob Maker
          </h1>
          <p className="text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Create organic, non-round shapes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'generator'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Generator
          </button>
          <button
            onClick={() => setActiveTab('animation')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'animation'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Play className="w-5 h-5" />
            Animation
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'export'
                ? 'bg-[#058554] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Generator Tab */}
            {activeTab === 'generator' && (
              <>
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Quick Actions</h3>
                  
                  <button
                    onClick={handleRandomize}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
                  >
                    <Shuffle className="w-5 h-5" />
                    Generate Random Blob
                  </button>
                </div>

                {/* Presets */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Preset Blobs</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {BLOB_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handlePreset(preset.values)}
                        className="p-3 rounded-lg border-2 border-slate-200 hover:border-[#058554] hover:bg-green-50 transition-all text-left"
                      >
                        <div className="text-2xl mb-1">{preset.icon}</div>
                        <div className="text-sm font-semibold text-slate-800">{preset.name}</div>
                        <div className="text-xs text-slate-600">{preset.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horizontal Sliders */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Horizontal Radius</h3>
                  
                  {sliders.filter(s => s.group === 'horizontal').map((slider) => (
                    <div key={slider.key}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">{slider.label}</label>
                        <span className="text-sm font-mono text-slate-600">{values[slider.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={values[slider.key]}
                        onChange={(e) => handleSliderChange(slider.key, parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                        style={{
                          background: `linear-gradient(to right, #058554 0%, #058554 ${values[slider.key]}%, #e2e8f0 ${values[slider.key]}%, #e2e8f0 100%)`
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Vertical Sliders */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Vertical Radius</h3>
                  
                  {sliders.filter(s => s.group === 'vertical').map((slider) => (
                    <div key={slider.key}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">{slider.label}</label>
                        <span className="text-sm font-mono text-slate-600">{values[slider.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={values[slider.key]}
                        onChange={(e) => handleSliderChange(slider.key, parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                        style={{
                          background: `linear-gradient(to right, #058554 0%, #058554 ${values[slider.key]}%, #e2e8f0 ${values[slider.key]}%, #e2e8f0 100%)`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Animation Tab */}
            {activeTab === 'animation' && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Animation Settings</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration: {animationDuration}s
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={animationDuration}
                      onChange={(e) => setAnimationDuration(e.target.value)}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                    />
                  </div>

                  <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-all font-medium"
                  >
                    {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isAnimating ? 'Pause Animation' : 'Play Animation'}
                  </button>
                </div>

                {animation && (
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">CSS Keyframes</h3>
                      <button
                        onClick={() => copyToClipboard(animation.css, 'animation')}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                      >
                        {copied === 'animation' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === 'animation' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto">
                      {animation.css}
                    </pre>
                  </div>
                )}
              </>
            )}

            {/* Export Tab */}
            {activeTab === 'export' && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-slate-800">Export Options</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => exportSVG(values)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
                    >
                      <ImageIcon className="w-5 h-5" />
                      Download SVG
                    </button>

                    <button
                      onClick={() => exportCSS(generateCompleteCSS(values))}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                    >
                      <Code className="w-5 h-5" />
                      Download CSS
                    </button>

                    <button
                      onClick={() => exportJSON(values)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all font-medium"
                    >
                      <Download className="w-5 h-5" />
                      Download JSON
                    </button>
                  </div>
                </div>

                {/* Complete CSS */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Complete CSS</h3>
                    <button
                      onClick={() => copyToClipboard(generateCompleteCSS(values, '400px', '400px', getBackgroundStyle()), 'complete')}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                    >
                      {copied === 'complete' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === 'complete' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto">
                    {generateCompleteCSS(values, '400px', '400px', getBackgroundStyle())}
                  </pre>
                </div>

                {/* Responsive CSS */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">Responsive CSS</h3>
                    <button
                      onClick={() => copyToClipboard(generateResponsiveCSS(values), 'responsive')}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                    >
                      {copied === 'responsive' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === 'responsive' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto">
                    {generateResponsiveCSS(values)}
                  </pre>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Preview Settings */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Preview Settings</h3>
              
              {/* Background Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Background</label>
                <div className="flex gap-2">
                  {(['gradient', 'solid', 'transparent'] as BackgroundType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setBackgroundType(type)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        backgroundType === type
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gradient Presets */}
              {backgroundType === 'gradient' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Gradient</label>
                  <div className="grid grid-cols-4 gap-2">
                    {GRADIENT_PRESETS.map((gradient, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedGradient(gradient)}
                        className={`h-12 rounded-lg border-2 transition-all ${
                          selectedGradient === gradient
                            ? 'border-[#058554] scale-110'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        style={{ background: gradient }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Color Presets */}
              {backgroundType === 'solid' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {COLOR_PRESETS.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`h-12 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? 'border-[#058554] scale-110'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Slider */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Size: {blobSize}px
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={blobSize}
                  onChange={(e) => setBlobSize(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800">Live Preview</h3>
              
              <div 
                className="flex items-center justify-center min-h-[400px] rounded-lg"
                style={{
                  background: backgroundType === 'transparent' 
                    ? 'repeating-conic-gradient(#e2e8f0 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                    : '#f8fafc'
                }}
              >
                <div
                  className="transition-all duration-300"
                  style={{
                    width: `${blobSize}px`,
                    height: `${blobSize}px`,
                    background: getBackgroundStyle(),
                    borderRadius: borderRadius,
                    animation: isAnimating ? `blob-morph ${animationDuration}s ease-in-out infinite` : 'none'
                  }}
                />
              </div>
            </div>

            {/* Border Radius Value */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Border Radius</h3>
                <button
                  onClick={() => copyToClipboard(`border-radius: ${borderRadius};`, 'radius')}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#058554] hover:bg-green-50 rounded transition-colors"
                >
                  {copied === 'radius' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'radius' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                border-radius: {borderRadius};
              </pre>
            </div>
          </div>
        </div>

        {/* Animation Keyframes */}
        <style jsx>{`
          @keyframes blob-morph {
            0%, 100% {
              border-radius: ${borderRadius};
            }
            50% {
              border-radius: ${generateBorderRadius(generateRandomBlob())};
            }
          }
        `}</style>
      </div>

      <CSSBlobGeneratorSEOContent />
      <RelatedTools
        currentTool="css-border-radius-blob"
        tools={["css-gradient-generator", "css-box-shadow-generator", "neumorphism-generator"]}
      />
    </div>
  );
}
