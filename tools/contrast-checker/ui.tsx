"use client";

import { useState, useEffect } from "react";
import { 
  ContrastConfig, 
  defaultConfig, 
  calculateContrastRatio,
  evaluateContrast,
  getColorFormats,
  suggestAccessibleColor,
  colorPresets,
  generateAccessibilityReport
} from "./logic";
import ContrastCheckerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ContrastCheckerUI() {
  const [config, setConfig] = useState<ContrastConfig>(defaultConfig);
  const [contrastRatio, setContrastRatio] = useState(0);
  const [result, setResult] = useState({
    ratio: 0,
    normalAA: false,
    normalAAA: false,
    largeAA: false,
    largeAAA: false
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ratio = calculateContrastRatio(config.foregroundColor, config.backgroundColor);
    const evaluation = evaluateContrast(ratio, config.fontSize);
    setContrastRatio(ratio);
    setResult(evaluation);
  }, [config]);

  const updateConfig = (key: keyof ContrastConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  const loadPreset = (preset: typeof colorPresets[0]) => {
    setConfig(prev => ({
      ...prev,
      foregroundColor: preset.foreground,
      backgroundColor: preset.background
    }));
  };

  const suggestForeground = () => {
    const suggested = suggestAccessibleColor(config.foregroundColor, config.backgroundColor, false);
    updateConfig("foregroundColor", suggested);
  };

  const suggestBackground = () => {
    const suggested = suggestAccessibleColor(config.backgroundColor, config.foregroundColor, true);
    updateConfig("backgroundColor", suggested);
  };

  const fgFormats = getColorFormats(config.foregroundColor);
  const bgFormats = getColorFormats(config.backgroundColor);
  const isLargeText = config.fontSize >= 18;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Section */}
          <div className="space-y-6">
            {/* Color Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Text Color (Foreground)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.foregroundColor}
                    onChange={(e) => updateConfig("foregroundColor", e.target.value)}
                    className="w-16 h-12 rounded-xl border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.foregroundColor}
                    onChange={(e) => updateConfig("foregroundColor", e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-mono"
                    placeholder="#000000"
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <div>RGB: {fgFormats.rgb}</div>
                  <div>HSL: {fgFormats.hsl}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Background Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                    className="w-16 h-12 rounded-xl border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-mono"
                    placeholder="#ffffff"
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <div>RGB: {bgFormats.rgb}</div>
                  <div>HSL: {bgFormats.hsl}</div>
                </div>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Font Size: {config.fontSize}px {isLargeText && "(Large Text)"}
              </label>
              <input
                type="range"
                min="12"
                max="72"
                value={config.fontSize}
                onChange={(e) => updateConfig("fontSize", Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>12px</span>
                <span>72px</span>
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Color Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset)}
                    className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-2 rounded-lg transition-colors text-left"
                    style={{ fontFamily: "var(--font-heading)" }}
                    title={preset.description}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <div 
                          className="w-3 h-3 border border-gray-300" 
                          style={{ backgroundColor: preset.background }}
                        />
                        <div 
                          className="w-3 h-3 border border-gray-300" 
                          style={{ backgroundColor: preset.foreground }}
                        />
                      </div>
                      <span>{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Accessibility Suggestions
              </label>
              <div className="space-y-2">
                <button
                  onClick={suggestForeground}
                  className="w-full text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl transition-colors text-left"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  💡 Suggest Accessible Text Color
                </button>
                <button
                  onClick={suggestBackground}
                  className="w-full text-sm bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-xl transition-colors text-left"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  💡 Suggest Accessible Background
                </button>
              </div>
            </div>
          </div>

          {/* Preview and Results Section */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Live Preview
              </label>
              <div 
                className="rounded-xl border border-gray-200 p-8 shadow-sm"
                style={{ 
                  backgroundColor: config.backgroundColor,
                  color: config.foregroundColor
                }}
              >
                <div style={{ fontSize: `${config.fontSize}px` }}>
                  <h3 className="font-semibold mb-4">Accessibility Preview</h3>
                  <p className="mb-4">
                    The quick brown fox jumps over the lazy dog. This text demonstrates how your color combination looks in practice.
                  </p>
                  <p className="text-sm">
                    Small text example for testing normal text compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Results */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                WCAG Compliance Results
              </label>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {contrastRatio.toFixed(2)}:1
                  </div>
                  <div className="text-sm text-gray-500">Contrast Ratio</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Normal Text</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`text-center py-2 px-3 rounded-lg text-sm font-semibold ${
                        result.normalAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        AA: {result.normalAA ? 'PASS' : 'FAIL'}
                        <div className="text-xs opacity-75">4.5:1 required</div>
                      </div>
                      <div className={`text-center py-2 px-3 rounded-lg text-sm font-semibold ${
                        result.normalAAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        AAA: {result.normalAAA ? 'PASS' : 'FAIL'}
                        <div className="text-xs opacity-75">7:1 required</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Large Text (18pt+)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`text-center py-2 px-3 rounded-lg text-sm font-semibold ${
                        result.largeAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        AA: {result.largeAA ? 'PASS' : 'FAIL'}
                        <div className="text-xs opacity-75">3:1 required</div>
                      </div>
                      <div className={`text-center py-2 px-3 rounded-lg text-sm font-semibold ${
                        result.largeAAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        AAA: {result.largeAAA ? 'PASS' : 'FAIL'}
                        <div className="text-xs opacity-75">4.5:1 required</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Export Results
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => handleCopy(`${contrastRatio.toFixed(2)}:1 - ${result.normalAA ? 'AA PASS' : 'AA FAIL'}`)}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {copied ? "✅ Copied!" : "📋 Copy Contrast Result"}
                </button>
                
                <button
                  onClick={() => handleCopy(`${config.foregroundColor} on ${config.backgroundColor}`)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  🎨 Copy Color Codes
                </button>

                <button
                  onClick={() => handleCopy(generateAccessibilityReport(config, result))}
                  className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  📄 Copy Full Report
                </button>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContrastCheckerSEOContent />
      
      <RelatedTools
        currentTool="contrast-checker"
        tools={['color-format-converter', 'css-gradient-generator', 'color-palette-generator']}
      />
    </>
  );
}