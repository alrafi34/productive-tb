"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  CalcMode,
  DistanceUnit,
  BandwidthUnit,
  PacketUnit,
  Medium,
  LatencyInputs,
  HistoryEntry,
} from "./types";
import {
  calculateLatency,
  validateInputs,
  formatMs,
  formatNumber,
  MEDIUM_LABELS,
  MODE_LABELS,
  REGION_PRESETS,
  CLOUD_PRESETS,
  BANDWIDTH_PRESETS,
  saveHistory,
  getHistory,
  clearHistory,
  buildExportText,
  downloadFile,
  debounce,
} from "./logic";
import LatencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const MODES: { id: CalcMode; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "propagation", label: "Propagation" },
  { id: "transmission", label: "Transmission" },
  { id: "rtt", label: "RTT" },
  { id: "gaming", label: "Gaming Ping" },
  { id: "advanced", label: "Advanced" },
];

const TIER_COLORS: Record<string, string> = {
  excellent: "text-green-700 bg-green-50 border-green-200",
  good: "text-blue-700 bg-blue-50 border-blue-200",
  moderate: "text-yellow-700 bg-yellow-50 border-yellow-200",
  poor: "text-orange-700 bg-orange-50 border-orange-200",
  "very-high": "text-red-700 bg-red-50 border-red-200",
};

export default function LatencyCalculatorUI() {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<CalcMode>("basic");
  const [distance, setDistance] = useState("5000");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [medium, setMedium] = useState<Medium>("fiber");
  const [bandwidth, setBandwidth] = useState("100");
  const [bandwidthUnit, setBandwidthUnit] = useState<BandwidthUnit>("Mbps");
  const [packetSize, setPacketSize] = useState("1500");
  const [packetUnit, setPacketUnit] = useState<PacketUnit>("bytes");
  const [routingOverhead, setRoutingOverhead] = useState(20);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [result, setResult] = useState<ReturnType<typeof calculateLatency>>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const distRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    distRef.current?.focus();
  }, []);

  // ── Calculation ────────────────────────────────────────────────────────────
  const buildInputs = useCallback(
    (): LatencyInputs => ({
      mode,
      distance: parseFloat(distance) || 0,
      distanceUnit,
      medium,
      bandwidth: parseFloat(bandwidth) || 0,
      bandwidthUnit,
      packetSize: parseFloat(packetSize) || 0,
      packetUnit,
      routingOverhead,
    }),
    [mode, distance, distanceUnit, medium, bandwidth, bandwidthUnit, packetSize, packetUnit, routingOverhead]
  );

  const run = useCallback(
    debounce(() => {
      const inputs = buildInputs();
      const validErr = validateInputs(inputs);
      if (validErr) { setError(validErr); setResult(null); return; }
      setError(null);
      setResult(calculateLatency(inputs));
    }, 100),
    [buildInputs]
  );

  useEffect(() => { run(); }, [distance, distanceUnit, medium, bandwidth, bandwidthUnit, packetSize, packetUnit, routingOverhead, run]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleReset = () => {
    setMode("basic");
    setDistance("5000");
    setDistanceUnit("km");
    setMedium("fiber");
    setBandwidth("100");
    setBandwidthUnit("Mbps");
    setPacketSize("1500");
    setPacketUnit("bytes");
    setRoutingOverhead(20);
    setResult(null);
    setError(null);
    distRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = buildExportText(buildInputs(), result);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(buildExportText(buildInputs(), result), "latency-calculation.txt");
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(buildInputs(), result);
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const applyRegionPreset = (p: typeof REGION_PRESETS[0]) => {
    setDistance(String(p.distance));
    setDistanceUnit(p.distanceUnit);
    setMedium(p.medium);
  };

  const applyBandwidthPreset = (p: typeof BANDWIDTH_PRESETS[0]) => {
    setBandwidth(String(p.bandwidth));
    setBandwidthUnit(p.bandwidthUnit);
  };

  // ── Show mode-specific result rows ─────────────────────────────────────────
  const resultRows = result
    ? [
        ...(["basic", "advanced", "propagation"].includes(mode)
          ? [{ label: "Propagation Delay", value: formatMs(result.propagationMs), mono: true }]
          : []),
        ...(["basic", "advanced", "transmission"].includes(mode)
          ? [{ label: "Transmission Delay", value: formatMs(result.transmissionMs), mono: true }]
          : []),
        ...(["basic", "advanced"].includes(mode)
          ? [{ label: "Routing Overhead", value: formatMs(result.routingMs), mono: true }]
          : []),
        ...(["basic", "advanced", "rtt", "gaming"].includes(mode)
          ? [{ label: "Total One-Way", value: formatMs(result.totalMs), mono: true }]
          : []),
        ...(["basic", "advanced", "rtt"].includes(mode)
          ? [{ label: "Round Trip Time (RTT)", value: formatMs(result.rttMs), mono: true }]
          : []),
        ...(["gaming", "basic", "advanced"].includes(mode)
          ? [{ label: "Est. Gaming Ping", value: `${result.gamingPingMin}–${result.gamingPingMax} ms`, mono: true }]
          : []),
        { label: "Performance Rating", value: result.tierLabel, mono: false },
      ]
    : [];

  const tierColor = result ? TIER_COLORS[result.tier] : "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">⏱️</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Latency Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Estimate propagation delay, transmission delay, RTT, and gaming ping based on distance, medium, and bandwidth.
              All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex flex-wrap gap-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 min-w-[90px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Inputs + Summary */}
          <div className="lg:col-span-4 space-y-5">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Network Parameters
              </h3>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Distance</label>
                <div className="flex gap-2">
                  <input
                    ref={distRef}
                    type="number"
                    value={distance}
                    min="0"
                    step="any"
                    onChange={(e) => setDistance(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && handleReset()}
                    placeholder="5000"
                    className={`flex-1 px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                    aria-label="Distance"
                  />
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
                    className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Distance Unit"
                  >
                    <option value="km">km</option>
                    <option value="mi">miles</option>
                  </select>
                </div>
              </div>

              {/* Transmission Medium */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Transmission Medium</label>
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value as Medium)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Transmission Medium"
                >
                  <option value="fiber">Fiber Optic (~200,000 km/s)</option>
                  <option value="copper">Copper Cable (~180,000 km/s)</option>
                  <option value="satellite">Satellite (~120,000 km/s eff.)</option>
                  <option value="wireless">Wireless / WiFi (~160,000 km/s)</option>
                  <option value="cellular">Cellular 4G/5G (~140,000 km/s)</option>
                </select>
              </div>

              {/* Bandwidth — shown in all modes except propagation */}
              {mode !== "propagation" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bandwidth</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bandwidth}
                      min="0"
                      step="any"
                      onChange={(e) => setBandwidth(e.target.value)}
                      placeholder="100"
                      className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      aria-label="Bandwidth"
                    />
                    <select
                      value={bandwidthUnit}
                      onChange={(e) => setBandwidthUnit(e.target.value as BandwidthUnit)}
                      className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      aria-label="Bandwidth Unit"
                    >
                      <option value="Mbps">Mbps</option>
                      <option value="Gbps">Gbps</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Packet Size — shown in transmission and advanced modes */}
              {(mode === "transmission" || mode === "advanced" || mode === "basic") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Packet Size</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={packetSize}
                      min="0"
                      step="any"
                      onChange={(e) => setPacketSize(e.target.value)}
                      placeholder="1500"
                      className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      aria-label="Packet Size"
                    />
                    <select
                      value={packetUnit}
                      onChange={(e) => setPacketUnit(e.target.value as PacketUnit)}
                      className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                      aria-label="Packet Size Unit"
                    >
                      <option value="bytes">bytes</option>
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Standard Ethernet MTU = 1500 bytes</p>
                </div>
              )}

              {/* Routing Overhead — shown in basic, advanced, gaming */}
              {(mode === "basic" || mode === "advanced" || mode === "gaming" || mode === "rtt") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Routing Overhead:{" "}
                    <span className="font-mono text-primary">{routingOverhead}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={routingOverhead}
                    onChange={(e) => setRoutingOverhead(parseInt(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Routing Overhead Percentage"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>0% (ideal)</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Simulates router hops, congestion, and protocol overhead.</p>
                </div>
              )}

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
                {MODE_LABELS[mode]}
              </p>
              {result ? (
                <>
                  <div className="text-2xl font-bold font-mono mb-1 break-all leading-snug">
                    {formatMs(result.totalMs)}
                  </div>
                  <div className="text-sm text-primary-100 mb-3">
                    One-way · RTT: {formatMs(result.rttMs)} · {result.tierLabel}
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Propagation</span>
                      <span className="font-semibold font-mono text-xs">{formatMs(result.propagationMs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Transmission</span>
                      <span className="font-semibold font-mono text-xs">{formatMs(result.transmissionMs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Routing</span>
                      <span className="font-semibold font-mono text-xs">{formatMs(result.routingMs)}</span>
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
                <div className="text-primary-100 text-sm">Enter parameters above to calculate</div>
              )}
            </div>

          </div>

          {/* Right: Presets + Results + Steps + History */}
          <div className="lg:col-span-8 space-y-5">

            {/* Region Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Region Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {REGION_PRESETS.map((p) => {
                  const active = distance === String(p.distance) && distanceUnit === p.distanceUnit && medium === p.medium;
                  return (
                    <button
                      key={p.label}
                      onClick={() => applyRegionPreset(p)}
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

            {/* Cloud Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Cloud Provider Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {CLOUD_PRESETS.map((p) => {
                  const active = distance === String(p.distance);
                  return (
                    <button
                      key={p.label}
                      onClick={() => applyRegionPreset(p)}
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

            {/* Bandwidth Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Bandwidth Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {BANDWIDTH_PRESETS.map((p) => {
                  const active = bandwidth === String(p.bandwidth) && bandwidthUnit === p.bandwidthUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => applyBandwidthPreset(p)}
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
                  {resultRows.map(({ label, value, mono }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {error ?? "Enter parameters to see results"}
                </div>
              )}
            </div>

            {/* Performance Rating Badge */}
            {result && (
              <div className={`rounded-xl border p-4 ${tierColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">
                    {result.tier === "excellent" && "⚡"}
                    {result.tier === "good" && "✅"}
                    {result.tier === "moderate" && "⏳"}
                    {result.tier === "poor" && "⚠️"}
                    {result.tier === "very-high" && "🔴"}
                    {" "}{result.tierLabel} Latency
                  </span>
                </div>
                <p className="text-xs leading-relaxed">{result.explanation}</p>
              </div>
            )}

            {/* Latency Breakdown — visual bar */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3
                  className="text-sm font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Latency Breakdown
                </h3>
                {(() => {
                  const total = result.propagationMs + result.transmissionMs + result.routingMs;
                  const bars = [
                    { label: "Propagation", ms: result.propagationMs, color: "bg-primary" },
                    { label: "Transmission", ms: result.transmissionMs, color: "bg-blue-400" },
                    { label: "Routing", ms: result.routingMs, color: "bg-orange-400" },
                  ];
                  return (
                    <div className="space-y-3">
                      {bars.map(({ label, ms, color }) => {
                        const pct = total > 0 ? (ms / total) * 100 : 0;
                        return (
                          <div key={label}>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{label}</span>
                              <span className="font-mono font-semibold">{formatMs(ms)} ({formatNumber(pct, 1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className={`${color} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${Math.max(pct, 0.5)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Gaming Ping Panel — only in gaming or advanced mode */}
            {result && (mode === "gaming" || mode === "advanced" || mode === "basic") && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3
                  className="text-sm font-semibold text-gray-800 mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Gaming Ping Estimate
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Min</div>
                    <div className="text-lg font-bold text-green-900 font-mono">{result.gamingPingMin} ms</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Estimate</div>
                    <div className="text-lg font-bold text-blue-900 font-mono">
                      {Math.round((result.gamingPingMin + result.gamingPingMax) / 2)} ms
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Max</div>
                    <div className="text-lg font-bold text-orange-900 font-mono">{result.gamingPingMax} ms</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Typical gaming ping is 20–80 ms for a good experience. Values above 150 ms are noticeable in fast-paced games.
                </p>
              </div>
            )}

            {/* Calculation Steps */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="w-full p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3
                    className="font-semibold text-gray-800 text-sm"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Calculation Steps
                  </h3>
                  <span className="text-xs text-gray-500">{showSteps ? "▲ Hide" : "▼ Show"}</span>
                </button>
                {showSteps && (
                  <div className="p-5">
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs space-y-0.5 overflow-x-auto">
                      {result.steps.map((step, i) => (
                        <div key={i} className={step === "" ? "h-2" : "text-gray-700 whitespace-pre"}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => {
                          setDistance(String(entry.inputs.distance));
                          setDistanceUnit(entry.inputs.distanceUnit);
                          setMedium(entry.inputs.medium);
                          setBandwidth(String(entry.inputs.bandwidth));
                          setBandwidthUnit(entry.inputs.bandwidthUnit);
                          setPacketSize(String(entry.inputs.packetSize));
                          setPacketUnit(entry.inputs.packetUnit);
                          setRoutingOverhead(entry.inputs.routingOverhead);
                          setMode(entry.inputs.mode);
                          setShowHistory(false);
                        }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {entry.inputs.distance} {entry.inputs.distanceUnit} · {MEDIUM_LABELS[entry.inputs.medium]}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-primary font-mono font-semibold">
                          {formatMs(entry.result.totalMs)} one-way · RTT {formatMs(entry.result.rttMs)}
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

      <LatencyCalculatorSEO />

      <RelatedTools
        currentTool="latency-calculator"
        tools={[
          "download-time-calculator",
          "data-transfer-calculator",
          "bandwidth-calculator",
          "subnet-calculator",
          "cidr-calculator",
          "ip-range-calculator",
        ]}
      />
    </>
  );
}
