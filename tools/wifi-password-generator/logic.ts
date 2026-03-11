import { WiFiPasswordOptions, PasswordStrength, GeneratedPassword, RouterCompatibility, Preset } from "./types";

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*';
const AMBIGUOUS = 'O0l1I';

// Consonants and vowels for memorable passwords
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
const VOWELS = 'aeiou';

// Presets
export const PRESETS: Record<string, Preset> = {
  home: {
    name: 'Home WiFi',
    description: '12 characters, letters + numbers',
    icon: '🏠',
    options: {
      length: 12,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      excludeAmbiguous: true,
      memorable: false
    }
  },
  guest: {
    name: 'Guest WiFi',
    description: '8-10 characters, easy to type',
    icon: '👥',
    options: {
      length: 10,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      excludeAmbiguous: true,
      memorable: true
    }
  },
  advanced: {
    name: 'Advanced',
    description: '16-24 characters, maximum security',
    icon: '🔐',
    options: {
      length: 20,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeAmbiguous: false,
      memorable: false
    }
  }
};

// Secure random number generator
function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Get character pool based on options
function getCharacterPool(options: WiFiPasswordOptions): string {
  let pool = '';
  
  if (options.uppercase) pool += UPPERCASE;
  if (options.lowercase) pool += LOWERCASE;
  if (options.numbers) pool += NUMBERS;
  if (options.symbols) pool += SYMBOLS;
  
  if (options.excludeAmbiguous && pool) {
    pool = pool.split('').filter(char => !AMBIGUOUS.includes(char)).join('');
  }
  
  return pool;
}

// Generate memorable WiFi password
export function generateMemorablePassword(options: WiFiPasswordOptions): string {
  const length = options.length;
  let password = '';
  
  // Generate pronounceable segments
  const segmentLength = Math.floor(length / 2);
  
  for (let i = 0; i < segmentLength; i++) {
    // Alternate consonant-vowel pattern
    if (i % 2 === 0) {
      password += CONSONANTS[getSecureRandomInt(CONSONANTS.length)];
    } else {
      password += VOWELS[getSecureRandomInt(VOWELS.length)];
    }
  }
  
  // Capitalize first letter if uppercase is enabled
  if (options.uppercase && password.length > 0) {
    password = password.charAt(0).toUpperCase() + password.slice(1);
  }
  
  // Add numbers if enabled
  if (options.numbers) {
    const numCount = Math.max(2, Math.floor(length * 0.2));
    for (let i = 0; i < numCount; i++) {
      password += NUMBERS[getSecureRandomInt(NUMBERS.length)];
    }
  }
  
  // Add separator and second segment if length allows
  if (length > 8) {
    password += '-';
    const secondSegmentLength = Math.floor((length - password.length) / 2);
    
    for (let i = 0; i < secondSegmentLength; i++) {
      if (i % 2 === 0) {
        password += CONSONANTS[getSecureRandomInt(CONSONANTS.length)];
      } else {
        password += VOWELS[getSecureRandomInt(VOWELS.length)];
      }
    }
    
    // Capitalize second segment if uppercase is enabled
    if (options.uppercase) {
      const parts = password.split('-');
      if (parts[1]) {
        parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
        password = parts.join('-');
      }
    }
    
    // Add more numbers to reach desired length
    while (password.length < length && options.numbers) {
      password += NUMBERS[getSecureRandomInt(NUMBERS.length)];
    }
  }
  
  // Trim to exact length
  return password.slice(0, length);
}

// Generate random WiFi password
export function generateWiFiPassword(options: WiFiPasswordOptions): string {
  if (options.memorable) {
    return generateMemorablePassword(options);
  }
  
  const pool = getCharacterPool(options);
  
  if (!pool) return '';
  
  let password = '';
  const requiredChars: string[] = [];
  
  // Ensure at least one character from each selected type
  if (options.uppercase) {
    const chars = options.excludeAmbiguous 
      ? UPPERCASE.split('').filter(c => !AMBIGUOUS.includes(c))
      : UPPERCASE.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
  }
  if (options.lowercase) {
    const chars = options.excludeAmbiguous 
      ? LOWERCASE.split('').filter(c => !AMBIGUOUS.includes(c))
      : LOWERCASE.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
  }
  if (options.numbers) {
    const chars = options.excludeAmbiguous 
      ? NUMBERS.split('').filter(c => !AMBIGUOUS.includes(c))
      : NUMBERS.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
  }
  if (options.symbols) {
    requiredChars.push(SYMBOLS[getSecureRandomInt(SYMBOLS.length)]);
  }
  
  // Fill remaining length with random characters
  const remainingLength = options.length - requiredChars.length;
  for (let i = 0; i < remainingLength; i++) {
    password += pool[getSecureRandomInt(pool.length)];
  }
  
  // Add required characters
  password += requiredChars.join('');
  
  // Shuffle the password
  return password.split('').sort(() => getSecureRandomInt(3) - 1).join('');
}

// Generate password from pattern
export function generateFromPattern(pattern: string): string {
  let result = '';
  
  for (const char of pattern) {
    switch (char.toUpperCase()) {
      case 'L': // Letter (any case)
        const letters = UPPERCASE + LOWERCASE;
        result += letters[getSecureRandomInt(letters.length)];
        break;
      case 'U': // Uppercase letter
        result += UPPERCASE[getSecureRandomInt(UPPERCASE.length)];
        break;
      case 'N': // Number
        result += NUMBERS[getSecureRandomInt(NUMBERS.length)];
        break;
      case 'S': // Symbol
        result += SYMBOLS[getSecureRandomInt(SYMBOLS.length)];
        break;
      default:
        result += char; // Keep other characters as-is
    }
  }
  
  return result;
}

// Calculate password entropy
export function calculateEntropy(password: string): number {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);
  
  let poolSize = 0;
  if (hasUppercase) poolSize += 26;
  if (hasLowercase) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 8; // WiFi-friendly symbols
  
  if (poolSize === 0) return 0;
  
  return Math.log2(Math.pow(poolSize, password.length));
}

// Estimate crack time
export function estimateCrackTime(entropy: number): string {
  // Assuming 1 billion guesses per second (modern GPU)
  const guessesPerSecond = 1e9;
  const possibleCombinations = Math.pow(2, entropy);
  const seconds = possibleCombinations / (2 * guessesPerSecond);
  
  if (seconds < 1) return 'Instant';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  
  return 'Millions of years';
}

// Calculate password strength
export function calculateStrength(password: string): PasswordStrength {
  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);
  
  let score = 0;
  let label = 'Very Weak';
  let color = '#ef4444'; // red
  
  if (entropy < 28) {
    score = 0;
    label = 'Very Weak';
    color = '#ef4444';
  } else if (entropy < 36) {
    score = 1;
    label = 'Weak';
    color = '#f97316';
  } else if (entropy < 50) {
    score = 2;
    label = 'Medium';
    color = '#eab308';
  } else if (entropy < 70) {
    score = 3;
    label = 'Strong';
    color = '#22c55e';
  } else {
    score = 4;
    label = 'Very Strong';
    color = '#10b981';
  }
  
  return { score, label, color, entropy: Math.round(entropy), crackTime };
}

// Validate router compatibility
export function validateRouterCompatibility(password: string): RouterCompatibility {
  const warnings: string[] = [];
  const maxLength = 63; // WPA2 standard
  
  // Check length
  if (password.length > maxLength) {
    warnings.push(`Password exceeds maximum length of ${maxLength} characters`);
  }
  
  if (password.length < 8) {
    warnings.push('Password should be at least 8 characters for WPA2');
  }
  
  // Check for problematic characters
  const problematicChars = /[<>'"\\]/;
  if (problematicChars.test(password)) {
    warnings.push('Contains characters that may cause issues with some routers');
  }
  
  // Check for spaces
  if (password.includes(' ')) {
    warnings.push('Spaces may cause issues with some routers');
  }
  
  // Check for non-ASCII characters
  if (!/^[\x00-\x7F]*$/.test(password)) {
    warnings.push('Contains non-ASCII characters that may not be supported');
  }
  
  const compatible = warnings.length === 0;
  
  return { compatible, warnings, maxLength };
}

// Generate multiple passwords
export function generateMultiplePasswords(
  count: number,
  options: WiFiPasswordOptions
): GeneratedPassword[] {
  const passwords: GeneratedPassword[] = [];
  
  for (let i = 0; i < count; i++) {
    const password = generateWiFiPassword(options);
    const strength = calculateStrength(password);
    
    passwords.push({
      id: crypto.randomUUID(),
      password,
      timestamp: Date.now(),
      strength,
      favorite: false
    });
  }
  
  return passwords;
}

// Local storage helpers
const HISTORY_KEY = 'wifi-password-history';
const FAVORITES_KEY = 'wifi-password-favorites';
const MAX_HISTORY = 10;

export function saveToHistory(password: GeneratedPassword): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  history.unshift(password);
  
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): GeneratedPassword[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function toggleFavorite(id: string): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const index = favorites.findIndex(p => p.id === id);
  
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    const history = getHistory();
    const password = history.find(p => p.id === id);
    if (password) {
      favorites.push({ ...password, favorite: true });
    }
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getFavorites(): GeneratedPassword[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().some(p => p.id === id);
}

// Export passwords
export function exportAsText(passwords: string[]): void {
  const content = passwords.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wifi-passwords-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsJSON(passwords: GeneratedPassword[]): void {
  const content = JSON.stringify(passwords, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wifi-passwords-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
