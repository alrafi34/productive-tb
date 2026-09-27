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
    title: "Soil Compaction Calculator – Relative Compaction %",
    description:
      "Calculate relative compaction from field dry density and Proctor maximum dry density, in g/cm³, kg/m³ or lb/ft³, and check it against a 90–100% spec.",
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
      title: "Soil Compaction Calculator – Relative Compaction %",
      description:
        "Calculate relative compaction from field dry density and Proctor maximum dry density, in g/cm³, kg/m³ or lb/ft³, and check it against a 90–100% spec.",
      url: `${siteConfig.url}/tools/land/soil-compaction-ratio-calculator`,
    },
    howToSteps: [
      { name: "Choose the density unit", text: "Select g/cm³, kg/m³ or lb/ft³." },
      { name: "Choose the required standard", text: "Pick the specified compaction: 90%, 92%, 95%, 98% or 100%." },
      { name: "Enter the field dry density", text: "Type the dry density measured on site, for example with a nuclear gauge or sand cone test." },
      { name: "Enter the maximum dry density", text: "Type the maximum dry density from the laboratory Proctor test." },
      { name: "Read the result", text: "See the relative compaction, whether it passes the standard, and the calculation steps." },
    ],
    faq: [
      { q: "What is relative compaction?", a: "The field dry density divided by the laboratory maximum dry density, as a percentage. A field density of 1.75 g/cm³ against a maximum of 1.85 g/cm³ is 1.75 ÷ 1.85 = 94.6%, which just misses a 95% spec." },
      { q: "Why is 95% the most common specification?", a: "95% of Standard or Modified Proctor maximum dry density is a common requirement under slabs, pavements and structural fill, because it gives stable ground and is achievable with normal rollers. Landscape areas often need only 85–90%." },
      { q: "What if the field density is above the maximum?", a: "A result over 100% usually means a test error or that the soil on site differs from the lab sample. Check the readings and whether the Proctor test used representative material." },
      { q: "Standard or Modified Proctor?", a: "Modified Proctor (ASTM D1557) uses more compaction energy than Standard Proctor (ASTM D698), so it gives a higher maximum density. Use the test your specification names." },
      { q: "Which density units can I use?", a: "g/cm³, kg/m³ and lb/ft³. 1 g/cm³ = 1,000 kg/m³ = 62.43 lb/ft³. The ratio is the same whichever unit you use, as long as both densities are in the same unit." },
    ],
  },
  relatedTools: [
    "land-leveling-calculator",
    "earth-filling-calculator",
    "soil-volume-calculator",
    "excavation-cost-calculator",
  ],
};
