// AES-GCM Encryption Logic using Web Crypto API

const ITERATIONS = 100000;
const KEY_LENGTH = 256;

export interface EncryptionResult {
  algorithm: string;
  salt: string;
  iv: string;
  ciphertext: string;
  iterations: number;
}

// Generate random bytes
function getRandomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
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

// Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Convert ArrayBuffer to Hex
function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Convert Hex to ArrayBuffer
function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes.buffer;
}

// Derive key from password using PBKDF2
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt text
export async function encryptText(text: string, password: string): Promise<EncryptionResult> {
  const encoder = new TextEncoder();
  const salt = getRandomBytes(16);
  const iv = getRandomBytes(12);
  
  const key = await deriveKey(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    encoder.encode(text)
  );

  return {
    algorithm: 'AES-GCM',
    salt: arrayBufferToBase64(salt.buffer as ArrayBuffer),
    iv: arrayBufferToBase64(iv.buffer as ArrayBuffer),
    ciphertext: arrayBufferToBase64(encrypted),
    iterations: ITERATIONS
  };
}

// Decrypt text
export async function decryptText(encryptionData: EncryptionResult, password: string): Promise<string> {
  const salt = new Uint8Array(base64ToArrayBuffer(encryptionData.salt));
  const iv = new Uint8Array(base64ToArrayBuffer(encryptionData.iv));
  const ciphertext = base64ToArrayBuffer(encryptionData.ciphertext);

  const key = await deriveKey(password, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Format as Base64 string
export function formatAsBase64(data: EncryptionResult): string {
  return `${data.salt}:${data.iv}:${data.ciphertext}`;
}

// Format as Hex string
export function formatAsHex(data: EncryptionResult): string {
  const salt = arrayBufferToHex(base64ToArrayBuffer(data.salt));
  const iv = arrayBufferToHex(base64ToArrayBuffer(data.iv));
  const ciphertext = arrayBufferToHex(base64ToArrayBuffer(data.ciphertext));
  return `${salt}:${iv}:${ciphertext}`;
}

// Parse Base64 format
export function parseBase64Format(formatted: string): EncryptionResult {
  const [salt, iv, ciphertext] = formatted.split(':');
  return {
    algorithm: 'AES-GCM',
    salt,
    iv,
    ciphertext,
    iterations: ITERATIONS
  };
}

// Parse Hex format
export function parseHexFormat(formatted: string): EncryptionResult {
  const [saltHex, ivHex, ciphertextHex] = formatted.split(':');
  return {
    algorithm: 'AES-GCM',
    salt: arrayBufferToBase64(hexToArrayBuffer(saltHex)),
    iv: arrayBufferToBase64(hexToArrayBuffer(ivHex)),
    ciphertext: arrayBufferToBase64(hexToArrayBuffer(ciphertextHex)),
    iterations: ITERATIONS
  };
}

// Calculate password strength
export function calculatePasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
}
