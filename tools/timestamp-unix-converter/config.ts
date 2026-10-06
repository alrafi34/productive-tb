export const toolConfig = {
  slug: "timestamp-unix-converter",
  name: "Unix Timestamp Converter",
  description: "Convert Unix timestamps to readable dates and convert dates to Unix seconds or milliseconds instantly.",
  category: "developer",
  icon: "⏱️",
  free: true,
  backend: false,
  seo: {
    title: "Unix Timestamp Converter (Epoch to Date & Date to Unix)",
    description: "Convert Unix epoch time to a date and a date to a timestamp. Detects seconds or milliseconds, with batch conversion, time zones and differences.",
    keywords: [
      "unix timestamp converter",
      "epoch time converter",
      "timestamp to date",
      "date to unix",
      "date to unix timestamp",
      "unix time converter",
      "epoch converter",
      "epoch to date",
      "unix epoch calculator",
      "unix time now",
      "timestamp difference calculator",
      "iso 8601 to unix",
      "batch timestamp converter"
    ],
    openGraph: {
      title: "Unix Timestamp Converter (Epoch to Date & Date to Unix)",
      description: "Convert Unix epoch time to a date and a date to a timestamp. Detects seconds or milliseconds, with batch conversion, time zones and differences.",
      type: "website",
      url: "/tools/calculator/timestamp-unix-converter"
    },
    howToSteps: [
      { name: "Choose a mode", text: "Choose a mode: Unix to Date, Date to Unix, Compare Difference, or Batch Convert." },
      { name: "Paste your timestamp or date input", text: "Paste your timestamp or date input." },
      { name: "Review converted values including UTC/local formats and developer-friendly outputs", text: "Review converted values including UTC/local formats and developer-friendly outputs." },
      { name: "Copy Unix seconds", text: "Copy Unix seconds, milliseconds, ISO 8601, RFC 2822, or timezone values as needed." },
      { name: "Use batch mode for multiple rows or compare mode to calculate exact time differences", text: "Use batch mode for multiple rows or compare mode to calculate exact time differences." },
    ],
    faq: [
      { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds since 00:00:00 UTC on January 1, 1970. Some systems store the same value in milliseconds for higher precision." },
      { q: "How does this converter detect seconds vs milliseconds?", a: "Numeric inputs with up to 11 digits are treated as seconds, and longer numeric inputs are treated as milliseconds. This avoids manual mode switching for common developer workflows." },
      { q: "Can I convert dates to Unix timestamps too?", a: "Yes. The date-to-Unix mode accepts standard date strings and returns both Unix seconds and Unix milliseconds instantly." },
      { q: "Does this tool support timezone checks?", a: "Yes. It shows timezone views for UTC, GMT, New York, London, Tokyo, and Sydney so you can validate cross-region logs and schedules quickly." },
      { q: "Is my data private?", a: "Yes. We do not collect or store what you enter." },
    ],
  },
  features: [
    "Convert Unix timestamps to dates instantly",
    "Convert flexible date strings to Unix epoch time",
    "Auto-detect seconds vs milliseconds timestamps",
    "View live, real-time current epoch clocks",
    "Batch convert multiple timestamps at once",
    "Compare and calculate difference between timestamps"
  ]
};
