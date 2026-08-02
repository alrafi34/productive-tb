"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateIndexSize, debounce, formatBytes, formatNum,
  saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  buildShareUrl, parseShareParams,
  DATABASE_ENGINES, INDEX_TYPES, COMPRESSION_LEVELS, PAGE_SIZES, PRESETS, COLUMN_TYPE_SUGGESTIONS,
  ENGINE_DEFAULTS, INDEX_TYPE_MULTIPLIERS,
  DEFAULT_ENGINE, DEFAULT_INDEX_TYPE, DEFAULT_ROWS, DEFAULT_COLUMN_SIZE, DEFAULT_PRIMARY_KEY_SIZE,
  DEFAULT_COMPOSITE_COLUMNS, DEFAULT_FILL_FACTOR, DEFAULT_OVERHEAD_PERCENT, DEFAULT_PAGE_SIZE, DEFAULT_COMPRESSION,
  type DatabaseEngine, type IndexType, type CompressionLevel, type PageSizeKB,
  type IndexSizeInputs, type IndexSizeResult, type HistoryEntry,
} from "./logic";
import { BreakdownPieChart, ComparisonBarChart } from "./chart";
import IndexSizeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function IndexSizeCalculatorUI() {
  const [engine, setEngine] = useState<DatabaseEngine>(DEFAULT_ENGINE);
  const [indexType, setIndexType] = useState<IndexType>(DEFAULT_INDEX_TYPE);
  const [rows, setRows] = useState(String(DEFAULT_ROWS));
  const [columnSize, setColumnSize] = useState(String(DEFAULT_COLUMN_SIZE));
  const [primaryKeySize, setPrimaryKeySize] = useState(String(DEFAULT_PRIMARY_KEY_SIZE));
  const [compositeColumns, setCompositeColumns] = useState(String(DEFAULT_COMPOSITE_COLUMNS));
  const [fillFactor, setFillFactor] = useState(DEFAULT_FILL_FACTOR);
  const [overheadPercent, setOverheadPercent] = useState(DEFAULT_OVERHEAD_PERCENT);
  const [pageSizeKB, setPageSizeKB] = useState<PageSizeKB>(DEFAULT_PAGE_SIZE);
  const [compression, setCompression] = useState<CompressionLevel>(DEFAULT_COMPRESSION);

  const [compareMode, setCompareMode] = useState(false);
  const [compareIndexType, setCompareIndexType] = useState<IndexType>("Hash");

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const buildInputs = useCallback((type: IndexType = indexType): IndexSizeInputs => ({
    engine, indexType: type, rows: parseFloat(rows), columnSize: parseFloat(columnSize),
    primaryKeySize: parseFloat(primaryKeySize), compositeColumns: parseInt(compositeColumns, 10) || 0,
    fillFactor, overheadPercent, pageSizeKB, compression,
  }), [engine, indexType, rows, columnSize, primaryKeySize, compositeColumns, fillFactor, overheadPercent, pageSizeKB, compression]);

  const [result, setResult] = useState<IndexSizeResult>(() => calculateIndexSize({
    engine: DEFAULT_ENGINE, indexType: DEFAULT_INDEX_TYPE, rows: DEFAULT_ROWS, columnSize: DEFAULT_COLUMN_SIZE,
    primaryKeySize: DEFAULT_PRIMARY_KEY_SIZE, compositeColumns: DEFAULT_COMPOSITE_COLUMNS, fillFactor: DEFAULT_FILL_FACTOR,
    overheadPercent: DEFAULT_OVERHEAD_PERCENT, pageSizeKB: DEFAULT_PAGE_SIZE, compression: DEFAULT_COMPRESSION,
  }));
  const [compareResult, setCompareResult] = useState<IndexSizeResult | null>(null);

  useEffect(() => {
    setHistory(getHistory());
    const shared = parseShareParams();
    if (shared) {
      if (shared.engine) setEngine(shared.engine);
      if (shared.indexType) setIndexType(shared.indexType);
      if (shared.rows !== undefined) setRows(String(shared.rows));
      if (shared.columnSize !== undefined) setColumnSize(String(shared.columnSize));
      if (shared.primaryKeySize !== undefined) setPrimaryKeySize(String(shared.primaryKeySize));
      if (shared.compositeColumns !== undefined) setCompositeColumns(String(shared.compositeColumns));
      if (shared.fillFactor !== undefined) setFillFactor(shared.fillFactor);
      if (shared.overheadPercent !== undefined) setOverheadPercent(shared.overheadPercent);
      if (shared.pageSizeKB !== undefined) setPageSizeKB(shared.pageSizeKB);
      if (shared.compression) setCompression(shared.compression);
    } else {
      firstInputRef.current?.focus();
    }
  }, []);

  const compute = useCallback(
    debounce((inputs: IndexSizeInputs, cmp: boolean, cmpType: IndexType) => {
      setResult(calculateIndexSize(inputs));
      setCompareResult(cmp ? calculateIndexSize({ ...inputs, indexType: cmpType }) : null);
    }, 150),
    []
  );

  useEffect(() => { compute(buildInputs(), compareMode, compareIndexType); }, [buildInputs, compareMode, compareIndexType, compute]);

  const handleReset = () => {
    setEngine(DEFAULT_ENGINE);
    setIndexType(DEFAULT_INDEX_TYPE);
    setRows(String(DEFAULT_ROWS));
    setColumnSize(String(DEFAULT_COLUMN_SIZE));
    setPrimaryKeySize(String(DEFAULT_PRIMARY_KEY_SIZE));
    setCompositeColumns(String(DEFAULT_COMPOSITE_COLUMNS));
    setFillFactor(DEFAULT_FILL_FACTOR);
    setOverheadPercent(DEFAULT_OVERHEAD_PERCENT);
    setPageSizeKB(DEFAULT_PAGE_SIZE);
    setCompression(DEFAULT_COMPRESSION);
    setCompareMode(false);
    firstInputRef.current?.focus();
  };

  const handlePreset = (p: (typeof PRESETS)[number]) => {
    setEngine(p.engine);
    setIndexType(p.indexType);
    setRows(String(p.rows));
    setColumnSize(String(p.columnSize));
    setPrimaryKeySize(String(p.primaryKeySize));
  };

  const handleColumnSuggestion = (bytes: number) => setColumnSize(String(bytes));

  const handleCopy = () => {
    navigator.clipboard.writeText(buildTextReport(buildInputs(), result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };
  const handleDownloadCSV = () => download(buildCSVReport(buildInputs(), result), "text/csv", "index-size-report.csv");
  const handleDownloadJSON = () => download(buildJSONReport(buildInputs(), result), "application/json", "index-size-data.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(buildInputs(), result));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(buildShareUrl(buildInputs()));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => { saveHistory(buildInputs(), result); setHistory(getHistory()); };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Inputs</h3>
              <p className="text-xs text-gray-400 -mt-2">Estimates only — actual index size varies by engine version and configuration.</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-engine">Database Engine</label>
                  <select id="isc-engine" value={engine} onChange={(e) => setEngine(e.target.value as DatabaseEngine)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {DATABASE_ENGINES.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-type">Index Type</label>
                  <select id="isc-type" value={indexType} onChange={(e) => setIndexType(e.target.value as IndexType)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {INDEX_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400">{INDEX_TYPE_MULTIPLIERS[indexType].note}</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-rows">Number of Rows</label>
                <input ref={firstInputRef} id="isc-rows" type="number" min={0} value={rows} onChange={(e) => setRows(e.target.value)}
                  placeholder="5000000"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-column">Indexed Column Size (Bytes)</label>
                  <input id="isc-column" type="number" min={0} value={columnSize} onChange={(e) => setColumnSize(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-pk">Primary Key Size (Bytes)</label>
                  <input id="isc-pk" type="number" min={0} value={primaryKeySize} onChange={(e) => setPrimaryKeySize(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-gray-400">Column type:</span>
                {COLUMN_TYPE_SUGGESTIONS.map((c) => (
                  <button key={c.label} type="button" onClick={() => handleColumnSuggestion(c.bytes)}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {c.label}
                  </button>
                ))}
              </div>

              {indexType === "Composite" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-composite">Additional Composite Columns</label>
                  <input id="isc-composite" type="number" min={1} value={compositeColumns} onChange={(e) => setCompositeColumns(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  <p className="text-xs text-gray-400 mt-1">Each additional column is estimated using the indexed column size above.</p>
                </div>
              )}

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-fill">
                  <span>Fill Factor</span><span className="font-mono text-primary">{fillFactor}%</span>
                </label>
                <input id="isc-fill" type="range" min={50} max={100} step={1} value={fillFactor} onChange={(e) => setFillFactor(parseInt(e.target.value, 10))}
                  className="w-full accent-primary" />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-overhead">
                  <span>Estimated Overhead</span><span className="font-mono text-primary">{overheadPercent}%</span>
                </label>
                <input id="isc-overhead" type="range" min={0} max={50} step={1} value={overheadPercent} onChange={(e) => setOverheadPercent(parseInt(e.target.value, 10))}
                  className="w-full accent-primary" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-page">Page Size</label>
                  <select id="isc-page" value={pageSizeKB} onChange={(e) => setPageSizeKB(parseInt(e.target.value, 10) as PageSizeKB)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {PAGE_SIZES.map((s) => <option key={s} value={s}>{s} KB</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-compression">Compression</label>
                  <select id="isc-compression" value={compression} onChange={(e) => setCompression(e.target.value as CompressionLevel)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {COMPRESSION_LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}

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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={compareMode} onChange={(e) => setCompareMode(e.target.checked)} className="accent-primary w-4 h-4" />
                <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Compare with a second index type</span>
              </label>
              {compareMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="isc-compare-type">Compare Against</label>
                  <select id="isc-compare-type" value={compareIndexType} onChange={(e) => setCompareIndexType(e.target.value as IndexType)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                    {INDEX_TYPES.filter((t) => t !== indexType).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-6 space-y-5">

            {!result.error && (
              <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Estimated Index Size</p>
                <p className="text-3xl font-bold font-mono tabular-nums">{formatBytes(result.finalSize)}</p>
                <p className="text-sm text-primary-100 mt-1">≈ {formatNum(result.estimatedPages, 0)} pages · {formatNum(result.storageOverheadPercent, 1)}% overhead</p>
                {result.warning && (
                  <p className="mt-3 px-3 py-2 rounded-lg text-xs bg-white/15 font-medium">⚠ {result.warning}</p>
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

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>Formula Breakdown</h3>
                <div className="space-y-1.5 text-sm text-gray-600 font-mono">
                  <p>Entry Size = Column + PK + Pointer({ENGINE_DEFAULTS[engine].pointerSize}) + Metadata({ENGINE_DEFAULTS[engine].metadataSize}) = {formatNum(result.entrySize, 0)} Bytes</p>
                  <p>Raw Index = Entry × Rows = {formatBytes(result.rawIndexSize)}</p>
                  <p>Compressed = Raw × Type × Compression = {formatBytes(result.compressedSize)}</p>
                  <p>Fill-Factor Adjusted = Compressed ÷ Fill Factor = {formatBytes(result.fillFactorAdjustedSize)}</p>
                  <p className="text-gray-900 font-semibold">Final = Adjusted × (1 + Overhead%) = {formatBytes(result.finalSize)}</p>
                </div>
                <p className="text-xs text-gray-400 pt-1">{ENGINE_DEFAULTS[engine].note}</p>
              </div>
            )}

            {!result.error && result.compressedSize !== null && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Storage Breakdown</h3>
                <BreakdownPieChart
                  compressedSize={result.compressedSize ?? 0}
                  fillFactorImpact={result.fillFactorImpact ?? 0}
                  overheadImpact={result.overheadImpact ?? 0}
                />
              </div>
            )}

            {!result.error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ["Raw Index Size", formatBytes(result.rawIndexSize)],
                  ["Compression Saved", formatBytes(result.compressionSaved)],
                  ["Estimated Pages", formatNum(result.estimatedPages, 0)],
                  ["Fill Factor Impact", formatBytes(result.fillFactorImpact)],
                  ["Overhead Impact", formatBytes(result.overheadImpact)],
                  ["Storage Overhead", `${formatNum(result.storageOverheadPercent, 1)}%`],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-bold font-mono text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {compareMode && compareResult && !compareResult.error && !result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>{indexType} vs {compareIndexType}</h3>
                <ComparisonBarChart labelA={indexType} sizeA={result.finalSize ?? 0} labelB={compareIndexType} sizeB={compareResult.finalSize ?? 0} />
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
              <button onClick={handleShare} className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
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
                        setEngine(entry.inputs.engine);
                        setIndexType(entry.inputs.indexType);
                        setRows(String(entry.inputs.rows));
                        setColumnSize(String(entry.inputs.columnSize));
                        setPrimaryKeySize(String(entry.inputs.primaryKeySize));
                        setCompositeColumns(String(entry.inputs.compositeColumns));
                        setFillFactor(entry.inputs.fillFactor);
                        setOverheadPercent(entry.inputs.overheadPercent);
                        setPageSizeKB(entry.inputs.pageSizeKB);
                        setCompression(entry.inputs.compression);
                        setShowHistory(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatBytes(entry.finalSize)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.inputs.engine} · {entry.inputs.indexType} · {entry.inputs.rows.toLocaleString("en-US")} rows</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <IndexSizeCalculatorSEO />

      <RelatedTools
        currentTool="index-size-calculator"
        tools={[
          "storage-requirement-calculator",
          "hadoop-storage-calculator",
          "data-partition-calculator",
          "cache-efficiency-calculator",
          "data-compression-ratio-calculator",
          "cluster-utilization-calculator",
        ]}
      />
    </>
  );
}
