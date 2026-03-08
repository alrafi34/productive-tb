"use client";

import { useState } from "react";
import {
  reverseLetters,
  reverseWords,
  reverseEachWord,
  reverseSentenceOrder,
  reverseParagraphOrder,
  countWords,
  countCharacters,
} from "./logic";

type ReverseMode = "letters" | "words" | "eachWord" | "sentences" | "paragraphs";

export default function TextReverserUI() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<ReverseMode>("letters");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const modes = [
    { value: "letters", label: "Reverse Letters", icon: "🔤" },
    { value: "words", label: "Reverse Words", icon: "🔄" },
    { value: "eachWord", label: "Reverse Each Word", icon: "🔃" },
    { value: "sentences", label: "Reverse Sentences", icon: "📝" },
    { value: "paragraphs", label: "Reverse Paragraphs", icon: "📄" },
  ];

  function handleReverse() {
    if (!text.trim()) return;
    
    let result = "";
    switch (mode) {
      case "letters":
        result = reverseLetters(text);
        break;
      case "words":
        result = reverseWords(text);
        break;
      case "eachWord":
        result = reverseEachWord(text);
        break;
      case "sentences":
        result = reverseSentenceOrder(text);
        break;
      case "paragraphs":
        result = reverseParagraphOrder(text);
        break;
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
    a.download = "reversed-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setText("");
    setOutput("");
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Reverse Mode
        </label>
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value as ReverseMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m.value
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-primary"
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
            Input Text
          </label>
          <span className="text-xs text-gray-400">
            {countWords(text)} words · {countCharacters(text)} characters
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your text here..."
          rows={8}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleReverse}
          disabled={!text.trim()}
          className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          🔄 Reverse Text
        </button>
        <button
          onClick={handleClear}
          disabled={!text && !output}
          className="border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              Reversed Text
            </label>
            <span className="text-xs text-gray-400">
              {countWords(output)} words · {countCharacters(output)} characters
            </span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 max-h-64 overflow-y-auto">
            <p className="text-sm text-gray-800 whitespace-pre-wrap break-words" style={{ fontFamily: "var(--font-body)" }}>
              {output}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
            <button
              onClick={handleDownload}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              💾 Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
