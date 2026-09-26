import { siteConfig } from "@/config/site";

export const toolConfig = {
  name: "Working Days Calculator",
  slug: "working-days-calculator",
  description: "Calculate business days between two dates with flexible weekend configurations (1 or 2 days) and optional public holidays.",
  category: "productivity",
  icon: "📆",
  keywords: ["working days", "business days", "date calculator", "weekdays", "holidays", "project planning"],
  relatedTools: ["date-difference-calculator", "time-duration-calculator", "percentage-calculator"],
  seo: {
    faq: [
      { q: "How are working days calculated?", a: "The calculator counts every date from the start to the end date, then leaves out weekend days and any holidays you list. With a Saturday–Sunday weekend, 1–30 September 2026 has 22 working days." },
      { q: "Is the start date included?", a: "By default both the start and end dates are counted, as most HR and project rules do. Untick \"Include start date\" to count from the day after the start date." },
      { q: "Can I exclude public holidays?", a: "Yes. Enter each holiday as YYYY-MM-DD, one per line. Holidays that fall on a weekend are not subtracted twice." },
      { q: "My weekend is not Saturday and Sunday. Can I change it?", a: "Yes. Choose Saturday–Sunday, Friday–Saturday, a single weekend day (Friday, Saturday or Sunday) or no weekend at all." },
      { q: "What is the difference between working days and business days?", a: "They mean the same thing: weekdays that are not weekends or public holidays. Banks and couriers may also skip their own holidays, so add those if you need them." },
    ],
    title: "Working Days Calculator – Business Days Between Dates",
    description: "Count business days between two dates, excluding weekends and your own holidays. Choose Saturday–Sunday or another weekend pattern.",
    keywords: ["working days calculator", "business days calculator", "calculate working days between dates", "exclude weekends calculator", "business day counter"],
    openGraph: {
      title: "Working Days Calculator – Business Days Between Dates",
      description: "Calculate the number of working days between two dates with flexible weekend options. Choose 1-day or 2-day weekends and exclude holidays with this free business days calculator.",
      type: "website",
      url: `${siteConfig.url}/tools/productivity/working-days-calculator`
    }
  }
};