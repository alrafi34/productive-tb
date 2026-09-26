"use client";

import { useState, useCallback, useEffect } from "react";
import {
  validateJSON,
  formatJSON,
  minifyJSON,
  analyzeJSON,
  saveToHistory,
  getHistory,
  clearHistory
} from "./logic";
import { findJsonError, repairJson, sendJsonTo, takeHandedOffJson } from "@/lib/json-tools";
import JSONValidatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const EXAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "skills": ["JavaScript", "React", "TypeScript"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  }
}`;

export default function JSONValidatorUI() {
  const [input, setInput] = useState("");
  const [formatSpaces, setFormatSpaces] = useState(2);
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  // What the last "Fix" changed, or why it could not fix everything
  const [repairNote, setRepairNote] = useState<{ fixes: string[]; stillInvalid: boolean } | null>(null);

  const validation = validateJSON(input);
  const analysis = input.trim() ? analyzeJSON(input) : null;
  const formatted = validation.valid ? formatJSON(input, formatSpaces) : null;
  const minified = validation.valid ? minifyJSON(input) : null;

  useEffect(() => {
    setHistory(getHistory());
    // JSON sent over from the JSON formatter
    const handed = takeHandedOffJson();
    if (handed !== null) setInput(handed);
  }, []);

  const handleRepair = useCallback(() => {
    const { output, fixes } = repairJson(input);
    setInput(output);
    setRepairNote({ fixes, stillInvalid: findJsonError(output) !== null });
  }, [input]);

  const handleCopy = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  }, []);

  const handleValidate = useCallback(() => {
    if (validation.valid && input.trim()) {
      saveToHistory(input);
      setHistory(getHistory());
    }
  }, [validation.valid, input]);

  const handleFormat = useCallback(() => {
    if (formatted?.success) {
      setInput(formatted.output!);
      saveToHistory(formatted.output!);
      setHistory(getHistory());
    }
  }, [formatted]);

  const handleMinify = useCallback(() => {
    if (minified?.success) {
      setInput(minified.output!);
      saveToHistory(minified.output!);
      setHistory(getHistory());
    }
  }, [minified]);

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

  // Exact line and column from our own parser: current browsers no longer
  // include a position in JSON.parse errors
  const jsonError = input.trim() && !validation.valid ? findJsonError(input) : null;
  const errorLine = jsonError ? input.split("\n")[jsonError.line - 1] ?? "" : "";

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              JSON Validator
            </h2>
            <p className="text-sm text-gray-600">
              Validate, format, and minify JSON instantly with real-time error detection
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
                  onChange={(e) => {
                    setInput(e.target.value);
                    setRepairNote(null);
                  }}
                  placeholder={`Paste JSON here or drag & drop a .json file...\n\nExample:\n${EXAMPLE_JSON}`}
                  rows={12}
                  className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* File Upload & Format Options */}
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

                <select
                  value={formatSpaces}
                  onChange={(e) => setFormatSpaces(Number(e.target.value))}
                  className="px-4 py-2 rounded-lg border transition-colors bg-white border-gray-300 text-gray-700"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                </select>

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
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleValidate}
                  disabled={!input}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 ${
                    validation.valid
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  ✓ Validate JSON
                </button>
                <button
                  onClick={handleFormat}
                  disabled={!validation.valid}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-purple-100 hover:bg-purple-200 text-purple-700"
                >
                  ✨ Format
                </button>
                <button
                  onClick={handleMinify}
                  disabled={!validation.valid}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-orange-100 hover:bg-orange-200 text-orange-700"
                >
                  ⚡ Minify
                </button>
              </div>
            </div>

            {/* Sidebar - Results & Analysis */}
            <div className="space-y-4">
              {/* Validation Status */}
              <div className={`rounded-xl p-4 border ${
                validation.valid
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}>
                <div className={`font-semibold mb-2 ${
                  validation.valid
                    ? "text-green-700"
                    : "text-red-700"
                }`}>
                  {validation.valid ? "✓ Valid JSON" : "✗ Invalid JSON"}
                </div>
                {jsonError && (
                  <div className="text-sm text-red-700 space-y-2">
                    <p className="font-semibold break-words">{jsonError.message}</p>
                    <p className="text-xs">Line {jsonError.line}, column {jsonError.column}</p>
                    {errorLine.trim() && (
                      <pre className="text-xs bg-white border border-red-200 rounded-lg p-2 overflow-x-auto font-mono text-gray-800">
{errorLine.length > 80 ? errorLine.slice(Math.max(0, jsonError.column - 40), jsonError.column + 40) : errorLine}
{"\n"}
<span className="text-red-600 font-bold">{" ".repeat(Math.max(0, errorLine.length > 80 ? Math.min(39, jsonError.column - 1) : jsonError.column - 1))}^</span>
                      </pre>
                    )}
                    <button
                      onClick={handleRepair}
                      className="w-full px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors"
                    >
                      🔧 Fix common errors
                    </button>
                    <p className="text-[11px] text-red-600/80">
                      Fixes trailing commas, single or curly quotes, unquoted keys, comments, and Python or JavaScript values (True, None, undefined, NaN).
                    </p>
                  </div>
                )}
                {repairNote && (
                  <div className={`mt-3 text-xs rounded-lg p-2 border ${repairNote.stillInvalid ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-white border-green-200 text-green-800"}`}>
                    {repairNote.fixes.length === 0 ? (
                      <p>Nothing to fix automatically. Check the line shown above.</p>
                    ) : (
                      <>
                        <p className="font-semibold mb-1">{repairNote.stillInvalid ? "Partly fixed:" : "Fixed:"}</p>
                        <ul className="list-disc ml-4 space-y-0.5">
                          {repairNote.fixes.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                {validation.valid && input.trim() && (
                  <button
                    onClick={() => sendJsonTo("/tools/developer/json-formatter", input)}
                    className="mt-3 w-full px-3 py-2 rounded-lg bg-white border border-green-300 hover:bg-green-100 text-green-800 font-semibold text-sm transition-colors"
                  >
                    Open in JSON Formatter (tree view, sort keys) →
                  </button>
                )}
              </div>

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
                      <span className="text-gray-600">Size:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depth:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.depth}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Keys:</span>
                      <span className="font-mono text-gray-900">
                        {analysis.keyCount}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Copy Options */}
              {validation.valid && formatted?.success && (
                <div className="space-y-2">
                  <button
                    onClick={() => handleCopy(formatted.output!, "formatted")}
                    className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                      copiedType === "formatted"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copiedType === "formatted" ? "✓ Copied!" : "📋 Copy Formatted"}
                  </button>
                  {minified?.success && (
                    <button
                      onClick={() => handleCopy(minified.output!, "minified")}
                      className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
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
                  📜 Recent Validations
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

          {/* Formatted Preview */}
          {validation.valid && formatted?.success && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                <h3 className="font-semibold mb-3 text-gray-900">
                  ✨ Formatted JSON
                </h3>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-opacity-50 bg-gray-100 text-gray-800">
                  {formatted.output}
                </pre>
              </div>

              {minified?.success && (
                <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    ⚡ Minified JSON
                  </h3>
                  <pre className="text-xs overflow-x-auto p-3 rounded bg-opacity-50 bg-gray-100 text-gray-800">
                    {minified.output}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <RelatedStrip />
      <JSONValidatorSEOContent />

      <RelatedTools />
    </>
  );
}
