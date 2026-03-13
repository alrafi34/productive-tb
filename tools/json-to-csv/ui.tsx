"use client";

import { useState, useCallback, useEffect } from "react";
import {
  parseJSON,
  jsonToCSV,
  saveToHistory,
  getHistory,
  clearHistory
} from "./logic";
import JSONToCSVSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_JSON = `[
  {
    "name": "Alice",
    "age": 25,
    "email": "alice@example.com",
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  },
  {
    "name": "Bob",
    "age": 30,
    "email": "bob@example.com",
    "address": {
      "city": "Los Angeles",
      "zip": "90001"
    }
  }
]`;

export default function JSONToCSVUI() {
  const [input, setInput] = useState("");
  const [flatten, setFlatten] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState(",");
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const parseResult = parseJSON(input);
  const conversion = parseResult.success
    ? jsonToCSV(parseResult.data, { flatten, includeHeaders, delimiter })
    : { success: false };

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopy = useCallback(() => {
    if (conversion.success && conversion.output) {
      navigator.clipboard.writeText(conversion.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [conversion.success, conversion.output]);

  const handleDownload = useCallback(() => {
    if (conversion.success && conversion.output) {
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(conversion.output));
      element.setAttribute("download", "data.csv");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [conversion.success, conversion.output]);

  const handleConvert = useCallback(() => {
    if (parseResult.success && input.trim()) {
      saveToHistory(input);
      setHistory(getHistory());
    }
  }, [parseResult.success, input]);

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
    if (file && (file.name.endsWith(".json") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleLoadFromHistory = useCallback((json: string) => {
    setInput(json);
    setShowHistory(false);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              JSON to CSV Converter
            </h1>
            <p className="text-sm text-gray-600">
              Convert JSON data into CSV spreadsheet format instantly with flattening support
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
                  placeholder={`Paste JSON here or drag & drop a .json file...`}
                  rows={12}
                  className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* File Upload & Options */}
              <div className="flex flex-wrap gap-3 items-center">
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700">
                  📁 Upload JSON
                  <input
                    type="file"
                    accept=".json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="View history"
                >
                  📜 History ({history.length})
                </button>

                <button
                  onClick={() => setInput("")}
                  disabled={!input}
                  className="px-4 py-2 rounded-lg transition-colors disabled:opacity-40 bg-red-100 hover:bg-red-200 text-red-700"
                >
                  🗑️ Clear
                </button>

                <button
                  onClick={() => setInput(EXAMPLE_JSON)}
                  className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700"
                >
                  📋 Example
                </button>
              </div>

              {/* Options */}
              <div className="rounded-xl p-4 border bg-white border-gray-200 space-y-3">
                <h3 className="font-semibold text-gray-900">Conversion Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flatten}
                      onChange={(e) => setFlatten(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Flatten nested objects</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHeaders}
                      onChange={(e) => setIncludeHeaders(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Include headers</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Delimiter:</label>
                    <select
                      value={delimiter}
                      onChange={(e) => setDelimiter(e.target.value)}
                      className="px-3 py-1 rounded border border-gray-300 text-sm bg-white text-gray-700"
                    >
                      <option value=",">Comma (,)</option>
                      <option value=";">Semicolon (;)</option>
                      <option value="\t">Tab</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleConvert}
                  disabled={!input}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 ${
                    conversion.success
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  ✓ Convert
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!conversion.success}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 ${
                    copied
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                  }`}
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!conversion.success}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-orange-100 hover:bg-orange-200 text-orange-700"
                >
                  ⬇️ Download
                </button>
              </div>
            </div>

            {/* Sidebar - Results */}
            <div className="space-y-4">
              {/* Conversion Status */}
              <div
                className={`rounded-xl p-4 border ${
                  conversion.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div
                  className={`font-semibold mb-2 ${
                    conversion.success
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {conversion.success ? "✓ Valid JSON" : "✗ Invalid JSON"}
                </div>
                {conversion.error && (
                  <div className="text-sm text-red-600 font-mono break-words">
                    {conversion.error}
                  </div>
                )}
              </div>

              {/* CSV Preview */}
              {conversion.success && conversion.output && (
                <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    📄 CSV Output
                  </h3>
                  <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                    {conversion.output}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* History Panel */}
          {showHistory && history.length > 0 && (
            <div className="mt-6 rounded-xl p-4 border bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">
                  📜 Recent Conversions
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
                    onClick={() => handleLoadFromHistory(item.fullJson)}
                    className="w-full text-left p-2 rounded transition-colors text-sm font-mono bg-white hover:bg-gray-100 text-gray-700"
                  >
                    <div className="truncate">{item.json}...</div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <JSONToCSVSEOContent />

      <RelatedTools
        currentTool="json-to-csv"
        tools={["json-validator", "xml-to-json", "find-and-replace"]}
      />
    </>
  );
}
