"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  InterestHistoryEntry,
  calculateSimpleInterest,
  formatCurrency,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  TimeUnit,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SimpleInterestCalculatorUI() {
  const [principal, setPrincipal] = useState<string>("1000");
  const [rate, setRate] = useState<string>("5");
  const [time, setTime] = useState<string>("3");
  const [unit, setUnit] = useState<TimeUnit>("years");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<InterestHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

  const { interest, total } = useMemo(() => {
    if (!isValid) return { interest: 0, total: 0 };
    return calculateSimpleInterest(pNum, rNum, tNum, unit);
  }, [pNum, rNum, tNum, unit, isValid]);

  const timeInYears = useMemo(() => {
    if (!isValid) return 0;
    if (unit === "months") return tNum / 12;
    if (unit === "days") return tNum / 365;
    return tNum;
  }, [isValid, tNum, unit]);

  const principalShare = useMemo(() => {
    if (!isValid || total <= 0) return 0;
    return (pNum / total) * 100;
  }, [isValid, pNum, total]);

  const interestShare = useMemo(() => {
    if (!isValid || total <= 0) return 0;
    return (interest / total) * 100;
  }, [isValid, interest, total]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = `Simple Interest Summary
Principal: $${formatCurrency(pNum, precision)}
Rate: ${rNum}%
Time: ${tNum} ${unit}
Time in years: ${timeInYears.toFixed(6)}
Interest: $${formatCurrency(interest, precision)}
Total Amount: $${formatCurrency(total, precision)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;

    const entry: InterestHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      principal: pNum,
      rate: rNum,
      time: tNum,
      unit,
      interest,
      total,
    };

    saveToHistory(entry);
    setHistory(getHistory());
  }, [pNum, rNum, tNum, unit, interest, total, isValid]);

  const handleClear = () => {
    setPrincipal("");
    setRate("");
    setTime("");
  };

  const handleExample = (sample: { principal: number; rate: number; time: number; unit: TimeUnit }) => {
    setPrincipal(sample.principal.toString());
    setRate(sample.rate.toString());
    setTime(sample.time.toString());
    setUnit(sample.unit);
  };

  return (
    <div className="max-w-5xl mx-auto">
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
                  placeholder="e.g. 1000"
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
                    placeholder="e.g. 5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Time Value</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                  placeholder="e.g. 3"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time Unit</label>
              <div className="grid grid-cols-3 gap-2">
                {(["years", "months", "days"] as TimeUnit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`py-2 rounded-lg text-sm font-semibold border transition-all ${
                      unit === u
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {u[0].toUpperCase() + u.slice(1)}
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
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Examples</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Loan 1Y", principal: 5000, rate: 8, time: 1, unit: "years" as TimeUnit },
                  { label: "Savings 3Y", principal: 20000, rate: 6, time: 3, unit: "years" as TimeUnit },
                  { label: "180 Days", principal: 2500, rate: 7, time: 180, unit: "days" as TimeUnit },
                ].map((sample) => (
                  <button
                    key={sample.label}
                    onClick={() => handleExample(sample)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 flex flex-col items-center justify-center text-center space-y-3 flex-grow shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Simple Interest</span>
              {isValid ? (
                <>
                  <h2 className="text-5xl font-black text-gray-900 leading-none">
                    ${formatCurrency(interest, precision)}
                  </h2>
                  <div className="w-full max-w-xs">
                    <p className="text-xs text-gray-500 font-medium">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${formatCurrency(total, precision)}</p>
                  </div>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-300 italic">Enter values...</span>
              )}
              <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">%</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Time in years</span>
                <span className="font-bold">{isValid ? timeInYears.toFixed(6) : "0.000000"}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Formula</span>
                <code className="bg-white px-2 py-1 rounded border border-gray-200">SI = (P * R * T) / 100</code>
              </div>

              {isValid && total > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                    <div
                      className="bg-sky-500 h-full"
                      style={{ width: `${principalShare}%` }}
                    />
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${interestShare}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                    <span>Principal {principalShare.toFixed(1)}%</span>
                    <span>Interest {interestShare.toFixed(1)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleCopy}
            disabled={!isValid}
            className="flex-1 min-w-[150px] px-6 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {copied ? "Copied" : "Copy Summary"}
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
                      ${formatCurrency(entry.principal, 0)} @ {entry.rate}% for {entry.time} {entry.unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      Interest: <span className="font-semibold text-primary">${formatCurrency(entry.interest, 2)}</span> | Total:{" "}
                      <span className="font-semibold text-gray-700">${formatCurrency(entry.total, 2)}</span>
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
          currentTool="simple-interest-calculator"
          tools={["compound-interest-calculator", "mortgage-calculator", "loan-emi-calculator"]}
        />
      </div>
    </div>
  );
}
