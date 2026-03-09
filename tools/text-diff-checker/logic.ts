import { DiffOptions, DiffResult, DiffPart, DiffStatistics, ComparisonLevel } from './types';

export function compareTexts(textA: string, textB: string, options: DiffOptions): DiffResult {
  let processedA = textA;
  let processedB = textB;

  if (options.ignoreCase) {
    processedA = processedA.toLowerCase();
    processedB = processedB.toLowerCase();
  }

  if (options.ignoreWhitespace) {
    processedA = processedA.replace(/\s+/g, ' ').trim();
    processedB = processedB.replace(/\s+/g, ' ').trim();
  }

  let result: DiffResult;

  switch (options.comparisonLevel) {
    case 'line':
      result = compareLines(textA, textB, processedA, processedB);
      break;
    case 'word':
      result = compareWords(textA, textB, processedA, processedB);
      break;
    case 'character':
      result = compareCharacters(textA, textB, processedA, processedB);
      break;
    default:
      result = compareLines(textA, textB, processedA, processedB);
  }

  return result;
}

function compareLines(originalA: string, originalB: string, processedA: string, processedB: string): DiffResult {
  const linesA = originalA.split('\n');
  const linesB = originalB.split('\n');
  const processedLinesA = processedA.split('\n');
  const processedLinesB = processedB.split('\n');

  const diff = computeLCS(processedLinesA, processedLinesB);
  
  const textADiff: DiffPart[] = [];
  const textBDiff: DiffPart[] = [];
  const inlineDiff: DiffPart[] = [];

  let stats: DiffStatistics = {
    totalDifferences: 0,
    addedLines: 0,
    removedLines: 0,
    modifiedLines: 0,
    similarityPercentage: 0,
    totalLinesA: linesA.length,
    totalLinesB: linesB.length
  };

  let i = 0, j = 0;
  let lineNumA = 1, lineNumB = 1;

  for (const op of diff) {
    if (op.type === 'equal') {
      for (let k = 0; k < op.count; k++) {
        textADiff.push({ type: 'unchanged', value: linesA[i] + '\n', lineNumber: lineNumA++ });
        textBDiff.push({ type: 'unchanged', value: linesB[j] + '\n', lineNumber: lineNumB++ });
        inlineDiff.push({ type: 'unchanged', value: linesA[i] + '\n' });
        i++;
        j++;
      }
    } else if (op.type === 'delete') {
      for (let k = 0; k < op.count; k++) {
        textADiff.push({ type: 'removed', value: linesA[i] + '\n', lineNumber: lineNumA++ });
        inlineDiff.push({ type: 'removed', value: linesA[i] + '\n' });
        stats.removedLines++;
        stats.totalDifferences++;
        i++;
      }
    } else if (op.type === 'insert') {
      for (let k = 0; k < op.count; k++) {
        textBDiff.push({ type: 'added', value: linesB[j] + '\n', lineNumber: lineNumB++ });
        inlineDiff.push({ type: 'added', value: linesB[j] + '\n' });
        stats.addedLines++;
        stats.totalDifferences++;
        j++;
      }
    }
  }

  const totalLines = Math.max(linesA.length, linesB.length);
  const unchangedLines = totalLines - stats.totalDifferences;
  stats.similarityPercentage = totalLines > 0 ? Math.round((unchangedLines / totalLines) * 100) : 100;

  return { textA: textADiff, textB: textBDiff, inline: inlineDiff, statistics: stats };
}

function compareWords(originalA: string, originalB: string, processedA: string, processedB: string): DiffResult {
  const wordsA = originalA.split(/(\s+)/);
  const wordsB = originalB.split(/(\s+)/);
  const processedWordsA = processedA.split(/(\s+)/);
  const processedWordsB = processedB.split(/(\s+)/);

  const diff = computeLCS(processedWordsA, processedWordsB);
  
  const textADiff: DiffPart[] = [];
  const textBDiff: DiffPart[] = [];
  const inlineDiff: DiffPart[] = [];

  let stats: DiffStatistics = {
    totalDifferences: 0,
    addedLines: 0,
    removedLines: 0,
    modifiedLines: 0,
    similarityPercentage: 0,
    totalLinesA: originalA.split('\n').length,
    totalLinesB: originalB.split('\n').length
  };

  let i = 0, j = 0;

  for (const op of diff) {
    if (op.type === 'equal') {
      for (let k = 0; k < op.count; k++) {
        textADiff.push({ type: 'unchanged', value: wordsA[i] });
        textBDiff.push({ type: 'unchanged', value: wordsB[j] });
        inlineDiff.push({ type: 'unchanged', value: wordsA[i] });
        i++;
        j++;
      }
    } else if (op.type === 'delete') {
      for (let k = 0; k < op.count; k++) {
        textADiff.push({ type: 'removed', value: wordsA[i] });
        inlineDiff.push({ type: 'removed', value: wordsA[i] });
        stats.totalDifferences++;
        i++;
      }
    } else if (op.type === 'insert') {
      for (let k = 0; k < op.count; k++) {
        textBDiff.push({ type: 'added', value: wordsB[j] });
        inlineDiff.push({ type: 'added', value: wordsB[j] });
        stats.totalDifferences++;
        j++;
      }
    }
  }

  const totalWords = Math.max(wordsA.length, wordsB.length);
  const unchangedWords = totalWords - stats.totalDifferences;
  stats.similarityPercentage = totalWords > 0 ? Math.round((unchangedWords / totalWords) * 100) : 100;

  return { textA: textADiff, textB: textBDiff, inline: inlineDiff, statistics: stats };
}

function compareCharacters(originalA: string, originalB: string, processedA: string, processedB: string): DiffResult {
  const charsA = originalA.split('');
  const charsB = originalB.split('');
  const processedCharsA = processedA.split('');
  const processedCharsB = processedB.split('');

  const diff = computeLCS(processedCharsA, processedCharsB);
  
  const textADiff: DiffPart[] = [];
  const textBDiff: DiffPart[] = [];
  const inlineDiff: DiffPart[] = [];

  let stats: DiffStatistics = {
    totalDifferences: 0,
    addedLines: 0,
    removedLines: 0,
    modifiedLines: 0,
    similarityPercentage: 0,
    totalLinesA: originalA.split('\n').length,
    totalLinesB: originalB.split('\n').length
  };

  let i = 0, j = 0;

  for (const op of diff) {
    if (op.type === 'equal') {
      for (let k = 0; k < op.count; k++) {
        textADiff.push({ type: 'unchanged', value: charsA[i] });
        textBDiff.push({ type: 'unchanged', value: charsB[j] });
        inlineDiff.push({ type: 'unchanged', value: charsA[i] });
        i++;
        j++;
      }
    } else if (op.type === 'delete') {
      for (let k = 0; k < op.count; k++) {
        textADiff.push({ type: 'removed', value: charsA[i] });
        inlineDiff.push({ type: 'removed', value: charsA[i] });
        stats.totalDifferences++;
        i++;
      }
    } else if (op.type === 'insert') {
      for (let k = 0; k < op.count; k++) {
        textBDiff.push({ type: 'added', value: charsB[j] });
        inlineDiff.push({ type: 'added', value: charsB[j] });
        stats.totalDifferences++;
        j++;
      }
    }
  }

  const totalChars = Math.max(charsA.length, charsB.length);
  const unchangedChars = totalChars - stats.totalDifferences;
  stats.similarityPercentage = totalChars > 0 ? Math.round((unchangedChars / totalChars) * 100) : 100;

  return { textA: textADiff, textB: textBDiff, inline: inlineDiff, statistics: stats };
}

interface DiffOp {
  type: 'equal' | 'delete' | 'insert';
  count: number;
}

function computeLCS(a: string[], b: string[]): DiffOp[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const ops: DiffOp[] = [];
  let i = m, j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      if (ops.length > 0 && ops[ops.length - 1].type === 'equal') {
        ops[ops.length - 1].count++;
      } else {
        ops.push({ type: 'equal', count: 1 });
      }
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      if (ops.length > 0 && ops[ops.length - 1].type === 'insert') {
        ops[ops.length - 1].count++;
      } else {
        ops.push({ type: 'insert', count: 1 });
      }
      j--;
    } else {
      if (ops.length > 0 && ops[ops.length - 1].type === 'delete') {
        ops[ops.length - 1].count++;
      } else {
        ops.push({ type: 'delete', count: 1 });
      }
      i--;
    }
  }

  return ops.reverse();
}

export function renderDiffParts(parts: DiffPart[]): string {
  return parts.map(part => {
    const escaped = escapeHtml(part.value);
    switch (part.type) {
      case 'added':
        return `<span class="bg-green-200 text-green-900">${escaped}</span>`;
      case 'removed':
        return `<span class="bg-red-200 text-red-900 line-through">${escaped}</span>`;
      case 'modified':
        return `<span class="bg-yellow-200 text-yellow-900">${escaped}</span>`;
      default:
        return escaped;
    }
  }).join('');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function exportDiffAsHtml(parts: DiffPart[], title: string): string {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: monospace; padding: 20px; }
    .added { background-color: #d4edda; color: #155724; }
    .removed { background-color: #f8d7da; color: #721c24; text-decoration: line-through; }
    .modified { background-color: #fff3cd; color: #856404; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <pre>${renderDiffParts(parts)}</pre>
</body>
</html>`;
  return html;
}
