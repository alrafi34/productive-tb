"use client";

import { useState, useEffect } from "react";
import { Unit, SlopeStabilityCalculation } from "./types";
import {
  calculateSlopeStability,
  getSoilPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getStatusColor,
  getStatusBgColor
} from "./logic";
import SlopeStabilityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SlopeStabilityCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [slopeAngle, setSlopeAngle] = useState("30");
  const [slopeHeight, setSlopeHeight] = useState("10");
  const [cohesion, setCohesion] = useState("20");
  const [frictionAngle, setFrictionAngle] = useState("25");
  const [unitWeight, setUnitWeight] = useState("18");
  const [poreWaterPressureRatio, setPoreWaterPressureRatio] = useState("0");
  
  // Results
  const [calculation, setCalculation] = useState<SlopeStabilityCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const angle = parseFloat(slopeAngle);
    const height = parseFloat(slopeHeight);
    const c = parseFloat(cohesion);
    const phi = parseFloat(frictionAngle);
    const gamma = parseFloat(unitWeight);
    const ru = parseFloat(poreWaterPressureRatio);
    
    if (!isNaN(angle) && !isNaN(height) && !isNaN(c) && !isNaN(phi) && !isNaN(gamma) && !isNaN(ru) &&
        angle > 0 && angle <= 90 && height > 0 && c >= 0 && phi >= 0 && gamma > 0 && ru >= 0 && ru <= 1) {
      const result = calculateSlopeStability({
        slopeAngle: angle,
        slopeHeight: height,
        cohesion: c,
        frictionAngle: phi,
        unitWeight: gamma,
        poreWaterPressureRatio: ru,
        unit
      });
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [slopeAngle, slopeHeight, cohesion, frictionAngle, unitWeight, poreWaterPressureRatio, unit]);

  const handleReset = () => {
    setSlopeAngle("30");
    setSlopeHeight("10");
    setCohesion("20");
    setFrictionAngle("25");
    setUnitWeight("18");
    setPoreWaterPressureRatio("0");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setSlopeAngle("30");
    setSlopeHeight(unit === 'metric' ? "10" : "33");
    setCohesion(unit === 'metric' ? "20" : "420");
    setFrictionAngle("25");
    setUnitWeight(unit === 'metric' ? "18" : "115");
    setPoreWaterPressureRatio("0");
  };

  const handleApplyPreset = (preset: any) => {
    setCohesion(preset.cohesion.toString());
    setFrictionAngle(preset.frictionAngle.toString());
    setUnitWeight(preset.unitWeight.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Slope Stability: FoS = ${calculation.factorOfSafety} - Status: ${calculation.status.toUpperCase()}`;
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
      downloadFile(text, 'slope_stability_analysis.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'slope_stability_analysis.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SlopeStabilityCalculation) => {
    setSlopeAngle(calc.slopeAngle.toString());
    setSlopeHeight(calc.slopeHeight.toString());
    setCohesion(calc.cohesion.toString());
    setFrictionAngle(calc.frictionAngle.toString());
    setUnitWeight(calc.unitWeight.toString());
    setPoreWaterPressureRatio(calc.poreWaterPressureRatio.toString());
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const soilPresets = getSoilPresets();
  const unitLabel = unit === "metric" ? "m" : "ft";
  const cohesionUnit = unit === "metric" ? "kPa" : "psf";
  const weightUnit = unit === "metric" ? "kN/m³" : "pcf";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⛰️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Slope Stability Calculator</h3>
              <p className="text-sm text-blue-800">
                Analyze slope stability using simplified infinite slope model. Calculate Factor of Safety (FoS) based on soil properties, slope geometry, and water conditions.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "metric"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Imperial
                  </button>
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
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
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
                    Factor of Safety
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {calculation.factorOfSafety}
                  </div>
                  <div className="text-xl text-primary-100">
                    {calculation.status === 'stable' ? 'Stable' : calculation.status === 'marginal' ? 'Marginal' : 'Unstable'}
                  </div>
                </div>

                {/* FoS Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-primary-100">
                    <span>0.0</span>
                    <span>Critical: 1.0</span>
                    <span>Safe: 1.3+</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((calculation.factorOfSafety / 2) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slope Angle:</span>
                    <span className="font-semibold">{formatNumber(calculation.slopeAngle)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Failure Depth:</span>
                    <span className="font-semibold">{formatNumber(calculation.failureDepth)} {unitLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Status:</span>
                    <span className="font-semibold uppercase">{calculation.status}</span>
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
            
            {/* Slope Geometry Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Slope Geometry
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slope Angle (degrees)
                  </label>
                  <input
                    type="range"
                    value={slopeAngle}
                    onChange={(e) => setSlopeAngle(e.target.value)}
                    className="w-full mb-2"
                    min="0"
                    max="90"
                    step="1"
                  />
                  <input
                    type="number"
                    value={slopeAngle}
                    onChange={(e) => setSlopeAngle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="30"
                    min="0"
                    max="90"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    0° = flat, 90° = vertical
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slope Height ({unitLabel})
                  </label>
                  <input
                    type="number"
                    value={slopeHeight}
                    onChange={(e) => setSlopeHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '10' : '33'}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vertical height of slope
                  </p>
                </div>
              </div>
            </div>

            {/* Soil Properties Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Soil Properties
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cohesion ({cohesionUnit})
                  </label>
                  <input
                    type="number"
                    value={cohesion}
                    onChange={(e) => setCohesion(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '20' : '420'}
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Soil shear strength
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Friction Angle (φ°)
                  </label>
                  <input
                    type="range"
                    value={frictionAngle}
                    onChange={(e) => setFrictionAngle(e.target.value)}
                    className="w-full mb-2"
                    min="0"
                    max="50"
                    step="1"
                  />
                  <input
                    type="number"
                    value={frictionAngle}
                    onChange={(e) => setFrictionAngle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="25"
                    min="0"
                    max="50"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Weight ({weightUnit})
                  </label>
                  <input
                    type="number"
                    value={unitWeight}
                    onChange={(e) => setUnitWeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '18' : '115'}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Soil density
                  </p>
                </div>
              </div>
            </div>

            {/* Water Conditions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Water Conditions
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pore Water Pressure Ratio (ru)
                </label>
                <input
                  type="range"
                  value={poreWaterPressureRatio}
                  onChange={(e) => setPoreWaterPressureRatio(e.target.value)}
                  className="w-full mb-2"
                  min="0"
                  max="1"
                  step="0.05"
                />
                <input
                  type="number"
                  value={poreWaterPressureRatio}
                  onChange={(e) => setPoreWaterPressureRatio(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0"
                  min="0"
                  max="1"
                  step="0.05"
                />
                <p className="text-xs text-gray-500 mt-1">
                  0 = dry conditions, 1 = fully saturated
                </p>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> FoS = (c + γ×z×cos²θ×tanφ×(1-ru)) / (γ×z×sinθ×cosθ)
                  </div>
                </div>
              )}
            </div>

            {/* Soil Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Soil Type Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {soilPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      c={preset.cohesion} kPa, φ={preset.frictionAngle}°
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Status and Notes */}
            {calculation && (
              <div className={`rounded-xl border p-6 ${getStatusBgColor(calculation.status)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">
                    {calculation.status === 'stable' ? '✅' : calculation.status === 'marginal' ? '⚠️' : '❌'}
                  </span>
                  <h3 className={`font-semibold text-lg ${getStatusColor(calculation.status)}`}>
                    Status: {calculation.status.charAt(0).toUpperCase() + calculation.status.slice(1)}
                  </h3>
                </div>
                
                {calculation.notes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Engineering Notes:</p>
                    <ul className="space-y-1">
                      {calculation.notes.map((note, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Analysis Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Factor of Safety</div>
                    <div className="text-lg font-bold text-primary">{calculation.factorOfSafety}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Slope Angle</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.slopeAngle)}°</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Height</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.slopeHeight)} {unitLabel}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cohesion</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.cohesion)} {cohesionUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Friction Angle</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.frictionAngle)}°</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
                    <div className="text-sm font-bold text-gray-900 uppercase">{calculation.status}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export Text
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
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
                            FoS = {entry.calculation.factorOfSafety}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Angle: {formatNumber(entry.calculation.slopeAngle)}° • 
                          Status: {entry.calculation.status}
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

      <SlopeStabilityCalculatorSEO />
      <RelatedTools
        currentTool="slope-stability-calculator"
        tools={['soil-bearing-capacity-calculator', 'retaining-wall-calculator', 'foundation-depth-calculator']}
      />
    </>
  );
}
