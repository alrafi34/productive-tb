"use client";

import { useState, useEffect } from "react";
import { Material, UnitType, Currency, MaterialCalculation } from "./types";
import {
  createEmptyMaterial,
  performMaterialCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  formatCurrency,
  getCurrencySymbol,
  getMaterialPresets,
  generateId
} from "./logic";
import MaterialCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MaterialCostCalculatorUI() {
  const [materials, setMaterials] = useState<Material[]>([createEmptyMaterial()]);
  const [overhead, setOverhead] = useState("0");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [calculation, setCalculation] = useState<MaterialCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const materialPresets = getMaterialPresets();

  // Calculate in real-time
  useEffect(() => {
    const oh = parseFloat(overhead) || 0;
    const result = performMaterialCalculation(materials, oh, currency);
    setCalculation(result);
  }, [materials, overhead, currency]);

  const handleAddMaterial = () => {
    setMaterials([...materials, createEmptyMaterial()]);
  };

  const handleRemoveMaterial = (id: string) => {
    if (materials.length > 1) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const handleDuplicateMaterial = (material: Material) => {
    const newMaterial = { ...material, id: generateId() };
    setMaterials([...materials, newMaterial]);
  };

  const handleUpdateMaterial = (id: string, field: keyof Material, value: any) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleApplyPreset = (preset: any) => {
    const newMaterial: Material = {
      id: generateId(),
      name: preset.name,
      quantity: preset.quantity,
      unitPrice: preset.unitPrice,
      unitType: preset.unitType,
      wastage: preset.wastage,
      cost: 0,
      adjustedCost: 0
    };
    setMaterials([...materials, newMaterial]);
  };

  const handleReset = () => {
    setMaterials([createEmptyMaterial()]);
    setOverhead("0");
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Cost: ${formatCurrency(calculation.totalCost, currency)}`;
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
      downloadFile(text, 'material_cost_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'material_cost_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: MaterialCalculation) => {
    setMaterials(calc.materials);
    setOverhead(calc.overhead.toString());
    setCurrency(calc.currency);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Material Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate construction material costs instantly. Add multiple materials, set wastage, and get detailed cost breakdowns.
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

              {/* Overhead */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overhead Cost ({getCurrencySymbol(currency)})
                </label>
                <input
                  type="number"
                  value={overhead}
                  onChange={(e) => setOverhead(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="0"
                  min="0"
                  step="1"
                />
              </div>

              <div className="pt-4 space-y-2">
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
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Cost
                  </p>
                  <div className="text-3xl font-bold mb-1">
                    {formatCurrency(calculation.totalCost, currency)}
                  </div>
                  <div className="text-sm text-primary-100">
                    {materials.length} material{materials.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Subtotal:</span>
                    <span className="font-semibold">{formatCurrency(calculation.subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wastage:</span>
                    <span className="font-semibold">{formatCurrency(calculation.totalWastage, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Overhead:</span>
                    <span className="font-semibold">{formatCurrency(calculation.overhead, currency)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Total"}
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
            
            {/* Materials Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Materials
                </h3>
                <button
                  onClick={handleAddMaterial}
                  className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium"
                >
                  + Add Material
                </button>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {materials.map((material, index) => (
                    <div key={material.id} className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        {/* Material Name */}
                        <div className="md:col-span-3">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Material Name</label>
                          <input
                            type="text"
                            value={material.name}
                            onChange={(e) => handleUpdateMaterial(material.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="e.g., Cement"
                          />
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={material.quantity || ''}
                            onChange={(e) => handleUpdateMaterial(material.id, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="0"
                            min="0"
                            step="0.1"
                          />
                        </div>

                        {/* Unit Type */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                          <select
                            value={material.unitType}
                            onChange={(e) => handleUpdateMaterial(material.id, 'unitType', e.target.value as UnitType)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          >
                            <option value="pcs">Pieces</option>
                            <option value="kg">Kg</option>
                            <option value="tons">Tons</option>
                            <option value="bags">Bags</option>
                            <option value="liters">Liters</option>
                            <option value="m">Meters</option>
                            <option value="m2">m²</option>
                            <option value="m3">m³</option>
                            <option value="ft">Feet</option>
                            <option value="ft2">ft²</option>
                            <option value="ft3">ft³</option>
                          </select>
                        </div>

                        {/* Unit Price */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Unit Price</label>
                          <input
                            type="number"
                            value={material.unitPrice || ''}
                            onChange={(e) => handleUpdateMaterial(material.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="0"
                            min="0"
                            step="0.01"
                          />
                        </div>

                        {/* Wastage */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Wastage %</label>
                          <input
                            type="number"
                            value={material.wastage || ''}
                            onChange={(e) => handleUpdateMaterial(material.id, 'wastage', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            placeholder="0"
                            min="0"
                            max="100"
                            step="1"
                          />
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-1 flex items-end gap-1">
                          <button
                            onClick={() => handleDuplicateMaterial(material)}
                            className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => handleRemoveMaterial(material.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                            disabled={materials.length === 1}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      {/* Cost Display */}
                      {material.name && material.quantity > 0 && material.unitPrice > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Cost: <span className="font-semibold text-gray-900">{formatCurrency(material.cost, currency)}</span>
                          </span>
                          <span className="text-gray-600">
                            With Wastage: <span className="font-semibold text-primary">{formatCurrency(material.adjustedCost, currency)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Material Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Add Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {materialPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {preset.quantity} {preset.unitType} × ${preset.unitPrice}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && materials.some(m => m.name && m.quantity > 0) && (
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
                          {entry.calculation.materials.length} materials | Wastage: {formatCurrency(entry.calculation.totalWastage, entry.calculation.currency)}
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

      <MaterialCostCalculatorSEO />
      <RelatedTools
        currentTool="material-cost-calculator"
        tools={['construction-cost-estimator', 'concrete-volume-calculator', 'brick-calculator']}
      />
    </>
  );
}
