"use client";

import { useState, useEffect, useMemo } from "react";
import {
  SalaryResult,
  SalarySettings,
  calculateSalary,
  formatCurrency,
  getSettings,
  saveSettings,
  getSalaryHistory,
  addToHistory,
  clearHistory
} from "./logic";
import SalaryCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "EUR" },
  { code: "GBP", symbol: "GBP" },
  { code: "JPY", symbol: "JPY" },
  { code: "INR", symbol: "INR" },
  { code: "AUD", symbol: "AUD" },
  { code: "CAD", symbol: "CAD" },
];

const SALARY_PRESETS = [30000, 50000, 75000, 100000, 150000, 200000];

type HistoryEntry = { salary: number; timestamp: number };

export default function SalaryCalculatorUI() {
  const [salary, setSalary] = useState<string>("60000");
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<string>("40");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<string>("5");
  const [currency, setCurrency] = useState<string>("USD");
  const [precision, setPrecision] = useState<number>(2);
  const [copied, setCopied] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsClient(true);
      const settings = getSettings();
      setWorkHoursPerWeek(settings.workHoursPerWeek.toString());
      setWorkDaysPerWeek(settings.workDaysPerWeek.toString());
      setCurrency(settings.currency);
      setHistory(getSalaryHistory());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const salaryNum = parseFloat(salary);
  const hoursNum = parseFloat(workHoursPerWeek);
  const daysNum = parseFloat(workDaysPerWeek);

  const isValid =
    !isNaN(salaryNum) &&
    !isNaN(hoursNum) &&
    !isNaN(daysNum) &&
    salaryNum > 0 &&
    hoursNum > 0 &&
    daysNum > 0 &&
    daysNum <= 7;

  const result: SalaryResult | null = useMemo(() => {
    if (!isValid) return null;
    return calculateSalary(salaryNum, hoursNum, daysNum);
  }, [salaryNum, hoursNum, daysNum, isValid]);

  const validationMessage = useMemo(() => {
    if (salary === "" && workHoursPerWeek !== "" && workDaysPerWeek !== "") return "Enter annual salary.";
    if (workHoursPerWeek === "") return "Enter work hours per week.";
    if (workDaysPerWeek === "") return "Enter work days per week.";
    if (!isNaN(daysNum) && daysNum > 7) return "Work days per week cannot exceed 7.";
    if (!isNaN(hoursNum) && hoursNum > 168) return "Work hours per week cannot exceed 168.";
    if (!isValid) return "Please enter valid positive values.";
    return "";
  }, [salary, workHoursPerWeek, workDaysPerWeek, isValid, daysNum, hoursNum]);

  const effectiveDailyHours = useMemo(() => {
    if (!isValid || daysNum === 0) return 0;
    return hoursNum / daysNum;
  }, [isValid, hoursNum, daysNum]);

  const annualWorkHours = useMemo(() => {
    if (!isValid) return 0;
    return hoursNum * 52;
  }, [isValid, hoursNum]);

  const handleSaveSettings = () => {
    if (isNaN(hoursNum) || isNaN(daysNum)) return;

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              Salary Calculator
            </h2>
            <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
              Convert annual salary into monthly, weekly, daily, and hourly rates with custom schedule inputs.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
            <span>Core Formula:</span>
            <code>Hourly = Annual / (52 * Hours/Week)</code>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-5 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Annual Salary</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-bold text-gray-800"
                placeholder="e.g. 60000"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hours Per Week</label>
                <input
                  type="number"
                  value={workHoursPerWeek}
                  onChange={(e) => setWorkHoursPerWeek(e.target.value)}
                  min="1"
                  max="168"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-base font-bold text-gray-800"
                  placeholder="40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Days Per Week</label>
                <input
                  type="number"
                  value={workDaysPerWeek}
                  onChange={(e) => setWorkDaysPerWeek(e.target.value)}
                  min="1"
                  max="7"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-base font-bold text-gray-800"
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-base font-semibold text-gray-800"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Decimal Precision</label>
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
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Salary Presets</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SALARY_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSalary(preset.toString())}
                    className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {formatCurrency(preset, 0, currency)}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 space-y-1">
              <p className="text-xs text-emerald-700 font-semibold">Schedule Insight</p>
              <p className="text-sm text-emerald-900">
                {isValid
                  ? `At ${hoursNum.toFixed(1)} hours/week across ${daysNum.toFixed(1)} days, your average workday is ${effectiveDailyHours.toFixed(2)} hours.`
                  : "Enter valid salary and schedule values to view a schedule insight."}
              </p>
            </div>
          </div>

          <div className="xl:col-span-7 flex flex-col gap-4">
            {validationMessage && !isValid && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                {validationMessage}
              </div>
            )}

            <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-primary/15 shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/70">Primary Output</span>
              {isValid && result ? (
                <>
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 font-medium">Estimated Hourly Rate</p>
                    <h3 className="text-5xl font-black text-gray-900 leading-tight">
                      {formatCurrency(result.hourly, precision, currency)}
                    </h3>
                  </div>
                  <div className="mt-5 h-3 rounded-full overflow-hidden bg-white/80 border border-white">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: "100%" }} />
                  </div>
                </>
              ) : (
                <span className="block mt-4 text-2xl font-bold text-gray-300 italic">Enter valid values...</span>
              )}
              <div className="absolute -right-8 -bottom-6 text-8xl text-primary opacity-5 select-none font-black">PAY</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly</p>
                <p className="text-xl font-bold text-gray-900">
                  {isValid && result ? formatCurrency(result.monthly, precision, currency) : "-"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Weekly</p>
                <p className="text-xl font-bold text-gray-900">
                  {isValid && result ? formatCurrency(result.weekly, precision, currency) : "-"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Daily</p>
                <p className="text-xl font-bold text-gray-900">
                  {isValid && result ? formatCurrency(result.daily, precision, currency) : "-"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Annual</p>
                <p className="text-xl font-bold text-gray-900">
                  {isValid && result ? formatCurrency(result.annual, precision, currency) : "-"}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Annual Work Hours</span>
                <span className="font-bold">{isValid ? annualWorkHours.toFixed(2) : "0.00"}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold">Formula</span>
                <code className="bg-white px-2 py-1 rounded border border-gray-200">Weekly = Annual / 52</code>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-8">
          <button
            onClick={handleSaveSettings}
            className="flex-1 min-w-[150px] px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all"
          >
            Save Settings
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3.5 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-500 text-gray-600 font-bold rounded-2xl transition-all"
          >
            Reset
          </button>

          <button
            onClick={handleAddToHistory}
            disabled={!isValid}
            className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
              isValid
                ? "bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Salary
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-6 py-3.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all"
          >
            {showHistory ? "Hide" : "Show"} History ({history.length})
          </button>

          <button
            onClick={() => {
              if (!result) return;
              handleCopy(formatCurrency(result.hourly, precision, currency), "hourly");
            }}
            disabled={!result}
            className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
              !result
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : copied === "hourly"
                ? "bg-emerald-600 text-white"
                : "bg-teal-50 border border-teal-100 text-teal-700 hover:bg-teal-100"
            }`}
          >
            {copied === "hourly" ? "Copied" : "Copy Hourly"}
          </button>

          <button
            onClick={() => {
              if (!result) return;
              const text = `Annual: ${formatCurrency(result.annual, precision, currency)}\nMonthly: ${formatCurrency(result.monthly, precision, currency)}\nWeekly: ${formatCurrency(result.weekly, precision, currency)}\nDaily: ${formatCurrency(result.daily, precision, currency)}\nHourly: ${formatCurrency(result.hourly, precision, currency)}`;
              handleCopy(text, "all");
            }}
            disabled={!result}
            className={`px-6 py-3.5 font-bold rounded-2xl transition-all ${
              !result
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : copied === "all"
                ? "bg-emerald-600 text-white"
                : "bg-teal-50 border border-teal-100 text-teal-700 hover:bg-teal-100"
            }`}
          >
            {copied === "all" ? "Copied" : "Copy Summary"}
          </button>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
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
            <h3 className="text-lg font-bold text-gray-900">Recent Salaries</h3>
            <p className="text-xs text-gray-500 font-medium">Local browser history only</p>
          </div>

          {!isClient || history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              No saved salaries yet. Use <span className="font-semibold text-gray-700">Save Salary</span> to store entries.
            </div>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-y-auto">
              {history.map((item, idx) => (
                <button
                  key={`${item.timestamp}-${idx}`}
                  onClick={() => handleLoadFromHistory(item.salary)}
                  className="w-full text-left p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all"
                >
                  <div className="text-sm font-bold text-gray-800">
                    {formatCurrency(item.salary, 0, currency)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <SalaryCalculatorSEO />

      <RelatedTools
        currentTool="salary-calculator"
        tools={["discount-calculator", "percentage-calculator", "loan-emi-calculator"]}
      />
    </div>
  );
}
