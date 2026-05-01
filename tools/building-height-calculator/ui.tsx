"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationMode, Unit, BuildingHeightCalculation } from "./types";
import {
  calculateBuildingHeight,
  getScenarioPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getCalculationModeLabel,
  validateInputs,
  debounce
} from "./logic";
import BuildingHeightCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BuildingHeightCalculatorUI() {
  const [plotArea, setPlotArea] = useState("2000");
  const [far, setFar] = useState("2.5");
  const [floorHeight, setFloorHeight] = useState("10");
  const [roadWidth, setRoadWidth] = useState("20");
  const [setback, setSetback] = useState("5");
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("far-based");
  const [unit, setUnit] = useState<Unit>("feet");
  
  const [calculation, setCalculation] = useState<BuildingHeightCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const scenarioPresets = getScenarioPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const area = parseFloat(plotArea);
      const farValue = parseFloat(far);
      const height = parseFloat(floorHeight);
      const width = parseFloat(roadWidth);
      const setbackValue = parseFloat(setback);
      
      const validationError = validateInputs(area, farValue, height, width, setbackValue);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateBuildingHeight({
          plotArea: area,
          far: farValue,
          floorHeight: height,
          roadWidth: width,
          setback: setbackValue,
          calculationMode,
          unit
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [plotArea, far, floorHeight, roadWidth, setback, calculationMode, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [plotArea, far, floorHeight, roadWidth, setback, calculationMode, unit, debouncedCalculate]);

  const handleReset = () => {
    setPlotArea("2000");
    setFar("2.5");
    setFloorHeight("10");
    setRoadWidth("20");
    setSetback("5");
    setCalculationMode("far-based");
    setUnit("feet");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setPlotArea(preset.plotArea.toString());
    setFar(preset.far.toString());
    setFloorHeight(preset.floorHeight.toString());
    setRoadWidth(preset.roadWidth.toString());
    setSetback(preset.setback.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Building Height: ${formatNumber(calculation.applicableHeight, 2)} ${unit === "feet" ? "ft" : "m"} (${formatNumber(calculation.numberOfFloors, 2)} floors)`;
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
      downloadFile(text, 'building_height_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: BuildingHeightCalculation) => {
    setPlotArea(calc.plotArea.toString());
    setFar(calc.far.toString());
    setFloorHeight(calc.floorHeight.toString());
    setRoadWidth(calc.roadWidth.toString());
    setSetback(calc.setback.toString());
    setCalculationMode(calc.calculationMode);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Building Height Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate maximum allowable building height using FAR, plot size, floor height, and road width regulations. Get instant estimates for zoning compliance.
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
                <select
                  value={calculationMode}
                  onChange={(e) => setCalculationMode(e.target.value as CalculationMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="far-based">FAR Based</option>
                  <option value="road-width-based">Road Width Based</option>
                  <option value="custom">Custom (Min of Both)</option>
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
                    Building Height
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.applicableHeight, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {unit === "feet" ? "feet" : "meters"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Floors:</span>
                    <span className="font-semibold">{formatNumber(calculation.numberOfFloors, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Buildable Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalBuildableArea, 0)} {unit === "feet" ? "sq ft" : "sq m"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Mode:</span>
                    <span className="font-semibold text-xs">{getCalculationModeLabel(calculation.calculationMode)}</span>
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
                Input Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plot Area ({unit === "feet" ? "sq ft" : "sq m"})
                  </label>
                  <input
                    type="number"
                    value={plotArea}
                    onChange={(e) => setPlotArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2000"
                    min="0"
                    step="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FAR (Floor Area Ratio)
                  </label>
                  <input
                    type="number"
                    value={far}
                    onChange={(e) => setFar(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2.5"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Height ({unit === "feet" ? "ft" : "m"})
                  </label>
                  <input
                    type="number"
                    value={floorHeight}
                    onChange={(e) => setFloorHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Road Width ({unit === "feet" ? "ft" : "m"})
                  </label>
                  <input
                    type="number"
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    min="0"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Setback ({unit === "feet" ? "ft" : "m"})
                  </label>
                  <input
                    type="number"
                    value={setback}
                    onChange={(e) => setSetback(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Height = Number of Floors × Floor Height
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Scenario Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scenarioPresets.map((preset, index) => (
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Height</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.applicableHeight, 2)}</div>
                    <div className="text-xs text-gray-600">{unit === "feet" ? "ft" : "m"}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Floors</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.numberOfFloors, 2)}</div>
                    <div className="text-xs text-gray-600">levels</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">FAR Height</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.buildingHeight, 2)}</div>
                    <div className="text-xs text-gray-600">{unit === "feet" ? "ft" : "m"}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Road Rule</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.heightByRoadWidth || 0, 2)}</div>
                    <div className="text-xs text-gray-600">{unit === "feet" ? "ft" : "m"}</div>
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
                            {formatNumber(entry.calculation.applicableHeight, 2)} {entry.calculation.unit === "feet" ? "ft" : "m"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.numberOfFloors, 2)} floors • 
                          FAR {formatNumber(entry.calculation.far, 2)}
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

      <BuildingHeightCalculatorSEO />
      <RelatedTools
        currentTool="building-height-calculator"
        tools={['floor-area-calculator', 'plot-area-calculator', 'room-volume-calculator']}
      />
    </>
  );
}
