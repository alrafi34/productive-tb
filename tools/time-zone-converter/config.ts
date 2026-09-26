export const toolConfig = {
  slug: "time-zone-converter",
  name: "Time Zone Converter",
  description: "Convert time between world cities instantly. See multiple time zones side by side.",
  category: "productivity",
  icon: "🌍",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How do I convert a time to another time zone?", a: "Enter the date and time, choose the time zone they are in, and add the cities you want. Each card shows the local time there and whether it is the same, next or previous day." },
      { q: "Does it handle daylight saving time?", a: "Yes. Daylight saving time is applied for the date you choose, so a meeting next month converts correctly even if the clocks change in one of the cities before then." },
      { q: "Can I find cities that are not in the list?", a: "Yes. Search covers every IANA time zone your browser knows, such as Phoenix, Adelaide or Kolkata, as well as the popular cities." },
      { q: "Why do some time differences include minutes?", a: "Some zones are offset by half or quarter hours from UTC, such as India (UTC+5:30) and Nepal (UTC+5:45), so the difference is shown as, for example, +4h 30m." },
      { q: "How do I schedule a meeting across time zones?", a: "Set the proposed time in your own zone, add each participant's city, and look for a time that falls inside everyone's working hours (the cards mark 9:00–18:00)." },
    ],
    title: "Free Time Zone Converter – Compare World Clocks Instantly",
    description: "Convert time between world cities instantly. Compare multiple time zones side by side and schedule global meetings without confusion.",
    keywords: [
      "time zone converter",
      "world clock converter",
      "meeting time converter",
      "convert time between cities",
      "international time converter",
      "global time calculator",
      "timezone converter",
      "world time",
      "time difference calculator",
      "meeting scheduler",
      "remote team time zones",
      "global meeting planner",
      "time zone calculator",
      "UTC converter",
      "timezone comparison"
    ],
    openGraph: {
      title: "Free Time Zone Converter - Compare World Clocks Instantly",
      description: "Convert time between world cities instantly. Compare multiple time zones side by side.",
      type: "website",
      url: "/tools/productivity/time-zone-converter"
    }
  },
  features: [
    "Instant time conversion between any cities",
    "Compare multiple time zones side by side",
    "Auto-detect your local timezone",
    "Search and add popular cities",
    "Live clock updates every minute",
    "Highlight working hours (9AM–6PM)",
    "Visual day/night indicators",
    "Save favorite cities to localStorage",
    "Copy converted times to clipboard",
    "Shareable meeting time summary",
    "Dark mode support",
    "Time difference indicators",
    "100% browser-based - no backend needed"
  ]
};
