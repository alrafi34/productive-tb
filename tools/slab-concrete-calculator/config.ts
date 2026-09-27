export const slabConcreteCalculatorConfig = {
  name: "Slab Concrete Calculator",
  slug: "slab-concrete-calculator",
  description: "Calculate concrete volume for slabs with unit conversion, cost estimation, and instant results. Free online slab calculator for construction projects.",
  category: "architecture",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Slab Concrete Calculator – Cubic Yards, m³ & Cost",
    description: "Calculate concrete for rectangular, round, triangular and L-shaped slabs in cubic yards, cubic feet and m³, with the cost at your price per yard or m³.",
    keywords: [
      "slab concrete calculator",
      "concrete volume calculator",
      "construction calculator",
      "cement slab calculation",
      "how much concrete needed",
      "slab calculator",
      "concrete estimator",
      "building materials calculator",
      "concrete slab volume",
      "construction volume calculator"
    ],
    openGraph: {
      title: "Advanced Slab Concrete Calculator – Estimate Concrete Volume Instantly",
      description: "Calculate concrete volume for slabs with instant results and accurate formulas.",
      type: "website",
      url: "/tools/architecture/slab-concrete-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Pick the slab shape", text: "Choose rectangular, circular, triangular or L-shaped and enter its dimensions." },
      { name: "Set the thickness", text: "Enter the thickness or pick a preset such as 4 in, 6 in, 10 cm or 15 cm." },
      { name: "Add the price", text: "Optionally turn on cost estimation and enter the price per cubic yard or m³ and your currency." },
      { name: "Read the volume", text: "See the volume in m³, cubic feet and cubic yards, the slab area and the cost." },
    ],
    faq: [
      { q: "How much concrete do I need for a 10 × 10 slab?", a: "A 10 × 10 ft slab 4 in thick is 33.3 cu ft, or 1.23 cubic yards; order about 1.4 yd³. In metric, a 3 × 3 m slab 100 mm thick is 0.9 m³." },
      { q: "How thick should a concrete slab be?", a: "4 in (100 mm) for patios, walkways and house floors on grade, 5–6 in (125–150 mm) for driveways and garages, and 6 in or more with reinforcement for heavy vehicles. Local codes and the soil can require more." },
      { q: "How do I calculate an L-shaped or round slab?", a: "Split an L-shape into two rectangles and add them. For a round slab, area = π × radius²; a 12 ft diameter circle 4 in thick is π × 6² × 0.333 = 37.7 cu ft, or 1.4 yd³." },
      { q: "How much does concrete cost?", a: "In the US, ready-mix is typically about $150–$200 per cubic yard delivered in 2024, plus short-load and pumping fees; in the UK and Europe roughly £100–£150 or €110–€160 per m³. Enter your local quote for an accurate total." },
      { q: "How much extra should I order?", a: "5–10% more than the calculated volume for uneven subgrade, form movement and spillage. For small pours, suppliers charge a short-load fee under a minimum, often 3–4 yd³." },
    ],
  },
  features: [
    "Real-time volume calculations",
    "Unit conversion (m, ft, in)",
    "Multiple volume units (m³, ft³, yd³)",
    "Cost estimation",
    "Thickness presets",
    "Calculation history",
    "Export to CSV and text",
    "Mobile responsive"
  ]
};
