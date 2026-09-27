import { siteConfig } from "@/config/site";

export const landDevelopmentCostCalculatorConfig = {
  name: "Land Development Cost Calculator",
  slug: "land-development-cost-calculator",
  description: "Calculate total land development cost instantly. Estimate road, utility, legal, labor, drainage, and infrastructure expenses with a free online calculator.",
  category: "land",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Land Development Cost Calculator – Site Budget",
    description: "Add up land, roads, site prep, drainage, utilities, permits, engineering, labor and materials, with contingency and tax, and see cost per acre or sq ft.",
    keywords: [
      "land development cost calculator",
      "property development calculator",
      "land valuation tool",
      "construction land cost calculator",
      "site development cost estimate",
      "land development budget",
      "real estate development cost",
      "infrastructure cost calculator",
    ],
    og: {
      title: "Land Development Cost Calculator – Site Budget",
      description: "Add up land, roads, site prep, drainage, utilities, permits, engineering, labor and materials, with contingency and tax, and see cost per acre or sq ft.",
      url: `${siteConfig.url}/tools/land/land-development-cost-calculator`,
    },
    howToSteps: [
      { name: "Enter the land area", text: "Type the site area and choose square feet, square meters, acres or hectares, and pick your currency." },
      { name: "Enter the land cost", text: "Type the purchase price of the land, if it is part of the budget." },
      { name: "Add infrastructure costs", text: "Fill in roads, site preparation, drainage, water, electricity and sewer." },
      { name: "Add soft and build costs", text: "Fill in permits and legal fees, survey and engineering, labor and materials, and add custom rows for anything else." },
      { name: "Set contingency and tax", text: "Use the sliders for contingency and for the sales tax or VAT rate that applies to you." },
      { name: "Read the total", text: "See the base cost, contingency, tax, total and cost per area unit, and save scenarios to compare." },
    ],
    faq: [
      { q: "How is the total development cost calculated?", a: "Total = base cost + base × contingency % + base × tax %, where the base cost is the sum of every line. The residential preset adds up to $166,000; with 10% contingency ($16,600) and 5% tax ($8,300) the total is $190,900, or $19.09 per sq ft on 10,000 sq ft." },
      { q: "How much contingency should I allow?", a: "About 10% is common for straightforward sites, and 15–20% for large, complex or poorly surveyed sites where ground conditions, permit delays or price rises are more likely." },
      { q: "What tax rate should I use?", a: "Whatever applies to your costs where you build: sales tax on materials in much of the US, VAT in the UK and EU (often recoverable for businesses), or 0 if your quotes already include it. The rate is an input, not a fixed value." },
      { q: "What is the difference between base cost and total cost?", a: "Base cost is the sum of the direct costs you enter. Total cost adds the contingency allowance and tax on top." },
      { q: "Can I compare scenarios?", a: "Yes. Give a result a name and save it; up to 10 scenarios are stored in your browser and can be loaded again or compared." },
      { q: "How accurate is the estimate?", a: "It is only as good as the figures you enter. Use contractor and utility quotes, local permit fee schedules and a site survey before committing to a budget." },
    ],
  },
};
