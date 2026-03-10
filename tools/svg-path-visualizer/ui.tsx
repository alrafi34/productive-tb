"use client";

import { useState, useEffect, useRef } from "react";
import { 
  PathConfig, 
  defaultConfig, 
  validateSVGPath, 
  generateSVGCode,
  createGridPattern,
  samplePaths,
  extractPathFromSVG,
  calculatePathBounds
} from "./logic";
import SVGPathVisualizerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SVGPathVisualizerUI() {
  const [config, setConfig] = useState<PathConfig>(defaultConfig);
  const [svgCode, setSvgCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const validation = validateSVGPath(config.path);
    if (validation.isValid) {
      setError(null);
      setSvgCode(generateSVGCode(config));
    } else {
      setError(validation.error || "Invalid path");
    }
  }, [config]);

  const updateConfig = (key: keyof PathConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setError(null);
  };

  const loadSamplePath = (samplePath: typeof samplePaths[0]) => {
    updateConfig("path", samplePath.path);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const paths = extractPathFromSVG(content);
        if (paths.length > 0) {
          updateConfig("path", paths[0]);
        }
      };
      reader.readAsText(file);
    }
  };

  const fitToPath = () => {
    const bounds = calculatePathBounds(config.path);
    if (bounds) {
      const padding = 10;
      updateConfig("viewBoxX", bounds.minX - padding);
      updateConfig("viewBoxY", bounds.minY - padding);
      updateConfig("viewBoxWidth", bounds.maxX - bounds.minX + padding * 2);
      updateConfig("viewBoxHeight", bounds.maxY - bounds.minY + padding * 2);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            SVG Path (d attribute)
          </label>
          <div className="relative">
            <textarea
              value={config.path}
              onChange={(e) => updateConfig("path", e.target.value)}
              placeholder="Paste SVG path here... (e.g., M10 10 H 90 V 90 H 10 Z)"
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed font-mono"
            />
            {error && (
              <div className="absolute top-3 right-3 text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Live Preview
            </label>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="w-full h-80 border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
                {!error && (
                  <svg
                    viewBox={`${config.viewBoxX} ${config.viewBoxY} ${config.viewBoxWidth} ${config.viewBoxHeight}`}
                    className="w-full h-full"
                    style={{ background: config.showGrid ? 'url("data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="${config.gridSize}" height="${config.gridSize}" viewBox="0 0 ${config.gridSize} ${config.gridSize}"><rect width="${config.gridSize}" height="${config.gridSize}" fill="white"/><path d="M ${config.gridSize} 0 L 0 0 0 ${config.gridSize}" fill="none" stroke="#e0e0e0" stroke-width="0.5"/></svg>`) + '")' : 'white' }}
                  >
                    {config.showGrid && (
                      <g dangerouslySetInnerHTML={{ 
                        __html: createGridPattern(config.gridSize, config.viewBoxWidth, config.viewBoxHeight) 
                      }} />
                    )}
                    <path
                      d={config.path}
                      stroke={config.strokeColor}
                      strokeWidth={config.strokeWidth}
                      fill={config.fillColor}
                    />
                  </svg>
                )}
                {error && (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div className="text-sm">{error}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            {/* Sample Paths */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Sample Paths
              </label>
              <div className="grid grid-cols-2 gap-2">
                {samplePaths.slice(0, 8).map((sample) => (
                  <button
                    key={sample.name}
                    onClick={() => loadSamplePath(sample)}
                    className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-2 rounded-lg transition-colors text-left"
                    style={{ fontFamily: "var(--font-heading)" }}
                    title={sample.description}
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Import SVG File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors border-2 border-dashed border-gray-300"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📁 Upload SVG File
              </button>
            </div>

            {/* Styling Controls */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                Styling
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Stroke Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.strokeColor}
                      onChange={(e) => updateConfig("strokeColor", e.target.value)}
                      className="w-12 h-8 rounded border border-gray-200"
                    />
                    <input
                      type="text"
                      value={config.strokeColor}
                      onChange={(e) => updateConfig("strokeColor", e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded px-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Stroke Width: {config.strokeWidth}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={config.strokeWidth}
                    onChange={(e) => updateConfig("strokeWidth", Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Fill Color</label>
                <div className="flex gap-2">
                  <select
                    value={config.fillColor === "none" ? "none" : "color"}
                    onChange={(e) => updateConfig("fillColor", e.target.value === "none" ? "none" : "#4CAF50")}
                    className="text-xs border border-gray-200 rounded px-2 py-1"
                  >
                    <option value="none">None</option>
                    <option value="color">Color</option>
                  </select>
                  {config.fillColor !== "none" && (
                    <input
                      type="color"
                      value={config.fillColor}
                      onChange={(e) => updateConfig("fillColor", e.target.value)}
                      className="w-12 h-8 rounded border border-gray-200"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ViewBox Controls */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                ViewBox
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
                  <input
                    type="number"
                    value={config.viewBoxX}
                    onChange={(e) => updateConfig("viewBoxX", Number(e.target.value))}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
                  <input
                    type="number"
                    value={config.viewBoxY}
                    onChange={(e) => updateConfig("viewBoxY", Number(e.target.value))}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Width</label>
                  <input
                    type="number"
                    value={config.viewBoxWidth}
                    onChange={(e) => updateConfig("viewBoxWidth", Number(e.target.value))}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Height</label>
                  <input
                    type="number"
                    value={config.viewBoxHeight}
                    onChange={(e) => updateConfig("viewBoxHeight", Number(e.target.value))}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1"
                  />
                </div>
              </div>

              <button
                onClick={fitToPath}
                className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🎯 Fit to Path
              </button>
            </div>

            {/* Grid Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                Grid
              </h3>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={config.showGrid}
                    onChange={(e) => updateConfig("showGrid", e.target.checked)}
                    className="rounded"
                  />
                  Show Grid
                </label>
                
                <select
                  value={config.gridSize}
                  onChange={(e) => updateConfig("gridSize", Number(e.target.value))}
                  disabled={!config.showGrid}
                  className="text-xs border border-gray-200 rounded px-2 py-1 disabled:opacity-50"
                >
                  <option value={5}>5px</option>
                  <option value={10}>10px</option>
                  <option value={20}>20px</option>
                  <option value={50}>50px</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Generated SVG Code
          </label>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto min-h-[120px] font-mono">
              {svgCode}
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
              {copied ? "✅ Copied!" : "📋 Copy SVG"}
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

      <SVGPathVisualizerSEOContent />
      
      <RelatedTools
        currentTool="svg-path-visualizer"
        tools={['css-gradient-generator', 'color-format-converter', 'css-glassmorphism-generator']}
      />
    </>
  );
}