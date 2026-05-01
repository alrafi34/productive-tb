"use client";

import { useState, useEffect, useCallback } from "react";
import { InputMode, LayoutType, Unit, ParkingSpaceCalculation } from "./types";
import {
  calculateParkingCapacity,
  getLayoutPresets,
  getRecommendedAisleWidth,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getLayoutTypeLabel,
  getInputModeLabel,
  validateInputs,
  debounce
} from "./logic";
import ParkingSpaceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ParkingSpaceCalculatorUI() {
  const [inputMode, setInputMode] = useState<InputMode>("total-area");
  const [totalArea, setTotalArea] = useState("10000");
  const [width, setWidth] = useState("100");
  const [length, setLength] = useState("100");
  const [unit, setUnit] = useState<Unit>("feet");
  const [layoutType, setLayoutType] = useState<LayoutType>("perpendicular");
  const [spaceWidth, setSpaceWidth] = useState("8.5");
  const [spaceLength, setSpaceLength] = useState("18");
  const [aisleWidth, setAisleWidth] = useState("24");
  
  const [calculation, setCalculation] = useState<ParkingSpaceCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const layoutPresets = getLayoutPresets();

  // Update aisle width when layout type changes
  useEffect(() => {
    const recommendedWidth = getRecommendedAisleWidth(layoutType);
    setAisleWidth(recommendedWidth.toString());
  }, [layoutType]);

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const area = parseFloat(totalArea);
      const w = parseFloat(width);
      const l = parseFloat(length);
      
      const validationError = validateInputs(inputMode, area, w, l);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateParkingCapacity({
          inputMode,
          totalArea: area,
          width: w,
          length: l,
          unit,
          layoutType,
          spaceWidth: parseFloat(spaceWidth),
          spaceLength: parseFloat(spaceLength),
          aisleWidth: parseFloat(aisleWidth)
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [inputMode, totalArea, width, length, unit, layoutType, spaceWidth, spaceLength, aisleWidth]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputMode, totalArea, width, length, unit, layoutType, spaceWidth, spaceLength, aisleWidth, debouncedCalculate]);

  const handleReset = () => {
    setInputMode("total-area");
    setTotalArea("10000");
    setWidth("100");
    setLength("100");
    setUnit("feet");
    setLayoutType("perpendicular");
    setSpaceWidth("8.5");
    setSpaceLength("18");
    setAisleWidth("24");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setLayoutType(preset.layoutType);
    setSpaceWidth(preset.spaceWidth.toString());
    setSpaceLength(preset.spaceLength.toString());
    setAisleWidth(preset.aisleWidth.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Parking Capacity: ${calculation.estimatedCapacity} vehicles (${formatNumber(calculation.totalArea, 0)} ${unit === "feet" ? "sq ft" : "sq m"})`;
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

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'parking_space_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ParkingSpaceCalculation) => {
    setInputMode(calc.inputMode);
    setTotalArea(calc.totalArea.toString());
    setUnit(calc.unit);
    setLayoutType(calc.layoutType);
    setSpaceWidth(calc.spaceWidth.toString());
    setSpaceLength(calc.spaceLength.toString());
    setAisleWidth(calc.aisleWidth.toString());
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🅿️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Parking Space Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate parking capacity based on area, layout type, and spacing requirements. Get instant estimates for parking lot planning.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Input Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Mode</label>
                <select
                  value={inputMode}
                  onChange={(e) => setInputMode(e.target.value as InputMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="total-area">Total Area</option>
                  <option value="dimensions">Custom Dimensions</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
                </select>
              </div>

              {/* Layout Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Layout Type</label>
                <select
                  value={layoutType}
                  onChange={(e) => setLayoutType(e.target.value as LayoutType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="perpendicular">Perpendicular (90°)</option>
                  <option value="angled-60">Angled (60°)</option>
                  <option value="angled-45">Angled (45°)</option>
                  <option value="parallel">Parallel</option>
                </select>
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Parking Capacity
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.estimatedCapacity}
                  </div>
                  <div className="text-xl text-primary-100">
                    vehicles
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Efficiency:</span>
                    <span className="font-semibold">{formatNumber(calculation.efficiencyPercentage, 1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Used Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.usedArea, 0)} {unit === "feet" ? "sq ft" : "sq m"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Layout:</span>
                    <span className="font-semibold text-xs">{getLayoutTypeLabel(calculation.layoutType)}</span>
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
                {inputMode === "total-area" ? "Area Input" : "Dimensions"}
              </h3>
              
              {inputMode === "total-area" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Area ({unit === "feet" ? "sq ft" : "sq m"})
                  </label>
                  <input
                    type="number"
                    value={totalArea}
                    onChange={(e) => setTotalArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10000"
                    min="0"
                    step="100"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit === "feet" ? "ft" : "m"})
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit === "feet" ? "ft" : "m"})
                    </label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Capacity = Total Area ÷ Area per Space
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Space Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Parking Space Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Space Width ({unit === "feet" ? "ft" : "m"})
                  </label>
                  <input
                    type="number"
                    value={spaceWidth}
                    onChange={(e) => setSpaceWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="8.5"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Space Length ({unit === "feet" ? "ft" : "m"})
                  </label>
                  <input
                    type="number"
                    value={spaceLength}
                    onChange={(e) => setSpaceLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="18"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aisle Width ({unit === "feet" ? "ft" : "m"})
                  </label>
                  <input
                    type="number"
                    value={aisleWidth}
                    onChange={(e) => setAisleWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="24"
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Layout Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {layoutPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Summary */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Capacity</div>
                    <div className="text-2xl font-bold text-primary">{calculation.estimatedCapacity}</div>
                    <div className="text-xs text-gray-600">vehicles</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.efficiencyPercentage, 1)}%</div>
                    <div className="text-xs text-gray-600">space used</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Per Space</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.areaPerSpace, 0)}</div>
                    <div className="text-xs text-gray-600">sq ft</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Unused</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.unusedArea, 0)}</div>
                    <div className="text-xs text-gray-600">{unit === "feet" ? "sq ft" : "sq m"}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {calculation && calculation.notes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Notes & Recommendations
                </h3>
                <ul className="space-y-2">
                  {calculation.notes.map((note, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Export Button */}
            {calculation && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Report
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
                            {entry.calculation.estimatedCapacity} vehicles
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.totalArea, 0)} {entry.calculation.unit === "feet" ? "sq ft" : "sq m"} • 
                          {getLayoutTypeLabel(entry.calculation.layoutType)}
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

      <ParkingSpaceCalculatorSEO />
      <RelatedTools
        currentTool="parking-space-calculator"
        tools={['room-area-calculator', 'floor-area-calculator', 'plot-area-calculator']}
      />
    </>
  );
}
