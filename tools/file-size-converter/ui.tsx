"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  convert,
  formatValue,
  formatBytes,
  buildCopyText,
  buildShareText,
  downloadFile,
  getHistory,
  saveHistory,
  clearHistory,
  debounce,
  UNITS,
  UNIT_LABELS,
  type Unit,
  type Standard,
  type ConversionResult,
} from "./logic";
import FileSizeConverterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; value: number; unit: Unit }[] = [
  { label: "1 KB",    value: 1,          unit: "KB" },
  { label: "1 MB",    value: 1,          unit: "MB" },
  { label: "100 MB",  value: 100,        unit: "MB" },
  { label: "1 GB",    value: 1,          unit: "GB" },
  { label: "5 GB",    value: 5,          unit: "GB" },
  { label: "1 TB",    value: 1,          unit: "TB" },
  { label: "1 PB",    value: 1,          unit: "PB" },
];

export default function FileSizeConverterUI() {
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState<Unit>("GB");
  const [standard, setStandard] = useState<Standard>("binary");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError]   = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ReturnType<typeof getHistory>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    inputRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce((val: string, unit: Unit, std: Standard) => {
      if (!val || val === "") { setResult(null); setError(null); return; }
      const n = parseFloat(val);
      if (isNaN(n) || n < 0) { setError("Please enter a valid positive number."); setResult(null); return; }
      setError(null);
      setResult(convert(n, unit, std));
    }, 100),
    []
  );

  useEffect(() => { run(inputValue, inputUnit, standard); }, [inputValue, inputUnit, standard]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputValue(String(p.value));
    setInputUnit(p.unit);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setInputValue("1");
    setInputUnit("GB");
    setStandard("binary");
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputValue: result.inputValue, inputUnit: result.inputUnit, standard, bytes: result.bytes });
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all conversion history?")) { clearHistory(); setHistory([]); }
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = () => {
    if (!result) return;
    copy(buildCopyText(result, standard), "all");
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(buildCopyText(result, standard), "file-size-conversion.txt");
  };

  const handleExportCsv = () => {
    if (!result) return;
    const lines = ["Unit,Value,Standard"];
    for (const u of UNITS) {
      const label = standard === "binary" ? UNIT_LABELS[u].binary : UNIT_LABELS[u].decimal;
      lines.push(`${label},${result.values[u]},${standard}`);
    }
    downloadFile(lines.join("\n"), "file-size-conversion.csv", "text/csv");
  };

  const getLabel = (u: Unit) =>
    standard === "binary" ? UNIT_LABELS[u].binary : UNIT_LABELS[u].decimal;

  // Result rows for the table
  const resultRows = result
    ? UNITS.map(u => ({
        unit: u,
        label: getLabel(u),
        value: formatValue(result.values[u]),
        raw: result.values[u],
        isInput: u === result.inputUnit,
      }))
    : [];

  const summaryUnit = result ? getLabel(inputUnit) : "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">💾</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              File Size Converter
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Convert between Bytes, KB, MB, GB, TB, and PB using binary (1024) or decimal (1000) standards. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs */}
          <div className="lg:col-span-4 space-y-5">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Conversion Settings
              </h3>

              {/* Value input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">File Size</label>
                <input
                  ref={inputRef}
                  type="number"
                  value={inputValue}
                  min="0"
                  step="any"
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === "Escape" && handleReset()}
                  placeholder="1"
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${error ? "border-red-300" : "border-gray-200"}`}
                  aria-label="File size value"
                />
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
              </div>

              {/* Unit selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">From Unit</label>
                <select
                  value={inputUnit}
                  onChange={e => setInputUnit(e.target.value as Unit)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Source unit"
                >
                  {UNITS.map(u => (
                    <option key={u} value={u}>{getLabel(u)} ({u})</option>
                  ))}
                </select>
              </div>

              {/* Standard toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Conversion Standard</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["binary", "decimal"] as Standard[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setStandard(s)}
                      className={`py-2 rounded-lg text-sm font-medium transition-colors border ${
                        standard === s
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {s === "binary" ? "Binary (1024)" : "Decimal (1000)"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {standard === "binary"
                    ? "1 KB = 1,024 Bytes — used by OS and filesystems"
                    : "1 KB = 1,000 Bytes — used by storage manufacturers"}
                </p>
              </div>

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
                    onClick={handleExportCsv}
                    disabled={!result}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Export CSV
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
                Conversion Summary
              </p>
              {result ? (
                <>
                  <div className="text-2xl font-bold font-mono mb-1 break-all">
                    {formatValue(result.inputValue)} {summaryUnit}
                  </div>
                  <div className="text-sm text-primary-100 mb-3">
                    {result.bytes >= 1 ? `${formatBytes(Math.round(result.bytes))} Bytes` : `${result.bytes} Bytes`}
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    {UNITS.filter(u => u !== inputUnit && result.values[u] >= 0.000001 && result.values[u] < 1e15)
                      .slice(0, 3)
                      .map(u => (
                        <div key={u} className="flex justify-between">
                          <span className="text-primary-100">{getLabel(u)}</span>
                          <span className="font-semibold font-mono text-xs">{formatValue(result.values[u])}</span>
                        </div>
                      ))}
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={handleCopyAll}
                      className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      {copied === "all" ? "✓ Copied!" : "Copy All Results"}
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
                <div className="text-primary-100 text-sm">Enter a file size to convert</div>
              )}
            </div>

          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-5">

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => {
                  const active = inputValue === String(p.value) && inputUnit === p.unit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p)}
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
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  All Conversions
                  {result && (
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      ({standard === "binary" ? "Binary · 1024 base" : "Decimal · 1000 base"})
                    </span>
                  )}
                </h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {resultRows.map(({ unit, label, value, raw, isInput }) => (
                    <div
                      key={unit}
                      className={`flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors ${isInput ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isInput ? "text-primary" : "text-gray-600"}`}>
                          {label}
                        </span>
                        {isInput && (
                          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">input</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 font-mono">{value}</span>
                        <button
                          onClick={() => copy(value, `row-${unit}`)}
                          className="text-xs text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                          title={`Copy ${label} value`}
                        >
                          {copied === `row-${unit}` ? "✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {error ?? "Enter a file size to see conversions"}
                </div>
              )}
            </div>

            {/* Binary vs Decimal note */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                💡 Binary vs Decimal — What's the difference?
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-xs text-amber-800">
                <div>
                  <p className="font-semibold mb-1">Binary (1024-based)</p>
                  <p>Used by operating systems (Windows, macOS, Linux). 1 KB = 1,024 Bytes. Also called kibibyte (KiB).</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Decimal (1000-based)</p>
                  <p>Used by storage manufacturers and cloud providers. 1 KB = 1,000 Bytes. A 1 TB hard drive is ~931 GiB.</p>
                </div>
              </div>
            </div>

            {/* Share-ready text */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Share-Ready Format
                </h3>
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 font-mono text-xs text-gray-700 break-all">
                  {buildShareText(result, standard)}
                </div>
                <button
                  onClick={() => copy(buildShareText(result, standard), "share")}
                  className="mt-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  {copied === "share" ? "✓ Copied" : "Copy"}
                </button>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Conversion History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved conversions yet</div>
                  ) : (
                    history.map(entry => (
                      <div
                        key={entry.id}
                        onClick={() => { setInputValue(String(entry.inputValue)); setInputUnit(entry.inputUnit); setStandard(entry.standard); setShowHistory(false); }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {entry.inputValue} {entry.inputUnit}
                          </span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-primary font-mono">
                          {formatBytes(Math.round(entry.bytes))} Bytes · {entry.standard}
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

      <FileSizeConverterSEO />

      <RelatedTools
        currentTool="file-size-converter"
        tools={[
          "data-transfer-calculator",
          "bandwidth-calculator",
          "download-time-calculator",
          "checksum-calculator",
          "subnet-calculator",
          "latency-calculator",
        ]}
      />
    </>
  );
}
