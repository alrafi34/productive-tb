"use client";

import { useState, useEffect } from "react";
import { MaterialQuality, RegionFactor, Currency, AddOns, ConstructionEstimate } from "./types";
import {
  performConstructionEstimate,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  formatCurrency,
  getCurrencySymbol,
  getMaterialQualityLabel,
  getRegionFactorLabel,
  getProjectPresets,
  getCostIntensity,
  validateInputs
} from "./logic";
import ConstructionCostEstimatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ConstructionCostEstimatorUI() {
  const [area, setArea] = useState("1000");
  const [costPerSqFt, setCostPerSqFt] = useState("50");
  const [materialQuality, setMaterialQuality] = useState<MaterialQuality>("medium");
  const [laborMultiplier, setLaborMultiplier] = useState("1.0");
  const [regionFactor, setRegionFactor] = useState<RegionFactor>("standard");
  const [currency, setCurrency] = useState<Currency>("USD");
  
  // Add-ons
  const [addOns, setAddOns] = useState<AddOns>({
    plumbing: false,
    electrical: false,
    interiorDesign: false,
    landscaping: false
  });
  
  // Results
  const [estimate, setEstimate] = useState<ConstructionEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const projectPresets = getProjectPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const a = parseFloat(area);
    const cost = parseFloat(costPerSqFt);
    const labor = parseFloat(laborMultiplier);
    
    const validationError = validateInputs(a, cost, labor);
    if (validationError) {
      setEstimate(null);
      return;
    }
    
    const result = performConstructionEstimate(a, cost, materialQuality, labor, regionFactor, addOns, currency);
    setEstimate(result);
  }, [area, costPerSqFt, materialQuality, laborMultiplier, regionFactor, addOns, currency]);

  const handleReset = () => {
    setArea("1000");
    setCostPerSqFt("50");
    setMaterialQuality("medium");
    setLaborMultiplier("1.0");
    setRegionFactor("standard");
    setCurrency("USD");
    setAddOns({
      plumbing: false,
      electrical: false,
      interiorDesign: false,
      landscaping: false
    });
    setEstimate(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setArea(preset.area.toString());
    setCostPerSqFt(preset.costPerSqFt.toString());
    setMaterialQuality(preset.materialQuality);
    setLaborMultiplier(preset.laborMultiplier.toString());
  };

  const handleToggleAddOn = (addon: keyof AddOns) => {
    setAddOns(prev => ({
      ...prev,
      [addon]: !prev[addon]
    }));
  };

  const handleCopy = () => {
    if (estimate) {
      const text = `Total Cost: ${formatCurrency(estimate.totalCost, currency)} | Area: ${formatNumber(estimate.area)} sq ft`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveEstimate = () => {
    if (estimate) {
      saveToHistory(estimate);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (estimate) {
      const text = exportToText(estimate);
      downloadFile(text, 'construction_cost_estimate.txt');
    }
  };

  const handleExportCSV = () => {
    if (estimate) {
      const csv = exportToCSV(estimate);
      downloadFile(csv, 'construction_cost_estimate.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all estimate history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (est: ConstructionEstimate) => {
    setArea(est.area.toString());
    setCostPerSqFt(est.costPerSqFt.toString());
    setMaterialQuality(est.materialQuality);
    setLaborMultiplier(est.laborMultiplier.toString());
    setRegionFactor(est.regionFactor);
    setCurrency(est.currency);
    setAddOns(est.addOns);
    setShowHistory(false);
  };

  const intensity = estimate ? getCostIntensity(estimate.totalCost) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Construction Cost Estimator</h3>
              <p className="text-sm text-blue-800">
                Estimate construction costs instantly with area-based pricing, material quality, labor rates, and regional adjustments.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
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
            {estimate && intensity && (
              <div className={`rounded-xl border shadow-lg p-6 text-white space-y-4 ${
                intensity.color === 'green' ? 'bg-green-600 border-green-700' :
                intensity.color === 'blue' ? 'bg-blue-600 border-blue-700' :
                intensity.color === 'yellow' ? 'bg-yellow-600 border-yellow-700' :
                intensity.color === 'orange' ? 'bg-orange-600 border-orange-700' :
                'bg-red-600 border-red-700'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Estimated Cost
                  </p>
                  <div className="text-3xl font-bold mb-1">
                    {formatCurrency(estimate.totalCost, currency)}
                  </div>
                  <div className="text-sm text-white/90">
                    {formatNumber(estimate.area)} sq ft
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Base Cost:</span>
                    <span className="font-semibold">{formatCurrency(estimate.baseCost, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Cost/sq ft:</span>
                    <span className="font-semibold">{formatCurrency(estimate.costPerSqFt, currency)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-white/80 mb-1">Project Level:</div>
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
                    onClick={handleSaveEstimate}
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
            
            {/* Basic Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Construction Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000"
                    min="0"
                    step="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per sq ft ({getCurrencySymbol(currency)})
                  </label>
                  <input
                    type="number"
                    value={costPerSqFt}
                    onChange={(e) => setCostPerSqFt(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="50"
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Quality</label>
                  <select
                    value={materialQuality}
                    onChange={(e) => setMaterialQuality(e.target.value as MaterialQuality)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="low">Low (0.8x)</option>
                    <option value="medium">Medium (1.0x)</option>
                    <option value="high">High (1.3x)</option>
                    <option value="premium">Premium (1.6x)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region Factor</label>
                  <select
                    value={regionFactor}
                    onChange={(e) => setRegionFactor(e.target.value as RegionFactor)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="low">Low Cost (0.9x)</option>
                    <option value="standard">Standard (1.0x)</option>
                    <option value="high">High Cost (1.2x)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Labor Multiplier: {laborMultiplier}x
                </label>
                <input
                  type="range"
                  value={laborMultiplier}
                  onChange={(e) => setLaborMultiplier(e.target.value)}
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5x</span>
                  <span>1.0x</span>
                  <span>2.0x</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Optional Add-ons
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.plumbing}
                    onChange={() => handleToggleAddOn('plumbing')}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Plumbing</div>
                    <div className="text-xs text-gray-600">+5% of base cost</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.electrical}
                    onChange={() => handleToggleAddOn('electrical')}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Electrical</div>
                    <div className="text-xs text-gray-600">+7% of base cost</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.interiorDesign}
                    onChange={() => handleToggleAddOn('interiorDesign')}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Interior Design</div>
                    <div className="text-xs text-gray-600">+10% of base cost</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.landscaping}
                    onChange={() => handleToggleAddOn('landscaping')}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Landscaping</div>
                    <div className="text-xs text-gray-600">+8% of base cost</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Cost Breakdown */}
            {estimate && (
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
                  <div className="space-y-3">
                    {estimate.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{item.category}</span>
                          <span className="text-xs text-gray-600 ml-2">({formatNumber(item.percentage, 1)}%)</span>
                        </div>
                        <span className="font-semibold text-gray-900">{formatCurrency(item.amount, currency)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                      <span className="text-sm font-semibold text-primary">Total Cost</span>
                      <span className="font-bold text-primary">{formatCurrency(estimate.totalCost, currency)}</span>
                    </div>
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
                      {formatNumber(preset.area)} sq ft | ${preset.costPerSqFt}/sq ft
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {estimate && (
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
                    Estimate History
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
                      No estimates saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry.estimate)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(entry.estimate.totalCost, entry.estimate.currency)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.estimate.area)} sq ft | {getMaterialQualityLabel(entry.estimate.materialQuality)}
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

      <ConstructionCostEstimatorSEO />
      <RelatedTools
        currentTool="construction-cost-estimator"
        tools={['escalation-cost-calculator', 'concrete-volume-calculator', 'brick-calculator']}
      />
    </>
  );
}
