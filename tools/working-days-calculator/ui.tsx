"use client";

import { useState, useEffect } from "react";
import {
  calculateWorkingDays,
  parseHolidays,
  getTodayString,
  getDatePlusWeeks,
  formatResultText,
  commonHolidays,
  getWeekendDescription,
  WorkingDaysResult,
  WeekendType
} from "./logic";
import WorkingDaysCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WorkingDaysCalculatorUI() {
  const [startDate, setStartDate] = useState<string>(getTodayString());
  const [endDate, setEndDate] = useState<string>(getDatePlusWeeks(2));
  const [holidayText, setHolidayText] = useState<string>("");
  const [includeStartDate, setIncludeStartDate] = useState<boolean>(true);
  const [weekendType, setWeekendType] = useState<WeekendType>('two-day');
  const [result, setResult] = useState<WorkingDaysResult | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate working days whenever inputs change
  useEffect(() => {
    if (startDate && endDate) {
      try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          setError("Invalid date format");
          setResult(null);
          return;
        }

        if (start > end) {
          setError("End date must be after start date");
          setResult(null);
          return;
        }

        const holidays = parseHolidays(holidayText);
        const calculationResult = calculateWorkingDays(start, end, holidays, includeStartDate, weekendType);
        
        setResult(calculationResult);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    } else {
      setResult(null);
      setError("");
    }
  }, [startDate, endDate, holidayText, includeStartDate, weekendType]);

  const handleClear = () => {
    setStartDate(getTodayString());
    setEndDate(getDatePlusWeeks(2));
    setHolidayText("");
    setIncludeStartDate(true);
    setWeekendType('two-day');
    setError("");
  };

  const handleCopy = () => {
    if (!result) return;
    const text = formatResultText(result, weekendType);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setQuickRange = (weeks: number) => {
    setStartDate(getTodayString());
    setEndDate(getDatePlusWeeks(weeks));
  };

  const addCommonHolidays = (country: 'us' | 'uk') => {
    const holidays = commonHolidays[country];
    const holidayDates = holidays.map(h => h.date).join('\n');
    setHolidayText(prev => prev ? `${prev}\n${holidayDates}` : holidayDates);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Weekend Configuration
                </label>
                <select
                  value={weekendType}
                  onChange={(e) => setWeekendType(e.target.value as WeekendType)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="two-day">2-Day Weekend (Sat & Sun)</option>
                  <option value="one-day-saturday">1-Day Weekend (Saturday)</option>
                  <option value="one-day-sunday">1-Day Weekend (Sunday)</option>
                  <option value="none">No Weekends (7-Day Work Week)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Current: {getWeekendDescription(weekendType)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeStartDate"
                  checked={includeStartDate}
                  onChange={(e) => setIncludeStartDate(e.target.checked)}
                  className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                />
                <label htmlFor="includeStartDate" className="text-sm text-gray-700 font-medium">
                  Include start date in calculation
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Public Holidays (Optional)
                </label>
                <textarea
                  value={holidayText}
                  onChange={(e) => setHolidayText(e.target.value)}
                  placeholder="2024-12-25&#10;2024-01-01&#10;2024-07-04"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-y"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter dates in YYYY-MM-DD format, one per line
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  🗑️ Clear
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 disabled:text-gray-400 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  {copied ? "Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Date Ranges
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setQuickRange(1)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  📅 1 Week
                </button>
                <button
                  onClick={() => setQuickRange(2)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  📅 2 Weeks
                </button>
                <button
                  onClick={() => setQuickRange(4)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  📅 1 Month
                </button>
                <button
                  onClick={() => setQuickRange(12)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  📅 3 Months
                </button>
              </div>
              
              <h4 className="text-xs font-semibold text-gray-600 mb-2">Add Common Holidays</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addCommonHolidays('us')}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-lg transition-colors border border-blue-200"
                >
                  🇺🇸 US Holidays
                </button>
                <button
                  onClick={() => addCommonHolidays('uk')}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-lg transition-colors border border-blue-200"
                >
                  🇬🇧 UK Holidays
                </button>
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="sticky top-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="text-center pb-6 border-b border-white/20">
                  <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    Working Days
                  </p>
                  <h2 className="text-5xl font-bold tracking-tight mb-2 break-words">
                    {result ? result.workingDays.toLocaleString() : '—'}
                  </h2>
                  <p className="text-primary-100 text-sm">
                    {result ? `${result.startDate.toLocaleDateString()} → ${result.endDate.toLocaleDateString()} (${getWeekendDescription(weekendType)})` : 'Select dates to calculate'}
                  </p>
                </div>

                {result && (
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/10 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Calendar Days:</span>
                        <span className="font-semibold">{result.totalDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Weekend Days ({getWeekendDescription(weekendType)}):</span>
                        <span className="font-semibold">{result.weekendDays.toLocaleString()}</span>
                      </div>
                      {result.holidayDays > 0 && (
                        <div className="flex justify-between">
                          <span className="text-primary-100">Holiday Days:</span>
                          <span className="font-semibold">{result.holidayDays.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-primary-100 text-xs mb-2">Day Breakdown ({getWeekendDescription(weekendType)})</div>
                      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden flex">
                        <div 
                          className="bg-green-400 h-full" 
                          style={{ width: `${(result.workingDays / result.totalDays) * 100}%` }}
                          title={`Working Days: ${result.workingDays}`}
                        ></div>
                        <div 
                          className="bg-red-400 h-full" 
                          style={{ width: `${(result.weekendDays / result.totalDays) * 100}%` }}
                          title={`Weekend Days: ${result.weekendDays}`}
                        ></div>
                        {result.holidayDays > 0 && (
                          <div 
                            className="bg-orange-400 h-full" 
                            style={{ width: `${(result.holidayDays / result.totalDays) * 100}%` }}
                            title={`Holiday Days: ${result.holidayDays}`}
                          ></div>
                        )}
                      </div>
                      <div className="flex justify-between text-xs text-primary-100 mt-1">
                        <span>🟢 Working</span>
                        <span>🔴 Weekends</span>
                        {result.holidayDays > 0 && <span>🟠 Holidays</span>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!result}
                    className="w-full bg-white disabled:bg-white/50 text-primary disabled:text-primary/50 font-semibold py-2.5 rounded-lg hover:bg-gray-50 disabled:hover:bg-white/50 transition-colors shadow-sm"
                  >
                    {copied ? "Copied!" : "📋 Copy Result"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WorkingDaysCalculatorSEO />
      
      <RelatedTools
        currentTool="working-days-calculator"
        tools={['date-difference-calculator', 'time-duration-calculator', 'percentage-calculator']}
      />
    </>
  );
}