"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FileSizeUnit, SpeedUnit, DownloadInputs, HistoryEntry } from "./types";
import {
  calculateDownloadTime,
  validateInputs,
  getFileSizeHint,
  getSpeedHint,
  formatNumber,
  formatDuration,
  QUICK_PRESETS,
  SPEED_PRESETS,
  EFFICIENCY_OPTIONS,
  saveHistory,
  getHistory,
  clearHistory,
  buildExportText,
  downloadFile,
  debounce,
} from "./logic";
import DownloadTimeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const SIZE_UNITS: FileSizeUnit[] = ["KB", "MB", "GB", "TB"];
const SPEED_UNITS: SpeedUnit[] = ["Kbps", "Mbps", "Gbps"];

export default function DownloadTimeCalculatorUI() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialise from URL query params (shareable URLs)
  const initSize = searchParams.get("size") || "5";
  const initSizeUnit = (searchParams.get("unit") as FileSizeUnit) || "GB";
  const initSpeed = searchParams.get("speed") || "50";
  const initSpeedUnit = (searchParams.get("speedUnit") as SpeedUnit) || "Mbps";

  const [fileSize, setFileSize] = useState(initSize);
  const [fileSizeUnit, setFileSizeUnit] = useState<FileSizeUnit>(initSizeUnit);
  const [speed, setSpeed] = useState(initSpeed);
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>(initSpeedUnit);
  const [efficiency, setEfficiency] = useState(0.9);

  const [result, setResult] = useState<ReturnType<typeof calculateDownloadTime>>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const fileSizeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    fileSizeRef.current?.focus();
  }, []);

  // ── Calculation ──────────────────────────────────────────────────────────
  const run = useCallback(
    debounce((sz: string, szu: FileSizeUnit, sp: string, spu: SpeedUnit, eff: number) => {
      const s = parseFloat(sz);
      const v = parseFloat(sp);
      if (!sz || !sp || isNaN(s) || isNaN(v)) {
        setError(null);
        setResult(null);
        return;
      }
      const inputs: DownloadInputs = {
        fileSize: s,
        fileSizeUnit: szu,
        speed: v,
        speedUnit: spu,
        efficiency: eff,
      };
      const validErr = validateInputs(inputs);
      if (validErr) {
        setError(validErr);
        setResult(null);
        return;
      }
      setError(null);
      setResult(calculateDownloadTime(inputs));
    }, 100),
    []
  );

  useEffect(() => {
    run(fileSize, fileSizeUnit, speed, speedUnit, efficiency);
  }, [fileSize, fileSizeUnit, speed, speedUnit, efficiency, run]);

  // ── Shareable URL ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!fileSize || !speed) return;
    const p = new URLSearchParams({
      size: fileSize,
      unit: fileSizeUnit,
      speed,
      speedUnit,
    });
    router.replace(`?${p.toString()}`, { scroll: false });
  }, [fileSize, fileSizeUnit, speed, speedUnit]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleReset = () => {
    setFileSize("5");
    setFileSizeUnit("GB");
    setSpeed("50");
    setSpeedUnit("Mbps");
    setEfficiency(0.9);
    setResult(null);
    setError(null);
    fileSizeRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const inputs: DownloadInputs = {
      fileSize: parseFloat(fileSize),
      fileSizeUnit,
      speed: parseFloat(speed),
      speedUnit,
      efficiency,
    };
    const text = buildExportText(inputs, result);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    if (!result) return;
    const inputs: DownloadInputs = {
      fileSize: parseFloat(fileSize),
      fileSizeUnit,
      speed: parseFloat(speed),
      speedUnit,
      efficiency,
    };
    downloadFile(buildExportText(inputs, result), "download-time-calculation.txt");
  };

  const handleSave = () => {
    if (!result) return;
    const inputs: DownloadInputs = {
      fileSize: parseFloat(fileSize),
      fileSizeUnit,
      speed: parseFloat(speed),
      speedUnit,
      efficiency,
    };
    saveHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setFileSize(String(entry.inputs.fileSize));
    setFileSizeUnit(entry.inputs.fileSizeUnit);
    setSpeed(String(entry.inputs.speed));
    setSpeedUnit(entry.inputs.speedUnit);
    setEfficiency(entry.inputs.efficiency);
    setShowHistory(false);
  };

  // ── Hints ─────────────────────────────────────────────────────────────────
  const fileSizeHint = getFileSizeHint(parseFloat(fileSize) || 0, fileSizeUnit);
  const speedHint = getSpeedHint(parseFloat(speed) || 0, speedUnit);

  // ── Result rows ───────────────────────────────────────────────────────────
  const RESULT_ROWS = result
    ? [
        { label: "Estimated Time", value: result.formatted, mono: true },
        { label: "Total Seconds", value: formatNumber(result.seconds, 1), mono: true },
        { label: "Total Minutes", value: formatNumber(result.minutes, 2), mono: true },
        { label: "Total Hours", value: formatNumber(result.hours, 3), mono: true },
        { label: "Total Days", value: formatNumber(result.days, 4), mono: true },
        {
          label: "Effective Speed",
          value: `${formatNumber(result.effectiveSpeedBps / 1_000_000, 2)} Mbps`,
          mono: true,
        },
        {
          label: "Estimated Finish",
          value: result.completionTime,
          mono: false,
        },
      ]
    : [];

  const speedTierLabel =
    result?.speedTier === "fast"
      ? "⚡ Fast"
      : result?.speedTier === "moderate"
      ? "⏳ Moderate"
      : "🐢 Slow";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">⏬</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Download Time Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter a file size and internet speed to instantly estimate download time. Supports real-world efficiency adjustment and shareable URLs. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs + Summary */}
          <div className="lg:col-span-4 space-y-5">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Download Details
              </h3>

              {/* File Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">File Size</label>
                <div className="flex gap-2">
                  <input
                    ref={fileSizeRef}
                    type="number"
                    value={fileSize}
                    min="0"
                    step="any"
                    onChange={(e) => setFileSize(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && handleReset()}
                    placeholder="5"
                    className={`flex-1 px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                    aria-label="File Size"
                  />
                  <select
                    value={fileSizeUnit}
                    onChange={(e) => setFileSizeUnit(e.target.value as FileSizeUnit)}
                    className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="File Size Unit"
                  >
                    {SIZE_UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                {fileSizeHint && (
                  <p className="text-xs text-amber-600 mt-1">⚠ {fileSizeHint}</p>
                )}
              </div>

              {/* Internet Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Internet Speed</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={speed}
                    min="0"
                    step="any"
                    onChange={(e) => setSpeed(e.target.value)}
                    placeholder="50"
                    className={`flex-1 px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                    aria-label="Internet Speed"
                  />
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                    className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Speed Unit"
                  >
                    {SPEED_UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                {speedHint && (
                  <p className="text-xs text-amber-600 mt-1">⚠ {speedHint}</p>
                )}
                {!speedHint && (
                  <p className="text-xs text-gray-400 mt-1">50 Mbps is typical US home broadband.</p>
                )}
              </div>

              {/* Connection Efficiency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Connection Efficiency</label>
                <select
                  value={efficiency}
                  onChange={(e) => setEfficiency(parseFloat(e.target.value))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Connection Efficiency"
                >
                  {EFFICIENCY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Accounts for protocol overhead and network congestion.</p>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <p className="text-xs text-gray-400">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleExportTxt}
                  disabled={!result}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export TXT
                </button>
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
              <p
                className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Download Summary
              </p>
              {result ? (
                <>
                  <div className="text-2xl font-bold font-mono mb-1 break-all leading-snug">
                    {result.formatted}
                  </div>
                  <div className="text-sm text-primary-100 mb-3">
                    {fileSize} {fileSizeUnit} · {speed} {speedUnit} · {speedTierLabel}
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Effective Speed</span>
                      <span className="font-semibold font-mono text-xs">
                        {formatNumber(result.effectiveSpeedBps / 1_000_000, 2)} Mbps
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Efficiency</span>
                      <span className="font-semibold">{Math.round(efficiency * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Est. Finish</span>
                      <span className="font-semibold">{result.completionTime}</span>
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
                <div className="text-primary-100 text-sm">Enter file size and speed to calculate</div>
              )}
            </div>

          </div>

          {/* Right: Presets + Results + History */}
          <div className="lg:col-span-8 space-y-5">

            {/* File Size Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick File Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_PRESETS.map((p) => {
                  const active =
                    fileSize === String(p.fileSize) && fileSizeUnit === p.fileSizeUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => {
                        setFileSize(String(p.fileSize));
                        setFileSizeUnit(p.fileSizeUnit);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label} ({p.fileSize} {p.fileSizeUnit})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Speed Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Speed Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {SPEED_PRESETS.map((p) => {
                  const active = speed === String(p.speed) && speedUnit === p.speedUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => {
                        setSpeed(String(p.speed));
                        setSpeedUnit(p.speedUnit);
                      }}
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
                    <div
                      key={label}
                      className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm text-gray-600">{label}</span>
                      <span
                        className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {error ?? "Enter file size and speed to see results"}
                </div>
              )}
            </div>

            {/* Bits vs Bytes note */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4
                className="text-sm font-semibold text-amber-900 mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                💡 Bits vs Bytes
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Internet speeds (Mbps, Gbps) are measured in <strong>bits</strong>. File sizes (MB, GB) are measured in{" "}
                <strong>bytes</strong>. 1 byte = 8 bits. A 100 Mbps connection transfers at ~12.5 MB/s — not 100 MB/s.
                This calculator handles all conversions automatically.
              </p>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3
                    className="font-semibold text-gray-800 text-sm"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">
                      No saved calculations yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => loadFromHistory(entry)}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {entry.inputs.fileSize} {entry.inputs.fileSizeUnit} @{" "}
                            {entry.inputs.speed} {entry.inputs.speedUnit}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-primary font-mono font-semibold">
                          {entry.result.formatted}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <DownloadTimeCalculatorSEO />

      <RelatedTools
        currentTool="download-time-calculator"
        tools={[
          "data-transfer-calculator",
          "bandwidth-calculator",
          "cidr-calculator",
          "subnet-calculator",
          "ip-range-calculator",
          "time-complexity-calculator",
        ]}
      />
    </>
  );
}
