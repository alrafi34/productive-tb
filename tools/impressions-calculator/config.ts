import { siteConfig } from "@/config/site";

export const impressionsCalculatorConfig = {
  slug: "impressions-calculator",
  name: "Impressions Calculator",
  description: "Calculate estimated advertising and social media impressions using reach × frequency, CPM budget, CTR, or engagement rate. Free browser-based impressions calculator with instant results, export, and calculation history.",
  category: "marketing",
  icon: "👁️",
  free: true,
  seo: {
    title: "Impressions Calculator – Estimate Advertising & Social Media Impressions Online",
    description: "Calculate estimated impressions using reach, frequency, CPM, CTR, advertising budget, and engagement metrics. Free online impressions calculator with instant results, formula explanation, and CSV export.",
    keywords: [
      "impressions calculator",
      "advertising impressions calculator",
      "social media impressions calculator",
      "CPM impressions calculator",
      "reach frequency calculator",
      "estimate impressions",
      "digital marketing calculator",
      "media impressions calculator",
      "marketing impressions tool",
      "online impressions estimator",
      "ctr impressions calculator",
      "engagement impressions calculator",
      "ad impressions estimator",
      "paid media calculator",
    ],
    openGraph: {
      title: "Impressions Calculator – Estimate Ad & Social Media Impressions Free",
      description: "Four calculation modes: Reach × Frequency, CPM Budget, CTR, and Engagement Rate. Instant results, formula steps, export CSV, copy report — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/impressions-calculator`,
    },
  },
};
