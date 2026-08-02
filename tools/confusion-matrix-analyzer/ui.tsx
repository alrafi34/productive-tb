"use client";

import { useState, useEffect, useRef, type DragEvent } from "react";
import {
  calculateBinaryMetrics, buildConfusionMatrix, parseLabelList, parseCSV, debounce, formatNum,
  generateSampleLabels, saveHistory, getHistory, clearHistory,
  buildBinaryTextReport, buildBinaryCSVReport, buildBinaryJSONReport,
  buildMatrixTextReport, buildMatrixCSVReport, buildMatrixJSONReport,
  PRECISION_OPTIONS, DEFAULT_PRECISION, DEFAULT_TP, DEFAULT_FP, DEFAULT_FN, DEFAULT_TN,
  type InputMode, type BinaryMetrics, type MatrixResult, type HistoryEntry,
} from "./logic";
import ConfusionMatrixAnalyzerSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ConfusionMatrixAnalyzerUI() {
  const [mode, setMode] = useState<InputMode>("manual");
  const [tp, setTp] = useState(String(DEFAULT_TP));
  const [fp, setFp] = useState(String(DEFAULT_FP));
  const [fn, setFn] = useState(String(DEFAULT_FN));
  const [tn, setTn] = useState(String(DEFAULT_TN));
  const [actualText, setActualText] = useState("");
  const [predictedText, setPredictedText] = useState("");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);

  const [binaryResult, setBinaryResult] = useState<BinaryMetrics | null>(null);
  const [matrixResult, setMatrixResult] = useState<MatrixResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const computeBinary = useRef(debounce((a: string, b: string, c: string, d: string) => {
    setBinaryResult(calculateBinaryMetrics(parseFloat(a || "0"), parseFloat(b || "0"), parseFloat(c || "0"), parseFloat(d || "0")));
  }, 150));

  const computeMatrix = useRef(debounce((a: string, p: string, ci: boolean) => {
    setMatrixResult(buildConfusionMatrix(parseLabelList(a), parseLabelList(p), ci));
  }, 150));

  useEffect(() => { setHistory(getHistory()); }, []);
  useEffect(() => { computeBinary.current(tp, fp, fn, tn); }, [tp, fp, fn, tn]);
  useEffect(() => { computeMatrix.current(actualText, predictedText, caseInsensitive); }, [actualText, predictedText, caseInsensitive]);

  const handleSample = () => {
    if (mode === "manual") { setTp(String(DEFAULT_TP)); setFp(String(DEFAULT_FP)); setFn(String(DEFAULT_FN)); setTn(String(DEFAULT_TN)); }
    else { const s = generateSampleLabels(); setActualText(s.actual); setPredictedText(s.predicted); }
  };

  const handleReset = () => {
    setTp(""); setFp(""); setFn(""); setTn(""); setActualText(""); setPredictedText(""); setFileError(null);
  };

  const loadCSVFile = (file: File) => {
    setFileError(null);
    if (!/\.(csv|txt)$/i.test(file.name)) { setFileError("Please upload a .csv or .txt file."); return; }
    if (file.size > 5 * 1024 * 1024) { setFileError("File is too large. Maximum size is 5MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCSV(String(reader.result));
      if (parsed.error) { setFileError(parsed.error); return; }
      setActualText(parsed.actual.join("\n"));
      setPredictedText(parsed.predicted.join("\n"));
    };
    reader.onerror = () => setFileError("This file could not be read.");
    reader.readAsText(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadCSVFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadCSVFile(file);
  };

  const handleCopy = () => {
    const text = mode === "manual" && binaryResult && !binaryResult.error
      ? buildBinaryTextReport(binaryResult, precision)
      : matrixResult && !matrixResult.error
      ? buildMatrixTextReport(matrixResult, precision)
      : null;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, mime: string, filename: string) => {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename; a.click(); URL.revokeObjectURL(a.href);
  };

  const handleDownloadCSV = () => {
    if (mode === "manual" && binaryResult && !binaryResult.error) download(buildBinaryCSVReport(binaryResult, precision), "text/csv", "confusion-matrix-report.csv");
    else if (matrixResult && !matrixResult.error) download(buildMatrixCSVReport(matrixResult), "text/csv", "confusion-matrix-report.csv");
  };

  const handleDownloadTXT = () => {
    if (mode === "manual" && binaryResult && !binaryResult.error) download(buildBinaryTextReport(binaryResult, precision), "text/plain", "confusion-matrix-report.txt");
    else if (matrixResult && !matrixResult.error) download(buildMatrixTextReport(matrixResult, precision), "text/plain", "confusion-matrix-report.txt");
  };

  const handleDownloadJSON = () => {
    if (mode === "manual" && binaryResult && !binaryResult.error) download(buildBinaryJSONReport(binaryResult), "application/json", "confusion-matrix-report.json");
    else if (matrixResult && !matrixResult.error) download(buildMatrixJSONReport(matrixResult), "application/json", "confusion-matrix-report.json");
  };

  const handleSave = () => {
    if (mode === "manual" && binaryResult && !binaryResult.error) {
      saveHistory("manual", `Accuracy ${formatNum(binaryResult.accuracy, 2)} · F1 ${formatNum(binaryResult.f1, 2)}`);
    } else if (matrixResult && !matrixResult.error) {
      saveHistory("labels", `${matrixResult.classes.length} classes · Accuracy ${formatNum(matrixResult.accuracy, 2)}`);
    } else return;
    setHistory(getHistory());
  };

  const maxCell = matrixResult && matrixResult.matrix.length ? Math.max(...matrixResult.matrix.flat(), 1) : 1;

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Confusion Matrix Analyzer</p>
          <p className="text-xs text-gray-400 font-mono">Accuracy = (TP + TN) ÷ Total</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5 flex gap-1.5">
          <button onClick={() => setMode("manual")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "manual" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Manual Counts (Binary)</button>
          <button onClick={() => setMode("labels")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === "labels" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Actual vs. Predicted Lists</button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left: input ── */}
          <div className="lg:col-span-5 space-y-5">
            {mode === "manual" ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Confusion Matrix Counts</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cma-tp">True Positive (TP)</label>
                    <input id="cma-tp" type="number" min="0" value={tp} onChange={(e) => setTp(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cma-fp">False Positive (FP)</label>
                    <input id="cma-fp" type="number" min="0" value={fp} onChange={(e) => setFp(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cma-fn">False Negative (FN)</label>
                    <input id="cma-fn" type="number" min="0" value={fn} onChange={(e) => setFn(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cma-tn">True Negative (TN)</label>
                    <input id="cma-tn" type="number" min="0" value={tn} onChange={(e) => setTn(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Load Example</button>
                  <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Reset</button>
                </div>
                {binaryResult?.error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{binaryResult.error}</p>}
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`bg-white rounded-xl border-2 shadow-sm p-5 space-y-3 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-100"}`}
              >
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actual vs. Predicted Labels</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Actual</label>
                    <textarea rows={7} value={actualText} onChange={(e) => setActualText(e.target.value)}
                      placeholder={"Cat\nDog\nDog\nBird"}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-xs font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Predicted</label>
                    <textarea rows={7} value={predictedText} onChange={(e) => setPredictedText(e.target.value)}
                      placeholder={"Cat\nDog\nCat\nBird"}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-xs font-mono" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400">One label per line, in matching order. Or drag &amp; drop a CSV with &quot;Actual&quot; and &quot;Predicted&quot; columns.</p>
                {fileError && <p className="text-xs text-red-600" role="alert">{fileError}</p>}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                  <button onClick={handleSample} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">🎲 Load Example</button>
                  <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Import CSV</button>
                  <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={handleFileInput} className="hidden" />
                  <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Clear</button>
                </div>
                <label className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary" />
                  Case-insensitive label matching
                </label>
                {matrixResult?.error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{matrixResult.error}</p>}
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="cma-precision">Decimal Precision</label>
              <select id="cma-precision" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white">
                {PRECISION_OPTIONS.map((n) => <option key={n} value={n}>{n} decimals</option>)}
              </select>
            </div>
          </div>

          {/* ── Right: results ── */}
          <div className="lg:col-span-7 space-y-5">

            {mode === "manual" && binaryResult && !binaryResult.error && (
              <>
                <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Accuracy</p>
                  <p className="text-4xl font-bold font-mono tabular-nums">{formatNum(binaryResult.accuracy, precision)}</p>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[
                      ["Precision", binaryResult.precision],
                      ["Recall", binaryResult.recall],
                      ["F1", binaryResult.f1],
                      ["Specificity", binaryResult.specificity],
                    ].map(([label, value]) => (
                      <div key={label as string} className="bg-white/10 rounded-lg px-2 py-2 text-center">
                        <p className="text-primary-100 text-[10px] mb-0.5">{label}</p>
                        <p className="text-sm font-bold font-mono">{formatNum(value as number | null, precision)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">{copied ? "✓ Copied!" : "Copy Metrics"}</button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save to History</button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Additional Metrics</h3>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-y divide-gray-50 text-sm">
                    {[
                      ["NPV", binaryResult.npv],
                      ["False Positive Rate", binaryResult.fpr],
                      ["False Negative Rate", binaryResult.fnr],
                      ["Balanced Accuracy", binaryResult.balancedAccuracy],
                      ["MCC", binaryResult.mcc],
                      ["Total Samples", binaryResult.total],
                    ].map(([label, value]) => (
                      <div key={label as string} className="px-4 py-3">
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="text-sm font-bold font-mono text-gray-800">{typeof value === "number" && label === "Total Samples" ? value : formatNum(value as number | null, precision)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {mode === "labels" && matrixResult && !matrixResult.error && (
              <>
                <div className="bg-primary rounded-xl border border-primary shadow-lg shadow-primary/20 p-5 text-white">
                  <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Overall Accuracy</p>
                  <p className="text-4xl font-bold font-mono tabular-nums">{formatNum(matrixResult.accuracy, precision)}</p>
                  <p className="text-sm text-primary-100 mt-2">{matrixResult.classes.length} classes · {matrixResult.total} samples</p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      ["Macro F1", matrixResult.macroF1],
                      ["Weighted F1", matrixResult.weightedF1],
                      ["Macro Precision", matrixResult.macroPrecision],
                    ].map(([label, value]) => (
                      <div key={label as string} className="bg-white/10 rounded-lg px-2 py-2 text-center">
                        <p className="text-primary-100 text-[10px] mb-0.5">{label}</p>
                        <p className="text-sm font-bold font-mono">{formatNum(value as number | null, precision)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                    <button onClick={handleCopy} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">{copied ? "✓ Copied!" : "Copy Metrics"}</button>
                    <button onClick={handleSave} className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">Save to History</button>
                  </div>
                </div>

                {/* Heatmap */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Confusion Matrix Heatmap</h3>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="border-collapse text-xs">
                      <thead>
                        <tr>
                          <th className="p-2"></th>
                          <th colSpan={matrixResult.classes.length} className="p-2 text-center text-gray-500 font-medium">Predicted</th>
                        </tr>
                        <tr>
                          <th className="p-2 text-right text-gray-500 font-medium align-bottom">Actual</th>
                          {matrixResult.classes.map((c) => <th key={c} className="p-2 text-gray-600 font-medium whitespace-nowrap">{c}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {matrixResult.matrix.map((row, i) => (
                          <tr key={matrixResult.classes[i]}>
                            <td className="p-2 text-right text-gray-600 font-medium whitespace-nowrap">{matrixResult.classes[i]}</td>
                            {row.map((cell, j) => {
                              const intensity = cell / maxCell;
                              const isDiagonal = i === j;
                              return (
                                <td key={j} className="p-2 text-center font-mono font-semibold min-w-[48px]"
                                  style={{
                                    backgroundColor: isDiagonal ? `rgba(5, 133, 84, ${0.15 + intensity * 0.6})` : `rgba(220, 38, 38, ${intensity * 0.35})`,
                                    color: intensity > 0.5 ? "#fff" : "#374151",
                                  }}>
                                  {cell}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Per-class table */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Per-Class Metrics</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs text-gray-500">
                          <th className="text-left py-2 px-4 font-medium">Class</th>
                          <th className="text-left py-2 px-4 font-medium">Precision</th>
                          <th className="text-left py-2 px-4 font-medium">Recall</th>
                          <th className="text-left py-2 px-4 font-medium">F1</th>
                          <th className="text-left py-2 px-4 font-medium">Support</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {matrixResult.perClass.map((c) => (
                          <tr key={c.className} className="hover:bg-gray-50">
                            <td className="py-1.5 px-4 font-medium text-gray-800">{c.className}</td>
                            <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(c.precision, precision)}</td>
                            <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(c.recall, precision)}</td>
                            <td className="py-1.5 px-4 font-mono text-primary font-semibold">{formatNum(c.f1, precision)}</td>
                            <td className="py-1.5 px-4 font-mono text-gray-500">{c.support}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50/50 font-semibold">
                          <td className="py-1.5 px-4 text-gray-700">Macro Avg</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(matrixResult.macroPrecision, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(matrixResult.macroRecall, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(matrixResult.macroF1, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-500">{matrixResult.total}</td>
                        </tr>
                        <tr className="bg-gray-50/50 font-semibold">
                          <td className="py-1.5 px-4 text-gray-700">Weighted Avg</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(matrixResult.weightedPrecision, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(matrixResult.weightedRecall, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-700">{formatNum(matrixResult.weightedF1, precision)}</td>
                          <td className="py-1.5 px-4 font-mono text-gray-500">{matrixResult.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Binary-derived metrics for 2-class data */}
                {matrixResult.binary && !matrixResult.binary.error && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Binary Metrics (positive class: {matrixResult.classes[1]})</h3>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-y divide-gray-50 text-sm">
                      {[
                        ["Specificity", matrixResult.binary.specificity],
                        ["Balanced Accuracy", matrixResult.binary.balancedAccuracy],
                        ["MCC", matrixResult.binary.mcc],
                      ].map(([label, value]) => (
                        <div key={label as string} className="px-4 py-3">
                          <p className="text-xs text-gray-500">{label}</p>
                          <p className="text-sm font-bold font-mono text-gray-800">{formatNum(value as number | null, precision)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {((mode === "manual" && (!binaryResult || binaryResult.error)) || (mode === "labels" && (!matrixResult || matrixResult.error))) && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center text-gray-400 text-sm">
                Enter data on the left to see the confusion matrix analysis.
              </div>
            )}

            {/* Export */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
              <button onClick={handleDownloadTXT} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download TXT</button>
              <button onClick={handleDownloadCSV} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download CSV</button>
              <button onClick={handleDownloadJSON} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">Download JSON</button>
              <button onClick={() => setShowHistory(!showHistory)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors ml-auto">{showHistory ? "Hide" : "Show"} History</button>
            </div>

            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Analyses</h3>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm("Clear all history?")) { clearHistory(); setHistory([]); } }} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No saved analyses yet</div>
                  ) : history.map((entry) => (
                    <div key={entry.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.summary}</span>
                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                      </div>
                      <div className="text-xs text-primary font-mono">{entry.mode === "manual" ? "Manual Counts" : "Actual vs. Predicted"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ConfusionMatrixAnalyzerSEO />

      <RelatedTools
        currentTool="confusion-matrix-analyzer"
        tools={[
          "precision-calculator",
          "recall-calculator",
          "f1-score-calculator-analytics",
          "roc-auc-calculator",
          "p-value-calculator",
          "correlation-coefficient-calculator",
        ]}
      />
    </>
  );
}
