"use client";

import { useState, useEffect } from "react";
import { CalculationMode, TemperatureUnit, HeatLossCalculation } from "./types";
import {
  performHeatLossCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getMaterialPresets,
  getBuildingPresets,
  getHeatLossIntensity,
  validateInputs
} from "./logic";
import HeatLossCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HeatLossCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("simple");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("celsius");
  const [insideTemp, setInsideTemp] = useState("22");
  const [outsideTemp, setOutsideTemp] = useState("5");
  
  // Simple mode
  const [totalArea, setTotalArea] = useState("");
  const [averageUValue, setAverageUValue] = useState("");
  
  // Detailed mode
  const [wallArea, setWallArea] = useState("");
  const [wallUValue, setWallUValue] = useState("");
  const [windowArea, setWindowArea] = useState("");
  const [windowUValue, setWindowUValue] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [roofUValue, setRoofUValue] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [floorUValue, setFloorUValue] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<HeatLossCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showMaterialPresets, setShowMaterialPresets] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const materialPresets = getMaterialPresets();
  const buildingPresets = getBuildingPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const iTemp = parseFloat(insideTemp);
    const oTemp = parseFloat(outsideTemp);
    
    if (mode === "simple") {
      const tArea = parseFloat(totalArea);
      const uVal = parseFloat(averageUValue);
      
      const validationError = validateInputs(mode, iTemp, oTemp, tArea, uVal);
      if (validationError) {
        setCalculation(null);
        return;
      }
      
      const result = performHeatLossCalculation(
        mode, temperatureUnit, iTemp, oTemp, tArea, uVal
      );
      setCalculation(result);
    } else {
      const wArea = parseFloat(wallArea);
      const wUVal = parseFloat(wallUValue);
      const winArea = parseFloat(windowArea);
      const winUVal = parseFloat(windowUValue);
      const rArea = parseFloat(roofArea);
      const rUVal = parseFloat(roofUValue);
      const fArea = parseFloat(floorArea);
      const fUVal = parseFloat(floorUValue);
      
      const validationError = validateInputs(
        mode, iTemp, oTemp, undefined, undefined,
        wArea, wUVal, winArea, winUVal, rArea, rUVal, fArea, fUVal
      );
      if (validationError) {
        setCalculation(null);
        return;
      }
      
      const result = performHeatLossCalculation(
        mode, temperatureUnit, iTemp, oTemp, undefined, undefined,
        wArea, wUVal, winArea, winUVal, rArea, rUVal, fArea, fUVal
      );
      setCalculation(result);
    }
  }, [mode, temperatureUnit, insideTemp, outsideTemp, totalArea, averageUValue,
      wallArea, wallUValue, windowArea, windowUValue, roofArea, roofUValue, floorArea, floorUValue]);

  const handleReset = () => {
    setInsideTemp("22");
    setOutsideTemp("5");
    setTotalArea("");
    setAverageUValue("");
    setWallArea("");
    setWallUValue("");
    setWindowArea("");
    setWindowUValue("");
    setRoofArea("");
    setRoofUValue("");
    setFloorArea("");
    setFloorUValue("");
    setCalculation(null);
    setError(null);
  };

  const handleApplyBuildingPreset = (preset: any) => {
    setMode("detailed");
    setWallArea(preset.wallArea.toString());
    setWallUValue(preset.wallUValue.toString());
    setWindowArea(preset.windowArea.toString());
    setWindowUValue(preset.windowUValue.toString());
    setRoofArea(preset.roofArea.toString());
    setRoofUValue(preset.roofUValue.toString());
    setFloorArea(preset.floorArea.toString());
    setFloorUValue(preset.floorUValue.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Heat Loss: ${formatNumber(calculation.totalHeatLoss)} W (${formatNumber(calculation.totalHeatLossBTU)} BTU/hr)`;
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
      downloadFile(text, 'heat_loss_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'heat_loss_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: HeatLossCalculation) => {
    setMode(calc.mode);
    setTemperatureUnit(calc.temperatureUnit);
    setInsideTemp(calc.insideTemp.toString());
    setOutsideTemp(calc.outsideTemp.toString());
    
    if (calc.mode === "simple") {
      setTotalArea(calc.totalArea?.toString() || "");
      setAverageUValue(calc.averageUValue?.toString() || "");
    } else {
      setWallArea(calc.wallArea?.toString() || "");
      setWallUValue(calc.wallUValue?.toString() || "");
      setWindowArea(calc.windowArea?.toString() || "");
      setWindowUValue(calc.windowUValue?.toString() || "");
      setRoofArea(calc.roofArea?.toString() || "");
      setRoofUValue(calc.roofUValue?.toString() || "");
      setFloorArea(calc.floorArea?.toString() || "");
      setFloorUValue(calc.floorUValue?.toString() || "");
    }
    setShowHistory(false);
  };

  const intensity = calculation ? getHeatLossIntensity(calculation.totalHeatLoss) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌡️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Heat Loss Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate building heat loss using area, U-values, and temperature difference. Estimate energy loss for HVAC sizing and insulation planning.
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
                  value={mode}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="simple">Simple Mode</option>
                  <option value="detailed">Detailed Mode</option>
                </select>
              </div>

              {/* Temperature Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                <select
                  value={temperatureUnit}
                  onChange={(e) => setTemperatureUnit(e.target.value as TemperatureUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
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
                <button
                  onClick={() => setShowMaterialPresets(!showMaterialPresets)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📚 {showMaterialPresets ? 'Hide' : 'Show'} U-Values
                </button>
              </div>
            </div>

            {/* Result Display */}
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Heat Loss
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalHeatLoss)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Watts
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">BTU/hr:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalHeatLossBTU)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Temp Diff:</span>
                    <span className="font-semibold">{formatNumber(calculation.temperatureDifference)}°C</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-primary-100 mb-1">Assessment:</div>
                    <div className="font-semibold text-sm">{intensity?.level} - {intensity?.description}</div>
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
            
            {/* Temperature Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Temperature Conditions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inside Temperature ({temperatureUnit === "celsius" ? "°C" : "°F"})
                  </label>
                  <input
                    type="number"
                    value={insideTemp}
                    onChange={(e) => setInsideTemp(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="22"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outside Temperature ({temperatureUnit === "celsius" ? "°C" : "°F"})
                  </label>
                  <input
                    type="number"
                    value={outsideTemp}
                    onChange={(e) => setOutsideTemp(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Temperature Difference:</strong> {formatNumber(calculation.temperatureDifference)}°C
                  </div>
                </div>
              )}
            </div>

            {/* Simple Mode Inputs */}
            {mode === "simple" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Building Properties
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Area (m²)
                    </label>
                    <input
                      type="number"
                      value={totalArea}
                      onChange={(e) => setTotalArea(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="20"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average U-Value (W/m²·K)
                    </label>
                    <input
                      type="number"
                      value={averageUValue}
                      onChange={(e) => setAverageUValue(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.35"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <strong>Formula:</strong> Q = U × A × ΔT
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Mode Inputs */}
            {mode === "detailed" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Building Components
                </h3>
                
                {/* Wall */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Wall</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Area (m²)</label>
                      <input
                        type="number"
                        value={wallArea}
                        onChange={(e) => setWallArea(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="80"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">U-Value (W/m²·K)</label>
                      <input
                        type="number"
                        value={wallUValue}
                        onChange={(e) => setWallUValue(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="0.35"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Window */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Window</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Area (m²)</label>
                      <input
                        type="number"
                        value={windowArea}
                        onChange={(e) => setWindowArea(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="15"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">U-Value (W/m²·K)</label>
                      <input
                        type="number"
                        value={windowUValue}
                        onChange={(e) => setWindowUValue(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="2.8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Roof */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Roof</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Area (m²)</label>
                      <input
                        type="number"
                        value={roofArea}
                        onChange={(e) => setRoofArea(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="60"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">U-Value (W/m²·K)</label>
                      <input
                        type="number"
                        value={roofUValue}
                        onChange={(e) => setRoofUValue(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="0.25"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Floor */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Floor</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Area (m²)</label>
                      <input
                        type="number"
                        value={floorArea}
                        onChange={(e) => setFloorArea(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="60"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">U-Value (W/m²·K)</label>
                      <input
                        type="number"
                        value={floorUValue}
                        onChange={(e) => setFloorUValue(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="0.25"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Heat Loss Breakdown */}
            {calculation && mode === "detailed" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Heat Loss Breakdown
                  </h3>
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                
                {showBreakdown && (
                  <div className="space-y-3">
                    {calculation.wallHeatLoss > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">Wall Heat Loss</span>
                        <span className="font-semibold text-gray-900">{formatNumber(calculation.wallHeatLoss)} W</span>
                      </div>
                    )}
                    {calculation.windowHeatLoss > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">Window Heat Loss</span>
                        <span className="font-semibold text-gray-900">{formatNumber(calculation.windowHeatLoss)} W</span>
                      </div>
                    )}
                    {calculation.roofHeatLoss > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">Roof Heat Loss</span>
                        <span className="font-semibold text-gray-900">{formatNumber(calculation.roofHeatLoss)} W</span>
                      </div>
                    )}
                    {calculation.floorHeatLoss > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">Floor Heat Loss</span>
                        <span className="font-semibold text-gray-900">{formatNumber(calculation.floorHeatLoss)} W</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                      <span className="text-sm font-semibold text-primary">Total Heat Loss</span>
                      <span className="font-bold text-primary">{formatNumber(calculation.totalHeatLoss)} W</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Building Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Building Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {buildingPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyBuildingPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
              </div>
            )}

            {/* Material Presets Panel */}
            {showMaterialPresets && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Typical U-Values (W/m²·K)
                  </h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {["Wall", "Window", "Roof", "Floor"].map(category => (
                    <div key={category} className="p-4">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">{category}</h4>
                      <div className="space-y-2">
                        {materialPresets
                          .filter(p => p.category === category)
                          .map((preset, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{preset.name}</span>
                              <span className="font-mono font-semibold text-gray-900">{preset.uValue}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                            {formatNumber(entry.calculation.totalHeatLoss)} W
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.mode === "simple" ? "Simple" : "Detailed"} | ΔT: {formatNumber(entry.calculation.temperatureDifference)}°C
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

      <HeatLossCalculatorSEO />
      <RelatedTools
        currentTool="heat-loss-calculator-building"
        tools={['hvac-load-calculator', 'cooling-load-calculator-architecture', 'ventilation-calculator']}
      />
    </>
  );
}
