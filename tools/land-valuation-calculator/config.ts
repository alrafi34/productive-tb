import { siteConfig } from "@/config/site";

export const landValuationCalculatorConfig = {
  name: "Land Valuation Calculator",
  slug: "land-valuation-calculator",
  description: "Estimate total property value instantly using land area, unit price, and optional extra costs. Supports Katha, Acre, Decimal, Sq Ft, Marla, Kanal, and more.",
  category: "land",
  icon: "🏡",
  free: true,
  seo: {
    title: "Land Valuation Calculator – Value from Price per Unit",
    description: "Estimate a plot's value from its area and a price per acre, sq ft, m² or hectare, plus closing costs such as fees and taxes, in your currency.",
    keywords: [
      "land valuation calculator",
      "property value calculator",
      "land price calculator",
      "real estate calculator",
      "katha to land value calculator",
      "acre land calculator",
      "property estimation tool",
      "land worth calculator",
      "marla land calculator",
      "kanal land calculator",
      "property valuation online",
      "land cost estimator",
    ],
    og: {
      title: "Land Valuation Calculator – Estimate Property Value Online",
      description: "Calculate land value instantly using area size, unit price, and extra costs. Supports Katha, Acre, Decimal, Sq Ft, and more.",
      url: `${siteConfig.url}/tools/land/land-valuation-calculator`,
    },
    howToSteps: [
      { name: "Enter the area", text: "Type the land area and choose the unit: square feet, square meters, acres or hectares (regional units are also available)." },
      { name: "Enter the price per unit", text: "Type the local price per unit from comparable sales and choose your currency." },
      { name: "Add extra costs", text: "Optionally add closing costs such as legal fees, title insurance, survey and transfer taxes." },
      { name: "Read the value", text: "See the land value, extra costs and total, and the equivalent price in other units." },
    ],
    faq: [
      { q: "How is land value estimated?", a: "Value = area × price per unit from comparable sales, plus any extra costs to buy it. 2 acres at $45,000 per acre is $90,000; with $4,500 of closing costs the total is $94,500." },
      { q: "Where do I get a price per acre or square foot?", a: "From recent sales of similar land nearby: county records, MLS data, land listing sites, or an appraiser. Asking prices are usually higher than sale prices." },
      { q: "What extra costs should I include?", a: "In the US: title insurance, escrow, survey, recording fees and any transfer tax, often 2–5% of the price. In the UK: Stamp Duty Land Tax, conveyancing and search fees." },
      { q: "Is this the same as an appraisal?", a: "No. A licensed appraiser or RICS valuer considers zoning, access, utilities, topography and market trends. This calculator turns a known price per unit into a total." },
      { q: "Which units are supported?", a: "Square feet, square meters, acres and hectares, plus Decimal, Katha, Bigha, Marla and Kanal for plots measured in South Asian units (their values vary by region)." },
    ],
  },
};
