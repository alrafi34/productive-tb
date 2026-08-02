"use client";

import { useState, useEffect, useRef } from "react";
import {
  datasetToBytes, throughputToBps, timeToSeconds, bpsToUnit, bytesToAuto, formatDuration, formatNum,
  calculateThroughput, calculateTime, calculateDatasetSize, calculateCompare, isThroughputError,
  debounce, saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  SAMPLE_PRESETS, DATASET_UNITS, THROUGHPUT_UNITS, TIME_UNITS,
  type Mode, type DatasetUnit, type ThroughputUnit, type TimeUnit,
  type ThroughputResult, type HistoryEntry, type SavedInput,
} from "./logic";
import BigDataThroughputCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const MODE_OPTIONS: { id: Mode; label: string }[] = [
  { id: "required-throughput", label: "Calculate Required Throughput" },
  { id: "time", label: "Calculate Processing Time" },
  { id: "dataset-size", label: "Calculate Dataset Size" },
  { id: "compare", label: "Compare Multiple Throughputs" },
];

const SPEED_COLORS: Record<string, string> = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-amber-100 text-amber-700",
  "Very High": "bg-green-100 text-green-700",
};

export default function BigDataThroughputCalculatorUI() {
  const [mode, setMode] = useState<Mode>("required-throughput");
  const [datasetValue, setDatasetValue] = useState("500");
  const [datasetUnit, setDatasetUnit] = useState<DatasetUnit>("GB");
  const [throughputValue, setThroughputValue] = useState("250");
  const [throughputUnit, setThroughputUnit] = useState<ThroughputUnit>("MBps");
  const [timeValue, setTimeValue] = useState("1");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("hours");
  const [compareValues, setCompareValues] = useState("100, 250, 500, 1000");
  const [workers, setWorkers] = useState(1);
  const [efficiencyPct, setEfficiencyPct] = useState(100);

  const [result, setResult] = useState<ThroughputResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSamples, setShowSamples] = useState(false);

  const runRef = useRef(debounce((
    m: Mode, dv: string, du: DatasetUnit, tv: string, tu: ThroughputUnit, timv: string, timu: TimeUnit, cv: string, w: number, eff: number
  ) => {
    const datasetBytes = datasetToBytes(parseFloat(dv) || 0, du);
    const throughputBps = throughputToBps(parseFloat(tv) || 0, tu);
    const timeSeconds = timeToSeconds(parseFloat(timv) || 0, timu);

    let r: ThroughputResult | { error: string };
    if (m === "required-throughput") {
      r = calculateThroughput(datasetBytes, timeSeconds, w, eff, "required-throughput");
    } else if (m === "time") {
      r = calculateTime(datasetBytes, throughputBps, w, eff);
    } else if (m === "dataset-size") {
      r = calculateDatasetSize(throughputBps, timeSeconds, w, eff);
    } else {
      const values = cv.split(",").map((s) => throughputToBps(parseFloat(s.trim()) || 0, tu)).filter((v) => v > 0);
      r = calculateCompare(datasetBytes, values, w, eff);
    }

    if (isThroughputError(r)) { setResult(null); setError(r.error); }
    else { setError(null); setResult(r); }
  }, 150));

  const persistRef = useRef(debounce((data: SavedInput) => saveInput(data), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    const saved = loadInput();
    const initial = shared ?? saved;
    if (initial) {
      setMode(initial.mode); setDatasetValue(initial.datasetValue); setDatasetUnit(initial.datasetUnit);
      setThroughputValue(initial.throughputValue); setThroughputUnit(initial.throughputUnit);
      setTimeValue(initial.timeValue); setTimeUnit(initial.timeUnit);
      setCompareValues(initial.compareValues || "100, 250, 500, 1000");
      setWorkers(initial.workers); setEfficiencyPct(initial.efficiencyPct);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runRef.current(mode, datasetValue, datasetUnit, throughputValue, throughputUnit, timeValue, timeUnit, compareValues, workers, efficiencyPct);
  }, [mode, datasetValue, datasetUnit, throughputValue, throughputUnit, timeValue, timeUnit, compareValues, workers, efficiencyPct]);

  useEffect(() => {
    persistRef.current({ mode, datasetValue, datasetUnit, throughputValue, throughputUnit, timeValue, timeUnit, compareValues, workers, efficiencyPct });
  }, [mode, datasetValue, datasetUnit, throughputValue, throughputUnit, timeValue, timeUnit, compareValues, workers, efficiencyPct]);

  const handleReset = () => {
    setMode("required-throughput"); setDatasetValue("500"); setDatasetUnit("GB");
    setThroughputValue("250"); setThroughputUnit("MBps"); setTimeValue("1"); setTimeUnit("hours");
    setCompareValues("100, 250, 500, 1000"); setWorkers(1); setEfficiencyPct(100);
  };

  const handleLoadPreset = (p: (typeof SAMPLE_PRESETS)[number]) => {
    setMode(p.mode); setDatasetValue(String(p.datasetValue)); setDatasetUnit(p.datasetUnit);
    setThroughputValue(String(p.throughputValue)); setThroughputUnit(p.throughputUnit);
    setTimeValue(String(p.timeValue)); setTimeUnit(p.timeUnit);
    setShowSamples(false);
  };

  const currentInput = (): SavedInput => ({ mode, datasetValue, datasetUnit, throughputValue, throughputUnit, timeValue, timeUnit, compareValues, workers, efficiencyPct });

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(currentInput()));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "throughput-calculation.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "throughput-calculation.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result));
    win.document.close();
    win.print();
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input: currentInput(), effectiveThroughputBps: result.effectiveThroughputBps, timeSeconds: result.timeSeconds });
    setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</h3>
                <button onClick={() => setShowSamples(!showSamples)} className="text-xs text-primary font-medium hover:underline">🎲 Examples</button>
              </div>
              {showSamples && (
                <div className="absolute top-10 right-5 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {SAMPLE_PRESETS.map((s) => (
                    <button key={s.name} onClick={() => handleLoadPreset(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                  ))}
                </div>
              )}
              <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent">
                {MODE_OPTIONS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label htmlFor="bdt-dataset" className="block text-xs font-medium text-gray-600 mb-1">Dataset Size</label>
                  <input id="bdt-dataset" type="number" min={0} value={datasetValue} onChange={(e) => setDatasetValue(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="bdt-dataset-unit" className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                  <select id="bdt-dataset-unit" value={datasetUnit} onChange={(e) => setDatasetUnit(e.target.value as DatasetUnit)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {DATASET_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              {(mode === "time" || mode === "dataset-size") && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label htmlFor="bdt-throughput" className="block text-xs font-medium text-gray-600 mb-1">Throughput</label>
                    <input id="bdt-throughput" type="number" min={0} value={throughputValue} onChange={(e) => setThroughputValue(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                  </div>
                  <div>
                    <label htmlFor="bdt-throughput-unit" className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                    <select id="bdt-throughput-unit" value={throughputUnit} onChange={(e) => setThroughputUnit(e.target.value as ThroughputUnit)}
                      className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                      {THROUGHPUT_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {mode === "compare" && (
                <div>
                  <label htmlFor="bdt-compare" className="block text-xs font-medium text-gray-600 mb-1">Throughput Values to Compare (comma-separated)</label>
                  <input id="bdt-compare" type="text" value={compareValues} onChange={(e) => setCompareValues(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" placeholder="100, 250, 500, 1000" />
                  <div className="mt-1">
                    <select value={throughputUnit} onChange={(e) => setThroughputUnit(e.target.value as ThroughputUnit)}
                      className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                      {THROUGHPUT_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {(mode === "required-throughput" || mode === "dataset-size") && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label htmlFor="bdt-time" className="block text-xs font-medium text-gray-600 mb-1">Processing Time</label>
                    <input id="bdt-time" type="number" min={0} value={timeValue} onChange={(e) => setTimeValue(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                  </div>
                  <div>
                    <label htmlFor="bdt-time-unit" className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                    <select id="bdt-time-unit" value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                      className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                      {TIME_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <div>
                  <label htmlFor="bdt-workers" className="block text-xs font-medium text-gray-600 mb-1">Concurrency (Workers)</label>
                  <input id="bdt-workers" type="number" min={1} value={workers}
                    onChange={(e) => setWorkers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="bdt-efficiency" className="text-xs font-medium text-gray-600">Efficiency</label>
                    <span className="text-xs font-mono font-semibold text-primary">{efficiencyPct}%</span>
                  </div>
                  <input id="bdt-efficiency" type="range" min={10} max={100} step={1} value={efficiencyPct}
                    onChange={(e) => setEfficiencyPct(parseInt(e.target.value, 10))} className="w-full accent-primary mt-2" />
                </div>
              </div>

              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">{error}</p>}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {MODE_OPTIONS.find((m) => m.id === mode)?.label}
              </p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    {mode === "time" ? (
                      <span className="text-3xl font-bold font-mono tabular-nums">{formatDuration(result.timeSeconds).human}</span>
                    ) : mode === "dataset-size" ? (
                      <span className="text-3xl font-bold font-mono tabular-nums">{bytesToAuto(result.datasetBytes)}</span>
                    ) : (
                      <span className="text-3xl font-bold font-mono tabular-nums">{formatNum(bpsToUnit(result.effectiveThroughputBps, "MBps"))} MB/s</span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${SPEED_COLORS[result.speedClass]}`}>{result.speedClass}</span>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    {bytesToAuto(result.datasetBytes)} · {formatDuration(result.timeSeconds).human} · {formatNum(bpsToUnit(result.effectiveThroughputBps, "MBps"))} MB/s effective
                  </p>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleShare} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter your dataset, throughput, or time values on the left to calculate.</p>
              )}
            </div>

            {/* Secondary results */}
            {result && !result.compareRows && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Data Rate Breakdown</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-50">
                  {[
                    ["Dataset Size", bytesToAuto(result.datasetBytes)],
                    ["Processing Time", formatDuration(result.timeSeconds).human],
                    ["Effective Throughput", `${formatNum(bpsToUnit(result.effectiveThroughputBps, "MBps"))} MB/s`],
                    ["Effective (GB/s)", `${formatNum(bpsToUnit(result.effectiveThroughputBps, "GBps"), 4)} GB/s`],
                    ["Per-Worker Throughput", `${formatNum(bpsToUnit(result.rawThroughputBps, "MBps"))} MB/s`],
                    ["Workers × Efficiency", `${result.workers} × ${result.efficiencyPct}%`],
                  ].map(([label, value]) => (
                    <div key={label} className="px-4 py-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compare table */}
            {result?.compareRows && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Throughput Comparison</h3>
                </div>
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 font-semibold text-gray-600">Throughput</th>
                      <th className="text-left px-4 py-2 font-semibold text-gray-600">Effective Throughput</th>
                      <th className="text-left px-4 py-2 font-semibold text-gray-600">Time Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {result.compareRows.map((r, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 font-mono">{formatNum(bpsToUnit(r.throughputBps, "MBps"))} MB/s</td>
                        <td className="px-4 py-2 font-mono font-semibold text-primary">{formatNum(bpsToUnit(r.effectiveBps, "MBps"))} MB/s</td>
                        <td className="px-4 py-2 font-mono">{formatDuration(r.timeSeconds).human}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Speed classification guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Speed Classification Guide</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  ["Below 10 MB/s", "Low"],
                  ["10 – 100 MB/s", "Medium"],
                  ["100 MB/s – 1 GB/s", "High"],
                  ["Above 1 GB/s", "Very High"],
                ].map(([range, label]) => (
                  <div key={range} className={`flex items-center justify-between px-4 py-2 text-sm ${result?.speedClass === label ? "bg-primary/5" : ""}`}>
                    <span className="font-mono text-gray-600">{range}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${SPEED_COLORS[label]}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download CSV</button>
              <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Download JSON</button>
              <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-40">Print Report</button>
              <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors ml-auto">{showHistory ? "Hide" : "Show"} History</button>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Calculations</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => {
                      setMode(entry.input.mode); setDatasetValue(entry.input.datasetValue); setDatasetUnit(entry.input.datasetUnit);
                      setThroughputValue(entry.input.throughputValue); setThroughputUnit(entry.input.throughputUnit);
                      setTimeValue(entry.input.timeValue); setTimeUnit(entry.input.timeUnit);
                      setWorkers(entry.input.workers); setEfficiencyPct(entry.input.efficiencyPct);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatNum(bpsToUnit(entry.effectiveThroughputBps, "MBps"))} MB/s</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{formatDuration(entry.timeSeconds).human}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BigDataThroughputCalculatorSEO />

      <RelatedTools
        currentTool="big-data-throughput-calculator"
        tools={[
          "cluster-utilization-calculator",
          "spark-job-time-calculator",
          "data-compression-ratio-calculator",
          "encoding-efficiency-calculator",
          "data-partition-calculator",
          "time-series-forecast-calculator",
        ]}
      />
    </>
  );
}
