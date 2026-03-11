export type EncryptionMode = 'rot13' | 'base64-encode' | 'base64-decode' | 'base64-url' | 'base32' | 'binary';

export interface TransformationHistory {
  id: string;
  mode: EncryptionMode;
  input: string;
  output: string;
  timestamp: number;
}

export interface TransformOptions {
  mode: EncryptionMode;
  urlSafe?: boolean;
}
