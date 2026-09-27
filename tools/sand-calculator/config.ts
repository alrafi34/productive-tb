export const sandCalculatorConfig = {
  name: "Sand Calculator",
  slug: "sand-calculator",
  description: "Free online sand calculator to estimate sand required for construction, concrete mixing, plastering, and brickwork. Get instant results with accurate formulas.",
  category: "architecture",
  icon: "🏖️",
  free: true,
  seo: {
    title: "Sand Calculator – Cubic Yards, Tons & m³",
    description: "Work out how much sand you need for a sandbox, base layer, concrete mix or plaster, in cubic feet, cubic yards, cubic meters and tons.",
    keywords: [
      "sand calculator",
      "construction sand calculation",
      "how much sand needed",
      "concrete mix calculator",
      "plaster sand calculator",
      "sand quantity calculator",
      "building materials estimator",
      "sand volume calculator",
      "construction calculator",
      "sand estimation tool"
    ],
    openGraph: {
      title: "Sand Calculator – Estimate Sand for Construction & Concrete Instantly",
      description: "Calculate sand requirements for construction projects with accurate formulas and instant results.",
      type: "website",
      url: "/tools/architecture/sand-calculator"
    },
    howToSteps: [
      { name: "Choose the mode", text: "Pick area (length × width × depth), concrete mix or plaster." },
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Enter the size", text: "Type the length, width and depth, the concrete volume and mix ratio, or the plaster area and thickness in inches." },
      { name: "Read the quantity", text: "See the sand needed in cubic meters, cubic feet and cubic yards, with the approximate weight in tonnes and US tons." },
    ],
    faq: [
      { q: "How much sand do I need for an area?", a: "Volume = length × width × depth. A 10 ft × 10 ft area 2 in deep needs 10 × 10 × (2 ÷ 12) = 16.7 cu ft, which is 0.62 cubic yards or 0.47 m³." },
      { q: "How much does sand weigh?", a: "Dry sand weighs about 100 lb per cubic foot (1,600 kg/m³), so a cubic yard is about 1.35 US tons and a cubic meter about 1.6 metric tonnes. Wet sand is heavier." },
      { q: "How much sand is in a cubic meter of concrete?", a: "For a 1:2:4 mix, sand = 1.54 × 2 ÷ 7 = 0.44 m³ per cubic meter of concrete, where 1.54 allows for voids in the dry materials. The same ratio gives 0.44 cubic yards (about 11.9 cu ft) of sand per cubic yard of concrete." },
      { q: "What kind of sand should I use?", a: "Concrete sand (ASTM C33) for concrete, finer mason sand (ASTM C144) for mortar and plaster, and washed play sand for sandboxes. Beach sand contains salt and should not be used for construction." },
      { q: "How much extra should I order?", a: "Add about 5–10% for spillage, compaction and uneven ground. Sand is sold by the cubic yard or ton in the US and by the tonne or bulk bag (about 0.85 t) in the UK." },
    ],
  },
  features: [
    "Multiple calculation modes",
    "Real-time calculations",
    "Mix ratio presets",
    "Unit conversion (ft ↔ m)",
    "Area-based calculation",
    "Concrete mix calculation",
    "Plaster calculation",
    "Calculation history",
    "Export functionality",
    "Mobile responsive"
  ]
};
