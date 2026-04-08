"use client";

import { useState, useCallback } from "react";
import {
  generateSVGPattern,
  generateCSSBackground,
  downloadSVG,
  copySVGToClipboard,
  copyCSSToClipboard,
  generateRandomPattern,
  debounce,
  PatternSettings,
} from "./logic";
import SVGPatternGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SVGPatternGeneratorUI() {
  const [settings, setSettings] = useState<PatternSettings>({
    type: "dots",
    size: 20,
    spacing: 20,
    strokeWidth: 2,
    color: "#000000",
    bgColor: "#ffffff",
    opacity: 1,
  });

  const [copied, setCopied] = useState("");
  const [previewSize, setPreviewSize] = useState<"small" | "medium" | "large">(
    "medium"
  );

  const svg = generateSVGPattern(settings);
  const css = generateCSSBackground(svg);

  const debouncedUpdate = useCallback(
    debounce((newSettings: PatternSettings) => {
      setSettings(newSettings);
    }, 120),
    []
  );

  const handleSettingChange = (key: keyof PatternSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    debouncedUpdate(newSettings);
  };

  const copyToClipboard = async (text: string, type: string) => {
    const success =
      type === "svg"
        ? await copySVGToClipboard(text)
        : await copyCSSToClipboard(text);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    }
  };

  const handleDownload = () => {
    downloadSVG(svg, `pattern-${Date.now()}.svg`);
  };

  const handleRandomize = () => {
    setSettings(generateRandomPattern());
  };

  const handleReset = () => {
    setSettings({
      type: "dots",
      size: 20,
      spacing: 20,
      strokeWidth: 2,
      color: "#000000",
      bgColor: "#ffffff",
      opacity: 1,
    });
  };

  const previewHeights = {
    small: "h-40",
    medium: "h-64",
    large: "h-96",
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Pattern Type */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pattern Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    "dots",
                    "grid",
                    "lines",
                    "diagonal",
                    "cross",
                  ] as const
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleSettingChange("type", type)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      settings.type === type
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pattern Size: {settings.size}px
              </label>
              <input
                type="range"
                min="4"
                max="80"
                value={settings.size}
                onChange={(e) =>
                  handleSettingChange("size", parseInt(e.target.value))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>

            {/* Spacing */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Spacing: {settings.spacing}px
              </label>
              <input
                type="range"
                min="4"
                max="60"
                value={settings.spacing}
                onChange={(e) =>
                  handleSettingChange("spacing", parseInt(e.target.value))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>

            {/* Stroke Width */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Stroke Width: {settings.strokeWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={settings.strokeWidth}
                onChange={(e) =>
                  handleSettingChange("strokeWidth", parseInt(e.target.value))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>

            {/* Colors */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pattern Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.color}
                      onChange={(e) =>
                        handleSettingChange("color", e.target.value)
                      }
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.color}
                      onChange={(e) =>
                        handleSettingChange("color", e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.bgColor}
                      onChange={(e) =>
                        handleSettingChange("bgColor", e.target.value)
                      }
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.bgColor}
                      onChange={(e) =>
                        handleSettingChange("bgColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Opacity */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Opacity: {(settings.opacity * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={settings.opacity}
                onChange={(e) =>
                  handleSettingChange("opacity", parseFloat(e.target.value))
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex gap-2">
                <button
                  onClick={handleRandomize}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  🎲 Randomize
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          {/* Preview & Export */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-semibold text-gray-800"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Preview
                </h2>
                <select
                  value={previewSize}
                  onChange={(e) =>
                    setPreviewSize(
                      e.target.value as "small" | "medium" | "large"
                    )
                  }
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div
                className={`${previewHeights[previewSize]} rounded-lg shadow-inner border border-gray-200`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
                  backgroundRepeat: "repeat",
                }}
              />
            </div>

            {/* SVG Code */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h2
                  className="text-lg font-semibold text-gray-800"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  SVG Code
                </h2>
                <button
                  onClick={() => copyToClipboard(svg, "svg")}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied === "svg" ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-x-auto max-h-48">
                {svg}
              </pre>
            </div>

            {/* CSS Code */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h2
                  className="text-lg font-semibold text-gray-800"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  CSS Code
                </h2>
                <button
                  onClick={() => copyToClipboard(css, "css")}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied === "css" ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-x-auto">
                {css}
              </pre>
            </div>

            {/* Download */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <button
                onClick={handleDownload}
                className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
              >
                📥 Download SVG
              </button>
            </div>
          </div>
        </div>
      </div>

      <SVGPatternGeneratorSEOContent />
      <RelatedTools
        currentTool="svg-pattern-generator"
        tools={[
          "css-gradient-generator",
          "placeholder-image-generator",
          "color-palette-generator",
        ]}
      />
    </>
  );
}
