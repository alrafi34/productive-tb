import { siteConfig } from "@/config/site";

export const dataGrowthCalculatorConfig = {
  slug: "data-growth-calculator",
  name: "Data Growth Calculator",
  description: "Estimate database, storage, backup, and cloud data growth instantly using fixed or percentage growth models. Free browser-based calculator with unit auto-conversion, interactive charts, and cost estimation.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  seo: {
    title: "Data Growth Calculator – Estimate Future Storage Size Online Free",
    description: "Estimate database, storage, backup, and cloud data growth instantly using this free Data Growth Calculator. Forecast future storage requirements with fixed or percentage growth models, interactive charts, CSV export, and real-time calculations.",
    keywords: [
      "data growth calculator",
      "storage growth calculator",
      "database growth calculator",
      "cloud storage calculator",
      "capacity planning calculator",
      "data size estimator",
      "storage forecast tool",
      "backup growth calculator",
      "data projection calculator",
    ],
    openGraph: {
      title: "Free Data Growth Calculator",
      description: "Forecast database, storage, and backup growth using fixed or percentage growth models, with interactive charts and cost estimation — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/data-growth-calculator`,
    },
  },
};
