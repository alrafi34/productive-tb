import { siteConfig } from "@/config/site";

export const dateCalculatorConfig = {
  name: "Date Calculator",
  description: "Add or subtract days, weeks, months and years from a date, or count business days, to find the exact date, weekday and week number.",
  icon: "📆",
  category: "calculator",
  slug: "date-calculator",
  seo: {
    title: "Date Calculator – Add or Subtract Days From a Date",
    description: "Add or subtract days, weeks, months or years from any date, or count business days. See the date 30, 60 or 90 days from today with its weekday and week number.",
    keywords: [
      "date calculator",
      "days from today",
      "days from date calculator",
      "add days to date",
      "subtract days from date",
      "90 days from today",
      "30 days from today",
      "business days calculator",
      "what date is 60 days from today",
      "add months to date",
    ],
    og: {
      title: "Date Calculator – Add or Subtract Days From a Date",
      description: "Add or subtract days, weeks, months or years from any date, or count business days. See the date 30, 60 or 90 days from today with its weekday and week number.",
      url: `${siteConfig.url}/tools/calculator/date-calculator`,
    },
    howToSteps: [
      { name: "Pick a start date", text: "The calculator starts from today; choose any other date if you need to." },
      { name: "Add or subtract", text: "Choose whether to go forward or back in time, then enter the years, months, weeks and days, or tap a quick button such as 30, 60 or 90 days." },
      { name: "Count business days if needed", text: "Switch to business days to skip weekends, and pick which days are the weekend where you live." },
      { name: "Read the result", text: "See the resulting date with its weekday, ISO week number, day of the year and the total number of calendar days in between." },
    ],
    faq: [
      { q: "What date is 90 days from today?", a: "Open the calculator: it starts from today's date, so tap the 90 days button to see the answer with its weekday. For example, 90 days after September 29, 2026 is Monday, December 28, 2026." },
      { q: "How are months added when the day does not exist?", a: "The date moves to the last day of the shorter month, as spreadsheets do. January 31 plus one month is February 28 (February 29 in a leap year), and March 31 minus one month is also February 28." },
      { q: "Are years and months added before days?", a: "Yes. Years and months are added on the calendar first, then weeks and days are counted from there. The result can differ by a day or two from counting the same span as a fixed number of days, because months have different lengths." },
      { q: "How are business days counted?", a: "Business days skip the weekend days you choose: Saturday and Sunday in the US and most of Europe, Friday and Saturday in much of the Middle East. Counting starts on the next day, so 10 business days after Tuesday, September 29, 2026 is Tuesday, October 13, 2026. Public holidays are not skipped; add one day for each holiday that falls in the period." },
      { q: "What is the ISO week number?", a: "The ISO 8601 week number, used across Europe for planning and payroll. Weeks start on Monday, and week 1 is the week containing the first Thursday of the year (the one with January 4), so December 31, 2026 falls in week 53 and January 1, 2027 is still in week 53 of 2026." },
    ],
  },
};
