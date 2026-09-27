export const constructionCostEstimatorConfig = {
  name: "Construction Cost Estimator",
  slug: "construction-cost-estimator",
  category: "architecture",
  description: "Estimate construction costs instantly with area-based pricing, material multipliers, labor rates, and regional adjustments. Free online construction cost calculator for builders and homeowners.",
  icon: "🏗️",
  color: "#058554",
  featured: false,
  keywords: [
    "construction cost estimator",
    "building cost calculator",
    "house construction cost",
    "construction budget calculator",
    "construction cost per sq ft",
    "building cost estimator",
    "construction price calculator"
  ],
  seo: {
    title: "Construction Cost Estimator – Cost per Square Foot",
    description: "Estimate building costs from floor area and cost per sq ft, adjusted for material quality, labor and region, with optional plumbing, electrical and landscaping.",
    keywords: "construction cost estimator, building cost calculator, house construction cost, construction budget calculator, construction cost per sq ft",
    og: {
      title: "Construction Cost Estimator – Free Building Cost Calculator",
      description: "Calculate construction costs with material quality, labor rates, and add-ons. Instant results with detailed breakdown.",
      type: "website",
      url: "/tools/architecture/construction-cost-estimator"
    },
    howToSteps: [
      { name: "Choose the currency", text: "Select USD, EUR, GBP, CAD or AUD; it is guessed from your location." },
      { name: "Enter area and rate", text: "Type the floor area in sq ft and a local cost per sq ft, or start from a preset." },
      { name: "Adjust the multipliers", text: "Set material quality, the labor multiplier and whether the region is low, standard or high cost." },
      { name: "Add extras", text: "Tick plumbing, electrical, interior design or landscaping to add them as a share of the base cost." },
      { name: "Read the estimate", text: "See the total, the cost breakdown and the all-in cost per sq ft, then export it." },
    ],
    faq: [
      { q: "How is the construction cost estimated?", a: "Base cost = area × cost per sq ft, multiplied by the material, labor and region factors, plus the add-ons as a share of the base. 2,000 sq ft × $160 = $320,000; with high-quality materials (1.3×), 1.2× labor and a high-cost region (1.2×) that becomes $599,040, and plumbing and electrical add $38,400." },
      { q: "What does it cost per square foot to build a house?", a: "In the US, NAHB's 2024 Cost of Constructing a Home survey put the construction cost of an average new home at about $162 per sq ft, excluding land, financing and profit. Custom homes and high-cost metro areas often run $250–$400+ per sq ft." },
      { q: "What does the region factor mean?", a: "A simple adjustment for local labor and material prices: 0.9× for low-cost areas, 1.0× standard and 1.2× for high-cost areas. For better accuracy, start from a local cost per sq ft from builders or cost guides such as RSMeans (US) or BCIS (UK)." },
      { q: "What is not included?", a: "Land, site work and utilities connections, permits and impact fees, design fees, financing and contingency. Add 10–15% contingency for new builds and more for renovations." },
      { q: "How accurate is a cost-per-square-foot estimate?", a: "Useful for early budgets, typically within ±20–30%. A detailed quantity take-off and contractor bids are needed before you commit." },
    ],
  },
  relatedTools: [
    "escalation-cost-calculator",
    "concrete-volume-calculator",
    "brick-calculator"
  ]
};
