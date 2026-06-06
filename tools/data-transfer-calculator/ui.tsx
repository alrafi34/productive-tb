"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  calculateTransfer,
  formatDuration,
  formatNumber,
  formatSpeed,
  debounce,
  saveHistory,
  getHistory,
  clearHistory,
  type TransferResult,
  type HistoryEntry,
} from "./logic";
import DataTransferCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];
const SPEED_UNITS = ["Kbps", "Mbps", "Gbps", "KB/s", "MB/s", "GB/s"];
const TRANSFER_TYPES = ["Download", "Upload", "Network Copy", "Cloud Backup", "General Transfer"];

const PRESETS = [
  { label: "WiFi (50 Mbps)", speed: "50", speedUnit: "Mbps" },
  { label: "Fiber (1 Gbps)", speed: "1", speedUnit: "Gbps" },
  { label: "5G (300 Mbps)", speed: "300", speedUnit: "Mbps" },
  { label: "Cable (200 Mbps)", speed: "200", speedUnit: "Mbps" },
  { label: "SSD (500 MB/s)", speed: "500", speedUnit: "MB/s" },
  { label: "USB 3.0 (5 Gbps)", speed: "5", speedUnit: "Gbps" },
];

const SIZE_PRESETS = [
  { label: "100 MB", size: "100", sizeUnit: "MB" },
  { label: "1 GB", size: "1", sizeUnit: "GB" },
  { label: "10 GB", size: "10", sizeUnit: "GB" },
  { label: "100 GB", size: "100", sizeUnit: "GB" },
  { label: "1 TB", size: "1", sizeUnit: "TB" },
];

export default function DataTransferCalculatorUI() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initSize = searchParams.get("size") || "100";
  const initSizeUnit = searchParams.get("unit") || "GB";
  const initSpeed = searchParams.get("speed") || "100";
  const initSpeedUnit = searchParams.get("speedUnit") || "Mbps";

  const [dataSize, setDataSize] = useState(initSize);
  const [dataSizeUnit, setDataSizeUnit] = useState(initSizeUnit);
  const [speed, setSpeed] = useState(initSpeed);
  const [speedUnit, setSpeedUnit] = useState(initSpeedUnit);
  const [transferType, setTransferType] = useState("Download");
  const [efficiency, setEfficiency] = useState(10);
  const [result, setResult] = useState<TransferResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const sizeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    sizeRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((sz: string, szu: string, sp: string, spu: string, eff: number) => {
      const s = parseFloat(sz);
      const v = parseFloat(sp);
      if (!sz || !sp || isNaN(s) || isNaN(v)) { setError(null); setResult(null); return; }
      if (s <= 0) { setError("Data size must be greater than zero."); setResult(null); return; }
      if (v <= 0) { setError("Transfer speed must be greater than zero."); setResult(null); return; }
      setError(null);
      setResult(calculateTransfer(s, szu, v, spu, eff));
    }, 100),
    []
  );

  useEffect(() => { run(dataSize, dataSizeUnit, speed, speedUnit, efficiency); }, [dataSize, dataSizeUnit, speed, speedUnit, efficiency]);

  // Shareable URL
  useEffect(() => {
    if (!dataSize || !speed) return;
    const p = new URLSearchParams({ size: dataSize, unit: dataSizeUnit, speed, speedUnit });
    router.replace(`?${p.toString()}`, { scroll: false });
  }, [dataSize, dataSizeUnit, speed, speedUnit]);

  const buildText = (): string => {
    if (!result) return "";
    return [
      `Data Transfer Calculator`,
      `========================`,
      `${transferType}: ${dataSize} ${dataSizeUnit}`,
      `Speed: ${speed} ${speedUnit}`,
      `Efficiency: ${100 - efficiency}% (${efficiency}% loss)`,
      `Effective Speed: ${formatSpeed(result.effectiveSpeedBps)}`,
      ``,
      `Estimated Transfer Time: ${result.formatted}`,
      `  Seconds: ${formatNumber(result.seconds, 1)}`,
      `  Minutes: ${formatNumber(result.minutes, 1)}`,
      `  Hours:   ${formatNumber(result.hours, 2)}`,
      `  Days:    ${formatNumber(result.days, 4)}`,
    ].join("\n");
  };

  const handleCopy = () => {
    const t = buildText();
    if (!t) return;
    navigator.clipboard.writeText(t);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    const t = buildText();
    if (!t) return;
    const blob = new Blob([t], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data-transfer-calculation.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleExportJson = () => {
    if (!result) return;
    const data = {
      transferType,
      dataSize: `${dataSize} ${dataSizeUnit}`,
      speed: `${speed} ${speedUnit}`,
      efficiencyLoss: `${efficiency}%`,
      effectiveSpeedMbps: formatNumber(result.effectiveSpeedMbps),
      estimatedTime: result.formatted,
      seconds: formatNumber(result.seconds, 1),
      minutes: formatNumber(result.minutes, 1),
      hours: formatNumber(result.hours, 2),
      days: formatNumber(result.days, 4),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data-transfer-calculation.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({
      label: `${dataSize} ${dataSizeUnit} @ ${speed} ${speedUnit} (${transferType})`,
      result: result.formatted,
    });
    setHistory(getHistory());
  };

  const handleReset = () => {
    setDataSize("100");
    setDataSizeUnit("GB");
    setSpeed("100");
    setSpeedUnit("Mbps");
    setTransferType("Download");
    setEfficiency(10);
    setResult(null);
    setError(null);
    sizeRef.current?.focus();
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const RESULT_ROWS = result
    ? [
        { label: "Estimated Time", value: result.formatted, mono: true },
        { label: "Seconds", value: formatNumber(result.seconds, 1), mono: true },
        { label: "Minutes", value: formatNumber(result.minutes, 1), mono: true },
        { label: "Hours", value: formatNumber(result.hours, 2), mono: true },
        { label: "Days", value: formatNumber(result.days, 4), mono: true },
        { label: "Effective Speed", value: formatSpeed(result.effectiveSpeedBps), mono: true },
        { label: "Efficiency Loss", value: `${efficiency}%`, mono: false },
        { label: "Transfer Type", value: transferType, mono: false },
        { label: "Data Size (GB)", value: `${formatNumber(result.dataSizeGB, 4)} GB`, mono: true },
      ]
    : [];

  // bytes vs bits hint
  const showBitsHint = ["KB/s", "MB/s", "GB/s"].includes(speedUnit);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">⏱️</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Data Transfer Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Calculate how long it takes to transfer any file over any connection. Supports downloads, uploads, backups, cloud migrations, and more. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs */}
          <div className="lg:col-span-4 space-y-5">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Transfer Details
              </h3>

              {/* Data Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Data Size</label>
                <div className="flex gap-2">
                  <input
                    ref={sizeRef}
                    type="number"
                    value={dataSize}
                    min="0"
                    step="any"
                    onChange={(e) => setDataSize(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && handleReset()}
                    placeholder="100"
                    className={`flex-1 px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${error ? "border-red-300" : "border-gray-200"}`}
                    aria-label="Data Size"
                  />
                  <select
                    value={dataSizeUnit}
                    onChange={(e) => setDataSizeUnit(e.target.value)}
                    className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Data Size Unit"
                  >
                    {SIZE_UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              {/* Transfer Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Transfer Speed</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={speed}
                    min="0"
                    step="any"
                    onChange={(e) => setSpeed(e.target.value)}
                    placeholder="100"
                    className={`flex-1 px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${error ? "border-red-300" : "border-gray-200"}`}
                    aria-label="Transfer Speed"
                  />
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Speed Unit"
                  >
                    {SPEED_UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
                {showBitsHint && (
                  <p className="text-xs text-amber-600 mt-1">⚠ You selected bytes/s. Note: 1 MB/s = 8 Mbps.</p>
                )}
                {!showBitsHint && (
                  <p className="text-xs text-gray-400 mt-1">100 Mbps is typical US home broadband.</p>
                )}
              </div>

              {/* Transfer Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Transfer Type</label>
                <select
                  value={transferType}
                  onChange={(e) => setTransferType(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Transfer Type"
                >
                  {TRANSFER_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              {/* Efficiency Loss */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Efficiency Loss: <span className="font-mono text-primary">{efficiency}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={efficiency}
                  onChange={(e) => setEfficiency(parseInt(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Efficiency Loss"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0% (ideal)</span>
                  <span>25%</span>
                  <span>50% (heavy loss)</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Simulates protocol overhead, congestion & packet loss.</p>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <p className="text-xs text-gray-400">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>

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
                    disabled={!result}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Export TXT
                  </button>
                  <button
                    onClick={handleExportJson}
                    disabled={!result}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>

            {/* Summary Card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Transfer Summary
              </p>
              {result ? (
                <>
                  <div className="text-2xl font-bold font-mono mb-1 break-all">
                    {result.formatted}
                  </div>
                  <div className="text-sm text-primary-100 mb-3">{transferType} · {dataSize} {dataSizeUnit}</div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Effective Speed</span>
                      <span className="font-semibold font-mono text-xs">{formatSpeed(result.effectiveSpeedBps)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Efficiency</span>
                      <span className="font-semibold">{100 - efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Loss Applied</span>
                      <span className="font-semibold">{efficiency}%</span>
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
                <div className="text-primary-100 text-sm">Enter data size and speed to calculate</div>
              )}
            </div>

          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-5">

            {/* Speed Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Speed Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = speed === p.speed && speedUnit === p.speedUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => { setSpeed(p.speed); setSpeedUnit(p.speedUnit); }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Size Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {SIZE_PRESETS.map((p) => {
                  const active = dataSize === p.size && dataSizeUnit === p.sizeUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => { setDataSize(p.size); setDataSizeUnit(p.sizeUnit); }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Results
                </h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {RESULT_ROWS.map(({ label, value, mono }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {error ?? "Enter data size and speed to see results"}
                </div>
              )}
            </div>

            {/* Bits vs Bytes note */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                💡 Bits vs Bytes
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Internet speeds (Mbps, Gbps) use <strong>bits</strong>. File sizes (MB, GB) use <strong>bytes</strong>.
                1 byte = 8 bits. A 100 Mbps connection transfers at ~12.5 MB/s — not 100 MB/s.
                This calculator handles all conversions automatically.
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
                      <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">{entry.label}</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-primary font-mono font-semibold">{entry.result}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <DataTransferCalculatorSEO />

      <RelatedTools
        currentTool="data-transfer-calculator"
        tools={[
          "bandwidth-calculator",
          "cidr-calculator",
          "subnet-calculator",
          "download-time-calculator",
          "latency-calculator",
          "ip-range-calculator",
        ]}
      />
    </>
  );
}
