'use client';

import React, { useState, useCallback } from 'react';
import { Copy, Download, RotateCcw, Plus, Minus } from 'lucide-react';
import { GradientSettings, TextSettings, ColorStop } from './types';
import { 
  defaultGradient, 
  defaultText, 
  gradientPresets,
  generateGradientCSS,
  generateTextCSS,
  generateTailwindCSS,
  generateSCSSVariables,
  generateHTMLWithInlineCSS,
  generateRandomId
} from './logic';
import GradientTextGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function GradientTextGenerator() {
  const [gradient, setGradient] = useState<GradientSettings>(defaultGradient);
  const [text, setText] = useState<TextSettings>(defaultText);
  const [background, setBackground] = useState('#ffffff');
  const [exportFormat, setExportFormat] = useState<'css' | 'tailwind' | 'scss' | 'html'>('css');
  const [copiedCode, setCopiedCode] = useState(false);

  const updateGradient = useCallback((updates: Partial<GradientSettings>) => {
    setGradient(prev => ({ ...prev, ...updates }));
  }, []);

  const updateText = useCallback((updates: Partial<TextSettings>) => {
    setText(prev => ({ ...prev, ...updates }));
  }, []);

  const addColorStop = () => {
    const newStop: ColorStop = {
      id: generateRandomId(),
      color: '#ff0000',
      position: 50
    };
    updateGradient({ colorStops: [...gradient.colorStops, newStop] });
  };

  const removeColorStop = (id: string) => {
    if (gradient.colorStops.length > 2) {
      updateGradient({ colorStops: gradient.colorStops.filter(stop => stop.id !== id) });
    }
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    updateGradient({
      colorStops: gradient.colorStops.map(stop => 
        stop.id === id ? { ...stop, ...updates } : stop
      )
    });
  };

  const applyPreset = (preset: typeof gradientPresets[0]) => {
    updateGradient({ ...gradient, ...preset.gradient });
  };

  const resetAll = () => {
    setGradient(defaultGradient);
    setText(defaultText);
    setBackground('#ffffff');
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case 'tailwind': return generateTailwindCSS(gradient, text);
      case 'scss': return generateSCSSVariables(gradient, text);
      case 'html': return generateHTMLWithInlineCSS(gradient, text);
      default: return generateTextCSS(gradient, text);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(getExportCode());
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const gradientStyle = {
    background: generateGradientCSS(gradient),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: `${text.fontSize}px`,
    fontWeight: text.fontWeight,
    letterSpacing: `${text.letterSpacing}px`,
    lineHeight: text.lineHeight,
    textAlign: text.textAlign as any
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Preview Section */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Text Preview */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Live Preview</h3>
                <div 
                  className="min-h-32 flex items-center justify-center p-4 sm:p-8 rounded-lg"
                  style={{ backgroundColor: background }}
                >
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateText({ content: e.currentTarget.textContent || 'Gradient Text' })}
                    style={gradientStyle}
                    className="outline-none cursor-text break-words text-center"
                  >
                    {text.content}
                  </div>
                </div>
                
                {/* Background Options */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Background:</span>
                  <div className="flex gap-2 flex-wrap">
                    {['#ffffff', '#000000', '#f3f4f6', '#1f2937'].map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBackground(bg)}
                        className={`w-8 h-8 rounded border-2 flex-shrink-0 ${background === bg ? 'border-primary' : 'border-gray-300'}`}
                        style={{ backgroundColor: bg }}
                      />
                    ))}
                    <input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
                    />
                  </div>
                </div>
              </div>

              {/* Code Output */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold">Generated Code</h3>
                  <div className="flex gap-2 flex-wrap">
                    {(['css', 'tailwind', 'scss', 'html'] as const).map((format) => (
                      <button
                        key={format}
                        onClick={() => setExportFormat(format)}
                        className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
                          exportFormat === format 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre">
                  {getExportCode()}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={copyCode}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm flex-1 sm:flex-none"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button
                    onClick={resetAll}
                    className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm flex-1 sm:flex-none"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="space-y-4 sm:space-y-6">
              {/* Text Settings */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Text Settings</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Text Content</label>
                    <input
                      type="text"
                      value={text.content}
                      onChange={(e) => updateText({ content: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Font Size: {text.fontSize}px</label>
                    <input
                      type="range"
                      min="16"
                      max="150"
                      value={text.fontSize}
                      onChange={(e) => updateText({ fontSize: Number(e.target.value) })}
                      className="w-full mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Font Weight</label>
                    <select
                      value={text.fontWeight}
                      onChange={(e) => updateText({ fontWeight: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    >
                      <option value="normal">Normal</option>
                      <option value="500">Medium</option>
                      <option value="600">Semibold</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Text Align</label>
                    <select
                      value={text.textAlign}
                      onChange={(e) => updateText({ textAlign: e.target.value as any })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Gradient Type */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Gradient Type</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['linear', 'radial', 'conic'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => updateGradient({ type })}
                      className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors capitalize ${
                        gradient.type === type 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                
                {gradient.type === 'linear' && (
                  <div className="mt-4">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Angle: {gradient.angle}°</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={gradient.angle}
                      onChange={(e) => updateGradient({ angle: Number(e.target.value) })}
                      className="w-full mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Color Stops */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold">Colors</h3>
                  <button
                    onClick={addColorStop}
                    className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-primary text-white rounded hover:bg-primary/90"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {gradient.colorStops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                        className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) => updateColorStop(stop.id, { position: Number(e.target.value) })}
                        className="flex-1 min-w-0"
                      />
                      <span className="text-xs text-gray-600 w-8 flex-shrink-0">{stop.position}%</span>
                      {gradient.colorStops.length > 2 && (
                        <button
                          onClick={() => removeColorStop(stop.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded flex-shrink-0"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Presets</h3>
                <div className="space-y-2">
                  {gradientPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-xs text-gray-600">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GradientTextGeneratorSEOContent />
      
      <RelatedTools
        currentTool="gradient-text-generator"
        tools={['css-gradient-generator', 'hsl-color-slider', 'color-palette-generator']}
      />
    </>
  );
}