'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Copy, Download, RefreshCw, TrendingUp, Code, Sliders, Type, Check, AlertCircle } from 'lucide-react';
import { ClampConfig, ClampResult, TypographyScale } from './types';
import {
  defaultClampConfig,
  breakpointPresets,
  propertyPresets,
  calculateClamp,
  calculateValueAtViewport,
  generateTypographyScale,
  parseClampValue,
  generateCodeFormats,
  saveLastConfig,
  loadLastConfig,
  copyToClipboard,
  downloadFile,
  generateCSSFile,
  validateAccessibility,
  debounce
} from './logic';
import CSSClampGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function CSSClampGenerator() {
  const [config, setConfig] = useState<ClampConfig>(() => {
    const saved = loadLastConfig();
    return saved || defaultClampConfig;
  });
  
  const [result, setResult] = useState<ClampResult>(calculateClamp(config));
  const [currentViewport, setCurrentViewport] = useState(768);
  const [activeTab, setActiveTab] = useState<'generator' | 'scale' | 'parser'>('generator');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [typographyScale, setTypographyScale] = useState<TypographyScale | null>(null);
  const [parserInput, setParserInput] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update result when config changes
  useEffect(() => {
    const newResult = calculateClamp(config);
    setResult(newResult);
    saveLastConfig(config);
    setWarnings(validateAccessibility(config));
    drawGraph();
  }, [config]);

  // Draw scaling graph
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    // Draw grid
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = padding + (height - 2 * padding) * (i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw clamp line
    const { minValue, maxValue, minViewport, maxViewport } = config;
    const viewportRange = maxViewport - minViewport;
    const valueRange = maxValue - minValue;

    ctx.strokeStyle = '#058554';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let vp = minViewport; vp <= maxViewport; vp += 10) {
      const x = padding + ((vp - minViewport) / viewportRange) * (width - 2 * padding);
      const value = calculateValueAtViewport(config, vp);
      const y = height - padding - ((value - minValue) / valueRange) * (height - 2 * padding);
      
      if (vp === minViewport) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw min/max points
    ctx.fillStyle = '#058554';
    const minX = padding;
    const minY = height - padding;
    const maxX = width - padding;
    const maxY = padding;
    
    ctx.beginPath();
    ctx.arc(minX, minY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(maxX, maxY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${minViewport}px`, padding, height - 20);
    ctx.fillText(`${maxViewport}px`, width - padding - 40, height - 20);
    ctx.fillText(`${minValue}${config.unit}`, 5, height - padding);
    ctx.fillText(`${maxValue}${config.unit}`, 5, padding + 15);
  }, [config]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  const updateConfig = useCallback((updates: Partial<ClampConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleCopy = async (text: string, label: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedCode(label);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const handlePresetBreakpoint = (preset: typeof breakpointPresets[0]) => {
    updateConfig({
      minViewport: preset.minViewport,
      maxViewport: preset.maxViewport
    });
  };

  const handlePresetProperty = (preset: typeof propertyPresets[0]) => {
    updateConfig({
      property: preset.property,
      minValue: preset.defaultMin,
      maxValue: preset.defaultMax,
      unit: preset.unit
    });
  };

  const handleGenerateScale = () => {
    const scale = generateTypographyScale(config);
    setTypographyScale(scale);
    setActiveTab('scale');
  };

  const handleParseClamp = () => {
    const parsed = parseClampValue(parserInput);
    if (parsed.isValid) {
      updateConfig({
        minValue: parsed.minValue,
        maxValue: parsed.maxValue,
        unit: parsed.unit as 'px' | 'rem' | 'em'
      });
      setActiveTab('generator');
    }
  };

  const handleDownloadCSS = () => {
    const css = generateCSSFile([config]);
    downloadFile(css, 'clamp-values.css', 'text/css');
  };

  const currentValue = calculateValueAtViewport(config, currentViewport);
  const codeFormats = generateCodeFormats(result, config.property);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">CSS Clamp Generator</h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Generate responsive CSS clamp() values for fluid typography, spacing, and layouts with live preview and instant code output.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'generator' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Generator
            </button>
            <button
              onClick={() => setActiveTab('scale')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'scale' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Type className="w-4 h-4" />
              Typography Scale
            </button>
            <button
              onClick={() => setActiveTab('parser')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'parser' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Code className="w-4 h-4" />
              Parser
            </button>
          </div>
        </div>

        {activeTab === 'generator' && (
          <>
            {/* Configuration */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 space-y-6">
                <h3 className="text-lg font-semibold">Configuration</h3>

                {/* Property Selector */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">CSS Property</label>
                  <select
                    value={config.property}
                    onChange={(e) => updateConfig({ property: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {propertyPresets.map(preset => (
                      <option key={preset.property} value={preset.property}>
                        {preset.name} - {preset.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Quick Presets</label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyPresets.slice(0, 4).map(preset => (
                      <button
                        key={preset.property}
                        onClick={() => handlePresetProperty(preset)}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Min Value</label>
                    <input
                      type="number"
                      value={config.minValue}
                      onChange={(e) => updateConfig({ minValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Max Value</label>
                    <input
                      type="number"
                      value={config.maxValue}
                      onChange={(e) => updateConfig({ maxValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Viewports */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Min Viewport (px)</label>
                    <input
                      type="number"
                      value={config.minViewport}
                      onChange={(e) => updateConfig({ minViewport: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Max Viewport (px)</label>
                    <input
                      type="number"
                      value={config.maxViewport}
                      onChange={(e) => updateConfig({ maxViewport: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Breakpoint Presets */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Breakpoint Presets</label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {breakpointPresets.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => handlePresetBreakpoint(preset)}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Unit Selector */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Unit</label>
                  <div className="flex gap-2">
                    {(['px', 'rem', 'em'] as const).map(unit => (
                      <button
                        key={unit}
                        onClick={() => updateConfig({ unit })}
                        className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                          config.unit === unit ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                {config.unit !== 'px' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Root Font Size (px)</label>
                    <input
                      type="number"
                      value={config.rootFontSize}
                      onChange={(e) => updateConfig({ rootFontSize: parseFloat(e.target.value) || 16 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}

                {/* Warnings */}
                {warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    {warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-yellow-800">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preview & Graph */}
              <div className="space-y-6">
                {/* Live Preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                  
                  <div className="space-y-4">
                    {config.property === 'font-size' && (
                      <>
                        <div style={{ fontSize: result.css }}>
                          <h2 className="font-bold">Heading Preview</h2>
                        </div>
                        <div style={{ fontSize: result.css }}>
                          <p>This is a paragraph with fluid font size that scales between viewports.</p>
                        </div>
                        <button
                          style={{ fontSize: result.css }}
                          className="bg-primary text-white px-4 py-2 rounded-lg"
                        >
                          Button Preview
                        </button>
                      </>
                    )}
                    
                    {config.property === 'padding' && (
                      <div
                        style={{ padding: result.css }}
                        className="bg-gray-100 border border-gray-300 rounded-lg"
                      >
                        <p className="text-sm">Element with fluid padding</p>
                      </div>
                    )}
                    
                    {config.property === 'margin' && (
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div style={{ margin: result.css }} className="bg-primary text-white p-4 rounded">
                          Element with fluid margin
                        </div>
                      </div>
                    )}
                    
                    {config.property === 'gap' && (
                      <div style={{ gap: result.css }} className="flex flex-wrap">
                        <div className="bg-primary text-white px-4 py-2 rounded">Item 1</div>
                        <div className="bg-primary text-white px-4 py-2 rounded">Item 2</div>
                        <div className="bg-primary text-white px-4 py-2 rounded">Item 3</div>
                      </div>
                    )}
                    
                    {config.property === 'border-radius' && (
                      <div
                        style={{ borderRadius: result.css }}
                        className="bg-primary text-white p-6 text-center"
                      >
                        Fluid border radius
                      </div>
                    )}
                  </div>
                </div>

                {/* Scaling Graph */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Scaling Graph
                  </h3>
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={300}
                    className="w-full h-auto border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Viewport Simulator */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
              <h3 className="text-lg font-semibold mb-4">Viewport Simulator</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Current Viewport: {currentViewport}px
                  </span>
                  <span className="text-sm font-medium text-primary">
                    Value: {currentValue.toFixed(2)}{config.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="320"
                  max="1920"
                  value={currentViewport}
                  onChange={(e) => setCurrentViewport(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>320px</span>
                  <span>768px</span>
                  <span>1024px</span>
                  <span>1440px</span>
                  <span>1920px</span>
                </div>
              </div>
            </div>

            {/* Code Output */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Generated Code</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerateScale}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Type className="w-4 h-4" />
                    Generate Scale
                  </button>
                  <button
                    onClick={handleDownloadCSS}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* CSS */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">CSS</label>
                  <div className="relative">
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      {codeFormats.css}
                    </div>
                    <button
                      onClick={() => handleCopy(codeFormats.css, 'css')}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedCode === 'css' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                {/* CSS Variable */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">CSS Variable</label>
                  <div className="relative">
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      {codeFormats.cssVariable}
                    </div>
                    <button
                      onClick={() => handleCopy(codeFormats.cssVariable, 'var')}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedCode === 'var' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                {/* SCSS Variable */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">SCSS Variable</label>
                  <div className="relative">
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      {codeFormats.scssVariable}
                    </div>
                    <button
                      onClick={() => handleCopy(codeFormats.scssVariable, 'scss')}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedCode === 'scss' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                {/* Tailwind */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Tailwind CSS</label>
                  <div className="relative">
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      {codeFormats.tailwind}
                    </div>
                    <button
                      onClick={() => handleCopy(codeFormats.tailwind, 'tailwind')}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedCode === 'tailwind' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'scale' && typographyScale && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-6">Typography Scale</h3>
            <div className="space-y-6">
              {Object.entries(typographyScale).map(([tag, result]) => (
                <div key={tag} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 uppercase">{tag}</span>
                    <button
                      onClick={() => handleCopy(result.css, tag)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {copiedCode === tag ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                  <div style={{ fontSize: result.css }} className="mb-2">
                    {tag === 'body' ? 'The quick brown fox jumps over the lazy dog' : `${tag.toUpperCase()} Heading`}
                  </div>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {result.css}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'parser' && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Clamp Value Parser</h3>
            <p className="text-sm text-gray-600 mb-4">
              Paste an existing clamp() value to extract its configuration
            </p>
            <div className="space-y-4">
              <textarea
                value={parserInput}
                onChange={(e) => setParserInput(e.target.value)}
                placeholder="clamp(16px, 2vw + 12px, 32px)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                rows={3}
              />
              <button
                onClick={handleParseClamp}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Parse & Load
              </button>
            </div>
          </div>
        )}
      </div>

      <CSSClampGeneratorSEOContent />
      
      <RelatedTools
        currentTool="css-clamp-generator"
        tools={['css-gradient-generator', 'neumorphism-generator', 'css-animation-previewer']}
      />
    </>
  );
}