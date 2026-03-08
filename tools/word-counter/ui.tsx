"use client";

import { useState } from "react";
import {
  countWords, countCharacters, countCharactersNoSpaces,
  countParagraphs, countSentences, estimateReadingTime,
} from "./logic";
import WordCounterSEOContent from "./seo-content";

export default function WordCounterUI() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: "Words",        value: countWords(text),                   icon: "📝" },
    { label: "Characters",   value: countCharacters(text),              icon: "🔤" },
    { label: "No Spaces",    value: countCharactersNoSpaces(text),      icon: "✂️" },
    { label: "Sentences",    value: countSentences(text),               icon: "💬" },
    { label: "Paragraphs",   value: countParagraphs(text),              icon: "📄" },
    { label: "Reading Time", value: `${estimateReadingTime(text)} min`, icon: "⏱️" },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(stats.map(s => `${s.label}: ${s.value}`).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows={10}
            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />
          {text && (
            <button
              onClick={() => setText("")}
              className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-100"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1">
              <span className="text-xl">{icon}</span>
              <span className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>{value}</span>
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copied ? "✅ Copied!" : "📋 Copy Results"}
          </button>
          <button
            onClick={() => setText("")}
            disabled={!text}
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🗑️ Reset
          </button>
        </div>
      </div>
      
      <WordCounterSEOContent />
    </>
  );
}
