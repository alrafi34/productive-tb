"use client";

import { useEffect, useState } from "react";
import {
  countWords, countCharacters, countCharactersNoSpaces,
  countParagraphs, countSentences, estimateReadingTime,
  formatDuration, pages, averageSentenceLength, uniqueWordCount, topWords,
  READING_WPM, SPEAKING_WPM, WORDS_PER_PAGE_SINGLE, WORDS_PER_PAGE_DOUBLE, LIMITS,
} from "./logic";
import WordCounterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const DRAFT_KEY = "word-counter:draft";
const GOAL_KEY = "word-counter:goal";

export default function WordCounterUI() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [goal, setGoal] = useState("");
  const [skipCommon, setSkipCommon] = useState(true);

  // Restore the last draft and goal after hydration; the draft never leaves this browser
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) setText(draft);
        const savedGoal = localStorage.getItem(GOAL_KEY);
        if (savedGoal) setGoal(savedGoal);
      } catch {
        // storage unavailable
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const save = (key: string, value: string) => {
    try {
      if (value) localStorage.setItem(key, value);
      else localStorage.removeItem(key);
    } catch {
      // storage unavailable or full
    }
  };
  const updateText = (value: string) => { setText(value); save(DRAFT_KEY, value); };
  const updateGoal = (value: string) => {
    const digits = value.replace(/[^0-9]/g, "");
    setGoal(digits);
    save(GOAL_KEY, digits);
  };

  const words = countWords(text);
  const characters = countCharacters(text);
  const target = Number(goal) || 0;
  const progress = target ? Math.min(100, (words / target) * 100) : 0;
  const frequent = topWords(text, 10, skipCommon);

  const stats = [
    { label: "Words",        value: words.toLocaleString("en-US"),                         icon: "📝" },
    { label: "Characters",   value: characters.toLocaleString("en-US"),                    icon: "🔤" },
    { label: "No Spaces",    value: countCharactersNoSpaces(text).toLocaleString("en-US"), icon: "✂️" },
    { label: "Sentences",    value: countSentences(text).toLocaleString("en-US"),          icon: "💬" },
    { label: "Paragraphs",   value: countParagraphs(text).toLocaleString("en-US"),         icon: "📄" },
    { label: "Reading Time", value: `${estimateReadingTime(text)} min`,                    icon: "⏱️" },
  ];

  const details = [
    { label: `Reading time (${READING_WPM} wpm)`, value: formatDuration(words, READING_WPM) },
    { label: `Speaking time (${SPEAKING_WPM} wpm)`, value: formatDuration(words, SPEAKING_WPM) },
    { label: "Pages, single-spaced", value: pages(words, WORDS_PER_PAGE_SINGLE) },
    { label: "Pages, double-spaced", value: pages(words, WORDS_PER_PAGE_DOUBLE) },
    { label: "Unique words", value: uniqueWordCount(text).toLocaleString("en-US") },
    { label: "Words per sentence", value: averageSentenceLength(text).toFixed(1) },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(
      [...stats, ...details].map(s => `${s.label}: ${s.value}`).join("\n"),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={e => updateText(e.target.value)}
            placeholder="Paste or type your text here — it is saved in this browser only"
            rows={10}
            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />
          {text && (
            <button
              onClick={() => updateText("")}
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
            onClick={() => updateText("")}
            disabled={!text}
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🗑️ Reset
          </button>
        </div>

        {/* Word goal */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="wc-goal" className="text-sm font-semibold text-gray-800">Word goal</label>
            <input
              id="wc-goal"
              inputMode="numeric"
              value={goal}
              onChange={e => updateGoal(e.target.value)}
              placeholder="e.g. 1500"
              className="w-32 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {target > 0 && (
              <span className="text-sm text-gray-600">
                {words >= target
                  ? `Reached — ${(words - target).toLocaleString("en-US")} over`
                  : `${(target - words).toLocaleString("en-US")} to go`}
              </span>
            )}
          </div>
          {target > 0 && (
            <div className="mt-3 h-2.5 rounded-full bg-gray-100 overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* Time, pages, style */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {details.map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg border border-gray-100 px-4 py-3">
              <div className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Pages assume 12 pt type and 1-inch margins (about {WORDS_PER_PAGE_SINGLE} words single-spaced, {WORDS_PER_PAGE_DOUBLE} double-spaced).
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Character limits */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Character limits</h2>
            <ul className="space-y-2.5">
              {LIMITS.map(({ name, limit, note }) => {
                const over = characters > limit;
                return (
                  <li key={name} title={note}>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">{name}</span>
                      <span className={over ? "font-semibold text-red-500" : "text-gray-500"}>
                        {characters.toLocaleString("en-US")} / {limit.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full ${over ? "bg-red-400" : "bg-primary"}`}
                        style={{ width: `${Math.min(100, (characters / limit) * 100)}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-gray-400">Limits as published in 2026; platforms change them.</p>
          </div>

          {/* Most frequent words */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-800">Most used words</h2>
              <label className="flex items-center gap-1.5 text-xs text-gray-500">
                <input type="checkbox" checked={skipCommon} onChange={e => setSkipCommon(e.target.checked)} />
                Skip common words
              </label>
            </div>
            {frequent.length === 0 ? (
              <p className="text-xs text-gray-400">Start typing to see which words you repeat.</p>
            ) : (
              <table className="w-full text-xs">
                <tbody className="divide-y divide-gray-50">
                  {frequent.map(({ word, count, percent }) => (
                    <tr key={word}>
                      <td className="py-1 text-gray-800 break-all">{word}</td>
                      <td className="py-1 text-right font-mono text-gray-600">{count}</td>
                      <td className="py-1 text-right font-mono text-gray-400 w-16">{percent.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
      <RelatedStrip />
      <WordCounterSEOContent />
      
      <RelatedTools />
    </>
  );
}
