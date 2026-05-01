"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationMode, DiameterUnit, VelocityUnit, FlowRateUnit, WaterFlowCalculation } from "./types";
import {
  calculateWaterFlow,
  getWaterFlowPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getModeLabel,
  validateInputs,
  debounce
} from "./logic";
import WaterFlowRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WaterFlowRateCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("flow-rate");
  const [diameter, setDiameter] = useState("25");
  const [velocity, setVelocity] = useState("2");
  const [flowRate, setFlowRate] = useState("100");
  const [diameterUnit, setDiameterUnit] = useState<DiameterUnit>("millimeters");
  const [velocityUnit, setVelocityUnit] = useState<VelocityUnit>("meters-per-second");
  const [flowRateUnit, setFlowRateUnit] = useState<FlowRateUnit>("liters-per-minute");
  
  const [calculation, setCalculation] = useState<WaterFlowCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const waterFlowPresets = getWaterFlowPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const d = parseFloat(diameter);
      const v = parseFloat(velocity);
      const fr = parseFloat(flowRate);
      
      const validationError = validateInputs(mode, d, v, fr);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateWaterFlow({
          mode,
          diameter: d,
          velocity: v,
          flowRate: fr,
          diameterUnit,
          velocityUnit,
          flowRateUnit
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [mode, diameter, velocity, flowRate, diameterUnit, velocityUnit, flowRateUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, diameter, velocity, flowRate, diameterUnit, velocityUnit, flowRateUnit, debouncedCalculate]);

  const handleReset = () => {
    setMode("flow-rate");
    setDiameter("25");
    setVelocity("2");
    setFlowRate("100");
    setDiameterUnit("millimeters");
    setVelocityUnit("meters-per-second");
    setFlowRateUnit("liters-per-minute");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setDiameter(preset.diameter.toString());
    setVelocity(preset.velocity.toString());
    setMode("flow-rate");
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Flow Rate: ${formatNumber(calculation.flowRateInLitersPerMinute, 2)} L/min (Diameter: ${formatNumber(calculation.diameterInMillimeters, 1)} mm, Velocity: ${formatNumber(calculation.velocityInMetersPerSecond, 2)} m/s)`;
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
      downloadFile(text, 'water_flow_rate_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: WaterFlowCalculation) => {
    setMode(calc.mode);
    setDiameter(calc.diameter.toString());
    setVelocity(calc.velocity.toString());
    setFlowRate((calc.flowRate * 60000).toString());
    setDiameterUnit(calc.diameterUnit);
    setVelocityUnit(calc.velocityUnit);
    setFlowRateUnit(calc.flowRateUnit);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Water Flow Rate Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate water flow rate, velocity, and pipe diameter for building plumbing systems. Get instant results with real-time calculations.
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
                  <option value="flow-rate">Calculate Flow Rate</option>
                  <option value="velocity">Calculate Velocity</option>
                  <option value="diameter">Calculate Pipe Diameter</option>
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
                    {mode === "flow-rate" ? "Flow Rate" : mode === "velocity" ? "Velocity" : "Pipe Diameter"}
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {mode === "flow-rate" 
                      ? formatNumber(calculation.flowRateInLitersPerMinute, 1)
                      : mode === "velocity"
                      ? formatNumber(calculation.velocityInMetersPerSecond, 2)
                      : formatNumber(calculation.diameterInMillimeters, 1)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === "flow-rate" ? "L/min" : mode === "velocity" ? "m/s" : "mm"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  {mode === "flow-rate" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">m³/s:</span>
                        <span className="font-semibold">{formatNumber(calculation.flowRateInCubicMetersPerSecond, 6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">GPM:</span>
                        <span className="font-semibold">{formatNumber(calculation.flowRateInGallonsPerMinute, 1)}</span>
                      </div>
                    </>
                  )}
                  {mode === "velocity" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">ft/s:</span>
                      <span className="font-semibold">{formatNumber(calculation.velocityInFeetPerSecond, 2)}</span>
                    </div>
                  )}
                  {mode === "diameter" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Inches:</span>
                      <span className="font-semibold">{formatNumber(calculation.diameterInInches, 2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.crossSectionalArea * 1000000, 0)} mm²</span>
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
                
                {/* Diameter Input */}
                {mode !== "diameter" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pipe Diameter (mm)
                    </label>
                    <input
                      type="number"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="25"
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}

                {/* Velocity Input */}
                {mode !== "velocity" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Velocity (m/s)
                    </label>
                    <input
                      type="number"
                      value={velocity}
                      onChange={(e) => setVelocity(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}

                {/* Flow Rate Input */}
                {mode !== "flow-rate" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flow Rate (L/min)
                    </label>
                    <input
                      type="number"
                      value={flowRate}
                      onChange={(e) => setFlowRate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}

              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Q = A × v, where A = π × (D/2)²
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
                Common Fixtures
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {waterFlowPresets.map((preset, index) => (
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

            {/* Visual Representation */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Flow Visualization
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <svg width="300" height="150" viewBox="0 0 300 150" className="max-w-full">
                    {/* Pipe representation */}
                    <defs>
                      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 0.8 }} />
                        <stop offset="50%" style={{ stopColor: "#2563EB", stopOpacity: 0.9 }} />
                        <stop offset="100%" style={{ stopColor: "#1D4ED8", stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Pipe body */}
                    <rect x="50" y="50" width="200" height="50" fill="url(#waterGradient)" rx="5" />
                    
                    {/* Flow arrows */}
                    <path d="M 80 75 L 100 75 L 95 70 M 100 75 L 95 80" stroke="#fff" strokeWidth="2" fill="none" />
                    <path d="M 130 75 L 150 75 L 145 70 M 150 75 L 145 80" stroke="#fff" strokeWidth="2" fill="none" />
                    <path d="M 180 75 L 200 75 L 195 70 M 200 75 L 195 80" stroke="#fff" strokeWidth="2" fill="none" />
                    
                    {/* Diameter indicator */}
                    <line x1="250" y1="50" x2="250" y2="100" stroke="#333" strokeWidth="2" />
                    <line x1="245" y1="50" x2="255" y2="50" stroke="#333" strokeWidth="2" />
                    <line x1="245" y1="100" x2="255" y2="100" stroke="#333" strokeWidth="2" />
                    
                    {/* Labels */}
                    <text x="150" y="130" fontSize="12" fill="#333" textAnchor="middle" fontWeight="bold">
                      Flow: {formatNumber(calculation.flowRateInLitersPerMinute, 1)} L/min
                    </text>
                    <text x="270" y="75" fontSize="11" fill="#333" textAnchor="start">
                      D = {formatNumber(calculation.diameterInMillimeters, 1)} mm
                    </text>
                    <text x="150" y="145" fontSize="10" fill="#666" textAnchor="middle">
                      v = {formatNumber(calculation.velocityInMetersPerSecond, 2)} m/s
                    </text>
                  </svg>
                </div>

                <div className="mt-4 text-sm text-gray-600 text-center">
                  Water flow through pipe visualization
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

            {/* Summary Panel */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Flow Rate</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.flowRateInLitersPerMinute, 1)} L/min</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.flowRateInGallonsPerMinute, 1)} GPM</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Velocity</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.velocityInMetersPerSecond, 2)} m/s</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.velocityInFeetPerSecond, 2)} ft/s</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Diameter</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.diameterInMillimeters, 1)} mm</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.diameterInInches, 2)} in</div>
                  </div>
                </div>
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
                            {formatNumber(entry.calculation.flowRateInLitersPerMinute, 1)} L/min
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getModeLabel(entry.calculation.mode)} • 
                          D: {formatNumber(entry.calculation.diameterInMillimeters, 1)} mm
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

      <WaterFlowRateCalculatorSEO />
      <RelatedTools
        currentTool="water-flow-rate-calculator"
        tools={['plumbing-pipe-size-calculator', 'drainage-flow-calculator', 'water-tank-capacity-calculator']}
      />
    </>
  );
}
