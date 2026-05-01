"use client";

import { useState, useEffect } from "react";
import { WageType, Currency, LaborCalculation } from "./types";
import {
  performLaborCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  formatCurrency,
  getCurrencySymbol,
  getWageTypeLabel,
  getTimeLabel,
  getWagePresets,
  getProjectPresets,
  getCostIntensity,
  validateInputs
} from "./logic";
import LaborCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LaborCostCalculatorUI() {
  const [wageType, setWageType] = useState<WageType>("hourly");
  const [wage, setWage] = useState("15");
  const [workers, setWorkers] = useState("1");
  const [time, setTime] = useState("8");
  const [overtimeEnabled, setOvertimeEnabled] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState("0");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState("1.5");
  const [additionalCost, setAdditionalCost] = useState("0");
  const [currency, setCurrency] = useState<Currency>("USD");
  
  // Results
  const [calculation, setCalculation] = useState<LaborCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const wagePresets = getWagePresets();
  const projectPresets = getProjectPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const w = parseFloat(wage);
    const wk = parseFloat(workers);
    const t = parseFloat(time);
    const ot = parseFloat(overtimeHours) || 0;
    const otm = parseFloat(overtimeMultiplier) || 1.5;
    const add = parseFloat(additionalCost) || 0;
    
    const validationError = validateInputs(w, wk, t);
    if (validationError) {
      setError(validationError);
      setCalculation(null);
      return;
    }
    
    const result = performLaborCalculation(wageType, w, wk, t, overtimeEnabled, ot, otm, add, currency);
    setCalculation(result);
  }, [wageType, wage, workers, time, overtimeEnabled, overtimeHours, overtimeMultiplier, additionalCost, currency]);

  const handleReset = () => {
    setWageType("hourly");
    setWage("15");
    setWorkers("1");
    setTime("8");
    setOvertimeEnabled(false);
    setOvertimeHours("0");
    setOvertimeMultiplier("1.5");
    setAdditionalCost("0");
    setCurrency("USD");
    setCalculation(null);
    setError(null);
  };

  const handleApplyWagePreset = (preset: any) => {
    setWageType(preset.wageType);
    setWage(preset.wage.toString());
  };

  const handleApplyProjectPreset = (preset: any) => {
    setWageType(preset.wageType);
    setWage(preset.wage.toString());
    setWorkers(preset.workers.toString());
    setTime(preset.time.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Labor Cost: ${formatCurrency(calculation.totalCost, currency)} | Workers: ${calculation.workers} | ${getWageTypeLabel(calculation.wageType)}: ${formatCurrency(calculation.wage, currency)}`;
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
      downloadFile(text, 'labor_cost_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'labor_cost_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: LaborCalculation) => {
    setWageType(calc.wageType);
    setWage(calc.wage.toString());
    setWorkers(calc.workers.toString());
    setTime(calc.time.toString());
    setOvertimeEnabled(calc.overtimeEnabled);
    setOvertimeHours(calc.overtimeHours.toString());
    setOvertimeMultiplier(calc.overtimeMultiplier.toString());
    setAdditionalCost(calc.additionalCost.toString());
    setCurrency(calc.currency);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👷</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Labor Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total labor costs for construction projects with hourly/daily wages, overtime rates, and multiple workers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Basic Settings</h3>
              
              {/* Wage Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wage Type</label>
                <select
                  value={wageType}
                  onChange={(e) => setWageType(e.target.value as WageType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="hourly">Hourly Wage</option>
                  <option value="daily">Daily Wage</option>
                </select>
              </div>

              {/* Wage Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getWageTypeLabel(wageType)} ({getCurrencySymbol(currency)})
                </label>
                <input
                  type="number"
                  value={wage}
                  onChange={(e) => setWage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="15"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Number of Workers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Workers</label>
                <input
                  type="number"
                  value={workers}
                  onChange={(e) => setWorkers(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1"
                  min="1"
                  step="1"
                />
              </div>

              {/* Working Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTimeLabel(wageType)}
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder={wageType === "hourly" ? "8" : "1"}
                  min="0"
                  step="0.5"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="BDT">BDT (৳)</option>
                </select>
              </div>
            </div>

            {/* Overtime Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Overtime</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={overtimeEnabled}
                    onChange={(e) => setOvertimeEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {overtimeEnabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overtime Hours</label>
                    <input
                      type="number"
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0"
                      min="0"
                      step="0.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overtime Multiplier</label>
                    <input
                      type="number"
                      value={overtimeMultiplier}
                      onChange={(e) => setOvertimeMultiplier(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1.5"
                      min="1"
                      max="3"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Common: 1.5x (time and a half)</p>
                  </div>
                </>
              )}
            </div>

            {/* Additional Costs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Additional Costs</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Expenses ({getCurrencySymbol(currency)})
                </label>
                <input
                  type="number"
                  value={additionalCost}
                  onChange={(e) => setAdditionalCost(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Transport, meals, equipment, etc.</p>
              </div>
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
                    Total Labor Cost
                  </p>
                  <div className="text-3xl font-bold mb-1">
                    {formatCurrency(calculation.totalCost, currency)}
                  </div>
                  <div className="text-sm text-primary-100">
                    {calculation.workers} worker{calculation.workers !== 1 ? 's' : ''} • {calculation.time} {getTimeLabel(calculation.wageType).toLowerCase()}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Cost:</span>
                    <span className="font-semibold">{formatCurrency(calculation.baseCost, currency)}</span>
                  </div>
                  {calculation.overtimeEnabled && calculation.overtimeCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Overtime:</span>
                      <span className="font-semibold">{formatCurrency(calculation.overtimeCost, currency)}</span>
                    </div>
                  )}
                  {calculation.additionalCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Additional:</span>
                      <span className="font-semibold">{formatCurrency(calculation.additionalCost, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="text-primary-100">Per Worker:</span>
                    <span className="font-semibold">{formatCurrency(calculation.costPerWorker, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Avg Hourly:</span>
                    <span className="font-semibold">{formatCurrency(calculation.averageHourlyRate, currency)}/hr</span>
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

            {/* Detailed Breakdown */}
            {calculation && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Cost Breakdown
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
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Wage Rate:</span>
                          <span className="font-semibold">{formatCurrency(calculation.wage, currency)}/{calculation.wageType === "hourly" ? "hr" : "day"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Workers:</span>
                          <span className="font-semibold">{calculation.workers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-semibold">{calculation.time} {getTimeLabel(calculation.wageType).toLowerCase()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {calculation.overtimeEnabled && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Overtime Hours:</span>
                              <span className="font-semibold">{calculation.overtimeHours}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">OT Multiplier:</span>
                              <span className="font-semibold">{calculation.overtimeMultiplier}x</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Additional:</span>
                          <span className="font-semibold">{formatCurrency(calculation.additionalCost, currency)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Calculation:</span>
                          <span className="font-mono text-xs text-gray-500">
                            {formatCurrency(calculation.wage, currency)} × {calculation.time} × {calculation.workers} = {formatCurrency(calculation.baseCost, currency)}
                          </span>
                        </div>
                        {calculation.overtimeEnabled && calculation.overtimeCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Overtime Calculation:</span>
                            <span className="font-mono text-xs text-gray-500">
                              {calculation.overtimeHours} × {formatCurrency(calculation.wage, currency)} × {calculation.overtimeMultiplier} × {calculation.workers} = {formatCurrency(calculation.overtimeCost, currency)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Wage Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Wage Rates
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {wagePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyWagePreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {formatCurrency(preset.wage, currency)}/{preset.wageType === "hourly" ? "hr" : "day"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Project Templates
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyProjectPreset(preset)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">{preset.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{preset.description}</div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(preset.wage, currency)}/{preset.wageType === "hourly" ? "hr" : "day"} • {preset.workers} workers • {preset.time} {preset.wageType === "hourly" ? "hours" : "days"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && !error && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
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
                            {formatCurrency(entry.calculation.totalCost, entry.calculation.currency)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.workers} workers • {getWageTypeLabel(entry.calculation.wageType)}: {formatCurrency(entry.calculation.wage, entry.calculation.currency)}
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

      <LaborCostCalculatorSEO />
      <RelatedTools
        currentTool="labor-cost-calculator"
        tools={['construction-cost-estimator', 'material-cost-calculator', 'escalation-cost-calculator']}
      />
    </>
  );
}