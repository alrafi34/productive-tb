"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateDA, validateInputs, sanitizeDomain, debounce,
  saveHistory, getHistory, clearHistory,
  parseNumber, formatNumber, buildTextReport, buildJSONReport,
  SAMPLE_DATA, DEFAULT_INPUTS,
  type DAInputs, type DAResult, type HistoryEntry,
} from "./logic";
import DomainAuthorityEstimatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

export default function DomainAuthorityEstimatorUI() {
  const [inputs, setInputs]           = useState<DAInputs>(DEFAULT_INPUTS);
  const [result, setResult]           = useState<DAResult | null>(null);
  const [errors, setErrors]           = useState<Record<string, string | null>>({});
  const [copied, setCopied]           = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const domainRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); domainRef.current?.focus(); }, []);

  const run = useCallback(
    debounce((inp: DAInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculateDA(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = <K extends keyof DAInputs>(field: K, val: DAInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const handleDomainChange = (raw: string) => {
    setInputs((p) => ({ ...p, domain: raw }));
  };

  const handleDomainBlur = () => {
    setInputs((p) => ({ ...p, domain: sanitizeDomain(p.domain) }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setResult(null); setErrors({});
    domainRef.current?.focus();
  };

  const handleSample = () => { setInputs(SAMPLE_DATA); };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result, inputs));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result, inputs)], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `da-estimate-${result.domain || "report"}-${Date.now()}.txt`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(buildJSONReport(result, inputs), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `da-estimate-${result.domain || "report"}-${Date.now()}.json`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
  };


  const da = result?.estimatedDA ?? null;

  // Circular gauge helpers
  const RADIUS = 44;
  const CIRC   = 2 * Math.PI * RADIUS;
  const dash   = da !== null ? (da / 100) * CIRC : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Disclaimer banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🌐</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>Estimated Score — Not Official DA</h3>
            <p className="text-sm text-blue-700 mt-0.5">
              This tool estimates Domain Authority using publicly known SEO signals. DA is a proprietary Moz metric — this estimator is for educational and comparative purposes only.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left column: inputs ── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Input card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>SEO Signals</h3>

              {/* Domain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="da-domain">
                  Domain Name
                  <span className="ml-1 text-gray-400 font-normal text-xs">(optional)</span>
                </label>
                <input
                  ref={domainRef}
                  id="da-domain"
                  type="text"
                  value={inputs.domain}
                  onChange={(e) => handleDomainChange(e.target.value)}
                  onBlur={handleDomainBlur}
                  placeholder="example.com"
                  autoComplete="off"
                  spellCheck={false}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.domain ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.domain && <p className="text-xs text-red-600 mt-1" role="alert">{errors.domain}</p>}
                <p className="text-xs text-gray-400 mt-1">https:// and www. are removed automatically</p>
              </div>

              {/* Referring Domains + Backlinks */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="da-rd">
                    Referring Domains
                  </label>
                  <input
                    id="da-rd"
                    type="number" min="0" inputMode="numeric"
                    value={inputs.referringDomains || ""}
                    onChange={(e) => set("referringDomains", parseNumber(e.target.value))}
                    placeholder="250"
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.referringDomains ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.referringDomains && <p className="text-xs text-red-600 mt-1">{errors.referringDomains}</p>}
                  <p className="text-xs text-gray-400 mt-1">35% weight</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="da-bl">
                    Total Backlinks
                  </label>
                  <input
                    id="da-bl"
                    type="number" min="0" inputMode="numeric"
                    value={inputs.totalBacklinks || ""}
                    onChange={(e) => set("totalBacklinks", parseNumber(e.target.value))}
                    placeholder="4800"
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.totalBacklinks ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.totalBacklinks && <p className="text-xs text-red-600 mt-1">{errors.totalBacklinks}</p>}
                  <p className="text-xs text-gray-400 mt-1">20% weight</p>
                </div>
              </div>


              {/* Domain Age + Organic Traffic */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="da-age">
                    Domain Age (years)
                  </label>
                  <input
                    id="da-age"
                    type="number" min="0" max="100" inputMode="numeric"
                    value={inputs.domainAge || ""}
                    onChange={(e) => set("domainAge", parseNumber(e.target.value))}
                    placeholder="8"
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.domainAge ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.domainAge && <p className="text-xs text-red-600 mt-1">{errors.domainAge}</p>}
                  <p className="text-xs text-gray-400 mt-1">10% weight</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="da-traffic">
                    Organic Traffic/mo
                  </label>
                  <input
                    id="da-traffic"
                    type="number" min="0" inputMode="numeric"
                    value={inputs.organicTraffic || ""}
                    onChange={(e) => set("organicTraffic", parseNumber(e.target.value))}
                    placeholder="18000"
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.organicTraffic ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.organicTraffic && <p className="text-xs text-red-600 mt-1">{errors.organicTraffic}</p>}
                  <p className="text-xs text-gray-400 mt-1">15% weight</p>
                </div>
              </div>

              {/* Spam Score slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-gray-700" htmlFor="da-spam">
                    Spam Score
                  </label>
                  <span className={`text-xs font-semibold font-mono tabular-nums ${inputs.spamScore > 30 ? "text-red-600" : inputs.spamScore > 10 ? "text-yellow-600" : "text-green-600"}`}>
                    {inputs.spamScore}%
                  </span>
                </div>
                <input
                  id="da-spam"
                  type="range" min="0" max="100" step="1"
                  value={inputs.spamScore}
                  onChange={(e) => set("spamScore", parseNumber(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0% clean</span>
                  <span>−15% weight penalty</span>
                  <span>100% spam</span>
                </div>
                {errors.spamScore && <p className="text-xs text-red-600 mt-1">{errors.spamScore}</p>}
              </div>

              {/* HTTPS toggle */}
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div>
                  <p className="text-xs font-medium text-gray-700">HTTPS Enabled</p>
                  <p className="text-xs text-gray-400">5% weight — confirmed ranking signal</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={inputs.https}
                  onClick={() => set("https", !inputs.https)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.https ? "bg-primary" : "bg-gray-200"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${inputs.https ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {/* Brand Mentions */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="da-brand">
                  Brand Mentions <span className="text-gray-400 font-normal">(5% weight)</span>
                </label>
                <select
                  id="da-brand"
                  value={inputs.brandMentions}
                  onChange={(e) => set("brandMentions", e.target.value as DAInputs["brandMentions"])}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="very-high">Very High</option>
                </select>
              </div>

              {/* Content Quality */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="da-content">
                  Content Quality <span className="text-gray-400 font-normal">(5% weight)</span>
                </label>
                <select
                  id="da-content"
                  value={inputs.contentQuality}
                  onChange={(e) => set("contentQuality", e.target.value as DAInputs["contentQuality"])}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                >
                  <option value="poor">Poor</option>
                  <option value="average">Average</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleSample} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Sample Data</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
                  <button onClick={handleDownloadJSON} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export JSON</button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>


            {/* DA Score card — primary colour */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>Estimated DA Score</p>
              {da !== null ? (
                <>
                  {/* Circular gauge */}
                  <div className="flex items-center gap-4 mb-3">
                    <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r={RADIUS}
                        fill="none" stroke="white" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${CIRC}`}
                        strokeDashoffset={CIRC * 0.25}
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                      />
                      <text x="50" y="46" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="monospace">{da}</text>
                      <text x="50" y="62" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">/100</text>
                    </svg>
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${result!.authorityBg} ${result!.authorityColor} ${result!.authorityBorder}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${result!.authorityDot}`} />
                        {result!.authorityLevel}
                      </div>
                      {result!.domain && (
                        <p className="text-xs text-primary-100 mt-2 font-mono truncate max-w-[130px]">{result!.domain}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopyReport} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save to History</button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter SEO signals above to estimate your domain authority score.</p>
              )}
            </div>

          </div>

          {/* ── Right column: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Factor breakdown */}
            {result ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Factor Breakdown</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Each signal normalized 0–100, then weighted</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {result.factors.map((f) => (
                    <div key={f.label} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700 font-medium">{f.label}</span>
                          <span className="text-xs text-gray-400 font-mono">{(f.weight * 100).toFixed(0)}%</span>
                        </div>
                        <span className="text-sm font-semibold font-mono text-primary tabular-nums">{f.score.toFixed(0)}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${Math.min(f.score, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{f.description}</p>
                    </div>
                  ))}
                  {/* Spam penalty row */}
                  <div className="px-5 py-3 bg-red-50/40">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 font-medium">Spam Score Penalty</span>
                        <span className="text-xs text-gray-400 font-mono">−15%</span>
                      </div>
                      <span className="text-sm font-semibold font-mono text-red-600 tabular-nums">−{(inputs.spamScore * 0.15).toFixed(1)} pts</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-red-400 transition-all duration-500"
                        style={{ width: `${Math.min(inputs.spamScore, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Spam score of {inputs.spamScore}% applied as a penalty at 15% weight</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="text-4xl mb-3">🌐</div>
                <p className="text-gray-500 text-sm">Enter SEO signals to see your estimated DA score and factor analysis</p>
              </div>
            )}


            {/* Strengths & Weaknesses */}
            {result && (result.strengths.length > 0 || result.weaknesses.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {result.strengths.length > 0 && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Strengths</h3>
                    <ul className="space-y-1">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-green-700">
                          <span className="text-green-500 flex-shrink-0">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.weaknesses.length > 0 && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-red-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Weaknesses</h3>
                    <ul className="space-y-1">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-red-700">
                          <span className="text-red-400 flex-shrink-0">✗</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recommendations</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {result.recommendations.map((rec, i) => {
                    const styles = {
                      success: { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
                      warning: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
                      danger:  { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500"    },
                      info:    { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"   },
                    }[rec.type];
                    return (
                      <div key={i} className={`p-4 flex items-start gap-3 ${styles.bg}`}>
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border-2 ${styles.border}`}>
                          <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                        </span>
                        <div>
                          <p className={`text-sm font-semibold mb-0.5 ${styles.text}`}>{rec.title}</p>
                          <p className="text-sm text-gray-600">{rec.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DA score reference table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>DA Score Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { range: "81–100", level: "Excellent",  dot: "bg-green-500",  desc: "High authority — major brands, news sites, top SaaS companies"     },
                  { range: "61–80",  level: "Strong",     dot: "bg-blue-500",   desc: "Well-established sites with strong link profiles and traffic"       },
                  { range: "41–60",  level: "Moderate",   dot: "bg-yellow-500", desc: "Growing sites with a decent backlink base and some authority"       },
                  { range: "21–40",  level: "Low",        dot: "bg-orange-500", desc: "Early-stage or niche sites — room for significant improvement"      },
                  { range: "0–20",   level: "Very Weak",  dot: "bg-red-500",    desc: "New or low-authority domains — focus on foundational link building" },
                ] as const).map(({ range, level, dot, desc }) => (
                  <div key={range} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                    <span className="font-mono text-sm font-semibold text-gray-800 w-16 flex-shrink-0">{range}</span>
                    <span className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">{level}</span>
                    <span className="text-xs text-gray-500">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Scoring Algorithm Weights</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { factor: "Referring Domains",  weight: "35%", note: "Logarithmically scaled up to 1M domains"  },
                  { factor: "Total Backlinks",     weight: "20%", note: "Logarithmically scaled up to 100M links"  },
                  { factor: "Organic Traffic",     weight: "15%", note: "Logarithmically scaled up to 5M/month"    },
                  { factor: "Domain Age",          weight: "10%", note: "Linear scale, capped at 25 years"         },
                  { factor: "HTTPS Security",      weight: "5%",  note: "Binary: enabled = 100pts, disabled = 0"   },
                  { factor: "Brand Mentions",      weight: "5%",  note: "Low / Medium / High / Very High tiers"    },
                  { factor: "Content Quality",     weight: "5%",  note: "Poor / Average / Good / Excellent tiers"  },
                  { factor: "Spam Score Penalty",  weight: "−15%",note: "Applied as: penalty = spamScore × 0.15"   },
                ]).map(({ factor, weight, note }) => (
                  <div key={factor} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm text-gray-700 font-medium">{factor}</p>
                      <p className="text-xs text-gray-400">{note}</p>
                    </div>
                    <span className={`text-sm font-mono font-semibold ${weight.startsWith("−") ? "text-red-600" : "text-primary"}`}>{weight}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button
                      onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved estimates yet</div>
                  ) : history.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {entry.inputs.domain || "Unnamed domain"}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        DA: {entry.result.estimatedDA}/100 · {entry.result.authorityLevel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <RelatedStrip />
      <DomainAuthorityEstimatorSEO />

      <RelatedTools />
    </>
  );
}
