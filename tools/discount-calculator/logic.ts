export interface DiscountStep {
  id: string;
  type: 'percent' | 'fixed';
  value: number;
}

export interface CalculationResult {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  savingsPercentage: number;
  taxAmount: number;
  calculationSteps: string[];
}

export function calculateDiscount(
  originalPrice: number,
  discounts: DiscountStep[],
  taxPercent: number,
  currency: CurrencyCode = 'USD'
): CalculationResult {
  const money = (amount: number) => formatCurrency(amount, currency);
  let currentPrice = originalPrice;
  let totalDiscount = 0;
  const steps: string[] = [`Original Price: ${money(originalPrice)}`];

  for (let i = 0; i < discounts.length; i++) {
    const discount = discounts[i];
    if (discount.value <= 0) continue;
    
    let stepDiscount = 0;
    if (discount.type === 'percent') {
      stepDiscount = currentPrice * (discount.value / 100);
      const afterStep = currentPrice - stepDiscount;
      steps.push(`Discount ${i+1} (${discount.value}%): -${money(stepDiscount)} -> ${money(afterStep)}`);
    } else {
      stepDiscount = Math.min(discount.value, currentPrice);
      const afterStep = currentPrice - stepDiscount;
      steps.push(`Discount ${i+1} (${money(discount.value)} off): -${money(stepDiscount)} -> ${money(afterStep)}`);
    }
    
    currentPrice -= stepDiscount;
    totalDiscount += stepDiscount;
  }

  let taxAmount = 0;
  if (taxPercent > 0) {
    taxAmount = currentPrice * (taxPercent / 100);
    steps.push(`Tax (${taxPercent}%): +${money(taxAmount)} -> ${money(currentPrice + taxAmount)}`);
    currentPrice += taxAmount;
  }

  const finalPrice = currentPrice;
  const savingsPercentage = originalPrice > 0 ? (totalDiscount / originalPrice) * 100 : 0;

  return {
    originalPrice,
    finalPrice,
    discountAmount: totalDiscount,
    savingsPercentage,
    taxAmount,
    calculationSteps: steps
  };
}

export function calculateOriginalPrice(salePrice: number, discountPercent: number): number {
  if (discountPercent >= 100) return 0;
  if (discountPercent <= 0) return salePrice;
  return salePrice / (1 - (discountPercent / 100));
}

export type CurrencyCode =
  | 'USD' | 'EUR' | 'GBP' | 'BDT' | 'INR' | 'PKR' | 'AED' | 'SAR' | 'CAD' | 'AUD' | 'NONE';

export const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: 'USD', label: 'USD – US Dollar ($)' },
  { code: 'EUR', label: 'EUR – Euro (€)' },
  { code: 'GBP', label: 'GBP – British Pound (£)' },
  { code: 'BDT', label: 'BDT – Bangladeshi Taka (৳)' },
  { code: 'INR', label: 'INR – Indian Rupee (₹)' },
  { code: 'PKR', label: 'PKR – Pakistani Rupee (Rs)' },
  { code: 'AED', label: 'AED – UAE Dirham' },
  { code: 'SAR', label: 'SAR – Saudi Riyal' },
  { code: 'CAD', label: 'CAD – Canadian Dollar' },
  { code: 'AUD', label: 'AUD – Australian Dollar' },
  { code: 'NONE', label: 'No currency symbol' },
];

const formatters = new Map<CurrencyCode, Intl.NumberFormat>();

function formatterFor(currency: CurrencyCode): Intl.NumberFormat {
  let formatter = formatters.get(currency);
  if (!formatter) {
    formatter = currency === 'NONE'
      ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          // "৳" rather than "BDT"; CA$ and A$ keep their prefix so they differ from $
          currencyDisplay: currency === 'CAD' || currency === 'AUD' ? 'symbol' : 'narrowSymbol',
        });
    formatters.set(currency, formatter);
  }
  return formatter;
}

export function formatCurrency(amount: number, currency: CurrencyCode = 'USD'): string {
  return formatterFor(currency).format(amount);
}

/* The symbol shown inside the price field ("$", "৳", "Rs", or "" for none). */
export function currencySymbol(currency: CurrencyCode): string {
  if (currency === 'NONE') return '';
  const part = formatterFor(currency).formatToParts(0).find(p => p.type === 'currency');
  return part ? part.value : currency;
}

const CURRENCY_BY_TIMEZONE: Record<string, CurrencyCode> = {
  'Asia/Dhaka': 'BDT',
  'Asia/Kolkata': 'INR',
  'Asia/Calcutta': 'INR',
  'Asia/Karachi': 'PKR',
  'Asia/Dubai': 'AED',
  'Asia/Riyadh': 'SAR',
  'Europe/London': 'GBP',
};

const CURRENCY_BY_REGION: Record<string, CurrencyCode> = {
  BD: 'BDT', IN: 'INR', PK: 'PKR', AE: 'AED', SA: 'SAR', GB: 'GBP', CA: 'CAD', AU: 'AUD',
  DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR',
  PT: 'EUR', FI: 'EUR', GR: 'EUR',
};

/* A best guess at the visitor's currency from their timezone, then their
   browser language's region; US dollars otherwise. */
export function guessCurrency(timeZone?: string, language?: string): CurrencyCode {
  try {
    const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone && CURRENCY_BY_TIMEZONE[zone]) return CURRENCY_BY_TIMEZONE[zone];
    const lang = language ?? (typeof navigator !== 'undefined' ? navigator.language : '');
    const region = /[-_]([A-Za-z]{2})\b/.exec(lang || '')?.[1]?.toUpperCase();
    if (region && CURRENCY_BY_REGION[region]) return CURRENCY_BY_REGION[region];
  } catch {
    // fall through
  }
  return 'USD';
}
