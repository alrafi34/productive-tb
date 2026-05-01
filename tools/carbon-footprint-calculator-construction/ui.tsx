"use client";

import { useState, useEffect, useCallback } from "react";
import { MaterialInput, CarbonCalculation } from "./types";
import {
  createDefaultMaterials,
  performCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatNumber,
  calculatePercentage,
  generateId,
  MATERIAL_PRESETS,
  debounce
} from "./logic";
import CarbonFootprintCalculatorConstructionSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CarbonFootprintCalculatorConstructionUI() {
  const [materials, setMaterials] = useState<MaterialInput[]>(createDefaultMaterials());
  const [calculation, setCalculation] = useState<CarbonCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      const result = performCalculation(materials);
      setCalculation(result);
    }, 150),
    [materials]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [materials, debouncedCalculate]);

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseFloat(value) || 0;
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, quantity } : m))
    );
  };

  const handleEmissionFactorChange = (id: string, value: string) => {
    const emissionFactor = parseFloat(value) || 0;
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, emissionFactor } : m))
    );
  };

  const handleAddMaterial = () => {
    const newMaterial: MaterialInput = {
      id: generateId(),
      name: "Custom Material",
      quantity: 0,
      unit: "kg",
      emissionFactor: 1.0,
      co2: 0
    };
    setMaterials(prev => [...prev, newMaterial]);
  };

  const handleRemoveMaterial = (id: string) => {
    if (materials.length <= 1) return;
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const handleMaterialNameChange = (id: string, value: string) => {
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, name: value } : m))
    );
  };

  const handleUnitChange = (id: string, value: string) => {
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, unit: value } : m))
    );
  };

  const handleApplyPreset = (id: string, presetKey: string) => {
    const preset = MATERIAL_PRESETS[presetKey];
    if (!preset) return;
    
    setMaterials(prev =>
      prev.map(m =>
        m.id === id
          ? {
              ...m,
              name: preset.name,
              unit: preset.unit,
              emissionFactor: preset.emissionFactor
            }
          : m
      )
    );
  };

  const handleReset = () => {
    setMaterials(createDefaultMaterials());
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total CO₂: ${formatNumber(calculation.totalCO2)} kg`;
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

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'carbon_footprint.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'carbon_footprint.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: CarbonCalculation) => {
    setMaterials(calc.materials);
    setShowHistory(false);
  };

  const activeMaterials = materials.filter(m => m.quantity > 0);
  const hasData = calculation && calculation.totalCO2 > 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Carbon Footprint Calculator (Construction)</h3>
              <p className="text-sm text-blue-800">
                Estimate CO₂ emissions from construction materials. Calculate carbon footprint instantly with material breakdown and export options.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={handleAddMaterial}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  ➕ Add Material
                </button>
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

            {/* Result Display */}
            {hasData && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total CO₂ Emissions
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalCO2, 0)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kg CO₂
                  </div>
                </div>

                {calculation.highestContributor && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="text-primary-100 mb-1">Highest Contributor:</div>
                    <div className="font-semibold">{calculation.highestContributor.name}</div>
                    <div className="text-primary-100 text-xs mt-1">
                      {formatNumber(calculation.highestContributor.co2, 0)} kg CO₂ 
                      ({formatNumber(calculatePercentage(calculation.highestContributor.co2, calculation.totalCO2), 1)}%)
                    </div>
                  </div>
                )}

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
            
            {/* Materials Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Construction Materials
              </h3>
              
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <div key={material.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={material.name}
                        onChange={(e) => handleMaterialNameChange(material.id, e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        placeholder="Material name"
                      />
                      {materials.length > 1 && (
                        <button
                          onClick={() => handleRemoveMaterial(material.id)}
                          className="ml-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                        <input
                          type="number"
                          value={material.quantity || ""}
                          onChange={(e) => handleQuantityChange(material.id, e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                          placeholder="0"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                        <input
                          type="text"
                          value={material.unit}
                          onChange={(e) => handleUnitChange(material.id, e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="kg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Emission Factor (kg CO₂ per {material.unit})
                      </label>
                      <input
                        type="number"
                        value={material.emissionFactor || ""}
                        onChange={(e) => handleEmissionFactorChange(material.id, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                        placeholder="1.0"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quick Presets</label>
                      <select
                        onChange={(e) => handleApplyPreset(material.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        value=""
                      >
                        <option value="">Select preset...</option>
                        {Object.entries(MATERIAL_PRESETS).map(([key, preset]) => (
                          <option key={key} value={key}>
                            {preset.name} ({preset.emissionFactor} kg CO₂/{preset.unit})
                          </option>
                        ))}
                      </select>
                    </div>

                    {material.quantity > 0 && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">CO₂ Emissions:</span>
                          <span className="text-lg font-bold text-primary">
                            {formatNumber(material.co2, 2)} kg
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown Chart */}
            {hasData && activeMaterials.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Emissions Breakdown
                </h3>
                
                <div className="space-y-3">
                  {activeMaterials.map((material) => {
                    const percentage = calculatePercentage(material.co2, calculation.totalCO2);
                    return (
                      <div key={material.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{material.name}</span>
                          <span className="text-sm text-gray-600">
                            {formatNumber(material.co2, 0)} kg ({formatNumber(percentage, 1)}%)
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary Table */}
            {hasData && activeMaterials.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Material</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Factor</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">CO₂ (kg)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeMaterials.map((material) => (
                        <tr key={material.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{material.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">
                            {formatNumber(material.quantity, 0)} {material.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">
                            {material.emissionFactor}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-primary text-right">
                            {formatNumber(material.co2, 2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-primary/5 font-bold">
                        <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">Total Emissions</td>
                        <td className="px-4 py-3 text-sm text-primary text-right">
                          {formatNumber(calculation.totalCO2, 2)} kg
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {hasData && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
                </button>
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
                </button>
              </div>
            )}

            {/* Info Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Emission factors are approximate values based on industry averages. 
                Actual emissions may vary depending on manufacturing processes, transportation distances, 
                and regional factors. For precise calculations, consult with sustainability experts.
              </p>
            </div>

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
                            {formatNumber(entry.calculation.totalCO2, 0)} kg CO₂
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.materials.filter(m => m.quantity > 0).length} materials
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

      <CarbonFootprintCalculatorConstructionSEO />
      <RelatedTools
        currentTool="carbon-footprint-calculator-construction"
        tools={['green-building-score-calculator', 'energy-efficiency-calculator-building', 'sustainability-index-calculator']}
      />
    </>
  );
}
