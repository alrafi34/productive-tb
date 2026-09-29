import { siteConfig } from "@/config/site";

export const ovulationCalculatorConfig = {
  name: "Ovulation Calculator",
  description: "Estimate your ovulation day, fertile window and next period from your cycle, for the next six cycles.",
  icon: "🌸",
  category: "health",
  slug: "ovulation-calculator",
  seo: {
    title: "Ovulation Calculator – Fertile Window & Ovulation Date",
    description: "Estimate your most fertile days, ovulation date and next period from your last period and cycle length, with a calendar for the next six cycles.",
    keywords: [
      "ovulation calculator",
      "fertile window calculator",
      "ovulation date",
      "when do i ovulate",
      "fertility calculator",
      "ovulation tracker",
      "most fertile days",
      "period calculator",
      "next period calculator",
      "ovulation calendar",
    ],
    og: {
      title: "Ovulation Calculator – Fertile Window & Ovulation Date",
      description: "Estimate your most fertile days, ovulation date and next period from your last period and cycle length, with a calendar for the next six cycles.",
      url: `${siteConfig.url}/tools/health/ovulation-calculator`,
    },
    howToSteps: [
      { name: "Enter your last period", text: "Choose the first day of your most recent period, which is day 1 of your cycle." },
      { name: "Enter your cycle length", text: "Type the usual number of days from the first day of one period to the first day of the next; 28 is typical, anywhere from 21 to 35 is common." },
      { name: "Adjust the luteal phase (optional)", text: "If you know it from temperature charting or tests, enter the number of days from ovulation to your next period; otherwise leave 14." },
      { name: "See your fertile days", text: "Read your fertile window, estimated ovulation day, next period and the due date if you conceive this cycle, plus the next six cycles." },
    ],
    faq: [
      { q: "How is ovulation calculated?", a: "Ovulation usually happens about 14 days before your next period, not 14 days after the last one. The calculator subtracts the luteal phase from your cycle length: in a 28-day cycle that starts on January 1, ovulation is around January 15 and the next period around January 29." },
      { q: "What is the fertile window?", a: "The six days ending on ovulation day. Sperm can survive up to five days in the reproductive tract and the egg about 12–24 hours after ovulation, so sex in the few days before ovulation gives the best chance of pregnancy." },
      { q: "How accurate is an ovulation calculator?", a: "It is an estimate from the calendar. Even with regular cycles, ovulation can shift by several days from month to month because of stress, illness, travel or breastfeeding. Ovulation predictor kits (LH tests), basal body temperature and cervical mucus changes show ovulation more precisely." },
      { q: "What if my cycles are irregular?", a: "Use your average cycle length and treat the result as a rough guide. If your cycles vary by more than about a week, are shorter than 21 days or longer than 35, or you have not conceived after 12 months of trying (6 months if you are 35 or older), talk to a doctor." },
      { q: "When can I take a pregnancy test?", a: "Home tests are most reliable from the day your period is due, about 14 days after ovulation. Some sensitive tests can detect pregnancy a few days earlier, but a negative result before your missed period is not conclusive." },
      { q: "Can I use this to avoid pregnancy?", a: "No. Calendar estimates are not reliable enough for contraception, because ovulation can come earlier or later than expected. Talk to a doctor or family-planning clinic about effective methods." },
    ],
  },
};
