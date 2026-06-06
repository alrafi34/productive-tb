"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  Timeframe,
  Currency,
  CalcInputs,
  HistoryEntry,
} from "./types";
import {
  MODEL_PRESETS,
  PROVIDERS,
  CURRENCY_SYMBOLS,
  DEFAULT_EXCHANGE_RATES,
  USAGE_TEMPLATES,
  COMPARISON_MODEL_IDS,
  calculateCost,
  validateInputs,
  formatCurrency,
  formatTokens,
  parseTokenInput,
  saveHistory,
  getHistory,
  clearHistory,
  buildExportText,
  buildCSV,
  downloadFile,
  debounce,
} from "./logic";
import AITokenCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type TabId = "calculator" | "compare";

const TIMEFRAMES: { id: Timeframe; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD"];

export default function AITokenCostCalculatorUI() {
  // ── Tab ────────────────────────────────────────────────────────────────────
  const [tab, setTab] = useState<TabId>("calculator");

  // ── Calculator inputs ──────────────────────────────────────────────────────
  const [modelId, setModelId] = useState("gpt-4o-mini");
  const [inputTokensRaw, setInputTokensRaw] = useState("100000");
  const [outputTokensRaw, setOutputTokensRaw] = useState("50000");
  const [inputPrice, setInputPrice] = useState("0.15");
  const [outputPrice, setOutputPrice] = useState("0.60");
  const [requests, setRequests] = useState("1000");
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [exchangeRate, setExchangeRate] = useState("");

  // ── UI state ───────────────────────────────────────────────────────────────
  const [result, setResult] = useState<ReturnType<typeof calculateCost>>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    inputRef.current?.focus();
  }, []);

  // ── Sync model price on model change ──────────────────────────────────────
  useEffect(() => {
    const preset = MODEL_PRESETS.find((m) => m.id === modelId);
    if (preset) {
      setInputPrice(String(preset.inputPricePer1M));
      setOutputPrice(String(preset.outputPricePer1M));
    }
  }, [modelId]);

  // ── Sync exchange rate on currency change ─────────────────────────────────
  useEffect(() => {
    if (!exchangeRate) {
      // don't override if user typed a custom rate
    }
  }, [currency]);

  // ── Build inputs ───────────────────────────────────────────────────────────
  const buildInputs = useCallback((): CalcInputs => {
    const rate = parseFloat(exchangeRate) || DEFAULT_EXCHANGE_RATES[currency] || 1;
    return {
      modelId,
      inputTokens: parseTokenInput(inputTokensRaw),
      outputTokens: parseTokenInput(outputTokensRaw),
      inputPricePer1M: parseFloat(inputPrice) || 0,
      outputPricePer1M: parseFloat(outputPrice) || 0,
      requests: parseInt(requests) || 1,
      timeframe,
      currency,
      exchangeRate: rate,
    };
  }, [modelId, inputTokensRaw, outputTokensRaw, inputPrice, outputPrice, requests, timeframe, currency, exchangeRate]);

  // ── Calculation ────────────────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const inputs = buildInputs();
      const err = validateInputs(inputs);
      if (err) { setError(err); setResult(null); return; }
      setError(null);
      setResult(calculateCost(inputs));
    }, 120),
    [buildInputs]
  );

  useEffect(() => { run(); }, [
    modelId, inputTokensRaw, outputTokensRaw, inputPrice, outputPrice,
    requests, timeframe, currency, exchangeRate, run,
  ]);

  // ── Comparison results ─────────────────────────────────────────────────────
  const comparisonResults = COMPARISON_MODEL_IDS.map((id) => {
    const preset = MODEL_PRESETS.find((m) => m.id === id);
    if (!preset) return null;
    const rate = parseFloat(exchangeRate) || DEFAULT_EXCHANGE_RATES[currency] || 1;
    const inputs: CalcInputs = {
      modelId: id,
      inputTokens: parseTokenInput(inputTokensRaw),
      outputTokens: parseTokenInput(outputTokensRaw),
      inputPricePer1M: preset.inputPricePer1M,
      outputPricePer1M: preset.outputPricePer1M,
      requests: parseInt(requests) || 1,
      timeframe,
      currency,
      exchangeRate: rate,
    };
    return { preset, result: calculateCost(inputs) };
  }).filter(Boolean) as { preset: typeof MODEL_PRESETS[0]; result: NonNullable<ReturnType<typeof calculateCost>> }[];

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleReset = () => {
    setModelId("gpt-4o-mini");
    setInputTokensRaw("100000");
    setOutputTokensRaw("50000");
    setInputPrice("0.15");
    setOutputPrice("0.60");
    setRequests("1000");
    setTimeframe("monthly");
    setCurrency("USD");
    setExchangeRate("");
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const preset = MODEL_PRESETS.find((m) => m.id === modelId);
    const text = buildExportText(preset?.name ?? "Custom", buildInputs(), result);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    if (!result) return;
    const preset = MODEL_PRESETS.find((m) => m.id === modelId);
    downloadFile(buildExportText(preset?.name ?? "Custom", buildInputs(), result), "ai-token-cost.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    const preset = MODEL_PRESETS.find((m) => m.id === modelId);
    downloadFile(buildCSV(preset?.name ?? "Custom", buildInputs(), result), "ai-token-cost.csv", "text/csv");
  };

  const handleExportJSON = () => {
    if (!result) return;
    const preset = MODEL_PRESETS.find((m) => m.id === modelId);
    const data = { model: preset?.name ?? "Custom", inputs: buildInputs(), result };
    downloadFile(JSON.stringify(data, null, 2), "ai-token-cost.json", "application/json");
  };

  const handleSave = () => {
    if (!result) return;
    const preset = MODEL_PRESETS.find((m) => m.id === modelId);
    saveHistory(preset?.name ?? "Custom", buildInputs(), result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const applyTemplate = (t: typeof USAGE_TEMPLATES[0]) => {
    setInputTokensRaw(String(t.inputTokens));
    setOutputTokensRaw(String(t.outputTokens));
    setRequests(String(t.requests));
    setTimeframe(t.timeframe);
  };

  // Ctrl+Enter shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [run]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const sym = CURRENCY_SYMBOLS[currency] ?? "$";
  const currentPreset = MODEL_PRESETS.find((m) => m.id === modelId);
  const providerGroups = PROVIDERS.map((p) => ({
    provider: p,
    models: MODEL_PRESETS.filter((m) => m.provider === p),
  }));

  const fc = (usd: number) => {
    const rate = parseFloat(exchangeRate) || DEFAULT_EXCHANGE_RATES[currency] || 1;
    return formatCurrency(usd * rate, sym);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🤖</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              AI Token Cost Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Estimate API costs for OpenAI, Claude, Gemini, and more. Enter token counts and requests to get instant
              cost breakdowns and monthly forecasts. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
          {(["calculator", "compare"] as TabId[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t === "calculator" ? "Calculator" : "Compare Models"}
            </button>
          ))}
        </div>

        {tab === "calculator" && (
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left: Inputs */}
            <div className="lg:col-span-4 space-y-5">

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Model & Tokens
                </h3>

                {/* Model selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">AI Model</label>
                  <select
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="AI Model"
                  >
                    {providerGroups.map(({ provider, models }) => (
                      <optgroup key={provider} label={provider}>
                        {models.map((m) => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {currentPreset?.notes && (
                    <p className="text-xs text-gray-400 mt-1">{currentPreset.notes}</p>
                  )}
                  {currentPreset?.contextWindow && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Context: {formatTokens(currentPreset.contextWindow)} tokens
                    </p>
                  )}
                </div>

                {/* Input tokens */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prompt (Input) Tokens
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputTokensRaw}
                    onChange={(e) => setInputTokensRaw(e.target.value)}
                    placeholder="100000"
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                    aria-label="Prompt Tokens"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Supports: 100k, 1.5M, 2B — {formatTokens(parseTokenInput(inputTokensRaw))} tokens
                  </p>
                </div>

                {/* Output tokens */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Completion (Output) Tokens
                  </label>
                  <input
                    type="text"
                    value={outputTokensRaw}
                    onChange={(e) => setOutputTokensRaw(e.target.value)}
                    placeholder="50000"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    aria-label="Completion Tokens"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTokens(parseTokenInput(outputTokensRaw))} tokens
                  </p>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Input $/1M</label>
                    <input
                      type="number"
                      value={inputPrice}
                      min="0"
                      step="any"
                      onChange={(e) => { setInputPrice(e.target.value); setModelId("custom"); }}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      aria-label="Input Price per 1M tokens"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Output $/1M</label>
                    <input
                      type="number"
                      value={outputPrice}
                      min="0"
                      step="any"
                      onChange={(e) => { setOutputPrice(e.target.value); setModelId("custom"); }}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      aria-label="Output Price per 1M tokens"
                    />
                  </div>
                </div>

                {/* Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Requests</label>
                  <input
                    type="number"
                    value={requests}
                    min="1"
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="1000"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    aria-label="Number of Requests"
                  />
                </div>

                {/* Timeframe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeframe</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIMEFRAMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTimeframe(t.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          timeframe === t.id
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Currency */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      aria-label="Currency"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>{c} ({CURRENCY_SYMBOLS[c]})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Exchange Rate
                    </label>
                    <input
                      type="number"
                      value={exchangeRate}
                      min="0"
                      step="any"
                      onChange={(e) => setExchangeRate(e.target.value)}
                      placeholder={String(DEFAULT_EXCHANGE_RATES[currency])}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      aria-label="Custom Exchange Rate"
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <p className="text-xs text-gray-400">
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl+Enter</kbd> to recalculate
                </p>

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleReset}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Reset
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={handleExportTxt}
                      disabled={!result}
                      className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      TXT
                    </button>
                    <button
                      onClick={handleExportCSV}
                      disabled={!result}
                      className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      CSV
                    </button>
                    <button
                      onClick={handleExportJSON}
                      disabled={!result}
                      className="px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      JSON
                    </button>
                  </div>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {showHistory ? "Hide" : "Show"} History
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}>
                  Cost Summary
                </p>
                {result ? (
                  <>
                    <div className="text-2xl font-bold font-mono mb-1 break-all leading-snug">
                      {fc(result.totalCostUSD)}
                    </div>
                    <div className="text-sm text-primary-100 mb-3">
                      {currentPreset?.name ?? "Custom"} · {parseInt(requests).toLocaleString()} req / {timeframe}
                    </div>
                    <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-primary-100">Daily</span>
                        <span className="font-semibold font-mono text-xs">{fc(result.dailyCostUSD)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Monthly</span>
                        <span className="font-semibold font-mono text-xs">{fc(result.monthlyCostUSD)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Yearly</span>
                        <span className="font-semibold font-mono text-xs">{fc(result.yearlyCostUSD)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={handleCopy}
                        className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        {copied ? "✓ Copied!" : "Copy Results"}
                      </button>
                      <button
                        onClick={handleSave}
                        className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                      >
                        Save to History
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-primary-100 text-sm">Enter values above to calculate</div>
                )}
              </div>

            </div>

            {/* Right: Results + Templates + History */}
            <div className="lg:col-span-8 space-y-5">

              {/* Usage templates */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Usage Templates
                </h3>
                <div className="flex flex-wrap gap-2">
                  {USAGE_TEMPLATES.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => applyTemplate(t)}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost breakdown table */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Cost Breakdown
                  </h3>
                </div>
                {result ? (
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Input Token Cost", value: fc(result.inputCostUSD), mono: true },
                      { label: "Output Token Cost", value: fc(result.outputCostUSD), mono: true },
                      { label: "Cost per Request", value: fc(result.costPerRequestUSD), mono: true },
                      { label: "Cost per 1,000 Requests", value: fc(result.costPer1kRequestsUSD), mono: true },
                      { label: `Total (${timeframe})`, value: fc(result.totalCostUSD), mono: true },
                      { label: "Daily Estimate", value: fc(result.dailyCostUSD), mono: true },
                      { label: "Weekly Estimate", value: fc(result.weeklyCostUSD), mono: true },
                      { label: "Monthly Estimate", value: fc(result.monthlyCostUSD), mono: true },
                      { label: "Yearly Estimate", value: fc(result.yearlyCostUSD), mono: true },
                    ].map(({ label, value, mono }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    {error ?? "Enter token values to see cost breakdown"}
                  </div>
                )}
              </div>

              {/* Cost proportion bar */}
              {result && (result.inputCostUSD + result.outputCostUSD > 0) && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Input vs Output Cost Split
                  </h3>
                  {(() => {
                    const total = result.inputCostUSD + result.outputCostUSD;
                    const inPct = total > 0 ? (result.inputCostUSD / total) * 100 : 50;
                    const outPct = 100 - inPct;
                    return (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Input tokens</span>
                            <span className="font-mono font-semibold">{fc(result.inputCostUSD)} ({inPct.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${inPct}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Output tokens</span>
                            <span className="font-mono font-semibold">{fc(result.outputCostUSD)} ({outPct.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full transition-all duration-300" style={{ width: `${outPct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Inline hint */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-amber-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  💡 Token Reference
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  1M tokens ≈ 750,000 words ≈ 1,500 pages. Output tokens cost more because generation is compute-intensive.
                  Use the model dropdown to auto-fill current pricing. For custom models, edit the $/1M fields directly.
                </p>
              </div>

              {/* History */}
              {showHistory && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                      Calculation History
                    </h3>
                    {history.length > 0 && (
                      <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                    {history.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                    ) : (
                      history.map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() => {
                            setModelId(entry.inputs.modelId);
                            setInputTokensRaw(String(entry.inputs.inputTokens));
                            setOutputTokensRaw(String(entry.inputs.outputTokens));
                            setInputPrice(String(entry.inputs.inputPricePer1M));
                            setOutputPrice(String(entry.inputs.outputPricePer1M));
                            setRequests(String(entry.inputs.requests));
                            setTimeframe(entry.inputs.timeframe);
                            setCurrency(entry.inputs.currency);
                            setShowHistory(false);
                          }}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-800">{entry.modelName}</span>
                            <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-primary font-mono font-semibold">
                            {formatCurrency(entry.result.totalCostUSD, "$")} · {entry.inputs.requests.toLocaleString()} reqs / {entry.inputs.timeframe}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ── Compare tab ─────────────────────────────────────────────────────── */}
        {tab === "compare" && (
          <div className="space-y-5">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                Side-by-Side Model Comparison
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Based on the token counts and request settings from the Calculator tab.
                Adjust those values to update the comparison.
              </p>

              {/* Current settings reminder */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-5">
                <span className="px-2 py-1 bg-gray-50 rounded border border-gray-200">
                  Input: {formatTokens(parseTokenInput(inputTokensRaw))} tokens
                </span>
                <span className="px-2 py-1 bg-gray-50 rounded border border-gray-200">
                  Output: {formatTokens(parseTokenInput(outputTokensRaw))} tokens
                </span>
                <span className="px-2 py-1 bg-gray-50 rounded border border-gray-200">
                  {parseInt(requests).toLocaleString()} reqs / {timeframe}
                </span>
                <span className="px-2 py-1 bg-gray-50 rounded border border-gray-200">
                  {currency}
                </span>
              </div>

              {/* Comparison table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Model</th>
                      <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Provider</th>
                      <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">$/1M in</th>
                      <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">$/1M out</th>
                      <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">Per req</th>
                      <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</th>
                      <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">Yearly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonResults
                      .sort((a, b) => a.result.monthlyCostUSD - b.result.monthlyCostUSD)
                      .map(({ preset, result: r }, idx) => {
                        const isCheapest = idx === 0;
                        const rate = parseFloat(exchangeRate) || DEFAULT_EXCHANGE_RATES[currency] || 1;
                        const fconv = (usd: number) => formatCurrency(usd * rate, sym, 4);
                        return (
                          <tr
                            key={preset.id}
                            className={`hover:bg-gray-50 ${isCheapest ? "bg-green-50" : ""}`}
                          >
                            <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-800">
                              {preset.name}
                              {isCheapest && (
                                <span className="ml-2 text-xs text-green-700 font-semibold bg-green-100 px-1.5 py-0.5 rounded">
                                  Cheapest
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-2.5 border border-gray-200 text-gray-500 text-xs">{preset.provider}</td>
                            <td className="px-4 py-2.5 border border-gray-200 font-mono text-right text-gray-700">${preset.inputPricePer1M}</td>
                            <td className="px-4 py-2.5 border border-gray-200 font-mono text-right text-gray-700">${preset.outputPricePer1M}</td>
                            <td className="px-4 py-2.5 border border-gray-200 font-mono text-right font-semibold text-gray-900">
                              {fconv(r.costPerRequestUSD)}
                            </td>
                            <td className="px-4 py-2.5 border border-gray-200 font-mono text-right font-semibold text-gray-900">
                              {fconv(r.totalCostUSD)}
                            </td>
                            <td className="px-4 py-2.5 border border-gray-200 font-mono text-right font-semibold text-gray-900">
                              {fconv(r.yearlyCostUSD)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Sorted by {timeframe} cost ascending. Prices are approximate and may change. Verify with provider pricing pages.
              </p>
            </div>

          </div>
        )}

      </div>

      <AITokenCostCalculatorSEO />

      <RelatedTools
        currentTool="ai-token-cost-calculator"
        tools={[
          "ai-prompt-length-calculator",
          "download-time-calculator",
          "data-transfer-calculator",
          "time-complexity-calculator",
          "latency-calculator",
          "bandwidth-calculator",
        ]}
      />
    </>
  );
}
