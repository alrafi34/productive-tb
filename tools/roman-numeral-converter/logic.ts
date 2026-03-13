const romanMap = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
];

export function numberToRoman(num: number): string {
  if (num <= 0 || num >= 4000 || !Number.isInteger(num)) return '';
  
  let result = '';
  let remaining = num;
  
  for (const { value, numeral } of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  
  return result;
}

export function romanToNumber(roman: string): number {
  const cleaned = roman.toUpperCase().trim();
  if (!cleaned) return 0;
  
  const romanValues: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  
  let result = 0;
  for (let i = 0; i < cleaned.length; i++) {
    const current = romanValues[cleaned[i]];
    const next = romanValues[cleaned[i + 1]];
    
    if (!current) return -1;
    
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  
  return result;
}

export function isValidRoman(roman: string): boolean {
  const cleaned = roman.toUpperCase().trim();
  if (!cleaned) return false;
  
  const validPattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return validPattern.test(cleaned);
}

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 3999) + 1;
}

export interface ConversionHistory {
  id: string;
  input: string;
  output: string;
  type: 'number' | 'roman';
  timestamp: number;
}

export function loadHistory(): ConversionHistory[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('romanConverterHistory');
  return stored ? JSON.parse(stored) : [];
}

export function saveHistory(item: ConversionHistory): void {
  if (typeof window === 'undefined') return;
  const history = loadHistory();
  history.unshift(item);
  if (history.length > 20) history.pop();
  localStorage.setItem('romanConverterHistory', JSON.stringify(history));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('romanConverterHistory');
}
