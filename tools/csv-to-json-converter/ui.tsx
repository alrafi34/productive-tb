"use client";

import { useState, useCallback, useMemo } from "react";
import {
  parseCSV,
  convertToJSON,
  downloadJSON,
  detectDelimiter,
  getTablePreview,
  getStats,
  type ConversionOptions,
} from "./logic";
import CSVToJSONSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_CSV = `name,age,city
John,30,New York
Alice,25,Los Angeles
Bob,35,Chicago`;

export default function CSVToJSONUI() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [useHeaders, setUseHeaders] = useState(true);
  const [trimValues, setTrimValues] = useState(true);
  const [handleQuotes, setHandleQuotes] = useState(true);
  const [prettyJSON, setPrettyJSON] = useState(true);
  const [copied, setCopied] = useState(false);
  const [autoDetect, setAutoDetect] = useState(false);

  const options: ConversionOptions = {
    delimiter: autoDetect ? detectDelimiter(input) : delimiter,
    useFirstRowAsHeaders: useHeaders,
    trimValues,
    handleQuotes,
  };

  const parseResult = useMemo(() => parseCSV(input, options), [input, options]);
  const jsonOutput = useMemo(
    () => (parseResult.success && parseResult.data ? convertToJSON(parseResult.data, prettyJSON) : ""),
    [parseResult, prettyJSON]
  );
  const tablePreview = useMemo(
    () => (parseResult.success && parseResult.data ? getTablePreview(parseResult.data) : []),
    [parseResult]
  );
  const stats = useMemo(
    () => (parseResult.success && parseResult.data ? getStats(parseResult.data) : { rows: 0, columns: 0 }),
    [parseResult]
  );

  const handleCopy = useCallback(() => {
    if (jsonOutput) {
      navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [jsonOutput]);

  const handleDownload = useCallback(() => {
    if (jsonOutput) {
      downloadJSON(jsonOutput, "data.json");
    }
  }, [jsonOutput]);

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
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const columns = tablePreview.length > 0 ? Object.keys(tablePreview[0]) : [];

  return (
    <>
      <div className="space-y-6">
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
                placeholder={`Paste CSV data or drag & drop a file...\n\nExample:\n${EXAMPLE_CSV}`}
                rows={12}
                className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* File Upload & Quick Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold">
                📁 Upload
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setInput("")}
                disabled={!input}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-40 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold"
              >
                🗑️ Clear
              </button>

              <button
                onClick={() => setInput(EXAMPLE_CSV)}
                className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-semibold"
              >
                📋 Example
              </button>
            </div>

            {/* Options */}
            <div className="rounded-xl p-4 border bg-white border-gray-200 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Options</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useHeaders}
                    onChange={(e) => setUseHeaders(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Use first row as headers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trimValues}
                    onChange={(e) => setTrimValues(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Trim whitespace</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={handleQuotes}
                    onChange={(e) => setHandleQuotes(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Handle quoted values</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoDetect}
                    onChange={(e) => setAutoDetect(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Auto-detect delimiter</span>
                </label>
              </div>

              {/* Delimiter Selector */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <label className="text-sm text-gray-700 font-semibold">Delimiter:</label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  disabled={autoDetect}
                  className="px-3 py-1 rounded border border-gray-300 text-sm bg-white text-gray-700 disabled:opacity-50"
                >
                  <option value=",">Comma (,)</option>
                  <option value=";">Semicolon (;)</option>
                  <option value="\t">Tab</option>
                  <option value="|">Pipe (|)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                disabled={!parseResult.success}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm"
              >
                {copied ? "✓ Copied!" : "📋 Copy JSON"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!parseResult.success}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-orange-100 hover:bg-orange-200 text-orange-700 text-sm"
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => setPrettyJSON(!prettyJSON)}
                disabled={!parseResult.success}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
              >
                {prettyJSON ? "⚡ Minify" : "✨ Pretty"}
              </button>
            </div>
          </div>

          {/* Sidebar - Status & Stats */}
          <div className="space-y-4">
            {/* Status */}
            <div
              className={`rounded-xl p-4 border ${
                parseResult.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div
                className={`font-semibold mb-2 text-sm ${
                  parseResult.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {parseResult.success ? "✓ Valid CSV" : "✗ Invalid CSV"}
              </div>
              {parseResult.error && (
                <div className="text-xs text-red-600 font-mono break-words">
                  {parseResult.error}
                </div>
              )}
            </div>

            {/* Stats */}
            {parseResult.success && (
              <div className="rounded-xl p-4 border bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 text-sm">📊 Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Rows:</span>
                    <span className="font-bold text-blue-900">{stats.rows}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Columns:</span>
                    <span className="font-bold text-blue-900">{stats.columns}</span>
                  </div>
                </div>
              </div>
            )}

            {/* JSON Preview */}
            {parseResult.success && jsonOutput && (
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                <h3 className="font-semibold mb-3 text-gray-900 text-sm">📄 JSON</h3>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 max-h-64 overflow-y-auto whitespace-pre-wrap break-words font-mono">
                  {jsonOutput.slice(0, 500)}
                  {jsonOutput.length > 500 && "..."}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Table Preview */}
        {parseResult.success && tablePreview.length > 0 && (
          <div className="rounded-xl border bg-white border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm">
                📋 Preview {tablePreview.length > 200 ? `(showing first 200 of ${stats.rows})` : ""}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-2 text-left font-semibold text-gray-700 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tablePreview.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-200 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      {columns.map((col) => (
                        <td
                          key={`${idx}-${col}`}
                          className="px-4 py-2 text-gray-800 truncate max-w-xs"
                          title={row[col]}
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <CSVToJSONSEOContent />

      <RelatedTools
        currentTool="csv-to-json-converter"
        tools={["json-to-csv", "json-formatter", "json-validator"]}
      />
    </>
  );
}
