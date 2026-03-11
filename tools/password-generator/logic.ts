import { PasswordOptions, PassphraseOptions, PasswordStrength, GeneratedPassword } from "./types";

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = 'O0l1I';

// Word list for passphrases (common words)
const WORD_LIST = [
  'apple', 'banana', 'cherry', 'dragon', 'eagle', 'forest', 'galaxy', 'harbor',
  'island', 'jungle', 'knight', 'laser', 'mountain', 'nebula', 'ocean', 'planet',
  'quantum', 'river', 'sunset', 'tiger', 'universe', 'valley', 'wizard', 'xenon',
  'yellow', 'zebra', 'anchor', 'bridge', 'castle', 'diamond', 'engine', 'falcon',
  'garden', 'hammer', 'iceberg', 'jasper', 'kitten', 'lemon', 'marble', 'ninja',
  'orange', 'penguin', 'quartz', 'rocket', 'silver', 'thunder', 'unicorn', 'violet',
  'window', 'xylophone', 'yogurt', 'zephyr', 'arctic', 'bronze', 'crystal', 'desert',
  'emerald', 'flame', 'glacier', 'horizon', 'iris', 'jade', 'karma', 'lotus',
  'meteor', 'nectar', 'oasis', 'phoenix', 'quasar', 'ruby', 'sapphire', 'topaz',
  'umbra', 'vortex', 'willow', 'xenith', 'yarrow', 'zenith', 'aurora', 'breeze',
  'canyon', 'delta', 'echo', 'fjord', 'grove', 'haven', 'inlet', 'jewel',
  'kelp', 'lagoon', 'mesa', 'nova', 'orbit', 'prism', 'quest', 'reef',
  'storm', 'tundra', 'utopia', 'vista', 'wave', 'xerox', 'yonder', 'zone'
];

// Secure random number generator
function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Get character pool based on options
function getCharacterPool(options: PasswordOptions): string {
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

// Generate random password
export function generatePassword(options: PasswordOptions): string {
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

// Generate passphrase
export function generatePassphrase(options: PassphraseOptions): string {
  const words: string[] = [];
  
  for (let i = 0; i < options.wordCount; i++) {
    let word = WORD_LIST[getSecureRandomInt(WORD_LIST.length)];
    
    if (options.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    words.push(word);
  }
  
  let passphrase = words.join(options.separator);
  
  if (options.includeNumber) {
    passphrase += options.separator + getSecureRandomInt(9999).toString().padStart(4, '0');
  }
  
  return passphrase;
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
      case 'l': // Lowercase letter
        result += LOWERCASE[getSecureRandomInt(LOWERCASE.length)];
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
  if (hasSymbols) poolSize += 32;
  
  if (poolSize === 0) return 0;
  
  return Math.log2(Math.pow(poolSize, password.length));
}

// Estimate crack time
export function estimateCrackTime(entropy: number): string {
  // Assuming 1 billion guesses per second (modern GPU)
  const guessesPerSecond = 1e9;
  const possibleCombinations = Math.pow(2, entropy);
  const seconds = possibleCombinations / (2 * guessesPerSecond); // Divide by 2 for average
  
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
  } else if (entropy < 60) {
    score = 2;
    label = 'Medium';
    color = '#eab308';
  } else if (entropy < 128) {
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

// Generate multiple passwords
export function generateMultiplePasswords(
  count: number,
  options: PasswordOptions
): GeneratedPassword[] {
  const passwords: GeneratedPassword[] = [];
  
  for (let i = 0; i < count; i++) {
    const password = generatePassword(options);
    const strength = calculateStrength(password);
    
    passwords.push({
      id: crypto.randomUUID(),
      password,
      timestamp: Date.now(),
      strength
    });
  }
  
  return passwords;
}

// Local storage helpers
const HISTORY_KEY = 'password-generator-history';
const MAX_HISTORY = 10;

export function saveToHistory(password: GeneratedPassword): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  history.unshift(password);
  
  // Keep only last MAX_HISTORY items
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

// Export passwords
export function exportAsText(passwords: string[]): void {
  const content = passwords.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `passwords-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsJSON(passwords: GeneratedPassword[]): void {
  const content = JSON.stringify(passwords, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `passwords-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
