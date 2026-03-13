"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  testRegex,
  getReplacementPreview,
  highlightMatches,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsJSON,
  exportAsCSV,
  REGEX_CHEAT_SHEET,
  EXAMPLE_PATTERNS,
  getFlagDescription,
  RegexFlag,
  RegexMatch,
  RegexHistory
} from "./logic";
import RegexTesterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_TEXT = `Email: john@example.com
Phone: 123-456-7890
Website: https://example.com
Date: 2026-03-13
IP: 192.168.1.1`;

export default function RegexTesterUI() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<RegexFlag[]>([]);
  const [testText, setTestText] = useState(EXAMPLE_TEXT);
  const [replacement, setReplacement] = useState("");
  const [result, setResult] = useState<any>(null);
  const [replacementPreview, setReplacementPreview] = useState<any>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [history, setHistory] = useState<RegexHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const textRef = useRef<HTMLDivElement>(null);
  const testTextRef = useRef<HTMLTextAreaElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Test regex
  const performTest = useCallback((p: string, f: string, t: string) => {
    const testResult = testRegex(p, f, t);
    setResult(testResult);
    setCurrentMatchIndex(0);

    // Save to history if valid
    if (testResult.valid && p && t) {
      saveToHistory(p, f.split('') as RegexFlag[], t);
      setHistory(getHistory());
    }

    // Get replacement preview
    if (replacement && testResult.valid) {
      const preview = getReplacementPreview(p, f, t, replacement);
      setReplacementPreview(preview);
    }
  }, [replacement]);

  // Debounced test
  const debouncedTest = useCallback(
    debounce((p: string, f: string, t: string) => {
      performTest(p, f, t);
    }, 300),
    [performTest]
  );

  // Handle pattern change
  const handlePatternChange = (newPattern: string) => {
    setPattern(newPattern);
    const flagsStr = flags.join('');
    if (newPattern.length > 500) {
      debouncedTest(newPattern, flagsStr, testText);
    } else {
      performTest(newPattern, flagsStr, testText);
    }
  };

  // Handle flag change
  const handleFlagChange = (flag: RegexFlag) => {
    const newFlags = flags.includes(flag)
      ? flags.filter(f => f !== flag)
      : [...flags, flag];
    setFlags(newFlags);
    const flagsStr = newFlags.join('');
    performTest(pattern, flagsStr, testText);
  };

  // Handle test text change
  const handleTestTextChange = (newText: string) => {
    setTestText(newText);
    const flagsStr = flags.join('');
    if (newText.length > 1000) {
      debouncedTest(pattern, flagsStr, newText);
    } else {
      performTest(pattern, flagsStr, newText);
    }
  };

  // Handle replacement change
  const handleReplacementChange = (newReplacement: string) => {
    setReplacement(newReplacement);
    if (result?.valid && pattern) {
      const preview = getReplacementPreview(pattern, flags.join(''), testText, newReplacement);
      setReplacementPreview(preview);
    }
  };

  // Navigate matches
  const goToMatch = (index: number) => {
    if (result?.matches && result.matches.length > 0) {
      const newIndex = (index + result.matches.length) % result.matches.length;
      setCurrentMatchIndex(newIndex);
      
      // Scroll to match
      if (testTextRef.current) {
        const match = result.matches[newIndex];
        testTextRef.current.focus();
        testTextRef.current.setSelectionRange(match.index, match.endIndex);
      }
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Load from history
  const loadFromHistory = (item: RegexHistory) => {
    setPattern(item.pattern);
    setFlags(item.flags);
    setTestText(item.testText);
    setShowHistory(false);
    performTest(item.pattern, item.flags.join(''), item.testText);
  };

  // Load example
  const loadExample = (example: typeof EXAMPLE_PATTERNS[0]) => {
    setPattern(example.pattern);
    setFlags(['g']);
    setTestText(example.example);
    performTest(example.pattern, 'g', example.example);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        performTest(pattern, flags.join(''), testText);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setPattern('');
        setTestText('');
        setReplacement('');
        setFlags([]);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowCheatSheet(!showCheatSheet);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pattern, flags, testText, showCheatSheet, performTest]);

  const currentMatch = result?.matches?.[currentMatchIndex];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Info Banner */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">RegEx Tester</h3>
              <p className="text-sm text-purple-800">
                Test regular expressions with live highlighting, capture groups, and replacement preview. All processing happens locally in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Regex Input Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Regular Expression
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => handlePatternChange(e.target.value)}
              placeholder="Enter regex pattern (e.g., \d+, [a-z]+, etc.)"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Flags */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Flags</label>
            <div className="flex flex-wrap gap-3">
              {(['g', 'i', 'm', 's', 'u', 'y'] as RegexFlag[]).map((flag) => (
                <label key={flag} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flags.includes(flag)}
                    onChange={() => handleFlagChange(flag)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-mono text-gray-700">{flag}</span>
                  <span className="text-xs text-gray-500" title={getFlagDescription(flag)}>
                    ({getFlagDescription(flag)})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {result && !result.valid && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              ❌ {result.error}
            </div>
          )}

          {/* Quick Examples */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quick Examples</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {EXAMPLE_PATTERNS.map((example) => (
                <button
                  key={example.name}
                  onClick={() => loadExample(example)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                  title={example.pattern}
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Test Text Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Test String
          </h2>

          <textarea
            ref={testTextRef}
            value={testText}
            onChange={(e) => handleTestTextChange(e.target.value)}
            className="w-full h-48 px-4 py-3 rounded-lg border-2 border-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-primary"
            placeholder="Enter text to test the regex against..."
          />

          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>{testText.length.toLocaleString()} characters</span>
            <button
              onClick={() => setTestText('')}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results Panel */}
        {result && (
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Matches */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Matches
              </h2>

              {result.valid ? (
                <>
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm font-semibold text-blue-900">
                      Total Matches: <span className="text-lg">{result.totalMatches}</span>
                    </div>
                  </div>

                  {result.totalMatches > 0 ? (
                    <>
                      <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                        {result.matches.map((match: RegexMatch, idx: number) => (
                          <div
                            key={idx}
                            onClick={() => setCurrentMatchIndex(idx)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              idx === currentMatchIndex
                                ? 'bg-primary/10 border-2 border-primary'
                                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="font-mono text-sm font-semibold text-gray-900 break-all">
                              {match.match}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Index: {match.index}–{match.endIndex}
                            </div>
                          </div>
                        ))}
                      </div>

                      {result.matches.length > 1 && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => goToMatch(currentMatchIndex - 1)}
                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => goToMatch(currentMatchIndex + 1)}
                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No matches found
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Invalid regex pattern
                </div>
              )}
            </div>

            {/* Capture Groups */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Capture Groups
              </h2>

              {result.valid && currentMatch ? (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-xs text-green-600 mb-1">Full Match</div>
                    <div className="font-mono text-sm font-semibold text-gray-900 break-all">
                      {currentMatch.match}
                    </div>
                  </div>

                  {currentMatch.groups.length > 0 ? (
                    currentMatch.groups.map((group: string | undefined, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Group {idx + 1}</div>
                        <div className="font-mono text-sm text-gray-900 break-all">
                          {group || '(empty)'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      No capture groups
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {result.valid && result.totalMatches === 0
                    ? 'No matches to display'
                    : 'Invalid regex pattern'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Replacement Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Replacement
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Replace With</label>
            <input
              type="text"
              value={replacement}
              onChange={(e) => handleReplacementChange(e.target.value)}
              placeholder="Enter replacement string (e.g., [MATCH], $1, etc.)"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {replacementPreview && replacementPreview.success && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 mb-2">Preview</div>
              <div className="font-mono text-sm text-gray-900 break-all max-h-32 overflow-y-auto">
                {replacementPreview.result}
              </div>
              <button
                onClick={() => copyToClipboard(replacementPreview.result, 'replacement')}
                className={`mt-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  copiedType === 'replacement'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {copiedType === 'replacement' ? '✓ Copied' : '📋 Copy Result'}
              </button>
            </div>
          )}
        </div>

        {/* Export & Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Export & Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => copyToClipboard(pattern, 'pattern')}
              disabled={!pattern}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 ${
                copiedType === 'pattern'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {copiedType === 'pattern' ? '✓ Copied' : '📋 Copy Pattern'}
            </button>

            <button
              onClick={() => result?.matches && exportAsJSON(result.matches, pattern)}
              disabled={!result?.valid || result?.totalMatches === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
            >
              📥 Export JSON
            </button>

            <button
              onClick={() => result?.matches && exportAsCSV(result.matches, pattern)}
              disabled={!result?.valid || result?.totalMatches === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
            >
              📥 Export CSV
            </button>

            <button
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-semibold transition-colors"
            >
              📖 {showCheatSheet ? 'Hide' : 'Show'} Cheat Sheet
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-semibold transition-colors"
            >
              📜 {showHistory ? 'Hide' : 'Show'} History ({history.length})
            </button>
          </div>
        </div>

        {/* Cheat Sheet */}
        {showCheatSheet && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Regex Cheat Sheet
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {REGEX_CHEAT_SHEET.map((section) => (
                <div key={section.category}>
                  <h3 className="font-semibold text-gray-900 mb-3">{section.category}</h3>
                  <div className="space-y-2">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded border border-gray-200">
                        <div className="font-mono text-sm font-semibold text-primary">{item.pattern}</div>
                        <div className="text-xs text-gray-600">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {showHistory && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Recent Tests (Last 20)
              </h2>
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

            {history.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                  >
                    <div className="font-mono text-sm font-semibold text-gray-900 break-all">
                      {item.pattern}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Flags: {item.flags.join('') || 'none'} • {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No history yet
              </div>
            )}
          </div>
        )}

        {/* Keyboard Shortcuts */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Keyboard Shortcuts</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+Enter</kbd> Run test
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+L</kbd> Clear all
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+/</kbd> Toggle cheat sheet
            </div>
          </div>
        </div>
      </div>

      <RegexTesterSEOContent />
      <RelatedTools
        currentTool="regex-tester"
        tools={["json-validator", "text-diff-checker", "find-and-replace"]}
      />
    </>
  );
}
