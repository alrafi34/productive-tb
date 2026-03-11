import { UsernameOptions, Preset, GeneratedUsername } from "./types";

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '_-.';
const AMBIGUOUS = 'O0l1I';

// Word lists for memorable usernames
const ADJECTIVES = [
  'Blue', 'Red', 'Green', 'Dark', 'Light', 'Bright', 'Swift', 'Silent', 'Loud', 'Quick',
  'Slow', 'Fast', 'Cool', 'Hot', 'Cold', 'Warm', 'Happy', 'Sad', 'Lucky', 'Magic',
  'Mystic', 'Cosmic', 'Solar', 'Lunar', 'Star', 'Sky', 'Ocean', 'Fire', 'Ice', 'Storm',
  'Thunder', 'Lightning', 'Shadow', 'Ghost', 'Spirit', 'Wild', 'Tame', 'Brave', 'Bold', 'Shy',
  'Pixel', 'Digital', 'Cyber', 'Neon', 'Retro', 'Ultra', 'Mega', 'Super', 'Hyper', 'Epic'
];

const NOUNS = [
  'Tiger', 'Lion', 'Bear', 'Wolf', 'Fox', 'Eagle', 'Hawk', 'Falcon', 'Dragon', 'Phoenix',
  'Warrior', 'Knight', 'Wizard', 'Mage', 'Ninja', 'Samurai', 'Hunter', 'Ranger', 'Scout', 'Guard',
  'King', 'Queen', 'Prince', 'Princess', 'Lord', 'Lady', 'Master', 'Chief', 'Boss', 'Hero',
  'Star', 'Moon', 'Sun', 'Comet', 'Nova', 'Galaxy', 'Nebula', 'Cosmos', 'Void', 'Abyss',
  'Gamer', 'Player', 'Legend', 'Champion', 'Victor', 'Winner', 'Ace', 'Pro', 'Elite', 'Prime'
];

const FANTASY_WORDS = [
  'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Giant', 'Fairy', 'Sprite', 'Demon', 'Angel',
  'Sword', 'Shield', 'Axe', 'Bow', 'Staff', 'Wand', 'Blade', 'Hammer', 'Spear', 'Dagger',
  'Castle', 'Tower', 'Fortress', 'Keep', 'Citadel', 'Palace', 'Temple', 'Shrine', 'Altar', 'Throne',
  'Quest', 'Journey', 'Adventure', 'Voyage', 'Odyssey', 'Saga', 'Tale', 'Story', 'Legend', 'Myth'
];

// Presets
export const PRESETS: Record<string, Preset> = {
  gamer: {
    name: 'Gamer',
    description: 'Numbers and symbols for gaming',
    icon: '🎮',
    options: {
      length: 10,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeAmbiguous: true,
      memorable: false
    }
  },
  casual: {
    name: 'Casual',
    description: 'Simple and readable',
    icon: '😊',
    options: {
      length: 8,
      uppercase: false,
      lowercase: true,
      numbers: true,
      symbols: false,
      excludeAmbiguous: true,
      memorable: true,
      separator: 'none'
    }
  },
  cool: {
    name: 'Cool',
    description: 'Mix of letters and numbers',
    icon: '😎',
    options: {
      length: 12,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      excludeAmbiguous: true,
      memorable: true,
      separator: '_'
    }
  },
  fantasy: {
    name: 'Fantasy',
    description: 'Fantasy-themed usernames',
    icon: '🧙',
    options: {
      length: 14,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      excludeAmbiguous: true,
      memorable: true,
      separator: '-'
    }
  }
};

// Secure random number generator
function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Get character pool
function getCharacterPool(options: UsernameOptions): string {
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

// Generate memorable username
export function generateMemorableUsername(options: UsernameOptions, preset?: string): string {
  let username = '';
  
  // Choose word lists based on preset
  let adjList = ADJECTIVES;
  let nounList = NOUNS;
  
  if (preset === 'fantasy') {
    adjList = [...ADJECTIVES, ...FANTASY_WORDS.slice(0, 20)];
    nounList = [...NOUNS, ...FANTASY_WORDS.slice(20)];
  }
  
  // Pick random words
  const adj = adjList[getSecureRandomInt(adjList.length)];
  const noun = nounList[getSecureRandomInt(nounList.length)];
  
  // Apply separator
  switch (options.separator) {
    case '-':
      username = `${adj}-${noun}`;
      break;
    case '_':
      username = `${adj}_${noun}`;
      break;
    case 'camel':
      username = `${adj}${noun}`;
      break;
    case 'none':
      username = `${adj.toLowerCase()}${noun.toLowerCase()}`;
      break;
    default:
      username = `${adj}${noun}`;
  }
  
  // Add numbers if enabled
  if (options.numbers) {
    const numCount = Math.min(4, Math.floor(options.length * 0.2));
    let numbers = '';
    for (let i = 0; i < numCount; i++) {
      numbers += NUMBERS[getSecureRandomInt(NUMBERS.length)];
    }
    username += numbers;
  }
  
  // Adjust case based on options
  if (!options.uppercase && options.lowercase) {
    username = username.toLowerCase();
  } else if (options.uppercase && !options.lowercase) {
    username = username.toUpperCase();
  }
  
  // Trim to length
  return username.slice(0, options.length);
}

// Generate random username
export function generateRandomUsername(options: UsernameOptions): string {
  const pool = getCharacterPool(options);
  
  if (!pool) return '';
  
  let username = '';
  
  // Ensure at least one character from each selected type
  const requiredChars: string[] = [];
  
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
  
  // Fill remaining length
  const remainingLength = options.length - requiredChars.length;
  for (let i = 0; i < remainingLength; i++) {
    username += pool[getSecureRandomInt(pool.length)];
  }
  
  // Add required characters
  username += requiredChars.join('');
  
  // Shuffle
  return username.split('').sort(() => getSecureRandomInt(3) - 1).join('');
}

// Generate username from pattern
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

// Main generate function
export function generateUsername(options: UsernameOptions, preset?: string): string {
  if (options.memorable) {
    return generateMemorableUsername(options, preset);
  } else {
    return generateRandomUsername(options);
  }
}

// Check username availability (simulated probability)
export function checkAvailability(username: string): 'likely-available' | 'likely-taken' | 'unknown' {
  // Simulate availability based on username characteristics
  const length = username.length;
  const hasNumbers = /\d/.test(username);
  const hasSymbols = /[_\-.]/.test(username);
  const isCommonWord = ADJECTIVES.concat(NOUNS).some(word => 
    username.toLowerCase().includes(word.toLowerCase())
  );
  
  // Scoring system
  let score = 0;
  
  if (length >= 12) score += 3;
  else if (length >= 8) score += 2;
  else score += 1;
  
  if (hasNumbers) score += 2;
  if (hasSymbols) score += 1;
  if (!isCommonWord) score += 2;
  
  // Random factor
  score += getSecureRandomInt(3);
  
  if (score >= 7) return 'likely-available';
  if (score >= 4) return 'unknown';
  return 'likely-taken';
}

// Generate multiple usernames
export function generateMultipleUsernames(
  count: number,
  options: UsernameOptions,
  preset?: string
): GeneratedUsername[] {
  const usernames: GeneratedUsername[] = [];
  const seen = new Set<string>();
  
  let attempts = 0;
  const maxAttempts = count * 10;
  
  while (usernames.length < count && attempts < maxAttempts) {
    const username = generateUsername(options, preset);
    
    if (!seen.has(username)) {
      seen.add(username);
      usernames.push({
        id: crypto.randomUUID(),
        username,
        timestamp: Date.now(),
        favorite: false,
        availability: checkAvailability(username)
      });
    }
    
    attempts++;
  }
  
  return usernames;
}

// Local storage helpers
const FAVORITES_KEY = 'username-favorites';
const HISTORY_KEY = 'username-history';
const MAX_HISTORY = 20;

export function toggleFavorite(id: string, usernames: GeneratedUsername[]): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const username = usernames.find(u => u.id === id);
  
  if (!username) return;
  
  const index = favorites.findIndex(f => f.id === id);
  
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push({ ...username, favorite: true });
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getFavorites(): GeneratedUsername[] {
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
  return getFavorites().some(f => f.id === id);
}

export function saveToHistory(username: GeneratedUsername): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  history.unshift(username);
  
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): GeneratedUsername[] {
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

// Export functions
export function exportAsText(usernames: string[]): void {
  const content = usernames.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `usernames-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsJSON(usernames: GeneratedUsername[]): void {
  const content = JSON.stringify(usernames, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `usernames-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Get availability color
export function getAvailabilityColor(availability?: string): string {
  switch (availability) {
    case 'likely-available':
      return '#22c55e'; // green
    case 'likely-taken':
      return '#ef4444'; // red
    default:
      return '#eab308'; // yellow
  }
}

// Get availability label
export function getAvailabilityLabel(availability?: string): string {
  switch (availability) {
    case 'likely-available':
      return 'Likely Available';
    case 'likely-taken':
      return 'Likely Taken';
    default:
      return 'Unknown';
  }
}
