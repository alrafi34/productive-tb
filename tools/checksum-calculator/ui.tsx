"use client";

import { useState, useCallback, useRef } from "react";
import { calculateHash, formatBytes, downloadFile } from "./logic";
import ChecksumCalculatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type FileTask = {
  id: string;
  file: File;
  status: 'pending' | 'reading' | 'hashing' | 'done' | 'error';
  progress: number;
  error?: string;
  hashes: Record<string, string>;
  selectedAlgorithms: string[];
};

const AVAILABLE_ALGORITHMS = ['CRC32', 'SHA-1', 'SHA-256'];

export default function ChecksumCalculatorUI() {
  const [algorithms, setAlgorithms] = useState<string[]>(['CRC32', 'SHA-1', 'SHA-256']);
  const [tasks, setTasks] = useState<FileTask[]>([]);
  const [compareHash, setCompareHash] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedTask, setCopiedTask] = useState<string | null>(null);

  const toggleAlgorithm = (algo: string) => {
    setAlgorithms(prev => {
      if (prev.includes(algo)) {
        if (prev.length === 1) return prev; // Don't allow empty
        return prev.filter(a => a !== algo);
      }
      return [...prev, algo];
    });
  };

  const processFile = async (taskData: FileTask) => {
    try {
      setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, status: 'reading', progress: 0 } : t));
      
      const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onprogress = (e) => {
            if (e.lengthComputable) {
               const p = Math.round((e.loaded / e.total) * 50);
               setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, progress: p } : t));
            }
        };
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(new Error("Unable to read file data"));
        reader.readAsArrayBuffer(taskData.file);
      });

      setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, status: 'hashing', progress: 50 } : t));

      const newHashes: Record<string, string> = {};
      const increment = 50 / taskData.selectedAlgorithms.length;
      let currentProgress = 50;

      for (const algo of taskData.selectedAlgorithms) {
         try {
           const hash = await calculateHash(buffer, algo);
           newHashes[algo] = hash;
         } catch (e: any) {
           newHashes[algo] = "Error: " + e.message;
         }
         currentProgress += increment;
         setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, progress: Math.min(99, Math.round(currentProgress)) } : t));
      }

      setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, status: 'done', progress: 100, hashes: newHashes } : t));

    } catch (err: any) {
      setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, status: 'error', error: err.message || "Error reading file" } : t));
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const newTasks: FileTask[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
      file,
      status: 'pending',
      progress: 0,
      hashes: {},
      selectedAlgorithms: [...algorithms]
    }));

    setTasks(prev => [...prev, ...newTasks]);

    // Start processing
    newTasks.forEach(task => processFile(task));
    
    // reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [algorithms]);

  const copyToClipboard = (text: string, taskId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTask(taskId);
    setTimeout(() => setCopiedTask(null), 2000);
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearAll = () => { setTasks([]); setCompareHash(""); };

  const exportData = (format: 'csv' | 'json' | 'txt') => {
    if (tasks.length === 0) return;
    
    const completedTasks = tasks.filter(t => t.status === 'done');
    let content = "";
    
    if (format === 'csv') {
      content = "Filename,Size," + AVAILABLE_ALGORITHMS.join(",") + "\n";
      completedTasks.forEach(t => {
        const row = [
          `"${t.file.name}"`, 
          `"${formatBytes(t.file.size)}"`,
          ...AVAILABLE_ALGORITHMS.map(a => `"${t.hashes[a] || ''}"`)
        ];
        content += row.join(",") + "\n";
      });
      downloadFile(content, "checksums.csv", "text/csv;charset=utf-8;");
    } else if (format === 'json') {
      const data = completedTasks.map(t => ({
        filename: t.file.name,
        size: t.file.size,
        sizeFormatted: formatBytes(t.file.size),
        hashes: t.hashes
      }));
      content = JSON.stringify(data, null, 2);
      downloadFile(content, "checksums.json", "application/json");
    } else if (format === 'txt') {
      completedTasks.forEach(t => {
        content += `File: ${t.file.name}\nSize: ${formatBytes(t.file.size)}\n`;
        Object.entries(t.hashes).forEach(([algo, hash]) => {
          content += `${algo}: ${hash}\n`;
        });
        content += "\n-----------------------\n\n";
      });
      downloadFile(content, "checksums.txt", "text/plain;charset=utf-8;");
    }
  };

  const getHashColor = (hashValue: string) => {
    if (!compareHash || typeof compareHash !== 'string') return "";
    const cleanHash = hashValue.trim().toLowerCase();
    const cleanCompare = compareHash.trim().toLowerCase();
    if (cleanHash === cleanCompare && cleanCompare.length > 0) {
      return "bg-green-100 border-green-400 text-green-800";
    }
    return "";
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <div className="text-xl mt-0.5">🔒</div>
          <div>
            <h3 className="text-sm font-semibold text-blue-900" style={{ fontFamily: "var(--font-heading)" }}>Privacy Guaranteed</h3>
            <p className="text-sm text-blue-700 mt-1" style={{ fontFamily: "var(--font-body)" }}>
              All files are processed locally in your browser using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" className="underline" target="_blank" rel="noopener noreferrer">Web Crypto API</a>. No data is ever uploaded to any server.
            </p>
          </div>
        </div>

        {/* Algorithm Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
          <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
            Select Hash Algorithms
          </label>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_ALGORITHMS.map(algo => (
              <button
                key={algo}
                onClick={() => toggleAlgorithm(algo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  algorithms.includes(algo)
                    ? "bg-green-50 border-primary text-primary"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {algo}
              </button>
            ))}
          </div>
        </div>

        {/* File Dropper */}
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative overflow-hidden cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
            isDragging ? "border-primary bg-green-50/50" : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          <div className="text-4xl mb-3">📁</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            Click or drag files here
          </h3>
          <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
            Process any file format of any size. Batch processing supported.
          </p>
        </div>

        {/* Compare Hash Input */}
        {tasks.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
            <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
              🔍 Compare Hash (Optional)
            </label>
            <input
              type="text"
              value={compareHash}
              onChange={e => setCompareHash(e.target.value)}
              placeholder="Paste a hash here to verify..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}

        {/* Results / Tasks Dashboard */}
        {tasks.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
               <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Processed Files ({tasks.length})</h3>
               <div className="flex gap-2">
                 <button onClick={() => exportData('txt')} className="text-xs bg-white border border-gray-200 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors shadow-sm">Export TXT</button>
                 <button onClick={() => exportData('csv')} className="text-xs bg-white border border-gray-200 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors shadow-sm">Export CSV</button>
                 <button onClick={() => exportData('json')} className="text-xs bg-white border border-gray-200 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors shadow-sm">Export JSON</button>
                 <button onClick={clearAll} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors font-medium">Clear All</button>
               </div>
            </div>

            <div className="divide-y divide-gray-100 block overflow-x-auto w-full">
              {tasks.map((task) => (
                <div key={task.id} className="p-5 flex flex-col gap-4">
                  {/* File Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-semibold text-gray-900 text-sm truncate" title={task.file.name}>{task.file.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{formatBytes(task.file.size)} • {task.file.type || "Unknown type"}</p>
                    </div>
                    <div>
                      <button onClick={() => removeTask(task.id)} className="text-gray-400 hover:text-red-500">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>

                  {/* Status & Progress */}
                  {task.status !== 'done' && task.status !== 'error' && (
                     <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{task.status === 'reading' ? 'Reading file...' : 'Calculating hashes...'}</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-primary h-1.5 rounded-full transition-all duration-200 ease-out" style={{ width: `${task.progress}%` }}></div>
                        </div>
                     </div>
                  )}

                  {/* Error State */}
                  {task.status === 'error' && (
                     <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-100">
                       {task.error}
                     </div>
                  )}

                  {/* Hashes List */}
                  {task.status === 'done' && (
                    <div className="space-y-2 mt-1">
                      {task.selectedAlgorithms.map(algo => {
                        const hashVal = task.hashes[algo] || "";
                        const highlightClass = getHashColor(hashVal);
                        return (
                          <div key={algo} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 ${highlightClass}`}>
                            <span className="text-xs font-semibold text-gray-600 w-20 flex-shrink-0" style={{ fontFamily: "var(--font-heading)" }}>{algo}</span>
                            <span className={`text-xs font-mono break-all flex-1 ${highlightClass ? 'text-green-800' : 'text-gray-800'}`}>
                              {hashVal}
                            </span>
                            <button 
                              onClick={() => copyToClipboard(hashVal, `${task.id}-${algo}`)}
                              className="text-xs font-medium text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm flex-shrink-0 self-start sm:self-auto"
                            >
                              {copiedTask === `${task.id}-${algo}` ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      <ChecksumCalculatorSEOContent />
      
      <RelatedTools
        currentTool="checksum-calculator"
        tools={['file-hash-generator', 'hash-generator', 'text-encrypt-decrypt']}
      />
    </>
  );
}
