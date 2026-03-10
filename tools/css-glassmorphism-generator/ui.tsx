"use client";

import { useState, useEffect } from "react";
import { 
  GlassmorphismConfig, 
  defaultConfig, 
  generateGlassmorphismCSS, 
  generateTailwindCSS,
  presets,
  backgroundPresets
} from "./logic";
import { OutputFormat } from "./types";
import GlassmorphismSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GlassmorphismGeneratorUI() {
  const [config, setConfig] = useState<GlassmorphismConfig>(defaultConfig);
  const [cssOutput, setCssOutput] = useState("");
  const [tailwindOutput, setTailwindOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("css");
  const [background, setBackground] = useState(backgroundPresets[0]);
  const [customBackground, setCustomBackground] = useState("");

  useEffect(() => {
    setCssOutput(generateGlassmorphismCSS(config));
    setTailwindOutput(generateTailwindCSS(config));
  }, [config]);

  const updateConfig = (key: keyof GlassmorphismConfig, value: number | string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetName: string) => {
    setConfig(presets[presetName as keyof typeof presets]);
  };

  const handleCopy = async () => {
    const textToCopy = outputFormat === "css" ? cssOutput : tailwindOutput;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setBackground(backgroundPresets[0]);
    setCustomBackground("");
  };

  const currentBackground = customBackground || background;

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
            style={{ background: currentBackground }}
          >
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-gray-800 font-medium"
              style={{
                width: `${config.width}px`,
                height: `${config.height}px`,
                background: `rgba(${config.color === "#ffffff" ? "255, 255, 255" : config.color === "#000000" ? "0, 0, 0" : "59, 130, 246"}, ${config.opacity})`,
                backdropFilter: `blur(${config.blur}px)`,
                WebkitBackdropFilter: `blur(${config.blur}px)`,
                borderRadius: `${config.borderRadius}px`,
                border: `${config.borderWidth}px solid rgba(${config.color === "#ffffff" ? "255, 255, 255" : config.color === "#000000" ? "0, 0, 0" : "59, 130, 246"}, ${config.borderOpacity})`,
                boxShadow: `${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px rgba(0, 0, 0, ${config.shadowOpacity})`
              }}
            >
              Glass Effect
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
                {Object.keys(presets).map(presetName => (
                  <button
                    key={presetName}
                    onClick={() => applyPreset(presetName)}
                    className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-2 rounded-lg transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {presetName}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Background
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {backgroundPresets.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => { setBackground(bg); setCustomBackground(""); }}
                    className={`h-8 rounded-lg border-2 ${background === bg && !customBackground ? "border-primary" : "border-gray-200"}`}
                    style={{ background: bg }}
                  />
                ))}
              </div>
              <input
                type="text"
                value={customBackground}
                onChange={(e) => setCustomBackground(e.target.value)}
                placeholder="Custom gradient or color"
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>

            {/* Glass Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Blur: {config.blur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={config.blur}
                  onChange={(e) => updateConfig("blur", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Opacity: {config.opacity}
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.9"
                  step="0.05"
                  value={config.opacity}
                  onChange={(e) => updateConfig("opacity", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Glass Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.color}
                    onChange={(e) => updateConfig("color", e.target.value)}
                    className="w-12 h-8 rounded border border-gray-200"
                  />
                  <input
                    type="text"
                    value={config.color}
                    onChange={(e) => updateConfig("color", e.target.value)}
                    className="flex-1 text-xs border border-gray-200 rounded px-2"
                  />
                </div>
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

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Border Width: {config.borderWidth}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={config.borderWidth}
                  onChange={(e) => updateConfig("borderWidth", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Shadow Y: {config.shadowY}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={config.shadowY}
                  onChange={(e) => updateConfig("shadowY", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Shadow Blur: {config.shadowBlur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.shadowBlur}
                  onChange={(e) => updateConfig("shadowBlur", Number(e.target.value))}
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
                  onClick={() => setOutputFormat("tailwind")}
                  className={`text-xs px-3 py-1 rounded ${outputFormat === "tailwind" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  Tailwind
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto min-h-[200px] font-mono">
                {outputFormat === "css" ? cssOutput : tailwindOutput}
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

      <GlassmorphismSEOContent />
      
      <RelatedTools
        currentTool="css-glassmorphism-generator"
        tools={['css-gradient-generator', 'css-box-shadow-generator', 'color-format-converter']}
      />
    </>
  );
}