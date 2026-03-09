import { NATOOptions } from './types';

const NATO_ALPHABET: Record<string, string> = {
  'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
  'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
  'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
  'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu'
};

const NATO_NUMBERS: Record<string, string> = {
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
};

export function textToNATO(text: string, options: NATOOptions): string {
  if (!text) return '';

  const chars = text.toUpperCase().split('');
  const result: string[] = [];

  for (const char of chars) {
    if (NATO_ALPHABET[char]) {
      result.push(NATO_ALPHABET[char]);
    } else if (options.convertNumbers && NATO_NUMBERS[char]) {
      result.push(NATO_NUMBERS[char]);
    } else if (char === ' ') {
      result.push(' ');
    } else if (!options.ignorePunctuation && /[^\w\s]/.test(char)) {
      result.push(char);
    }
  }

  return result.join(' ').replace(/\s+/g, ' ').trim();
}

export function textToNATOLetterByLetter(text: string, options: NATOOptions): Array<{ char: string; nato: string }> {
  if (!text) return [];

  const chars = text.toUpperCase().split('');
  const result: Array<{ char: string; nato: string }> = [];

  for (const char of chars) {
    if (NATO_ALPHABET[char]) {
      result.push({ char, nato: NATO_ALPHABET[char] });
    } else if (options.convertNumbers && NATO_NUMBERS[char]) {
      result.push({ char, nato: NATO_NUMBERS[char] });
    } else if (char === ' ') {
      result.push({ char: ' ', nato: '(space)' });
    } else if (!options.ignorePunctuation && /[^\w\s]/.test(char)) {
      result.push({ char, nato: char });
    }
  }

  return result;
}

export function natoToText(natoText: string): string {
  const reverseMap: Record<string, string> = {};
  Object.entries(NATO_ALPHABET).forEach(([key, value]) => {
    reverseMap[value.toLowerCase()] = key;
  });
  Object.entries(NATO_NUMBERS).forEach(([key, value]) => {
    reverseMap[value.toLowerCase()] = key;
  });

  const words = natoText.toLowerCase().split(/\s+/);
  return words.map(word => reverseMap[word] || word).join('');
}

export function speakNATO(text: string): void {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
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
