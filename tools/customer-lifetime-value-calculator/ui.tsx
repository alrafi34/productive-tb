"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  calculateCLV, validateInputs, formatCurrency, formatNumber, parseNum,
  saveHistory, getHistory, clearHistory, debounce, buildShareUrl, parseShareParams,
  CURRENCIES, MODE_LABELS,
  type CalcMode, type CLVInputs, type CLVResult, type HistoryEntry, type ValidationErrors,
} from "./logic";
import CLVCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; inputs: Partial<Record<string, string>> & { mode: CalcMode } }[] = [
  { label: "Ecommerce",    inputs: { mode: "basic",        aov: "80",  frequency: "10", lifespan: "4" } },
  { label: "Retail",       inputs: { mode: "basic",        aov: "150", frequency: "3",  lifespan: "6" } },
  { label: "Subscription", inputs: { mode: "subscription", monthlyRevenue: "49", lifetimeMonths: "24", grossMargin: "80" } },
  { label: "SaaS SMB",     inputs: { mode: "saas",         arpu: "99",  churnRate: "3",  grossMargin: "75" } },
  { label: "SaaS Enterprise", inputs: { mode: "saas",      arpu: "500", churnRate: "1",  grossMargin: "80" } },
];

const PERF_STYLES: Record<CLVResult["performanceLevel"], { bg: string; text: string; border: string; dot: string }> = {
  excellent: { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  good:      { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"   },
  average:   { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  low:       { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-400" },
  "very-low":{ bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500"    },
};

export default function CLVCalculatorUI() {
  const [mode, setMode]           = useState<CalcMode>("basic");
  const [currency, setCurrency]   = useState("USD");
  // Basic / Margin fields
  const [aov, setAov]             = useState("80");
  const [frequency, setFrequency] = useState("10");
  const [lifespan, setLifespan]   = useState("4");
  const [grossMargin, setMargin]  = useState("100");
  // Subscription fields
  const [monthlyRev, setMonthlyRev]   = useState("49");
  const [lifetimeMonths, setLtMonths] = useState("24");
  // SaaS fields
  const [arpu, setArpu]           = useState("99");
  const [churnRate, setChurn]     = useState("3");
  // Optional cross-method
  const [cac, setCac]             = useState("");

  const [result, setResult]       = useState<CLVResult | null>(null);
  const [errors, setErrors]       = useState<ValidationErrors>({});
  const [copied, setCopied]       = useState(false);
  const [shareCopied, setShare]   = useState(false);
  const [showHistory, setShowHist]= useState(false);
  const [history, setHistData]    = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistData(getHistory());
    const shared = parseShareParams();
    if (shared) {
      if (shared.mode) setMode(shared.mode as CalcMode);  // eslint-disable-line
      if (shared.currency) setCurrency(shared.currency);
      if (shared.aov) setAov(shared.aov);
      if (shared.freq) setFrequency(shared.freq);
      if (shared.life) setLifespan(shared.life);
      if (shared.gm) setMargin(shared.gm);
      if (shared.mr) setMonthlyRev(shared.mr);
      if (shared.lm) setLtMonths(shared.lm);
      if (shared.arpu) setArpu(shared.arpu);
      if (shared.churn) setChurn(shared.churn);
      if (shared.cac) setCac(shared.cac);
    } else {
      firstRef.current?.focus();
    }
  }, []);

  const run = useCallback(
    debounce((
      m: CalcMode, cur: string,
      _aov: string, _freq: string, _life: string, _gm: string,
      _mr: string, _lm: string, _arpu: string, _churn: string, _cac: string
    ) => {
      const fields = { aov: _aov, frequency: _freq, lifespan: _life, grossMargin: _gm,
                       monthlyRevenue: _mr, lifetimeMonths: _lm, arpu: _arpu, churnRate: _churn };
      const errs = validateInputs(m, fields);
      setErrors(errs);
      if (Object.keys(errs).length > 0) { setResult(null); return; }

      const cacVal = _cac.trim() ? parseNum(_cac) ?? undefined : undefined;
      const inputs: CLVInputs = {
        mode: m, currency: cur,
        aov: parseNum(_aov) ?? undefined,
        frequency: parseNum(_freq) ?? undefined,
        lifespan: parseNum(_life) ?? undefined,
        grossMargin: parseNum(_gm) ?? undefined,
        monthlyRevenue: parseNum(_mr) ?? undefined,
        lifetimeMonths: parseNum(_lm) ?? undefined,
        arpu: parseNum(_arpu) ?? undefined,
        churnRate: parseNum(_churn) ?? undefined,
        cac: cacVal,
      };
      setResult(calculateCLV(inputs));
    }, 130),
    []
  );

  useEffect(() => {
    run(mode, currency, aov, frequency, lifespan, grossMargin, monthlyRev, lifetimeMonths, arpu, churnRate, cac);
  }, [mode, currency, aov, frequency, lifespan, grossMargin, monthlyRev, lifetimeMonths, arpu, churnRate, cac, run]);

  const applyPreset = (p: typeof PRESETS[0]) => {
    const { mode: m, aov: a, frequency: f, lifespan: l, monthlyRevenue: mr,
            lifetimeMonths: lm, arpu: ar, churnRate: ch, grossMargin: gm } = p.inputs as Record<string, string> & { mode: CalcMode };
    setMode(m as CalcMode);
    if (a)  setAov(a);       if (f)  setFrequency(f);  if (l)  setLifespan(l);
    if (mr) setMonthlyRev(mr); if (lm) setLtMonths(lm);
    if (ar) setArpu(ar);     if (ch) setChurn(ch);
    if (gm) setMargin(gm);
    firstRef.current?.focus();
  };

  const handleReset = () => {
    setMode("basic"); setAov("80"); setFrequency("10"); setLifespan("4");
    setMargin("100"); setMonthlyRev("49"); setLtMonths("24");
    setArpu("99"); setChurn("3"); setCac("");
    setResult(null); setErrors({}); firstRef.current?.focus();
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.clvFormatted);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = () => {
    if (!result) return;
    const lines = [
      "CLV Calculator Report", "======================",
      `Method:         ${result.modeLabel}`,
      `CLV:            ${result.clvFormatted}`,
      `Annual Value:   ${formatCurrency(result.annualValue, result.currency)}`,
      `Monthly Value:  ${formatCurrency(result.monthlyValue, result.currency)}`,
      result.netCLV !== null ? `Net CLV (after CAC): ${formatCurrency(result.netCLV, result.currency)}` : "",
      result.paybackMonths !== null ? `CAC Payback:    ${result.paybackMonths.toFixed(1)} months` : "",
      `Assessment:     ${result.performanceLabel}`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const text = [
      "Customer Lifetime Value (CLV) Report", "=====================================", "",
      `Calculation Method: ${result.modeLabel}`,
      `Formula: ${result.formula}`, "",
      `CLV:           ${result.clvFormatted}`,
      `Annual Value:  ${formatCurrency(result.annualValue, result.currency)}`,
      `Monthly Value: ${formatCurrency(result.monthlyValue, result.currency)}`,
      result.netCLV !== null ? `Net CLV (after CAC): ${formatCurrency(result.netCLV, result.currency)}` : "",
      result.paybackMonths !== null ? `CAC Payback Period: ${result.paybackMonths.toFixed(1)} months` : "",
      "", `Assessment: ${result.performanceLabel}`, "", result.interpretation, "",
      "Generated by Productive Toolbox",
    ].filter((l) => l !== null && l !== undefined).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `clv_${result.mode}.txt`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCsv = () => {
    if (!result) return;
    const csv = [
      "Method,CLV,Annual Value,Monthly Value,Net CLV,Payback Months,Assessment",
      [result.modeLabel, result.clvFormatted,
       formatCurrency(result.annualValue, result.currency),
       formatCurrency(result.monthlyValue, result.currency),
       result.netCLV !== null ? formatCurrency(result.netCLV, result.currency) : "N/A",
       result.paybackMonths !== null ? result.paybackMonths.toFixed(1) : "N/A",
       result.performanceLabel].join(","),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `clv_${result.mode}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleShare = () => {
    if (!result) return;
    const cacVal = cac.trim() ? parseNum(cac) ?? undefined : undefined;
    const inputs: CLVInputs = {
      mode, currency,
      aov: parseNum(aov) ?? undefined, frequency: parseNum(frequency) ?? undefined,
      lifespan: parseNum(lifespan) ?? undefined, grossMargin: parseNum(grossMargin) ?? undefined,
      monthlyRevenue: parseNum(monthlyRev) ?? undefined, lifetimeMonths: parseNum(lifetimeMonths) ?? undefined,
      arpu: parseNum(arpu) ?? undefined, churnRate: parseNum(churnRate) ?? undefined, cac: cacVal,
    };
    navigator.clipboard.writeText(buildShareUrl(inputs));
    setShare(true); setTimeout(() => setShare(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    const cacVal = cac.trim() ? parseNum(cac) ?? undefined : undefined;
    saveHistory({ inputs: { mode, currency, aov: parseNum(aov) ?? undefined, frequency: parseNum(frequency) ?? undefined,
      lifespan: parseNum(lifespan) ?? undefined, grossMargin: parseNum(grossMargin) ?? undefined,
      monthlyRevenue: parseNum(monthlyRev) ?? undefined, lifetimeMonths: parseNum(lifetimeMonths) ?? undefined,
      arpu: parseNum(arpu) ?? undefined, churnRate: parseNum(churnRate) ?? undefined, cac: cacVal }, result });
    setHistData(getHistory());
  };

  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const perfStyle = result ? PERF_STYLES[result.performanceLevel] : null;
  const hasErrors = Object.keys(errors).length > 0;

  // ── Input helpers ────────────────────────────────────────────────────────
  const inputCls = (err?: string) =>
    `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${err ? "border-red-300" : "border-gray-200"}`;

  const Field = ({
    id, label, value, onChange, err, hint, placeholder, inputMode = "decimal", ref: fRef,
  }: {
    id: string; label: string; value: string; onChange: (v: string) => void;
    err?: string; hint?: string; placeholder?: string; inputMode?: "decimal" | "numeric";
    ref?: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor={id}>{label}</label>
      <input
        ref={fRef as React.RefObject<HTMLInputElement>}
        id={id} type="number" min="0" value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls(err)} placeholder={placeholder ?? "0"}
        inputMode={inputMode} aria-label={label}
      />
      {err  && <p className="text-xs text-red-600 mt-1" role="alert">{err}</p>}
      {!err && hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl mt-0.5">👥</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>
              Customer Lifetime Value (CLV) Calculator
            </h3>
            <p className="text-sm text-blue-700 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              Choose a formula and enter your numbers to instantly calculate CLV. Supports Basic, Margin-Adjusted, Subscription, and SaaS methods. All calculations run locally in your browser.
            </p>
          </div>
        </div>

        {/* Method Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Calculation Method
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(MODE_LABELS) as CalcMode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setErrors({}); }}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                  mode === m
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left column ── */}
          <div className="lg:col-span-4 space-y-5">

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "basic" ? "Business Inputs" :
                 mode === "margin" ? "Business Inputs" :
                 mode === "subscription" ? "Subscription Inputs" : "SaaS Inputs"}
              </h3>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="clv-currency">Currency</label>
                <select id="clv-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                  {Object.entries(CURRENCIES).map(([code, { label }]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Basic fields */}
              {(mode === "basic" || mode === "margin") && (
                <>
                  <Field id="clv-aov" label={`Average Order Value (${sym})`} value={aov}
                    onChange={setAov} err={errors.aov} hint="Avg amount per purchase" placeholder="80" ref={firstRef} />
                  <Field id="clv-freq" label="Purchase Frequency (per year)" value={frequency}
                    onChange={setFrequency} err={errors.frequency} hint="How often per year" placeholder="10" inputMode="numeric" />
                  <Field id="clv-life" label="Customer Lifespan (years)" value={lifespan}
                    onChange={setLifespan} err={errors.lifespan} hint="How many years they stay" placeholder="4" inputMode="numeric" />
                  {mode === "margin" && (
                    <Field id="clv-gm" label="Gross Margin (%)" value={grossMargin}
                      onChange={setMargin} err={errors.grossMargin} hint="Revenue minus cost of goods" placeholder="60" />
                  )}
                </>
              )}

              {/* Subscription fields */}
              {mode === "subscription" && (
                <>
                  <Field id="clv-mr" label={`Monthly Revenue per Customer (${sym})`} value={monthlyRev}
                    onChange={setMonthlyRev} err={errors.monthlyRevenue} hint="Monthly subscription price" placeholder="49" ref={firstRef} />
                  <Field id="clv-lm" label="Customer Lifetime (months)" value={lifetimeMonths}
                    onChange={setLtMonths} err={errors.lifetimeMonths} hint="Average months before churn" placeholder="24" inputMode="numeric" />
                  <Field id="clv-gm-sub" label="Gross Margin (%)" value={grossMargin}
                    onChange={setMargin} err={errors.grossMargin} hint="Revenue minus delivery cost" placeholder="80" />
                </>
              )}

              {/* SaaS fields */}
              {mode === "saas" && (
                <>
                  <Field id="clv-arpu" label={`ARPU – Monthly (${sym})`} value={arpu}
                    onChange={setArpu} err={errors.arpu} hint="Avg revenue per user per month" placeholder="99" ref={firstRef} />
                  <Field id="clv-churn" label="Monthly Churn Rate (%)" value={churnRate}
                    onChange={setChurn} err={errors.churnRate} hint="% of customers lost per month" placeholder="3" />
                  <Field id="clv-gm-saas" label="Gross Margin (%)" value={grossMargin}
                    onChange={setMargin} err={errors.grossMargin} hint="Revenue minus service cost" placeholder="75" />
                </>
              )}

              {/* Optional CAC */}
              <div className="pt-2 border-t border-gray-100">
                <Field id="clv-cac" label={`Customer Acquisition Cost – CAC (${sym})`} value={cac}
                  onChange={setCac} hint="Optional — enables Net CLV & payback period" placeholder="0 (optional)" />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <button onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                Reset
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleDownloadTxt} disabled={!result}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Export TXT
                </button>
                <button onClick={handleDownloadCsv} disabled={!result}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Export CSV
                </button>
              </div>
              <button onClick={() => setShowHist(!showHistory)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                {showHistory ? "Hide" : "Show"} History
              </button>
            </div>

            {/* Result card */}
            <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
              <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Result
              </p>
              {result ? (
                <>
                  <div className="text-4xl font-bold font-mono mb-0.5 tabular-nums">{result.clvFormatted}</div>
                  <div className="text-sm text-primary-100 mb-2">customer lifetime value</div>
                  {perfStyle && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${perfStyle.bg} ${perfStyle.text} ${perfStyle.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${perfStyle.dot}`} />{result.performanceLabel}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Annual Value</span>
                      <span className="font-semibold font-mono">{formatCurrency(result.annualValue, result.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Monthly Value</span>
                      <span className="font-semibold font-mono">{formatCurrency(result.monthlyValue, result.currency)}</span>
                    </div>
                    {result.netCLV !== null && (
                      <div className="flex justify-between">
                        <span className="text-primary-100">Net CLV</span>
                        <span className={`font-semibold font-mono ${result.netCLV < 0 ? "text-red-300" : ""}`}>
                          {formatCurrency(result.netCLV, result.currency)}
                        </span>
                      </div>
                    )}
                    {result.paybackMonths !== null && (
                      <div className="flex justify-between">
                        <span className="text-primary-100">CAC Payback</span>
                        <span className="font-semibold font-mono">{result.paybackMonths.toFixed(1)} mo</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button onClick={handleCopyResult}
                      className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      {copied ? "✓ Copied!" : "Copy CLV"}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleCopyFull}
                        className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">
                        Copy All
                      </button>
                      <button onClick={handleShare}
                        className="border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-xs">
                        {shareCopied ? "✓ Copied!" : "Share URL"}
                      </button>
                    </div>
                    <button onClick={handleSave}
                      className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
                      Save to History
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-primary-100 text-sm">
                  {hasErrors ? "Fix the errors above to calculate" : "Enter values to calculate CLV"}
                </div>
              )}
            </div>

          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Quick Examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Examples
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => applyPreset(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      mode === p.inputs.mode
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interpretation */}
            {result && perfStyle && (
              <div className={`rounded-xl border p-5 ${perfStyle.bg} ${perfStyle.border}`}>
                <p className={`text-xs font-semibold mb-1 ${perfStyle.text}`}>Interpretation</p>
                <p className={`text-sm ${perfStyle.text}`}>{result.interpretation}</p>
              </div>
            )}

            {/* Calculation Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Breakdown
                </h3>
              </div>
              {result ? (
                <>
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Method",        value: result.modeLabel },
                      { label: "Formula",        value: result.formula },
                      { label: "CLV",            value: result.clvFormatted, highlight: true },
                      { label: "Annual Value",   value: formatCurrency(result.annualValue, result.currency) },
                      { label: "Monthly Value",  value: formatCurrency(result.monthlyValue, result.currency) },
                      ...(result.netCLV !== null ? [{ label: "Net CLV (after CAC)", value: formatCurrency(result.netCLV, result.currency) }] : []),
                      ...(result.paybackMonths !== null ? [{ label: "CAC Payback Period", value: `${result.paybackMonths.toFixed(1)} months` }] : []),
                      { label: "Assessment",     value: result.performanceLabel },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className={`text-sm font-semibold font-mono ${highlight ? "text-primary text-base" : "text-gray-900"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {/* Calculation steps */}
                  <div className="px-5 pb-5 pt-2">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Steps</p>
                    <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs space-y-1">
                      {result.steps.map((s, i) => (
                        <div key={i} className="text-gray-700">{s}</div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  {hasErrors ? Object.values(errors)[0] : "Enter values above to see the breakdown"}
                </div>
              )}
            </div>

            {/* Performance Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  CLV Performance Reference
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {([
                  { level: "excellent" as const, label: "Excellent", range: "≥ $5,000",      desc: "Outstanding long-term customer value" },
                  { level: "good"      as const, label: "Good",      range: "$1,000 – $4,999", desc: "Solid value — typical SaaS or high-repeat retail" },
                  { level: "average"   as const, label: "Average",   range: "$300 – $999",    desc: "Mid-range — common across consumer categories" },
                  { level: "low"       as const, label: "Low",       range: "$50 – $299",     desc: "Below average — room to improve retention" },
                  { level: "very-low"  as const, label: "Very Low",  range: "< $50",          desc: "Very low — consider lifecycle improvement" },
                ] as { level: CLVResult["performanceLevel"]; label: string; range: string; desc: string }[]).map(({ level, label, range, desc }) => {
                  const s = PERF_STYLES[level];
                  const isActive = result?.performanceLevel === level;
                  return (
                    <div key={level} className={`flex items-center justify-between px-5 py-3 transition-colors ${isActive ? "bg-primary/5" : "hover:bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text} ${s.border} border`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{label}
                        </span>
                        <span className="text-xs text-gray-500">{desc}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-gray-700">{range}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-50">
                * CLV benchmarks vary significantly by industry and pricing model. Always evaluate in context of your CAC and margin.
              </p>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistData([]); } }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} onClick={() => {
                        setMode(entry.inputs.mode);
                        if (entry.inputs.aov != null)           setAov(String(entry.inputs.aov));
                        if (entry.inputs.frequency != null)     setFrequency(String(entry.inputs.frequency));
                        if (entry.inputs.lifespan != null)      setLifespan(String(entry.inputs.lifespan));
                        if (entry.inputs.grossMargin != null)   setMargin(String(entry.inputs.grossMargin));
                        if (entry.inputs.monthlyRevenue != null)setMonthlyRev(String(entry.inputs.monthlyRevenue));
                        if (entry.inputs.lifetimeMonths != null)setLtMonths(String(entry.inputs.lifetimeMonths));
                        if (entry.inputs.arpu != null)          setArpu(String(entry.inputs.arpu));
                        if (entry.inputs.churnRate != null)     setChurn(String(entry.inputs.churnRate));
                        if (entry.inputs.cac != null)           setCac(String(entry.inputs.cac));
                        setShowHist(false);
                      }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {entry.result.clvFormatted} · {entry.result.modeLabel}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono font-semibold">
                        {entry.result.performanceLabel} · Annual: {formatCurrency(entry.result.annualValue, entry.result.currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <CLVCalculatorSEO />

      <RelatedTools
        currentTool="customer-lifetime-value-calculator"
        tools={[
          "cost-per-acquisition-cpa-calculator",
          "cost-per-click-cpc-calculator",
          "roi-calculator-marketing",
          "conversion-rate-calculator",
          "ctr-calculator",
          "investment-return-calculator",
        ]}
      />
    </>
  );
}
