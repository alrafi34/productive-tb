export interface PomodoroSession {
  id: string;
  type: 'focus' | 'short-break' | 'long-break';
  duration: number;
  completedAt?: string;
}

export interface PomodoroState {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  cyclesBeforeLongBreak: number;
  completedCycles: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  autoStart: boolean;
  darkMode: boolean;
}

export interface SessionHistory {
  id: string;
  date: string;
  type: 'focus' | 'short-break' | 'long-break';
  duration: number;
  completed: boolean;
}

export function formatTimeDisplay(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getNextSessionType(completedCycles: number, cyclesBeforeLongBreak: number): 'focus' | 'short-break' | 'long-break' {
  if (completedCycles % cyclesBeforeLongBreak === 0 && completedCycles > 0) {
    return 'long-break';
  }
  return 'short-break';
}

export function playNotificationSound() {
  if (typeof window === 'undefined') return;
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(600, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.warn('Audio notification failed', e);
  }
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (typeof window === 'undefined') return;
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '🍅',
      badge: '🍅',
      ...options
    });
  }
}

export function requestNotificationPermission() {
  if (typeof window === 'undefined') return Promise.resolve();
  if ('Notification' in window && Notification.permission === 'default') {
    return Notification.requestPermission();
  }
  return Promise.resolve();
}

export function getSessionMessage(type: 'focus' | 'short-break' | 'long-break'): { title: string; body: string } {
  const messages = {
    'focus': {
      title: '🍅 Focus Session Started',
      body: 'Time to concentrate! Get to work.'
    },
    'short-break': {
      title: '☕ Break Time!',
      body: 'Take a short break. You earned it!'
    },
    'long-break': {
      title: '🎉 Long Break Time!',
      body: 'Great work! Take a longer break to recharge.'
    }
  };
  return messages[type];
}

export function getCompletionMessage(type: 'focus' | 'short-break' | 'long-break'): { title: string; body: string } {
  const messages = {
    'focus': {
      title: '✅ Focus Session Complete',
      body: 'Great work! Time for a break.'
    },
    'short-break': {
      title: '✅ Break Over',
      body: 'Ready for another focus session?'
    },
    'long-break': {
      title: '✅ Long Break Complete',
      body: 'Refreshed? Let\'s get back to work!'
    }
  };
  return messages[type];
}
