import { siteConfig } from "@/config/site";

export const modeCalculatorConfig = {
  slug: "mode-calculator",
  name: "Mode Calculator",
  description: "Calculate the mode (most frequent value) of any dataset instantly. Supports numbers and text, detects multiple modes and no-mode cases, and generates frequency tables and charts — free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  seo: {
    title: "Free Mode Calculator Online – Find the Most Frequent Value Instantly",
    description: "Calculate the mode of any dataset instantly with this free online Mode Calculator. Supports numbers and text, detects multiple modes, generates frequency tables, charts, and downloadable reports. Works entirely in your browser.",
    keywords: [
      "mode calculator",
      "find mode",
      "statistics calculator",
      "most frequent value",
      "statistics tool",
      "online mode calculator",
      "frequency calculator",
      "data analysis tool",
      "free statistics calculator",
      "math calculator",
    ],
    openGraph: {
      title: "Free Mode Calculator Online",
      description: "Find the most frequent value in any dataset instantly, with frequency tables and charts — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/mode-calculator`,
    },
  },
};
