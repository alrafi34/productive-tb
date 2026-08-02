"use client";

import { useState, useEffect, useRef } from "react";
import {
  datasetToMB, calculateSparkJobTime, isSparkJobError, formatDuration, formatNum, debounce,
  saveInput, loadInput, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  SAMPLE_PRESETS, DATASET_UNITS, STORAGE_TYPES, COMPRESSION_TYPES, CLUSTER_MANAGERS, COMPLEXITIES, SHUFFLE_INTENSITIES,
  type DatasetUnit, type StorageType, type CompressionType, type ClusterManager, type Complexity, type ShuffleIntensity,
  type SparkJobResult, type HistoryEntry, type SavedInput,
} from "./logic";
import SparkJobTimeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const BOTTLENECK_COLORS: Record<string, string> = {
  Read: "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Shuffle: "bg-red-100 text-red-700",
  Write: "bg-amber-100 text-amber-700",
};

export default function SparkJobTimeCalculatorUI() {
  const [dataSizeValue, setDataSizeValue] = useState("100");
  const [dataSizeUnit, setDataSizeUnit] = useState<DatasetUnit>("GB");
  const [storageType, setStorageType] = useState<StorageType>("Parquet");
  const [compression, setCompression] = useState<CompressionType>("Snappy");
  const [executors, setExecutors] = useState(4);
  const [executorCores, setExecutorCores] = useState(4);
  const [executorMemoryGB, setExecutorMemoryGB] = useState(8);
  const [driverMemoryGB, setDriverMemoryGB] = useState(4);
  const [dynamicAllocation, setDynamicAllocation] = useState(false);
  const [clusterManager, setClusterManager] = useState<ClusterManager>("YARN");
  const [complexity, setComplexity] = useState<Complexity>("Medium");
  const [shuffleIntensity, setShuffleIntensity] = useState<ShuffleIntensity>("Medium");
  const [stages, setStages] = useState(10);
  const [wideTransformations, setWideTransformations] = useState(false);
  const [narrowTransformations, setNarrowTransformations] = useState(true);
  const [cachingUsed, setCachingUsed] = useState(false);
  const [broadcastJoins, setBroadcastJoins] = useState(false);
  const [partitionCount, setPartitionCount] = useState(32);
  const [ioThroughputMBps, setIoThroughputMBps] = useState(500);

  const [result, setResult] = useState<SparkJobResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSamples, setShowSamples] = useState(false);

  const currentInput = (): SavedInput => ({
    dataSizeValue, dataSizeUnit, storageType, compression, executors, executorCores, executorMemoryGB, driverMemoryGB,
    dynamicAllocation, clusterManager, complexity, shuffleIntensity, stages, wideTransformations, narrowTransformations,
    cachingUsed, broadcastJoins, partitionCount, ioThroughputMBps,
  });

  const runRef = useRef(debounce((input: SavedInput) => {
    const dataSizeMB = datasetToMB(parseFloat(input.dataSizeValue) || 0, input.dataSizeUnit);
    const r = calculateSparkJobTime({
      dataSizeMB, storageType: input.storageType, compression: input.compression,
      executors: input.executors, executorCores: input.executorCores,
      executorMemoryGB: input.executorMemoryGB, driverMemoryGB: input.driverMemoryGB,
      dynamicAllocation: input.dynamicAllocation, clusterManager: input.clusterManager,
      complexity: input.complexity, shuffleIntensity: input.shuffleIntensity, stages: input.stages,
      wideTransformations: input.wideTransformations, narrowTransformations: input.narrowTransformations,
      cachingUsed: input.cachingUsed, broadcastJoins: input.broadcastJoins,
      partitionCount: input.partitionCount, ioThroughputMBps: input.ioThroughputMBps,
    });
    if (isSparkJobError(r)) { setResult(null); setError(r.error); }
    else { setError(null); setResult(r); }
  }, 150));

  const persistRef = useRef(debounce((data: SavedInput) => saveInput(data), 400));

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    const saved = loadInput();
    const initial = { ...(saved ?? {}), ...(shared ?? {}) };
    if (saved || shared) {
      if (initial.dataSizeValue) setDataSizeValue(initial.dataSizeValue);
      if (initial.dataSizeUnit) setDataSizeUnit(initial.dataSizeUnit);
      if (initial.storageType) setStorageType(initial.storageType);
      if (initial.compression) setCompression(initial.compression);
      if (initial.executors) setExecutors(initial.executors);
      if (initial.executorCores) setExecutorCores(initial.executorCores);
      if (initial.executorMemoryGB) setExecutorMemoryGB(initial.executorMemoryGB);
      if (initial.driverMemoryGB) setDriverMemoryGB(initial.driverMemoryGB);
      if (initial.dynamicAllocation !== undefined) setDynamicAllocation(initial.dynamicAllocation);
      if (initial.clusterManager) setClusterManager(initial.clusterManager);
      if (initial.complexity) setComplexity(initial.complexity);
      if (initial.shuffleIntensity) setShuffleIntensity(initial.shuffleIntensity);
      if (initial.stages) setStages(initial.stages);
      if (initial.wideTransformations !== undefined) setWideTransformations(initial.wideTransformations);
      if (initial.narrowTransformations !== undefined) setNarrowTransformations(initial.narrowTransformations);
      if (initial.cachingUsed !== undefined) setCachingUsed(initial.cachingUsed);
      if (initial.broadcastJoins !== undefined) setBroadcastJoins(initial.broadcastJoins);
      if (initial.partitionCount) setPartitionCount(initial.partitionCount);
      if (initial.ioThroughputMBps) setIoThroughputMBps(initial.ioThroughputMBps);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const input = currentInput();
    runRef.current(input);
    persistRef.current(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataSizeValue, dataSizeUnit, storageType, compression, executors, executorCores, executorMemoryGB, driverMemoryGB,
    dynamicAllocation, clusterManager, complexity, shuffleIntensity, stages, wideTransformations, narrowTransformations,
    cachingUsed, broadcastJoins, partitionCount, ioThroughputMBps,
  ]);

  const handleReset = () => {
    setDataSizeValue("100"); setDataSizeUnit("GB"); setStorageType("Parquet"); setCompression("Snappy");
    setExecutors(4); setExecutorCores(4); setExecutorMemoryGB(8); setDriverMemoryGB(4);
    setDynamicAllocation(false); setClusterManager("YARN"); setComplexity("Medium"); setShuffleIntensity("Medium");
    setStages(10); setWideTransformations(false); setNarrowTransformations(true);
    setCachingUsed(false); setBroadcastJoins(false); setPartitionCount(32); setIoThroughputMBps(500);
  };

  const handleLoadPreset = (p: (typeof SAMPLE_PRESETS)[number]) => {
    setDataSizeValue(String(p.dataSizeValue)); setDataSizeUnit(p.dataSizeUnit);
    setExecutors(p.executors); setExecutorCores(p.executorCores);
    setComplexity(p.complexity); setShuffleIntensity(p.shuffleIntensity);
    setPartitionCount(p.executors * p.executorCores * 3);
    setShowSamples(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, currentInput()));
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
    a.download = "spark-job-estimate.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "spark-job-estimate.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildPrintHTML(result, currentInput()));
    win.document.close();
    win.print();
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ input: currentInput(), totalRuntimeSec: result.totalRuntimeSec, bottleneck: result.bottleneck });
    setHistory(getHistory());
  };

  const maxPhase = result ? Math.max(result.readTimeSec, result.processingTimeSec, result.shuffleTimeSec, result.writeTimeSec, 0.0001) : 1;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset &amp; Storage</h3>
                <button onClick={() => setShowSamples(!showSamples)} className="text-xs text-primary font-medium hover:underline">🎲 Examples</button>
              </div>
              {showSamples && (
                <div className="absolute top-10 right-5 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {SAMPLE_PRESETS.map((s) => (
                    <button key={s.name} onClick={() => handleLoadPreset(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label htmlFor="spk-size" className="block text-xs font-medium text-gray-600 mb-1">Data Size</label>
                  <input id="spk-size" type="number" min={0} value={dataSizeValue} onChange={(e) => setDataSizeValue(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="spk-unit" className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                  <select id="spk-unit" value={dataSizeUnit} onChange={(e) => setDataSizeUnit(e.target.value as DatasetUnit)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {DATASET_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="spk-storage" className="block text-xs font-medium text-gray-600 mb-1">Storage Type</label>
                  <select id="spk-storage" value={storageType} onChange={(e) => setStorageType(e.target.value as StorageType)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {STORAGE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="spk-compression" className="block text-xs font-medium text-gray-600 mb-1">Compression</label>
                  <select id="spk-compression" value={compression} onChange={(e) => setCompression(e.target.value as CompressionType)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {COMPRESSION_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="spk-io" className="block text-xs font-medium text-gray-600 mb-1">Estimated I/O Throughput (MB/s)</label>
                <input id="spk-io" type="number" min={1} value={ioThroughputMBps}
                  onChange={(e) => setIoThroughputMBps(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Cluster Configuration</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="spk-executors" className="block text-xs font-medium text-gray-600 mb-1">Executors</label>
                  <input id="spk-executors" type="number" min={1} value={executors}
                    onChange={(e) => setExecutors(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="spk-cores" className="block text-xs font-medium text-gray-600 mb-1">Executor Cores</label>
                  <input id="spk-cores" type="number" min={1} value={executorCores}
                    onChange={(e) => setExecutorCores(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="spk-exec-mem" className="block text-xs font-medium text-gray-600 mb-1">Executor Memory (GB)</label>
                  <input id="spk-exec-mem" type="number" min={1} value={executorMemoryGB}
                    onChange={(e) => setExecutorMemoryGB(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="spk-driver-mem" className="block text-xs font-medium text-gray-600 mb-1">Driver Memory (GB)</label>
                  <input id="spk-driver-mem" type="number" min={1} value={driverMemoryGB}
                    onChange={(e) => setDriverMemoryGB(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="spk-manager" className="block text-xs font-medium text-gray-600 mb-1">Cluster Manager</label>
                  <select id="spk-manager" value={clusterManager} onChange={(e) => setClusterManager(e.target.value as ClusterManager)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {CLUSTER_MANAGERS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mt-5">
                  <input type="checkbox" checked={dynamicAllocation} onChange={(e) => setDynamicAllocation(e.target.checked)} className="accent-primary" />
                  Dynamic Allocation
                </label>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Job Characteristics</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="spk-complexity" className="block text-xs font-medium text-gray-600 mb-1">Processing Complexity</label>
                  <select id="spk-complexity" value={complexity} onChange={(e) => setComplexity(e.target.value as Complexity)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {COMPLEXITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="spk-shuffle" className="block text-xs font-medium text-gray-600 mb-1">Shuffle Intensity</label>
                  <select id="spk-shuffle" value={shuffleIntensity} onChange={(e) => setShuffleIntensity(e.target.value as ShuffleIntensity)}
                    className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {SHUFFLE_INTENSITIES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="spk-stages" className="block text-xs font-medium text-gray-600 mb-1">Number of Stages</label>
                  <input id="spk-stages" type="number" min={1} value={stages}
                    onChange={(e) => setStages(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="spk-partitions" className="block text-xs font-medium text-gray-600 mb-1">Partition Count</label>
                  <input id="spk-partitions" type="number" min={1} value={partitionCount}
                    onChange={(e) => setPartitionCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <input type="checkbox" checked={wideTransformations} onChange={(e) => setWideTransformations(e.target.checked)} className="accent-primary" />
                  Wide Transformations
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <input type="checkbox" checked={narrowTransformations} onChange={(e) => setNarrowTransformations(e.target.checked)} className="accent-primary" />
                  Narrow Transformations
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <input type="checkbox" checked={cachingUsed} onChange={(e) => setCachingUsed(e.target.checked)} className="accent-primary" />
                  Caching Used
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <input type="checkbox" checked={broadcastJoins} onChange={(e) => setBroadcastJoins(e.target.checked)} className="accent-primary" />
                  Broadcast Joins
                </label>
              </div>

              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">{error}</p>}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Estimated Runtime</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span className="text-4xl font-bold font-mono tabular-nums">{formatDuration(result.totalRuntimeSec)}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${BOTTLENECK_COLORS[result.bottleneck]}`}>Bottleneck: {result.bottleneck}</span>
                  </div>
                  <p className="text-xs text-primary-100 mb-4">
                    Parallelism: {result.parallelism} tasks · Efficiency: {formatNum(result.efficiencyScore, 0)}% · CPU Utilization: {formatNum(result.cpuUtilizationPct, 0)}%
                  </p>
                  <div className="space-y-2">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={handleShare} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                      <button onClick={handleSave} className="flex-1 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter dataset and cluster details on the left to estimate runtime.</p>
              )}
            </div>

            {/* Runtime breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Execution Breakdown</h3>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    ["Read", result.readTimeSec, "bg-blue-500"],
                    ["Processing", result.processingTimeSec, "bg-purple-500"],
                    ["Shuffle", result.shuffleTimeSec, "bg-red-500"],
                    ["Write", result.writeTimeSec, "bg-amber-500"],
                    ["Scheduling Overhead", result.overheadSec, "bg-gray-400"],
                  ].map(([label, value, color]) => (
                    <div key={label as string}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-gray-600">{label}</span>
                        <span className="font-mono text-gray-800">{formatDuration(value as number)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(100, ((value as number) / maxPhase) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Optimization Suggestions</h3>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Primary Bottleneck: {result.bottleneck}</p>
                  <p className="text-sm text-gray-700">{result.recommendation}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Partitioning ({partitionCount} partitions, ideal {result.idealPartitionMin}–{result.idealPartitionMax})</p>
                  <p className="text-sm text-gray-700">{result.partitionRecommendation}</p>
                </div>
              </div>
            )}

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
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Scenario History</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved scenarios yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => {
                      const i = entry.input;
                      setDataSizeValue(i.dataSizeValue); setDataSizeUnit(i.dataSizeUnit); setStorageType(i.storageType);
                      setCompression(i.compression); setExecutors(i.executors); setExecutorCores(i.executorCores);
                      setComplexity(i.complexity); setShuffleIntensity(i.shuffleIntensity); setStages(i.stages);
                      setPartitionCount(i.partitionCount); setIoThroughputMBps(i.ioThroughputMBps);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatDuration(entry.totalRuntimeSec)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.input.dataSizeValue} {entry.input.dataSizeUnit} · Bottleneck: {entry.bottleneck}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SparkJobTimeCalculatorSEO />

      <RelatedTools
        currentTool="spark-job-time-calculator"
        tools={[
          "big-data-throughput-calculator",
          "cluster-utilization-calculator",
          "data-compression-ratio-calculator",
          "encoding-efficiency-calculator",
          "data-partition-calculator",
          "time-series-forecast-calculator",
        ]}
      />
    </>
  );
}
