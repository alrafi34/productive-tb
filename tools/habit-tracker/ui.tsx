"use client";

import { useState, useEffect, useRef } from "react";
import {
  Habit,
  HabitData,
  HABIT_COLORS,
  HABIT_SUGGESTIONS,
  getTodayString,
  calculateStreak,
  calculateLongestStreak,
  getWeeklyProgress,
  getMonthlyCalendar,
  exportHabits,
  triggerConfetti
} from "./logic";
import HabitTrackerSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HabitTrackerUI() {
  const [habitData, setHabitData] = useState<HabitData>({ habits: [] });
  const [newHabitName, setNewHabitName] = useState("");
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('habitTrackerData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHabitData(parsed);
      } catch (e) {
        console.error('Failed to parse habit data:', e);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('habitTrackerData', JSON.stringify(habitData));
  }, [habitData, isMounted]);

  const createHabit = () => {
    if (!newHabitName.trim()) return;
    
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name: newHabitName.trim(),
      created: getTodayString(),
      completedDates: [],
      color: selectedColor,
      frequency: 'daily'
    };

    setHabitData(prev => ({
      ...prev,
      habits: [newHabit, ...prev.habits],
      lastAction: { type: 'create', habitId: newHabit.id, data: newHabit }
    }));

    setNewHabitName("");
    setSelectedColor(HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)]);
  };

  const toggleHabitCompletion = (habitId: string) => {
    const today = getTodayString();
    
    setHabitData(prev => {
      const habit = prev.habits.find(h => h.id === habitId);
      if (!habit) return prev;

      const isCompleted = habit.completedDates.includes(today);
      const newCompletedDates = isCompleted
        ? habit.completedDates.filter(date => date !== today)
        : [...habit.completedDates, today];

      const updatedHabits = prev.habits.map(h =>
        h.id === habitId ? { ...h, completedDates: newCompletedDates } : h
      );

      // Trigger confetti for new completions that create milestones
      if (!isCompleted) {
        const newStreak = calculateStreak(newCompletedDates);
        if (newStreak > 0 && (newStreak % 7 === 0 || newStreak === 1)) {
          setTimeout(triggerConfetti, 100);
        }
      }

      return {
        ...prev,
        habits: updatedHabits,
        lastAction: { 
          type: 'complete', 
          habitId, 
          data: { wasCompleted: isCompleted, date: today } 
        }
      };
    });
  };

  const deleteHabit = (habitId: string) => {
    setHabitData(prev => {
      const habit = prev.habits.find(h => h.id === habitId);
      return {
        ...prev,
        habits: prev.habits.filter(h => h.id !== habitId),
        lastAction: { type: 'delete', habitId, data: habit }
      };
    });
  };

  const undoLastAction = () => {
    if (!habitData.lastAction) return;

    const { type, habitId, data } = habitData.lastAction;

    setHabitData(prev => {
      switch (type) {
        case 'create':
          return {
            ...prev,
            habits: prev.habits.filter(h => h.id !== habitId),
            lastAction: undefined
          };
        case 'delete':
          return {
            ...prev,
            habits: [data, ...prev.habits],
            lastAction: undefined
          };
        case 'complete':
          const updatedHabits = prev.habits.map(h => {
            if (h.id === habitId) {
              const { wasCompleted, date } = data;
              return {
                ...h,
                completedDates: wasCompleted
                  ? [...h.completedDates, date]
                  : h.completedDates.filter(d => d !== date)
              };
            }
            return h;
          });
          return {
            ...prev,
            habits: updatedHabits,
            lastAction: undefined
          };
        default:
          return prev;
      }
    });
  };

  const importHabits = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (imported.habits && Array.isArray(imported.habits)) {
          setHabitData(prev => ({
            ...prev,
            habits: [...imported.habits, ...prev.habits]
          }));
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const today = getTodayString();
  const cardClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-100";
  const titleClass = darkMode ? "text-white" : "text-gray-900";
  const textClass = darkMode ? "text-gray-300" : "text-gray-700";
  const mutedClass = darkMode ? "text-gray-400" : "text-gray-500";
  const inputClass = darkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500";
  const actionButtonBase =
    "px-6 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className={`transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${actionButtonBase} ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                : "bg-white border-2 border-gray-200 hover:bg-gray-100 text-gray-700"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className={`rounded-2xl border p-6 ${cardClass}`}>
              <h2 className={`text-lg font-semibold mb-4 ${titleClass}`}>Add New Habit</h2>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createHabit()}
                    placeholder="Enter habit name..."
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 ${inputClass}`}
                  />
                  <button
                    onClick={createHabit}
                    disabled={!newHabitName.trim()}
                    className={`${actionButtonBase} bg-primary hover:bg-primary-hover text-white`}
                  >
                    Add Habit
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {HABIT_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full transition-all ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {HABIT_SUGGESTIONS.slice(0, 5).map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => setNewHabitName(suggestion)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${cardClass}`}>
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h2 className={`text-lg font-semibold ${titleClass}`}>Today&apos;s Habits</h2>
              </div>

              <div className="divide-y" style={{ borderColor: darkMode ? '#374151' : '#f3f4f6' }}>
                {habitData.habits.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className={`text-base font-semibold mb-2 ${textClass}`}>No habits yet</p>
                    <p className={`text-sm ${mutedClass}`}>
                      Create your first habit above to start building consistency
                    </p>
                  </div>
                ) : (
                  habitData.habits.map(habit => {
                    const isCompletedToday = habit.completedDates.includes(today);
                    const currentStreak = calculateStreak(habit.completedDates);
                    const longestStreak = calculateLongestStreak(habit.completedDates);
                    const weeklyProgress = getWeeklyProgress(habit.completedDates);
                    const completionRate = habit.completedDates.length > 0
                      ? Math.round((habit.completedDates.length / Math.max(1, Math.floor((new Date().getTime() - new Date(habit.created).getTime()) / (1000 * 60 * 60 * 24)) + 1)) * 100)
                      : 0;

                    return (
                      <div key={habit.id} className={`p-6 transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => toggleHabitCompletion(habit.id)}
                                className={`w-11 h-11 rounded-full border-2 transition-colors ${
                                  isCompletedToday
                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                    : darkMode
                                      ? 'border-gray-500 hover:border-gray-400 text-transparent'
                                      : 'border-gray-300 hover:border-gray-400 text-transparent'
                                }`}
                              >
                                ✓
                              </button>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: habit.color }} />
                                  <h3 className={`text-base font-semibold ${titleClass}`}>{habit.name}</h3>
                                </div>
                                <div className={`mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm ${mutedClass}`}>
                                  <span>{currentStreak} day streak</span>
                                  <span>{longestStreak} best</span>
                                  <span>{completionRate}% rate</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setShowCalendar(showCalendar === habit.id ? null : habit.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                  darkMode
                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                              >
                                Calendar
                              </button>
                              <button
                                onClick={() => deleteHabit(habit.id)}
                                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-white border-2 border-red-200 text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <div>
                            <div className={`text-xs font-medium mb-2 ${mutedClass}`}>This Week</div>
                            <div className="flex gap-1">
                              {weeklyProgress.map((completed, index) => (
                                <div
                                  key={index}
                                  className={`flex-1 h-2.5 rounded-full ${
                                    completed ? 'bg-emerald-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {showCalendar === habit.id && (
                          <div className={`mt-4 p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-4">
                              <button
                                onClick={() => {
                                  if (currentMonth === 0) {
                                    setCurrentMonth(11);
                                    setCurrentYear(currentYear - 1);
                                  } else {
                                    setCurrentMonth(currentMonth - 1);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  darkMode ? 'bg-gray-800 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                }`}
                              >
                                ←
                              </button>

                              <h4 className={`font-semibold text-sm ${titleClass}`}>
                                {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </h4>

                              <button
                                onClick={() => {
                                  if (currentMonth === 11) {
                                    setCurrentMonth(0);
                                    setCurrentYear(currentYear + 1);
                                  } else {
                                    setCurrentMonth(currentMonth + 1);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  darkMode ? 'bg-gray-800 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                }`}
                              >
                                →
                              </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                <div key={day} className={`text-xs font-medium p-1.5 ${mutedClass}`}>
                                  {day}
                                </div>
                              ))}
                              {getMonthlyCalendar(habit.completedDates, currentYear, currentMonth).flat().map((day, index) => (
                                <div
                                  key={index}
                                  className={`text-xs p-1.5 rounded ${
                                    day === null
                                      ? ''
                                      : habit.completedDates.includes(new Date(currentYear, currentMonth, day).toISOString().split('T')[0])
                                        ? 'bg-emerald-500 text-white font-semibold'
                                        : darkMode ? 'text-gray-300' : 'text-gray-600'
                                  }`}
                                >
                                  {day}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`rounded-2xl border p-6 ${cardClass}`}>
              <h3 className={`text-lg font-semibold mb-4 ${titleClass}`}>Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${mutedClass}`}>Total Habits</span>
                  <span className={`text-base font-semibold ${titleClass}`}>{habitData.habits.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${mutedClass}`}>Completed Today</span>
                  <span className={`text-base font-semibold ${titleClass}`}>
                    {habitData.habits.filter(h => h.completedDates.includes(today)).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${mutedClass}`}>Best Streak</span>
                  <span className={`text-base font-semibold ${titleClass}`}>
                    {Math.max(0, ...habitData.habits.map(h => calculateLongestStreak(h.completedDates)))}
                  </span>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${cardClass}`}>
              <h3 className={`text-lg font-semibold mb-4 ${titleClass}`}>Actions</h3>
              <div className="space-y-3">
                {habitData.lastAction && (
                  <button
                    onClick={undoLastAction}
                    className={`w-full ${actionButtonBase} ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                  >
                    Undo Last Action
                  </button>
                )}
                <button
                  onClick={() => exportHabits(habitData.habits)}
                  className={`w-full ${actionButtonBase} bg-primary hover:bg-primary-hover text-white`}
                >
                  Export Data
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={importHabits}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full ${actionButtonBase} ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                >
                  Import Data
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all habits? This cannot be undone.')) {
                      setHabitData({ habits: [] });
                    }
                  }}
                  className={`w-full ${actionButtonBase} bg-white border-2 border-red-200 text-red-600 hover:bg-red-50`}
                >
                  Clear All Data
                </button>
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${cardClass}`}>
              <h3 className={`text-lg font-semibold mb-3 ${titleClass}`}>Motivation</h3>
              <div className="space-y-3 text-sm">
                <p className={mutedClass}>
                  "We are what we repeatedly do. Excellence, then, is not an act, but a habit." - Aristotle
                </p>
                <p className={mutedClass}>
                  Small daily improvements lead to strong long-term results. Keep going.
                </p>
              </div>
            </div>
          </div>
        </div>

        <HabitTrackerSEO />
        <RelatedTools
          currentTool="habit-tracker"
          tools={['pomodoro-timer', 'daily-checklist', 'timer-stopwatch']}
        />
      </div>
    </div>
  );
}
