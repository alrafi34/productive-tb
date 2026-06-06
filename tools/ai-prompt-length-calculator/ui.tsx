"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ModelId, TokenMode, HistoryEntry } from "./types";
import {
  MODELS,
  TOKEN_MODE_LABELS,
  EXAMPLE_PROMPTS,
  analyzePrompt,
  formatNumber,
  formatTokens,
  formatReadingTime,
  saveHistory,
  getHistory,
  clearHistory,
  buildExportText,
  buildExportJSON,
  downloadFile,
  debounce,
} from "./logic";
import AIPromptLengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const TOKEN_MODES: { id: TokenMode; label: string }[] = [
  { id: "fast", label: "Fast" },
  { id: "accurate", label: "Accurate" },
  { id: "code", label: "Code" },
  { id: "multilingual", label: "Multilingual" },
];

const CONTEXT_STATUS_COLORS = {
  ok: "text-green-700 bg-green-50 border-green-200",
  warn: "text-yellow-700 bg-yellow-50 border-yellow-200",
  danger: "text-red-700 bg-red-50 border-red-200",
};

const PROMPT_TYPE_LABELS: Record<string, string> = {
  text: "Plain Text",
  code: "Code",
  markdown: "Markdown",
  json: "JSON / Structured Data",
  structured: "System / Structured Prompt",
};

export default function AIPromptLengthCalculatorUI() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [prompt, setPrompt] = useState("");
  const [modelId, setModelId] = useState<ModelId>("generic");
  const [tokenMode, setTokenMode] = useState<TokenMode>("fast");
  const [showCost, setShowCost] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const result = prompt.trim()
    ? analyzePrompt(prompt, modelId, tokenMode)
    : null;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    textareaRef.current?.focus();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "c") {
        e.preventDefault();
        handleCopyStats();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [result]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleClear = () => {
    setPrompt("");
    textareaRef.current?.focus();
  };

  const handleCopyStats = () => {
    if (!result) return;
    const model = MODELS.find((m) => m.id === modelId)!;
    const text = [
      `Characters: ${formatNumber(result.characters)}`,
      `Words: ${formatNumber(result.words)}`,
      `Sentences: ${formatNumber(result.sentences)}`,
      `Estimated Tokens: ${formatNumber(result.estimatedTokens)}`,
      `Context Usage: ${result.contextUsagePct.toFixed(2)}% of ${model.name}`,
      `Reading Time: ${formatReadingTime(result.readingTimeSeconds)}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    if (!result) return;
    const model = MODELS.find((m) => m.id === modelId)!;
    downloadFile(buildExportText(prompt, model.name, result), "prompt-analysis.txt");
  };

  const handleExportJSON = () => {
    if (!result) return;
    downloadFile(buildExportJSON(prompt, modelId, result), "prompt-analysis.json", "application/json");
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(prompt, modelId, result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all prompt history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setModelId(entry.modelId);
    setShowHistory(false);
  };

  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  // Context bar width (capped at 100%)
  const ctxBarPct = result ? Math.min(result.contextUsagePct, 100) : 0;
  const ctxBarColor =
    !result ? "bg-gray-200"
    : result.contextStatus === "danger" ? "bg-red-500"
    : result.contextStatus === "warn" ? "bg-yellow-400"
    : "bg-primary";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">📏</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              AI Prompt Length Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Paste any prompt to instantly count tokens, words, characters, and see how much of the model context window
              it uses. All analysis runs locally — nothing is sent to any server.
            </p>
          </div>
        </div>

        {/* Controls row */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap gap-3 items-end">

            {/* Model selector */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">AI Model</label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value as ModelId)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                aria-label="AI Model"
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({(m.contextWindow / 1000).toFixed(0)}K ctx)</option>
                ))}
              </select>
            </div>

            {/* Tokenization mode */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Estimation Mode</label>
              <div className="flex gap-1">
                {TOKEN_MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTokenMode(m.id)}
                    className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                      tokenMode === m.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost toggle */}
            <div className="flex items-center gap-2 pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                <input
                  type="checkbox"
                  checked={showCost}
                  onChange={(e) => setShowCost(e.target.checked)}
                  className="accent-primary w-4 h-4"
                  aria-label="Show API cost estimate"
                />
                Show Cost
              </label>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Textarea + actions */}
          <div className="lg:col-span-7 space-y-4">

            {/* Textarea */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Prompt
                  {result && (
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      {PROMPT_TYPE_LABELS[result.promptType]}
                    </span>
                  )}
                </h3>
                {prompt && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste your AI prompt here…"
                className="w-full px-4 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-0 font-mono leading-relaxed"
                style={{ minHeight: "280px" }}
                aria-label="AI Prompt Input"
                spellCheck={false}
              />
              {/* Character count footer */}
              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-400">
                <span>{formatNumber(prompt.length)} characters</span>
                <span>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded font-mono">Ctrl+Shift+C</kbd> copy stats
                </span>
              </div>
            </div>

            {/* Example prompts */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Example Prompts
              </h3>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setPrompt(ex.text)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      prompt === ex.text
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyStats}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "Copy Stats"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save to History
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExportTxt}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export TXT
                </button>
                <button
                  onClick={handleExportJSON}
                  disabled={!result}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export JSON
                </button>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                {showHistory ? "Hide" : "Show"} History
              </button>
            </div>

            {/* History panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Recent Prompts
                  </h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved prompts yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => loadFromHistory(entry)}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500">
                            {MODELS.find((m) => m.id === entry.modelId)?.name ?? entry.modelId}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 truncate">{entry.snippet}</p>
                        <div className="text-xs text-primary font-mono font-semibold mt-1">
                          {formatTokens(entry.result.estimatedTokens)} tokens · {formatNumber(entry.result.words)} words
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right: Stats + Context + Cost */}
          <div className="lg:col-span-5 space-y-5">

            {/* Primary result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ fontFamily: "var(--font-heading)" }}>
                Token Estimate
              </p>
              {result ? (
                <>
                  <div className="text-3xl font-bold font-mono mb-1">
                    {formatTokens(result.estimatedTokens)}
                  </div>
                  <div className="text-sm text-primary-100 mb-3">
                    {TOKEN_MODE_LABELS[tokenMode]} · {model.name}
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Characters</span>
                      <span className="font-semibold font-mono">{formatNumber(result.characters)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Words</span>
                      <span className="font-semibold font-mono">{formatNumber(result.words)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Context Used</span>
                      <span className="font-semibold font-mono">{result.contextUsagePct.toFixed(1)}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-primary-100 text-sm">Paste a prompt to start analysis</div>
              )}
            </div>

            {/* Context window bar */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Context Window Usage
                </h3>
                <span className="text-xs font-mono text-gray-500">
                  {result ? `${formatTokens(result.estimatedTokens)} / ${formatTokens(model.contextWindow)}` : `0 / ${formatTokens(model.contextWindow)}`}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div
                  className={`${ctxBarColor} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${ctxBarPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>0%</span>
                <span className={result?.contextStatus === "warn" ? "text-yellow-600 font-semibold" : ""}>75%</span>
                <span className={result?.contextStatus === "danger" ? "text-red-600 font-semibold" : ""}>100%</span>
              </div>
              {result && (
                <div className={`mt-3 px-3 py-2 rounded-lg border text-xs ${CONTEXT_STATUS_COLORS[result.contextStatus]}`}>
                  {result.suggestion}
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Text Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Characters", value: result ? formatNumber(result.characters) : "—" },
                  { label: "No Spaces", value: result ? formatNumber(result.charactersNoSpaces) : "—" },
                  { label: "Words", value: result ? formatNumber(result.words) : "—" },
                  { label: "Unique Words", value: result ? formatNumber(result.uniqueWords) : "—" },
                  { label: "Sentences", value: result ? formatNumber(result.sentences) : "—" },
                  { label: "Paragraphs", value: result ? formatNumber(result.paragraphs) : "—" },
                  { label: "Lines", value: result ? formatNumber(result.lines) : "—" },
                  { label: "Reading Time", value: result ? formatReadingTime(result.readingTimeSeconds) : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="text-base font-bold text-gray-900 font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity + prompt type */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Prompt Analysis
                </h3>

                {/* Complexity bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Complexity</span>
                    <span className="font-semibold">{result.complexityLabel} ({result.complexityScore}/100)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${result.complexityScore}%` }}
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Prompt Type</span>
                    <span className="text-sm font-semibold text-gray-900">{PROMPT_TYPE_LABELS[result.promptType]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Tokens (raw)</span>
                    <span className="text-sm font-semibold text-gray-900 font-mono">{formatNumber(result.estimatedTokens)}</span>
                  </div>
                  {result.chunkingSuggested && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Suggested Chunks</span>
                      <span className="text-sm font-semibold text-orange-700">{result.suggestedChunks}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Optional cost estimate */}
            {showCost && result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Estimated API Cost
                </h3>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "This prompt (input)", value: `$${result.inputCostUSD.toFixed(6)}` },
                    { label: "1,000 requests", value: `$${(result.inputCostUSD * 1000).toFixed(4)}` },
                    { label: "10,000 requests", value: `$${(result.inputCostUSD * 10_000).toFixed(3)}` },
                    { label: "1M tokens / day", value: `$${(model.inputPricePer1M).toFixed(2)}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className="text-sm font-semibold text-gray-900 font-mono">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Input cost only · {model.name} · ${model.inputPricePer1M}/1M tokens
                </p>
              </div>
            )}

            {/* All models comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Context Usage Across Models
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {MODELS.filter((m) => m.id !== "generic").slice(0, 7).map((m) => {
                    const pct = Math.min((result.estimatedTokens / m.contextWindow) * 100, 100);
                    const status = pct >= 100 ? "danger" : pct >= 75 ? "warn" : "ok";
                    const barColor = status === "danger" ? "bg-red-400" : status === "warn" ? "bg-yellow-400" : "bg-primary";
                    return (
                      <div key={m.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                          <span className="font-medium text-gray-700">{m.name}</span>
                          <span className="font-mono">
                            {pct >= 100
                              ? <span className="text-red-600 font-semibold">Exceeds limit</span>
                              : `${pct.toFixed(1)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`${barColor} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <AIPromptLengthCalculatorSEO />

      <RelatedTools
        currentTool="ai-prompt-length-calculator"
        tools={[
          "ai-token-cost-calculator",
          "download-time-calculator",
          "time-complexity-calculator",
          "latency-calculator",
          "data-transfer-calculator",
          "bandwidth-calculator",
        ]}
      />
    </>
  );
}
