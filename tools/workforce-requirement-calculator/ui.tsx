"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductivityMode, UnitType, WorkforceCalculation } from "./types";
import {
  calculateWorkforce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  getProductivityModeLabel,
  getWorkforcePresets,
  getCalculationBreakdown,
  getWorkforceIntensity,
  validateInputs,
  debounce
} from "./logic";
import WorkforceRequirementCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WorkforceRequirementCalculatorUI() {
  const [totalWork, setTotalWork] = useState("1000");
  const [productivity, setProductivity] = useState("50");
  const [productivityMode, setProductivityMode] = useState<ProductivityMode>("daily");
  const [days, setDays] = useState("5");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [unitType, setUnitType] = useState<UnitType>("units");
  const [customUnit, setCustomUnit] = useState("");
  
  // Results
  const [calculation, setCalculation] = useState<WorkforceCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const workforcePresets = getWorkforcePresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const tw = parseFloat(totalWork);
      const prod = parseFloat(productivity);
      const d = parseFloat(days);
      const hpd = parseFloat(hoursPerDay);
      
      const validationError = validateInputs(tw, prod, d, hpd);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }
      
      const result = calculateWorkforce(tw, prod, productivityMode, d, hpd, unitType, customUnit);
      setCalculation(result);
    }, 150),
    [totalWork, productivity, productivityMode, days, hoursPerDay, unitType, customUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [totalWork, productivity, productivityMode, days, hoursPerDay, unitType, customUnit, debouncedCalculate]);

  const handleReset = () => {
    setTotalWork("1000");
    setProductivity("50");
    setProductivityMode("daily");
    setDays("5");
    setHoursPerDay("8");
    setUnitType("units");
    setCustomUnit("");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setTotalWork(preset.totalWork.toString());
    setProductivity(preset.productivity.toString());
    setProductivityMode(preset.productivityMode);
    setDays(preset.days.toString());
    setHoursPerDay(preset.hoursPerDay.toString());
    setUnitType(preset.unitType);
  };

  const handleCopy = () => {
    if (calculation) {
      const unit = customUnit || getUnitLabel(unitType);
      const text = `Required Workers: ${calculation.requiredWorkers} | Total Work: ${formatNumber(calculation.totalWork, 2)} ${unit} | Productivity: ${formatNumber(calculation.productivity, 2)} ${unit}/${productivityMode === "daily" ? "day" : "hour"}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      const projectName = `Workforce ${new Date().toLocaleDateString()}`;
      saveToHistory(calculation, projectName);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'workforce_requirement.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: WorkforceCalculation) => {
    setTotalWork(calc.totalWork.toString());
    setProductivity(calc.productivity.toString());
    setProductivityMode(calc.productivityMode);
    setDays(calc.days.toString());
    setHoursPerDay(calc.hoursPerDay.toString());
    setUnitType(calc.unitType);
    setCustomUnit(calc.customUnit || "");
    setShowHistory(false);
  };

  const breakdown = calculation ? getCalculationBreakdown(calculation) : null;
  const unit = customUnit || getUnitLabel(unitType);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👥</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Workforce Requirement Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the number of workers needed based on total workload, productivity rates, and time constraints.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Work Parameters</h3>
              
              {/* Total Work */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Work</label>
                <input
                  type="number"
                  value={totalWork}
                  onChange={(e) => setTotalWork(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1000"
                  min="0"
                  step="1"
                />
              </div>

              {/* Unit Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value as UnitType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="units">Units</option>
                  <option value="tasks">Tasks</option>
                  <option value="area">Area (sq ft)</option>
                  <option value="items">Items</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Custom Unit */}
              {unitType === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Unit Name</label>
                  <input
                    type="text"
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., boxes, meters"
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Productivity Settings</h3>
              
              {/* Productivity Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Productivity Mode</label>
                <select
                  value={productivityMode}
                  onChange={(e) => setProductivityMode(e.target.value as ProductivityMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="daily">Per Day</option>
                  <option value="hourly">Per Hour</option>
                </select>
              </div>

              {/* Productivity Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Productivity per Worker ({getProductivityModeLabel(productivityMode)})
                </label>
                <input
                  type="number"
                  value={productivity}
                  onChange={(e) => setProductivity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="50"
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {unit}/{productivityMode === "daily" ? "day" : "hour"} per worker
                </p>
              </div>

              {/* Working Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="5"
                  min="0.1"
                  step="0.5"
                />
              </div>

              {/* Hours per Day (only for hourly mode) */}
              {productivityMode === "hourly" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours per Day</label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="8"
                    min="0.1"
                    step="0.5"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                🔄 Reset All
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? 'Hide' : 'Show'} History
              </button>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Result Display */}
            {calculation && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Required Workers
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {calculation.requiredWorkers}
                  </div>
                  <div className="text-sm text-primary-100">
                    workers needed to complete the work
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Work:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalWork, 2)} {unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Capacity/Worker:</span>
                    <span className="font-semibold">{formatNumber(calculation.capacityPerWorker, 2)} {unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Capacity:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalCapacity, 2)} {unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Utilization:</span>
                    <span className="font-semibold">{formatNumber(calculation.utilizationRate, 1)}%</span>
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

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Calculation Breakdown */}
            {calculation && !error && breakdown && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation Breakdown
                  </h3>
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                </div>

                {showBreakdown && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm">Formula</h4>
                      <code className="text-xs text-blue-800">{breakdown.formula}</code>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700"><strong>Step 1:</strong> {breakdown.step1}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700"><strong>Step 2:</strong> {breakdown.step2}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700"><strong>Step 3:</strong> {breakdown.step3}</p>
                      </div>
                    </div>

                    {calculation.requiredWorkers > calculation.requiredWorkersRaw && (
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> Rounded up from {formatNumber(calculation.requiredWorkersRaw, 4)} to {calculation.requiredWorkers} workers (partial workers not practical)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Workforce Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Scenarios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {workforcePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">{preset.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{preset.description}</div>
                    <div className="text-xs text-gray-500">
                      {preset.totalWork} {getUnitLabel(preset.unitType)} • {preset.productivity}/{preset.productivityMode === "daily" ? "day" : "hour"} • {preset.days} days
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Insights */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Workforce Insights
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Workforce Size</div>
                    <div className="text-lg font-bold text-gray-900 capitalize">
                      {getWorkforceIntensity(calculation.requiredWorkers)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Efficiency</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatNumber(calculation.utilizationRate, 1)}%
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Excess Capacity</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatNumber(calculation.totalCapacity - calculation.totalWork, 2)} {unit}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Project Duration</div>
                    <div className="text-lg font-bold text-gray-900">
                      {calculation.days} day{calculation.days !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> With {calculation.requiredWorkers} workers, you'll have {formatNumber(100 - calculation.utilizationRate, 1)}% buffer capacity to handle unexpected delays or variations in productivity.
                  </p>
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
                            {entry.calculation.requiredWorkers} Workers
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.totalWork, 0)} {entry.calculation.customUnit || getUnitLabel(entry.calculation.unitType)} • {entry.calculation.days} days • {formatNumber(entry.calculation.utilizationRate, 1)}% utilization
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

      <WorkforceRequirementCalculatorSEO />
      <RelatedTools
        currentTool="workforce-requirement-calculator"
        tools={['labor-cost-calculator', 'project-timeline-calculator', 'construction-cost-estimator']}
      />
    </>
  );
}