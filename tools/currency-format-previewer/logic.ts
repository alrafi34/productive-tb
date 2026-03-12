export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
}

export const MAJOR_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'DH' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
];

export const MAJOR_LOCALES = [
  { code: 'en-US', name: 'United States' },
  { code: 'en-GB', name: 'United Kingdom' },
  { code: 'de-DE', name: 'Germany' },
  { code: 'fr-FR', name: 'France' },
  { code: 'ja-JP', name: 'Japan' },
  { code: 'hi-IN', name: 'India (Hindi)' },
  { code: 'bn-BD', name: 'Bangladesh' },
  { code: 'ar-SA', name: 'Saudi Arabia' },
  { code: 'zh-CN', name: 'China' },
  { code: 'pt-BR', name: 'Brazil' },
];

export interface FormatOptions {
  style: 'currency' | 'decimal';
  currency?: string;
  currencyDisplay: 'symbol' | 'code' | 'name' | 'narrowSymbol';
  useGrouping: boolean;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
  currencySign: 'standard' | 'accounting';
}

export function formatValue(value: number, locale: string, options: FormatOptions): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch (e) {
    return 'Invalid Format';
  }
}

export function generateCodeSnippet(locale: string, options: Partial<FormatOptions>): string {
  const optsStr = JSON.stringify(options, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .replace(/"/g, "'"); // Use single quotes
    
  return `new Intl.NumberFormat('${locale}', ${optsStr}).format(val);`;
}
