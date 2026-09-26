"use client";

import { useMemo, useState } from "react";
import type { UnitSystem, SoilClass, FootingKind, FoundationInputs, CalculationHistory } from "./types";
import {
  SOIL_PRESETS,
  calculateFoundation,
  formatLength,
  formatNumber,
  bearingUnit,
  loadUnit,
  PSF_TO_KPA,
  IN_TO_MM,
  PLF_TO_KN_PER_M,
  LBF_TO_KN,
  getHistory,
  saveToHistory,
  clearHistory,
  exportToText,
  downloadFile,
} from "./logic";
import FoundationDepthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

/* Quick picks spanning common US frost depths (southern states ~12 in,
   northern states 42–60 in). The local value always wins. */
const FROST_PRESETS_IN = [12, 24, 36, 42, 48, 60];
const FROST_PRESETS_MM = [300, 600, 900, 1200, 1500];

const inputClass =
  "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
const chipClass =
  "px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors";

/* Converting typed values when the unit system changes, so 36 in does not
   silently become 36 mm. */
const convert = (value: string, factor: number, decimals: number) => {
  const n = parseFloat(value);
  return value === "" || isNaN(n) ? value : String(+(n * factor).toFixed(decimals));
};

export default function FoundationDepthCalculatorUI() {
  const [system, setSystem] = useState<UnitSystem>("imperial");
  const [kind, setKind] = useState<FootingKind>("wall");
  const [soil, setSoil] = useState<SoilClass>("sand");
  const [frostDepth, setFrostDepth] = useState("");
  const [load, setLoad] = useState("");
  const [customBearing, setCustomBearing] = useState("");
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  const imperial = system === "imperial";

  const inputs: FoundationInputs | null = useMemo(() => {
    const frost = parseFloat(frostDepth);
    if (isNaN(frost) || frost < 0) return null;
    const l = parseFloat(load);
    const c = parseFloat(customBearing);
    return {
      system, kind, soil, frostDepth: frost,
      load: isNaN(l) || l <= 0 ? undefined : l,
      customBearing: isNaN(c) ? undefined : c,
    };
  }, [system, kind, soil, frostDepth, load, customBearing]);

  const result = useMemo(() => (inputs ? calculateFoundation(inputs) : null), [inputs]);

  const handleSystemChange = (next: UnitSystem) => {
    if (next === system) return;
    const toMetric = next === "metric";
    setFrostDepth(v => convert(v, toMetric ? IN_TO_MM : 1 / IN_TO_MM, toMetric ? 0 : 2));
    // plf ↔ kN/m and lb ↔ kN
    const loadFactor = kind === "wall" ? PLF_TO_KN_PER_M : LBF_TO_KN;
    setLoad(v => convert(v, toMetric ? loadFactor : 1 / loadFactor, toMetric ? 2 : 0));
    setCustomBearing(v => convert(v, toMetric ? PSF_TO_KPA : 1 / PSF_TO_KPA, toMetric ? 1 : 0));
    setSystem(next);
  };

  const handleExample = () => {
    // A two-story wood-frame wall on silty sand in a 36 in frost zone
    setKind("wall");
    setSoil("sand");
    setFrostDepth(imperial ? "36" : "915");
    setLoad(imperial ? "2800" : "40.9");
  };

  const handleReset = () => {
    setFrostDepth("");
    setLoad("");
    setCustomBearing("");
  };

  const summary = () =>
    result
      ? `Minimum depth to bottom of footing: ${formatLength(result.minDepth, system)}` +
        (result.width !== undefined
          ? ` | ${kind === "wall" ? "Minimum footing width" : "Minimum footing side"}: ${formatLength(result.width, system)}`
          : "")
      : "";

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(summary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!inputs || !result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleToggleHistory = () => {
    if (!showHistory) setHistory(getHistory());
    setShowHistory(!showHistory);
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: CalculationHistory) => {
    const i = entry.inputs;
    setSystem(i.system);
    setKind(i.kind);
    setSoil(i.soil);
    setFrostDepth(String(i.frostDepth));
    setLoad(i.load !== undefined ? String(i.load) : "");
    setCustomBearing(i.customBearing !== undefined ? String(i.customBearing) : "");
    setShowHistory(false);
  };

  const lengthUnit = imperial ? "in" : "mm";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⬇️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Foundation Depth Calculator</h3>
              <p className="text-sm text-blue-800">
                Find how deep a footing must go (frost line or the 12 in minimum) and how wide it must be for its load,
                using the IRC presumptive soil bearing values — or the value from your soils report.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["imperial", "metric"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => handleSystemChange(s)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        system === s ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {s === "imperial" ? "US (in, psf)" : "Metric (mm, kPa)"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Footing Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["wall", "column"] as const).map(k => (
                    <button
                      key={k}
                      onClick={() => { setKind(k); setLoad(""); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        kind === k ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {k === "wall" ? "Wall (continuous)" : "Column (square)"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleExample} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  ⚙️ Load an Example
                </button>
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
                </button>
                <button onClick={handleToggleHistory} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Minimum Depth to Bottom of Footing
                  </p>
                  <div className="text-3xl font-bold">{formatLength(result.minDepth, system)}</div>
                  <p className="text-sm text-primary-100 mt-1">
                    {result.depthGovernedBy === "frost" ? "Governed by frost depth" : "Governed by the 12 in code minimum"}
                  </p>
                </div>

                {result.width !== undefined && (
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                      {kind === "wall" ? "Minimum Footing Width" : "Minimum Footing Size (square)"}
                    </p>
                    <div className="text-3xl font-bold">
                      {kind === "wall" ? formatLength(result.width, system) : `${formatLength(result.width, system)} × same`}
                    </div>
                    <p className="text-sm text-primary-100 mt-1">
                      {result.widthGovernedBy === "load" ? "Governed by load ÷ bearing" : "Governed by the 12 in minimum width"}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Allowable bearing:</span>
                    <span className="font-semibold">{formatNumber(result.bearing, imperial ? 0 : 1)} {bearingUnit(system)}</span>
                  </div>
                  {result.area !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Required area:</span>
                      <span className="font-semibold">{formatNumber(result.area)} {imperial ? "ft²" : "m²"}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    {copied ? "✓ Copied" : "📋 Copy Result"}
                  </button>
                  <button onClick={handleSave} className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                    💾 Save to History
                  </button>
                  <button
                    onClick={() => inputs && downloadFile(exportToText(inputs, result), "foundation_depth.txt")}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
                  >
                    📄 Export as Text
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Inputs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Site & Load</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Frost Depth ({lengthUnit})
                </label>
                <input
                  type="number"
                  value={frostDepth}
                  onChange={e => setFrostDepth(e.target.value)}
                  className={inputClass}
                  placeholder={imperial ? "e.g. 36" : "e.g. 900"}
                  min="0"
                  step={imperial ? "1" : "10"}
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(imperial ? FROST_PRESETS_IN : FROST_PRESETS_MM).map(v => (
                    <button key={v} type="button" onClick={() => setFrostDepth(String(v))} className={chipClass}>
                      {v} {lengthUnit}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Ask your building department — it is set locally (IRC Table R301.2(1)). Enter 0 where frost does not apply.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {kind === "wall" ? "Wall Load per Length" : "Column Load"} ({loadUnit(system, kind)}) <span className="font-normal text-gray-400">— optional, for footing size</span>
                </label>
                <input
                  type="number"
                  value={load}
                  onChange={e => setLoad(e.target.value)}
                  className={inputClass}
                  placeholder={kind === "wall" ? (imperial ? "e.g. 2800" : "e.g. 40") : (imperial ? "e.g. 20000" : "e.g. 90")}
                  min="0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Total service load (dead + live) {kind === "wall" ? "carried by each foot/metre of wall" : "on the column"}.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Soil</h3>
              <p className="text-xs text-gray-500 mb-4">Presumptive allowable bearing, IRC Table R401.4.1 — use when you have no soils report.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {SOIL_PRESETS.map(p => (
                  <button
                    key={p.soil}
                    onClick={() => setSoil(p.soil)}
                    className={`text-left p-3 rounded-lg border-2 transition-colors ${
                      soil === p.soil ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between gap-2">
                      <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {imperial ? `${p.psf.toLocaleString()} psf` : `${formatNumber(p.psf * PSF_TO_KPA, 1)} kPa`}
                      </span>
                    </div>
                    {p.uscs !== "—" && <div className="text-xs text-gray-500 mt-0.5">{p.uscs}</div>}
                  </button>
                ))}
                <button
                  onClick={() => setSoil("custom")}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${
                    soil === "custom" ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-900">From a soils report</span>
                  <div className="text-xs text-gray-500 mt-0.5">Enter the allowable bearing pressure</div>
                </button>
              </div>
              {soil === "custom" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allowable Bearing ({bearingUnit(system)})</label>
                  <input
                    type="number"
                    value={customBearing}
                    onChange={e => setCustomBearing(e.target.value)}
                    className={inputClass}
                    placeholder={imperial ? "e.g. 2500" : "e.g. 120"}
                    min="0"
                  />
                </div>
              )}
            </div>

            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Notes</h3>
                <ul className="space-y-2">
                  {result.notes.map(note => (
                    <li key={note} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-gray-500">
                  A code-minimum estimate for residential work, not a foundation design. A licensed engineer and your
                  building department have the final say.
                </p>
              </div>
            )}

            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-sm text-red-600 hover:text-red-700">Clear</button>
                  )}
                </div>
                {history.length === 0 ? (
                  <p className="text-sm text-gray-500">No saved calculations yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {history.map(entry => (
                      <li key={entry.id}>
                        <button
                          onClick={() => loadFromHistory(entry)}
                          className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                        >
                          <span className="font-semibold">{formatLength(entry.result.minDepth, entry.result.system)}</span>
                          {entry.result.width !== undefined && <> · {formatLength(entry.result.width, entry.result.system)} wide</>}
                          <span className="block text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedStrip />
      <FoundationDepthCalculatorSEO />
      <RelatedTools />
    </>
  );
}
