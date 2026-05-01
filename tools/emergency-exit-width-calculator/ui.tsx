"use client";

import { useState, useEffect, useCallback } from "react";
import { WidthFactor, Unit, EmergencyExitCalculation } from "./types";
import {
  calculateEmergencyExitWidth,
  getOccupancyPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getSafetyLevelLabel,
  getSafetyLevelColor,
  getWidthFactorLabel,
  validateInputs,
  debounce
} from "./logic";
import EmergencyExitWidthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EmergencyExitWidthCalculatorUI() {
  const [occupants, setOccupants] = useState("100");
  const [widthFactor, setWidthFactor] = useState<WidthFactor>(0.3);
  const [numberOfExits, setNumberOfExits] = useState("1");
  const [unit, setUnit] = useState<Unit>("inches");
  
  const [calculation, setCalculation] = useState<EmergencyExitCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const occupancyPresets = getOccupancyPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const occ = parseInt(occupants);
      const exits = parseInt(numberOfExits);
      
      const validationError = validateInputs(occ, exits);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      try {
        const result = calculateEmergencyExitWidth({
          occupants: occ,
          widthFactor,
          numberOfExits: exits,
          unit
        });
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [occupants, widthFactor, numberOfExits, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [occupants, widthFactor, numberOfExits, unit, debouncedCalculate]);

  const handleReset = () => {
    setOccupants("100");
    setWidthFactor(0.3);
    setNumberOfExits("1");
    setUnit("inches");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setOccupants(preset.occupants.toString());
    setWidthFactor(preset.widthFactor);
    setNumberOfExits(preset.numberOfExits.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Exit Width: ${formatNumber(calculation.widthPerExitInInches, 1)} inches per exit (${calculation.numberOfExits} exits for ${calculation.occupants} occupants)`;
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
      downloadFile(text, 'emergency_exit_width_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: EmergencyExitCalculation) => {
    setOccupants(calc.occupants.toString());
    setWidthFactor(calc.widthFactor);
    setNumberOfExits(calc.numberOfExits.toString());
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const getDisplayValue = (value: number) => {
    switch (unit) {
      case "feet":
        return `${formatNumber(value / 12, 2)} ft`;
      case "meters":
        return `${formatNumber(value * 0.0254, 2)} m`;
      default:
        return `${formatNumber(value, 1)} in`;
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚪</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Emergency Exit Width Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate minimum required exit width for safe evacuation based on occupant load and building safety standards.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Number of Occupants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Occupants</label>
                <input
                  type="number"
                  value={occupants}
                  onChange={(e) => setOccupants(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="100"
                  min="1"
                  step="1"
                />
              </div>

              {/* Width Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width Factor</label>
                <select
                  value={widthFactor}
                  onChange={(e) => setWidthFactor(parseFloat(e.target.value) as WidthFactor)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={0.3}>0.3 in/person (Doors/Level)</option>
                  <option value={0.2}>0.2 in/person (Stairs)</option>
                  <option value={0.15}>0.15 in/person (Sprinklered)</option>
                </select>
              </div>

              {/* Number of Exits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Exits</label>
                <input
                  type="number"
                  value={numberOfExits}
                  onChange={(e) => setNumberOfExits(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1"
                  min="1"
                  step="1"
                />
              </div>

              {/* Display Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="inches">Inches</option>
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
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
                    Width Per Exit
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {unit === "feet" 
                      ? formatNumber(calculation.widthPerExitInFeet, 1)
                      : unit === "meters"
                      ? formatNumber(calculation.widthPerExitInMeters, 2)
                      : formatNumber(calculation.widthPerExitInInches, 1)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {unit === "feet" ? "feet" : unit === "meters" ? "meters" : "inches"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Width:</span>
                    <span className="font-semibold">{getDisplayValue(calculation.totalRequiredWidth)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Exits:</span>
                    <span className="font-semibold">{calculation.numberOfExits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Occupants:</span>
                    <span className="font-semibold">{calculation.occupants}</span>
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
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Calculation Summary */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Required Width</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(calculation.totalWidthInInches, 1)} in</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatNumber(calculation.totalWidthInFeet, 2)} ft • {formatNumber(calculation.totalWidthInMeters, 2)} m
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Width Per Exit</div>
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(calculation.widthPerExitInInches, 1)} in</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatNumber(calculation.widthPerExitInFeet, 2)} ft • {formatNumber(calculation.widthPerExitInMeters, 2)} m
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Required Width = Occupants × Width Factor ÷ Number of Exits
                  </div>
                </div>
              </div>
            )}

            {/* Safety Assessment */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Safety Assessment
                </h3>
                
                <div className={`p-4 rounded-lg border ${getSafetyLevelColor(calculation.safetyLevel)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{getSafetyLevelLabel(calculation.safetyLevel)}</span>
                    <span className="text-2xl">
                      {calculation.safetyLevel === 'safe' && '✓'}
                      {calculation.safetyLevel === 'warning' && '⚠️'}
                      {calculation.safetyLevel === 'critical' && '🚨'}
                    </span>
                  </div>
                  <div className="text-sm opacity-90">
                    {calculation.safetyLevel === 'safe' && 'Exit width meets building code requirements'}
                    {calculation.safetyLevel === 'warning' && 'Exit configuration should be reviewed by a professional'}
                    {calculation.safetyLevel === 'critical' && 'Exit width below minimum requirements - immediate attention needed'}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Minimum Width Standards:</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• Minimum exit door width: 32 inches (clear opening)</div>
                    <div>• Recommended minimum: 36 inches for better flow</div>
                    <div>• High occupancy buildings: Consider 44+ inches per exit</div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Occupancy Scenarios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {occupancyPresets.map((preset, index) => (
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
                            {formatNumber(entry.calculation.widthPerExitInInches, 1)} in per exit
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.occupants} occupants • 
                          {entry.calculation.numberOfExits} exits • 
                          {getSafetyLevelLabel(entry.calculation.safetyLevel)}
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

      <EmergencyExitWidthCalculatorSEO />
      <RelatedTools
        currentTool="emergency-exit-width-calculator"
        tools={['fire-safety-load-calculator', 'staircase-calculator', 'room-area-calculator']}
      />
    </>
  );
}
