"use client";

import { useState, useEffect, useCallback } from "react";
import {
  countWords,
  countCharacters,
  countCharactersNoSpaces,
  countParagraphs,
  countSentences,
  calculateReadingTime,
  calculateSpeakingTime,
  formatReadingTime,
  getReadingDifficulty,
  READING_SPEEDS,
  debounce
} from "./logic";
import ReadingTimeCalculatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ReadingTimeCalculatorUI() {
  const [text, setText] = useState("");
  const [customWPM, setCustomWPM] = useState(200);
  const [useCustomWPM, setUseCustomWPM] = useState(false);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const stats = {
    words: countWords(text),
    characters: countCharacters(text),
    charactersNoSpaces: countCharactersNoSpaces(text),
    paragraphs: countParagraphs(text),
    sentences: countSentences(text),
    difficulty: getReadingDifficulty(countWords(text))
  };

  const readingTimes = Object.entries(READING_SPEEDS).map(([key, speed]) => ({
    key,
    label: speed.label,
    wpm: speed.wpm,
    time: calculateReadingTime(text, speed.wpm),
    formatted: formatReadingTime(calculateReadingTime(text, speed.wpm))
  }));

  const customReadingTime = useCustomWPM ? calculateReadingTime(text, customWPM) : 0;
  const speakingTime = calculateSpeakingTime(text);

  const debouncedSetText = useCallback(
    debounce((value: string) => setText(value), 150),
    []
  );

  const handleTextChange = (value: string) => {
    setText(value);
    debouncedSetText(value);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length > 1000) {
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const copyResults = () => {
    const results = [
      `Word Count: ${stats.words}`,
      `Character Count: ${stats.characters}`,
      `Reading Time Estimates:`,
      ...readingTimes.map(rt => `${rt.label} (${rt.wpm} WPM): ${rt.formatted}`),
      useCustomWPM ? `Custom (${customWPM} WPM): ${formatReadingTime(customReadingTime)}` : '',
      `Speaking Time: ${formatReadingTime(speakingTime)}`,
      `Difficulty: ${stats.difficulty}`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(results);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportBadge = () => {
    const avgTime = readingTimes.find(rt => rt.key === 'average')?.formatted || '0 min';
    const badge = `${avgTime} read`;
    navigator.clipboard.writeText(badge);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
  };

  useEffect(() => {
    const savedText = localStorage.getItem('reading-time-calculator-text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    if (text) {
      localStorage.setItem('reading-time-calculator-text', text);
    } else {
      localStorage.removeItem('reading-time-calculator-text');
    }
  }, [text]);

  const containerClass = darkMode 
    ? "bg-gray-900 text-white" 
    : "bg-gray-50 text-gray-900";

  return (
    <>
      <div className={`max-w-4xl mx-auto transition-colors duration-300 ${containerClass}`}>
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-primary transition-colors text-sm"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
          {text && (
            <div className="text-sm text-gray-500">
              {stats.words > 0 && `${stats.words} words • ${stats.difficulty}`}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="relative mb-8">
          <textarea
            value={text}
            onChange={e => handleTextChange(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste your blog post or article here to calculate reading time..."
            rows={12}
            className={`w-full rounded-xl border px-5 py-4 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed ${
              darkMode 
                ? "border-gray-700 bg-gray-800 text-white" 
                : "border-gray-200 bg-white text-gray-800"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          />
          {text && (
            <button
              onClick={clearText}
              className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-100"
            >
              Clear
            </button>
          )}
          {!text && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-sm">Paste text to estimate reading time</div>
              </div>
            </div>
          )}
        </div>

        {text && (
          <div id="results" className="space-y-8">
            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Words", value: stats.words, icon: "📝" },
                { label: "Characters", value: stats.characters, icon: "🔤" },
                { label: "No Spaces", value: stats.charactersNoSpaces, icon: "✂️" },
                { label: "Sentences", value: stats.sentences, icon: "💬" },
                { label: "Paragraphs", value: stats.paragraphs, icon: "📄" },
                { label: "Difficulty", value: stats.difficulty, icon: "📊" }
              ].map(({ label, value, icon }) => (
                <div key={label} className={`rounded-xl border shadow-sm p-4 flex flex-col gap-1 ${
                  darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
                }`}>
                  <span className="text-xl">{icon}</span>
                  <span className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                    {value}
                  </span>
                  <span className="text-xs text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            {/* Reading Time Estimates */}
            <div className={`rounded-xl border shadow-sm p-6 ${
              darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
            }`}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                ⏱️ Reading Time Estimates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {readingTimes.map(({ key, label, wpm, formatted }) => (
                  <div key={key} className={`p-4 rounded-lg border ${
                    darkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"
                  }`}>
                    <div className="text-sm text-gray-500 mb-1">{label}</div>
                    <div className="text-xl font-bold text-primary">{formatted}</div>
                    <div className="text-xs text-gray-400">{wpm} WPM</div>
                  </div>
                ))}
              </div>

              {/* Custom WPM */}
              <div className="border-t pt-4">
                <label className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={useCustomWPM}
                    onChange={e => setUseCustomWPM(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Custom Reading Speed</span>
                </label>
                {useCustomWPM && (
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="100"
                      max="500"
                      value={customWPM}
                      onChange={e => setCustomWPM(Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="text-sm font-medium min-w-0">
                      {customWPM} WPM = {formatReadingTime(customReadingTime)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Speaking Time */}
            <div className={`rounded-xl border shadow-sm p-6 ${
              darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
            }`}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                🎤 Speaking Time
              </h3>
              <div className="text-2xl font-bold text-primary mb-1">
                {formatReadingTime(speakingTime)}
              </div>
              <div className="text-sm text-gray-500">
                Based on average speaking speed (150 WPM)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={copyResults}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy Results"}
              </button>
              <button
                onClick={exportBadge}
                className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🏷️ Copy Badge
              </button>
              <button
                onClick={clearText}
                className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🗑️ Clear
              </button>
            </div>

            {/* Reading Time Badge Preview */}
            <div className={`rounded-xl border shadow-sm p-6 ${
              darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
            }`}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                🏷️ Reading Time Badge Preview
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {readingTimes.find(rt => rt.key === 'average')?.formatted || '0 min'} read
                </div>
                <div className="border border-primary text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {readingTimes.find(rt => rt.key === 'average')?.formatted || '0 min'} read
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {readingTimes.find(rt => rt.key === 'average')?.formatted || '0 min'} read
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <ReadingTimeCalculatorSEOContent />
      
      <RelatedTools currentTool="reading-time-calculator" tools={["word-counter", "word-frequency-counter", "paragraph-formatter"]} />
    </>
  );
}