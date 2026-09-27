export const retainingWallCalculatorConfig = {
  name: "Retaining Wall Calculator",
  slug: "retaining-wall-calculator",
  category: "architecture",
  description: "Free retaining wall calculator to estimate wall dimensions, soil pressure, and material volume. Fast, accurate, and easy-to-use online tool.",
  icon: "🧱",
  color: "#058554",
  featured: false,
  keywords: [
    "retaining wall calculator",
    "soil pressure calculator",
    "wall design tool",
    "civil engineering calculator",
    "construction calculator",
    "lateral earth pressure",
    "retaining wall design"
  ],
  seo: {
    title: "Retaining Wall Calculator – Earth Pressure & Base",
    description: "Estimate the active earth pressure and lateral force on a retaining wall, a suggested base width, and wall and backfill volumes. Metric or imperial.",
    keywords: "retaining wall calculator, soil pressure calculator, wall design tool, civil engineering calculator, construction calculator",
    og: {
      title: "Retaining Wall Calculator – Free Wall Design Tool",
      description: "Calculate retaining wall dimensions, lateral earth pressure, and material requirements instantly.",
      type: "website",
      url: "/tools/architecture/retaining-wall-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select metric or imperial." },
      { name: "Enter the wall", text: "Type the wall height, length and thickness, or pick a wall preset." },
      { name: "Enter the soil", text: "Type the backfill density, friction angle and backfill slope." },
      { name: "Set the safety factor", text: "Choose 1.5–2.0; it widens the suggested base." },
      { name: "Read the results", text: "See the earth pressure coefficient, lateral force, suggested base width, volumes and stability notes." },
    ],
    faq: [
      { q: "How is the lateral force on a retaining wall calculated?", a: "With Rankine's theory, the active pressure coefficient for level backfill is Ka = tan²(45° − φ/2), and the force per unit length is P = ½ Ka γ H². For φ = 30°, Ka = 0.333; a 2 m wall in 18 kN/m³ soil carries ½ × 0.333 × 18 × 2² = 12 kN per meter of wall." },
      { q: "How wide should the base be?", a: "Rules of thumb give a base 0.5–0.7 times the wall height for cantilever walls, which the calculator uses. The final size comes from checks against sliding, overturning and bearing pressure." },
      { q: "When does a retaining wall need a permit or engineer?", a: "In the US, the IRC and IBC generally require walls over 4 ft (1.2 m), measured from the bottom of the footing, or walls carrying a surcharge such as a driveway, to be designed by an engineer and permitted. Local rules vary." },
      { q: "Why is drainage so important?", a: "Water trapped behind a wall adds hydrostatic pressure, which can double the load. Use free-draining gravel backfill, a perforated drain at the base and weep holes." },
      { q: "What causes retaining walls to fail?", a: "Poor drainage, an undersized base, weak foundation soil, missing reinforcement, frost action and surcharges that were not designed for." },
    ],
  },
  relatedTools: [
    "concrete-volume-calculator",
    "soil-bearing-capacity-calculator",
    "foundation-depth-calculator"
  ]
};
