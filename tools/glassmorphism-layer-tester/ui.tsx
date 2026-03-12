"use client";

import { useState, useEffect, useRef } from "react";
import {
  DEFAULT_GLASS_LAYER,
  GLASS_PRESETS,
  BACKGROUND_SCENES,
  generateGlassCSS,
  generateTailwindCSS,
  generateSCSS,
  generateJSON,
  generateMinifiedCSS,
  generateNoiseTexture,
  copyToClipboard,
  downloadFile,
  applyGlassStyle
} from "./logic";
import { GlassLayer, BackgroundScene, NoiseSettings, DeviceSize, ExportFormat, ComponentPreview } from "./types";
import GlassmorphismLayerTesterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GlassmorphismLayerTesterUI() {
  const [glassLayer, setGlassLayer] = useState<GlassLayer>(DEFAULT_GLASS_LAYER);
  const [background, setBackground] = useState<BackgroundScene>(BACKGROUND_SCENES[0]);
  const [noiseSettings, setNoiseSettings] = useState<NoiseSettings>({
    enabled: false,
    intensity: 30,
    opacity: 0.05
  });
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [componentType, setComponentType] = useState<ComponentPreview['type']>('card');
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const glassRef = useRef<HTMLDivElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);

  // Apply glass style to preview element
  useEffect(() => {
    if (glassRef.current) {
      applyGlassStyle(glassRef.current, glassLayer);
    }
  }, [glassLayer]);

  // Generate noise texture
  useEffect(() => {
    if (noiseSettings.enabled && noiseCanvasRef.current) {
      noiseCanvasRef.current.width = 200;
      noiseCanvasRef.current.height = 200;
      generateNoiseTexture(noiseCanvasRef.current, noiseSettings);
    }
  }, [noiseSettings]);

  const updateGlassLayer = <K extends keyof GlassLayer>(key: K, value: GlassLayer[K]) => {
    setGlassLayer(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetIndex: number) => {
    const preset = GLASS_PRESETS[presetIndex];
    setGlassLayer(prev => ({ ...prev, ...preset.settings }));
  };

  const handleCopy = async () => {
    let content = '';
    switch (exportFormat) {
      case 'css':
        content = generateGlassCSS(glassLayer, true);
        break;
      case 'tailwind':
        content = generateTailwindCSS(glassLayer);
        break;
      case 'scss':
        content = generateSCSS(glassLayer);
        break;
      case 'json':
        content = generateJSON(glassLayer);
        break;
    }
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = generateGlassCSS(glassLayer, true);
    downloadFile(content, 'glassmorphism.css');
  };

  const handleReset = () => {
    setGlassLayer(DEFAULT_GLASS_LAYER);
    setNoiseSettings({ enabled: false, intensity: 30, opacity: 0.05 });
    setDeviceSize('desktop');
  };

  const getDeviceWidth = () => {
    switch (deviceSize) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
    }
  };

  const getComponentContent = () => {
    switch (componentType) {
      case 'card':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Glass Card</h3>
            <p className="text-sm opacity-80" style={{ fontFamily: "var(--font-body)" }}>
              This is a glassmorphism card component with backdrop blur effect.
            </p>
            <button className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium">
              Button
            </button>
          </div>
        );
      case 'navbar':
        return (
          <div className="flex items-center justify-between p-4">
            <div className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Logo</div>
            <div className="flex gap-4 text-sm">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>
        );
      case 'modal':
        return (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Modal Title</h3>
            <p className="text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
              This is a modal dialog with glassmorphism effect.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 rounded-lg text-sm">Cancel</button>
              <button className="px-4 py-2 bg-white/30 rounded-lg text-sm">Confirm</button>
            </div>
          </div>
        );
      case 'input':
        return (
          <div className="p-6">
            <label className="block text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Input Field</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
        );
    }
  };

  const generatedCode = () => {
    switch (exportFormat) {
      case 'css':
        return generateGlassCSS(glassLayer, true);
      case 'tailwind':
        return generateTailwindCSS(glassLayer);
      case 'scss':
        return generateSCSS(glassLayer);
      case 'json':
        return generateJSON(glassLayer);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Live Preview Section */}
        <div className="mb-8">
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Live Preview
            </label>
            <div className="flex flex-wrap gap-2">
              {['mobile', 'tablet', 'desktop'].map((size) => (
                <button
                  key={size}
                  onClick={() => setDeviceSize(size as DeviceSize)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    deviceSize === size
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div 
            className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg"
            style={{ 
              background: background.value,
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Noise overlay */}
            {noiseSettings.enabled && (
              <canvas
                ref={noiseCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ 
                  opacity: noiseSettings.opacity,
                  mixBlendMode: 'overlay'
                }}
              />
            )}
            
            {/* Glass layer */}
            <div
              ref={glassRef}
              className="relative text-white"
              style={{
                width: deviceSize === 'mobile' ? '90%' : deviceSize === 'tablet' ? '80%' : '600px',
                maxWidth: getDeviceWidth(),
                minHeight: componentType === 'navbar' ? 'auto' : '200px'
              }}
            >
              {getComponentContent()}
            </div>
          </div>

          {/* Background Selector */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Background Scene</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {BACKGROUND_SCENES.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setBackground(bg)}
                  className={`h-12 rounded-lg border-2 transition-all ${
                    background.id === bg.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                  }`}
                  style={{ background: bg.value }}
                  title={bg.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Quick Presets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GLASS_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(idx)}
                    className="text-left bg-gray-50 hover:bg-primary hover:text-white text-gray-700 px-3 py-2 rounded-lg transition-colors border border-gray-200"
                  >
                    <div className="text-xs font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                      {preset.name}
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">
                      {preset.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Component Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Component Preview
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['card', 'navbar', 'modal', 'input'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setComponentType(type)}
                    className={`text-xs px-2 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      componentType === type
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Blur Intensity: {glassLayer.blur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={glassLayer.blur}
                  onChange={(e) => updateGlassLayer('blur', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Transparency: {glassLayer.opacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={glassLayer.opacity}
                  onChange={(e) => updateGlassLayer('opacity', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Tint Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={glassLayer.tintColor}
                    onChange={(e) => updateGlassLayer('tintColor', e.target.value)}
                    className="w-12 h-8 rounded border border-gray-200 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={glassLayer.tintColor}
                    onChange={(e) => updateGlassLayer('tintColor', e.target.value)}
                    className="flex-1 text-xs border border-gray-200 rounded px-2 min-w-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Border Width: {glassLayer.borderWidth}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={glassLayer.borderWidth}
                  onChange={(e) => updateGlassLayer('borderWidth', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Border Opacity: {glassLayer.borderOpacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={glassLayer.borderOpacity}
                  onChange={(e) => updateGlassLayer('borderOpacity', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Shadow Blur: {glassLayer.shadowBlur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={glassLayer.shadowBlur}
                  onChange={(e) => updateGlassLayer('shadowBlur', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Shadow Opacity: {glassLayer.shadowOpacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={glassLayer.shadowOpacity}
                  onChange={(e) => updateGlassLayer('shadowOpacity', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Border Radius: {glassLayer.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={glassLayer.borderRadius}
                  onChange={(e) => updateGlassLayer('borderRadius', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {showAdvanced ? '▼' : '▶'} Advanced Options
              </button>
              
              {showAdvanced && (
                <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="noise"
                      checked={noiseSettings.enabled}
                      onChange={(e) => setNoiseSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="noise" className="text-xs text-gray-600">
                      Enable Noise Overlay
                    </label>
                  </div>

                  {noiseSettings.enabled && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          Noise Intensity: {noiseSettings.intensity}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={noiseSettings.intensity}
                          onChange={(e) => setNoiseSettings(prev => ({ ...prev, intensity: Number(e.target.value) }))}
                          className="w-full accent-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          Noise Opacity: {noiseSettings.opacity.toFixed(2)}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="0.3"
                          step="0.01"
                          value={noiseSettings.opacity}
                          onChange={(e) => setNoiseSettings(prev => ({ ...prev, opacity: Number(e.target.value) }))}
                          className="w-full accent-primary"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Shadow Spread: {glassLayer.shadowSpread}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={glassLayer.shadowSpread}
                      onChange={(e) => updateGlassLayer('shadowSpread', Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Border Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={glassLayer.borderColor}
                        onChange={(e) => updateGlassLayer('borderColor', e.target.value)}
                        className="w-12 h-8 rounded border border-gray-200 flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={glassLayer.borderColor}
                        onChange={(e) => updateGlassLayer('borderColor', e.target.value)}
                        className="flex-1 text-xs border border-gray-200 rounded px-2 min-w-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output & Export Panel */}
          <div className="space-y-6">
            {/* Export Format Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Export Format
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['css', 'tailwind', 'scss', 'json'] as ExportFormat[]).map((format) => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={`text-xs px-2 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      exportFormat === format
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Generated Code
              </label>
              <div className="relative">
                <pre 
                  className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto max-h-[300px] min-h-[250px] font-mono leading-relaxed"
                  style={{ 
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere'
                  }}
                >
                  {generatedCode()}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 bg-primary hover:bg-primary-hover text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>

            {/* Minified CSS */}
            {exportFormat === 'css' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Minified CSS
                </label>
                <div className="relative">
                  <pre 
                    className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto max-h-[200px] font-mono"
                    style={{ 
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {generateMinifiedCSS(glassLayer)}
                  </pre>
                  <button
                    onClick={async () => {
                      await copyToClipboard(generateMinifiedCSS(glassLayer));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="absolute top-3 right-3 bg-primary hover:bg-primary-hover text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied ? "✅" : "📋"}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 sm:gap-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy Code"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 sm:gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📥 Download CSS
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 sm:gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <GlassmorphismLayerTesterSEOContent />
      
      <RelatedTools
        currentTool="glassmorphism-layer-tester"
        tools={['css-glassmorphism-generator', 'pattern-noise-generator', 'neumorphism-generator']}
      />
    </>
  );
}
