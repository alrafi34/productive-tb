export type RegexFlag = 'g' | 'i' | 'm' | 's' | 'u' | 'y';

export interface RegexMatch {
  match: string;
  index: number;
  endIndex: number;
  groups: (string | undefined)[];
}

export interface RegexTestResult {
  valid: boolean;
  error?: string;
  matches: RegexMatch[];
  totalMatches: number;
}

export interface RegexHistory {
  id: string;
  pattern: string;
  flags: RegexFlag[];
  testText: string;
  timestamp: number;
}

// Validate regex pattern
export function validateRegex(pattern: string, flags: string): { valid: boolean; error?: string } {
  try {
    new RegExp(pattern, flags);
    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      error: (e as Error).message
    };
  }
}

// Test regex against text
export function testRegex(pattern: string, flags: string, text: string): RegexTestResult {
  const validation = validateRegex(pattern, flags);
  if (!validation.valid) {
    return {
      valid: false,
      error: validation.error,
      matches: [],
      totalMatches: 0
    };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes('g')) {
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          endIndex: match.index + match[0].length,
          groups: Array.from(match.slice(1))
        });
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          endIndex: match.index + match[0].length,
          groups: Array.from(match.slice(1))
        });
      }
    }

    return {
      valid: true,
      matches,
      totalMatches: matches.length
    };
  } catch (e) {
    return {
      valid: false,
      error: (e as Error).message,
      matches: [],
      totalMatches: 0
    };
  }
}

// Get replacement preview
export function getReplacementPreview(pattern: string, flags: string, text: string, replacement: string): { success: boolean; result?: string; error?: string } {
  const validation = validateRegex(pattern, flags);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const result = text.replace(regex, replacement);
    return { success: true, result };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

// Highlight matches in text
export function highlightMatches(text: string, matches: RegexMatch[]): string {
  if (matches.length === 0) return text;

  let result = '';
  let lastIndex = 0;

  for (const match of matches) {
    result += text.slice(lastIndex, match.index);
    result += `<mark>${escapeHtml(text.slice(match.index, match.endIndex))}</mark>`;
    lastIndex = match.endIndex;
  }

  result += text.slice(lastIndex);
  return result;
}

// Escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Local storage helpers
const HISTORY_KEY = 'regex-tester-history';
const MAX_HISTORY = 20;

export function saveToHistory(pattern: string, flags: RegexFlag[], testText: string): void {
  if (typeof window === 'undefined') return;

  const stored = getHistory();
  const item: RegexHistory = {
    id: crypto.randomUUID(),
    pattern,
    flags,
    testText: testText.slice(0, 200),
    timestamp: Date.now()
  };

  stored.unshift(item);
  const trimmed = stored.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): RegexHistory[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportAsJSON(matches: RegexMatch[], pattern: string): void {
  const data = {
    pattern,
    totalMatches: matches.length,
    matches: matches.map(m => ({
      match: m.match,
      index: m.index,
      endIndex: m.endIndex,
      groups: m.groups
    }))
  };

  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `regex-matches-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsCSV(matches: RegexMatch[], pattern: string): void {
  let csv = 'Pattern,Match,Index,EndIndex,Groups\n';

  for (const match of matches) {
    const groups = match.groups.join('|');
    csv += `"${pattern.replace(/"/g, '""')}","${match.match.replace(/"/g, '""')}",${match.index},${match.endIndex},"${groups}"\n`;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `regex-matches-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Regex cheat sheet
export const REGEX_CHEAT_SHEET = [
  { category: 'Character Classes', items: [
    { pattern: '.', description: 'Any character except newline' },
    { pattern: '\\d', description: 'Digit (0-9)' },
    { pattern: '\\D', description: 'Non-digit' },
    { pattern: '\\w', description: 'Word character (a-z, A-Z, 0-9, _)' },
    { pattern: '\\W', description: 'Non-word character' },
    { pattern: '\\s', description: 'Whitespace' },
    { pattern: '\\S', description: 'Non-whitespace' },
  ]},
  { category: 'Quantifiers', items: [
    { pattern: '*', description: 'Zero or more' },
    { pattern: '+', description: 'One or more' },
    { pattern: '?', description: 'Zero or one' },
    { pattern: '{n}', description: 'Exactly n times' },
    { pattern: '{n,}', description: 'n or more times' },
    { pattern: '{n,m}', description: 'Between n and m times' },
  ]},
  { category: 'Anchors', items: [
    { pattern: '^', description: 'Start of string' },
    { pattern: '$', description: 'End of string' },
    { pattern: '\\b', description: 'Word boundary' },
    { pattern: '\\B', description: 'Non-word boundary' },
  ]},
  { category: 'Groups', items: [
    { pattern: '()', description: 'Capture group' },
    { pattern: '(?:)', description: 'Non-capturing group' },
    { pattern: '(?<name>)', description: 'Named capture group' },
  ]},
  { category: 'Common Patterns', items: [
    { pattern: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}', description: 'Email address' },
    { pattern: '\\d{3}-\\d{3}-\\d{4}', description: 'Phone number (XXX-XXX-XXXX)' },
    { pattern: 'https?://[^\\s]+', description: 'URL' },
    { pattern: '\\d{4}-\\d{2}-\\d{2}', description: 'Date (YYYY-MM-DD)' },
    { pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', description: 'IPv4 address' },
  ]},
];

// Example regex patterns
export const EXAMPLE_PATTERNS = [
  { name: 'Email', pattern: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}', example: 'john@example.com' },
  { name: 'Phone', pattern: '\\d{3}-\\d{3}-\\d{4}', example: '123-456-7890' },
  { name: 'URL', pattern: 'https?://[^\\s]+', example: 'https://example.com' },
  { name: 'Date', pattern: '\\d{4}-\\d{2}-\\d{2}', example: '2026-03-13' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', example: '192.168.1.1' },
  { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}', example: '#FF5733' },
  { name: 'Numbers', pattern: '\\d+', example: '123' },
  { name: 'Words', pattern: '\\b\\w+\\b', example: 'hello' },
];

// Get flag description
export function getFlagDescription(flag: RegexFlag): string {
  const descriptions: Record<RegexFlag, string> = {
    'g': 'Global - find all matches',
    'i': 'Case insensitive',
    'm': 'Multiline - ^ and $ match line boundaries',
    's': 'DotAll - . matches newlines',
    'u': 'Unicode',
    'y': 'Sticky - match from lastIndex'
  };
  return descriptions[flag];
}
