"use client";

import { useState, useEffect } from "react";
import { Unit, WallThickness, WallDimensions, BrickSize, BrickCalculation } from "./types";
import {
  calculateBricksNeeded,
  getBrickPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitName
} from "./logic";
import BrickCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BrickCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("ft");
  
  // Wall dimensions
  const [wallDimensions, setWallDimensions] = useState<WallDimensions>({
    length: "",
    height: "",
    thickness: "full"
  });
  
  // Brick size (in inches)
  const [brickSize, setBrickSize] = useState<BrickSize>({
    length: "9",
    width: "4.5",
    height: "3"
  });
  
  // Mortar thickness (in inches)
  const [mortarThickness, setMortarThickness] = useState("0.5");
  
  // Openings area
  const [openingsArea, setOpeningsArea] = useState("");
  
  // Wastage percentage
  const [wastagePercentage, setWastagePercentage] = useState(5);
  
  // Results
  const [calculation, setCalculation] = useState<BrickCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate bricks in real-time
  useEffect(() => {
    const length = parseFloat(wallDimensions.length);
    const height = parseFloat(wallDimensions.height);
    const brickL = parseFloat(brickSize.length);
    const brickW = parseFloat(brickSize.width);
    const brickH = parseFloat(brickSize.height);
    const mortar = parseFloat(mortarThickness);
    const openings = parseFloat(openingsArea) || 0;
    
    if (
      !isNaN(length) && !isNaN(height) && length > 0 && height > 0 &&
      !isNaN(brickL) && !isNaN(brickW) && !isNaN(brickH) &&
      brickL > 0 && brickW > 0 && brickH > 0 &&
      !isNaN(mortar) && mortar >= 0
    ) {
      const result = calculateBricksNeeded(
        length,
        height,
        wallDimensions.thickness,
        brickL,
        brickW,
        brickH,
        mortar,
        openings,
        wastagePercentage,
        unit
      );
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [wallDimensions, brickSize, mortarThickness, openingsArea, wastagePercentage, unit]);

  const handleReset = () => {
    setWallDimensions({ length: "", height: "", thickness: "full" });
    setBrickSize({ length: "9", width: "4.5", height: "3" });
    setMortarThickness("0.5");
    setOpeningsArea("");
    setWastagePercentage(5);
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Bricks Needed: ${formatNumber(calculation.bricksNeeded)}\nWith Wastage (${calculation.wastagePercentage}%): ${formatNumber(calculation.bricksWithWastage)} bricks`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      saveToHistory(calculation);
      setHistory(getHistory());
    }
  };

  const handleExport = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'brick_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: BrickCalculation) => {
    setWastagePercentage(calc.wastagePercentage);
    setShowHistory(false);
  };

  const applyBrickPreset = (presetLength: number, presetWidth: number, presetHeight: number) => {
    setBrickSize({
      length: presetLength.toString(),
      width: presetWidth.toString(),
      height: presetHeight.toString()
    });
  };

  const brickPresets = getBrickPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Brick Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact number of bricks needed for wall construction. Enter wall dimensions, brick size, and get accurate results with wastage adjustment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet (ft)
                  </button>
                  <button
                    onClick={() => setUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters (m)
                  </button>
                </div>
              </div>

              {/* Wall Thickness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Thickness</label>
                <select
                  value={wallDimensions.thickness}
                  onChange={(e) => setWallDimensions({ ...wallDimensions, thickness: e.target.value as WallThickness })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="half">4.5" (Half Brick)</option>
                  <option value="full">9" (Full Brick)</option>
                </select>
              </div>

              {/* Mortar Thickness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mortar Thickness (inches)
                </label>
                <input
                  type="number"
                  value={mortarThickness}
                  onChange={(e) => setMortarThickness(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0.5"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Wastage Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wastage: {wastagePercentage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={wastagePercentage}
                  onChange={(e) => setWastagePercentage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>20%</span>
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
                    Bricks Needed
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.bricksNeeded)}
                  </div>
                  <div className="text-xl text-primary-100">
                    bricks
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    With Wastage ({calculation.wastagePercentage}%)
                  </p>
                  <div className="text-3xl font-bold">
                    {formatNumber(calculation.bricksWithWastage)}
                  </div>
                  <div className="text-lg text-primary-100">
                    bricks
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wall Area:</span>
                    <span className="font-semibold">{calculation.wallArea.toFixed(2)} {unit}²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wall Volume:</span>
                    <span className="font-semibold">{calculation.wallVolume.toFixed(2)} {unit}³</span>
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
            
            {/* Wall Dimensions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Wall Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({unit})
                  </label>
                  <input
                    type="number"
                    value={wallDimensions.length}
                    onChange={(e) => setWallDimensions({ ...wallDimensions, length: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={wallDimensions.height}
                    onChange={(e) => setWallDimensions({ ...wallDimensions, height: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="8"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Openings Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Openings Area ({unit}²) - Optional
                </label>
                <input
                  type="number"
                  value={openingsArea}
                  onChange={(e) => setOpeningsArea(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Subtract area of doors and windows for accurate results
                </p>
              </div>
            </div>

            {/* Brick Size Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Brick Size (inches)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (in)
                  </label>
                  <input
                    type="number"
                    value={brickSize.length}
                    onChange={(e) => setBrickSize({ ...brickSize, length: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="9"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (in)
                  </label>
                  <input
                    type="number"
                    value={brickSize.width}
                    onChange={(e) => setBrickSize({ ...brickSize, width: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="4.5"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (in)
                  </label>
                  <input
                    type="number"
                    value={brickSize.height}
                    onChange={(e) => setBrickSize({ ...brickSize, height: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="3"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Brick Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {brickPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyBrickPreset(preset.length, preset.width, preset.height)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-xs font-medium text-left"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Wall Volume ÷ Brick Volume (with mortar) × (1 + {calculation.wastagePercentage}%)
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wall Area</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.wallArea.toFixed(2)} {unit}²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wall Volume</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.wallVolume.toFixed(2)} {unit}³</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Bricks</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.bricksNeeded)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">With Wastage</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.bricksWithWastage)}</div>
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
                            {formatNumber(entry.calculation.bricksWithWastage)} bricks
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Area: {entry.calculation.wallArea.toFixed(2)} {entry.calculation.unit}² • Wastage: {entry.calculation.wastagePercentage}%
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

      <BrickCalculatorSEO />
      <RelatedTools
        currentTool="brick-calculator"
        tools={['wall-area-calculator', 'tile-quantity-calculator', 'paint-required-calculator']}
      />
    </>
  );
}
