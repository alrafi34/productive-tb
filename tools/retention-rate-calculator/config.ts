import { siteConfig } from "@/config/site";

export const retentionRateCalculatorConfig = {
  slug: "retention-rate-calculator",
  name: "Retention Rate Calculator",
  description: "Calculate customer, employee, user, subscriber, or member retention rate instantly using the industry-standard formula. Get retained and lost counts, a performance rating, compounded annual projection, and a formula breakdown. Free browser-based retention rate calculator.",
  category: "marketing",
  icon: "📊",
  free: true,
  relatedTools: [
    "churn-rate-calculator",
    "customer-lifetime-value-calculator",
    "conversion-rate-calculator",
    "bounce-rate-calculator",
    "lead-conversion-funnel-calculator",
    "revenue-growth-calculator",
  ],
  seo: {
    title: "Retention Rate Calculator — Free Customer & Employee Retention Tool",
    description: "Calculate customer, employee, user, subscriber, or membership retention rate instantly using the standard formula. Get performance ratings, benchmarks, and downloadable reports — free and browser-based.",
    keywords: [
      "retention rate calculator",
      "customer retention calculator",
      "employee retention calculator",
      "user retention calculator",
      "membership retention calculator",
      "retention percentage calculator",
      "retention formula",
      "retention metrics calculator",
      "business kpi calculator",
      "marketing analytics calculator",
      "subscriber retention calculator",
      "churn vs retention calculator",
      "monthly retention rate",
      "customer retention rate formula",
      "employee turnover calculator",
      "saas retention calculator",
      "cohort retention calculator",
      "free retention calculator",
      "retention rate formula calculator",
      "online retention calculator",
    ],
    openGraph: {
      title: "Retention Rate Calculator — Free Customer & Employee Retention Tool",
      description: "Calculate customer, employee, user, subscriber, or membership retention rate instantly. Performance ratings, benchmarks, and reports — free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/retention-rate-calculator`,
    },
    og: {
      title: "Retention Rate Calculator — Free Customer & Employee Retention Tool",
      description: "Calculate customer, employee, user, subscriber, or membership retention rate instantly. Performance ratings, benchmarks, and reports — free and browser-based.",
      url: `${siteConfig.url}/tools/marketing/retention-rate-calculator`,
    },
    howToSteps: [
      {
        name: "Choose What You're Measuring",
        text: "Select Customers, Employees, Users, Subscribers, or Members, and choose the period — Daily, Weekly, Monthly, Quarterly, Yearly, or Custom — that matches your data.",
      },
      {
        name: "Enter Starting, Ending, and New Counts",
        text: "Type the count at the start of the period, the count at the end of the period, and how many new entries were acquired during that same period.",
      },
      {
        name: "Read the Live Retention Rate",
        text: "The retention rate, retained count, lost count, churn rate, and performance rating update instantly as you type, shown on an animated circular gauge.",
      },
      {
        name: "Review the Formula Breakdown",
        text: "Check the Formula & Calculation Breakdown card to see exactly how your numbers produced the result, plus a compounded annual projection if your period is shorter than a year.",
      },
      {
        name: "Export, Share, or Save",
        text: "Copy the result or full report, download as CSV or JSON, print a report, share the result using your device's native share sheet, or save the calculation to your local history.",
      },
    ],
    faq: [
      {
        q: "What is a retention rate calculator?",
        a: "A retention rate calculator is a free browser-based tool that measures the percentage of customers, employees, users, subscribers, or members who remain over a given period, using the industry-standard formula: Retention Rate (%) = ((Ending − New) ÷ Starting) × 100. It instantly returns the retention rate, retained count, lost count, and a performance rating.",
      },
      {
        q: "How is retention rate calculated?",
        a: "Retention rate is calculated by first finding retained users (Ending count minus New count acquired during the period), then dividing that by the Starting count and multiplying by 100. For example, starting with 500 customers, ending with 450, and acquiring 50 new ones gives 450 − 50 = 400 retained, and (400 ÷ 500) × 100 = 80% retention.",
      },
      {
        q: "What is a good retention rate?",
        a: "A retention rate of 90% or above is rated Excellent, 80-89% is Very Good, 70-79% is Good, 60-69% is Average, and below 60% is rated Needs Improvement in this calculator. What counts as competitive varies significantly by industry and period length — monthly SaaS retention above 95% is common for top performers, while annual employee retention above 85% is often considered strong.",
      },
      {
        q: "What is the difference between retention rate and churn rate?",
        a: "Retention rate measures the percentage of your starting cohort that remained by the end of the period. Churn rate measures the percentage that did not — the two always add up to 100%. An 80% retention rate is equivalent to a 20% churn rate for the same period.",
      },
      {
        q: "Why does the formula subtract new users before dividing?",
        a: "Subtracting new users isolates how many people from your original starting cohort actually stuck around, rather than mixing in new acquisitions that weren't part of the group being measured. Without this subtraction, strong new-customer acquisition could mask a serious retention problem in your existing base.",
      },
      {
        q: "What does the compounded annual retention figure mean?",
        a: "If you calculate a Monthly, Weekly, Quarterly, or Daily retention rate, the calculator projects what that rate would compound to over a full year if it stayed constant, using Rate^(periods per year). For example, a 90% monthly retention rate compounds to roughly 28% after 12 months, illustrating why even small monthly retention gaps matter enormously over a year.",
      },
      {
        q: "Can retention rate exceed 100%?",
        a: "In a correctly measured cohort, retention rate should not exceed 100%. If it does, the calculator shows a warning — this usually means New Users were undercounted, or the Ending count includes people who weren't part of the original Starting cohort being measured.",
      },
      {
        q: "How is employee retention different from customer retention?",
        a: "The underlying formula is identical, but employee retention is typically measured over a full year using headcount at the start and end of the year plus new hires, while customer or subscriber retention is often measured monthly or quarterly due to faster-moving subscription cycles. Select Employees as the metric type and Yearly as the period to match standard HR reporting conventions.",
      },
      {
        q: "How do I calculate retention for a custom time period?",
        a: "Select Custom from the Period dropdown to use the exact same formula without a specific period label attached — useful for irregular reporting windows like a 45-day trial period or a fiscal quarter that doesn't align with a calendar quarter. Note that the compounded annual projection is only shown for standard periods with a known number of periods per year.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your starting, ending, and new user counts are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is stored only in your browser's local storage.",
      },
    ],
  },
};
