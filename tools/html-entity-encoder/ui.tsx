"use client";

import { useState, useEffect, useRef } from "react";
import {
  transformEntity,
  countEntities,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsText,
  EntityMode,
  EntityType,
  EntityHistory
} from "./logic";
import HTMLEntityEncoderSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const EXAMPLE_TEXT = "<div class=\"container\">Hello & Welcome</div>";

export default function HTMLEntityEncoderUI() {
  const [input, setInput] = useState(EXAMPLE_TEXT);
  const [mode, setMode] = useState<EntityMode>("auto");
  const [entityType, setEntityType] = useState<EntityType>("named");
  const [nonAscii, setNonAscii] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [history, setHistory] = useState<EntityHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // History lives in localStorage, read after hydration
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHistory(getHistory()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Conversion is a single pass over the text, fast enough to run on every keystroke
  const { result: output, detectedMode } = transformEntity(input, mode, entityType, nonAscii);

  // A conversion is kept in history when it is used (copied or exported), not on every keystroke
  const remember = () => {
    if (!input || !output) return;
    saveToHistory({
      id: Math.random().toString(36).slice(2),
      mode,
      entityType,
      input: input.slice(0, 500),
      output: output.slice(0, 500),
      timestamp: Date.now(),
    });
    setHistory(getHistory());
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }, () => {});
    remember();
  };

  const swapTexts = () => setInput(output);

  const clearAll = () => setInput("");

  const loadFromHistory = (item: EntityHistory) => {
    setMode(item.mode);
    setEntityType(item.entityType);
    setInput(item.input);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Dual Panel */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input
              </h2>
              <button
                onClick={clearAll}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                title="Clear all"
              >
                🗑️ Clear
              </button>
            </div>

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-80 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-primary"
              placeholder={`Paste HTML or text to encode or decode...\n\nExample:\n${EXAMPLE_TEXT}`}
            />

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{input.length.toLocaleString("en-US")} characters</span>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Output
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => swapTexts()}
                  disabled={!output}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  title="Swap input and output"
                >
                  🔄 Swap
                </button>
                <button
                  onClick={() => copyToClipboard(output, "output")}
                  disabled={!output}
                  className="px-3 py-1 bg-primary hover:bg-primary-hover disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedType === "output" ? "✓ Copied" : "📋 Copy"}
                </button>
              </div>
            </div>

            <textarea
              ref={outputRef}
              value={output}
              readOnly
              className="w-full h-80 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none bg-gray-50 focus:outline-none focus:border-primary"
              placeholder="Converted text will appear here..."
            />

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{output.length.toLocaleString("en-US")} characters</span>
              <span>{countEntities(output)} entities</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Settings
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mode</label>
              <div className="flex gap-2">
                {(["encode", "decode", "auto"] as EntityMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      mode === m
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {m === "auto" ? "Auto" : m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
              {detectedMode && mode === "auto" && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700">
                  ✓ Detected: {detectedMode === "encode" ? "Encoding" : "Decoding"}
                </div>
              )}
            </div>

            {/* Entity Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Entity Type</label>
              <div className="flex gap-2">
                {(["named", "decimal", "hex"] as EntityType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setEntityType(t)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      entityType === t
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t === "named" ? "Named" : t === "decimal" ? "Decimal" : "Hex"}
                  </button>
                ))}
              </div>
              <label className="mt-3 flex items-start gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={nonAscii} onChange={(e) => setNonAscii(e.target.checked)} className="mt-1 accent-[#058554]" />
                <span>Also encode non-ASCII characters (é, €, ©, emoji) — for emails or systems that are not UTF-8</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => copyToClipboard(output, "output")}
              disabled={!output}
              className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              📋 Copy Output
            </button>
            <button
              onClick={() => { exportAsText(output, "html-entities"); remember(); }}
              disabled={!output}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
            >
              📄 Export
            </button>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              History (Last 20)
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
                    clearHistory();
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
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {item.mode === "auto" ? "Auto" : item.mode}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded">
                          {item.entityType}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-gray-500 mb-1">Input:</div>
                        <code className="text-gray-800 break-all font-mono">
                          {item.input.length > 50 ? item.input.slice(0, 50) + "..." : item.input}
                        </code>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Output:</div>
                        <code className="text-gray-800 break-all font-mono">
                          {item.output.length > 50 ? item.output.slice(0, 50) + "..." : item.output}
                        </code>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <RelatedStrip />
      <HTMLEntityEncoderSEOContent />
      <RelatedTools />
    </>
  );
}
