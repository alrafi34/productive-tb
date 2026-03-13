export interface EncodingResult {
  success: boolean;
  result: string;
  error?: string;
}

export interface URLComponent {
  protocol?: string;
  domain?: string;
  path?: string;
  query?: string;
  fragment?: string;
}

export interface QueryParam {
  key: string;
  value: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  input: string;
  output: string;
  mode: 'encode' | 'decode';
  method: 'encodeURI' | 'encodeURIComponent';
}

export const ENCODING_TABLE = [
  { char: ' ', encoded: '%20', description: 'Space' },
  { char: '!', encoded: '%21', description: 'Exclamation' },
  { char: '"', encoded: '%22', description: 'Double quote' },
  { char: '#', encoded: '%23', description: 'Hash' },
  { char: '$', encoded: '%24', description: 'Dollar' },
  { char: '%', encoded: '%25', description: 'Percent' },
  { char: '&', encoded: '%26', description: 'Ampersand' },
  { char: "'", encoded: '%27', description: 'Single quote' },
  { char: '(', encoded: '%28', description: 'Left paren' },
  { char: ')', encoded: '%29', description: 'Right paren' },
  { char: '*', encoded: '%2A', description: 'Asterisk' },
  { char: '+', encoded: '%2B', description: 'Plus' },
  { char: ',', encoded: '%2C', description: 'Comma' },
  { char: '/', encoded: '%2F', description: 'Slash' },
  { char: ':', encoded: '%3A', description: 'Colon' },
  { char: ';', encoded: '%3B', description: 'Semicolon' },
  { char: '=', encoded: '%3D', description: 'Equals' },
  { char: '?', encoded: '%3F', description: 'Question mark' },
  { char: '@', encoded: '%40', description: 'At sign' },
  { char: '[', encoded: '%5B', description: 'Left bracket' },
  { char: ']', encoded: '%5D', description: 'Right bracket' },
];

export function encodeURL(input: string, method: 'encodeURI' | 'encodeURIComponent' = 'encodeURIComponent'): EncodingResult {
  try {
    if (!input) return { success: true, result: '' };
    const result = method === 'encodeURI' ? encodeURI(input) : encodeURIComponent(input);
    return { success: true, result };
  } catch (error) {
    return { success: false, result: '', error: 'Encoding failed' };
  }
}

export function decodeURL(input: string): EncodingResult {
  try {
    if (!input) return { success: true, result: '' };
    const result = decodeURIComponent(input);
    return { success: true, result };
  } catch (error) {
    return { success: false, result: '', error: 'Invalid URL encoding' };
  }
}

export function isLikelyEncoded(input: string): boolean {
  return /%[0-9A-Fa-f]{2}/.test(input);
}

export function autoDetectAndProcess(input: string, method: 'encodeURI' | 'encodeURIComponent'): EncodingResult {
  if (isLikelyEncoded(input)) {
    return decodeURL(input);
  }
  return encodeURL(input, method);
}

export function parseURL(url: string): URLComponent {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      domain: urlObj.hostname,
      path: urlObj.pathname,
      query: urlObj.search,
      fragment: urlObj.hash,
    };
  } catch {
    // Try to parse manually if not a valid URL
    const match = url.match(/^(https?:\/\/)?([^/?#]+)([^?#]*)?(\?[^#]*)?(#.*)?$/);
    if (match) {
      return {
        protocol: match[1] || '',
        domain: match[2] || '',
        path: match[3] || '',
        query: match[4] || '',
        fragment: match[5] || '',
      };
    }
    return {};
  }
}

export function extractQueryParams(queryString: string): QueryParam[] {
  const params: QueryParam[] = [];
  const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  
  if (!cleanQuery) return params;
  
  const pairs = cleanQuery.split('&');
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      params.push({
        key: decodeURIComponent(key),
        value: value ? decodeURIComponent(value) : '',
      });
    }
  });
  
  return params;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
