"use client";

import { useState, useEffect } from "react";
import { Unit, RebarInput, RebarCalculation, BatchEntry } from "./types";
import {
  calculateRebarWeight,
  getDiameterPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportBatchToCSV,
  exportBatchToText,
  downloadFile,
  formatNumber,
  generateId
} from "./logic";
import RebarWeightCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RebarWeightCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customDiameter, setCustomDiameter] = useState(false);
  
  // Results
  const [calculation, setCalculation] = useState<RebarCalculation | null>(null);
  const [batch, setBatch] = useState<BatchEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [showFormula, setShowFormula] = useState(false);

  // Calculate weight in real-time
  useEffect(() => {
    const d = parseFloat(diameter);
    const l = parseFloat(length);
    const q = parseInt(quantity) || 1;
    
    if (!isNaN(d) && !isNaN(l) && d > 0 && l > 0 && q > 0) {
      const result = calculateRebarWeight(d, l, q, unit);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [diameter, length, quantity, unit]);

  const handleReset = () => {
    setDiameter("");
    setLength("");
    setQuantity("1");
    setCalculation(null);
    setCustomDiameter(false);
  };

  const handleUseDefaults = () => {
    setDiameter("12");
    setLength("10");
    setQuantity("1");
    setCustomDiameter(false);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Diameter: ${formatNumber(calculation.diameter, 1)} mm\nLength: ${formatNumber(calculation.length, 2)} m\nQuantity: ${calculation.quantity}\nTotal Weight: ${formatNumber(calculation.totalWeight, 2)} kg (${formatNumber(calculation.totalWeightLb, 2)} lb)`;
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
      downloadFile(text, 'rebar_weight_calculation.txt');
    }
  };

  const handleAddToBatch = () => {
    if (calculation) {
      const batchEntry: BatchEntry = {
        ...calculation,
        batchId: generateId()
      };
      setBatch([...batch, batchEntry]);
      handleReset();
    }
  };

  const handleRemoveFromBatch = (batchId: string) => {
    setBatch(batch.filter(item => item.batchId !== batchId));
  };

  const handleClearBatch = () => {
    if (confirm('Clear all batch entries?')) {
      setBatch([]);
    }
  };

  const handleExportBatchCSV = () => {
    if (batch.length > 0) {
      const csv = exportBatchToCSV(batch);
      downloadFile(csv, 'rebar_weight_batch.csv', 'text/csv');
    }
  };

  const handleExportBatchText = () => {
    if (batch.length > 0) {
      const text = exportBatchToText(batch);
      downloadFile(text, 'rebar_weight_batch.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: RebarCalculation) => {
    setDiameter(calc.diameter.toString());
    setLength(calc.length.toString());
    setQuantity(calc.quantity.toString());
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const totalBatchWeight = batch.reduce((sum, item) => sum + item.totalWeight, 0);
  const totalBatchWeightLb = batch.reduce((sum, item) => sum + item.totalWeightLb, 0);

  const diameterPresets = getDiameterPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Rebar Weight Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate weight of reinforcement steel bars based on diameter, length, and quantity. Get instant results with accurate formulas.
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

              {/* Formula Toggle */}
              <button
                onClick={() => setShowFormula(!showFormula)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                {showFormula ? '▼' : '▶'} Show Formula
              </button>

              {showFormula && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Standard Formula:</p>
                  <p className="text-xs text-blue-800 font-mono">
                    Weight per meter = D² / 162
                  </p>
                  <p className="text-xs text-blue-800 mt-2">
                    Where D = diameter in millimeters
                  </p>
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
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
                </button>
                {calculation && (
                  <button
                    onClick={handleAddToBatch}
                    className="w-full px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    ➕ Add to Batch
                  </button>
                )}
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
                    Total Weight
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalWeight, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kilograms (kg)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Pounds:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalWeightLb, 2)} lb</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Weight per meter:</span>
                    <span className="font-semibold">{formatNumber(calculation.weightPerMeter, 3)} kg/m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Weight per foot:</span>
                    <span className="font-semibold">{formatNumber(calculation.weightPerFoot, 3)} kg/ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Quantity:</span>
                    <span className="font-semibold">{calculation.quantity} bars</span>
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
                Rebar Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diameter ({unit === 'metric' ? 'mm' : 'inches'})
                  </label>
                  {!customDiameter ? (
                    <select
                      value={diameter}
                      onChange={(e) => {
                        if (e.target.value === 'custom') {
                          setCustomDiameter(true);
                          setDiameter("");
                        } else {
                          setDiameter(e.target.value);
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="">Select diameter</option>
                      {diameterPresets.map((preset) => (
                        <option key={preset.value} value={preset.value}>
                          {preset.label}
                        </option>
                      ))}
                      <option value="custom">Custom...</option>
                    </select>
                  ) : (
                    <div className="relative">
                      <input
                        type="number"
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="12"
                        min="0"
                        step="0.1"
                      />
                      <button
                        onClick={() => {
                          setCustomDiameter(false);
                          setDiameter("");
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        Use presets
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({unit === 'metric' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (bars)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1"
                    min="1"
                    step="1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Calculation:</strong> ({formatNumber(calculation.diameter, 1)}² / 162) × {formatNumber(calculation.length, 2)} × {calculation.quantity} = {formatNumber(calculation.totalWeight, 2)} kg
                  </div>
                </div>
              )}
            </div>

            {/* Diameter Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Standard Rebar Sizes
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {diameterPresets.filter(p => p.common).map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      setDiameter(preset.value.toString());
                      setCustomDiameter(false);
                    }}
                    className={`p-3 border rounded-lg transition-colors text-left ${
                      diameter === preset.value.toString()
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.label}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {formatNumber((preset.value * preset.value) / 162, 3)} kg/m
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Weight</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.totalWeight, 2)} kg</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">In Pounds</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.totalWeightLb, 2)} lb</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Weight/Meter</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.weightPerMeter, 3)} kg/m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Diameter</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.diameter, 1)} mm</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Length</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.length, 2)} m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Quantity</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.quantity} bars</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
            )}

            {/* Batch Panel */}
            {batch.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                      Batch Calculations
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Total: {formatNumber(totalBatchWeight, 2)} kg ({formatNumber(totalBatchWeightLb, 2)} lb)
                    </p>
                  </div>
                  <button
                    onClick={handleClearBatch}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {batch.map((item) => (
                    <div key={item.batchId} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">
                          Ø{formatNumber(item.diameter, 1)} mm × {formatNumber(item.length, 2)} m
                        </span>
                        <button
                          onClick={() => handleRemoveFromBatch(item.batchId)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        Qty: {item.quantity} bars • {formatNumber(item.weightPerMeter, 3)} kg/m
                      </div>
                      <div className="text-sm font-semibold text-primary mt-1">
                        {formatNumber(item.totalWeight, 2)} kg ({formatNumber(item.totalWeightLb, 2)} lb)
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleExportBatchText}
                      className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export Text
                    </button>
                    <button
                      onClick={handleExportBatchCSV}
                      className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export CSV
                    </button>
                  </div>
                </div>
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
                            {formatNumber(entry.calculation.totalWeight, 2)} kg
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Ø{formatNumber(entry.calculation.diameter, 1)} mm • 
                          {formatNumber(entry.calculation.length, 2)} m • 
                          Qty: {entry.calculation.quantity}
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

      <RebarWeightCalculatorSEO />
      <RelatedTools
        currentTool="rebar-weight-calculator"
        tools={['steel-quantity-calculator', 'concrete-volume-calculator', 'cement-calculator']}
      />
    </>
  );
}
