import { siteConfig } from "@/config/site";

export const subdivisionCostCalculatorConfig = {
  name: "Subdivision Cost Calculator",
  slug: "subdivision-cost-calculator",
  description: "Estimate the total cost of subdividing land into multiple plots. Calculate surveying, legal fees, permits, utilities, roads, drainage, and cost per plot instantly.",
  category: "land",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Land Subdivision Cost Calculator – Cost per Lot",
    description: "Estimate what it costs to subdivide land: survey, legal, permits, utilities, roads and drainage, with the total and cost per lot. Enter your own local rates.",
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
      title: "Land Subdivision Cost Calculator – Cost per Lot",
      description: "Estimate what it costs to subdivide land: survey, legal, permits, utilities, roads and drainage, with the total and cost per lot. Enter your own local rates.",
      url: `${siteConfig.url}/tools/land/subdivision-cost-calculator`,
    },
    howToSteps: [
      { name: "Enter the land", text: "Type the total land size, choose the unit and enter the number of plots." },
      { name: "Add professional costs", text: "Enter surveying, legal and permit or approval costs." },
      { name: "Add infrastructure", text: "Enter utility installation, road construction, drainage and any other costs." },
      { name: "Read the totals", text: "See the total cost, cost per plot and land per plot in your currency, then export them." },
    ],
    faq: [
      { q: "How much does it cost to subdivide land in the US?", a: "A simple split of one lot into two or three may cost $5,000–$30,000 in survey, engineering, legal and permit fees. A subdivision with new roads and utilities typically costs $20,000–$100,000+ per lot, depending on the site and local requirements." },
      { q: "What is usually the most expensive part?", a: "Infrastructure: roads, water and sewer mains, storm drainage and power. Where lots can connect to existing streets and utilities, costs are far lower." },
      { q: "How is cost per plot calculated?", a: "Total subdivision cost ÷ number of plots. A $360,000 project creating 12 lots costs $30,000 per lot, before the land itself." },
      { q: "Do I need a surveyor?", a: "Yes. A licensed land surveyor prepares the plat or plan that defines the new lots; the local planning authority must approve it before lots can be sold separately." },
      { q: "How long does subdivision approval take?", a: "Minor partitions can be approved in 1–3 months; major subdivisions with public hearings, engineering review and road construction often take 6–18 months." },
    ],
  },
};
