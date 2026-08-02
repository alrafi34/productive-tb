"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateHadoopStorage, debounce, formatNum, smartFormat,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  UNITS, PRESETS, PRECISION_OPTIONS,
  DEFAULT_RAW_DATA, DEFAULT_UNIT, DEFAULT_REPLICATION_FACTOR, DEFAULT_COMPRESSION_RATIO,
  DEFAULT_RESERVED_PERCENT, DEFAULT_GROWTH_PERCENT, DEFAULT_PLANNING_YEARS, DEFAULT_OVERHEAD_PERCENT, DEFAULT_PRECISION,
  type StorageUnit, type HadoopResult, type HadoopInputs, type HistoryEntry,
} from "./logic";
import { StorageBreakdownChart, ForecastBarChart } from "./chart";
import HadoopStorageCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HadoopStorageCalculatorUI() {
  const [rawDataSize, setRawDataSize] = useState(String(DEFAULT_RAW_DATA));
  const [unit, setUnit] = useState<StorageUnit>(DEFAULT_UNIT);
  const [replicationFactor, setReplicationFactor] = useState(DEFAULT_REPLICATION_FACTOR);
  const [compressionRatio, setCompressionRatio] = useState(String(DEFAULT_COMPRESSION_RATIO));
  const [reservedPercent, setReservedPercent] = useState(String(DEFAULT_RESERVED_PERCENT));
  const [growthPercent, setGrowthPercent] = useState(String(DEFAULT_GROWTH_PERCENT));
  const [planningYears, setPlanningYears] = useState(DEFAULT_PLANNING_YEARS);
  const [overheadPercent, setOverheadPercent] = useState(String(DEFAULT_OVERHEAD_PERCENT));
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const buildInputs = useCallback((): HadoopInputs => ({
    rawDataSize: parseFloat(rawDataSize), unit, replicationFactor,
    compressionRatio: parseFloat(compressionRatio), reservedPercent: parseFloat(reservedPercent),
    growthRatePercent: parseFloat(growthPercent), planningYears, overheadPercent: parseFloat(overheadPercent),
  }), [rawDataSize, unit, replicationFactor, compressionRatio, reservedPercent, growthPercent, planningYears, overheadPercent]);

  const [result, setResult] = useState<HadoopResult>(() => calculateHadoopStorage({
    rawDataSize: DEFAULT_RAW_DATA, unit: DEFAULT_UNIT, replicationFactor: DEFAULT_REPLICATION_FACTOR,
    compressionRatio: DEFAULT_COMPRESSION_RATIO, reservedPercent: DEFAULT_RESERVED_PERCENT,
    growthRatePercent: DEFAULT_GROWTH_PERCENT, planningYears: DEFAULT_PLANNING_YEARS, overheadPercent: DEFAULT_OVERHEAD_PERCENT,
  }));

  useEffect(() => { setHistory(getHistory()); firstInputRef.current?.focus(); }, []);

  const compute = useCallback(
    debounce((inputs: HadoopInputs) => { setResult(calculateHadoopStorage(inputs)); }, 150),
    []
  );

  useEffect(() => { compute(buildInputs()); }, [buildInputs, compute]);

  const handleReset = () => {
    setRawDataSize(String(DEFAULT_RAW_DATA));
    setUnit(DEFAULT_UNIT);
    setReplicationFactor(DEFAULT_REPLICATION_FACTOR);
    setCompressionRatio(String(DEFAULT_COMPRESSION_RATIO));
    setReservedPercent(String(DEFAULT_RESERVED_PERCENT));
    setGrowthPercent(String(DEFAULT_GROWTH_PERCENT));
    setPlanningYears(DEFAULT_PLANNING_YEARS);
    setOverheadPercent(String(DEFAULT_OVERHEAD_PERCENT));
    setPrecision(DEFAULT_PRECISION);
    firstInputRef.current?.focus();
  };

  const handlePreset = (p: (typeof PRESETS)[number]) => {
    setRawDataSize(String(p.rawDataSize));
    setUnit(p.unit);
    setReplicationFactor(p.replicationFactor);
    setCompressionRatio(String(p.compressionRatio));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(result, precision), "text/csv", "hadoop-storage-report.csv");
  const handleDownloadJSON = () => download(buildJSONReport(result), "application/json", "hadoop-storage-data.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleSave = () => { saveHistory(result); setHistory(getHistory()); };

  const replicationOverhead = (result.replicatedStorage ?? 0) - (result.effectiveData ?? 0);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Cluster Inputs</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-raw">Raw Data Size</label>
                  <input ref={firstInputRef} id="hsc-raw" type="number" min={0} value={rawDataSize} onChange={(e) => setRawDataSize(e.target.value)}
                    placeholder="100"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-unit">Storage Unit</label>
                  <select id="hsc-unit" value={unit} onChange={(e) => setUnit(e.target.value as StorageUnit)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-rf">Replication Factor</label>
                  <select id="hsc-rf" value={replicationFactor} onChange={(e) => setReplicationFactor(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-compression">Compression Ratio</label>
                  <input id="hsc-compression" type="number" min={0.1} max={1} step={0.05} value={compressionRatio} onChange={(e) => setCompressionRatio(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-reserved">Reserved Free Space (%)</label>
                  <input id="hsc-reserved" type="number" min={0} max={50} value={reservedPercent} onChange={(e) => setReservedPercent(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-overhead">Storage Overhead (%)</label>
                  <input id="hsc-overhead" type="number" min={0} value={overheadPercent} onChange={(e) => setOverheadPercent(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-growth">Annual Data Growth (%)</label>
                  <input id="hsc-growth" type="number" value={growthPercent} onChange={(e) => setGrowthPercent(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-precision">Decimal Precision</label>
                  <select id="hsc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5" htmlFor="hsc-years">
                  <span>Planning Period</span><span className="font-mono text-primary">{planningYears} year{planningYears === 1 ? "" : "s"}</span>
                </label>
                <input id="hsc-years" type="range" min={1} max={10} step={1} value={planningYears} onChange={(e) => setPlanningYears(parseInt(e.target.value, 10))}
                  className="w-full accent-primary" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Examples:</span>
                {PRESETS.map((p) => (
                  <button key={p.label} type="button" onClick={() => handlePreset(p)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula Breakdown</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Effective Data = Raw × Compression = {formatNum(result.effectiveData, precision)} {unit}</p>
                  <p>Replicated Storage = Effective × RF = {formatNum(result.replicatedStorage, precision)} {unit}</p>
                  <p>Reserved = Replicated × Reserved% = {formatNum(result.reservedCapacity, precision)} {unit}</p>
                  <p className="text-gray-900 font-semibold">Total Required = {formatNum(result.totalRequiredStorage, precision)} {unit}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            {!result.error && (
              <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Replicated Storage Required</p>
                <p className="text-3xl font-bold font-mono tabular-nums">{formatNum(result.replicatedStorage, precision)} {unit}</p>
                <p className="text-sm text-primary-100 mt-1">Total with reserved &amp; overhead: <span className="font-semibold text-white">{formatNum(result.totalRequiredStorage, precision)} {unit}</span></p>
                <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                  <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    {copied ? "✓ Copied!" : "Copy Results"}
                  </button>
                  <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                    Save to History
                  </button>
                </div>
              </div>
            )}

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Storage Breakdown</h3>
                <StorageBreakdownChart
                  effectiveData={result.effectiveData ?? 0}
                  replicationOverhead={replicationOverhead}
                  reserved={result.reservedCapacity ?? 0}
                  overhead={result.overheadCapacity ?? 0}
                  unit={unit}
                />
              </div>
            )}

            {!result.error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ["Effective Data", `${formatNum(result.effectiveData, precision)} ${unit}`],
                  ["Reserved Capacity", `${formatNum(result.reservedCapacity, precision)} ${unit}`],
                  ["Storage Overhead", `${formatNum(result.overheadCapacity, precision)} ${unit}`],
                  ["Compression Savings", `${formatNum(result.storageSavings, precision)} ${unit}`],
                  [`Future Data (${planningYears}y)`, `${formatNum(result.futureData, precision)} ${unit}`],
                  [`Future Cluster Size (${planningYears}y)`, `${formatNum(result.futureStorage, precision)} ${unit}`],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {!result.error && (
              <p className="text-xs text-gray-400 px-1">
                Auto-formatted: {smartFormat(result.totalRequiredStorage ?? 0, unit, precision)} total required
              </p>
            )}

            {!result.error && result.recommendation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Cluster Recommendation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{result.recommendation}</p>
              </div>
            )}

            {!result.error && result.forecast.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Growth Forecast</h3>
                <ForecastBarChart forecast={result.forecast} unit={unit} />
              </div>
            )}

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowComparison(!showComparison)} className="w-full p-4 flex items-center justify-between bg-gray-50/50 hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Replication Factor Comparison</h3>
                  <span className="text-xs text-gray-400">{showComparison ? "Hide" : "Show"}</span>
                </button>
                {showComparison && (
                  <div className="divide-y divide-gray-50">
                    {result.replicationComparison.map((c) => (
                      <div key={c.factor} className={`flex items-center justify-between px-4 py-2 text-sm ${c.factor === replicationFactor ? "bg-primary/5" : ""}`}>
                        <span className="font-mono text-gray-600">RF = {c.factor}</span>
                        <span className={`font-medium font-mono ${c.factor === replicationFactor ? "text-primary" : "text-gray-700"}`}>{formatNum(c.replicatedStorage, precision)} {unit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export &amp; Share</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
                <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
              </div>
              <button onClick={handlePrint} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Print Report</button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {showHistory ? "Hide" : "Show"} History
              </button>
            </div>

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
                    <div
                      key={entry.id}
                      onClick={() => {
                        setRawDataSize(String(entry.inputs.rawDataSize));
                        setUnit(entry.inputs.unit);
                        setReplicationFactor(entry.inputs.replicationFactor);
                        setCompressionRatio(String(entry.inputs.compressionRatio));
                        setReservedPercent(String(entry.inputs.reservedPercent));
                        setGrowthPercent(String(entry.inputs.growthRatePercent));
                        setPlanningYears(entry.inputs.planningYears);
                        setOverheadPercent(String(entry.inputs.overheadPercent));
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatNum(entry.totalRequiredStorage, 2)} {entry.inputs.unit}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">
                        {entry.inputs.rawDataSize} {entry.inputs.unit} · RF={entry.inputs.replicationFactor} · Compression={entry.inputs.compressionRatio}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <HadoopStorageCalculatorSEO />

      <RelatedTools
        currentTool="hadoop-storage-calculator"
        tools={[
          "storage-requirement-calculator",
          "data-transfer-cost-calculator",
          "cluster-utilization-calculator",
          "big-data-throughput-calculator",
          "data-partition-calculator",
          "data-pipeline-latency-calculator",
        ]}
      />
    </>
  );
}
