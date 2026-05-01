"use client";

import { useState, useEffect } from "react";
import { Unit, CalculationMode, RoomDimensions, TileSize, TileCalculation } from "./types";
import {
  calculateRoomArea,
  calculateTileArea,
  calculateTilesNeeded,
  convertToSquareFeet,
  getTilePresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getUnitName
} from "./logic";
import TileQuantityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TileQuantityCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("dimension");
  const [unit, setUnit] = useState<Unit>("ft");
  
  // Room dimensions
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    length: "",
    width: ""
  });
  
  // Custom area
  const [customArea, setCustomArea] = useState("");
  
  // Tile size
  const [tileSize, setTileSize] = useState<TileSize>({
    length: "",
    width: ""
  });
  
  const [tileUnit, setTileUnit] = useState<Unit>("ft");
  
  // Waste percentage
  const [wastePercentage, setWastePercentage] = useState(10);
  
  // Results
  const [calculation, setCalculation] = useState<TileCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate tiles in real-time
  useEffect(() => {
    let totalAreaInSqFt = 0;
    
    if (mode === "dimension") {
      const length = parseFloat(roomDimensions.length);
      const width = parseFloat(roomDimensions.width);
      
      if (!isNaN(length) && !isNaN(width) && length > 0 && width > 0) {
        const roomArea = calculateRoomArea(length, width);
        totalAreaInSqFt = convertToSquareFeet(roomArea, unit);
      }
    } else {
      const area = parseFloat(customArea);
      if (!isNaN(area) && area > 0) {
        totalAreaInSqFt = convertToSquareFeet(area, unit);
      }
    }
    
    const tileLength = parseFloat(tileSize.length);
    const tileWidth = parseFloat(tileSize.width);
    
    if (totalAreaInSqFt > 0 && !isNaN(tileLength) && !isNaN(tileWidth) && tileLength > 0 && tileWidth > 0) {
      const tileSizeArea = calculateTileArea(tileLength, tileWidth);
      const tileAreaInSqFt = convertToSquareFeet(tileSizeArea, tileUnit);
      
      const result = calculateTilesNeeded(totalAreaInSqFt, tileAreaInSqFt, wastePercentage);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [mode, roomDimensions, customArea, tileSize, unit, tileUnit, wastePercentage]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    setCalculation(null);
  };

  const handleReset = () => {
    setRoomDimensions({ length: "", width: "" });
    setCustomArea("");
    setTileSize({ length: "", width: "" });
    setWastePercentage(10);
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Tiles Needed: ${calculation.tilesNeeded}\nWith Waste (${calculation.wastePercentage}%): ${calculation.tilesWithWaste} tiles`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      saveToHistory(calculation, mode);
      setHistory(getHistory());
    }
  };

  const handleExport = () => {
    if (calculation) {
      const text = exportToText(calculation, mode);
      downloadFile(text, 'tile_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: TileCalculation) => {
    setWastePercentage(calc.wastePercentage);
    setShowHistory(false);
  };

  const applyTilePreset = (presetLength: number, presetWidth: number, presetUnit: Unit) => {
    setTileSize({
      length: presetLength.toString(),
      width: presetWidth.toString()
    });
    setTileUnit(presetUnit);
  };

  const tilePresets = getTilePresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔲</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Tile Quantity Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact number of tiles needed for your floor or wall. Enter room size, tile dimensions, and waste percentage for accurate results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleModeChange("dimension")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === "dimension"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Dimensions
                  </button>
                  <button
                    onClick={() => handleModeChange("area")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === "area"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Area
                  </button>
                </div>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </div>

              {/* Tile Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tile Unit</label>
                <select
                  value={tileUnit}
                  onChange={(e) => setTileUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </div>

              {/* Waste Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waste Percentage: {wastePercentage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={wastePercentage}
                  onChange={(e) => setWastePercentage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>25%</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
            </div>

            {/* Result Display */}
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Tiles Needed
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.tilesNeeded}
                  </div>
                  <div className="text-xl text-primary-100">
                    tiles
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    With Waste ({calculation.wastePercentage}%)
                  </p>
                  <div className="text-3xl font-bold">
                    {calculation.tilesWithWaste}
                  </div>
                  <div className="text-lg text-primary-100">
                    tiles
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Area:</span>
                    <span className="font-semibold">{calculation.totalArea.toFixed(2)} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Tile Area:</span>
                    <span className="font-semibold">{calculation.tileArea.toFixed(4)} sq ft</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Room Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "dimension" ? "Room Dimensions" : "Room Area"}
              </h3>
              
              {mode === "dimension" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={roomDimensions.length}
                      onChange={(e) => setRoomDimensions({ ...roomDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      value={roomDimensions.width}
                      onChange={(e) => setRoomDimensions({ ...roomDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="12"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Area ({unit}²)
                  </label>
                  <input
                    type="number"
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="0.1"
                  />
                </div>
              )}
            </div>

            {/* Tile Size Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Tile Size
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tile Length ({tileUnit})
                  </label>
                  <input
                    type="number"
                    value={tileSize.length}
                    onChange={(e) => setTileSize({ ...tileSize, length: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tile Width ({tileUnit})
                  </label>
                  <input
                    type="number"
                    value={tileSize.width}
                    onChange={(e) => setTileSize({ ...tileSize, width: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Tile Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {tilePresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyTilePreset(preset.length, preset.width, preset.unit)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-xs font-medium"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Calculation:</strong> {calculation.totalArea.toFixed(2)} ÷ {calculation.tileArea.toFixed(4)} × (1 + {calculation.wastePercentage}%) = {calculation.tilesWithWaste} tiles
                  </div>
                </div>
              )}
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Area</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.totalArea.toFixed(2)} sq ft</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tile Area</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.tileArea.toFixed(4)} sq ft</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Tiles</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.tilesNeeded} tiles</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">With Waste</div>
                    <div className="text-lg font-bold text-primary">{calculation.tilesWithWaste} tiles</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExport}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No calculations saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {entry.calculation.tilesWithWaste} tiles
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Area: {entry.calculation.totalArea.toFixed(2)} sq ft • Waste: {entry.calculation.wastePercentage}%
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <TileQuantityCalculatorSEO />
      <RelatedTools
        currentTool="tile-quantity-calculator"
        tools={['wall-area-calculator', 'floor-area-calculator', 'paint-required-calculator']}
      />
    </>
  );
}
