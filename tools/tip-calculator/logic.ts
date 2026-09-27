export interface TipCalculation {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalBill: number;
  numberOfPeople: number;
  perPersonAmount: number;
  roundedPerPersonAmount: number;
}

export interface CalculationHistory {
  id: string;
  billAmount: number;
  tipPercentage: number;
  numberOfPeople: number;
  timestamp: number;
}

export const PRESET_TIPS = [10, 15, 18, 20];

export const CURRENCIES = {
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  CAD: { symbol: "CA$", name: "Canadian Dollar" },
  AUD: { symbol: "A$", name: "Australian Dollar" }
};

export type CurrencyCode = keyof typeof CURRENCIES;

export function isCurrency(code: unknown): code is CurrencyCode {
  return typeof code === "string" && Object.prototype.hasOwnProperty.call(CURRENCIES, code);
}

/* A best guess at the visitor's currency from their timezone, then their
   browser language's region; US dollars otherwise. Always editable. */
export function guessCurrency(timeZone?: string, language?: string): CurrencyCode {
  try {
    const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (zone === "Europe/London") return "GBP";
    if (zone.startsWith("Australia/")) return "AUD";
    const lang = language ?? (typeof navigator !== "undefined" ? navigator.language : "");
    const region = /[-_]([A-Za-z]{2})\b/.exec(lang || "")?.[1]?.toUpperCase();
    if (region === "GB") return "GBP";
    if (region === "CA") return "CAD";
    if (region === "AU") return "AUD";
    if (zone.startsWith("Europe/")) return "EUR";
  } catch {
    // fall through
  }
  return "USD";
}

export function calculateTip(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number = 1
): TipCalculation {
  if (billAmount < 0 || tipPercentage < 0 || numberOfPeople < 1) {
    return {
      billAmount: 0,
      tipPercentage: 0,
      tipAmount: 0,
      totalBill: 0,
      numberOfPeople: 1,
      perPersonAmount: 0,
      roundedPerPersonAmount: 0
    };
  }

  const tipAmount = billAmount * (tipPercentage / 100);
  const totalBill = billAmount + tipAmount;
  const perPersonAmount = totalBill / numberOfPeople;
  const roundedPerPersonAmount = Math.ceil(perPersonAmount * 100) / 100;

  return {
    billAmount,
    tipPercentage,
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalBill: Math.round(totalBill * 100) / 100,
    numberOfPeople,
    perPersonAmount: Math.round(perPersonAmount * 100) / 100,
    roundedPerPersonAmount
  };
}

export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol}${amount.toFixed(2)}`;
}

export function roundUpBill(amount: number): number {
  return Math.ceil(amount);
}

export function saveTipSettings(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number,
  currency: string
): void {
  if (typeof window === "undefined") return;

  const settings = {
    billAmount,
    tipPercentage,
    numberOfPeople,
    currency,
    timestamp: Date.now()
  };

  localStorage.setItem("tip-calculator-settings", JSON.stringify(settings));
}

export function getTipSettings(): {
  billAmount: number;
  tipPercentage: number;
  numberOfPeople: number;
  currency: string;
} | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("tip-calculator-settings");
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveToHistory(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number
): void {
  if (typeof window === "undefined") return;

  const stored = getHistory();
  const item: CalculationHistory = {
    id: crypto.randomUUID(),
    billAmount,
    tipPercentage,
    numberOfPeople,
    timestamp: Date.now()
  };

  stored.unshift(item);
  const trimmed = stored.slice(0, 20);
  localStorage.setItem("tip-calculator-history", JSON.stringify(trimmed));
}

export function getHistory(): CalculationHistory[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("tip-calculator-history");
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("tip-calculator-history");
}

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
