"use client";

import { useState, useEffect, useCallback } from "react";
import { BillingType, Currency, Slab, BillCalculation } from "./types";
import {
  performCalculation,
  validateInputs,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToCSV,
  exportToText,
  downloadFile,
  formatCurrency,
  formatNumber,
  generateId,
  createDefaultSlabs,
  getPresets,
  debounce
} from "./logic";
import ElectricBillCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ElectricBillCalculatorUI() {
  const [units, setUnits] = useState("150");
  const [billingType, setBillingType] = useState<BillingType>("flat");
  const [currency, setCurrency] = useState<Currency>("BDT");
  const [flatRate, setFlatRate] = useState("8");
  const [slabs, setSlabs] = useState<Slab[]>(createDefaultSlabs());
  const [serviceCharge, setServiceCharge] = useState("0");
  const [meterCharge, setMeterCharge] = useState("0");
  const [taxPercent, setTaxPercent] = useState("0");

  const [calculation, setCalculation] = useState<BillCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);

      const u = parseFloat(units);
      const fr = parseFloat(flatRate);
      const sc = parseFloat(serviceCharge) || 0;
      const mc = parseFloat(meterCharge) || 0;
      const tax = parseFloat(taxPercent) || 0;

      const validationError = validateInputs(u, billingType, fr, slabs);
      if (validationError) {
        setError(validationError);
        setCalculation(null);
        return;
      }

      try {
        const result = performCalculation(u, billingType, currency, fr, slabs, sc, mc, tax);
        setCalculation(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setCalculation(null);
      }
    }, 150),
    [units, billingType, currency, flatRate, slabs, serviceCharge, meterCharge, taxPercent]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [units, billingType, currency, flatRate, slabs, serviceCharge, meterCharge, taxPercent, debouncedCalculate]);

  const handleReset = () => {
    setUnits("150");
    setBillingType("flat");
    setCurrency("BDT");
    setFlatRate("8");
    setSlabs(createDefaultSlabs());
    setServiceCharge("0");
    setMeterCharge("0");
    setTaxPercent("0");
    setCalculation(null);
    setError(null);
  };

  const handleAddSlab = () => {
    const lastSlab = slabs[slabs.length - 1];
    const newMin = lastSlab && lastSlab.max !== Infinity ? lastSlab.max + 1 : 0;
    setSlabs([...slabs, { id: generateId(), min: newMin, max: newMin + 100, rate: 10 }]);
  };

  const handleRemoveSlab = (id: string) => {
    if (slabs.length <= 1) return;
    setSlabs(slabs.filter(s => s.id !== id));
  };

  const handleSlabChange = (id: string, field: keyof Slab, value: string | number) => {
    setSlabs(slabs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleApplyPreset = (presetName: string) => {
    const preset = presets.find(p => p.name === presetName);
    if (!preset) return;

    setBillingType(preset.billingType);
    setCurrency(preset.currency);

    if (preset.billingType === "flat" && preset.flatRate !== undefined) {
      setFlatRate(preset.flatRate.toString());
    } else if (preset.billingType === "tiered" && preset.slabs) {
      setSlabs(preset.slabs);
    }
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Bill: ${formatCurrency(calculation.totalBill, calculation.currency)}`;
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
      downloadFile(csv, 'electric_bill.csv', 'text/csv');
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'electric_bill.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: BillCalculation) => {
    setUnits(calc.units.toString());
    setBillingType(calc.billingType);
    setCurrency(calc.currency);
    if (calc.flatRate !== undefined) setFlatRate(calc.flatRate.toString());
    if (calc.slabs) setSlabs(calc.slabs);
    setServiceCharge(calc.serviceCharge.toString());
    setMeterCharge(calc.meterCharge.toString());
    setTaxPercent(calc.taxPercent.toString());
    setShowHistory(false);
  };

  const hasData = calculation && calculation.totalBill > 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Electric Bill Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate your electricity bill instantly with support for flat and tiered rates. Get detailed cost breakdown and export options.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Billing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Type</label>
                <select
                  value={billingType}
                  onChange={(e) => setBillingType(e.target.value as BillingType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="flat">Flat Rate</option>
                  <option value="tiered">Tiered (Slab) Rate</option>
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
                  <option value="BDT">BDT (৳)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
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
            {hasData && (
              <div className="bg-amber-600 rounded-xl border border-amber-700 shadow-lg shadow-amber-600/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-amber-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Bill
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalBill, 2)}
                  </div>
                  <div className="text-xl text-amber-100">
                    {calculation.currency}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-amber-100">Units:</span>
                    <span className="font-semibold">{calculation.units} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100">Energy Cost:</span>
                    <span className="font-semibold">{formatNumber(calculation.subtotal - calculation.serviceCharge - calculation.meterCharge, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100">Tax:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalTax, 2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-amber-600 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-amber-700 border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-amber-800 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">

            {/* Consumption Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Electricity Consumption
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units Consumed (kWh)
                </label>
                <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="150"
                  min="0"
                  step="1"
                />
              </div>
            </div>

            {/* Rate Configuration */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {billingType === "flat" ? "Flat Rate" : "Tiered Rate Slabs"}
              </h3>

              {billingType === "flat" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per Unit ({currency}/kWh)
                  </label>
                  <input
                    type="number"
                    value={flatRate}
                    onChange={(e) => setFlatRate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="8"
                    min="0"
                    step="0.01"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {slabs.map((slab, index) => (
                    <div key={slab.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Slab {index + 1}</span>
                        {slabs.length > 1 && (
                          <button
                            onClick={() => handleRemoveSlab(slab.id)}
                            className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Min</label>
                          <input
                            type="number"
                            value={slab.min}
                            onChange={(e) => handleSlabChange(slab.id, "min", parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Max</label>
                          <input
                            type="number"
                            value={slab.max === Infinity ? "" : slab.max}
                            onChange={(e) => handleSlabChange(slab.id, "max", e.target.value === "" ? Infinity : parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                            placeholder="∞"
                            min={slab.min}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Rate</label>
                          <input
                            type="number"
                            value={slab.rate}
                            onChange={(e) => handleSlabChange(slab.id, "rate", parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleAddSlab}
                    className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    ➕ Add Slab
                  </button>
                </div>
              )}
            </div>

            {/* Additional Charges */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Additional Charges
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Charge ({currency})
                  </label>
                  <input
                    type="number"
                    value={serviceCharge}
                    onChange={(e) => setServiceCharge(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meter Charge ({currency})
                  </label>
                  <input
                    type="number"
                    value={meterCharge}
                    onChange={(e) => setMeterCharge(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax (%)
                  </label>
                  <input
                    type="number"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Breakdown Table */}
            {hasData && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Cost Breakdown
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Range (kWh)</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Units</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Rate</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {calculation.breakdown.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.range}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">{formatNumber(item.units, 0)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right font-mono">{formatNumber(item.rate, 2)}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{formatNumber(item.cost, 2)}</td>
                        </tr>
                      ))}
                      {calculation.serviceCharge > 0 && (
                        <tr className="hover:bg-gray-50">
                          <td colSpan={3} className="px-4 py-3 text-sm text-gray-700">Service Charge</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{formatNumber(calculation.serviceCharge, 2)}</td>
                        </tr>
                      )}
                      {calculation.meterCharge > 0 && (
                        <tr className="hover:bg-gray-50">
                          <td colSpan={3} className="px-4 py-3 text-sm text-gray-700">Meter Charge</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{formatNumber(calculation.meterCharge, 2)}</td>
                        </tr>
                      )}
                      {calculation.totalTax > 0 && (
                        <tr className="hover:bg-gray-50">
                          <td colSpan={3} className="px-4 py-3 text-sm text-gray-700">Tax ({calculation.taxPercent}%)</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{formatNumber(calculation.totalTax, 2)}</td>
                        </tr>
                      )}
                      <tr className="bg-amber-50 font-bold">
                        <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">Total Bill</td>
                        <td className="px-4 py-3 text-sm text-amber-600 text-right">{formatCurrency(calculation.totalBill, calculation.currency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset.name)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

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
                            {formatCurrency(entry.calculation.totalBill, entry.calculation.currency)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.units} kWh • {entry.calculation.billingType === "flat" ? "Flat Rate" : "Tiered Rate"}
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

      <ElectricBillCalculatorSEO />
      <RelatedTools
        currentTool="electric-bill-calculator"
        tools={['percentage-calculator', 'discount-calculator', 'tip-calculator']}
      />
    </>
  );
}
