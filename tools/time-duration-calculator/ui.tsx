"use client";

import { useState, useEffect } from "react";
import {
  parseTime,
  calculateDuration,
  formatDuration,
  formatDurationCompact,
  getCurrentTime,
  addMinutesToTime,
  TimeDuration
} from "./logic";
import TimeDurationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

interface HistoryEntry {
  id: string;
  startTime: string;
  endTime: string;
  result: string;
  timestamp: number;
}

export default function TimeDurationCalculatorUI() {
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [includeSeconds, setIncludeSeconds] = useState<boolean>(false);
  const [result, setResult] = useState<TimeDuration | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('time-duration-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored).slice(0, 5));
      } catch (e) {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);

      if (!start || !end) {
        setError("Invalid time format");
        setResult(null);
        return;
      }

      setError("");
      const duration = calculateDuration(start, end, includeSeconds);
      setResult(duration);
    } else {
      setResult(null);
      setError("");
    }
  }, [startTime, endTime, includeSeconds]);

  const handleSwap = () => {
    const temp = startTime;
    setStartTime(endTime);
    setEndTime(temp);
  };

  const handleClear = () => {
    setStartTime("");
    setEndTime("");
    setResult(null);
    setError("");
  };

  const handleCopy = () => {
    if (!result) return;
    const text = formatDuration(result, includeSeconds);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToHistory = () => {
    if (!result || !startTime || !endTime) return;
    
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      startTime,
      endTime,
      result: formatDuration(result, includeSeconds),
      timestamp: Date.now()
    };

    const newHistory = [entry, ...history.filter(h => 
      !(h.startTime === startTime && h.endTime === endTime)
    )].slice(0, 5);

    setHistory(newHistory);
    localStorage.setItem('time-duration-history', JSON.stringify(newHistory));
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setStartTime(entry.startTime);
    setEndTime(entry.endTime);
  };

  const setQuickTime = (type: 'work' | 'half' | 'now') => {
    switch (type) {
      case 'work':
        setStartTime('09:00');
        setEndTime('17:00');
        break;
      case 'half':
        setStartTime('09:00');
        setEndTime('13:00');
        break;
      case 'now':
        setStartTime(getCurrentTime());
        setEndTime(addMinutesToTime(getCurrentTime(), 60));
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
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  step={includeSeconds ? "1" : "60"}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  step={includeSeconds ? "1" : "60"}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeSeconds"
                  checked={includeSeconds}
                  onChange={(e) => setIncludeSeconds(e.target.checked)}
                  className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                />
                <label htmlFor="includeSeconds" className="text-sm text-gray-700 font-medium">
                  Include seconds precision
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {result && result.isOvernight && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <span>🌙</span>
                  <span>Overnight duration detected</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSwap}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  🔄 Swap
                </button>
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
                  onClick={() => setQuickTime('work')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  💼 Work Day (9-5)
                </button>
                <button
                  onClick={() => setQuickTime('half')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  ⏰ Half Day (9-1)
                </button>
                <button
                  onClick={() => setQuickTime('now')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors"
                >
                  🕐 From Now (+1h)
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
                      <div className="font-mono">{entry.startTime} → {entry.endTime}</div>
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="text-center pb-6 border-b border-white/20">
                  <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    Duration
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 break-words">
                    {result ? formatDuration(result, includeSeconds) : '—'}
                  </h2>
                  {result && (
                    <p className="text-primary-100 text-sm font-mono">
                      {formatDurationCompact(result, includeSeconds)}
                    </p>
                  )}
                </div>

                {result && (
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/10 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Hours:</span>
                        <span className="font-semibold">{result.totalHours.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Minutes:</span>
                        <span className="font-semibold">{result.totalMinutes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total Seconds:</span>
                        <span className="font-semibold">{result.totalSeconds.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Visual Timeline */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between text-xs text-primary-100 mb-2">
                        <span>{startTime}</span>
                        <span>{endTime}</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <div className="text-center text-xs text-primary-100 mt-2">
                        {result.hours}h {result.minutes}m
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

            {/* Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Time Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        H
                      </div>
                      <span className="text-sm text-gray-600">Hours</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{result.hours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 font-semibold text-sm">
                        M
                      </div>
                      <span className="text-sm text-gray-600">Minutes</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{result.minutes}</span>
                  </div>
                  {includeSeconds && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 font-semibold text-sm">
                          S
                        </div>
                        <span className="text-sm text-gray-600">Seconds</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{result.seconds}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TimeDurationCalculatorSEO />
      
      <RelatedTools
        currentTool="time-duration-calculator"
        tools={['date-difference-calculator', 'timestamp-unix-converter', 'timer-stopwatch']}
      />
    </>
  );
}
