"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  detectComplexity,
  complexityFromLoops,
  buildChartData,
  COMPLEXITY_INFO,
  ALL_COMPLEXITIES,
  growthValue,
  saveHistory,
  getHistory,
  clearHistory,
  debounce,
  type Complexity,
  type HistoryEntry,
} from "./logic";
import TimeComplexitySEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const ALGORITHM_PRESETS = [
  { label: "Binary Search", input: "binary search" },
  { label: "Linear Search", input: "single loop over array" },
  { label: "Bubble Sort", input: "bubble sort nested loop" },
  { label: "Merge Sort", input: "merge sort" },
  { label: "Recursive Fibonacci", input: "fibonacci recursive" },
  { label: "Array Access", input: "array access by index" },
  { label: "Nested Loops", input: "nested loop" },
  { label: "Triple Nested", input: "triple nested loop" },
];

const DEFAULT_COMPARE: Complexity[] = ["O(log n)", "O(n)", "O(n log n)", "O(n²)"];

const RATING_BADGE: Record<string, string> = {
  excellent: "bg-green-100 text-green-700",
  good: "bg-blue-100 text-blue-700",
  fair: "bg-amber-100 text-amber-700",
  poor: "bg-orange-100 text-orange-700",
  terrible: "bg-red-100 text-red-700",
  catastrophic: "bg-red-200 text-red-900",
};

export default function TimeComplexityCalculatorUI() {
  const [mode, setMode] = useState<"detect" | "loops" | "compare">("detect");
  const [input, setInput] = useState("");
  const [loopCount, setLoopCount] = useState(1);
  const [recursionType, setRecursionType] = useState("none");
  const [detected, setDetected] = useState<Complexity | null>(null);
  const [confidence, setConfidence] = useState<string>("");
  const [compareSelected, setCompareSelected] = useState<Complexity[]>(DEFAULT_COMPARE);
  const [inputN, setInputN] = useState(100);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setHistory(getHistory()); }, []);

  // ── Auto-detect from text ───────────────────────────────────────────────────
  const runDetect = useCallback(
    debounce((val: string) => {
      const r = detectComplexity(val);
      if (r) { setDetected(r.complexity); setConfidence(r.confidence); }
      else { setDetected(null); setConfidence(""); }
    }, 150),
    []
  );

  useEffect(() => {
    if (mode === "detect") runDetect(input);
  }, [input, mode]);

  useEffect(() => {
    if (mode === "loops") {
      setDetected(complexityFromLoops(loopCount, recursionType));
      setConfidence("high");
    }
  }, [loopCount, recursionType, mode]);

  // ── Chart rendering ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
    const H = canvas.height = 200 * window.devicePixelRatio || 200;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    const w = canvas.offsetWidth || 600;
    const h = 200;

    ctx.clearRect(0, 0, w, h);

    const complexitiesToDraw = mode === "compare" ? compareSelected
      : detected ? [detected] : compareSelected;

    if (complexitiesToDraw.length === 0) return;

    // Cap n for chart readability — exponential/factorial explode fast
    const chartN = Math.min(inputN, 30);
    const data = buildChartData(complexitiesToDraw, chartN, 40);

    // Find max value for scaling (cap at reasonable)
    let maxVal = 1;
    for (const pt of data) {
      for (const c of complexitiesToDraw) {
        const v = pt.values[c];
        if (isFinite(v) && v > maxVal) maxVal = v;
      }
    }
    maxVal = Math.min(maxVal, 1e8);

    const padL = 40, padR = 16, padT = 16, padB = 30;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    // Grid
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + (i / 4) * chartH;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    }

    // Axes labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("n=" + chartN, padL + chartW, h - 6);
    ctx.fillText("n=1", padL, h - 6);
    ctx.textAlign = "right";
    ctx.fillText(formatBigNum(maxVal), padL - 4, padT + 6);

    // Lines
    for (const c of complexitiesToDraw) {
      const info = COMPLEXITY_INFO[c];
      ctx.strokeStyle = info.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let first = true;
      for (let i = 0; i < data.length; i++) {
        const pt = data[i];
        const raw = pt.values[c];
        const val = Math.min(raw, maxVal);
        const x = padL + (i / (data.length - 1)) * chartW;
        const y = padT + chartH - (val / maxVal) * chartH;
        if (first) { ctx.moveTo(x, y); first = false; }
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Legend
    let lx = padL;
    const ly = h - 6;
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    for (const c of complexitiesToDraw) {
      const info = COMPLEXITY_INFO[c];
      ctx.fillStyle = info.color;
      ctx.fillRect(lx, ly - 8, 10, 8);
      ctx.fillStyle = "#374151";
      ctx.fillText(c, lx + 13, ly);
      lx += ctx.measureText(c).width + 28;
    }
  }, [detected, compareSelected, inputN, mode]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const toggleCompare = (c: Complexity) => {
    setCompareSelected((prev) =>
      prev.includes(c) ? (prev.length > 1 ? prev.filter((x) => x !== c) : prev) : [...prev, c]
    );
  };

  const handleCopy = () => {
    const c = detected ?? (mode === "compare" ? compareSelected.join(", ") : null);
    if (!c) return;
    const info = typeof c === "string" && c in COMPLEXITY_INFO ? COMPLEXITY_INFO[c as Complexity] : null;
    const text = info
      ? `Algorithm: ${input || "pattern analysis"}\nEstimated Complexity: ${c}\nExplanation: ${info.explanation}`
      : `Compared complexities: ${compareSelected.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    const c = detected;
    if (!c) return;
    const info = COMPLEXITY_INFO[c];
    const text = [
      `Time Complexity Calculator`,
      `==========================`,
      `Input: ${input || "loop/recursion analysis"}`,
      `Estimated Complexity: ${c}`,
      `Classification: ${info.difficulty}`,
      `Rating: ${info.rating}`,
      ``,
      `Explanation:`,
      info.explanation,
      ``,
      `Real-World Analogy:`,
      info.analogy,
      ``,
      `Examples:`,
      info.examples.map((e) => `  - ${e}`).join("\n"),
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "time-complexity-analysis.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!detected) return;
    saveHistory({ input: input || `${loopCount} loop(s) + ${recursionType} recursion`, complexity: detected });
    setHistory(getHistory());
  };

  const handleReset = () => {
    setInput(""); setLoopCount(1); setRecursionType("none");
    setDetected(null); setConfidence(""); setCompareSelected(DEFAULT_COMPARE); setInputN(100);
  };

  const handleClearHistory = () => {
    if (confirm("Clear all history?")) { clearHistory(); setHistory([]); }
  };

  const info = detected ? COMPLEXITY_INFO[detected] : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">📊</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Time Complexity Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Estimate Big-O time complexity by describing your algorithm, configuring loops and recursion, or comparing growth rates visually. All analysis runs locally in your browser.
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
          {[
            { id: "detect", label: "Pattern Detector" },
            { id: "loops", label: "Loop Analyzer" },
            { id: "compare", label: "Growth Comparator" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id as any); setDetected(null); }}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs */}
          <div className="lg:col-span-4 space-y-5">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "detect" ? "Describe Your Algorithm" : mode === "loops" ? "Loop & Recursion Setup" : "Select Complexities"}
              </h3>

              {/* Pattern Detector */}
              {mode === "detect" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Algorithm Description</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="e.g. nested loop, binary search, merge sort, recursive fibonacci..."
                      rows={3}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                      aria-label="Algorithm Description"
                    />
                    <p className="text-xs text-gray-400 mt-1">Try: "nested loop", "binary search", "merge sort"</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
                    <div className="flex flex-wrap gap-1.5">
                      {ALGORITHM_PRESETS.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => setInput(p.input)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                            input === p.input
                              ? "bg-primary text-white border-primary"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Loop Analyzer */}
              {mode === "loops" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Nested Loops</label>
                    <select
                      value={loopCount}
                      onChange={(e) => setLoopCount(parseInt(e.target.value))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      aria-label="Loop Count"
                    >
                      <option value={0}>No loops</option>
                      <option value={1}>1 loop</option>
                      <option value={2}>2 nested loops</option>
                      <option value={3}>3 nested loops</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Recursion Type</label>
                    <select
                      value={recursionType}
                      onChange={(e) => setRecursionType(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      aria-label="Recursion Type"
                    >
                      <option value="none">No recursion</option>
                      <option value="single">Single recursion (tail)</option>
                      <option value="divide">Divide and conquer</option>
                      <option value="multiple">Multiple recursion (branching)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Growth Comparator */}
              {mode === "compare" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Complexities to Compare</label>
                  <div className="space-y-1.5">
                    {ALL_COMPLEXITIES.map((c) => {
                      const ci = COMPLEXITY_INFO[c];
                      return (
                        <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={compareSelected.includes(c)}
                            onChange={() => toggleCompare(c)}
                            className="accent-primary w-4 h-4 rounded"
                          />
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ci.color }} />
                          <span className="text-sm font-mono text-gray-800">{c}</span>
                          <span className="text-xs text-gray-400 hidden group-hover:inline">{ci.difficulty}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Input N slider (all modes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Input Size (n): <span className="font-mono text-primary">{inputN.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  value={inputN}
                  onChange={(e) => setInputN(parseInt(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Input Size"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>10</span><span>500</span><span>1,000</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Reset
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleExportTxt}
                    disabled={!detected}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Export TXT
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!detected && mode !== "compare"}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? "✓ Copied!" : "Copy"}
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

            {/* Result Summary Card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Complexity Result
              </p>
              {info && detected ? (
                <>
                  <div className="text-3xl font-bold font-mono mb-1">{detected}</div>
                  <div className="text-sm text-primary-100 mb-3">{info.name}</div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Classification</span>
                      <span className="font-semibold">{info.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Rating</span>
                      <span className="font-semibold capitalize">{info.rating}</span>
                    </div>
                    {confidence && (
                      <div className="flex justify-between">
                        <span className="text-primary-100">Confidence</span>
                        <span className="font-semibold capitalize">{confidence}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-primary-100">At n={inputN}</span>
                      <span className="font-mono font-semibold text-xs">{formatBigNum(growthValue(detected, inputN))} ops</span>
                    </div>
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    Save to History
                  </button>
                </>
              ) : (
                <div className="text-primary-100 text-sm">
                  {mode === "detect" ? "Describe an algorithm to detect complexity" : mode === "loops" ? "Configure loops above" : "Select complexities to compare"}
                </div>
              )}
            </div>

          </div>

          {/* Right: Visualization + Explanation */}
          <div className="lg:col-span-8 space-y-5">

            {/* Growth Chart */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Growth Visualization
                </h3>
              </div>
              <div className="p-5">
                <canvas
                  ref={canvasRef}
                  style={{ width: "100%", height: "200px", display: "block" }}
                  aria-label="Big-O growth chart"
                />
              </div>
            </div>

            {/* Explanation */}
            {info && detected && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Analysis: {detected}
                  </h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${RATING_BADGE[info.rating]}`}>
                    {info.rating}
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">{info.explanation}</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-amber-800 mb-1">Real-World Analogy</p>
                    <p className="text-sm text-amber-900">{info.analogy}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Common Examples</p>
                    <div className="flex flex-wrap gap-1.5">
                      {info.examples.map((ex) => (
                        <span key={ex} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">{ex}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pseudo-Code Example</p>
                    <pre className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-xs font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">{info.pseudoCode}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* All Complexities Reference Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Big-O Reference at n = {inputN.toLocaleString()}
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {ALL_COMPLEXITIES.map((c) => {
                  const ci = COMPLEXITY_INFO[c];
                  const ops = growthValue(c, inputN);
                  const isActive = detected === c;
                  return (
                    <div
                      key={c}
                      className={`flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ci.color }} />
                      <span className="font-mono text-sm font-semibold text-gray-900 w-24 flex-shrink-0">{c}</span>
                      <span className="text-xs text-gray-500 flex-1 hidden sm:block">{ci.difficulty}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${RATING_BADGE[ci.rating]}`}>{ci.rating}</span>
                      <span className="font-mono text-xs text-gray-700 w-28 text-right flex-shrink-0">{formatBigNum(ops)} ops</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Analysis History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved analyses yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => { setInput(entry.input); setMode("detect"); }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm font-bold text-primary">{entry.complexity}</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-gray-600 truncate">{entry.input}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <TimeComplexitySEO />

      <RelatedTools
        currentTool="time-complexity-calculator"
        tools={[
          "data-transfer-calculator",
          "bandwidth-calculator",
          "cidr-calculator",
          "subnet-calculator",
          "checksum-calculator",
          "ip-range-calculator",
        ]}
      />
    </>
  );
}

function formatBigNum(n: number): string {
  if (!isFinite(n) || n >= 1e15) return "∞";
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
}
