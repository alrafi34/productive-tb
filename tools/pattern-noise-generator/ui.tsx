"use client";

import { useState, useEffect, useRef } from "react";
import {
  NoiseGenerator,
  DEFAULT_NOISE_SETTINGS,
  DEFAULT_PREVIEW_SETTINGS,
  NOISE_PRESETS,
  generateCSS,
  generateSVGPattern,
  downloadFile,
  copyToClipboard,
  saveToHistory,
  getHistory,
  clearHistory
} from "./logic";
import { NoiseSettings, PreviewSettings, ExportSettings, PatternType, ColorMode, BackgroundType, ExportFormat } from "./types";
import PatternNoiseSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PatternNoiseGeneratorUI() {
  const [noiseSettings, setNoiseSettings] = useState<NoiseSettings>(DEFAULT_NOISE_SETTINGS);
  const [previewSettings, setPreviewSettings] = useState<PreviewSettings>(DEFAULT_PREVIEW_SETTINGS);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'png',
    includeCSS: true,
    cssOpacity: 0.08,
    backgroundSize: 200
  });
  
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Generate noise on settings change
  useEffect(() => {
    if (canvasRef.current) {
      generateNoiseTexture();
    }
  }, [noiseSettings]);

  // Handle animation
  useEffect(() => {
    if (noiseSettings.animated && isAnimating) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return () => stopAnimation();
  }, [noiseSettings.animated, isAnimating]);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const generateNoiseTexture = () => {
    if (!canvasRef.current) return;
    
    NoiseGenerator.generateNoise(canvasRef.current, noiseSettings);
    const url = canvasRef.current.toDataURL('image/png');
    setDataUrl(url);
    
    const css = generateCSS(noiseSettings, url, exportSettings);
    setGeneratedCSS(css);
    
    updatePreview();
  };

  const updatePreview = () => {
    if (!previewCanvasRef.current || !canvasRef.current) return;
    
    const preview = previewCanvasRef.current;
    const ctx = preview.getContext('2d')!;
    
    preview.width = 400;
    preview.height = 300;
    
    // Draw background
    ctx.fillStyle = previewSettings.backgroundColor;
    ctx.fillRect(0, 0, preview.width, preview.height);
    
    // Draw noise pattern
    if (previewSettings.overlayMode) {
      const pattern = ctx.createPattern(canvasRef.current, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.globalAlpha = noiseSettings.opacity;
        ctx.fillRect(0, 0, preview.width, preview.height);
        ctx.globalAlpha = 1;
      }
    }
  };

  const startAnimation = () => {
    let frame = 0;
    const animate = () => {
      if (!canvasRef.current) return;
      
      const animatedSettings = { ...noiseSettings };
      animatedSettings.intensity += Math.sin(frame * 0.1) * 5;
      
      NoiseGenerator.generateNoise(canvasRef.current, animatedSettings);
      updatePreview();
      
      frame += noiseSettings.animationSpeed;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const stopAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const updateNoiseSetting = <K extends keyof NoiseSettings>(key: K, value: NoiseSettings[K]) => {
    setNoiseSettings(prev => ({ ...prev, [key]: value }));
  };

  const updatePreviewSetting = <K extends keyof PreviewSettings>(key: K, value: PreviewSettings[K]) => {
    setPreviewSettings(prev => ({ ...prev, [key]: value }));
    setTimeout(updatePreview, 0);
  };

  const applyPreset = (presetIndex: number) => {
    const preset = NOISE_PRESETS[presetIndex];
    setNoiseSettings(prev => ({ ...prev, ...preset.settings }));
  };

  const handleCopyCSS = async () => {
    await copyToClipboard(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBase64 = async () => {
    await copyToClipboard(dataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: ExportFormat) => {
    if (!canvasRef.current) return;
    
    if (format === 'svg') {
      const svg = generateSVGPattern(noiseSettings);
      downloadFile(svg, `noise-texture.svg`, 'image/svg+xml');
    } else if (format === 'base64') {
      downloadFile(dataUrl, `noise-texture.txt`, 'text/plain');
    } else {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
          downloadFile(blob, `noise-texture.${format}`, mimeType);
        }
      }, format === 'webp' ? 'image/webp' : 'image/png');
    }
  };

  const handleSaveToHistory = () => {
    if (canvasRef.current) {
      saveToHistory(noiseSettings, canvasRef.current);
      setHistory(getHistory());
    }
  };

  const handleReset = () => {
    setNoiseSettings(DEFAULT_NOISE_SETTINGS);
    setPreviewSettings(DEFAULT_PREVIEW_SETTINGS);
    setShowAdvanced(false);
    setIsAnimating(false);
  };

  const backgroundPresets = [
    { name: 'Light UI', color: '#f8f9fa', type: 'light' as BackgroundType },
    { name: 'Dark UI', color: '#1a1a1a', type: 'dark' as BackgroundType },
    { name: 'Gradient', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', type: 'gradient' as BackgroundType },
    { name: 'Blue', color: '#3b82f6', type: 'light' as BackgroundType },
  ];

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
              {backgroundPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => updatePreviewSetting('backgroundColor', preset.color)}
                  className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <canvas
              ref={previewCanvasRef}
              className="w-full h-80 object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-gray-600">
              {noiseSettings.resolution}×{noiseSettings.resolution}px
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
                {NOISE_PRESETS.map((preset, idx) => (
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

            {/* Pattern Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Pattern Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['static-grain', 'film-grain', 'speckle', 'dust', 'perlin'] as PatternType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => updateNoiseSetting('patternType', type)}
                    className={`text-xs px-2 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      noiseSettings.patternType === type
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Intensity: {noiseSettings.intensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseSettings.intensity}
                  onChange={(e) => updateNoiseSetting('intensity', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Grain Size: {noiseSettings.grainSize}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={noiseSettings.grainSize}
                  onChange={(e) => updateNoiseSetting('grainSize', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Opacity: {noiseSettings.opacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={noiseSettings.opacity}
                  onChange={(e) => updateNoiseSetting('opacity', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Contrast: {noiseSettings.contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseSettings.contrast}
                  onChange={(e) => updateNoiseSetting('contrast', Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Color Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Color Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['white', 'black', 'custom', 'multi-color'] as ColorMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateNoiseSetting('colorMode', mode)}
                    className={`text-xs px-2 py-2 rounded-lg transition-colors ${
                      noiseSettings.colorMode === mode
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
              
              {noiseSettings.colorMode === 'custom' && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="color"
                    value={noiseSettings.customColor}
                    onChange={(e) => updateNoiseSetting('customColor', e.target.value)}
                    className="w-12 h-8 rounded border border-gray-200 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={noiseSettings.customColor}
                    onChange={(e) => updateNoiseSetting('customColor', e.target.value)}
                    className="flex-1 text-xs border border-gray-200 rounded px-2 min-w-0"
                  />
                </div>
              )}
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
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Resolution: {noiseSettings.resolution}×{noiseSettings.resolution}px
                    </label>
                    <select
                      value={noiseSettings.resolution}
                      onChange={(e) => updateNoiseSetting('resolution', Number(e.target.value))}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2"
                    >
                      <option value={128}>128×128</option>
                      <option value={256}>256×256</option>
                      <option value={512}>512×512</option>
                      <option value={1024}>1024×1024</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="seamless"
                      checked={noiseSettings.seamless}
                      onChange={(e) => updateNoiseSetting('seamless', e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="seamless" className="text-xs text-gray-600">
                      Seamless Tileable Texture
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="animated"
                      checked={noiseSettings.animated}
                      onChange={(e) => {
                        updateNoiseSetting('animated', e.target.checked);
                        setIsAnimating(e.target.checked);
                      }}
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="animated" className="text-xs text-gray-600">
                      Animated Noise
                    </label>
                  </div>

                  {noiseSettings.animated && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        Animation Speed: {noiseSettings.animationSpeed}x
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={noiseSettings.animationSpeed}
                        onChange={(e) => updateNoiseSetting('animationSpeed', Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Output & Export Panel */}
          <div className="space-y-6">
            {/* CSS Output */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Generated CSS
              </label>
              <div className="relative">
                <pre 
                  className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto max-h-[300px] min-h-[150px] font-mono leading-relaxed"
                  style={{ 
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere'
                  }}
                >
                  {generatedCSS}
                </pre>
                <button
                  onClick={handleCopyCSS}
                  className="absolute top-3 right-3 bg-primary hover:bg-primary-hover text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>

            {/* Export Settings */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Export Settings
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    CSS Opacity: {exportSettings.cssOpacity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={exportSettings.cssOpacity}
                    onChange={(e) => setExportSettings(prev => ({ ...prev, cssOpacity: Number(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Background Size: {exportSettings.backgroundSize}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={exportSettings.backgroundSize}
                    onChange={(e) => setExportSettings(prev => ({ ...prev, backgroundSize: Number(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* Export Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Export Options
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDownload('png')}
                  className="flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  📥 PNG
                </button>
                <button
                  onClick={() => handleDownload('webp')}
                  className="flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  📥 WebP
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  📥 SVG
                </button>
                <button
                  onClick={handleCopyBase64}
                  className="flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  📋 Base64
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={handleCopyCSS}
                className="flex items-center gap-1 sm:gap-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy CSS"}
              </button>
              <button
                onClick={handleSaveToHistory}
                className="flex items-center gap-1 sm:gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                💾 Save
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

        {/* Hidden canvas for generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <PatternNoiseSEOContent />
      
      <RelatedTools
        currentTool="pattern-noise-generator"
        tools={['css-glassmorphism-generator', 'css-gradient-generator', 'dithering-filter']}
      />
    </>
  );
}
