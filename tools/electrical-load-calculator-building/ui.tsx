"use client";

import { useState, useEffect } from "react";
import { Voltage, LoadType, Appliance, ElectricalCalculation, ApplianceCategory } from "./types";
import {
  performElectricalCalculation,
  createAppliance,
  getApplianceTemplates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  validateAppliance
} from "./logic";
import ElectricalLoadCalculatorBuildingSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ElectricalLoadCalculatorBuildingUI() {
  const [voltage, setVoltage] = useState<Voltage>(220);
  const [loadType, setLoadType] = useState<LoadType>("residential");
  const [demandFactor, setDemandFactor] = useState(0.8);
  const [powerFactor, setPowerFactor] = useState(0.8);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Appliances
  const [appliances, setAppliances] = useState<Appliance[]>([createAppliance()]);
  
  // Results
  const [calculation, setCalculation] = useState<ElectricalCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const templates = getApplianceTemplates();

  // Calculate in real-time
  useEffect(() => {
    const validAppliances = appliances.filter(a => 
      a.name.trim() && a.quantity > 0 && a.power > 0
    );
    
    if (validAppliances.length > 0) {
      const result = performElectricalCalculation(
        validAppliances,
        voltage,
        loadType,
        demandFactor,
        powerFactor
      );
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [appliances, voltage, loadType, demandFactor, powerFactor]);

  const handleAddAppliance = () => {
    setAppliances([...appliances, createAppliance()]);
  };

  const handleRemoveAppliance = (id: string) => {
    if (appliances.length > 1) {
      setAppliances(appliances.filter(a => a.id !== id));
    }
  };

  const handleUpdateAppliance = (id: string, field: keyof Appliance, value: any) => {
    setAppliances(appliances.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const handleApplyTemplate = (template: any) => {
    const newAppliance = createAppliance(template.name, 1, template.power, template.category);
    setAppliances([...appliances, newAppliance]);
    setShowTemplates(false);
  };

  const handleReset = () => {
    setAppliances([createAppliance()]);
    setVoltage(220);
    setLoadType("residential");
    setDemandFactor(0.8);
    setPowerFactor(0.8);
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Load: ${formatNumber(calculation.totalKW)} kW | Current: ${formatNumber(calculation.current)} A | Breaker: ${calculation.recommendedBreaker} A`;
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
      downloadFile(text, 'electrical_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'electrical_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ElectricalCalculation) => {
    setAppliances(calc.appliances);
    setVoltage(calc.voltage);
    setLoadType(calc.loadType);
    setDemandFactor(calc.demandFactor);
    setPowerFactor(calc.powerFactor);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Electrical Load Calculator (Building)</h3>
              <p className="text-sm text-blue-800">
                Calculate total electrical load for residential and commercial buildings. Estimate power consumption, current, breaker size, and cable requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voltage</label>
                <select
                  value={voltage}
                  onChange={(e) => setVoltage(parseInt(e.target.value) as Voltage)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={220}>220V (Single Phase)</option>
                  <option value={110}>110V (Single Phase)</option>
                </select>
              </div>

              {/* Load Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Load Type</label>
                <select
                  value={loadType}
                  onChange={(e) => setLoadType(e.target.value as LoadType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Demand Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demand Factor: {formatNumber(demandFactor * 100, 0)}%
                </label>
                <select
                  value={demandFactor}
                  onChange={(e) => setDemandFactor(parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={1.0}>100% (No diversity)</option>
                  <option value={0.9}>90%</option>
                  <option value={0.8}>80% (Recommended)</option>
                  <option value={0.7}>70%</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Accounts for not all loads running simultaneously
                </p>
              </div>

              {/* Advanced Options Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                </button>
              </div>

              {showAdvanced && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power Factor: {formatNumber(powerFactor, 2)}
                  </label>
                  <input
                    type="range"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(parseFloat(e.target.value))}
                    className="w-full"
                    min="0.6"
                    max="1.0"
                    step="0.05"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 0.8 for mixed loads
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
                    Total Load
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalKW)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kW
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Demand Load:</span>
                    <span className="font-semibold">{formatNumber(calculation.demandLoad)} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Current:</span>
                    <span className="font-semibold">{formatNumber(calculation.current)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Breaker:</span>
                    <span className="font-semibold">{calculation.recommendedBreaker} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cable:</span>
                    <span className="font-semibold">{calculation.estimatedCableSize}</span>
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
            
            {/* Appliances Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Appliances & Equipment
                </h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  📋 Templates
                </button>
              </div>

              {/* Templates Dropdown */}
              {showTemplates && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Add Templates</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {templates.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => handleApplyTemplate(template)}
                        className="p-2 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left text-sm"
                      >
                        <div className="font-medium text-gray-900">{template.name}</div>
                        <div className="text-xs text-gray-500">{template.power}W</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Appliance</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Qty</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Power (W)</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Category</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Total</th>
                      <th className="text-center py-2 px-2 text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliances.map((appliance) => (
                      <tr key={appliance.id} className="border-b border-gray-100">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={appliance.name}
                            onChange={(e) => handleUpdateAppliance(appliance.id, 'name', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="e.g., Fan"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={appliance.quantity}
                            onChange={(e) => handleUpdateAppliance(appliance.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            min="1"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={appliance.power}
                            onChange={(e) => handleUpdateAppliance(appliance.id, 'power', parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                            min="0"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <select
                            value={appliance.category}
                            onChange={(e) => handleUpdateAppliance(appliance.id, 'category', e.target.value as ApplianceCategory)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          >
                            <option value="lighting">Lighting</option>
                            <option value="hvac">HVAC</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="electronics">Electronics</option>
                            <option value="motors">Motors</option>
                            <option value="other">Other</option>
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {appliance.quantity * appliance.power} W
                          </span>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button
                            onClick={() => handleRemoveAppliance(appliance.id)}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm"
                            disabled={appliances.length === 1}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={handleAddAppliance}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ➕ Add Appliance
              </button>
            </div>

            {/* Summary */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Connected Load</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.totalKW)} kW</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Demand Load</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.demandLoad)} kW</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.current)} A</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Breaker</div>
                    <div className="text-lg font-bold text-primary">{calculation.recommendedBreaker} A</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Formula:</strong>
                    <div className="mt-1 font-mono text-xs">
                      Current (A) = (Demand Load × 1000) / (Voltage × Power Factor)
                    </div>
                    <div className="mt-1 text-xs">
                      {formatNumber(calculation.demandLoad)} kW × 1000 / ({calculation.voltage}V × {formatNumber(calculation.powerFactor, 2)}) = {formatNumber(calculation.current)} A
                    </div>
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
                            {formatNumber(entry.calculation.totalKW)} kW | {formatNumber(entry.calculation.current)} A
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.appliances.length} appliances | {entry.calculation.voltage}V | Breaker: {entry.calculation.recommendedBreaker}A
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

      <ElectricalLoadCalculatorBuildingSEO />
      <RelatedTools
        currentTool="electrical-load-calculator-building"
        tools={['lighting-load-calculator', 'power-consumption-calculator', 'ohms-law-calculator']}
      />
    </>
  );
}
