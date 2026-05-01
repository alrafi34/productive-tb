"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, RetentionTime, SludgeFactor, SepticTankCalculation } from "./types";
import {
  calculateSepticTankSize,
  getSepticTankPresets,
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
import SepticTankSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SepticTankSizeCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [numberOfUsers, setNumberOfUsers] = useState("5");
  const [waterUsagePerPerson, setWaterUsagePerPerson] = useState("120");
  const [retentionTime, setRetentionTime] = useState<RetentionTime>(2);
  const [sludgeFactor, setSludgeFactor] = useState<SludgeFactor>(0.3);
  
  // Results
  const [calculation, setCalculation] = useState<SepticTankCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const septicTankPresets = getSepticTankPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const users = parseFloat(numberOfUsers);
      const usage = parseFloat(waterUsagePerPerson);
      
      const validationError = validateInputs(users, usage);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      const result = calculateSepticTankSize({
        numberOfUsers: users,
        waterUsagePerPerson: usage,
        retentionTime,
        sludgeFactor,
        unit
      });
      setCalculation(result);
    }, 150),
    [numberOfUsers, waterUsagePerPerson, retentionTime, sludgeFactor, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [numberOfUsers, waterUsagePerPerson, retentionTime, sludgeFactor, unit, debouncedCalculate]);

  const handleReset = () => {
    setUnit("metric");
    setNumberOfUsers("5");
    setWaterUsagePerPerson("120");
    setRetentionTime(2);
    setSludgeFactor(0.3);
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setNumberOfUsers(preset.numberOfUsers.toString());
    setWaterUsagePerPerson(preset.waterUsagePerPerson.toString());
    setRetentionTime(preset.retentionTime);
    setSludgeFactor(preset.sludgeFactor);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Septic Tank Size: ${formatNumber(calculation.recommendedTankSize, 0)} liters (${formatNumber(calculation.volumeInCubicMeters, 2)} m³) for ${calculation.numberOfUsers} users`;
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
      downloadFile(text, 'septic_tank_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'septic_tank_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SepticTankCalculation) => {
    setUnit(calc.unit);
    setNumberOfUsers(calc.numberOfUsers.toString());
    setWaterUsagePerPerson(calc.waterUsagePerPerson.toString());
    setRetentionTime(calc.retentionTime);
    setSludgeFactor(calc.sludgeFactor);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚽</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Septic Tank Size Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the required septic tank capacity based on household size, water usage, and retention time. Get instant sizing recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Retention Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Retention Time</label>
                <select
                  value={retentionTime}
                  onChange={(e) => setRetentionTime(parseFloat(e.target.value) as RetentionTime)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={1}>1 day</option>
                  <option value={1.5}>1.5 days</option>
                  <option value={2}>2 days (Standard)</option>
                  <option value={3}>3 days</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Time for wastewater to settle
                </p>
              </div>

              {/* Sludge Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sludge Accumulation</label>
                <select
                  value={sludgeFactor}
                  onChange={(e) => setSludgeFactor(parseFloat(e.target.value) as SludgeFactor)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={0.2}>Low (20%)</option>
                  <option value={0.3}>Medium (30%)</option>
                  <option value={0.5}>High (50%)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Extra capacity for sludge buildup
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
                    Recommended Tank Size
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.recommendedTankSize, 0)}
                  </div>
                  <div className="text-xl text-primary-100">
                    liters
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Meters:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInCubicMeters, 2)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Gallons:</span>
                    <span className="font-semibold">{formatNumber(calculation.volumeInGallons, 0)} gal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Daily Flow:</span>
                    <span className="font-semibold">{formatNumber(calculation.dailyFlow, 0)} L/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Users:</span>
                    <span className="font-semibold">{calculation.numberOfUsers} people</span>
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
                System Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Users
                  </label>
                  <input
                    type="number"
                    value={numberOfUsers}
                    onChange={(e) => setNumberOfUsers(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    min="1"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    People using the system
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Water Usage per Person (L/day)
                  </label>
                  <input
                    type="number"
                    value={waterUsagePerPerson}
                    onChange={(e) => setWaterUsagePerPerson(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="120"
                    min="50"
                    step="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 100-150 L/day
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Volume = Users × Usage × Retention × (1 + Sludge Factor)
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
                {septicTankPresets.map((preset, index) => (
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

            {/* Tank Dimensions */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Suggested Tank Dimensions (Rectangular)
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700 mb-1">Length</div>
                    <div className="text-lg font-bold text-blue-900">
                      {formatNumber(calculation.suggestedLength || 0, 2)}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">meters</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-xs text-green-700 mb-1">Width</div>
                    <div className="text-lg font-bold text-green-900">
                      {formatNumber(calculation.suggestedWidth || 0, 2)}
                    </div>
                    <div className="text-xs text-green-600 mt-1">meters</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-700 mb-1">Depth</div>
                    <div className="text-lg font-bold text-purple-900">
                      {formatNumber(calculation.suggestedDepth || 0, 2)}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">meters</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Dimensions based on L:W:D ratio of 2:1:1.5. Adjust based on site constraints and local regulations.
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
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tank Size</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.recommendedTankSize, 0)} L</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Daily Flow</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.dailyFlow, 0)} L/day</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Volume</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.baseVolume, 0)} L</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Users</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.numberOfUsers}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Retention</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.retentionTime} days</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sludge Factor</div>
                    <div className="text-sm font-bold text-gray-900">{(calculation.sludgeFactor * 100).toFixed(0)}%</div>
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
                            {formatNumber(entry.calculation.recommendedTankSize, 0)} L
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.numberOfUsers} users • 
                          {entry.calculation.waterUsagePerPerson} L/day • 
                          {entry.calculation.retentionTime} days
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

      <SepticTankSizeCalculatorSEO />
      <RelatedTools
        currentTool="septic-tank-size-calculator"
        tools={['drainage-flow-calculator', 'excavation-volume-calculator', 'concrete-volume-calculator']}
      />
    </>
  );
}
