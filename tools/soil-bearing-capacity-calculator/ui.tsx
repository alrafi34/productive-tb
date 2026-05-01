"use client";

import { useState, useEffect } from "react";
import { SoilType, WaterTablePosition, Unit, BearingCapacityCalculation } from "./types";
import {
  calculateBearingCapacity,
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
import SoilBearingCapacityCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SoilBearingCapacityCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("m");
  const [soilType, setSoilType] = useState<SoilType>("sand");
  const [foundationWidth, setFoundationWidth] = useState("");
  const [foundationDepth, setFoundationDepth] = useState("");
  const [unitWeight, setUnitWeight] = useState("18");
  const [cohesion, setCohesion] = useState("0");
  const [frictionAngle, setFrictionAngle] = useState("32");
  const [factorOfSafety, setFactorOfSafety] = useState("3");
  const [waterTablePosition, setWaterTablePosition] = useState<WaterTablePosition>("low");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Results
  const [calculation, setCalculation] = useState<BearingCapacityCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const B = parseFloat(foundationWidth);
    const Df = parseFloat(foundationDepth);
    const gamma = parseFloat(unitWeight);
    const c = parseFloat(cohesion);
    const phi = parseFloat(frictionAngle);
    const FOS = parseFloat(factorOfSafety);
    
    if (!isNaN(B) && !isNaN(Df) && !isNaN(gamma) && !isNaN(c) && !isNaN(phi) && !isNaN(FOS) &&
        B > 0 && Df > 0 && gamma > 0 && c >= 0 && phi >= 0 && FOS > 0) {
      const result = calculateBearingCapacity({
        soilType,
        foundationWidth: B,
        foundationDepth: Df,
        unitWeight: gamma,
        cohesion: c,
        frictionAngle: phi,
        factorOfSafety: FOS,
        waterTablePosition,
        unit
      });
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [soilType, foundationWidth, foundationDepth, unitWeight, cohesion, frictionAngle, factorOfSafety, waterTablePosition, unit]);

  const handleReset = () => {
    setFoundationWidth("");
    setFoundationDepth("");
    setUnitWeight("18");
    setCohesion("0");
    setFrictionAngle("32");
    setFactorOfSafety("3");
    setSoilType("sand");
    setWaterTablePosition("low");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setFoundationWidth(unit === 'm' ? "2" : "6.5");
    setFoundationDepth(unit === 'm' ? "1.5" : "5");
    setUnitWeight("18");
    setCohesion("0");
    setFrictionAngle("32");
    setFactorOfSafety("3");
    setSoilType("sand");
    setWaterTablePosition("low");
  };

  const handleApplyPreset = (preset: any) => {
    setSoilType(preset.type);
    setCohesion(preset.typicalCohesion.toString());
    setFrictionAngle(preset.typicalFrictionAngle.toString());
    setUnitWeight(preset.typicalUnitWeight.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Safe Bearing Capacity: ${formatNumber(calculation.safeBearingCapacity)} kN/m² - Status: ${calculation.status.toUpperCase()}`;
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
      downloadFile(text, 'soil_bearing_capacity_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'soil_bearing_capacity_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: BearingCapacityCalculation) => {
    setFoundationWidth(calc.foundationWidth.toString());
    setFoundationDepth(calc.foundationDepth.toString());
    setUnitWeight(calc.unitWeight.toString());
    setCohesion(calc.cohesion.toString());
    setFrictionAngle(calc.frictionAngle.toString());
    setFactorOfSafety(calc.factorOfSafety.toString());
    setSoilType(calc.soilType);
    setWaterTablePosition(calc.waterTablePosition);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const soilPresets = getSoilPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Soil Bearing Capacity Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate soil bearing capacity using Terzaghi's formula. Get instant estimates for foundation design with bearing capacity factors and safety analysis.
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
                    onClick={() => setUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters (m)
                  </button>
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
                </div>
              </div>

              {/* Factor of Safety */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Factor of Safety
                </label>
                <input
                  type="number"
                  value={factorOfSafety}
                  onChange={(e) => setFactorOfSafety(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="3"
                  min="1"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical: 2.5 - 3.0
                </p>
              </div>

              {/* Water Table Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Table Position</label>
                <select
                  value={waterTablePosition}
                  onChange={(e) => setWaterTablePosition(e.target.value as WaterTablePosition)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="low">Below Foundation (No adjustment)</option>
                  <option value="medium">At Foundation Level (-10%)</option>
                  <option value="high">Above Foundation (-20%)</option>
                </select>
              </div>

              {/* Advanced Settings Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                {showAdvanced ? '▼' : '▶'} Advanced Parameters
              </button>

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
                    Safe Bearing Capacity
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.safeBearingCapacity)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kN/m²
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Ultimate Capacity:</span>
                    <span className="font-semibold">{formatNumber(calculation.ultimateBearingCapacity)} kN/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Nc Factor:</span>
                    <span className="font-semibold">{calculation.bearingCapacityFactors.Nc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Nq Factor:</span>
                    <span className="font-semibold">{calculation.bearingCapacityFactors.Nq}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Nγ Factor:</span>
                    <span className="font-semibold">{calculation.bearingCapacityFactors.Ngamma}</span>
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
                Foundation Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foundation Width (B) ({unit})
                  </label>
                  <input
                    type="number"
                    value={foundationWidth}
                    onChange={(e) => setFoundationWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'm' ? '2.0' : '6.5'}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foundation Depth (Df) ({unit})
                  </label>
                  <input
                    type="number"
                    value={foundationDepth}
                    onChange={(e) => setFoundationDepth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'm' ? '1.5' : '5'}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Weight (γ) (kN/m³)
                  </label>
                  <input
                    type="number"
                    value={unitWeight}
                    onChange={(e) => setUnitWeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="18"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 16-20 kN/m³
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cohesion (c) (kPa)
                  </label>
                  <input
                    type="number"
                    value={cohesion}
                    onChange={(e) => setCohesion(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For clay soils
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Friction Angle (φ) (degrees)
                  </label>
                  <input
                    type="number"
                    value={frictionAngle}
                    onChange={(e) => setFrictionAngle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="32"
                    min="0"
                    max="50"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For sandy soils
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> q_ult = c×Nc + γ×Df×Nq + 0.5×γ×B×Nγ
                  </div>
                </div>
              )}
            </div>

            {/* Soil Type Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Soil Type Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {soilPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className={`p-3 border rounded-lg transition-colors text-left ${
                      soilType === preset.type && 
                      cohesion === preset.typicalCohesion.toString() &&
                      frictionAngle === preset.typicalFrictionAngle.toString()
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      c={preset.typicalCohesion} kPa, φ={preset.typicalFrictionAngle}°
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
                    {calculation.status === 'safe' ? '✅' : calculation.status === 'moderate' ? '⚠️' : '❌'}
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Safe Capacity</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.safeBearingCapacity)} kN/m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ultimate Capacity</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.ultimateBearingCapacity)} kN/m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Soil Type</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.soilType.charAt(0).toUpperCase() + calculation.soilType.slice(1)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Width</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.foundationWidth)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Depth</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.foundationDepth)} {calculation.unit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Safety Factor</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.factorOfSafety}</div>
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
                            {formatNumber(entry.calculation.safeBearingCapacity)} kN/m²
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.soilType.charAt(0).toUpperCase() + entry.calculation.soilType.slice(1)} • 
                          φ={entry.calculation.frictionAngle}° • 
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

      <SoilBearingCapacityCalculatorSEO />
      <RelatedTools
        currentTool="soil-bearing-capacity-calculator"
        tools={['foundation-depth-calculator', 'footing-size-calculator', 'structural-load-calculator']}
      />
    </>
  );
}
