"use client";

import { useState } from "react";
import { toUpperCase, toLowerCase, toTitleCase, toSentenceCase } from "./logic";
import SentenceCaseConverterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type CaseType = "uppercase" | "lowercase" | "titlecase" | "sentencecase";

export default function SentenceCaseConverterUI() {
  const [text, setText] = useState("");
  const [caseType, setCaseType] = useState<CaseType>("sentencecase");
  const [copied, setCopied] = useState(false);

  const convertText = (input: string, type: CaseType): string => {
    switch (type) {
      case "uppercase": return toUpperCase(input);
      case "lowercase": return toLowerCase(input);
      case "titlecase": return toTitleCase(input);
      case "sentencecase": return toSentenceCase(input);
      default: return input;
    }
  };

  const output = text ? convertText(text, caseType) : "";

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const caseOptions = [
    { value: "uppercase" as CaseType, label: "UPPERCASE", icon: "🔠" },
    { value: "lowercase" as CaseType, label: "lowercase", icon: "🔡" },
    { value: "titlecase" as CaseType, label: "Title Case", icon: "🔤" },
    { value: "sentencecase" as CaseType, label: "Sentence case", icon: "📝" },
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows={8}
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

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Select Case Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {caseOptions.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => setCaseType(value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  caseType === value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {output && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Converted Text
            </label>
            <div className="relative">
              <div
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px] leading-relaxed"
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
            onClick={() => setText("")}
            disabled={!text}
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🗑️ Reset
          </button>
        </div>
      </div>
      
      <SentenceCaseConverterSEOContent />
      
      <RelatedTools
        tools={[
          {
            slug: "text-reverser",
            name: "Text Reverser",
            description: "Reverse letters or words in your text.",
            icon: "🔄",
            category: "writing"
          },
          {
            slug: "paragraph-formatter",
            name: "Paragraph Formatter",
            description: "Remove extra spaces and line breaks from text.",
            icon: "📝",
            category: "writing"
          },
          {
            slug: "word-counter",
            name: "Word Counter",
            description: "Count words, characters, and paragraphs.",
            icon: "📝",
            category: "writing"
          }
        ]}
      />
    </>
  );
}
