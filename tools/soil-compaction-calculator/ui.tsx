"use client";

import { useState, useEffect } from "react";
import { Unit, CompactionStandard, CompactionCalculation } from "./types";
import {
  calculateCompaction,
  getSoilPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getUnitDisplay,
  getStatusColor,
  getStatusBgColor,
  getProgressBarColor
} from "./logic";
import SoilCompactionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SoilCompactionCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("g/cm3");
  const [fieldDryDensity, setFieldDryDensity] = useState("");
  const [maxDryDensity, setMaxDryDensity] = useState("");
  const [requiredCompaction, setRequiredCompaction] = useState<CompactionStandard>(95);
  
  // Results
  const [calculation, setCalculation] = useState<CompactionCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const field = parseFloat(fieldDryDensity);
    const max = parseFloat(maxDryDensity);
    
    if (!isNaN(field) && !isNaN(max) && field > 0 && max > 0) {
      const result = calculateCompaction({
        fieldDryDensity: field,
        maxDryDensity: max,
        requiredCompaction,
        unit
      });
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [fieldDryDensity, maxDryDensity, requiredCompaction, unit]);

  const handleReset = () => {
    setFieldDryDensity("");
    setMaxDryDensity("");
    setRequiredCompaction(95);
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setFieldDryDensity("1.85");
    setMaxDryDensity("2.00");
    setRequiredCompaction(95);
  };

  const handleApplyPreset = (preset: any) => {
    setFieldDryDensity(preset.typicalFieldDensity.toString());
    setMaxDryDensity(preset.typicalMaxDensity.toString());
    setUnit(preset.unit);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Soil Compaction: ${formatNumber(calculation.compactionPercentage)}% - Status: ${calculation.status.toUpperCase()}`;
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
      downloadFile(text, 'soil_compaction_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'soil_compaction_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: CompactionCalculation) => {
    setFieldDryDensity(calc.fieldDryDensity.toString());
    setMaxDryDensity(calc.maxDryDensity.toString());
    setRequiredCompaction(calc.requiredCompaction);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const soilPresets = getSoilPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Soil Compaction Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate soil compaction percentage by comparing field dry density with maximum dry density. Instant quality control for construction sites.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Density Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("g/cm3")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "g/cm3"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    g/cm³
                  </button>
                  <button
                    onClick={() => setUnit("kN/m3")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "kN/m3"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    kN/m³
                  </button>
                </div>
              </div>

              {/* Required Compaction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Compaction Standard
                </label>
                <select
                  value={requiredCompaction}
                  onChange={(e) => setRequiredCompaction(parseInt(e.target.value) as CompactionStandard)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={90}>90% (Light duty)</option>
                  <option value={95}>95% (Standard)</option>
                  <option value={98}>98% (Heavy duty)</option>
                  <option value={100}>100% (Maximum)</option>
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
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
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
                    Compaction Percentage
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.compactionPercentage)}%
                  </div>
                  <div className="text-xl text-primary-100">
                    {calculation.status === 'pass' ? 'Meets Requirement' : calculation.status === 'warning' ? 'Close to Requirement' : 'Below Requirement'}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-primary-100">
                    <span>0%</span>
                    <span>Required: {calculation.requiredCompaction}%</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(calculation.compactionPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Field Density:</span>
                    <span className="font-semibold">{formatNumber(calculation.fieldDryDensity)} {getUnitDisplay(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Density:</span>
                    <span className="font-semibold">{formatNumber(calculation.maxDryDensity)} {getUnitDisplay(calculation.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Difference:</span>
                    <span className="font-semibold">{formatNumber(Math.abs(calculation.difference))}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Status:</span>
                    <span className="font-semibold uppercase">{calculation.status}</span>
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
                Density Measurements
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Dry Density ({getUnitDisplay(unit)})
                  </label>
                  <input
                    type="number"
                    value={fieldDryDensity}
                    onChange={(e) => setFieldDryDensity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1.85"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Measured in field
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Dry Density ({getUnitDisplay(unit)})
                  </label>
                  <input
                    type="number"
                    value={maxDryDensity}
                    onChange={(e) => setMaxDryDensity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2.00"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    From Proctor test
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Compaction (%) = (Field Dry Density / Maximum Dry Density) × 100
                  </div>
                </div>
              )}
            </div>

            {/* Soil Type Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Soil Type Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {soilPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Field: {preset.typicalFieldDensity} / Max: {preset.typicalMaxDensity} {getUnitDisplay(preset.unit)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Status and Notes */}
            {calculation && (
              <div className={`rounded-xl border p-6 ${getStatusBgColor(calculation.status)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">
                    {calculation.status === 'pass' ? '✅' : calculation.status === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <h3 className={`font-semibold text-lg ${getStatusColor(calculation.status)}`}>
                    Status: {calculation.status.charAt(0).toUpperCase() + calculation.status.slice(1)}
                  </h3>
                </div>
                
                {calculation.notes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Engineering Notes:</p>
                    <ul className="space-y-1">
                      {calculation.notes.map((note, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Visual Comparison */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Compaction Analysis
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Field Dry Density</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.fieldDryDensity)} {getUnitDisplay(calculation.unit)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(calculation.fieldDryDensity / calculation.maxDryDensity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Maximum Dry Density</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.maxDryDensity)} {getUnitDisplay(calculation.unit)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Required Compaction</span>
                      <span className="font-semibold text-gray-900">{calculation.requiredCompaction}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${calculation.requiredCompaction}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Compaction</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.compactionPercentage)}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Required</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.requiredCompaction}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Difference</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(Math.abs(calculation.difference))}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Field Density</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.fieldDryDensity)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Max Density</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.maxDryDensity)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
                    <div className="text-sm font-bold text-gray-900 uppercase">{calculation.status}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
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
                            {formatNumber(entry.calculation.compactionPercentage)}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Field: {formatNumber(entry.calculation.fieldDryDensity)} / 
                          Max: {formatNumber(entry.calculation.maxDryDensity)} {getUnitDisplay(entry.calculation.unit)} • 
                          Status: {entry.calculation.status}
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

      <SoilCompactionCalculatorSEO />
      <RelatedTools
        currentTool="soil-compaction-calculator"
        tools={['soil-bearing-capacity-calculator', 'foundation-depth-calculator', 'excavation-volume-calculator']}
      />
    </>
  );
}
