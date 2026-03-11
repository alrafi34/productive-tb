import { HashAlgorithm, HashOptions, HashResult, FileHashResult, BulkHashItem, VerificationResult } from './types';

// MD5 Implementation (lightweight, no external dependencies)
function md5(input: string): string {
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }

  function addUnsigned(x: number, y: number): number {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  function md5cycle(x: number[], k: number[]): void {
    let a = x[0], b = x[1], c = x[2], d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = addUnsigned(a, x[0]);
    x[1] = addUnsigned(b, x[1]);
    x[2] = addUnsigned(c, x[2]);
    x[3] = addUnsigned(d, x[3]);
  }

  function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    a = addUnsigned(addUnsigned(a, q), addUnsigned(x, t));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function md5blk(s: string): number[] {
    const md5blks: number[] = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  function rhex(n: number): string {
    let s = '';
    for (let j = 0; j < 4; j++) {
      s += ('0' + ((n >> (j * 8 + 4)) & 0x0F).toString(16)).slice(-1) + ('0' + ((n >> (j * 8)) & 0x0F).toString(16)).slice(-1);
    }
    return s;
  }

  function str2blks(str: string): number[] {
    const nblk = ((str.length + 8) >> 6) + 1;
    const blks: number[] = new Array(nblk * 16).fill(0);
    for (let i = 0; i < str.length; i++) {
      blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    }
    blks[str.length >> 2] |= 0x80 << ((str.length % 4) * 8);
    blks[nblk * 16 - 2] = str.length * 8;
    return blks;
  }

  const x = str2blks(input);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;

    md5cycle([a, b, c, d], x.slice(i, i + 16));

    a = addUnsigned(a, olda);
    b = addUnsigned(b, oldb);
    c = addUnsigned(c, oldc);
    d = addUnsigned(d, oldd);
  }

  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

// SHA-1 and SHA-256 using Web Crypto API
async function sha1(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Process input based on options
export function processInput(input: string, options: HashOptions): string {
  let processed = input;
  
  if (options.trimWhitespace) {
    processed = processed.trim();
  }
  
  if (options.normalizeCase === 'uppercase') {
    processed = processed.toUpperCase();
  } else if (options.normalizeCase === 'lowercase') {
    processed = processed.toLowerCase();
  }
  
  return processed;
}

// Generate hash
export async function generateHash(input: string, algorithm: HashAlgorithm): Promise<string> {
  if (algorithm === 'MD5') {
    return md5(input);
  } else if (algorithm === 'SHA-1') {
    return await sha1(input);
  } else {
    return await sha256(input);
  }
}

// Generate all hashes at once
export async function generateAllHashes(input: string): Promise<{ md5: string; sha1: string; sha256: string }> {
  const [md5Hash, sha1Hash, sha256Hash] = await Promise.all([
    Promise.resolve(md5(input)),
    sha1(input),
    sha256(input)
  ]);
  
  return {
    md5: md5Hash,
    sha1: sha1Hash,
    sha256: sha256Hash
  };
}

// Format hash output case
export function formatHashCase(hash: string, outputCase: 'lowercase' | 'uppercase'): string {
  return outputCase === 'uppercase' ? hash.toUpperCase() : hash.toLowerCase();
}

// Get hash length
export function getHashLength(algorithm: HashAlgorithm): number {
  switch (algorithm) {
    case 'MD5': return 32;
    case 'SHA-1': return 40;
    case 'SHA-256': return 64;
  }
}

// File hashing
export async function hashFile(file: File): Promise<FileHashResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const hashes = await generateAllHashes(content);
      
      resolve({
        fileName: file.name,
        fileSize: file.size,
        md5: hashes.md5,
        sha1: hashes.sha1,
        sha256: hashes.sha256,
        timestamp: Date.now()
      });
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Bulk hash generation
export async function generateBulkHashes(lines: string[], algorithm: HashAlgorithm): Promise<BulkHashItem[]> {
  const results: BulkHashItem[] = [];
  
  for (const line of lines) {
    if (line.trim()) {
      const hash = await generateHash(line, algorithm);
      results.push({
        input: line,
        hash,
        algorithm
      });
    }
  }
  
  return results;
}

// Hash verification
export async function verifyHash(input: string, expectedHash: string, algorithm: HashAlgorithm): Promise<VerificationResult> {
  const actualHash = await generateHash(input, algorithm);
  
  return {
    match: actualHash.toLowerCase() === expectedHash.toLowerCase(),
    expected: expectedHash.toLowerCase(),
    actual: actualHash.toLowerCase(),
    algorithm
  };
}

// Export functions
export function exportAsText(data: BulkHashItem[]): string {
  return data.map(item => `${item.input} -> ${item.hash}`).join('\n');
}

export function exportAsJSON(data: BulkHashItem[]): string {
  return JSON.stringify(data, null, 2);
}

export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// History management
const HISTORY_KEY = 'hash-generator-history';
const MAX_HISTORY = 20;

export function saveToHistory(result: HashResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  history.unshift(result);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HashResult[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(HISTORY_KEY);
}
