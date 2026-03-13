"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  parseNumbers,
  calculateStatistics,
  generateRandomDataset,
  formatNumber,
  createResultsSummary,
  exportAsCSV,
  exportAsJSON,
  saveToHistory,
  getHistoryFromStorage,
  saveHistoryToStorage,
  clearHistoryFromStorage,
  debounce,
  downloadFile,
  StatisticalResult,
  DatasetHistory
} from "./logic";
import StandardDeviationCalculatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function StandardDeviationCalculatorUI() {
  const [input, setInput] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<StatisticalResult | null>(null);
  const [isPopulation, setIsPopulation] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<DatasetHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistoryFromStorage());
  }, []);

  // Perform calculation
  const performCalculation = useCallback(() => {
    setError("");

    if (!input.trim()) {
      setNumbers([]);
      setResult(null);
      return;
    }

    const parsed = parseNumbers(input);

    if (parsed.length === 0) {
      setError("No valid numbers found. Please enter at least one number.");
      setNumbers([]);
      setResult(null);
      return;
    }

    if (parsed.length === 1) {
      setError("Please enter at least 2 numbers for meaningful statistics.");
      setNumbers(parsed);
      setResult(null);
      return;
    }

    setNumbers(parsed);
    const stats = calculateStatistics(parsed);
    setResult(stats);

    // Save to history
    const newHistory = [saveToHistory(parsed), ...history];
    const trimmed = newHistory.slice(0, 20);
    setHistory(trimmed);
    saveHistoryToStorage(trimmed);
  }, [input, history]);

  const debouncedCalculation = useCallback(
    debounce(performCalculation, 300),
    [performCalculation]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedCalculation();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split('\n');
      const numbers: number[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && trimmed !== 'value') {
          const num = parseFloat(trimmed);
          if (!isNaN(num)) {
            numbers.push(num);
          }
        }
      }

      if (numbers.length > 0) {
        setInput(numbers.join(', '));
        setNumbers(numbers);
        const stats = calculateStatistics(numbers);
        setResult(stats);

        const newHistory = [saveToHistory(numbers, file.name), ...history];
        const trimmed = newHistory.slice(0, 20);
        setHistory(trimmed);
        saveHistoryToStorage(trimmed);
      }
    };

    reader.readAsText(file);
  };

  const handleGenerateRandom = () => {
    const random = generateRandomDataset(20, 1, 100);
    setInput(random.join(', '));
    setNumbers(random);
    const stats = calculateStatistics(random);
    setResult(stats);

    const newHistory = [saveToHistory(random, 'Random Dataset'), ...history];
    const trimmed = newHistory.slice(0, 20);
    setHistory(trimmed);
    saveHistoryToStorage(trimmed);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyResults = () => {
    if (!result) return;
    const summary = createResultsSummary(numbers, result, isPopulation);
    copyToClipboard(summary, "results");
  };

  const handleExportCSV = () => {
    if (!result) return;
    const csv = exportAsCSV(numbers, result, isPopulation);
    downloadFile(csv, 'statistics.csv', 'text/csv');
  };

  const handleExportJSON = () => {
    if (!result) return;
    const json = exportAsJSON(numbers, result, isPopulation);
    downloadFile(json, 'statistics.json', 'application/json');
  };

  const handleClearAll = () => {
    setInput("");
    setNumbers([]);
    setResult(null);
    setError("");
  };

  const loadFromHistory = (item: DatasetHistory) => {
    setInput(item.data.join(', '));
    setNumbers(item.data);
    const stats = calculateStatistics(item.data);
    setResult(stats);
    setShowHistory(false);
  };

  const sdValue = result ? (isPopulation ? result.standardDeviation : result.sampleStandardDeviation) : 0;
  const varValue = result ? (isPopulation ? result.variance : result.sampleVariance) : 0;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Standard Deviation Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter a list of numbers to instantly calculate mean, variance, standard deviation, and other statistical measures. Perfect for data analysis, research, and learning statistics.
              </p>
            </div>
          </div>
        </div>

        {/* Input Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Enter Your Data
          </h2>

          <div className="space-y-4 mb-6">
            {/* Textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Numbers (comma, space, or line separated)
              </label>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Example: 12, 15, 20, 18, 30&#10;Or paste: 12 15 20 18 30&#10;Or each on new line"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary resize-none"
                rows={6}
              />
              <div className="text-xs text-gray-500">
                {numbers.length > 0 && `${numbers.length} numbers detected`}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                ⚠️ {error}
              </div>
            )}

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Or upload CSV file
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                📁 Upload CSV File
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="radio"
                checked={isPopulation}
                onChange={() => setIsPopulation(true)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">Population SD</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="radio"
                checked={!isPopulation}
                onChange={() => setIsPopulation(false)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">Sample SD</span>
            </label>

            <button
              onClick={handleGenerateRandom}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🎲 Random Data
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
            >
              🗑️ Clear All
            </button>
            <button
              onClick={performCalculation}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🧮 Calculate
            </button>
          </div>
        </div>

        {/* Results Panel */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              📈 Statistical Results
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Count */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Count</div>
                <div className="text-2xl font-bold text-gray-900">{result.count}</div>
              </div>

              {/* Sum */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Sum</div>
                <div className="text-2xl font-bold text-gray-900">{result.sum}</div>
              </div>

              {/* Mean */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 mb-1">Mean (Average)</div>
                <div className="text-2xl font-bold text-blue-900">{formatNumber(result.mean)}</div>
              </div>

              {/* Median */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Median</div>
                <div className="text-2xl font-bold text-gray-900">{formatNumber(result.median)}</div>
              </div>

              {/* Min */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Minimum</div>
                <div className="text-2xl font-bold text-gray-900">{result.min}</div>
              </div>

              {/* Max */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Maximum</div>
                <div className="text-2xl font-bold text-gray-900">{result.max}</div>
              </div>

              {/* Range */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Range</div>
                <div className="text-2xl font-bold text-gray-900">{result.range}</div>
              </div>

              {/* Variance */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-xs text-purple-600 mb-1">Variance</div>
                <div className="text-2xl font-bold text-purple-900">{formatNumber(varValue)}</div>
              </div>

              {/* Standard Deviation */}
              <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary lg:col-span-1">
                <div className="text-xs text-primary mb-1 font-semibold">Standard Deviation</div>
                <div className="text-3xl font-bold text-primary">{formatNumber(sdValue)}</div>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={handleCopyResults}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === "results" ? "✓ Copied" : "📋 Copy Results"}
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-semibold transition-colors"
              >
                📥 Export CSV
              </button>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-semibold transition-colors"
              >
                📥 Export JSON
              </button>
              <button
                onClick={() => copyToClipboard(numbers.join(', '), "data")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied === "data" ? "✓ Copied" : "📋 Copy Data"}
              </button>
            </div>
          </div>
        )}

        {/* Data Visualization */}
        {result && numbers.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              📊 Data Distribution
            </h2>

            <div className="space-y-3">
              {numbers.map((num, idx) => {
                const maxNum = Math.max(...numbers);
                const percentage = (num / maxNum) * 100;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-gray-700">Value {idx + 1}</span>
                      <span className="text-gray-600">{num}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary-hover h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              📜 Dataset History
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? "Hide" : "Show"}
              </button>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    clearHistoryFromStorage();
                    setHistory([]);
                  }}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {showHistory && (
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No dataset history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-800">
                          {item.label || `${item.data.length} numbers`}
                        </span>
                        <span className="text-gray-600 mx-2">•</span>
                        <span className="text-gray-600 font-mono text-xs">
                          {item.data.slice(0, 3).join(', ')}{item.data.length > 3 ? '...' : ''}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <StandardDeviationCalculatorSEOContent />
      <RelatedTools
        currentTool="standard-deviation-calculator"
        tools={["percentage-calculator", "average-calculator", "matrix-calculator"]}
      />
    </>
  );
}
