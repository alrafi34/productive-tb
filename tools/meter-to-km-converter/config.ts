export const toolConfig = {
  slug: "meter-to-km-converter",
  name: "Meter to Kilometer Converter",
  description: "Convert meters to kilometers instantly with real-time results.",
  category: "calculator",
  icon: "🛣️",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How do I convert kilometers back into meters?", a: "Click \"Swap\" to switch the converter to kilometers → meters, or multiply the kilometers by 1,000: 2.5 km × 1,000 = 2,500 m." },
      { q: "Can I perform conversions offline?", a: "Yes. Because all operational scripting occurs directly within localized JavaScript arrays, losing your internet connection after initially loading the page will not inhibit your ability to convert units or save historical values to temporary storage." },
      { q: "I am receiving incredibly long decimal outputs. Why?", a: "If calculating fractional lengths, JavaScript may naturally produce long trailing repeating decimals. To remedy this layout clutter, employ the \"Result Precision\" slider tool beneath the input area to round visual values to 2 or 3 static decimal spots optimally." },
    ],
    title: "Meters to Kilometers Converter (m to km)",
    description: "Convert meters to kilometers and kilometers to meters instantly. 1 km = 1,000 m, with the formula, a conversion table and copyable results.",
    keywords: [
      "meter to kilometer",
      "m to km converter",
      "meter converter",
      "convert meters",
      "kilometers to meters"
    ],
    openGraph: {
      title: "Meter to Kilometer Converter Online – Instant Metric Conversion",
      description: "Convert meters to kilometers dynamically instantly.",
      type: "website",
      url: "/tools/meter-to-km-converter"
    }
  },
  features: [
    "Instant real-time conversion",
    "Adjustable decimal precision",
    "Copy results to clipboard with one click",
    "Calculation history management",
    "Auto-detect numeric input and handle errors safely",
    "Works entirely offline in the browser"
  ]
};
