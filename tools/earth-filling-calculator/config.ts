import { siteConfig } from "@/config/site";

export const earthFillingCalculatorConfig = {
  name: "Earth Filling Calculator",
  slug: "earth-filling-calculator",
  description: "Calculate earth fill material volume for construction, land filling, ponds, and foundations. Includes compaction adjustment, truckload estimation, and cost calculation.",
  category: "land",
  icon: "🚜",
  free: true,
  seo: {
    title: "Fill Dirt Calculator – Cubic Yards & Truckloads",
    description: "Calculate how much fill dirt or earth fill you need, in cubic yards, cubic feet or m³, with a compaction allowance, truckloads and cost in your currency.",
    keywords: [
      "earth filling calculator",
      "fill material calculator",
      "soil fill calculator",
      "construction fill calculator",
      "land filling calculator",
      "earthwork volume calculator",
      "excavation fill estimate",
      "truckload calculator",
      "fill dirt calculator",
    ],
    og: {
      title: "Earth Filling Calculator – Calculate Fill Material Volume Instantly",
      description: "Calculate earth fill material required for construction, land filling, ponds, and foundations. Estimate cubic feet, cubic meters, truckloads, and cost instantly.",
      url: `${siteConfig.url}/tools/land/earth-filling-calculator`,
    },
    howToSteps: [
      { name: "Choose the units", text: "Select the input unit and whether results are in cubic yards, cubic feet or cubic meters." },
      { name: "Pick the area shape", text: "Choose rectangle, circle or a custom area and enter its dimensions and the fill depth." },
      { name: "Set compaction and soil", text: "Choose a compaction factor and soil type; loose fill settles when compacted." },
      { name: "Add truck size and price", text: "Optionally enter the truck capacity and the price per unit with your currency." },
      { name: "Read the order", text: "See the compacted and loose volume, truckloads and estimated cost." },
    ],
    faq: [
      { q: "How much fill dirt do I need?", a: "Area × depth, then add for compaction. A 50 × 30 ft area filled 1 ft deep is 1,500 cu ft = 55.6 cubic yards; with a 1.25 compaction factor, order about 69 cubic yards." },
      { q: "What is a compaction factor?", a: "Loose fill contains air that is squeezed out when it is rolled or settles. A factor of 1.2–1.3 is typical for common fill, meaning you order 20–30% more loose material than the finished volume." },
      { q: "How many cubic yards are in a dump truck?", a: "A standard tandem dump truck carries about 10–14 cubic yards (7.6–10.7 m³); a tri-axle 16–18 yd³. Heavy, wet soil may limit loads by weight before volume." },
      { q: "Fill dirt, topsoil or structural fill?", a: "Fill dirt is subsoil for raising grade; topsoil is for lawns and gardens; structural or select fill under buildings and slabs must be engineered and compacted in lifts, often to 95% of Proctor density." },
      { q: "How do I convert cubic feet to cubic yards?", a: "Divide by 27. 1 cubic yard = 27 cu ft = 0.765 m³." },
    ],
  },
};
