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

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  
  const today = getTodayString();
  const sortedDates = [...completedDates].sort();
  let streak = 0;
  
  // Check if today is completed
  const lastDate = sortedDates[sortedDates.length - 1];
  if (lastDate !== today) {
    // Check if yesterday was completed (streak continues)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastDate !== yesterdayStr) return 0;
  }
  
  // Count consecutive days backwards from today/yesterday
  const startDate = lastDate === today ? today : lastDate;
  const start = new Date(startDate);
  
  for (let i = 0; i < sortedDates.length; i++) {
    const checkDate = new Date(start);
    checkDate.setDate(start.getDate() - i);
    const checkStr = checkDate.toISOString().split('T')[0];
    
    if (sortedDates.includes(checkStr)) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function calculateLongestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = [...completedDates].sort();
  let maxStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }
  
  return maxStreak;
}

export function getWeeklyProgress(completedDates: string[]): number[] {
  const today = new Date();
  const weekProgress = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    weekProgress.push(completedDates.includes(dateStr) ? 1 : 0);
  }
  
  return weekProgress;
}

export function getMonthlyCalendar(completedDates: string[], year: number, month: number): (number | null)[][] {
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
      const dateStr = currentDate.toISOString().split('T')[0];
      const isCompleted = completedDates.includes(dateStr);
      week.push(isCompleted ? currentDate.getDate() : currentDate.getDate());
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