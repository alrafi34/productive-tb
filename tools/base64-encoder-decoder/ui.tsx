"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  transformBase64,
  calculateSizeDifference,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsText,
  exportAsJSON,
  isValidBase64,
  Base64Mode,
  Base64History
} from "./logic";
import Base64EncoderDecoderSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_TEXT = "Hello World! This is a Base64 Encoder/Decoder.";

export default function Base64EncoderDecoderUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Base64Mode>("auto");
  const [detectedMode, setDetectedMode] = useState<'encode' | 'decode' | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [history, setHistory] = useState<Base64History[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sizeDiff, setSizeDiff] = useState<any>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Transform with debouncing
  const performTransform = useCallback((text: string, currentMode: Base64Mode) => {
    const { result, detectedMode: detected } = transformBase64(text, currentMode);
    setOutput(result);
    setDetectedMode(detected || null);

    // Calculate size difference if encoding
    if (text && result && !result.startsWith("Error:")) {
      if (currentMode === "encode" || (currentMode === "auto" && detected === "encode")) {
        setSizeDiff(calculateSizeDifference(text, result));
      } else {
        setSizeDiff(null);
      }

      // Save to history
      const historyItem: Base64History = {
        id: crypto.randomUUID(),
        mode: currentMode,
        input: text.slice(0, 100),
        output: result.slice(0, 100),
        timestamp: Date.now()
      };
      saveToHistory(historyItem);
      setHistory(getHistory());
    }
  }, []);

  // Debounced transform for large text
  const debouncedTransform = useCallback(
    debounce((text: string, currentMode: Base64Mode) => {
      performTransform(text, currentMode);
    }, 300),
    [performTransform]
  );

  // Handle input change
  const handleInputChange = (text: string) => {
    setInput(text);

    if (text.length > 1000) {
      debouncedTransform(text, mode);
    } else {
      performTransform(text, mode);
    }
  };

  // Handle mode change
  const handleModeChange = (newMode: Base64Mode) => {
    setMode(newMode);
    if (input) {
      performTransform(input, newMode);
    }
  };

  // File upload handler
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
        handleInputChange(content);
      };
      reader.readAsText(file);
    }
  }, []);

  // Drag and drop handler
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".txt") || file.name.endsWith(".json") || file.name.endsWith(".csv") || file.name.endsWith(".xml"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
        handleInputChange(content);
      };
      reader.readAsText(file);
    }
  }, []);

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Swap input and output
  const swapTexts = () => {
    setInput(output);
    handleInputChange(output);
  };

  // Clear all
  const clearAll = () => {
    setInput("");
    setOutput("");
    setSizeDiff(null);
    setDetectedMode(null);
  };

  // Load from history
  const loadFromHistory = (item: Base64History) => {
    setMode(item.mode);
    setInput(item.input);
    handleInputChange(item.input);
    setShowHistory(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (input) {
          performTransform(input, mode);
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "c" && document.activeElement === outputRef.current) {
        e.preventDefault();
        copyToClipboard(output, "output");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, mode, output, performTransform]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔤</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Base64 Encoder/Decoder</h3>
              <p className="text-sm text-blue-800">
                Convert text to Base64 or decode Base64 back to text instantly. Upload files, auto-detect format, and save history. All processing happens locally in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Conversion Mode
          </h2>

          <div className="grid sm:grid-cols-3 gap-3">
            {(["encode", "decode", "auto"] as Base64Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  mode === m
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-800 mb-1 capitalize">
                  {m === "auto" ? "Auto Detect" : m.charAt(0).toUpperCase() + m.slice(1)}
                </div>
                <div className="text-xs text-gray-500">
                  {m === "encode" && "Convert text to Base64"}
                  {m === "decode" && "Convert Base64 to text"}
                  {m === "auto" && "Automatically detect format"}
                </div>
              </button>
            ))}
          </div>

          {detectedMode && mode === "auto" && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              ✓ Auto-detected: {detectedMode === "encode" ? "Encoding to Base64" : "Decoding from Base64"}
            </div>
          )}
        </div>

        {/* Dual Panel */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input
              </h2>
              <div className="flex gap-2">
                <label className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                  📁 Upload
                  <input
                    type="file"
                    accept=".txt,.json,.csv,.xml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={clearAll}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  title="Clear all"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full h-80 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-primary"
              placeholder={`Paste text to encode or Base64 to decode...\n\nExample:\n${EXAMPLE_TEXT}`}
            />

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{input.length.toLocaleString()} characters</span>
              <span>Drag & drop files or Ctrl+Enter</span>
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
              <span>{output.length.toLocaleString()} characters</span>
              {output.startsWith("Error:") && (
                <span className="text-red-500 font-semibold">⚠️ {output}</span>
              )}
            </div>
          </div>
        </div>

        {/* Size Comparison */}
        {sizeDiff && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              📊 Size Comparison
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Original Size</div>
                <div className="text-2xl font-bold text-gray-900">{sizeDiff.originalSize}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Encoded Size</div>
                <div className="text-2xl font-bold text-gray-900">{sizeDiff.encodedSize}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Size Increase</div>
                <div className="text-2xl font-bold text-blue-900">{sizeDiff.increase}</div>
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Export Options
          </h2>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => exportAsText(output, "base64-output")}
              disabled={!output}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📄 Export as TXT
            </button>

            <button
              onClick={() => exportAsJSON(history, "base64-history")}
              disabled={history.length === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋 Export History as JSON
            </button>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Conversion History (Last 20)
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
                <p className="text-center text-gray-500 py-8">No conversion history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary capitalize">
                        {item.mode === "auto" ? "Auto Detect" : item.mode}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
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

        {/* Keyboard Shortcuts Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Keyboard Shortcuts</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+Enter</kbd> Transform text
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+C</kbd> Copy output (when focused)
            </div>
          </div>
        </div>
      </div>

      <Base64EncoderDecoderSEOContent />
      <RelatedTools
        currentTool="base64-encoder-decoder"
        tools={["text-encrypt-decrypt", "hash-generator", "url-encoder-decoder"]}
      />
    </>
  );
}
