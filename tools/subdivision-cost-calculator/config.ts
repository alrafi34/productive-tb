import { siteConfig } from "@/config/site";

export const subdivisionCostCalculatorConfig = {
  name: "Subdivision Cost Calculator",
  slug: "subdivision-cost-calculator",
  description: "Estimate the total cost of subdividing land into multiple plots. Calculate surveying, legal fees, permits, utilities, roads, drainage, and cost per plot instantly.",
  category: "land",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Subdivision Cost Calculator – Estimate Land Division Cost Online",
    description: "Estimate subdivision costs instantly with our free Subdivision Cost Calculator. Calculate legal fees, permits, surveying, utilities, roads, and cost per plot online.",
    keywords: [
      "subdivision cost calculator",
      "land subdivision calculator",
      "property subdivision cost",
      "land division estimator",
      "real estate development calculator",
      "plot subdivision cost",
      "subdivision budget estimator",
      "land development cost calculator",
    ],
    og: {
      title: "Subdivision Cost Calculator – Estimate Land Division Cost Online",
      description: "Estimate subdivision costs instantly with our free Subdivision Cost Calculator. Calculate legal fees, permits, surveying, utilities, roads, and cost per plot online.",
      url: `${siteConfig.url}/tools/land/subdivision-cost-calculator`,
    },
  },
};
