import { FindReplaceOptions, FindReplaceResult, MatchPosition, BatchReplaceItem } from './types';

export function findMatches(
  text: string,
  findText: string,
  options: FindReplaceOptions
): MatchPosition[] {
  if (!findText) return [];

  const matches: MatchPosition[] = [];

  try {
    if (options.useRegex) {
      const flags = options.matchCase ? 'g' : 'gi';
      const regex = new RegExp(findText, flags);
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0]
        });
      }
    } else {
      let searchText = findText;
      let sourceText = text;
      
      if (!options.matchCase) {
        searchText = searchText.toLowerCase();
        sourceText = sourceText.toLowerCase();
      }

      if (options.wholeWords) {
        const wordBoundary = /\b/;
        const regex = new RegExp(`\\b${escapeRegex(searchText)}\\b`, options.matchCase ? 'g' : 'gi');
        let match;
        
        while ((match = regex.exec(text)) !== null) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0]
          });
        }
      } else {
        let index = sourceText.indexOf(searchText);
        
        while (index !== -1) {
          matches.push({
            start: index,
            end: index + findText.length,
            text: text.substring(index, index + findText.length)
          });
          index = sourceText.indexOf(searchText, index + 1);
        }
      }
    }
  } catch (error) {
    console.error('Error finding matches:', error);
  }

  return matches;
}

export function replaceText(
  text: string,
  findText: string,
  replaceText: string,
  options: FindReplaceOptions,
  replaceAll: boolean = true
): FindReplaceResult {
  if (!findText) {
    return {
      text,
      matchesFound: 0,
      replacementsMade: 0,
      matches: []
    };
  }

  const matches = findMatches(text, findText, options);
  let resultText = text;
  let replacementsMade = 0;

  if (matches.length > 0) {
    if (replaceAll) {
      // Replace all matches from end to start to maintain indices
      for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        resultText = resultText.substring(0, match.start) + replaceText + resultText.substring(match.end);
        replacementsMade++;
      }
    } else {
      // Replace only first match
      const match = matches[0];
      resultText = resultText.substring(0, match.start) + replaceText + resultText.substring(match.end);
      replacementsMade = 1;
    }
  }

  return {
    text: resultText,
    matchesFound: matches.length,
    replacementsMade,
    matches
  };
}

export function batchReplace(
  text: string,
  items: BatchReplaceItem[],
  options: FindReplaceOptions
): FindReplaceResult {
  let resultText = text;
  let totalMatches = 0;
  let totalReplacements = 0;
  const allMatches: MatchPosition[] = [];

  const enabledItems = items.filter(item => item.enabled && item.find);

  for (const item of enabledItems) {
    const result = replaceText(resultText, item.find, item.replace, options, true);
    resultText = result.text;
    totalMatches += result.matchesFound;
    totalReplacements += result.replacementsMade;
  }

  return {
    text: resultText,
    matchesFound: totalMatches,
    replacementsMade: totalReplacements,
    matches: allMatches
  };
}

export function highlightMatches(text: string, matches: MatchPosition[]): string {
  if (matches.length === 0) return text;

  let result = '';
  let lastIndex = 0;

  for (const match of matches) {
    result += text.substring(lastIndex, match.start);
    result += `<mark class="bg-yellow-200">${text.substring(match.start, match.end)}</mark>`;
    lastIndex = match.end;
  }
  
  result += text.substring(lastIndex);
  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
