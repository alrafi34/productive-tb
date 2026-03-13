"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  PomodoroState,
  SessionHistory,
  formatTimeDisplay,
  getNextSessionType,
  playNotificationSound,
  showNotification,
  requestNotificationPermission,
  getSessionMessage,
  getCompletionMessage
} from "./logic";
import PomodoroSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type SessionType = 'focus' | 'short-break' | 'long-break';

export default function PomodoroTimerUI() {
  const [state, setState] = useState<PomodoroState>({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    cyclesBeforeLongBreak: 4,
    completedCycles: 0,
    soundEnabled: true,
    notificationsEnabled: true,
    autoStart: false,
    darkMode: false
  });

  const [currentSession, setCurrentSession] = useState<SessionType>('focus');
  const [timeLeft, setTimeLeft] = useState(state.focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<SessionHistory[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartRef = useRef<number>(0);

  // Load state from localStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('pomodoroState');
    const savedHistory = localStorage.getItem('pomodoroHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(parsed);
      setCurrentSession(parsed.currentSession || 'focus');
      setTimeLeft((parsed.focusTime || 25) * 60);
    }
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    requestNotificationPermission();
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('pomodoroState', JSON.stringify(state));
  }, [state, isMounted]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    sessionStartRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentSession, state]);

  const handleSessionComplete = () => {
    const duration = currentSession === 'focus' ? state.focusTime : currentSession === 'short-break' ? state.shortBreakTime : state.longBreakTime;
    
    const newEntry: SessionHistory = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleTimeString(),
      type: currentSession,
      duration,
      completed: true
    };

    const updated = [newEntry, ...history].slice(0, 100);
    setHistory(updated);
    localStorage.setItem('pomodoroHistory', JSON.stringify(updated));

    if (state.soundEnabled) playNotificationSound();
    
    const msg = getCompletionMessage(currentSession);
    if (state.notificationsEnabled) showNotification(msg.title, { body: msg.body });

    if (currentSession === 'focus') {
      setState(prev => ({ ...prev, completedCycles: prev.completedCycles + 1 }));
      const nextType = getNextSessionType(state.completedCycles + 1, state.cyclesBeforeLongBreak);
      setCurrentSession(nextType);
      setTimeLeft(nextType === 'short-break' ? state.shortBreakTime * 60 : state.longBreakTime * 60);
    } else {
      setCurrentSession('focus');
      setTimeLeft(state.focusTime * 60);
    }

    if (state.autoStart) {
      setTimeout(() => setIsRunning(true), 1000);
    }
  };

  const toggleTimer = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(currentSession === 'focus' ? state.focusTime * 60 : currentSession === 'short-break' ? state.shortBreakTime * 60 : state.longBreakTime * 60);
    }
    setIsRunning(!isRunning);
  };

  const resetSession = () => {
    setIsRunning(false);
    setCurrentSession('focus');
    setTimeLeft(state.focusTime * 60);
    setState(prev => ({ ...prev, completedCycles: 0 }));
  };

  const skipSession = () => {
    setIsRunning(false);
    handleSessionComplete();
  };

  const updateSetting = (key: keyof PomodoroState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
    if (key === 'focusTime' || key === 'shortBreakTime' || key === 'longBreakTime') {
      if (!isRunning) {
        if (currentSession === 'focus') setTimeLeft(value * 60);
        else if (currentSession === 'short-break') setTimeLeft(value * 60);
        else setTimeLeft(value * 60);
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleTimer();
      }
      if (e.code === 'KeyR') resetSession();
      if (e.code === 'KeyS') skipSession();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, currentSession, state]);

  const progress = useMemo(() => {
    const total = currentSession === 'focus' ? state.focusTime * 60 : currentSession === 'short-break' ? state.shortBreakTime * 60 : state.longBreakTime * 60;
    return ((total - timeLeft) / total) * 100;
  }, [timeLeft, currentSession, state]);

  const sessionColor = {
    'focus': 'from-red-500 to-red-600',
    'short-break': 'from-green-500 to-green-600',
    'long-break': 'from-blue-500 to-blue-600'
  };

  const sessionLabel = {
    'focus': 'Focus Session',
    'short-break': 'Short Break',
    'long-break': 'Long Break'
  };

  return (
    <div className={`min-h-screen transition-colors ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-4xl font-black ${state.darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "var(--font-heading)" }}>
              🍅 Pomodoro Timer
            </h1>
            <p className={`text-sm mt-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Stay focused, take breaks, boost productivity
            </p>
          </div>
          <button
            onClick={() => setState(prev => ({ ...prev, darkMode: !prev.darkMode }))}
            className={`p-3 rounded-xl transition-all ${state.darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {state.darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Timer */}
          <div className={`lg:col-span-8 rounded-3xl border shadow-lg p-8 sm:p-12 space-y-8 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            
            {/* Session Type */}
            <div className="text-center space-y-2">
              <span className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                {sessionLabel[currentSession]}
              </span>
              <span className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Cycle {state.completedCycles + 1}/{state.cyclesBeforeLongBreak}
              </span>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke={state.darkMode ? '#374151' : '#f3f4f6'} strokeWidth="8" />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={currentSession === 'focus' ? '#ef4444' : currentSession === 'short-break' ? '#22c55e' : '#3b82f6'}
                    strokeWidth="8"
                    strokeDasharray={`${(progress / 100) * 565.48} 565.48`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-6xl sm:text-7xl font-black tabular-nums ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {isMounted ? formatTimeDisplay(timeLeft) : '25:00'}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest mt-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    {progress.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={toggleTimer}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg ${
                  isRunning
                    ? `${state.darkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-600'} hover:${state.darkMode ? 'bg-red-800' : 'bg-red-100'}`
                    : `bg-gradient-to-r ${sessionColor[currentSession]} text-white hover:shadow-xl`
                }`}
              >
                {isRunning ? '⏸ PAUSE' : '▶ START'}
              </button>
              <button
                onClick={skipSession}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${state.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                ⏭ SKIP
              </button>
              <button
                onClick={resetSession}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${state.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🔄 RESET
              </button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
              <span className="block mb-2">⌨️ Shortcuts:</span>
              <span className="text-gray-400">Space = Start/Pause • R = Reset • S = Skip</span>
            </div>
          </div>

          {/* Settings & History */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Settings */}
            <div className={`rounded-2xl border p-6 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`w-full flex justify-between items-center font-bold text-lg mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}
              >
                ⚙️ Settings
                <span className={`text-xl transition-transform ${showSettings ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {showSettings && (
                <div className="space-y-4 border-t pt-4" style={{ borderColor: state.darkMode ? '#374151' : '#e5e7eb' }}>
                  
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Focus Time (min)
                    </label>
                    <input
                      type="number"
                      value={state.focusTime}
                      onChange={e => updateSetting('focusTime', Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={isRunning}
                      className={`w-full px-4 py-2 rounded-lg border font-bold text-lg ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} disabled:opacity-50`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Short Break (min)
                    </label>
                    <input
                      type="number"
                      value={state.shortBreakTime}
                      onChange={e => updateSetting('shortBreakTime', Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={isRunning}
                      className={`w-full px-4 py-2 rounded-lg border font-bold text-lg ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} disabled:opacity-50`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Long Break (min)
                    </label>
                    <input
                      type="number"
                      value={state.longBreakTime}
                      onChange={e => updateSetting('longBreakTime', Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={isRunning}
                      className={`w-full px-4 py-2 rounded-lg border font-bold text-lg ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} disabled:opacity-50`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Cycles Before Long Break
                    </label>
                    <input
                      type="number"
                      value={state.cyclesBeforeLongBreak}
                      onChange={e => updateSetting('cyclesBeforeLongBreak', Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={isRunning}
                      className={`w-full px-4 py-2 rounded-lg border font-bold text-lg ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} disabled:opacity-50`}
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.soundEnabled}
                        onChange={e => updateSetting('soundEnabled', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className={`text-sm font-bold ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🔊 Sound Alerts</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.notificationsEnabled}
                        onChange={e => updateSetting('notificationsEnabled', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className={`text-sm font-bold ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🔔 Notifications</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.autoStart}
                        onChange={e => updateSetting('autoStart', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className={`text-sm font-bold ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>⚡ Auto-Start Next</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Session History */}
            <div className={`rounded-2xl border overflow-hidden flex flex-col h-[400px] ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className={`px-6 py-4 border-b flex justify-between items-center ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  📊 Session History
                </h3>
                <button
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem('pomodoroHistory');
                  }}
                  className="text-xs font-bold text-red-400 hover:text-red-500"
                >
                  CLEAR
                </button>
              </div>
              <div className={`flex-1 overflow-y-auto divide-y ${state.darkMode ? 'divide-gray-700' : 'divide-gray-50'}`}>
                {history.length === 0 ? (
                  <div className={`p-8 text-center opacity-30 flex flex-col items-center justify-center h-full`}>
                    <span className="text-4xl mb-2">📋</span>
                    <p className="text-xs font-bold uppercase tracking-widest">No Sessions Yet</p>
                  </div>
                ) : (
                  history.map(h => (
                    <div key={h.id} className={`p-4 hover:${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                          h.type === 'focus' ? (state.darkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-600') :
                          h.type === 'short-break' ? (state.darkMode ? 'bg-green-900 text-green-200' : 'bg-green-50 text-green-600') :
                          (state.darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-600')
                        }`}>
                          {h.type === 'focus' ? '🔴' : h.type === 'short-break' ? '🟢' : '🔵'} {h.type}
                        </span>
                        <span className={`text-[10px] font-bold ${state.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{h.date}</span>
                      </div>
                      <div className={`text-lg font-black tabular-nums ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {h.duration} min
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <PomodoroSEO />
        <RelatedTools
          currentTool="pomodoro-timer"
          tools={['timer-stopwatch', 'age-calculator', 'password-generator']}
        />
      </div>
    </div>
  );
}
