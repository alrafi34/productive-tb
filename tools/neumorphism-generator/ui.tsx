"use client";

import { useState, useEffect } from "react";
import { 
  NeumorphismConfig, 
  defaultConfig, 
  generateNeumorphismCSS,
  generateTailwindCSS,
  generateSCSSVariables,
  neumorphismPresets
} from "./logic";
import NeumorphismSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function NeumorphismGeneratorUI() {
  const [config, setConfig] = useState<NeumorphismConfig>(defaultConfig);
  const [cssOutput, setCssOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"css" | "tailwind" | "scss">("css");

  useEffect(() => {
    setCssOutput(generateNeumorphismCSS(config));
  }, [config]);

  const updateConfig = (key: keyof NeumorphismConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = async () => {
    let textToCopy = cssOutput;
    if (outputFormat === "tailwind") {
      textToCopy = generateTailwindCSS(config);
    } else if (outputFormat === "scss") {
      textToCopy = generateSCSSVariables(config);
    }
    
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  const applyPreset = (preset: typeof neumorphismPresets[0]) => {
    setConfig(prev => ({ ...prev, ...preset.config }));
  };

  const getOutputText = () => {
    switch (outputFormat) {
      case "tailwind": return generateTailwindCSS(config);
      case "scss": return generateSCSSVariables(config);
      default: return cssOutput;
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Preview Section */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Live Preview
          </label>
          <div 
            className="relative w-full h-80 rounded-xl overflow-hidden"
            style={{ 
              background: config.isDarkMode 
                ? "linear-gradient(135deg, #1a1a1a, #2d2d2d)" 
                : "linear-gradient(135deg, #f0f0f0, #e8e8e8)"
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-gray-600 font-medium"
              style={{
                width: `${config.width}px`,
                height: `${config.height}px`,
                background: config.backgroundColor,
                borderRadius: `${config.borderRadius}px`,
                boxShadow: (() => {
                  const css = generateNeumorphismCSS(config);
                  const shadowMatch = css.match(/box-shadow:\s*([^;]+);/);
                  return shadowMatch ? shadowMatch[1].replace(/\n\s*/g, ' ') : '';
                })(),
                color: config.isDarkMode ? '#ffffff' : '#666666'
              }}
            >
              Neumorphic
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Presets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {neumorphismPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-2 rounded-lg transition-colors text-left"
                    style={{ fontFamily: "var(--font-heading)" }}
                    title={preset.description}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Effect Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateConfig("isPressed", false)}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                      !config.isPressed ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Raised
                  </button>
                  <button
                    onClick={() => updateConfig("isPressed", true)}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                      config.isPressed ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Pressed
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Theme</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateConfig("isDarkMode", false)}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                      !config.isDarkMode ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => updateConfig("isDarkMode", true)}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                      config.isDarkMode ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                  className="w-12 h-8 rounded border border-gray-200"
                />
                <input
                  type="text"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded px-2"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Shadow Distance: {config.shadowDistance}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={config.shadowDistance}
                  onChange={(e) => updateConfig("shadowDistance", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Blur Radius: {config.blurRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={config.blurRadius}
                  onChange={(e) => updateConfig("blurRadius", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Shadow Intensity: {config.shadowIntensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.shadowIntensity}
                  onChange={(e) => updateConfig("shadowIntensity", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Border Radius: {config.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.borderRadius}
                  onChange={(e) => updateConfig("borderRadius", Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Light Direction */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Light Direction</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'top-left', label: '↖ Top Left' },
                  { value: 'top-right', label: '↗ Top Right' },
                  { value: 'bottom-left', label: '↙ Bottom Left' },
                  { value: 'bottom-right', label: '↘ Bottom Right' }
                ].map(direction => (
                  <button
                    key={direction.value}
                    onClick={() => updateConfig("lightDirection", direction.value)}
                    className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                      config.lightDirection === direction.value 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {direction.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Element Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Width: {config.width}px
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={config.width}
                  onChange={(e) => updateConfig("width", Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Height: {config.height}px
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={config.height}
                  onChange={(e) => updateConfig("height", Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                Generated Code
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOutputFormat("css")}
                  className={`text-xs px-3 py-1 rounded ${outputFormat === "css" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setOutputFormat("scss")}
                  className={`text-xs px-3 py-1 rounded ${outputFormat === "scss" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  SCSS
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto min-h-[300px] font-mono">
                {getOutputText()}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 bg-primary hover:bg-primary-hover text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy Code"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <NeumorphismSEOContent />
      
      <RelatedTools
        currentTool="neumorphism-generator"
        tools={['css-box-shadow-generator', 'css-gradient-generator', 'css-glassmorphism-generator']}
      />
    </>
  );
}