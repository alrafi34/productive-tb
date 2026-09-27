export const toolConfig = {
  slug: "roman-numeral-converter",
  name: "Roman Numeral Converter",
  description: "Convert between Arabic numbers and Roman numerals instantly. Bidirectional conversion with validation and history.",
  category: "calculator",
  icon: "🏛️",
  free: true,
  backend: false,
  seo: {
    title: "Roman Numeral Converter – Numbers to Roman and Back",
    description: "Convert numbers to Roman numerals and Roman numerals back to numbers, from 1 to 3,999. Handy for years, dates, clock faces, outlines and tattoos.",
    keywords: [
      "roman numeral converter",
      "convert to roman numerals",
      "roman numeral calculator",
      "number to roman",
      "roman to number",
      "roman numeral translator",
      "convert arabic to roman",
      "online roman converter"
    ],
    openGraph: {
      title: "Roman Numeral Converter - Convert Numbers to Roman Numerals",
      description: "Instant bidirectional conversion between Arabic numbers and Roman numerals with validation.",
      type: "website",
      url: "/tools/calculator/roman-numeral-converter"
    },
    howToSteps: [
      { name: "Choose the direction", text: "Select Number → Roman to write a number in Roman numerals, or Roman → Number to read one." },
      { name: "Enter the value", text: "Type a whole number from 1 to 3,999, or Roman numerals such as MCMLXXXVII. Lower case works too." },
      { name: "Read and copy", text: "The result appears as you type, with an error message if the numeral is not valid. Copy it or keep it in your history." },
    ],
    faq: [
      { q: "What is 2026 in Roman numerals?", a: "2026 is MMXXVI: MM (2,000) + XX (20) + VI (6). 2025 is MMXXV and 2027 is MMXXVII." },
      { q: "What do the Roman numeral letters stand for?", a: "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 and M = 1,000. Every other number is written by combining them from largest to smallest." },
      { q: "How does subtractive notation work?", a: "A smaller numeral written before a larger one is subtracted from it. Only six pairs are used: IV (4), IX (9), XL (40), XC (90), CD (400) and CM (900). So 49 is XLIX (40 + 9), not IL." },
      { q: "How do I write a year or a date in Roman numerals?", a: "Convert each part separately. The year 1990 is MCMXC (1,000 + 900 + 90), and a date such as 14 July 2024 is written XIV · VII · MMXXIV, in day-month-year or month-day-year order as you prefer." },
      { q: "Why does the converter stop at 3,999?", a: "Standard Roman numerals have no symbol above M (1,000) and M may be repeated only three times, so MMMCMXCIX (3,999) is the largest number they can write. Larger numbers used a bar over a numeral to multiply it by 1,000, which is not part of modern usage." },
      { q: "Is there a Roman numeral for zero?", a: "No. The Romans had no numeral for zero; medieval writers sometimes used the word nulla or the letter N instead." },
    ],
  },
  features: [
    "Convert numbers (1-3999) to Roman numerals",
    "Convert Roman numerals back to numbers",
    "Real-time validation and error detection",
    "Copy results to clipboard",
    "Conversion history with LocalStorage",
    "Random number generator for testing",
    "Interactive Roman numeral reference chart",
    "Mobile-friendly responsive design"
  ]
};
