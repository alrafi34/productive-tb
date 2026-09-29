"use client";

import { useEffect, useMemo, useState } from "react";
import { findWords, parseWordList, type WordEntry } from "./logic";

const WORDS_URL = "/data/anagram-words.txt";

/* Dictionary search: every word that can be made from a set of letters.
   The 63,000-word list (about 185 KB compressed) is fetched after the page
   has loaded, so it never slows down the first paint. */
export default function AnagramWordFinder() {
  const [letters, setLetters] = useState("listen");
  const [minLength, setMinLength] = useState(3);
  const [dictionary, setDictionary] = useState<WordEntry[] | null>(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(WORDS_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => { if (!cancelled) setDictionary(parseWordList(text)); })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, []);

  const tooLong = letters.replace(/[^a-z?*]/gi, "").length > 15;
  const result = useMemo(
    () => (dictionary && letters.trim() && !tooLong ? findWords(letters, dictionary, minLength) : null),
    [dictionary, letters, minLength, tooLong]
  );

  const copyAll = () => {
    if (!result) return;
    const lines = [
      result.exact.length ? `Anagrams: ${result.exact.join(", ")}` : "",
      ...result.byLength.map((g) => `${g.length} letters: ${g.words.join(", ")}`),
    ].filter(Boolean);
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, () => {});
  };

  const chip = "px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-sm font-mono text-gray-800";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Find Anagrams and Words</h2>
        <p className="text-sm text-gray-500 mt-1">Enter letters to see every English word they make. Use ? for a blank tile.</p>
      </div>
      <div className="grid sm:grid-cols-[1fr_10rem] gap-3">
        <div>
          <label htmlFor="af-letters" className="block text-sm font-medium text-gray-700 mb-1">Letters</label>
          <input
            id="af-letters"
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
            maxLength={30}
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. listen or c?t"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-lg tracking-wider focus:ring-2 focus:ring-[#058554] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="af-min" className="block text-sm font-medium text-gray-700 mb-1">Shortest word</label>
          <select
            id="af-min"
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#058554]"
          >
            {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} letters</option>)}
          </select>
        </div>
      </div>

      {tooLong && <p className="text-sm text-amber-700">Enter up to 15 letters.</p>}
      {error && <p className="text-sm text-red-600">The word list could not be loaded. Check your connection and reload the page.</p>}
      {!dictionary && !error && <p className="text-sm text-gray-500" data-testid="af-loading">Loading the word list…</p>}

      {result && (
        <div className="space-y-4" data-testid="af-results">
          <div className="rounded-lg border border-[#058554]/30 bg-[#058554]/5 p-4">
            <p className="text-sm font-semibold text-[#058554] mb-2">
              Anagrams using all {result.letters.length + (letters.match(/[?*]/g) || []).length} letters
            </p>
            {result.exact.length ? (
              <div className="flex flex-wrap gap-2" data-testid="af-exact">
                {result.exact.map((w) => <span key={w} className={`${chip} bg-white font-semibold`}>{w}</span>)}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No single-word anagram in the dictionary. Try the shorter words below, or a phrase anagram made of two words.</p>
            )}
          </div>

          {result.byLength.map((g) => (
            <div key={g.length}>
              <p className="text-sm font-semibold text-gray-700 mb-2">{g.length}-letter words <span className="font-normal text-gray-400">({g.words.length})</span></p>
              <div className="flex flex-wrap gap-2">
                {g.words.slice(0, 150).map((w) => <span key={w} className={chip}>{w}</span>)}
                {g.words.length > 150 && <span className="text-sm text-gray-500 self-center">+{g.words.length - 150} more</span>}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">{result.total.toLocaleString("en-US")} words found. Common words are listed first.</p>
            <button onClick={copyAll} className="px-4 py-2 bg-[#058554] text-white rounded-lg hover:bg-[#047045] text-sm font-medium">
              {copied ? "Copied" : "Copy all"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
