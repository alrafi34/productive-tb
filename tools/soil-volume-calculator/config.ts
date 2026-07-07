import { siteConfig } from "@/config/site";

export const soilVolumeCalculatorConfig = {
  name: "Soil Volume Calculator",
  slug: "soil-volume-calculator",
  description: "Calculate soil excavation and fill volume for construction, landscaping, and earthwork projects. Supports rectangular, circular, trench, and triangular shapes.",
  category: "land",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Soil Volume Calculator – Free Excavation & Earthwork Volume Tool",
    description: "Calculate soil excavation volume instantly for construction, landscaping, trenches, and earthwork projects. Free online soil volume calculator with unit conversion.",
    keywords: [
      "soil volume calculator",
      "excavation calculator",
      "earthwork calculator",
      "soil excavation calculator",
      "construction volume calculator",
      "fill dirt calculator",
      "trench volume calculator",
      "cubic meter calculator",
      "excavation volume estimator",
    ],
    og: {
      title: "Soil Volume Calculator – Free Excavation & Earthwork Volume Tool",
      description: "Calculate soil excavation volume instantly for construction, landscaping, trenches, and earthwork projects. Free online soil volume calculator with unit conversion.",
      url: `${siteConfig.url}/tools/land/soil-volume-calculator`,
    },
  },
};
