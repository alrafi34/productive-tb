"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateBacklinkRatios, validateInputs, parseInputValue, formatNumber, debounce,
  saveHistory, getHistory, clearHistory, parseBatchText, buildCSVReport, buildTextReport,
  SAMPLE_DATA, DEFAULT_INPUTS,
  type BacklinkInputs, type BacklinkResult, type RatioItem, type HistoryEntry,
} from "./logic";
import BacklinkRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const STATUS_STYLES: Record<RatioItem["status"], { bg: string; text: string; border: string; dot: string }> = {
  healthy: { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  warning: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  danger:  { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500"    },
  neutral: { bg: "bg-gray-50",   text: "text-gray-600",   border: "border-gray-200",   dot: "bg-gray-400"   },
};

const RATIO_PANELS: { key: keyof BacklinkResult; label: string }[] = [
  { key: "followRatio",      label: "Follow Links"          },
  { key: "nofollowRatio",    label: "Nofollow Links"        },
  { key: "homepageRatio",    label: "Homepage Links"        },
  { key: "deepPageRatio",    label: "Deep Page Links"       },
  { key: "brandRatio",       label: "Brand Anchors"         },
  { key: "exactMatchRatio",  label: "Exact-Match Anchors"   },
  { key: "partialMatchRatio",label: "Partial-Match Anchors" },
  { key: "genericRatio",     label: "Generic Anchors"       },
  { key: "textRatio",        label: "Text Links"            },
  { key: "imageRatio",       label: "Image Links"           },
  { key: "domainDiversity",  label: "Domain Diversity"      },
];

export default function BacklinkRatioCalculatorUI() {
  const [inputs, setInputs]           = useState<BacklinkInputs>(DEFAULT_INPUTS);
  const [result, setResult]           = useState<BacklinkResult | null>(null);
  const [errors, setErrors]           = useState<Record<string, string | null>>({});
  const [copied, setCopied]           = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBatch, setShowBatch]     = useState(false);
  const [batchText, setBatchText]     = useState("");
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const totalRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); totalRef.current?.focus(); }, []);

  const run = useCallback(
    debounce((inp: BacklinkInputs) => {
      const errs = validateInputs(inp);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      if (inp.totalBacklinks === 0) { setResult(null); return; }
      setResult(calculateBacklinkRatios(inp));
    }, 150),
    []
  );

  useEffect(() => { run(inputs); }, [inputs, run]);

  const set = (field: keyof BacklinkInputs, val: string) =>
    setInputs((p) => ({ ...p, [field]: parseInputValue(val) }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS); setBatchText(""); setResult(null); setErrors({});
    totalRef.current?.focus();
  };

  const handleSample = () => { setInputs(SAMPLE_DATA); totalRef.current?.focus(); };

  const handleBatchApply = () => {
    const parsed = parseBatchText(batchText);
    setInputs((p) => ({ ...p, ...parsed }));
    setShowBatch(false);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const blob = new Blob([buildCSVReport(result)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `backlink-ratio-report-${Date.now()}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([buildTextReport(result)], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `backlink-ratio-report-${Date.now()}.txt`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildTextReport(result));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory({ inputs, result }); setHistory(getHistory());
  };

  const hs = result?.healthScore ?? null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">🔗</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>Backlink Ratio Calculator</h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Enter your backlink statistics to instantly calculate follow/nofollow ratios, anchor text distribution, domain diversity, and overall profile health. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* ── Left column ── */}
          <div className="lg:col-span-4 space-y-5">
            {/* Input card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Backlink Statistics</h3>

              {/* Total */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="bl-total">Total Backlinks</label>
                <input ref={totalRef} id="bl-total" type="number" min="0" inputMode="numeric"
                  value={inputs.totalBacklinks || ""}
                  onChange={(e) => set("totalBacklinks", e.target.value)}
                  placeholder="1200"
                  className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${errors.totalBacklinks ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.totalBacklinks && <p className="text-xs text-red-600 mt-1" role="alert">{errors.totalBacklinks}</p>}
              </div>

              {/* Follow / Nofollow */}
              <div className="grid grid-cols-2 gap-3">
                {([ ["bl-follow","Follow Links","followLinks","840",errors.followLinks], ["bl-nofollow","Nofollow Links","nofollowLinks","360",errors.nofollowLinks] ] as [string,string,keyof BacklinkInputs,string,string|null][]).map(([id,label,field,ph,err]) => (
                  <div key={id}>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
                    <input id={id} type="number" min="0" inputMode="numeric"
                      value={inputs[field] || ""}
                      onChange={(e) => set(field, e.target.value)}
                      placeholder={ph}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${err ? "border-red-300" : "border-gray-200"}`}
                    />
                    {err && <p className="text-xs text-red-600 mt-1" role="alert">{err}</p>}
                  </div>
                ))}
              </div>

              {/* Homepage / Inner */}
              <div className="grid grid-cols-2 gap-3">
                {([ ["bl-home","Homepage Links","homepageLinks","420",errors.homepageLinks], ["bl-inner","Inner Page Links","innerPageLinks","780",errors.innerPageLinks] ] as [string,string,keyof BacklinkInputs,string,string|null][]).map(([id,label,field,ph,err]) => (
                  <div key={id}>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
                    <input id={id} type="number" min="0" inputMode="numeric"
                      value={inputs[field] || ""}
                      onChange={(e) => set(field, e.target.value)}
                      placeholder={ph}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${err ? "border-red-300" : "border-gray-200"}`}
                    />
                    {err && <p className="text-xs text-red-600 mt-1" role="alert">{err}</p>}
                  </div>
                ))}
              </div>

              {/* Anchor text */}
              <div className="pt-1 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Anchor Text Distribution</p>
                <div className="grid grid-cols-2 gap-3">
                  {([ ["bl-brand","Brand","brandAnchors","480"], ["bl-exact","Exact Match","exactMatchAnchors","180"], ["bl-partial","Partial Match","partialMatchAnchors","240"], ["bl-generic","Generic","genericAnchors","180"] ] as [string,string,keyof BacklinkInputs,string][]).map(([id,label,field,ph]) => (
                    <div key={id}>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
                      <input id={id} type="number" min="0" inputMode="numeric"
                        value={inputs[field] || ""}
                        onChange={(e) => set(field, e.target.value)}
                        placeholder={ph}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Link format + domain */}
              <div className="pt-1 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Link Format &amp; Domains</p>
                <div className="grid grid-cols-2 gap-3">
                  {([ ["bl-text","Text Links","textLinks","960"], ["bl-image","Image Links","imageLinks","120"], ["bl-domains","Referring Domains","referringDomains","720"], ["bl-ips","Unique IPs","uniqueIPs","650"] ] as [string,string,keyof BacklinkInputs,string][]).map(([id,label,field,ph]) => (
                    <div key={id}>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
                      <input id={id} type="number" min="0" inputMode="numeric"
                        value={inputs[field] || ""}
                        onChange={(e) => set(field, e.target.value)}
                        placeholder={ph}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Reset</button>
                  <button onClick={handleSample} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Sample Data</button>
                </div>
                <button onClick={() => setShowBatch(!showBatch)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showBatch ? "Hide" : "Batch"} Input
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDownloadTxt} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export TXT</button>
                  <button onClick={handleDownloadCsv} disabled={!result} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Export CSV</button>
                </div>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Batch textarea */}
            {showBatch && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Batch Input</h3>
                <p className="text-xs text-gray-500">One field per line, e.g. <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">follow:840</code></p>
                <textarea
                  value={batchText}
                  onChange={(e) => setBatchText(e.target.value)}
                  rows={7}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-xs font-mono"
                  placeholder={"total:1200\nfollow:840\nnofollow:360\nhomepage:420\ninner:780\nbrand:480\nexact:180\npartial:240\ngeneric:180"}
                />
                <button onClick={handleBatchApply} className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors">Apply</button>
              </div>
            )}

            {/* Health score result card — primary colour, matches CPC */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Health Score</p>
              {hs ? (
                <>
                  <div className="text-5xl font-bold font-mono tabular-nums mb-1">{hs.score}</div>
                  <div className="text-sm text-primary-100 mb-2">out of 100</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${hs.bg} ${hs.color} ${hs.border} border`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${hs.dot}`} />
                      {hs.label}
                    </span>
                  </div>
                  <p className="text-sm text-primary-100 mb-4 leading-relaxed">{hs.description}</p>
                  <div className="space-y-2">
                    <button onClick={handleCopyReport} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy Report"}
                    </button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save to History</button>
                  </div>
                </>
              ) : (
                <p className="text-primary-100 text-sm">Enter total backlinks to calculate your profile health score.</p>
              )}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Ratio grid */}
            {result ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {RATIO_PANELS.map(({ key }) => {
                  const item = result[key] as RatioItem;
                  if (!item || typeof item.percentage === "undefined") return null;
                  const s = STATUS_STYLES[item.status];
                  return (
                    <div key={key} className={`rounded-xl border p-4 ${s.bg} ${s.border}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-xs font-semibold ${s.text}`}>{item.label}</p>
                        {item.status !== "neutral" && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {item.status}
                          </span>
                        )}
                      </div>
                      <div className={`text-2xl font-bold font-mono tabular-nums mb-1 ${s.text}`}>{item.percentage}%</div>
                      <div className="w-full bg-white/60 rounded-full h-1.5 mb-2">
                        <div className={`h-1.5 rounded-full ${s.dot}`} style={{ width: `${Math.min(item.percentage, 100)}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{formatNumber(item.value)} / {formatNumber(item.total)}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.tip}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="text-4xl mb-3">🔗</div>
                <p className="text-gray-500 text-sm">Enter your backlink statistics to see ratio analysis and recommendations</p>
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
                    const s = rec.type === "success" ? STATUS_STYLES.healthy
                             : rec.type === "warning" ? STATUS_STYLES.warning
                             : rec.type === "danger"  ? STATUS_STYLES.danger
                             : STATUS_STYLES.neutral;
                    return (
                      <div key={i} className={`p-4 flex items-start gap-3 ${s.bg}`}>
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border-2 ${s.border}`}>
                          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        </span>
                        <div>
                          <p className={`text-sm font-semibold mb-0.5 ${s.text}`}>{rec.title}</p>
                          <p className="text-sm text-gray-600">{rec.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Calculation breakdown table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Ratio Breakdown</h3>
              </div>
              {result ? (
                <div className="divide-y divide-gray-50">
                  {RATIO_PANELS.map(({ key }) => {
                    const item = result[key] as RatioItem;
                    if (!item || typeof item.percentage === "undefined") return null;
                    const s = STATUS_STYLES[item.status];
                    return (
                      <div key={key} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <div className="flex items-center gap-3">
                          {item.status !== "neutral" && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{item.status}
                            </span>
                          )}
                          <span className="text-sm font-semibold font-mono text-primary tabular-nums">{item.percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">Enter values above to see the breakdown</div>
              )}
            </div>

            {/* Healthy range reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Healthy Range Reference</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { label: "Follow Links",         range: "60–80%",   note: "Natural mix of follow and nofollow"              },
                  { label: "Nofollow Links",        range: "20–40%",   note: "From social, directories, news sites"            },
                  { label: "Homepage Links",        range: "< 40%",    note: "Avoid concentrating all links on the homepage"   },
                  { label: "Deep Page Links",       range: "60%+",     note: "Topical authority via inner page links"          },
                  { label: "Brand Anchors",         range: "30–60%",   note: "Most natural anchor type"                       },
                  { label: "Exact-Match Anchors",   range: "< 20%",    note: "Over-optimization risk above this threshold"     },
                  { label: "Generic Anchors",       range: "10–30%",   note: "'Click here', URLs, and generic phrases"         },
                  { label: "Domain Diversity",      range: "50%+",     note: "Unique domains per total backlinks"              },
                ]).map(({ label, range, note }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm text-gray-700 font-medium">{label}</p>
                      <p className="text-xs text-gray-400">{note}</p>
                    </div>
                    <span className="text-sm font-mono font-semibold text-gray-700">{range}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">* Ranges are industry guidelines. Context and niche always affect what is considered healthy.</p>
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
                    <div className="p-6 text-center text-gray-400 text-sm">No saved analyses yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id}
                      onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-semibold text-gray-900">{formatNumber(entry.inputs.totalBacklinks)} backlinks</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        Score: {entry.result.healthScore.score}/100 · {entry.result.healthScore.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <BacklinkRatioCalculatorSEO />

      <RelatedTools
        currentTool="backlink-ratio-calculator"
        tools={[
          "keyword-density-checker",
          "seo-score-calculator",
          "ctr-calculator",
          "conversion-rate-calculator",
          "bounce-rate-calculator",
          "cost-per-click-cpc-calculator",
        ]}
      />
    </>
  );
}
