export interface CleanedURL {
  original: string;
  cleaned: string;
  removedParams: string[];
  paramCount: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  original: string;
  cleaned: string;
  removedParams: string[];
}

export const DEFAULT_TRACKING_PARAMS = new Set([
  // UTM parameters
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_source_platform',
  
  // Facebook
  'fbclid',
  'fb_action_ids',
  'fb_action_types',
  'fb_ref',
  'fb_source',
  
  // Google
  'gclid',
  'gclsrc',
  'dclid',
  'gbraid',
  'wbraid',
  
  // Microsoft
  'msclkid',
  'ms_c',
  
  // Twitter/X
  'twclid',
  't',
  's',
  
  // LinkedIn
  'li_fat_id',
  'trk',
  'trkCampaign',
  
  // Email marketing
  'mc_cid',
  'mc_eid',
  'mkt_tok',
  '_hsenc',
  '_hsmi',
  
  // Instagram
  'igshid',
  'igsh',
  
  // TikTok
  'tt_medium',
  'tt_content',
  
  // YouTube
  'feature',
  'kw',
  'si',
  
  // Amazon
  'tag',
  'ref_',
  'ref',
  'pf_rd_r',
  'pf_rd_p',
  'pf_rd_m',
  'pf_rd_s',
  'pf_rd_t',
  'pf_rd_i',
  
  // General tracking
  'source',
  'medium',
  'campaign',
  'content',
  'term',
  'spm',
  'vero_conv',
  'vero_id',
  'wickedid',
  'yclid',
  '_openstat',
  'pk_campaign',
  'pk_kwd',
  'pk_keyword',
  'piwik_campaign',
  'piwik_kwd',
  'piwik_keyword'
]);

export function cleanURL(url: string, customParams: Set<string> = new Set()): CleanedURL {
  if (!url.trim()) {
    return {
      original: url,
      cleaned: url,
      removedParams: [],
      paramCount: 0
    };
  }

  try {
    const urlObj = new URL(url);
    const removedParams: string[] = [];
    const allTrackingParams = new Set([...DEFAULT_TRACKING_PARAMS, ...customParams]);
    
    // Get all parameter keys to check
    const paramKeys = Array.from(urlObj.searchParams.keys());
    
    paramKeys.forEach(key => {
      if (allTrackingParams.has(key) || allTrackingParams.has(key.toLowerCase())) {
        removedParams.push(key);
        urlObj.searchParams.delete(key);
      }
    });

    return {
      original: url,
      cleaned: urlObj.toString(),
      removedParams,
      paramCount: removedParams.length
    };
  } catch (error) {
    // If URL parsing fails, return original
    return {
      original: url,
      cleaned: url,
      removedParams: [],
      paramCount: 0
    };
  }
}

export function cleanMultipleURLs(urls: string[], customParams: Set<string> = new Set()): CleanedURL[] {
  return urls
    .filter(url => url.trim())
    .map(url => cleanURL(url.trim(), customParams));
}

export function parseURLsFromText(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const matches = text.match(urlRegex) || [];
  
  // Also try to split by newlines and filter for URLs
  const lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line && (line.startsWith('http://') || line.startsWith('https://')));
  
  return [...new Set([...matches, ...lines])];
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function exportAsText(cleanedURLs: CleanedURL[]): void {
  const content = cleanedURLs.map(item => item.cleaned).join('\n');
  downloadFile(content, 'cleaned-urls.txt', 'text/plain');
}

export function exportAsCSV(cleanedURLs: CleanedURL[]): void {
  const headers = 'Original URL,Cleaned URL,Removed Parameters,Parameters Count\n';
  const rows = cleanedURLs.map(item => 
    `"${item.original}","${item.cleaned}","${item.removedParams.join(', ')}",${item.paramCount}`
  ).join('\n');
  
  const content = headers + rows;
  downloadFile(content, 'cleaned-urls.csv', 'text/csv');
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function saveToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  };
  
  const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50
  localStorage.setItem('urlSanitizerHistory', JSON.stringify(updatedHistory));
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem('urlSanitizerHistory');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem('urlSanitizerHistory');
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}