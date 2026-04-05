export interface ParsedUserAgent {
  browser: string;
  version: string;
  os: string;
  osVersion: string;
  device: string;
  engine: string;
  fullUA: string;
}

export interface UAHistory {
  id: string;
  userAgent: string;
  parsed: ParsedUserAgent;
  timestamp: number;
}

// Browser detection patterns
const browserPatterns = [
  { name: 'Edge', pattern: /Edg(?:e|A|iOS)?\/([0-9\.]+)/ },
  { name: 'Chrome', pattern: /Chrome\/([0-9\.]+)/, exclude: /Edg|OPR/ },
  { name: 'Firefox', pattern: /Firefox\/([0-9\.]+)/ },
  { name: 'Safari', pattern: /Version\/([0-9\.]+).*Safari/, exclude: /Chrome|Chromium/ },
  { name: 'Opera', pattern: /(?:Opera|OPR)\/([0-9\.]+)/ },
  { name: 'Internet Explorer', pattern: /(?:MSIE |Trident.*rv:)([0-9\.]+)/ },
  { name: 'Samsung Browser', pattern: /SamsungBrowser\/([0-9\.]+)/ },
  { name: 'UC Browser', pattern: /UCBrowser\/([0-9\.]+)/ }
];

// OS detection patterns
const osPatterns = [
  { name: 'Windows 11', pattern: /Windows NT 10\.0.*(?:Build 22000|Build 22621)/ },
  { name: 'Windows 10', pattern: /Windows NT 10\.0/ },
  { name: 'Windows 8.1', pattern: /Windows NT 6\.3/ },
  { name: 'Windows 8', pattern: /Windows NT 6\.2/ },
  { name: 'Windows 7', pattern: /Windows NT 6\.1/ },
  { name: 'macOS', pattern: /Mac OS X ([0-9_\.]+)/ },
  { name: 'iOS', pattern: /(?:iPhone|iPad).*OS ([0-9_\.]+)/ },
  { name: 'Android', pattern: /Android ([0-9\.]+)/ },
  { name: 'Linux', pattern: /Linux/ },
  { name: 'Ubuntu', pattern: /Ubuntu/ },
  { name: 'Chrome OS', pattern: /CrOS/ }
];

// Device detection patterns
const devicePatterns = [
  { type: 'Mobile', pattern: /Mobile|Android.*Mobile|iPhone/ },
  { type: 'Tablet', pattern: /Tablet|iPad|Android(?!.*Mobile)/ },
  { type: 'Desktop', pattern: /.*/ } // Default fallback
];

// Engine detection patterns
const enginePatterns = [
  { name: 'Blink', pattern: /Chrome|Chromium|Edge|Opera/ },
  { name: 'WebKit', pattern: /Safari(?!.*Chrome)/ },
  { name: 'Gecko', pattern: /Firefox/ },
  { name: 'Trident', pattern: /Trident|MSIE/ }
];

export function parseUserAgent(userAgent: string): ParsedUserAgent {
  const ua = userAgent || navigator.userAgent;
  
  // Detect browser
  let browser = 'Unknown';
  let version = 'Unknown';
  
  for (const { name, pattern, exclude } of browserPatterns) {
    if (pattern.test(ua) && (!exclude || !exclude.test(ua))) {
      browser = name;
      const match = ua.match(pattern);
      version = match ? match[1] : 'Unknown';
      break;
    }
  }
  
  // Detect OS
  let os = 'Unknown';
  let osVersion = '';
  
  for (const { name, pattern } of osPatterns) {
    const match = ua.match(pattern);
    if (match) {
      os = name;
      if (match[1]) {
        osVersion = match[1].replace(/_/g, '.');
      }
      break;
    }
  }
  
  // Detect device type
  let device = 'Desktop';
  for (const { type, pattern } of devicePatterns) {
    if (pattern.test(ua)) {
      device = type;
      break;
    }
  }
  
  // Detect engine
  let engine = 'Unknown';
  for (const { name, pattern } of enginePatterns) {
    if (pattern.test(ua)) {
      engine = name;
      break;
    }
  }
  
  return {
    browser,
    version,
    os,
    osVersion,
    device,
    engine,
    fullUA: ua
  };
}

export function getCurrentUserAgent(): string {
  return navigator.userAgent;
}

export function saveToHistory(parsed: ParsedUserAgent): void {
  const history = getHistory();
  const newItem: UAHistory = {
    id: crypto.randomUUID(),
    userAgent: parsed.fullUA,
    parsed,
    timestamp: Date.now()
  };
  
  // Remove duplicates and keep only last 10
  const filtered = history.filter(item => item.userAgent !== parsed.fullUA);
  const updated = [newItem, ...filtered].slice(0, 10);
  
  localStorage.setItem('ua-parser-history', JSON.stringify(updated));
}

export function getHistory(): UAHistory[] {
  try {
    const stored = localStorage.getItem('ua-parser-history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem('ua-parser-history');
}

export function exportAsJSON(data: ParsedUserAgent): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'user-agent-parsed.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportHistoryAsJSON(history: UAHistory[]): void {
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'user-agent-history.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Example User-Agent strings for testing
export const exampleUserAgents = [
  {
    name: "Chrome on Windows 10",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  },
  {
    name: "Safari on iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
  },
  {
    name: "Firefox on macOS",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
  },
  {
    name: "Chrome on Android",
    ua: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36"
  },
  {
    name: "Edge on Windows 11",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
  }
];