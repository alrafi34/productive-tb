"use client";

import { useState, useEffect } from "react";
import {
  calculateDateDifference,
  formatDateDifference,
  parseDate,
  getTodayString,
  getDateFromYearsAgo,
  DateDifference
} from "./logic";
import DateDifferenceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type OutputFormat = 'full' | 'years' | 'months' | 'days' | 'weeks';

interface HistoryEntry {
  id: string;
  startDate: string;
  endDate: string;
  result: string;
  timestamp: number;
}

export default function DateDifferenceCalculatorUI() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>(getTodayString());
  const [includeTime, setIncludeTime] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('full');
  const [result, setResult] = useState<DateDifference | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('date-diff-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored).slice(0, 5));
      } catch (e) {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);

      if (!start || !end) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      if (start > end) {
        setError("Start date must be before end date");
        setResult(null);
        return;
      }

      setError("");
      const diff = calculateDateDifference(start, end, includeTime);
      setResult(diff);
    } else {
      setResult(null);
      setError("");
    }
  }, [startDate, endDate, includeTime]);

  const handleClear = () => {
    setStartDate("");
    setEndDate(getTodayString());
    setResult(null);
    setError("");
    setIncludeTime(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = formatDateDifference(result, outputFormat);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToHistory = () => {
    if (!result || !startDate || !endDate) return;
    
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      startDate,
      endDate,
      result: formatDateDifference(result, 'full'),
      timestamp: Date.now()
    };

    const newHistory = [entry, ...history.filter(h => 
      !(h.startDate === startDate && h.endDate === endDate)
    )].slice(0, 5);

    setHistory(newHistory);
    localStorage.setItem('date-diff-history', JSON.stringify(newHistory));
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setStartDate(entry.startDate);
    setEndDate(entry.endDate);
  };

  const setQuickDate = (type: 'birthday' | 'year' | 'month') => {
    const today = getTodayString();
    setEndDate(today);
    
    switch (type) {
      case 'birthday':
        setStartDate(getDateFromYearsAgo(30));
        break;
      case 'year':
        setStartDate(getDateFromYearsAgo(1));
        break;
      case 'month':
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        setStartDate(date.toISOString().split('T')[0]);
        break;
    }
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeTime"
                  checked={includeTime}
                  onChange={(e) => setIncludeTime(e.target.checked)}
                  className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                />
                <label htmlFor="includeTime" className="text-sm text-gray-700 font-medium">
                  Include time difference
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="full">Years, Months, Days</option>
                  <option value="years">Years Only</option>
                  <option value="months">Total Months</option>
                  <option value="weeks">Total Weeks</option>
                  <option value="days">Total Days</option>
                </select>
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
                  onClick={saveToHistory}
                  disabled={!result}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 disabled:text-gray-400 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  💾 Save
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setQuickDate('birthday')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  🎂 30 Years Ago
                </button>
                <button
                  onClick={() => setQuickDate('year')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  📅 1 Year Ago
                </button>
                <button
                  onClick={() => setQuickDate('month')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  📆 1 Month Ago
                </button>
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Recent Calculations
                </h3>
                <div className="space-y-2">
                  {history.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => loadFromHistory(entry)}
                      className="w-full text-left text-xs text-gray-600 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <div className="font-mono">{entry.startDate} → {entry.endDate}</div>
                      <div className="text-gray-500 mt-0.5">{entry.result}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="sticky top-6 space-y-6">
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
                    Date Difference
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 break-words">
                    {result ? formatDateDifference(result, outputFormat) : '—'}
                  </h2>
                </div>

                {result && (
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/10 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Days:</span>
                        <span className="font-semibold">{result.totalDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Weeks:</span>
                        <span className="font-semibold">{result.totalWeeks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Months:</span>
                        <span className="font-semibold">{result.totalMonths}</span>
                      </div>
                    </div>

                    {includeTime && (result.hours !== undefined || result.minutes !== undefined || result.seconds !== undefined) && (
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-primary-100 text-xs mb-2">Time Component</div>
                        <div className="font-mono text-lg">
                          {result.hours !== undefined && `${result.hours}h `}
                          {result.minutes !== undefined && `${result.minutes}m `}
                          {result.seconds !== undefined && `${result.seconds}s`}
                        </div>
                      </div>
                    )}
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

            {/* Alternative Formats */}
            {result && outputFormat === 'full' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Alternative Formats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-600">Years:</span>
                    <span className="font-mono font-semibold text-gray-900">{formatDateDifference(result, 'years')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-600">Months:</span>
                    <span className="font-mono font-semibold text-gray-900">{formatDateDifference(result, 'months')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-600">Weeks:</span>
                    <span className="font-mono font-semibold text-gray-900">{formatDateDifference(result, 'weeks')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-600">Days:</span>
                    <span className="font-mono font-semibold text-gray-900">{formatDateDifference(result, 'days')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DateDifferenceCalculatorSEO />
      
      <RelatedTools
        currentTool="date-difference-calculator"
        tools={['age-calculator', 'timestamp-unix-converter', 'percentage-calculator']}
      />
    </>
  );
}
