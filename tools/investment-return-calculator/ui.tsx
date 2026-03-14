"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Currency,
  HistoryEntry,
  calculateROI,
  formatCurrency,
  formatPercentage,
  generateCSV,
  downloadCSV,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function InvestmentROICalculatorUI() {
  const [initialInvestment, setInitialInvestment] = useState<string>("1000");
  const [currentValue, setCurrentValue] = useState<string>("1200");
  const [currency, setCurrency] = useState<Currency>("$");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const initialNum = parseFloat(initialInvestment);
  const currentNum = parseFloat(currentValue);

  const isValid = !isNaN(initialNum) && !isNaN(currentNum) && initialNum > 0;

  const result = useMemo(() => {
    if (!isValid) return { gainLoss: 0, roiPercentage: 0, isProfit: true };
    return calculateROI(initialNum, currentNum);
  }, [initialNum, currentNum, isValid]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = `Initial Investment: ${formatCurrency(initialNum, currency, precision)}\nCurrent Value: ${formatCurrency(currentNum, currency, precision)}\nGain/Loss: ${result.isProfit ? "" : "-"}${formatCurrency(result.gainLoss, currency, precision)}\nROI: ${formatPercentage(result.roiPercentage, precision)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (history.length === 0) return;
    const csvContent = generateCSV(history);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      initialInvestment: initialNum,
      currentValue: currentNum,
      gainLoss: result.gainLoss,
      roiPercentage: result.roiPercentage,
      currency
    };

    saveToHistory(entry);
    setHistory(getHistory());
  }, [initialNum, currentNum, result, currency, isValid]);

  const handleClear = () => {
    setInitialInvestment("");
    setCurrentValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveToHistory();
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Investment ROI Calculator
            </h2>
            <p className="text-emerald-100 opacity-90 font-medium">
              Calculate your investment gain or loss percentage instantly.
            </p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none italic">💹</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Input Side */}
            <div className="xl:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  Initial Investment
                </label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  Current Value
                </label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 1200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-lg font-bold text-gray-800 shadow-sm"
                >
                  <option value="$">US Dollar ($)</option>
                  <option value="€">Euro (€)</option>
                  <option value="£">British Pound (£)</option>
                  <option value="¥">Japanese Yen (¥)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">
                  Decimal Precision
                </label>
                <div className="flex gap-2">
                  {[0, 2, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrecision(p)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        precision === p
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-lg"
                          : "bg-white border-gray-100 text-gray-500 hover:border-emerald-200"
                      }`}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                      Gain/Loss
                    </span>
                    <h3
                      className={`text-4xl font-black leading-tight ${
                        result.isProfit ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {result.isProfit ? "+" : "-"}
                      {formatCurrency(result.gainLoss, currency, precision)}
                    </h3>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-teal-600 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                      ROI Percentage
                    </span>
                    <h3
                      className={`text-4xl font-black leading-tight ${
                        result.isProfit ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {result.isProfit ? "+" : ""}
                      {formatPercentage(result.roiPercentage, precision)}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-3 z-10">
                  <button
                    onClick={handleCopy}
                    disabled={!isValid}
                    className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : isValid
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {copied ? "✓ Copied!" : "Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveToHistory}
                    disabled={!isValid}
                    className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                      isValid
                        ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save to History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3 flex-wrap">
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              Clear Inputs
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-200 transition-all"
            >
              {showHistory ? "Hide" : "Show"} History ({history.length})
            </button>
            {history.length > 0 && (
              <button
                onClick={handleDownloadCSV}
                className="px-6 py-3 bg-teal-100 text-teal-700 rounded-2xl font-bold hover:bg-teal-200 transition-all"
              >
                Download CSV
              </button>
            )}
            {history.length > 0 && (
              <button
                onClick={() => {
                  clearHistory();
                  setHistory([]);
                }}
                className="px-6 py-3 bg-red-100 text-red-700 rounded-2xl font-bold hover:bg-red-200 transition-all"
              >
                Clear History
              </button>
            )}
          </div>

          {/* History Section */}
          {showHistory && history.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Calculation History</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        {new Date(entry.timestamp).toLocaleString()}
                      </p>
                      <p className="font-bold text-gray-900">
                        {formatCurrency(entry.initialInvestment, entry.currency, 2)} →{" "}
                        {formatCurrency(entry.currentValue, entry.currency, 2)}
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          entry.gainLoss >= 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {entry.gainLoss >= 0 ? "+" : ""}
                        {formatCurrency(entry.gainLoss, entry.currency, 2)} ({entry.roiPercentage.toFixed(2)}%)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        deleteHistoryEntry(entry.id);
                        setHistory(getHistory());
                      }}
                      className="ml-4 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToolSEOContent />
      <RelatedTools currentTool="investment-return-calculator" tools={["simple-interest-calculator", "compound-interest-calculator", "discount-calculator", "percentage-calculator", "loan-emi-calculator"]} />
    </div>
  );
}
