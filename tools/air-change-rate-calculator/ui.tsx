"use client";

import { useState, useEffect } from "react";
import { InputMode, DimensionUnit, VolumeUnit, AirflowUnit, ACHCalculation } from "./types";
import {
  performACHCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getAirflowUnitLabel,
  getVolumeUnitLabel,
  getDimensionUnitLabel,
  getACHRanges,
  getACHCategory,
  validateInputs,
  isUnrealisticACH
} from "./logic";
import AirChangeRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AirChangeRateCalculatorUI() {
  const [mode, setMode] = useState<InputMode>("dimensions");
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("m");
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("m3");
  const [airflowUnit, setAirflowUnit] = useState<AirflowUnit>("m3h");
  
  // Dimensions mode inputs
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  
  // Volume mode input
  const [volume, setVolume] = useState("");
  
  // Airflow input
  const [airflow, setAirflow] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<ACHCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const airflowVal = parseFloat(airflow);
    
    if (mode === "dimensions") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      
      const validationError = validateInputs(mode, airflowVal, l, w, h);
      if (validationError) {
        setCalculation(null);
        return;
      }
      
      const result = performACHCalculation(mode, airflowVal, airflowUnit, l, w, h, dimensionUnit);
      setCalculation(result);
      
      if (isUnrealisticACH(result.ach)) {
        setError("Warning: ACH value seems unrealistic. Please check your inputs and units.");
      }
    } else {
      const vol = parseFloat(volume);
      
      const validationError = validateInputs(mode, airflowVal, undefined, undefined, undefined, vol);
      if (validationError) {
        setCalculation(null);
        return;
      }
      
      const result = performACHCalculation(mode, airflowVal, airflowUnit, undefined, undefined, undefined, undefined, vol, volumeUnit);
      setCalculation(result);
      
      if (isUnrealisticACH(result.ach)) {
        setError("Warning: ACH value seems unrealistic. Please check your inputs and units.");
      }
    }
  }, [mode, length, width, height, dimensionUnit, volume, volumeUnit, airflow, airflowUnit]);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setVolume("");
    setAirflow("");
    setCalculation(null);
    setError(null);
  };

  const handleModeChange = (newMode: InputMode) => {
    setMode(newMode);
    setCalculation(null);
    setError(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `ACH: ${formatNumber(calculation.ach)} air changes/hour`;
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
      downloadFile(text, 'ach_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ACHCalculation) => {
    setMode(calc.mode);
    setAirflowUnit(calc.airflowUnit);
    setAirflow(calc.airflow.toString());
    
    if (calc.mode === "dimensions") {
      setDimensionUnit(calc.dimensionUnit!);
      setLength(calc.length!.toString());
      setWidth(calc.width!.toString());
      setHeight(calc.height!.toString());
    } else {
      setVolumeUnit(calc.volumeUnit!);
      setVolume(calc.volume!.toString());
    }
    setShowHistory(false);
  };

  const achCategory = calculation ? getACHCategory(calculation.ach) : null;
  const achRanges = getACHRanges();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌬️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Air Change Rate Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate air changes per hour (ACH) for ventilation design and HVAC systems. Essential for maintaining indoor air quality and meeting building codes.
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
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={mode === "dimensions"}
                      onChange={() => handleModeChange("dimensions")}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Calculate from Dimensions</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={mode === "volume"}
                      onChange={() => handleModeChange("volume")}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Calculate from Volume</span>
                  </label>
                </div>
              </div>

              {/* Airflow Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Airflow Unit</label>
                <select
                  value={airflowUnit}
                  onChange={(e) => setAirflowUnit(e.target.value as AirflowUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="m3h">m³/h (Cubic Meters/Hour)</option>
                  <option value="CFM">CFM (Cubic Feet/Min)</option>
                </select>
              </div>

              {mode === "dimensions" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimension Unit</label>
                  <select
                    value={dimensionUnit}
                    onChange={(e) => setDimensionUnit(e.target.value as DimensionUnit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m">Meters (m)</option>
                    <option value="ft">Feet (ft)</option>
                  </select>
                </div>
              )}

              {mode === "volume" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Volume Unit</label>
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m3">m³ (Cubic Meters)</option>
                    <option value="ft3">ft³ (Cubic Feet)</option>
                  </select>
                </div>
              )}

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
                    Air Changes per Hour
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.ach)}
                  </div>
                  <div className="text-xl text-primary-100">
                    ACH
                  </div>
                </div>

                {achCategory && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: achCategory.color }}
                        ></div>
                        <span className="font-semibold">{achCategory.name}</span>
                      </div>
                      <p className="text-primary-100 text-xs">{achCategory.description}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Volume:</span>
                    <span className="font-semibold">{formatNumber(calculation.calculatedVolume)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Airflow:</span>
                    <span className="font-semibold">{formatNumber(calculation.normalizedAirflow)} m³/h</span>
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
                {mode === "dimensions" ? "Room Dimensions" : "Room Volume"}
              </h3>
              
              {mode === "dimensions" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({dimensionUnit})
                    </label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={dimensionUnit === "m" ? "10" : "33"}
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({dimensionUnit})
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={dimensionUnit === "m" ? "5" : "16"}
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({dimensionUnit})
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder={dimensionUnit === "m" ? "3" : "10"}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume ({getVolumeUnitLabel(volumeUnit)})
                  </label>
                  <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={volumeUnit === "m3" ? "150" : "5300"}
                    min="0"
                    step="0.1"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Airflow Rate ({getAirflowUnitLabel(airflowUnit)})
                </label>
                <input
                  type="number"
                  value={airflow}
                  onChange={(e) => setAirflow(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder={airflowUnit === "m3h" ? "300" : "177"}
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The rate at which air is supplied to or removed from the space
                </p>
              </div>

              {error && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">{error}</p>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      ACH = Airflow Rate / Room Volume
                    </div>
                    <div className="mt-1 text-xs">
                      {formatNumber(calculation.normalizedAirflow)} m³/h ÷ {formatNumber(calculation.calculatedVolume)} m³ = {formatNumber(calculation.ach)} ACH
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACH Ranges Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                ACH Reference Guide
              </h3>
              
              <div className="space-y-3">
                {achRanges.map((range, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: range.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{range.name}</span>
                        <span className="text-xs text-gray-500">
                          {range.min === 0 ? '0' : formatNumber(range.min, 1)} - {range.max === Infinity ? '∞' : formatNumber(range.max, 1)} ACH
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{range.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Indicator */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  ACH Level Indicator
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ 
                          width: `${Math.min(100, (calculation.ach / 20) * 100)}%`,
                          backgroundColor: achCategory?.color || '#10b981'
                        }}
                      >
                        <span className="text-xs font-bold text-white">
                          {formatNumber(calculation.ach)} ACH
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 ACH</span>
                    <span>20 ACH</span>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Result
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
                            {formatNumber(entry.calculation.ach)} ACH
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.mode === "dimensions" 
                            ? `${entry.calculation.length}×${entry.calculation.width}×${entry.calculation.height} ${entry.calculation.dimensionUnit}`
                            : `${entry.calculation.volume} ${entry.calculation.volumeUnit}`
                          } | {entry.calculation.airflow} {getAirflowUnitLabel(entry.calculation.airflowUnit)}
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

      <AirChangeRateCalculatorSEO />
      <RelatedTools
        currentTool="air-change-rate-calculator"
        tools={['ventilation-calculator', 'hvac-load-calculator', 'room-volume-calculator']}
      />
    </>
  );
}
