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

const quickScenarios = [
  { label: "Stock Gain", initial: 1000, current: 1240 },
  { label: "Crypto Drop", initial: 5000, current: 3400 },
  { label: "Fund Return", initial: 12000, current: 14160 },
  { label: "Business ROI", initial: 25000, current: 31750 }
];

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
    const frame = window.requestAnimationFrame(() => {
      setIsClient(true);
      setHistory(getHistory());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const initialNum = parseFloat(initialInvestment);
  const currentNum = parseFloat(currentValue);

  const isValid = !isNaN(initialNum) && !isNaN(currentNum) && initialNum > 0;

  const result = useMemo(() => {
    if (!isValid) return { gainLoss: 0, roiPercentage: 0, isProfit: true };
    return calculateROI(initialNum, currentNum);
  }, [initialNum, currentNum, isValid]);

  const absoluteROI = useMemo(() => Math.abs(result.roiPercentage), [result.roiPercentage]);
  const progressWidth = useMemo(() => Math.min(100, absoluteROI), [absoluteROI]);

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

  const handleScenario = (scenario: { initial: number; current: number }) => {
    setInitialInvestment(String(scenario.initial));
    setCurrentValue(String(scenario.current));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveToHistory();
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              Investment Return (ROI) Calculator
            </h2>
            <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
              Estimate gain/loss and ROI percentage for stocks, crypto, real estate, or business projects.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
            <span>ROI Formula:</span>
            <code>(Current - Initial) / Initial * 100</code>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-5 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Initial Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  {currency}
                </span>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 1000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Current Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  {currency}
                </span>
                <input
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 1200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-base font-semibold text-gray-800"
                >
                  <option value="$">US Dollar ($)</option>
                  <option value="€">Euro (€)</option>
                  <option value="£">British Pound (£)</option>
                  <option value="¥">Japanese Yen (¥)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Decimal Precision
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 2, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrecision(p)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
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
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Scenarios</label>
              <div className="flex flex-wrap gap-2">
                {quickScenarios.map((scenario) => (
                  <button
                    key={scenario.label}
                    onClick={() => handleScenario(scenario)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs text-emerald-700 font-semibold mb-1">Interpretation</p>
              <p className="text-sm text-emerald-900">
                Positive ROI means your current value is above your initial investment. Negative ROI means you are below your initial capital.
              </p>
            </div>
          </div>

          <div className="xl:col-span-7 flex flex-col gap-4">
            <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Investment Performance</span>
              {isValid ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Gain / Loss</p>
                      <h3 className={`text-4xl font-black leading-tight ${result.isProfit ? "text-emerald-600" : "text-red-600"}`}>
                        {result.isProfit ? "+" : "-"}
                        {formatCurrency(result.gainLoss, currency, precision)}
                      </h3>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">ROI Percentage</p>
                      <h3 className={`text-4xl font-black leading-tight ${result.isProfit ? "text-emerald-600" : "text-red-600"}`}>
                        {result.roiPercentage > 0 ? "+" : ""}
                        {formatPercentage(result.roiPercentage, precision)}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-600">ROI Strength</span>
                      <span className={result.isProfit ? "text-emerald-700" : "text-red-700"}>
                        {absoluteROI.toFixed(precision)}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden bg-white/80 border border-white">
                      <div
                        className={`h-full transition-all duration-500 ${result.isProfit ? "bg-emerald-500" : "bg-red-500"}`}
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <span className="block mt-4 text-2xl font-bold text-gray-300 italic">Enter valid values...</span>
              )}
              <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">ROI</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Initial Investment</p>
                <p className="text-xl font-bold text-gray-900">
                  {isValid ? formatCurrency(initialNum, currency, precision) : `${currency}0`}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current Value</p>
                <p className="text-xl font-bold text-gray-900">
                  {isValid ? formatCurrency(currentNum, currency, precision) : `${currency}0`}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Formula</span>
                <code className="bg-white px-2 py-1 rounded border border-gray-200">ROI = (Gain / Initial) * 100</code>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Gain/Loss</span>
                <span className="font-bold">{isValid ? `${currency}${Math.abs(result.gainLoss).toFixed(precision)}` : `${currency}0.00`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-8">
          <button
            onClick={handleCopy}
            disabled={!isValid}
            className={`flex-1 min-w-[170px] px-6 py-3.5 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${
              copied
                ? "bg-emerald-600 text-white"
                : isValid
                ? "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {copied ? "Copied" : "Copy Summary"}
          </button>

          <button
            onClick={handleSaveToHistory}
            disabled={!isValid}
            className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
              isValid
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-3.5 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-500 text-gray-600 font-bold rounded-2xl transition-all"
          >
            Clear
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-6 py-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all"
          >
            {showHistory ? "Hide" : "Show"} History ({history.length})
          </button>

          {history.length > 0 && (
            <button
              onClick={handleDownloadCSV}
              className="px-6 py-3.5 bg-teal-50 border border-teal-100 text-teal-700 rounded-2xl font-bold hover:bg-teal-100 transition-all"
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
              className="px-6 py-3.5 bg-red-50 border border-red-100 text-red-700 rounded-2xl font-bold hover:bg-red-100 transition-all"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {showHistory && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-gray-100 rounded-lg">🕒</span>
              Recent Calculations
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Local browser history only
            </p>
          </div>

          {!isClient || history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              No saved calculations yet. Use <span className="font-semibold text-gray-700">Save</span> to store ROI entries.
            </div>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-y-auto">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                    <div className="text-sm font-bold text-gray-800">
                      {formatCurrency(entry.initialInvestment, entry.currency, 2)} to{" "}
                      {formatCurrency(entry.currentValue, entry.currency, 2)}
                    </div>
                    <div className={`text-xs ${entry.gainLoss >= 0 ? "text-emerald-700" : "text-red-700"} font-semibold`}>
                      {entry.gainLoss >= 0 ? "+" : ""}
                      {formatCurrency(entry.gainLoss, entry.currency, 2)} ({entry.roiPercentage.toFixed(2)}%)
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deleteHistoryEntry(entry.id);
                      setHistory(getHistory());
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-white rounded-xl shadow-sm border border-gray-100"
                    aria-label="Delete history entry"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools currentTool="investment-return-calculator" tools={["simple-interest-calculator", "compound-interest-calculator", "discount-calculator", "percentage-calculator", "loan-emi-calculator"]} />
    </div>
  );
}
