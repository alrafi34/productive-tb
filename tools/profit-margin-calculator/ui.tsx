"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  calculateProfitMargin,
  formatCurrency,
  formatPercentage,
  generateCSV,
  downloadCSV,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  ProfitMarginResult,
  HistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ProfitMarginCalculatorUI() {
  const [revenue, setRevenue] = useState<string>("1000");
  const [cogs, setCogs] = useState<string>("600");
  const [expenses, setExpenses] = useState<string>("200");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const rNum = parseFloat(revenue);
  const cNum = parseFloat(cogs);
  const eNum = parseFloat(expenses);

  const isValid = !isNaN(rNum) && !isNaN(cNum) && !isNaN(eNum) && rNum > 0 && cNum >= 0 && eNum >= 0;

  const result: ProfitMarginResult = useMemo(() => {
    if (!isValid) return {
      grossProfit: 0,
      grossMargin: 0,
      netProfit: 0,
      netMargin: 0,
      isValid: false,
      warnings: []
    };
    return calculateProfitMargin(rNum, cNum, eNum);
  }, [rNum, cNum, eNum, isValid]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = `Revenue: $${formatCurrency(rNum, precision)}\nCOGS: $${formatCurrency(cNum, precision)}\nExpenses: $${formatCurrency(eNum, precision)}\n\nGross Profit: $${formatCurrency(result.grossProfit, precision)}\nGross Margin: ${formatPercentage(result.grossMargin, precision)}%\n\nNet Profit: $${formatCurrency(result.netProfit, precision)}\nNet Margin: ${formatPercentage(result.netMargin, precision)}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!isValid) return;
    const csvContent = generateCSV(rNum, cNum, eNum, result);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      revenue: rNum,
      cogs: cNum,
      expenses: eNum,
      grossProfit: result.grossProfit,
      grossMargin: result.grossMargin,
      netProfit: result.netProfit,
      netMargin: result.netMargin
    };

    saveToHistory(entry);
    setHistory(getHistory());
  }, [rNum, cNum, eNum, result, isValid]);

  const handleClear = () => {
    setRevenue("");
    setCogs("");
    setExpenses("");
  };

  const handleLoadHistory = (entry: HistoryEntry) => {
    setRevenue(entry.revenue.toString());
    setCogs(entry.cogs.toString());
    setExpenses(entry.expenses.toString());
  };

  const handleDeleteHistory = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>Profit Margin Calculator</h2>
            <p className="text-emerald-100 opacity-90 font-medium">Calculate gross and net profit margins instantly.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none italic">💰</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Input Side */}
            <div className="xl:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Revenue</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Cost of Goods Sold (COGS)</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={cogs}
                    onChange={(e) => setCogs(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Operating Expenses (Optional)</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 200"
                  />
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

              {result.warnings.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-xs font-bold text-red-700">Warnings:</p>
                  {result.warnings.map((warning, idx) => (
                    <p key={idx} className="text-xs text-red-600 mt-1">• {warning}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Result Side */}
            <div className="xl:col-span-7">
              <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-dashed border-gray-200 h-full flex flex-col justify-center gap-8 relative overflow-hidden group">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Gross Profit</span>
                    <h3 className="text-4xl font-black text-gray-900 leading-tight">
                      ${isValid ? formatCurrency(result.grossProfit, precision) : "0"}
                    </h3>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Gross Margin</span>
                    <h3 className={`text-4xl font-black leading-tight ${result.grossMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {isValid ? formatPercentage(result.grossMargin, precision) : "0"}%
                    </h3>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Net Profit</span>
                    <h3 className="text-4xl font-black text-gray-900 leading-tight">
                      ${isValid ? formatCurrency(result.netProfit, precision) : "0"}
                    </h3>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Net Margin</span>
                    <h3 className={`text-4xl font-black leading-tight ${result.netMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {isValid ? formatPercentage(result.netMargin, precision) : "0"}%
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-gray-200">
                  <button
                    onClick={handleCopy}
                    disabled={!isValid}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${copied ? 'bg-green-600 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
                  >
                    {copied ? "✓ Copied" : "Copy Results"}
                  </button>
                  <button
                    onClick={handleDownloadCSV}
                    disabled={!isValid}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={handleSaveToHistory}
                    disabled={!isValid}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save to History
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          {isClient && history.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-gray-900">Calculation History</h3>
                <button
                  onClick={handleClearHistory}
                  className="text-xs font-bold text-red-600 hover:text-red-700 transition-all"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
                      </div>
                      <button
                        onClick={() => handleDeleteHistory(entry.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-bold">${formatCurrency(entry.revenue, 2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross Margin:</span>
                        <span className={`font-bold ${entry.grossMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatPercentage(entry.grossMargin, 2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Margin:</span>
                        <span className={`font-bold ${entry.netMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatPercentage(entry.netMargin, 2)}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLoadHistory(entry)}
                      className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToolSEOContent />
      <RelatedTools currentTool="profit-margin-calculator" tools={["discount-calculator", "percentage-calculator", "investment-return-calculator", "simple-interest-calculator", "compound-interest-calculator"]} />
    </div>
  );
}
