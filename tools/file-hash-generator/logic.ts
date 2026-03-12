// File Hash Generation Logic using Web Crypto API

export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  file: FileInfo;
  timestamp: number;
}

// Convert ArrayBuffer to hex string
function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Format date
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

// Hash file using Web Crypto API
export async function hashFile(
  file: File,
  algorithm: HashAlgorithm,
  onProgress?: (progress: number) => void
): Promise<string> {
  const chunkSize = 1024 * 1024; // 1MB chunks
  const chunks = Math.ceil(file.size / chunkSize);
  
  // For small files, hash directly
  if (file.size < chunkSize * 2) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    return arrayBufferToHex(hashBuffer);
  }
  
  // For large files, use chunked processing
  // Note: Web Crypto API doesn't support streaming, so we read the whole file
  // but report progress during reading
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        if (onProgress) onProgress(50); // Reading complete
        
        const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
        if (onProgress) onProgress(100); // Hashing complete
        
        resolve(arrayBufferToHex(hashBuffer));
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    
    reader.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = (e.loaded / e.total) * 50; // First 50% is reading
        onProgress(progress);
      }
    };
    
    reader.readAsArrayBuffer(file);
  });
}

// Hash multiple algorithms
export async function hashFileMultiple(
  file: File,
  algorithms: HashAlgorithm[],
  onProgress?: (algorithm: HashAlgorithm, progress: number) => void
): Promise<Record<HashAlgorithm, string>> {
  const results: Partial<Record<HashAlgorithm, string>> = {};
  
  for (const algorithm of algorithms) {
    const hash = await hashFile(
      file,
      algorithm,
      onProgress ? (progress) => onProgress(algorithm, progress) : undefined
    );
    results[algorithm] = hash;
  }
  
  return results as Record<HashAlgorithm, string>;
}

// Compare two hashes
export function compareHashes(hash1: string, hash2: string): boolean {
  // Normalize hashes (remove spaces, convert to lowercase)
  const normalized1 = hash1.replace(/\s/g, '').toLowerCase();
  const normalized2 = hash2.replace(/\s/g, '').toLowerCase();
  return normalized1 === normalized2;
}

// Extract file info
export function extractFileInfo(file: File): FileInfo {
  return {
    name: file.name,
    size: file.size,
    type: file.type || 'application/octet-stream',
    lastModified: file.lastModified
  };
}

// Generate JSON fingerprint
export function generateJSONFingerprint(result: HashResult): string {
  return JSON.stringify({
    file: result.file.name,
    size: formatFileSize(result.file.size),
    type: result.file.type,
    algorithm: result.algorithm,
    hash: result.hash,
    timestamp: new Date(result.timestamp).toISOString()
  }, null, 2);
}

// Generate CSV fingerprint
export function generateCSVFingerprint(results: HashResult[]): string {
  const headers = ['File', 'Size', 'Algorithm', 'Hash', 'Timestamp'];
  const rows = results.map(r => [
    r.file.name,
    formatFileSize(r.file.size),
    r.algorithm,
    r.hash,
    new Date(r.timestamp).toISOString()
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
}

// Generate TXT fingerprint
export function generateTXTFingerprint(result: HashResult): string {
  return `File: ${result.file.name}
Size: ${formatFileSize(result.file.size)}
Type: ${result.file.type}
Algorithm: ${result.algorithm}
Hash: ${result.hash}
Timestamp: ${new Date(result.timestamp).toISOString()}`;
}

// Download file
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Format hash for display (add spaces every 8 characters)
export function formatHashForDisplay(hash: string): string {
  return hash.match(/.{1,8}/g)?.join(' ') || hash;
}
