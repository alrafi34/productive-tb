"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateStorage, validateInputs, debounce, parseNum, formatBytes,
  buildShareUrl, saveHistory, getHistory, clearHistory, saveInputs, loadInputs,
  buildTextReport, buildCSVReport, buildJSONReport, buildPrintHTML,
  DEFAULT_INPUTS, UNIT_LABELS, UNIT_ORDER, PERIOD_LABELS, PERIOD_ORDER,
  RAID_META, RAID_ORDER, CURRENCY_SYMBOLS, CURRENCY_ORDER,
  FILE_SCENARIO_META, FILE_SCENARIO_ORDER,
  type Mode, type StorageInputs, type StorageResult, type HistoryEntry,
  type SizeUnit, type PeriodUnit, type RaidKey, type CurrencyKey, type FileScenario,
} from "./logic";
import { BreakdownDonut, GrowthChart } from "./chart";
import StorageRequirementCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const MODE_META: Record<Mode, string> = {
  file: "File Storage",
  backup: "Backup Storage",
  video: "Video / CCTV Storage",
};

export default function StorageRequirementCalculatorUI() {
  const [inputs, setInputs] = useState<StorageInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<StorageResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  const runRef = useRef(debounce((inp: StorageInputs) => {
    const errs = validateInputs(inp);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) { setResult(null); return; }
    setResult(calculateStorage(inp));
  }, 150));
  const persistRef = useRef(debounce((inp: StorageInputs) => saveInputs(inp), 400));

  useEffect(() => {
    setHistory(getHistory());
    const saved = loadInputs();
    if (saved) setInputs(saved);
    else firstRef.current?.focus();
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { runRef.current(inputs); }, [inputs]);
  useEffect(() => { persistRef.current(inputs); }, [inputs]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    firstRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleReset(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMode = (mode: Mode) => setInputs((p) => ({ ...p, mode }));
  const setCommon = <K extends keyof StorageInputs["common"]>(field: K, val: StorageInputs["common"][K]) =>
    setInputs((p) => ({ ...p, common: { ...p.common, [field]: val } }));
  const setFile = <K extends keyof StorageInputs["file"]>(field: K, val: StorageInputs["file"][K]) =>
    setInputs((p) => ({ ...p, file: { ...p.file, [field]: val } }));
  const setBackup = <K extends keyof StorageInputs["backup"]>(field: K, val: StorageInputs["backup"][K]) =>
    setInputs((p) => ({ ...p, backup: { ...p.backup, [field]: val } }));
  const setVideo = <K extends keyof StorageInputs["video"]>(field: K, val: StorageInputs["video"][K]) =>
    setInputs((p) => ({ ...p, video: { ...p.video, [field]: val } }));

  const handleScenarioChange = (scenario: FileScenario) => {
    const defaults = FILE_SCENARIO_META[scenario].defaults;
    setInputs((p) => ({ ...p, file: { ...p.file, ...defaults, scenario } }));
  };

  const symbol = CURRENCY_SYMBOLS[inputs.common.currency];

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${formatBytes(result.finalBytes)} — ${symbol}${result.estimatedCost.toFixed(2)}/month`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result, inputs)], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `storage-requirement-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([buildJSONReport(result, inputs)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `storage-requirement-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handlePrint = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(result, inputs));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  const handleShare = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result });
    setHistory(getHistory());
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(MODE_META) as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  inputs.mode === m ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {MODE_META[m]}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            {inputs.mode === "file" && "Final Storage = File Size × Files × Growth × (1 − Compression) × Backups × RAID × (1 + Safety Margin)"}
            {inputs.mode === "backup" && "Required Storage = Daily Backup × Retention Days × (1 + Safety Margin)"}
            {inputs.mode === "video" && "Required Storage = (Bitrate ÷ 8) × Seconds/Day × Days × Cameras × (1 + Safety Margin)"}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: inputs ── */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>{MODE_META[inputs.mode]} Inputs</h3>

              {inputs.mode === "file" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-scenario">Scenario</label>
                    <select id="src-scenario" value={inputs.file.scenario} onChange={(e) => handleScenarioChange(e.target.value as FileScenario)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                      {FILE_SCENARIO_ORDER.map((s) => <option key={s} value={s}>{FILE_SCENARIO_META[s].label}</option>)}
                    </select>
                    <p className="text-[11px] text-gray-400 mt-1">{FILE_SCENARIO_META[inputs.file.scenario].hint}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-filesize">Average File Size</label>
                      <input ref={firstRef} id="src-filesize" type="number" min="0" step="any" inputMode="decimal"
                        value={inputs.file.fileSize || ""} onChange={(e) => setFile("fileSize", parseNum(e.target.value))}
                        placeholder="10" aria-invalid={!!errors.fileSize}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.fileSize ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-fileunit">Unit</label>
                      <select id="src-fileunit" value={inputs.file.fileUnit} onChange={(e) => setFile("fileUnit", e.target.value as SizeUnit)}
                        className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white">
                        {UNIT_ORDER.map((u) => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
                      </select>
                    </div>
                  </div>
                  {errors.fileSize && <p className="text-xs text-red-600" role="alert">{errors.fileSize}</p>}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="src-numfiles">Number of Files</label>
                    <input id="src-numfiles" type="number" min="0" inputMode="numeric"
                      value={inputs.file.numFiles || ""} onChange={(e) => setFile("numFiles", parseNum(e.target.value))}
                      placeholder="5000" aria-invalid={!!errors.numFiles}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.numFiles ? "border-red-300" : "border-gray-200"}`} />
                    {errors.numFiles && <p className="text-xs text-red-600 mt-1" role="alert">{errors.numFiles}</p>}
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="src-compression">Compression Ratio <span className="font-mono text-gray-400">{inputs.file.compressionRatio}%</span></label>
                    <input id="src-compression" type="range" min={0} max={100} value={inputs.file.compressionRatio} onChange={(e) => setFile("compressionRatio", parseInt(e.target.value, 10))} className="w-full accent-primary" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-backups">Backup Copies</label>
                      <select id="src-backups" value={inputs.file.backupCopies} onChange={(e) => setFile("backupCopies", parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-raid">RAID Redundancy</label>
                      <select id="src-raid" value={inputs.file.raid} onChange={(e) => setFile("raid", e.target.value as RaidKey)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                        {RAID_ORDER.map((r) => <option key={r} value={r}>{RAID_META[r].label}</option>)}
                      </select>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 -mt-2">{RAID_META[inputs.file.raid].hint}</p>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-retention">Growth Projection Period</label>
                      <input id="src-retention" type="number" min="0" inputMode="numeric"
                        value={inputs.file.retentionValue || ""} onChange={(e) => setFile("retentionValue", parseNum(e.target.value))}
                        placeholder="0" className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-retention-unit">&nbsp;</label>
                      <select id="src-retention-unit" value={inputs.file.retentionUnit} onChange={(e) => setFile("retentionUnit", e.target.value as PeriodUnit)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white">
                        {PERIOD_ORDER.map((p) => <option key={p} value={p}>{PERIOD_LABELS[p]}</option>)}
                      </select>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 -mt-2">How far ahead to compound Annual Growth % below. Leave at 0 for current storage only.</p>
                </>
              )}

              {inputs.mode === "backup" && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-dailybackup">Daily Backup Size</label>
                      <input ref={firstRef} id="src-dailybackup" type="number" min="0" step="any" inputMode="decimal"
                        value={inputs.backup.dailyBackup || ""} onChange={(e) => setBackup("dailyBackup", parseNum(e.target.value))}
                        placeholder="25" aria-invalid={!!errors.dailyBackup}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.dailyBackup ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-dailyunit">Unit</label>
                      <select id="src-dailyunit" value={inputs.backup.dailyBackupUnit} onChange={(e) => setBackup("dailyBackupUnit", e.target.value as SizeUnit)}
                        className="w-full px-2 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white">
                        {UNIT_ORDER.map((u) => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
                      </select>
                    </div>
                  </div>
                  {errors.dailyBackup && <p className="text-xs text-red-600" role="alert">{errors.dailyBackup}</p>}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="src-backup-retention">Retention Period</label>
                      <input id="src-backup-retention" type="number" min="0" inputMode="numeric"
                        value={inputs.backup.retentionValue || ""} onChange={(e) => setBackup("retentionValue", parseNum(e.target.value))}
                        placeholder="90" aria-invalid={!!errors.retentionValue}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.retentionValue ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">&nbsp;</label>
                      <select value={inputs.backup.retentionUnit} onChange={(e) => setBackup("retentionUnit", e.target.value as PeriodUnit)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white">
                        {PERIOD_ORDER.map((p) => <option key={p} value={p}>{PERIOD_LABELS[p]}</option>)}
                      </select>
                    </div>
                  </div>
                  {errors.retentionValue && <p className="text-xs text-red-600" role="alert">{errors.retentionValue}</p>}
                </>
              )}

              {inputs.mode === "video" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="src-bitrate">Video Bitrate (Mbps)</label>
                    <input ref={firstRef} id="src-bitrate" type="number" min="0" step="any" inputMode="decimal"
                      value={inputs.video.bitrateMbps || ""} onChange={(e) => setVideo("bitrateMbps", parseNum(e.target.value))}
                      placeholder="8" aria-invalid={!!errors.bitrateMbps}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.bitrateMbps ? "border-red-300" : "border-gray-200"}`} />
                    {errors.bitrateMbps ? <p className="text-xs text-red-600 mt-1" role="alert">{errors.bitrateMbps}</p> : <p className="text-[11px] text-gray-400 mt-1">4K video: ~350 MB/min ≈ 47 Mbps</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-hours">Hours Recorded / Day</label>
                      <input id="src-hours" type="number" min="0" max="24" inputMode="numeric"
                        value={inputs.video.hoursPerDay || ""} onChange={(e) => setVideo("hoursPerDay", parseNum(e.target.value))}
                        placeholder="24" aria-invalid={!!errors.hoursPerDay}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.hoursPerDay ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-cameras">Number of Cameras</label>
                      <input id="src-cameras" type="number" min="1" inputMode="numeric"
                        value={inputs.video.cameras || ""} onChange={(e) => setVideo("cameras", parseNum(e.target.value))}
                        placeholder="1" aria-invalid={!!errors.cameras}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.cameras ? "border-red-300" : "border-gray-200"}`} />
                    </div>
                  </div>
                  {(errors.hoursPerDay || errors.cameras) && <p className="text-xs text-red-600" role="alert">{errors.hoursPerDay || errors.cameras}</p>}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="src-videodays">Recording Days</label>
                    <input id="src-videodays" type="number" min="0" inputMode="numeric"
                      value={inputs.video.days || ""} onChange={(e) => setVideo("days", parseNum(e.target.value))}
                      placeholder="30" aria-invalid={!!errors.days}
                      className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.days ? "border-red-300" : "border-gray-200"}`} />
                    {errors.days && <p className="text-xs text-red-600 mt-1" role="alert">{errors.days}</p>}
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="src-growth">Annual Growth <span className="font-mono text-gray-400">{inputs.common.annualGrowth}%</span></label>
                  <input id="src-growth" type="range" min={0} max={500} value={inputs.common.annualGrowth} onChange={(e) => setCommon("annualGrowth", parseInt(e.target.value, 10))} className="w-full accent-primary" />
                </div>
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1" htmlFor="src-safety">Safety Margin <span className="font-mono text-gray-400">{inputs.common.safetyMargin}%</span></label>
                  <input id="src-safety" type="range" min={0} max={100} value={inputs.common.safetyMargin} onChange={(e) => setCommon("safetyMargin", parseInt(e.target.value, 10))} className="w-full accent-primary" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-cost">Cost / GB</label>
                    <input id="src-cost" type="number" min="0" step="0.001" inputMode="decimal"
                      value={inputs.common.costPerGB} onChange={(e) => setCommon("costPerGB", parseNum(e.target.value))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="src-currency">Currency</label>
                    <select id="src-currency" value={inputs.common.currency} onChange={(e) => setCommon("currency", e.target.value as CurrencyKey)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm bg-white">
                      {CURRENCY_ORDER.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>

              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleCopyResult} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? "✓ Copied!" : "Copy Result"}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                  <button onClick={handleDownloadJson} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export JSON</button>
                  <button onClick={handlePrint} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Print</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleShare} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{shareCopied ? "✓ Copied!" : "Share URL"}</button>
                  <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                    {showHistory ? "Hide" : "Show"} History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Final Required Storage</p>
              {result ? (
                <>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-bold font-mono tabular-nums">{formatBytes(result.finalBytes)}</span>
                  </div>
                  <p className="text-primary-100 text-sm mb-4">Estimated Cost: <span className="font-semibold">{symbol}{result.estimatedCost.toFixed(2)}/month</span></p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Recommended</p>
                      <p className="text-sm font-bold">{result.recommendedDisk}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-primary-100 text-xs mb-0.5">Suggested Cloud Plan</p>
                      <p className="text-sm font-bold">{result.suggestedCloudPlan}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button onClick={handleCopyResult} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Result"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Copy Full Report</button>
                      <button onClick={handleSave} className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">Save to History</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">
                  {Object.values(errors).some(Boolean) ? "Fix the errors on the left to calculate" : "Enter your storage details to calculate requirements."}
                </p>
              )}
            </div>

            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Storage Breakdown</h3>
                </div>
                <div className="p-5">
                  <BreakdownDonut segments={result.breakdown} />
                </div>
              </div>
            )}

            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>5-Year Growth Forecast</h3>
                </div>
                <div className="p-5">
                  <GrowthChart forecast={result.forecast} />
                </div>
              </div>
            )}

            {/* Calculation steps */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation Steps</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Raw Storage", value: formatBytes(result.rawBytes) },
                    ...(inputs.mode === "file" ? [
                      { label: "After Growth Projection", value: formatBytes(result.projectedBytes) },
                      { label: "After Compression", value: formatBytes(result.compressedBytes) },
                      { label: "After Backup Copies", value: formatBytes(result.backupBytes) },
                      { label: "After RAID Redundancy", value: formatBytes(result.raidBytes) },
                    ] : []),
                    { label: "Final Required Storage", value: formatBytes(result.finalBytes) },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-5 py-3 flex items-center justify-between">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-mono text-gray-800 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values on the left to see the calculation steps</div>
              )}
            </div>

            {/* History */}
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
                    <div key={entry.id} onClick={() => { setInputs(entry.inputs); setShowHistory(false); }} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{formatBytes(entry.result.finalBytes)}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">{MODE_META[entry.inputs.mode]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <StorageRequirementCalculatorSEO />

      <RelatedTools />
    </>
  );
}
