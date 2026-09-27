export const escalationCostCalculatorConfig = {
  name: "Escalation Cost Calculator",
  slug: "escalation-cost-calculator",
  category: "architecture",
  description: "Calculate construction cost escalation instantly. Estimate future project costs using compound or simple escalation rates with this free online calculator.",
  icon: "📈",
  color: "#058554",
  featured: false,
  keywords: [
    "escalation cost calculator",
    "construction cost increase calculator",
    "project cost escalation",
    "inflation calculator construction",
    "cost growth calculator",
    "construction budget calculator",
    "project cost estimator"
  ],
  seo: {
    title: "Escalation Cost Calculator – Estimate Construction Cost Increase Online",
    description: "Calculate construction cost escalation instantly. Estimate future project costs using compound or simple escalation rates with this free online calculator.",
    keywords: "escalation cost calculator, construction cost increase calculator, project cost escalation, inflation calculator construction, cost growth calculator",
    og: {
      title: "Escalation Cost Calculator – Free Construction Cost Estimator",
      description: "Calculate future project costs with compound or simple escalation rates. Instant results with yearly breakdown.",
      type: "website",
      url: "/tools/architecture/escalation-cost-calculator"
    },
    howToSteps: [
      { name: "Enter the base cost", text: "Type today's estimate for the project, in your own currency." },
      { name: "Set the duration", text: "Enter the number of years until the work is bought or built; fractions such as 2.5 are allowed." },
      { name: "Choose the escalation rate", text: "Enter the expected yearly increase in construction costs, or pick a preset." },
      { name: "Pick compound or simple", text: "Compound applies each year's rate to the escalated cost, which is how cost indices move; simple applies it to the base cost only." },
      { name: "Read the result", text: "See the future cost, the total increase and a year-by-year table you can copy or export as CSV." },
    ],
    faq: [
      { q: "What is cost escalation in construction?", a: "Escalation is the expected rise in the price of labor, materials and equipment between the date of an estimate and the date the work is actually bought or built. Estimators add it so that a budget prepared today still covers the project when it goes to bid or construction." },
      { q: "How do you calculate construction cost escalation?", a: "With compound escalation, future cost = base cost × (1 + rate)^years. A $1,000,000 project escalated at 4% a year for 3 years costs $1,000,000 × 1.04³ = $1,124,864. Simple escalation, base × (1 + rate × years), gives $1,120,000." },
      { q: "What escalation rate should I use?", a: "Base it on a published construction cost index for your region and building type, such as the ENR Building Cost Index or Turner Building Cost Index in the US, or the BCIS indices in the UK. Long-run averages are around 3–5% a year, but rates of 8–14% were seen in 2021–2022, so check the latest figures." },
      { q: "Should I use compound or simple escalation?", a: "Use compound escalation for anything longer than a year: cost indices compound, because each year's increase applies to prices that have already risen. Simple escalation is only a quick approximation for short periods." },
      { q: "Is escalation the same as contingency?", a: "No. Escalation covers the predictable effect of inflation over time. Contingency covers the unknowns in scope, quantities and site conditions. A budget normally carries both as separate lines." },
    ],
  },
  relatedTools: [
    "concrete-volume-calculator",
    "cement-calculator",
    "brick-calculator"
  ]
};
