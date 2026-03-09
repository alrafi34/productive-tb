import { ZalgoOptions } from './types';

const CHARS_ABOVE = [
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
  '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u031A', '\u031B', '\u033D',
  '\u033E', '\u033F', '\u0340', '\u0341', '\u0342', '\u0343', '\u0344', '\u0346',
  '\u034A', '\u034B', '\u034C', '\u0350', '\u0351', '\u0352', '\u0357', '\u0358'
];

const CHARS_BELOW = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031C', '\u031D', '\u031E', '\u031F',
  '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327',
  '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D', '\u032E', '\u032F',
  '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033A', '\u033B', '\u033C',
  '\u0345', '\u0347', '\u0348', '\u0349', '\u034D', '\u034E', '\u0353', '\u0354',
  '\u0355', '\u0356', '\u0359', '\u035A', '\u0323'
];

const CHARS_MIDDLE = [
  '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0489', '\u0488'
];

export function generateZalgo(text: string, options: ZalgoOptions): string {
  if (!text) return '';

  const intensityMap = {
    low: 1,
    medium: 3,
    high: 6,
    extreme: 10
  };

  const maxChars = Math.min(options.maxCharsPerLetter, intensityMap[options.intensity]);

  return text.split('').map(char => {
    if (char === ' ' || char === '\n') return char;

    let result = char;
    const numChars = Math.floor(Math.random() * maxChars) + 1;

    for (let i = 0; i < numChars; i++) {
      if (options.addAbove && Math.random() > 0.5) {
        result += CHARS_ABOVE[Math.floor(Math.random() * CHARS_ABOVE.length)];
      }
      if (options.addBelow && Math.random() > 0.5) {
        result += CHARS_BELOW[Math.floor(Math.random() * CHARS_BELOW.length)];
      }
      if (options.addMiddle && Math.random() > 0.7) {
        result += CHARS_MIDDLE[Math.floor(Math.random() * CHARS_MIDDLE.length)];
      }
    }

    return result;
  }).join('');
}

export function removeZalgo(text: string): string {
  return text.replace(/[\u0300-\u036F\u0489\u0488]/g, '');
}

export function getPresetOptions(preset: string): Partial<ZalgoOptions> {
  switch (preset) {
    case 'creepy':
      return { intensity: 'extreme', addAbove: true, addBelow: true, addMiddle: true, maxCharsPerLetter: 15 };
    case 'mild':
      return { intensity: 'low', addAbove: false, addBelow: false, addMiddle: true, maxCharsPerLetter: 2 };
    case 'broken':
      return { intensity: 'high', addAbove: true, addBelow: true, addMiddle: false, maxCharsPerLetter: 8 };
    default:
      return {};
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
