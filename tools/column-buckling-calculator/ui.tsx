"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BucklingInputs,
  BucklingResult,
  HistoryEntry,
  EndCondition,
  LengthUnit,
  ModulusUnit,
  MoiUnit,
  LoadUnit,
  Precision,
} from "./types";
import {
  calculate,
  validateInputs,
  formatNum,
  getOutputValue,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  K_FACTORS,
  END_CONDITION_LABELS,
  END_CONDITION_DESC,
  MATERIALS,
  LOAD_UNIT_LABELS,
  MOI_UNIT_LABELS,
  LENGTH_UNIT_LABELS,
  MODULUS_UNIT_LABELS,
} from "./logic";
import ColumnBucklingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── End Condition SVG Diagram ──────────────────────────────────────────────────
function EndConditionDiagram({ condition }: { condition: EndCondition }) {
  const W = 200, H = 160;
  const cx = W / 2;
  const colTop = 24, colBot = 136;
  const colH = colBot - colTop;

  const renderSupport = (y: number, type: "pin" | "fixed" | "free") => {
    if (type === "fixed") {
      return (
        <>
          <rect x={cx - 20} y={y - 6} width={40} height={12} fill="#374151" rx="2" />
          {[-16, -8, 0, 8, 16].map((dx) => (
            <line key={dx} x1={cx + dx} y1={y + 6} x2={cx + dx - 6} y2={y + 16} stroke="#6B7280" strokeWidth="1.5" />
          ))}
        </>
      );
    }
    if (type === "pin") {
      return (
        <>
          <polygon points={`${cx},${y} ${cx - 10},${y + 18} ${cx + 10},${y + 18}`} fill="#374151" />
          <line x1={cx - 12} y1={y + 18} x2={cx + 12} y2={y + 18} stroke="#374151" strokeWidth="2" />
        </>
      );
    }
    // free – dashed line hint
    return (
      <line x1={cx - 14} y1={y} x2={cx + 14} y2={y} stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 3" />
    );
  };

  const configs: Record<EndCondition, { top: "pin" | "fixed" | "free"; bot: "pin" | "fixed" | "free"; label: string }> = {
    "pinned-pinned": { top: "pin",   bot: "pin",   label: "Pinned–Pinned" },
    "fixed-fixed":   { top: "fixed", bot: "fixed", label: "Fixed–Fixed" },
    "fixed-free":    { top: "free",  bot: "fixed", label: "Fixed–Free" },
    "fixed-pinned":  { top: "pin",   bot: "fixed", label: "Fixed–Pinned" },
  };

  const cfg = configs[condition];

  // Draw deflected shape hint
  const deflectionPath = (() => {
    const mid = (colTop + colBot) / 2;
    const amp = condition === "fixed-fixed" ? 10 : condition === "fixed-free" ? 24 : 16;
    const topFree = condition === "fixed-free";
    // Bezier control points for buckled shape
    if (topFree) {
      return `M ${cx} ${colBot} Q ${cx + amp} ${mid} ${cx + amp} ${colTop}`;
    }
    return `M ${cx} ${colBot} Q ${cx + amp} ${mid} ${cx} ${colTop}`;
  })();

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label={`${cfg.label} end condition diagram`}>
      {/* Column (straight) */}
      <line x1={cx} y1={colTop} x2={cx} y2={colBot} stroke="#374151" strokeWidth="5" strokeLinecap="round" />
      {/* Buckled shape (dashed) */}
      <path d={deflectionPath} fill="none" stroke="#058554" strokeWidth="2" strokeDasharray="5 3" opacity="0.7" />
      {/* Load arrow */}
      <line x1={cx} y1={2} x2={cx} y2={colTop - 2} stroke="#EF4444" strokeWidth="2" markerEnd="url(#ecd-arrow)" />
      <defs>
        <marker id="ecd-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill="#EF4444" />
        </marker>
      </defs>
      <text x={cx + 8} y={10} fill="#EF4444" fontSize="10" fontWeight="600">P</text>
      {/* Top support */}
      <g transform={`translate(0, ${colTop})`}>{renderSupport(0, cfg.top)}</g>
      {/* Bottom support */}
      <g transform={`translate(0, ${colBot})`}>{renderSupport(0, cfg.bot)}</g>
      {/* K label */}
      <text x={8} y={H - 6} fill="#6B7280" fontSize="10" fontWeight="600">K = {K_FACTORS[condition]}</text>
      {/* Effective length marker */}
      <line x1={cx + 30} y1={colTop} x2={cx + 30} y2={colBot} stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <text x={cx + 34} y={(colTop + colBot) / 2 + 4} fill="#3B82F6" fontSize="9">KL</text>
    </svg>
  );
}

// ── Presets ────────────────────────────────────────────────────────────────────
const PRESETS = [
  {
    label: "Steel Column (US)",
    material: "steel",
    modulus: "29000",
    modulusUnit: "ksi" as never,  // we'll use GPa internally
    length: "10",
    lengthUnit: "ft" as LengthUnit,
    momentOfInertia: "100",
    moiUnit: "in4" as MoiUnit,
    endCondition: "pinned-pinned" as EndCondition,
  },
  {
    label: "Aluminum Rod",
    material: "aluminum",
    length: "6",
    lengthUnit: "ft" as LengthUnit,
    momentOfInertia: "15",
    moiUnit: "in4" as MoiUnit,
    endCondition: "fixed-free" as EndCondition,
  },
  {
    label: "Concrete Column",
    material: "concrete",
    length: "12",
    lengthUnit: "ft" as LengthUnit,
    momentOfInertia: "500",
    moiUnit: "in4" as MoiUnit,
    endCondition: "fixed-fixed" as EndCondition,
  },
  {
    label: "Metric Steel",
    material: "steel",
    length: "3",
    lengthUnit: "m" as LengthUnit,
    momentOfInertia: "8500000",
    moiUnit: "mm4" as MoiUnit,
    endCondition: "pinned-pinned" as EndCondition,
  },
];

// ── Default Inputs (US defaults) ───────────────────────────────────────────────
const DEFAULT_INPUTS: BucklingInputs = {
  length:           "10",
  lengthUnit:       "ft",
  modulus:          "200",
  modulusUnit:      "GPa",
  momentOfInertia:  "100",
  moiUnit:          "in4",
  endCondition:     "pinned-pinned",
  material:         "steel",
  safetyFactor:     "2",
  axialLoad:        "",
  axialLoadUnit:    "kip",
  showAxialLoad:    false,
  outputUnit:       "kip",
  precision:        2,
};

// ── Main UI ────────────────────────────────────────────────────────────────────
export default function ColumnBucklingCalculatorUI() {
  const [inputs,      setInputs]      = useState<BucklingInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<BucklingResult | null>(null);
  const [error,       setError]       = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showSteps,   setShowSteps]   = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
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
      try { setResult(calculate(inputs)); }
      catch (e) { setError(e instanceof Error ? e.message : "Calculation error"); setResult(null); }
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (patch: Partial<BucklingInputs>) => setInputs((p) => ({ ...p, ...patch }));

  const handleMaterialChange = (material: string) => {
    if (material === "custom") {
      set({ material });
    } else {
      const E = MATERIALS[material]?.E_GPa ?? 200;
      set({ material, modulus: String(E), modulusUnit: "GPa" });
    }
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    const E = MATERIALS[p.material]?.E_GPa ?? 200;
    setInputs((prev) => ({
      ...prev,
      material:        p.material,
      modulus:         String(E),
      modulusUnit:     "GPa",
      length:          p.length,
      lengthUnit:      p.lengthUnit,
      momentOfInertia: p.momentOfInertia,
      moiUnit:         p.moiUnit,
      endCondition:    p.endCondition,
    }));
    lengthRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
    lengthRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const v = getOutputValue(result, inputs.outputUnit);
    const text = `Critical Buckling Load: ${formatNum(v, inputs.precision)} ${inputs.outputUnit} | Material: ${MATERIALS[inputs.material]?.label ?? inputs.material} | End Condition: ${END_CONDITION_LABELS[inputs.endCondition]} | Length: ${inputs.length} ${inputs.lengthUnit}`;
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
    downloadFile(exportToText(inputs, result), "column-buckling-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const primaryValue = result ? getOutputValue(result, inputs.outputUnit) : null;

  const safetyColorClass = result
    ? result.safetyStatus === "safe"    ? "bg-green-50 border-green-200 text-green-800"
    : result.safetyStatus === "warning" ? "bg-amber-50 border-amber-200 text-amber-800"
    : result.safetyStatus === "danger"  ? "bg-red-50 border-red-200 text-red-800"
    : "bg-gray-50 border-gray-200 text-gray-700"
    : "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Column Buckling Calculator</h3>
              <p className="text-sm text-blue-800">
                Compute the critical buckling load (Pcr) of structural columns using Euler&apos;s formula.
                Select material, end conditions, and units — results update instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Critical Buckling Load (Pcr)
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {primaryValue !== null ? `${formatNum(primaryValue, inputs.precision)}` : "—"}
              </div>
              <div className="text-lg text-primary-100 mb-3">{inputs.outputUnit}</div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">N</span>
                    <span className="font-semibold">{formatNum(result.pcrN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">kN</span>
                    <span className="font-semibold">{formatNum(result.pcrKN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">MN</span>
                    <span className="font-semibold">{formatNum(result.pcrMN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">lbf</span>
                    <span className="font-semibold">{formatNum(result.pcrLbf, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">kip</span>
                    <span className="font-semibold">{formatNum(result.pcrKip, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/20">
                    <span className="text-primary-100">Effective Length (KL)</span>
                    <span className="font-semibold">{result.effectiveLength.toFixed(3)} m</span>
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

            {/* Safety Status */}
            {result && (
              <div className={`rounded-xl p-4 border text-sm font-medium ${safetyColorClass}`}>
                {result.safetyMessage}
              </div>
            )}

            {/* End Condition Diagram */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">End Condition Diagram</h3>
              <EndConditionDiagram condition={inputs.endCondition} />
              <p className="text-xs text-gray-500 mt-2 text-center">{END_CONDITION_DESC[inputs.endCondition]}</p>
            </div>

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select
                  value={inputs.outputUnit}
                  onChange={(e) => set({ outputUnit: e.target.value as LoadUnit })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  {(Object.keys(LOAD_UNIT_LABELS) as LoadUnit[]).map((u) => (
                    <option key={u} value={u}>{LOAD_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => set({ precision: parseInt(e.target.value) as Precision })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
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

          {/* ── Right Panel ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Material & Modulus */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Material & Elastic Modulus</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Preset</label>
                  <select
                    value={inputs.material}
                    onChange={(e) => handleMaterialChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {Object.entries(MATERIALS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}{k !== "custom" ? ` — ${v.E_GPa} GPa` : ""}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Young&apos;s Modulus (E)
                    <span className="ml-1 text-xs text-gray-400" title="Stiffness of the material">ⓘ</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.modulus}
                      onChange={(e) => set({ modulus: e.target.value, material: "custom" })}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="200"
                      min="0"
                      step="any"
                      aria-label="Young's modulus value"
                    />
                    <select
                      value={inputs.modulusUnit}
                      onChange={(e) => set({ modulusUnit: e.target.value as ModulusUnit })}
                      className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                    >
                      {(Object.keys(MODULUS_UNIT_LABELS) as ModulusUnit[]).map((u) => (
                        <option key={u} value={u}>{MODULUS_UNIT_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Material presets quick-select */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Quick select material:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(MATERIALS).filter(([k]) => k !== "custom").map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => handleMaterialChange(k)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        inputs.material === k
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Column Geometry */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Column Geometry</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Column Length (L)
                    <span className="ml-1 text-xs text-gray-400" title="Unsupported length of the column">ⓘ</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      ref={lengthRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.length}
                      onChange={(e) => set({ length: e.target.value })}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="any"
                      aria-label="Column length"
                    />
                    <select
                      value={inputs.lengthUnit}
                      onChange={(e) => set({ lengthUnit: e.target.value as LengthUnit })}
                      className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                    >
                      {(Object.keys(LENGTH_UNIT_LABELS) as LengthUnit[]).map((u) => (
                        <option key={u} value={u}>{LENGTH_UNIT_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moment of Inertia (I)
                    <span className="ml-1 text-xs text-gray-400" title="Area moment of inertia of the cross-section">ⓘ</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.momentOfInertia}
                      onChange={(e) => set({ momentOfInertia: e.target.value })}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="any"
                      aria-label="Moment of inertia"
                    />
                    <select
                      value={inputs.moiUnit}
                      onChange={(e) => set({ moiUnit: e.target.value as MoiUnit })}
                      className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                    >
                      {(Object.keys(MOI_UNIT_LABELS) as MoiUnit[]).map((u) => (
                        <option key={u} value={u}>{MOI_UNIT_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use the{" "}
                    <a href="/tools/mechanical/moment-of-inertia-calculator" className="text-primary hover:underline">
                      Moment of Inertia Calculator
                    </a>{" "}
                    to find I for your cross-section.
                  </p>
                </div>
              </div>

              {/* End Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Condition (K Factor)
                  <span className="ml-1 text-xs text-gray-400" title="Boundary conditions at each end of the column">ⓘ</span>
                </label>
                <select
                  value={inputs.endCondition}
                  onChange={(e) => set({ endCondition: e.target.value as EndCondition })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {(Object.keys(END_CONDITION_LABELS) as EndCondition[]).map((c) => (
                    <option key={c} value={c}>{END_CONDITION_LABELS[c]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">{END_CONDITION_DESC[inputs.endCondition]}</p>
              </div>
            </div>

            {/* Safety Analysis */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Safety Analysis</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Factor
                    <span className="ml-1 text-xs text-gray-400" title="Factor of safety applied to critical load. Typical: 2–3 for columns.">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.safetyFactor}
                    onChange={(e) => set({ safetyFactor: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0.01"
                    step="0.1"
                    aria-label="Safety factor"
                  />
                </div>

                {result && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Allowable Load</p>
                    <p className="text-xl font-bold text-gray-900 font-mono">
                      {formatNum(getOutputValue(result, inputs.outputUnit) / (parseFloat(inputs.safetyFactor) || 1), inputs.precision)} {inputs.outputUnit}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Pcr / Safety Factor</p>
                  </div>
                )}
              </div>

              {/* Axial load toggle */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Compare with Axial Load</span>
                    <p className="text-xs text-gray-500 mt-0.5">Check if your column is safe under a specific load</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={inputs.showAxialLoad}
                    onClick={() => set({ showAxialLoad: !inputs.showAxialLoad })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.showAxialLoad ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.showAxialLoad ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>

                {inputs.showAxialLoad && (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.axialLoad}
                      onChange={(e) => set({ axialLoad: e.target.value })}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="Enter axial load"
                      min="0"
                      step="any"
                      aria-label="Axial compressive load"
                    />
                    <select
                      value={inputs.axialLoadUnit}
                      onChange={(e) => set({ axialLoadUnit: e.target.value as LoadUnit })}
                      className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                    >
                      {(Object.keys(LOAD_UNIT_LABELS) as LoadUnit[]).map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-800 text-sm">
                <span>⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Live Formula */}
            {result && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800 space-y-1">
                <p><strong>Pcr = π² × E × I / (K × L)²</strong></p>
                <p className="font-mono text-xs">
                  = π² × {result.formulaSteps.E_Pa.toExponential(3)} Pa × {result.formulaSteps.I_m4.toExponential(3)} m⁴ / ({result.formulaSteps.K} × {result.formulaSteps.L_m.toFixed(4)} m)²
                </p>
                <p className="font-mono text-xs">
                  = <strong>{result.pcrN.toPrecision(5)} N</strong> ({result.pcrKN.toPrecision(4)} kN)
                </p>
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Results Breakdown</h3>
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    {showSteps ? "Hide" : "Show"} step-by-step
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Critical Load (Pcr)</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">kip</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.pcrKip, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilopound-force (US standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kN</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.pcrKN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilonewton (SI engineering)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">MN</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.pcrMN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Meganewton (large structures)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">N</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.pcrN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Newton (SI base unit)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lbf</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.pcrLbf, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pound-force</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {showSteps && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Step-by-Step Breakdown</h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 text-sm font-mono text-gray-800">
                      <p>Step 1 — Convert length:  L = {result.formulaSteps.L_m.toFixed(4)} m</p>
                      <p>Step 2 — Convert modulus:  E = {result.formulaSteps.E_Pa.toExponential(3)} Pa</p>
                      <p>Step 3 — Convert inertia:  I = {result.formulaSteps.I_m4.toExponential(3)} m⁴</p>
                      <p>Step 4 — K factor:  K = {result.formulaSteps.K} ({inputs.endCondition})</p>
                      <p>Step 5 — Effective length:  KL = {result.formulaSteps.K} × {result.formulaSteps.L_m.toFixed(4)} = {result.formulaSteps.KL_m.toFixed(4)} m</p>
                      <p>Step 6 — (KL)² = {(result.formulaSteps.KL_m ** 2).toFixed(4)} m²</p>
                      <p>Step 7 — π² × E × I = {(Math.PI ** 2 * result.formulaSteps.E_Pa * result.formulaSteps.I_m4).toExponential(4)} N·m²</p>
                      <p className="text-primary font-bold">Step 8 — Pcr = {result.pcrN.toPrecision(6)} N = {result.pcrKN.toPrecision(5)} kN</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* K Factor Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">K Factor Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">End Condition</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">K</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Buckling Resistance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(Object.keys(K_FACTORS) as EndCondition[]).map((c) => (
                      <tr
                        key={c}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${inputs.endCondition === c ? "bg-primary/5" : ""}`}
                        onClick={() => set({ endCondition: c })}
                      >
                        <td className={`py-2 px-3 font-medium ${inputs.endCondition === c ? "text-primary" : "text-gray-700"}`}>
                          {c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </td>
                        <td className="py-2 px-3 font-mono font-semibold">{K_FACTORS[c]}</td>
                        <td className="py-2 px-3 text-gray-500">{
                          c === "fixed-fixed"   ? "Strongest — 4× better than pinned-pinned" :
                          c === "fixed-pinned"  ? "Strong — 2× better than pinned-pinned" :
                          c === "pinned-pinned" ? "Standard baseline" :
                          "Weakest — 4× worse than pinned-pinned"
                        }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Euler&apos;s Buckling Formula Explained</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Pcr = π² × E × I / (K × L)²
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                    {[
                      { sym: "Pcr", color: "blue",   title: "Critical Load", desc: "Maximum axial load before buckling occurs (N, kN, or kip)" },
                      { sym: "E",   color: "orange",  title: "Young's Modulus", desc: "Material stiffness in Pa, MPa, or GPa" },
                      { sym: "I",   color: "green",  title: "Moment of Inertia", desc: "Section property resisting bending (m⁴, in⁴)" },
                      { sym: "K·L", color: "purple", title: "Effective Length", desc: "K factor × column length accounts for end conditions" },
                    ].map(({ sym, color, title, desc }) => (
                      <div key={sym} className={`p-3 bg-${color}-50 border border-${color}-200 rounded-lg text-center`}>
                        <div className={`font-bold text-${color}-800 text-sm mb-1`}>{sym}</div>
                        <div className={`font-semibold text-${color}-800 text-xs mb-1`}>{title}</div>
                        <div className={`text-${color}-700 text-xs`}>{desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <strong>Important:</strong> Euler&apos;s formula applies to slender columns that fail by elastic buckling.
                    For short, stocky columns, use material yield stress (crushing) analysis instead.
                    A higher K means longer effective length, which drastically reduces Pcr since load is inversely proportional to (KL)².
                  </div>
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {MATERIALS[entry.inputs.material]?.label ?? entry.inputs.material} — L={entry.inputs.length}{entry.inputs.lengthUnit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary">
                            Pcr = {entry.result.pcrKN.toPrecision(4)} kN
                          </span>
                          <span className="text-xs text-gray-500">{END_CONDITION_LABELS[entry.inputs.endCondition]}</span>
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

      <ColumnBucklingCalculatorSEO />
      <RelatedTools
        currentTool="column-buckling-calculator"
        tools={[
          "beam-deflection-calculator",
          "stress-calculator",
          "moment-of-inertia-calculator",
          "bending-moment-calculator",
          "bolt-load-calculator",
          "torque-calculator",
        ]}
      />
    </>
  );
}
