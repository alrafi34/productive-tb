"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  textToAscii,
  imageToAscii,
  loadImage,
  getImageData,
  saveToHistory,
  getHistory,
  clearHistory,
  downloadAsText,
  downloadAsPNG,
  debounce,
} from "./logic";
import { AsciiConfig, AsciiHistory, CHARACTER_SETS, STYLES } from "./types";
import AsciiArtGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AsciiArtGeneratorUI() {
  const [config, setConfig] = useState<AsciiConfig>({
    mode: "text",
    text: "HELLO",
    image: null,
    density: 50,
    width: 80,
    charset: CHARACTER_SETS.standard,
    style: "block",
  });

  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<AsciiHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const generateAscii = useCallback(
    debounce((cfg: AsciiConfig) => {
      let result = "";

      if (cfg.mode === "text" && cfg.text.trim()) {
        result = textToAscii(cfg.text, cfg.width, cfg.charset);
      } else if (cfg.mode === "image" && cfg.image) {
        try {
          const img = new Image();
          img.onload = () => {
            const imageData = getImageData(img, cfg.width);
            result = imageToAscii(imageData, cfg.width, cfg.charset);
            setOutput(result);
          };
          img.src = cfg.image;
          return;
        } catch (error) {
          result = "Error processing image";
        }
      }

      setOutput(result);
    }, 150),
    []
  );

  useEffect(() => {
    generateAscii(config);
  }, [config, generateAscii]);

  const handleTextChange = (text: string) => {
    setConfig((prev) => ({ ...prev, text }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL();
        setConfig((prev) => ({ ...prev, image: dataUrl, mode: "image" }));
      }
    } catch (error) {
      alert("Failed to load image");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragZoneRef.current) {
      dragZoneRef.current.classList.add("border-primary", "bg-primary/5");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragZoneRef.current) {
      dragZoneRef.current.classList.remove("border-primary", "bg-primary/5");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragZoneRef.current) {
      dragZoneRef.current.classList.remove("border-primary", "bg-primary/5");
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        handleImageUpload(file);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (output) {
      saveToHistory(config, output);
      setHistory(getHistory());
    }
  };

  const handleDownloadTxt = () => {
    if (output) {
      downloadAsText(output, `ascii-art-${Date.now()}.txt`);
      saveToHistory(config, output);
      setHistory(getHistory());
    }
  };

  const handleDownloadPng = () => {
    if (output) {
      downloadAsPNG(output, `ascii-art-${Date.now()}.png`);
      saveToHistory(config, output);
      setHistory(getHistory());
    }
  };

  const loadFromHistory = (item: AsciiHistory) => {
    setConfig(item.config);
    setOutput(item.output);
  };

  const handleClear = () => {
    setConfig({
      mode: "text",
      text: "HELLO",
      image: null,
      density: 50,
      width: 80,
      charset: CHARACTER_SETS.standard,
      style: "block",
    });
    setOutput("");
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Input Mode
              </h2>
              <div className="flex gap-3">
                {(["text", "image"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setConfig((prev) => ({ ...prev, mode }))}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      config.mode === mode
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {mode === "text" ? "📝 Text" : "🖼️ Image"}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            {config.mode === "text" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Text
                </label>
                <textarea
                  value={config.text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Enter text to convert..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary resize-none text-sm"
                />
              </div>
            )}

            {/* Image Upload */}
            {config.mode === "image" && (
              <div
                ref={dragZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="bg-white rounded-xl border-2 border-dashed border-gray-200 shadow-sm p-6 transition-colors cursor-pointer hover:border-gray-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-gray-600 mb-3">
                    Drag and drop an image or click to upload
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Choose Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                  />
                </div>
                {config.image && (
                  <div className="mt-4 text-center text-sm text-green-600">
                    ✓ Image loaded
                  </div>
                )}
              </div>
            )}

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h2>

              <div className="space-y-4">
                {/* Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width: {config.width} chars
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="200"
                    value={config.width}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, width: parseInt(e.target.value) }))
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                </div>

                {/* Density */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Density: {config.density}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={config.density}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, density: parseInt(e.target.value) }))
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                </div>

                {/* Character Set */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Character Set
                  </label>
                  <select
                    value={config.charset}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, charset: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary text-sm"
                  >
                    {Object.entries(CHARACTER_SETS).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} - {value}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Style
                  </label>
                  <select
                    value={config.style}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, style: e.target.value as any }))
                    }
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary text-sm"
                  >
                    {(["block", "outline", "shadow", "simple", "terminal"] as const).map(
                      (style) => (
                        <option key={style} value={style}>
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Preview
              </h2>

              <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96 border border-gray-700">
                <pre className="text-green-400 font-mono text-xs leading-tight whitespace-pre-wrap break-words">
                  {output || "ASCII art will appear here..."}
                </pre>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied ? "✓ Copied" : "📋 Copy"}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  disabled={!output}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  📥 TXT
                </button>
                <button
                  onClick={handleDownloadPng}
                  disabled={!output}
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
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-800">
                            {item.config.mode === "text"
                              ? item.config.text.substring(0, 20)
                              : "Image"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <button
                          onClick={() => loadFromHistory(item)}
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

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
            >
              🔄 Clear
            </button>
          </div>
        </div>
      </div>

      <AsciiArtGeneratorSEOContent />
      <RelatedTools
        currentTool="ascii-art-generator"
        tools={["qr-code-generator", "placeholder-image-generator", "color-palette-generator"]}
      />
    </>
  );
}
