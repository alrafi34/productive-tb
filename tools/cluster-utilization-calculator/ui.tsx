"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateUtilization, isUtilizationError, classifyStatus, formatNum, debounce,
  saveInput, loadInput, saveRows, loadRows, saveHistory, getHistory, clearHistory,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML, buildShareUrl, parseShareParams,
  SAMPLE_PRESETS, RESOURCE_TYPES, UNIT_TYPES, DEFAULT_ROWS, makeRowId,
  type ResourceType, type UnitType, type UtilizationResult, type HistoryEntry, type SavedInput, type ResourceRow,
} from "./logic";
import UtilizationGauge from "./gauge";
import ClusterUtilizationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const STATUS_COLORS: Record<string, { bg: string; text: string; gauge: string }> = {
  Healthy: { bg: "bg-green-100", text: "text-green-700", gauge: "#16a34a" },
  Warning: { bg: "bg-amber-100", text: "text-amber-700", gauge: "#d97706" },
  Critical: { bg: "bg-red-100", text: "text-red-700", gauge: "#dc2626" },
};

export default function ClusterUtilizationCalculatorUI() {
  const [resourceType, setResourceType] = useState<ResourceType>("CPU");
  const [unit, setUnit] = useState<UnitType>("Cores");
  const [total, setTotal] = useState("64");
  const [used, setUsed] = useState("48");
  const [reserved, setReserved] = useState("0");
  const [warningThreshold, setWarningThreshold] = useState(80);
  const [criticalThreshold, setCriticalThreshold] = useState(90);
  const [decimals, setDecimals] = useState(2);

  const [result, setResult] = useState<UtilizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSamples, setShowSamples] = useState(false);
  const [rows, setRows] = useState<ResourceRow[]>(DEFAULT_ROWS);

  const runRef = useRef(debounce((
    rt: ResourceType, u: UnitType, t: string, us: string, r: string, warn: number, crit: number, dec: number
  ) => {
    const res = calculateUtilization(rt, u, parseFloat(t) || 0, parseFloat(us) || 0, parseFloat(r) || 0, warn, crit, dec);
    if (isUtilizationError(res)) { setResult(null); setError(res.error); }
    else { setError(null); setResult(res); }
  }, 150));

  const persistRef = useRef(debounce((data: SavedInput) => saveInput(data), 400));

  useEffect(() => {
    setHistory(getHistory());
    const savedRows = loadRows();
    if (savedRows) setRows(savedRows);
    const shared = parseShareParams();
    const saved = loadInput();
    const initial = shared ?? saved;
    if (initial) {
      setResourceType(initial.resourceType); setUnit(initial.unit); setTotal(initial.total);
      setUsed(initial.used); setReserved(initial.reserved);
      setWarningThreshold(initial.warningThreshold); setCriticalThreshold(initial.criticalThreshold);
      setDecimals(initial.decimals);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runRef.current(resourceType, unit, total, used, reserved, warningThreshold, criticalThreshold, decimals);
  }, [resourceType, unit, total, used, reserved, warningThreshold, criticalThreshold, decimals]);

  useEffect(() => {
    persistRef.current({ resourceType, unit, total, used, reserved, warningThreshold, criticalThreshold, decimals });
  }, [resourceType, unit, total, used, reserved, warningThreshold, criticalThreshold, decimals]);

  useEffect(() => { saveRows(rows); }, [rows]);

  const handleReset = () => {
    setResourceType("CPU"); setUnit("Cores"); setTotal("64"); setUsed("48"); setReserved("0");
    setWarningThreshold(80); setCriticalThreshold(90); setDecimals(2);
  };

  const handleLoadPreset = (p: (typeof SAMPLE_PRESETS)[number]) => {
    setResourceType(p.resourceType); setUnit(p.unit); setTotal(String(p.total));
    setUsed(String(p.used)); setReserved(String(p.reserved));
    setShowSamples(false);
  };

  const currentInput = (): SavedInput => ({ resourceType, unit, total, used, reserved, warningThreshold, criticalThreshold, decimals });

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
    a.download = "cluster-utilization.csv"; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "cluster-utilization.json"; a.click(); URL.revokeObjectURL(a.href);
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
    saveHistory({ input: currentInput(), utilizationPct: result.utilizationPct, status: result.status });
    setHistory(getHistory());
  };

  const handleAddRow = () => {
    setRows([...rows, { id: makeRowId(), resourceType: "Custom", unit: "Custom", total: 100, used: 50 }]);
  };

  const handleRemoveRow = (id: string) => setRows(rows.filter((r) => r.id !== id));

  const updateRow = (id: string, patch: Partial<ResourceRow>) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const statusColors = result ? STATUS_COLORS[result.status] : STATUS_COLORS.Healthy;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Resource Configuration</h3>
                <button onClick={() => setShowSamples(!showSamples)} className="text-xs text-primary font-medium hover:underline">🎲 Examples</button>
              </div>
              {showSamples && (
                <div className="absolute top-10 right-5 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {SAMPLE_PRESETS.map((s) => (
                    <button key={s.name} onClick={() => handleLoadPreset(s)} className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">{s.name}</button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="cu-type" className="block text-xs font-medium text-gray-600 mb-1">Resource Type</label>
                  <select id="cu-type" value={resourceType} onChange={(e) => setResourceType(e.target.value as ResourceType)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="cu-unit" className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                  <select id="cu-unit" value={unit} onChange={(e) => setUnit(e.target.value as UnitType)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                    {UNIT_TYPES.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="cu-total" className="block text-xs font-medium text-gray-600 mb-1">Total Capacity</label>
                  <input id="cu-total" type="number" min={0} value={total} onChange={(e) => setTotal(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
                <div>
                  <label htmlFor="cu-used" className="block text-xs font-medium text-gray-600 mb-1">Used</label>
                  <input id="cu-used" type="number" min={0} value={used} onChange={(e) => setUsed(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
                </div>
              </div>

              <div>
                <label htmlFor="cu-reserved" className="block text-xs font-medium text-gray-600 mb-1">Reserved (Optional)</label>
                <input id="cu-reserved" type="number" min={0} value={reserved} onChange={(e) => setReserved(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono" />
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="cu-warn" className="text-xs font-medium text-gray-600">Warning Threshold</label>
                    <span className="text-xs font-mono font-semibold text-amber-600">{warningThreshold}%</span>
                  </div>
                  <input id="cu-warn" type="range" min={50} max={100} step={1} value={warningThreshold}
                    onChange={(e) => setWarningThreshold(parseInt(e.target.value, 10))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="cu-crit" className="text-xs font-medium text-gray-600">Critical Threshold</label>
                    <span className="text-xs font-mono font-semibold text-red-600">{criticalThreshold}%</span>
                  </div>
                  <input id="cu-crit" type="range" min={60} max={100} step={1} value={criticalThreshold}
                    onChange={(e) => setCriticalThreshold(parseInt(e.target.value, 10))} className="w-full accent-red-500" />
                </div>
              </div>

              <div>
                <label htmlFor="cu-precision" className="block text-xs font-medium text-gray-600 mb-1">Decimal Precision</label>
                <select id="cu-precision" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs bg-white">
                  {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">{error}</p>}

              <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              {result ? (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <UtilizationGauge pct={result.utilizationPct} color={statusColors.gauge} label={`${result.resourceType} utilization`} />
                  <div className="flex-1 w-full space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors.bg} ${statusColors.text}`}>{result.status}</span>
                      <span className="text-sm text-gray-500">{result.resourceType} · {formatNum(result.used)} / {formatNum(result.total)} {result.unit}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Remaining", `${formatNum(result.remaining)} ${result.unit}`],
                        ["Available", `${formatNum(result.available)} ${result.unit}`],
                        ["Headroom", `${formatNum(result.headroomPct)}%`],
                        ["Overcommit Ratio", formatNum(result.overcommitRatio, 3)],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-500">{label}</p>
                          <p className="text-sm font-bold font-mono text-gray-800">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={handleCopy} className="flex-1 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        {copied ? "✓ Copied!" : "Copy Result"}
                      </button>
                      <button onClick={handleShare} className="flex-1 border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                      <button onClick={handleSave} className="flex-1 border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs">Save</button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-10">Enter total and used capacity on the left to calculate utilization.</p>
              )}
            </div>

            {/* Status threshold guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Status Thresholds</h3>
              </div>
              <div className="divide-y divide-gray-50">
                <div className={`flex items-center justify-between px-4 py-2 text-sm ${result?.status === "Healthy" ? "bg-primary/5" : ""}`}>
                  <span className="font-mono text-gray-600">Below {warningThreshold}%</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Healthy</span>
                </div>
                <div className={`flex items-center justify-between px-4 py-2 text-sm ${result?.status === "Warning" ? "bg-primary/5" : ""}`}>
                  <span className="font-mono text-gray-600">{warningThreshold}% – {criticalThreshold}%</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Warning</span>
                </div>
                <div className={`flex items-center justify-between px-4 py-2 text-sm ${result?.status === "Critical" ? "bg-primary/5" : ""}`}>
                  <span className="font-mono text-gray-600">{criticalThreshold}% and above</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Critical</span>
                </div>
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
                      setResourceType(entry.input.resourceType); setUnit(entry.input.unit); setTotal(entry.input.total);
                      setUsed(entry.input.used); setReserved(entry.input.reserved);
                      setWarningThreshold(entry.input.warningThreshold); setCriticalThreshold(entry.input.criticalThreshold);
                      setShowHistory(false);
                    }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.input.resourceType}: {formatNum(entry.utilizationPct)}%</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className={`text-xs font-mono font-semibold ${STATUS_COLORS[entry.status].text}`}>{entry.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Multi-resource dashboard */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Resource Dashboard</h3>
            <button onClick={handleAddRow} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">+ Add Resource</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {rows.map((row) => {
              const rowResult = calculateUtilization(row.resourceType, row.unit, row.total, row.used, 0, warningThreshold, criticalThreshold, decimals);
              const rowError = isUtilizationError(rowResult);
              const pct = rowError ? 0 : rowResult.utilizationPct;
              const status = rowError ? "Healthy" : classifyStatus(pct, warningThreshold, criticalThreshold);
              const colors = STATUS_COLORS[status];
              return (
                <div key={row.id} className="border border-gray-100 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <select value={row.resourceType} onChange={(e) => updateRow(row.id, { resourceType: e.target.value as ResourceType })}
                      className="text-xs font-semibold text-gray-800 bg-transparent border-none p-0 focus:ring-0">
                      {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <button onClick={() => handleRemoveRow(row.id)} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" min={0} value={row.total} onChange={(e) => updateRow(row.id, { total: parseFloat(e.target.value) || 0 })}
                      placeholder="Total" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs font-mono" />
                    <input type="number" min={0} value={row.used} onChange={(e) => updateRow(row.id, { used: parseFloat(e.target.value) || 0 })}
                      placeholder="Used" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs font-mono" />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-lg font-bold font-mono text-gray-800">{rowError ? "—" : `${formatNum(pct, 1)}%`}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${colors.bg} ${colors.text}`}>{status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ClusterUtilizationCalculatorSEO />

      <RelatedTools
        currentTool="cluster-utilization-calculator"
        tools={[
          "big-data-throughput-calculator",
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
