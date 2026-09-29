import { UpsideDownOptions, FlipMode } from "./types";

/* Letters turned 180°, as look-alike Unicode characters. Every entry is a
   left-to-right character: Hebrew or Arabic look-alikes (ן, ؛) would make
   the browser reorder the line. */
export const UPSIDE_DOWN_MAP: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
  'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ꞁ', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
  'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H',
  'I': 'I', 'J': 'ſ', 'K': 'ꓘ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
  'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6',
  '!': '¡', '?': '¿', '.': '˙', ',': '\'', '\'': ',', '"': '„', ';': '⸵', '(': ')',
  ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋',
  '_': '‾', '/': '\\', '\\': '/'
};

/* Letters flipped left to right. Letters with no mirrored look-alike stay as they are. */
export const MIRROR_MAP: Record<string, string> = {
  'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'h': 'ʜ', 'n': 'ᴎ', 'p': 'q',
  'q': 'p', 'r': 'ɿ', 's': 'ƨ', 'z': 'ƹ',
  'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ', 'J': 'Ⴑ', 'K': 'ꓘ', 'L': '⅃',
  'N': 'И', 'P': 'ꟼ', 'R': 'Я', 'S': 'Ƨ', 'Z': 'Ƹ',
  '3': 'Ɛ', '?': '⸮', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
  '<': '>', '>': '<', '/': '\\', '\\': '/'
};

const isPunctuation = (ch: string) => /[.,!?;:'"()[\]{}<>&_/\\]/.test(ch);

/* Flips each line separately, keeping lines in their order, and reverses the
   characters (not UTF-16 halves, so emoji survive) when `reverseText` is on. */
export function textToUpsideDown(
  text: string,
  options: UpsideDownOptions,
  mode: FlipMode = 'upside-down'
): string {
  if (!text) return '';
  const charMap = mode === 'mirror' ? MIRROR_MAP : UPSIDE_DOWN_MAP;
  const reverse = mode !== 'no-reverse' && options.reverseText;

  const flipLine = (line: string) => {
    let chars = Array.from(line)
      .filter((ch) => options.preserveSpaces || ch !== ' ')
      .map((ch) => (isPunctuation(ch) && !options.preservePunctuation ? ch : charMap[ch] ?? ch));
    if (reverse) chars = chars.reverse();
    return chars.join('');
  };

  const lines = text.split('\n');
  return options.preserveLineBreaks ? lines.map(flipLine).join('\n') : flipLine(lines.join(' '));
}

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(UPSIDE_DOWN_MAP).map(([k, v]) => [v, k])
);
// Characters that map to themselves are ambiguous in case; prefer lowercase
Object.assign(REVERSE_MAP, { o: 'o', s: 's', x: 'x', z: 'z' });

/* Turns upside-down text back into normal text, line by line. */
export function upsideDownToText(text: string): string {
  if (!text) return '';
  return text
    .split('\n')
    .map((line) => Array.from(line).reverse().map((ch) => REVERSE_MAP[ch] ?? ch).join(''))
    .join('\n');
}

export function getPresetOptions(preset: string): Partial<UpsideDownOptions> & { mode: FlipMode } {
  switch (preset) {
    case 'classic':
      return { reverseText: true, preserveSpaces: true, preservePunctuation: true, mode: 'upside-down' };
    case 'mirrored':
      return { reverseText: true, preserveSpaces: true, preservePunctuation: true, mode: 'mirror' };
    case 'fully-flipped':
      return { reverseText: true, preserveSpaces: false, preservePunctuation: true, mode: 'upside-down' };
    default:
      return { reverseText: true, preserveSpaces: true, preservePunctuation: true, mode: 'upside-down' };
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(text: string, filename: string = 'upside-down-text.txt'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
