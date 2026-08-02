import { siteConfig } from "@/config/site";

export const zScoreCalculatorConfig = {
  slug: "z-score-calculator",
  name: "Z-Score Calculator",
  description: "Calculate the Z-score (standard score) of a value relative to a mean and standard deviation, or reverse-calculate a value from a target Z-score — free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  seo: {
    title: "Free Z-Score Calculator Online – Calculate Standard Score Instantly",
    description: "Calculate Z-scores instantly using the standard score formula. Enter a value, mean, and standard deviation to determine how many standard deviations a value is above or below the average. Free, accurate, mobile-friendly, and works entirely in your browser.",
    keywords: [
      "z score calculator",
      "standard score calculator",
      "calculate z score",
      "statistics calculator",
      "normal distribution calculator",
      "z value calculator",
      "z score formula",
      "statistics tool",
      "free z score calculator",
      "online z score calculator",
    ],
    openGraph: {
      title: "Free Z-Score Calculator Online",
      description: "Calculate how many standard deviations a value is from the mean, with reverse calculation and interpretation guide — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/z-score-calculator`,
    },
  },
};
