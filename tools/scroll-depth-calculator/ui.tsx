"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateScrollDepth, debounce, parseNum, formatFull, buildEmbedSnippet,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  PRESETS, DEFAULT_INPUTS,
  type Mode, type ScrollDepthInputs, type ScrollDepthResult, type HistoryEntry,
} from "./logic";
import ScrollDepthGauge from "./gauge";
import ScrollDepthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ScrollDepthCalculatorUI() {
  const [inputs, setInputs] = useState<ScrollDepthInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ScrollDepthResult>(calculateScrollDepth(DEFAULT_INPUTS));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [snapA, setSnapA] = useState<{ inputs: ScrollDepthInputs; result: ScrollDepthResult } | null>(null);
  const [snapB, setSnapB] = useState<{ inputs: ScrollDepthInputs; result: ScrollDepthResult } | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) setInputs((p) => ({ ...p, ...shared }));
    else primaryRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((inp: ScrollDepthInputs) => { setResult(calculateScrollDepth(inp)); }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  // Live browser simulation: track this page's real scroll position
  useEffect(() => {
    if (inputs.mode !== "live") return;
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewport = window.innerHeight || doc.clientHeight;
      const docHeight = doc.scrollHeight;
      setInputs((p) => ({ ...p, documentHeight: docHeight, viewportHeight: viewport, currentScroll: scrollTop }));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [inputs.mode]);

  const set = <K extends keyof ScrollDepthInputs>(field: K, val: ScrollDepthInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, mode: "manual", documentHeight: p.documentHeight, viewportHeight: p.viewportHeight, currentScroll: p.currentScroll }));
    primaryRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setSnapA(null); setSnapB(null);
    primaryRef.current?.focus();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(buildEmbedSnippet());
    setSnippetCopied(true); setTimeout(() => setSnippetCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `scroll-depth-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `scroll-depth-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, inputs));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const isLive = inputs.mode === "live";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</p>
          <select
            id="sdc-mode" value={inputs.mode}
            onChange={(e) => set("mode", e.target.value as Mode)}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
          >
            <option value="manual">Manual Calculation</option>
            <option value="live">Live Browser Simulation (tracks this page)</option>
          </select>
          <p className="text-xs text-gray-400 mt-2 font-mono">Scroll Depth (%) = ((Current Scroll + Viewport Height) ÷ Document Height) × 100</p>
          {!isLive && (
            <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Load example:</span>
              {PRESETS.map((preset) => (
                <button key={preset.label} type="button" onClick={() => handlePreset(preset)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                  <span>{preset.icon}</span><span>{preset.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Scroll Inputs</h3>

              {isLive ? (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-600">
                  Scroll this page up and down — the values below update automatically from your browser&apos;s real scroll position, viewport height, and document height.
                </div>
              ) : (
                <>
                  <NumField refEl={primaryRef} id="sdc-doc" label="Document Height (px)" value={inputs.documentHeight} onChange={(v) => set("documentHeight", v)} placeholder="5000" />
                  <NumField id="sdc-viewport" label="Viewport Height (px)" value={inputs.viewportHeight} onChange={(v) => set("viewportHeight", v)} placeholder="900" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sdc-scroll">
                      Current Scroll Position (px) — {formatFull(inputs.currentScroll)}
                    </label>
                    <input
                      id="sdc-scroll" type="range" min={0} max={Math.max(1, inputs.documentHeight)} step={10}
                      value={Math.min(inputs.currentScroll, inputs.documentHeight)}
                      onChange={(e) => set("currentScroll", parseInt(e.target.value, 10))}
                      className="w-full accent-primary"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {showAdvanced ? "− Hide" : "+ Show"} Optional Inputs
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 pt-2">
                  <NumField id="sdc-header" label="Sticky Header Height (px)" value={inputs.stickyHeaderHeight} onChange={(v) => set("stickyHeaderHeight", v)} placeholder="0" hint="Reduces effective viewport, since this space is always occupied." />
                  <NumField id="sdc-footer" label="Footer Height (px)" value={inputs.footerHeight} onChange={(v) => set("footerHeight", v)} placeholder="0" hint="Reduces effective document height, since the footer isn't readable content." />
                  <NumField id="sdc-offset" label="Offset Adjustment (px)" value={inputs.offsetAdjustment} onChange={(v) => set("offsetAdjustment", v)} placeholder="0" hint="Manual correction added to the scroll position." />
                </div>
              )}

              {result.warning && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.warning}</p>
              )}

              {/* Buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    {copied ? "✓ Copied!" : "Copy Results"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSnapA({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as A</button>
                  <button onClick={() => setSnapB({ inputs, result })} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Compare as B</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export CSV</button>
                  <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Export JSON</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handlePrint} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
                  <button onClick={handleShare} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                </div>
                <button onClick={handleCopySnippet} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {snippetCopied ? "✓ Snippet Copied!" : "Copy Embeddable JS Snippet"}
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Primary result card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <ScrollDepthGauge pct={result.scrollDepthPct} color={result.tier.color} />
                <div className="flex-1 w-full">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Scroll Depth — Result</p>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${result.tier.bg} ${result.tier.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${result.tier.dot}`} />
                    {result.tier.label}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, result.scrollDepthPct)}%`, backgroundColor: result.tier.color }} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.tier.explanation}</p>
                </div>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                <button onClick={handleCopy} className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-hover transition-colors text-sm">
                  {copied ? "✓ Copied!" : "Copy Results"}
                </button>
                <button onClick={handleSave} className="w-full border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Save to History
                </button>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <MetricCard label="Pixels Viewed" value={`${formatFull(result.pixelsViewed)} px`} />
              <MetricCard label="Pixels Remaining" value={`${formatFull(result.pixelsRemaining)} px`} />
              <MetricCard label="Reading Completion" value={`${result.scrollDepthPct.toFixed(1)}%`} />
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recommendation</h3>
              </div>
              <div className="px-5 py-4 text-sm text-gray-600 flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span>{result.tier.recommendation}</span>
              </div>
            </div>

            {/* Formula & breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Formula &amp; Calculation Breakdown</h3>
              </div>
              <div className="divide-y divide-gray-50">
                <div className="px-5 py-3">
                  <p className="text-xs text-gray-500 mb-1">Formula</p>
                  <p className="text-sm font-mono text-gray-800">{result.formula}</p>
                </div>
                <div className="px-5 py-3">
                  <p className="text-xs text-gray-500 mb-1">Calculation</p>
                  <p className="text-sm font-mono text-gray-800">{result.breakdown}</p>
                </div>
              </div>
            </div>

            {/* Compare scenarios */}
            {(snapA || snapB) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Compare Pages</h3>
                  <button onClick={() => { setSnapA(null); setSnapB(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {([["A", snapA], ["B", snapB]] as const).map(([label, s]) => (
                    <div key={label} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Page {label}{s ? ` — ${s.result.tier.label}` : ""}</span>
                        <span className="text-sm font-semibold font-mono text-gray-800">{s ? `${s.result.scrollDepthPct.toFixed(2)}%` : "— not set —"}</span>
                      </div>
                      {s && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${label === "A" ? "bg-blue-400" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, (s.result.scrollDepthPct / (Math.max(snapA?.result.scrollDepthPct ?? 0, snapB?.result.scrollDepthPct ?? 0) || 1)) * 100)}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.result.scrollDepthPct.toFixed(1)}% scroll depth</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{entry.result.tier.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ScrollDepthCalculatorSEO />

      <RelatedTools
        currentTool="scroll-depth-calculator"
        tools={[
          "session-duration-calculator",
          "page-speed-score-calculator",
          "click-heatmap-density-calculator",
          "bounce-rate-calculator",
          "engagement-rate-calculator",
          "conversion-rate-calculator",
        ]}
      />
    </>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold font-mono text-primary tabular-nums">{value}</p>
    </div>
  );
}

function NumField({
  id, label, value, onChange, placeholder, hint, refEl,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  hint?: string;
  refEl?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
      <input
        ref={refEl}
        id={id} type="number" min="0" step="1" inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(parseNum(e.target.value))}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
