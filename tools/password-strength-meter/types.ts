export interface PasswordAnalysis {
  password: string;
  length: number;
  entropy: number;
  score: number; // 0-4
  strength: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
  crackTime: string;
  crackTimeSeconds: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  suggestions: string[];
  timestamp: number;
}

export interface CharacterSet {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export interface ComparisonPassword {
  id: string;
  label: string;
  analysis: PasswordAnalysis;
}

export interface SavedAnalysis {
  id: string;
  password: string;
  strength: string;
  entropy: number;
  crackTime: string;
  timestamp: number;
}
