export type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

export interface SRIResult {
  algorithm: HashAlgorithm;
  hash: string;
  integrity: string;
  size?: number;
}

export interface ResourceInfo {
  url: string;
  type: 'script' | 'style';
  content?: string;
  size?: number;
}

export interface BatchResult {
  url: string;
  type: 'script' | 'style';
  results: SRIResult[];
  error?: string;
}

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Generate SRI hash for content
export async function generateSRIHash(
  content: string,
  algorithm: HashAlgorithm
): Promise<SRIResult> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const base64Hash = arrayBufferToBase64(hashBuffer);
  
  const algoPrefix = algorithm.toLowerCase().replace('-', '');
  
  return {
    algorithm,
    hash: base64Hash,
    integrity: `${algoPrefix}-${base64Hash}`,
    size: data.length,
  };
}

// Generate all hash algorithms at once
export async function generateAllHashes(content: string): Promise<SRIResult[]> {
  const algorithms: HashAlgorithm[] = ['SHA-256', 'SHA-384', 'SHA-512'];
  return Promise.all(algorithms.map(algo => generateSRIHash(content, algo)));
}

// Fetch resource from URL
export async function fetchResource(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

// Detect resource type from URL
export function detectResourceType(url: string): 'script' | 'style' {
  const lower = url.toLowerCase();
  if (lower.endsWith('.css')) return 'style';
  if (lower.endsWith('.js')) return 'script';
  if (lower.includes('.css?')) return 'style';
  if (lower.includes('.js?')) return 'script';
  return 'script'; // default
}

// Generate HTML snippet
export function generateHTMLSnippet(
  url: string,
  integrity: string,
  type: 'script' | 'style'
): string {
  if (type === 'style') {
    return `<link rel="stylesheet" href="${url}"\n      integrity="${integrity}"\n      crossorigin="anonymous">`;
  }
  return `<script src="${url}"\n        integrity="${integrity}"\n        crossorigin="anonymous"></script>`;
}

// Read file as text
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Parse batch URLs
export function parseBatchURLs(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && (line.startsWith('http://') || line.startsWith('https://')));
}

// Process batch URLs
export async function processBatchURLs(
  urls: string[],
  algorithm: HashAlgorithm,
  onProgress?: (current: number, total: number) => void
): Promise<BatchResult[]> {
  const results: BatchResult[] = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const type = detectResourceType(url);
    
    try {
      const content = await fetchResource(url);
      const sriResults = await generateAllHashes(content);
      
      results.push({
        url,
        type,
        results: sriResults,
      });
    } catch (error) {
      results.push({
        url,
        type,
        results: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
    
    if (onProgress) {
      onProgress(i + 1, urls.length);
    }
  }
  
  return results;
}

// Export snippets as text
export function exportSnippets(results: BatchResult[], algorithm: HashAlgorithm): string {
  let output = '<!-- SRI Hash Generator - Generated Snippets -->\n\n';
  
  results.forEach(result => {
    if (result.error) {
      output += `<!-- Error fetching ${result.url}: ${result.error} -->\n\n`;
      return;
    }
    
    const sriResult = result.results.find(r => r.algorithm === algorithm);
    if (sriResult) {
      const snippet = generateHTMLSnippet(result.url, sriResult.integrity, result.type);
      output += `${snippet}\n\n`;
    }
  });
  
  return output;
}

// Download text file
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
