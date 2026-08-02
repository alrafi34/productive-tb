import { siteConfig } from "@/config/site";

export const userGrowthRateCalculatorConfig = {
  slug: "user-growth-rate-calculator",
  name: "User Growth Rate Calculator",
  description: "Calculate user growth rate instantly from starting and ending user counts. Free browser-based calculator with growth status insights, annualized rate conversion, and projection charts for SaaS, startups, and app teams.",
  category: "data-analytics",
  icon: "📈",
  free: true,
  seo: {
    title: "Free User Growth Rate Calculator – Calculate User Growth Percentage Online",
    description: "Calculate user growth rate instantly using the standard growth formula. Measure customer, app, SaaS, or website user growth with live calculations, downloadable reports, and interactive analytics.",
    keywords: [
      "user growth calculator",
      "user growth rate calculator",
      "growth percentage calculator",
      "customer growth calculator",
      "monthly user growth calculator",
      "startup growth calculator",
      "saas growth calculator",
      "analytics calculator",
    ],
    openGraph: {
      title: "Free User Growth Rate Calculator",
      description: "Calculate user growth rate instantly, see growth status insights, and project future user counts — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/user-growth-rate-calculator`,
    },
  },
};
