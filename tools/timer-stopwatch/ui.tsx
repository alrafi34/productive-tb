"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { 
  LapRecord, 
  LapAnalysis, 
  CountdownTimer, 
  TimerSessionHistory,
  formatTime, 
  analyzeLaps, 
  createCountdownTimer,
  playNotificationSound
} from "./logic";
import TimerStopwatchSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'stopwatch' | 'countdown';

export default function TimerStopwatchUI() {
  const [activeMode, setActiveMode] = useState<Mode>('stopwatch');
  
  // Stopwatch State
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<LapRecord[]>([]);
  const swStartTime = useRef<number>(0);
  const swAccumulatedTime = useRef<number>(0);
  const swFrame = useRef<number>(0);

  // Countdown State
  const [timers, setTimers] = useState<CountdownTimer[]>([]);
  const [customMinutes, setCustomMinutes] = useState(5);
  const [customSeconds, setCustomSeconds] = useState(0);
  const cdFrame = useRef<number>(0);

  // Global State
  const [history, setHistory] = useState<TimerSessionHistory[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load History
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('timerHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (type: TimerSessionHistory['type'], duration: number, lapsCount?: number) => {
    const newEntry: TimerSessionHistory = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      type,
      duration,
      laps: lapsCount
    };
    const updated = [newEntry, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem('timerHistory', JSON.stringify(updated));
  };

  // Stopwatch Logic
  const updateStopwatch = () => {
    const now = performance.now();
    setSwTime(swAccumulatedTime.current + (now - swStartTime.current));
    swFrame.current = requestAnimationFrame(updateStopwatch);
  };

  const toggleStopwatch = () => {
    if (swRunning) {
      cancelAnimationFrame(swFrame.current);
      swAccumulatedTime.current += (performance.now() - swStartTime.current);
      setSwRunning(false);
    } else {
      swStartTime.current = performance.now();
      setSwRunning(true);
      swFrame.current = requestAnimationFrame(updateStopwatch);
    }
  };

  const resetStopwatch = () => {
    if (swTime > 0) saveToHistory('stopwatch', swTime, laps.length);
    cancelAnimationFrame(swFrame.current);
    setSwTime(0);
    setSwRunning(false);
    setLaps([]);
    swAccumulatedTime.current = 0;
  };

  const addLap = () => {
    const lastOverall = laps.length > 0 ? laps[0].overall : 0;
    const newLap: LapRecord = {
      id: laps.length + 1,
      time: swTime - lastOverall,
      overall: swTime
    };
    setLaps([newLap, ...laps]);
  };

  // Countdown Logic
  const addTimer = (label: string, seconds: number) => {
    setTimers([...timers, createCountdownTimer(label, seconds)]);
  };

  const updateCountdowns = () => {
    const now = performance.now();
    setTimers(prev => prev.map(t => {
      if (t.status !== 'running') return t;
      const elapsed = now - t.lastTick;
      const remaining = Math.max(0, t.remainingMs - elapsed);
      if (remaining === 0) {
        playNotificationSound();
        saveToHistory('countdown', t.initialSeconds * 1000);
        return { ...t, remainingMs: 0, status: 'completed' as const, lastTick: now };
      }
      return { ...t, remainingMs: remaining, lastTick: now };
    }));
    cdFrame.current = requestAnimationFrame(updateCountdowns);
  };

  useEffect(() => {
    cdFrame.current = requestAnimationFrame(updateCountdowns);
    return () => cancelAnimationFrame(cdFrame.current);
  }, []);

  const toggleTimer = (id: string) => {
    setTimers(timers.map(t => {
      if (t.id === id) {
        if (t.status === 'running') return { ...t, status: 'paused' as const };
        return { ...t, status: 'running' as const, lastTick: performance.now() };
      }
      return t;
    }));
  };

  const removeTimer = (id: string) => setTimers(timers.filter(t => t.id !== id));

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMode === 'stopwatch') {
        if (e.code === 'Space') toggleStopwatch();
        if (e.code === 'KeyL') addLap();
        if (e.code === 'KeyR') resetStopwatch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swRunning, swTime, laps, activeMode]);

  const lapStats = useMemo(() => analyzeLaps(laps), [laps]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Mode Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-xl w-fit mx-auto lg:mx-0">
        <button 
          onClick={() => setActiveMode('stopwatch')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeMode === 'stopwatch' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Stopwatch
        </button>
        <button 
          onClick={() => setActiveMode('countdown')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeMode === 'countdown' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Timer
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Display Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {activeMode === 'stopwatch' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-12 text-center space-y-8">
              <div className="space-y-2">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">High Resolution Stopwatch</span>
                <h1 className="text-7xl sm:text-9xl font-black text-gray-900 tracking-tighter tabular-nums leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {isMounted ? formatTime(swTime) : "00:00:00.00"}
                </h1>
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={toggleStopwatch}
                  className={`px-10 py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg ${swRunning ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/20'}`}
                >
                  {swRunning ? "PAUSE" : "START"}
                </button>
                <button 
                  onClick={addLap}
                  disabled={!swRunning}
                  className="px-10 py-5 rounded-2xl font-bold text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
                >
                  LAP
                </button>
                <button 
                  onClick={resetStopwatch}
                  className="px-6 py-5 rounded-2xl font-bold bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
                >
                  RESET
                </button>
              </div>

              {laps.length > 0 && (
                <div className="pt-8 border-t border-gray-50 space-y-6">
                   <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                        <span className="block text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">Fastest Lap</span>
                        <span className="text-lg font-bold text-green-700 tabular-nums">{formatTime(lapStats.fastest || 0)}</span>
                      </div>
                      <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
                        <span className="block text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Slowest Lap</span>
                        <span className="text-lg font-bold text-red-700 tabular-nums">{formatTime(lapStats.slowest || 0)}</span>
                      </div>
                      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                        <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Average</span>
                        <span className="text-lg font-bold text-blue-700 tabular-nums">{formatTime(lapStats.average || 0)}</span>
                      </div>
                   </div>

                   <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      <table className="w-full text-left">
                        <thead className="sticky top-0 bg-white text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100">
                          <tr>
                            <th className="px-4 py-3">Lap</th>
                            <th className="px-4 py-3">Lap Time</th>
                            <th className="px-4 py-3 text-right">Overall Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {laps.map((lap) => (
                            <tr key={lap.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 py-4 font-bold text-gray-400">#{lap.id.toString().padStart(2, '0')}</td>
                              <td className={`px-4 py-4 font-bold tabular-nums ${lap.time === lapStats.fastest ? 'text-green-500' : lap.time === lapStats.slowest ? 'text-red-500' : 'text-gray-900'}`}>
                                {formatTime(lap.time)}
                              </td>
                              <td className="px-4 py-4 text-right font-medium text-gray-400 tabular-nums">{formatTime(lap.overall)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
              )}
            </div>
          )}

          {activeMode === 'countdown' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 space-y-8">
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                       <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Quick Timers</h2>
                       <p className="text-sm text-gray-400 font-medium">Start a premade countdown or create a custom one.</p>
                    </div>
                    <div className="flex gap-2">
                       {[1, 5, 10, 25, 60].map(mins => (
                         <button 
                           key={mins}
                           onClick={() => addTimer(`${mins}m Timer`, mins * 60)}
                           className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                         >
                           {mins}m
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex items-center gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Minutes</label>
                          <input type="number" value={customMinutes} onChange={e => setCustomMinutes(Math.max(0, parseInt(e.target.value) || 0))} className="w-20 bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                       </div>
                       <span className="text-3xl font-black text-gray-300 mt-4">:</span>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Seconds</label>
                          <input type="number" value={customSeconds} onChange={e => setCustomSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))} className="w-20 bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                       </div>
                    </div>
                    <button 
                      onClick={() => addTimer('Timer', customMinutes * 60 + customSeconds)}
                      className="flex-1 w-full sm:w-auto bg-gray-900 text-white font-bold py-4 px-8 rounded-2xl hover:bg-black transition-all shadow-lg shadow-black/10 text-lg active:scale-95"
                    >
                      ADD TIMER
                    </button>
                 </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                 {timers.map(timer => (
                   <div key={timer.id} className={`bg-white rounded-3xl border p-6 transition-all ${timer.status === 'completed' ? 'border-red-200 bg-red-50/20' : 'border-gray-100 shadow-sm'}`}>
                      <div className="flex justify-between items-start mb-4">
                         <span className={`text-xs font-bold uppercase tracking-widest ${timer.status === 'completed' ? 'text-red-500' : 'text-gray-400'}`}>
                           {timer.label} {timer.status === 'completed' && '• COMPLETED'}
                         </span>
                         <button onClick={() => removeTimer(timer.id)} className="text-gray-300 hover:text-red-400 transition-colors">✕</button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4">
                         <span className={`text-4xl font-black tabular-nums transition-all ${timer.status === 'running' ? 'text-primary scale-105' : timer.status === 'completed' ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
                           {formatTime(timer.remainingMs, 's').split(':').slice(1).join(':')}
                         </span>
                         <button 
                            onClick={() => toggleTimer(timer.id)}
                            className={`p-3 rounded-xl transition-all shadow-sm ${timer.status === 'running' ? 'bg-amber-50 text-amber-600' : 'bg-primary text-white hover:shadow-primary/20'}`}
                         >
                            {timer.status === 'running' ? '⏸' : '▶'}
                         </button>
                      </div>

                      <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div 
                           className={`h-full transition-all duration-300 ${timer.status === 'completed' ? 'bg-red-500' : 'bg-primary'}`}
                           style={{ width: `${(timer.remainingMs / (timer.initialSeconds * 1000)) * 100}%` }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}


        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-lg">
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Keyboard Control Guide</h3>
             <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                   <span className="text-gray-400 font-medium">Toggle Start/Pause</span>
                   <kbd className="bg-white/10 px-2 py-1 rounded-md font-mono text-xs border border-white/10">Space</kbd>
                </li>
                <li className="flex items-center justify-between text-sm">
                   <span className="text-gray-400 font-medium">Record Lap</span>
                   <kbd className="bg-white/10 px-2 py-1 rounded-md font-mono text-xs border border-white/10">L</kbd>
                </li>
                <li className="flex items-center justify-between text-sm">
                   <span className="text-gray-400 font-medium">Reset All</span>
                   <kbd className="bg-white/10 px-2 py-1 rounded-md font-mono text-xs border border-white/10">R</kbd>
                </li>
             </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[500px]">
             <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Session History</h3>
                <button onClick={() => { setHistory([]); localStorage.removeItem('timerHistory'); }} className="text-[10px] font-bold text-red-400 hover:text-red-500">CLEAR</button>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-gray-50">
               {history.length === 0 ? (
                 <div className="p-12 text-center space-y-3 opacity-20">
                    <span className="text-4xl">🕒</span>
                    <p className="text-xs font-bold uppercase tracking-widest">No Recent Sessions</p>
                 </div>
               ) : history.map(h => (
                 <div key={h.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                       <span className={`text-[10px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded ${h.type === 'stopwatch' ? 'bg-primary/5 text-primary' : 'bg-green-50 text-green-600'}`}>
                         {h.type}
                       </span>
                       <span className="text-[10px] font-bold text-gray-300">{h.date}</span>
                    </div>
                    <div className="flex justify-between items-end">
                       <p className="text-xl font-black text-gray-900 tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
                         {formatTime(h.duration, h.duration > 3600000 ? 's' : 'ms')}
                       </p>
                       {h.laps && <span className="text-xs font-bold text-gray-400">{h.laps} Laps</span>}
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>

      </div>

      <TimerStopwatchSEO />

      <RelatedTools 
        currentTool="timer-stopwatch"
        tools={['timestamp-unix-converter', 'age-calculator', 'loan-emi-calculator']}
      />

    </div>
  );
}
