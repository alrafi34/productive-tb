"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  computeHash,
  formatBytes,
  downloadFile,
  getHistory,
  saveHistory,
  clearHistory,
  ALGORITHMS,
  ALGO_INFO,
  type Algorithm,
  type HistoryEntry,
} from "./logic";
import ChecksumCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type InputMode = "text" | "file";

type FileTask = {
  id: string;
  file: File;
  status: "pending" | "processing" | "done" | "error";
  progress: number;
  error?: string;
  hashes: Partial<Record<Algorithm, string>>;
};

const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

export default function ChecksumCalculatorUI() {
  const [mode, setMode] = useState<InputMode>("text");
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [textHash, setTextHash] = useState("");
  const [textProcessing, setTextProcessing] = useState(false);
  const [compareA, setCompareA] = useState("");
  const [compareB, setCompareB] = useState("");
  const [multiAlgos, setMultiAlgos] = useState<Algorithm[]>(["SHA-256"]);
  const [multiResults, setMultiResults] = useState<Partial<Record<Algorithm, string>>>({});
  const [multiProcessing, setMultiProcessing] = useState(false);
  const [tasks, setTasks] = useState<FileTask[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); }, []);

  // Text hash — debounced
  const computeTextHash = useCallback(
    debounce(async (val: string, algo: Algorithm, enc: "hex" | "base64") => {
      if (!val) { setTextHash(""); setProcessingTime(null); return; }
      setTextProcessing(true);
      const t0 = performance.now();
      try {
        const data = new TextEncoder().encode(val);
        const hash = await computeHash(data, algo, enc);
        setTextHash(hash);
        setProcessingTime(Math.round(performance.now() - t0));
        saveHistory({ inputType: "text", label: val.slice(0, 40) + (val.length > 40 ? "…" : ""), algorithm: algo, encoding: enc, checksum: hash });
        setHistory(getHistory());
      } catch { setTextHash("Error computing hash"); }
      setTextProcessing(false);
    }, 150),
    []
  );

  useEffect(() => { if (mode === "text") computeTextHash(text, algorithm, encoding); }, [text, algorithm, encoding, mode]);

  // Multi-algo text
  const runMultiAlgo = async () => {
    if (!text || multiAlgos.length === 0) return;
    setMultiProcessing(true);
    const data = new TextEncoder().encode(text);
    const results: Partial<Record<Algorithm, string>> = {};
    for (const algo of multiAlgos) {
      try { results[algo] = await computeHash(data, algo, encoding); }
      catch { results[algo] = "Error"; }
    }
    setMultiResults(results);
    setMultiProcessing(false);
  };

  const toggleMultiAlgo = (algo: Algorithm) => {
    setMultiAlgos(prev =>
      prev.includes(algo) ? (prev.length > 1 ? prev.filter(a => a !== algo) : prev) : [...prev, algo]
    );
  };

  // File processing
  const processFile = async (task: FileTask) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "processing", progress: 5 } : t));
    try {
      const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onprogress = e => {
          if (e.lengthComputable) {
            const p = Math.round((e.loaded / e.total) * 60);
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress: p } : t));
          }
        };
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(new Error("Unable to read file"));
        reader.readAsArrayBuffer(task.file);
      });

      const data = new Uint8Array(buffer);
      const algos = task.hashes ? (Object.keys(task.hashes) as Algorithm[]) : [algorithm];
      const hashes: Partial<Record<Algorithm, string>> = {};
      const inc = 40 / algos.length;
      let prog = 60;
      for (const algo of algos) {
        try { hashes[algo] = await computeHash(data, algo, encoding); }
        catch { hashes[algo] = "Error"; }
        prog += inc;
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress: Math.min(99, Math.round(prog)) } : t));
      }
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "done", progress: 100, hashes } : t));
    } catch (e: any) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "error", error: e.message } : t));
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const newTasks: FileTask[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      file,
      status: "pending",
      progress: 0,
      hashes: { [algorithm]: "" } as Partial<Record<Algorithm, string>>,
    }));
    setTasks(prev => [...prev, ...newTasks]);
    newTasks.forEach(t => processFile(t));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [algorithm, encoding]);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key); setTimeout(() => setCopiedKey(null), 2000);
  };

  const exportTxt = () => {
    if (!textHash) return;
    downloadFile(
      `Algorithm: ${algorithm}\nEncoding: ${encoding}\nChecksum: ${textHash}\nTimestamp: ${new Date().toISOString()}`,
      "checksum-result.txt", "text/plain"
    );
  };

  const exportJson = () => {
    if (!textHash) return;
    downloadFile(
      JSON.stringify({ algorithm, encoding, checksum: textHash, timestamp: new Date().toISOString() }, null, 2),
      "checksum-result.json", "application/json"
    );
  };

  const compareMatch = compareA && compareB
    ? compareA.trim().toLowerCase() === compareB.trim().toLowerCase()
    : null;

  const btnClass = "px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono";

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <span className="text-lg mt-0.5">🔒</span>
          <p className="text-sm text-blue-700" style={{ fontFamily: "var(--font-body)" }}>
            All processing is done locally in your browser using the <strong>Web Crypto API</strong>. No data is ever uploaded to any server.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1 flex gap-1">
          {(["text", "file"] as InputMode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${mode === m ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {m === "text" ? "Text Input" : "File Upload"}
            </button>
          ))}
        </div>

        {mode === "text" && (
          <>
            {/* Algorithm + Encoding Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Algorithm</label>
                  <select
                    value={algorithm}
                    onChange={e => setAlgorithm(e.target.value as Algorithm)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    {ALGORITHMS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">{ALGO_INFO[algorithm].desc}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Encoding</label>
                  <select
                    value={encoding}
                    onChange={e => setEncoding(e.target.value as "hex" | "base64")}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    <option value="hex">Hexadecimal</option>
                    <option value="base64">Base64</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter text or data</label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Paste text here..."
                  rows={4}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-y"
                  aria-label="Text input for checksum"
                />
                {text && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new TextEncoder().encode(text).length} bytes
                  </p>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  {algorithm} Checksum
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {processingTime !== null && <span>{processingTime}ms</span>}
                  <span>{ALGO_INFO[algorithm].bits}-bit</span>
                </div>
              </div>

              {textProcessing ? (
                <div className="h-10 bg-gray-50 rounded-lg animate-pulse" />
              ) : textHash ? (
                <>
                  <div className={`${inputClass} bg-gray-50 border-gray-200 break-all`} style={{ minHeight: "44px", padding: "10px 12px" }}>
                    {textHash}
                  </div>
                  <p className="text-xs text-gray-400">{textHash.length} characters</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => copy(textHash, "text-hash")} className={btnClass}>
                      {copiedKey === "text-hash" ? "✓ Copied" : "Copy"}
                    </button>
                    <button onClick={exportTxt} className={btnClass}>Export TXT</button>
                    <button onClick={exportJson} className={btnClass}>Export JSON</button>
                    <button onClick={() => { setText(""); setTextHash(""); setProcessingTime(null); }} className={btnClass}>Clear</button>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-400 py-4 text-center">
                  {text ? "Computing…" : "Enter text above to generate a checksum"}
                </div>
              )}
            </div>

            {/* Multi-algorithm mode */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Multi-Algorithm Mode
              </h3>
              <div className="flex flex-wrap gap-2">
                {ALGORITHMS.map(algo => (
                  <button
                    key={algo}
                    onClick={() => toggleMultiAlgo(algo)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      multiAlgos.includes(algo)
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {algo}
                  </button>
                ))}
              </div>
              <button
                onClick={runMultiAlgo}
                disabled={!text || multiProcessing}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {multiProcessing ? "Computing…" : "Calculate All Selected"}
              </button>

              {Object.keys(multiResults).length > 0 && (
                <div className="space-y-2 mt-1">
                  {(Object.entries(multiResults) as [Algorithm, string][]).map(([algo, hash]) => (
                    <div key={algo} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-xs font-semibold text-gray-600 w-20 flex-shrink-0">{algo}</span>
                      <span className="text-xs font-mono break-all flex-1 text-gray-800">{hash}</span>
                      <button onClick={() => copy(hash, `multi-${algo}`)} className="text-xs text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-2 py-1 rounded flex-shrink-0">
                        {copiedKey === `multi-${algo}` ? "✓" : "Copy"}
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        const lines = Object.entries(multiResults).map(([a, h]) => `${a}: ${h}`).join("\n");
                        downloadFile(`Input: ${text.slice(0, 80)}\n\n${lines}\n\nTimestamp: ${new Date().toISOString()}`, "checksums-multi.txt", "text/plain");
                      }}
                      className={btnClass}
                    >Export TXT</button>
                    <button
                      onClick={() => {
                        downloadFile(JSON.stringify({ input: text.slice(0, 80), checksums: multiResults, timestamp: new Date().toISOString() }, null, 2), "checksums-multi.json", "application/json");
                      }}
                      className={btnClass}
                    >Export JSON</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {mode === "file" && (
          <>
            {/* Algorithm selector for files */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Algorithm</label>
                  <select
                    value={algorithm}
                    onChange={e => setAlgorithm(e.target.value as Algorithm)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    {ALGORITHMS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Encoding</label>
                  <select
                    value={encoding}
                    onChange={e => setEncoding(e.target.value as "hex" | "base64")}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    <option value="hex">Hexadecimal</option>
                    <option value="base64">Base64</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50"
              }`}
            >
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
              <div className="text-3xl mb-2">📁</div>
              <p className="text-sm font-medium text-gray-700 mb-1">Click or drag files here</p>
              <p className="text-xs text-gray-400">Any file type · Batch processing supported</p>
            </div>

            {/* File results */}
            {tasks.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Files ({tasks.length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const done = tasks.filter(t => t.status === "done");
                        const lines = done.map(t => `File: ${t.file.name}\nSize: ${formatBytes(t.file.size)}\n${Object.entries(t.hashes).map(([a, h]) => `${a}: ${h}`).join("\n")}`).join("\n\n---\n\n");
                        downloadFile(lines, "checksums.txt", "text/plain");
                      }}
                      className="text-xs bg-white border border-gray-200 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Export TXT
                    </button>
                    <button
                      onClick={() => {
                        const done = tasks.filter(t => t.status === "done").map(t => ({ filename: t.file.name, size: t.file.size, hashes: t.hashes }));
                        downloadFile(JSON.stringify(done, null, 2), "checksums.json", "application/json");
                      }}
                      className="text-xs bg-white border border-gray-200 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Export JSON
                    </button>
                    <button onClick={() => setTasks([])} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {tasks.map(task => (
                    <div key={task.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1 pr-4">
                          <p className="text-sm font-medium text-gray-900 truncate">{task.file.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{formatBytes(task.file.size)} · {task.file.type || "Unknown type"}</p>
                        </div>
                        <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                      </div>

                      {task.status === "processing" && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Processing…</span><span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${task.progress}%` }} />
                          </div>
                        </div>
                      )}

                      {task.status === "error" && (
                        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-2">{task.error}</p>
                      )}

                      {task.status === "done" && (
                        <div className="space-y-2">
                          {(Object.entries(task.hashes) as [Algorithm, string][]).map(([algo, hash]) => (
                            <div key={algo} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                              <span className="text-xs font-semibold text-gray-500 w-20 flex-shrink-0">{algo}</span>
                              <span className="text-xs font-mono break-all flex-1 text-gray-800">{hash}</span>
                              <button onClick={() => copy(hash, `${task.id}-${algo}`)} className="text-xs text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-2 py-1 rounded flex-shrink-0">
                                {copiedKey === `${task.id}-${algo}` ? "✓" : "Copy"}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Compare Checksums */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
            Compare Checksums
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Checksum A</label>
              <input
                value={compareA}
                onChange={e => setCompareA(e.target.value)}
                placeholder="Paste first checksum…"
                className={inputClass}
                aria-label="Checksum A"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Checksum B</label>
              <input
                value={compareB}
                onChange={e => setCompareB(e.target.value)}
                placeholder="Paste second checksum…"
                className={inputClass}
                aria-label="Checksum B"
              />
            </div>
          </div>
          {compareMatch !== null && (
            <div className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg ${compareMatch ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
              <span>{compareMatch ? "✓ Match" : "✗ Different"}</span>
              <span className="font-normal text-xs">{compareMatch ? "Checksums are identical" : "Checksums do not match"}</span>
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Calculation History
            </h3>
            <span className="text-xs text-gray-400">{showHistory ? "▲ Hide" : "▼ Show"} ({history.length})</span>
          </button>
          {showHistory && (
            <div className="border-t border-gray-100">
              {history.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-400">No history yet</div>
              ) : (
                <>
                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {history.map(entry => (
                      <div key={entry.id} className="px-4 py-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-700 truncate">{entry.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{entry.algorithm} · {entry.encoding}</p>
                          </div>
                          <button onClick={() => copy(entry.checksum, `hist-${entry.id}`)} className="text-xs text-gray-400 hover:text-gray-700 flex-shrink-0">
                            {copiedKey === `hist-${entry.id}` ? "✓" : "Copy"}
                          </button>
                        </div>
                        <p className="text-xs font-mono text-gray-500 mt-1 truncate">{entry.checksum}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <button
                      onClick={() => { clearHistory(); setHistory([]); }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear History
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>

      <ChecksumCalculatorSEO />

      <RelatedTools
        currentTool="checksum-calculator"
        tools={[
          "subnet-calculator",
          "file-hash-generator",
          "hash-generator",
          "ip-range-calculator",
          "text-encrypt-decrypt",
          "bandwidth-calculator",
        ]}
      />
    </>
  );
}
