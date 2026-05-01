"use client";

import { useState, useEffect } from "react";
import { EscalationType, Currency, EscalationCalculation } from "./types";
import {
  performEscalationCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  formatCurrency,
  getCurrencySymbol,
  getEscalationTypeLabel,
  getRatePresets,
  getProjectPresets,
  getEscalationIntensity,
  validateInputs
} from "./logic";
import EscalationCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EscalationCostCalculatorUI() {
  const [baseCost, setBaseCost] = useState("");
  const [duration, setDuration] = useState("2");
  const [escalationRate, setEscalationRate] = useState("8");
  const [escalationType, setEscalationType] = useState<EscalationType>("compound");
  const [currency, setCurrency] = useState<Currency>("USD");
  
  // Results
  const [calculation, setCalculation] = useState<EscalationCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const ratePresets = getRatePresets();
  const projectPresets = getProjectPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const base = parseFloat(baseCost);
    const dur = parseFloat(duration);
    const rate = parseFloat(escalationRate);
    
    const validationError = validateInputs(base, dur, rate);
    if (validationError) {
      setCalculation(null);
      return;
    }
    
    const result = performEscalationCalculation(base, dur, rate, escalationType, currency);
    setCalculation(result);
  }, [baseCost, duration, escalationRate, escalationType, currency]);

  const handleReset = () => {
    setBaseCost("");
    setDuration("2");
    setEscalationRate("8");
    setEscalationType("compound");
    setCurrency("USD");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setBaseCost(preset.baseCost.toString());
    setDuration(preset.duration.toString());
    setEscalationRate(preset.escalationRate.toString());
  };

  const handleApplyRatePreset = (rate: number) => {
    setEscalationRate(rate.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Future Cost: ${formatCurrency(calculation.futureCost, currency)} | Increase: ${formatNumber(calculation.percentageIncrease, 2)}%`;
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
      downloadFile(text, 'escalation_cost_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'escalation_cost_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: EscalationCalculation) => {
    setBaseCost(calc.baseCost.toString());
    setDuration(calc.duration.toString());
    setEscalationRate(calc.escalationRate.toString());
    setEscalationType(calc.escalationType);
    setCurrency(calc.currency);
    setShowHistory(false);
  };

  const intensity = calculation ? getEscalationIntensity(calculation.percentageIncrease) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Escalation Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate construction cost escalation instantly. Estimate future project costs using compound or simple escalation rates.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Escalation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                <select
                  value={escalationType}
                  onChange={(e) => setEscalationType(e.target.value as EscalationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="compound">Compound Escalation</option>
                  <option value="simple">Simple Escalation</option>
                </select>
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
                  <option value="INR">INR (₹)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
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
            {calculation && intensity && (
              <div className={`rounded-xl border shadow-lg p-6 text-white space-y-4 ${
                intensity.color === 'green' ? 'bg-green-600 border-green-700' :
                intensity.color === 'blue' ? 'bg-blue-600 border-blue-700' :
                intensity.color === 'yellow' ? 'bg-yellow-600 border-yellow-700' :
                intensity.color === 'orange' ? 'bg-orange-600 border-orange-700' :
                'bg-red-600 border-red-700'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Future Cost
                  </p>
                  <div className="text-3xl font-bold mb-1">
                    {formatCurrency(calculation.futureCost, currency)}
                  </div>
                  <div className="text-sm text-white/90">
                    After {calculation.duration} years
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Base Cost:</span>
                    <span className="font-semibold">{formatCurrency(calculation.baseCost, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Total Increase:</span>
                    <span className="font-semibold">{formatCurrency(calculation.totalIncrease, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Growth:</span>
                    <span className="font-semibold">{formatNumber(calculation.percentageIncrease, 2)}%</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-white/80 mb-1">Escalation Level:</div>
                    <div className="font-semibold text-sm">{intensity.level} - {intensity.description}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-white/20 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Project Details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Project Details
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Project Cost ({getCurrencySymbol(currency)})
                  </label>
                  <input
                    type="number"
                    value={baseCost}
                    onChange={(e) => setBaseCost(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000000"
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Years)
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      max="50"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Escalation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={escalationRate}
                      onChange={(e) => setEscalationRate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="8"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Rate Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Rate Presets</label>
                <div className="flex flex-wrap gap-2">
                  {ratePresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplyRatePreset(preset.value)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <strong>Formula:</strong> {escalationType === "compound" 
                      ? "Future Cost = Base Cost × (1 + rate)^years" 
                      : "Future Cost = Base Cost × (1 + rate × years)"}
                  </div>
                </div>
              )}
            </div>

            {/* Yearly Breakdown */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Yearly Breakdown
                  </h3>
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                
                {showBreakdown && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Cost</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Yearly Increase</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Total Increase</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculation.yearlyBreakdown.map((year, index) => (
                          <tr key={index} className={`border-b border-gray-100 ${index === calculation.yearlyBreakdown.length - 1 ? 'bg-primary/5 font-semibold' : ''}`}>
                            <td className="py-2 px-3 text-gray-900">{year.year}</td>
                            <td className="py-2 px-3 text-right font-mono text-gray-900">{formatCurrency(year.cost, currency)}</td>
                            <td className="py-2 px-3 text-right font-mono text-gray-700">{formatCurrency(year.increase, currency)}</td>
                            <td className="py-2 px-3 text-right font-mono text-gray-700">{formatCurrency(year.cumulativeIncrease, currency)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Project Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Project Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ${formatNumber(preset.baseCost)} | {preset.duration}y | {preset.escalationRate}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && (
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
                            {formatCurrency(entry.calculation.futureCost, entry.calculation.currency)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(entry.calculation.baseCost, entry.calculation.currency)} | {entry.calculation.duration}y | {entry.calculation.escalationRate}% | +{formatNumber(entry.calculation.percentageIncrease, 1)}%
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

      <EscalationCostCalculatorSEO />
      <RelatedTools
        currentTool="escalation-cost-calculator"
        tools={['concrete-volume-calculator', 'cement-calculator', 'brick-calculator']}
      />
    </>
  );
}
