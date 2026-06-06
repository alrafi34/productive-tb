"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  calculate,
  isValidIp,
  cidrFromMask,
  debounce,
  formatNumber,
  saveHistory,
  getHistory,
  clearHistory,
  subnetMaskFromCidr,
  intToIp,
  type IpRangeResult,
  type HistoryEntry,
} from "./logic";
import IpRangeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "192.168.1.0/24", ip: "192.168.1.10", cidr: 24 },
  { label: "10.0.0.0/8", ip: "10.0.0.50", cidr: 8 },
  { label: "172.16.0.0/16", ip: "172.16.10.33", cidr: 16 },
  { label: "192.168.1.0/26", ip: "192.168.1.65", cidr: 26 },
  { label: "10.10.0.0/30", ip: "10.10.0.1", cidr: 30 },
];

export default function IpRangeCalculatorUI() {
  return (
    <Suspense>
      <IpRangeCalculatorInner />
    </Suspense>
  );
}

function IpRangeCalculatorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initIp = searchParams.get("ip") || "192.168.1.10";
  const initCidr = parseInt(searchParams.get("cidr") || "24", 10);

  const [ip, setIp] = useState(initIp);
  const [cidr, setCidr] = useState(isNaN(initCidr) ? 24 : Math.min(32, Math.max(0, initCidr)));
  const [maskInput, setMaskInput] = useState(intToIp(subnetMaskFromCidr(isNaN(initCidr) ? 24 : Math.min(32, Math.max(0, initCidr)))));
  const [result, setResult] = useState<IpRangeResult | null>(null);
  const [ipError, setIpError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showBinary, setShowBinary] = useState(false);
  const ipRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    ipRef.current?.focus();
  }, []);

  // Sync mask display when cidr changes
  useEffect(() => {
    setMaskInput(intToIp(subnetMaskFromCidr(cidr)));
  }, [cidr]);

  const run = useCallback(
    debounce((ipVal: string, cidrVal: number) => {
      if (!isValidIp(ipVal)) {
        setIpError("Please enter a valid IPv4 address (e.g. 192.168.1.1)");
        setResult(null);
        return;
      }
      setIpError(null);
      setResult(calculate(ipVal, cidrVal));
    }, 120),
    []
  );

  useEffect(() => {
    run(ip, cidr);
  }, [ip, cidr, run]);

  // Update shareable URL
  useEffect(() => {
    if (!isValidIp(ip)) return;
    const params = new URLSearchParams({ ip, cidr: String(cidr) });
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [ip, cidr]);

  const handleMaskInput = (val: string) => {
    setMaskInput(val);
    const parsed = cidrFromMask(val);
    if (parsed !== null) setCidr(parsed);
  };

  const handlePreset = (p: (typeof PRESETS)[0]) => {
    setIp(p.ip);
    setCidr(p.cidr);
    ipRef.current?.focus();
  };

  const handleReset = () => {
    setIp("192.168.1.10");
    setCidr(24);
    setResult(null);
    setIpError(null);
    ipRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = [
      `IP Address: ${result.ip}/${result.cidr}`,
      `Network Address: ${result.networkAddress}`,
      `Broadcast Address: ${result.broadcastAddress}`,
      `Host Range: ${result.firstHost} - ${result.lastHost}`,
      `Subnet Mask: ${result.subnetMask}`,
      `Wildcard Mask: ${result.wildcardMask}`,
      `CIDR: /${result.cidr}`,
      `Total Hosts: ${formatNumber(result.totalHosts)}`,
      `Usable Hosts: ${formatNumber(result.usableHosts)}`,
      `IP Class: ${result.ipClass}`,
      `Network Type: ${result.ipType}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify({ ip: result.ip, cidr: `/${result.cidr}`, subnetMask: result.subnetMask, wildcardMask: result.wildcardMask, networkAddress: result.networkAddress, broadcastAddress: result.broadcastAddress, firstHost: result.firstHost, lastHost: result.lastHost, totalHosts: result.totalHosts, usableHosts: result.usableHosts, ipClass: result.ipClass, networkType: result.ipType }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ip-range_${result.ip}_${result.cidr}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleExportTxt = () => {
    if (!result) return;
    const text = [
      `IP Range Calculator Result`,
      `==========================`,
      `IP Address:       ${result.ip}/${result.cidr}`,
      `Network Address:  ${result.networkAddress}`,
      `Broadcast:        ${result.broadcastAddress}`,
      `Host Range:       ${result.firstHost} - ${result.lastHost}`,
      `Subnet Mask:      ${result.subnetMask}`,
      `Wildcard Mask:    ${result.wildcardMask}`,
      `Total Hosts:      ${formatNumber(result.totalHosts)}`,
      `Usable Hosts:     ${formatNumber(result.usableHosts)}`,
      `IP Class:         ${result.ipClass}`,
      `Network Type:     ${result.ipType}`,
      ``,
      `Binary`,
      `------`,
      `IP:      ${result.binaryIp}`,
      `Mask:    ${result.binaryMask}`,
      `Network: ${result.binaryNetwork}`,
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ip-range_${result.ip}_${result.cidr}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ ip, cidr, result });
    setHistory(getHistory());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const RESULT_ROWS = result
    ? [
        { label: "Network Address", value: result.networkAddress, mono: true },
        { label: "Broadcast Address", value: result.broadcastAddress, mono: true },
        { label: "Subnet Mask", value: result.subnetMask, mono: true },
        { label: "Wildcard Mask", value: result.wildcardMask, mono: true },
        { label: "First Host", value: result.firstHost, mono: true },
        { label: "Last Host", value: result.lastHost, mono: true },
        { label: "Total Hosts", value: formatNumber(result.totalHosts), mono: false },
        { label: "Usable Hosts", value: formatNumber(result.usableHosts), mono: false },
        { label: "IP Class", value: result.ipClass, mono: false },
        { label: "Network Type", value: result.ipType, mono: false },
      ]
    : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🌐</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              IPv4 IP Range Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter an IPv4 address and CIDR prefix to instantly calculate the full IP range, usable hosts, and network details. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: Controls */}
          <div className="lg:col-span-4 space-y-5">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Network Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  IPv4 Address
                </label>
                <input
                  ref={ipRef}
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value.replace(/[^0-9.]/g, ""))}
                  onKeyDown={(e) => e.key === "Escape" && handleReset()}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm ${
                    ipError ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="192.168.1.10"
                  aria-label="IPv4 Address"
                />
                {ipError && <p className="text-xs text-red-600 mt-1">{ipError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  CIDR Prefix: <span className="font-mono text-primary">/{cidr}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={32}
                  value={cidr}
                  onChange={(e) => setCidr(parseInt(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="CIDR Prefix"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>/0</span>
                  <span>/16</span>
                  <span>/32</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subnet Mask
                </label>
                <input
                  type="text"
                  value={maskInput}
                  onChange={(e) => handleMaskInput(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                  placeholder="255.255.255.0"
                  aria-label="Subnet Mask"
                />
                <p className="text-xs text-gray-400 mt-1">Enter mask to auto-convert to CIDR</p>
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

            {/* Result Summary Card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                IP Range Summary
              </p>
              {result ? (
                <>
                  <div className="text-xl font-bold font-mono mb-1 break-all">
                    {result.networkAddress}<span className="text-primary-200">/{result.cidr}</span>
                  </div>
                  <div className="text-sm text-primary-100 mb-3">{result.ipType}</div>
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Usable Hosts</span>
                      <span className="font-semibold">{formatNumber(result.usableHosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Host Range</span>
                      <span className="font-mono font-semibold text-xs">{result.firstHost} –<br />{result.lastHost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">IP Class</span>
                      <span className="font-semibold">{result.ipClass}</span>
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
                <div className="text-primary-100 text-sm">Enter an IP and CIDR to calculate</div>
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
                {PRESETS.map((p) => {
                  const active = ip === p.ip && cidr === p.cidr;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-colors border ${
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
                      <span className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                  {/* Usable Range */}
                  <div className="px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Usable Range</span>
                      <span className="text-sm font-semibold text-gray-900 font-mono">
                        {result.firstHost} – {result.lastHost}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {ipError ? ipError : "Enter an IPv4 address to see results"}
                </div>
              )}
            </div>

            {/* Binary Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowBinary(!showBinary)}
                  className="w-full p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Binary Visualization
                  </h3>
                  <span className="text-xs text-gray-500">{showBinary ? "▲ Hide" : "▼ Show"}</span>
                </button>
                {showBinary && (
                  <div className="p-5 space-y-3">
                    {[
                      { label: "IP Address", value: result.binaryIp },
                      { label: "Subnet Mask", value: result.binaryMask },
                      { label: "Network Address", value: result.binaryNetwork },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
                        <div className="font-mono text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-gray-800 break-all">
                          {value.split(".").map((octet, i) => (
                            <span key={i}>
                              {octet.split("").map((bit, j) => (
                                <span
                                  key={j}
                                  className={bit === "1" ? "text-primary font-bold" : "text-gray-400"}
                                >
                                  {bit}
                                </span>
                              ))}
                              {i < 3 && <span className="text-gray-300 mx-0.5">.</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs text-gray-500 flex gap-4">
                      <span><span className="text-primary font-bold font-mono">1</span> = Network bits</span>
                      <span><span className="text-gray-400 font-mono">0</span> = Host bits</span>
                    </div>
                  </div>
                )}
              </div>
            )}

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
                      <div
                        key={entry.id}
                        onClick={() => { setIp(entry.ip); setCidr(entry.cidr); setShowHistory(false); }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {entry.ip}/{entry.cidr}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-primary font-mono">
                          Range: {entry.result.firstHost} – {entry.result.lastHost} · Hosts: {formatNumber(entry.result.usableHosts)}
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

      <IpRangeCalculatorSEO />

      <RelatedTools
        currentTool="ip-range-calculator"
        tools={[
          "subnet-calculator",
          "cidr-calculator",
          "bandwidth-calculator",
          "checksum-calculator",
          "ip-address-masker",
          "download-time-calculator",
        ]}
      />
    </>
  );
}
