"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, TimePeriod, RainwaterHarvestingCalculation } from "./types";
import {
  calculateRainwaterHarvesting,
  getRainwaterPresets,
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
import RainwaterHarvestingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RainwaterHarvestingCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("yearly");
  const [roofArea, setRoofArea] = useState("100");
  const [rainfall, setRainfall] = useState("1000");
  const [runoffCoefficient, setRunoffCoefficient] = useState("0.8");
  
  // Results
  const [calculation, setCalculation] = useState<RainwaterHarvestingCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const rainwaterPresets = getRainwaterPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const area = parseFloat(roofArea);
      const rain = parseFloat(rainfall);
      const coeff = parseFloat(runoffCoefficient);
      
      const validationError = validateInputs(area, rain, coeff);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      const result = calculateRainwaterHarvesting({
        roofArea: area,
        rainfall: rain,
        runoffCoefficient: coeff,
        timePeriod,
        unit
      });
      setCalculation(result);
    }, 150),
    [roofArea, rainfall, runoffCoefficient, timePeriod, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [roofArea, rainfall, runoffCoefficient, timePeriod, unit, debouncedCalculate]);

  const handleReset = () => {
    setUnit("metric");
    setTimePeriod("yearly");
    setRoofArea("100");
    setRainfall("1000");
    setRunoffCoefficient("0.8");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setUnit(preset.unit);
    setRoofArea(preset.roofArea.toString());
    setRainfall(preset.rainfall.toString());
    setRunoffCoefficient(preset.runoffCoefficient.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const unitLabel = calculation.unit === "metric" ? "liters" : "gallons";
      const text = `Rainwater Collection: ${formatNumber(calculation.yearlyWaterCollected, 0)} ${unitLabel}/year (${formatNumber(calculation.monthlyWaterCollected, 0)} ${unitLabel}/month)`;
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
      downloadFile(text, 'rainwater_harvesting_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'rainwater_harvesting_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RainwaterHarvestingCalculation) => {
    setUnit(calc.unit);
    setTimePeriod(calc.timePeriod);
    setRoofArea(calc.roofArea.toString());
    setRainfall(calc.rainfall.toString());
    setRunoffCoefficient(calc.runoffCoefficient.toString());
    setShowHistory(false);
  };

  const areaUnit = unit === "metric" ? "m²" : "ft²";
  const rainfallUnit = unit === "metric" ? "mm" : "inches";
  const volumeUnit = unit === "metric" ? "liters" : "gallons";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌧️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Rainwater Harvesting Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate how much rainwater you can collect from your roof. Get instant estimates for water savings and tank sizing.
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

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Period</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTimePeriod("monthly")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timePeriod === "monthly"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimePeriod("yearly")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timePeriod === "yearly"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              {/* Runoff Coefficient Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Runoff Coefficient: {runoffCoefficient}
                </label>
                <input
                  type="range"
                  value={runoffCoefficient}
                  onChange={(e) => setRunoffCoefficient(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0.5"
                  max="1.0"
                  step="0.05"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5 (50%)</span>
                  <span>1.0 (100%)</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Typical: 0.75-0.9 for most roofs
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
                    Water Collection ({timePeriod === "yearly" ? "Yearly" : "Monthly"})
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalWaterCollected, 0)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {volumeUnit}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Daily Average:</span>
                    <span className="font-semibold">{formatNumber(calculation.dailyAverage, 1)} {volumeUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Monthly:</span>
                    <span className="font-semibold">{formatNumber(calculation.monthlyWaterCollected, 0)} {volumeUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Yearly:</span>
                    <span className="font-semibold">{formatNumber(calculation.yearlyWaterCollected, 0)} {volumeUnit}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="text-primary-100">Household Supply:</span>
                    <span className="font-semibold">{formatNumber(calculation.householdMonthsSupply, 1)} months</span>
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
                Collection Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roof Area ({areaUnit})
                  </label>
                  <input
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === "metric" ? "100" : "1000"}
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Total catchment area
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Rainfall ({rainfallUnit})
                  </label>
                  <input
                    type="number"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === "metric" ? "1000" : "40"}
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Check local weather data
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Volume = Roof Area × Rainfall × Runoff Coefficient
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
                Common Scenarios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rainwaterPresets.map((preset, index) => (
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

            {/* Tank Recommendations */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Tank Size Recommendations
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700 mb-1">Minimum Tank</div>
                    <div className="text-lg font-bold text-blue-900">
                      {formatNumber(calculation.suggestedTankSizeMin, 0)}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">{volumeUnit}</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-xs text-green-700 mb-1">Recommended Tank</div>
                    <div className="text-lg font-bold text-green-900">
                      {formatNumber(calculation.suggestedTankSizeMax, 0)}
                    </div>
                    <div className="text-xs text-green-600 mt-1">{volumeUnit}</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Tank size should be 1-2 months of collection capacity. Consider local rainfall patterns and water usage needs.
                  </p>
                </div>
              </div>
            )}

            {/* Notes */}
            {calculation && calculation.notes.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Recommendations
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
                  Collection Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Roof Area</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.roofArea, 0)} {areaUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rainfall</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.rainfall, 0)} {rainfallUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="text-sm font-bold text-gray-900">{(calculation.runoffCoefficient * 100).toFixed(0)}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Daily</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.dailyAverage, 1)} {volumeUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.monthlyWaterCollected, 0)} {volumeUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Yearly</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.yearlyWaterCollected, 0)} {volumeUnit}</div>
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
                            {formatNumber(entry.calculation.yearlyWaterCollected, 0)} {entry.calculation.unit === 'metric' ? 'L' : 'gal'}/year
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.roofArea, 0)} {entry.calculation.unit === 'metric' ? 'm²' : 'ft²'} • 
                          {formatNumber(entry.calculation.rainfall, 0)} {entry.calculation.unit === 'metric' ? 'mm' : 'in'} • 
                          {(entry.calculation.runoffCoefficient * 100).toFixed(0)}% efficiency
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

      <RainwaterHarvestingCalculatorSEO />
      <RelatedTools
        currentTool="rainwater-harvesting-calculator"
        tools={['excavation-volume-calculator', 'drainage-flow-calculator', 'concrete-volume-calculator']}
      />
    </>
  );
}
