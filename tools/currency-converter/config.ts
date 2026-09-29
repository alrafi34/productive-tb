import { siteConfig } from "@/config/site";

export const currencyConverterConfig = {
  name: "Currency Converter",
  description: "Convert between about 30 major currencies at the European Central Bank's daily reference rates, including rates for past dates back to 1999.",
  icon: "💱",
  category: "calculator",
  slug: "currency-converter",
  seo: {
    title: "Currency Converter – USD, EUR, GBP & More, ECB Rates",
    description: "Convert dollars, euros, pounds, yen and 25+ other currencies at the European Central Bank's daily reference rates, or look up the rate on any date since 1999.",
    keywords: [
      "currency converter",
      "exchange rate calculator",
      "usd to eur",
      "eur to usd",
      "gbp to usd",
      "dollar to euro converter",
      "euro to dollar",
      "pound to dollar",
      "historical exchange rates",
      "ecb exchange rates",
    ],
    og: {
      title: "Currency Converter – USD, EUR, GBP & More, ECB Rates",
      description: "Convert dollars, euros, pounds, yen and 25+ other currencies at the European Central Bank's daily reference rates, or look up the rate on any date since 1999.",
      url: `${siteConfig.url}/tools/calculator/currency-converter`,
    },
    howToSteps: [
      { name: "Enter the amount", text: "Type how much you want to convert." },
      { name: "Choose the currencies", text: "Pick the currency you have and the one you want, or tap a popular pair such as USD → EUR; the ⇄ button swaps them." },
      { name: "Pick a date (optional)", text: "Leave the date empty for the latest rate, or choose any working day since January 4, 1999, to see the rate on that day." },
      { name: "Read the result", text: "See the converted amount, the rate in both directions, the date of the rate and quick tables for common amounts." },
    ],
    faq: [
      { q: "Where do the exchange rates come from?", a: "From the euro foreign exchange reference rates the European Central Bank publishes around 16:00 Central European Time on every working day, loaded through the free Frankfurter API. Rates between two non-euro currencies, such as USD to GBP, are calculated through the euro." },
      { q: "Why is my bank's or card's rate different?", a: "Reference rates are mid-market rates for information. Banks, card networks and exchange bureaus add a margin to them, often 1–3% for cards and more at airport kiosks, and may charge a separate foreign transaction fee, so you will usually receive a little less." },
      { q: "How often are the rates updated?", a: "Once per working day. On weekends and TARGET holidays the ECB does not publish rates, so the most recent working day's rates are shown with their date." },
      { q: "Can I see historical exchange rates?", a: "Yes. Choose a date to see that day's reference rate, back to January 4, 1999, when the euro was introduced. For a weekend or holiday, the previous working day's rate is used." },
      { q: "Which currencies are available?", a: "The euro and the 30 or so currencies in the ECB's daily list, including the US, Canadian, Australian and New Zealand dollars, the pound, Swiss franc, yen, yuan, Scandinavian and Central European currencies, the Mexican peso and the South African rand. Currencies the ECB does not publish are not included." },
      { q: "Is this suitable for accounting or tax?", a: "ECB reference rates are widely used for bookkeeping and for converting foreign income, but tax authorities can require specific rates; the IRS, for example, publishes yearly average rates. Check which rate your tax office or auditor expects." },
    ],
  },
};
