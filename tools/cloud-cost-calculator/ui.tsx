"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { CloudConfig, CostResult, Provider, Currency } from "./types";
import {
  calculateCost,
  compareProviders,
  getRecommendation,
  projectScaling,
  formatCurrency,
  getCurrencySymbol,
  formatNumber,
  buildExportText,
  buildExportCSV,
  downloadFile,
  saveEstimate,
  getSavedEstimates,
  clearSavedEstimates,
  debounce,
  DEFAULT_CONFIG,
  PRESETS,
} from "./logic";
import { PROVIDERS, REGION_LABELS, CURRENCY_SYMBOLS } from "./pricing";
import type { SavedEstimate, ProviderComparison } from "./types";
import CloudCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Breakdown labels ──────────────────────────────────────────────────────────
const BREAKDOWN_ITEMS = [
  { key: "compute",       label: "Compute",        color: "bg-primary" },
  { key: "storage",       label: "Block Storage",  color: "bg-blue-400" },
  { key: "objectStorage", label: "Object Storage", color: "bg-purple-400" },
  { key: "database",      label: "Database",       color: "bg-green-400" },
  { key: "bandwidth",     label: "Bandwidth",      color: "bg-orange-400" },
  { key: "serverless",    label: "Serverless",     color: "bg-pink-400" },
  { key: "cdn",           label: "CDN",            color: "bg-yellow-400" },
] as const;

type BreakdownKey = typeof BREAKDOWN_ITEMS[number]["key"];

// ── Mini pie chart via SVG ────────────────────────────────────────────────────
function PieChart({ data }: { data: { pct: number; color: string }[] }) {
  let cumulative = 0;
  const cx = 50, cy = 50, r = 42;
  const slices = data.filter((d) => d.pct > 0).map((d) => {
    const startAngle = cumulative * 3.6 - 90;
    cumulative += d.pct;
    const endAngle = cumulative * 3.6 - 90;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const large = d.pct > 50 ? 1 : 0;
    return { ...d, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z` };
  });

  if (slices.length === 0) return null;

  // single-item full circle
  if (slices.length === 1) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx={cx} cy={cy} r={r} fill={slices[0].color.replace("bg-", "")} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {slices.map((s, i) => (
        <path key={i} d={s.d} className={s.color} fill="currentColor" stroke="white" strokeWidth="1" />
      ))}
    </svg>
  );
}

// ── SVG colour map ────────────────────────────────────────────────────────────
const SVG_COLORS: Record<BreakdownKey, string> = {
  compute:       "#058554",
  storage:       "#60a5fa",
  objectStorage: "#a78bfa",
  database:      "#4ade80",
  bandwidth:     "#fb923c",
  serverless:    "#f472b6",
  cdn:           "#facc15",
};

export default function CloudCostCalculatorUI() {
  const [config, setConfig] = useState<CloudConfig>(DEFAULT_CONFIG);
  const [result, setResult] = useState<CostResult | null>(null);
  const [comparisons, setComparisons] = useState<ProviderComparison[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [saved, setSaved] = useState<SavedEstimate[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setSaved(getSavedEstimates()); }, []);

  // ── Calculation ─────────────────────────────────────────────────────────────
  const run = useCallback(
    debounce((cfg: CloudConfig) => {
      if (cfg.cpu < 0 || cfg.ram < 0 || cfg.serverCount < 1) {
        setError("Please enter valid cloud resource values.");
        return;
      }
      setError(null);
      const res = calculateCost(cfg);
      setResult(res);
    }, 150),
    []
  );

  useEffect(() => { run(config); }, [config, run]);

  // ── Field helpers ───────────────────────────────────────────────────────────
  const set = <K extends keyof CloudConfig>(key: K, value: CloudConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const setNum = (key: keyof CloudConfig, raw: string, min = 0) => {
    const v = parseFloat(raw);
    set(key, isNaN(v) ? min : Math.max(min, v) as CloudConfig[typeof key]);
  };

  // ── Preset ──────────────────────────────────────────────────────────────────
  const loadPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setConfig((prev) => ({
      ...prev,
      ...p,
      provider: prev.provider,
      region: prev.region,
      currency: prev.currency,
      runtimeHours: (p.runtimeHours as CloudConfig["runtimeHours"]) ?? "24-7",
      customHours: prev.customHours,
    }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setShowComparison(false);
    setError(null);
  };

  // ── Compare ─────────────────────────────────────────────────────────────────
  const handleCompare = () => {
    const list = compareProviders(config);
    setComparisons(list);
    setShowComparison(true);
  };

  // ── Copy / Export ───────────────────────────────────────────────────────────
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(buildExportText(config, result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(buildExportText(config, result), "cloud-cost-estimate.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(buildExportCSV(result, config.currency), "cloud-cost-estimate.csv", "text/csv");
  };

  const handleSave = () => {
    if (!result) return;
    saveEstimate(config, result);
    setSaved(getSavedEstimates());
  };

  const handleClearSaved = () => {
    if (confirm("Clear all saved estimates?")) {
      clearSavedEstimates();
      setSaved([]);
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────────────
  const sym = result ? getCurrencySymbol(config.currency) : "$";
  const fmt = (v: number) => formatCurrency(v, config.currency, sym);

  const pieData = result
    ? BREAKDOWN_ITEMS.map((item) => ({
        pct: result.monthly.total > 0
          ? (result.monthly[item.key] / result.monthly.total) * 100
          : 0,
        color: item.color,
        svgColor: SVG_COLORS[item.key],
      }))
    : [];

  const maxComparison = comparisons.length > 0 ? comparisons[comparisons.length - 1].monthly : 1;
  const scaling = result ? projectScaling(result.monthly.total) : null;
  const rec = result ? getRecommendation(result.monthly.total, config.provider, config.currency, sym) : null;

  // ── Input number field ───────────────────────────────────────────────────────
  const NumField = ({
    label, value, onChange, min = 0, step = 1, placeholder = "0", hint,
  }: {
    label: string; value: number; onChange: (v: string) => void;
    min?: number; step?: number; placeholder?: string; hint?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
        aria-label={label}
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">☁️</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Cloud Cost Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Estimate monthly and yearly cloud infrastructure costs across 10 providers.
              Configure compute, storage, database, bandwidth, and more. All calculations run
              locally — no API calls, no signup required.
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Quick Setup Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                title={p.description}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── LEFT: Configuration ── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Provider + Region + Currency */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Provider & Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cloud Provider</label>
                <select
                  value={config.provider}
                  onChange={(e) => set("provider", e.target.value as Provider)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Cloud provider"
                >
                  {Object.entries(PROVIDERS).map(([key, p]) => (
                    <option key={key} value={key}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
                  <select
                    value={config.region}
                    onChange={(e) => set("region", e.target.value as CloudConfig["region"])}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Region"
                  >
                    {Object.entries(REGION_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                  <select
                    value={config.currency}
                    onChange={(e) => set("currency", e.target.value as Currency)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Currency"
                  >
                    {Object.entries(CURRENCY_SYMBOLS).map(([k, sym]) => (
                      <option key={k} value={k}>{k} ({sym})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compute */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Compute
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <NumField label="vCPU" value={config.cpu} onChange={(v) => setNum("cpu", v, 0)} min={0} hint="Virtual CPUs" />
                <NumField label="RAM (GB)" value={config.ram} onChange={(v) => setNum("ram", v, 0)} min={0} hint="Memory in GB" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <NumField label="Servers" value={config.serverCount} onChange={(v) => setNum("serverCount", v, 1)} min={1} hint="Instance count" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Runtime</label>
                  <select
                    value={config.runtimeHours}
                    onChange={(e) => set("runtimeHours", e.target.value as CloudConfig["runtimeHours"])}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                    aria-label="Runtime hours"
                  >
                    <option value="24-7">24/7 (730h)</option>
                    <option value="business">Business hours (176h)</option>
                    <option value="custom">Custom hours</option>
                  </select>
                </div>
              </div>
              {config.runtimeHours === "custom" && (
                <NumField
                  label="Custom hours/month"
                  value={config.customHours}
                  onChange={(v) => setNum("customHours", v, 1)}
                  min={1}
                  hint="1–730 hours"
                />
              )}
            </div>

            {/* Storage */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Storage
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <NumField label="Block/SSD (GB)" value={config.blockStorage} onChange={(v) => setNum("blockStorage", v)} hint="Per server" />
                <NumField label="Object Storage (GB)" value={config.objectStorage} onChange={(v) => setNum("objectStorage", v)} hint="S3, GCS, R2…" />
              </div>
            </div>

            {/* Database + Bandwidth */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Database & Network
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Database</label>
                <select
                  value={config.database}
                  onChange={(e) => set("database", e.target.value as CloudConfig["database"])}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  aria-label="Database type"
                >
                  <option value="none">None</option>
                  <option value="postgres">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="redis">Redis</option>
                  <option value="managed">Managed DB (generic)</option>
                </select>
              </div>
              <NumField label="Bandwidth / Egress (GB)" value={config.bandwidth} onChange={(v) => setNum("bandwidth", v)} hint="Outgoing traffic/month" />
            </div>

            {/* Serverless + CDN */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Serverless & CDN
              </h3>
              <NumField
                label="Serverless executions/month"
                value={config.serverlessExecutions}
                onChange={(v) => setNum("serverlessExecutions", v)}
                hint="Lambda, Cloud Functions, Workers…"
              />
              <NumField
                label="CDN requests/month"
                value={config.cdnRequests}
                onChange={(v) => setNum("cdnRequests", v)}
                hint="CloudFront, Fastly, Cloudflare…"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700" role="alert">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleCompare} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Compare Providers
                </button>
                <button onClick={handleReset} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleCopy} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  {copied ? "✓ Copied!" : "Copy Estimate"}
                </button>
                <button onClick={handleSave} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleExportTxt} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  Export TXT
                </button>
                <button onClick={handleExportCSV} disabled={!result} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                  Export CSV
                </button>
              </div>
              <button onClick={() => setShowSaved(!showSaved)} className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {showSaved ? "Hide" : "Show"} Saved Estimates
              </button>
            </div>

            {/* Saved estimates */}
            {showSaved && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Saved Estimates</h3>
                  {saved.length > 0 && (
                    <button onClick={handleClearSaved} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-56 overflow-y-auto">
                  {saved.length === 0 ? (
                    <div className="p-5 text-center text-gray-400 text-sm">No saved estimates yet</div>
                  ) : (
                    saved.map((s) => (
                      <div key={s.id} className="p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-semibold text-primary font-mono truncate mr-2">{s.label}</span>
                          <span className="text-xs text-gray-400 shrink-0">{new Date(s.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-400">{PROVIDERS[s.config.provider]?.label}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="lg:col-span-7 space-y-5">

            {result ? (
              <>
                {/* Monthly / Yearly toggle + primary card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
                  {(["monthly", "yearly"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === t ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {t === "monthly" ? "Monthly" : "Yearly"}
                    </button>
                  ))}
                </div>

                <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {activeTab === "monthly" ? "Estimated Monthly Cost" : "Estimated Yearly Cost"} — {PROVIDERS[config.provider].label}
                  </p>
                  <div className="text-5xl font-bold font-mono mb-1">
                    {activeTab === "monthly" ? fmt(result.monthly.total) : fmt(result.yearly)}
                  </div>
                  <div className="text-sm text-primary-100 mb-4">
                    {activeTab === "monthly"
                      ? `${fmt(result.hourly)}/hr · ${fmt(result.yearly)}/yr`
                      : `${fmt(result.monthly.total)}/mo · ${fmt(result.hourly)}/hr`}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Hourly",  val: fmt(result.hourly) },
                      { label: "Monthly", val: fmt(result.monthly.total) },
                      { label: "Yearly",  val: fmt(result.yearly) },
                    ].map(({ label, val }) => (
                      <div key={label} className="bg-white/10 rounded-lg py-2.5 px-2 text-center">
                        <div className="text-base font-bold font-mono">{val}</div>
                        <div className="text-xs text-primary-100 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost breakdown bar chart */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Cost Breakdown
                  </h3>

                  {/* Stacked bar */}
                  {result.monthly.total > 0 && (
                    <div className="flex rounded-lg overflow-hidden h-7 mb-4">
                      {BREAKDOWN_ITEMS.map((item) => {
                        const pct = (result.monthly[item.key] / result.monthly.total) * 100;
                        if (pct < 0.5) return null;
                        return (
                          <div
                            key={item.key}
                            className={`${item.color} transition-all duration-300`}
                            style={{ width: `${pct}%` }}
                            title={`${item.label}: ${fmt(result.monthly[item.key])} (${pct.toFixed(1)}%)`}
                          />
                        );
                      })}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {BREAKDOWN_ITEMS.filter((item) => result.monthly[item.key] > 0).map((item) => {
                      const val = result.monthly[item.key];
                      const pct = result.monthly.total > 0 ? (val / result.monthly.total) * 100 : 0;
                      return (
                        <div key={item.key}>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-sm ${item.color} inline-block`} />
                              {item.label}
                            </span>
                            <span className="font-mono font-semibold">{fmt(val)}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`${item.color} h-1.5 rounded-full transition-all duration-300`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pie chart */}
                  {result.monthly.total > 0 && (
                    <div className="mt-4 flex gap-4 items-center">
                      <div className="w-24 h-24 shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {(() => {
                            let cumulative = 0;
                            const cx = 50, cy = 50, r = 42;
                            const toRad = (deg: number) => (deg * Math.PI) / 180;
                            const items = BREAKDOWN_ITEMS.filter((item) => result.monthly[item.key] > 0);
                            if (items.length === 1) {
                              return <circle cx={cx} cy={cy} r={r} fill={SVG_COLORS[items[0].key]} />;
                            }
                            return items.map((item) => {
                              const pct = (result.monthly[item.key] / result.monthly.total) * 100;
                              const start = cumulative * 3.6 - 90;
                              cumulative += pct;
                              const end = cumulative * 3.6 - 90;
                              const large = pct > 50 ? 1 : 0;
                              const x1 = cx + r * Math.cos(toRad(start));
                              const y1 = cy + r * Math.sin(toRad(start));
                              const x2 = cx + r * Math.cos(toRad(end));
                              const y2 = cy + r * Math.sin(toRad(end));
                              return (
                                <path
                                  key={item.key}
                                  d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
                                  fill={SVG_COLORS[item.key]}
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                              );
                            });
                          })()}
                        </svg>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-600">
                        {BREAKDOWN_ITEMS.filter((item) => result.monthly[item.key] > 0).map((item) => (
                          <span key={item.key} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: SVG_COLORS[item.key] }} />
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendation */}
                {rec && (
                  <div className={`rounded-xl border p-4 ${rec.color}`}>
                    <p className="font-semibold text-sm mb-1">💡 Cost Recommendation</p>
                    <p className="text-xs leading-relaxed">{rec.text}</p>
                  </div>
                )}

                {/* Scaling projection */}
                {scaling && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                      Scaling Projection
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Current (1×)", val: result.monthly.total, pct: 100 },
                        { label: "2× traffic", val: scaling.x2, pct: 200 },
                        { label: "5× traffic", val: scaling.x5, pct: 500 },
                        { label: "10× traffic", val: scaling.x10, pct: 1000 },
                      ].map(({ label, val }) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{label}</span>
                            <span className="font-mono font-semibold">{fmt(val)}/mo</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((val / scaling.x10) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      Linear scaling estimate. Real-world costs may differ with reserved pricing, caching, and architectural optimizations.
                    </p>
                  </div>
                )}

                {/* Provider comparison */}
                {showComparison && comparisons.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                        Provider Comparison (same config)
                      </h3>
                      <button
                        onClick={() => setShowComparison(false)}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="p-5 space-y-3">
                      {comparisons.map((c, i) => (
                        <div key={c.provider}>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span className="flex items-center gap-1.5">
                              {i === 0 && <span className="text-green-600 font-bold">↓ Cheapest</span>}
                              {i === comparisons.length - 1 && <span className="text-red-500 font-bold">↑ Most expensive</span>}
                              {i !== 0 && i !== comparisons.length - 1 && <span className="w-16" />}
                              <span className="font-medium">{c.label}</span>
                            </span>
                            <span className="font-mono font-semibold">
                              {formatCurrency(c.monthly, c.currency, getCurrencySymbol(c.currency))}/mo
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${maxComparison > 0 ? (c.monthly / maxComparison) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
                <div className="text-3xl mb-3">☁️</div>
                <p className="text-sm">Configure your infrastructure on the left to see cost estimates.</p>
                <p className="text-xs mt-2">Try one of the quick presets to get started instantly.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CloudCostCalculatorSEO />

      <RelatedTools
        currentTool="cloud-cost-calculator"
        tools={[
          "ai-token-cost-calculator",
          "download-time-calculator",
          "latency-calculator",
          "bandwidth-calculator",
          "data-transfer-calculator",
          "time-complexity-calculator",
        ]}
      />
    </>
  );
}
