import { PrefixSuffixOptions, TemplateType } from "./types";

export function applyPrefixSuffix(text: string, options: PrefixSuffixOptions): string {
  if (!text) return '';

  let lines = text.split('\n');

  if (options.removeEmptyLines) {
    lines = lines.filter(line => line.trim() !== '');
  }

  if (options.trimSpaces) {
    lines = lines.map(line => line.trim());
  }

  const formattedLines = lines.map((line, index) => {
    let result = line;

    if (options.enableNumbering) {
      const number = options.numberStart + index;
      result = `${number}${options.numberSeparator} ${result}`;
    }

    result = `${options.prefix}${result}${options.suffix}`;

    return result;
  });

  return formattedLines.join('\n');
}

export function getTemplateOptions(template: TemplateType): Partial<PrefixSuffixOptions> {
  switch (template) {
    case 'markdown-bullet':
      return { prefix: '- ', suffix: '', enableNumbering: false };
    case 'numbered-list':
      return { prefix: '', suffix: '', enableNumbering: true, numberStart: 1, numberSeparator: '.' };
    case 'checklist':
      return { prefix: '[ ] ', suffix: '', enableNumbering: false };
    case 'quote':
      return { prefix: '> ', suffix: '', enableNumbering: false };
    case 'code-comment':
      return { prefix: '// ', suffix: '', enableNumbering: false };
    case 'csv':
      return { prefix: '', suffix: ',', enableNumbering: false };
    default:
      return {};
  }
}

const RANDOM_EMOJIS = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍊', '🍋', '🍓', '🥝', '🍑', '🍍', '🥭', '🍏', '🍐', '🥥'];

export function applyRandomPrefixSuffix(text: string, options: PrefixSuffixOptions): string {
  if (!text) return '';

  let lines = text.split('\n');

  if (options.removeEmptyLines) {
    lines = lines.filter(line => line.trim() !== '');
  }

  if (options.trimSpaces) {
    lines = lines.map(line => line.trim());
  }

  const formattedLines = lines.map((line, index) => {
    const randomPrefix = RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
    const randomSuffix = RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
    
    let result = line;

    if (options.enableNumbering) {
      const number = options.numberStart + index;
      result = `${number}${options.numberSeparator} ${result}`;
    }

    result = `${randomPrefix}${result}${randomSuffix}`;

    return result;
  });

  return formattedLines.join('\n');
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(text: string, filename: string = 'formatted-list.txt'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
