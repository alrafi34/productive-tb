"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  CompoundingFrequency,
  HistoryEntry,
  calculateCompoundInterest,
  formatCurrency,
  generateChartData,
  generateCSV,
  downloadCSV,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const frequencyLabel: Record<CompoundingFrequency, string> = {
  annual: "Annual",
  "semi-annual": "Semi-Annual",
  quarterly: "Quarterly",
  monthly: "Monthly",
  daily: "Daily",
};

const periodsPerYear: Record<CompoundingFrequency, number> = {
  annual: 1,
  "semi-annual": 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export default function CompoundInterestCalculatorUI() {
  const [principal, setPrincipal] = useState<string>("10000");
  const [rate, setRate] = useState<string>("7");
  const [time, setTime] = useState<string>("10");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("monthly");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsClient(true);
      setHistory(getHistory());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const pNum = parseFloat(principal);
  const rNum = parseFloat(rate);
  const tNum = parseFloat(time);

  const isValid = !isNaN(pNum) && !isNaN(rNum) && !isNaN(tNum) && pNum > 0 && rNum >= 0 && tNum > 0;

  const result = useMemo(() => {
    if (!isValid) return { futureValue: 0, interestEarned: 0, yearlyBreakdown: [] };
    return calculateCompoundInterest(pNum, rNum, tNum, frequency);
  }, [pNum, rNum, tNum, frequency, isValid]);

  const chartData = useMemo(() => generateChartData(result.yearlyBreakdown), [result.yearlyBreakdown]);

  const maxValue = useMemo(() => {
    if (!chartData.length) return 1;
    return Math.max(...chartData.map((d) => d.total), 1);
  }, [chartData]);

  const growthMultiple = useMemo(() => {
    if (!isValid || pNum <= 0) return 0;
    return result.futureValue / pNum;
  }, [isValid, pNum, result.futureValue]);

  const effectiveAnnualRate = useMemo(() => {
    if (!isValid) return 0;
    const n = periodsPerYear[frequency];
    const annualRateDecimal = rNum / 100;
    return (Math.pow(1 + annualRateDecimal / n, n) - 1) * 100;
  }, [isValid, frequency, rNum]);

  const principalShare = useMemo(() => {
    if (!isValid || result.futureValue <= 0) return 0;
    return (pNum / result.futureValue) * 100;
  }, [isValid, pNum, result.futureValue]);

  const interestShare = useMemo(() => {
    if (!isValid || result.futureValue <= 0) return 0;
    return (result.interestEarned / result.futureValue) * 100;
  }, [isValid, result.futureValue, result.interestEarned]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = `Compound Interest Summary\nPrincipal: $${formatCurrency(pNum, precision)}\nRate: ${rNum}%\nTime: ${tNum} years\nCompounding: ${frequencyLabel[frequency]}\nFuture Value: $${formatCurrency(result.futureValue, precision)}\nInterest Earned: $${formatCurrency(result.interestEarned, precision)}\nGrowth Multiple: ${growthMultiple.toFixed(3)}x`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!isValid || !result.yearlyBreakdown.length) return;
    const csvContent = generateCSV(result.yearlyBreakdown, pNum, rNum, frequency);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      principal: pNum,
      rate: rNum,
      time: tNum,
      frequency,
      futureValue: result.futureValue,
      interestEarned: result.interestEarned,
    };

    saveToHistory(entry);
    setHistory(getHistory());
  }, [pNum, rNum, tNum, frequency, result, isValid]);

  const handleClear = () => {
    setPrincipal("");
    setRate("");
    setTime("");
  };

  const setScenario = (scenario: { principal: number; rate: number; time: number; frequency: CompoundingFrequency }) => {
    setPrincipal(scenario.principal.toString());
    setRate(scenario.rate.toString());
    setTime(scenario.time.toString());
    setFrequency(scenario.frequency);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Principal Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 10000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Annual Rate (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                    placeholder="e.g. 7"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Time (Years)</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Compounding Frequency</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  ["annual", "semi-annual", "quarterly", "monthly", "daily"] as CompoundingFrequency[]
                ).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`py-2 rounded-lg text-sm font-semibold border transition-all ${
                      frequency === f
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {frequencyLabel[f]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Decimal Precision</label>
              <div className="flex gap-2">
                {[0, 2, 4, 6].map((p) => (
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
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Scenarios</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Starter", principal: 5000, rate: 5, time: 10, frequency: "annual" as CompoundingFrequency },
                  { label: "Monthly Growth", principal: 10000, rate: 8, time: 15, frequency: "monthly" as CompoundingFrequency },
                  { label: "Long Horizon", principal: 20000, rate: 7, time: 25, frequency: "quarterly" as CompoundingFrequency },
                ].map((scenario) => (
                  <button
                    key={scenario.label}
                    onClick={() => setScenario(scenario)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 flex flex-col items-center justify-center text-center space-y-3 flex-grow shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Future Value</span>
              {isValid ? (
                <>
                  <h2 className="text-5xl font-black text-gray-900 leading-none">
                    ${formatCurrency(result.futureValue, precision)}
                  </h2>
                  <div className="w-full max-w-xs space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Interest Earned</p>
                    <p className="text-2xl font-bold text-primary">${formatCurrency(result.interestEarned, precision)}</p>
                  </div>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-300 italic">Enter values...</span>
              )}
              <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">CI</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Growth multiple</span>
                <span className="font-bold">{isValid ? `${growthMultiple.toFixed(3)}x` : "0.000x"}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Effective annual rate</span>
                <span className="font-bold">{isValid ? `${effectiveAnnualRate.toFixed(3)}%` : "0.000%"}</span>
              </div>
              {isValid && result.futureValue > 0 && (
                <>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                    <div className="bg-sky-500 h-full" style={{ width: `${principalShare}%` }} />
                    <div className="bg-emerald-500 h-full" style={{ width: `${interestShare}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                    <span>Principal {principalShare.toFixed(1)}%</span>
                    <span>Interest {interestShare.toFixed(1)}%</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {isValid && chartData.length > 0 && isClient && (
          <div className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Growth Preview</h3>
              <button
                onClick={() => setShowChart((prev) => !prev)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                {showChart ? "Hide" : "Show"}
              </button>
            </div>
            {showChart && (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {chartData.slice(0, 12).map((data) => {
                  const widthPercentage = (data.total / maxValue) * 100;
                  return (
                    <div key={data.year} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 w-10">Y{data.year}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full"
                          style={{ width: `${widthPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-24 text-right">
                        ${formatCurrency(data.total, 0)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleCopy}
            disabled={!isValid}
            className="flex-1 min-w-[150px] px-6 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {copied ? "Copied" : "Copy Summary"}
          </button>

          <button
            onClick={handleDownloadCSV}
            disabled={!isValid || !result.yearlyBreakdown.length}
            className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all disabled:opacity-50"
          >
            Download CSV
          </button>

          <button
            onClick={handleSaveToHistory}
            disabled={!isValid}
            className="px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all disabled:opacity-50"
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

      {isValid && result.yearlyBreakdown.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <span className="p-1.5 bg-gray-100 rounded-lg">📊</span>
            Yearly Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Principal</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Interest</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.slice(0, 20).map((row) => (
                  <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-semibold text-gray-800">{row.year}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-600">${formatCurrency(row.principal, precision)}</td>
                    <td className="py-3 px-4 text-right font-semibold text-emerald-600">${formatCurrency(row.interest, precision)}</td>
                    <td className="py-3 px-4 text-right font-bold text-primary">${formatCurrency(row.total, precision)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.yearlyBreakdown.length > 20 && (
              <p className="text-center text-xs text-gray-500 mt-3">Showing first 20 years. Download CSV for full data.</p>
            )}
          </div>
        </div>
      )}

      {isClient && history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-gray-100 rounded-lg">🕒</span>
              Recent Calculations
            </h3>
            <button
              onClick={() => {
                clearHistory();
                setHistory([]);
              }}
              className="text-sm font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear History
            </button>
          </div>

          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="text-sm font-bold text-gray-800">
                      ${formatCurrency(entry.principal, 0)} @ {entry.rate}% for {entry.time} years ({frequencyLabel[entry.frequency]})
                    </div>
                    <div className="text-xs text-gray-500">
                      Future value: <span className="font-semibold text-primary">${formatCurrency(entry.futureValue, 2)}</span> | Interest:{" "}
                      <span className="font-semibold text-emerald-600">${formatCurrency(entry.interestEarned, 2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteHistoryEntry(entry.id);
                    setHistory(getHistory());
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white rounded-xl shadow-sm border border-gray-100"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools
          currentTool="compound-interest-calculator"
          tools={["simple-interest-calculator", "mortgage-calculator", "loan-emi-calculator"]}
        />
      </div>
    </div>
  );
}
