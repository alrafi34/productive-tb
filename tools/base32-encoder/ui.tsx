"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  transformBase32,
  debounce,
  exportAsText,
  formatBytes,
  Base32Mode,
  Base32Options,
} from "./logic";
import Base32EncoderSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_TEXT = "Hello World! This is a Base32 Encoder/Decoder.";

export default function Base32EncoderUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Base32Mode>("auto");
  const [detectedMode, setDetectedMode] = useState<'encode' | 'decode' | null>(null);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<Base32Options>({
    variant: 'rfc4648',
    uppercase: true,
    padding: true,
    grouping: false,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // Transform with debouncing
  const performTransform = useCallback((text: string, currentMode: Base32Mode, currentOptions: Base32Options) => {
    const { result, detectedMode: detected } = transformBase32(text, currentMode, currentOptions);
    setOutput(result);
    setDetectedMode(detected || null);
  }, []);

  // Debounced transform for large text
  const debouncedTransform = useCallback(
    debounce((text: string, currentMode: Base32Mode, currentOptions: Base32Options) => {
      performTransform(text, currentMode, currentOptions);
    }, 120),
    [performTransform]
  );

  // Handle input change
  const handleInputChange = (text: string) => {
    setInput(text);

    if (text.length > 1000) {
      debouncedTransform(text, mode, options);
    } else {
      performTransform(text, mode, options);
    }
  };

  // Handle mode change
  const handleModeChange = (newMode: Base32Mode) => {
    setMode(newMode);
    if (input) {
      performTransform(input, newMode, options);
    }
  };

  // Handle options change
  const handleOptionsChange = (newOptions: Partial<Base32Options>) => {
    const updatedOptions = { ...options, ...newOptions };
    setOptions(updatedOptions);
    if (input) {
      performTransform(input, mode, updatedOptions);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    setDetectedMode(null);
  };

  // Load example
  const loadExample = () => {
    setInput(EXAMPLE_TEXT);
    handleInputChange(EXAMPLE_TEXT);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (input) {
          performTransform(input, mode, options);
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "c" && document.activeElement === outputRef.current) {
        e.preventDefault();
        copyToClipboard(output);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, mode, options, output, performTransform]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Base32 Encoder/Decoder</h3>
              <p className="text-sm text-blue-800">
                Convert text to Base32 or decode Base32 back to text instantly. Perfect for 2FA secrets, TOTP authentication, and developer workflows. All processing happens locally in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Conversion Mode
          </h2>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {([["encode", "Encode"], ["decode", "Decode"], ["auto", "Auto Detect"]] as const).map(([m, label]) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  mode === m
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-800 mb-1">{label}</div>
                <div className="text-xs text-gray-500">
                  {m === "encode" && "Convert text to Base32"}
                  {m === "decode" && "Convert Base32 to text"}
                  {m === "auto" && "Automatically detect format"}
                </div>
              </button>
            ))}
          </div>

          {detectedMode && mode === "auto" && (
            <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              ✓ Auto-detected: {detectedMode === "encode" ? "Encoding to Base32" : "Decoding from Base32"}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Options
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
              <select
                value={options.variant}
                onChange={(e) => handleOptionsChange({ variant: e.target.value as 'rfc4648' | 'crockford' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="rfc4648">RFC 4648 (Standard)</option>
                <option value="crockford">Crockford Base32</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => handleOptionsChange({ uppercase: e.target.checked })}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Uppercase Output</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.padding}
                  onChange={(e) => handleOptionsChange({ padding: e.target.checked })}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Add Padding (=)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.grouping}
                  onChange={(e) => handleOptionsChange({ grouping: e.target.checked })}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Group Output (8 chars)</span>
              </label>
            </div>
          </div>
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
                <button
                  onClick={loadExample}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  📝 Example
                </button>
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
              className="w-full h-80 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-primary"
              placeholder={`Paste text to encode or Base32 to decode...\n\nExample:\n${EXAMPLE_TEXT}`}
            />

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{input.length.toLocaleString()} characters ({formatBytes(new Blob([input]).size)})</span>
              <span>Ctrl+Enter to convert</span>
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
                  onClick={() => copyToClipboard(output)}
                  disabled={!output}
                  className="px-3 py-1 bg-primary hover:bg-primary-hover disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? "✓ Copied" : "📋 Copy"}
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
              <span>{output.length.toLocaleString()} characters ({formatBytes(new Blob([output]).size)})</span>
              {output.startsWith("Error:") && (
                <span className="text-red-500 font-semibold">⚠️ {output}</span>
              )}
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Export Options
          </h2>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => exportAsText(output, "base32-output")}
              disabled={!output}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📄 Export as TXT
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="p-4 bg-gray-50 rounded-lg">
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

      <Base32EncoderSEOContent />
      <RelatedTools
        currentTool="base32-encoder"
        tools={["base64-encoder-decoder", "text-encrypt-decrypt", "hash-generator"]}
      />
    </>
  );
}