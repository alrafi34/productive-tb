import { siteConfig } from "@/config/site";

export const rainwaterRunoffCalculatorConfig = {
  name: "Rainwater Runoff Calculator",
  slug: "rainwater-runoff-calculator",
  category: "land",
  description: "Calculate rainwater runoff volume from rainfall, land area, and surface type. Estimate stormwater runoff, drainage needs, and rainwater collection potential online for free.",
  icon: "🌧️",
  free: true,
  seo: {
    title: "Free Rainwater Runoff Calculator – Estimate Water Runoff Online",
    description: "Calculate rainwater runoff instantly using rainfall, land area, and surface type. Estimate stormwater runoff, drainage needs, and rainwater collection online for free.",
    keywords: [
      "rainwater runoff calculator",
      "stormwater runoff calculator",
      "runoff estimation tool",
      "water runoff estimator",
      "drainage calculator",
      "rainwater harvesting calculator",
      "surface runoff calculator",
      "runoff coefficient calculator",
      "rainfall runoff calculator",
      "stormwater management tool",
    ],
    og: {
      title: "Free Rainwater Runoff Calculator – Estimate Water Runoff Online",
      description: "Calculate rainwater runoff instantly using rainfall, land area, and surface type. Estimate stormwater runoff, drainage needs, and rainwater collection online for free.",
      url: `${siteConfig.url}/tools/land/rainwater-runoff-calculator`,
    },
  },
};
