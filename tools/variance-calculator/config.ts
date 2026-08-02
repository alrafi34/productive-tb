import { siteConfig } from "@/config/site";

export const varianceCalculatorConfig = {
  slug: "variance-calculator",
  name: "Variance Calculator",
  description: "Calculate population and sample variance of any dataset instantly, with mean, standard deviation, and full step-by-step breakdowns — free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  seo: {
    title: "Free Variance Calculator Online – Calculate Population & Sample Variance Instantly",
    description: "Calculate population variance, sample variance, standard deviation, mean, range, minimum, maximum, and other descriptive statistics instantly online. Free, fast, accurate, and works entirely in your browser.",
    keywords: [
      "variance calculator",
      "population variance calculator",
      "sample variance calculator",
      "standard deviation calculator",
      "statistics calculator",
      "mean variance calculator",
      "online variance calculator",
      "descriptive statistics calculator",
      "data variance calculator",
      "statistics tool",
    ],
    openGraph: {
      title: "Free Variance Calculator Online",
      description: "Calculate population and sample variance of any dataset instantly, with step-by-step breakdowns — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/variance-calculator`,
    },
  },
};
