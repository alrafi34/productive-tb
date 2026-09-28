export const toolConfig = {
  slug: "date-difference-calculator",
  name: "Date Difference Calculator",
  description: "Calculate years, months, days between two dates instantly. Accurate leap year handling, end-date option and weekday count.",
  category: "calculator",
  icon: "📅",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "Is this calculator accurate for leap years and long date ranges?", a: "Yes. The tool automatically handles leap-year rules and variable month lengths, including February 29. This is important when calculating age, tenure, or project duration across multiple years." },
      { q: "What is the difference between total days and calendar days?", a: "Calendar output uses a breakdown like 2 years, 3 months, 15 days. Total days converts the entire span into one number, such as 835 days. Both are correct and useful for different tasks." },
      { q: "Does it count the end date and working days?", a: "By default the end date is not counted, so 1 January to 2 January is 1 day. Tick Include the end date to count both days (2 days). The result also shows the weekdays (Monday to Friday) in the range; public holidays are not subtracted." },
      { q: "How are months handled if they have different lengths?", a: "The tool uses actual calendar month lengths. For example, January 31 to February 28 is treated as 28 days, while January 1 to February 1 is exactly one month." },
      { q: "Is my data private?", a: "Yes. Calculations run in your browser. Your selected dates are not sent to a server. Recent history is stored locally in your browser only, so you can quickly reopen past calculations." },
      { q: "Can I calculate age using this date calculator?", a: "Yes. Enter your birth date as the start date and today as the end date. The calculator returns your age in years, months, and days, plus total days if needed." },
      { q: "Is this a free online date difference calculator?", a: "Yes. You can use all core features for free, including detailed output formats, copy result, quick presets, and recent calculation history." },
      { q: "Which output format should I choose?", a: "Use full format for age and human-readable durations. Use total days or total weeks for planning and tracking. Use total months for billing cycles, subscriptions, and recurring period analysis." },
    ],
    title: "Date Difference Calculator – Days Between Two Dates",
    description: "Find the exact time between two dates in years, months and days, plus total days and weeks. Handles leap years and month lengths correctly.",
    keywords: [
      "date difference calculator",
      "date duration calculator",
      "calculate days between dates",
      "time between two dates",
      "age calculator",
      "date calculator",
      "business days calculator",
      "days between dates",
      "months between dates",
      "years months days calculator",
      "date countdown calculator",
      "online date calculator free"
    ],
    openGraph: {
      title: "Date Difference Calculator - Exact Time Between Two Dates",
      description: "Calculate years, months, days, weeks and weekdays between dates with accurate calendar logic.",
      type: "website",
      url: "/tools/date-difference-calculator"
    }
  },
  features: [
    "Calculate difference in years, months, and days",
    "Accurate leap year handling",
    "Optional end-date counting and Monday–Friday weekday count",
    "Multiple output format options",
    "Copy results to clipboard",
    "Recent calculations history"
  ]
};
