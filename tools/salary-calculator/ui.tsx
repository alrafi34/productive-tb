"use client";

import { useState, useEffect, useMemo } from "react";
import {
  SalaryResult,
  SalarySettings,
  calculateSalary,
  formatCurrency,
  formatNumber,
  getSettings,
  saveSettings,
  getSalaryHistory,
  addToHistory,
  clearHistory
} from "./logic";
import SalaryCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'INR', symbol: '₹' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
];

export default function SalaryCalculatorUI() {
  const [salary, setSalary] = useState<string>("60000");
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<string>("40");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<string>("5");
  const [currency, setCurrency] = useState<string>("USD");
  const [precision, setPrecision] = useState<number>(2);
  const [copied, setCopied] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [history, setHistory] = useState<Array<{ salary: number; timestamp: number }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const settings = getSettings();
    setWorkHoursPerWeek(settings.workHoursPerWeek.toString());
    setWorkDaysPerWeek(settings.workDaysPerWeek.toString());
    setCurrency(settings.currency);
    setHistory(getSalaryHistory());
  }, []);

  const salaryNum = parseFloat(salary);
  const hoursNum = parseFloat(workHoursPerWeek);
  const daysNum = parseFloat(workDaysPerWeek);

  const isValid = !isNaN(salaryNum) && !isNaN(hoursNum) && !isNaN(daysNum) &&
    salaryNum > 0 && hoursNum > 0 && daysNum > 0 && daysNum <= 7;

  const result: SalaryResult | null = useMemo(() => {
    if (!isValid) return null;
    return calculateSalary(salaryNum, hoursNum, daysNum);
  }, [salaryNum, hoursNum, daysNum, isValid]);

  const handleSaveSettings = () => {
    const settings: SalarySettings = {
      workHoursPerWeek: hoursNum,
      workDaysPerWeek: daysNum,
      currency
    };
    saveSettings(settings);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleAddToHistory = () => {
    if (!isValid) return;
    addToHistory(salaryNum);
    setHistory(getSalaryHistory());
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    setShowHistory(false);
  };

  const handleLoadFromHistory = (histSalary: number) => {
    setSalary(histSalary.toString());
    setShowHistory(false);
  };

  const handleReset = () => {
    setSalary("");
    setWorkHoursPerWeek("40");
    setWorkDaysPerWeek("5");
  };

  const currencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>Salary Calculator</h2>
            <p className="text-emerald-100 opacity-90 font-medium">Convert annual salary to hourly, daily, weekly, and monthly rates instantly.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none">💰</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Input Panel */}
            <div className="xl:col-span-5 space-y-6">
              {/* Annual Salary */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Annual Salary</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">{currencySymbol}</span>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 60000"
                  />
                </div>
              </div>

              {/* Work Hours & Days */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Hours/Week</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={workHoursPerWeek}
                      onChange={(e) => setWorkHoursPerWeek(e.target.value)}
                      min="1"
                      max="168"
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                      placeholder="40"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">h</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Days/Week</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={workDaysPerWeek}
                      onChange={(e) => setWorkDaysPerWeek(e.target.value)}
                      min="1"
                      max="7"
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                      placeholder="5"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">d</span>
                  </div>
                </div>
              </div>

              {/* Currency & Precision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-lg font-bold text-gray-800 shadow-sm"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Precision</label>
                  <div className="flex gap-2">
                    {[0, 2, 4].map(p => (
                      <button
                        key={p}
                        onClick={() => setPrecision(p)}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${precision === p ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Quick Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {[30000, 50000, 75000, 100000].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setSalary(preset.toString())}
                      className="px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-sm font-semibold text-gray-700 transition-all"
                    >
                      {formatCurrency(preset, 0, currency)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  💾 Save Settings
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-colors"
                >
                  🔄 Reset
                </button>
              </div>

              {/* History */}
              <div className="relative">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>📋 History ({history.length})</span>
                  <span className={`transform transition-transform ${showHistory ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {showHistory && history.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                    <div className="p-3 space-y-2">
                      {history.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLoadFromHistory(item.salary)}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                        >
                          <div className="font-semibold text-gray-900">{formatCurrency(item.salary, 0, currency)}</div>
                          <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</div>
                        </button>
                      ))}
                      <button
                        onClick={handleClearHistory}
                        className="w-full mt-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-lg transition-colors"
                      >
                        Clear History
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Panel */}
            <div className="xl:col-span-7">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-[40px] border-2 border-emerald-100 h-full flex flex-col justify-center gap-8 relative overflow-hidden">
                {isValid && result ? (
                  <>
                    {/* Main Result */}
                    <div className="text-center space-y-2 pb-6 border-b-2 border-emerald-200">
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Hourly Rate</span>
                      <h3 className="text-5xl font-black text-gray-900 leading-tight">
                        {formatCurrency(result.hourly, precision, currency)}
                      </h3>
                      <p className="text-sm text-gray-600">per hour</p>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Monthly</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.monthly, precision, currency)}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Weekly</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.weekly, precision, currency)}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Daily</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.daily, precision, currency)}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Annual</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.annual, precision, currency)}</p>
                      </div>
                    </div>

                    {/* Copy Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <button
                        onClick={() => handleCopy(formatCurrency(result.hourly, precision, currency), "hourly")}
                        className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-sm"
                      >
                        {copied === "hourly" ? "✓ Copied" : "📋 Hourly"}
                      </button>
                      <button
                        onClick={() => {
                          const text = `Annual: ${formatCurrency(result.annual, precision, currency)}\nMonthly: ${formatCurrency(result.monthly, precision, currency)}\nWeekly: ${formatCurrency(result.weekly, precision, currency)}\nDaily: ${formatCurrency(result.daily, precision, currency)}\nHourly: ${formatCurrency(result.hourly, precision, currency)}`;
                          handleCopy(text, "all");
                        }}
                        className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-sm"
                      >
                        {copied === "all" ? "✓ Copied" : "📋 All"}
                      </button>
                    </div>

                    {/* Add to History */}
                    <button
                      onClick={handleAddToHistory}
                      className="w-full px-4 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold rounded-xl transition-colors"
                    >
                      ⭐ Add to History
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg font-medium">Enter a salary to see calculations</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalaryCalculatorSEO />

      <RelatedTools
        currentTool="salary-calculator"
        tools={['discount-calculator', 'percentage-calculator', 'loan-emi-calculator']}
      />
    </div>
  );
}
