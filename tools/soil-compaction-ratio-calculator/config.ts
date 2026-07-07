import { siteConfig } from "@/config/site";

export const soilCompactionRatioCalculatorConfig = {
  name: "Soil Compaction Ratio Calculator",
  slug: "soil-compaction-ratio-calculator",
  category: "land",
  description:
    "Calculate soil compaction ratio (relative compaction) instantly using field dry density and maximum dry density from Proctor test. Free online tool for civil engineers and earthwork projects.",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Soil Compaction Ratio Calculator – Calculate Relative Compaction Online",
    description:
      "Free Soil Compaction Ratio Calculator for civil engineering and earthwork projects. Calculate compaction efficiency instantly using field dry density and maximum dry density.",
    keywords: [
      "soil compaction ratio calculator",
      "relative compaction calculator",
      "soil density calculator",
      "compaction efficiency calculator",
      "earthwork calculator",
      "field density calculator",
      "civil engineering calculator",
      "proctor test calculator",
      "compaction percentage calculator",
    ],
    og: {
      title: "Soil Compaction Ratio Calculator – Free Engineering Tool",
      description:
        "Calculate soil compaction ratio instantly. Compare field dry density with maximum dry density for quality control.",
      url: `${siteConfig.url}/tools/land/soil-compaction-ratio-calculator`,
    },
  },
  relatedTools: [
    "land-leveling-calculator",
    "earth-filling-calculator",
    "soil-volume-calculator",
    "excavation-cost-calculator",
  ],
};
