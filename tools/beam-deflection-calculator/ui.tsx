"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BeamInputs, BeamResult, SectionType, HistoryEntry } from "./types";
import {
  calculate,
  validateInputs,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  calcMomentOfInertia,
  sectionLabel,
  MATERIALS,
  PRESETS,
  DEFAULT_INPUTS,
} from "./logic";
import BeamDeflectionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── SVG Beam Diagram ──────────────────────────────────────────────────────
function BeamDiagram({ inputs, result }: { inputs: BeamInputs; result: BeamResult | null }) {
  const W = 560, H = 160;
  const beamY = 90, beamX1 = 50, beamX2 = W - 50;
  const beamLen = beamX2 - beamX1;
  const bt = inputs.beamType;
  const lt = inputs.loadType;
  const L = parseFloat(inputs.length) || 1;
  const a = parseFloat(inputs.loadPosition) || L / 2;
  const loadX = beamX1 + (a / L) * beamLen;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label="Beam diagram">
      <defs>
        <marker id="bd-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#EF4444" />
        </marker>
        <marker id="bd-react" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <polygon points="0 0, 8 4, 0 8" fill="#058554" />
        </marker>
      </defs>

      {/* Beam */}
      <rect x={beamX1} y={beamY - 6} width={beamLen} height={12} rx="2" fill="#374151" />

      {/* Supports */}
      {(bt === "simply-supported" || bt === "overhanging") && (
        <>
          <polygon points={`${beamX1},${beamY + 6} ${beamX1 - 12},${beamY + 26} ${beamX1 + 12},${beamY + 26}`} fill="#374151" />
          <line x1={beamX1 - 14} y1={beamY + 28} x2={beamX1 + 14} y2={beamY + 28} stroke="#374151" strokeWidth="2" />
          <circle cx={beamX2} cy={beamY + 16} r="10" fill="none" stroke="#374151" strokeWidth="2" />
          <line x1={beamX2 - 14} y1={beamY + 28} x2={beamX2 + 14} y2={beamY + 28} stroke="#374151" strokeWidth="2" />
        </>
      )}
      {bt === "cantilever" && (
        <>
          <rect x={beamX1 - 18} y={beamY - 22} width={18} height={44} fill="#374151" rx="2" />
          {[0, 10, 20, 30, 40].map(i => (
            <line key={i} x1={beamX1 - 18} y1={beamY - 20 + i} x2={beamX1 - 28} y2={beamY - 10 + i} stroke="#374151" strokeWidth="1.5" />
          ))}
        </>
      )}
      {bt === "fixed" && (
        <>
          <rect x={beamX1 - 18} y={beamY - 22} width={18} height={44} fill="#374151" rx="2" />
          {[0, 10, 20, 30, 40].map(i => (
            <line key={i} x1={beamX1 - 18} y1={beamY - 20 + i} x2={beamX1 - 28} y2={beamY - 10 + i} stroke="#374151" strokeWidth="1.5" />
          ))}
          <rect x={beamX2} y={beamY - 22} width={18} height={44} fill="#374151" rx="2" />
          {[0, 10, 20, 30, 40].map(i => (
            <line key={i} x1={beamX2 + 18} y1={beamY - 20 + i} x2={beamX2 + 28} y2={beamY - 10 + i} stroke="#374151" strokeWidth="1.5" />
          ))}
        </>
      )}

      {/* Loads */}
      {(lt === "point-center") && (
        <>
          <line x1={(beamX1 + beamX2) / 2} y1={beamY - 40} x2={(beamX1 + beamX2) / 2} y2={beamY - 8} stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#bd-arrow)" />
          <text x={(beamX1 + beamX2) / 2} y={beamY - 46} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">P</text>
        </>
      )}
      {lt === "point-any" && (
        <>
          <line x1={loadX} y1={beamY - 40} x2={loadX} y2={beamY - 8} stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#bd-arrow)" />
          <text x={loadX} y={beamY - 46} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">P</text>
        </>
      )}
      {lt === "udl" && (
        <>
          <line x1={beamX1} y1={beamY - 32} x2={beamX2} y2={beamY - 32} stroke="#EF4444" strokeWidth="1.5" />
          {Array.from({ length: 9 }, (_, i) => {
            const xi = beamX1 + ((i + 1) / 10) * beamLen;
            return <line key={i} x1={xi} y1={beamY - 32} x2={xi} y2={beamY - 8} stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#bd-arrow)" />;
          })}
          <text x={(beamX1 + beamX2) / 2} y={beamY - 38} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">w</text>
        </>
      )}
      {lt === "moment" && (
        <>
          <path d={`M ${(beamX1 + beamX2) / 2 - 18},${beamY - 20} A 18 18 0 1 1 ${(beamX1 + beamX2) / 2 + 18},${beamY - 20}`} fill="none" stroke="#EF4444" strokeWidth="2" markerEnd="url(#bd-arrow)" />
          <text x={(beamX1 + beamX2) / 2} y={beamY - 46} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">M</text>
        </>
      )}

      {/* Reaction arrows */}
      {result && (
        <>
          <line x1={beamX1} y1={beamY + 50} x2={beamX1} y2={beamY + 8} stroke="#058554" strokeWidth="2" markerEnd="url(#bd-react)" />
          <text x={beamX1} y={beamY + 64} textAnchor="middle" fill="#058554" fontSize="10">R_A</text>
          {result.reactionB !== null && (
            <>
              <line x1={beamX2} y1={beamY + 50} x2={beamX2} y2={beamY + 8} stroke="#058554" strokeWidth="2" markerEnd="url(#bd-react)" />
              <text x={beamX2} y={beamY + 64} textAnchor="middle" fill="#058554" fontSize="10">R_B</text>
            </>
          )}
        </>
      )}

      {/* Dimension line */}
      <line x1={beamX1} y1={H - 10} x2={beamX2} y2={H - 10} stroke="#9CA3AF" strokeWidth="1" markerStart="url(#bd-react)" markerEnd="url(#bd-arrow)" />
      <text x={(beamX1 + beamX2) / 2} y={H - 2} textAnchor="middle" fill="#6B7280" fontSize="10">
        L = {inputs.length} {inputs.unitSystem === "metric" ? "m" : "ft"}
      </text>
    </svg>
  );
}

// ── Deflection Curve SVG ──────────────────────────────────────────────────
function DeflectionCurve({ curve, label, color }: {
  curve: { x: number; y: number }[];
  label: string;
  color: string;
}) {
  const W = 400, H = 100, pad = 20;
  const plotW = W - pad * 2, plotH = H - pad * 2;

  const minY = Math.min(...curve.map(p => p.y));
  const maxY = Math.max(...curve.map(p => p.y));
  const rangeY = maxY - minY || 1;

  const toSvg = (p: { x: number; y: number }) => ({
    sx: pad + p.x * plotW,
    sy: pad + plotH / 2 - (p.y / rangeY) * (plotH / 2) * 0.85,
  });

  const pathD = curve.map((p, i) => {
    const { sx, sy } = toSvg(p);
    return `${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
  }).join(" ");

  const fillD = pathD + ` L ${(pad + plotW).toFixed(1)} ${(pad + plotH / 2).toFixed(1)} L ${pad} ${(pad + plotH / 2).toFixed(1)} Z`;

  return (
    <div>
      <p className="text-xs font-semibold text-gray-600 mb-1">{label}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-gray-50 rounded border border-gray-200">
        {/* Baseline */}
        <line x1={pad} y1={pad + plotH / 2} x2={pad + plotW} y2={pad + plotH / 2} stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 3" />
        {/* Fill */}
        <path d={fillD} fill={color} fillOpacity="0.12" />
        {/* Curve */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── Section Inputs ────────────────────────────────────────────────────────
function SectionInputs({
  sectionType, section, onChange,
}: {
  sectionType: SectionType;
  section: BeamInputs["section"];
  onChange: (s: BeamInputs["section"]) => void;
}) {
  const inp = (label: string, key: keyof BeamInputs["section"], placeholder: string) => (
    <div key={key}>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type="number"
        value={section[key] ?? ""}
        onChange={e => onChange({ ...section, [key]: parseFloat(e.target.value) || 0 })}
        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
        placeholder={placeholder}
        min="0"
        step="any"
      />
    </div>
  );

  if (sectionType === "rectangle") return (
    <div className="grid grid-cols-2 gap-3">
      {inp("Width (b)", "width", "4")}
      {inp("Height (h)", "height", "6")}
    </div>
  );
  if (sectionType === "circle") return (
    <div>{inp("Diameter (d)", "diameter", "4")}</div>
  );
  if (sectionType === "i-beam") return (
    <div className="grid grid-cols-2 gap-3">
      {inp("Flange Width", "flangeWidth", "6")}
      {inp("Flange Thickness", "flangeThickness", "0.5")}
      {inp("Web Height", "webHeight", "10")}
      {inp("Web Thickness", "webThickness", "0.3")}
    </div>
  );
  if (sectionType === "pipe") return (
    <div className="grid grid-cols-2 gap-3">
      {inp("Outer Diameter", "outerDiameter", "4")}
      {inp("Inner Diameter", "innerDiameter", "3")}
    </div>
  );
  if (sectionType === "custom") return (
    <div>{inp("Moment of Inertia (I)", "customI", "100")}</div>
  );
  return null;
}

// ── Main UI ───────────────────────────────────────────────────────────────
export default function BeamDeflectionCalculatorUI() {
  const [inputs, setInputs] = useState<BeamInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<BeamResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"deflection" | "moment" | "shear">("deflection");
  const lengthRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    lengthRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const err = validateInputs(inputs);
      if (err) { setError(err); setResult(null); return; }
      setError(null);
      try {
        setResult(calculate(inputs));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (patch: Partial<BeamInputs>) => setInputs(p => ({ ...p, ...patch }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
    lengthRef.current?.focus();
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs(prev => ({
      ...prev,
      ...p.inputs,
      loadPosition: String(parseFloat(p.inputs.length) / 2),
      customE: "200",
      precision: prev.precision,
    }));
  };

  const handleCopy = () => {
    if (!result) return;
    const sys = inputs.unitSystem;
    const text = `Max Deflection: ${formatNum(result.maxDeflection, inputs.precision)} ${result.deflectionUnit} | Beam: ${inputs.beamType} | Load: ${inputs.load} | L: ${inputs.length} ${sys === "metric" ? "m" : "ft"}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "beam-deflection-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const sys = inputs.unitSystem;
  const lenUnit = sys === "metric" ? "m" : "ft";
  const forceUnit = sys === "metric" ? "kN" : "kip";
  const udlUnit = sys === "metric" ? "kN/m" : "kip/ft";
  const eUnit = sys === "metric" ? "GPa" : "ksi";
  const iUnit = sys === "metric" ? "mm⁴" : "in⁴";
  const isUDL = inputs.loadType === "udl";
  const isMoment = inputs.loadType === "moment";
  const loadLabel = isUDL ? udlUnit : isMoment ? (sys === "metric" ? "kN·m" : "kip·ft") : forceUnit;
  const showPosition = inputs.loadType === "point-any";
  const I = calcMomentOfInertia(inputs.sectionType, inputs.section);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Beam Deflection Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate beam deflection, slope, reactions, bending moment, and shear force using Euler–Bernoulli beam theory. Supports multiple beam types, materials, and cross-sections.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Max Deflection
              </p>
              <div className="text-4xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.maxDeflection, inputs.precision)}` : "—"}
              </div>
              <div className="text-xl text-primary-100 mb-4">
                {result ? result.deflectionUnit : (sys === "metric" ? "mm" : "in")}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slope</span>
                    <span className="font-semibold">{formatNum(result.slope, 6)} rad</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Reaction A</span>
                    <span className="font-semibold">{formatNum(result.reactionA, inputs.precision)} {forceUnit}</span>
                  </div>
                  {result.reactionB !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Reaction B</span>
                      <span className="font-semibold">{formatNum(result.reactionB, inputs.precision)} {forceUnit}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Moment</span>
                    <span className="font-semibold">{formatNum(result.maxMoment, inputs.precision)} {sys === "metric" ? "kN·m" : "kip·ft"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Max Shear</span>
                    <span className="font-semibold">{formatNum(result.maxShear, inputs.precision)} {forceUnit}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!result}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Save to History
                </button>
              </div>
            </div>

            {/* Safety Note */}
            {result && (
              <div className={`rounded-xl p-4 border text-sm ${result.safetyNote.startsWith("✓") ? "bg-green-50 border-green-200 text-green-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                {result.safetyNote}
              </div>
            )}

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>

              {/* Unit System */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["metric", "imperial"] as const).map(u => (
                    <button
                      key={u}
                      onClick={() => set({ unitSystem: u })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unitSystem === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      {u === "metric" ? "Metric" : "Imperial"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precision */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={e => set({ precision: parseInt(e.target.value) as 2 | 4 | 6 })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">↺ Reset</button>
              <button onClick={() => setShowFormula(!showFormula)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showFormula ? "Hide" : "Show"} Formula
              </button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📄 Export TXT
                </button>
              )}
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Beam Configuration */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Beam Configuration</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Beam Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beam Type</label>
                  <select
                    value={inputs.beamType}
                    onChange={e => set({ beamType: e.target.value as BeamInputs["beamType"] })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="simply-supported">Simply Supported</option>
                    <option value="cantilever">Cantilever</option>
                    <option value="fixed">Fixed (Both Ends)</option>
                    <option value="overhanging">Overhanging</option>
                  </select>
                </div>

                {/* Load Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Load Type</label>
                  <select
                    value={inputs.loadType}
                    onChange={e => set({ loadType: e.target.value as BeamInputs["loadType"] })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="point-center">Point Load (Center)</option>
                    <option value="point-any">Point Load (Any Position)</option>
                    <option value="udl">Uniformly Distributed Load (UDL)</option>
                    <option value="moment">Applied Moment</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Beam Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beam Length ({lenUnit})</label>
                  <input
                    ref={lengthRef}
                    type="number"
                    value={inputs.length}
                    onChange={e => set({ length: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="any"
                    aria-label="Beam length"
                  />
                </div>

                {/* Load Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isUDL ? "Distributed Load" : isMoment ? "Applied Moment" : "Point Load"} ({loadLabel})
                  </label>
                  <input
                    type="number"
                    value={inputs.load}
                    onChange={e => set({ load: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="any"
                    aria-label="Load value"
                  />
                </div>
              </div>

              {/* Load Position */}
              {showPosition && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load Position from Left ({lenUnit}) — 0 to {inputs.length || "L"}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={0}
                      max={parseFloat(inputs.length) || 10}
                      step={0.1}
                      value={parseFloat(inputs.loadPosition) || 0}
                      onChange={e => set({ loadPosition: e.target.value })}
                      className="w-full accent-primary"
                      aria-label="Load position slider"
                    />
                    <input
                      type="number"
                      value={inputs.loadPosition}
                      onChange={e => set({ loadPosition: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                      placeholder="5"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Material & Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Material & Cross-Section</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Material */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                  <select
                    value={inputs.material}
                    onChange={e => set({ material: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {Object.entries(MATERIALS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}{k !== "custom" ? ` (E = ${v.E_GPa} GPa)` : ""}</option>
                    ))}
                  </select>
                </div>

                {/* Custom E */}
                {inputs.material === "custom" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Elastic Modulus E ({eUnit})</label>
                    <input
                      type="number"
                      value={inputs.customE}
                      onChange={e => set({ customE: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="200"
                      min="0"
                      step="any"
                    />
                  </div>
                )}

                {/* Section Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cross-Section</label>
                  <select
                    value={inputs.sectionType}
                    onChange={e => set({ sectionType: e.target.value as SectionType, section: {} })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {(["rectangle", "circle", "i-beam", "pipe", "custom"] as SectionType[]).map(t => (
                      <option key={t} value={t}>{sectionLabel(t)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Dimensions {inputs.sectionType !== "custom" ? `(${sys === "metric" ? "mm" : "in"})` : `(${iUnit})`}
                </label>
                <SectionInputs
                  sectionType={inputs.sectionType}
                  section={inputs.section}
                  onChange={s => set({ section: s })}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Calculated I = <span className="font-mono font-semibold text-primary">{I.toExponential(3)}</span> {iUnit}
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span>⚠️</span>
                  <span className="font-medium text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Beam Diagram */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Beam Diagram</h3>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <BeamDiagram inputs={inputs} result={result} />
              </div>
            </div>

            {/* Deflection / Moment / Shear Curves */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Diagrams</h3>
                  <div className="flex gap-1">
                    {(["deflection", "moment", "shear"] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${activeTab === tab ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                {activeTab === "deflection" && (
                  <DeflectionCurve curve={result.deflectionCurve} label="Deflection Curve" color="#058554" />
                )}
                {activeTab === "moment" && (
                  <DeflectionCurve curve={result.momentCurve} label="Bending Moment Diagram" color="#3B82F6" />
                )}
                {activeTab === "shear" && (
                  <DeflectionCurve curve={result.shearCurve} label="Shear Force Diagram" color="#F59E0B" />
                )}
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Calculation Steps</h3>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 border border-gray-200">
                  {result.steps.map((step, i) => (
                    <div key={i} className="text-gray-700">{step}</div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <div className="font-semibold text-blue-800 text-xs uppercase mb-1">E (Elastic Modulus)</div>
                    <div className="text-blue-700 text-xs">Stiffness of material. Higher E = less deflection.</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                    <div className="font-semibold text-orange-800 text-xs uppercase mb-1">I (Moment of Inertia)</div>
                    <div className="text-orange-700 text-xs">Resistance to bending. Depends on cross-section shape.</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                    <div className="font-semibold text-purple-800 text-xs uppercase mb-1">L (Beam Length)</div>
                    <div className="text-purple-700 text-xs">Deflection scales with L³ or L⁴ — length has huge impact.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Results Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Max Deflection</div>
                    <div className="text-lg font-bold text-green-900">{formatNum(result.maxDeflection, inputs.precision)}</div>
                    <div className="text-xs text-green-700">{result.deflectionUnit}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Max Moment</div>
                    <div className="text-lg font-bold text-blue-900">{formatNum(result.maxMoment, inputs.precision)}</div>
                    <div className="text-xs text-blue-700">{sys === "metric" ? "kN·m" : "kip·ft"}</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-xs text-amber-600 uppercase tracking-wider mb-1">Max Shear</div>
                    <div className="text-lg font-bold text-amber-900">{formatNum(result.maxShear, inputs.precision)}</div>
                    <div className="text-xs text-amber-700">{forceUnit}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reaction A</div>
                    <div className="text-lg font-bold text-gray-900">{formatNum(result.reactionA, inputs.precision)}</div>
                    <div className="text-xs text-gray-600">{forceUnit}</div>
                  </div>
                  {result.reactionB !== null && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reaction B</div>
                      <div className="text-lg font-bold text-gray-900">{formatNum(result.reactionB, inputs.precision)}</div>
                      <div className="text-xs text-gray-600">{forceUnit}</div>
                    </div>
                  )}
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Slope</div>
                    <div className="text-lg font-bold text-purple-900">{formatNum(result.slope, 6)}</div>
                    <div className="text-xs text-purple-700">radians</div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handlePreset(p)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{p.label}</div>
                    <div className="text-xs text-primary font-medium mt-1">
                      {p.inputs.beamType} · {p.inputs.loadType} · {p.inputs.material}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map(entry => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {formatNum(entry.result.maxDeflection, 2)} {entry.result.deflectionUnit}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {entry.inputs.beamType} · L={entry.inputs.length} {entry.inputs.unitSystem === "metric" ? "m" : "ft"} · {entry.inputs.material}
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

      <BeamDeflectionCalculatorSEO />
      <RelatedTools
        currentTool="beam-deflection-calculator"
        tools={["beam-load-calculator", "torque-calculator", "force-calculator", "spring-force-calculator", "bending-stress-calculator", "shear-force-calculator"]}
      />
    </>
  );
}
