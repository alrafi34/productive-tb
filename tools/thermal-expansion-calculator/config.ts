import { siteConfig } from "@/config/site";

export const thermalExpansionCalculatorConfig = {
  name: "Thermal Expansion Calculator",
  slug: "thermal-expansion-calculator",
  description:
    "Calculate linear, area, and volumetric thermal expansion for steel, aluminum, copper, concrete, and more. Supports metric and imperial units with real-time results.",
  category: "mechanical",
  icon: "🌡️",
  free: true,
  seo: {
    title: "Thermal Expansion Calculator – Calculate Heat Expansion Online",
    description:
      "Calculate thermal expansion instantly for steel, aluminum, copper, concrete, and more. Free online thermal expansion calculator with formulas, unit conversion, and engineering breakdowns.",
    keywords: [
      "thermal expansion calculator",
      "heat expansion calculator",
      "linear expansion calculator",
      "thermal coefficient calculator",
      "engineering calculator",
      "material expansion calculator",
      "temperature expansion tool",
      "coefficient of thermal expansion",
      "volumetric expansion calculator",
      "area expansion calculator",
      "steel thermal expansion",
      "aluminum thermal expansion",
    ],
    og: {
      title: "Free Thermal Expansion Calculator",
      description:
        "Calculate material expansion due to temperature changes instantly with formulas and engineering explanations.",
      url: `${siteConfig.url}/tools/mechanical/thermal-expansion-calculator`,
    },
  },
  relatedTools: [
    "heat-transfer-calculator",
    "thermal-stress-calculator",
    "specific-heat-calculator",
    "stress-calculator",
    "young's-modulus-calculator",
    "reynolds-number-calculator",
  ],
};
