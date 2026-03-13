"use client";

import { useState, useCallback, useEffect } from "react";
import {
  formatSQL,
  minifySQL,
  analyzeSQL,
  saveToHistory,
  getHistory,
  clearHistory,
  EXAMPLE_QUERIES
} from "./logic";
import SQLFormatterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SQLFormatterUI() {
  const [input, setInput] = useState("");
  const [dialect, setDialect] = useState("generic");
  const [uppercase, setUppercase] = useState(true);
  const [alignColumns, setAlignColumns] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const formatted = input.trim() ? formatSQL(input, dialect, uppercase, alignColumns) : "";
  const minified = input.trim() ? minifySQL(input) : "";
  const analysis = input.trim() ? analyzeSQL(input) : null;

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopy = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  }, []);

  const handleFormat = useCallback(() => {
    if (formatted) {
      saveToHistory(formatted);
      setHistory(getHistory());
    }
  }, [formatted]);

  const handleMinify = useCallback(() => {
    if (minified) {
      setInput(minified);
      saveToHistory(minified);
      setHistory(getHistory());
    }
  }, [minified]);

  const handleLoadExample = useCallback((key: keyof typeof EXAMPLE_QUERIES) => {
    setInput(EXAMPLE_QUERIES[key]);
  }, []);

  const handleLoadFromHistory = useCallback((sql: string) => {
    setInput(sql);
    setShowHistory(false);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".sql") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              SQL Formatter
            </h1>
            <p className="text-sm text-gray-600">
              Format, beautify, and minify SQL queries instantly with syntax highlighting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-4">
              {/* Input Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="rounded-xl border-2 border-dashed border-gray-300 bg-white"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your SQL query here or drag & drop a .sql file..."
                  rows={12}
                  className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Controls */}
              <div className="space-y-3">
                {/* Dialect & Options */}
                <div className="flex flex-wrap gap-3 items-center">
                  <select
                    value={dialect}
                    onChange={(e) => setDialect(e.target.value)}
                    className="px-4 py-2 rounded-lg border transition-colors bg-white border-gray-300 text-gray-700 text-sm"
                  >
                    <option value="generic">Generic SQL</option>
                    <option value="mysql">MySQL</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="sqlite">SQLite</option>
                    <option value="sqlserver">SQL Server</option>
                  </select>

                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
                    <input
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="w-4 h-4"
                    />
                    Uppercase Keywords
                  </label>

                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
                    <input
                      type="checkbox"
                      checked={alignColumns}
                      onChange={(e) => setAlignColumns(e.target.checked)}
                      className="w-4 h-4"
                    />
                    Align Columns
                  </label>

                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                    title="View history"
                  >
                    📜 History ({history.length})
                  </button>

                  <button
                    onClick={() => setInput("")}
                    disabled={!input}
                    className="px-4 py-2 rounded-lg transition-colors disabled:opacity-40 bg-red-100 hover:bg-red-200 text-red-700 text-sm"
                  >
                    🗑️ Clear
                  </button>
                </div>

                {/* File Upload */}
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
                    📁 Upload SQL
                    <input
                      type="file"
                      accept=".sql,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => handleLoadExample("simple")}
                    className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm"
                  >
                    📋 Simple Query
                  </button>

                  <button
                    onClick={() => handleLoadExample("join")}
                    className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm"
                  >
                    📋 JOIN Query
                  </button>

                  <button
                    onClick={() => handleLoadExample("subquery")}
                    className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm"
                  >
                    📋 Subquery
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleFormat}
                  disabled={!input}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-blue-100 hover:bg-blue-200 text-blue-700"
                >
                  ✨ Format SQL
                </button>
                <button
                  onClick={handleMinify}
                  disabled={!input}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-orange-100 hover:bg-orange-200 text-orange-700"
                >
                  ⚡ Minify
                </button>
              </div>
            </div>

            {/* Sidebar - Results & Analysis */}
            <div className="space-y-4">
              {/* Analysis */}
              {analysis && (
                <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    📊 Analysis
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Characters:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.characterCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lines:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.lineCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.wordCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Keywords:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.keywordCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.size}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Copy Options */}
              {formatted && (
                <div className="space-y-2">
                  <button
                    onClick={() => handleCopy(formatted, "formatted")}
                    className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                      copiedType === "formatted"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copiedType === "formatted" ? "✓ Copied!" : "📋 Copy Formatted"}
                  </button>
                  {minified && (
                    <button
                      onClick={() => handleCopy(minified, "minified")}
                      className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                        copiedType === "minified"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {copiedType === "minified" ? "✓ Copied!" : "📋 Copy Minified"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* History Panel */}
          {showHistory && history.length > 0 && (
            <div className="mt-6 rounded-xl p-4 border bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">
                  📜 Recent Queries
                </h3>
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="text-sm px-3 py-1 rounded transition-colors bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLoadFromHistory(item.fullSql)}
                    className="w-full text-left p-2 rounded transition-colors text-sm font-mono bg-white hover:bg-gray-100 text-gray-700"
                  >
                    <div className="truncate">{item.sql}...</div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formatted Preview */}
          {formatted && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                <h3 className="font-semibold mb-3 text-gray-900">
                  ✨ Formatted SQL
                </h3>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-opacity-50 bg-gray-100 text-gray-800 whitespace-pre-wrap break-words">
                  {formatted}
                </pre>
              </div>

              {minified && (
                <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    ⚡ Minified SQL
                  </h3>
                  <pre className="text-xs overflow-x-auto p-3 rounded bg-opacity-50 bg-gray-100 text-gray-800 whitespace-pre-wrap break-words">
                    {minified}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <SQLFormatterSEOContent />

      <RelatedTools
        currentTool="sql-formatter"
        tools={["json-validator", "regex-tester", "find-and-replace"]}
      />
    </>
  );
}
