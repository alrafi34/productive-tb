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
  HistoryEntry,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EMPTY_RESULT: ProfitMarginResult = {
  grossProfit: 0,
  grossMargin: 0,
  netProfit: 0,
  netMargin: 0,
  isValid: false,
  warnings: [],
};

export default function ProfitMarginCalculatorUI() {
  const [revenue, setRevenue] = useState<string>("1000");
  const [cogs, setCogs] = useState<string>("600");
  const [expenses, setExpenses] = useState<string>("200");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsClient(true);
      setHistory(getHistory());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const rNum = parseFloat(revenue);
  const cNum = parseFloat(cogs);
  const eNum = expenses.trim() === "" ? 0 : parseFloat(expenses);

  const hasBaseInputs =
    !Number.isNaN(rNum) &&
    !Number.isNaN(cNum) &&
    !Number.isNaN(eNum) &&
    rNum > 0 &&
    cNum >= 0 &&
    eNum >= 0;

  const result: ProfitMarginResult = useMemo(() => {
    if (!hasBaseInputs) return EMPTY_RESULT;
    return calculateProfitMargin(rNum, cNum, eNum);
  }, [rNum, cNum, eNum, hasBaseInputs]);

  const canUseResult = hasBaseInputs && result.isValid;

  const handleCopy = () => {
    if (!canUseResult) return;

    const text = `Profit Margin Summary
Revenue: $${formatCurrency(rNum, precision)}
COGS: $${formatCurrency(cNum, precision)}
Operating Expenses: $${formatCurrency(eNum, precision)}

Gross Profit: $${formatCurrency(result.grossProfit, precision)}
Gross Margin: ${formatPercentage(result.grossMargin, precision)}%
Net Profit: $${formatCurrency(result.netProfit, precision)}
Net Margin: ${formatPercentage(result.netMargin, precision)}%`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!canUseResult) return;
    const csvContent = generateCSV(rNum, cNum, eNum, result);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!canUseResult) return;

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      revenue: rNum,
      cogs: cNum,
      expenses: eNum,
      grossProfit: result.grossProfit,
      grossMargin: result.grossMargin,
      netProfit: result.netProfit,
      netMargin: result.netMargin,
    };

    saveToHistory(entry);
    setHistory(getHistory());
  }, [rNum, cNum, eNum, result, canUseResult]);

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

  const handleExample = (example: { revenue: number; cogs: number; expenses: number }) => {
    setRevenue(example.revenue.toString());
    setCogs(example.cogs.toString());
    setExpenses(example.expenses.toString());
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Revenue</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 1000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Cost of Goods Sold (COGS)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  value={cogs}
                  onChange={(e) => setCogs(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Operating Expenses (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Decimal Precision</label>
              <div className="flex gap-2">
                {[0, 2, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      precision === p
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Examples</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Retail", revenue: 10000, cogs: 7000, expenses: 1500 },
                  { label: "SaaS", revenue: 25000, cogs: 5000, expenses: 9000 },
                  { label: "Cafe", revenue: 6000, cogs: 2800, expenses: 2200 },
                ].map((example) => (
                  <button
                    key={example.label}
                    onClick={() => handleExample(example)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            {result.warnings.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Input Warning</p>
                <ul className="space-y-1 text-sm text-amber-700">
                  {result.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 flex flex-col items-center justify-center text-center space-y-3 flex-grow shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Net Profit Margin</span>
              {canUseResult ? (
                <>
                  <h2 className={`text-5xl font-black leading-none ${result.netMargin >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {formatPercentage(result.netMargin, precision)}%
                  </h2>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 font-semibold">
                      <span>Net Profit</span>
                      <span className={result.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}>
                        ${formatCurrency(result.netProfit, precision)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 font-semibold">
                      <span>Gross Profit</span>
                      <span className={result.grossProfit >= 0 ? "text-emerald-600" : "text-red-600"}>
                        ${formatCurrency(result.grossProfit, precision)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-300 italic">Enter values...</span>
              )}
              <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">%</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Gross Margin</span>
                <span className={`font-bold ${result.grossMargin >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {canUseResult ? `${formatPercentage(result.grossMargin, precision)}%` : "0.00%"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Net Margin</span>
                <span className={`font-bold ${result.netMargin >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {canUseResult ? `${formatPercentage(result.netMargin, precision)}%` : "0.00%"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Formula</span>
                <code className="bg-white px-2 py-1 rounded border border-gray-200">Margin = (Profit / Revenue) × 100</code>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleCopy}
            disabled={!canUseResult}
            className="flex-1 min-w-[150px] px-6 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {copied ? "Copied" : "Copy Summary"}
          </button>

          <button
            onClick={handleDownloadCSV}
            disabled={!canUseResult}
            className="px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all disabled:opacity-50"
          >
            Download CSV
          </button>

          <button
            onClick={handleSaveToHistory}
            disabled={!canUseResult}
            className="px-6 py-4 bg-white border-2 border-gray-100 hover:border-primary hover:text-primary text-gray-700 font-bold rounded-2xl transition-all disabled:opacity-50"
          >
            Save
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-4 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-500 text-gray-600 font-bold rounded-2xl transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      {isClient && history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-gray-100 rounded-lg">🕒</span>
              Recent Calculations
            </h3>
            <button
              onClick={handleClearHistory}
              className="text-sm font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="group p-4 bg-gray-50/60 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <button
                    onClick={() => handleDeleteHistory(entry.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete history item"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1.5 mb-4 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Revenue</span>
                    <span className="font-semibold text-gray-800">${formatCurrency(entry.revenue, 2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Gross Margin</span>
                    <span className={`font-semibold ${entry.grossMargin >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {formatPercentage(entry.grossMargin, 2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Net Margin</span>
                    <span className={`font-semibold ${entry.netMargin >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {formatPercentage(entry.netMargin, 2)}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleLoadHistory(entry)}
                  className="w-full py-2 rounded-xl bg-white border border-gray-200 hover:border-primary hover:text-primary text-gray-700 text-xs font-bold transition-all"
                >
                  Load Values
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools
          currentTool="profit-margin-calculator"
          tools={[
            "discount-calculator",
            "percentage-calculator",
            "investment-return-calculator",
            "simple-interest-calculator",
            "compound-interest-calculator",
          ]}
        />
      </div>
    </div>
  );
}
