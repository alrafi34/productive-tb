import { GeneratorOptions, GeneratedResult } from './types';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const RANDOM_WORDS = [
  'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'cat', 'bird',
  'tree', 'house', 'car', 'book', 'computer', 'phone', 'table', 'chair', 'window',
  'door', 'light', 'dark', 'fast', 'slow', 'big', 'small', 'happy', 'sad',
  'beautiful', 'ugly', 'strong', 'weak', 'hot', 'cold', 'new', 'old', 'good', 'bad'
];

function getWordPool(mode: string, customWords: string[]): string[] {
  if (mode === 'classic') return LOREM_WORDS;
  if (mode === 'full') return [...RANDOM_WORDS, ...customWords];
  return [...LOREM_WORDS, ...RANDOM_WORDS, ...customWords];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateWords(count: number, wordPool: string[]): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(wordPool[Math.floor(Math.random() * wordPool.length)]);
  }
  return words;
}

function generateSentence(wordPool: string[], minWords = 5, maxWords = 15): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = generateWords(wordCount, wordPool);
  return capitalize(words.join(' ')) + '.';
}

function generateParagraph(wordPool: string[], minSentences = 3, maxSentences = 7): string {
  const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(wordPool));
  }
  return sentences.join(' ');
}

export function generateText(options: GeneratorOptions): GeneratedResult {
  const wordPool = getWordPool(options.randomMode, options.customWords);
  let text = '';
  let html = '';

  if (options.type === 'paragraphs') {
    const paragraphs: string[] = [];
    for (let i = 0; i < options.count; i++) {
      let para = generateParagraph(wordPool);
      if (i === 0 && options.startWithLorem) {
        para = 'Lorem ipsum ' + para.substring(para.indexOf(' ') + 1);
      }
      paragraphs.push(para);
    }
    text = paragraphs.join('\n\n');
    html = options.includeHtml 
      ? paragraphs.map(p => `<p>${p}</p>`).join('\n')
      : text;
  } else if (options.type === 'sentences') {
    const sentences: string[] = [];
    for (let i = 0; i < options.count; i++) {
      let sentence = generateSentence(wordPool);
      if (i === 0 && options.startWithLorem) {
        sentence = 'Lorem ipsum ' + sentence.substring(sentence.indexOf(' ') + 1);
      }
      sentences.push(sentence);
    }
    text = sentences.join(' ');
    html = options.includeHtml 
      ? `<p>${text}</p>`
      : text;
  } else {
    const words = generateWords(options.count, wordPool);
    if (options.startWithLorem && words.length > 0) {
      words[0] = 'Lorem';
      if (words.length > 1) words[1] = 'ipsum';
    }
    text = capitalize(words.join(' ')) + '.';
    html = options.includeHtml 
      ? `<p>${text}</p>`
      : text;
  }

  return {
    text,
    html,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    characterCount: text.length
  };
}

export function downloadAsFile(content: string, filename: string, type: 'text' | 'html') {
  const mimeType = type === 'html' ? 'text/html' : 'text/plain';
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
