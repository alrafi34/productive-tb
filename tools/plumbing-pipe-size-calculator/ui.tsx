"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationMode, FlowRateUnit, VelocityUnit, PipeMaterial, PlumbingPipeCalculation } from "./types";
import {
  calculatePlumbingPipe,
  getPlumbingPipePresets,
  getPipeMaterialInfo,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getModeLabel,
  getFlowRateUnitLabel,
  getVelocityUnitLabel,
  validateInputs,
  debounce
} from "./logic";
import PlumbingPipeSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PlumbingPipeSizeCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("diameter");
  const [flowRate, setFlowRate] = useState("2");
  const [flowRateUnit, setFlowRateUnit] = useState<FlowRateUnit>("liters-per-second");
  const [velocity, setVelocity] = useState("2");
  const [velocityUnit, setVelocityUnit] = useState<VelocityUnit>("meters-per-second");
  const [diameter, setDiameter] = useState("35.7");
  const [pipeMaterial, setPipeMaterial] = useState<PipeMaterial>("pvc");
  
  const [calculation, setCalculation] = useState<PlumbingPipeCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const plumbingPipePresets = getPlumbingPipePresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const fr = parseFloat(flowRate);
      const v = parseFloat(velocity);
      const d = parseFloat(diameter);
      
      const validationError = validateInputs(mode, fr, v, d);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculatePlumbingPipe({
          mode,
          flowRate: fr,
          flowRateUnit,
          velocity: v,
          velocityUnit,
          diameter: d,
          pipeMaterial
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [mode, flowRate, flowRateUnit, velocity, velocityUnit, diameter, pipeMaterial]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, flowRate, flowRateUnit, velocity, velocityUnit, diameter, pipeMaterial, debouncedCalculate]);

  const handleReset = () => {
    setMode("diameter");
    setFlowRate("2");
    setFlowRateUnit("liters-per-second");
    setVelocity("2");
    setVelocityUnit("meters-per-second");
    setDiameter("35.7");
    setPipeMaterial("pvc");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setFlowRate(preset.flowRate.toString());
    setFlowRateUnit(preset.flowRateUnit);
    setVelocity(preset.velocity.toString());
    setVelocityUnit(preset.velocityUnit);
    setPipeMaterial(preset.pipeMaterial);
    setMode("diameter");
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Pipe Diameter: ${formatNumber(calculation.diameterInMm, 2)} mm (${formatNumber(calculation.diameterInInches, 2)} inches)`;
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
      downloadFile(text, 'plumbing_pipe_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: PlumbingPipeCalculation) => {
    setMode(calc.mode);
    setFlowRate((calc.flowRate * 1000).toString());
    setFlowRateUnit(calc.flowRateUnit);
    setVelocity(calc.velocity.toString());
    setVelocityUnit(calc.velocityUnit);
    setDiameter(calc.diameter.toString());
    setPipeMaterial(calc.pipeMaterial);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Plumbing Pipe Size Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate pipe diameter, flow rate, and velocity instantly using the continuity equation. Supports metric and imperial units with real-time results.
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
                  <option value="diameter">Calculate Diameter</option>
                  <option value="velocity">Calculate Velocity</option>
                  <option value="flow-rate">Calculate Flow Rate</option>
                </select>
              </div>

              {/* Pipe Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Material</label>
                <select
                  value={pipeMaterial}
                  onChange={(e) => setPipeMaterial(e.target.value as PipeMaterial)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="pvc">PVC</option>
                  <option value="copper">Copper</option>
                  <option value="steel">Steel</option>
                  <option value="cast-iron">Cast Iron</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getPipeMaterialInfo(pipeMaterial).description}
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    {mode === "diameter" ? "Pipe Diameter" : mode === "velocity" ? "Flow Velocity" : "Flow Rate"}
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {mode === "diameter" 
                      ? formatNumber(calculation.diameterInMm, 1)
                      : mode === "velocity"
                      ? formatNumber(calculation.velocityInMetersPerSecond, 2)
                      : formatNumber(calculation.flowRateInLitersPerSecond, 2)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === "diameter" ? "mm" : mode === "velocity" ? "m/s" : "L/s"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  {mode === "diameter" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Inches:</span>
                      <span className="font-semibold">{formatNumber(calculation.diameterInInches, 2)} in</span>
                    </div>
                  )}
                  {mode === "velocity" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Feet/second:</span>
                      <span className="font-semibold">{formatNumber(calculation.velocityInFeetPerSecond, 2)} ft/s</span>
                    </div>
                  )}
                  {mode === "flow-rate" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">GPM:</span>
                      <span className="font-semibold">{formatNumber(calculation.flowRateInGPM, 1)} gal/min</span>
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
                
                {/* Flow Rate Input */}
                {mode !== "flow-rate" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flow Rate
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={flowRate}
                        onChange={(e) => setFlowRate(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="2"
                        min="0"
                        step="0.1"
                      />
                      <select
                        value={flowRateUnit}
                        onChange={(e) => setFlowRateUnit(e.target.value as FlowRateUnit)}
                        className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                      >
                        <option value="liters-per-second">L/s</option>
                        <option value="cubic-meters-per-hour">m³/h</option>
                        <option value="gallons-per-minute">GPM</option>
                        <option value="cubic-feet-per-second">ft³/s</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Velocity Input */}
                {mode !== "velocity" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Velocity
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={velocity}
                        onChange={(e) => setVelocity(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="2"
                        min="0"
                        step="0.1"
                      />
                      <select
                        value={velocityUnit}
                        onChange={(e) => setVelocityUnit(e.target.value as VelocityUnit)}
                        className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                      >
                        <option value="meters-per-second">m/s</option>
                        <option value="feet-per-second">ft/s</option>
                      </select>
                    </div>
                  </div>
                )}

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
                      placeholder="35.7"
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}

              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> D = √((4 × Q) / (π × V))
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
                Common Applications
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plumbingPipePresets.map((preset, index) => (
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
                  Pipe Visualization
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <svg width="300" height="150" viewBox="0 0 300 150" className="max-w-full">
                    {/* Pipe representation */}
                    <defs>
                      <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 0.8 }} />
                        <stop offset="50%" style={{ stopColor: "#2563EB", stopOpacity: 0.9 }} />
                        <stop offset="100%" style={{ stopColor: "#1D4ED8", stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Pipe body */}
                    <rect x="50" y="50" width="200" height="50" fill="url(#pipeGradient)" rx="5" />
                    
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
                      Flow Direction →
                    </text>
                    <text x="270" y="75" fontSize="11" fill="#333" textAnchor="start">
                      D = {formatNumber(calculation.diameterInMm, 1)} mm
                    </text>
                  </svg>
                </div>

                <div className="mt-4 text-sm text-gray-600 text-center">
                  {getPipeMaterialInfo(pipeMaterial).name} pipe cross-section
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Diameter</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.diameterInMm, 1)} mm</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.diameterInInches, 2)} in</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Flow Rate</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.flowRateInLitersPerSecond, 2)} L/s</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.flowRateInGPM, 1)} GPM</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Velocity</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.velocityInMetersPerSecond, 2)} m/s</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.velocityInFeetPerSecond, 2)} ft/s</div>
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
                            {formatNumber(entry.calculation.diameterInMm, 1)} mm
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getModeLabel(entry.calculation.mode)} • 
                          {getPipeMaterialInfo(entry.calculation.pipeMaterial).name}
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

      <PlumbingPipeSizeCalculatorSEO />
      <RelatedTools
        currentTool="plumbing-pipe-size-calculator"
        tools={['drainage-flow-calculator', 'water-tank-capacity-calculator', 'concrete-volume-calculator']}
      />
    </>
  );
}
