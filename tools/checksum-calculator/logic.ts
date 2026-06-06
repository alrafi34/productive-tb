// CRC32
const crcTable = (() => {
  const t: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(data: Uint8Array): string {
  let crc = 0 ^ -1;
  for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xff];
  return ((crc ^ -1) >>> 0).toString(16).padStart(8, "0").toUpperCase();
}

// Adler-32
function adler32(data: Uint8Array): string {
  const MOD_ADLER = 65521;
  let a = 1, b = 0;
  for (let i = 0; i < data.length; i++) {
    a = (a + data[i]) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }
  return ((b << 16) | a).toString(16).padStart(8, "0").toUpperCase();
}

// MD5 implementation
function md5(data: Uint8Array): string {
  const s = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
  const K: number[] = [];
  for (let i = 0; i < 64; i++) K[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;

  const msg = Array.from(data);
  const origLen = msg.length;
  msg.push(0x80);
  while (msg.length % 64 !== 56) msg.push(0);
  const bitLen = origLen * 8;
  for (let i = 0; i < 8; i++) msg.push((bitLen / Math.pow(2, i * 8)) & 0xff);

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

  for (let i = 0; i < msg.length; i += 64) {
    const M: number[] = [];
    for (let j = 0; j < 16; j++) M[j] = (msg[i + j * 4] | (msg[i + j * 4 + 1] << 8) | (msg[i + j * 4 + 2] << 16) | (msg[i + j * 4 + 3] << 24)) >>> 0;
    let A = a0, B = b0, C = c0, D = d0;
    for (let j = 0; j < 64; j++) {
      let F: number, g: number;
      if (j < 16) { F = (B & C) | (~B & D); g = j; }
      else if (j < 32) { F = (D & B) | (~D & C); g = (5 * j + 1) % 16; }
      else if (j < 48) { F = B ^ C ^ D; g = (3 * j + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * j) % 16; }
      F = (F + A + K[j] + M[g]) | 0;
      A = D; D = C; C = B;
      B = (B + ((F << s[j]) | (F >>> (32 - s[j])))) | 0;
    }
    a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
  }

  const toLE = (n: number) => {
    const b = [(n >>> 0) & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff];
    return b.map(x => x.toString(16).padStart(2, "0")).join("");
  };
  return toLE(a0) + toLE(b0) + toLE(c0) + toLE(d0);
}

export type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512" | "CRC32" | "Adler-32";

export const ALGORITHMS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512", "CRC32", "Adler-32"];

export const ALGO_INFO: Record<Algorithm, { bits: number; desc: string }> = {
  "MD5":     { bits: 128, desc: "Fast but insecure – use for non-security purposes only" },
  "SHA-1":   { bits: 160, desc: "Legacy – avoid for security-critical applications" },
  "SHA-256": { bits: 256, desc: "Recommended – widely used and cryptographically secure" },
  "SHA-384": { bits: 384, desc: "Stronger variant of SHA-2 – used in TLS certificates" },
  "SHA-512": { bits: 512, desc: "Maximum SHA-2 strength – ideal for high-security needs" },
  "CRC32":   { bits: 32,  desc: "Fast error detection – not for cryptographic use" },
  "Adler-32":{ bits: 32,  desc: "Faster than CRC32 – used in zlib/PNG compression" },
};

const WEB_CRYPTO_ALGOS: Partial<Record<Algorithm, string>> = {
  "SHA-1":   "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-384": "SHA-384",
  "SHA-512": "SHA-512",
};

export async function computeHash(data: Uint8Array, algo: Algorithm, encoding: "hex" | "base64" = "hex"): Promise<string> {
  let bytes: Uint8Array;

  if (algo === "CRC32") {
    bytes = data; // not used for bytes output
    const hex = crc32(data);
    if (encoding === "base64") return btoa(hex.match(/.{2}/g)!.map(h => String.fromCharCode(parseInt(h, 16))).join(""));
    return hex;
  }
  if (algo === "Adler-32") {
    const hex = adler32(data);
    if (encoding === "base64") return btoa(hex.match(/.{2}/g)!.map(h => String.fromCharCode(parseInt(h, 16))).join(""));
    return hex;
  }
  if (algo === "MD5") {
    const hex = md5(data);
    if (encoding === "base64") return btoa(hex.match(/.{2}/g)!.map(h => String.fromCharCode(parseInt(h, 16))).join(""));
    return hex;
  }

  const cryptoAlgo = WEB_CRYPTO_ALGOS[algo]!;
  // Copy into a guaranteed plain ArrayBuffer — crypto.subtle.digest rejects SharedArrayBuffer
  const plainBuffer: ArrayBuffer = data.buffer instanceof ArrayBuffer
    ? data.buffer
    : new Uint8Array(data).buffer as ArrayBuffer;
  const hashBuffer = await crypto.subtle.digest(cryptoAlgo, plainBuffer);
  bytes = new Uint8Array(hashBuffer);

  if (encoding === "base64") return btoa(String.fromCharCode(...bytes));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals < 0 ? 0 : decimals))} ${sizes[i]}`;
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type HistoryEntry = {
  id: string;
  inputType: "text" | "file";
  label: string;
  algorithm: Algorithm;
  encoding: "hex" | "base64";
  checksum: string;
  timestamp: number;
};

const HISTORY_KEY = "checksum_calc_history";

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">) {
  const history = getHistory();
  history.unshift({ ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
