export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256';

export interface HashOptions {
  algorithm: HashAlgorithm;
  trimWhitespace: boolean;
  normalizeCase: 'none' | 'uppercase' | 'lowercase';
  outputCase: 'lowercase' | 'uppercase';
}

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  length: number;
  timestamp: number;
}

export interface FileHashResult {
  fileName: string;
  fileSize: number;
  md5: string;
  sha1: string;
  sha256: string;
  timestamp: number;
}

export interface BulkHashItem {
  input: string;
  hash: string;
  algorithm: HashAlgorithm;
}

export interface VerificationResult {
  match: boolean;
  expected: string;
  actual: string;
  algorithm: HashAlgorithm;
}
