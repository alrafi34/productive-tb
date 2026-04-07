"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  createEmptyGrid,
  paintPixel,
  floodFill,
  exportToPNG,
  exportToCSS,
  exportToJSON,
  importFromJSON,
  downloadFile,
  downloadImage,
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./logic";
import { GridSize, PixelGrid, PixelArtState } from "./types";
import PixelArtCreatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const COLOR_PRESETS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#800000", "#008000", "#000080", "#808000", "#800080", "#008080", "#C0C0C0", "#808080",
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
];

export default function PixelArtCreatorUI() {
  const [state, setState] = useState<PixelArtState>({
    grid: createEmptyGrid(16),
    gridSize: 16,
    selectedColor: "#000000",
    tool: "brush",
    isDrawing: false,
    history: [createEmptyGrid(16)],
    historyIndex: 0,
  });

  const [copied, setCopied] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    saveToLocalStorage("pixel-art-autosave", state.grid);
  }, [state.grid]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage("pixel-art-autosave");
    if (saved && saved.length === state.gridSize) {
      setState(prev => ({
        ...prev,
        grid: saved,
        history: [saved],
        historyIndex: 0,
      }));
    }
  }, []);

  const addToHistory = useCallback((newGrid: PixelGrid) => {
    setState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newGrid);
      if (newHistory.length > 50) newHistory.shift();
      
      return {
        ...prev,
        grid: newGrid,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const handleGridSizeChange = (size: GridSize) => {
    const newGrid = createEmptyGrid(size);
    setState(prev => ({
      ...prev,
      grid: newGrid,
      gridSize: size,
      history: [newGrid],
      historyIndex: 0,
    }));
  };

  const handlePixelClick = (x: number, y: number) => {
    let newGrid: PixelGrid;
    
    if (state.tool === "brush") {
      newGrid = paintPixel(state.grid, x, y, state.selectedColor);
    } else if (state.tool === "eraser") {
      newGrid = paintPixel(state.grid, x, y, null);
    } else if (state.tool === "fill") {
      newGrid = floodFill(state.grid, x, y, state.selectedColor);
    } else {
      return;
    }
    
    if (newGrid !== state.grid) {
      addToHistory(newGrid);
    }
  };

  const handleMouseDown = (x: number, y: number) => {
    setState(prev => ({ ...prev, isDrawing: true }));
    handlePixelClick(x, y);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (state.isDrawing && state.tool !== "fill") {
      handlePixelClick(x, y);
    }
  };

  const handleMouseUp = () => {
    setState(prev => ({ ...prev, isDrawing: false }));
  };

  const handleUndo = () => {
    if (state.historyIndex > 0) {
      setState(prev => ({
        ...prev,
        grid: prev.history[prev.historyIndex - 1],
        historyIndex: prev.historyIndex - 1,
      }));
    }
  };

  const handleRedo = () => {
    if (state.historyIndex < state.history.length - 1) {
      setState(prev => ({
        ...prev,
        grid: prev.history[prev.historyIndex + 1],
        historyIndex: prev.historyIndex + 1,
      }));
    }
  };

  const handleClear = () => {
    const newGrid = createEmptyGrid(state.gridSize);
    addToHistory(newGrid);
  };

  const handleExportPNG = () => {
    const dataUrl = exportToPNG(state.grid, 20);
    downloadImage(dataUrl, `pixel-art-${Date.now()}.png`);
  };

  const handleExportCSS = () => {
    const css = exportToCSS(state.grid);
    downloadFile(css, `pixel-art-${Date.now()}.css`, "text/css");
  };

  const handleExportJSON = () => {
    const json = exportToJSON(state.grid);
    downloadFile(json, `pixel-art-${Date.now()}.json`, "application/json");
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const imported = importFromJSON(content);
        if (imported && imported.length === state.gridSize) {
          addToHistory(imported);
        } else {
          alert("Invalid JSON file or grid size mismatch");
        }
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const pixelSize = state.gridSize === 16 ? 20 : 12;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tools Panel */}
          <div className="space-y-6">
            {/* Grid Size */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Grid Size
              </h2>
              <div className="flex gap-2">
                {([16, 32] as GridSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleGridSizeChange(size)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      state.gridSize === size
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}×{size}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Tools
              </h2>
              <div className="space-y-2">
                {[
                  { id: "brush", label: "🖌️ Brush", desc: "Paint pixels" },
                  { id: "eraser", label: "🧹 Eraser", desc: "Remove pixels" },
                  { id: "fill", label: "🪣 Fill", desc: "Fill area" },
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setState(prev => ({ ...prev, tool: tool.id as any }))}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                      state.tool === tool.id
                        ? "bg-primary text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="font-semibold text-sm">{tool.label}</div>
                    <div className="text-xs opacity-75">{tool.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Color
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={state.selectedColor}
                    onChange={(e) => setState(prev => ({ ...prev, selectedColor: e.target.value }))}
                    className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
                  />
                  <input
                    type="text"
                    value={state.selectedColor}
                    onChange={(e) => setState(prev => ({ ...prev, selectedColor: e.target.value }))}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setState(prev => ({ ...prev, selectedColor: color }))}
                      className={`w-6 h-6 rounded border-2 transition-all ${
                        state.selectedColor === color ? "border-gray-800 scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Controls
              </h2>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleUndo}
                    disabled={state.historyIndex === 0}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    ↶ Undo
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={state.historyIndex === state.history.length - 1}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    ↷ Redo
                  </button>
                </div>
                <button
                  onClick={handleClear}
                  className="w-full px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  🗑️ Clear
                </button>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="showGrid"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="showGrid" className="text-sm text-gray-600">Show grid lines</label>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Canvas ({state.gridSize}×{state.gridSize})
              </h2>
              
              <div className="flex justify-center mb-6">
                <div
                  ref={gridRef}
                  className={`inline-grid gap-0 border-2 border-gray-300 ${showGrid ? 'bg-gray-100' : 'bg-white'}`}
                  style={{
                    gridTemplateColumns: `repeat(${state.gridSize}, ${pixelSize}px)`,
                    gridTemplateRows: `repeat(${state.gridSize}, ${pixelSize}px)`,
                  }}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {state.grid.map((row, y) =>
                    row.map((pixel, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`cursor-pointer transition-all hover:scale-110 ${
                          showGrid ? 'border border-gray-200' : ''
                        }`}
                        style={{
                          width: `${pixelSize}px`,
                          height: `${pixelSize}px`,
                          backgroundColor: pixel || 'transparent',
                        }}
                        onMouseDown={() => handleMouseDown(x, y)}
                        onMouseEnter={() => handleMouseEnter(x, y)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Export Options */}
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Export
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleExportPNG}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    📥 PNG
                  </button>
                  <button
                    onClick={handleExportCSS}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    📥 CSS
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    📥 JSON
                  </button>
                </div>

                {/* Import */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Import JSON
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Quick Copy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">CSS Code</span>
                    <button
                      onClick={() => copyToClipboard(exportToCSS(state.grid), 'css')}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-semibold transition-colors"
                    >
                      {copied === 'css' ? '✓' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">JSON Data</span>
                    <button
                      onClick={() => copyToClipboard(exportToJSON(state.grid), 'json')}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-semibold transition-colors"
                    >
                      {copied === 'json' ? '✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PixelArtCreatorSEOContent />
      <RelatedTools
        currentTool="pixel-art-grid"
        tools={["ascii-art-generator", "placeholder-image-generator", "color-palette-generator"]}
      />
    </>
  );
}