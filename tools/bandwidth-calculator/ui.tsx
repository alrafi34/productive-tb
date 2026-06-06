"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calcTransferTime,
  calcWebsiteBandwidth,
  calcStreamingUsage,
  calcMultiUserBandwidth,
  STREAMING_RATES,
  formatNumber,
  debounce,
  saveHistory,
  getHistory,
  clearHistory,
  type TransferResult,
  type WebsiteResult,
  type StreamingResult,
  type MultiUserResult,
  type HistoryEntry,
} from "./logic";
import BandwidthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = "transfer" | "website" | "streaming" | "multiuser";

const MODES: { id: Mode; label: string }[] = [
  { id: "transfer", label: "Transfer Time" },
  { id: "website", label: "Website Traffic" },
  { id: "streaming", label: "Streaming Usage" },
  { id: "multiuser", label: "Multi-User" },
];

export default function BandwidthCalculatorUI() {
  const [mode, setMode] = useState<Mode>("transfer");

  // Mode 1: Transfer
  const [fileSize, setFileSize] = useState("1");
  const [fileSizeUnit, setFileSizeUnit] = useState("GB");
  const [speed, setSpeed] = useState("100");
  const [speedUnit, setSpeedUnit] = useState("Mbps");
  const [transferResult, setTransferResult] = useState<TransferResult | null>(null);

  // Mode 2: Website
  const [visitors, setVisitors] = useState("10000");
  const [pageSizeMB, setPageSizeMB] = useState("5");
  const [pagesPerVisitor, setPagesPerVisitor] = useState("3");
  const [growth, setGrowth] = useState("0");
  const [websiteResult, setWebsiteResult] = useState<WebsiteResult | null>(null);

  // Mode 3: Streaming
  const [quality, setQuality] = useState("1080p");
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [daysPerMonth, setDaysPerMonth] = useState("30");
  const [streamingResult, setStreamingResult] = useState<StreamingResult | null>(null);

  // Mode 4: Multi-user
  const [users, setUsers] = useState("500");
  const [mbpsPerUser, setMbpsPerUser] = useState("2");
  const [peakPct, setPeakPct] = useState("80");
  const [multiResult, setMultiResult] = useState<MultiUserResult | null>(null);

  // UI state
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // ── Calculations ────────────────────────────────────────────────────────────

  const runTransfer = useCallback(
    debounce(() => {
      setTransferResult(calcTransferTime(parseFloat(fileSize), fileSizeUnit, parseFloat(speed), speedUnit));
    }, 150),
    [fileSize, fileSizeUnit, speed, speedUnit]
  );

  const runWebsite = useCallback(
    debounce(() => {
      setWebsiteResult(calcWebsiteBandwidth(parseFloat(visitors), parseFloat(pageSizeMB), parseFloat(pagesPerVisitor), parseFloat(growth) || 0));
    }, 150),
    [visitors, pageSizeMB, pagesPerVisitor, growth]
  );

  const runStreaming = useCallback(
    debounce(() => {
      setStreamingResult(calcStreamingUsage(quality, parseFloat(hoursPerDay), parseFloat(daysPerMonth)));
    }, 150),
    [quality, hoursPerDay, daysPerMonth]
  );

  const runMultiUser = useCallback(
    debounce(() => {
      setMultiResult(calcMultiUserBandwidth(parseFloat(users), parseFloat(mbpsPerUser), parseFloat(peakPct)));
    }, 150),
    [users, mbpsPerUser, peakPct]
  );

  useEffect(() => { runTransfer(); }, [fileSize, fileSizeUnit, speed, speedUnit]);
  useEffect(() => { runWebsite(); }, [visitors, pageSizeMB, pagesPerVisitor, growth]);
  useEffect(() => { runStreaming(); }, [quality, hoursPerDay, daysPerMonth]);
  useEffect(() => { runMultiUser(); }, [users, mbpsPerUser, peakPct]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const activeResult = () => {
    if (mode === "transfer") return transferResult;
    if (mode === "website") return websiteResult;
    if (mode === "streaming") return streamingResult;
    return multiResult;
  };

  const buildCopyText = (): string => {
    if (mode === "transfer" && transferResult) {
      return [
        `Bandwidth Calculator – Transfer Time`,
        `File Size: ${fileSize} ${fileSizeUnit}`,
        `Speed: ${speed} ${speedUnit}`,
        `Transfer Time: ${transferResult.formatted}`,
      ].join("\n");
    }
    if (mode === "website" && websiteResult) {
      return [
        `Bandwidth Calculator – Website Traffic`,
        `Monthly Visitors: ${formatNumber(parseFloat(visitors), 0)}`,
        `Page Size: ${pageSizeMB} MB`,
        `Pages/Visitor: ${pagesPerVisitor}`,
        `Growth: ${growth}%`,
        `Monthly Bandwidth: ${websiteResult.formatted}`,
        `Peak Bandwidth: ${formatNumber(websiteResult.peakMbps)} Mbps`,
      ].join("\n");
    }
    if (mode === "streaming" && streamingResult) {
      return [
        `Bandwidth Calculator – Streaming Usage`,
        `Quality: ${quality}`,
        `Hours/Day: ${hoursPerDay}`,
        `Days/Month: ${daysPerMonth}`,
        `Monthly Usage: ${streamingResult.formatted}`,
        `Required Speed: ${formatNumber(streamingResult.requiredMbps)} Mbps`,
      ].join("\n");
    }
    if (mode === "multiuser" && multiResult) {
      return [
        `Bandwidth Calculator – Multi-User`,
        `Concurrent Users: ${users}`,
        `Speed/User: ${mbpsPerUser} Mbps`,
        `Peak Usage: ${peakPct}%`,
        `Total Required: ${formatNumber(multiResult.totalMbps)} Mbps`,
        `Peak Required: ${formatNumber(multiResult.peakMbps)} Mbps`,
        `Recommended Plan: ${multiResult.recommendedPlan}`,
      ].join("\n");
    }
    return "";
  };

  const handleCopy = () => {
    const text = buildCopyText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    const r = activeResult();
    if (!r) return;
    const blob = new Blob([JSON.stringify({ mode, ...r }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bandwidth-calculation.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleExportTxt = () => {
    const text = buildCopyText();
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bandwidth-calculation.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    const r = activeResult();
    if (!r) return;
    const modeLabel = MODES.find((m) => m.id === mode)?.label ?? mode;
    let label = "";
    let result = "";
    if (mode === "transfer" && transferResult) { label = `${fileSize} ${fileSizeUnit} @ ${speed} ${speedUnit}`; result = transferResult.formatted; }
    if (mode === "website" && websiteResult) { label = `${formatNumber(parseFloat(visitors), 0)} visitors`; result = websiteResult.formatted; }
    if (mode === "streaming" && streamingResult) { label = `${quality} × ${hoursPerDay}h/day`; result = streamingResult.formatted; }
    if (mode === "multiuser" && multiResult) { label = `${users} users × ${mbpsPerUser} Mbps`; result = `${formatNumber(multiResult.peakMbps)} Mbps peak`; }
    saveHistory({ mode: modeLabel, label, result });
    setHistory(getHistory());
  };

  const handleReset = () => {
    if (mode === "transfer") { setFileSize("1"); setFileSizeUnit("GB"); setSpeed("100"); setSpeedUnit("Mbps"); }
    if (mode === "website") { setVisitors("10000"); setPageSizeMB("5"); setPagesPerVisitor("3"); setGrowth("0"); }
    if (mode === "streaming") { setQuality("1080p"); setHoursPerDay("4"); setDaysPerMonth("30"); }
    if (mode === "multiuser") { setUsers("500"); setMbpsPerUser("2"); setPeakPct("80"); }
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  // ── Number input helper ──────────────────────────────────────────────────────
  const numInput = (value: string, setter: (v: string) => void, placeholder: string, label: string, min = "0") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        aria-label={label}
      />
    </div>
  );

  const selectInput = (value: string, setter: (v: string) => void, options: string[], label: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
        aria-label={label}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  // ── Summary card rows per mode ───────────────────────────────────────────────

  const summaryRows = (): { label: string; value: string; mono?: boolean }[] => {
    if (mode === "transfer" && transferResult) {
      return [
        { label: "Transfer Time", value: transferResult.formatted, mono: true },
        { label: "File Size", value: `${formatNumber(transferResult.fileSizeGB, 3)} GB` },
        { label: "Speed", value: `${formatNumber(transferResult.speedMbps)} Mbps` },
      ];
    }
    if (mode === "website" && websiteResult) {
      return [
        { label: "Monthly Bandwidth", value: websiteResult.formatted, mono: true },
        { label: "Monthly GB", value: `${formatNumber(websiteResult.monthlyGB)} GB` },
        { label: "Peak Bandwidth", value: `${formatNumber(websiteResult.peakMbps)} Mbps` },
      ];
    }
    if (mode === "streaming" && streamingResult) {
      return [
        { label: "Monthly Usage", value: streamingResult.formatted, mono: true },
        { label: "Daily Usage", value: `${formatNumber(streamingResult.dailyGB)} GB/day` },
        { label: "Min. Speed Needed", value: `${formatNumber(streamingResult.requiredMbps)} Mbps` },
      ];
    }
    if (mode === "multiuser" && multiResult) {
      return [
        { label: "Total Required", value: `${formatNumber(multiResult.totalMbps)} Mbps`, mono: true },
        { label: "Peak Required", value: `${formatNumber(multiResult.peakMbps)} Mbps` },
        { label: "Recommended Plan", value: multiResult.recommendedPlan },
      ];
    }
    return [];
  };

  const fullResultRows = (): { label: string; value: string; mono?: boolean }[] => {
    if (mode === "transfer" && transferResult) {
      return [
        { label: "Transfer Time", value: transferResult.formatted, mono: true },
        { label: "File Size", value: `${formatNumber(transferResult.fileSizeGB, 3)} GB` },
        { label: "Speed", value: `${formatNumber(transferResult.speedMbps)} Mbps` },
        { label: "File Size (bits)", value: `${formatNumber(transferResult.fileSizeGB * 8 * 1024 ** 3 / 1_000_000, 0)} Mb` },
      ];
    }
    if (mode === "website" && websiteResult) {
      return [
        { label: "Monthly Bandwidth", value: websiteResult.formatted, mono: true },
        { label: "Monthly (GB)", value: `${formatNumber(websiteResult.monthlyGB)} GB` },
        { label: "Monthly (TB)", value: `${formatNumber(websiteResult.monthlyTB, 4)} TB` },
        { label: "Peak Bandwidth", value: `${formatNumber(websiteResult.peakMbps)} Mbps` },
      ];
    }
    if (mode === "streaming" && streamingResult) {
      return [
        { label: "Monthly Usage", value: streamingResult.formatted, mono: true },
        { label: "Hourly Rate", value: `${streamingResult.hourlyGB} GB/hour` },
        { label: "Daily Usage", value: `${formatNumber(streamingResult.dailyGB)} GB/day` },
        { label: "Min. Speed Needed", value: `${formatNumber(streamingResult.requiredMbps)} Mbps` },
      ];
    }
    if (mode === "multiuser" && multiResult) {
      return [
        { label: "Total Required", value: `${formatNumber(multiResult.totalMbps)} Mbps`, mono: true },
        { label: "Total (Gbps)", value: `${formatNumber(multiResult.totalGbps, 3)} Gbps` },
        { label: "Peak Required", value: `${formatNumber(multiResult.peakMbps)} Mbps` },
        { label: "Peak (Gbps)", value: `${formatNumber(multiResult.peakGbps, 3)} Gbps` },
        { label: "Recommended Plan", value: multiResult.recommendedPlan },
      ];
    }
    return [];
  };

  const hasResult = !!activeResult();
  const rows = summaryRows();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">📡</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Bandwidth Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Estimate file transfer time, monthly website traffic, streaming data usage, or multi-user bandwidth requirements. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex flex-wrap gap-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m.id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs */}
          <div className="lg:col-span-4 space-y-5">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {MODES.find((m) => m.id === mode)?.label} Inputs
              </h3>

              {/* Mode 1: Transfer Time */}
              {mode === "transfer" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">File Size</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={fileSize}
                        min="0"
                        onChange={(e) => setFileSize(e.target.value)}
                        placeholder="1"
                        className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        aria-label="File Size"
                      />
                      <select
                        value={fileSizeUnit}
                        onChange={(e) => setFileSizeUnit(e.target.value)}
                        className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                        aria-label="File Size Unit"
                      >
                        {["KB", "MB", "GB", "TB"].map((u) => <option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Internet Speed</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={speed}
                        min="0"
                        onChange={(e) => setSpeed(e.target.value)}
                        placeholder="100"
                        className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        aria-label="Internet Speed"
                      />
                      <select
                        value={speedUnit}
                        onChange={(e) => setSpeedUnit(e.target.value)}
                        className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                        aria-label="Speed Unit"
                      >
                        {["Kbps", "Mbps", "Gbps"].map((u) => <option key={u}>{u}</option>)}
                      </select>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">100 Mbps is typical home broadband.</p>
                  </div>
                </>
              )}

              {/* Mode 2: Website */}
              {mode === "website" && (
                <>
                  {numInput(visitors, setVisitors, "10000", "Monthly Visitors", "1")}
                  {numInput(pageSizeMB, setPageSizeMB, "5", "Avg. Page Size (MB)", "0.1")}
                  {numInput(pagesPerVisitor, setPagesPerVisitor, "3", "Pages per Visitor", "1")}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Monthly Growth: <span className="text-primary font-mono">{growth}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={200}
                      value={growth}
                      onChange={(e) => setGrowth(e.target.value)}
                      className="w-full accent-primary"
                      aria-label="Monthly Growth"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>0%</span><span>100%</span><span>200%</span>
                    </div>
                  </div>
                </>
              )}

              {/* Mode 3: Streaming */}
              {mode === "streaming" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Streaming Quality</label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      aria-label="Streaming Quality"
                    >
                      {Object.keys(STREAMING_RATES).map((q) => (
                        <option key={q} value={q}>{q} (~{STREAMING_RATES[q]} GB/hr)</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">4K streaming consumes ~10 GB/hour.</p>
                  </div>
                  {numInput(hoursPerDay, setHoursPerDay, "4", "Hours per Day", "0")}
                  {numInput(daysPerMonth, setDaysPerMonth, "30", "Days per Month", "1")}
                </>
              )}

              {/* Mode 4: Multi-User */}
              {mode === "multiuser" && (
                <>
                  {numInput(users, setUsers, "500", "Concurrent Users", "1")}
                  {numInput(mbpsPerUser, setMbpsPerUser, "2", "Avg. Speed per User (Mbps)", "0.1")}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Peak Usage: <span className="text-primary font-mono">{peakPct}%</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={peakPct}
                      onChange={(e) => setPeakPct(e.target.value)}
                      className="w-full accent-primary"
                      aria-label="Peak Usage Percentage"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>10%</span><span>50%</span><span>100%</span>
                    </div>
                  </div>
                </>
              )}

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
                    disabled={!hasResult}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Export TXT
                  </button>
                  <button
                    onClick={handleExportJson}
                    disabled={!hasResult}
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
                {MODES.find((m) => m.id === mode)?.label} Summary
              </p>
              {hasResult && rows.length > 0 ? (
                <>
                  <div className="text-xl font-bold font-mono mb-3 break-all">
                    {rows[0].value}
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    {rows.slice(1).map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-primary-100">{label}</span>
                        <span className="font-semibold font-mono text-xs">{value}</span>
                      </div>
                    ))}
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
                <div className="text-primary-100 text-sm">Enter values above to calculate</div>
              )}
            </div>

          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-5">

            {/* Quick Presets per mode */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {mode === "transfer" && [
                  { label: "1 GB @ 100 Mbps", fs: "1", fsu: "GB", sp: "100", spu: "Mbps" },
                  { label: "10 GB @ 1 Gbps", fs: "10", fsu: "GB", sp: "1", spu: "Gbps" },
                  { label: "100 MB @ 10 Mbps", fs: "100", fsu: "MB", sp: "10", spu: "Mbps" },
                  { label: "1 TB @ 100 Mbps", fs: "1", fsu: "TB", sp: "100", spu: "Mbps" },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => { setFileSize(p.fs); setFileSizeUnit(p.fsu); setSpeed(p.sp); setSpeedUnit(p.spu); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      fileSize === p.fs && fileSizeUnit === p.fsu && speed === p.sp && speedUnit === p.spu
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
                {mode === "website" && [
                  { label: "10K visitors", v: "10000", ps: "5", pp: "3", g: "0" },
                  { label: "100K visitors", v: "100000", ps: "3", pp: "5", g: "20" },
                  { label: "1M visitors", v: "1000000", ps: "2", pp: "4", g: "10" },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => { setVisitors(p.v); setPageSizeMB(p.ps); setPagesPerVisitor(p.pp); setGrowth(p.g); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      visitors === p.v
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
                {mode === "streaming" && Object.keys(STREAMING_RATES).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      quality === q
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {q}
                  </button>
                ))}
                {mode === "multiuser" && [
                  { label: "50 users @ 5 Mbps", u: "50", m: "5", p: "80" },
                  { label: "500 users @ 2 Mbps", u: "500", m: "2", p: "80" },
                  { label: "1000 users @ 1 Mbps", u: "1000", m: "1", p: "70" },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => { setUsers(p.u); setMbpsPerUser(p.m); setPeakPct(p.p); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      users === p.u && mbpsPerUser === p.m
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Results Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Results
                </h3>
              </div>
              {hasResult ? (
                <div className="divide-y divide-gray-50">
                  {fullResultRows().map(({ label, value, mono }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  Enter values to see results
                </div>
              )}
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
                          <span className="text-xs font-semibold text-primary">{entry.mode}</span>
                          <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-800">{entry.label}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{entry.result}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <BandwidthCalculatorSEO />

      <RelatedTools
        currentTool="bandwidth-calculator"
        tools={[
          "cidr-calculator",
          "subnet-calculator",
          "ip-range-calculator",
          "download-time-calculator",
          "data-transfer-calculator",
          "latency-calculator",
        ]}
      />
    </>
  );
}
