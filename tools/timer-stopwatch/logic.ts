export interface LapRecord {
  id: number;
  time: number;
  overall: number;
}

export interface LapAnalysis {
  fastest: number | null;
  slowest: number | null;
  average: number | null;
}

export interface CountdownTimer {
  id: string;
  label: string;
  initialSeconds: number;
  remainingMs: number;
  status: 'running' | 'paused' | 'completed';
  lastTick: number;
}

export interface TimerSessionHistory {
  id: string;
  date: string;
  type: 'stopwatch' | 'countdown' | 'pomodoro';
  duration: number;
  laps?: number;
}

export function formatTime(ms: number, precision: 'ms' | 's' | 'm' = 'ms'): string {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  const mss = milliseconds.toString().padStart(2, '0');

  if (precision === 'm') return `${hh}:${mm}`;
  if (precision === 's') return `${hh}:${mm}:${ss}`;
  return `${hh}:${mm}:${ss}.${mss}`;
}

export function analyzeLaps(laps: LapRecord[]): LapAnalysis {
  if (laps.length === 0) return { fastest: null, slowest: null, average: null };
  const lapTimes = laps.map(l => l.time);
  const fastest = Math.min(...lapTimes);
  const slowest = Math.max(...lapTimes);
  const average = lapTimes.reduce((a, b) => a + b, 0) / lapTimes.length;
  return { fastest, slowest, average };
}

export function createCountdownTimer(label: string, seconds: number): CountdownTimer {
  return {
    id: Math.random().toString(36).substr(2, 9),
    label,
    initialSeconds: seconds,
    remainingMs: seconds * 1000,
    status: 'paused',
    lastTick: 0
  };
}

export function playNotificationSound() {
  if (typeof window === 'undefined') return;
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.warn('Audio notification failed', e);
  }
}
