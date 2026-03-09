import { CleaningOptions, CleaningResult } from './types';

export function cleanWhitespace(text: string, options: CleaningOptions): CleaningResult {
  if (!text) {
    return {
      cleanedText: '',
      spacesRemoved: 0,
      linesProcessed: 0,
      emptyLinesRemoved: 0,
      tabsConverted: 0
    };
  }

  let result = text;
  let spacesRemoved = 0;
  let emptyLinesRemoved = 0;
  let tabsConverted = 0;

  // Count original spaces for statistics
  const originalSpaceCount = (text.match(/\s/g) || []).length;

  // Convert tabs to spaces or vice versa
  if (options.tabsToSpaces) {
    const tabCount = (result.match(/\t/g) || []).length;
    const spaces = ' '.repeat(options.tabSize);
    result = result.replace(/\t/g, spaces);
    tabsConverted = tabCount;
  } else if (options.spacesToTabs) {
    const spacePattern = new RegExp(' '.repeat(options.tabSize), 'g');
    const matches = result.match(spacePattern);
    tabsConverted = matches ? matches.length : 0;
    result = result.replace(spacePattern, '\t');
  }

  // Process line by line
  const lines = result.split('\n');
  let processedLines: string[] = [];

  for (let line of lines) {
    // Remove all spaces if option is enabled
    if (options.removeAllSpaces) {
      line = line.replace(/\s+/g, '');
    } else {
      // Remove leading spaces
      if (options.removeLeading) {
        line = line.replace(/^\s+/, '');
      }

      // Remove trailing spaces
      if (options.removeTrailing) {
        line = line.replace(/\s+$/, '');
      }

      // Replace multiple consecutive spaces with single space
      if (options.removeMultiple) {
        line = line.replace(/\s{2,}/g, ' ');
      }
    }

    // Check if line is empty after processing
    if (options.removeEmptyLines && line.trim() === '') {
      emptyLinesRemoved++;
      continue;
    }

    processedLines.push(line);
  }

  result = processedLines.join('\n');

  // Calculate spaces removed
  const finalSpaceCount = (result.match(/\s/g) || []).length;
  spacesRemoved = originalSpaceCount - finalSpaceCount;

  return {
    cleanedText: result,
    spacesRemoved: Math.max(0, spacesRemoved),
    linesProcessed: lines.length,
    emptyLinesRemoved,
    tabsConverted
  };
}

export function highlightExtraSpaces(text: string): string {
  if (!text) return '';

  // Highlight leading spaces
  let highlighted = text.replace(/^(\s+)/gm, '<mark class="bg-yellow-200">$1</mark>');
  
  // Highlight trailing spaces
  highlighted = highlighted.replace(/(\s+)$/gm, '<mark class="bg-yellow-200">$1</mark>');
  
  // Highlight multiple consecutive spaces (2 or more)
  highlighted = highlighted.replace(/(\s{2,})/g, '<mark class="bg-yellow-200">$1</mark>');

  return highlighted;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
}

export function downloadAsFile(content: string, filename: string, extension: string = 'txt'): void {
  const mimeTypes: { [key: string]: string } = {
    txt: 'text/plain',
    md: 'text/markdown',
    csv: 'text/csv'
  };

  const blob = new Blob([content], { type: `${mimeTypes[extension] || 'text/plain'};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.${extension}`;
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

export function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export function loadFromLocalStorage(key: string): any {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
    return null;
  }
}
