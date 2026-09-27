export const materialCostCalculatorConfig = {
  name: "Material Cost Calculator",
  slug: "material-cost-calculator",
  category: "architecture",
  description: "Free material cost calculator for construction and engineering projects. Instantly estimate total costs, add wastage, and export results. Works fully in browser.",
  icon: "📦",
  color: "#058554",
  featured: false,
  keywords: [
    "material cost calculator",
    "construction cost estimator",
    "building material calculator",
    "construction budgeting tool",
    "online cost calculator",
    "material quantity calculator",
    "construction material estimator"
  ],
  seo: {
    title: "Construction Material Cost Calculator",
    description: "List building materials with quantity, unit price and waste, add overhead and get the total cost in $, €, £, CA$ or A$. Export the list as CSV.",
    keywords: "material cost calculator, construction cost estimator, building material calculator, construction budgeting tool, online cost calculator",
    og: {
      title: "Material Cost Calculator – Free Construction Material Estimator",
      description: "Calculate material costs with quantity, unit price, and wastage. Instant results with detailed breakdown.",
      type: "website",
      url: "/tools/architecture/material-cost-calculator"
    },
    howToSteps: [
      { name: "Choose the currency", text: "Select USD, EUR, GBP, CAD or AUD; it is guessed from your location." },
      { name: "Add each material", text: "Enter the name, quantity, unit (bags, tons, m³, ft², pieces…) and unit price, or start from a preset." },
      { name: "Set the waste", text: "Enter a waste percentage for each material, such as 5% for concrete or 10% for tiles." },
      { name: "Add overhead", text: "Enter any fixed overhead such as delivery, equipment or permits." },
      { name: "Read the total", text: "See each material's cost, the waste added, the overhead and the total, then export it." },
    ],
    faq: [
      { q: "How is the material cost calculated?", a: "For each item, cost = quantity × unit price, and waste adds cost × waste %. The total is the sum of all items plus overhead. 20 m³ of concrete at $150/m³ with 5% waste costs $3,000 + $150 = $3,150." },
      { q: "How much waste should I allow?", a: "Typical allowances are 5–10% for concrete and drywall, 10% for lumber, 10–15% for tile, flooring and siding, and up to 20% for complex cuts or patterns." },
      { q: "Does this include labor?", a: "No. It covers materials and whatever overhead you add. Use the labor cost calculator for crews and wages, and add both for a full estimate." },
      { q: "Where do I get unit prices?", a: "From supplier quotes for your area. Prices change often, so date your estimate; published indices such as the US Producer Price Index for construction materials or the UK BCIS show how fast they are moving." },
      { q: "Which currencies are supported?", a: "US dollars, euros, pounds, Canadian dollars and Australian dollars. The maths is the same in every currency, so any other currency works if you ignore the symbol." },
    ],
  },
  relatedTools: [
    "construction-cost-estimator",
    "concrete-volume-calculator",
    "brick-calculator"
  ]
};
