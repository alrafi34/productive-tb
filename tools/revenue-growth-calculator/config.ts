import { siteConfig } from "@/config/site";

export const revenueGrowthCalculatorConfig = {
  slug: "revenue-growth-calculator",
  name: "Revenue Growth Calculator",
  description:
    "Calculate revenue growth percentage instantly. Compare previous and current revenue, measure business performance, and export professional reports — free and 100% browser-based.",
  category: "marketing",
  icon: "📈",
  free: true,
  seo: {
    title:
      "Revenue Growth Calculator – Growth Rate Percentage",
    description:
      "Calculate revenue growth between two periods as an amount and a percentage, spot trends across periods and export a report.",
    keywords: [
      "revenue growth calculator",
      "business growth calculator",
      "sales growth calculator",
      "growth percentage calculator",
      "revenue increase calculator",
      "business revenue growth",
      "marketing revenue calculator",
      "financial growth calculator",
      "calculate revenue growth",
      "growth rate formula",
      "sales increase percentage",
      "business performance calculator",
      "startup growth calculator",
    ],
    openGraph: {
      title: "Revenue Growth Calculator – Growth Rate Percentage",
      description:
        "Calculate revenue growth between two periods as an amount and a percentage, spot trends across periods and export a report.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/revenue-growth-calculator`,
    },
    faq: [
      { q: "What is revenue growth rate?", a: "Revenue growth rate is the percentage change in a company's revenue between two periods — typically month-over-month, quarter-over-quarter, or year-over-year. It is one of the most important KPIs for measuring business performance, attracting investors, and benchmarking against competitors." },
      { q: "How is revenue growth calculated?", a: "Revenue growth is calculated using the formula: ((Current Revenue − Previous Revenue) ÷ Previous Revenue) × 100. For example, if previous revenue was $10,000 and current revenue is $12,500, growth = ((12,500 − 10,000) ÷ 10,000) × 100 = 25%." },
      { q: "What is a good revenue growth rate?", a: "A good revenue growth rate depends on your business stage and industry. Early-stage startups often target 10–20% monthly growth. SaaS companies use the 'Rule of 40' — growth rate plus profit margin should exceed 40%. For established SMBs, 10–20% annual growth is generally considered healthy." },
      { q: "What is the difference between revenue growth and profit growth?", a: "Revenue growth measures the increase in total sales or income before expenses. Profit growth measures the increase in what remains after all costs are deducted. A business can have strong revenue growth but declining profit growth if costs are rising faster. Both metrics are important but serve different purposes." },
      { q: "Why is tracking revenue growth important?", a: "Revenue growth tracking helps businesses identify trends, validate strategies, allocate resources effectively, and make data-driven decisions. Investors, banks, and acquirers use growth rates to assess valuation and risk. Consistent tracking also helps identify seasonality patterns and the impact of marketing campaigns." },
      { q: "What causes revenue to decline?", a: "Revenue decline can result from increased competition, customer churn, pricing changes, product issues, reduced marketing spend, economic downturns, or seasonal factors. Identifying the root cause quickly is critical — compare revenue by channel, product, or customer segment to pinpoint the source." },
    ],
  },
};
