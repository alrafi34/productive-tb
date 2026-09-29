import { siteConfig } from "@/config/site";

export const dueDateCalculatorConfig = {
  name: "Pregnancy Due Date Calculator",
  description: "Estimate your due date from your last period, conception date, IVF transfer or an ultrasound, and see how far along you are.",
  icon: "🤰",
  category: "health",
  slug: "due-date-calculator",
  seo: {
    title: "Due Date Calculator – When Is My Baby Due?",
    description: "Find your pregnancy due date from your last period, conception, IVF transfer or ultrasound. See how many weeks pregnant you are, your trimester and key dates.",
    keywords: [
      "due date calculator",
      "pregnancy due date calculator",
      "when is my baby due",
      "pregnancy calculator",
      "how many weeks pregnant am i",
      "ivf due date calculator",
      "conception date calculator",
      "estimated due date",
      "naegele's rule",
      "pregnancy week calculator",
    ],
    og: {
      title: "Due Date Calculator – When Is My Baby Due?",
      description: "Find your pregnancy due date from your last period, conception, IVF transfer or ultrasound. See how many weeks pregnant you are, your trimester and key dates.",
      url: `${siteConfig.url}/tools/health/due-date-calculator`,
    },
    howToSteps: [
      { name: "Choose how to calculate", text: "Pick last period if you know the first day of your last menstrual period, or conception date, IVF transfer date or an ultrasound result if you have one." },
      { name: "Enter the date", text: "Choose the first day of your last period, the conception or transfer date, or the date of the scan." },
      { name: "Add the details", text: "For last period, enter your usual cycle length; for IVF, whether the embryo was transferred on day 3 or day 5; for an ultrasound, the gestational age the scan gave." },
      { name: "Read your due date", text: "See the estimated due date, how many weeks and days pregnant you are today, your trimester, and dates such as the end of the first trimester and full term." },
    ],
    faq: [
      { q: "How is the due date calculated?", a: "With Naegele's rule: 280 days (40 weeks) after the first day of your last menstrual period, assuming a 28-day cycle. A last period that started on January 1 gives a due date of October 8. From a known conception date, the due date is 266 days (38 weeks) later." },
      { q: "What if my cycle is longer or shorter than 28 days?", a: "Ovulation usually happens about 14 days before the next period, so a longer cycle means later ovulation and a later due date. The calculator moves the due date by the difference: with a 32-day cycle, it is 4 days later than with a 28-day cycle." },
      { q: "How is the due date worked out after IVF?", a: "From the transfer date: 266 days after conception, where a day-5 blastocyst transfer counts as conception 5 days earlier, so the due date is 261 days after a day-5 transfer and 263 days after a day-3 transfer." },
      { q: "Why are pregnancy weeks counted from the last period?", a: "Because the start of the last period is usually known and conception is not. By this convention you are already about 2 weeks pregnant at conception, which is why a pregnancy is called 40 weeks long although the baby develops for about 38." },
      { q: "How accurate is the due date?", a: "It is an estimate: only about 4–5% of babies arrive on their due date, and most are born within two weeks either side of it. A first-trimester ultrasound, measured from the baby's crown-rump length, is the most accurate way to date a pregnancy, so your provider may adjust the date after it." },
      { q: "What do early term, full term and late term mean?", a: "Babies born from 37 weeks 0 days to 38 weeks 6 days are early term, 39 weeks 0 days to 40 weeks 6 days full term, 41 weeks late term and from 42 weeks post-term (ACOG definitions). Before 37 weeks a birth is preterm." },
      { q: "Is my information private?", a: "Yes. The calculation runs in your browser and the dates you enter are not sent or stored anywhere." },
    ],
  },
};
