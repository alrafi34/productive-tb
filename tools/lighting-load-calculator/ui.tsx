"use client";

import { useState, useEffect } from "react";
import { AreaUnit, LightingType, RoomType, LightingCalculation } from "./types";
import {
  performLightingCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getAreaUnitLabel,
  getRoomPresets,
  getLightingTypes,
  getLuxForRoomType,
  calculateMonthlyCost,
  validateInputs
} from "./logic";
import LightingLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LightingLoadCalculatorUI() {
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqft");
  const [area, setArea] = useState("");
  const [roomType, setRoomType] = useState<RoomType>("living-room");
  const [lux, setLux] = useState("150");
  const [lightingType, setLightingType] = useState<LightingType>("LED");
  const [efficiencyFactor, setEfficiencyFactor] = useState(0.8);
  const [electricityRate, setElectricityRate] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Results
  const [calculation, setCalculation] = useState<LightingCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Update lux when room type changes
  useEffect(() => {
    if (roomType !== "custom") {
      const recommendedLux = getLuxForRoomType(roomType);
      setLux(recommendedLux.toString());
    }
  }, [roomType]);

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const areaVal = parseFloat(area);
    const luxVal = parseFloat(lux);
    
    const validationError = validateInputs(areaVal, luxVal);
    if (validationError) {
      setCalculation(null);
      return;
    }
    
    const result = performLightingCalculation(
      areaVal,
      areaUnit,
      luxVal,
      roomType,
      lightingType,
      efficiencyFactor
    );
    setCalculation(result);
  }, [area, areaUnit, lux, roomType, lightingType, efficiencyFactor]);

  const handleReset = () => {
    setArea("");
    setRoomType("living-room");
    setLux("150");
    setLightingType("LED");
    setEfficiencyFactor(0.8);
    setElectricityRate("");
    setCalculation(null);
    setError(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Lighting Load: ${formatNumber(calculation.adjustedWatts)} W (${formatNumber(calculation.kilowatts, 3)} kW)`;
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
      const rate = parseFloat(electricityRate) || undefined;
      const text = exportToText(calculation, rate);
      downloadFile(text, 'lighting_load_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: LightingCalculation) => {
    setAreaUnit(calc.areaUnit);
    setArea(calc.area.toString());
    setRoomType(calc.roomType);
    setLux(calc.lux.toString());
    setLightingType(calc.lightingType);
    setEfficiencyFactor(calc.efficiencyFactor);
    setShowHistory(false);
  };

  const roomPresets = getRoomPresets();
  const lightingTypes = getLightingTypes();
  const monthlyCost = calculation && electricityRate ? calculateMonthlyCost(calculation.monthlyKWh, parseFloat(electricityRate)) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Lighting Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate lighting power requirements for rooms and buildings. Estimate watts, energy consumption, and optimize lighting design for energy efficiency.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Area Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="sqft">Square Feet (sq ft)</option>
                  <option value="sqm">Square Meters (m²)</option>
                </select>
              </div>

              {/* Lighting Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lighting Type</label>
                <select
                  value={lightingType}
                  onChange={(e) => setLightingType(e.target.value as LightingType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {lightingTypes.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.name} ({type.efficiency})
                    </option>
                  ))}
                </select>
              </div>

              {/* Advanced Options Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Efficiency Factor: {formatNumber(efficiencyFactor, 2)}
                    </label>
                    <input
                      type="range"
                      value={efficiencyFactor}
                      onChange={(e) => setEfficiencyFactor(parseFloat(e.target.value))}
                      className="w-full"
                      min="0.6"
                      max="1.0"
                      step="0.05"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accounts for real-world losses (0.6 - 1.0)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Electricity Rate ($/kWh)
                    </label>
                    <input
                      type="number"
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.12"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: for cost estimation
                    </p>
                  </div>
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
                    Total Lighting Load
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.adjustedWatts)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Watts
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">kW:</span>
                    <span className="font-semibold">{formatNumber(calculation.kilowatts, 3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Monthly Usage:</span>
                    <span className="font-semibold">{formatNumber(calculation.monthlyKWh)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Fixtures:</span>
                    <span className="font-semibold">{calculation.suggestedFixtures}</span>
                  </div>
                  {monthlyCost !== null && (
                    <div className="flex justify-between pt-2 border-t border-white/20">
                      <span className="text-primary-100">Monthly Cost:</span>
                      <span className="font-semibold">${formatNumber(monthlyCost)}</span>
                    </div>
                  )}
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
                Room Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Area ({getAreaUnitLabel(areaUnit)})
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={areaUnit === "sqft" ? "200" : "18.6"}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {roomPresets.map((preset) => (
                      <option key={preset.type} value={preset.type}>
                        {preset.name} ({preset.lux} lux)
                      </option>
                    ))}
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Lux Level
                </label>
                <input
                  type="number"
                  value={lux}
                  onChange={(e) => setLux(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="150"
                  min="0"
                  step="10"
                  disabled={roomType !== "custom"}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Illuminance level required for the space
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      Lumens = Area × Lux | Watts = Lumens / Efficiency
                    </div>
                    <div className="mt-1 text-xs">
                      {formatNumber(calculation.totalLumens, 0)} lumens ÷ {calculation.lumensPerWatt} lm/W = {formatNumber(calculation.totalWatts)} W
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Room Presets Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Recommended Lux Levels
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roomPresets.map((preset) => (
                  <div 
                    key={preset.type}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">{preset.lux} lux</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lighting Type Comparison */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Lighting Type Efficiency
              </h3>
              
              <div className="space-y-3">
                {lightingTypes.map((type) => (
                  <div 
                    key={type.type}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      lightingType === type.type 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{type.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{type.efficiency}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{type.lumensPerWatt} lm/W</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Load Indicator */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Load Indicator
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${Math.min(100, (calculation.adjustedWatts / 2000) * 100)}%` }}
                      >
                        <span className="text-xs font-bold text-white">
                          {formatNumber(calculation.adjustedWatts)} W
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 W</span>
                    <span>2000 W</span>
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
                            {formatNumber(entry.calculation.adjustedWatts)} W
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.area} {getAreaUnitLabel(entry.calculation.areaUnit)} | {entry.calculation.lux} lux | {entry.calculation.lightingType}
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

      <LightingLoadCalculatorSEO />
      <RelatedTools
        currentTool="lighting-load-calculator"
        tools={['electrical-load-calculator-building', 'power-consumption-calculator', 'energy-efficiency-calculator-building']}
      />
    </>
  );
}
