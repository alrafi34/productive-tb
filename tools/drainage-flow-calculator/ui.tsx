"use client";

import { useState, useEffect, useCallback } from "react";
import { DrainageMode, Unit, RoughnessType, DrainageFlowCalculation } from "./types";
import {
  calculateDrainageFlow,
  getRoughnessPresets,
  getDrainagePresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  validateInputs,
  debounce
} from "./logic";
import DrainageFlowCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DrainageFlowCalculatorUI() {
  const [mode, setMode] = useState<DrainageMode>("pipe");
  const [unit, setUnit] = useState<Unit>("metric");
  const [pipeDiameter, setPipeDiameter] = useState("0.5");
  const [channelWidth, setChannelWidth] = useState("2");
  const [waterDepth, setWaterDepth] = useState("1");
  const [slope, setSlope] = useState("0.01");
  const [roughnessType, setRoughnessType] = useState<RoughnessType>("concrete");
  const [roughnessCoefficient, setRoughnessCoefficient] = useState("0.013");
  
  // Results
  const [calculation, setCalculation] = useState<DrainageFlowCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const roughnessPresets = getRoughnessPresets();
  const drainagePresets = getDrainagePresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const D = parseFloat(pipeDiameter);
      const W = parseFloat(channelWidth);
      const H = parseFloat(waterDepth);
      const S = parseFloat(slope);
      const n = parseFloat(roughnessCoefficient);
      
      const validationError = validateInputs(mode, D, W, H, S, n);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      const result = calculateDrainageFlow({
        mode,
        unit,
        pipeDiameter: D,
        channelWidth: W,
        waterDepth: H,
        slope: S,
        roughnessType,
        roughnessCoefficient: n
      });
      setCalculation(result);
    }, 150),
    [mode, unit, pipeDiameter, channelWidth, waterDepth, slope, roughnessType, roughnessCoefficient]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, unit, pipeDiameter, channelWidth, waterDepth, slope, roughnessType, roughnessCoefficient, debouncedCalculate]);

  const handleModeChange = (newMode: DrainageMode) => {
    setMode(newMode);
  };

  const handleRoughnessTypeChange = (type: RoughnessType) => {
    setRoughnessType(type);
    const preset = roughnessPresets.find(p => p.type === type);
    if (preset && type !== "custom") {
      setRoughnessCoefficient(preset.coefficient.toString());
    }
  };

  const handleReset = () => {
    setMode("pipe");
    setUnit("metric");
    setPipeDiameter("0.5");
    setChannelWidth("2");
    setWaterDepth("1");
    setSlope("0.01");
    setRoughnessType("concrete");
    setRoughnessCoefficient("0.013");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setMode(preset.mode);
    setUnit(preset.unit);
    if (preset.pipeDiameter) setPipeDiameter(preset.pipeDiameter.toString());
    if (preset.channelWidth) setChannelWidth(preset.channelWidth.toString());
    if (preset.waterDepth) setWaterDepth(preset.waterDepth.toString());
    setSlope(preset.slope.toString());
    setRoughnessType(preset.roughnessType);
    const roughness = roughnessPresets.find(r => r.type === preset.roughnessType);
    if (roughness) {
      setRoughnessCoefficient(roughness.coefficient.toString());
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Flow Rate: ${formatNumber(calculation.flowRate, 4)} m³/s (${formatNumber(calculation.flowRateLitersPerSecond, 2)} L/s) | Velocity: ${formatNumber(calculation.velocity, 3)} m/s`;
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
      downloadFile(text, 'drainage_flow_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'drainage_flow_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: DrainageFlowCalculation) => {
    setMode(calc.mode);
    setUnit(calc.unit);
    if (calc.pipeDiameter) setPipeDiameter(calc.pipeDiameter.toString());
    if (calc.channelWidth) setChannelWidth(calc.channelWidth.toString());
    if (calc.waterDepth) setWaterDepth(calc.waterDepth.toString());
    setSlope(calc.slope.toString());
    setRoughnessType(calc.roughnessType);
    setRoughnessCoefficient(calc.roughnessCoefficient.toString());
    setShowHistory(false);
  };

  const unitLabel = unit === "metric" ? "m" : "ft";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Drainage Flow Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate drainage flow rates using Manning's equation for pipes and open channels. Get instant flow estimates for stormwater, sewer, and irrigation systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Mode Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drainage Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleModeChange("pipe")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === "pipe"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pipe Flow
                  </button>
                  <button
                    onClick={() => handleModeChange("channel")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mode === "channel"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Open Channel
                  </button>
                </div>
              </div>

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

              {/* Roughness Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
                <select
                  value={roughnessType}
                  onChange={(e) => handleRoughnessTypeChange(e.target.value as RoughnessType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {roughnessPresets.map((preset) => (
                    <option key={preset.type} value={preset.type}>
                      {preset.name} (n={preset.coefficient})
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Roughness */}
              {roughnessType === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manning's n
                  </label>
                  <input
                    type="number"
                    value={roughnessCoefficient}
                    onChange={(e) => setRoughnessCoefficient(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.015"
                    min="0.001"
                    max="0.1"
                    step="0.001"
                  />
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
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Flow Rate
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.flowRate, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    m³/s
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Liters/second:</span>
                    <span className="font-semibold">{formatNumber(calculation.flowRateLitersPerSecond, 2)} L/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Gallons/minute:</span>
                    <span className="font-semibold">{formatNumber(calculation.flowRateGallonsPerMinute, 2)} GPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Velocity:</span>
                    <span className="font-semibold">{formatNumber(calculation.velocity, 3)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Hydraulic Radius:</span>
                    <span className="font-semibold">{formatNumber(calculation.hydraulicRadius, 4)} m</span>
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
                {mode === "pipe" ? "Pipe Parameters" : "Channel Parameters"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mode === "pipe" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pipe Diameter ({unitLabel})
                    </label>
                    <input
                      type="number"
                      value={pipeDiameter}
                      onChange={(e) => setPipeDiameter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Full pipe flow assumed
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Channel Width ({unitLabel})
                      </label>
                      <input
                        type="number"
                        value={channelWidth}
                        onChange={(e) => setChannelWidth(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="2"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Water Depth ({unitLabel})
                      </label>
                      <input
                        type="number"
                        value={waterDepth}
                        onChange={(e) => setWaterDepth(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slope (S)
                  </label>
                  <input
                    type="number"
                    value={slope}
                    onChange={(e) => setSlope(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.01"
                    min="0"
                    step="0.001"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {slope && !isNaN(parseFloat(slope)) ? `${(parseFloat(slope) * 100).toFixed(2)}%` : "Enter as decimal"}
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Manning's Equation:</strong> Q = (1/n) × A × R^(2/3) × S^(1/2)
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

            {/* Drainage Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Drainage Systems
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {drainagePresets.map((preset, index) => (
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

            {/* Notes and Status */}
            {calculation && calculation.notes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Engineering Notes
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
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.flowRate, 4)} m³/s</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Velocity</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.velocity, 3)} m/s</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.crossSectionalArea, 4)} m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wetted Perimeter</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.wettedPerimeter, 4)} m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Hydraulic Radius</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.hydraulicRadius, 4)} m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Manning's n</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.roughnessCoefficient}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && !error && (
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
                            {formatNumber(entry.calculation.flowRate, 4)} m³/s
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.mode === 'pipe' ? 'Pipe' : 'Channel'} • 
                          {formatNumber(entry.calculation.flowRateLitersPerSecond, 2)} L/s • 
                          v={formatNumber(entry.calculation.velocity, 2)} m/s
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

      <DrainageFlowCalculatorSEO />
      <RelatedTools
        currentTool="drainage-flow-calculator"
        tools={['excavation-volume-calculator', 'concrete-volume-calculator', 'slope-stability-calculator']}
      />
    </>
  );
}
