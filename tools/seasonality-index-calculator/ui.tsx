"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateSeasonality, parseDelimitedText, debounce, formatNum,
  saveSession, loadSession,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  SEASON_TYPES, CALC_METHODS, PRECISION_OPTIONS, SAMPLE_DATASETS,
  DEFAULT_ROWS, DEFAULT_SEASON_TYPE, DEFAULT_METHOD, DEFAULT_PRECISION,
  type SeasonType, type CalcMethod, type DataRow, type CalculationResult,
} from "./logic";
import { SeasonalityBarChart, SeasonalityLineChart } from "./chart";
import SeasonalityIndexCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function SeasonalityIndexCalculatorUI() {
  const [rows, setRows] = useState<DataRow[]>(DEFAULT_ROWS);
  const [seasonType, setSeasonType] = useState<SeasonType>(DEFAULT_SEASON_TYPE);
  const [method, setMethod] = useState<CalcMethod>(DEFAULT_METHOD);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [pasteText, setPasteText] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const [parseWarnings, setParseWarnings] = useState<string[]>([]);

  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState<CalculationResult>(() =>
    calculateSeasonality(DEFAULT_ROWS, DEFAULT_SEASON_TYPE, DEFAULT_METHOD)
  );

  useEffect(() => {
    const session = loadSession();
    if (session && session.rows.length > 0) {
      setRows(session.rows);
      setSeasonType(session.seasonType);
      setMethod(session.method);
      setPrecision(session.precision);
    }
  }, []);

  const compute = useCallback(
    debounce((r: DataRow[], st: SeasonType, m: CalcMethod) => {
      setResult(calculateSeasonality(r, st, m));
    }, 150),
    []
  );

  useEffect(() => { compute(rows, seasonType, method); }, [rows, seasonType, method, compute]);

  useEffect(() => {
    const t = setTimeout(() => saveSession({ rows, seasonType, method, precision }), 300);
    return () => clearTimeout(t);
  }, [rows, seasonType, method, precision]);

  const handleReset = () => {
    setRows(DEFAULT_ROWS);
    setSeasonType(DEFAULT_SEASON_TYPE);
    setMethod(DEFAULT_METHOD);
    setPrecision(DEFAULT_PRECISION);
    setParseWarnings([]);
  };

  const handleAddRow = () => setRows([...rows, { period: "", value: 0 }]);
  const handleRemoveRow = (i: number) => setRows(rows.filter((_, idx) => idx !== i));
  const handleUpdateRow = (i: number, field: "period" | "value", val: string) => {
    setRows(rows.map((r, idx) => idx === i ? { ...r, [field]: field === "value" ? parseFloat(val) || 0 : val } : r));
  };

  const handleLoadSample = (sample: (typeof SAMPLE_DATASETS)[number]) => {
    setRows(sample.rows);
    setSeasonType(sample.seasonType);
    setParseWarnings([]);
  };

  const handleParsePaste = () => {
    const { rows: parsed, warnings } = parseDelimitedText(pasteText);
    if (parsed.length > 0) {
      setRows(parsed);
      setParseWarnings(warnings);
      setShowPaste(false);
      setPasteText("");
    } else {
      setParseWarnings(["No valid rows could be parsed from the pasted text."]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const { rows: parsed, warnings } = parseDelimitedText(text);
      if (parsed.length > 0) {
        setRows(parsed);
        setParseWarnings(warnings);
      } else {
        setParseWarnings(["No valid rows could be parsed from the uploaded file."]);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
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
  const handleDownloadCSV = () => download(buildCSVReport(result, precision), "text/csv", "seasonality-index-report.csv");
  const handleDownloadJSON = () => download(buildJSONReport(result), "application/json", "seasonality-index-data.json");

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, precision));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const validRows = rows.filter((r) => r.period.trim() && Number.isFinite(r.value));

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: data entry ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dataset</h3>
                <span className="text-xs text-gray-400">{validRows.length} valid row{validRows.length === 1 ? "" : "s"}</span>
              </div>

              <div className="max-h-72 overflow-y-auto border border-gray-100 rounded-lg divide-y divide-gray-50">
                {rows.map((row, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                    <input
                      type="text"
                      value={row.period}
                      onChange={(e) => handleUpdateRow(i, "period", e.target.value)}
                      placeholder="Period"
                      className="flex-1 min-w-0 px-2 py-1.5 border border-gray-200 rounded-md text-xs focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={row.value}
                      onChange={(e) => handleUpdateRow(i, "value", e.target.value)}
                      placeholder="Value"
                      className="w-24 px-2 py-1.5 border border-gray-200 rounded-md text-xs font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button onClick={() => handleRemoveRow(i)} aria-label="Remove row" className="text-gray-300 hover:text-red-500 text-sm px-1 flex-shrink-0">✕</button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleAddRow} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">+ Add Row</button>
                <button onClick={() => setShowPaste(!showPaste)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Paste Data</button>
              </div>

              {showPaste && (
                <div className="space-y-2">
                  <textarea
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder={"Paste from Excel/Sheets or CSV, e.g.:\nJanuary, 1200\nFebruary, 980"}
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button onClick={handleParsePaste} className="w-full px-3 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">Import Pasted Data</button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Upload CSV</button>
                <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Reset</button>
              </div>
              <input ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />

              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs text-gray-400">Sample datasets:</span>
                {SAMPLE_DATASETS.map((s) => (
                  <button key={s.label} type="button" onClick={() => handleLoadSample(s)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                    {s.label}
                  </button>
                ))}
              </div>

              {parseWarnings.length > 0 && (
                <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 space-y-0.5">
                  {parseWarnings.map((w, i) => <p key={i}>{w}</p>)}
                </div>
              )}
              {result.duplicateWarning && (
                <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">{result.duplicateWarning}</div>
              )}
              {result.error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sic-season-type">Season Type</label>
                <select id="sic-season-type" value={seasonType} onChange={(e) => setSeasonType(e.target.value as SeasonType)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {SEASON_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sic-method">Calculation Method</label>
                <select id="sic-method" value={method} onChange={(e) => setMethod(e.target.value as CalcMethod)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {CALC_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sic-precision">Decimal Precision</label>
                <select id="sic-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimal{n === 1 ? "" : "s"}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {!result.error && (
              <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-heading)" }}>Overall Average</p>
                    <p className="text-3xl font-bold font-mono tabular-nums">{formatNum(result.overallAverage, precision)}</p>
                  </div>
                  {result.seasonalityLevel && (
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      {result.seasonalityLevel.label}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-xs text-primary-100">Highest</p>
                    <p className="font-semibold">{result.highest?.label ?? "—"} <span className="font-mono text-sm">({formatNum(result.highest?.index ?? null, precision)})</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-100">Lowest</p>
                    <p className="font-semibold">{result.lowest?.label ?? "—"} <span className="font-mono text-sm">({formatNum(result.lowest?.index ?? null, precision)})</span></p>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                  <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    {copied ? "✓ Copied!" : "Copy Results"}
                  </button>
                </div>
              </div>
            )}

            {!result.error && result.insights.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>Smart Insights</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {result.insights.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
                {result.seasonalityLevel && (
                  <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-50">{result.seasonalityLevel.description}</p>
                )}
              </div>
            )}

            {!result.error && result.seasons.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Seasonality Index by Period</h3>
                <SeasonalityBarChart seasons={result.seasons} precision={precision} />
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#058554] inline-block" /> Above Average</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#9CA3AF] inline-block" /> Average</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626] inline-block" /> Below Average</span>
                </div>
              </div>
            )}

            {!result.error && validRows.length > 1 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Value Trend (Chronological)</h3>
                <SeasonalityLineChart periods={validRows.map((r) => r.period)} values={validRows.map((r) => r.value)} overallAverage={result.overallAverage ?? 0} />
              </div>
            )}

            {!result.error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Seasonality Index Table</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                        <th className="py-2 px-4 font-medium">Period</th>
                        <th className="py-2 px-4 font-medium">Count</th>
                        <th className="py-2 px-4 font-medium">Average</th>
                        <th className="py-2 px-4 font-medium">Index</th>
                        <th className="py-2 px-4 font-medium">Classification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.seasons.map((s) => (
                        <tr key={s.key} className={s.key === result.highest?.key ? "bg-primary/5" : s.key === result.lowest?.key ? "bg-red-50/50" : ""}>
                          <td className="py-2 px-4 font-medium text-gray-800">{s.label}</td>
                          <td className="py-2 px-4 text-gray-500 font-mono text-xs">{s.count}</td>
                          <td className="py-2 px-4 font-mono text-gray-700">{formatNum(s.average, precision)}</td>
                          <td className="py-2 px-4 font-mono font-semibold" style={{ color: s.classification === "above" ? "#058554" : s.classification === "below" ? "#DC2626" : "#6B7280" }}>
                            {formatNum(s.index, precision)}
                          </td>
                          <td className="py-2 px-4 text-xs text-gray-500 capitalize">{s.classification === "average" ? "Average" : `${s.classification} Average`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!result.error && method === "Deseasonalized" && result.deseasonalized && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Deseasonalized Values</h3>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-xs text-gray-500 sticky top-0 bg-white">
                        <th className="py-2 px-4 font-medium">Period</th>
                        <th className="py-2 px-4 font-medium">Original</th>
                        <th className="py-2 px-4 font-medium">Deseasonalized</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.deseasonalized.map((d, i) => (
                        <tr key={i}>
                          <td className="py-2 px-4 text-gray-700">{d.period}</td>
                          <td className="py-2 px-4 font-mono text-gray-500">{formatNum(d.value, precision)}</td>
                          <td className="py-2 px-4 font-mono text-gray-800">{formatNum(d.deseasonalizedValue, precision)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
            </div>

          </div>
        </div>
      </div>

      <RelatedStrip />
      <SeasonalityIndexCalculatorSEO />

      <RelatedTools />
    </>
  );
}
