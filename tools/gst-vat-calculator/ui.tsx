"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  TaxOperation,
  HistoryEntry,
  calculateTax, 
  formatCurrency,
  generateCSV,
  downloadCSV,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  saveLastCalculation,
  getLastCalculation,
  PREDEFINED_TAX_RATES
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GSTVATCalculatorUI() {
  const [price, setPrice] = useState<string>("100");
  const [taxRate, setTaxRate] = useState<string>("18");
  const [operation, setOperation] = useState<TaxOperation>("add");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
    
    // Load last calculation
    const lastCalc = getLastCalculation();
    if (lastCalc) {
      setPrice(lastCalc.price);
      setTaxRate(lastCalc.taxRate);
      setOperation(lastCalc.operation);
    }
  }, []);

  const priceNum = parseFloat(price);
  const taxRateNum = parseFloat(taxRate);
  
  const isValid = !isNaN(priceNum) && !isNaN(taxRateNum) && priceNum > 0 && taxRateNum >= 0;
  
  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateTax(priceNum, taxRateNum, operation);
  }, [priceNum, taxRateNum, operation, isValid]);

  // Save inputs to localStorage when they change
  useEffect(() => {
    if (isClient && price && taxRate) {
      saveLastCalculation(price, taxRate, operation);
    }
  }, [price, taxRate, operation, isClient]);

  const handleCopy = () => {
    if (!result) return;
    const text = operation === 'add' 
      ? `Base Price: $${formatCurrency(result.basePrice, precision)}\nTax Rate: ${result.taxRate}%\nTax Amount: $${formatCurrency(result.taxAmount, precision)}\nFinal Price: $${formatCurrency(result.finalPrice, precision)}`
      : `Final Price: $${formatCurrency(result.finalPrice, precision)}\nTax Rate: ${result.taxRate}%\nTax Amount: $${formatCurrency(result.taxAmount, precision)}\nBase Price: $${formatCurrency(result.basePrice, precision)}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const csvContent = generateCSV(result);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!result) return;
    
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      basePrice: result.basePrice,
      taxRate: result.taxRate,
      taxAmount: result.taxAmount,
      finalPrice: result.finalPrice,
      operation: result.operation
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [result]);

  const handleClear = () => {
    setPrice("");
    setTaxRate("");
  };

  const handlePredefinedRate = (rate: number) => {
    setTaxRate(rate.toString());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>GST / VAT Calculator</h2>
            <p className="text-emerald-100 opacity-90 font-medium">Add or remove tax from any price instantly with real-time calculations.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none italic">🧾</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Input Side */}
            <div className="xl:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Price Amount</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Tax Rate (%)</label>
                <div className="relative group">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 18"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">%</span>
                </div>
                
                {/* Predefined Tax Rates */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {PREDEFINED_TAX_RATES.map((rate) => (
                    <button
                      key={rate.value}
                      onClick={() => handlePredefinedRate(rate.value)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition-all ${
                        taxRate === rate.value.toString()
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-200'
                      }`}
                    >
                      {rate.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Operation</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOperation('add')}
                    className={`py-4 px-6 rounded-2xl font-bold text-lg border-2 transition-all ${
                      operation === 'add'
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-200'
                    }`}
                  >
                    Add Tax
                  </button>
                  <button
                    onClick={() => setOperation('remove')}
                    className={`py-4 px-6 rounded-2xl font-bold text-lg border-2 transition-all ${
                      operation === 'remove'
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-200'
                    }`}
                  >
                    Remove Tax
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Output Precision</label>
                <div className="flex gap-2">
                  {[0, 2, 4].map(p => (
                    <button 
                      key={p}
                      onClick={() => setPrecision(p)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${precision === p ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200'}`}
                    >
                      {p} Decimals
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="xl:col-span-7">
              <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-dashed border-gray-200 h-full flex flex-col justify-center gap-8 relative overflow-hidden group">
                {result ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
                      <div className="text-center space-y-1">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                          {operation === 'add' ? 'Base Price' : 'Final Price'}
                        </span>
                        <h3 className="text-4xl font-black text-gray-900 leading-tight">
                          ${formatCurrency(operation === 'add' ? result.basePrice : result.finalPrice, precision)}
                        </h3>
                      </div>

                      <div className="text-center space-y-1">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Tax Amount</span>
                        <h3 className="text-4xl font-black text-gray-900 leading-tight">
                          ${formatCurrency(result.taxAmount, precision)}
                        </h3>
                      </div>
                    </div>

                    <div className="text-center z-10">
                      <span className="text-[10px] font-black text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                        {operation === 'add' ? 'Final Price' : 'Base Price'}
                      </span>
                      <h2 className="text-5xl font-black text-gray-900 leading-tight">
                        ${formatCurrency(operation === 'add' ? result.finalPrice : result.basePrice, precision)}
                      </h2>
                      <p className="text-sm text-gray-500 mt-2">
                        {operation === 'add' ? 'Including' : 'Excluding'} {result.taxRate}% tax
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center z-10">
                      <button
                        onClick={handleCopy}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        {copied ? '✓ Copied!' : '📋 Copy'}
                      </button>
                      <button
                        onClick={handleSaveToHistory}
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={handleDownloadCSV}
                        className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        📊 Export
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-6 py-3 bg-gray-600 text-white rounded-2xl font-bold hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        🗑️ Clear
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center z-10">
                    <div className="text-6xl mb-4 opacity-20">🧾</div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-2">Enter Price and Tax Rate</h3>
                    <p className="text-gray-500">Results will appear here instantly</p>
                  </div>
                )}

                {/* Background decoration */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-4 left-4 text-4xl">💰</div>
                  <div className="absolute top-4 right-4 text-4xl">📊</div>
                  <div className="absolute bottom-4 left-4 text-4xl">🧮</div>
                  <div className="absolute bottom-4 right-4 text-4xl">💳</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      {isClient && history.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black">Calculation History</h3>
              <button
                onClick={() => {
                  clearHistory();
                  setHistory([]);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {history.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        entry.operation === 'add' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {entry.operation === 'add' ? 'Add Tax' : 'Remove Tax'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-bold">Base: ${formatCurrency(entry.basePrice, precision)}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="font-bold">Tax ({entry.taxRate}%): ${formatCurrency(entry.taxAmount, precision)}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="font-bold">Final: ${formatCurrency(entry.finalPrice, precision)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deleteHistoryEntry(entry.id);
                      setHistory(getHistory());
                    }}
                    className="ml-4 px-3 py-1 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition-all text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools 
        currentTool="gst-vat-calculator" 
        tools={[
          "discount-calculator",
          "percentage-calculator", 
          "simple-interest-calculator",
          "compound-interest-calculator",
          "profit-margin-calculator",
          "investment-return-calculator"
        ]}
      />
    </div>
  );
}