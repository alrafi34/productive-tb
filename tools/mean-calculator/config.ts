import { siteConfig } from "@/config/site";

export const meanCalculatorConfig = {
  slug: "mean-calculator",
  name: "Mean Calculator",
  description: "Calculate the arithmetic mean (average) of any dataset instantly. Supports decimals, negative numbers, CSV/TXT uploads, large datasets, and detailed statistics — free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  seo: {
    title: "Free Mean Calculator Online – Calculate Average Instantly",
    description: "Calculate the arithmetic mean (average) of any dataset instantly. Supports decimals, negative numbers, CSV uploads, large datasets, real-time calculations, and detailed statistics. Free online Mean Calculator.",
    keywords: [
      "mean calculator",
      "average calculator",
      "arithmetic mean calculator",
      "calculate mean online",
      "statistics calculator",
      "average finder",
      "dataset mean",
      "math calculator",
      "free mean calculator",
      "online average calculator",
    ],
    openGraph: {
      title: "Free Mean Calculator Online",
      description: "Calculate the arithmetic mean of any dataset instantly, with count, sum, min, max, and range — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/mean-calculator`,
    },
  },
};
