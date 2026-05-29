"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BendingMomentInputs,
  BendingMomentResult,
  HistoryEntry,
  BeamType,
  LoadType,
  LengthUnit,
  ForceUnit,
  MomentUnit,
  Precision,
  PointLoad,
} from "./types";
import {
  calculate,
  validateLength,
  validateLoad,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  nmToUnit,
  LENGTH_LABELS,
  LENGTH_SHORT,
  FORCE_LABELS,
  FORCE_SHORT,
  MOMENT_LABELS,
  ALL_LENGTH_UNITS,
  ALL_FORCE_UNITS,
  ALL_MOMENT_UNITS,
} from "./logic";
import BendingMomentCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  {
    label: "Simply Supported – Center",
    beamType: "simply-supported" as BeamType,
    loadType: "point-center" as LoadType,
    length: "4",
    lengthUnit: "m" as LengthUnit,
    load: "1000",
    forceUnit: "N" as ForceUnit,
    loadPosition: "2",
  },
  {
    label: "Cantilever – End Load",
    beamType: "cantilever" as BeamType,
    loadType: "point-center" as LoadType,
    length: "2",
    lengthUnit: "m" as LengthUnit,
    load: "500",
    forceUnit: "N" as ForceUnit,
    loadPosition: "2",
  },
  {
    label: "Simply Supported – UDL",
    beamType: "simply-supported" as BeamType,
    loadType: "udl" as LoadType,
    length: "6",
    lengthUnit: "m" as LengthUnit,
    load: "200",
    forceUnit: "N" as ForceUnit,
    loadPosition: "3",
  },
  {
    label: "Fixed Beam – UDL",
    beamType: "fixed" as BeamType,
    loadType: "udl" as LoadType,
    length: "10",
    lengthUnit: "ft" as LengthUnit,
    load: "500",
    forceUnit: "lbf" as ForceUnit,
    loadPosition: "5",
  },
];

const DEFAULT_INPUTS: BendingMomentInputs = {
  beamType: "simply-supported",
  loadType: "point-center",
  length: "4",
  lengthUnit: "m",
  load: "1000",
  forceUnit: "N",
  loadPosition: "2",
  pointLoads: [
    { id: "1", magnitude: "500", position: "1" },
    { id: "2", magnitude: "800", position: "3" },
  ],
  outputUnit: "Nm",
  precision: 2,
};

// ── Beam SVG Diagram ──────────────────────────────────────────────────────
function BeamDiagram({
  inputs,
  result,
}: {
  inputs: BendingMomentInputs;
  result: BendingMomentResult | null;
}) {
  const W = 560, H = 160;
  const beamY = 90, beamX1 = 50, beamX2 = W - 50;
  const beamLen = beamX2 - beamX1;
  const bt = inputs.beamType;
  const lt = inputs.loadType;
  const L = parseFloat(inputs.length) || 1;
  const a = parseFloat(inputs.loadPosition) || L / 2;
  const loadX = beamX1 + (Math.min(a, L) / L) * beamLen;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label="Beam diagram">
      <defs>
        <marker id="bm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#EF4444" />
        </marker>
        <marker id="bm-react" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
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
          {[0, 10, 20, 30, 40].map((i) => (
            <line key={i} x1={beamX1 - 18} y1={beamY - 20 + i} x2={beamX1 - 28} y2={beamY - 10 + i} stroke="#374151" strokeWidth="1.5" />
          ))}
        </>
      )}
      {bt === "fixed" && (
        <>
          <rect x={beamX1 - 18} y={beamY - 22} width={18} height={44} fill="#374151" rx="2" />
          {[0, 10, 20, 30, 40].map((i) => (
            <line key={i} x1={beamX1 - 18} y1={beamY - 20 + i} x2={beamX1 - 28} y2={beamY - 10 + i} stroke="#374151" strokeWidth="1.5" />
          ))}
          <rect x={beamX2} y={beamY - 22} width={18} height={44} fill="#374151" rx="2" />
          {[0, 10, 20, 30, 40].map((i) => (
            <line key={i} x1={beamX2 + 18} y1={beamY - 20 + i} x2={beamX2 + 28} y2={beamY - 10 + i} stroke="#374151" strokeWidth="1.5" />
          ))}
        </>
      )}

      {/* Loads */}
      {(lt === "point-center") && (
        <>
          <line x1={(beamX1 + beamX2) / 2} y1={beamY - 40} x2={(beamX1 + beamX2) / 2} y2={beamY - 8} stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#bm-arrow)" />
          <text x={(beamX1 + beamX2) / 2} y={beamY - 46} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">P</text>
        </>
      )}
      {lt === "point-any" && (
        <>
          <line x1={loadX} y1={beamY - 40} x2={loadX} y2={beamY - 8} stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#bm-arrow)" />
          <text x={loadX} y={beamY - 46} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">P</text>
        </>
      )}
      {lt === "udl" && (
        <>
          <line x1={beamX1} y1={beamY - 32} x2={beamX2} y2={beamY - 32} stroke="#EF4444" strokeWidth="1.5" />
          {Array.from({ length: 9 }, (_, i) => {
            const xi = beamX1 + ((i + 1) / 10) * beamLen;
            return <line key={i} x1={xi} y1={beamY - 32} x2={xi} y2={beamY - 8} stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#bm-arrow)" />;
          })}
          <text x={(beamX1 + beamX2) / 2} y={beamY - 38} textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="600">w</text>
        </>
      )}
      {lt === "multiple-point" && inputs.pointLoads.map((pl) => {
        const pos = parseFloat(pl.position) || 0;
        const px = beamX1 + (Math.min(pos, L) / L) * beamLen;
        return (
          <g key={pl.id}>
            <line x1={px} y1={beamY - 36} x2={px} y2={beamY - 8} stroke="#EF4444" strokeWidth="2" markerEnd="url(#bm-arrow)" />
            <text x={px} y={beamY - 42} textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="600">P{pl.id}</text>
          </g>
        );
      })}

      {/* Reactions */}
      {result && (
        <>
          <line x1={beamX1} y1={beamY + 50} x2={beamX1} y2={beamY + 8} stroke="#058554" strokeWidth="2" markerEnd="url(#bm-react)" />
          <text x={beamX1} y={beamY + 64} textAnchor="middle" fill="#058554" fontSize="10">R_A</text>
          {result.reactionB !== null && (
            <>
              <line x1={beamX2} y1={beamY + 50} x2={beamX2} y2={beamY + 8} stroke="#058554" strokeWidth="2" markerEnd="url(#bm-react)" />
              <text x={beamX2} y={beamY + 64} textAnchor="middle" fill="#058554" fontSize="10">R_B</text>
            </>
          )}
        </>
      )}

      {/* Dimension line */}
      <line x1={beamX1} y1={H - 10} x2={beamX2} y2={H - 10} stroke="#9CA3AF" strokeWidth="1" markerStart="url(#bm-react)" markerEnd="url(#bm-arrow)" />
      <text x={(beamX1 + beamX2) / 2} y={H - 2} textAnchor="middle" fill="#6B7280" fontSize="10">
        L = {inputs.length} {LENGTH_SHORT[inputs.lengthUnit]}
      </text>
    </svg>
  );
}

// ── Moment/Shear Curve SVG ────────────────────────────────────────────────
function DiagramCurve({
  curve,
  label,
  color,
}: {
  curve: { x: number; y: number }[];
  label: string;
  color: string;
}) {
  const W = 400, H = 100, pad = 20;
  const plotW = W - pad * 2, plotH = H - pad * 2;
  const minY = Math.min(...curve.map((p) => p.y));
  const maxY = Math.max(...curve.map((p) => p.y));
  const rangeY = Math.max(Math.abs(maxY), Math.abs(minY)) * 2 || 1;

  const toSvg = (p: { x: number; y: number }) => ({
    sx: pad + p.x * plotW,
    sy: pad + plotH / 2 - (p.y / rangeY) * plotH * 0.85,
  });

  const pathD = curve
    .map((p, i) => {
      const { sx, sy } = toSvg(p);
      return `${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    })
    .join(" ");

  const fillD =
    pathD +
    ` L ${(pad + plotW).toFixed(1)} ${(pad + plotH / 2).toFixed(1)} L ${pad} ${(pad + plotH / 2).toFixed(1)} Z`;

  return (
    <div>
      <p className="text-xs font-semibold text-gray-600 mb-1">{label}</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto bg-gray-50 rounded border border-gray-200"
      >
        <line
          x1={pad}
          y1={pad + plotH / 2}
          x2={pad + plotW}
          y2={pad + plotH / 2}
          stroke="#D1D5DB"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <path d={fillD} fill={color} fillOpacity="0.12" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── Main UI ───────────────────────────────────────────────────────────────
export default function BendingMomentCalculatorUI() {
  const [inputs, setInputs] = useState<BendingMomentInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<BendingMomentResult | null>(null);
  const [lenErr, setLenErr] = useState<string | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"moment" | "shear">("moment");
  const lengthRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    lengthRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const le = validateLength(inputs.length);
      const lde = inputs.loadType !== "multiple-point" ? validateLoad(inputs.load) : null;
      setLenErr(le);
      setLoadErr(lde);
      if (le || lde) { setResult(null); return; }
      try {
        setResult(calculate(inputs));
      } catch {
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (patch: Partial<BendingMomentInputs>) =>
    setInputs((p) => ({ ...p, ...patch }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      beamType: p.beamType,
      loadType: p.loadType,
      length: p.length,
      lengthUnit: p.lengthUnit,
      load: p.load,
      forceUnit: p.forceUnit,
      loadPosition: p.loadPosition,
    }));
    lengthRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setLenErr(null);
    setLoadErr(null);
    lengthRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Bending Moment: ${formatNum(result.maxMoment, inputs.precision)} ${inputs.outputUnit} | Beam: ${inputs.beamType} | Load: ${inputs.load} ${FORCE_SHORT[inputs.forceUnit]} | Length: ${inputs.length} ${LENGTH_SHORT[inputs.lengthUnit]}`;
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
    downloadFile(exportToText(inputs, result), "bending-moment-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const addPointLoad = () => {
    const newId = Date.now().toString();
    set({ pointLoads: [...inputs.pointLoads, { id: newId, magnitude: "500", position: "1" }] });
  };

  const removePointLoad = (id: string) => {
    if (inputs.pointLoads.length <= 1) return;
    set({ pointLoads: inputs.pointLoads.filter((pl) => pl.id !== id) });
  };

  const updatePointLoad = (id: string, field: keyof PointLoad, value: string) => {
    set({
      pointLoads: inputs.pointLoads.map((pl) =>
        pl.id === id ? { ...pl, [field]: value } : pl
      ),
    });
  };

  const isUDL = inputs.loadType === "udl";
  const isMultiple = inputs.loadType === "multiple-point";
  const showPosition = inputs.loadType === "point-any";
  const loadLabel = isUDL
    ? `Load Intensity (${FORCE_SHORT[inputs.forceUnit]}/m)`
    : `Load Magnitude (${FORCE_SHORT[inputs.forceUnit]})`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Bending Moment Calculator</h3>
              <p className="text-sm text-blue-800">
                Select beam type and loading condition, enter dimensions and load values to instantly calculate the maximum bending moment with diagrams and step-by-step formulas.
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
                Max Bending Moment
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null
                  ? `${formatNum(result.maxMoment, inputs.precision)}`
                  : "—"}
              </div>
              <div className="text-lg text-primary-100 mb-4">
                {result ? inputs.outputUnit : inputs.outputUnit}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Nm</span>
                    <span className="font-semibold">{formatNum(result.maxMomentNm, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">kNm</span>
                    <span className="font-semibold">{formatNum(result.maxMomentKNm, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">lb-ft</span>
                    <span className="font-semibold">{formatNum(result.maxMomentLbFt, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">lb-in</span>
                    <span className="font-semibold">{formatNum(result.maxMomentLbIn, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Reaction A</span>
                    <span className="font-semibold">{formatNum(result.reactionA, inputs.precision)} N</span>
                  </div>
                  {result.reactionB !== null && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Reaction B</span>
                      <span className="font-semibold">{formatNum(result.reactionB, inputs.precision)} N</span>
                    </div>
                  )}
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

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select
                  value={inputs.outputUnit}
                  onChange={(e) => set({ outputUnit: e.target.value as MomentUnit })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  {ALL_MOMENT_UNITS.map((u) => (
                    <option key={u} value={u}>{MOMENT_LABELS[u]}</option>
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

              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowFormula(!showFormula)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📖 {showFormula ? "Hide" : "Show"} Formula
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beam Type</label>
                  <select
                    value={inputs.beamType}
                    onChange={(e) => set({ beamType: e.target.value as BeamType })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="simply-supported">Simply Supported</option>
                    <option value="cantilever">Cantilever</option>
                    <option value="fixed">Fixed (Both Ends)</option>
                    <option value="overhanging">Overhanging</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Load Type</label>
                  <select
                    value={inputs.loadType}
                    onChange={(e) => set({ loadType: e.target.value as LoadType })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="point-center">Point Load (Center)</option>
                    <option value="point-any">Point Load (Any Position)</option>
                    <option value="udl">Uniformly Distributed Load (UDL)</option>
                    <option value="multiple-point">Multiple Point Loads</option>
                  </select>
                </div>
              </div>

              {/* Beam Length */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beam Length
                    <span className="ml-1 text-xs text-gray-400" title="Total span of the beam">ⓘ</span>
                  </label>
                  <input
                    ref={lengthRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.length}
                    onChange={(e) => set({ length: e.target.value.replace(/[^0-9.]/g, "") })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${lenErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="4"
                    min="0"
                    step="any"
                    aria-label="Beam length"
                  />
                  {lenErr && <p className="text-xs text-red-600 mt-1">{lenErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Length Unit</label>
                  <select
                    value={inputs.lengthUnit}
                    onChange={(e) => set({ lengthUnit: e.target.value as LengthUnit })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_LENGTH_UNITS.map((u) => (
                      <option key={u} value={u}>{LENGTH_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Load inputs — single load */}
              {!isMultiple && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {loadLabel}
                      <span className="ml-1 text-xs text-gray-400" title={isUDL ? "Load per unit length" : "Applied point load"}>ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.load}
                      onChange={(e) => set({ load: e.target.value.replace(/[^0-9.]/g, "") })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${loadErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder="1000"
                      min="0"
                      step="any"
                      aria-label="Load value"
                    />
                    {loadErr && <p className="text-xs text-red-600 mt-1">{loadErr}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Force Unit</label>
                    <select
                      value={inputs.forceUnit}
                      onChange={(e) => set({ forceUnit: e.target.value as ForceUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_FORCE_UNITS.map((u) => (
                        <option key={u} value={u}>{FORCE_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Load position slider */}
              {showPosition && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load Position from Left Support ({LENGTH_SHORT[inputs.lengthUnit]}) — 0 to {inputs.length || "L"}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={0}
                      max={parseFloat(inputs.length) || 10}
                      step={0.01}
                      value={parseFloat(inputs.loadPosition) || 0}
                      onChange={(e) => set({ loadPosition: e.target.value })}
                      className="w-full accent-primary"
                      aria-label="Load position slider"
                    />
                    <input
                      type="number"
                      value={inputs.loadPosition}
                      onChange={(e) => set({ loadPosition: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                      placeholder="2"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              )}

              {/* Multiple point loads */}
              {isMultiple && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Point Loads ({FORCE_SHORT[inputs.forceUnit]}) &amp; Positions ({LENGTH_SHORT[inputs.lengthUnit]})
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={inputs.forceUnit}
                        onChange={(e) => set({ forceUnit: e.target.value as ForceUnit })}
                        className="px-2 py-1 border border-gray-200 rounded text-xs font-medium"
                      >
                        {ALL_FORCE_UNITS.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {inputs.pointLoads.map((pl, idx) => (
                    <div key={pl.id} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-5 flex-shrink-0">P{idx + 1}</span>
                      <input
                        type="number"
                        value={pl.magnitude}
                        onChange={(e) => updatePointLoad(pl.id, "magnitude", e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="Load"
                        min="0"
                        step="any"
                        aria-label={`Load ${idx + 1} magnitude`}
                      />
                      <span className="text-xs text-gray-400">@</span>
                      <input
                        type="number"
                        value={pl.position}
                        onChange={(e) => updatePointLoad(pl.id, "position", e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                        placeholder="Position"
                        min="0"
                        step="any"
                        aria-label={`Load ${idx + 1} position`}
                      />
                      <button
                        onClick={() => removePointLoad(pl.id)}
                        disabled={inputs.pointLoads.length <= 1}
                        className="text-red-400 hover:text-red-600 disabled:opacity-30 text-lg leading-none px-1"
                        aria-label="Remove load"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addPointLoad}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary hover:text-primary transition-colors"
                  >
                    + Add Load
                  </button>
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula} = <strong>{formatNum(result.maxMomentNm, inputs.precision)} Nm</strong>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active =
                    inputs.beamType === p.beamType &&
                    inputs.loadType === p.loadType &&
                    inputs.length === p.length &&
                    inputs.load === p.load;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
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

            {/* Beam Diagram */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Beam Diagram</h3>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <BeamDiagram inputs={inputs} result={result} />
              </div>
            </div>

            {/* Unit Conversion Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Unit Conversion Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Nm</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.maxMomentNm, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Newton-meter (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kNm</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.maxMomentKNm, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilonewton-meter</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lb-ft</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.maxMomentLbFt, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pound-foot (US standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lb-in</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.maxMomentLbIn, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pound-inch</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kip-ft</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.maxMomentKipFt, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kip-foot (structural engineering)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Moment / Shear Diagrams */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Diagrams</h3>
                  <div className="flex gap-1">
                    {(["moment", "shear"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                          activeTab === tab
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {tab === "moment" ? "Bending Moment" : "Shear Force"}
                      </button>
                    ))}
                  </div>
                </div>
                {activeTab === "moment" && (
                  <DiagramCurve
                    curve={result.momentCurve}
                    label="Bending Moment Diagram (BMD)"
                    color="#3B82F6"
                  />
                )}
                {activeTab === "shear" && (
                  <DiagramCurve
                    curve={result.shearCurve}
                    label="Shear Force Diagram (SFD)"
                    color="#EF4444"
                  />
                )}
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Simply Supported – Center Load</p>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">M = (F × L) / 4</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Simply Supported – UDL</p>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">M = (w × L²) / 8</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Cantilever – End Point Load</p>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">M = F × L</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Cantilever – UDL</p>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">M = (w × L²) / 2</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Fixed Beam – Center Load</p>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">M = (F × L) / 8</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Fixed Beam – UDL</p>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">M = (w × L²) / 12</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Key:</strong> F = point load (N), w = distributed load (N/m), L = beam length (m), a = load position from left (m), b = L − a
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
                            {entry.inputs.beamType} · {entry.inputs.loadType}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.maxMomentNm, 2)} Nm
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

      <BendingMomentCalculatorSEO />
      <RelatedTools
        currentTool="bending-moment-calculator"
        tools={[
          "beam-deflection-calculator",
          "stress-calculator",
          "torque-calculator",
          "moment-of-inertia-calculator",
          "force-calculator",
          "spring-force-calculator",
        ]}
      />
    </>
  );
}
