import { addDays, daysBetween, parseDate, toIso, today } from "@/lib/dates";

export interface Habit {
  id: string;
  name: string;
  created: string;
  completedDates: string[];
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays?: number;
}

export interface HabitData {
  habits: Habit[];
  lastAction?: {
    type: 'create' | 'complete' | 'delete';
    habitId: string;
    data?: any;
  };
}

export const HABIT_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', 
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

export const HABIT_SUGGESTIONS = [
  'Drink 2L Water',
  'Read 30 minutes',
  'Exercise',
  'Meditate',
  'Study',
  'Walk 10k steps',
  'Sleep 8 hours',
  'Write journal',
  'Practice gratitude',
  'Learn new skill'
];

/* Dates are stored as the visitor's own calendar day (YYYY-MM-DD), never the
   UTC day, so a habit ticked at 9 pm in Los Angeles counts for that day. */
export function getTodayString(): string {
  return toIso(today());
}

/* "2026-10-05" for a day of a month shown in the calendar */
export function dateString(year: number, month: number, day: number): string {
  return toIso(new Date(Date.UTC(year, month, day, 12)));
}

export function calculateStreak(completedDates: string[]): number {
  const done = new Set(completedDates);
  let day = today();
  // An open day today doesn't break the streak until it is over
  if (!done.has(toIso(day))) day = addDays(day, -1);

  let streak = 0;
  while (done.has(toIso(day))) {
    streak++;
    day = addDays(day, -1);
  }
  return streak;
}

export function calculateLongestStreak(completedDates: string[]): number {
  const days = Array.from(new Set(completedDates))
    .map(parseDate)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => a.getTime() - b.getTime());
  if (days.length === 0) return 0;

  let maxStreak = 1;
  let currentStreak = 1;
  for (let i = 1; i < days.length; i++) {
    currentStreak = daysBetween(days[i - 1], days[i]) === 1 ? currentStreak + 1 : 1;
    maxStreak = Math.max(maxStreak, currentStreak);
  }
  return maxStreak;
}

export function getWeeklyProgress(completedDates: string[]): number[] {
  const now = today();
  const weekProgress = [];
  for (let i = 6; i >= 0; i--) {
    weekProgress.push(completedDates.includes(toIso(addDays(now, -i))) ? 1 : 0);
  }
  return weekProgress;
}

/* Days since the habit was created, counting today */
export function daysTracked(created: string): number {
  const start = parseDate(created);
  return start ? Math.max(1, daysBetween(start, today()) + 1) : 1;
}

export function getMonthlyCalendar(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const calendar: (number | null)[][] = [];
  let week: (number | null)[] = [];
  
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    if (currentDate.getMonth() === month) {
      week.push(currentDate.getDate());
    } else {
      week.push(null);
    }
    
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  
  return calendar;
}

export function exportHabits(habits: Habit[]): void {
  const data = { habits, exportDate: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `habits-backup-${getTodayString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function triggerConfetti(): void {
  // Simple confetti effect using CSS animations
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `confetti-fall ${Math.random() * 2 + 1}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 3000);
  }
}

// Add CSS for confetti animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti-fall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}