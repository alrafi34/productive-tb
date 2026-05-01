"use client";

import { useState, useEffect } from "react";
import { Unit, CalculationMode, RoomDimensions, PaintCalculation } from "./types";
import {
  calculateRoomWallArea,
  calculatePaintRequired,
  roundPaintAmount,
  formatPaintAmount,
  getDefaultCoverage,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getUnitName
} from "./logic";
import PaintRequiredCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PaintRequiredCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("room");
  const [unit, setUnit] = useState<Unit>("ft");
  
  // Room dimensions
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    length: "",
    width: "",
    height: ""
  });
  
  // Custom area
  const [customArea, setCustomArea] = useState("");
  
  // Common inputs
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(getDefaultCoverage("ft"));
  const [openingsArea, setOpeningsArea] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<PaintCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Update coverage when unit changes
  useEffect(() => {
    setCoverage(getDefaultCoverage(unit));
  }, [unit]);

  // Calculate paint in real-time
  useEffect(() => {
    let totalArea = 0;
    
    if (mode === "room") {
      const length = parseFloat(roomDimensions.length);
      const width = parseFloat(roomDimensions.width);
      const height = parseFloat(roomDimensions.height);
      
      if (!isNaN(length) && !isNaN(width) && !isNaN(height) && length > 0 && width > 0 && height > 0) {
        totalArea = calculateRoomWallArea(length, width, height);
      }
    } else {
      const area = parseFloat(customArea);
      if (!isNaN(area) && area > 0) {
        totalArea = area;
      }
    }
    
    if (totalArea > 0 && coverage > 0) {
      const openings = parseFloat(openingsArea) || 0;
      const netArea = Math.max(0, totalArea - openings);
      const paintRequired = calculatePaintRequired(totalArea, openings, coats, coverage);
      const recommendedPurchase = roundPaintAmount(paintRequired);
      
      setCalculation({
        totalArea,
        openingsArea: openings,
        netArea,
        coats,
        coverage,
        paintRequired,
        recommendedPurchase,
        unit
      });
    } else {
      setCalculation(null);
    }
  }, [mode, roomDimensions, customArea, coats, coverage, openingsArea, unit]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    setCalculation(null);
  };

  const handleReset = () => {
    setRoomDimensions({ length: "", width: "", height: "" });
    setCustomArea("");
    setOpeningsArea("");
    setCoats(2);
    setCoverage(getDefaultCoverage(unit));
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Paint Required: ${calculation.paintRequired.toFixed(2)} liters\nRecommended Purchase: ${calculation.recommendedPurchase} liters`;
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
      downloadFile(text, 'paint_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: PaintCalculation) => {
    setUnit(calc.unit);
    setCoats(calc.coats);
    setCoverage(calc.coverage);
    setOpeningsArea(calc.openingsArea.toString());
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Paint Required Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate how much paint you need for your walls or rooms. Get instant estimates with unit conversion and accurate coverage calculations.
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
                    onClick={() => handleModeChange("room")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === "room"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Room
                  </button>
                  <button
                    onClick={() => handleModeChange("custom")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === "custom"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Custom Area
                  </button>
                </div>
              </div>

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

              {/* Number of Coats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Coats</label>
                <select
                  value={coats}
                  onChange={(e) => setCoats(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="1">1 Coat</option>
                  <option value="2">2 Coats</option>
                  <option value="3">3 Coats</option>
                  <option value="4">4 Coats</option>
                </select>
              </div>

              {/* Paint Coverage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage per Liter ({unit}²)
                </label>
                <input
                  type="number"
                  value={coverage}
                  onChange={(e) => setCoverage(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder={unit === "ft" ? "350" : "32.5"}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical: {unit === "ft" ? "300-400 sq ft" : "28-37 sq m"} per liter
                </p>
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
                    Paint Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.paintRequired.toFixed(2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    liters
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Recommended Purchase
                  </p>
                  <div className="text-3xl font-bold">
                    {calculation.recommendedPurchase}
                  </div>
                  <div className="text-lg text-primary-100">
                    liters
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Net Area:</span>
                    <span className="font-semibold">{calculation.netArea.toFixed(2)} {unit}²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Coats:</span>
                    <span className="font-semibold">{calculation.coats}</span>
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "room" ? "Room Dimensions" : "Custom Area"}
              </h3>
              
              {mode === "room" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={roomDimensions.length}
                      onChange={(e) => setRoomDimensions({ ...roomDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="12"
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
                      value={roomDimensions.height}
                      onChange={(e) => setRoomDimensions({ ...roomDimensions, height: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
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
                    placeholder="500"
                    min="0"
                    step="0.1"
                  />
                </div>
              )}

              {/* Openings Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doors & Windows Area ({unit}²) - Optional
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
                  Subtract area of doors and windows for more accurate results
                </p>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Calculation:</strong> ({calculation.totalArea.toFixed(2)} - {calculation.openingsArea.toFixed(2)}) × {calculation.coats} ÷ {calculation.coverage.toFixed(0)} = {calculation.paintRequired.toFixed(2)} liters
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Wall Area</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.totalArea.toFixed(2)} {unit}²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Openings Area</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.openingsArea.toFixed(2)} {unit}²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Net Paintable Area</div>
                    <div className="text-lg font-bold text-primary">{calculation.netArea.toFixed(2)} {unit}²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Coverage Rate</div>
                    <div className="text-lg font-bold text-gray-900">{calculation.coverage.toFixed(0)} {unit}²/L</div>
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
                            {entry.calculation.paintRequired.toFixed(2)} liters
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Area: {entry.calculation.netArea.toFixed(2)} {entry.calculation.unit}² • {entry.calculation.coats} coat{entry.calculation.coats > 1 ? 's' : ''}
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

      <PaintRequiredCalculatorSEO />
      <RelatedTools
        currentTool="paint-required-calculator"
        tools={['wall-area-calculator', 'room-area-calculator', 'floor-area-calculator']}
      />
    </>
  );
}
