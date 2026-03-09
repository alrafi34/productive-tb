import { PickerOptions, WinnerResult } from './types';

export function parseNames(text: string): string[] {
  return text.split('\n').map(n => n.trim()).filter(n => n.length > 0);
}

export function removeDuplicates(names: string[]): string[] {
  return [...new Set(names)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function pickRandomWinners(names: string[], count: number): string[] {
  if (names.length === 0) return [];
  const shuffled = shuffleArray(names);
  return shuffled.slice(0, Math.min(count, names.length));
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadAsCSV(winners: WinnerResult[], filename: string): void {
  const csv = ['Round,Name,Timestamp', ...winners.map(w => `${w.round},"${w.name}","${w.timestamp.toISOString()}"`)].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatWinnersAsText(winners: string[]): string {
  return winners.join('\n');
}

export function triggerConfetti(): void {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      (window as any).confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }
  }, 250);
}
