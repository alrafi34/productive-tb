"use client";

import { useState, useEffect } from "react";
import { Unit, RetainingWallCalculation } from "./types";
import {
  calculateRetainingWall,
  getWallPresets,
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
import RetainingWallCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RetainingWallCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [wallHeight, setWallHeight] = useState("");
  const [wallLength, setWallLength] = useState("");
  const [wallThickness, setWallThickness] = useState("");
  const [soilDensity, setSoilDensity] = useState("18");
  const [frictionAngle, setFrictionAngle] = useState("30");
  const [backfillSlope, setBackfillSlope] = useState("0");
  const [safetyFactor, setSafetyFactor] = useState("1.5");
  
  // Results
  const [calculation, setCalculation] = useState<RetainingWallCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const H = parseFloat(wallHeight);
    const L = parseFloat(wallLength);
    const T = parseFloat(wallThickness);
    const gamma = parseFloat(soilDensity);
    const phi = parseFloat(frictionAngle);
    const beta = parseFloat(backfillSlope);
    const FOS = parseFloat(safetyFactor);
    
    if (!isNaN(H) && !isNaN(L) && !isNaN(T) && !isNaN(gamma) && !isNaN(phi) && !isNaN(beta) && !isNaN(FOS) &&
        H > 0 && L > 0 && T > 0 && gamma > 0 && phi >= 0 && beta >= 0 && FOS > 0) {
      const result = calculateRetainingWall({
        wallHeight: H,
        wallLength: L,
        wallThickness: T,
        soilDensity: gamma,
        frictionAngle: phi,
        backfillSlope: beta,
        safetyFactor: FOS,
        unit
      });
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [wallHeight, wallLength, wallThickness, soilDensity, frictionAngle, backfillSlope, safetyFactor, unit]);

  const handleReset = () => {
    setWallHeight("");
    setWallLength("");
    setWallThickness("");
    setSoilDensity("18");
    setFrictionAngle("30");
    setBackfillSlope("0");
    setSafetyFactor("1.5");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setWallHeight(unit === 'metric' ? "2.0" : "6.5");
    setWallLength(unit === 'metric' ? "10.0" : "33");
    setWallThickness(unit === 'metric' ? "0.3" : "1.0");
    setSoilDensity(unit === 'metric' ? "18" : "115");
    setFrictionAngle("30");
    setBackfillSlope("0");
    setSafetyFactor("1.5");
  };

  const handleApplyPreset = (preset: any) => {
    setWallHeight(preset.wallHeight.toString());
    setWallLength(preset.wallLength.toString());
    setWallThickness(preset.wallThickness.toString());
    setSoilDensity(preset.soilDensity.toString());
    setFrictionAngle(preset.frictionAngle.toString());
    setBackfillSlope(preset.backfillSlope.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const unitLabel = calculation.unit === "metric" ? "m" : "ft";
      const text = `Retaining Wall: Height ${formatNumber(calculation.wallHeight)} ${unitLabel}, Base Width ${formatNumber(calculation.recommendedBaseWidth)} ${unitLabel}, Lateral Force ${formatNumber(calculation.lateralForce)} kN/m`;
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
      downloadFile(text, 'retaining_wall_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'retaining_wall_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RetainingWallCalculation) => {
    setWallHeight(calc.wallHeight.toString());
    setWallLength(calc.wallLength.toString());
    setWallThickness(calc.wallThickness.toString());
    setSoilDensity(calc.soilDensity.toString());
    setFrictionAngle(calc.frictionAngle.toString());
    setBackfillSlope(calc.backfillSlope.toString());
    setSafetyFactor(calc.safetyFactor.toString());
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const wallPresets = getWallPresets();
  const unitLabel = unit === "metric" ? "m" : "ft";
  const volumeUnit = unit === "metric" ? "m³" : "ft³";
  const densityUnit = unit === "metric" ? "kN/m³" : "pcf";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Retaining Wall Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate retaining wall dimensions, lateral earth pressure, and material requirements. Get instant estimates for wall design and construction planning.
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

              {/* Safety Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Factor
                </label>
                <input
                  type="number"
                  value={safetyFactor}
                  onChange={(e) => setSafetyFactor(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1.5"
                  min="1"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical: 1.5 - 2.0
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
                    Lateral Force
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.lateralForce)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {unit === 'metric' ? 'kN/m' : 'lb/ft'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Width:</span>
                    <span className="font-semibold">{formatNumber(calculation.recommendedBaseWidth)} {unitLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Concrete Volume:</span>
                    <span className="font-semibold">{formatNumber(calculation.concreteVolume)} {volumeUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Ka Factor:</span>
                    <span className="font-semibold">{calculation.earthPressureCoefficient}</span>
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Wall Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wall Height ({unitLabel})
                  </label>
                  <input
                    type="number"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '2.0' : '6.5'}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wall Length ({unitLabel})
                  </label>
                  <input
                    type="number"
                    value={wallLength}
                    onChange={(e) => setWallLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '10.0' : '33'}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wall Thickness ({unitLabel})
                  </label>
                  <input
                    type="number"
                    value={wallThickness}
                    onChange={(e) => setWallThickness(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '0.3' : '1.0'}
                    min="0"
                    step="0.01"
                  />
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
                    Soil Density ({densityUnit})
                  </label>
                  <input
                    type="number"
                    value={soilDensity}
                    onChange={(e) => setSoilDensity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'metric' ? '18' : '115'}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: {unit === 'metric' ? '16-20' : '100-125'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Friction Angle (φ°)
                  </label>
                  <input
                    type="number"
                    value={frictionAngle}
                    onChange={(e) => setFrictionAngle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="30"
                    min="0"
                    max="50"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 25-35°
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backfill Slope (β°)
                  </label>
                  <input
                    type="number"
                    value={backfillSlope}
                    onChange={(e) => setBackfillSlope(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    max="45"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    0° = horizontal
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> P = 0.5 × Ka × γ × H² where Ka = tan²(45° - φ/2)
                  </div>
                </div>
              )}
            </div>

            {/* Wall Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Wall Type Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {wallPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      H={preset.wallHeight}m, L={preset.wallLength}m
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
                    {calculation.status === 'safe' ? '✅' : calculation.status === 'caution' ? '⚠️' : '❌'}
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
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Lateral Force</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.lateralForce)} {unit === 'metric' ? 'kN/m' : 'lb/ft'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Width</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.recommendedBaseWidth)} {unitLabel}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ka Factor</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.earthPressureCoefficient}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Concrete</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.concreteVolume)} {volumeUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Backfill</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.backfillVolume)} {volumeUnit}</div>
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
                            H={formatNumber(entry.calculation.wallHeight)} {entry.calculation.unit === 'metric' ? 'm' : 'ft'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Force: {formatNumber(entry.calculation.lateralForce)} {entry.calculation.unit === 'metric' ? 'kN/m' : 'lb/ft'} • 
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

      <RetainingWallCalculatorSEO />
      <RelatedTools
        currentTool="retaining-wall-calculator"
        tools={['concrete-volume-calculator', 'soil-bearing-capacity-calculator', 'foundation-depth-calculator']}
      />
    </>
  );
}
