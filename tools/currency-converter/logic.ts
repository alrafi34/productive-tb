/* Exchange rates from the European Central Bank's euro foreign exchange
   reference rates, fetched in the browser through the free, open-source
   Frankfurter API (api.frankfurter.dev). The ECB publishes them once a day,
   around 16:00 CET, on working days. */

export const RATES_SOURCE = "European Central Bank reference rates via Frankfurter";

const HOSTS = ["https://api.frankfurter.dev/v1", "https://api.frankfurter.app"];

/* The currencies the ECB publishes (plus the euro), used until the live list loads. */
export const FALLBACK_CURRENCIES: Record<string, string> = {
  AUD: "Australian Dollar", BRL: "Brazilian Real", CAD: "Canadian Dollar",
  CHF: "Swiss Franc", CNY: "Chinese Renminbi Yuan", CZK: "Czech Koruna", DKK: "Danish Krone",
  EUR: "Euro", GBP: "British Pound", HKD: "Hong Kong Dollar", HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah", ILS: "Israeli New Sheqel", INR: "Indian Rupee", ISK: "Icelandic Króna",
  JPY: "Japanese Yen", KRW: "South Korean Won", MXN: "Mexican Peso", MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone", NZD: "New Zealand Dollar", PHP: "Philippine Peso", PLN: "Polish Złoty",
  RON: "Romanian Leu", SEK: "Swedish Krona", SGD: "Singapore Dollar", THB: "Thai Baht",
  TRY: "Turkish Lira", USD: "United States Dollar", ZAR: "South African Rand",
};

export const POPULAR_PAIRS: [string, string][] = [
  ["USD", "EUR"], ["EUR", "USD"], ["GBP", "USD"], ["USD", "GBP"],
  ["EUR", "GBP"], ["USD", "CAD"], ["USD", "JPY"], ["AUD", "USD"],
];

export type RateQuote = { base: string; quote: string; rate: number; date: string };

async function getJson(path: string): Promise<unknown> {
  let lastError: unknown;
  for (const host of HOSTS) {
    try {
      const res = await fetch(`${host}${path}`);
      if (res.ok) return await res.json();
      lastError = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Could not load exchange rates.");
}

export async function fetchCurrencies(): Promise<Record<string, string>> {
  const data = (await getJson("/currencies")) as Record<string, string>;
  return data && typeof data === "object" ? data : FALLBACK_CURRENCIES;
}

/* The rate from base to quote on a date (YYYY-MM-DD), or the latest when no
   date is given. For weekends and holidays the ECB's previous working day is used. */
export async function fetchRate(base: string, quote: string, date?: string): Promise<RateQuote> {
  if (base === quote) return { base, quote, rate: 1, date: date ?? new Date().toISOString().slice(0, 10) };
  const data = (await getJson(`/${date ?? "latest"}?base=${base}&symbols=${quote}`)) as {
    date?: string;
    rates?: Record<string, number>;
  };
  const rate = data?.rates?.[quote];
  if (typeof rate !== "number" || !data.date) throw new Error("No rate is available for this currency and date.");
  return { base, quote, rate, date: data.date };
}

export function convert(amount: number, rate: number): number {
  return amount * rate;
}

/* Enough significant digits for small and large rates: 0.8567, 151.23, 0.006612 */
export function formatRate(rate: number): string {
  if (rate === 0) return "0";
  const digits = rate >= 100 ? 2 : rate >= 1 ? 4 : Math.min(8, 3 - Math.floor(Math.log10(rate)) + 1);
  return rate.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

/* Amounts in the target currency use 0 decimals for currencies without minor units in daily use. */
const ZERO_DECIMAL = new Set(["JPY", "KRW", "HUF", "IDR", "ISK"]);
export function formatAmount(amount: number, code: string): string {
  const d = ZERO_DECIMAL.has(code) ? 0 : 2;
  return `${amount.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })} ${code}`;
}

export const EARLIEST_DATE = "1999-01-04";
