import { siteConfig } from "@/config/site";

export const mapScaleCalculatorConfig = {
  name: "Map Scale Calculator",
  slug: "map-scale-calculator",
  description: "Convert map measurements to real-world distances using map scale ratios. Supports 1:1000, 1:50000, and all common survey scales with multi-unit conversion.",
  category: "land",
  icon: "🗺️",
  free: true,
  seo: {
    title: "Free Map Scale Calculator – Convert Map Distance to Real Distance",
    description: "Calculate real-world distance from map scale instantly. Convert map measurements using scales like 1:1000, 1:50000, and more with this free online map scale calculator.",
    keywords: [
      "map scale calculator",
      "map distance calculator",
      "real distance calculator",
      "land survey calculator",
      "survey scale calculator",
      "map ratio calculator",
      "convert map scale",
      "distance scale converter",
      "map measurement tool",
      "cartography calculator",
      "GIS distance calculator",
      "topographic map scale",
    ],
    og: {
      title: "Free Map Scale Calculator – Convert Map Distance to Real Distance",
      description: "Calculate real-world distance from map scale instantly. Convert map measurements using scales like 1:1000, 1:50000, and more.",
      url: `${siteConfig.url}/tools/land/map-scale-calculator`,
    },
  },
};
