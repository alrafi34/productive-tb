import { PasswordAnalysis, CharacterSet, SavedAnalysis } from './types';

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`"\'\\';

// Detect character sets used
export function detectCharacterSets(password: string): CharacterSet {
  return {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`"'\\]/.test(password)
  };
}

// Calculate character pool size
export function calculatePoolSize(charSet: CharacterSet): number {
  let poolSize = 0;
  
  if (charSet.uppercase) poolSize += UPPERCASE.length;
  if (charSet.lowercase) poolSize += LOWERCASE.length;
  if (charSet.numbers) poolSize += NUMBERS.length;
  if (charSet.symbols) poolSize += SYMBOLS.length;
  
  return poolSize;
}

// Calculate entropy
export function calculateEntropy(password: string): number {
  if (!password) return 0;
  
  const charSet = detectCharacterSets(password);
  const poolSize = calculatePoolSize(charSet);
  
  if (poolSize === 0) return 0;
  
  // Entropy = log2(poolSize^length)
  const entropy = password.length * Math.log2(poolSize);
  
  return Math.round(entropy * 10) / 10;
}

// Calculate crack time
export function calculateCrackTime(entropy: number): { seconds: number; readable: string } {
  // Assume 10 billion guesses per second (modern GPU)
  const guessesPerSecond = 10_000_000_000;
  const possibleCombinations = Math.pow(2, entropy);
  const seconds = possibleCombinations / (2 * guessesPerSecond); // Average case
  
  return {
    seconds,
    readable: formatCrackTime(seconds)
  };
}

// Format crack time to human-readable
export function formatCrackTime(seconds: number): string {
  if (seconds < 1) return 'Instant';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
  
  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1000000) return `${Math.round(years / 1000)} thousand years`;
  if (years < 1000000000) return `${Math.round(years / 1000000)} million years`;
  
  return 'Centuries+';
}

// Calculate strength score (0-4)
export function calculateScore(entropy: number, length: number): number {
  // Score based on entropy and length
  if (entropy < 28 || length < 6) return 0; // Very Weak
  if (entropy < 36 || length < 8) return 1; // Weak
  if (entropy < 60 || length < 10) return 2; // Medium
  if (entropy < 80 || length < 12) return 3; // Strong
  return 4; // Very Strong
}

// Get strength label and color
export function getStrengthInfo(score: number): { strength: string; color: string } {
  const strengthMap = [
    { strength: 'Very Weak', color: '#EF4444' },
    { strength: 'Weak', color: '#F97316' },
    { strength: 'Medium', color: '#EAB308' },
    { strength: 'Strong', color: '#84CC16' },
    { strength: 'Very Strong', color: '#22C55E' }
  ];
  
  return strengthMap[score] as any;
}

// Generate suggestions
export function generateSuggestions(password: string, charSet: CharacterSet, length: number): string[] {
  const suggestions: string[] = [];
  
  if (length < 8) {
    suggestions.push('Use at least 8 characters (12+ recommended)');
  } else if (length < 12) {
    suggestions.push('Consider using 12 or more characters for better security');
  }
  
  if (!charSet.uppercase) {
    suggestions.push('Add uppercase letters (A-Z)');
  }
  
  if (!charSet.lowercase) {
    suggestions.push('Add lowercase letters (a-z)');
  }
  
  if (!charSet.numbers) {
    suggestions.push('Add numbers (0-9)');
  }
  
  if (!charSet.symbols) {
    suggestions.push('Add symbols (!@#$%^&*)');
  }
  
  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    suggestions.push('Avoid repeated characters (e.g., "aaa", "111")');
  }
  
  // Check for sequential characters
  if (/abc|bcd|cde|def|123|234|345|456|567|678|789/.test(password.toLowerCase())) {
    suggestions.push('Avoid sequential patterns (e.g., "abc", "123")');
  }
  
  // Check for common patterns
  if (/password|qwerty|admin|letmein|welcome|monkey|dragon/i.test(password)) {
    suggestions.push('Avoid common words and patterns');
  }
  
  // Check for keyboard patterns
  if (/qwerty|asdfgh|zxcvbn|qazwsx/i.test(password)) {
    suggestions.push('Avoid keyboard patterns (e.g., "qwerty")');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('Excellent! Your password is strong.');
  }
  
  return suggestions;
}

// Analyze password
export function analyzePassword(password: string): PasswordAnalysis {
  const charSet = detectCharacterSets(password);
  const entropy = calculateEntropy(password);
  const score = calculateScore(entropy, password.length);
  const { strength, color } = getStrengthInfo(score);
  const { seconds, readable } = calculateCrackTime(entropy);
  const suggestions = generateSuggestions(password, charSet, password.length);
  
  return {
    password,
    length: password.length,
    entropy,
    score,
    strength: strength as any,
    color,
    crackTime: readable,
    crackTimeSeconds: seconds,
    hasUppercase: charSet.uppercase,
    hasLowercase: charSet.lowercase,
    hasNumbers: charSet.numbers,
    hasSymbols: charSet.symbols,
    suggestions,
    timestamp: Date.now()
  };
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// History management
const HISTORY_KEY = 'password-strength-history';
const MAX_HISTORY = 20;

export function saveToHistory(analysis: PasswordAnalysis): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  
  const saved: SavedAnalysis = {
    id: crypto.randomUUID(),
    password: analysis.password,
    strength: analysis.strength,
    entropy: analysis.entropy,
    crackTime: analysis.crackTime,
    timestamp: analysis.timestamp
  };
  
  history.unshift(saved);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): SavedAnalysis[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(HISTORY_KEY);
}

export function deleteFromHistory(id: string): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
}

// Export functions
export function exportAsText(analyses: PasswordAnalysis[]): void {
  const content = analyses.map(a => 
    `Password: ${a.password}\nStrength: ${a.strength}\nEntropy: ${a.entropy} bits\nCrack Time: ${a.crackTime}\n---`
  ).join('\n\n');
  
  downloadFile(content, `password-analysis-${Date.now()}.txt`, 'text/plain');
}

export function exportAsJSON(analyses: PasswordAnalysis[]): void {
  const content = JSON.stringify(analyses, null, 2);
  downloadFile(content, `password-analysis-${Date.now()}.json`, 'application/json');
}

function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Compare passwords
export function comparePasswords(passwords: string[]): PasswordAnalysis[] {
  return passwords.map(pwd => analyzePassword(pwd));
}
