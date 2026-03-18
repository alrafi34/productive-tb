"use client";

import { useState, useEffect } from "react";
import { 
  AgeResult,
  LifetimeStats,
  NextBirthday,
  ZodiacInfo,
  Milestone,
  getWeekday,
  calculateExactAge,
  calculateLifetimeStats,
  calculateNextBirthday,
  getZodiacSigns,
  getMilestones,
  getAgeProgressDetails
} from "./logic";
import AgeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'normal' | 'batch';

export default function AgeCalculatorUI() {
  const [mode, setMode] = useState<Mode>('normal');

  // Input States
  const [birthDateStr, setBirthDateStr] = useState<string>("1998-05-15");
  const [currentDateStr, setCurrentDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Results States
  const [age, setAge] = useState<AgeResult | null>(null);
  const [stats, setStats] = useState<LifetimeStats | null>(null);
  const [nextBday, setNextBday] = useState<NextBirthday | null>(null);
  const [zodiac, setZodiac] = useState<ZodiacInfo | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [progress, setProgress] = useState<{percent: number, daysPassedInYear: number, totalDaysInYear: number} | null>(null);
  
  // Batch Mode States
  const [batchInput, setBatchInput] = useState<string>("1995-03-12\n2001-11-25\n1988-07-09");
  const [batchResults, setBatchResults] = useState<{dob: string, result: AgeResult | null}[]>([]);

  const [copied, setCopied] = useState("");

  // Live Timer for precise time elapsed
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    // Only update 'now' if current date is 'today'
    const todayStr = new Date().toISOString().split('T')[0];
    if (currentDateStr === todayStr) {
      const interval = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(interval);
    }
  }, [currentDateStr]);

  // Main calculations
  useEffect(() => {
    if (mode === 'normal') {
      const bDate = new Date(birthDateStr);
      let cDate = new Date(currentDateStr);
      
      // If current date is today, use the highly precise 'now'
      const todayStr = new Date().toISOString().split('T')[0];
      if (currentDateStr === todayStr) {
        cDate = now;
      }

      if (isNaN(bDate.getTime()) || isNaN(cDate.getTime()) || bDate.getTime() > cDate.getTime()) {
        setAge(null);
        return;
      }

      setAge(calculateExactAge(bDate, cDate));
      setStats(calculateLifetimeStats(bDate, cDate));
      setNextBday(calculateNextBirthday(bDate, cDate));
      setZodiac(getZodiacSigns(bDate));
      setMilestones(getMilestones(bDate, cDate));
      setProgress(getAgeProgressDetails(bDate, cDate));

    } else if (mode === 'batch') {
      const cDate = new Date(currentDateStr);
      if (isNaN(cDate.getTime())) return;

      const lines = batchInput.split('\n').map(l => l.trim()).filter(Boolean);
      const results = lines.map(line => {
        const bDate = new Date(line);
        if (isNaN(bDate.getTime()) || bDate.getTime() > cDate.getTime()) {
          return { dob: line, result: null };
        }
        return { dob: line, result: calculateExactAge(bDate, cDate) };
      });
      setBatchResults(results);
    }
  }, [birthDateStr, currentDateStr, now, mode, batchInput]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getFullBreakdownText = () => {
    if (!age || !stats || !nextBday || !zodiac) return "";
    return `Age: ${age.years} years, ${age.months} months, ${age.days} days
Total Days Lived: ${stats.totalDays.toLocaleString()}
Next Birthday In: ${nextBday.months}m ${nextBday.days}d
Zodiac: ${zodiac.western} / ${zodiac.chinese}
Born On: ${getWeekday(new Date(birthDateStr))}
Calculated via Productive Toolbox`;
  };

  const exportCSV = () => {
    if (batchResults.length === 0) return;
    let csv = "Date of Birth,Years,Months,Days\n";
    batchResults.forEach(r => {
      if (r.result) {
        csv += `${r.dob},${r.result.years},${r.result.months},${r.result.days}\n`;
      } else {
        csv += `${r.dob},Invalid Date,,\n`;
      }
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "batch_ages.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button onClick={() => setMode('normal')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'normal' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            Exact Age Calculator
          </button>
          <button onClick={() => setMode('batch')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'batch' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            Batch Calculator
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Panel (Left Col) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              
              {/* DOB Input */}
              {mode === 'normal' ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Date of Birth</label>
                  <input
                    type="date"
                    value={birthDateStr}
                    onChange={(e) => setBirthDateStr(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {birthDateStr && !isNaN(new Date(birthDateStr).getTime()) && (
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      Born on a <strong>{getWeekday(new Date(birthDateStr))}</strong>
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Dates of Birth (YYYY-MM-DD)</label>
                  <textarea
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32 resize-y"
                    placeholder="1990-01-15&#10;2005-08-20"
                  />
                </div>
              )}

              {/* Current Date Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Compare With Date</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={currentDateStr}
                    onChange={(e) => setCurrentDateStr(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button 
                    onClick={() => setCurrentDateStr(new Date().toISOString().split('T')[0])}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors border border-gray-200 shadow-sm"
                  >
                    Today
                  </button>
                </div>
              </div>

            </div>

            {/* Zodiac Panel */}
            {mode === 'normal' && zodiac && age !== null && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                 <h3 className="text-sm font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Astrology Profile</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-center">
                       <span className="text-2xl block mb-1">{zodiac.westernIcon}</span>
                       <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Western</span>
                       <p className="font-semibold text-blue-900">{zodiac.western}</p>
                    </div>
                    <div className="bg-red-50/50 border border-red-100 rounded-lg p-3 text-center">
                       <span className="text-2xl block mb-1">{zodiac.chineseIcon}</span>
                       <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Chinese</span>
                       <p className="font-semibold text-red-900">{zodiac.chinese}</p>
                    </div>
                 </div>
               </div>
            )}

          </div>

          {/* Results Panel (Right Col) */}
          <div className="lg:col-span-8">
            
            {mode === 'normal' && age !== null && stats && nextBday && progress && zodiac ? (
               <div className="space-y-6">
                 
                 {/* Main Age Result */}
                 <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                       <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    
                    <div className="relative z-10">
                       <p className="text-primary-100 font-medium mb-2 uppercase tracking-wide text-sm" style={{ fontFamily: "var(--font-heading)" }}>You are exactly</p>
                       <div className="flex flex-wrap items-baseline gap-3 mb-6">
                          <div className="flex items-baseline gap-1.5"><span className="text-5xl md:text-6xl font-bold">{age.years}</span><span className="text-xl md:text-2xl text-primary-100">years</span></div>
                          <div className="flex items-baseline gap-1.5"><span className="text-5xl md:text-6xl font-bold">{age.months}</span><span className="text-xl md:text-2xl text-primary-100">months</span></div>
                          <div className="flex items-baseline gap-1.5"><span className="text-5xl md:text-6xl font-bold">{age.days}</span><span className="text-xl md:text-2xl text-primary-100">days</span></div>
                          <span className="text-xl md:text-2xl text-primary-100 ml-1">old.</span>
                       </div>

                       {/* Age Progress Bar */}
                       <div className="bg-black/20 rounded-xl p-4 mt-6">
                          <div className="flex justify-between text-xs font-semibold text-primary-100 mb-2">
                             <span>Age {age.years} Progress</span>
                             <span>{progress.percent.toFixed(1)}% ({progress.daysPassedInYear} / {progress.totalDaysInYear} days)</span>
                          </div>
                          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden flex">
                             <div className="bg-white h-full transition-all duration-500" style={{ width: `${progress.percent}%` }}></div>
                          </div>
                       </div>
                       
                       <div className="pt-6 flex flex-wrap gap-2">
                          <button 
                            onClick={() => copyToClipboard(`${age.years} years, ${age.months} months, ${age.days} days`, "age")}
                            className="bg-white text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm"
                          >
                            {copied === "age" ? "Copied!" : "📋 Copy Age"}
                          </button>
                          <button 
                            onClick={() => copyToClipboard(getFullBreakdownText(), "full")}
                            className="bg-primary-dark border border-white/20 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
                          >
                            {copied === "full" ? "Copied Breakdown" : "📋 Copy Full Breakdown"}
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* 3 Columns Details */}
                 <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Lifetime Stats */}
                    <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                       <h3 className="text-base font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Lifetime Statistics</h3>
                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                             <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Total Months</span>
                             <span className="font-mono font-semibold text-gray-900">{stats.totalMonths.toLocaleString()}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                             <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Total Weeks</span>
                             <span className="font-mono font-semibold text-gray-900">{stats.totalWeeks.toLocaleString()}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                             <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Total Days</span>
                             <span className="font-mono font-semibold text-gray-900">{stats.totalDays.toLocaleString()}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                             <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Total Hours</span>
                             <span className="font-mono font-semibold text-gray-900">{stats.totalHours.toLocaleString()}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 sm:col-span-2">
                             <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Total Minutes</span>
                             <span className="font-mono font-semibold text-gray-900">{stats.totalMinutes.toLocaleString()}</span>
                          </div>
                       </div>
                    </div>

                    {/* Next Birthday */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
                       <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-heading)" }}>Next Birthday</h3>
                       <div className="text-4xl mb-2">🎈</div>
                       <p className="font-semibold text-gray-900 pb-1">{nextBday.months} months, {nextBday.days} days</p>
                       <p className="text-sm text-gray-500 font-medium">({nextBday.totalDaysLeft} days left)</p>
                       <div className="mt-4 pt-4 border-t border-gray-100 w-full text-xs text-gray-400 font-semibold">
                          Falls on a {nextBday.weekdayName}
                       </div>
                    </div>

                 </div>

                 {/* Milestones Panel */}
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Life Milestones Guide</h3>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                       {milestones.map((ms, i) => (
                         <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${ms.completed ? 'bg-green-50/50 border-green-100' : 'bg-gray-50/50 border-gray-100'}`}>
                           <div className="flex items-center gap-3">
                              <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs ${ms.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                                {ms.completed ? '✓' : '•'}
                              </span>
                              <span className={`font-medium text-sm ${ms.completed ? 'text-gray-900' : 'text-gray-500'}`}>{ms.name}</span>
                           </div>
                           <span className="text-xs font-mono text-gray-500 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                             {ms.date.toLocaleDateString()}
                           </span>
                         </div>
                       ))}
                    </div>
                 </div>

               </div>
            ) : mode === 'normal' && age === null ? (
               <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center text-red-600">
                  <span className="text-3xl block mb-2">📅</span>
                  <strong>Invalid Dates</strong>
                  <p className="text-sm mt-1">Please ensure the Birth Date is older than the Compare Date.</p>
               </div>
            ) : null}

            {/* BATCH RESULT */}
            {mode === 'batch' && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                     <div className="space-y-0.5">
                       <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Batch Output</h3>
                       <p className="text-xs text-gray-500">Calculated for target date: {currentDateStr}</p>
                     </div>
                     <button onClick={exportCSV} disabled={batchResults.length === 0} className="text-sm bg-white border border-gray-200 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors shadow-sm font-medium disabled:opacity-50">
                        💾 Export CSV
                     </button>
                  </div>
                  
                  <div className="divide-y divide-gray-100 block overflow-x-auto w-full custom-scrollbar max-h-[600px] overflow-y-auto">
                     <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
                       <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 shadow-sm">
                         <tr>
                           <th className="px-6 py-3 font-semibold">Date of Birth</th>
                           <th className="px-6 py-3 font-semibold">Exact Age</th>
                           <th className="px-6 py-3 font-semibold">Total Days</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100 bg-white">
                         {batchResults.length === 0 ? (
                           <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400">No valid dates parsed</td></tr>
                         ) : batchResults.map((row, i) => (
                           <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                             <td className="px-6 py-4 font-mono font-medium text-gray-900">{row.dob}</td>
                             <td className="px-6 py-4">
                               {row.result ? `${row.result.years}Y, ${row.result.months}M, ${row.result.days}D` : <span className="text-red-400">Invalid</span>}
                             </td>
                             <td className="px-6 py-4 font-mono">
                               {row.result ? calculateLifetimeStats(new Date(row.dob), new Date(currentDateStr)).totalDays.toLocaleString() : '-'}
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
      
      <AgeCalculatorSEO />
      
      <RelatedTools
        currentTool="age-calculator"
        tools={['date-difference-calculator', 'time-duration-calculator', 'bmi-calculator']}
      />
    </>
  );
}
