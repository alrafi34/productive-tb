import { siteConfig } from "@/config/site";

export const excavationCostCalculatorConfig = {
  name: "Excavation Cost Calculator",
  slug: "excavation-cost-calculator",
  description: "Estimate excavation and digging costs for foundations, trenches, ponds, and land leveling. Includes soil type multipliers, labor, equipment, and transport costs.",
  category: "land",
  icon: "💰",
  free: true,
  seo: {
    title: "Excavation Cost Calculator – Digging Cost per Cubic Yard",
    description: "Estimate excavation cost from the dig size, rate per cubic yard or m³ and soil type, with optional labor, equipment and hauling, in $, €, £ and more.",
    keywords: [
      "excavation cost calculator",
      "digging cost calculator",
      "land excavation calculator",
      "foundation excavation estimate",
      "earthwork calculator",
      "construction digging cost",
      "trench excavation cost",
      "excavation estimate tool",
    ],
    og: {
      title: "Free Excavation Cost Calculator – Estimate Digging Cost Online",
      description: "Calculate excavation and digging costs instantly. Estimate land excavation, trenching, foundation digging, and soil removal costs with real-time calculations.",
      url: `${siteConfig.url}/tools/land/excavation-cost-calculator`,
    },
    howToSteps: [
      { name: "Choose units and currency", text: "Select feet or meters for the dimensions, cubic yards, cubic feet or cubic meters for the volume, and your currency." },
      { name: "Enter the dimensions", text: "Type the length, width and depth of the excavation." },
      { name: "Enter the rate and soil", text: "Type your contractor's excavation rate per unit of volume and pick the soil type, which applies a difficulty multiplier." },
      { name: "Add other costs", text: "Optionally add labor days and day rate, equipment hours and hourly rate, and a flat transport or disposal cost." },
      { name: "Read the estimate", text: "See the volume, the excavation cost and the total with a breakdown." },
    ],
    faq: [
      { q: "How is excavation cost calculated?", a: "Cost = volume × rate × soil multiplier, plus any labor, equipment and hauling. A 30 ft × 40 ft × 3 ft dig is 3,600 cu ft, or 133.3 cu yd; at $10 per cu yd that is $1,333, or $1,533 in clay (× 1.15)." },
      { q: "What does excavation cost per cubic yard?", a: "Contractor rates vary widely by region, access and job size. As a rough guide, easy soil costs much less per cubic yard than clay, and rock can cost several times more. Enter the rate from your own quotes." },
      { q: "Why does soil type change the cost?", a: "Harder or stickier ground takes longer and needs heavier equipment. The calculator multiplies the base cost by 1.00 for loose soil, 1.10 for sand, 1.15 for clay, 1.20 for gravel, 1.25 for mixed soil and 1.80 for rock." },
      { q: "How do I convert cubic feet to cubic yards?", a: "Divide by 27. 3,600 cu ft ÷ 27 = 133.3 cu yd. One cubic meter is 35.31 cu ft, or 1.308 cu yd." },
      { q: "Should I add labor separately?", a: "Only if your contractor quotes it separately. If the rate per cubic yard already includes the crew, leave labor blank so it is not counted twice." },
      { q: "Does the estimate include swell?", a: "No. Excavated soil bulks up by roughly 10–40%, so haul-away volume is larger than the hole. Allow for this in the transport cost." },
    ],
  },
};
