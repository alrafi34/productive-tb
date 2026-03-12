"use client";

import { useState, useEffect } from "react";
import {
  calculateIPInfo,
  isValidIPv4,
  cidrToMask,
  maskToCidr,
  isValidSubnetMask,
  calculateCIDRForHosts,
  generateIPList,
  generateRandomIP,
  generateRandomCIDR,
  parseCIDR,
} from "./logic";
import type { IPCalculation } from "./types";
import IPAddressMaskerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = "calculator" | "practice" | "batch" | "hosts";

export default function IPAddressMaskerUI() {
  const [mode, setMode] = useState<Mode>("calculator");
  const [ipAddress, setIpAddress] = useState("192.168.1.0");
  const [cidr, setCidr] = useState("24");
  const [subnetMask, setSubnetMask] = useState("255.255.255.0");
  const [inputMode, setInputMode] = useState<"cidr" | "mask">("cidr");
  const [result, setResult] = useState<IPCalculation | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  // Practice mode
  const [practiceIP, setPracticeIP] = useState("");
  const [practiceCIDR, setPracticeCIDR] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [practiceResult, setPracticeResult] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Hosts calculator
  const [hostsIP, setHostsIP] = useState("192.168.1.0");
  const [requiredHosts, setRequiredHosts] = useState("50");
  const [hostsResult, setHostsResult] = useState<IPCalculation | null>(null);

  // Batch mode
  const [batchInput, setBatchInput] = useState("");
  const [batchResults, setBatchResults] = useState<IPCalculation[]>([]);

  // IP list
  const [showIPList, setShowIPList] = useState(false);
  const [ipList, setIpList] = useState<string[]>([]);

  // Calculate on input change
  useEffect(() => {
    if (!isValidIPv4(ipAddress)) {
      setError("Invalid IP address format");
      setResult(null);
      return;
    }

    let cidrNum: number;

    if (inputMode === "cidr") {
      cidrNum = parseInt(cidr, 10);
      if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
        setError("CIDR must be between 0 and 32");
        setResult(null);
        return;
      }
      setSubnetMask(cidrToMask(cidrNum));
    } else {
      if (!isValidSubnetMask(subnetMask)) {
        setError("Invalid subnet mask");
        setResult(null);
        return;
      }
      cidrNum = maskToCidr(subnetMask);
      setCidr(cidrNum.toString());
    }

    setError("");
    const calc = calculateIPInfo(ipAddress, cidrNum);
    setResult(calc);
  }, [ipAddress, cidr, subnetMask, inputMode]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const generatePracticeQuestion = () => {
    const ip = generateRandomIP();
    const cidrNum = generateRandomCIDR();
    setPracticeIP(ip);
    setPracticeCIDR(cidrNum);
    setUserAnswer("");
    setPracticeResult(null);
  };

  const checkPracticeAnswer = () => {
    const correctAnswer = `${practiceIP}/${practiceCIDR}`;
    const userCIDR = userAnswer.trim();
    
    if (userCIDR === practiceCIDR.toString() || userCIDR === `/${practiceCIDR}` || userCIDR === correctAnswer) {
      setPracticeResult("correct");
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setPracticeResult("incorrect");
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const calculateForHosts = () => {
    if (!isValidIPv4(hostsIP)) {
      return;
    }
    const hosts = parseInt(requiredHosts, 10);
    if (isNaN(hosts) || hosts < 1) {
      return;
    }
    const cidrNum = calculateCIDRForHosts(hosts);
    const calc = calculateIPInfo(hostsIP, cidrNum);
    setHostsResult(calc);
  };

  const processBatch = () => {
    const lines = batchInput.split("\n").filter(line => line.trim());
    const results: IPCalculation[] = [];

    lines.forEach(line => {
      const parsed = parseCIDR(line.trim());
      if (parsed) {
        const calc = calculateIPInfo(parsed.ip, parsed.cidr);
        results.push(calc);
      }
    });

    setBatchResults(results);
  };

  const generateIPListForResult = () => {
    if (!result) return;
    const list = generateIPList(result.networkAddress, result.cidr);
    setIpList(list);
    setShowIPList(list.length > 0);
  };

  useEffect(() => {
    generatePracticeQuestion();
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Mode Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "calculator", label: "Calculator", icon: "🧮" },
            { id: "practice", label: "Practice Mode", icon: "🎯" },
            { id: "hosts", label: "Hosts Calculator", icon: "👥" },
            { id: "batch", label: "Batch Process", icon: "📋" },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setMode(id as Mode)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Calculator Mode */}
        {mode === "calculator" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                IP Address & Subnet Calculator
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                  <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    placeholder="192.168.1.0"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setInputMode("cidr")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      inputMode === "cidr"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    CIDR Notation
                  </button>
                  <button
                    onClick={() => setInputMode("mask")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      inputMode === "mask"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Subnet Mask
                  </button>
                </div>

                {inputMode === "cidr" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CIDR (0-32)</label>
                    <input
                      type="number"
                      min="0"
                      max="32"
                      value={cidr}
                      onChange={(e) => setCidr(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subnet Mask</label>
                    <input
                      type="text"
                      value={subnetMask}
                      onChange={(e) => setSubnetMask(e.target.value)}
                      placeholder="255.255.255.0"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {result && !error && (
              <>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation Results
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <ResultItem label="CIDR Notation" value={`${result.ip}/${result.cidr}`} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="Subnet Mask" value={result.subnetMask} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="Network Address" value={result.networkAddress} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="Broadcast Address" value={result.broadcastAddress} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="First Host" value={result.firstHost} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="Last Host" value={result.lastHost} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="Total Hosts" value={result.totalHosts.toLocaleString()} />
                    <ResultItem label="Usable Hosts" value={result.usableHosts.toLocaleString()} />
                    <ResultItem label="Wildcard Mask" value={result.wildcardMask} onCopy={handleCopy} copied={copied} />
                    <ResultItem label="IP Class" value={result.ipClass} />
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Binary Subnet Mask</p>
                    <code className="block bg-gray-50 rounded-lg p-3 text-xs text-gray-700 font-mono break-all">
                      {result.binarySubnetMask}
                    </code>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCopy(`${result.ip}/${result.cidr}`, "CIDR")}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {copied === "CIDR" ? "✓ Copied" : "📋 Copy CIDR"}
                    </button>
                    <button
                      onClick={() =>
                        handleCopy(
                          `Network: ${result.networkAddress}\nBroadcast: ${result.broadcastAddress}\nFirst Host: ${result.firstHost}\nLast Host: ${result.lastHost}`,
                          "Range"
                        )
                      }
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {copied === "Range" ? "✓ Copied" : "📋 Copy Range"}
                    </button>
                    {result.totalHosts <= 256 && (
                      <button
                        onClick={generateIPListForResult}
                        className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        🔍 Show All IPs
                      </button>
                    )}
                  </div>
                </div>

                {showIPList && ipList.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                        IP Address List ({ipList.length} addresses)
                      </h3>
                      <button
                        onClick={() => setShowIPList(false)}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {ipList.map((ip, idx) => (
                          <code
                            key={idx}
                            className={`text-xs px-2 py-1 rounded ${
                              idx === 0
                                ? "bg-blue-100 text-blue-700 font-semibold"
                                : idx === ipList.length - 1
                                ? "bg-red-100 text-red-700 font-semibold"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            {ip}
                          </code>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(ipList.join("\n"), "IP List")}
                      className="mt-3 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {copied === "IP List" ? "✓ Copied" : "📋 Copy All IPs"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Practice Mode */}
        {mode === "practice" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                  Practice Subnetting
                </h2>
                <div className="text-sm text-gray-600">
                  Score: <span className="font-semibold text-primary">{score.correct}</span> / {score.total}
                </div>
              </div>

              <div className="bg-violet-50 rounded-lg p-6 mb-4">
                <p className="text-sm text-gray-600 mb-2">Convert this IP and subnet mask to CIDR notation:</p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">IP Address: {practiceIP}</p>
                  <p className="text-lg font-semibold text-gray-900">Subnet Mask: {cidrToMask(practiceCIDR)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer (CIDR)</label>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter CIDR (e.g., 24 or /24)"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    onKeyPress={(e) => e.key === "Enter" && checkPracticeAnswer()}
                  />
                </div>

                {practiceResult && (
                  <div
                    className={`rounded-lg p-4 ${
                      practiceResult === "correct"
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {practiceResult === "correct" ? (
                      <p className="font-semibold">✅ Correct! The answer is /{practiceCIDR}</p>
                    ) : (
                      <p className="font-semibold">
                        ❌ Incorrect. The correct answer is /{practiceCIDR}
                        <br />
                        <span className="text-sm font-normal">
                          CIDR Notation: {practiceIP}/{practiceCIDR}
                        </span>
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={checkPracticeAnswer}
                    disabled={!userAnswer.trim()}
                    className="flex-1 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={generatePracticeQuestion}
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hosts Calculator Mode */}
        {mode === "hosts" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Calculate Subnet for Required Hosts
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                  <input
                    type="text"
                    value={hostsIP}
                    onChange={(e) => setHostsIP(e.target.value)}
                    placeholder="192.168.1.0"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Hosts</label>
                  <input
                    type="number"
                    min="1"
                    value={requiredHosts}
                    onChange={(e) => setRequiredHosts(e.target.value)}
                    placeholder="50"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  onClick={calculateForHosts}
                  className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Calculate Subnet
                </button>
              </div>
            </div>

            {hostsResult && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Recommended Subnet
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <ResultItem label="CIDR Notation" value={`${hostsResult.ip}/${hostsResult.cidr}`} onCopy={handleCopy} copied={copied} />
                  <ResultItem label="Subnet Mask" value={hostsResult.subnetMask} />
                  <ResultItem label="Network Address" value={hostsResult.networkAddress} />
                  <ResultItem label="Broadcast Address" value={hostsResult.broadcastAddress} />
                  <ResultItem label="Usable Hosts" value={hostsResult.usableHosts.toLocaleString()} />
                  <ResultItem label="Total Hosts" value={hostsResult.totalHosts.toLocaleString()} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Batch Mode */}
        {mode === "batch" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Batch Process IP Addresses
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter IP addresses with CIDR (one per line)
                  </label>
                  <textarea
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder="192.168.1.0/24&#10;10.0.0.0/8&#10;172.16.0.0/16"
                    rows={8}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>

                <button
                  onClick={processBatch}
                  disabled={!batchInput.trim()}
                  className="w-full bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Process All
                </button>
              </div>
            </div>

            {batchResults.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                    Batch Results ({batchResults.length})
                  </h3>
                  <button
                    onClick={() => {
                      const text = batchResults
                        .map(
                          (r) =>
                            `${r.ip}/${r.cidr}\nNetwork: ${r.networkAddress} - ${r.broadcastAddress}\nHosts: ${r.usableHosts}\n`
                        )
                        .join("\n");
                      handleCopy(text, "Batch");
                    }}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    {copied === "Batch" ? "✓ Copied" : "📋 Copy All"}
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {batchResults.map((result, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-semibold text-primary">
                          {result.ip}/{result.cidr}
                        </code>
                        <span className="text-xs text-gray-500">{result.subnetMask}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>Network: {result.networkAddress}</div>
                        <div>Broadcast: {result.broadcastAddress}</div>
                        <div>First Host: {result.firstHost}</div>
                        <div>Last Host: {result.lastHost}</div>
                        <div className="col-span-2">Usable Hosts: {result.usableHosts.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <IPAddressMaskerSEOContent />

      <RelatedTools
        currentTool="ip-address-masker"
        tools={["hash-generator", "base64-encoder-decoder", "url-encoder-decoder"]}
      />
    </>
  );
}

function ResultItem({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy?: (text: string, label: string) => void;
  copied?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <code className="text-sm font-semibold text-gray-900 break-all">{value}</code>
        {onCopy && (
          <button
            onClick={() => onCopy(value, label)}
            className="flex-shrink-0 text-gray-400 hover:text-primary transition-colors text-xs"
            title="Copy"
          >
            {copied === label ? "✓" : "📋"}
          </button>
        )}
      </div>
    </div>
  );
}
