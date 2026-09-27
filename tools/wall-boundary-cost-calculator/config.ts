import { siteConfig } from "@/config/site";

export const wallBoundaryCostCalculatorConfig = {
  name: "Wall Boundary Cost Calculator",
  slug: "wall-boundary-cost-calculator",
  description: "Estimate the total cost of building a boundary wall. Calculate material, labor, plaster, gate, and total construction cost instantly.",
  category: "land",
  icon: "🧱",
  free: true,
  seo: {
    title: "Boundary Wall Cost Calculator – Garden & Perimeter Walls",
    description: "Estimate the cost of a boundary, garden or perimeter wall from its length and height, material and labor rates per sq ft, plus finishing and a gate.",
    keywords: [
      "wall boundary cost calculator",
      "boundary wall estimate",
      "wall construction cost calculator",
      "property wall calculator",
      "land boundary wall cost",
      "compound wall cost estimator",
      "boundary wall budget calculator",
      "construction cost estimator",
    ],
    og: {
      title: "Wall Boundary Cost Calculator – Estimate Boundary Wall Construction Cost",
      description: "Calculate the estimated cost of building a boundary wall instantly. Estimate material, labor, plaster, gate, and total construction cost online for free.",
      url: `${siteConfig.url}/tools/land/wall-boundary-cost-calculator`,
    },
    howToSteps: [
      { name: "Enter the wall size", text: "Type the boundary length and wall height in feet or meters." },
      { name: "Choose the thickness", text: "Pick the wall thickness, from a single wythe of brick to a heavy 12 in wall." },
      { name: "Enter the rates", text: "Type the material and labor cost per square foot of wall, in your currency." },
      { name: "Add extras", text: "Add rendering or finishing, a gate and any other costs." },
      { name: "Read the estimate", text: "See the wall area, the cost breakdown and the total." },
    ],
    faq: [
      { q: "How is the cost of a boundary wall worked out?", a: "Wall area = length × height; material and labor = area × their rates per square foot; then add finishing, gates and extras. A 100 ft wall 6 ft high is 600 sq ft; at $18/sq ft materials and $15/sq ft labor it costs $19,800 before extras." },
      { q: "How much does a brick or block wall cost?", a: "In the US, brick or block garden walls typically cost about $20–$50 per square foot of wall face installed, more for stone veneer or decorative brick. In the UK, a brick garden wall costs roughly £200–£400 per m² installed." },
      { q: "What foundation does a garden wall need?", a: "A concrete footing below the frost line and usually twice the wall's width; taller walls need reinforcement and engineering. Walls over about 4 ft often need a permit in the US." },
      { q: "Should I add a contingency?", a: "Yes, 10–20% for foundations, retaining sections, difficult access and price changes." },
      { q: "Wall or fence?", a: "A masonry wall costs several times more than a wood or vinyl fence but lasts decades with little maintenance. Use the fence calculator to compare." },
    ],
  },
};
