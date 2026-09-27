/*
 * The currencies offered by tools whose only money input is a price or rate
 * the visitor types in (CLAUDE.md: a handful of well-known choices → a
 * dropdown). The default is guessed from the visitor's timezone and browser
 * language and always stays editable.
 */
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function isCurrencyCode(code: unknown): code is CurrencyCode {
  return CURRENCIES.some((c) => c.code === code);
}

export function currencySymbol(code: CurrencyCode): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? "$";
}

/* "$1,234.50", "€1,234.50", "CA$1,234.50" */
export function formatMoney(amount: number, code: CurrencyCode, decimals = 2): string {
  const n = amount.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return amount < 0 ? `-${currencySymbol(code)}${n.slice(1)}` : `${currencySymbol(code)}${n}`;
}

/* A best guess from the timezone, then the browser language's region; US dollars otherwise. */
export function guessCurrency(timeZone?: string, language?: string): CurrencyCode {
  try {
    const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const lang = language ?? (typeof navigator !== "undefined" ? navigator.language : "");
    const region = /[-_]([A-Za-z]{2})\b/.exec(lang || "")?.[1]?.toUpperCase();
    if (zone === "Europe/London" || region === "GB") return "GBP";
    if (zone.startsWith("Australia/") || region === "AU") return "AUD";
    if (region === "CA") return "CAD";
    if (zone.startsWith("Europe/")) return "EUR";
  } catch {
    // fall through
  }
  return "USD";
}
