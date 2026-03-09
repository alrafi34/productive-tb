import { ProcessingOptions, ProcessingResult, SortOrder, TextTransform } from './types';

export function removeDuplicateLines(
  text: string,
  options: ProcessingOptions
): ProcessingResult {
  const lines = text.split('\n');
  const totalLines = lines.length;
  let emptyLinesRemoved = 0;

  // Process lines
  let processedLines = lines.map(line => {
    let processed = line;
    if (options.trimWhitespace) {
      processed = processed.trim();
    }
    return processed;
  });

  // Remove empty lines if needed
  if (options.removeEmpty) {
    const beforeEmpty = processedLines.length;
    processedLines = processedLines.filter(line => line.length > 0);
    emptyLinesRemoved = beforeEmpty - processedLines.length;
  }

  // Track duplicates
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  const originalLines = [...processedLines];

  processedLines.forEach(line => {
    const key = options.ignoreCase ? line.toLowerCase() : line;
    if (seen.has(key)) {
      duplicates.add(key);
    } else {
      seen.add(key);
    }
  });

  // Remove or keep duplicates
  let cleanedLines: string[] = [];
  const seenInResult = new Set<string>();

  if (options.keepOnlyDuplicates) {
    // Keep only lines that appeared more than once
    processedLines.forEach(line => {
      const key = options.ignoreCase ? line.toLowerCase() : line;
      if (duplicates.has(key) && !seenInResult.has(key)) {
        cleanedLines.push(line);
        seenInResult.add(key);
      }
    });
  } else {
    // Remove duplicates (keep first occurrence)
    processedLines.forEach(line => {
      const key = options.ignoreCase ? line.toLowerCase() : line;
      if (!seenInResult.has(key)) {
        cleanedLines.push(line);
        seenInResult.add(key);
      }
    });
  }

  // Apply sorting
  cleanedLines = applySorting(cleanedLines, options.sortOrder);

  const duplicatesRemoved = originalLines.length - cleanedLines.length;

  return {
    cleanedLines,
    totalLines,
    duplicatesRemoved: Math.max(0, duplicatesRemoved),
    remainingLines: cleanedLines.length,
    emptyLinesRemoved
  };
}

export function applySorting(lines: string[], order: SortOrder): string[] {
  if (order === 'none') return lines;
  
  const sorted = [...lines];
  
  if (order === 'asc') {
    return sorted.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } else if (order === 'desc') {
    return sorted.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  } else if (order === 'random') {
    return sorted.sort(() => Math.random() - 0.5);
  }
  
  return sorted;
}

export function applyTextTransform(text: string, transform: TextTransform): string {
  if (transform === 'none') return text;
  
  if (transform === 'uppercase') {
    return text.toUpperCase();
  } else if (transform === 'lowercase') {
    return text.toLowerCase();
  } else if (transform === 'capitalize') {
    return text.split('\n').map(line => 
      line.charAt(0).toUpperCase() + line.slice(1).toLowerCase()
    ).join('\n');
  }
  
  return text;
}

export function findDuplicates(text: string, ignoreCase: boolean, trimWhitespace: boolean): string[] {
  const lines = text.split('\n').map(line => trimWhitespace ? line.trim() : line);
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  lines.forEach(line => {
    const key = ignoreCase ? line.toLowerCase() : line;
    if (seen.has(key)) {
      duplicates.add(line);
    } else {
      seen.add(key);
    }
  });

  return Array.from(duplicates);
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
