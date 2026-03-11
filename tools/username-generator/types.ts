export interface UsernameOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  memorable: boolean;
  separator: '-' | '_' | 'camel' | 'none';
}

export type PresetType = 'gamer' | 'casual' | 'cool' | 'fantasy';

export interface Preset {
  name: string;
  description: string;
  icon: string;
  options: Partial<UsernameOptions>;
}

export interface GeneratedUsername {
  id: string;
  username: string;
  timestamp: number;
  favorite: boolean;
  availability?: 'likely-available' | 'likely-taken' | 'unknown';
}
