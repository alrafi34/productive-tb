"use client";

import { useState, useEffect, useCallback } from "react";
import {
  generateSVG,
  downloadSVG,
  downloadPNG,
  copySVGToClipboard,
  copyPNGToClipboard,
  saveToHistory,
  getHistory,
  clearHistory,
  debounce,
  COMMON_SIZES,
  validateDimensions,
  smartFontSize,
  PlaceholderConfig,
} from "./logic";
import PlaceholderImageGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PlaceholderImageGeneratorUI() {
  const [config, setConfig] = useState<PlaceholderConfig>({
    width: 400,
    height: 300,
    text: "400×300",
    bgColor: "#dddddd",
    textColor: "#666666",
    fontSize: 24,
    showBorder: true,
  });

  const [svg, setSvg] = useState("");
  const [validation, setValidation] = useState<{ valid: boolean; message?: string }>({ valid: true });
  const [copied, setCopied] = useState("");
  const [history, setHistory] = useState<(PlaceholderConfig & { id: number })[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const debouncedGenerate = useCallback(
    debounce((cfg: PlaceholderConfig) => {
      const validation = validateDimensions(cfg.width, cfg.height);
      setValidation(validation);
      if (validation.valid) {
        setSvg(generateSVG(cfg));
        saveToHistory(cfg);
        setHistory(getHistory());
      }
    }, 150),
    []
  );

  useEffect(() => {
    debouncedGenerate(config);
  }, [config, debouncedGenerate]);

  const handleWidthChange = (width: number) => {
    setConfig((prev) => ({
      ...prev,
      width,
      text: prev.text === `${prev.width}×${prev.height}` ? `${width}×${prev.height}` : prev.text,
    }));
  };

  const handleHeightChange = (height: number) => {
    setConfig((prev) => ({
      ...prev,
      height,
      text: prev.text === `${prev.width}×${prev.height}` ? `${prev.width}×${height}` : prev.text,
    }));
  };

  const handleTextChange = (text: string) => {
    setConfig((prev) => ({ ...prev, text }));
  };

  const handleApplyPreset = (preset: { width: number; height: number }) => {
    setConfig((prev) => ({
      ...prev,
      width: preset.width,
      height: preset.height,
      text: `${preset.width}×${preset.height}`,
    }));
  };

  const handleDownloadSVG = () => {
    if (validation.valid) {
      downloadSVG(svg, `placeholder-${Date.now()}`);
    }
  };

  const handleDownloadPNG = () => {
    if (validation.valid) {
      downloadPNG(svg, `placeholder-${Date.now()}`, config.width, config.height);
    }
  };

  const handleCopySVG = async () => {
    if (validation.valid) {
      const success = await copySVGToClipboard(svg);
      if (success) {
        setCopied("svg");
        setTimeout(() => setCopied(""), 2000);
      }
    }
  };

  const handleCopyPNG = async () => {
    if (validation.valid) {
      const success = await copyPNGToClipboard(svg, config.width, config.height);
      if (success) {
        setCopied("png");
        setTimeout(() => setCopied(""), 2000);
      }
    }
  };

  const handleLoadFromHistory = (item: PlaceholderConfig & { id: number }) => {
    const { id, ...cfg } = item;
    setConfig(cfg);
  };

  const handleReset = () => {
    setConfig({
      width: 400,
      height: 300,
      text: "400×300",
      bgColor: "#dddddd",
      textColor: "#666666",
      fontSize: 24,
      showBorder: true,
    });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Dimensions
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width: {config.width}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    value={config.width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    value={config.width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value))}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height: {config.height}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    value={config.height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    value={config.height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value))}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                {!validation.valid && (
                  <p className="text-red-600 text-sm">{validation.message}</p>
                )}
              </div>
            </div>

            {/* Common Sizes */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Sizes
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {COMMON_SIZES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
                  >
                    <div className="text-sm font-semibold text-gray-800">{preset.name}</div>
                    <div className="text-xs text-gray-500">
                      {preset.width}×{preset.height}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text & Colors */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Customization
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Enter text..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {config.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={config.fontSize}
                    onChange={(e) => setConfig((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.bgColor}
                        onChange={(e) => setConfig((prev) => ({ ...prev, bgColor: e.target.value }))}
                        className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.bgColor}
                        onChange={(e) => setConfig((prev) => ({ ...prev, bgColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.textColor}
                        onChange={(e) => setConfig((prev) => ({ ...prev, textColor: e.target.value }))}
                        className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.textColor}
                        onChange={(e) => setConfig((prev) => ({ ...prev, textColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.showBorder}
                    onChange={(e) => setConfig((prev) => ({ ...prev, showBorder: e.target.checked }))}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Show Border</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Preview
              </h2>

              <div className="flex justify-center mb-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-auto max-h-96">
                  {svg && (
                    <div
                      dangerouslySetInnerHTML={{ __html: svg }}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopySVG}
                  disabled={!validation.valid}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied === "svg" ? "✓ SVG Copied" : "📋 Copy SVG"}
                </button>
                <button
                  onClick={handleCopyPNG}
                  disabled={!validation.valid}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied === "png" ? "✓ PNG Copied" : "📋 Copy PNG"}
                </button>
              </div>
            </div>

            {/* Download */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Download
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadSVG}
                  disabled={!validation.valid}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📥 SVG
                </button>
                <button
                  onClick={handleDownloadPNG}
                  disabled={!validation.valid}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📥 PNG
                </button>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Recent
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {showHistory ? "Hide" : "Show"}
                  </button>
                  {history.length > 0 && (
                    <button
                      onClick={() => {
                        clearHistory();
                        setHistory([]);
                      }}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {showHistory && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-center text-gray-500 py-4 text-sm">No history yet</p>
                  ) : (
                    history.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800">
                            {item.width}×{item.height}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{item.text}</div>
                        </div>
                        <button
                          onClick={() => handleLoadFromHistory(item)}
                          className="px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors flex-shrink-0"
                        >
                          Load
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <PlaceholderImageGeneratorSEOContent />
      <RelatedTools
        currentTool="placeholder-image-generator"
        tools={["favicon-generator", "color-palette-generator", "css-gradient-generator"]}
      />
    </>
  );
}
