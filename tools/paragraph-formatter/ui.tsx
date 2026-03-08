"use client";

import { useState } from "react";
import { removeExtraSpaces, fixLineBreaks, trimEmptyLines, formatParagraphs, autoFormat } from "./logic";
import ParagraphFormatterSEOContent from "./seo-content";

export default function ParagraphFormatterUI() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [wrapLength, setWrapLength] = useState(80);

  function handleFormat(type: string) {
    let result = "";
    switch (type) {
      case "spaces":
        result = removeExtraSpaces(text);
        break;
      case "linebreaks":
        result = fixLineBreaks(text);
        break;
      case "emptylines":
        result = trimEmptyLines(text);
        break;
      case "paragraphs":
        result = formatParagraphs(text, showAdvanced ? { wrapLength } : undefined);
        break;
      case "auto":
        result = autoFormat(text);
        break;
      default:
        result = text;
    }
    setOutput(result);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const formatOptions = [
    { value: "spaces", label: "Remove Extra Spaces", icon: "🔤" },
    { value: "linebreaks", label: "Fix Line Breaks", icon: "↩️" },
    { value: "emptylines", label: "Trim Empty Lines", icon: "📄" },
    { value: "paragraphs", label: "Format Paragraphs", icon: "📝" },
    { value: "auto", label: "Auto-Format", icon: "✨" },
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            rows={8}
            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />
          {text && (
            <button
              onClick={() => { setText(""); setOutput(""); }}
              className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-100"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Select Formatting Action
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {formatOptions.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => handleFormat(value)}
                disabled={!text}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-semibold text-center" style={{ fontFamily: "var(--font-heading)" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {showAdvanced ? "▼" : "▶"} Advanced Options
          </button>
          {showAdvanced && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Wrap Length (characters per line)
              </label>
              <input
                type="number"
                value={wrapLength}
                onChange={e => setWrapLength(Number(e.target.value))}
                min={40}
                max={200}
                className="w-full sm:w-48 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-gray-500 mt-2">Used with "Format Paragraphs" option</p>
            </div>
          )}
        </div>

        {output && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Formatted Text
            </label>
            <div className="relative">
              <div
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px] leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {output}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copied ? "✅ Copied!" : "📋 Copy Result"}
          </button>
          <button
            onClick={handleDownload}
            disabled={!output}
            className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            💾 Download TXT
          </button>
          <button
            onClick={() => { setText(""); setOutput(""); }}
            disabled={!text && !output}
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🗑️ Reset
          </button>
        </div>
      </div>
      
      <ParagraphFormatterSEOContent />
    </>
  );
}
