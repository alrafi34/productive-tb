import { MorseOptions } from "./types";

export const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.',
  '@': '.--.-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', "'": '.----.', ' ': '/'
};

export function textToMorse(text: string, options: MorseOptions): string {
  if (!text) return '';

  const processedText = options.ignoreCase ? text.toUpperCase() : text;
  const words = processedText.split(' ');

  const morseWords = words.map(word => {
    const letters = word.split('');
    const morseLetters = letters.map(char => {
      const morse = MORSE_CODE_MAP[char];
      if (!morse) return '';
      return morse
        .replace(/\./g, options.dotSymbol)
        .replace(/-/g, options.dashSymbol);
    }).filter(m => m);
    return morseLetters.join(options.letterSpacing);
  });

  return morseWords.join(options.wordSeparator);
}

export function morseToText(morse: string, options: MorseOptions): string {
  if (!morse) return '';

  // Create reverse map
  const reverseMorseMap: Record<string, string> = {};
  Object.entries(MORSE_CODE_MAP).forEach(([key, value]) => {
    reverseMorseMap[value] = key;
  });

  // Normalize morse code to standard dots and dashes
  const normalizedMorse = morse
    .replace(new RegExp(options.dotSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '.')
    .replace(new RegExp(options.dashSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '-');

  // Split by word separator
  const words = normalizedMorse.split(options.wordSeparator);

  const textWords = words.map(word => {
    // Split by letter spacing
    const letters = word.split(options.letterSpacing);
    const textLetters = letters.map(letter => {
      const trimmed = letter.trim();
      return reverseMorseMap[trimmed] || '';
    });
    return textLetters.join('');
  });

  return textWords.join(' ');
}

export function playMorseAudio(morse: string, options: MorseOptions): void {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const dotDuration = 1200 / options.playbackSpeed; // milliseconds
  const dashDuration = dotDuration * 3;
  const symbolGap = dotDuration;
  const letterGap = dotDuration * 3;
  const wordGap = dotDuration * 7;

  let currentTime = audioContext.currentTime;

  const playBeep = (duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600; // Hz
    gainNode.gain.value = 0.3;

    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration / 1000);

    currentTime += duration / 1000;
  };

  const normalizedMorse = morse
    .replace(new RegExp(options.dotSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '.')
    .replace(new RegExp(options.dashSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '-');

  for (let i = 0; i < normalizedMorse.length; i++) {
    const char = normalizedMorse[i];

    if (char === '.') {
      playBeep(dotDuration);
      currentTime += symbolGap / 1000;
    } else if (char === '-') {
      playBeep(dashDuration);
      currentTime += symbolGap / 1000;
    } else if (char === ' ') {
      currentTime += letterGap / 1000;
    } else if (char === options.wordSeparator) {
      currentTime += wordGap / 1000;
    }
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(text: string, filename: string = 'morse-code.txt'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
