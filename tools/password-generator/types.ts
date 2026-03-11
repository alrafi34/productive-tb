export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PassphraseOptions {
  wordCount: number;
  separator: '-' | '_' | ' ';
  capitalize: boolean;
  includeNumber: boolean;
}

export interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
  entropy: number;
  crackTime: string;
}

export interface GeneratedPassword {
  id: string;
  password: string;
  timestamp: number;
  strength: PasswordStrength;
}

export type GeneratorMode = 'random' | 'passphrase' | 'pattern';
