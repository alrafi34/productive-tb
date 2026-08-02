"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculatePartitions, debounce, formatNum, formatCompact, toBytes,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  UNITS, CALC_MODES, PRESETS, PRECISION_OPTIONS,
  DEFAULT_MODE, DEFAULT_UNIT, DEFAULT_TOTAL_DATA_SIZE, DEFAULT_DESIRED_PARTITION_SIZE,
  DEFAULT_PARTITION_SIZE, DEFAULT_NUMBER_OF_PARTITIONS, DEFAULT_TOTAL_RECORDS, DEFAULT_PRECISION,
  type SizeUnit, type CalcMode, type PartitionInputs, type PartitionResult, type HistoryEntry,
} from "./logic";
import { DistributionBarChart, PartitionSizeGauge } from "./chart";
import DataPartitionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DataPartitionCalculatorUI() {
  const [mode, setMode] = useState<CalcMode>(DEFAULT_MODE);
  const [totalDataSize, setTotalDataSize] = useState(String(DEFAULT_TOTAL_DATA_SIZE));
  const [desiredPartitionSize, setDesiredPartitionSize] = useState(String(DEFAULT_DESIRED_PARTITION_SIZE));
  const [partitionSize, setPartitionSize] = useState(String(DEFAULT_PARTITION_SIZE));
  const [numberOfPartitions, setNumberOfPartitions] = useState(String(DEFAULT_NUMBER_OF_PARTITIONS));
  const [totalRecords, setTotalRecords] = useState(String(DEFAULT_TOTAL_RECORDS));
  const [unit, setUnit] = useState<SizeUnit>(DEFAULT_UNIT);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const buildInputs = useCallback((): PartitionInputs => ({
    mode,
    totalDataSize: parseFloat(totalDataSize),
    desiredPartitionSize: parseFloat(desiredPartitionSize),
    partitionSize: parseFloat(partitionSize),
    numberOfPartitions: parseInt(numberOfPartitions, 10),
    totalRecords: parseFloat(totalRecords),
    unit,
  }), [mode, totalDataSize, desiredPartitionSize, partitionSize, numberOfPartitions, totalRecords, unit]);

  const [result, setResult] = useState<PartitionResult>(() => calculatePartitions({
    mode: DEFAULT_MODE, totalDataSize: DEFAULT_TOTAL_DATA_SIZE, desiredPartitionSize: DEFAULT_DESIRED_PARTITION_SIZE,
    partitionSize: DEFAULT_PARTITION_SIZE, numberOfPartitions: DEFAULT_NUMBER_OF_PARTITIONS, totalRecords: DEFAULT_TOTAL_RECORDS, unit: DEFAULT_UNIT,
  }));

  useEffect(() => { setHistory(getHistory()); firstInputRef.current?.focus(); }, []);

  const compute = useCallback(
    debounce((inputs: PartitionInputs) => { setResult(calculatePartitions(inputs)); }, 150),
    []
  );

  useEffect(() => { compute(buildInputs()); }, [buildInputs, compute]);

  const handleReset = () => {
    setMode(DEFAULT_MODE);
    setTotalDataSize(String(DEFAULT_TOTAL_DATA_SIZE));
    setDesiredPartitionSize(String(DEFAULT_DESIRED_PARTITION_SIZE));
    setPartitionSize(String(DEFAULT_PARTITION_SIZE));
    setNumberOfPartitions(String(DEFAULT_NUMBER_OF_PARTITIONS));
    setTotalRecords(String(DEFAULT_TOTAL_RECORDS));
    setUnit(DEFAULT_UNIT);
    setPrecision(DEFAULT_PRECISION);
    firstInputRef.current?.focus();
  };

  const handlePreset = (p: (typeof PRESETS)[number]) => {
    setMode(p.mode);
    setTotalDataSize(String(p.totalDataSize));
    setDesiredPartitionSize(String(p.desiredPartitionSize));
    setPartitionSize(String(p.partitionSize));
    setNumberOfPartitions(String(p.numberOfPartitions));
    setTotalRecords(String(p.totalRecords));
    setUnit(p.unit);
  };

  const buildSummary = () => {
    if (result.partitionSize !== null && result.mode !== "Total Storage") return `${formatNum(result.partitionSize, precision)} ${unit} per partition`;
    if (result.requiredPartitions !== null) return `${formatNum(result.requiredPartitions, 0)} partitions`;
    return result.mode;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(result, buildInputs(), precision));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(result, buildInputs(), precision), "text/csv", "data-partition-report.csv");
  const handleDownloadJSON = () => download(buildJSONReport(result, buildInputs()), "application/json", "data-partition-data.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, buildInputs(), precision));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleSave = () => { saveHistory(buildInputs(), buildSummary()); setHistory(getHistory()); };

  const partitionBytes = result.partitionSize !== null ? toBytes(result.partitionSize, unit) : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-mode">Calculation Mode</label>
                <select id="dpc-mode" value={mode} onChange={(e) => setMode(e.target.value as CalcMode)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {CALC_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {(mode === "Partition Size" || mode === "Number of Partitions") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-total-data">Total Data Size</label>
                  <div className="flex gap-2">
                    <input ref={firstInputRef} id="dpc-total-data" type="number" min={0} value={totalDataSize} onChange={(e) => setTotalDataSize(e.target.value)}
                      className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                    <select value={unit} onChange={(e) => setUnit(e.target.value as SizeUnit)}
                      className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                      {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {mode === "Number of Partitions" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-desired">Desired Partition Size ({unit})</label>
                  <input id="dpc-desired" type="number" min={0} value={desiredPartitionSize} onChange={(e) => setDesiredPartitionSize(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {mode === "Total Storage" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-partition-size">Partition Size ({unit})</label>
                  <input ref={firstInputRef} id="dpc-partition-size" type="number" min={0} value={partitionSize} onChange={(e) => setPartitionSize(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {(mode === "Records Per Partition" || mode === "Balanced Distribution") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-records">Total Records</label>
                  <input ref={firstInputRef} id="dpc-records" type="number" min={0} value={totalRecords} onChange={(e) => setTotalRecords(e.target.value)}
                    placeholder="500000000"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {(mode === "Partition Size" || mode === "Records Per Partition" || mode === "Total Storage" || mode === "Balanced Distribution") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-num-partitions">Number of Partitions</label>
                  <input id="dpc-num-partitions" type="number" min={1} max={1000000} value={numberOfPartitions} onChange={(e) => setNumberOfPartitions(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              )}

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="dpc-precision">Decimal Precision</label>
                <select id="dpc-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                </select>
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
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            {!result.error && (
              <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>{result.mode}</p>
                <p className="text-3xl font-bold font-mono tabular-nums">
                  {result.partitionSize !== null && result.mode !== "Total Storage" && `${formatNum(result.partitionSize, precision)} ${unit}`}
                  {result.mode === "Total Storage" && result.totalStorage !== null && `${formatNum(result.totalStorage, precision)} ${unit}`}
                  {result.mode === "Records Per Partition" && result.recordsPerPartition !== null && formatCompact(result.recordsPerPartition)}
                  {result.mode === "Balanced Distribution" && result.baseRecords !== null && `${formatCompact(result.baseRecords)}${result.remaining ? ` – ${formatCompact(result.baseRecords + 1)}` : ""}`}
                </p>
                {result.requiredPartitions !== null && (
                  <p className="text-sm text-primary-100 mt-1">Across <span className="font-semibold text-white">{formatNum(result.requiredPartitions, 0)}</span> partitions</p>
                )}
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

            {!result.error && (mode === "Partition Size" || mode === "Number of Partitions") && result.partitionSize !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Partition Size Guidance</h3>
                <PartitionSizeGauge partitionBytes={partitionBytes} />
                {result.recommendation && <p className="text-sm text-gray-600 mt-2">{result.recommendation}</p>}
              </div>
            )}

            {!result.error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {result.partitionSize !== null && result.mode !== "Total Storage" && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Partition Size</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{formatNum(result.partitionSize, precision)} {unit}</p>
                  </div>
                )}
                {result.requiredPartitions !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Partitions</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{formatNum(result.requiredPartitions, 0)}</p>
                  </div>
                )}
                {result.recordsPerPartition !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Records / Partition</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{formatNum(result.recordsPerPartition, precision)}</p>
                  </div>
                )}
                {result.totalStorage !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Total Storage</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{formatNum(result.totalStorage, precision)} {unit}</p>
                  </div>
                )}
                {result.unusedSpace !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Unused Space</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{formatNum(result.unusedSpace, precision)} {unit}</p>
                  </div>
                )}
                {result.remaining !== null && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Partitions w/ Extra Record</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{result.remaining}</p>
                  </div>
                )}
              </div>
            )}

            {!result.error && mode === "Balanced Distribution" && result.distributionRows.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Distribution Chart {result.distributionTruncated && <span className="text-xs text-gray-400 font-normal">(first {result.distributionRows.length} of {formatNum(result.requiredPartitions, 0)})</span>}
                </h3>
                <DistributionBarChart rows={result.distributionRows} />
              </div>
            )}

            {!result.error && mode === "Balanced Distribution" && result.distributionRows.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Distribution Table</h3>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500 sticky top-0 bg-white">
                        <th className="py-2 px-4 font-medium">Partition #</th>
                        <th className="py-2 px-4 font-medium">Records</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.distributionRows.map((r) => (
                        <tr key={r.index}>
                          <td className="py-2 px-4 text-gray-700 font-mono text-xs">{r.index}</td>
                          <td className="py-2 px-4 font-mono text-gray-800">{formatNum(r.records, 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.distributionTruncated && (
                  <p className="text-xs text-gray-400 px-4 py-2 border-t border-gray-50">
                    Remaining {(result.requiredPartitions ?? 0) - result.distributionRows.length} partitions each receive {result.baseRecords} records.
                  </p>
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
                        setMode(entry.inputs.mode);
                        setTotalDataSize(String(entry.inputs.totalDataSize));
                        setDesiredPartitionSize(String(entry.inputs.desiredPartitionSize));
                        setPartitionSize(String(entry.inputs.partitionSize));
                        setNumberOfPartitions(String(entry.inputs.numberOfPartitions));
                        setTotalRecords(String(entry.inputs.totalRecords));
                        setUnit(entry.inputs.unit);
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.summary}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.inputs.mode}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <DataPartitionCalculatorSEO />

      <RelatedTools
        currentTool="data-partition-calculator"
        tools={[
          "hadoop-storage-calculator",
          "storage-requirement-calculator",
          "cluster-utilization-calculator",
          "big-data-throughput-calculator",
          "data-pipeline-latency-calculator",
          "etl-throughput-calculator",
        ]}
      />
    </>
  );
}
