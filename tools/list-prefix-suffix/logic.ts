import { PrefixSuffixOptions, TemplateType } from "./types";

/* Splits into lines (Windows \r\n too) and applies the empty-line and trim options */
function prepareLines(text: string, options: PrefixSuffixOptions): string[] {
  let lines = text.replace(/\r\n?/g, '\n').split('\n');
  if (options.removeEmptyLines) lines = lines.filter(line => line.trim() !== '');
  if (options.trimSpaces) lines = lines.map(line => line.trim());
  return lines;
}

/* Adds the prefix, optional number and suffix to every non-empty line.
   Blank lines stay blank and are not numbered, so a list split into
   groups keeps its gaps and its numbering runs 1, 2, 3… */
function formatLines(
  lines: string[],
  options: PrefixSuffixOptions,
  affixes: (index: number) => { prefix: string; suffix: string }
): string {
  const lastContent = lines.map((l) => l.trim() !== '').lastIndexOf(true);
  let n = 0;
  return lines
    .map((line, i) => {
      if (line.trim() === '') return line;
      const { prefix, suffix } = affixes(n);
      const number = options.enableNumbering ? `${options.numberStart + n}${options.numberSeparator} ` : '';
      n++;
      // The last line drops only the separator: "blue" rather than "blue", or "blue
      const end = options.skipLastSuffix && i === lastContent ? suffix.replace(/[,;]\s*$/, '') : suffix;
      return `${prefix}${number}${line}${end}`;
    })
    .join('\n');
}

export function applyPrefixSuffix(text: string, options: PrefixSuffixOptions): string {
  if (!text) return '';
  return formatLines(prepareLines(text, options), options, () => ({ prefix: options.prefix, suffix: options.suffix }));
}

const PLAIN = { prefix: '', suffix: '', enableNumbering: false, skipLastSuffix: false };

export function getTemplateOptions(template: TemplateType): Partial<PrefixSuffixOptions> {
  switch (template) {
    case 'markdown-bullet':
      return { ...PLAIN, prefix: '- ' };
    case 'numbered-list':
      return { ...PLAIN, enableNumbering: true, numberStart: 1, numberSeparator: '.' };
    case 'checklist':
      return { ...PLAIN, prefix: '- [ ] ' };
    case 'quote':
      return { ...PLAIN, prefix: '> ' };
    case 'code-comment':
      return { ...PLAIN, prefix: '// ' };
    case 'csv':
      return { ...PLAIN, suffix: ',', skipLastSuffix: true };
    case 'quoted':
      return { ...PLAIN, prefix: '"', suffix: '",', skipLastSuffix: true };
    case 'html-li':
      return { ...PLAIN, prefix: '<li>', suffix: '</li>' };
    default:
      return {};
  }
}

const RANDOM_EMOJIS = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍊', '🍋', '🍓', '🥝', '🍑', '🍍', '🥭', '🍏', '🍐', '🥥'];

const pick = () => RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];

export function applyRandomPrefixSuffix(text: string, options: PrefixSuffixOptions): string {
  if (!text) return '';
  return formatLines(prepareLines(text, options), options, () => ({ prefix: `${pick()} `, suffix: ` ${pick()}` }));
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
