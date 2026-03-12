"use client";

import { useState, useEffect } from "react";
import { 
  TimestampDetails,
  DiffResult,
  parseTimestamp,
  generateTimestampDetails,
  calculateDifference
} from "./logic";
import UnixTimestampConverterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'unix-to-date' | 'date-to-unix' | 'batch' | 'diff';

export default function UnixTimestampConverterUI() {
  const [mode, setMode] = useState<Mode>('unix-to-date');

  // Input States
  const [unixInput, setUnixInput] = useState<string>("1700000000");
  const [dateInput, setDateInput] = useState<string>("2026-03-12T12:30");
  
  // Results
  const [unixDetails, setUnixDetails] = useState<TimestampDetails | null>(null);
  
  // Date to Unix results
  const [dateTypeResult, setDateTypeResult] = useState<{ms: number, s: number, valid: boolean}>({ms: 0, s: 0, valid: false});

  // Batch Mode
  const [batchInput, setBatchInput] = useState<string>("1700000000\n1700001000\n1700002000");
  const [batchResults, setBatchResults] = useState<{raw: string, details: TimestampDetails | null}[]>([]);

  // Diff Mode
  const [diffInputA, setDiffInputA] = useState<string>("1700000000");
  const [diffInputB, setDiffInputB] = useState<string>("1700100000");
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);

  // Live Clocks
  const [nowMs, setNowMs] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState("");

  // Update Live Clock
  useEffect(() => {
    setIsMounted(true);
    setNowMs(Date.now());
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Main Conversion Effect (Unix -> Date)
  useEffect(() => {
    if (mode === 'unix-to-date') {
      const parsed = generateTimestampDetails(unixInput);
      setUnixDetails(parsed);
    } 
    else if (mode === 'date-to-unix') {
      const parsed = parseTimestamp(dateInput);
      if (parsed.type === 'invalid') {
         setDateTypeResult({ms: 0, s: 0, valid: false});
      } else {
         setDateTypeResult({ms: parsed.unixMs, s: Math.floor(parsed.unixMs / 1000), valid: true});
      }
    }
    else if (mode === 'batch') {
      const lines = batchInput.split('\n').map(l => l.trim()).filter(Boolean);
      const output = lines.map(l => ({ raw: l, details: generateTimestampDetails(l) }));
      setBatchResults(output);
    }
    else if (mode === 'diff') {
      const pA = parseTimestamp(diffInputA);
      const pB = parseTimestamp(diffInputB);
      
      if (pA.type !== 'invalid' && pB.type !== 'invalid') {
         setDiffResult(calculateDifference(pA.unixMs, pB.unixMs));
      } else {
         setDiffResult(null);
      }
    }

  }, [unixInput, dateInput, batchInput, diffInputA, diffInputB, mode]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Live Epoch Clock Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
              <p className="text-gray-400 font-medium text-sm mb-1 uppercase tracking-wider">Current Live Epoch Time</p>
              <div className="flex items-baseline gap-3">
                 <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                   {isMounted ? Math.floor(nowMs / 1000) : "----------"}
                 </span>
                 <span className="text-xl text-gray-400">sec</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                {isMounted ? `${nowMs} milliseconds (ms)` : "---------- milliseconds (ms)"}
              </p>
           </div>
           
           <div className="flex gap-2 w-full md:w-auto self-start md:self-auto">
             <button 
                onClick={() => copyToClipboard(Math.floor(nowMs / 1000).toString(), 'live-sec')}
                className="bg-white/10 hover:bg-white/20 text-white transition-colors px-4 py-2 rounded-lg text-sm font-semibold flex-1 md:flex-none border border-white/10"
             >
                {copied === 'live-sec' ? 'Copied!' : 'Copy Secs'}
             </button>
             <button 
                onClick={() => copyToClipboard(nowMs.toString(), 'live-ms')}
                className="bg-white/10 hover:bg-white/20 text-white transition-colors px-4 py-2 rounded-lg text-sm font-semibold flex-1 md:flex-none border border-white/10"
             >
                {copied === 'live-ms' ? 'Copied!' : 'Copy Ms'}
             </button>
           </div>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button onClick={() => setMode('unix-to-date')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'unix-to-date' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            Unix ➔ Date
          </button>
          <button onClick={() => setMode('date-to-unix')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'date-to-unix' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            Date ➔ Unix
          </button>
          <button onClick={() => setMode('diff')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'diff' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            Compare Difference
          </button>
          <button onClick={() => setMode('batch')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'batch' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            Batch Convert
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Panel (Left Col) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              
              {/* INPUT: Unix -> Date */}
              {mode === 'unix-to-date' && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>Enter Epoch String</label>
                    {unixDetails && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">
                        Detected: {unixDetails.type === 'seconds' ? 'Seconds' : 'Milliseconds'}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={unixInput}
                    onChange={(e) => setUnixInput(e.target.value)}
                    placeholder="1700000000"
                    className={`w-full rounded-lg border bg-gray-50 px-4 py-3 font-mono font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 ${unixInput && !unixDetails ? 'border-red-300 focus:ring-red-400' : 'border-gray-200'}`}
                  />
                  {unixInput && !unixDetails && <p className="text-xs text-red-500 mt-2 font-medium">Invalid Timestamp Configuration</p>}
                </div>
              )}

              {/* INPUT: Date -> Unix */}
              {mode === 'date-to-unix' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Parse Date Input</label>
                  <p className="text-xs text-gray-500 mb-3">Accepts flexible date/time formatting or localized string types naturally.</p>
                  <input
                    type="text"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    placeholder="2026-03-12 12:30:00"
                    className={`w-full rounded-lg border bg-gray-50 px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 ${dateInput && !dateTypeResult.valid ? 'border-red-300 focus:ring-red-400' : 'border-gray-200'}`}
                  />
                  {dateInput && !dateTypeResult.valid && <p className="text-xs text-red-500 mt-2 font-medium">Invalid DateTime Representation</p>}
                </div>
              )}

              {/* INPUT: Compare Diff */}
              {mode === 'diff' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Timestamp A</label>
                    <input
                      type="text"
                      value={diffInputA}
                      onChange={(e) => setDiffInputA(e.target.value)}
                      placeholder="1700000000"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Timestamp B</label>
                    <input
                      type="text"
                      value={diffInputB}
                      onChange={(e) => setDiffInputB(e.target.value)}
                      placeholder="1700100000"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              )}

              {/* INPUT: Batch Mode */}
              {mode === 'batch' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Paste Multiple Timestamps</label>
                  <textarea
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32 resize-y"
                    placeholder="1700000000&#10;1700001000"
                  />
                </div>
              )}

            </div>

            {/* Hint Box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Quick Reference Guide</h3>
              <ul className="text-xs text-blue-700 space-y-1.5 list-disc pl-4">
                 <li><strong>10-digits:</strong> Automatically calculates as absolute Seconds tracking index.</li>
                 <li><strong>13-digits:</strong> Automatically interprets processing as precise Milliseconds index.</li>
                 <li>Relative timelines refresh instantly indicating real-life chronologies dynamically.</li>
              </ul>
            </div>

          </div>

          {/* Results Panel (Right Col) */}
          <div className="lg:col-span-8">
            
            {/* VIEW: Unix -> Date */}
            {mode === 'unix-to-date' && unixDetails && (
               <div className="space-y-6">
                 
                 {/* Main Readout View */}
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 border-b border-gray-100 pb-6 gap-4">
                       <div>
                         <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Local Timezone Evaluation</p>
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{unixDetails.localString}</h2>
                         <p className="text-primary font-semibold text-sm mt-1">Relative Target: {unixDetails.relative}</p>
                       </div>
                       <button onClick={() => copyToClipboard(unixDetails.localString, 'local')} className="flex-shrink-0 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition">
                          {copied === 'local' ? 'Copied' : '📋 Copy Local'}
                       </button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                       <div>
                         <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">UTC / Universal Timeline</p>
                         <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{unixDetails.utcString}</h3>
                       </div>
                       <button onClick={() => copyToClipboard(unixDetails.utcString, 'utc')} className="flex-shrink-0 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition">
                          {copied === 'utc' ? 'Copied' : '📋 Copy UTC'}
                       </button>
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    {/* Timezones Block */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                       <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                         <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Global Timelines</h3>
                       </div>
                       <ul className="divide-y divide-gray-100 text-sm">
                          {unixDetails.timezones.map((tz, i) => (
                             <li key={i} className="flex justify-between items-center p-4 hover:bg-gray-50/50">
                                <span className="font-semibold text-gray-500 w-1/3">{tz.name}</span>
                                <span className="text-gray-900 font-medium text-right flex-1">{tz.time}</span>
                             </li>
                          ))}
                       </ul>
                    </div>

                    {/* Developer Formats Block */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                       <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                         <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Developer Formats</h3>
                       </div>
                       <ul className="divide-y divide-gray-100 text-sm">
                          {unixDetails.formats.map((fmt, i) => (
                             <li key={i} className="group flex justify-between items-center p-4 hover:bg-gray-50/50">
                                <span className="font-semibold text-gray-500 w-1/3">{fmt.format}</span>
                                <span className="text-gray-900 font-mono text-right flex-1 text-xs sm:text-sm truncate mr-2" title={fmt.value}>{fmt.value}</span>
                                <button 
                                  onClick={() => copyToClipboard(fmt.value, `fmt-${i}`)}
                                  className={`text-xs ${copied === `fmt-${i}` ? 'text-green-500' : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-primary transition-all'}`}
                                >
                                  {copied === `fmt-${i}` ? '✓' : 'Copy'}
                                </button>
                             </li>
                          ))}
                       </ul>
                    </div>

                 </div>

               </div>
            )}

            {/* VIEW: Date -> Unix */}
            {mode === 'date-to-unix' && dateTypeResult.valid && (
               <div className="space-y-6">
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-full max-w-md">
                       <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Unix Seconds</p>
                       <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex justify-between items-center group">
                          <code className="text-3xl font-mono font-bold text-gray-900 bg-transparent">{dateTypeResult.s}</code>
                          <button onClick={() => copyToClipboard(dateTypeResult.s.toString(), 's-cpy')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:text-primary hover:border-primary transition">
                            {copied === 's-cpy' ? 'Copied!' : 'Copy'}
                          </button>
                       </div>
                    </div>

                    <div className="w-full max-w-md">
                       <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Unix Milliseconds</p>
                       <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex justify-between items-center group">
                          <code className="text-3xl font-mono font-bold text-gray-900 bg-transparent">{dateTypeResult.ms}</code>
                          <button onClick={() => copyToClipboard(dateTypeResult.ms.toString(), 'ms-cpy')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:text-primary hover:border-primary transition">
                            {copied === 'ms-cpy' ? 'Copied!' : 'Copy'}
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
            )}

            {/* VIEW: Diff Mode */}
            {mode === 'diff' && diffResult && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center space-y-6">
                  
                  <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Total Chronological Difference</h3>
                  
                  <div className="inline-block bg-primary/10 border border-primary/20 rounded-xl p-6 text-primary max-w-full">
                     <p className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                       {diffResult.formatted}
                     </p>
                     <p className="text-sm font-semibold opacity-80 mt-3 font-mono">
                       Raw Milliseconds: {diffResult.ms.toLocaleString()}
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4 text-sm font-semibold text-gray-600">
                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="block text-xl text-gray-900 mb-1">{diffResult.days.toLocaleString()}</span> Days
                     </div>
                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="block text-xl text-gray-900 mb-1">{Math.floor(diffResult.ms / (1000 * 60 * 60)).toLocaleString()}</span> Hours
                     </div>
                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="block text-xl text-gray-900 mb-1">{Math.floor(diffResult.ms / (1000 * 60)).toLocaleString()}</span> Mins
                     </div>
                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="block text-xl text-gray-900 mb-1">{Math.floor(diffResult.ms / 1000).toLocaleString()}</span> Secs
                     </div>
                  </div>

               </div>
            )}

            {/* VIEW: Batch Mode */}
            {mode === 'batch' && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
                     <h3 className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Batch Results Array</h3>
                  </div>
                  <div className="max-h-[500px] overflow-x-auto overflow-y-auto custom-scrollbar">
                     <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white sticky top-0 uppercase tracking-wide text-[10px] text-gray-400 font-bold border-b border-gray-100 shadow-sm z-10">
                           <tr>
                              <th className="px-5 py-3">Epoch Line Input</th>
                              <th className="px-5 py-3">UTC Formatting Output</th>
                              <th className="px-5 py-3 text-right">Relative State</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                           {batchResults.length === 0 ? (
                              <tr><td colSpan={3} className="px-5 py-8 text-center text-gray-400">Awaiting inputs to generate list tree...</td></tr>
                           ) : batchResults.map((row, i) => (
                              <tr key={i} className="hover:bg-gray-50/50">
                                 <td className="px-5 py-4 font-mono font-medium text-gray-900">{row.raw}</td>
                                 <td className="px-5 py-4">
                                    {row.details ? <span className="text-gray-700">{row.details.utcString}</span> : <span className="text-red-400 font-semibold text-xs">ERR: Invalid Parse</span>}
                                 </td>
                                 <td className="px-5 py-4 text-right">
                                    {row.details ? <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">{row.details.relative}</span> : '-'}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

          </div>

        </div>
      </div>
      
      <UnixTimestampConverterSEO />
      
      <RelatedTools
        currentTool="timestamp-unix-converter"
        tools={['age-calculator', 'percentage-calculator', 'checksum-calculator']}
      />
    </>
  );
}
