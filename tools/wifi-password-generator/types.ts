export interface WiFiPasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  memorable: boolean;
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
  favorite: boolean;
}

export interface RouterCompatibility {
  compatible: boolean;
  warnings: string[];
  maxLength: number;
}

export type PresetType = 'home' | 'guest' | 'advanced';

export interface Preset {
  name: string;
  description: string;
  icon: string;
  options: Partial<WiFiPasswordOptions>;
}
